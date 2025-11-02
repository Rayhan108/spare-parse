

import { baseApi } from "../../api/baseApi";

export interface OrderData {
  name: string;
  productIds: string[]; 
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


export interface CODResponse {
  orderId: string;
  status: string;
  message?: string;
}

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createPaymentSession: builder.mutation<ApiResponse<PaymentSession>, { checkoutId: string }>({
      query: (paymentData) => ({
        url: `/payments/authorize-payment`,
        method: "POST",
        body: paymentData,
      }),
    }),


    purchaseWithCOD: builder.mutation<
      ApiResponse<CODResponse>,
      {
        checkoutId: string;
        productIds: string[];
        name: string;
        street: string;
        apartment?: string;
        city: string;
        phone: string;
        email: string;
        saveForNextTime?: boolean;
      }
    >({
      query: ({ checkoutId, ...body }) => ({
        url: `/checkouts/purchase-with-cash-on-delivery/${checkoutId}`,
        method: "POST",
        body, 
      }),
    }),
  }),
});

export const { useCreatePaymentSessionMutation, usePurchaseWithCODMutation } = paymentApi;

