// components/dashboard/order/UpdateOrderModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { IOrder } from "@/types";
import { useUpdateOrderMutation } from "@/redux/features/order/order.api";
export enum OrderStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}


interface UpdateOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: IOrder | null;
}

export default function UpdateOrderModal({
  open,
  onOpenChange,
  order,
}: UpdateOrderModalProps) {
  const [updateOrderStatus, { isLoading }] = useUpdateOrderMutation();

  const [status, setStatus] = useState<OrderStatus>(order?.status || OrderStatus.PENDING);
  const [note, setNote] = useState("");

  if (!order) return null;

  const handleUpdate = async () => {

    console.log(status)
    try {
      await updateOrderStatus({
        id: order._id,
        status
      }).unwrap();

      toast.success("Order status updated successfully");
      onOpenChange(false);
      setNote("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="status">New Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as OrderStatus)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={OrderStatus.PENDING}>Pending</SelectItem>
                <SelectItem value={OrderStatus.ACCEPTED}>Accepted</SelectItem>
                <SelectItem value={OrderStatus.COMPLETED}>Completed</SelectItem>
                <SelectItem value={OrderStatus.CANCELLED}>Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}