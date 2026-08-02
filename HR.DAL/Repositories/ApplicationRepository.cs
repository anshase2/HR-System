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

        public async Task<IEnumerable<Application>> GetByApplicantIdAsync(int applicantId)
        {
            return await _db.Applications.Include(a => a.Job).Where(a => a.ApplicantId == applicantId).ToListAsync();
        }
        //implement method to get Application by jobid
        public async Task<IEnumerable<Application>> GetByJobIdAsync(int jobId)
        {
            return await _db.Applications.Include(a => a.Job)
                .Include(a => a.JobId)
                .Include(a => a.Applicant)
                .ThenInclude(a => a.User)
                .Where(a => a.JobId == jobId).ToListAsync();
        }
        public async Task<Application?> GetApplicationByIdAsync(int id)
        {
            return await _db.Applications
                .Include(a => a.Applicant)
                .ThenInclude(a => a.User)
                .Include(a => a.Job)
                .FirstOrDefaultAsync(a => a.Id == id);
        }
        public async Task<IEnumerable<Application>> GetAllApplicationsAsync()
        {
            return await _db.Applications
                .Include(a => a.Applicant)
                .ThenInclude(a => a.User)
                .Include(a => a.Job)
                .ToListAsync();
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
