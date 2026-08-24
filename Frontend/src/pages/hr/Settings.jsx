export default function Settings() {
  return (
    <>
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
            <label className="block mb-2 font-medium">Company Name</label>
            <input
              type="text"
              defaultValue="Integrated Technology Group (ITG)"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">HR Email</label>
            <input
              type="email"
              defaultValue="hr@itgsolutions.com"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Phone Number</label>
            <input
              type="text"
              defaultValue="+962 6 500 0000"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Company Address</label>
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
            <label className="block mb-2 font-medium">Minimum AI Match Score</label>
            <input
              type="number"
              defaultValue="70"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Default Job Status</label>
            <select className="w-full border rounded-lg px-4 py-3" defaultValue="Active">
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
            <label className="block mb-2 font-medium">Application Deadline Reminder</label>
            <select className="w-full border rounded-lg px-4 py-3" defaultValue="7 Days Before">
              <option>3 Days Before</option>
              <option>7 Days Before</option>
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
            <label className="block mb-2 font-medium">HR Manager Name</label>
            <input
              type="text"
              defaultValue="Ahmad Almomani"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email Address</label>
            <input
              type="email"
              defaultValue="akmomani@itgsolutions.com"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Current Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-2 font-medium">Confirm Password</label>
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
    </>
  );
}
