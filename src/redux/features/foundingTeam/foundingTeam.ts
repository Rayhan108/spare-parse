// types/foundingTeam.ts
export interface FoundingTeamMember {
  id: string;
  userId: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FoundingTeamResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: FoundingTeamMember[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}



// redux/features/foundingTeam/foundingTeamApi.ts
import { baseApi } from "@/redux/api/baseApi";
// import { FoundingTeamResponse } from "@/types/foundingTeam";

export const foundingTeamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFoundingTeams: builder.query<FoundingTeamResponse, void>({
      query: () => ({
        url: "/founding-teams",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFoundingTeamsQuery } = foundingTeamApi;
