using HR.BLL.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.DAL.enums;

namespace HR.BLL.Interfaces
{
    public interface IJobService
    {
        Task<IEnumerable<JobResponseDTO>> GetAllAsync(string? department,
    string? location,
    WorkplaceType? workplaceType,
    EmploymentType? employmentType,
    ExperienceLevel? experience);

        Task<JobResponseDTO?> GetByIdAsync(int id);//get job by id
        Task<IEnumerable<JobResponseDTO>> GetActiveJobsAsync();

        Task<JobResponseDTO> CreateAsync(JobRequestDTO dto, Guid userid);


        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<JobResponseDTO>> GetJobsByCreatorAsync(Guid employeeId);
        Task<bool> UpdateAsync(int id, JobRequestDTO dto);
    }
}
