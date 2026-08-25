import { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaUserCircle } from "react-icons/fa";
import { getMyProfile } from "../../services/applicantService";
import { getMyApplications } from "../../services/applicationService";

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [applicationsError, setApplicationsError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        const response = await getMyProfile();

        if (mounted) setProfile(response);
      } catch (error) {
        console.error("Failed to load applicant profile:", error);

        if (mounted) {
          setProfileError(error?.message || "Failed to load your profile.");
        }
      } finally {
        if (mounted) setProfileLoading(false);
      }
    }

    async function loadApplications() {
      try {
        const response = await getMyApplications();

        if (mounted) setApplications(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Failed to load applicant applications:", error);

        if (mounted) {
          setApplicationsError(error?.message || "Failed to load your applications.");
        }
      } finally {
        if (mounted) setApplicationsLoading(false);
      }
    }

    loadProfile();
    loadApplications();

    return () => {
      mounted = false;
    };
  }, []);

  const fullName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center gap-8">
          <FaUserCircle className="text-[120px] text-blue-600" />

          <div>
            <h1 className="text-4xl font-bold">
              {profileLoading ? "Loading..." : fullName || "-"}
            </h1>
          </div>
        </div>

        <section className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="mb-6 text-2xl font-bold">Personal Information</h2>

          {profileLoading ? (
            <p className="text-gray-600">Loading personal information...</p>
          ) : profileError ? (
            <p className="text-red-600">{profileError}</p>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <FaUserCircle className="text-blue-600" />
                <span>First Name: {profile?.firstName || "-"}</span>
              </div>
              <div className="flex items-center gap-4">
                <FaUserCircle className="text-blue-600" />
                <span>Last Name: {profile?.lastName || "-"}</span>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-blue-600" />
                <span>Email: {profile?.email || "-"}</span>
              </div>
              <div className="flex items-center gap-4">
                <FaPhone className="text-blue-600" />
                <span>Phone Number: {profile?.phoneNumber || "-"}</span>
              </div>
            </div>
          )}
        </section>

        <section className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="mb-6 text-2xl font-bold">My Applications</h2>

          {applicationsLoading ? (
            <p className="text-gray-600">Loading applications...</p>
          ) : applicationsError ? (
            <p className="text-red-600">{applicationsError}</p>
          ) : applications.length === 0 ? (
            <p className="text-gray-600">You haven&apos;t submitted any applications yet.</p>
          ) : (
            <div className="divide-y">
              {applications.map((application) => (
                <div key={application.id} className="py-5 first:pt-0 last:pb-0">
                  <h3 className="font-semibold">{application.jobTitle || "-"}</h3>
                  <p className="mt-1 text-gray-500">
                    Submitted: {formatDate(application.submittedAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
