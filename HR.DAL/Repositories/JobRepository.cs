using HR.DAL.DatabaseContext;
using HR.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using HR.DAL.IRepositories;
using System.Threading.Tasks;
using HR.DAL.enums;

namespace HR.DAL.Repositories
{
    public class JobRepository : GenericRepository<Job>, IJobRepository
    {
        private readonly ApplicationDbContext _db;

        public JobRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Job>> FilterJobsAsync(string? department, string? location, WorkplaceType? employmentType, int? minExperience)
        {
            var query = _db.Jobs.AsQueryable();

            if (!string.IsNullOrWhiteSpace(department))
                query = query.Where(j => j.Department == department);

            if (!string.IsNullOrWhiteSpace(location))
                query = query.Where(j => j.Location == location);

            if (employmentType.HasValue)
                query = query.Where(j => j.workplaceType == employmentType);
            if (minExperience.HasValue)
                query = query.Where(j => j.MinYearsOfExperience >= minExperience.Value);

            return await query.ToListAsync();
        }

        public async Task<Job?> GetJobWithCreatorAsync(int id)
        {
            return await _db.Jobs
                .Include(j => j.CreatedBy)
                .FirstOrDefaultAsync(j => j.Id == id);
        }
    }
}
