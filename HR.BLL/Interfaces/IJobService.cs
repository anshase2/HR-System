using HR.BLL.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.Interfaces
{
    public interface IJobService
    {
        Task<IEnumerable<JobResponseDTO>> GetAllAsync(string? department,
    string? location,
    string? employmentType,
    int? minExperience);

        Task<JobResponseDTO?> GetByIdAsync(int id);

        Task<JobResponseDTO> CreateAsync(JobRequestDTO dto, Guid userid);
      //  Task<bool> UpdateAsync(int id, UpdateJobDto dto);

        Task<bool> DeleteAsync(int id);
        Task<bool> UpdateAsync(int id, JobRequestDTO dto);
    }
}
