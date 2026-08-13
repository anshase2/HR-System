export default function CreateJob() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-10">

        <h1 className="text-4xl font-bold mb-2">
          Create New Job
        </h1>

        <p className="text-gray-500 mb-10">
          Fill in the job information to publish a new vacancy.
        </p>

        {/* Basic Information */}

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="block font-medium mb-2">
              Job Title
            </label>

            <input
              type="text"
              placeholder="Software Engineer"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Department
            </label>

            <select className="w-full border rounded-lg p-3">

              <option>Software Engineering</option>

              <option>Frontend Development</option>

              <option>Artificial Intelligence</option>

              <option>Cybersecurity</option>

              <option>QA Engineering</option>

            </select>

          </div>

          <div>

            <label className="block font-medium mb-2">
              Employment Type
            </label>

            <select className="w-full border rounded-lg p-3">

              <option>Full-Time</option>

              <option>Part-Time</option>

              <option>Internship</option>

              <option>Contract</option>

            </select>

          </div>

          <div>

            <label className="block font-medium mb-2">
              Work Location
            </label>

            <select className="w-full border rounded-lg p-3">

              <option>Amman</option>

             

            </select>

          </div>

        </div>

        {/* Description */}

        <div className="mt-8">

          <label className="block font-medium mb-2">
            Job Description
          </label>

          <textarea
            rows="5"
            className="w-full border rounded-lg p-3"
            placeholder="Describe the position..."
          ></textarea>

        </div>

        <div className="mt-8">

          <label className="block font-medium mb-2">
            Required Skills
          </label>

          <textarea
            rows="4"
            className="w-full border rounded-lg p-3"
            placeholder="React, Node.js, SQL..."
          ></textarea>

        </div>

        <div className="grid grid-cols-2 gap-6 mt-8">

          <div>

            <label className="block font-medium mb-2">
              Salary Range
            </label>

            <input
              type="text"
              placeholder="800 - 1200 JOD"
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block font-medium mb-2">
              Application Deadline
            </label>

            <input
              type="date"
              className="w-full border rounded-lg p-3"
            />

          </div>

        </div>

        <div className="mt-8">

          <label className="block font-medium mb-2">
            Status
          </label>

          <select className="w-full border rounded-lg p-3">

            <option>Active</option>

            <option>Draft</option>

            <option>Closed</option>

          </select>

        </div>

        <div className="flex justify-end gap-4 mt-10">

          <button className="px-6 py-3 rounded-lg border hover:bg-gray-100">
            Cancel
          </button>

          <button className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Publish Job
          </button>

        </div>

      </div>

    </div>
  );
}