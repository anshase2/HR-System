using HR.BLL.Constants;
using HR.BLL.DTOs.Application;
using HR.BLL.DTOs.Auth;
using HR.BLL.DTOs.Job;
using HR.BLL.Interfaces;
using HR.DAL.DatabaseContext;
using HR.DAL.Entities;
using HR.DAL.Entities.Identity;
using HR.DAL.enums;
using HR.DAL.IRepositories;
using HR.DAL.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HR.BLL.Services
{
    public class JobService : IJobService
    {
        private readonly IJobRepository _jobRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ISkillRepository _skillRepository;
        private readonly IApplicationRepository _applicationRepository;

        public JobService(IJobRepository jobRepository,  UserManager<ApplicationUser> userManager, ISkillRepository skillRepository, IApplicationRepository applicationRepository)
        {
            _jobRepository = jobRepository;
            _userManager = userManager;
            _skillRepository = skillRepository;
            _applicationRepository = applicationRepository;
        }

        /// <summary>
        /// / Get all jobs with optional filtering for applicants by department, location, workplace type, employment type, and experience level.
        /// </summary>
        /// <param name="department"></param>
        /// <param name="location"></param>
        /// <param name="workplaceType"></param>
        /// <param name="employmentType"></param>
        /// <param name="experience"></param>
        /// <returns></returns>
        public async Task<IEnumerable<JobResponseDTO>> GetAllAsync(string? department,
            string? location,
            WorkplaceType? workplaceType,
            EmploymentType? employmentType,
            ExperienceLevel? experience,
            bool? isActive=true

           )
        {
          

            var jobs = await _jobRepository.FilterJobsAsync(department, location,workplaceType , experience, employmentType, isActive);
            var result = new List<JobResponseDTO>();

            foreach (var job in jobs)
            {
                var numberOfApplications =
                    await _applicationRepository.CountByJobIdAsync(job.Id);

                var dto = MapToDto(job);

                dto.NumberOfApplications = numberOfApplications;

                result.Add(dto);
            }

            return result;

           // return jobs.Select(MapToDto).ToList();
        }
      
        public async Task<JobResponseDTO?> GetByIdAsync(int id) // Get job by ID without details for applicants
        {
            var job = await _jobRepository.GetByIdAsync(id);
            if (job == null) return null;
            return MapToDto(job);
        }
        //
        public async Task<JobResponseDTO?> GetByIdWithDetailsAsync(int id)// Get job by ID with details for admins
        {
            var job = await _jobRepository.GetByIdWithDetailsAsync(id);
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
                employmentType = dto.EmploymentType,
                workplaceType = dto.WorkplaceType,
                ExperienceLevel = dto.ExperienceLevel,
                MinYearsOfExperience = dto.MinYearsOfExperience,
               
                PostedDate = System.DateTime.UtcNow,
                ClosingDate = dto.ClosingDate,
                IsActive = dto.IsActive,
                CreatedById = userid,
                CreatedBy = await _userManager.FindByIdAsync(userid.ToString())

            };
            if (job.CreatedById == Guid.Empty)
                throw new Exception("User who ceated this job is not found");
            // ??? ???? ??? ??? Skills
            if (!string.IsNullOrEmpty(dto.RequiredSkills))
            {
                var skillNames = dto.RequiredSkills
                    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                    .ToList();


                foreach (var name in skillNames)
                {
                    var skill = await _skillRepository.GetByNameAsync(name);


                    if (skill == null)
                    {
                        skill = new Skill
                        {
                            Name = name
                        };

                        await _skillRepository.AddAsync(skill);
                    }


                    job.RequiredSkills.Add(skill);
                }
            }

            await _jobRepository.AddAsync(job);
            await _jobRepository.SaveChangesAsync();

            return MapToDto(job);
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var job = await _jobRepository.GetByIdWithDetailsAsync(id);

            if (job == null)
                return false;

            // Delete Applications related to the Job
            await _applicationRepository.DeleteByJobIdAsync(id);

            // Remove Job-Skill relationships
            job.RequiredSkills.Clear();

            // Delete Job
            _jobRepository.Delete(job);

            // Save everything
            await _jobRepository.SaveChangesAsync();

            return true;
        }



        public async Task<IEnumerable<JobResponseDTO>> GetActiveJobsAsync(string? role)
        {
            var jobs = await _jobRepository.GetActiveJobsAsync();

            if (role == UserRoles.Employee || role == UserRoles.Admin)
            {
                return jobs.Select(MapToDto).ToList();
            }


            jobs = jobs
                .Where(j => j.ClosingDate >= DateTime.UtcNow)
                .ToList();

            return jobs.Select(MapToDto).ToList();
        }
     

        public async Task<IEnumerable<JobResponseDTO>> GetJobsByCreatorAsync(Guid employeeId /*user id for employee*/)
        {
            var jobs = await _jobRepository.GetJobsByCreatorAsync(employeeId);
            return jobs.Select(MapToDto).ToList();
        }

        public async Task<bool> UpdateAsync(int id, JobRequestDTO dto)
        {
            var job = await _jobRepository.GetByIdWithDetailsAsync(id);
            if (job == null) return false;

            job.Title = dto.Title;
            job.Description = dto.Description;
            job.Department = dto.Department;
            job.Location = dto.Location;
            job.employmentType = dto.EmploymentType;
            job.IsActive = dto.IsActive;
            job.workplaceType = dto.WorkplaceType;
            job.ExperienceLevel = dto.ExperienceLevel;

            job.MinYearsOfExperience = dto.MinYearsOfExperience;
            job.IsActive = dto.IsActive;
            job.ClosingDate = dto.ClosingDate;

            // update skills: replace existing with new ones
            job.RequiredSkills.Clear();

            if (!string.IsNullOrEmpty(dto.RequiredSkills))
            {
                var skillNames = dto.RequiredSkills
                    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                    .ToList();

                foreach (var name in skillNames)
                {
                    var skill = await _skillRepository.GetByNameAsync(name);

                    if (skill == null)
                    {
                        skill = new Skill
                        {
                            Name = name
                        };

                        await _skillRepository.AddAsync(skill);
                    }

                    job.RequiredSkills.Add(skill);
                }
            }

            _jobRepository.Update(job);
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

            };
        }


        private JobResponseWithMoreDetailsDTO MapToJobResponseWithMoreDetailsDTO(Job job)
        {
            return new JobResponseWithMoreDetailsDTO
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

                CreatedBy = new UserDTO
                {
                    Id = job.CreatedBy.Id.ToString(),
                    FirstName = job.CreatedBy.FirstName,
                    LastName = job.CreatedBy.LastName,
                    Email = job.CreatedBy.Email
                },

                // Applications ... 
                Applications = job.Applications.Select(a => new ApplicationResponseDTO
                {
                    Id = a.Id,
                    JobId = a.JobId,
                    ApplicantId = a.ApplicantId,
                    ApplicantEmail = a.Applicant.User.Email,
                    ApplicantName = $"{a.Applicant.User.FirstName} {a.Applicant.User.LastName}",
                    SubmittedAt = a.SubmittedAt,
                    Status = a.Status.ToString(),
                    CvUrl = a.CvUrl,
                    CoverLetter = a.CoverLetter

                }).ToList(),
                NumberOfApplications = job.Applications.Count
            }; 
        }

    }
}
