// import { baseApi } from "../baseApi";
// import type { IResponse } from "@/types";

// /* ======================
//    Types
// ====================== */

// interface IFoodState {
//   totalFoods: number;
//   activeFoods: number;
//   inactiveFoods: number;
// }

// interface IOrderState {
//   totalOrders: number;
//   pendingOrders: number;
//   completedOrders: number;
//   cancelledOrders: number;
//   totalRevenue: number;
//   // optional: if backend returns it in same response
//   orderTrend?: Array<{ _id: string; totalOrders: number }>;
// }


// export const stateApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({

//     // ⭐ FOOD STATE
//     getFoodState: builder.query<IResponse<IFoodState>, void>({
//       query: () => ({
//         url: "/state/food",
//         method: "GET",
//       }),
//       providesTags: ["FOODS"],
//     }),

//     // ⭐ ORDER STATE
//     getOrderState: builder.query<IResponse<IOrderState>, void>({
//       query: () => ({
//         url: "/state/order?range=7days",
//         method: "GET",
//       }),
//       providesTags: ["ORDERS"],
//     }),

//   }),
//   overrideExisting: true,
// });

// export const {
//   useGetFoodStateQuery,
//   useGetOrderStateQuery,
// } = stateApi;


import { baseApi } from "../baseApi";
import type { IResponse } from "@/types";

/* ======================
   Types
====================== */
interface IFoodItem {
  name: string;
  price: number;
  image: string;
}

interface ITopSellingFood {
  _id: string;
  totalSold: number;
  food: IFoodItem;
}

interface IFoodState {
  totalFoods: number;
  topSellingFoods: ITopSellingFood[];
  // You can add more fields later (active/inactive, trend, etc.)
}

interface IOrderTrendItem {
  _id: string;           // date like "2025-02-03"
  totalOrders: number;
}

interface IOrderState {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  orderTrend?: IOrderTrendItem[];
}

/* ======================
   API Endpoints
====================== */
export const stateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // FOOD STATE - with range support
    getFoodState: builder.query<
      IResponse<IFoodState>,
      string | undefined   // "today" | "7days" | "30days" | "all"
    >({
      query: (range) => ({
        url: "/state/food",
        method: "GET",
        ...(range ? { params: { range } } : {}),
      }),
      providesTags: ["FOODS"],
    }),

    // ORDER STATE - with range support
    getOrderState: builder.query<
      IResponse<IOrderState>,
      string | undefined
    >({
      query: (range) => ({
        url: "/state/order",
        method: "GET",
        ...(range ? { params: { range } } : {}),
      }),
      providesTags: ["ORDERS"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetFoodStateQuery,
  useGetOrderStateQuery,
} = stateApi;