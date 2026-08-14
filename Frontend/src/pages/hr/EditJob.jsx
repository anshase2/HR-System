import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobFormModal from "../../components/hr/JobFormModal";
import { getJobById, updateJob } from "../../services/jobService";

export default function EditJob() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadJob() {
      setLoading(true);
      setLoadError("");

      try {
        const response = await getJobById(id);

        if (isMounted) {
          setJob(response);
        }
      } catch (error) {
        console.error("Load job error:", error);

        if (isMounted) {
          setLoadError(
            error?.message || "Failed to load job."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (id) {
      loadJob();
    } else {
      setLoading(false);
      setLoadError("Job ID is missing.");
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmit = async (jobData) => {
    setSubmitting(true);
    setSubmitError("");

    try {
      await updateJob(id, jobData);

      navigate("/dashboard");
    } catch (error) {
      console.error("Update job error:", error);

      setSubmitError(
        error?.message ||
          "Failed to update job. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      navigate("/dashboard");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          Loading job...
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3">
            Unable to load job
          </h2>

          <p className="text-red-600 mb-6">
            {loadError}
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3">
            Job Not Found
          </h2>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <JobFormModal
        isOpen={true}
        mode="edit"
        initialJob={job}
        onClose={handleClose}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitError={submitError}
      />
    </div>
  );
}