using HR.DAL.Entities;
using HR.DAL.enums;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR.DAL.IRepositories
{
    public interface IJobRepository : IGenericRepository<Job>
    {
        Task<IEnumerable<Job>> FilterJobsAsync(string? department, string? location, WorkplaceType? workplaceType, ExperienceLevel? experience, EmploymentType? employmentType, bool? isActive=true);
       // Task<Job?> GetJobWithCreatorAsync(int id);
        Task<IEnumerable<Job>> GetActiveJobsAsync();
        Task<IEnumerable<Job>> GetJobsByCreatorAsync(Guid employeeId);
        Task<Job?> GetByIdWithDetailsAsync(int id);


    }
}
