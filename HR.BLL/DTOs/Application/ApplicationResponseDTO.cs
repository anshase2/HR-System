using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Metadata;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.DAL.enums;
//guid applicant id
namespace HR.BLL.DTOs.Application
{
    public class ApplicationResponseDTO //for applicant 
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public int ApplicantId { get; set; }
        public string ApplicantEmail { get; set; } = string.Empty;
        public string ApplicantName { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; }
       public string? Status { get; set; }//enum for application status (e.g., Pending, Accepted, Rejected)
       public string? CvUrl { get; set; }

        public string? CoverLetter { get; set; }
        // new att will be added to the application entity in the database to store the analysis result.
    }
}
