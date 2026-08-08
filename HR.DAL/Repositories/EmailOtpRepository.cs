using HR.DAL.DatabaseContext;
using HR.DAL.Entities;
using HR.DAL.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace HR.DAL.Repositories
{
    public class EmailOtpRepository : GenericRepository<EmailOtp>, IEmailOtpRepository
    {
        private readonly ApplicationDbContext _db;

        public EmailOtpRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<EmailOtp?> GetLatestValidOtpAsync(Guid userId)
        {
            var now = DateTime.UtcNow;
            return await _db.EmailOtps
                .Where(o => o.UserId == userId && !o.IsUsed && o.ExpiresAt > now)
                .OrderByDescending(o => o.CreatedAt)
                .FirstOrDefaultAsync();
        }

        public async Task InvalidateActiveOtpsAsync(Guid userId)
        {
            var now = DateTime.UtcNow;
            var otps = await _db.EmailOtps
                .Where(o => o.UserId == userId && !o.IsUsed && o.ExpiresAt > now)
                .ToListAsync();

            foreach (var otp in otps)
            {
                otp.IsUsed = true;
            }

            _db.EmailOtps.UpdateRange(otps);
            await _db.SaveChangesAsync();
        }
    }
}
