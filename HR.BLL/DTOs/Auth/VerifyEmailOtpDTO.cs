using System.ComponentModel.DataAnnotations;

namespace HR.BLL.DTOs.Auth
{
    public class VerifyEmailOtpDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Code { get; set; } = string.Empty;
    }
}
