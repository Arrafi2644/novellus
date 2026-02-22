
"use client";

import React, { useState } from "react";
import { useGetMyOrdersQuery } from "@/redux/features/order/order.api";
import { useGetSingleOrderQuery } from "@/redux/features/order/order.api"; // single order query
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, RefreshCw, Euro, Eye } from "lucide-react";
import { format } from "date-fns";

export enum OrderStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export default function MyOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { data, isLoading, isError, error, refetch } = useGetMyOrdersQuery({
    page,
    limit,
    searchTerm: searchTerm.trim() || undefined,
    status: statusFilter || undefined,
  });


  const { data: orderDetails, isLoading: isDetailsLoading } = useGetSingleOrderQuery(
    selectedOrderId!,
    { skip: !selectedOrderId }
  );

  const orders = data?.data || [];
  const meta = data?.meta;

  const handleStatusChange = (value: string) => {
    setStatusFilter(value === "all" ? "" : value);
    setPage(1);
  };

  console.log("orders", orders)


  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">My Orders</h1>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">

        <Select value={statusFilter || "all"} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" />
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
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="py-6 text-center text-red-800">
            <p className="font-medium">Failed to load orders</p>
            <p className="text-sm mt-2">
              {(error as any)?.data?.message || "Something went wrong"}
            </p>
            <Button variant="outline" className="mt-4" onClick={refetch}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* No Orders */}
      {!isLoading && !isError && orders.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <p className="text-lg">No orders found</p>
            <p className="mt-2">Try changing filters or place a new order</p>
          </CardContent>
        </Card>
      )}

      {/* Orders List */}
      {!isLoading && !isError && orders.length > 0 && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Delivery</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      #{order._id.toString()}
                    </TableCell>
                    <TableCell>
                      {format(new Date(order.createdAt!), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>{order.foods.length} items</TableCell>
                    <TableCell className="font-medium">
                      <Euro className="w-3 h-3 inline mr-1 -mt-0.5" />
                      {order.totalPrice.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          order.status === OrderStatus.COMPLETED
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : order.status === OrderStatus.CANCELLED
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : order.status === OrderStatus.PENDING
                            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                            : "bg-gray-500 hover:bg-gray-600 text-white"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.deliveryOption}</TableCell>
                    <TableCell>{order.payment?.paymentMethod || "N/A"}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedOrderId(order._id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {orders.map((order) => (
              <Card key={order._id} className="overflow-hidden">
                <CardHeader className="bg-muted/40 py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">
                        Order #{order._id.toString().slice(-8)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(order.createdAt!), "dd MMM yyyy, hh:mm a")}
                      </p>
                    </div>
                    <Badge
                      className={
                        order.status === OrderStatus.COMPLETED
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : order.status === OrderStatus.CANCELLED
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : order.status === OrderStatus.PENDING
                          ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                          : "bg-gray-500 hover:bg-gray-600 text-white"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Items</p>
                      <p className="font-medium">{order.foods.length}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total</p>
                      <p className="font-medium">
                        <Euro className="w-3 h-3 inline mr-1 -mt-0.5" />
                        {order.totalPrice.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium">{order.orderType}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Delivery</p>
                      <p className="font-medium">{order.deliveryOption}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedOrderId(order._id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {meta && meta.totalPage > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="flex items-center px-4">
                Page {page} of {meta.totalPage}
              </span>
              <Button
                variant="outline"
                disabled={page === meta.totalPage}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrderId} onOpenChange={() => setSelectedOrderId(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Order Details #{selectedOrderId?.toString()}
            </DialogTitle>
          </DialogHeader>

          {isDetailsLoading ? (
            <div className="space-y-4 py-6">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : orderDetails?.data ? (
            <div className="py-4 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Order Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Status:</strong> {orderDetails.data.status}</p>
                    <p><strong>Type:</strong> {orderDetails.data.orderType}</p>
                    <p><strong>Delivery:</strong> {orderDetails.data.deliveryOption}</p>
                    <p><strong>Date:</strong> {format(new Date(orderDetails.data.createdAt!), "dd MMM yyyy, hh:mm a")}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Payment Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Method:</strong> {orderDetails?.data?.payment?.paymentMethod || "N/A"}</p>
                    <p><strong>Amount:</strong> 
                      <Euro className="w-3 h-3 inline mx-1 -mt-0.5" />
                      {orderDetails.data.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>


              {/* Foods List */}
              <div>
                <h3 className="font-semibold mb-2">Ordered Items</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Extras</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderDetails.data.foods.map((food, index) => (
                        <TableRow key={index}>
                         
                          <TableCell>{food.food.name || "Unknown Food"}</TableCell>
                          <TableCell>{food.quantity}</TableCell>
                          <TableCell>
                            {food.ingredients && food.ingredients.length > 0 ? (
                              <ul className="list-disc list-inside text-xs">
                                {food.ingredients.map((ing, i) => (
                                  <li key={i}>
                                    {ing.name} (+€{ing.price.toFixed(2)})
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              "None"
                            )}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            €{(food.lineTotal || 0).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-bold">
                          Total:
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          €{orderDetails.data.totalPrice.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Order details not found
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}