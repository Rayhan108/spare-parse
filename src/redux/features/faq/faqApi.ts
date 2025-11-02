export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface FaqResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: FaqItem[];
}


import { baseApi } from "@/redux/api/baseApi";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query<FaqResponse, void>({
      query: () => ({
        url: "/faqs",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFaqsQuery } = faqApi;
