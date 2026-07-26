using HR.DAL.Entities;
using System.Threading.Tasks;

namespace HR.DAL.IRepositories
{
    public interface ISkillRepository : IGenericRepository<Skill>
    {
        Task<Skill?> GetByNameAsync(string name);
    }
}
