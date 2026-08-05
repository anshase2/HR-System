using HR.BLL.Interfaces;
using HR.BLL.DTOs.Application;
using HR.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using HR.DAL.enums;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using HR.BLL.Constants;

namespace HR_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationService _applicationService;

        public ApplicationController(IApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        [Authorize(Roles = $"{UserRoles.Applicant}")]

        [HttpPost("apply")]
        [Consumes("multipart/form-data")]

        public async Task<IActionResult> Apply([FromForm] CreateApplicationDTO dto)
        {
            var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim))
                return Unauthorized();

            var result = await _applicationService.ApplyAsync(dto, Guid.Parse(userIdClaim));

            return CreatedAtAction(nameof(GetByApplicationId), new { id = result.Id }, result);
        }

        //[Authorize(Roles = "Admin,Employee")]
        [Authorize(Roles = $"{UserRoles.Admin},{UserRoles.Employee}")]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int? jobId,
    [FromQuery] int? applicantId,
    [FromQuery] ApplicationStatus? status)
        {
            var apps = await _applicationService.GetAllAsync(jobId, applicantId, status);
            return Ok(apps);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByApplicationId(int id)
        {
            var app = await _applicationService.GetByApplicationIdAsync(id);
            if (app == null)
                return NotFound();
            return Ok(app);
        }

        [Authorize(Roles = $"{UserRoles.Admin},{UserRoles.Employee}")]
        [HttpGet("job/{jobId}")]
        public async Task<IActionResult> GetByJobId(int jobId)
        {
            var apps = await _applicationService.GetByJobIdAsync(jobId);
            return Ok(apps);
        }

        [Authorize(Roles=$"{UserRoles.Applicant}")]
        [HttpGet("me")]
        public async Task<IActionResult> GetMyApplications()
        {
            var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim))
                return Unauthorized();

            var apps = await _applicationService.GetApplicationsByApplicantAsync(Guid.Parse(userIdClaim));
            return Ok(apps);
        }

        [Authorize(Roles = $"{UserRoles.Admin},{UserRoles.Employee}")]
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            if (string.IsNullOrWhiteSpace(status))
                return BadRequest("Status is required.");

            if (!Enum.TryParse<ApplicationStatus>(status, true, out var parsed))
                return BadRequest("Invalid status value.");

            var updated = await _applicationService.UpdateStatusAsync(id, parsed);
            if (!updated)
                return NotFound();

            return NoContent();
        }

        [Authorize(Roles = $"{UserRoles.Admin},{UserRoles.Employee}")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _applicationService.DeleteAsync(id);
            if (!deleted)
                return NotFound();
            return NoContent();
        }
    }
}
