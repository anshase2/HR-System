using HR.BLL.DTOs;
using HR.BLL.Interfaces;
using HR.DAL.enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace HR_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly IJobService _jobService;

        public JobsController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobResponseDTO>>> GetAll(string? department,
    string? location,
    EmploymentType? employmentType,
    WorkplaceType? workplaceType,
    ExperienceLevel? experience
           )
        { 
            return Ok(await _jobService.GetAllAsync(department, location, workplaceType,employmentType ,experience));
              
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JobResponseDTO>> Get(int id)
        {
            var job = await _jobService.GetByIdAsync(id);

            if (job == null)
                return NotFound();

            return job;
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(JobRequestDTO dto)
        {
            var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

          //  if (userId == null)
            //    return Unauthorized();
            var job = await _jobService.CreateAsync(dto, Guid.Parse(userId));
            return CreatedAtAction(nameof(Get),
                new { id = job.Id },
                job);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, JobRequestDTO dto)
        {
            var updated = await _jobService.UpdateAsync(id, dto);

            if (!updated)
                return NotFound();

            return NoContent();
        }
       
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _jobService.DeleteAsync(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}
