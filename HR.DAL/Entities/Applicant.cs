using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.DAL.Entities.Identity;

namespace HR.DAL.Entities
{
    public class Applicant
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; } = null!;
        public ICollection<Application> Applications { get; set; } = new List<Application>();
    }
}
