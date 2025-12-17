
import { createApi, fetchBaseQuery,} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://fit-parts-ecommerce-for-vehicle-par.vercel.app/api/v1",
  // baseUrl: "http://10.10.20.26:7080/api/v1",
  // baseUrl: "http://13.62.189.94:7080/api/v1",
  baseUrl: "https://backend.sparedoc.com/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).logInUser?.accessToken;

    // console.log("check token:", (getState() as RootState).logInUser);
    //console.log("Sending JWT:", token);

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
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithLogoutOnError,
  tagTypes: ["Cart", "Product", "Wishlist","Checkouts"],
  endpoints: () => ({}),
});
