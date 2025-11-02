import { baseApi } from "../../api/baseApi";


interface Brand {
  id: string;
  brandName: string;
  brandImage: string | null;
}


interface Category {
  id: string;
  name: string;
}


interface Seller {
  userId: string;
  companyName: string;
  logo: string | null;
}


interface ProductCount {
  review: number;
}


interface Product {
  id: string;
  productName: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  productImages?: string[];
  isVisible: boolean;
  createdAt: string;
  seller: Seller;
  category: Category;
  brand: Brand;
  _count: ProductCount;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
  quantity: number;
}


interface CartMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}


export interface GetCartResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CartItem[];
  meta: CartMeta;
}


export interface AddToCartRequest {
  productId: string;
}

export interface AddToCartResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    userId: string;
    items: CartItem[];
  };
}


export interface DeleteCartItemResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CartItem; 
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

    getCart: builder.query<GetCartResponse, void>({
      query: () => ({
        url: "/carts",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),


    deleteCartItem: builder.mutation<DeleteCartItemResponse, string>({
      query: (cartItemId) => ({
        url: `/carts/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});


export const {
  useAddToCartMutation,
  useGetCartQuery,
  useDeleteCartItemMutation,
} = cartApi;
