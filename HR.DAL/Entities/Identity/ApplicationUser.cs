using Microsoft.AspNetCore.Identity;

namespace HR.DAL.Entities.Identity
{
    public class ApplicationUser: IdentityUser<Guid>
    {
       

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string? ProfileImageUrl { get; set; }

        public DateOnly CreatedAt { get; set; }


    }
}



   