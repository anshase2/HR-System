import { apiRequest } from "./apiClient";

export async function getEmployees() {
  return apiRequest("/Employee", { auth: true });
}

export async function createEmployee(employeeData) {
  return apiRequest("/Account/create-employee", {
    method: "POST",
    body: {
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      email: employeeData.email,
      phoneNumber: employeeData.phoneNumber,
      country: employeeData.country,
    },
    auth: true,
  });
}

export async function deleteEmployee(id) {
  return apiRequest(`/Employee/${id}`, {
    method: "DELETE",
    auth: true,
  });
}