import { baseApi } from "../../api/baseApi"

export interface Category {
  id: string
  userId: string
  name: string
  iconUrl: string
  createdAt: string
  updatedAt: string
  _count?: {
    product: number
  }
}

export interface Brand {
  id: string
  brandName: string
  brandImage: string | null
}

export interface Seller {
  userId: string
  companyName: string
  logo: string | null
}

export interface Product {
  id: string
  productName: string
  price: number
  discount?: number
  productImages?: string[]
  stock?: number
  avgRating?: number
  totalSold?: number
  brand?: Brand
  seller?: Seller
   _count: { review: number };
}

export interface MetaData {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface CategoriesResponse {
  success: boolean
  statusCode: number
  message: string
  data: Category[]
  meta: MetaData
}

export interface SingleCategoryResponse {
  success: boolean
  statusCode: number
  message: string
  data: Category
}

export interface ProductsResponse {
  success: boolean
  statusCode: number
  message: string
  data: Product[]
}



const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoriesResponse, { page?: number; limit?: number } | void>({
      query: (params) => {
        const { page = 1, limit = 10 } = params || {}
        return {
          url: `/categories?page=${page}&limit=${limit}`,
          method: "GET",
        }
      },
    }),

    getProductsByCategory: builder.query<ProductsResponse, string>({
      query: (categoryId) => ({
        url: `/products/category-wise/${categoryId}`,
        method: "GET",
      }),
    }),
  }),
})

export const {
  useGetAllCategoriesQuery,
  useGetProductsByCategoryQuery,
} = categoriesApi

export default categoriesApi
