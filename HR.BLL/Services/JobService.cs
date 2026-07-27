using HR.BLL.DTOs;
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

        public JobService(IJobRepository jobRepository,  UserManager<ApplicationUser> userManager, ISkillRepository skillRepository)
        {
            _jobRepository = jobRepository;
            _userManager = userManager;
            _skillRepository = skillRepository;
        }


        public async Task<IEnumerable<JobResponseDTO>> GetAllAsync(string? department,
            string? location,
            WorkplaceType? workplaceType,
            EmploymentType? employmentType,
            ExperienceLevel? experience
           )
        {
          

            var jobs = await _jobRepository.FilterJobsAsync(department, location,workplaceType , experience, employmentType);
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
            if (job.CreatedBy == null)
                throw new Exception("User not found");
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
            var jobs = await _jobRepository.GetActiveJobsAsync();
            return jobs.Select(MapToDto).ToList();
        }

        public async Task<IEnumerable<JobResponseDTO>> GetJobsByCreatorAsync(Guid employeeId)
        {
            var jobs = await _jobRepository.GetJobsByCreatorAsync(employeeId);
            return jobs.Select(MapToDto).ToList();
        }

        public async Task<bool> UpdateAsync(int id, JobRequestDTO dto)
        {
            var job = await _jobRepository.GetByIdAsync(id);
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


    }
}
