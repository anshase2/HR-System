import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJobById } from "../../services/jobService";
import { ApiError } from "../../services/apiClient";
import { formatEnumLabel } from "../../constants/jobEnums";

function formatDate(value) {
  if (!value) {
    return "Not specified";
  }

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadJob = async () => {
      setLoading(true);
      setError("");
      setJob(null);

      try {
        const data = await getJobById(id);

        if (!cancelled) {
          setJob(data);
        }
      } catch (err) {
        if (cancelled) {
          return;
        }

        if (err instanceof ApiError) {
          setError(err.message);
        } else if (err instanceof TypeError) {
          setError("Network error. Please check your connection and try again.");
        } else {
          setError("Failed to load job details. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadJob();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {error.includes("not found") ? "Job Not Found" : "Unable to Load Job"}
        </h1>

        <p className="text-gray-600 mt-4 max-w-lg text-center">{error}</p>

        <Link
          to="/"
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Back to Jobs
        </Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold">Job Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto py-16 px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mb-6"
        >
          ← Back
        </button>

        <div className="bg-white rounded-xl shadow-lg p-10">
          <h1 className="text-4xl font-bold">{job.title}</h1>

          <p className="text-gray-500 mt-3">{job.department}</p>

          <div className="flex flex-wrap gap-3 mt-6">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              {formatEnumLabel(job.employmentType)}
            </span>

            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
              {formatEnumLabel(job.workplaceType)}
            </span>

            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">
              📍 {job.location}
            </span>

            {!job.isActive && (
              <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                Inactive
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-gray-500 text-sm">Department</h3>
              <p className="font-semibold mt-2">{job.department}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-gray-500 text-sm">Experience</h3>

              <p className="font-semibold mt-2">
                {formatEnumLabel(job.experienceLevel)}
                {job.minYearsOfExperience > 0
                  ? ` (${job.minYearsOfExperience}+ years)`
                  : ""}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-gray-500 text-sm">Closing Date</h3>
              <p className="font-semibold mt-2">
                {formatDate(job.closingDate)}
              </p>
            </div>
          </div>

          <hr className="my-8" />

          <h2 className="text-2xl font-bold">Job Description</h2>

          <p className="text-gray-600 mt-4 leading-8 whitespace-pre-wrap">
            {job.description}
          </p>

          <h2 className="text-2xl font-bold mt-10">Required Skills</h2>

          {job.requiredSkills?.length ? (
            <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-600">
              {job.requiredSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-4">No required skills listed.</p>
          )}

          <p className="text-sm text-gray-500 mt-10">
            Posted: {formatDate(job.postedDate)}
          </p>

          <button
            type="button"
            className="mt-6 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700"
            disabled
            title="Application flow will be implemented in a later phase"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}