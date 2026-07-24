using Microsoft.AspNetCore.Identity;

namespace HR.DAL.Entities.Identity
{
    public class ApplicationUser: IdentityUser<Guid>
    {
       

        public string FullName { get; set; }

        public DateOnly CreatedAt { get; set; }

    }
}



   