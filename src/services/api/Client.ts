
import type { ApplicationRequest } from "../../types/IApplicationRequest";

const API_BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/";



export async function apiGet( path : string) {
  const res = await fetch(`${API_BASE_URL}${path}`);

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export async function apiPost(path: string, data: ApplicationRequest) {

 const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    /*throw new Error(`Error ${res.status}: ${res.statusText}`);*/
    const errorBody = await res.text();
    console.log("Backend error response:", errorBody);
    throw new Error(`Error ${res.status}: ${errorBody}`);
  }

  return res.json();
}
