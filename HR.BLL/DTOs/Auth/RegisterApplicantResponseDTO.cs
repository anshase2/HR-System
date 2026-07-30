using HR.BLL.Constants;
using HR.BLL.DTOs.Applicant;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.DTOs.Auth
{
    public class RegisterApplicantResponseDTO
    {
        public ApplicantResponseDTO Applicant { get; set; } = null!;
        public string Token { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
        public string Role { get; set; } = UserRoles.Applicant;
        public List<string>? Errors { get; set; }=null;

    }
}
