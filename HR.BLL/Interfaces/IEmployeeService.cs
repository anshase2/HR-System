using HR.BLL.DTOs.Employee;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.Interfaces
{
    public interface IEmployeeService
    {
        Task<bool> DeleteEmployeeAsync(string id);
        Task<List<EmployeeDTO>> GetAllEmployeesAsync();
        Task<EmployeeDTO?> GetEmployeeByIdAsync(string id);
    }
}
