import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // SignUp: builder.mutation({
        //     query: (LogInData) => ({
        //         url: '/auth/signup',
        //         method: 'POST',
        //         body: LogInData,
        //     }),
        // }),
        getAllProducts: builder.query({
            query: () => ({
                url: `/products`,
                method: 'GET',
            }),
        }),

    }),
});

export const {
    useGetAllProductsQuery,
} = productsApi;