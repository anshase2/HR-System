import { useParams } from "react-router-dom";
import jobs from "../../data/jobs";

export default function JobDetails() {
  const { id } = useParams();

  const job = jobs.find((item) => item.id === Number(id));

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Job Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-5xl mx-auto py-16 px-8">

        <div className="bg-white rounded-xl shadow-lg p-10">

          {/* Title */}
          <h1 className="text-4xl font-bold">
            {job.title}
          </h1>

          {/* Company */}
          <p className="text-gray-500 mt-3">
            {job.company}
          </p>

          {/* Tags */}
          <div className="flex gap-3 mt-6">

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              {job.type}
            </span>

            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">
              {job.location}
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
                Experience
              </h3>

              <p className="font-semibold mt-2">
                {job.experience}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-gray-500 text-sm">
                Salary
              </h3>

              <p className="font-semibold mt-2">
                {job.salary}
              </p>
            </div>

          </div>

          <hr className="my-8" />

          {/* Description */}
          <h2 className="text-2xl font-bold">
            Job Description
          </h2>

          <p className="text-gray-600 mt-4 leading-8">
            {job.description}
          </p>

          {/* Requirements */}
          <h2 className="text-2xl font-bold mt-10">
            Requirements
          </h2>

          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-600">

            {job.requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}

          </ul>

          {/* Benefits */}
          <h2 className="text-2xl font-bold mt-10">
            Benefits
          </h2>

          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-600">

            {job.benefits.map((item, index) => (
              <li key={index}>{item}</li>
            ))}

          </ul>

          <button className="mt-10 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700">
            Apply Now
          </button>

        </div>

      </div>

    </div>
  );
}