
import { baseApi } from "@/redux/api/baseApi";

export interface SupportRequest {
  userEmail: string;
  userPhone: string;
  message: string;
}

export interface SupportResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    userEmail: string;
    userPhone: string;
    message: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSupport: builder.mutation<SupportResponse, SupportRequest>({
      query: (body) => ({
        url: "/support",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateSupportMutation } = supportApi;
