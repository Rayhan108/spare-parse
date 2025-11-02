export interface TermsAndConditionsData {
  id: string;
  userId: string;
  heading: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface TermsAndConditionsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TermsAndConditionsData;
}




import { baseApi } from "@/redux/api/baseApi";

export const termsAndConditionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query<TermsAndConditionsResponse, void>({
      query: () => ({
        url: "/terms-&-conditions",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTermsAndConditionsQuery } = termsAndConditionsApi;
