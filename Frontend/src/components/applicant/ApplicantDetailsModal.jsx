import { useEffect, useState } from "react";
import { updateApplicationStatus } from "../../services/applicationService";

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusClass = (status) => {
  const normalized = (status || "").toLowerCase();

  if (normalized.includes("accept")) {
    return "bg-green-100 text-green-700";
  }

  if (normalized.includes("reject")) {
    return "bg-red-100 text-red-700";
  }

  if (normalized.includes("review") || normalized.includes("shortlist")) {
    return "bg-yellow-100 text-yellow-700";
  }

  return "bg-blue-100 text-blue-700";
};

export default function ApplicantDetailsModal({
  applicant,
  onClose,
  showStatusActions = false,
  onStatusUpdated,
}) {
  const [localStatus, setLocalStatus] = useState(applicant?.status || "");
  const [statusError, setStatusError] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    setLocalStatus(applicant?.status || "");
    setStatusError("");
  }, [applicant?.status]);

  const handleStatusUpdate = async (nextStatus) => {
    if (!applicant?.id || isUpdatingStatus) return;

    setStatusError("");
    setIsUpdatingStatus(true);

    try {
      await updateApplicationStatus(applicant.id, nextStatus);
      setLocalStatus(nextStatus);
      onStatusUpdated?.(applicant.id, nextStatus);
    } catch (error) {
      console.error("Failed to update application status:", error);
      setStatusError(error?.message || `Failed to update application status to ${nextStatus}.`);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (!applicant) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-8 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {applicant.applicantName || "Applicant"}
              </h2>

              <p className="text-gray-500 mt-2">
                {applicant.jobName || applicant.jobTitle || "-"}
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-900 text-3xl"
            >
              ×
            </button>
          </div>

          <div className="flex gap-3 mt-6">
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
              AI Match: {applicant?.cvAnalysis?.matchPercentage != null ? `${applicant.cvAnalysis.matchPercentage}%` : "-"}
            </span>

            <span className={`px-4 py-2 rounded-full ${getStatusClass(localStatus)}`}>
              {localStatus || "-"}
            </span>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-xl font-bold mb-5">Applicant Information</h3>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium mt-1">{applicant.applicantEmail || "-"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Applicant ID</p>
              <p className="font-medium mt-1">{applicant.applicantId ?? "-"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Application ID</p>
              <p className="font-medium mt-1">{applicant.id ?? "-"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Date Applied</p>
              <p className="font-medium mt-1">{formatDate(applicant.submittedAt)}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Skills</h3>

            <div className="flex flex-wrap gap-2">
              {Array.isArray(applicant?.cvAnalysis?.matchedSkills) && applicant.cvAnalysis.matchedSkills.length > 0 ? (
                applicant.cvAnalysis.matchedSkills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">-</span>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">CV</h3>

            <div className="border border-gray-200 rounded-lg p-5 flex justify-between items-center">
              <div>
                <p className="font-medium">{applicant.applicantName || "Applicant"} CV</p>
                <p className="text-sm text-gray-500 mt-1">
                  {applicant.cvUrl || "CV file not available."}
                </p>
              </div>

              {applicant.cvUrl ? (
                <a
                  href={applicant.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  View CV
                </a>
              ) : (
                <span className="text-gray-500">-</span>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">AI Matching Summary</h3>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold">AI Match Score</span>
                <span className="text-2xl font-bold text-blue-600">
                  {applicant?.cvAnalysis?.matchPercentage != null ? `${applicant.cvAnalysis.matchPercentage}%` : "-"}
                </span>
              </div>

              <p className="text-gray-600 leading-7">
                {applicant?.cvAnalysis?.aiEvaluationSummary || "No AI evaluation summary available."}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Recruitment Notes</h3>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <p className="text-gray-600 leading-7">
                {applicant?.cvAnalysis?.recommendation || "No recommendation available."}
              </p>
            </div>
          </div>

          {statusError && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {statusError}
            </div>
          )}
        </div>

        <div className="border-t p-6 flex justify-end gap-3">
          {showStatusActions && (
            <>
              <button
                type="button"
                onClick={() => handleStatusUpdate("Accepted")}
                disabled={isUpdatingStatus}
                className="bg-green-100 text-green-700 px-5 py-3 rounded-lg hover:bg-green-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isUpdatingStatus ? "..." : "✓ Accept"}
              </button>

              <button
                type="button"
                onClick={() => handleStatusUpdate("Rejected")}
                disabled={isUpdatingStatus}
                className="bg-red-100 text-red-700 px-5 py-3 rounded-lg hover:bg-red-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isUpdatingStatus ? "..." : "✕ Reject"}
              </button>
            </>
          )}

          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
