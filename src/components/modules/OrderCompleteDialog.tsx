"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

type OrderCompleteDialogProps = {
    open: boolean
    onClose: () => void
    order: any
}

export default function OrderCompleteDialog({
    open,
    onClose,
    order,
}: OrderCompleteDialogProps) {
    if (!order) return null

    const isDelivery = order.deliveryOption === "DELIVERY"

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg rounded-2xl">
                <DialogHeader>
                    <div className="flex justify-center">
                        <CheckCircle2 className="h-14 w-14 text-green-500" />
                    </div>
                    <DialogTitle className="text-green-600 text-xl text-center font-bold">
                        Order Completed Successfully!
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-4 space-y-3 text-sm">

                    {/* Order ID */}
                    <div>
                        <span className="font-semibold">Order ID:</span>{" "}
                        {order._id}
                    </div>

                    {/* Foods List */}
                    <div>
                        <span className="font-semibold">Foods:</span>
                        <ul className="list-disc ml-5 mt-1 space-y-1">
                            {order.foods?.map((item: any, index: number) => (
                                <li key={index}>
                                    {item.food?.name} × {item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Payment */}
                    <div>
                        <span className="font-semibold">Payment:</span>{" "}
                        {order.payment?.paymentMethod}
                    </div>

                    {/* Delivery Option */}
                    <div>
                        <span className="font-semibold">Delivery:</span>{" "}
                        {order.deliveryOption}
                    </div>

                    {/* Time Message */}
                    <div className="mt-3 p-3 bg-muted rounded-lg text-sm font-medium">
                        {isDelivery
                            ? "🚚 This food will be ready for delivery in 30-45 minutes."
                            : "🍽️ This food will be ready for pickup in 10-15 minutes."}
                    </div>
                </div>

                {/* Close Button */}
                <div className="mt-6 flex justify-center">
                    <Button onClick={onClose} className="rounded-xl">
                        Browse More Foods
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}