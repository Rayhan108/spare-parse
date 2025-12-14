import { baseApi } from "../../../api/baseApi";

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


interface SocialLoginRequest {
  email: string;
  fcmToken: string;
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


    socialLogin: builder.mutation<SocialLoginResponse, SocialLoginRequest>({
      query: (data) => ({
        url: "/users/social-sign-up",
        method: "POST",
        body: data,
      }),
    }),

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
    registerSeller: builder.mutation({
      query: (formData) => ({
        url: "/users/seller-info",
        method: "POST",
        body: formData,
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

export const {
  useSignUpMutation,
  useLogInMutation,
  useSocialLoginMutation, 
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
  useRegisterSellerMutation
} = authApi;
