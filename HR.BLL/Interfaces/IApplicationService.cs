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
        Task<ApplicationResponseForApplicantDTO> ApplyAsync(CreateApplicationDTO dto,Guid userId);

        Task<IEnumerable<ApplicationResponseDTO>> GetAllAsync(int? jobId, int? applicantId, ApplicationStatus? status);

        Task<ApplicationResponseDTO?> GetByApplicationIdAsync(int id);

        Task<IEnumerable<ApplicationResponseDTO>> GetByJobIdAsync(int jobId);

        Task<IEnumerable<ApplicationResponseForApplicantDTO>> GetApplicationsByApplicantAsync(Guid userId);
        Task<IEnumerable<ApplicationResponseDTO>> GetMyAcceptedApplicationsAsync(Guid userId);
        Task<bool> UpdateStatusAsync(int applicationId, ApplicationStatus status, Guid reviewerId);

        Task<bool> DeleteAsync(int id);
    }
}
