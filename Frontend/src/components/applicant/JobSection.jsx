import { useCallback, useEffect, useMemo, useState } from "react";
import { getActiveJobs, getJobs } from "../../services/jobService";
import { ApiError } from "../../services/apiClient";
import FilterSidebar from "./FilterSidebar";
import JobList from "./JobList";
import Pagination from "./Pagination";

const JOBS_PER_PAGE = 5;

const EMPTY_FILTERS = {
  department: "",
  location: "",
  employmentType: "",
  workplaceType: "",
  experience: "",
};

function filterJobsBySearch(jobs, searchQuery) {
  const query = searchQuery.trim().toLowerCase();

  if (!query) {
    return jobs;
  }

  return jobs.filter((job) => {
    const title = job.title?.toLowerCase() || "";
    const description = job.description?.toLowerCase() || "";
    const department = job.department?.toLowerCase() || "";

    return (
      title.includes(query) ||
      description.includes(query) ||
      department.includes(query)
    );
  });
}

function applyClientFilters(jobs, filters) {
  return jobs.filter((job) => {
    if (filters.department && job.department !== filters.department) {
      return false;
    }

    if (filters.location && job.location !== filters.location) {
      return false;
    }

    if (
      filters.employmentType &&
      job.employmentType !== filters.employmentType
    ) {
      return false;
    }

    if (
      filters.workplaceType &&
      job.workplaceType !== filters.workplaceType
    ) {
      return false;
    }

    if (filters.experience && job.experienceLevel !== filters.experience) {
      return false;
    }

    return true;
  });
}

export default function JobSection({
  activeOnly = true,
  searchQuery = "",
}) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      let data;

      if (activeOnly) {
        data = await getActiveJobs();
      } else {
        const apiFilters = { ...filters };

        Object.keys(apiFilters).forEach((key) => {
          if (!apiFilters[key]) {
            delete apiFilters[key];
          }
        });

        data = await getJobs(apiFilters);
      }

      setAllJobs(data);
      setCurrentPage(1);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof TypeError) {
        setError(
          "Network error. Please check your connection and try again."
        );
      } else {
        setError("Failed to load jobs. Please try again.");
      }

      setAllJobs([]);
    } finally {
      setLoading(false);
    }
  }, [activeOnly, filters]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const jobs = useMemo(() => {
    const filtered = activeOnly
      ? applyClientFilters(allJobs, filters)
      : allJobs;

    return filterJobsBySearch(filtered, searchQuery);
  }, [activeOnly, allJobs, filters, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(jobs.length / JOBS_PER_PAGE)
  );

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * JOBS_PER_PAGE;

    return jobs.slice(start, start + JOBS_PER_PAGE);
  }, [jobs, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const handleFilterChange = (nextFilters) => {
    setFilters(nextFilters);
  };

  const handleClearFilters = () => {
    setFilters(EMPTY_FILTERS);
  };

  return (
    <section className="max-w-7xl mx-auto py-16 px-8">
      <div className="grid grid-cols-4 gap-8">
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <div className="col-span-3">
          {!loading && !error && (
            <p className="text-gray-600 mb-4">
              {jobs.length} job{jobs.length === 1 ? "" : "s"} found
            </p>
          )}

          <JobList
            jobs={paginatedJobs}
            loading={loading}
            error={error}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}