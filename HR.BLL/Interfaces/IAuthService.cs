using HR.BLL.DTOs;
using Microsoft.AspNetCore.Identity;

namespace HR.BLL.Interfaces
{
    public interface IAuthService
    {
        Task<RegisterResponseDTO> RegisterAsync(RegisterDTO registerDto);
        Task<LoginResponseDTO?> LoginAsync(LoginDTO loginDTO);
        Task LogoutAsync();
        Guid? GetCurrentUserId();
    }
}
