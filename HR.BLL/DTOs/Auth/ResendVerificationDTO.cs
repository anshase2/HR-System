using System.ComponentModel.DataAnnotations;

namespace HR.BLL.DTOs.Auth
{
    public class ResendVerificationDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}
