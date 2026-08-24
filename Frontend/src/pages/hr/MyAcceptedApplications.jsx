import { useEffect, useState } from "react";
import { getMyAcceptedApplications } from "../../services/applicationService";

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getMatchClass = (matchPercentage) => {
  if (matchPercentage >= 80) return "bg-green-100 text-green-700";
  if (matchPercentage >= 60) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

export default function MyAcceptedApplications() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const retryLoadApplications = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getMyAcceptedApplications();
      setApplications(Array.isArray(response) ? response : []);
    } catch (loadError) {
      console.error("Failed to load accepted applications:", loadError);
      setApplications([]);
      setError(loadError?.message || "Failed to load accepted applications.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    async function loadApplications() {
      try {
        const response = await getMyAcceptedApplications();

        if (mounted) {
          setApplications(Array.isArray(response) ? response : []);
        }
      } catch (loadError) {
        console.error("Failed to load accepted applications:", loadError);

        if (mounted) {
          setApplications([]);
          setError(loadError?.message || "Failed to load accepted applications.");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadApplications();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold">My Accepted Applications</h1>
        <p className="mt-2 text-gray-500">
          Applications you have previously accepted.
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Candidate</th>
                <th className="p-4 text-left">Job</th>
                <th className="p-4 text-left">AI Match</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Submitted Date</th>
                <th className="p-4 text-left">CV</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-600">
                    Loading accepted applications...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-red-600">
                    <p>{error}</p>
                    <button
                      type="button"
                      onClick={retryLoadApplications}
                      className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Try again
                    </button>
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-600">
                    You haven&apos;t accepted any applications yet.
                  </td>
                </tr>
              ) : (
                applications.map((application) => {
                  const matchPercentage = application?.cvAnalysis?.matchPercentage;

                  return (
                    <tr key={application.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{application.applicantName || "-"}</td>
                      <td className="p-4">{application.jobName || "-"}</td>
                      <td className="p-4">
                        {matchPercentage != null ? (
                          <span className={`rounded px-3 py-1 ${getMatchClass(matchPercentage)}`}>
                            {matchPercentage}%
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="p-4">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          {application.status || "Accepted"}
                        </span>
                      </td>
                      <td className="p-4">{formatDate(application.submittedAt)}</td>
                      <td className="p-4">
                        {application.cvUrl ? (
                          <a
                            href={application.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View CV
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
