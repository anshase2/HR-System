using HR.BLL.DTOs.Applicant;

namespace HR.BLL.Interfaces
{
    public interface IApplicantService
    {
        Task<ApplicantProfileResponseDTO?> GetMyProfileAsync(Guid userId);
    }
}
