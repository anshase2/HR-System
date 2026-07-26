using HR.BLL.Constants;
using HR.DAL.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace HR.API
{
    public class Seeder
    {
        public static async Task SeedAsync(
        UserManager<ApplicationUser> userManager,
        RoleManager<ApplicationRole> roleManager)
        {

            string[] roles =
  {
        UserRoles.Admin,
        UserRoles.Employee,
        UserRoles.Applicant
        
    };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(
                        new ApplicationRole
                        {
                            Name = role
                        });
                }
            }

           


            // Create Admin User
            var adminEmail = "admin@hrsystem.com";

            var adminUser = await userManager.FindByEmailAsync(adminEmail);

            if (adminUser == null)
            {
                adminUser = new ApplicationUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    FirstName = "System",
                    LastName = "Admin",
                   // EmailConfirmed = true,
                    CreatedAt = DateOnly.FromDateTime(DateTime.UtcNow)
                   
                };

                var result = await userManager.CreateAsync(
                    adminUser,
                    "Admin@123"
                );


                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(
                        adminUser,
                        "Admin"
                    );
                }
            }
        }
    }
}
