using HR.DAL.Entities;
using System.Threading.Tasks;

namespace HR.DAL.IRepositories
{
    public interface IApplicantRepository : IGenericRepository<Applicant>
    {
        Task<Applicant?> GetByUserIdAsync(System.Guid userId);
        Task<List<Applicant>> GetAllWithUserAsync();
    }
}
