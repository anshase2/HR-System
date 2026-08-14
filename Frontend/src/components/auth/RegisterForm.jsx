import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { register } from "../../services/authService";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { login, setAuthSession } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Jordan");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const countryCodes = {
    Jordan: "+962",
    "Saudi Arabia": "+966",
    "United Arab Emirates": "+971",
    Qatar: "+974",
    Kuwait: "+965",
    Bahrain: "+973",
    Oman: "+968",
    Egypt: "+20",
    Iraq: "+964",
    Lebanon: "+961",
  };

  const handleRegister = async () => {
    setError("");

    if (!fullName.trim() || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    const nameParts = fullName.trim().split(/\s+/);
    if (nameParts.length < 2) {
      setError("Please enter both your first name and last name.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    if (submitting) return;

    setSubmitting(true);

    try {
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");
      const phoneNumber = phone.replace(/\D/g, "");

      const registrationResponse = await register({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        country,
        confirmPassword,
      });

      let authResponse = registrationResponse;

      if (!authResponse?.token) {
        authResponse = await login(email, password);
      }

      if (!authResponse?.token) {
        throw new Error("Registration succeeded, but authentication could not be completed.");
      }

      setAuthSession(authResponse);

      const role = authResponse?.role;
      if (role === "Admin" || role === "Employee") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      const msg = err?.message || "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800">
        Create Account
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Create your ITG account
      </p>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Full Name */}
      <div className="mb-5">

        <label className="block mb-2 font-medium">
          Full Name
        </label>

        <div className="relative">

          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full h-14 border border-gray-300 rounded-xl pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

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

      {/* Country */}
      <div className="mb-5">

        <label className="block mb-2 font-medium">
          Country
        </label>

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full h-14 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Jordan</option>
          <option>Saudi Arabia</option>
          <option>United Arab Emirates</option>
          <option>Qatar</option>
          <option>Kuwait</option>
          <option>Bahrain</option>
          <option>Oman</option>
          <option>Egypt</option>
          <option>Iraq</option>
          <option>Lebanon</option>
        </select>

      </div>
      {/* Phone Number */}
      <div className="mb-5">

        <label className="block mb-2 font-medium">
          Phone Number
        </label>

        <div className="flex">

          <div className="w-24 h-14 border border-gray-300 rounded-l-xl bg-gray-100 flex items-center justify-center font-medium text-gray-700">
            {countryCodes[country]}
          </div>

          <input
            type="tel"
            placeholder="7XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 h-14 border border-l-0 border-gray-300 rounded-r-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* Password */}
      <div className="mb-5">

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

      {/* Confirm Password */}
      <div className="mb-6">

        <label className="block mb-2 font-medium">
          Confirm Password
        </label>

        <div className="relative">

          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-14 border border-gray-300 rounded-xl pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showConfirmPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>

        </div>

      </div>

      {/* Terms */}
      <div className="flex items-center gap-2 mb-6">

        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />

        <span className="text-sm text-gray-600">
          I agree to the Terms & Conditions
        </span>

      </div>

      {/* Button */}
      <button
        type="button"
        onClick={handleRegister}
        disabled={submitting}
        className={`w-full h-14 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition ${submitting ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {submitting ? "Creating Account..." : "Create Account"}
      </button>

      {/* Login */}
      <p className="text-center mt-6 text-gray-600">

        Already have an account?

        <Link
          to="/login"
          className="text-blue-600 font-semibold ml-2 hover:underline"
        >
          Login
        </Link>

      </p>
    </>
  );
}