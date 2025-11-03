import { baseApi } from "../../api/baseApi";

export interface SalesReportItem {
  orderId: string;
  totalAmount: number;
  orderDate: string;
  paymentMethod: string;
  orderStatus: string;
  paymentDate: string;
  paymentAmount: number;
  customerName: string;
  customerEmail: string;
}

export interface SalesReportResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: SalesReportItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}


export const salesReportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesReport: builder.query<SalesReportResponse, void>({
      query: () => ({
        url: "/orders/sales-report",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSalesReportQuery } = salesReportApi;
