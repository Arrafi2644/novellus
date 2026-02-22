// components/CartBadge.tsx
"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react"; // or your icon

export default function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Your real cart count logic here
    const cart = JSON.parse(localStorage.getItem("cart_items") || "[]");
    const total = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
    setCount(total);
  }, []);

  if (count === 0) return <ShoppingCart />; // or your empty cart icon

  return (
    <div className="relative">
      <ShoppingCart />
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF2B85] text-white text-xs rounded-full flex items-center justify-center">
        {count}
      </span>
    </div>
  );
}