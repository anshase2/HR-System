using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace HR.BLL.DTOs.Application
{
    public class CreateApplicationDTO
    {
        [Required]
        public int JobId { get; set; }

        // Applicant email is used to identify the applicant user
        [Required]
        public int ApplicantId { get; set; }

        public string? CoverLetter { get; set; }
        [Required(ErrorMessage = "CV can't be blank")]
        public IFormFile? CvUrl { get; set; }
    }
}
