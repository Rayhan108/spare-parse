// src/redux/api/baseApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

const BASE_URL = "https://backend.sparedoc.com/api/v1";

let csrfToken: string | null = null;

async function fetchCsrfToken(): Promise<string | null> {
  try {
    const response = await fetch(`${BASE_URL}/csrf-token`, {
      method: "GET",
      credentials: "include", // Cookie receive 
    });

    if (!response.ok) {
      console.error("Failed to fetch CSRF token");
      return null;
    }

    const data = await response.json();
    csrfToken = data.token; 
    return csrfToken;
  } catch (error) {
    console.error("CSRF fetch error:", error);
    return null;
  }
}


const CSRF_METHODS = ["POST", "PUT", "PATCH", "DELETE"];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  
  prepareHeaders: (headers, { getState }) => {
    // Authorization token
    const token = (getState() as RootState).logInUser?.accessToken;
    if (token) {
      headers.set("Authorization", `${token}`);
    }

    if (csrfToken) {
      headers.set("x-csrf-token", csrfToken);
    }

    return headers;
  },
});

const baseQueryWithCsrf = async (
  args: Parameters<typeof baseQuery>[0],
  api: Parameters<typeof baseQuery>[1],
  extraOptions: Parameters<typeof baseQuery>[2]
) => {

  const method = typeof args === "string" ? "GET" : (args.method?.toUpperCase() || "GET");

  //if  POST/PUT/PATCH/DELETE then check CSRF token 
  if (CSRF_METHODS.includes(method) && !csrfToken) {
    await fetchCsrfToken();
  }


  let result = await baseQuery(args, api, extraOptions);


  if (result.error && result.error.status === 403) {
    console.log("CSRF token expired, refreshing...");
    
    await fetchCsrfToken();
    
    // Retry request
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithCsrf,
  tagTypes: ["Cart", "Product", "Wishlist", "Checkouts"],
  endpoints: () => ({}),
});


export { fetchCsrfToken };