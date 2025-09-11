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
        getSingleProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'GET',
            }),
        }),
        // SignUp: builder.mutation({
        //     query: (LogInData) => ({
        //         url: '/auth/signup',
        //         method: 'POST',
        //         body: LogInData,
        //     }),
        // }),
        getReviewOfProducts: builder.query({
            query: ({id, params}) => ({
                url: `/reviews/product/${id}`,
                method: 'GET',
                params,
            }),
        }),

    }),
});

export const {
    useGetAllProductsQuery,
    useGetSingleProductQuery,
    useGetReviewOfProductsQuery,
} = productsApi;