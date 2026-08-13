import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import jobs from "../../data/jobs";
export default function Dashboard() {
  const [period, setPeriod] = useState("Monthly");
  const [jobSearch, setJobSearch] = useState("");
 const [selectedDepartment, setSelectedDepartment] = useState("");
 const [selectedJob, setSelectedJob] = useState(null); 
 
 const dashboardData = {
  Today: {
    jobs: 2,
    applicants: 8,
    interviews: 1,
    hired: 0,
  },

  "Last 7 Days": {
    jobs: 9,
    applicants: 52,
    interviews: 14,
    hired: 3,
  },

  Monthly: {
    jobs: 24,
    applicants: 186,
    interviews: 32,
    hired: 11,
  },

  "Last 6 Months": {
    jobs: 71,
    applicants: 845,
    interviews: 164,
    hired: 42,
  },

  Yearly: {
    jobs: 152,
    applicants: 2134,
    interviews: 417,
    hired: 109,
  },
};
const stats = dashboardData[period];
const [jobPostings, setJobPostings] = useState([
  {
    id: 1,
    position: "Senior Software Engineer",
    department: "Software Engineering",
    status: "Active",
    applications: 24,
    published: "2 days ago",
  },
  {
    id: 2,
    position: "Frontend Developer",
    department: "Frontend Development",
    status: "Active",
    applications: 17,
    published: "Yesterday",
  },
  {
    id: 3,
    position: "AI Engineer",
    department: "Artificial Intelligence",
    status: "Draft",
    applications: 8,
    published: "Today",
  },
]);

const filteredJobs = jobPostings.filter((job) => {
  const matchesSearch =
    job.position.toLowerCase().includes(jobSearch.toLowerCase()) ||
    job.department.toLowerCase().includes(jobSearch.toLowerCase());

  const matchesDepartment =
    selectedDepartment === "" ||
    job.department === selectedDepartment;

  return matchesSearch && matchesDepartment;
});

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
      <option value="Last 7 Days">Last 7 Days</option>
      <option value="Monthly">Monthly</option>
      <option value="Last 6 Months">Last 6 Months</option>
      <option value="Yearly">Yearly</option>
    </select>

  </div>

</div>

          {/* Statistics */}

          <div className="grid grid-cols-4 gap-6 mt-10">

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">Open jobs</h3>
              <p className="text-3xl font-bold mt-2">
  {stats.jobs}
</p>
              <p className="text-green-500 text-sm mt-2">
                +4 This Month
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">Active Applicants</h3>
              <p className="text-3xl font-bold mt-2">
  {stats.applicants}
</p>
              <p className="text-green-500 text-sm mt-2">
                +18 This Week
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">Interviews</h3>
              <p className="text-3xl font-bold mt-2">
  {stats.interviews}
</p>
              <p className="text-blue-500 text-sm mt-2">
                8 Scheduled
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">
                Successful Hires
              </h3>

              <p className="text-3xl font-bold mt-2">
  {stats.hired}
</p>

              <p className="text-green-500 text-sm mt-2">
                3 This Month
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

    <option value="Software Engineering">
      Software Engineering
    </option>

    <option value="Frontend Development">
      Frontend Development
    </option>

    <option value="Artificial Intelligence">
      Artificial Intelligence
    </option>

    <option value="Quality Assurance">
      Quality Assurance
    </option>

    <option value="DevOps">
      DevOps
    </option>
  </select>
</div>
            </div>

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-gray-100 border-b">

                  <th className="text-left p-4">Position</th>
                  <th className="text-left p-4">Department</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Applications</th>
                  <th className="text-left p-4">Published</th>
                  <th className="text-left p-4">Actions</th>

                </tr>

              </thead>

              <tbody>
  {filteredJobs.map((job) => (
    <tr
      key={job.id}
      className="border-b hover:bg-gray-50"
    >
      <td className="p-4 font-medium">
        {job.position}
      </td>

      <td className="p-4">
        {job.department}
      </td>

      <td className="p-4">
        <span
          className={
            job.status === "Active"
              ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
              : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
          }
        >
          {job.status}
        </span>
      </td>

      <td className="p-4">
        {job.applications}
      </td>

      <td className="p-4">
        {job.published}
      </td>

      <td className="p-4">
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
  onClick={() => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${job.position}"?`
    );

    if (confirmed) {
      setJobPostings((prevJobs) =>
        prevJobs.filter((item) => item.id !== job.id)
      );
    }
  }}
  className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
>
  Delete
</button>

        </div>
      </td>
    </tr>
  ))}
</tbody>

</table>

{selectedJob && (() => {
  const jobDetails = jobs.find(
    (job) => job.id === selectedJob.id
  );

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
                Salary Range
              </p>

              <p className="font-semibold mt-2">
                {jobDetails.salary || "Not specified"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <p className="text-gray-500 text-sm">
                Application Deadline
              </p>

              <p className="font-semibold mt-2">
                {jobDetails.deadline || "Not specified"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <p className="text-gray-500 text-sm">
                Status
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                  jobDetails.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : jobDetails.status === "Draft"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {jobDetails.status}
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

              {jobDetails.requiredSkills.map(
                (skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg"
                  >
                    {skill}
                  </span>
                )
              )}

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

