using HR.BLL.Services;
using HR.BLL.Constants;

using HR.DAL.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using HR.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using HR.BLL.DTOs.Auth;
using HR.BLL.DTOs.Applicant;

namespace HR_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly IAuthService _authService;


        /// <summary>
        /// 
        /// </summary>
        /// <param name="userManager"></param>
        /// <param name="signInManager"></param>
        /// <param name="roleManager"></param>
        /// <param name="authService"></param>
        public AccountController(IAuthService authService)
        {

            _authService = authService;
        }


        /// <summary>
        /// create new hr employee
        /// </summary>
        /// <param name="registerDTO"></param>
        /// <returns></returns>
        ///
        // [Authorize(Roles = "Admin")]
        [HttpPost("create-employee")]
        [Authorize(Roles = $"{UserRoles.Admin}")]

        public async Task<ActionResult<CreateEmplyeeResponseDTO>> PostCreateEmployee(CreateEmplyeeRequestDTO registerDTO)
        {
            // Validation
            if (ModelState.IsValid == false)
            {
                string errorMessage = string.Join(" | ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
                return Problem(errorMessage);
            }

            // Delegate registration to the business/service layer
            var response= await _authService.CreateEmployeeAsync(registerDTO);

            if (response.Errors != null && response.Errors.Any())
            {
                return Problem(string.Join(" | ", response.Errors));
            }
            
                      

            return response;
        }

        [AllowAnonymous]
        [HttpPost("set-password")]
        public async Task<IActionResult> PostSetPassword(SetPasswordDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _authService.SetPasswordAsync(dto);

            if (response.UserNotFound)
                return NotFound(new { message = response.Message });

            if (!response.Succeeded)
                return BadRequest(response);

            return Ok(response);
        }

        /// <summary>
        ///  Register new applicant       
        /// </summary>
        /// <param name="registerDTO"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("register-applicant")]
        public async Task<ActionResult<RegisterApplicantResponseDTO>> PostRegisterApplicant(RegisterApplicantDTO registerDTO)
        {
            if (ModelState.IsValid == false)
            {
                string errorMessage = string.Join(" | ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
                return Problem(errorMessage);
            }

            var response = await _authService.RegisterApplicantAsync(registerDTO);

            
            
                if (response?.Errors != null && response.Errors.Any())
                {
                    return Problem(string.Join(" | ", response.Errors));
                }

            

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("verify-email")]
        public async Task<IActionResult> PostVerifyEmail(VerifyEmailOtpDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var auth = await _authService.VerifyEmailAsync(dto);
            if (auth == null)
                return Problem("Invalid or expired verification code.");

            return Ok(auth);
        }

        [AllowAnonymous]
        [HttpPost("resend-verification")]
        public async Task<IActionResult> PostResendVerification(ResendVerificationDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var ok = await _authService.ResendVerificationAsync(dto.Email);
            if (!ok)
                return Problem("Unable to resend verification. Check email or try later.");

            return Ok(new { Message = "Verification code sent if the email exists and is not verified." });
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
       /* [HttpGet]
        public async Task<IActionResult> IsEmailAlreadyRegistered(string email)
        {
            ApplicationUser? user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }*/


        /// <summary>
        /// Login
        /// </summary>
        /// <param name="loginDTO"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDTO>> PostLogin(LoginDTO loginDTO)
        {
            //Validation
            if (ModelState.IsValid == false)
            {
                string errorMessage = string.Join(" | ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
                return Problem(errorMessage);
            }
            var user = await _authService.LoginAsync(loginDTO);


            if (user == null)
                return Problem("Invalid email or password");


            return user;
        }






        /// <summary>
        /// Logout
        /// </summary>
        /// <returns></returns>
        [Authorize]        
        [HttpGet("logout")]
        public async Task<IActionResult> GetLogout()
        {
            await _authService.LogoutAsync();

            return NoContent();
        }
    }
}

