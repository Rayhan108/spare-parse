
// import { baseApi } from "../../api/baseApi";

// // ------------------------
// // Types
// // ------------------------

// // Change password (logged-in user)


// interface UpdateProfileImageResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: {
//     id: string;
//     fullName: string;
//     email: string;
//     image: string; // image URL
//   };
// }
// interface ChangePasswordRequest {
//   oldPassword?: string;
//   newPassword?: string;
// }

// interface ChangePasswordResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
// }

// // Forgot password request & response
// interface ForgotPasswordRequest {
//   email: string;
// }

// interface ForgotPasswordResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: {
//     otp: number;
//     otpToken: string;
//   };
// }

// // OTP verification for forgot password
// interface OtpVerificationForgotRequest {
//   email: string;
//   otp: number;
//   otpToken: string;
// }

// interface OtpVerificationForgotResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: {
//     otpToken: string; // token to allow updating password
//   };
// }

// // Update password after OTP verification
// interface UpdatePasswordRequest {
//   email: string;
//   password: string;
//   otpToken: string; // required token after verifying OTP
// }

// interface UpdatePasswordResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: {
//     message: string;
//   };
// }

// // ------------------------
// // API
// // ------------------------
// export const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({

//     updateProfileImage: builder.mutation<
//       UpdateProfileImageResponse,
//       File
//     >({
//       query: (file) => {
//         const formData = new FormData();
//         formData.append("profileImage", file); // must match backend key

//         return {
//           url: "/users/update-profile-image",
//           method: "PUT", // ✅ backend expects PUT
//           body: formData,
//         };
//       },
//     }),


//     // ------------------------
//     // Signup & Login
//     // ------------------------
//     SignUp: builder.mutation({
//       query: (data) => ({
//         url: '/users/register',
//         method: 'POST',
//         body: data,
//       }),
//     }),

//     logIn: builder.mutation({
//       query: (data) => ({
//         url: '/auth/login',
//         method: 'POST',
//         body: data,
//       }),
//     }),

//     // ------------------------
//     // OTP
//     // ------------------------
//     otpVerification: builder.mutation({
//       query: (data) => ({
//         url: '/users/verify-otp',
//         method: 'PUT',
//         body: data,
//       }),
//     }),

//     otpVerificationforgotpassword: builder.mutation<OtpVerificationForgotResponse, OtpVerificationForgotRequest>({
//       query: (data) => ({
//         url: '/users/verify-otp-forgot-password',
//         method: 'PUT',
//         body: data,
//       }),
//     }),

//     resendOtp: builder.mutation({
//       query: (data) => ({
//         url: '/users/resend-verification-email',
//         method: 'POST',
//         body: data,
//       }),
//     }),


//     resendOtpForgotPassword: builder.mutation({
//       query: (data) => ({
//         url: '/users/resend-otp',
//         method: 'POST',
//         body: data,
//       }),
//     }),

//     // ------------------------
//     // Forgot password
//     // ------------------------
//     forgetPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
//       query: (body) => ({
//         url: '/users/forgot-password',
//         method: 'POST',
//         body,
//       }),
//     }),

//     // ------------------------
//     // Password change/update
//     // ------------------------
//     changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
//       query: (body) => ({
//         url: '/users/change-password',
//         method: 'PUT',
//         body,
//       }),
//     }),

//     updatePassword: builder.mutation<UpdatePasswordResponse, UpdatePasswordRequest>({
//       query: (body) => ({
//         url: '/users/update-password',
//         method: 'PUT',
//         body,
//       }),
//     }),

//     editUserProfile: builder.mutation({
//       query: (data) => ({
//         url: '/users/update-profile',
//         method: 'PATCH',
//         body: data,
//       }),
//     }),

//     getUserProfile: builder.query({
//       query: () => ({
//         url: '/users/me',
//         method: 'GET',
//       }),
//     }),

//     // ------------------------
//     // Admin endpoints (optional)
//     // ------------------------
//     // resetAdminPassword: builder.mutation({
//     //   query: ({ email, data }) => ({
//     //     url: `/auth/reset-password?email=${email}`,
//     //     method: 'POST',
//     //     body: data,
//     //   }),
//     // }),

//     // changeAdminPassword: builder.mutation({
//     //   query: (data) => ({
//     //     url: '/auth/change-password',
//     //     method: 'PATCH',
//     //     body: data,
//     //   }),
//     // }),

//     // editAdminProfile: builder.mutation({
//     //   query: (data) => ({
//     //     url: '/users/update-profile',
//     //     method: 'PUT',
//     //     body: data,
//     //   }),
//     // }),

