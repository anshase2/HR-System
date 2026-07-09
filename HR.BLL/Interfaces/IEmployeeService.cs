using HR.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.Interfaces
{
    public interface IEmployeeService
    {
        Task<Employee?> GetByUserId(Guid? userId);
    }
}
