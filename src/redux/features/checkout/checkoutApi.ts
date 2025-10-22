import { baseApi } from "../../api/baseApi";

// 🧩 Request body — simplified to only productIds
export interface CheckoutRequest {
  productIds: string[];
}

// 🧩 Each checkout item in response
export interface CheckoutItem {
  id: string;
  checkoutId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: {
    id: string;
    productName: string;
    price: number;
    discount: number;
    productImages: string[];
  };
}

// 🧩 Checkout data
// export interface CheckoutData {
//   id: string;
//   userId: string;
//   totalAmount: number;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   items: CheckoutItem[];
//   length: number;
// }\

export interface CheckoutData {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: CheckoutItem[];
}

// API returns: CheckoutData[]


// 🧩 Full API response
export interface CheckoutResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CheckoutData;
}

// 🧩 API endpoint
export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create checkout
    createCheckout: builder.mutation<CheckoutResponse, CheckoutRequest>({
      query: (body) => ({
        url: "/checkouts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    // ✅ Get all checkout data (no params)
    getCheckout: builder.query<CheckoutResponse, void>({
      query: () => ({
        url: "/checkouts",
        method: "GET",
      }),
      providesTags: ["Checkouts"],
    }),
  }),
});

export const { useCreateCheckoutMutation, useGetCheckoutQuery } = checkoutApi;
