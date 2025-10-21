
import { createApi, fetchBaseQuery,} from "@reduxjs/toolkit/query/react";
// import { message } from "antd";
// import { setUser } from "../features/auth/authSlice";
import type { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://fit-parts-ecommerce-for-vehicle-par.vercel.app/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).logInUser?.accessToken;

    console.log("Sending JWT:", token);

    if (token) {
      headers.set("Authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithLogoutOnError = async (
  args: Parameters<typeof baseQuery>[0],
  api: Parameters<typeof baseQuery>[1],
  extraOptions: Parameters<typeof baseQuery>[2]
) => {
  const result = await baseQuery(args, api, extraOptions);

  // if (result.error) {
  //   const error = result.error as FetchBaseQueryError;
  //   // if (error.status === 400) {
  //   //   api.dispatch(setUser({ user: null, accessToken: null, refreshToken: null }));
  //   //   localStorage.removeItem("persist:root");
  //   //   message.error("Session expired. Please log in again.");
  //   //   if (typeof window !== "undefined") window.location.href = "/auth/login";
  //   // }
  // }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithLogoutOnError,
  tagTypes: ["Cart", "Product", "Wishlist","Checkouts"],
  endpoints: () => ({}),
});
