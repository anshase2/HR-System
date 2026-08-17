import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { applyForJob } from "../../services/applicationService";
import { ApiError } from "../../services/apiClient";

export default function ApplicationForm() {
  const navigate = useNavigate();
  const { jobId, id } = useParams();
  const resolvedJobId = Number(jobId ?? id ?? "");

  const [coverLetter, setCoverLetter] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!Number.isInteger(resolvedJobId) || resolvedJobId <= 0) {
      setError("Invalid job selected.");
      return;
    }

    if (!cvFile) {
      setError("Please upload a CV or resume before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("JobId", String(resolvedJobId));

    if (coverLetter.trim()) {
      formData.append("CoverLetter", coverLetter.trim());
    }

    formData.append("CvUrl", cvFile);

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await applyForJob(formData);

      setSuccess("Application submitted successfully.");

      window.setTimeout(() => {
        navigate(`/jobs/${resolvedJobId}`);
      }, 1200);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message || "Unable to submit application. Please try again.");
      } else {
        setError("Unable to submit application. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        <button
          type="button"
          onClick={() => navigate(`/jobs/${resolvedJobId}`)}
          className="mb-6 text-blue-600 font-semibold hover:text-blue-700 transition"
        >
          ← Back to Job Details
        </button>

        <p className="text-blue-600 font-semibold mb-2">
          Applying for Job #{resolvedJobId || "N/A"}
        </p>

        <h1 className="text-4xl font-bold text-gray-800">Job Application</h1>

        <p className="text-gray-500 mt-2 mb-8">
          Upload your CV and add a brief cover letter to apply for this role.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 font-medium">Upload CV / Resume</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="w-full border rounded-xl p-3"
              onChange={(event) => setCvFile(event.target.files?.[0] || null)}
            />
            {cvFile && (
              <p className="mt-2 text-sm text-gray-600">Selected file: {cvFile.name}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="coverLetter" className="block mb-2 font-medium">
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              rows="6"
              value={coverLetter}
              onChange={(event) => setCoverLetter(event.target.value)}
              placeholder="Tell us why you're a good fit for this role..."
              className="w-full border rounded-xl p-4 resize-none"
            />
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white h-14 rounded-xl font-semibold"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
