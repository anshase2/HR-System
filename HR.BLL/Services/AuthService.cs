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
            ApplicationUser user = new ApplicationUser()
            {
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
                UserName = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                CreatedAt = DateOnly.FromDateTime(DateTime.Now),
                IsEmailVerified = false
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

            await _userManager.AddToRoleAsync(user, UserRoles.Applicant);
            await _signInManager.SignInAsync(user, false);

            var roles = await _userManager.GetRolesAsync(user);
            var authResponse = _jwtService.CreateJwtToken(user, roles);
      

            return new RegisterApplicantResponseDTO
            {
                Applicant = new ApplicantResponseDTO
                {
                    Id = applicant.Id,
                    UserId = user.Id,
                    Role = UserRoles.Applicant
                },
                Token = authResponse.Token,
                Expiration = authResponse.Expiration
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
                    "Set up your HR System password",
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

        public Task<authenticationResponseDTO?> VerifyEmailAsync(VerifyEmailOtpDTO dto)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ResendVerificationAsync(string email)
        {
            throw new NotImplementedException();
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
