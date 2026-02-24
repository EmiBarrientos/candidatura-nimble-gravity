import { apiGet } from "./api/Client";


export function getAllPositions() {
  return apiGet("/api/jobs/get-list");
}


