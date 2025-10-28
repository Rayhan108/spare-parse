import { baseApi } from "../../api/baseApi";

// 🧩 Address Type
export interface Address {
  id: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  type: "SHIPPING" | "BILLING";
  createdAt?: string;
  updatedAt?: string;
  data?:string;
}

// 🧩 Create Address Request
export interface CreateAddressRequest {
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  type: string;
}

// 🧩 Create Address Response
export interface CreateAddressResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Address;
}

// 🧩 Get All Addresses Response
export interface GetAddressResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Address[];
}

// 🧩 Update Address Request
export interface UpdateAddressRequest {
  addressLine?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  type: "SHIPPING" | "BILLING";
}

// 🧩 Update Address Response
export interface UpdateAddressResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Address;
}

// 🧩 Add PATCH endpoint
export const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAddress: builder.mutation<CreateAddressResponse, CreateAddressRequest>({
      query: (body) => ({
        url: "/address",
        method: "POST",
        body,
      }),
    }),
    getAddresses: builder.query<GetAddressResponse, void>({
      query: () => ({
        url: "/address",
        method: "GET",
      }),
    }),
    updateAddress: builder.mutation<UpdateAddressResponse, { id: string; data: UpdateAddressRequest }>({
      query: ({ id, data }) => ({
        url: `/address/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useAddAddressMutation, useGetAddressesQuery, useUpdateAddressMutation } = addressApi;
