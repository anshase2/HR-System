using HR.BLL.DTOs;
using HR.BLL.Interfaces;
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

using HR.DAL.DatabaseContext;
using System.Threading.Tasks;




namespace HR.BLL.Services
{
    public class AuthService: IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IJwtService _jwtService;
        private readonly ApplicationDbContext _context;

        public AuthService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IHttpContextAccessor httpContextAccessor,
            IJwtService jwtService,
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;
            _jwtService = jwtService;
            _context = context;
        }

        public async Task<ApplicantResponseDTO> RegisterApplicantAsync(RegisterApplicantDTO registerDto)
        {
            ApplicationUser user = new ApplicationUser()
            {
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
                UserName = registerDto.Email,
                FullName = string.IsNullOrWhiteSpace(registerDto.FirstName) ? registerDto.LastName : (registerDto.FirstName + " " + registerDto.LastName),
                CreatedAt = DateOnly.FromDateTime(DateTime.Now)
            };

            IdentityResult result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                return new ApplicantResponseDTO
                {
                   
                    Errors = result.Errors.Select(e => e.Description).ToList()
                };
            }
            var applicant = new Applicant
            {
                UserId = user.Id,
                Address = registerDto.Country,
                LinkedInUrl = registerDto.LinkedInUrl
            };

            _context.Applicants.Add(applicant);
            await _context.SaveChangesAsync();

            await _userManager.AddToRoleAsync(user, UserRoles.Applicant);
            await _signInManager.SignInAsync(user, false);

            var authResponse = _jwtService.CreateJwtToken(user);
           
            return new ApplicantResponseDTO
            {
                Id = applicant.Id,
                UserId = user.Id,
                Token = authResponse.Token,
                Expiration = authResponse.Expiration,
                Role = "Applicant",

            };
        }
       
        public async Task<CreateEmplyeeResponseDTO> CreateEmployeeAsync(CreateEmplyeeRequestDTO registerDto)
        {
            ApplicationUser user = new ApplicationUser()
            {
                
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
                UserName = registerDto.Email,
                FullName = registerDto.FullName,
                CreatedAt = DateOnly.FromDateTime(DateTime.Now)
            };


            IdentityResult result = await _userManager.CreateAsync(user, registerDto.Password);


            if (!result.Succeeded)
            {
                return new CreateEmplyeeResponseDTO
                {
                    Message = "User registration failed",
                    Errors = result.Errors.Select(e => e.Description).ToList()
                };
            }

            await _userManager.AddToRoleAsync(user, UserRoles.Employee);

            return new CreateEmplyeeResponseDTO
            {
                Id = user.Id,
                Email = user.Email,
                Role = registerDto.Role,
                FullName = user.FullName,
                Message = "User registered successfully",
                Errors = null
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

            var authResponse = _jwtService.CreateJwtToken(user);

            return new LoginResponseDTO
            {
                FullName = user.FullName,
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
    }
}
