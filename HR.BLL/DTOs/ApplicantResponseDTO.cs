using HR.DAL.Entities.Identity;
using System;

namespace HR.BLL.DTOs
{
    public class ApplicantResponseDTO
    {
        public int Id { get; set; }
        public string? LinkedInUrl { get; set; }

        public string? PortfolioUrl { get; set; }
        public Guid ?UserId { get; set; }

        //public ApplicationUser? User { get; set; }
        public string? Token { get; set; } = string.Empty;
        public DateTime ?Expiration { get; set; }
        public List<string>? Errors { get; set; }
        public string Role { get; set; } = "Applicant";



    }
}
