// import { baseApi } from "../../api/baseApi";

// // Define the order data interface
// export interface OrderData {
//   name: string;
//   street: string;
//   apartment?: string;
//   city: string;
//   phone: string;
//   email: string;
//   paymentMethod: string;
//   cartItems: Array<{ productId: string; quantity: number; price: number }>;
//   totalAmount: number;
//   saveForNextTime?: boolean;
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: T;
// }

// export interface PaymentSession {
//   redirectUrl: string;
// }

// const paymentApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // ✅ Create Stripe Payment Session (now only needs checkoutId)
//     createPaymentSession: builder.mutation<ApiResponse<PaymentSession>, { checkoutId: string }>({
//       query: (paymentData) => ({
//         url: `/payments/authorize-payment`,
//         method: "POST",
//         body: paymentData,
//       }),
//     }),


//     purchaseWithCOD: builder.mutation<ApiResponse<any>, { checkoutId: string; productIds: string[]; name: string; street: string; apartment?: string; city: string; phone: string; email: string; saveForNextTime?: boolean }>({
//       query: ({ checkoutId, ...body }) => ({
//         url: `/checkouts/purchase-with-cash-on-delivery/${checkoutId}`,
//         method: "POST",
//         body,
//       }),
//     }),

//   }),

// });

// export const { useCreatePaymentSessionMutation, usePurchaseWithCODMutation } = paymentApi;








import { baseApi } from "../../api/baseApi";

// Define the order data interface
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

// Generic API response interface
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

// Stripe Payment Session interface
export interface PaymentSession {
  redirectUrl: string;
}

// Cash on Delivery Response interface
export interface CODResponse {
  orderId: string;
  status: string;
  message?: string;
}

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Stripe Payment Session
    createPaymentSession: builder.mutation<ApiResponse<PaymentSession>, { checkoutId: string }>({
      query: (paymentData) => ({
        url: `/payments/authorize-payment`,
        method: "POST",
        body: paymentData,
      }),
    }),

    // ✅ Cash on Delivery
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
        body, // includes productIds and other fields
      }),
    }),
  }),
});

export const { useCreatePaymentSessionMutation, usePurchaseWithCODMutation } = paymentApi;

