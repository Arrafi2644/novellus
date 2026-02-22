"use client";

import { updateQuantity } from "@/utils/cart-helper";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartQuantityButtons({ item }: any) {
  const router = useRouter();

  const update = async (qty: number) => {
    await updateQuantity(item.id, qty);
    router.refresh(); // 🔥 realtime
  };

  return (
    <div className="flex items-center gap-3 mt-2">
      <button onClick={() => update(0)}>
        <Trash2 size={16} />
      </button>

      <button onClick={() => update(item.quantity - 1)}>
        <Minus size={16} />
      </button>

      <span>{item.quantity}</span>

      <button onClick={() => update(item.quantity + 1)}>
        <Plus size={16} />
      </button>
    </div>
  );
}
