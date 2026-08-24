import { useEffect, useState } from "react";
import EmployeeFormModal from "../../components/hr/EmployeeFormModal";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
} from "../../services/employeeService";

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
}

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  async function loadEmployees() {
    setLoading(true);
    setLoadError("");

    try {
      const response = await getEmployees();
      setEmployees(Array.isArray(response) ? response : []);
    } catch (error) {
      setEmployees([]);
      setLoadError(error?.message || "Failed to load employees.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleCreate = async (employeeData) => {
    setSubmitting(true);
    setSubmitError("");
    setFeedback("");

    try {
      const response = await createEmployee(employeeData);
      setIsCreateOpen(false);
      setFeedback(response?.message || "Employee created successfully.");
      await loadEmployees();
    } catch (error) {
      setSubmitError(error?.message || "Failed to create employee.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (employee) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    setDeletingId(employee.id);
    setFeedback("");

    try {
      const response = await deleteEmployee(employee.id);
      setFeedback(response?.message || "Employee deleted successfully.");
      await loadEmployees();
    } catch (error) {
      setFeedback(error?.message || "Failed to delete employee.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-w-0">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-4xl font-bold">Employees</h2>
              <p className="mt-2 text-gray-500">Manage employee accounts and access.</p>
            </div>
            <button onClick={() => { setSubmitError(""); setIsCreateOpen(true); }} className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white shadow hover:bg-blue-700">
              Create New Employee
            </button>
          </div>

          {feedback && <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">{feedback}</div>}
          {loadError && <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">{loadError}</div>}

          <section className="overflow-hidden rounded-xl bg-white shadow">
            {loading ? (
              <p className="p-8 text-center text-gray-500">Loading employees...</p>
            ) : employees.length === 0 ? (
              <p className="p-8 text-center text-gray-500">No employees found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead className="border-b-2 border-gray-200 bg-gray-50 text-sm text-gray-600">
                    <tr>
                      <th className="px-6 py-4 font-bold">Name</th>
                      <th className="px-6 py-4 font-bold">Email</th>
                      <th className="px-6 py-4 font-bold">Role</th>
                      <th className="px-6 py-4 font-bold">Created</th>
                      <th className="px-6 py-4 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{employee.firstName} {employee.lastName}</td>
                        <td className="px-6 py-4 text-gray-600">{employee.email}</td>
                        <td className="px-6 py-4 text-gray-600">{employee.role || "Employee"}</td>
                        <td className="px-6 py-4 text-gray-600">{formatDate(employee.createdAt)}</td>
                        <td className="space-x-3 px-6 py-4">
                          <button type="button" disabled title="Employee updates are not supported by the backend" className="text-gray-400 disabled:cursor-not-allowed">Edit</button>
                          <button type="button" disabled={deletingId === employee.id} onClick={() => handleDelete(employee)} className="text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50">
                            {deletingId === employee.id ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
      <EmployeeFormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSubmit={handleCreate} submitting={submitting} submitError={submitError} />
    </div>
  );
}