import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateEmail = (value) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const handleLogin = async () => {
    setError(null);
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      const resp = await login(email, password);
      // Redirect based on role (minimal, per APIdoc roles)
      const role = resp.role;
      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
        return;
      }

      if (role === "Admin" || role === "Employee") {
        navigate("/dashboard");
      } else {
        // Applicant or other
        navigate("/home");
      }
    } catch (err) {
      // apiClient throws ApiError with message and status
      const msg = err && err.message ? err.message : "Login failed. Please try again.";
      // Special-case backend behavior: invalid credentials currently return 500 with ProblemDetails
      if (err && err.status === 500 && typeof err.details === "string" && err.details.includes("Invalid email or password")) {
        setError("Invalid email or password.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome Back
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Sign in to your ITG account
      </p>

      {error && (
        <div className="mb-4 text-sm text-red-600">{error}</div>
      )}

      {/* Email */}
      <div className="mb-5">

        <label className="block mb-2 font-medium">
          Email Address
        </label>

        <div className="relative">

          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 border border-gray-300 rounded-xl pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* Password */}
      <div className="mb-6">

        <label className="block mb-2 font-medium">
          Password
        </label>

        <div className="relative">

          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 border border-gray-300 rounded-xl pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

      </div>

      {/* Remember */}
      <div className="flex justify-between items-center mb-6">

        <label className="flex items-center gap-2 text-sm text-gray-600">

          <input type="checkbox" />

          Remember Me

        </label>

       <Link
  to="/forgot-password"
  className="text-blue-600 text-sm hover:underline"
>
  Forgot Password?
</Link>

      </div>

      {/* Login */}
      <button
        onClick={handleLogin}
        disabled={loading}
        className={`w-full h-14 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {loading ? "Signing in..." : "Login"}
      </button>

      {/* Divider */}
      <div className="flex items-center my-8">

        <div className="flex-1 h-px bg-gray-300"></div>

        <span className="px-4 text-gray-400">
          OR
        </span>

        <div className="flex-1 h-px bg-gray-300"></div>

      </div>

      {/* Register */}
      <p className="text-center text-gray-600">

        Don't have an account?

        <Link
          to="/register"
          className="text-blue-600 font-semibold ml-2 hover:underline"
        >
          Create Account
        </Link>

      </p>
    </>
  );
}