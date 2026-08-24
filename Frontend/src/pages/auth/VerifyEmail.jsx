import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import { useAuth } from "../../hooks/useAuth.jsx";
import {
  resendVerification,
  verifyEmail,
} from "../../services/authService";

export default function VerifyEmail() {
  const { setAuthSession } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleVerify = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!email.trim() || !/^\d{6}$/.test(code.trim())) {
      setError("Enter your email and the 6-digit verification code.");
      return;
    }

    setSubmitting(true);

    try {
      const authResponse = await verifyEmail(
        email.trim(),
        code.trim()
      );

      console.log("VERIFY EMAIL RESPONSE:", authResponse);

      if (!authResponse?.token) {
        throw new Error(
          "Email verification did not return authentication information."
        );
      }

      /*
       * Save the exact same authentication session
       * used by normal Login.
       */
      setAuthSession({
        token: authResponse.token,
        expiration: authResponse.expiration,
        userId: authResponse.userId,
        email: authResponse.email,
        firstName: authResponse.firstName,
        lastName: authResponse.lastName,
        role: authResponse.role,
      });

      /*
       * Make sure the authentication data exists
       * before navigating to the Home page.
       */
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("authUser");

      console.log("SAVED TOKEN:", savedToken);
      console.log("SAVED USER:", savedUser);

      if (!savedToken || !savedUser) {
        throw new Error(
          "Authentication session could not be saved."
        );
      }

      navigate("/", { replace: true });
    } catch (requestError) {
      console.error("EMAIL VERIFICATION ERROR:", requestError);

      setError(
        requestError?.message ||
          "The verification code is invalid or expired."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Enter your email address first.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await resendVerification(email.trim());

      setMessage(
        response?.message ||
          "A new verification code has been sent."
      );
    } catch (requestError) {
      setError(
        requestError?.message ||
          "Unable to resend the verification code."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold text-gray-800">
        Verify Email
      </h1>

      <p className="mt-2 mb-8 text-gray-500">
        Enter the verification code sent to your email.
      </p>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {message}
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-5">
        <div>
          <label
            className="mb-2 block font-medium"
            htmlFor="verification-email"
          >
            Email Address
          </label>

          <input
            id="verification-email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            className="h-14 w-full rounded-xl border border-gray-300 px-4"
            disabled={submitting}
          />
        </div>

        <div>
          <label
            className="mb-2 block font-medium"
            htmlFor="verification-code"
          >
            Verification Code
          </label>

          <input
            id="verification-code"
            type="text"
            inputMode="numeric"
            maxLength="6"
            value={code}
            onChange={(event) =>
              setCode(
                event.target.value.replace(/\D/g, "")
              )
            }
            className="h-14 w-full rounded-xl border border-gray-300 px-4 tracking-[0.3em]"
            disabled={submitting}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="h-14 w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Verifying..." : "Verify Email"}
        </button>

        <button
          type="button"
          onClick={handleResend}
          disabled={submitting}
          className="w-full text-blue-600 hover:underline disabled:opacity-60"
        >
          Resend verification code
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="text-blue-600 hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
}