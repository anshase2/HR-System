using HR.BLL.DTOs.Applicant;
using HR.BLL.Interfaces;
using HR.DAL.IRepositories;

namespace HR.BLL.Services
{
    public class ApplicantService : IApplicantService
    {
        private readonly IApplicantRepository _applicantRepository;

        public ApplicantService(IApplicantRepository applicantRepository)
        {
            _applicantRepository = applicantRepository;
        }

        public async Task<ApplicantProfileResponseDTO?> GetMyProfileAsync(Guid userId)
        {
            var applicant = await _applicantRepository.GetByUserIdAsync(userId);
            var user = applicant?.User;

            if (user == null)
            {
                return null;
            }

            return new ApplicantProfileResponseDTO
            {
                FirstName = user.FirstName ?? string.Empty,
                LastName = user.LastName ?? string.Empty,
                Email = user.Email ?? string.Empty,
                PhoneNumber = user.PhoneNumber
            };
        }
    }
}
