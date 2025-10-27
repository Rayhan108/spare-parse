// redux/features/newsletter/newsletterApi.ts
import { baseApi } from "@/redux/api/baseApi";

export interface NewsletterRequest {
  email: string;
}

export interface NewsletterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    id: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribeNewsletter: builder.mutation<NewsletterResponse, NewsletterRequest>({
      query: (body) => ({
        url: "/newsletter-subscriber",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSubscribeNewsletterMutation } = newsletterApi;
