import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { message } from "antd";
import { setUser } from "../features/auth/authSlice";
import type { RootState } from "../store"; // <-- update with your actual store path

// ✅ Create the base query with token injection
const baseQuery = fetchBaseQuery({
  baseUrl: "https://fit-parts-ecommerce-for-vehicle-par.vercel.app/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).logInUser?.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// ✅ Custom base query with auto-logout on 401
const baseQueryWithLogoutOnError = async (
  args: Parameters<typeof baseQuery>[0],
  api: Parameters<typeof baseQuery>[1],
  extraOptions: Parameters<typeof baseQuery>[2]
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    const error = result.error as FetchBaseQueryError;

    if (error.status === 401) {
      // Dispatch logout to clear Redux state
      api.dispatch(setUser({ user: null, token: null }));
      message.error("Session expired. Please log in again.");

      // Clear localStorage/sessionStorage if you store tokens
      localStorage.removeItem("persist:root");

      // Redirect to login page (use hard redirect if router unavailable)
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }
  }

  return result;
};

// ✅ Base API configuration
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithLogoutOnError,
  tagTypes: [],
  endpoints: () => ({}),
});
