using HR.DAL.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR.DAL.IRepositories
{
    public interface IJobRepository : IGenericRepository<Job>
    {
        Task<IEnumerable<Job>> FilterJobsAsync(string? department, string? location, string? employmentType, int? minExperience);
        Task<Job?> GetJobWithCreatorAsync(int id);
    }
}
