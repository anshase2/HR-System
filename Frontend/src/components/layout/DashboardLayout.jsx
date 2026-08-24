import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

export default function DashboardLayout() {
  const { authUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const buttonClass = (path) =>
    `block w-full text-left p-3 rounded-lg ${
      isActive(path)
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        <aside className="w-64 bg-white shadow-lg p-6">
          <h1 className="text-2xl font-bold text-blue-600">
            ITG Careers
          </h1>

          <hr className="my-8" />

          <nav className="space-y-3">
            <button
              onClick={() => navigate("/dashboard")}
              className={buttonClass("/dashboard")}
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/applicants")}
              className={buttonClass("/applicants")}
            >
              Applicants
            </button>

            {(authUser?.role === "Admin" || authUser?.role === "Employee") && (
              <button
                onClick={() => navigate("/my-accepted-applications")}
                className={buttonClass("/my-accepted-applications")}
              >
                My Accepted Applications
              </button>
            )}

            {authUser?.role === "Admin" && (
              <button
                onClick={() => navigate("/employees")}
                className={buttonClass("/employees")}
              >
                Employees
              </button>
            )}

            <button
              onClick={() => navigate("/candidates")}
              className={buttonClass("/candidates")}
            >
              Candidates
            </button>

            <button
              onClick={() => navigate("/settings")}
              className={buttonClass("/settings")}
            >
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="block w-full text-left p-3 rounded-lg hover:bg-gray-100"
            >
              Logout
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
