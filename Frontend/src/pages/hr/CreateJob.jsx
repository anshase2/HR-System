import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobFormModal from "../../components/hr/JobFormModal";
import { createJob } from "../../services/jobService";

export default function CreateJob() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (jobData) => {
    setSubmitting(true);
    setSubmitError("");

    try {
      await createJob(jobData);

      setIsOpen(false);

      // ارجع إلى صفحة الوظائف بعد نجاح الإنشاء
      navigate("/jobs");
    } catch (error) {
      console.error("Create job error:", error);

      setSubmitError(
        error?.message || "Failed to create job. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setIsOpen(false);
      navigate(-1);
    }
  };

  return (
    <JobFormModal
      isOpen={isOpen}
      mode="create"
      initialJob={null}
      onClose={handleClose}
      onSubmit={handleSubmit}
      submitting={submitting}
      submitError={submitError}
    />
  );
}