import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["USERS", "USER", "ME", "INGREDIENT", "INGREDIENTS", "CATEGORIES", "CATEGORY", "FOODS", "FOOD", "ORDERS", "ORDER", "MY_ORDERS"],
  endpoints: () => ({}),

});