
import { baseApi } from "@/redux/api/baseApi";

interface CarBrandsQueryParams {
  year?: string;
  brandName?: string;
  modelName?: string;
  hp?: string | number;
}

export const carBrandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrandsByYear: builder.query({
      query: (year: string) => `/car-brands/brands/${year}`,
    }),
    getModelsByBrand: builder.query({
      query: ({ brandId, year }: { brandId: string; year: string }) =>
        `/car-brands/models/${brandId}/${year}`,
    }),
    getEnginesByModel: builder.query({
      query: (modelId: string) => `/car-brands/engines/${modelId}`,
    }),
    getCarBrands: builder.query({
      query: (params: CarBrandsQueryParams) => {
        const searchParams = new URLSearchParams();
        if (params.year) searchParams.append("year", params.year);
        if (params.brandName) searchParams.append("brandName", params.brandName);
        if (params.modelName) searchParams.append("modelName", params.modelName);
        if (params.hp) searchParams.append("hp", String(params.hp));

        return `/car-brands?${searchParams.toString()}`;
      },
    }),
  }),
});

export const {
  useGetBrandsByYearQuery,
  useGetModelsByBrandQuery,
  useGetEnginesByModelQuery,
  useGetCarBrandsQuery, 
} = carBrandApi;
