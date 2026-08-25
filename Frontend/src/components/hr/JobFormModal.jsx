import { useEffect, useState } from "react";
import {
  EMPLOYMENT_TYPES,
  WORKPLACE_TYPES,
  EXPERIENCE_LEVELS,
  formatEnumLabel,
} from "../../constants/jobEnums";

const EMPTY_FORM = {
  title: "",
  description: "",
  department: "",
  location: "",
  employmentType: "FullTime",
  workplaceType: "OnSite",
  experienceLevel: "EntryLevel",
  minYearsOfExperience: 0,
  requiredSkills: "",
  closingDate: "",
  isActive: true,
};

function toDateInputValue(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 16);
}

function buildInitialForm(job) {
  if (!job) {
    return EMPTY_FORM;
  }

  return {
    title: job.title || "",
    description: job.description || "",
    department: job.department || "",
    location: job.location || "",
    employmentType: job.employmentType || "FullTime",
    workplaceType: job.workplaceType || "OnSite",
    experienceLevel: job.experienceLevel || "EntryLevel",
    minYearsOfExperience: job.minYearsOfExperience ?? 0,
    requiredSkills: Array.isArray(job.requiredSkills)
      ? job.requiredSkills.join(", ")
      : job.requiredSkills || "",
    closingDate: toDateInputValue(job.closingDate),
    isActive: job.isActive ?? true,
  };
}

export default function JobFormModal({
  isOpen,
  mode,
  initialJob,
  onClose,
  onSubmit,
  submitting,
  submitError,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setForm(buildInitialForm(initialJob));
      setValidationError("");
    }
  }, [isOpen, initialJob]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidationError("");

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.department.trim() ||
      !form.location.trim() ||
      !form.requiredSkills.trim()
    ) {
      setValidationError("Please fill in all required fields.");
      return;
    }

    onSubmit({
      ...form,
      minYearsOfExperience: Number(form.minYearsOfExperience) || 0,
      closingDate: form.closingDate
        ? new Date(form.closingDate).toISOString()
        : null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {mode === "edit" ? "Edit Job" : "Create New Job"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {(validationError || submitError) && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700 text-sm">
            {validationError || submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Department *</label>
              <select
                value={form.department}
                onChange={(e) => handleChange("department", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select Department</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Accounting">Accounting</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Engineering">Engineering</option>
                <option value="Research and Development">Research and Development</option>
                <option value="Legal">Legal</option>
                <option value="Procurement">Procurement</option>
                <option value="Administration">Administration</option>
                <option value="Business Development">Business Development</option>
                <option value="Product">Product</option>
                <option value="Project Management">Project Management</option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="Logistics">Logistics</option>
                <option value="Supply Chain">Supply Chain</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location *</label>
              <select
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select Location</option>
                <option value="Amman">Amman</option>
                <option value="Irbid">Irbid</option>
                <option value="Zarqa">Zarqa</option>
                <option value="Balqa">Balqa</option>
                <option value="Madaba">Madaba</option>
                <option value="Karak">Karak</option>
                <option value="Tafilah">Tafilah</option>
                <option value="Ma'an">Ma'an</option>
                <option value="Aqaba">Aqaba</option>
                <option value="Mafraq">Mafraq</option>
                <option value="Jerash">Jerash</option>
                <option value="Ajloun">Ajloun</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Employment Type</label>
              <select
                value={form.employmentType}
                onChange={(e) => handleChange("employmentType", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {EMPLOYMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {formatEnumLabel(type)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Workplace Type</label>
              <select
                value={form.workplaceType}
                onChange={(e) => handleChange("workplaceType", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {WORKPLACE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {formatEnumLabel(type)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Experience Level</label>
              <select
                value={form.experienceLevel}
                onChange={(e) => handleChange("experienceLevel", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {EXPERIENCE_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {formatEnumLabel(level)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Min Years of Experience</label>
              <input
                type="number"
                min="0"
                value={form.minYearsOfExperience}
                onChange={(e) =>
                  handleChange("minYearsOfExperience", e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Closing Date</label>
              <input
                type="datetime-local"
                value={form.closingDate}
                onChange={(e) => handleChange("closingDate", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Required Skills * (comma-separated)
            </label>
            <input
              type="text"
              placeholder="C#, SQL, Azure"
              value={form.requiredSkills}
              onChange={(e) => handleChange("requiredSkills", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => handleChange("isActive", e.target.checked)}
            />
            <span className="text-sm">Active posting</span>
          </label>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting
                ? "Saving..."
                : mode === "edit"
                  ? "Update Job"
                  : "Create Job"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
