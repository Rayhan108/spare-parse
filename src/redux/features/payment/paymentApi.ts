import { baseApi } from "../../api/baseApi";

// Define the order data interface
export interface OrderData {
  name: string;
  street: string;
  apartment?: string;
  city: string;
  phone: string;
  email: string;
  paymentMethod: string;
  cartItems: Array<{ productId: string; quantity: number; price: number }>;
  totalAmount: number;
  saveForNextTime?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface PaymentSession {
  redirectUrl: string;
}

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create Stripe Payment Session (now only needs checkoutId)
    createPaymentSession: builder.mutation<ApiResponse<PaymentSession>, { checkoutId: string }>({
      query: (paymentData) => ({
        url: `/payments/authorize-payment`,
        method: "POST",
        body: paymentData,
      }),
    }),

    // ✅ Place order
    placeOrder: builder.mutation<ApiResponse<any>, OrderData>({
      query: (orderData) => ({
        url: `/orders/create`,
        method: "POST",
        body: orderData,
      }),
    }),
  }),
});

export const { useCreatePaymentSessionMutation, usePlaceOrderMutation } = paymentApi;
