

// import { baseApi } from "../../api/baseApi";

// const authApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({

//         // ✅ Sign up (register)
//         SignUp: builder.mutation({
//             query: (LogInData) => ({
//                 url: '/users/register',
//                 method: 'POST',
//                 body: LogInData,
//             }),
//         }),

//         // ✅ Verify OTP
//         otpVerification: builder.mutation({
//             query: (data) => ({
//                 url: '/users/verify-otp',
//                 method: 'PUT',
//                 body: data,
//             }),
//         }),

//         // ✅ Resend OTP (corrected)
//         resendOtp: builder.mutation({
//             query: (data) => ({
//                 url: '/users/resend-verification-email',
//                 method: 'POST',
//                 body: data,
//             }),
//         }),

//         // ✅ Login
//         logIn: builder.mutation({
//             query: (LogInData) => ({
//                 url: '/auth/login',
//                 method: 'POST',
//                 body: LogInData,
//             }),
//         }),

//         // ✅ Forget password
//         forgetPassword: builder.mutation({
//             query: (email) => ({
//                 url: '/auth/forgot-password',
//                 method: 'POST',
//                 body: email,
//             }),
//         }),

//         // ✅ Verify email (optional, same as OTP verification)
//         verifyEmail: builder.mutation({
//             query: (data) => ({
//                 url: '/users/verify-otp',
//                 method: 'POST',
//                 body: data,
//             }),
//         }),

//         // ✅ Reset password (admin)
//         resetAdminPassword: builder.mutation({
//             query: ({ email, data }) => ({
//                 url: `/auth/reset-password?email=${email}`,
//                 method: 'POST',
//                 body: data,
//             }),
//         }),

//         // ✅ Change password (admin)
//         changeAdminPassword: builder.mutation({
//             query: (data) => ({
//                 url: '/auth/change-password',
//                 method: 'PATCH',
//                 body: data,
//             }),
//         }),

//         // ✅ Edit profile
//         editAdminProfile: builder.mutation({
//             query: (data) => ({
//                 url: '/users/update-profile',
//                 method: 'PUT',
//                 body: data,
//             }),
//         }),

//         // ✅ Get profile
//         getAdminProfile: builder.query({
//             query: () => ({
//                 url: `/auth/profile`,
//                 method: 'GET',
//             }),
//         }),

//         // ✅ Update user role (if needed)
//         updateUserRole: builder.query({
//             query: () => ({
//                 url: `/auth/profile`,
//                 method: 'GET',
//             }),
//         }),
//     }),
// });

// export const {
//     useSignUpMutation,
//     useOtpVerificationMutation,
//     useResendOtpMutation,
//     useLogInMutation,
//     useForgetPasswordMutation,
//     useVerifyEmailMutation,
//     useResetAdminPasswordMutation,
//     useChangeAdminPasswordMutation,
//     useEditAdminProfileMutation,
//     useGetAdminProfileQuery,
// } = authApi;





import { baseApi } from "../../api/baseApi";

interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Sign up (register)
    SignUp: builder.mutation({
      query: (LogInData) => ({
        url: '/users/register',
        method: 'POST',
        body: LogInData,
      }),
    }),

    // ✅ Verify OTP
    otpVerification: builder.mutation({
      query: (data) => ({
        url: '/users/verify-otp',
        method: 'PUT',
        body: data,
      }),
    }),

    // ✅ Resend OTP
    resendOtp: builder.mutation({
      query: (data) => ({
        url: '/users/resend-verification-email',
        method: 'POST',
        body: data,
      }),
    }),

    // ✅ Login
    logIn: builder.mutation({
      query: (LogInData) => ({
        url: '/auth/login',
        method: 'POST',
        body: LogInData,
      }),
    }),

    // ✅ Forget password
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: email,
      }),
    }),

    // ✅ Reset admin password
    resetAdminPassword: builder.mutation({
      query: ({ email, data }) => ({
        url: `/auth/reset-password?email=${email}`,
        method: 'POST',
        body: data,
      }),
    }),

    // ✅ Change admin password
    changeAdminPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'PATCH',
        body: data,
      }),
    }),

    // ✅ Edit profile
    editAdminProfile: builder.mutation({
      query: (data) => ({
        url: '/users/update-profile',
        method: 'PUT',
        body: data,
      }),
    }),

    // ✅ Get profile
    getAdminProfile: builder.query({
      query: () => ({
        url: '/auth/profile',
        method: 'GET',
      }),
    }),

    // ✅ Change user password (POST /users/change-password)
    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
      query: (body) => ({
        url: '/users/change-password',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useOtpVerificationMutation,
  useResendOtpMutation,
  useLogInMutation,
  useForgetPasswordMutation,
  useResetAdminPasswordMutation,
  useChangeAdminPasswordMutation,
  useEditAdminProfileMutation,
  useGetAdminProfileQuery,
  useChangePasswordMutation, // ✅ export the new change password hook
} = authApi;
