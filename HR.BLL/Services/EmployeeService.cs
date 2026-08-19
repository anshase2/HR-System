using HR.BLL.DTOs.Employee;
using HR.DAL.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.Services
{
    public class EmployeeService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public EmployeeService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<List<EmployeeDTO>> GetAllEmployeesAsync()
        {
            var users = await _userManager.GetUsersInRoleAsync("Employee");

            var employees = users
                .Select(user => new EmployeeDTO
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email!,
                    CreatedAt = user.CreatedAt
                })
                .ToList();

            return employees;
        }

        public async Task<EmployeeDTO?> GetEmployeeByIdAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return null;

            var roles = await _userManager.GetRolesAsync(user);

            if (!roles.Contains("Employee"))
                return null;

            return new EmployeeDTO
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email!,
                CreatedAt = user.CreatedAt
            };
        }
        public async Task<bool> DeleteEmployeeAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return false;

            var roles = await _userManager.GetRolesAsync(user);

            if (!roles.Contains("Employee"))
                return false;

            var result = await _userManager.DeleteAsync(user);

            return result.Succeeded;
        }
    }
}
