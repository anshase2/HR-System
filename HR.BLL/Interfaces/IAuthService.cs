using HR.BLL.DTOs;
using Microsoft.AspNetCore.Identity;

namespace HR.BLL.Interfaces
{
    public interface IAuthService
    {
        Task<CreateEmplyeeResponseDTO> CreateEmployeeAsync(CreateEmplyeeRequestDTO registerDto);
        Task<RegisterApplicantResponseDTO?> RegisterApplicantAsync(RegisterApplicantDTO registerDto);
        Task<LoginResponseDTO?> LoginAsync(LoginDTO loginDTO);
        Task LogoutAsync();
        Guid? GetCurrentUserId();
    }
}
