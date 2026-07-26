using HR.DAL.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR.DAL.IRepositories
{
    public interface IApplicationRepository : IGenericRepository<Application>
    {
        Task<IEnumerable<Application>> GetByApplicantIdAsync(int applicantId);
    }
}
