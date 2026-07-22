using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace HR.BLL.DTOs
{
    public class CreateApplicationDTO
    {
        [Required]
        public int JobId { get; set; }

        // Applicant email is used to identify the applicant user
        [Required]
        public int ApplicantId { get; set; }

        public string? CoverLetter { get; set; }

        public IFormFile? Resume { get; set; }
    }
}
