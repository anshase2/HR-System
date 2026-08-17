using HR.DAL.DatabaseContext;
using HR.DAL.Entities;
using HR.DAL.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace HR.DAL.Repositories
{
    public class ApplicantRepository : GenericRepository<Applicant>, IApplicantRepository
    {
        private readonly ApplicationDbContext _db;

        public ApplicantRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<Applicant?> GetByUserIdAsync(Guid userId)
        {
            return await _db.Applicants.Include(a => a.User).FirstOrDefaultAsync(a => a.UserId == userId);
        }
        public async Task<List<Applicant>> GetAllWithUserAsync()
        {
            return await _db.Applicants
                .Include(a => a.User)
                .ToListAsync();
        }

    }
}
