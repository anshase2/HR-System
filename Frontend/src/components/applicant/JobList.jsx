import JobCard from "./JobCard";
import jobs from "../../data/jobs";

export default function JobList() {
  return (
    <>
      {jobs.map((job) => (
        <>
 
  <JobCard
    key={job.id}
    id={job.id}
    title={job.title}
    company={job.company}
    location={job.location}
    type={job.type}
  />
</>
      ))}
    </>
  );
}