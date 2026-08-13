import { useNavigate } from "react-router-dom";
import { formatEnumLabel } from "../../constants/jobEnums";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  const descriptionPreview =
    job.description?.length > 160
      ? `${job.description.slice(0, 160)}...`
      : job.description;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm hover:shadow-lg transition">
      <h2 className="text-2xl font-bold text-gray-900">
        {job.title}
      </h2>

      <p className="text-gray-600 mt-3">
        🏢 {job.department}
      </p>

      <p className="text-gray-600 mt-2">
        📍 {job.location}
      </p>

      <p className="text-gray-500 mt-5 leading-7">
        {descriptionPreview}
      </p>

      <div className="flex flex-wrap gap-3 mt-6">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {formatEnumLabel(job.employmentType)}
        </span>

        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
          {formatEnumLabel(job.workplaceType)}
        </span>

        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
          {formatEnumLabel(job.experienceLevel)}
        </span>
      </div>

      <button
        onClick={() => navigate(`/jobs/${job.id}`)}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        View Details
      </button>
    </div>
  );
}