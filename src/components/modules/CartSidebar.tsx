
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, Euro } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  CartItem,
  getCart,
  removeFromCart,
  removeIngredientFromCart,
  updateQuantity,
} from "@/utils/cart-helper";
import { CheckoutForm } from "../auth/CheckoutForm";

export enum DeliveryOption {
  DELIVERY = "DELIVERY",
  PICKUP = "PICKUP",
}

export default function CartSidebar() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [delivery, setDelivery] = useState<DeliveryOption>(DeliveryOption.DELIVERY);
  const [checkout, setCheckout] = useState(false);

  // Cart load করা + real-time update
  useEffect(() => {
    async function loadCart() {
      const storedCart = await getCart();
      setCart(storedCart);
    }

    loadCart();

    window.addEventListener("cart-updated", loadCart);
    return () => {
      window.removeEventListener("cart-updated", loadCart);
    };
  }, []);


  const handleIncrease = (id: string) => {
    const updated = updateQuantity(id, (cart.find(i => i.id === id)?.quantity || 0) + 1);
    setCart(updated);
  };

  const handleDecrease = (id: string) => {
    const currentQty = cart.find(i => i.id === id)?.quantity || 1;
    if (currentQty <= 1) return;
    const updated = updateQuantity(id, currentQty - 1);
    setCart(updated);
  };

  const handleRemove = async (id: string) => {
    const updated = await removeFromCart(id);
    setCart(updated);
    toast.success("Item removed from cart");
  };

  const handleRemoveIngredient = (itemId: string, ingredientName: string) => {
    const updatedCart = removeIngredientFromCart(itemId, ingredientName);
    setCart(updatedCart);
    const itemName = updatedCart.find(i => i.id === itemId)?.name || "item";
    toast.success(`Removed ${ingredientName} from ${itemName}`);
  };

  // Subtotal হিসাব — শুধু extra ingredients-এর দাম যোগ হবে (base price + extras)
  const subtotal = cart.reduce((sum, item) => {
    const baseTotal = item.price * item.quantity;
    const extrasTotal = (item.extrasTotal || 0) * item.quantity;
    return sum + baseTotal + extrasTotal;
  }, 0);

  useEffect(() => {
    if (subtotal < 7) {
      setDelivery(DeliveryOption.PICKUP);
    }
  }, [subtotal]);

  return (
    <div className="w-full sticky top-46 h-[calc(100vh-11.5rem)] overflow-y-auto bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Delivery / Pickup Toggle */}
      <div className="flex border-b">

        <button
          disabled={subtotal < 7}
          onClick={() => setDelivery(DeliveryOption.DELIVERY)}
          className={`flex-1 py-4 text-center font-medium transition-colors ${subtotal < 7
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : delivery === DeliveryOption.DELIVERY
                ? "bg-pink-50 border-b-2 border-pink-500 text-pink-700"
                : "hover:bg-gray-50 text-gray-700"
            }`}
        >
          Delivery
          <span className="block text-xs mt-0.5">
            {subtotal < 7 ? "Minimum 7€ required" : "15 - 25 mins"}
          </span>
        </button>


        <button
          onClick={() => setDelivery(DeliveryOption.PICKUP)}
          className={`flex-1 py-4 text-center font-medium transition-colors ${delivery === DeliveryOption.PICKUP
            ? "bg-pink-50 border-b-2 border-pink-500 text-pink-700"
            : "hover:bg-gray-50 text-gray-700"
            }`}
        >
          Pick-up
          <span className="block text-xs text-gray-500 mt-0.5">10 - 25 mins</span>
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Your items</h3>

        {cart.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">Your cart is empty</p>
        )}

        {cart.map((item) => (
          <div key={item.id} className="mb-6">
            <div className="flex gap-4">
              {/* Image */}
              <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={item.image || "/placeholder-food.jpg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-pink-600 flex items-center gap-1">
                    <Euro size={14} />
                    {(item.price * item.quantity).toFixed(2)}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="flex items-center border rounded-full">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        disabled={item.quantity <= 1}
                        onClick={() => handleDecrease(item.id)}
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => handleIncrease(item.id)}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Extra Ingredients */}
            {item.extraIngredients && item.extraIngredients.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium mb-1.5">Extra Ingredients:</p>
                <div className="space-y-2">
                  {item.extraIngredients.map((extra) => (
                    <div
                      key={extra._id || extra.name}
                      className="flex items-center justify-between text-sm bg-gray-50 px-3 py-1.5 rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <span>{extra.name}</span>
                        <span className="text-pink-600 flex items-center gap-1">
                          <Euro size={12} /> {extra.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveIngredient(item.id, extra.name)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                        title="Remove this extra ingredient"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator className="my-5" />
          </div>
        ))}
      </div>

      {/* Total & Checkout */}
      <div className="p-5 space-y-6 border-t">
        <div className="flex justify-between items-baseline text-xl">
          <span className="font-bold">Total</span>
          <span className="font-bold flex items-center gap-1">
            <Euro size={18} /> {subtotal.toFixed(2)}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {checkout ? (
            <motion.div
              key="checkout-form"
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <CheckoutForm deliveryOption={delivery} setCheckout={setCheckout} />
            </motion.div>
          ) : (
            <motion.div
              key="proceed-button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                disabled={cart.length === 0}
                onClick={() => setCheckout(true)}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-6 text-base font-medium rounded-xl"
              >
                Proceed to Checkout
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}