import { baseApi } from "../../api/baseApi";


export interface Product {
  id: string;
  productName: string;
  description?: string;
  price: number;
  discount?: number;
  stock?: number;
  productImages?: string[];
  isVisible?: boolean;
  createdAt?: string;
  seller?: {
    userId: string;
    companyName: string;
    logo?: string | null;
  };
  category?: {
    id: string;
    name: string;
  };
  brand?: {
    id: string;
    brandName: string;
    brandImage?: string | null;
  };
  _count: {
    review: number;
  };
}


export interface WishlistItem {
  id: string;         
  productId: string;
  product: Product;
}


interface WishlistApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Array<{
    id: string;
    userId: string;
    productId: string;
    createdAt: string;
    updatedAt: string;
    product: Product;
  }>;
}


export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all wishlist items
    getWishlist: builder.query<WishlistItem[], void>({
      query: () => ({
        url: "/favorite-products",
        method: "GET",
      }),
      transformResponse: (response: WishlistApiResponse) => {
        return response.data.map((item) => ({
          id: item.id,
          productId: item.productId,
          product: item.product,
        }));
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "Wishlist" as const, id: item.id })),
              { type: "Wishlist", id: "LIST" },
            ]
          : [{ type: "Wishlist", id: "LIST" }],
    }),


    addToWishlist: builder.mutation<WishlistItem, { productId: string }>({
      query: ({ productId }) => ({
        url: "/favorite-products",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),


    deleteWishlistItem: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/favorite-products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Wishlist", id },
        { type: "Wishlist", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useDeleteWishlistItemMutation,
} = wishlistApi;
