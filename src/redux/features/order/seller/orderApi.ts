import { baseApi } from "../../../api/baseApi";


export interface OrderItem {
  id: string;
  productName: string;
  price: number;
  discount: number;
  productImages: string[];
}

export interface Invoice {
  Seller: string;
  Email: string;
  "Contact Number"?: string | null;
  Address?: string | null;
  Buyer: string;
  "Buyer Email": string;
  "Buyer Contact Number": string;
  "Buyer Address": string;
  "Invoice Number": string;
  "Invoice Date": string;
  "Product(s) Purchased": string;
  "Product ID(s)": string;
  "Product Price(s)": string;
  "Total Amount": string;
  "Payment Method": string;
  "Shipping Address": string;
  "Billing Address": string;
}

export interface Order {
  orderId: string;
  userId: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  notes?: string | null;
  invoice: Invoice;
  createdAt: string;
  items: OrderItem[];
  quantity: number;
  customerName: string;
  customerImage: string;
}

export interface OrdersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Order[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentOrders: builder.query<OrdersResponse, void>({
      query: () => ({
        url: "/orders/current-orders",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCurrentOrdersQuery } = orderApi;
