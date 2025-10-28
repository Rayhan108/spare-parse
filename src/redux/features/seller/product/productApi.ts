// redux/features/product/seller/productApi.ts
import { baseApi } from "@/redux/api/baseApi";

// 🧾 TypeScript types for product
export interface SellerProduct {
  id: string;
  productName: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  productImages: string[];
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  reviewCount: number;
}

export interface SellerProductsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: SellerProduct[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// 🧩 API endpoint
export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProducts: builder.query<SellerProductsResponse, void>({
      query: () => ({
        url: "/products/my-products",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMyProductsQuery } = productApi;
