import { baseApi } from "@/redux/api/baseApi";


export interface AboutUsData {
    id: string;
    userId: string;
    heading: string | null;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export const aboutUsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAboutUs: builder.query<
            { success: boolean; message: string; data: AboutUsData },
            void
        >({
            query: () => ({
                url: "/about-us",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetAboutUsQuery } = aboutUsApi;
