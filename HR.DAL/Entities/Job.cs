using HR.DAL.Entities.Identity;
using HR.DAL.enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;


namespace HR.DAL.Entities
{
    public class Job
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string Department { get; set; } = null!;

        public string Location { get; set; } = null!;

        public EmploymentType employmentType { get; set; }  // FullTime, PartTime...
        public WorkplaceType workplaceType { get; set; }  // Onsite, Remote, Hybrid...

        public ExperienceLevel ExperienceLevel { get; set; }  // Junior, Mid, Senior...

        public int MinYearsOfExperience { get; set; }


        public DateTime PostedDate { get; set; }

        public DateTime? ClosingDate { get; set; }

        public bool IsActive { get; set; }

        public Guid CreatedById { get; set; } = Guid.Empty;
        public ApplicationUser CreatedBy { get; set; } = null!;
        public ICollection<Skill> RequiredSkills { get; set; } = new List<Skill>();

         public ICollection<Application> Applications { get; set; }
             = new List<Application>();
    }
}
