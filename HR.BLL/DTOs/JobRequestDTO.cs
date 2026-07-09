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

        public string EmploymentType { get; set; } = null!; // FullTime, PartTime...

        public int MinYearsOfExperience { get; set; }

        public string RequiredSkills { get; set; } = null!;


        public DateTime? ClosingDate { get; set; }
    }

}
