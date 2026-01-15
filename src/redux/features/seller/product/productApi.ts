


import { baseApi } from "@/redux/api/baseApi";


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


export interface DeleteProductResponse {
  success: boolean;
  statusCode: number;
  message: string;
}


export interface AddProductResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: SellerProduct;  
}


export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
 
    getMyProducts: builder.query({
      query: ({page,limit}) => ({
        url: "/products/my-products",
        method: "GET",
        params:{page,limit}
      }),
           providesTags: ["Product"]
     

    }),

    deleteProduct: builder.mutation<DeleteProductResponse, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
    }),

  
    addProduct: builder.mutation<AddProductResponse, FormData>({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData, 
      }),
  invalidatesTags: ["Product"]

    }),

    updateProduct: builder.mutation<AddProductResponse, { productId: string; formData: FormData }>({
      query: ({ productId, formData }) => ({
        url: `/products/${productId}`, 
        method: "PATCH",             
        body: formData,               
      }),
    }),

  }),
});

export const { useGetMyProductsQuery, useDeleteProductMutation, useAddProductMutation , useUpdateProductMutation } = productApi;
