
import { baseApi } from "@/redux/api/baseApi";


export interface DashboardSummary {
  totalOrders: number;
  totalSalesAmount: number;
  currentOrders: number;
  sellerName: string ;
}

export interface DashboardSummaryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: DashboardSummary;
}


export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query<DashboardSummaryResponse, void>({
      query: () => ({
        url: "/orders/dashboard-summary",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardSummaryQuery } = dashboardApi;
