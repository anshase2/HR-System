import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApplicationsByJob } from "../../services/applicationService";
import { getActiveJobs } from "../../services/jobService";

const getAiScore = (application) => {
  const value = Number(application?.cvAnalysis?.matchPercentage);
  return Number.isFinite(value) ? value : null;
};

const getStatusClass = (status) => {
  const normalized = (status || "").toLowerCase();

  if (normalized.includes("accept")) {
    return "bg-green-100 text-green-700";
  }

  if (normalized.includes("reject")) {
    return "bg-red-100 text-red-700";
  }

  if (normalized.includes("interview") || normalized.includes("review")) {
    return "bg-blue-100 text-blue-700";
  }

  return "bg-yellow-100 text-yellow-700";
};

const getRecommendation = (score) => {
  if (score == null) {
    return "AI score is not available. Additional evaluation is recommended.";
  }

  if (score >= 90) {
    return "Strong match for the position. Recommended for interview.";
  }

  if (score >= 80) {
    return "Good match for the position. Can be considered for further evaluation.";
  }

  return "Lower match score. Additional evaluation is recommended.";
};

export default function Candidates() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [applicationsError, setApplicationsError] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const selectedJob = jobs.find((job) => job.id === selectedJobId) || null;

  useEffect(() => {
    let mounted = true;

    async function loadJobs() {
      setJobsLoading(true);
      setJobsError("");

      try {
        const response = await getActiveJobs();
        const nextJobs = Array.isArray(response) ? response : [];

        if (!mounted) return;

        setJobs(nextJobs);

        if (nextJobs.length > 0) {
          setSelectedJobId((currentSelectedJobId) => {
            if (currentSelectedJobId == null) {
              return nextJobs[0].id;
            }

            const exists = nextJobs.some((job) => job.id === currentSelectedJobId);
            return exists ? currentSelectedJobId : nextJobs[0].id;
          });
        } else {
          setSelectedJobId(null);
        }
      } catch (error) {
        console.error("Failed to load jobs:", error);

        if (mounted) {
          setJobs([]);
          setJobsError(error?.message || "Failed to load jobs.");
          setSelectedJobId(null);
        }
      } finally {
        if (mounted) {
          setJobsLoading(false);
        }
      }
    }

    loadJobs();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (selectedJobId == null) {
      setApplications([]);
      setApplicationsError("");
      return;
    }

    let mounted = true;

    async function loadApplications() {
      setApplicationsLoading(true);
      setApplicationsError("");

      try {
        const response = await getApplicationsByJob(selectedJobId);

        if (!mounted) return;

        const nextApplications = (Array.isArray(response) ? response : [])
          .filter((application) => application?.jobId === selectedJobId)
          .sort((a, b) => {
            const scoreA = getAiScore(a);
            const scoreB = getAiScore(b);
            const safeA = scoreA == null ? -Infinity : scoreA;
            const safeB = scoreB == null ? -Infinity : scoreB;
            return safeB - safeA;
          })
          .slice(0, 10);

        setApplications(nextApplications);
      } catch (error) {
        console.error("Failed to load candidates for selected job:", error);

        if (mounted) {
          setApplications([]);
          setApplicationsError(error?.message || "Failed to load candidates.");
        }
      } finally {
        if (mounted) {
          setApplicationsLoading(false);
        }
      }
    }

    loadApplications();

    return () => {
      mounted = false;
    };
  }, [selectedJobId]);

  const rankedApplications = [...applications].sort((a, b) => {
    const scoreA = getAiScore(a);
    const scoreB = getAiScore(b);
    const safeA = scoreA == null ? -Infinity : scoreA;
    const safeB = scoreB == null ? -Infinity : scoreB;
    return safeB - safeA;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <aside className="w-64 bg-white shadow-lg p-6">
          <h1 className="text-2xl font-bold text-blue-600">ITG Careers</h1>
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

            <button className="block w-full text-left p-3 rounded-lg bg-blue-600 text-white">
              Candidates
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="block w-full text-left p-3 rounded-lg hover:bg-gray-100"
            >
              Settings
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-10">
          <h1 className="text-4xl font-bold">Candidate Ranking</h1>

          <div className="flex items-center gap-4 mt-4">
            <span className="font-semibold">Select Job:</span>

            {jobsLoading ? (
              <span className="text-gray-600">Loading jobs...</span>
            ) : jobsError ? (
              <span className="text-red-600">{jobsError}</span>
            ) : jobs.length === 0 ? (
              <span className="text-gray-600">No active jobs available.</span>
            ) : (
              <select
                value={selectedJobId ?? ""}
                onChange={(e) => setSelectedJobId(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-4">Rank</th>
                  <th className="text-left p-4">Candidate</th>
                  <th className="text-left p-4">AI Match</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {applicationsLoading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-600">
                      Loading candidates...
                    </td>
                  </tr>
                ) : applicationsError ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-red-600">
                      {applicationsError}
                    </td>
                  </tr>
                ) : rankedApplications.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-600">
                      No candidates found for this job.
                    </td>
                  </tr>
                ) : (
                  rankedApplications.map((application, index) => {
                    const aiScore = getAiScore(application);
                    const medal =
                      index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1;

                    return (
                      <tr key={application.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-semibold">{medal}</td>
                        <td className="p-4 font-medium">{application.applicantName || "-"}</td>
                        <td className="p-4">{aiScore != null ? `${aiScore}%` : "-"}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${getStatusClass(application.status)}`}
                          >
                            {application.status || "-"}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => setSelectedCandidate(application)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {selectedCandidate && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="p-8 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        {selectedCandidate.applicantName || "Candidate"}
                      </h2>
                      <p className="text-gray-500 mt-2">
                        {selectedCandidate.jobName || selectedCandidate.jobTitle || selectedJob?.title || "-"}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedCandidate(null)}
                      className="text-gray-400 hover:text-gray-900 text-3xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <span className={`px-4 py-2 rounded-full ${getStatusClass(selectedCandidate.status)}`}>
                      {selectedCandidate.status || "-"}
                    </span>

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                      AI Match: {getAiScore(selectedCandidate) != null ? `${getAiScore(selectedCandidate)}%` : "-"}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold mb-5">Candidate Information</h3>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="bg-gray-50 rounded-xl p-5">
                      <p className="text-gray-500 text-sm">Candidate Name</p>
                      <p className="text-xl font-bold mt-2">
                        {selectedCandidate.applicantName || "-"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-5">
                      <p className="text-gray-500 text-sm">Job</p>
                      <p className="text-xl font-bold mt-2">
                        {selectedCandidate.jobName || selectedCandidate.jobTitle || selectedJob?.title || "-"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-5">
                      <p className="text-gray-500 text-sm">AI Match / General Score</p>
                      <p className="text-xl font-bold mt-2">
                        {getAiScore(selectedCandidate) != null ? `${getAiScore(selectedCandidate)}%` : "-"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-5">
                      <p className="text-gray-500 text-sm">Application Status</p>
                      <p className="text-xl font-bold mt-2">
                        {selectedCandidate.status || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 bg-blue-50 rounded-xl p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-bold">Overall AI Match</h3>
                        <p className="text-gray-500 text-sm mt-1">
                          General score generated by the recruitment engine.
                        </p>
                      </div>

                      <span className="text-4xl font-bold text-blue-600">
                        {getAiScore(selectedCandidate) != null ? `${getAiScore(selectedCandidate)}%` : "-"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-3">AI Recommendation</h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                      <p className="text-gray-600 leading-7">
                        {getRecommendation(getAiScore(selectedCandidate))}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t p-6 flex justify-end">
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
