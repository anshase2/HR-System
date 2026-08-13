
import { apiRequest } from "./apiClient";

function buildJobQueryParams(filters = {}) {
  const params = new URLSearchParams();

  if (filters.department) {
    params.append("department", filters.department);
  }

  if (filters.location) {
    params.append("location", filters.location);
  }

  if (filters.employmentType) {
    params.append("employmentType", filters.employmentType);
  }

  if (filters.workplaceType) {
    params.append("workplaceType", filters.workplaceType);
  }

  if (filters.experience) {
    params.append("experience", filters.experience);
  }

  if (filters.isActive !== undefined && filters.isActive !== null) {
    params.append("isActive", filters.isActive);
  }

  return params;
}

function buildJobRequestBody(jobData) {
  return {
    title: jobData.title,
    description: jobData.description,
    department: jobData.department,
    location: jobData.location,
    employmentType: jobData.employmentType,
    workplaceType: jobData.workplaceType,
    experienceLevel: jobData.experienceLevel,
    minYearsOfExperience: Number(jobData.minYearsOfExperience) || 0,
    requiredSkills: Array.isArray(jobData.requiredSkills)
      ? jobData.requiredSkills.join(",")
      : jobData.requiredSkills,
    closingDate: jobData.closingDate || null,
    isActive: jobData.isActive ?? true,
  };
}

export async function getJobs(filters = {}) {
  const params = buildJobQueryParams(filters);
  const queryString = params.toString();
  const path = queryString ? `/Jobs?${queryString}` : "/Jobs";

  return apiRequest(path);
}

export async function getActiveJobs() {
  return apiRequest("/Jobs/active");
}

export async function getJobById(id) {
  return apiRequest(`/Jobs/${id}`);
}

export async function createJob(jobData) {
  return apiRequest("/Jobs", {
    method: "POST",
    body: buildJobRequestBody(jobData),
    auth: true,
  });
}

export async function updateJob(id, jobData) {
  return apiRequest(`/Jobs/${id}`, {
    method: "PUT",
    body: buildJobRequestBody(jobData),
    auth: true,
  });
}

export async function deleteJob(id) {
  return apiRequest(`/Jobs/${id}`, {
    method: "DELETE",
    auth: true,
  });
}
