using HR.DAL.DatabaseContext;
using HR.DAL.Entities;
using HR.DAL.enums;
using HR.DAL.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HR.DAL.Repositories
{
    public class ApplicationRepository : GenericRepository<Application>, IApplicationRepository
    {
        private readonly ApplicationDbContext _db;

        public ApplicationRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public async Task<int> CountByJobIdAsync(int jobId)
        {
            return await _db.Applications
                .CountAsync(a => a.JobId == jobId);
        }
        public async Task<IEnumerable<Application>> GetByApplicantIdAsync(int applicantId)
        {
            return await _db.Applications.Include(a => a.Job).Where(a => a.ApplicantId == applicantId).ToListAsync();
        }
        //implement method to get Application by jobid
        public async Task<IEnumerable<Application>> GetByJobIdAsync(int jobId)
        {
            return await _db.Applications.Include(a => a.Job)
                 .Include(a => a.CVAnalysis)

             //   .Include(a => a.JobId)
                .Include(a => a.Applicant)
                .ThenInclude(a => a.User)
                .Where(a => a.JobId == jobId).ToListAsync();
        }
        public async Task<Application?> GetApplicationByIdAsync(int id)
        {
            return await _db.Applications
                .Include(a => a.CVAnalysis)
                .Include(a => a.Applicant)
                .ThenInclude(a => a.User)
                .Include(a => a.Job)
                .FirstOrDefaultAsync(a => a.Id == id);
        }
        public async Task<IEnumerable<Application>> GetAllApplicationsAsync(int? jobId, int? applicantId, ApplicationStatus? status)
        {
            var query = _db.Applications
                   .Include(a => a.CVAnalysis)

                .Include(a => a.Applicant)
                .ThenInclude(a => a.User)
                .Include(a => a.Job)
                .AsQueryable();

            if (jobId.HasValue)
            {
                query = query.Where(a => a.JobId == jobId.Value);
            }

            if (applicantId.HasValue)
            {
                query = query.Where(a => a.ApplicantId == applicantId.Value);
            }

            if (status.HasValue)
            {
                query = query.Where(a => a.Status == status.Value);
            }

            return await query.ToListAsync();
        }
        public async Task<IEnumerable<Application>> GetApplicationsByStatusAsync(ApplicationStatus status)
        {
            return await _db.Applications
                .Include(a => a.Applicant)
                .ThenInclude(a => a.User)
                .Include(a => a.Job)
                .Where(a => a.Status == status)
                .ToListAsync();
        }
    }
}
