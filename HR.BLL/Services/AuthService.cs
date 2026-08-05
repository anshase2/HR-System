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

        public async Task<RegisterApplicantResponseDTO> RegisterApplicantAsync(RegisterApplicantDTO registerDto)
        {
            ApplicationUser user = new ApplicationUser()
            {
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
                UserName = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                CreatedAt = DateOnly.FromDateTime(DateTime.Now)
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
            if(registerDto.Role!= UserRoles.Admin && registerDto.Role != UserRoles.Employee)
            {
                return new CreateEmplyeeResponseDTO
                {
                    Message = "Invalid role specified",
                    Errors = new List<string> { "Role must be Admin, HR, or Manager" }
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


            IdentityResult result = await _userManager.CreateAsync(user, registerDto.Password);


            if (!result.Succeeded)
            {
                return new CreateEmplyeeResponseDTO
                {
                    Message = "User registration failed",
                    Errors = result.Errors.Select(e => e.Description).ToList()
                };
            }

            await _userManager.AddToRoleAsync(user, registerDto.Role);

            return new CreateEmplyeeResponseDTO
            {
                Id = user.Id,
                Email = user.Email,
                Role = registerDto.Role,
                FirstName = user.FirstName,
                LastName = user.LastName,
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
    }
}
