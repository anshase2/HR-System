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

export default { login, register, logout };

