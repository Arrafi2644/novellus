"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"

type OrderFailedDialogProps = {
    open: boolean
    onClose: () => void
    onRetry?: () => void
    errorMessage?: string
}

export default function OrderFailedDialog({
    open,
    onClose,
    onRetry,
    errorMessage,
}: OrderFailedDialogProps) {

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg rounded-2xl">
                <DialogHeader>
                    <div className="flex justify-center">
                        <XCircle className="h-14 w-14 text-red-500" />
                    </div>

                    <DialogTitle className="text-red-600 text-xl text-center font-bold">
                        Order Failed!
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-4 space-y-3 text-sm text-center">

                    <p className="font-medium">
                         Your order could not be completed.
                    </p>

                    {errorMessage && (
                        <div className="p-3 bg-red-100 text-red-600 rounded-lg text-sm">
                            {errorMessage}
                        </div>
                    )}

                    <p className="text-muted-foreground">
                        Please try again or choose a different payment method.
                    </p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-center gap-4">
                   <Button
                        variant="outline"
                        onClick={onClose}
                        className="rounded-xl"
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}