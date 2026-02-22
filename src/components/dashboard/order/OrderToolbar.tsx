// components/dashboard/order/OrderToolbar.tsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface OrderToolbarProps {
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export enum PaymentMethod {
    COD = "COD",
    STRIPE = "STRIPE",
}

export enum OrderStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export default function OrderToolbar({
  onSearchChange,
  onSortChange,
  onStatusChange,
}: OrderToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 my-6">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by order ID or Order Status"
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Status Filter */}
      <Select onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value={OrderStatus.PENDING}>Pending</SelectItem>
          <SelectItem value={OrderStatus.ACCEPTED}>Accepted</SelectItem>
          <SelectItem value={OrderStatus.COMPLETED}>Completed</SelectItem>
          <SelectItem value={OrderStatus.CANCELLED}>Cancelled</SelectItem>
        </SelectContent>
      </Select>

      {/* Payment Method Filter */}
      {/* <Select onValueChange={onPaymentMethodChange}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Payment Method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Methods</SelectItem>
          <SelectItem value={PaymentMethod.COD}>COD</SelectItem>
          <SelectItem value={PaymentMethod.STRIPE}>Stripe</SelectItem>
        </SelectContent>
      </Select> */}

      {/* Sort (optional) */}
      <Select onValueChange={onSortChange}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="-createdAt">Newest First</SelectItem>
          <SelectItem value="createdAt">Oldest First</SelectItem>
          <SelectItem value="-totalPrice">Highest Amount</SelectItem>
          <SelectItem value="totalPrice">Lowest Amount</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}