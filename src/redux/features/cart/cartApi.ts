import { baseApi } from "../../api/baseApi";

interface AddToCartRequest {
  productId: string;
}

interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  product: {
    id: string;
    productName: string;
    productImages: string[];
    price: number;
  };
}

interface AddToCartResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    userId: string;
    items: CartItem[];
  };
}

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation<AddToCartResponse, AddToCartRequest>({
      query: (body) => ({
        url: "/carts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useAddToCartMutation } = cartApi;
