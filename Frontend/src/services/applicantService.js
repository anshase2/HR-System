import { apiRequest } from "./apiClient";

export async function getMyProfile() {
  return apiRequest("/Applicant/me", {
    method: "GET",
    auth: true,
  });
}
