using HR.BLL.DTOs;
using HR.BLL.Interfaces;
using HR.BLL.DTOs.Applicant;
using HR.DAL.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using HR.BLL.Constants;
using HR.DAL.Entities;

using HR.DAL.DatabaseContext;
using System.Threading.Tasks;
using HR.BLL.DTOs.Auth;
using HR.DAL.enums;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;




namespace HR.BLL.Services
{
    public class AuthService: IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IJwtService _jwtService;
        private readonly ApplicationDbContext _context;
        private readonly HR.BLL.Interfaces.IOtpService _otpService;
        private readonly HR.BLL.Interfaces.IEmailService _emailService;
        private readonly HR.DAL.IRepositories.IEmailOtpRepository _emailOtpRepository;
        private readonly IConfiguration _configuration;

        public AuthService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IHttpContextAccessor httpContextAccessor,
            IJwtService jwtService,
            ApplicationDbContext context,
            HR.BLL.Interfaces.IOtpService otpService,
            HR.BLL.Interfaces.IEmailService emailService,
            HR.DAL.IRepositories.IEmailOtpRepository emailOtpRepository,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;
            _jwtService = jwtService;
            _context = context;
            _otpService = otpService;
            _emailService = emailService;
            _emailOtpRepository = emailOtpRepository;
            _configuration = configuration;
        }

        public async Task<RegisterApplicantResponseDTO> RegisterApplicantAsync(RegisterApplicantDTO registerDto)
        {
            var existingUser = await _userManager.FindByEmailAsync(registerDto.Email);
            if (existingUser != null)
            {
                return new RegisterApplicantResponseDTO
                {
                    Errors = new List<string> { "An account with this email already exists." },
                    Message = "Registration failed."
                };
            }

            ApplicationUser user = new ApplicationUser()
            {
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
                UserName = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                CreatedAt = DateOnly.FromDateTime(DateTime.Now),
                IsEmailVerified = false,
                EmailConfirmed = false
            };

            IdentityResult result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                return new RegisterApplicantResponseDTO
                {
                   
                    Errors = result.Errors.Select(e => e.Description).ToList()
                };
            }
            var applicant = new Applicant
            {
                User = user,
                UserId = user.Id,

             //   Address = registerDto.Country,
              //  LinkedInUrl = registerDto.LinkedInUrl

            };

            _context.Applicants.Add(applicant);
            await _context.SaveChangesAsync();

            var roleResult = await _userManager.AddToRoleAsync(user, UserRoles.Applicant);
            if (!roleResult.Succeeded)
            {
                await _userManager.DeleteAsync(user);

                return new RegisterApplicantResponseDTO
                {
                    Errors = roleResult.Errors.Select(e => e.Description).ToList(),
                    Message = "Applicant role assignment failed."
                };
            }

            var otp = await CreateAndStoreOtpAsync(user.Id);

            try
            {
                await _emailService.SendEmailAsync(
                    user.Email!,
                    "Verify your HR System email",
                    $"<h2>Verify your HR System account</h2><p>Your email verification code is <strong>{otp.Code}</strong>.</p><p>This code expires in {otp.ExpirationMinutes} minutes.</p><p>If you did not create this account, please ignore this email.</p>");
            }
            catch (Exception)
            {
                return new RegisterApplicantResponseDTO
                {
                    Errors = new List<string> { "Verification email could not be sent." },
                    Message = "Registration completed, but the verification email could not be sent."
                };
            }

            return new RegisterApplicantResponseDTO
            {
                Applicant = new ApplicantResponseDTO
                {
                    Id = applicant.Id,
                    UserId = user.Id,
                    Role = UserRoles.Applicant
                },
                Token = string.Empty,
                Expiration = default,
                RequiresEmailVerification = true,
                Message = "Registration successful. Please verify your email using the OTP sent to your email address."
            };
        }
       
        public async Task<CreateEmplyeeResponseDTO> CreateEmployeeAsync(CreateEmplyeeRequestDTO registerDto)
        {
            var frontendBaseUrl = _configuration["Frontend:BaseUrl"];
            var passwordSetupPath = _configuration["Frontend:EmployeePasswordSetupPath"];

            if (string.IsNullOrWhiteSpace(frontendBaseUrl) || string.IsNullOrWhiteSpace(passwordSetupPath))
            {
                return new CreateEmplyeeResponseDTO
                {
                    Message = "Employee password setup is not configured.",
                    Errors = new List<string> { "Missing Frontend password setup configuration." }
                };
            }
            var existingEmployee = await _userManager.FindByEmailAsync(registerDto.Email);

            if (existingEmployee != null &&
                await _userManager.IsInRoleAsync(existingEmployee, UserRoles.Employee))
            {
                return new CreateEmplyeeResponseDTO
                {
                    Message = "Employee already exists.",
                    Errors = new List<string>
        {
            "An employee with this email already exists."
        }
                };
            }


            ApplicationUser user = new ApplicationUser()
            {
                
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
                UserName = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                CreatedAt = DateOnly.FromDateTime(DateTime.Now)
            };

            IdentityResult result = await _userManager.CreateAsync(user);


            if (!result.Succeeded)
            {
                return new CreateEmplyeeResponseDTO
                {
                    Message = "User registration failed",
                    Errors = result.Errors.Select(e => e.Description).ToList()
                };
            }

            var roleResult = await _userManager.AddToRoleAsync(user, UserRoles.Employee);
            if (!roleResult.Succeeded)
            {
                await _userManager.DeleteAsync(user);

                return new CreateEmplyeeResponseDTO
                {
                    Message = "Employee role assignment failed",
                    Errors = roleResult.Errors.Select(e => e.Description).ToList()
                };
            }

            var passwordSetupToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            var setupLink = BuildEmployeePasswordSetupLink(
                frontendBaseUrl,
                passwordSetupPath,
                user.Email!,
                passwordSetupToken);

            try
            {
                await _emailService.SendEmailAsync(
                    user.Email!,
                    "Set up your HR Account password",
                    $"""
                    <h2>Welcome to the HR System</h2>
                    <p>An administrator has created your employee account.</p>
                    <p>Please set your password by opening the link below:</p>
                    <p><a href="{setupLink}">Set up your password</a></p>
                    <p>If you did not expect this email, please contact your administrator.</p>
                    """);
            }
            catch (Exception)
            {
                return new CreateEmplyeeResponseDTO
                {
                    Id = user.Id,
                    Email = user.Email!,
                    Role = UserRoles.Employee,
                    FirstName = user.FirstName!,
                    LastName = user.LastName!,
                    Message = "Employee account was created, but the password setup email could not be sent.",
                    Errors = new List<string> { "Password setup email delivery failed." }
                };
            }

            return new CreateEmplyeeResponseDTO
            {
                Id = user.Id,
                Email = user.Email,
                Role = UserRoles.Employee,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Message = "Employee account created. A password setup link has been sent by email.",
                Errors = null
            };
        }

        public async Task<SetPasswordResponseDTO> SetPasswordAsync(SetPasswordDTO dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                return new SetPasswordResponseDTO
                {
                    UserNotFound = true,
                    Message = "User not found.",
                    Errors = new List<string> { "User not found." }
                };
            }

            var result = await _userManager.ResetPasswordAsync(user, dto.Token, dto.Password);
            if (!result.Succeeded)
            {
                return new SetPasswordResponseDTO
                {
                    Message = "Password could not be set.",
                    Errors = result.Errors.Select(e => e.Description).ToList()
                };
            }

            return new SetPasswordResponseDTO
            {
                Succeeded = true,
                Message = "Password set successfully. You can now log in."
            };
        }
        public async Task<LoginResponseDTO?> LoginAsync(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByEmailAsync(loginDTO.Email);
             if (user == null)
                return null;
            var result = await _signInManager.CheckPasswordSignInAsync(
      user,
      loginDTO.Password,
      false);


            if (!result.Succeeded)
                return null;
            var roles = await _userManager.GetRolesAsync(user);

            if (roles.Contains(UserRoles.Applicant) &&
                (user.EmailConfirmed != true || user.IsEmailVerified != true))
            {
                return null;
            }

            var authResponse = _jwtService.CreateJwtToken(user, roles);

            return new LoginResponseDTO
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserId = user.Id,
                Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault() ?? string.Empty,
                Token= authResponse.Token,
                Expiration = authResponse.Expiration



            };
        }


        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }
        public Guid? GetCurrentUserId()
        {
            var userId = _httpContextAccessor.HttpContext?
                .User?
                .FindFirst(ClaimTypes.NameIdentifier)?
                .Value;

            if (Guid.TryParse(userId, out var guid))
            {
                return guid;
            }

            return null;
        }

        public async Task<LoginResponseDTO?> VerifyEmailAsync(VerifyEmailOtpDTO dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null || !await _userManager.IsInRoleAsync(user, UserRoles.Applicant))
                return null;

            if (user.EmailConfirmed == true && user.IsEmailVerified == true)
                return null;

            var otp = await _emailOtpRepository.GetLatestValidOtpAsync(user.Id);
            if (otp == null)
                return null;

            var submittedCode = dto.Code.Trim();
            var codesMatch = CryptographicOperations.FixedTimeEquals(
                System.Text.Encoding.UTF8.GetBytes(otp.Code),
                System.Text.Encoding.UTF8.GetBytes(submittedCode));

            if (!codesMatch)
            {
                otp.Attempts++;
                if (otp.Attempts >= GetOtpMaxAttempts())
                    otp.IsUsed = true;

                _emailOtpRepository.Update(otp);
                await _emailOtpRepository.SaveChangesAsync();
                return null;
            }

            user.EmailConfirmed = true;
            user.IsEmailVerified = true;
            otp.IsUsed = true;

            var userUpdate = await _userManager.UpdateAsync(user);
            if (!userUpdate.Succeeded)
                return null;

            _emailOtpRepository.Update(otp);
            await _emailOtpRepository.SaveChangesAsync();

            var roles = await _userManager.GetRolesAsync(user);
            var authResponse = _jwtService.CreateJwtToken(user, roles);
            return new LoginResponseDTO
            {
                UserId = user.Id,
                Email = user.Email ?? string.Empty,
                FirstName = user.FirstName ?? string.Empty,
                LastName = user.LastName ?? string.Empty,
                Role = roles.FirstOrDefault() ?? string.Empty,
                Token = authResponse.Token,
                Expiration = authResponse.Expiration
            };
        }

        public async Task<bool> ResendVerificationAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null || !await _userManager.IsInRoleAsync(user, UserRoles.Applicant))
                return false;

            if (user.EmailConfirmed == true && user.IsEmailVerified == true)
                return false;

            var otp = await CreateAndStoreOtpAsync(user.Id);

            try
            {
                await _emailService.SendEmailAsync(
                    user.Email!,
                    "Your HR System verification code",
                    $"<h2>Verify your HR System account</h2><p>Your new email verification code is <strong>{otp.Code}</strong>.</p><p>This code expires in {otp.ExpirationMinutes} minutes.</p><p>If you did not request this code, please ignore this email.</p>");
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }

        private async Task<(string Code, int ExpirationMinutes)> CreateAndStoreOtpAsync(Guid userId)
        {
            var expirationMinutes = GetOtpExpirationMinutes();
            await _emailOtpRepository.InvalidateActiveOtpsAsync(userId);

            var otp = new HR.DAL.Entities.EmailOtp
            {
                UserId = userId,
                Code = _otpService.GenerateOtp(),
                ExpiresAt = DateTime.UtcNow.AddMinutes(expirationMinutes)
            };

            await _emailOtpRepository.AddAsync(otp);
            await _emailOtpRepository.SaveChangesAsync();
            return (otp.Code, expirationMinutes);
        }

        private int GetOtpExpirationMinutes()
        {
            return Math.Max(1, _configuration.GetValue<int?>("Otp:ExpirationMinutes") ?? 10);
        }

        private int GetOtpMaxAttempts()
        {
            return Math.Max(1, _configuration.GetValue<int?>("Otp:MaxAttempts") ?? 5);
        }

        private static string BuildEmployeePasswordSetupLink(
            string frontendBaseUrl,
            string passwordSetupPath,
            string email,
            string token)
        {
            return $"{frontendBaseUrl.TrimEnd('/')}/{passwordSetupPath.TrimStart('/')}?email={Uri.EscapeDataString(email)}&token={Uri.EscapeDataString(token)}";
        }
    }
}
