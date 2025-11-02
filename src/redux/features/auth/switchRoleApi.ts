export interface SwitchRoleRequest {
  role: string;
}

export interface SwitchRoleResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    userId: string;
    newRole: string;
    accessToken: string;
  };
}


import { baseApi } from "@/redux/api/baseApi";
export const switchRoleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    switchUserRole: builder.mutation<SwitchRoleResponse, SwitchRoleRequest>({
      query: (body) => ({
        url: "/users/switch-role",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSwitchUserRoleMutation } = switchRoleApi;
