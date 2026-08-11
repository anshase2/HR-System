import SearchBar from "../../components/applicant/SearchBar";
import FilterSidebar from "../../components/applicant/FilterSidebar";
import JobList from "../../components/applicant/JobList";
import Pagination from "../../components/applicant/Pagination";

import { useState } from "react";
import jobs from "../../data/jobs";
export default function Jobs() {

 const [search, setSearch] = useState("");
const [department, setDepartment] = useState("");

const [selectedDepartments, setSelectedDepartments] = useState([]);
const [selectedTypes, setSelectedTypes] = useState([]);
const [selectedLocations, setSelectedLocations] = useState([]);

const [filteredJobs, setFilteredJobs] = useState(jobs);

const handleSearch = () => {
  const results = jobs.filter((job) => {

    const matchesSearch =
      search === "" ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchesDepartmentSearch =
      department === "" ||
      job.department.toLowerCase().includes(department.toLowerCase());

    const matchesDepartmentFilter =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(job.department);

    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.includes(job.type);

    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.some((location) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );

    return (
      matchesSearch &&
      matchesDepartmentSearch &&
      matchesDepartmentFilter &&
      matchesType &&
      matchesLocation
    );
  });

  setFilteredJobs(results);
};
  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-gray-900">
            Open Positions
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Explore exciting career opportunities at Integrated Technology Group.
          </p>

        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar 
           search={search}
  setSearch={setSearch}
  department={department}
  setDepartment={setDepartment}
  onSearch={handleSearch}
          />
        </div>

        {/* Content */}
        <div className="grid grid-cols-12 gap-8">

          {/* Filters */}
          <div className="col-span-3">
            <FilterSidebar />
          </div>

          {/* Jobs */}
          <div className="col-span-9">

           <JobList jobs={filteredJobs} />

            <div className="mt-8 flex justify-center">
              <Pagination />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}