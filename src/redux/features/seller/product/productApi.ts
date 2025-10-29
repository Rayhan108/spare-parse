// // // redux/features/product/seller/productApi.ts
// // import { baseApi } from "@/redux/api/baseApi";

// // // 🧾 TypeScript types for product
// // export interface SellerProduct {
// //   id: string;
// //   productName: string;
// //   description: string;
// //   price: number;
// //   discount: number;
// //   stock: number;
// //   productImages: string[];
// //   isVisible: boolean;
// //   createdAt: string;
// //   updatedAt: string;
// //   reviewCount: number;
// // }

// // export interface SellerProductsResponse {
// //   success: boolean;
// //   statusCode: number;
// //   message: string;
// //   data: SellerProduct[];
// //   meta: {
// //     page: number;
// //     limit: number;
// //     total: number;
// //     totalPages: number;
// //     hasNextPage: boolean;
// //     hasPrevPage: boolean;
// //   };
// // }

// // // 🧩 API endpoint
// // export const productApi = baseApi.injectEndpoints({
// //   endpoints: (builder) => ({
// //     getMyProducts: builder.query<SellerProductsResponse, void>({
// //       query: () => ({
// //         url: "/products/my-products",
// //         method: "GET",
// //       }),
// //     }),
// //   }),
// // });

// // export const { useGetMyProductsQuery } = productApi;



// // redux/features/product/seller/productApi.ts
// import { baseApi } from "@/redux/api/baseApi";

// // 🧾 TypeScript types for product
// export interface SellerProduct {
//   id: string;
//   productName: string;
//   description: string;
//   price: number;
//   discount: number;
//   stock: number;
//   productImages: string[];
//   isVisible: boolean;
//   createdAt: string;
//   updatedAt: string;
//   reviewCount: number;
// }

// export interface SellerProductsResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: SellerProduct[];
//   meta: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPages: number;
//     hasNextPage: boolean;
//     hasPrevPage: boolean;
//   };
// }

// // ✅ Type for delete product response
// export interface DeleteProductResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
// }

// // 🧩 API endpoints
// export const productApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getMyProducts: builder.query<SellerProductsResponse, void>({
//       query: () => ({
//         url: "/products/my-products",
//         method: "GET",
//       }),
//     }),
//     deleteProduct: builder.mutation<DeleteProductResponse, string>({
//       query: (productId) => ({
//         url: `/products/${productId}`,
//         method: "DELETE",
//       }),
//     }),

//        // New Mutation to Add a Product
//         addProduct: builder.mutation<ApiResponse<Product>, FormData>({
//             query: (formData) => ({
//                 url: "/products",
//                 method: "POST",
//                 body: formData,
//             }),
//         }),
//   }),
// });

// export const { useGetMyProductsQuery, useDeleteProductMutation } = productApi;



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
  productImages: string[];  // Array of image URLs
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

// ✅ Type for delete product response
export interface DeleteProductResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

// ✅ Type for add product response
export interface AddProductResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: SellerProduct;  // Assuming the product returned is similar to SellerProduct
}

// 🧩 API endpoints
export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch the products of the seller
    getMyProducts: builder.query<SellerProductsResponse, void>({
      query: () => ({
        url: "/products/my-products",
        method: "GET",
      }),
    }),

    // Delete a product by ID
    deleteProduct: builder.mutation<DeleteProductResponse, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
    }),

    // Add a new product (with FormData for file uploads)
    addProduct: builder.mutation<AddProductResponse, FormData>({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData, // Passing FormData directly
      }),
    }),
  }),
});

export const { useGetMyProductsQuery, useDeleteProductMutation, useAddProductMutation } = productApi;
