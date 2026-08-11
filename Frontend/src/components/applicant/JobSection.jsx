import { useState, useEffect } from "react";

import FilterSidebar from "./FilterSidebar";
import JobList from "./JobList";
import Pagination from "./Pagination";

export default function JobSection({
  jobs = [],
  search = "",
  department = "",
}) {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const filteredJobs = jobs.filter((job) => {

    // Search
    const searchText = search.toLowerCase();

    const matchesSearch =
      searchText === "" ||
      job.title.toLowerCase().includes(searchText) ||
      job.department.toLowerCase().includes(searchText);

    // Department search box
    const departmentText = department.toLowerCase();

    const matchesDepartmentSearch =
      departmentText === "" ||
      job.department.toLowerCase().includes(departmentText);

    // Department checkbox
    const matchesDepartment =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(job.department);

    // Employment Type checkbox
    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.includes(job.employmentType);

    // Location checkbox
    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.some((location) =>
        job.location
          .toLowerCase()
          .includes(location.toLowerCase())
      );

    // Only Active jobs
    const matchesStatus =
      job.status === "Active";

    return (
      matchesSearch &&
      matchesDepartmentSearch &&
      matchesDepartment &&
      matchesType &&
      matchesLocation &&
      matchesStatus
    );
  });

  // Reset pagination when search/filter changes
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 2;

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    department,
    selectedDepartments,
    selectedTypes,
    selectedLocations,
  ]);

  const totalPages = Math.ceil(
    filteredJobs.length / jobsPerPage
  );

  const startIndex =
    (currentPage - 1) * jobsPerPage;

  const currentJobs = filteredJobs.slice(
    startIndex,
    startIndex + jobsPerPage
  );

  return (
    <section className="max-w-7xl mx-auto py-16 px-8">

      <div className="grid grid-cols-4 gap-8">

        {/* Filters */}
        <FilterSidebar
          selectedDepartments={selectedDepartments}
          setSelectedDepartments={setSelectedDepartments}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
        />

        {/* Jobs */}
        <div className="col-span-3">

          {filteredJobs.length > 0 ? (

            <JobList jobs={currentJobs} />

          ) : (

            <div className="bg-white rounded-xl p-10 text-center shadow-sm">

              <h2 className="text-2xl font-bold text-gray-800">
                No jobs found
              </h2>

              <p className="text-gray-500 mt-2">
                Try changing your search or filters.
              </p>

            </div>

          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

        </div>

      </div>

    </section>
  );
}