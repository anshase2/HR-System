using HR.BLL.DTOs;
using HR.BLL.Interfaces;
using System;
using HR.DAL.DatabaseContext;
using HR.DAL.Entities;
using HR.DAL.Entities.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using HR.DAL.enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.Collections.Generic;
using System.Linq;

using System.Threading.Tasks;

namespace HR.BLL.Services
{
    public class JobService : IJobService
    {
        private readonly HR.DAL.IRepositories.IJobRepository _jobRepository;
        private readonly HR.DAL.IRepositories.IApplicantRepository _applicantRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        public JobService(HR.DAL.IRepositories.IJobRepository jobRepository, HR.DAL.IRepositories.IApplicantRepository applicantRepository, UserManager<ApplicationUser> userManager)
        {
            _jobRepository = jobRepository;
            _applicantRepository = applicantRepository;
            _userManager = userManager;
        }


        public async Task<IEnumerable<JobResponseDTO>> GetAllAsync(string? department,
            string? location,
            string? employmentType,
            int? minExperience)
        {
            // try parse incoming employmentType string as WorkplaceType (e.g. OnSite, Remote, Hybrid)
            WorkplaceType? wpType = null;
            if (!string.IsNullOrWhiteSpace(employmentType) &&
                Enum.TryParse<HR.DAL.enums.WorkplaceType>(employmentType, true, out var parsedWp))
            {
                wpType = parsedWp;
            }

            var jobs = await _jobRepository.FilterJobsAsync(department, location, wpType, minExperience);
            return jobs.Select(MapToDto).ToList();
        }
          public async Task<JobResponseDTO?> GetByIdAsync(int id)
        {
            var job = await _jobRepository.GetJobWithCreatorAsync(id);
            if (job == null) return null;
            return MapToDto(job);
        }
        public async Task<JobResponseDTO> CreateAsync(JobRequestDTO dto,Guid userid)
        {

            // var employee = await _employee_service.GetByUserId(_authService.GetCurrentUserId());


            var job = new Job
            {
                Title = dto.Title,
                Description = dto.Description,
                Department = dto.Department,
                Location = dto.Location,
                // parse enums from incoming strings (case-insensitive)
                employmentType = Enum.TryParse<EmploymentType>(dto.EmploymentType, true, out var empType) ? empType : EmploymentType.FullTime,
                workplaceType = Enum.TryParse<WorkplaceType>(dto.WorkplaceType, true, out var wpType) ? wpType : WorkplaceType.OnSite,
                ExperienceLevel = Enum.TryParse<ExperienceLevel>(dto.ExperienceLevel, true, out var exLevel) ? exLevel : ExperienceLevel.EntryLevel,
                MinYearsOfExperience = dto.MinYearsOfExperience,
                // map required skills (comma separated string) into Skill entities
                RequiredSkills = dto.RequiredSkills?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                    .Select(s => new Skill { Name = s })
                    .ToList() ?? new List<Skill>(),
                PostedDate = System.DateTime.UtcNow,
                ClosingDate = dto.ClosingDate,
                IsActive = dto.IsActive,
                CreatedById = userid,
                CreatedBy = await _userManager.FindByIdAsync(userid.ToString())
            };

            await _jobRepository.AddAsync(job);
            await _jobRepository.SaveChangesAsync();

            return MapToDto(job);
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var job = await _jobRepository.GetByIdAsync(id);
            if (job == null) return false;
            _jobRepository.Delete(job);
            await _jobRepository.SaveChangesAsync();
            return true;
        }

        private JobResponseDTO MapToDto(Job job)
        {
            return new JobResponseDTO
            {
                Id = job.Id,
                Title = job.Title,
                Description = job.Description,
                Department = job.Department,
                Location = job.Location,
                EmploymentType = job.employmentType.ToString(),
                WorkplaceType = job.workplaceType.ToString(),
                ExperienceLevel = job.ExperienceLevel.ToString(),
                MinYearsOfExperience = job.MinYearsOfExperience,
                RequiredSkills = job.RequiredSkills?.Select(s => s.Name).ToList() ?? new List<string>(),
                PostedDate = job.PostedDate,
                ClosingDate = job.ClosingDate,
                IsActive = job.IsActive,
                CreatedById = job.CreatedById.ToString(),
                CreatedBy = job.CreatedBy
            };
        }

        public async Task<IEnumerable<JobResponseDTO>> GetActiveJobsAsync()
        {
            var jobs = await _jobRepository.GetAllAsync();
            return jobs.Where(j => j.IsActive).Select(MapToDto).ToList();
        }

        public async Task<IEnumerable<JobResponseDTO>> GetJobsByCreatorAsync(Guid employeeId)
        {
            var jobs = await _jobRepository.GetAllAsync();
            return jobs.Where(j => j.CreatedById == employeeId).Select(MapToDto).ToList();
        }

        public async Task<bool> UpdateAsync(int id, JobRequestDTO dto)
        {
            var job = await _jobRepository.GetByIdAsync(id);
            if (job == null) return false;

            job.Title = dto.Title;
            job.Description = dto.Description;
            job.Department = dto.Department;
            job.Location = dto.Location;
            // parse enums from incoming strings (case-insensitive)
            job.employmentType = Enum.TryParse<EmploymentType>(dto.EmploymentType, true, out var empType) ? empType : job.employmentType;
            if (!string.IsNullOrWhiteSpace(dto.WorkplaceType))
                job.workplaceType = Enum.TryParse<WorkplaceType>(dto.WorkplaceType, true, out var wpType) ? wpType : job.workplaceType;
            if (!string.IsNullOrWhiteSpace(dto.ExperienceLevel))
                job.ExperienceLevel = Enum.TryParse<ExperienceLevel>(dto.ExperienceLevel, true, out var exLevel) ? exLevel : job.ExperienceLevel;

            job.MinYearsOfExperience = dto.MinYearsOfExperience;
            job.IsActive = dto.IsActive;
            job.ClosingDate = dto.ClosingDate;

            // update skills: replace existing with new ones
            job.RequiredSkills.Clear();
            if (!string.IsNullOrWhiteSpace(dto.RequiredSkills))
            {
                var skills = dto.RequiredSkills.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                    .Select(s => new Skill { Name = s });
                foreach (var s in skills)
                    job.RequiredSkills.Add(s);
            }

            _jobRepository.Update(job);
            await _jobRepository.SaveChangesAsync();

            return true;
        }


    }
}
