using HR.DAL.Entities;
using HR.DAL.enums;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR.DAL.IRepositories
{
    public interface IApplicationRepository : IGenericRepository<Application>
    {
        Task<IEnumerable<Application>> GetByApplicantIdAsync(int applicantId);
        Task<IEnumerable<Application>> GetByJobIdAsync(int jobId);
         Task<IEnumerable<Application>> GetAllApplicationsAsync(int? jobId, int? applicantId, ApplicationStatus? status);
        Task<Application> GetApplicationByIdAsync(int id);//with all attributes
        Task<IEnumerable<Application>> GetApplicationsByStatusAsync(ApplicationStatus Status);
        Task<int> CountByJobIdAsync(int jobId);


    }
}
