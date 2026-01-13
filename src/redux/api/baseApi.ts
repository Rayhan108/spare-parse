

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

const BASE_URL = "https://backend.sparedoc.com/api/v1";
// const BASE_URL = "http://10.10.20.26:7080/api/v1";


let csrfToken: string | null = null;
let csrfPromise: Promise<string | null> | null = null;

async function ensureCsrfToken(): Promise<string | null> {

  if (csrfToken) {
    // console.log(" Using cached CSRF token");
    return csrfToken;
  }


  if (csrfPromise) {
    return csrfPromise;
  }


  csrfPromise = fetch(`${BASE_URL}/csrf-token`, {
    method: "GET",
    credentials: "include",
  })
    .then(async (res) => {
      if (!res.ok) throw new Error("CSRF fetch failed");
      
      const data = await res.json();

      csrfToken = data.token;
      
      // console.log(" CSRF Token saved:", csrfToken?.substring(0, 30) + "...");
      
      return csrfToken;
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((err) => {
      // console.error(" CSRF error:", err);
      return null;
    })
    .finally(() => {
      csrfPromise = null;
    });

  return csrfPromise;
}

function clearCsrfToken(): void {
  csrfToken = null;
  csrfPromise = null;
}

const CSRF_METHODS = ["POST", "PUT", "PATCH", "DELETE"];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    // Auth token
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
  const method =
    typeof args === "string" ? "GET" : args.method?.toUpperCase() || "GET";

  if (CSRF_METHODS.includes(method)) {
    await ensureCsrfToken();
  }

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    // console.log(" 403 received, refreshing CSRF...");
    clearCsrfToken();
    await ensureCsrfToken();
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

export { ensureCsrfToken, clearCsrfToken };