// types/review.ts

export interface User {
  fullName: string;
  image?: string;
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user?: User; // optional user info
}

export interface ReviewData {
  totalRatings: number;
  averageRating: number;
  reviews: Review[];
}

export interface GetProductReviewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ReviewData;
}




// services/reviewApi.ts
import { baseApi } from "../../api/baseApi";


interface GetProductReviewsRequest {
  productId: string;
  rating?: number;
}

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query<GetProductReviewsResponse, GetProductReviewsRequest>({
      query: ({ productId, rating }) => ({
        url: `/reviews/products/${productId}`,
        params: rating && rating > 0 ? { rating } : undefined,
      }),
    }),
  }),
});

export const { useGetProductReviewsQuery } = reviewApi;
