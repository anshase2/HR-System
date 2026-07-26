using HR.DAL.Entities;
using HR.DAL.enums;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR.DAL.IRepositories
{
    public interface IJobRepository : IGenericRepository<Job>
    {
        Task<IEnumerable<Job>> FilterJobsAsync(string? department, string? location, WorkplaceType? workplaceType, ExperienceLevel? experience, EmploymentType? employmentType);
        Task<Job?> GetJobWithCreatorAsync(int id);
    }
}
