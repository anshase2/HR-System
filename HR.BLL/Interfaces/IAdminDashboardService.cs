using HR.BLL.DTOs.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.Interfaces
{
    public interface IAdminDashboardService
    {
        Task<AdminDashboardStatisticsDTO> GetStatisticsAsync(string period);

    }
}
