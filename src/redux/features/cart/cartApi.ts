import { baseApi } from "../../api/baseApi";

// 🧩 Product brand info
interface Brand {
  id: string;
  brandName: string;
  brandImage: string | null;
}

// 🧩 Product category info
interface Category {
  id: string;
  name: string;
}

// 🧩 Product seller info
interface Seller {
  userId: string;
  companyName: string;
  logo: string | null;
}

// 🧩 Product review count
interface ProductCount {
  review: number;
}

// 🧩 Product details
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

// 🧩 Each cart item
export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
  quantity: number;
}

// 🧩 Meta information (pagination)
interface CartMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// 🧩 Full GetCartResponse
export interface GetCartResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CartItem[];
  meta: CartMeta;
}

// 🧩 Add to Cart Request & Response
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

// 🧩 Delete Cart Item Response
export interface DeleteCartItemResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CartItem; // The deleted cart item
}

// 🧩 API Endpoints
export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add item to cart
    addToCart: builder.mutation<AddToCartResponse, AddToCartRequest>({
      query: (body) => ({
        url: "/carts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    // Get cart list
    getCart: builder.query<GetCartResponse, void>({
      query: () => ({
        url: "/carts",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    // Delete specific cart item
    deleteCartItem: builder.mutation<DeleteCartItemResponse, string>({
      query: (cartItemId) => ({
        url: `/carts/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

// 🧩 Export hooks
export const {
  useAddToCartMutation,
  useGetCartQuery,
  useDeleteCartItemMutation,
} = cartApi;
