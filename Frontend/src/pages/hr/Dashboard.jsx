import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { deleteJob, getJobs } from "../../services/jobService";
import { getDashboardStatistics } from "../../services/dashboardService";
import { useAuth } from "../../hooks/useAuth.jsx";

export default function Dashboard() {
  const { authUser } = useAuth();
  const [period, setPeriod] = useState("Monthly");
  const [jobSearch, setJobSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState("");
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    inactiveJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0,
    totalApplicants: 0,
    applicationsInPeriod: 0,
    jobsInPeriod: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadJobs() {
      setJobsLoading(true);
      setJobsError("");

      try {
        const response = await getJobs();
        const sortedJobs = Array.isArray(response)
          ? [...response].sort((a, b) => {
              const aDate = a && a.closingDate ? new Date(a.closingDate).getTime() : Number.POSITIVE_INFINITY;
              const bDate = b && b.closingDate ? new Date(b.closingDate).getTime() : Number.POSITIVE_INFINITY;
              return aDate - bDate;
            })
          : [];

        if (isMounted) {
          setJobs(sortedJobs);
        }
      } catch (error) {
        console.error("Failed to load jobs:", error);

        if (isMounted) {
          setJobs([]);
          setJobsError("Failed to load jobs.");
        }
      } finally {
        if (isMounted) {
          setJobsLoading(false);
        }
      }
    }

    async function loadStats() {
      setStatsLoading(true);
      setStatsError("");

      try {
        const response = await getDashboardStatistics(period);

        if (isMounted) {
          setStats({
            totalJobs: Number(response?.totalJobs ?? 0),
            activeJobs: Number(response?.activeJobs ?? 0),
            inactiveJobs: Number(response?.inactiveJobs ?? 0),
            totalApplications: Number(response?.totalApplications ?? 0),
            pendingApplications: Number(response?.pendingApplications ?? 0),
            acceptedApplications: Number(response?.acceptedApplications ?? 0),
            rejectedApplications: Number(response?.rejectedApplications ?? 0),
            totalApplicants: Number(response?.totalApplicants ?? 0),
            applicationsInPeriod: Number(response?.applicationsInPeriod ?? 0),
            jobsInPeriod: Number(response?.jobsInPeriod ?? 0),
          });
        }
      } catch (error) {
        console.error("Failed to load dashboard statistics:", error);

        if (isMounted) {
          setStats({
            totalJobs: 0,
            activeJobs: 0,
            inactiveJobs: 0,
            totalApplications: 0,
            pendingApplications: 0,
            acceptedApplications: 0,
            rejectedApplications: 0,
            totalApplicants: 0,
            applicationsInPeriod: 0,
            jobsInPeriod: 0,
          });
          setStatsError("Failed to load dashboard statistics.");
        }
      } finally {
        if (isMounted) {
          setStatsLoading(false);
        }
      }
    }

    loadJobs();
    loadStats();

    return () => {
      isMounted = false;
    };
  }, [period]);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      (job.title || "").toLowerCase().includes(jobSearch.toLowerCase()) ||
      (job.department || "").toLowerCase().includes(jobSearch.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "" ||
      job.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const normalizeSkills = (value) => {
    if (Array.isArray(value)) {
      return value.flatMap((item) => {
        if (typeof item === "string") {
          return item
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean);
        }

        if (item && typeof item === "object") {
          const skillName = item.name || item.skill || item.title || item.value;
          return typeof skillName === "string" && skillName.trim() ? [skillName.trim()] : [];
        }

        return [];
      });
    }

    if (typeof value === "string") {
      return value
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    return [];
  };

  const formatDate = (value) => {
    if (!value) return "—";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString();
  };

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="flex">

        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-6">

          <h1 className="text-2xl font-bold text-blue-600">
            ITG Careers
          </h1>

          <hr className="my-8" />

          <nav className="space-y-3">

            <button className="block w-full text-left p-3 rounded-lg bg-blue-600 text-white">
              Dashboard
            </button>

          

            <button
  onClick={() => navigate("/applicants")}
  className="block w-full text-left p-3 rounded-lg hover:bg-gray-100"
>
  Applicants
</button>

            {authUser?.role === "Admin" && (
              <button
                onClick={() => navigate("/employees")}
                className="block w-full text-left p-3 rounded-lg hover:bg-gray-100"
              >
                Employees
              </button>
            )}

            <button  onClick={() => navigate("/candidates")}
            className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
              Candidates
            </button>

            <button  onClick={() => navigate("/settings")}
             className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
              Settings
            </button>

          </nav>

        </aside>

        {/* Main */}
        <main className="flex-1 p-10">

          <h1 className="text-4xl font-bold">
            ITG Recruitment Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage ITG jobs, monitor applications and streamline recruitment using AI.
          </p>
          <div className="flex justify-between items-center mb-10">

  

  <div className="flex items-center gap-3">

    <span className="text-gray-600 font-medium">
      Time Period
    </span>

    <select
      value={period}
      onChange={(e) => setPeriod(e.target.value)}
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="Today">Today</option>
      <option value="Weekly">Weekly</option>
      <option value="Monthly">Monthly</option>
      <option value="Last 6 Months">Last 6 Months</option>
      <option value="Yearly">Yearly</option>
    </select>

  </div>

</div>

          {statsError ? (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {statsError}
            </div>
          ) : null}

          {/* Statistics */}

          <div className="grid grid-cols-4 gap-6 mt-10">

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">Total Jobs</h3>
              <p className="text-3xl font-bold mt-2">
                {statsLoading ? "..." : stats.totalJobs}
              </p>
              <p className="text-green-500 text-sm mt-2">
                {stats.jobsInPeriod} in selected period
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">Active Jobs</h3>
              <p className="text-3xl font-bold mt-2">
                {statsLoading ? "..." : stats.activeJobs}
              </p>
              <p className="text-green-500 text-sm mt-2">
                {stats.inactiveJobs} inactive
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">Total Applications</h3>
              <p className="text-3xl font-bold mt-2">
                {statsLoading ? "..." : stats.totalApplications}
              </p>
              <p className="text-blue-500 text-sm mt-2">
                {stats.pendingApplications} pending
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">
                Total Applicants
              </h3>

              <p className="text-3xl font-bold mt-2">
                {statsLoading ? "..." : stats.totalApplicants}
              </p>

              <p className="text-green-500 text-sm mt-2">
                {stats.acceptedApplications} accepted
              </p>

            </div>

          </div>

          {/* Jobs */}

          <div className="bg-white rounded-xl shadow mt-10 p-6">

            <div className="flex justify-between items-center mb-6">

              <div>

                <h2 className="text-2xl font-bold">
                  Current ITG job Postings
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Manage all jobs published by Integrated Technology Group.
                </p>

              </div>

              <Link
    to="/create-job"
    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
>
    + Create New Job
</Link>

            </div>

            <div className="flex justify-between items-center mb-6">

             <input
  type="text"
  value={jobSearch}
  onChange={(e) => setJobSearch(e.target.value)}
  placeholder="Search ITG jobs..."
  className="border border-gray-300 rounded-lg px-4 py-3 w-80"
/>

              <div className="relative">
  <select
    value={selectedDepartment}
    onChange={(e) => setSelectedDepartment(e.target.value)}
    className="border border-gray-300 px-5 py-3 rounded-lg bg-white hover:bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Departments</option>

    <option value="IT">
      IT
    </option>

    <option value="Sales">
      Sales
    </option>

    <option value="HR">
      HR
    </option>

    <option value="Marketing">
      Marketing
    </option>

    <option value="Customer Support">
      Customer Support
    </option>
     <option value="Operations">
      Operations
    </option>
  </select>
</div>
            </div>

            {jobsLoading ? (
              <div className="py-8 text-center text-gray-600">Loading jobs...</div>
            ) : jobsError ? (
              <div className="py-8 text-center text-red-600">{jobsError}</div>
            ) : filteredJobs.length === 0 ? (
              <div className="py-8 text-center text-gray-600">No active jobs available.</div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="text-left p-4">Position</th>
                    <th className="text-left p-4">Department</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Applications</th>
                    <th className="text-left p-4">Posted</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredJobs.map((job) => {
                    const inactive = job.isActive === false;

                    return (
                    <tr key={job.id} className={`border-b hover:bg-gray-50 ${inactive ? "bg-red-50/60" : ""}`}>
                      <td className={`p-4 font-medium ${inactive ? "text-red-700" : ""}`}>{job.title}</td>

                      <td className={`p-4 ${inactive ? "text-red-700" : ""}`}>{job.department}</td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm border ${
                            inactive
                              ? "bg-red-100 text-red-700 border-red-200"
                              : "bg-green-100 text-green-700 border-green-200"
                          }`}
                        >
                          {job.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="p-4">{job.applications ?? "-"}</td>

                      <td className="p-4">{formatDate(job.postedDate)}</td>

                      <td className={`p-4 ${inactive ? "text-red-700" : ""}`}>
                        <div className="flex gap-2">
                          <Link
                            to={`/dashboard/edit/${job.id}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => setSelectedJob(job)}
                            className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                          >
                            View
                          </button>

                          <button
                            onClick={async () => {
                              const confirmed = window.confirm(
                                `Are you sure you want to delete "${job.title}"?`
                              );

                              if (!confirmed) {
                                return;
                              }

                              try {
                                await deleteJob(job.id);
                                setJobs((prevJobs) => prevJobs.filter((item) => item.id !== job.id));

                                if (selectedJob && selectedJob.id === job.id) {
                                  setSelectedJob(null);
                                }
                              } catch (error) {
                                console.error("Failed to delete job:", error);
                                alert(error?.message || "Failed to delete job. Please try again.");
                              }
                            }}
                            className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

{selectedJob && (() => {
  const jobDetails = selectedJob;

  if (!jobDetails) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="p-8 border-b">

          <div className="flex justify-between items-start">

            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {jobDetails.title}
              </h2>

              <p className="text-gray-500 mt-2">
                Integrated Technology Group (ITG)
              </p>
            </div>

            <button
              onClick={() => setSelectedJob(null)}
              className="text-gray-400 hover:text-gray-900 text-3xl"
            >
              ×
            </button>

          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-6">

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              {jobDetails.employmentType}
            </span>

            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">
              📍 {jobDetails.location}
            </span>

            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">
              {jobDetails.department}
            </span>

          </div>

        </div>

        {/* Content */}
        <div className="p-8">

          {/* Job Information */}
          <div className="grid grid-cols-2 gap-6">

            <div className="bg-gray-50 rounded-lg p-5">
              <p className="text-gray-500 text-sm">
                Department
              </p>

              <p className="font-semibold mt-2">
                {jobDetails.department}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <p className="text-gray-500 text-sm">
                Employment Type
              </p>

              <p className="font-semibold mt-2">
                {jobDetails.employmentType}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <p className="text-gray-500 text-sm">
                Work Location
              </p>

              <p className="font-semibold mt-2">
                {jobDetails.location}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <p className="text-gray-500 text-sm">
                Experience Level
              </p>

              <p className="font-semibold mt-2">
                {jobDetails.experienceLevel || "Not specified"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <p className="text-gray-500 text-sm">
                Closing Date
              </p>

              <p className="font-semibold mt-2">
                {formatDate(jobDetails.closingDate)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <p className="text-gray-500 text-sm">
                Status
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                  jobDetails.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {jobDetails.isActive ? "Active" : "Inactive"}
              </span>
            </div>

          </div>

          {/* Description */}
          <div className="mt-8">

            <h3 className="text-xl font-bold">
              Job Description
            </h3>

            <p className="text-gray-600 mt-4 leading-7">
              {jobDetails.description}
            </p>

          </div>

          {/* Required Skills */}
          <div className="mt-8">

            <h3 className="text-xl font-bold">
              Required Skills
            </h3>

            <div className="flex flex-wrap gap-2 mt-4">

              {(() => {
                const skills = normalizeSkills(jobDetails.requiredSkills);

                return skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No skills listed.</span>
                );
              })()}

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="border-t p-6 flex justify-end gap-3">

          <button
            onClick={() => setSelectedJob(null)}
            className="px-6 py-3 rounded-lg border hover:bg-gray-100"
          >
            Close
          </button>

          <button
            onClick={() => {
              setSelectedJob(null);
              navigate(`/dashboard/edit/${jobDetails.id}`);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Edit Job
          </button>

        </div>

      </div>

    </div>
  );
})()}


<p className="text-sm text-gray-500 mt-6">
  This dashboard enables the HR team at Integrated Technology Group (ITG) to manage job vacancies, review applications, and streamline the recruitment process through an AI-powered recruitment platform.
</p>

</div>

</main>

</div>

</div>
  );
}

