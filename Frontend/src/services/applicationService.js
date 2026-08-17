import { apiRequest } from "./apiClient";

export async function applyForJob(formData) {
  return apiRequest("/Application/apply", {
    method: "POST",
    body: formData,
    auth: true,
  });
}

export async function getApplicationsByJob(jobId) {
  return apiRequest(`/Application/job/${jobId}`, { auth: true });
}

export async function getApplicationById(id) {
  return apiRequest(`/Application/${id}`, { auth: true });
}

export async function updateApplicationStatus(id, status) {
  return apiRequest(`/Application/${id}/status`, {
    method: "PUT",
    body: status,
    auth: true,
  });
}
