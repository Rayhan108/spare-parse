import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        SignUp: builder.mutation({
            query: (LogInData) => ({
                url: '/auth/signup',
                method: 'POST',
                body: LogInData,
            }),
        }),

        otpVerification: builder.mutation({
            query: (data) => ({
                url: '/auth/verify-signup-otp',
                method: 'POST',
                body: data,
            }),
        }),

        logIn: builder.mutation({
            query: (LogInData) => ({
                url: '/auth/signin',
                method: 'POST',
                body: LogInData,
            }),
        }),

        forgetPassword: builder.mutation({
            query: (email) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: email,
            }),
        }),

        verifyEmail: builder.mutation({
            query: (data) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: data,
            }),
        }),

        resetAdminPassword: builder.mutation({
            query: ({ email, data }) => ({
                url: `/auth/reset-password?email=${email}`,
                method: 'POST',
                body: data,
            }),
        }),

        changeAdminPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/change-password',
                method: 'PATCH',
                body: data,
            }),
        }),

        editAdminProfile: builder.mutation({
            query: (data) => ({
                url: '/auth/edit-profile',
                method: 'PATCH',
                body: data,
            }),

        }),

        getAdminProfile: builder.query({
            query: () => ({
                url: `/auth/profile`,
                method: 'GET',
            }),

        }),

    }),
});

export const { useSignUpMutation, useOtpVerificationMutation, useLogInMutation, useForgetPasswordMutation, useVerifyEmailMutation, useResetAdminPasswordMutation, useChangeAdminPasswordMutation, useEditAdminProfileMutation, useGetAdminProfileQuery } = authApi;