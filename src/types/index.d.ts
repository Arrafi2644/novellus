export interface IIngredient {
  name: string;
  price: number;
}

export interface IVariant {
  size: string;           
  price: number;
  offerPrice?: number;   
  totalStock: number;
}

export interface IFood {
  _id?: Types.ObjectId;
  name: string;
  slug: string;
  category: ICategory;
  description: string;
  image: string;
  status: FoodStatus;
  ingredients?: Types.ObjectId[];
  totalSell: number;
  unit: string;
  variants: IVariant[];
}

import { ISiteInfo } from '@/types';
export type UserRole = "ADMIN" | "EDITOR";
export type TRole = "EDITOR" | "ADMIN"

export type GetQueryParams = {
  searchTerm?: string;
  sort?: string;
  category?: string;
  page?: number;
  limit?: number;
  status?: string;
};

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  paymentMethod?: string;
  status?: string;
}

import type { ComponentType } from "react"

export type { ILogin, IRegister } from "./auth.type"

export interface IResponse<T> {
  statusCode: number
  success: boolean
  message: string
  data: T
}

export interface ISidebarItem {
  title: string,
  items: {
    title: string,
    url: string,
    component: ComponentType
  }[]

}
export interface IUser {
  _id: string
  name: string
  email: string
  role: "OWNER" | "SELLER" | "USER"
  password: string
  picture: string
  phone?: string
  address?: string
  createdAt: string
  updatedAt: string
}

export interface IUserApiResponse {
  data: IUser;
}

export enum CategoryStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface ICategory {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  status: CategoryStatus;
}


export enum FoodStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}


export enum PaymentMethod {
    COD = "COD",
    STRIPE = "STRIPE",
}

export enum OrderType {
  ONLINE = "ONLINE",
  POS = "POS",
}

export interface IOrderFoodInput {
    food: string; // frontend sends string _id
    quantity: number;
    ingredients?: {
        name: string;
        price: number;
    }[];
};

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

export interface IOrderIngredient {
  name: string;
  price: number;
}

export interface IOrderFood {
  food: Types.ObjectId;
  quantity: number;
  ingredients?: IOrderIngredient[];
  unitPrice: number;
  lineTotal: number;
}

export interface IOrder {
  _id?: Types.ObjectId;

  orderType: OrderType;
  user?: Types.ObjectId;
  seller?: Types.ObjectId;

  foods: IOrderFood[];
  totalPrice: number;

  /** 🔥 Payment reference */
  payment?: Types.ObjectId;

  deliveryOption: DeliveryOption;
  deliveryAddress?: string;

  status: OrderStatus;

  createdAt?: Date;
  updatedAt?: Date;
}


export interface IPayment {
  _id: Types.ObjectId;
  order: Types.ObjectId;
  paymentMethod: PaymentMethod;
  paymentStatus: "PAID" | "UNPAID" | "PENDING";
  transactionId: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IOrderExtended extends IOrder {
  payment?: IPayment;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IOrderResponseData {
  order: IOrderExtended;
  checkoutUrl: string | null;
  invoiceUrl: string | null;
}

export interface IOrderResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IOrderResponseData;
}


export interface IIngredient {
    _id?: string;
    name: string;
    price: number;
}


export interface IVariant {
  size: string;       
  price: number;
  offerPrice?: number;
  totalStock: number;
}

export interface IFood {
  _id?: Types.ObjectId;
  name: string;
  slug: string;
  category: Types.ObjectId;
  description: string;
  image: string;
  status: FoodStatus;
  ingredients?: Types.ObjectId[];
  totalSell: number;
  unit: string;
  variants: IVariant[];
}