using HR.BLL.DTOs.Application;
using HR.DAL.enums;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.Interfaces
{
    public interface IApplicationService
    {
        Task<ApplicationResponseDTO> ApplyAsync(CreateApplicationDTO dto,Guid userId);

        Task<IEnumerable<ApplicationResponseDTO>> GetAllAsync();

        Task<ApplicationResponseDTO?> GetByApplicationIdAsync(int id);

        Task<IEnumerable<ApplicationResponseDTO>> GetByJobIdAsync(int jobId);

        Task<IEnumerable<ApplicationResponseDTO>> GetApplicationsByApplicantAsync(Guid userId);

        Task<bool> UpdateStatusAsync(int applicationId, ApplicationStatus status);

        Task<bool> DeleteAsync(int id);
    }
}
