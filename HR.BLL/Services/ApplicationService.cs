using HR.BLL.DTOs;
using HR.BLL.Interfaces;
using HR.DAL.applicationState;
using HR.DAL.DatabaseContext;
using HR.DAL.Entities;
using HR.DAL.Entities.Identity;
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
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public ApplicationService(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        public async Task<ApplicationResponseDTO> ApplyAsync(CreateApplicationDTO dto,Guid userID)
        {
            var applicantId = await _db.Applicants
        .Where(a => a.UserId == userID)
        .Select(a => (int?)a.Id)
        .FirstOrDefaultAsync();

            if (applicantId == null)
                throw new KeyNotFoundException("Applicant profile not found.");


            var jobExists = await _db.Jobs
                .AnyAsync(j => j.Id == dto.JobId);

            if (!jobExists)
                throw new KeyNotFoundException("Job not found.");


            var alreadyApplied = await _db.Applications
                .AnyAsync(a =>
                    a.ApplicantId == applicantId.Value &&
                    a.JobId == dto.JobId);

            if (alreadyApplied)
                throw new InvalidOperationException("You already applied for this job.");

        

            var application = new HR.DAL.Entities.Application
            {
                JobId = dto.JobId,
                ApplicantId = applicantId,
                CoverLetter = dto.CoverLetter,
                SubmittedAt = DateTime.UtcNow,
                Status = ApplicationStatus.Pending,
            };

            _db.Applications.Add(application);
            await _db.SaveChangesAsync();

            return MapToDto(application);
        }

        public async Task<IEnumerable<ApplicationResponseDTO>> GetAllAsync()
        {
            var apps = await _db.Applications.ToListAsync();
            return apps.Select(MapToDto).ToList();
        }

        public async Task<ApplicationResponseDTO?> GetByIdAsync(int id)
        {
            var app = await _db.Applications.FindAsync(id);
            if (app == null) return null;
            return MapToDto(app);
        }

        public async Task<IEnumerable<ApplicationResponseDTO>> GetByJobIdAsync(int jobId)
        {
            var apps = await _db.Applications.Where(a => a.JobId == jobId).ToListAsync();
            return apps.Select(MapToDto).ToList();
        }

        /*public async Task<IEnumerable<ApplicationResponseDTO>> GetByApplicantAsync(string email)
         {
             var apps = await _db.Applications.Where(a => a.ApplicantEmail == email).ToListAsync();
             return apps.Select(MapToDto).ToList();
         }*/
        public async Task<IEnumerable<ApplicationResponseDTO>> GetApplicationsByApplicantAsync(Guid userId)
        {
            var applicant = await _db.Applicants
              .FirstOrDefaultAsync(a => a.UserId == userId);

            if (applicant == null)
                throw new KeyNotFoundException("Applicant not found for this user.");

            var applications = await _db.Applications
                .Where(a => a.ApplicantId == applicant.Id)
                .ToListAsync();

            return applications.Select(MapToDto);



        }


        public async Task<bool> UpdateStatusAsync(int applicationId, ApplicationStatus status)
        {
            var app = await _db.Applications.FindAsync(applicationId);
            if (app == null) return false;
            app.Status = status;
            _db.Applications.Update(app);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var app = await _db.Applications.FindAsync(id);
            if (app == null) return false;
            _db.Applications.Remove(app);
            await _db.SaveChangesAsync();
            return true;
        }
   public async Task<ApplicationResponseDTO?> GetByApplicationIdAsync(int id)
        {
            var app = await _db.Applications.FindAsync(id);
            if (app == null) throw new KeyNotFoundException("Application not found.");
            return MapToDto(app);
        }
        private ApplicationResponseDTO MapToDto(HR.DAL.Entities.Application app)
        {
            return new ApplicationResponseDTO
            {
                Id = app.Id,
                JobId = app.JobId,
                ApplicantId = app.ApplicantId,
                ApplicantEmail = app.ApplicantEmail,//.applicant.user.email,
                CoverLetter = app.CoverLetter,
                ResumeUrl = app.ResumeUrl,
                Status = app.Status,
                AppliedAt = app.SubmittedAt
            };
        }

     
    }
}
