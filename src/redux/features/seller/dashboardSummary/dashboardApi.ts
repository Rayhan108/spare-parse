// redux/features/order/seller/dashboardApi.ts
import { baseApi } from "@/redux/api/baseApi";

// 🧾 TypeScript types for dashboard summary
export interface DashboardSummary {
  totalOrders: number;
  totalSalesAmount: number;
  currentOrders: number;
}

export interface DashboardSummaryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: DashboardSummary;
}

// 🧩 API endpoint
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
