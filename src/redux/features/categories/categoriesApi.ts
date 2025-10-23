export interface Category {
    id: string;
    userId: string;
    name: string;
    iconUrl: string;
    createdAt: string;
    updatedAt: string;
    _count: {
        product: number;
    };
}

export interface CategoriesResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Category[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}


import { baseApi } from "../../api/baseApi";
// import { CategoriesResponse, Category } from "./types";

const categoriesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Get all categories
        getAllCategories: builder.query<CategoriesResponse, void>({
            query: () => ({
                url: '/categories',
                method: 'GET',
            }),
        }),

        // Get category by ID
        getCategoryById: builder.query<Category, string>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'GET',
            }),
        }),

        // Create new category
        createCategory: builder.mutation<Category, Partial<Category>>({
            query: (data) => ({
                url: '/categories',
                method: 'POST',
                body: data,
            }),
        }),

        // Update category
        updateCategory: builder.mutation<Category, { id: string; data: Partial<Category> }>({
            query: ({ id, data }) => ({
                url: `/categories/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),

        // Delete category
        deleteCategory: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAllCategoriesQuery,
    useGetCategoryByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoriesApi;
