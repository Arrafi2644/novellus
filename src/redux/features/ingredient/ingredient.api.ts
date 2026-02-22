import { baseApi } from "../baseApi";
import type {
  GetQueryParams,
  IIngredient,
  IPaginationMeta,
  IResponse,
} from "@/types";

interface GetAllIngredientsResponse {
  success: boolean;
  data: IIngredient[];
  meta: IPaginationMeta;
}

export const ingredientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ⭐ CREATE INGREDIENT (JSON body)
    createIngredient: builder.mutation<IResponse<IIngredient>, Partial<IIngredient>>({
      query: (body) => ({
        url: "/ingredient/create-ingredient",
        method: "POST",
        data: body, // ✅ raw JSON
      }),
      invalidatesTags: ["INGREDIENTS"],
    }),

    // ⭐ UPDATE INGREDIENT (JSON body)
    updateIngredient: builder.mutation<
      IResponse<IIngredient>,
      { id: string; body: Partial<IIngredient> }
    >({
      query: ({ id, body }) => ({
        url: `/ingredient/${id}`,
        method: "PATCH",
        data: body, // ✅ raw JSON
      }),
      invalidatesTags: (result, error, { id }) => [
        "INGREDIENTS",
        { type: "INGREDIENT", id },
      ],
    }),

    // ⭐ DELETE INGREDIENT
    deleteIngredient: builder.mutation<IResponse<{ id: string }>, string>({
      query: (id) => ({
        url: `/ingredient/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "INGREDIENTS",
        { type: "INGREDIENT", id },
      ],
    }),

    // ⭐ GET SINGLE INGREDIENT (by id)
    getSingleIngredient: builder.query<IResponse<IIngredient>, string>({
      query: (id) => ({
        url: `/ingredient/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: "INGREDIENT", id },
      ],
    }),

    // ⭐ GET ALL INGREDIENTS
    getAllIngredients: builder.query<
      GetAllIngredientsResponse | undefined,
      GetQueryParams
    >({
      query: (params) => ({
        url: "/ingredient/all-ingredients",
        method: "GET",
        params,
      }),
      providesTags: ["INGREDIENTS"],
    }),

  }),

  overrideExisting: true,
});

export const {
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
  useGetSingleIngredientQuery,
  useGetAllIngredientsQuery,
} = ingredientApi;
