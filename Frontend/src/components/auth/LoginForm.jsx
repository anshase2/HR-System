import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    if (email === "hr@itg.com" && password === "123456") {
  navigate("/dashboard");
} else {
  navigate("/home");
}
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome Back
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Sign in to your TalentAI account
      </p>

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

        <button className="text-blue-600 text-sm hover:underline">
          Forgot Password?
        </button>

      </div>

      {/* Login */}
      <button
        onClick={handleLogin}
        className="w-full h-14 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        Login
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