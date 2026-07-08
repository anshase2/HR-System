using HR.BLL.Interfaces;
using HR.DAL.Entities.Identity;
using HR.BLL.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;




namespace HR.BLL.Services
{
    public class AuthService: IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<RegisterResponseDTO> RegisterAsync(RegisterDTO registerDto)
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
                return new RegisterResponseDTO
                {
                    Message = "User registration failed",
                    Errors = result.Errors.Select(e => e.Description).ToList()
                };
            }

            await _userManager.AddToRoleAsync(user, "Applicant");
            await _signInManager.SignInAsync(user, false);

            return new RegisterResponseDTO
            {
                Id = user.Id,
                Email = user.Email,
                Role = "Applicant",
                FullName = user.FullName,
                Message = "User registered successfully",
                Errors = null
            };
        }
        public async Task<LoginResponseDTO?> LoginAsync(LoginDTO loginDTO)
        {
            var result = await _signInManager.PasswordSignInAsync(
                loginDTO.Email,
                loginDTO.Password,
                false,
                false);


            if (!result.Succeeded)
                return null;


            var user = await _userManager.FindByEmailAsync(loginDTO.Email);


            if (user == null)
                return null;


            return new LoginResponseDTO
            {
                FullName = user.FullName,
                Email = user.Email,
                UserId = user.Id,
                Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault() ?? string.Empty
            };
        }


        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
