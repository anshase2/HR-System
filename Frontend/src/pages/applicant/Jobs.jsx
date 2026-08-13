import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import JobSection from "../../components/applicant/JobSection";
import Footer from "../../components/layout/Footer";

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900">
          All Job Openings
        </h1>

        <p className="text-gray-500 mt-2">
          Browse and filter all job postings from the ITG careers platform.
        </p>

        <div className="mt-6 max-w-xl">
          <input
            type="text"
            placeholder="Search job titles or descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <JobSection activeOnly={false} searchQuery={searchQuery} />

      <Footer />
    </>
  );
}