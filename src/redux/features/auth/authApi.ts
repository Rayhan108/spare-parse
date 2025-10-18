import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        SignUp: builder.mutation({
            query: (LogInData) => ({
                url: '/users/register',
                method: 'POST',
                body: LogInData,
            }),
        }),

        otpVerification: builder.mutation({
            query: (data) => ({
                url: '/users/verify-otp',
                method: 'PUT',
                body: data,
            }),
        }),

         resendOtpVerification: builder.mutation({
            query: (data) => ({
                url: '/users/verify-otp',
                method: 'PUT',
                body: data,
            }),
        }),

        logIn: builder.mutation({
            query: (LogInData) => ({
                url: '/auth/login',
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
                url: '/users/verify-otp',
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
                url: '/users/update-profile', // correct endpoint
                method: 'PUT',
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

export const { useSignUpMutation, useOtpVerificationMutation, useLogInMutation, useForgetPasswordMutation, useVerifyEmailMutation, useResetAdminPasswordMutation, useChangeAdminPasswordMutation, useEditAdminProfileMutation, useGetAdminProfileQuery, useResendOtpVerificationMutation } = authApi;