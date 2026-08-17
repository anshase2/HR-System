import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicantDetailsModal from "../../components/applicant/ApplicantDetailsModal";
import {
  getApplicationById,
  getApplicationsByJob,
} from "../../services/applicationService";
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
  const [selectedCandidateLoading, setSelectedCandidateLoading] = useState(false);

  const selectedJob = jobs.find((job) => job.id === selectedJobId) || null;

  const handleCandidateStatusUpdated = (applicationId, status) => {
    setApplications((prev) =>
      prev.map((application) =>
        application.id === applicationId ? { ...application, status } : application
      )
    );

    setSelectedCandidate((prev) =>
      prev?.id === applicationId ? { ...prev, status } : prev
    );
  };

  const handleViewCandidate = async (application) => {
    if (!application?.id) return;

    setSelectedCandidateLoading(true);

    try {
      const fullApplication = await getApplicationById(application.id);
      setSelectedCandidate(fullApplication);
    } catch (error) {
      console.error("Failed to load candidate details:", error);
      setSelectedCandidate(application);
    } finally {
      setSelectedCandidateLoading(false);
    }
  };

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
                            onClick={() => handleViewCandidate(application)}
                            disabled={selectedCandidateLoading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {selectedCandidateLoading ? "Loading..." : "View Details"}
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
            <ApplicantDetailsModal
              applicant={selectedCandidate}
              onClose={() => setSelectedCandidate(null)}
              showStatusActions={true}
              onStatusUpdated={handleCandidateStatusUpdated}
            />
          )}
        </main>
      </div>
    </div>
  );
}
