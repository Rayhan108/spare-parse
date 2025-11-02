import { baseApi } from "../../api/baseApi";
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
  user?: User;
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
  data: Review[]; 
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}



export interface PostReviewRequest {
  productId: string;
  rating: number;
  comment: string;
}

export interface PostReviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Review; 
}




export interface GetProductReviewsRequest {
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

    postReview: builder.mutation<PostReviewResponse, PostReviewRequest>({
      query: (body) => ({
        url: `/reviews`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetProductReviewsQuery, usePostReviewMutation } = reviewApi;
