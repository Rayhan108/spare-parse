import { baseApi } from "@/redux/api/baseApi";
export interface ContactUsInfo {
  id: string;
  userId: string;
  email: string;
  phoneNumber: string;
  location: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  createdAt: string;
  updatedAt: string;
  phone:string,
  address:string,
}

export const contactUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContactUsInfo: builder.query<{ success: boolean; message: string; data: ContactUsInfo }, void>({
      query: () => ({
        url: "/contact-us-info",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetContactUsInfoQuery } = contactUsApi;
