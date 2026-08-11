import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    alert("Password reset link has been sent to your email.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white w-[450px] rounded-2xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-gray-800">
          Forgot Password
        </h1>

        <p className="text-gray-500 mt-3 mb-8">
          Enter your email address and we'll send you a password reset link.
        </p>

        <label className="block mb-2 font-medium">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-14 border rounded-xl px-4 mb-6"
        />

        <button
          onClick={handleReset}
          className="w-full h-14 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Send Reset Link
        </button>

        <div className="mt-6 text-center">

          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}