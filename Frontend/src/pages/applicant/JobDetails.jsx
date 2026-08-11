import { useParams, useNavigate } from "react-router-dom";
import jobs from "../../data/jobs";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobs.find((item) => item.id === Number(id));

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Job Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-5xl mx-auto py-16 px-8">

        <div className="bg-white rounded-xl shadow-lg p-10">

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900">
            {job.title}
          </h1>

          <p className="text-gray-500 mt-3">
            Integrated Technology Group (ITG)
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-6">

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              {job.employmentType}
            </span>

            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">
              📍 {job.location}
            </span>

            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">
              {job.department}
            </span>

          </div>

          {/* Information Cards */}
          <div className="grid grid-cols-3 gap-6 mt-8">

            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-gray-500 text-sm">
                Department
              </h3>

              <p className="font-semibold mt-2">
                {job.department}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-gray-500 text-sm">
                Employment Type
              </h3>

              <p className="font-semibold mt-2">
                {job.employmentType}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-gray-500 text-sm">
                Salary
              </h3>

              <p className="font-semibold mt-2">
                {job.salary || "Not specified"}
              </p>
            </div>

          </div>

          {/* Deadline */}
          <div className="mt-6 bg-gray-50 rounded-lg p-5">

            <h3 className="text-gray-500 text-sm">
              Application Deadline
            </h3>

            <p className="font-semibold mt-2">
              {job.deadline || "Not specified"}
            </p>

          </div>

          <hr className="my-8" />

          {/* Description */}
          <h2 className="text-2xl font-bold">
            Job Description
          </h2>

          <p className="text-gray-600 mt-4 leading-8">
            {job.description}
          </p>

          {/* Required Skills */}
          <h2 className="text-2xl font-bold mt-10">
            Required Skills
          </h2>

          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-600">

            {job.requiredSkills.map((skill, index) => (
              <li key={index}>
                {skill}
              </li>
            ))}

          </ul>

          {/* Status */}
          <div className="mt-10">

            <h2 className="text-2xl font-bold">
              Job Status
            </h2>

            <span
              className={`inline-block mt-4 px-4 py-2 rounded-full text-sm ${
                job.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : job.status === "Draft"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {job.status}
            </span>

          </div>

          {/* Apply */}
          {job.status === "Active" && (
            <button
              onClick={() => navigate(`/apply/${id}`)}
              className="mt-10 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700"
            >
              Apply Now
            </button>
          )}

        </div>

      </div>

    </div>
  );
}