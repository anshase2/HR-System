import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaFilePdf } from "react-icons/fa";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center gap-8">

          <FaUserCircle className="text-[120px] text-blue-600" />

          <div>

            <h1 className="text-4xl font-bold">
              Zaid Alhmoud
            </h1>

            <p className="text-gray-500 mt-2">
              Frontend Developer
            </p>

            <button className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
              Edit Profile
            </button>

          </div>

        </div>

        {/* Information */}
        <div className="grid grid-cols-2 gap-8 mt-8">

          {/* Personal */}
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">
              Personal Information
            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-blue-600" />
                zaid@example.com
              </div>

              <div className="flex items-center gap-4">
                <FaPhone className="text-blue-600" />
                +962 7XXXXXXXX
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-blue-600" />
                Irbid, Jordan
              </div>

            </div>

          </div>

          {/* Professional */}
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">
              Professional Information
            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-4">
                <FaBriefcase className="text-blue-600" />
                2 Years Experience
              </div>

              <div className="flex items-center gap-4">
                <FaGraduationCap className="text-blue-600" />
                Software Engineering
              </div>

              <div>
                <h3 className="font-semibold mb-2">
                  Skills
                </h3>

                <div className="flex flex-wrap gap-2">

                  <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full">
                    React
                  </span>

                  <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full">
                    JavaScript
                  </span>

                  <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full">
                    Tailwind CSS
                  </span>

                  <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full">
                    Git
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Resume */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Resume
          </h2>

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <FaFilePdf className="text-red-600 text-3xl" />

              Resume.pdf

            </div>

            <button className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700">
              Download Resume
            </button>

          </div>

        </div>

        {/* Applications */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            My Applications
          </h2>

          <table className="w-full">

            <thead>

              <tr className="text-left border-b">

                <th className="pb-4">Job</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="py-5">
                  Frontend Developer
                </td>

                <td className="text-yellow-600">
                  Under Review
                </td>

              </tr>

              <tr className="border-b">

                <td className="py-5">
                  UI/UX Designer
                </td>

                <td className="text-green-600">
                  Accepted
                </td>

              </tr>

              <tr>

                <td className="py-5">
                  Backend Developer
                </td>

                <td className="text-red-600">
                  Rejected
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}