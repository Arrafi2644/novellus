
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getSocket } from "@/lib/socket";
// import { OrderReceiptTemplate } from "@/components/shared/OrderReceiptTemplate";

export const GlobalOrderListener = () => {
    const [activeOrderForPrint, setActiveOrderForPrint] = useState<any>(null);

    // useEffect(() => {
    //     const socket = getSocket();

    //     const handleNewOrder = (order: any) => {
    //         const audio = new Audio("/sounds/notification.wav");
    //         audio.play().catch((err) => console.log("Audio play error:", err));

    //         toast.success("New order received! Printing receipt...");
    //         setActiveOrderForPrint(order);

    //         setTimeout(() => {
    //             window.print();
    //         }, 1000);
    //     };

    //     socket.on("new-order", handleNewOrder);
    //     return () => {
    //         socket.off("new-order", handleNewOrder);
    //     };
    // }, []);


    useEffect(() => {
        const socket = getSocket();

        const handleNewOrder = (order: any) => {
            const audio = new Audio("/sounds/notification.wav");
            audio.play().catch((err) => console.log("Audio play error:", err));

            toast.success("New order received! Printing receipt...");
            setActiveOrderForPrint(order);

            setTimeout(() => {
                // ✅ print শেষ হলে state clear
                const afterPrint = () => {
                    setActiveOrderForPrint(null);
                    window.removeEventListener("afterprint", afterPrint);
                };
                window.addEventListener("afterprint", afterPrint);
                window.print();
            }, 1000);
        };

        socket.on("new-order", handleNewOrder);
        return () => {
            socket.off("new-order", handleNewOrder);
        };
    }, []);

    if (!activeOrderForPrint) return null;

    return (
        <div
            id="printable-receipt"
            className="hidden print:block font-mono text-[12px] w-[58mm] leading-snug text-black bg-white p-0"
        >
            {/* <OrderReceiptTemplate order={activeOrderForPrint} /> */}
        </div>
    );
};