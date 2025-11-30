import { baseApi } from "../../api/baseApi";

export interface CheckoutRequest {
  productIds: string[];
}


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



export interface CheckoutData {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: CheckoutItem[];
  shippingCost: number|string;
}



export interface CheckoutResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CheckoutData;
}

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckout: builder.mutation<CheckoutResponse, CheckoutRequest>({
      query: (body) => ({
        url: "/checkouts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),


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
