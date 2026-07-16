using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.BLL.DTOs;

namespace HR.BLL.Interfaces
{
    public interface IApplicationService
    {
        Task<ApplicationResponseDTO> ApplyAsync(CreateApplicationDTO dto);

        Task<IEnumerable<ApplicationResponseDTO>> GetAllAsync();

        Task<ApplicationResponseDTO?> GetByIdAsync(int id);

        Task<IEnumerable<ApplicationResponseDTO>> GetByJobIdAsync(int jobId);

        Task<IEnumerable<ApplicationResponseDTO>> GetByApplicantAsync(string email);

        Task<bool> UpdateStatusAsync(int applicationId, ApplicationStatus status);

        Task<bool> DeleteAsync(int id);
    }
}
