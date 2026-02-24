import { apiPost } from "./api/Client.ts";
import type { ApplicationRequest } from "../types/IApplicationRequest.tsx";

export function sendPostulation(postulation: ApplicationRequest) {
  return apiPost("/api/candidate/apply-to-job", postulation);
}