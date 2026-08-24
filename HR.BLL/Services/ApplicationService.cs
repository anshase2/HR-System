using DocumentFormat.OpenXml.Bibliography;
using HR.BLL.DTOs.Ai;
using HR.BLL.DTOs.Application;
using HR.BLL.Interfaces;
using HR.BLL.Interfaces.AiContracts;
using HR.DAL.DatabaseContext;
using HR.DAL.Entities;
using HR.DAL.Entities.Identity;
using HR.DAL.enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HR.BLL.Services
{
    public class ApplicationService : IApplicationService
    {
        private readonly HR.DAL.IRepositories.IApplicationRepository _applicationRepository;
        private readonly HR.DAL.IRepositories.IApplicantRepository _applicantRepository;
        private readonly HR.DAL.IRepositories.IJobRepository _jobRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IFileService _fileService;
        private readonly ICVAnalysisService _cvAnalysisService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailService _emailService;

        public ApplicationService(HR.DAL.IRepositories.IApplicationRepository applicationRepository,
            HR.DAL.IRepositories.IApplicantRepository applicantRepository,
            HR.DAL.IRepositories.IJobRepository jobRepository,
            UserManager<ApplicationUser> userManager,
            IFileService fileService,
            ICVAnalysisService cvAnalysisService,IHttpContextAccessor httpContextAccessor, IEmailService emailService)
        {
            _applicationRepository = applicationRepository;
            _applicantRepository = applicantRepository;
            _jobRepository = jobRepository;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
            _cvAnalysisService = cvAnalysisService;
            _fileService = fileService;
            _emailService = emailService;
        }

        public async Task<ApplicationResponseForApplicantDTO> ApplyAsync(CreateApplicationDTO dto, Guid userID)
        {
            var applicant = await _applicantRepository.GetByUserIdAsync(userID);
            if (applicant == null)
                throw new KeyNotFoundException("Applicant profile not found.");

            var job = await _jobRepository.GetByIdAsync(dto.JobId);
            if (job == null)
                throw new KeyNotFoundException("Job not found.");

            var existing = await _applicationRepository.GetByApplicantIdAsync(applicant.Id);
            if (existing.Any(a => a.JobId == dto.JobId))
                throw new InvalidOperationException("You already applied for this job.");
            var cvUrl = await _fileService.SaveFileAsync(dto.CvUrl, "cvs");
            var application = new HR.DAL.Entities.Application
            {
                JobId = dto.JobId,
                ApplicantId = applicant.Id,
                CoverLetter = dto.CoverLetter,
                CvUrl = cvUrl,
                SubmittedAt = DateTime.UtcNow,
                Status = ApplicationStatus.Pending,
                

            };           
          var AIanalysis=await _cvAnalysisService.AnalyzeApplicationAsync(application);
            application.CVAnalysis = AIanalysis;

            await _applicationRepository.AddAsync(application);
            await _applicationRepository.SaveChangesAsync();
            // Send confirmation email
            var user = applicant.User;

            if (user != null && !string.IsNullOrWhiteSpace(user.Email))
            {
                var subject = "Application Received";

                var body = $"""
            <h2>Hello {user.FirstName},</h2>

            <p>
                We have successfully received your application for
                <strong>{job.Title}</strong>.
            </p>

            <p>
                Your application is currently under review.
            </p>

            <p>
                We will contact you if there are any updates regarding
                your application.
            </p>

            <br/>

            <p>HR Team</p>
            """;

                await _emailService.SendEmailAsync(
                    user.Email,
                    subject,
                    body);
            }

            return await MapToDtoForApplicantAsync(application);
        }

        public async Task<IEnumerable<ApplicationResponseDTO>> GetAllAsync(int? jobId, int? applicantId, ApplicationStatus? status)
        {
            var apps = await _applicationRepository.GetAllApplicationsAsync(jobId, applicantId, status);
            var list = new List<ApplicationResponseDTO>();
            foreach (var app in apps)
            {
                list.Add(await MapToDtoAsync(app));
            }
            return list;
        }
        /// <summary>
        ///     return application for Hr Employee        
        /// </summary>
        /// <param name="id">ApplicationId</param>
        /// <returns></returns>
        public async Task<ApplicationResponseDTO?> GetByIdAsync(int id)
        {
            var app = await _applicationRepository.GetApplicationByIdAsync(id);
            if (app == null) return null;
            return await MapToDtoAsync(app);
        }

        public async Task<IEnumerable<ApplicationResponseDTO>> GetByJobIdAsync(int jobId)
        {
            var apps = await _applicationRepository.GetByJobIdAsync(jobId);
            var list = new List<ApplicationResponseDTO>();
            foreach (var app in apps)
                list.Add(await MapToDtoAsync(app));
            return list;
        }

        
        /// <summary>
        ///  return applications for applicant by userId   
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public async Task<IEnumerable<ApplicationResponseForApplicantDTO>> GetApplicationsByApplicantAsync(Guid userId)
        {

            var applicant = await _applicantRepository.GetByUserIdAsync(userId);
            if (applicant == null)
                throw new KeyNotFoundException("Applicant not found for this user.");

            var applications = await _applicationRepository.GetByApplicantIdAsync(applicant.Id);
            var list = new List<ApplicationResponseForApplicantDTO>();
            foreach (var app in applications)
                list.Add(await MapToDtoForApplicantAsync(app));
            return list;
        }


        /*  public async Task<bool> UpdateStatusAsync(int applicationId, ApplicationStatus status)
          {
              var app = await _applicationRepository.GetByIdAsync(applicationId);
              if (app == null) return false;
              app.Status = status;
              _applicationRepository.Update(app);
              await _applicationRepository.SaveChangesAsync();
              return true;
          }*/
        public async Task<bool> UpdateStatusAsync(int applicationId, ApplicationStatus status, Guid reviewerId)
        {
            var app = await _applicationRepository.GetApplicationByIdAsync(applicationId);

            if (app == null)
                return false;

            app.Status = status;
            if (status == ApplicationStatus.Accepted)
            {
                app.ReviewedById = reviewerId;
            }
            _applicationRepository.Update(app);
            await _applicationRepository.SaveChangesAsync();

            if (status == ApplicationStatus.Accepted)
            {
                var applicant = await _applicantRepository
                    .GetByUserIdAsync(app.Applicant.UserId);

                if (applicant != null)
                {
                    var user = await _userManager
                        .FindByIdAsync(applicant.UserId.ToString());

                    if (user != null && !string.IsNullOrEmpty(user.Email))
                    {
                        var subject = "Application Accepted";

                        var body = $"""
                    <h2>Congratulations {user.FirstName}!</h2>

                    <p>
                        We are pleased to inform you that your application
                        for the position
                        <strong>{app.Job.Title}</strong>
                        has been accepted.
                    </p>

                    <p>
                        Our team will contact you with the next steps.
                    </p>

                    <br/>

                    <p>
                        Best regards,<br/>
                        HR Team
                    </p>
                    """;

                        try
                        {
                            await _emailService.SendEmailAsync(
                                user.Email,
                                subject,
                                body
                            );

                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine("Error sending acceptance email:");
                            Console.WriteLine(ex.ToString());
                        }
                    }
                }
            }

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var app = await _applicationRepository.GetByIdAsync(id);
            if (app == null) return false;
            _applicationRepository.Delete(app);
            await _applicationRepository.SaveChangesAsync();
            return true;
        }
        /// <summary>
        /// return application for Hr Employee by applicationId
        /// </summary>
        /// <param name="id">ApplicationId</param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public async Task<ApplicationResponseDTO?> GetByApplicationIdAsync(int id)
        {
            var app = await _applicationRepository.GetApplicationByIdAsync(id);
            if (app == null) throw new KeyNotFoundException("Application not found.");
            return   await MapToDtoAsync(app);
           
        }
        /// <summary>
        /// return application for applicant by applicationId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>

        public async Task<ApplicationResponseForApplicantDTO?> GetByApplicationIdForApplicantAsync(int id)
        {
            var app = await _applicationRepository.GetByIdAsync(id);
            if (app == null) throw new KeyNotFoundException("Application not found.");
            return await MapToDtoForApplicantAsync(app);

        }
        public async Task<IEnumerable<ApplicationResponseDTO>> GetMyAcceptedApplicationsAsync(Guid userId)
        {
            var applications =
                await _applicationRepository.GetAcceptedByReviewerAsync(userId);

            var result = new List<ApplicationResponseDTO>();

            foreach (var app in applications)
            {
                result.Add(await MapToDtoAsync(app));
            }

            return result;
        }
        private async Task<ApplicationResponseDTO> MapToDtoAsync(HR.DAL.Entities.Application app)
        {
            var applicant = await _applicantRepository.GetByIdAsync(app.ApplicantId);
            var user = applicant == null ? null : await _userManager.FindByIdAsync(applicant.UserId.ToString());
            var job = await _jobRepository.GetByIdAsync(app.JobId);
            var cvUrl = string.Empty;

            if (!string.IsNullOrEmpty(app.CvUrl))
            {
                var fileName = Path.GetFileName(app.CvUrl);

                var request = _httpContextAccessor.HttpContext!.Request;

                cvUrl = $"{request.Scheme}://{request.Host}/uploads/cvs/{fileName}";
            }

            return new ApplicationResponseDTO
            {
                Id = app.Id,
                JobId = app.JobId,
                ApplicantEmail = user?.Email ?? string.Empty,
                ApplicantName = user == null ? string.Empty : $"{user.FirstName} {user.LastName}",
                JobName = job?.Title ?? string.Empty,
                ApplicantId = app.ApplicantId,
                CoverLetter = app.CoverLetter,
                CvUrl = cvUrl,
                Status = app.Status.ToString(),
                SubmittedAt = app.SubmittedAt,
                CVAnalysis =  new CVAnalysisDTO
                {
                    Id = app.CVAnalysis.Id,

                    MatchedSkills = app.CVAnalysis.MatchedSkills
    .Split(',', StringSplitOptions.RemoveEmptyEntries) 
    .Select(x => x.Trim())
    .ToList(),
                    MatchPercentage = app.CVAnalysis.MatchPercentage,
                    Recommendation = app.CVAnalysis.Recommendation,
                    AiEvaluationSummary = app.CVAnalysis.AiEvaluationSummary,
                }
            };
        }
        private async Task<ApplicationResponseForApplicantDTO> MapToDtoForApplicantAsync(HR.DAL.Entities.Application app)
        {
            var job = await _jobRepository.GetByIdAsync(app.JobId);
            return new ApplicationResponseForApplicantDTO
            {
                Id = app.Id,
                JobId = app.JobId,
                JobTitle = job?.Title ?? string.Empty,
                SubmittedAt = app.SubmittedAt,
                Status = app.Status.ToString()
            };
        }
    }
}
