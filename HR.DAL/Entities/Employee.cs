using HR.DAL.Entities.Identity;

namespace HR.DAL.Entities
{
    public class Employee
    {
        public Guid Id { get; set; }
      
        public Guid UserId { get; set; }
       
        public ApplicationUser? User { get; set; }
    }
}
