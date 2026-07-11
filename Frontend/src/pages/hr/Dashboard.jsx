import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const [period, setPeriod] = useState("Monthly");
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

            <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
              Candidates
            </button>

            <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
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

              <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
                + Create New job
              </button>

            </div>

            <div className="flex justify-between items-center mb-6">

              <input
                type="text"
                placeholder="Search ITG jobs..."
                className="border border-gray-300 rounded-lg px-4 py-3 w-80"
              />

              <button className="border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-100">
                Departments
              </button>

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

<tr className="border-b hover:bg-gray-50">

  <td className="p-4 font-medium">
    Senior Software Engineer
  </td>

  <td className="p-4">
    Software Engineering
  </td>

  <td className="p-4">
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
      Active
    </span>
  </td>

  <td className="p-4">
    24
  </td>

  <td className="p-4">
    2 days ago
  </td>

  <td className="p-4">
    <div className="flex gap-2">

      <button className="bg-blue-100 px-3 py-1 rounded hover:bg-blue-200">
        Edit
      </button>

      <button className="bg-green-100 px-3 py-1 rounded hover:bg-green-200">
        View
      </button>

      <button className="bg-red-100 px-3 py-1 rounded hover:bg-red-200">
        Delete
      </button>

    </div>
  </td>

</tr>

<tr className="border-b hover:bg-gray-50">

  <td className="p-4 font-medium">
    Frontend Developer
  </td>

  <td className="p-4">
    Frontend Development
  </td>

  <td className="p-4">
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
      Active
    </span>
  </td>

  <td className="p-4">
    17
  </td>

  <td className="p-4">
    Yesterday
  </td>

  <td className="p-4">
    <div className="flex gap-2">

      <button className="bg-blue-100 px-3 py-1 rounded hover:bg-blue-200">
        Edit
      </button>

      <button className="bg-green-100 px-3 py-1 rounded hover:bg-green-200">
        View
      </button>

      <button className="bg-red-100 px-3 py-1 rounded hover:bg-red-200">
        Delete
      </button>

    </div>
  </td>

</tr>

<tr className="hover:bg-gray-50">

  <td className="p-4 font-medium">
    AI Engineer
  </td>

  <td className="p-4">
    Artificial Intelligence
  </td>

  <td className="p-4">
    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
      Draft
    </span>
  </td>

  <td className="p-4">
    8
  </td>

  <td className="p-4">
    Today
  </td>

  <td className="p-4">
    <div className="flex gap-2">

      <button className="bg-blue-100 px-3 py-1 rounded hover:bg-blue-200">
        Edit
      </button>

      <button className="bg-green-100 px-3 py-1 rounded hover:bg-green-200">
        View
      </button>

      <button className="bg-red-100 px-3 py-1 rounded hover:bg-red-200">
        Delete
      </button>

    </div>
  </td>

</tr>

</tbody>

</table>

<p className="text-sm text-gray-500 mt-6">
  This dashboard enables the HR team at Integrated Technology Group (ITG) to manage job vacancies, review applications, and streamline the recruitment process through an AI-powered recruitment platform.
</p>

</div>

</main>

</div>

</div>
  );
}

