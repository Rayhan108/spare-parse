
import { baseApi } from "@/redux/api/baseApi";

export type OrderStatus = string;


export interface Snapshot {
  id: string;
  userId: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  apartmentNo: string | null;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  type: "SHIPPING" | "BILLING";
  createdAt: string;
  updatedAt: string;
}


export interface UpdateOrderStatusResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    userId: string;
    sellerId: string;
    paymentId: string;
    shippingId: string;
    billingId: string;
    totalAmount: number;
    status: OrderStatus;
    paymentStatus: string;
    transactionId: string | null;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    shippingSnapshot: Snapshot;
    billingSnapshot: Snapshot;

  };
}


export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOrderStatus: builder.mutation<
      UpdateOrderStatusResponse,
      { orderId: string; status: OrderStatus }
    >({
      query: ({ orderId, status }) => ({
        url: `/orders/update-order-status/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const { useUpdateOrderStatusMutation } = orderApi;
