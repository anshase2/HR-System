import { apiRequest } from "./apiClient";

// Use the exact endpoints documented in APIdoc.md
export async function login(email, password) {
  return apiRequest("/Account/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function register({ firstName, lastName, email, phoneNumber, password, country, confirmPassword }) {
  return apiRequest("/Account/register-applicant", {
    method: "POST",
    body: {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      country,
      confirmPassword,
    },
  });
}

export async function logout() {
  // Logout endpoint requires authentication
  return apiRequest("/Account/logout", {
    method: "GET",
    auth: true,
  });
}

export async function setPassword({ email, token, password, confirmPassword }) {
  return apiRequest("/Account/set-password", {
    method: "POST",
    body: { email, token, password, confirmPassword },
  });
}

export async function verifyEmail(email, code) {
  return apiRequest("/Account/verify-email", {
    method: "POST",
    body: { email, code },
  });
}

export async function resendVerification(email) {
  return apiRequest("/Account/resend-verification", {
    method: "POST",
    body: { email },
  });
}

export default {
  login,
  register,
  logout,
  setPassword,
  verifyEmail,
  resendVerification,
};

