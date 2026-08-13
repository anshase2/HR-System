import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Candidates() {
const navigate = useNavigate();
const [selectedJob, setSelectedJob] = useState("Frontend Developer");
const [selectedCandidate, setSelectedCandidate] = useState(null);
const [candidateStatuses, setCandidateStatuses] = useState({
  1: "Interview",
  2: "Under Review",
  3: "New",
  4: "Rejected",
});
const jobs = [
  "Software Engineer",
  "Frontend Developer",
  "AI Engineer",
];
    const applicants = [
  {
    id: 1,
    name: "Zaid Alhmoud",
     job: "Frontend Developer",
    overall: 96,
    skills: 95,
    experience: 97,
    education: 96,
    status: "Interview",
  },
  {
    id: 2,
    name: "Ahmad Al-Najjar",
     job: "Software Engineer",
    overall: 91,
    skills: 90,
    experience: 89,
    education: 93,
    status: "Under Review",
  },
  {
    id: 3,
    name: "Omar Haddad",
     job: "AI Engineer",
    overall: 88,
    skills: 87,
    experience: 89,
    education: 88,
    status: "New",
  },
  {
    id: 4,
    name: "Lina Khalaf",
    job: "Frontend Developer",
    overall: 82,
    skills: 80,
    experience: 83,
    education: 82,
    status: "Rejected",
  },
];
const updateCandidateStatus = (id, status) => {
  setCandidateStatuses((prev) => ({
    ...prev,
    [id]: status,
  }));
};
const filteredApplicants = applicants
  .filter((applicant) => applicant.job === selectedJob)
  .sort((a, b) => b.overall - a.overall);

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

            <button onClick={() => navigate("/dashboard")}
            className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
              Dashboard
            </button>

            <button  onClick={() => navigate("/applicants")}
            className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
              Applicants
            </button>

            <button className="block w-full text-left p-3 rounded-lg bg-blue-600 text-white">
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

          <h1 className="text-4xl font-bold">
    Candidate Ranking
</h1>

<div className="flex items-center gap-4 mt-4">

  <span className="font-semibold">
    Select Job:
  </span>

  <select
    value={selectedJob}
    onChange={(e) => setSelectedJob(e.target.value)}
    className="border border-gray-300 rounded-lg px-4 py-2"
  >

    {jobs.map((job) => (

      <option key={job} value={job}>
        {job}
      </option>

    ))}

  </select>

</div>
          <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">

  <table className="w-full">

    <thead className="bg-gray-100">

      <tr>

        <th className="text-left p-4">Rank</th>

        <th className="text-left p-4">Applicant Name</th>

        <th className="text-left p-4">Overall Match</th>

        <th className="text-left p-4">Skills Score</th>

        <th className="text-left p-4">Experience Score</th>

        <th className="text-left p-4">Education Score</th>

        <th className="text-left p-4">Status</th>

        <th className="text-left p-4">Action</th>

      </tr>

    </thead>

    <tbody>

     {filteredApplicants.map((applicant, index) => (

        <tr
          key={applicant.id}
          className="border-b hover:bg-gray-50"
        >

          <td className="p-4 font-semibold">
  {index === 0
    ? "🥇"
    : index === 1
    ? "🥈"
    : index === 2
    ? "🥉"
    : index + 1}
</td>

          <td className="p-4 font-medium">
            {applicant.name}
          </td>

          <td className="p-4">
            {applicant.overall}%
          </td>

          <td className="p-4">
            {applicant.skills}%
          </td>

          <td className="p-4">
            {applicant.experience}%
          </td>

          <td className="p-4">
            {applicant.education}%
          </td>

          <td className="p-4">

  <select
    value={candidateStatuses[applicant.id]}
    onChange={(e) =>
      updateCandidateStatus(
        applicant.id,
        e.target.value
      )
    }
    className={`px-3 py-2 rounded-full text-sm border-none outline-none cursor-pointer ${
      candidateStatuses[applicant.id] === "Interview"
        ? "bg-blue-100 text-blue-700"
        : candidateStatuses[applicant.id] === "Accepted"
        ? "bg-green-100 text-green-700"
        : candidateStatuses[applicant.id] === "Rejected"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >

    <option value="New">
      New
    </option>

    <option value="Under Review">
      Under Review
    </option>

    <option value="Interview">
      Interview
    </option>

    <option value="Accepted">
      Accepted
    </option>

    <option value="Rejected">
      Rejected
    </option>

  </select>

</td>

          <td className="p-4">

           <button
  onClick={() => setSelectedCandidate(applicant)}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
>
  View Details
</button>

          </td>

        </tr>

      ))}

    </tbody>

  </table>
    {selectedCandidate && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">

    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

      {/* Header */}
      <div className="p-8 border-b">

        <div className="flex justify-between items-start">

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCandidate.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {selectedCandidate.job}
            </p>
          </div>

          <button
            onClick={() => setSelectedCandidate(null)}
            className="text-gray-400 hover:text-gray-900 text-3xl"
          >
            ×
          </button>

        </div>

        <div className="flex gap-3 mt-6">

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
            {selectedCandidate.status}
          </span>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
            Overall Match: {selectedCandidate.overall}%
          </span>

        </div>

      </div>

      {/* Scores */}
      <div className="p-8">

        <h3 className="text-xl font-bold mb-5">
          AI Candidate Analysis
        </h3>

        <div className="grid grid-cols-3 gap-5">

          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              Skills Score
            </p>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              {selectedCandidate.skills}%
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              Experience Score
            </p>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              {selectedCandidate.experience}%
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              Education Score
            </p>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              {selectedCandidate.education}%
            </p>
          </div>

        </div>

        {/* Overall */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">

          <div className="flex justify-between items-center">

            <div>
              <h3 className="text-lg font-bold">
                Overall AI Match
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                Candidate compatibility with the selected position.
              </p>
            </div>

            <span className="text-4xl font-bold text-blue-600">
              {selectedCandidate.overall}%
            </span>

          </div>

        </div>

        {/* Recommendation */}
        <div className="mt-8">

          <h3 className="text-xl font-bold mb-3">
            AI Recommendation
          </h3>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">

            {selectedCandidate.overall >= 90 ? (
              <p className="text-gray-600 leading-7">
                This candidate is a strong match for the position.
                The AI analysis indicates excellent alignment with
                the required skills, experience and educational background.
                The candidate is recommended for the interview stage.
              </p>
            ) : selectedCandidate.overall >= 80 ? (
              <p className="text-gray-600 leading-7">
                This candidate is a good match for the position.
                The candidate meets most of the required criteria
                and can be considered for further evaluation.
              </p>
            ) : (
              <p className="text-gray-600 leading-7">
                This candidate has a lower overall match score.
                Additional evaluation is recommended before proceeding
                with the recruitment process.
              </p>
            )}

          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="border-t p-6 flex justify-end">

        <button
          onClick={() => setSelectedCandidate(null)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Close
        </button>

      </div>

    </div>

  </div>
)}


</div>

        </main>

      </div>

    </div>
  );
}