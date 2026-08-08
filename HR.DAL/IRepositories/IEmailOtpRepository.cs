using HR.DAL.Entities;
using System;
using System.Threading.Tasks;

namespace HR.DAL.IRepositories
{
    public interface IEmailOtpRepository : IGenericRepository<EmailOtp>
    {
        Task<EmailOtp?> GetLatestValidOtpAsync(Guid userId);
        Task InvalidateActiveOtpsAsync(Guid userId);
    }
}
