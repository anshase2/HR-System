using HR.DAL.Entities.Identity;
using HR.DAL.Entities.Identity;
using System;

namespace HR.BLL.DTOs
{
    public class ApplicantResponseDTO
    {
        public Guid Id { get; set; }
        public string? LinkedInUrl { get; set; }

        public string? PortfolioUrl { get; set; }
        public ApplicationUser? User { get; set; }
        public string? Token { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
    }
}
