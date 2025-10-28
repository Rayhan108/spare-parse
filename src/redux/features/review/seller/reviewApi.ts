import { baseApi } from "../../../api/baseApi";

// 🧾 TypeScript types
export interface ProductReviewItem {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerImage: string;
  productId: string;
  productName: string;
  price: number;
  discount: number;
  productImages: string[];
}

export interface ProductReviewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ProductReviewItem[];
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
export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProductReviews: builder.query<ProductReviewsResponse, void>({
      query: () => ({
        url: "/reviews/my-product-reviews",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMyProductReviewsQuery } = reviewApi;
