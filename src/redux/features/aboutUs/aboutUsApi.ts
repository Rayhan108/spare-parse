import { baseApi } from "@/redux/api/baseApi";

// ✅ Define the About Us data structure
export interface AboutUsData {
    id: string;
    userId: string;
    heading: string | null;
    content: string;
    createdAt: string;
    updatedAt: string;
}

// ✅ Inject endpoints
export const aboutUsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ✅ GET — fetch About Us content
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

// ✅ Export auto-generated hook
export const { useGetAboutUsQuery } = aboutUsApi;
