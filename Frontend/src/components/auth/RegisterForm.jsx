import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Jordan");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agree, setAgree] = useState(false);

  const handleRegister = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agree) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    alert("Account Created Successfully!");

    navigate("/login");
  };
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


  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800">
        Create Account
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Create your TalentAI account
      </p>

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
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
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
        onClick={handleRegister}
        className="w-full h-14 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        Create Account
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