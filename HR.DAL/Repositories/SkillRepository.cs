using HR.DAL.DatabaseContext;
using HR.DAL.Entities;
using HR.DAL.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace HR.DAL.Repositories
{
    public class SkillRepository : GenericRepository<Skill>, ISkillRepository
    {
        private readonly ApplicationDbContext _db;

        public SkillRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<Skill?> GetByNameAsync(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return null;

            return await _db.Skills
           .FirstOrDefaultAsync(s => s.Name.ToLower() == name.ToLower());
        }
    }
}
