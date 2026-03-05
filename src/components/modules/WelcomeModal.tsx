"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import modalBg from "../../../public/assets/welcome-modal-bg.jpeg"
import logo from "../../../public/assets/logo-112.png"
import { X } from "lucide-react";

export default function WelcomeMenuModal() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);

        const timer = setTimeout(() => {
            setOpen(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/pizzerianovellus-menu.pdf";
        link.download = "pizzerianovellus-menu.pdf";
        link.click();

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-0 overflow-hidden max-w-md">
                {/* Background */}
                <div className="relative h-100 w-full">
                    <Image
                        src={modalBg}
                        alt="modal background"
                        fill
                        className="object-cover"
                    />

                    {/* Close Button */}
                    <DialogClose asChild>
                        <button className="absolute top-4 right-4 z-20 bg-black/50 outline-0 text-orange-500 p-2 rounded-full hover:bg-black">
                            <X size={18} />
                        </button>
                    </DialogClose>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-6">
                        {/* Logo */}
                        <Image src={logo} alt="logo" width={140} height={140} className="mb-4" />

                        {/* Dialog Title */}
                        <DialogTitle className="text-white text-2xl font-bold mb-2">
                            Welcome to Our Restaurant
                        </DialogTitle>

                        <p className="text-gray-200 text-sm mb-6">
                            Discover our delicious menu and enjoy the best pizza experience.
                        </p>

                        <Button
                            onClick={handleDownload}
                            className="bg-orange-500 hover:bg-orange-600"
                        >
                            Explore Our Menu
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}