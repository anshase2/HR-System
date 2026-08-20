using HR.BLL.DTOs.Auth;
using Microsoft.AspNetCore.Identity;

namespace HR.BLL.Interfaces
{
    public interface IAuthService
    {
        Task<CreateEmplyeeResponseDTO> CreateEmployeeAsync(CreateEmplyeeRequestDTO registerDto);
        Task<SetPasswordResponseDTO> SetPasswordAsync(SetPasswordDTO dto);
        Task<RegisterApplicantResponseDTO?> RegisterApplicantAsync(RegisterApplicantDTO registerDto);
        Task<authenticationResponseDTO?> VerifyEmailAsync(VerifyEmailOtpDTO dto);
        Task<bool> ResendVerificationAsync(string email);
        Task<LoginResponseDTO?> LoginAsync(LoginDTO loginDTO);
        Task LogoutAsync();
        Guid? GetCurrentUserId();
    }
}
