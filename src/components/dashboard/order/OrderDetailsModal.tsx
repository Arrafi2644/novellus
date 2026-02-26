// components/dashboard/order/OrderDetailsModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Euro } from "lucide-react";
import { format } from "date-fns";

interface OrderDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderDetails: any;     
  isDetailsLoading: boolean;
  selectedOrderId: string | null;
}

export default function OrderDetailsModal({
  open,
  onOpenChange,
  orderDetails,
  isDetailsLoading,
  selectedOrderId,
}: OrderDetailsModalProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                  <p><strong>Invoice:</strong> <a target="_blank" href={orderDetails?.data?.payment?.invoiceUrl}>Check Invoice</a></p>
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
                    {orderDetails.data.foods.map((food: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{food.food?.name || "Unknown Food"}</TableCell>
                        <TableCell>{food.quantity}</TableCell>
                        <TableCell>
                          {food.ingredients && food.ingredients.length > 0 ? (
                            <ul className="list-disc list-inside text-xs">
                              {food.ingredients.map((ing: any, i: number) => (
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
  );
}