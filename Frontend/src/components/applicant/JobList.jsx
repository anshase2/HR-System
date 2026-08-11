import JobCard from "./JobCard";

export default function JobList({ jobs = [] }) {
  return (
    <>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          department={job.department}
          location={job.location}
          employmentType={job.employmentType}
          description={job.description}
        />
      ))}
    </>
  );
}