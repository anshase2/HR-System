using Microsoft.AspNetCore.Identity;

namespace HR_System.Entities.Identity
{
    public class ApplicationUser: IdentityUser<Guid>
    {
        public string? EmployeeName { get; set; }
    }
}



   