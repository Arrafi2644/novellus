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
import { Phone, X } from "lucide-react";

export default function WelcomeMenuModal() {
const [open, setOpen] = useState(false);

useEffect(() => {
  const hasSeenModal = sessionStorage.getItem("welcomeModalShown");

  if (!hasSeenModal) {
    sessionStorage.setItem("welcomeModalShown", "true");
    setOpen(true);
  }
}, []);

useEffect(() => {
  if (!open) return;

  const timer = setTimeout(() => {
    setOpen(false);
  }, 10000);

  return () => clearTimeout(timer);
}, [open]);

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/pizzerianovellus-menu.pdf";
        link.download = "pizzerianovellus-menu.pdf";
        link.click();

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-0 overflow-hidden w-[90%] max-w-md mx-auto rounded-xl">
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
                        <button className="absolute top-4 right-4 z-20 bg-white outline-0 border-3 border-orange-500 text-orange-500 p-2 rounded-full hover:bg-black">
                            <X size={18} strokeWidth={3}/>
                        </button>
                    </DialogClose>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-6">
                        {/* Logo */}
                        {/* Ei logota visible hoccena... backeground er karone... ekhane ekta white bg diye dekhano jete pare... tobe shadow er moto kore dite hobe bg ta */}
                        {/* <Image src={logo} alt="logo" width={140} height={140} className="mb-4" /> */}
                        <div className="mb-4 p-2 h-30 w-30 flex items-center justify-center rounded-full bg-white shadow-[0_0_35px_rgba(255,255,255,0.7)]">
                            <Image
                                src={logo}
                                alt="logo"
                                width={110}
                                height={110}
                            />
                        </div>

                        {/* Dialog Title */}
                        <DialogTitle className="text-white text-2xl font-bold mb-2">
                            Welcome to Pizzeria e stuzzicheria
                        </DialogTitle>

                        <p className="text-gray-200 text-sm mb-6">
                            Discover our delicious menu and enjoy the best pizza experience.
                        </p>

                        <div className="flex gap-2 items-center mb-6 text-white text-sm">
                            <Phone size={16} />
                            <a
                                href="tel:+393313833563"
                                className="flex items-center gap-2 hover:text-orange-500 transition"
                            >
                                +39 331 3833563
                            </a>

                            <a
                                href="tel:+393931848315"
                                className="flex items-center gap-2 hover:text-orange-500 transition"
                            >
                                {/* <Phone size={16} /> */}
                                +39 3931848315
                            </a>
                        </div>

                        <Button
                            onClick={handleDownload}
                            className="bg-orange-500 hover:bg-orange-600"
                        >
                            Download Our Menu
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}