//     // getAdminProfile: builder.query({
//     //   query: () => ({
//     //     url: '/auth/profile',
//     //     method: 'GET',
//     //   }),
//     // }),
//   }),
// });

// // ------------------------
// // Export hooks
// // ------------------------
// export const {
//   useSignUpMutation,
//   useLogInMutation,
//   useOtpVerificationMutation,
//   useOtpVerificationforgotpasswordMutation,
//   useResendOtpMutation,
//   useResendOtpForgotPasswordMutation,
//   useForgetPasswordMutation,
//   useChangePasswordMutation,
//   useUpdatePasswordMutation,
//   useGetUserProfileQuery,
//   useEditUserProfileMutation,
//   useUpdateProfileImageMutation,

// } = authApi;




import { baseApi } from "../../api/baseApi";

// ------------------------
// Types
// ------------------------

interface UpdateProfileImageResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
    image: string;
  };
}

interface ChangePasswordRequest {
  oldPassword?: string;
  newPassword?: string;
}

interface ChangePasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface ForgotPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    otp: number;
    otpToken: string;
  };
}

interface OtpVerificationForgotRequest {
  email: string;
  otp: number;
  otpToken: string;
}

interface OtpVerificationForgotResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    otpToken: string;
  };
}

interface UpdatePasswordRequest {
  email: string;
  password: string;
  otpToken: string;
}

interface UpdatePasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    message: string;
  };
}

// ✅ New: Social login types
interface SocialLoginRequest {
  email: string;
  fcmToken: string; // Google credential token
  plateForm:string;
  image?: string;
  fullName?: string;
  phoneNumber?: string;
  address?: string;
}

interface SocialLoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    image?: string;
    accessToken: string;
    refreshToken: string;
  };
}

// ------------------------
// API
// ------------------------
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfileImage: builder.mutation<
      UpdateProfileImageResponse,
      File
    >({
      query: (file) => {
        const formData = new FormData();
        formData.append("profileImage", file);

        return {
          url: "/users/update-profile-image",
          method: "PUT",
          body: formData,
        };
      },
    }),

    // ------------------------
    // Signup & Login
    // ------------------------
    SignUp: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),

    logIn: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    // ✅ Added: Social login
    socialLogin: builder.mutation<SocialLoginResponse, SocialLoginRequest>({
      query: (data) => ({
        url: "/users/social-sign-up",
        method: "POST",
        body: data,
      }),
    }),

    // ------------------------
    // OTP
    // ------------------------
    otpVerification: builder.mutation({
      query: (data) => ({
        url: "/users/verify-otp",
        method: "PUT",
        body: data,
      }),
    }),

    otpVerificationforgotpassword: builder.mutation<
      OtpVerificationForgotResponse,
      OtpVerificationForgotRequest
    >({
      query: (data) => ({
        url: "/users/verify-otp-forgot-password",
        method: "PUT",
        body: data,
      }),
    }),

    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/users/resend-verification-email",
        method: "POST",
        body: data,
      }),
    }),

    resendOtpForgotPassword: builder.mutation({
      query: (data) => ({
        url: "/users/resend-otp",
        method: "POST",
        body: data,
      }),
    }),

    // ------------------------
    // Forgot password
    // ------------------------
    forgetPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: "/users/forgot-password",
        method: "POST",
        body,
      }),
    }),

    // ------------------------
    // Password change/update
    // ------------------------
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (body) => ({
        url: "/users/change-password",
        method: "PUT",
        body,
      }),
    }),

    updatePassword: builder.mutation<
      UpdatePasswordResponse,
      UpdatePasswordRequest
    >({
      query: (body) => ({
        url: "/users/update-password",
        method: "PUT",
        body,
      }),
    }),

    editUserProfile: builder.mutation({
      query: (data) => ({
        url: "/users/update-profile",
        method: "PATCH",
        body: data,
      }),
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
  }),
});

// ------------------------
// Export hooks
// ------------------------
export const {
  useSignUpMutation,
  useLogInMutation,
  useSocialLoginMutation, // ✅ Added export
  useOtpVerificationMutation,
  useOtpVerificationforgotpasswordMutation,
  useResendOtpMutation,
  useResendOtpForgotPasswordMutation,
  useForgetPasswordMutation,
  useChangePasswordMutation,
  useUpdatePasswordMutation,
  useGetUserProfileQuery,
  useEditUserProfileMutation,
  useUpdateProfileImageMutation,
} = authApi;
