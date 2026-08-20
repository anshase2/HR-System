import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { setPassword } from "../../services/authService";

export default function SetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [password, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !token) {
      setError("This password setup link is incomplete or invalid.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await setPassword({ email, token, password, confirmPassword });
      navigate("/login", {
        state: { message: "Password set successfully. You can now log in." },
      });
    } catch (requestError) {
      setError(requestError.message || "Unable to set password. Please request a new link.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[450px] rounded-2xl shadow-xl p-10"
      >
        <h1 className="text-4xl font-bold text-gray-800">Set your password</h1>
        <p className="text-gray-500 mt-3 mb-8">
          Your administrator created your account. Choose a password to activate it.
        </p>

        {email && (
          <p className="text-sm text-gray-500 mb-6">
            Account: <span className="font-medium">{email}</span>
          </p>
        )}

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <label className="block mb-2 font-medium">New Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPasswordValue(event.target.value)}
          className="w-full h-14 border rounded-xl px-4 mb-6"
          required
        />

        <label className="block mb-2 font-medium">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="w-full h-14 border rounded-xl px-4 mb-6"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting ? "Setting password..." : "Set Password"}
        </button>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
}
