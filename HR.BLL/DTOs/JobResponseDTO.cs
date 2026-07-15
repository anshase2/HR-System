using HR.DAL.Entities;
using HR.DAL.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.DTOs
{
    public class JobResponseDTO
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string Department { get; set; } = null!;

        public string Location { get; set; } = null!;

        public string EmploymentType { get; set; } = null!; // FullTime, PartTime...

        public int MinYearsOfExperience { get; set; }

        public string RequiredSkills { get; set; } = null!;

        public DateTime PostedDate { get; set; }

        public DateTime? ClosingDate { get; set; }

        public bool IsActive { get; set; }

        public string CreatedById { get; set; } = null!;
        public ApplicationUser CreatedBy { get; set; } = null!;

        /* public ICollection<Application> Applications { get; set; }
             = new List<Application>();*/
    }
}
