
import { baseApi } from "../../api/baseApi";

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}


export interface Product {
  id: string;
  productName: string;
  productImages: string[];
  price: number;
  brandName: string;
  categoryId?: string;   
  brandId?: string;     
  description?: string;
  stock?: number;
  discount?: number;
  isVisible?: boolean;
  createdAt?: string;
  updatedAt?: string;
  sellerId?: string;
}

export interface Category {
  id: string;
  name: string;
  iconUrl?: string;
  products: Product[];
}

export interface Vehicle {
  brandName: string;
  modelName: string;
  engineCode: string;
}


export interface VehicleProductsData {
  vehicle: Vehicle;
  categories: Category[];
}

export interface AddProductRequest {
  categoryId: string;
  brandId: string;
  productName: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  isVisible: boolean;
  fitVehicles: string[];
  sections: Array<{
    sectionName: string;
    fields: Array<{
      fieldName: string;
      valueString?: string;
      valueFloat?: number;
    }>;
    subSections?: Array<{
      sectionName: string;
      fields: Array<{
        fieldName: string;
        valueFloat?: number;
      }>;
    }>;
  }>;
  references: Array<{
    type: string;
    number: string;
    brandId?: string;
  }>;
  shipping: Array<{
    countryCode: string;
    countryName: string;
    carrier: string;
    cost: number;
    deliveryMin: number;
    deliveryMax: number;
    isDefault?: boolean;
  }>;
}



export interface Review {
  id: string;
  userId: string;
  userName?: string; 
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ReviewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Review[];
}

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({searchTerm,page}) => {
        // const params = searchTerm ? { searchTerm } : undefined;
        return {
          url: `/products`,
          method: "GET",
          params:{searchTerm,page},
        };
      },
    }),


    getSingleProduct: builder.query<ApiResponse<Product>, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),

    getProductByEngine: builder.query<VehicleProductsData, string>({
      query: (id) => ({
        url: `/products/vehicles/${id}`,
        method: "GET",
      }),
    }),

    getReviewOfProducts: builder.query<ReviewsResponse, { id: string; params?: Record<string, string | number | boolean> }>({
      query: ({ id, params }) => ({
        url: `/reviews/product/${id}`,
        method: "GET",
        params,
      }),
    }),




    addProduct: builder.mutation<ApiResponse<Product>, FormData>({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetReviewOfProductsQuery,
  useGetProductByEngineQuery,
  useAddProductMutation,
} = productsApi;
