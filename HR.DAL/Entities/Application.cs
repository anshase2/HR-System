using HR.DAL.applicationState;
using System;

namespace HR.DAL.Entities
{
    public class Application
    {
        public int Id { get; set; }

        public int JobId { get; set; }

        public int ApplicantId { get; set; }

   // ?ublic string ApplicantEmail { get; set; } = string.Empty;

        public string? ResumeUrl { get; set; }

        public string? CoverLetter { get; set; }

        public ApplicationStatus Status { get; set; } = ApplicationStatus.Pending;

        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }
}
