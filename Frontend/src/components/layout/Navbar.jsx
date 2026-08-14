import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth.jsx";

export default function Navbar() {
  const { isAuthenticated, authUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/home");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
          ITG Careers
        </h1>

        {/* Login / User Buttons */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition"
              >
                <FaUserCircle className="text-2xl" />
                <span className="hidden sm:inline">{authUser?.firstName || authUser?.email}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="text-3xl text-gray-600 hover:text-blue-600 transition"
              >
                <FaUserCircle />
              </Link>

              <Link
                to="/login"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
