using HR.BLL.DTOs;
using HR.BLL.Interfaces;
using HR.DAL.DatabaseContext;
using HR.DAL.Entities;
using HR.DAL.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.Collections.Generic;
using System.Linq;

using System.Threading.Tasks;

namespace HR.BLL.Services
{
    public class JobService : IJobService
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public JobService(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        public async Task<IEnumerable<JobResponseDTO>> GetAllAsync(string? department,
            string? location,
            string? employmentType,
            int? minExperience)
        {
            var query = _db.Jobs.AsQueryable();

            if (!string.IsNullOrWhiteSpace(department))
                query = query.Where(j => j.Department == department);

            if (!string.IsNullOrWhiteSpace(location))
                query = query.Where(j => j.Location == location);

            if (!string.IsNullOrWhiteSpace(employmentType))
                query = query.Where(j => j.EmploymentType == employmentType);

            if (minExperience.HasValue)
                query = query.Where(j => j.MinYearsOfExperience >= minExperience.Value);

            var jobs = await query.ToListAsync();

            return jobs.Select(MapToDto).ToList();
        }

        public async Task<JobResponseDTO?> GetByIdAsync(int id)
        {
            var job = await _db.Jobs.FindAsync(id);

            if (job == null)
                return null;

            return MapToDto(job);
        }

        public async Task<JobResponseDTO> CreateAsync(JobRequestDTO dto,Guid userid)
        {

            // var employee = await _employeeService.GetByUserId(_authService.GetCurrentUserId());


            var job = new Job
            {
                Title = dto.Title,
                Description = dto.Description,
                Department = dto.Department,
                Location = dto.Location,
                EmploymentType = dto.EmploymentType,
                MinYearsOfExperience = dto.MinYearsOfExperience,
                RequiredSkills = dto.RequiredSkills,
                PostedDate = System.DateTime.UtcNow,
                ClosingDate = dto.ClosingDate,
                IsActive = true,
                CreatedById = userid,// _EmplyeeService.getEmployeebyUserID(_authService.GetCurrentUserId()).ID
                CreatedBy = await _userManager.FindByIdAsync(userid.ToString())//get the current user from the context or authentication service
            };

            _db.Jobs.Add(job);
            await _db.SaveChangesAsync();

            return MapToDto(job);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var job = await _db.Jobs.FindAsync(id);
            if (job == null)
                return false;

            _db.Jobs.Remove(job);
            await _db.SaveChangesAsync();

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
                EmploymentType = job.EmploymentType,
                MinYearsOfExperience = job.MinYearsOfExperience,
                RequiredSkills = job.RequiredSkills,
                PostedDate = job.PostedDate,
                ClosingDate = job.ClosingDate,
                IsActive = job.IsActive,
                CreatedById = job.CreatedById.ToString(),
                CreatedBy = job.CreatedBy
            };
        }

        public Task<bool> UpdateAsync(int id, JobRequestDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}
