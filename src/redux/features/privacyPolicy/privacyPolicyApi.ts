// redux/features/privacyPolicy/privacyPolicyApi.ts
import { baseApi } from "@/redux/api/baseApi";
export interface PrivacyPolicy {
  id: string;
  userId: string;
  heading: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}


export const privacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query<{ success: boolean; message: string; data: PrivacyPolicy }, void>({
      query: () => ({
        url: "/privacy-policy",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPrivacyPolicyQuery } = privacyPolicyApi;
