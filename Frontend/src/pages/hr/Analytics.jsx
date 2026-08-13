export default function Analytics() {
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

            <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
              Dashboard
            </button>

            <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
              Vacancies
            </button>

            <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
              Applicants
            </button>

            <button className="block w-full text-left p-3 rounded-lg bg-blue-600 text-white">
              Analytics
            </button>

            <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
              Settings
            </button>

          </nav>

        </aside>

        {/* Main */}
        <main className="flex-1 p-10">

          <h1 className="text-4xl font-bold">
            Recruitment Analytics
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor hiring performance and recruitment insights at Integrated Technology Group.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mt-10">

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">Applications</h3>
              <p className="text-3xl font-bold mt-2">186</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">Interviews</h3>
              <p className="text-3xl font-bold mt-2">32</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">Hired</h3>
              <p className="text-3xl font-bold mt-2">11</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">Success Rate</h3>
              <p className="text-3xl font-bold mt-2">68%</p>
            </div>

          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-2 gap-6 mt-10">

            <div className="bg-white rounded-xl shadow p-8 h-80 flex items-center justify-center">
              <h2 className="text-gray-400 text-xl">
                Hiring Trend Chart
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow p-8 h-80 flex items-center justify-center">
              <h2 className="text-gray-400 text-xl">
                AI Matching Statistics
              </h2>
            </div>

          </div>

        </main>

      </div>

    </div>
  );
}