using HR.DAL.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.DAL.Entities
{
    public class Application
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public int UserId { get; set; }  
        public int ApplicantId { get; set; }
        public string CvUrl { get; set; } = string.Empty;
        public string? CoverLetter { get; set; }
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
        public ApplicationStatus Status { get; set; } = ApplicationStatus.Pending;


    }
}
