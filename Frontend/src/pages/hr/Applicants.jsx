import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Applicants() {
 const navigate = useNavigate(); 
 const [selectedJob, setSelectedJob] = useState(null);
const [selectedApplicant, setSelectedApplicant] = useState(null);
const [applicantStatuses, setApplicantStatuses] = useState({
  "Ahmad Al-Najjar": "New",
  "Lina Khalaf": "Reviewed",
  "Omar Haddad": "Rejected",
  "Dana Al-Zoubi": "Shortlisted",
});
const updateApplicantStatus = (name, status) => {
  setApplicantStatuses((prev) => ({
    ...prev,
    [name]: status,
  }));
};
const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    applicants: 24,
  },
  {
    id: 2,
    title: "Frontend Developer",
    applicants: 17,
  },
  {
    id: 3,
    title: "AI Engineer",
    applicants: 8,
  },
  {
    id: 4,
    title: "QA Engineer",
    applicants: 5,
  },
];
const exportCSV = () => {

  const data = [
    ["Applicant Name", "Job Title", "Match Score", "Skills", "Experience", "Education", "Status"],

    ["Ahmad Ali", "Software Engineer", "95%", "92%", "96%", "97%", "Interview"],

    ["Sara Omar", "Software Engineer", "91%", "90%", "89%", "95%", "Pending"],

    ["Mohammad Khaled", "Frontend Developer", "88%", "90%", "84%", "90%", "Reviewed"],

    ["Lina Hassan", "AI Engineer", "93%", "95%", "90%", "94%", "Accepted"],
  ];

  const csvContent = data.map(row => row.join(",")).join("\n");

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
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">

        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-6">

          <h1 className="text-2xl font-bold text-blue-600">
            ITG Careers
          </h1>

          <hr className="my-8" />

          <nav className="space-y-3">

            <button
               onClick={() => navigate("/dashboard")}
            className="block w-full text-left p-3 rounded-lg hover:bg-gray-100"
>
  Dashboard
</button>

            

            <button className="block w-full text-left p-3 rounded-lg bg-blue-600 text-white">
              Applications
            </button>

            <button  onClick={() => navigate("/candidates")}
            className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
              Candidates
            </button>

            <button onClick={() => navigate("/settings")}
            className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
              Settings
            </button>

          </nav>

        </aside>

        {/* Main */}

        <main className="flex-1 p-10">

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

          <div className="grid grid-cols-4 gap-5 mt-10">

  {jobs.map((job) => (

    <div
      key={job.id}
      onClick={() => setSelectedJob(job.title)}
      className={`cursor-pointer rounded-xl shadow-lg p-6 transition duration-200
      ${
        selectedJob === job.title
          ? "bg-blue-600 text-white"
          : "bg-white hover:bg-blue-50"
      }`}
    >

      <h2 className="text-xl font-bold">

        {job.title}

      </h2>

      <p className="mt-3">

        {job.applicants} Applicants

      </p>

    </div>

  ))}

</div>

          {selectedJob && (
  <h2 className="text-2xl font-bold mt-8 mb-4">
    Applicants for {selectedJob}
  </h2>
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

               {(selectedJob === "" || selectedJob === "Software Engineer") && (

<tr className="border-b hover:bg-gray-50">

  <td className="p-4">Ahmad Al-Najjar</td>

  <td className="p-4">
    Software Engineer
  </td>

  <td className="p-4">
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
      92%
    </span>
  </td>

  <td className="p-4">
    <span
  className={`px-3 py-1 rounded-full text-sm ${
    applicantStatuses["Ahmad Al-Najjar"] === "Accepted"
      ? "bg-green-100 text-green-700"
      : applicantStatuses["Ahmad Al-Najjar"] === "Rejected"
      ? "bg-red-100 text-red-700"
      : "bg-blue-100 text-blue-700"
  }`}
>
  {applicantStatuses["Ahmad Al-Najjar"]}
</span>
  </td>

  <td className="p-4">
    Today
  </td>

  <td className="p-4">

    <div className="flex gap-2">

      <button
  onClick={() =>
    setSelectedApplicant({
      name: "Ahmad Al-Najjar",
      job: "Software Engineer",
      match: "92%",
      status: "New",
      date: "Today",
      email: "ahmad.alnajjar@example.com",
      phone: "+962 7 9000 0000",
      experience: "3 Years",
      education: "B.Sc. in Software Engineering",
      skills: ["React.js", "JavaScript", "Node.js", "REST APIs", "Git"],
      summary:
        "Strong match for the Software Engineer position. The candidate demonstrates good experience in React.js, JavaScript and REST APIs.",
      notes:
        "Candidate has a strong technical background and should be considered for an initial interview.",
    })
  }
  className="bg-blue-100 px-3 py-1 rounded hover:bg-blue-200"
>
  👁
</button>

      <button
  onClick={() =>
    updateApplicantStatus("Ahmad Al-Najjar", "Accepted")
  }
  className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
>
  ✓
</button>

<button
  onClick={() =>
    updateApplicantStatus("Ahmad Al-Najjar", "Rejected")
  }
  className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
>
  ✕
</button>

    </div>

  </td>

</tr>
)}

{(selectedJob === "" || selectedJob === "Frontend Developer") && (

<tr className="border-b hover:bg-gray-50">

  <td className="p-4">Lina Khalaf</td>

  <td className="p-4">
    Frontend Developer
  </td>

  <td className="p-4">
    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded">
      76%
    </span>
  </td>

  <td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-sm ${
      applicantStatuses["Lina Khalaf"] === "Accepted"
        ? "bg-green-100 text-green-700"
        : applicantStatuses["Lina Khalaf"] === "Rejected"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {applicantStatuses["Lina Khalaf"]}
  </span>
</td>

  <td className="p-4">
    Yesterday
  </td>

  <td className="p-4">

    <div className="flex gap-2">

      <button
  onClick={() =>
    setSelectedApplicant({
      name: "Lina Khalaf",
      job: "Frontend Developer",
      match: "76%",
      status: "Reviewed",
      date: "Yesterday",
      email: "lina.khalaf@example.com",
      phone: "+962 7 9000 0000",
      experience: "2 Years",
      education: "B.Sc. in Computer Science",
      skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
      summary:
        "The candidate has good frontend development skills with relevant React experience, but has some gaps compared to the ideal profile.",
      notes:
        "Application reviewed by HR. Consider technical assessment before proceeding.",
    })
  }
  className="bg-blue-100 px-3 py-1 rounded hover:bg-blue-200"
>
  👁
</button>

     <button
  onClick={() =>
    updateApplicantStatus("Lina Khalaf", "Accepted")
  }
  className="bg-green-100 px-3 py-1 rounded hover:bg-green-200"
>
  ✓
</button>

<button
  onClick={() =>
    updateApplicantStatus("Lina Khalaf", "Rejected")
  }
  className="bg-red-100 px-3 py-1 rounded hover:bg-red-200"
>
  ✕
</button>
    </div>

  </td>

</tr>
)}

{(selectedJob === "" || selectedJob === "AI Engineer") && (

<tr className="border-b hover:bg-gray-50">

  <td className="p-4">Omar Haddad</td>

  <td className="p-4">
    AI Engineer
  </td>

  <td className="p-4">
    <span className="bg-red-100 text-red-700 px-3 py-1 rounded">
      54%
    </span>
  </td>

  <td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-sm ${
      applicantStatuses["Omar Haddad"] === "Accepted"
        ? "bg-green-100 text-green-700"
        : applicantStatuses["Omar Haddad"] === "Rejected"
        ? "bg-red-100 text-red-700"
        : "bg-blue-100 text-blue-700"
    }`}
  >
    {applicantStatuses["Omar Haddad"]}
  </span>
</td>

  <td className="p-4">
    2 Days Ago
  </td>

  <td className="p-4">

    <div className="flex gap-2">

      <button
  onClick={() =>
    setSelectedApplicant({
      name: "Omar Haddad",
      job: "AI Engineer",
      match: "54%",
      status: "Rejected",
      date: "2 Days Ago",
      email: "omar.haddad@example.com",
      phone: "+962 7 9000 0000",
      experience: "1 Year",
      education: "B.Sc. in Artificial Intelligence",
      skills: ["Python", "Machine Learning", "TensorFlow"],
      summary:
        "The candidate has basic AI and machine learning knowledge but does not currently meet several key requirements for the position.",
      notes:
        "Low AI match score. Candidate was rejected based on the current recruitment criteria.",
    })
  }
  className="bg-blue-100 px-3 py-1 rounded hover:bg-blue-200"
>
  👁
</button>

     <button
  onClick={() =>
    updateApplicantStatus("Omar Haddad", "Accepted")
  }
  className="bg-green-100 px-3 py-1 rounded hover:bg-green-200"
>
  ✓
</button>

<button
  onClick={() =>
    updateApplicantStatus("Omar Haddad", "Rejected")
  }
  className="bg-red-100 px-3 py-1 rounded hover:bg-red-200"
>
  ✕
</button>

    </div>

  </td>

</tr>
)}

{(selectedJob === "" || selectedJob === "QA Engineer") && (

<tr>

  <td className="p-4">Dana Al-Zoubi</td>

  <td className="p-4">
    QA Engineer
  </td>

  <td className="p-4">
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
      88%
    </span>
  </td>

  <td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-sm ${
      applicantStatuses["Dana Al-Zoubi"] === "Accepted"
        ? "bg-green-100 text-green-700"
        : applicantStatuses["Dana Al-Zoubi"] === "Rejected"
        ? "bg-red-100 text-red-700"
        : "bg-blue-100 text-blue-700"
    }`}
  >
    {applicantStatuses["Dana Al-Zoubi"]}
  </span>
</td>

  <td className="p-4">
    3 Days Ago
  </td>

  <td className="p-4">

    <div className="flex gap-2">

      <button
  onClick={() =>
    setSelectedApplicant({
      name: "Dana Al-Zoubi",
      job: "QA Engineer",
      match: "88%",
      status: "Shortlisted",
      date: "3 Days Ago",
      email: "dana.alzoubi@example.com",
      phone: "+962 7 9000 0000",
      experience: "3 Years",
      education: "B.Sc. in Software Engineering",
      skills: ["Manual Testing", "Selenium", "Automation Testing", "Jira"],
      summary:
        "Strong candidate for the QA Engineer position with relevant testing and automation experience.",
      notes:
        "Candidate is shortlisted and recommended for the next recruitment stage.",
    })
  }
  className="bg-blue-100 px-3 py-1 rounded hover:bg-blue-200"
>
  👁
</button>

     <button
  onClick={() =>
    updateApplicantStatus("Dana Al-Zoubi", "Accepted")
  }
  className="bg-green-100 px-3 py-1 rounded hover:bg-green-200"
>
  ✓
</button>

<button
  onClick={() =>
    updateApplicantStatus("Dana Al-Zoubi", "Rejected")
  }
  className="bg-red-100 px-3 py-1 rounded hover:bg-red-200"
>
  ✕
</button>
    </div>

  </td>

</tr>
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
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">

    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

      {/* Header */}
      <div className="p-8 border-b">

        <div className="flex justify-between items-start">

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedApplicant.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {selectedApplicant.job}
            </p>
          </div>

          <button
            onClick={() => setSelectedApplicant(null)}
            className="text-gray-400 hover:text-gray-900 text-3xl"
          >
            ×
          </button>

        </div>

        {/* Match + Status */}
        <div className="flex gap-3 mt-6">

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
            AI Match: {selectedApplicant.match}
          </span>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
            {selectedApplicant.status}
          </span>

        </div>

      </div>

      {/* Profile Information */}
      <div className="p-8">

        <h3 className="text-xl font-bold mb-5">
          Applicant Information
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-medium mt-1">
              {selectedApplicant.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p className="font-medium mt-1">
              {selectedApplicant.phone}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Experience
            </p>

            <p className="font-medium mt-1">
              {selectedApplicant.experience}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Education
            </p>

            <p className="font-medium mt-1">
              {selectedApplicant.education}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Date Applied
            </p>

            <p className="font-medium mt-1">
              {selectedApplicant.date}
            </p>
          </div>

        </div>

        {/* Skills */}
        <div className="mt-8">

          <h3 className="text-xl font-bold mb-4">
            Skills
          </h3>

          <div className="flex flex-wrap gap-2">

            {selectedApplicant.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

        {/* CV */}
        <div className="mt-8">

          <h3 className="text-xl font-bold mb-4">
            CV
          </h3>

          <div className="border border-gray-200 rounded-lg p-5 flex justify-between items-center">

            <div>
              <p className="font-medium">
                {selectedApplicant.name} - CV.pdf
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Applicant Resume
              </p>
            </div>

            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              onClick={() =>
                alert("CV preview will be connected to the backend later.")
              }
            >
              View CV
            </button>

          </div>

        </div>

        {/* AI Matching */}
        <div className="mt-8">

          <h3 className="text-xl font-bold mb-4">
            AI Matching Summary
          </h3>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">

            <div className="flex justify-between items-center mb-3">

              <span className="font-semibold">
                AI Match Score
              </span>

              <span className="text-2xl font-bold text-blue-600">
                {selectedApplicant.match}
              </span>

            </div>

            <p className="text-gray-600 leading-7">
              {selectedApplicant.summary}
            </p>

          </div>

        </div>

        {/* Recruitment Notes */}
        <div className="mt-8">

          <h3 className="text-xl font-bold mb-4">
            Recruitment Notes
          </h3>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">

            <p className="text-gray-600 leading-7">
              {selectedApplicant.notes}
            </p>

          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="border-t p-6 flex justify-end">

        <button
          onClick={() => setSelectedApplicant(null)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Close
        </button>

      </div>

    </div>

  </div>
)}
</main>

</div>

</div>
  );
}
              