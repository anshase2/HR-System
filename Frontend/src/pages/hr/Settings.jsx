import { useNavigate } from "react-router-dom";

export default function Settings() {
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

            <button
              onClick={() => navigate("/applicants")}
              className="block w-full text-left p-3 rounded-lg hover:bg-gray-100"
            >
              Applicants
            </button>

            <button
              onClick={() => navigate("/candidates")}
              className="block w-full text-left p-3 rounded-lg hover:bg-gray-100"
            >
              Candidates
            </button>

            <button className="block w-full text-left p-3 rounded-lg bg-blue-600 text-white">
              Settings
            </button>

          </nav>

        </aside>

        {/* Main */}

        <main className="flex-1 p-10">

          <h1 className="text-4xl font-bold">
            Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your recruitment system preferences.
          </p>
          <div className="bg-white rounded-xl shadow mt-8 p-8">

  <h2 className="text-2xl font-bold mb-6">
    Company Information
  </h2>

  <div className="grid grid-cols-2 gap-6">

    <div>
      <label className="block mb-2 font-medium">
        Company Name
      </label>

      <input
        type="text"
        defaultValue="Integrated Technology Group (ITG)"
        className="w-full border rounded-lg px-4 py-3"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">
        HR Email
      </label>

      <input
        type="email"
        defaultValue="hr@itgsolutions.com"
        className="w-full border rounded-lg px-4 py-3"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">
        Phone Number
      </label>

      <input
        type="text"
        defaultValue="+962 6 500 0000"
        className="w-full border rounded-lg px-4 py-3"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">
        Company Address
      </label>

      <input
        type="text"
        defaultValue="Amman, Jordan"
        className="w-full border rounded-lg px-4 py-3"
      />
    </div>

  </div>

</div>
        <div className="bg-white rounded-xl shadow mt-8 p-8">

  <h2 className="text-2xl font-bold mb-6">
    Recruitment Settings
  </h2>

  <div className="grid grid-cols-2 gap-6">

    <div>
      <label className="block mb-2 font-medium">
        Minimum AI Match Score
      </label>

      <input
        type="number"
        defaultValue="70"
        className="w-full border rounded-lg px-4 py-3"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">
        Default Job Status
      </label>

      <select className="w-full border rounded-lg px-4 py-3">

        <option>Active</option>

        <option>Draft</option>

        <option>Closed</option>

      </select>
    </div>

    <div className="col-span-2">

      <label className="flex items-center gap-3">

        <input type="checkbox" defaultChecked />

        Automatically reject applicants below the minimum AI score

      </label>

    </div>

    <div>

      <label className="block mb-2 font-medium">
        Application Deadline Reminder
      </label>

      <select className="w-full border rounded-lg px-4 py-3">

        <option>3 Days Before</option>

        <option selected>7 Days Before</option>

        <option>14 Days Before</option>

      </select>

    </div>

  </div>

</div>
         <div className="bg-white rounded-xl shadow mt-8 p-8">

  <h2 className="text-2xl font-bold mb-6">
    Account Settings
  </h2>

  <div className="grid grid-cols-2 gap-6">

    <div>
      <label className="block mb-2 font-medium">
        HR Manager Name
      </label>

      <input
        type="text"
        defaultValue="Ahmad Almomani"
        className="w-full border rounded-lg px-4 py-3"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">
        Email Address
      </label>

      <input
        type="email"
        defaultValue="akmomani@itgsolutions.com"
        className="w-full border rounded-lg px-4 py-3"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">
        Current Password
      </label>

      <input
        type="password"
        placeholder="********"
        className="w-full border rounded-lg px-4 py-3"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">
        New Password
      </label>

      <input
        type="password"
        placeholder="Enter new password"
        className="w-full border rounded-lg px-4 py-3"
      />
    </div>

    <div className="col-span-2">
      <label className="block mb-2 font-medium">
        Confirm Password
      </label>

      <input
        type="password"
        placeholder="Confirm new password"
        className="w-full border rounded-lg px-4 py-3"
      />
    </div>

  </div>

</div>   
       <div className="flex justify-end gap-4 mt-8">

  <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100">
    Reset
  </button>

  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
    Save Settings
  </button>

</div>

        </main>

      </div>

    </div>
  );
}