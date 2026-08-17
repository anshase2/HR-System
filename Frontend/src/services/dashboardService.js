import { apiRequest } from "./apiClient";

export async function getDashboardStatistics(period = "Monthly") {
  const params = new URLSearchParams({ period });
  return apiRequest(`/Admin/Dashboard/statistics?${params.toString()}`, {
    auth: true,
  });
}
