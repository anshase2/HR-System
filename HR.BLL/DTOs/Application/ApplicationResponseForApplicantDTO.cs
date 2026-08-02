using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.DTOs.Application
{
    public class ApplicationResponseForApplicantDTO
    {
        public int Id { get; set; }
        public int JobId { get; set; }

        public string JobTitle { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; }

        public string? Status { get; set; }//enum for application status (e.g., Pending, Accepted, Rejected)

    }
}
