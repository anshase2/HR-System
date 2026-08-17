using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.DTOs.Admin
{
    public class AdminDashboardStatisticsDTO
    {
        public string Period { get; set; } = string.Empty;

        public int TotalJobs { get; set; }
        public int ActiveJobs { get; set; }
        public int InactiveJobs { get; set; }

        public int TotalApplications { get; set; }
        public int PendingApplications { get; set; }
        public int AcceptedApplications { get; set; }
        public int RejectedApplications { get; set; }

        public int TotalApplicants { get; set; }

        public int ApplicationsInPeriod { get; set; }
        public int JobsInPeriod { get; set; }
    }
}
