using HR.BLL.DTOs.Admin;
using HR.BLL.Interfaces;
using HR.DAL.DatabaseContext;
using HR.DAL.enums;
using HR.DAL.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.Services
{
    public class AdminDashboardService : IAdminDashboardService
    {
        private readonly IApplicationRepository _applicationRepository;
        private readonly IJobRepository _jobRepository;
        private readonly IApplicantRepository _applicantRepository;





        public AdminDashboardService(IApplicationRepository applicationRepository,IJobRepository jobRepository, IApplicantRepository applicantRepository)
        {
            _applicationRepository = applicationRepository;
            _jobRepository = jobRepository;
            _applicantRepository = applicantRepository;
        }

        public async Task<AdminDashboardStatisticsDTO> GetStatisticsAsync(string period)
        {
            var now = DateTime.UtcNow;

            DateTime startDate;

            switch (period.ToLower())
            {
                case "today":
                    startDate = now.Date;
                    break;

                case "weekly":
                    startDate = now.Date.AddDays(-(int)now.DayOfWeek);
                    break;

                case "monthly":
                    startDate = new DateTime(now.Year, now.Month, 1);
                    break;

                case "last 6 months":
                    startDate = now.AddMonths(-6);
                    break;

                case "yearly":
                    startDate = new DateTime(now.Year, 1, 1);
                    break;

                default:
                    throw new ArgumentException(
                        "Invalid period. Use Today, Weekly, Monthly, Last 6 Months, or Yearly.");
            }
            // Get data through repositories
            var jobs = await _jobRepository.GetAllAsync();
            var applications = await _applicationRepository.GetAllAsync();
            var applicants = await _applicantRepository.GetAllWithUserAsync();

            // Filter data based on selected period
            var filteredJobs = jobs.Where(j =>
                j.PostedDate >= startDate &&
                j.PostedDate <= now);

            var filteredApplications = applications.Where(a =>
                a.SubmittedAt >= startDate &&
                a.SubmittedAt <= now);

            var startDateOnly = DateOnly.FromDateTime(startDate);
            var nowDateOnly = DateOnly.FromDateTime(now);

            var filteredApplicants = applicants.Where(a =>
                a.User.CreatedAt >= startDateOnly &&
                a.User.CreatedAt <= nowDateOnly);


            // Jobs statistics
            var totalJobs = filteredJobs.Count();

            var activeJobs = filteredJobs.Count(j => j.IsActive);

            var inactiveJobs = filteredJobs.Count(j => !j.IsActive);


            // Applications statistics
            var totalApplications = filteredApplications.Count();

            var pendingApplications = filteredApplications.Count(
                a => a.Status == ApplicationStatus.Pending);

            var acceptedApplications = filteredApplications.Count(
                a => a.Status == ApplicationStatus.Accepted);

            var rejectedApplications = filteredApplications.Count(
                a => a.Status == ApplicationStatus.Rejected);


            // Applicants statistics
            var totalApplicants = filteredApplicants.Count();


            return new AdminDashboardStatisticsDTO
            {
                Period = period,

                TotalJobs = totalJobs,
                ActiveJobs = activeJobs,
                InactiveJobs = inactiveJobs,

                TotalApplications = totalApplications,
                PendingApplications = pendingApplications,
                AcceptedApplications = acceptedApplications,
                RejectedApplications = rejectedApplications,

                TotalApplicants = totalApplicants
            };
        }
    }
}
