using HR.DAL.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.DTOs
{
    public class JobRequestDTO
    {
        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string Department { get; set; } = null!;

        public string Location { get; set; } = null!;

      /*  public string EmploymentType { get; set; } = null!; // FullTime, PartTime...
     public string WorkplaceType { get; set; } = null!; // OnSite, Remote, Hybrid

   public string ExperienceLevel { get; set; } = null!; // EntryLevel, Junior, MidLevel, Senior...*/
        public EmploymentType EmploymentType { get; set; }
        public WorkplaceType WorkplaceType { get; set; }
        public ExperienceLevel ExperienceLevel { get; set; }
        public int MinYearsOfExperience { get; set; }
       // public ExperienceLevel ExperienceLevel { get; set; }

        // comma separated skills (e.g. "C#,SQL,Azure")
        public string RequiredSkills { get; set; } = null!;


        public DateTime? ClosingDate { get; set; }

        public bool IsActive { get; set; } = true;
    }

}
