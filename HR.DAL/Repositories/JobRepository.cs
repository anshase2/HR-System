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

        public async Task<IEnumerable<Job>> FilterJobsAsync(string? department, string? location, WorkplaceType? workplaceType, ExperienceLevel? experience, EmploymentType? employmentType)
        {
            var query = _db.Jobs.AsQueryable();

            if (!string.IsNullOrWhiteSpace(department))
                query = query.Where(j => j.Department == department);

            if (!string.IsNullOrWhiteSpace(location))
                query = query.Where(j => j.Location == location);

            if (workplaceType.HasValue)
                query = query.Where(j => j.workplaceType == workplaceType);
            if (experience.HasValue)
                query = query.Where(j => j.ExperienceLevel == experience);
            if (employmentType.HasValue)
                query = query.Where(j => j.employmentType == employmentType);

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<Job>> GetActiveJobsAsync()
        {
            
            return await _db.Jobs.Where(j => j.IsActive).ToListAsync();
        }

        

        public async Task<IEnumerable<Job>> GetJobsByCreatorAsync(Guid employeeId)
        {
            return await _db.Jobs.Include(j => j.CreatedBy).Where(j => j.CreatedById == employeeId).ToListAsync();
        }

        public async Task<Job?> GetJobWithCreatorAsync(int id)
        {
            return await _db.Jobs
                .Include(j => j.CreatedBy)
                .FirstOrDefaultAsync(j => j.Id == id);
        }
    }
}
