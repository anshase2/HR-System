import { useNavigate } from "react-router-dom";
export default function Applicants() {
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

            <button
               onClick={() => navigate("/dashboard")}
            className="block w-full text-left p-3 rounded-lg hover:bg-gray-100"
>
  Dashboard
</button>

            

            <button className="block w-full text-left p-3 rounded-lg bg-blue-600 text-white">
              Applications
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

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-4xl font-bold">
                Applications
              </h1>

              <p className="text-gray-500 mt-2">
                Review all applications submitted for ITG vacancies.
              </p>

            </div>

            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
              Export CSV
            </button>

          </div>

          {/* Search + Filters */}

          <div className="flex justify-between items-center mt-10">

            <input
              type="text"
              placeholder="Search Applicant..."
              className="border border-gray-300 rounded-lg px-4 py-3 w-96"
            />

            <div className="flex gap-3">

              <select className="border border-gray-300 rounded-lg px-4 py-3">
                <option>All Jobs</option>
                <option>Software Engineer</option>
                <option>Frontend Developer</option>
                <option>AI Engineer</option>
              </select>

              <select className="border border-gray-300 rounded-lg px-4 py-3">
                <option>All Status</option>
                <option>New</option>
                <option>Reviewed</option>
                <option>Shortlisted</option>
                <option>Rejected</option>
              </select>

              <select className="border border-gray-300 rounded-lg px-4 py-3">
                <option>AI Score</option>
                <option>90%+</option>
                <option>80%+</option>
                <option>70%+</option>
              </select>

            </div>

          </div>

          <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="text-left p-4">Applicant</th>
                  <th className="text-left p-4">Applied For</th>
                  <th className="text-left p-4">AI Match</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date Applied</th>
                  <th className="text-left p-4">Actions</th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-b hover:bg-gray-50">

  <td className="p-4">Ahmad Al-Najjar</td>

  <td className="p-4">
    Software Engineer
  </td>

  <td className="p-4">
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
      92%
    </span>
  </td>

  <td className="p-4">
    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
      New
    </span>
  </td>

  <td className="p-4">
    Today
  </td>

  <td className="p-4">

    <div className="flex gap-2">

      <button className="bg-blue-100 px-3 py-1 rounded hover:bg-blue-200">
        👁
      </button>

      <button className="bg-green-100 px-3 py-1 rounded hover:bg-green-200">
        ✓
      </button>

      <button className="bg-red-100 px-3 py-1 rounded hover:bg-red-200">
        ✕
      </button>

    </div>

  </td>

</tr>

<tr className="border-b hover:bg-gray-50">

  <td className="p-4">Lina Khalaf</td>

  <td className="p-4">
    Frontend Developer
  </td>

  <td className="p-4">
    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded">
      76%
    </span>
  </td>

  <td className="p-4">
    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
      Reviewed
    </span>
  </td>

  <td className="p-4">
    Yesterday
  </td>

  <td className="p-4">

    <div className="flex gap-2">

      <button className="bg-blue-100 px-3 py-1 rounded hover:bg-blue-200">
        👁
      </button>

      <button className="bg-green-100 px-3 py-1 rounded hover:bg-green-200">
        ✓
      </button>

      <button className="bg-red-100 px-3 py-1 rounded hover:bg-red-200">
        ✕
      </button>

    </div>

  </td>

</tr>

<tr className="border-b hover:bg-gray-50">

  <td className="p-4">Omar Haddad</td>

  <td className="p-4">
    AI Engineer
  </td>

  <td className="p-4">
    <span className="bg-red-100 text-red-700 px-3 py-1 rounded">
      54%
    </span>
  </td>

  <td className="p-4">
    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
      Rejected
    </span>
  </td>

  <td className="p-4">
    2 Days Ago
  </td>

  <td className="p-4">

    <div className="flex gap-2">

      <button className="bg-blue-100 px-3 py-1 rounded hover:bg-blue-200">
        👁
      </button>

      <button className="bg-green-100 px-3 py-1 rounded hover:bg-green-200">
        ✓
      </button>

      <button className="bg-red-100 px-3 py-1 rounded hover:bg-red-200">
        ✕
      </button>

    </div>

  </td>

</tr>

<tr>

  <td className="p-4">Dana Al-Zoubi</td>

  <td className="p-4">
    QA Engineer
  </td>

  <td className="p-4">
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
      88%
    </span>
  </td>

  <td className="p-4">
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
      Shortlisted
    </span>
  </td>

  <td className="p-4">
    3 Days Ago
  </td>

  <td className="p-4">

    <div className="flex gap-2">

      <button className="bg-blue-100 px-3 py-1 rounded hover:bg-blue-200">
        👁
      </button>

      <button className="bg-green-100 px-3 py-1 rounded hover:bg-green-200">
        ✓
      </button>

      <button className="bg-red-100 px-3 py-1 rounded hover:bg-red-200">
        ✕
      </button>

    </div>

  </td>

</tr>

</tbody>

</table>

<div className="mt-8 p-5 border border-dashed border-gray-300 rounded-lg bg-gray-50">

  <p className="text-gray-600 text-sm">

    Clicking the <strong>View</strong> button opens the applicant profile, CV,
    AI matching summary and recruitment notes.

  </p>

  <p className="text-red-500 text-sm mt-2">

    AI Match Score is generated by the recruitment engine and helps HR rank candidates.

  </p>

</div>

</div>

</main>

</div>

</div>
  );
}
              