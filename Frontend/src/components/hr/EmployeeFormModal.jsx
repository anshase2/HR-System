import { useEffect, useState } from "react";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  country: "",
};

export default function EmployeeFormModal({
  isOpen,
  onClose,
  onSubmit,
  submitting,
  submitError,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setForm(EMPTY_FORM);
      setValidationError("");
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidationError("");

    if (Object.values(form).some((value) => !value.trim())) {
      setValidationError("Please fill in all required fields.");
      return;
    }

    if (!/^\d+$/.test(form.phoneNumber)) {
      setValidationError("Phone number should contain digits only.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create New Employee</h2>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="text-xl text-gray-500 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close dialog"
          >
            X
          </button>
        </div>

        {(validationError || submitError) && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {validationError || submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              ["firstName", "First Name"],
              ["lastName", "Last Name"],
              ["email", "Email"],
              ["phoneNumber", "Phone Number"],
              ["country", "Country"],
            ].map(([field, label]) => (
              <div key={field} className={field === "email" ? "sm:col-span-2" : ""}>
                <label className="mb-1 block text-sm font-medium" htmlFor={field}>
                  {label} *
                </label>
                <input
                  id={field}
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={(event) => handleChange(field, event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  disabled={submitting}
                />
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            The employee will receive an email with a link to set their password.
          </p>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Creating..." : "Create Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}