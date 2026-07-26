using HR.DAL.DatabaseContext;
using HR.DAL.Entities;
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
            return await _db.Applications.Where(a => a.ApplicantId == applicantId).ToListAsync();
        }
    }
}
