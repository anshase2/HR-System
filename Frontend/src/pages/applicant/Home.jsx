import { useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/applicant/Hero";
import JobSection from "../../components/applicant/JobSection";
import Footer from "../../components/layout/Footer";

import jobs from "../../data/jobs";

export default function Home() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedDepartment, setAppliedDepartment] = useState("");

  const handleSearch = () => {
    setAppliedSearch(search);
    setAppliedDepartment(department);
  };

  return (
    <>
      <Navbar />

      <Hero
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        onSearch={handleSearch}
      />

      <JobSection
        jobs={jobs}
        search={appliedSearch}
        department={appliedDepartment}
      />

      <Footer />
    </>
  );
}