import { useEffect, useState } from "react";
import ApplicantDetailsModal from "../../components/applicant/ApplicantDetailsModal";
import { getActiveJobs } from "../../services/jobService";
import {
  getApplicationsByJob,
  getApplicationById,
  updateApplicationStatus,
} from "../../services/applicationService";

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

export default function Applicants() {
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [applicationsError, setApplicationsError] = useState("");
  const [jobApplicationCounts, setJobApplicationCounts] = useState({});
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedApplicantLoading, setSelectedApplicantLoading] = useState(false);
  const [statusUpdateError, setStatusUpdateError] = useState("");
  const [updatingApplicationIds, setUpdatingApplicationIds] = useState(new Set());

  useEffect(() => {
    let mounted = true;

    async function loadJobs() {
      setJobsLoading(true);
      setJobsError("");

      try {
        const response = await getActiveJobs();

        if (mounted) {
          setJobs(Array.isArray(response) ? response : []);
        }
      } catch (error) {
        console.error("Failed to load active jobs:", error);

        if (mounted) {
          setJobs([]);
          setJobsError(error?.message || "Failed to load jobs.");
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
    if (!jobs.length) {
      setJobApplicationCounts({});
      return;
    }

    let mounted = true;

    async function loadApplicationCounts() {
      try {
        const counts = await Promise.all(
          jobs.map(async (job) => {
            try {
              const response = await getApplicationsByJob(job.id);
              return {
                jobId: job.id,
                count: Array.isArray(response) ? response.length : 0,
              };
            } catch (error) {
              console.error(`Failed to load application count for job ${job.id}:`, error);
              return { jobId: job.id, count: 0 };
            }
          })
        );

        if (mounted) {
          const nextCounts = counts.reduce((acc, item) => {
            acc[item.jobId] = item.count;
            return acc;
          }, {});

          setJobApplicationCounts(nextCounts);
        }
      } catch (error) {
        console.error("Failed to load application counts:", error);
      }
    }

    loadApplicationCounts();

    return () => {
      mounted = false;
    };
  }, [jobs]);

  useEffect(() => {
    if (!selectedJob?.id) {
      setApplications([]);
      setApplicationsError("");
      return;
    }

    let mounted = true;

    async function loadApplications() {
      setApplicationsLoading(true);
      setApplicationsError("");

      try {
        const response = await getApplicationsByJob(selectedJob.id);

        if (mounted) {
          setApplications(Array.isArray(response) ? response : []);
        }
      } catch (error) {
        console.error("Failed to load applications for selected job:", error);

        if (mounted) {
          setApplications([]);
          setApplicationsError(error?.message || "Failed to load applications.");
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
  }, [selectedJob]);

  const exportCSV = () => {
    const rows = applications.length > 0 ? applications : [];

    const csvHeaders = [
      "Applicant Name",
      "Job Title",
      "Match Score",
      "Skills",
      "Status",
      "Date Applied",
    ];

    const csvBody = rows.map((application) => {
      const matchPercentage = application?.cvAnalysis?.matchPercentage;
      const matchedSkills = Array.isArray(application?.cvAnalysis?.matchedSkills)
        ? application.cvAnalysis.matchedSkills.join(" | ")
        : "-";

      return [
        application?.applicantName || "-",
        application?.jobName || application?.jobTitle || "-",
        matchPercentage != null ? `${matchPercentage}%` : "-",
        matchedSkills,
        application?.status || "-",
        formatDate(application?.submittedAt),
      ];
    });

    const csvContent = [csvHeaders, ...csvBody]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "ITG_Applications.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateApplicantStatus = async (applicationId, status) => {
    if (!applicationId || updatingApplicationIds.has(applicationId)) {
      return;
    }

    setStatusUpdateError("");
    setUpdatingApplicationIds((prev) => {
      const next = new Set(prev);
      next.add(applicationId);
      return next;
    });

    try {
      await updateApplicationStatus(applicationId, status);

      setApplications((prev) =>
        prev.map((application) =>
          application.id === applicationId ? { ...application, status } : application
        )
      );

      if (selectedApplicant && selectedApplicant.id === applicationId) {
        setSelectedApplicant((prev) => ({ ...prev, status }));
      }
    } catch (error) {
      console.error("Failed to update application status:", error);
      setStatusUpdateError(
        error?.message || `Failed to update application status to ${status}.`
      );
    } finally {
      setUpdatingApplicationIds((prev) => {
        const next = new Set(prev);
        next.delete(applicationId);
        return next;
      });
    }
  };

  const handleViewApplicant = async (application) => {
    if (!application?.id) return;

    setSelectedApplicantLoading(true);

    try {
      const fullApplication = await getApplicationById(application.id);
      setSelectedApplicant(fullApplication);
    } catch (error) {
      console.error("Failed to load applicant details:", error);
      setSelectedApplicant(application);
    } finally {
      setSelectedApplicantLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const normalizedTitle = titleFilter.trim().toLowerCase();
    const normalizedDepartment = departmentFilter.trim().toLowerCase();
    const normalizedLocation = locationFilter.trim().toLowerCase();

    const matchesTitle =
      !normalizedTitle ||
      (job.title || "").toLowerCase().includes(normalizedTitle);
    const matchesDepartment =
      !normalizedDepartment ||
      (job.department || "").toLowerCase().includes(normalizedDepartment);
    const matchesLocation =
      !normalizedLocation ||
      (job.location || "").toLowerCase().includes(normalizedLocation);

    return matchesTitle && matchesDepartment && matchesLocation;
  });

  return (
    <>

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-4xl font-bold">
                Applications
              </h1>

              <p className="text-gray-500 mt-2">
                Review all applications submitted for ITG vacancies.
              </p>

            </div>

            <button
  onClick={exportCSV}
  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
>
  Export CSV
</button>

          </div>

          {/* Search + Filters */}

          <div className="grid grid-cols-3 gap-5 mt-6">
            <div>
              <label htmlFor="applicants-title-filter" className="mb-2 block font-medium">
                Title
              </label>
              <input
                id="applicants-title-filter"
                type="text"
                value={titleFilter}
                onChange={(event) => setTitleFilter(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="applicants-department-filter" className="mb-2 block font-medium">
                Department
              </label>
              <select
                id="applicants-department-filter"
                value={departmentFilter}
                onChange={(event) => setDepartmentFilter(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Departments</option>
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
              <label htmlFor="applicants-location-filter" className="mb-2 block font-medium">
                Location
              </label>
              <select
                id="applicants-location-filter"
                value={locationFilter}
                onChange={(event) => setLocationFilter(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Locations</option>
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

          <div className="grid grid-cols-4 gap-5 mt-10">
            {jobsLoading ? (
              <div className="col-span-4 py-8 text-center text-gray-600">Loading jobs...</div>
            ) : jobsError ? (
              <div className="col-span-4 py-8 text-center text-red-600">{jobsError}</div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`cursor-pointer rounded-xl shadow-lg p-6 transition duration-200 ${
                    selectedJob?.id === job.id ? "bg-blue-600 text-white" : "bg-white hover:bg-blue-50"
                  }`}
                >
                  <h2 className="text-xl font-bold">{job.title}</h2>
                  <p className="mt-3">
                    {(jobApplicationCounts[job.id] ?? 0)} Applicants
                  </p>
                </div>
              ))
            )}
          </div>

          {selectedJob && (
            <h2 className="text-2xl font-bold mt-8 mb-4">
              Applicants for {selectedJob.title}
            </h2>
          )}

          {statusUpdateError && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {statusUpdateError}
            </div>
          )}

          {selectedJob && (
            <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-4">Applicant</th>
                    <th className="text-left p-4">Applied For</th>
                    <th className="text-left p-4">AI Match</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Date Applied</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {applicationsLoading ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-600">
                        Loading applications...
                      </td>
                    </tr>
                  ) : applicationsError ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-red-600">
                        {applicationsError}
                      </td>
                    </tr>
                  ) : applications.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-600">
                        No applications found for this job.
                      </td>
                    </tr>
                  ) : (
                    applications.map((application) => (
                      <tr key={application.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">{application.applicantName || "-"}</td>
                        <td className="p-4">{application.jobName || application.jobTitle || selectedJob.title}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded ${
                              application?.cvAnalysis?.matchPercentage >= 80
                                ? "bg-green-100 text-green-700"
                                : application?.cvAnalysis?.matchPercentage >= 60
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {application?.cvAnalysis?.matchPercentage != null
                              ? `${application.cvAnalysis.matchPercentage}%`
                              : "-"}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${getStatusClass(application.status)}`}
                          >
                            {application.status || "-"}
                          </span>
                        </td>
                        <td className="p-4">{formatDate(application.submittedAt)}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewApplicant(application)}
                              className="bg-blue-100 px-3 py-1 rounded hover:bg-blue-200"
                            >
                              👁
                            </button>

                            <button
                              type="button"
                              onClick={() => updateApplicantStatus(application.id, "Accepted")}
                              disabled={updatingApplicationIds.has(application.id)}
                              className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 disabled:opacity-60 disabled:cursor-not-allowed"
                              aria-label={`Accept application ${application.id}`}
                            >
                              {updatingApplicationIds.has(application.id) ? "..." : "✓"}
                            </button>

                            <button
                              type="button"
                              onClick={() => updateApplicantStatus(application.id, "Rejected")}
                              disabled={updatingApplicationIds.has(application.id)}
                              className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 disabled:opacity-60 disabled:cursor-not-allowed"
                              aria-label={`Reject application ${application.id}`}
                            >
                              {updatingApplicationIds.has(application.id) ? "..." : "✕"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <div className="mt-8 p-5 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                <p className="text-gray-600 text-sm">
                  Clicking the <strong>View</strong> button opens the applicant profile, CV,
                  AI matching summary and recruitment notes.
                </p>

                <p className="text-red-500 text-sm mt-2">
                  AI Match Score is generated by the recruitment engine and helps HR rank candidates.
                </p>
              </div>
            </div>
          )}

          {selectedApplicant && (
            <ApplicantDetailsModal
              applicant={selectedApplicant}
              onClose={() => setSelectedApplicant(null)}
            />
          )}
    </>
  );
}
              
