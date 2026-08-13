import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
          ITG Careers
        </h1>

        

        

        {/* Login Button */}
        <div className="flex items-center gap-4">

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

</div>
      </div>
    </nav>
  );
}