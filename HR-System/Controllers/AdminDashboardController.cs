using HR.BLL.DTOs.Admin;
using HR.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [ApiController]
    [Route("api/Admin/Dashboard")]
    [Authorize(Roles = "Admin")]
    public class AdminDashboardController : ControllerBase
    {
        private readonly IAdminDashboardService _adminDashboardService;

    public AdminDashboardController(
        IAdminDashboardService adminDashboardService)
    {
        _adminDashboardService = adminDashboardService;
    }
        [HttpGet("statistics")]

        public async Task<ActionResult<AdminDashboardStatisticsDTO>> GetStatistics(
        [FromQuery] string period = "Monthly")
    {
        try
        {
            var statistics = await _adminDashboardService
                .GetStatisticsAsync(period);

            return Ok(statistics);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
    }
}
}
