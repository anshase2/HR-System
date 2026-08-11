import { useNavigate } from "react-router-dom";

export default function JobCard({
  id,
  title,
  department,
  location,
  employmentType,
  description,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm hover:shadow-lg transition">

      <h2 className="text-2xl font-bold text-gray-900">
        {title}
      </h2>

      <p className="text-gray-600 mt-3">
        🏢 {department}
      </p>

      <p className="text-gray-600 mt-2">
        📍 {location}
      </p>

      <p className="text-gray-500 mt-5 leading-7">
        {description}
      </p>

      <div className="flex gap-3 mt-6">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {employmentType}
        </span>
      </div>

      <button
        onClick={() => navigate(`/jobs/${id}`)}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        View Details
      </button>

    </div>
  );
}