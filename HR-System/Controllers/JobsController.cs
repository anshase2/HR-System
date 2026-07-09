using HR.BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HR.BLL.DTOs;

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
    string? employmentType,
    int? minExperience)
        { 
            return Ok(await _jobService.GetAllAsync(department, location, employmentType, minExperience));
              
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var job = await _jobService.GetByIdAsync(id);

            if (job == null)
                return NotFound();

            return Ok(job);
        }

        [HttpPost]
        public async Task<IActionResult> Create(JobRequestDTO dto)
        {
            var job = await _jobService.CreateAsync(dto);

            return CreatedAtAction(nameof(Get),
                new { id = job.Id },
                job);
        }

       /* [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateJobDto dto)
        {
            var updated = await _jobService.UpdateAsync(id, dto);

            if (!updated)
                return NotFound();

            return NoContent();
        }
       */
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
