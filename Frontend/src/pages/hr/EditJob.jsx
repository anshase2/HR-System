import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jobs from "../../data/jobs";

export default function EditJob() {
  const navigate = useNavigate();
  const { id } = useParams();

  const existingJob = jobs.find(
    (item) => item.id === Number(id)
  );

  const [job, setJob] = useState(
    existingJob
      ? {
          title: existingJob.title,
          department: existingJob.department,
          employmentType: existingJob.employmentType,
          location: existingJob.location,
          description: existingJob.description,
          requiredSkills: existingJob.requiredSkills.join(", "),
          salary: existingJob.salary,
          deadline: existingJob.deadline,
          status: existingJob.status,
        }
      : {
          title: "",
          department: "",
          employmentType: "Full-Time",
          location: "Amman",
          description: "",
          requiredSkills: "",
          salary: "",
          deadline: "",
          status: "Active",
        }
  );

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert("Job changes saved successfully.");
  };

  if (!existingJob) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Job Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-4xl font-bold">
              Edit Job
            </h1>

            <p className="text-gray-500 mt-2">
              Update the job information before publishing.
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline"
          >
            ← Back
          </button>

        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-6">

          {/* Job Title */}
          <div>
            <label className="block font-medium mb-2">
              Job Title
            </label>

            <input
              type="text"
              name="title"
              value={job.title}
              onChange={handleChange}
              placeholder="Software Engineer"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block font-medium mb-2">
              Department
            </label>

            <select
              name="department"
              value={job.department}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option>Software Engineering</option>
              <option>Frontend Development</option>
              <option>Artificial Intelligence</option>
              <option>Cybersecurity</option>
              <option>QA Engineering</option>
            </select>
          </div>

          {/* Employment Type */}
          <div>
            <label className="block font-medium mb-2">
              Employment Type
            </label>

            <select
              name="employmentType"
              value={job.employmentType}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>

          {/* Work Location */}
          <div>
            <label className="block font-medium mb-2">
              Work Location
            </label>

            <select
              name="location"
              value={job.location}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option>Amman</option>
            </select>
          </div>

        </div>

        {/* Description */}
        <div className="mt-8">

          <label className="block font-medium mb-2">
            Job Description
          </label>

          <textarea
            rows="5"
            name="description"
            value={job.description}
            onChange={handleChange}
            placeholder="Describe the position..."
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Required Skills */}
        <div className="mt-8">

          <label className="block font-medium mb-2">
            Required Skills
          </label>

          <textarea
            rows="4"
            name="requiredSkills"
            value={job.requiredSkills}
            onChange={handleChange}
            placeholder="React, Node.js, SQL..."
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Salary + Deadline */}
        <div className="grid grid-cols-2 gap-6 mt-8">

          {/* Salary */}
          <div>

            <label className="block font-medium mb-2">
              Salary Range
            </label>

            <input
              type="text"
              name="salary"
              value={job.salary}
              onChange={handleChange}
              placeholder="800 - 1200 JOD"
              className="w-full border rounded-lg p-3"
            />

          </div>

          {/* Deadline */}
          <div>

            <label className="block font-medium mb-2">
              Application Deadline
            </label>

            <input
              type="date"
              name="deadline"
              value={job.deadline}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

        </div>

        {/* Status */}
        <div className="mt-8">

          <label className="block font-medium mb-2">
            Status
          </label>

          <select
            name="status"
            value={job.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Active</option>
            <option>Draft</option>
            <option>Closed</option>
          </select>

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-10">

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}