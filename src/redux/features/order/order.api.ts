// src/redux/features/order/order.api.ts
import { baseApi } from "../baseApi";
import type { IResponse, GetQueryParams, IPaginationMeta, IOrder, IOrderFoodInput, IOrderResponse } from "@/types";
// import {
//   IOrder,
//   IOrderFoodInput,
//   OrderType,
//   OrderStatus,
//   DeliveryOption,
//   PaymentMethod,
// } from "@/types/order.types";


export enum PaymentMethod {
    COD = "COD",
    STRIPE = "STRIPE",
}

export enum OrderType {
  ONLINE = "ONLINE",
  POS = "POS",
}

export enum OrderStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum DeliveryOption {
  DELIVERY = "DELIVERY",
  PICKUP = "PICKUP",
}

interface GetAllOrdersResponse {
  success: boolean;
  data: IOrder[];
  meta: IPaginationMeta;
}

interface GetSingleOrderResponse {
  success: boolean;
  data: IOrder;
}

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
 // CREATE ORDER
createOrder: builder.mutation<
    IOrderResponse,
  {
    orderType: OrderType;
    foods: IOrderFoodInput[];
    deliveryOption: DeliveryOption;
    paymentMethod: PaymentMethod;
    note?: string;
    customerInfo: {
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    seller?: string;
  }
>({
  query: (orderData) => ({
    url: "/order/create-order",
    method: "POST",
    data: orderData,
  }),
  invalidatesTags: ["ORDERS", "MY_ORDERS"],
}),

deleteOrder: builder.mutation<
      IResponse<{ message: string }>,
      string // order ID
    >({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "ORDERS",
        "MY_ORDERS",
        { type: "ORDER", id },
      ],
    }),

    // UPDATE ORDER
    updateOrder: builder.mutation<
      IResponse<IOrder>,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        "ORDERS",
        { type: "ORDER", id },
      ],
    }),

    // CANCEL ORDER
    cancelOrder: builder.mutation<
      IResponse<{ message: string }>,
      { id: string; reason?: string }
    >({
      query: ({ id, reason }) => ({
        url: `/order/${id}/cancel`,
        method: "PATCH",
        data: { reason },
      }),
      invalidatesTags: (result, error, { id }) => [
        "ORDERS",
        { type: "ORDER", id },
      ],
    }),

    // GET SINGLE ORDER
    getSingleOrder: builder.query<GetSingleOrderResponse, string>({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "ORDER", id }],
    }),

    // GET ALL ORDERS
    getAllOrders: builder.query<
      GetAllOrdersResponse,
      GetQueryParams & {
        status?: OrderStatus;
        orderType?: OrderType;
        deliveryOption?: DeliveryOption;
      }
    >({
      query: (params) => ({
        url: "/order/all-orders",
        method: "GET",
        params: params,
      }),
      providesTags: ["ORDERS"],
    }),

    // GET MY ORDERS
    getMyOrders: builder.query<GetAllOrdersResponse, GetQueryParams>({
      query: (params) => ({
        url: "/order/my-orders",
        method: "GET",
        params: params,
      }),
      providesTags: ["MY_ORDERS"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useCancelOrderMutation,
  useGetSingleOrderQuery,
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
} = orderApi;