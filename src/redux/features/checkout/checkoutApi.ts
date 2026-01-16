// src/redux/features/checkout/checkoutApi.ts
import { baseApi } from "../../api/baseApi";

export interface CheckoutRequest {
  productIds: string[];
}

export interface ShippingOption {
  id: string;
  cost: number;
  countryCode: string;
  countryName: string;
  carrier: string;
  deliveryMin: number;
  deliveryMax: number;
}

export interface CheckoutItem {
  id: string;
  checkoutId: string;
  productId: string;
  quantity: number;
  shippingOptionId: string | null;
  shippingCost: number | null;
  shippingCarrier: string | null;
  shippingCountry: string | null;
  estimatedDelivery: string | null;
  createdAt: string;
  updatedAt: string;
  product: {
    id: string;
    productName: string;
    price: number;
    discount: number;
    afterDiscount: number;
    productImages: string[];
    shippings?: ShippingOption[];
  };
  shippingOption?: {
    id: string;
    productId: string;
    countryName: string;
    countryCode: string;
    carrier: string;
    cost: number;
    deliveryMin: number;
    deliveryMax: number;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
}

export interface CheckoutData {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: CheckoutItem[];
}

export interface CheckoutResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CheckoutData | CheckoutData[];
}

export interface ShippingSelection {
  checkoutItemId: string;
  shippingOptionId: string;
}

export interface UpdateCheckoutShippingRequest {
  checkoutId: string;
  shippingSelections: ShippingSelection[];
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

    updateCheckoutShipping: builder.mutation<CheckoutResponse, UpdateCheckoutShippingRequest>({
      query: ({ checkoutId, shippingSelections }) => ({
        url: `/checkouts/${checkoutId}/shipping`,
        method: "PATCH",
        body: {
          shippingSelections,
        },
      }),
      invalidatesTags: ["Checkouts"],
    }),
    
  }),
});

export const { 
  useCreateCheckoutMutation, 
  useGetCheckoutQuery,
  useUpdateCheckoutShippingMutation 
} = checkoutApi;