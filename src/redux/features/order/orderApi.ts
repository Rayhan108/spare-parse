// redux/features/order/orderApi.ts
import { baseApi } from "../../api/baseApi";

// Order Item
export interface OrderItem {
  id: string;
  productName: string;
  price: number;
  discount?: number;
  productImages: string[];
  quantity: number;
}

// Shipping/Billing
export interface AddressType {
  id: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  type: "SHIPPING" | "BILLING";
}

// Order
export interface Order {
  orderId: string;
  userId: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  shipping: AddressType;
  billing: AddressType;
}

export interface GetOrdersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Order[];
}

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query<GetOrdersResponse, void>({
      query: () => ({
        url: "/orders/my-orders",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMyOrdersQuery } = orderApi;
