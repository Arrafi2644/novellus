import { baseApi } from "../baseApi";
import type { IFood, IResponse, GetQueryParams, IPaginationMeta } from "@/types";

interface GetAllFoodsResponse {
  success: boolean;
  data: IFood[];
  meta: IPaginationMeta;
}

export const foodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ⭐ CREATE FOOD
    createFood: builder.mutation<IResponse<IFood>, FormData>({
      query: (formData) => ({
        url: "/food/create-food",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["FOODS"],
    }),

    // ⭐ UPDATE FOOD
    updateFood: builder.mutation<IResponse<IFood>, { _id: string; formData: FormData }>({
      query: ({ _id, formData }) => ({
        url: `/food/${_id}`,
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags: (result, error, { _id }) => ["FOODS", { type: "FOOD", _id }],
    }),

    // ⭐ DELETE FOOD
    deleteFood: builder.mutation<IResponse<{ id: string }>, string>({
      query: (id) => ({
        url: `/food/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => ["FOODS", { type: "FOOD", id }],
    }),

    // ⭐ GET SINGLE FOOD
    getSingleFood: builder.query<IResponse<IFood>, string>({
      query: (slug) => ({
        url: `/food/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "FOOD", id: slug }],
    }),

    // ⭐ GET ALL FOODS
    getAllFoods: builder.query<GetAllFoodsResponse, GetQueryParams>({
      query: (params) => ({
        url: "/food/all-foods",
        method: "GET",
        params,
      }),
      providesTags: ["FOODS"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
  useGetSingleFoodQuery,
  useGetAllFoodsQuery,
} = foodApi;
