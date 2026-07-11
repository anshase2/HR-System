import FilterSidebar from "./FilterSidebar";
import JobList from "./JobList";
import Pagination from "./Pagination";

export default function JobSection() {
  return (
    <section className="max-w-7xl mx-auto py-16 px-8">

      <div className="grid grid-cols-4 gap-8">

        <FilterSidebar />

        <div className="col-span-3">

          <JobList />

          <Pagination />

        </div>

      </div>

    </section>
  );
}