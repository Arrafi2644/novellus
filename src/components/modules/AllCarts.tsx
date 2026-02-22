
// "use client";
// import React, { useState } from "react";
// import { Euro, X } from "lucide-react";
// import { Button } from "../ui/button";
// import {
//     Sheet,
//     SheetContent,
//     SheetHeader,
//     SheetTitle,
//     SheetFooter,
//     SheetClose,
// } from "../ui/sheet";
// import { CheckoutForm } from "../auth/CheckoutForm";

// interface CartItem {
//     id: string;
//     name: string;
//     price: number;
//     quantity: number;
//     image?: string;
// }

// interface CartSidebarProps {
//     isOpen: boolean;
//     onClose: () => void;
//     cartItems: CartItem[];
// }

// const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cartItems }) => {
//     const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     const [checkout, setCheckout] = useState(false)


//     return (
//         <Sheet open={isOpen} onOpenChange={onClose}>
//             <SheetContent
//                 side="right"
//                 className="shadow-[ -8px_0_15px_rgba(0,0,0,0.2) ] [&>button]:hidden"
//             >
//                 <SheetHeader>
//                     <div className="flex items-center justify-between w-full">
//                         <SheetTitle className="text-xl">All Carts</SheetTitle>
//                         <SheetClose asChild>
//                             <button className="p-1 hover:bg-gray-100 rounded-full">
//                                 <X className="w-6 h-6 text-gray-900" />
//                             </button>
//                         </SheetClose>
//                     </div>
//                 </SheetHeader>

//                 {/* Cart Items */}
//                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                     {cartItems.length === 0 ? (
//                         <p className="text-gray-500 text-sm">Your cart is empty.</p>
//                     ) : (
//                         cartItems.map((item) => (
//                             <div key={item.id} className="flex items-center gap-3">
//                                 {item.image && (
//                                     <img
//                                         src={item.image}
//                                         alt={item.name}
//                                         className="w-16 h-16 object-cover rounded"
//                                     />
//                                 )}
//                                 <div className="flex-1">
//                                     <h3 className="text-sm font-medium">{item.name}</h3>
//                                     <p className="text-gray-500 text-sm flex items-center">
//                                         {item.quantity} × <span className="ml-1"><Euro size={13} /></span>{item.price.toFixed(2)}
//                                     </p>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>

//                 {/* Footer */}
//                 {cartItems.length > 0 && (
//                     <SheetFooter className="p-4 border-t border-gray-200">
//                         <div className="flex justify-between items-center mb-4">
//                             <span className="font-medium text-gray-900">Total:</span>
//                             <span className="font-semibold text-gray-900 flex items-center" ><span><Euro size={16} /></span>{totalPrice.toFixed(2)}</span>
//                         </div>
//                         {
//                             checkout ?
//                                 <CheckoutForm /> :
//                                 <Button onClick={() => setCheckout(true)} className={`w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white py-6 text-base font-medium rounded-xl`}>
//                                     Proceed to Checkout
//                                 </Button>
//                         }
//                     </SheetFooter>
//                 )}
//             </SheetContent>
//         </Sheet>
//     );
// };



// // export default CartSidebar;
// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Trash2, Plus, Minus, Euro, X } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
// import { toast } from "sonner";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetClose,
// } from "@/components/ui/sheet";
// import {
//   removeFromCart,
//   removeIngredientFromCart,
//   updateQuantity,
// } from "@/utils/cart-helper";
// import { CheckoutForm } from "../auth/CheckoutForm";
// import { motion, AnimatePresence } from "framer-motion";

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image?: string;
//   ingredients?: { name: string; price: number }[];
// }

// interface CartSheetProps {
//   isOpen: boolean;
//   onClose: () => void;
//   cartItems: CartItem[];
//   onCartUpdate?: (updatedCart: CartItem[]) => void;
// }

// export default function CartSheet({
//   isOpen,
//   onClose,
//   cartItems,
//   onCartUpdate,
// }: CartSheetProps) {
//   const [delivery, setDelivery] = useState<"delivery" | "pickup">("delivery");
//   const [checkout, setCheckout] = useState(false);

//   const subtotal = cartItems.reduce((sum, item) => {
//     let itemTotal = item.price * item.quantity;
//     if (item.ingredients && item.ingredients.length > 0) {
//       const ingSum = item.ingredients.reduce((s, ing) => s + ing.price, 0);
//       itemTotal += ingSum * item.quantity;
//     }
//     return sum + itemTotal;
//   }, 0);

//   const handleIncrease = (id: string) => {
//     const updated = updateQuantity(id, (cartItems.find(i => i.id === id)?.quantity || 1) + 1);
//     onCartUpdate?.(updated);
//   };

//   const handleDecrease = (id: string) => {
//     const currentQty = cartItems.find(i => i.id === id)?.quantity || 1;
//     if (currentQty <= 1) return;
//     const updated = updateQuantity(id, currentQty - 1);
//     onCartUpdate?.(updated);
//   };

//   const handleRemove = async (id: string) => {
//     const updated = await removeFromCart(id);
//     onCartUpdate?.(updated);
//     toast.success("Item removed from cart");
//   };

//   const handleRemoveIngredient = (itemId: string, ingredientName: string) => {
//     const updatedCart = removeIngredientFromCart(itemId, ingredientName);
//     onCartUpdate?.(updatedCart);
//     const itemName = updatedCart.find((i) => i.id === itemId)?.name || "item";
//     toast.success(`Removed ${ingredientName} from ${itemName}`);
//   };

//   return (
//     <Sheet open={isOpen} onOpenChange={onClose}>
//       <SheetContent side="right" className=" min-w-74 p-0 flex flex-col  [&>button]:hidden">
//         {/* Header with close */}
//         <SheetHeader className="p-4 border-b">
//           <div className="flex items-center justify-between">
//             <SheetTitle className="text-xl font-semibold">All Carts</SheetTitle>
//             <SheetClose asChild>
//               <Button variant="ghost" size="icon">
//                 <X className="h-8 w-8" />
//               </Button>
//             </SheetClose>
//           </div>
//         </SheetHeader>

//         {/* Delivery / Pickup toggle */}
//         <div className="flex border-b p-4">
//           <button
//             onClick={() => setDelivery("delivery")}
//             className={`flex-1 py-3.5 text-center font-medium transition-colors ${
//               delivery === "delivery"
//                 ? "bg-white border-b-2 border-pink-600 text-pink-700"
//                 : "bg-gray-50 text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             Delivery
//             <span className="block text-xs text-gray-500 mt-0.5">15–25 mins</span>
//           </button>
//           <button
//             onClick={() => setDelivery("pickup")}
//             className={`flex-1 py-3.5 text-center font-medium transition-colors ${
//               delivery === "pickup"
//                 ? "bg-white border-b-2 border-pink-600 text-pink-700"
//                 : "bg-gray-50 text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             Pickup
//             <span className="block text-xs text-gray-500 mt-0.5">10–25 mins</span>
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div className="flex-1 overflow-y-auto p-4">
//           {cartItems.length === 0 ? (
//             <p className="text-center text-gray-500 py-10">Your cart is empty</p>
//           ) : (
//             cartItems.map((item) => (
//               <div key={item.id} className="mb-6">
//                 <div className="flex gap-4">
//                   <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
//                     <Image
//                       src={item.image || "/placeholder-food.jpg"}
//                       alt={item.name}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>

//                   <div className="flex-1">
//                     <h4 className="font-medium">{item.name}</h4>
//                     <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>


//                     <div className="flex items-center justify-between mt-3">
//                       <span className="font-bold text-pink-600 flex items-center gap-1">
//                         <Euro size={14} />
//                         {(item.price * item.quantity).toFixed(2)}
//                       </span>

//                       <div className="flex items-center gap-4">
//                         <button
//                           onClick={() => handleRemove(item.id)}
//                           className="text-red-500 hover:text-red-700 ml-2"
//                         >
//                           <Trash2 size={18} />
//                         </button>

//                         <div className="flex items-center border rounded-full">
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 rounded-none"
//                             disabled={item.quantity <= 1}
//                             onClick={() => handleDecrease(item.id)}
//                           >
//                             <Minus size={16} />
//                           </Button>
//                           <span className="px-4 font-medium">{item.quantity}</span>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 rounded-none"
//                             onClick={() => handleIncrease(item.id)}
//                           >
//                             <Plus size={16} />
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                     {/* Extra Ingredients */}
//                     {item.ingredients && item.ingredients.length > 0 && (
//                       <div className="mt-3 flex flex-col">
//                         <p className="text-sm font-medium mb-1.5">Extra Ingredients:</p>
//                         <div className="space-y-2 flex items-start gap-2 flex-wrap">
//                           {item.ingredients.map((extra) => (
//                             <div
//                               key={extra.name}
//                               className="flex items-center justify-between text-sm bg-gray-50 px-3 py-1.5 rounded-md"
//                             >
//                               <div className="flex items-center gap-2">
//                                 <span>{extra.name}</span>
//                                 <span className="text-pink-600 flex items-center">
//                                   <Euro size={12} />{extra.price}
//                                 </span>
//                               </div>
//                               <button
//                                 onClick={() => handleRemoveIngredient(item.id, extra.name)}
//                                 className="ml-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
//                                 title="Remove this ingredient"
//                               >
//                                 <Trash2 size={14} />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

                
//                 <Separator className="my-5" />
//               </div>
//             ))
//           )}
//         </div>

//         {/* Footer */}
//         {cartItems.length > 0 && (
//           <div className="p-5 space-y-6 border-t">
//             <div className="flex justify-between items-baseline text-xl">
//               <span className="font-bold">Total</span>
//               <span className="font-bold flex items-center gap-1">
//                 <Euro size={18} /> {subtotal.toFixed(2)}
//               </span>
//             </div>

//            <AnimatePresence mode="wait">
//     {checkout ? (
//       <motion.div
//         key="checkout-form"
//         initial={{ opacity: 0, height: 0, y: 20 }}
//         animate={{ opacity: 1, height: "auto", y: 0 }}
//         exit={{ opacity: 0, height: 0, y: -20 }}
//         transition={{
//           duration: 0.4,
//           ease: "easeInOut",
//           height: { duration: 0.5 },
//         }}
//         className="overflow-hidden" // height animation-এর জন্য দরকার
//       >
//         <CheckoutForm />
//       </motion.div>
//     ) : (
//       <motion.div
//         key="proceed-button"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Button
//           disabled={checkout}
//           onClick={() => setCheckout(true)}
//           className="w-full bg-pink-600 hover:bg-pink-700 text-white py-6 text-base font-medium rounded-xl"
//         >
//           Proceed to Checkout
//         </Button>
//       </motion.div>
//     )}
//   </AnimatePresence>
//           </div>
//         )}
//       </SheetContent>
//     </Sheet>
//   );
// }


// -------------------------------------------------------------------


// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Trash2, Plus, Minus, Euro, X } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
// import { toast } from "sonner";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetClose,
// } from "@/components/ui/sheet";
// import {
//   removeFromCart,
//   removeIngredientFromCart,
//   updateQuantity,
// } from "@/utils/cart-helper";
// import { CheckoutForm, PaymentMethod, DeliveryOption as DO } from "../auth/CheckoutForm";
// import { motion, AnimatePresence } from "framer-motion";

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image?: string;
//   ingredients?: { name: string; price: number }[];
// }

// interface CartSheetProps {
//   isOpen: boolean;
//   onClose: () => void;
//   cartItems: CartItem[];
//   onCartUpdate?: (updatedCart: CartItem[]) => void;
// }

// export default function CartSheet({
//   isOpen,
//   onClose,
//   cartItems,
//   onCartUpdate,
// }: CartSheetProps) {
//   const [delivery, setDelivery] = useState<DO>(DO.DELIVERY);
//   const [checkout, setCheckout] = useState(false);

//   const subtotal = cartItems.reduce((sum, item) => {
//     let itemTotal = item.price * item.quantity;
//     if (item.ingredients && item.ingredients.length > 0) {
//       const ingSum = item.ingredients.reduce((s, ing) => s + ing.price, 0);
//       itemTotal += ingSum * item.quantity;
//     }
//     return sum + itemTotal;
//   }, 0);

//   const handleIncrease = (id: string) => {
//     const updated = updateQuantity(id, (cartItems.find(i => i.id === id)?.quantity || 1) + 1);
//     onCartUpdate?.(updated);
//   };

//   const handleDecrease = (id: string) => {
//     const currentQty = cartItems.find(i => i.id === id)?.quantity || 1;
//     if (currentQty <= 1) return;
//     const updated = updateQuantity(id, currentQty - 1);
//     onCartUpdate?.(updated);
//   };

//   const handleRemove = async (id: string) => {
//     const updated = await removeFromCart(id);
//     onCartUpdate?.(updated);
//     toast.success("Item removed from cart");
//   };

//   const handleRemoveIngredient = (itemId: string, ingredientName: string) => {
//     const updatedCart = removeIngredientFromCart(itemId, ingredientName);
//     onCartUpdate?.(updatedCart);
//     const itemName = updatedCart.find((i) => i.id === itemId)?.name || "item";
//     toast.success(`Removed ${ingredientName} from ${itemName}`);
//   };

//   return (
//     <Sheet open={isOpen} onOpenChange={onClose}>
//       <SheetContent side="right" className="min-w-74 p-0 flex flex-col h-full [&>button]:hidden">
//         {/* Header */}
//         <SheetHeader className="p-4 border-b flex-none">
//           <div className="flex items-center justify-between">
//             <SheetTitle className="text-xl font-semibold">All Carts</SheetTitle>
//             <SheetClose asChild>
//               <Button variant="ghost" size="icon">
//                 <X className="h-8 w-8" />
//               </Button>
//             </SheetClose>
//           </div>
//         </SheetHeader>

//         {/* Delivery / Pickup toggle */}
//         <div className="flex border-b p-4 flex-none">
//           <button
//             onClick={() => setDelivery(DO.DELIVERY)}
//             className={`flex-1 py-3.5 text-center font-medium transition-colors ${
//               delivery === DO.DELIVERY
//                 ? "bg-white border-b-2 border-pink-600 text-pink-700"
//                 : "bg-gray-50 text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             Delivery
//             <span className="block text-xs text-gray-500 mt-0.5">15–25 mins</span>
//           </button>
//           <button
//             onClick={() => setDelivery(DO.PICKUP)}
//             className={`flex-1 py-3.5 text-center font-medium transition-colors ${
//               delivery === DO.PICKUP
//                 ? "bg-white border-b-2 border-pink-600 text-pink-700"
//                 : "bg-gray-50 text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             Pickup
//             <span className="block text-xs text-gray-500 mt-0.5">10–25 mins</span>
//           </button>
//         </div>

//         {/* Scrollable Cart Items + Checkout */}
//         <div className="flex-1 overflow-y-auto p-4">
//           {cartItems.length === 0 ? (
//             <p className="text-center text-gray-500 py-10">Your cart is empty</p>
//           ) : (
//             cartItems.map((item) => (
//               <div key={item.id} className="mb-6">
//                 <div className="flex gap-4">
//                   <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
//                     <Image
//                       src={item.image || "/placeholder-food.jpg"}
//                       alt={item.name}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>

//                   <div className="flex-1">
//                     <h4 className="font-medium">{item.name}</h4>
//                     <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
//                     <div className="flex items-center justify-between mt-3">
//                       <span className="font-bold text-pink-600 flex items-center gap-1">
//                         <Euro size={14} />
//                         {(item.price * item.quantity).toFixed(2)}
//                       </span>

//                       <div className="flex items-center gap-4">
//                         <button
//                           onClick={() => handleRemove(item.id)}
//                           className="text-red-500 hover:text-red-700 ml-2"
//                         >
//                           <Trash2 size={18} />
//                         </button>

//                         <div className="flex items-center border rounded-full">
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 rounded-none"
//                             disabled={item.quantity <= 1}
//                             onClick={() => handleDecrease(item.id)}
//                           >
//                             <Minus size={16} />
//                           </Button>
//                           <span className="px-4 font-medium">{item.quantity}</span>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 rounded-none"
//                             onClick={() => handleIncrease(item.id)}
//                           >
//                             <Plus size={16} />
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {item.ingredients && item.ingredients.length > 0 && (
//                   <div className="mt-3 flex flex-col">
//                     <p className="text-sm font-medium mb-1.5">Extra Ingredients:</p>
//                     <div className="space-y-2 flex items-start gap-2 flex-wrap">
//                       {item.ingredients.map((extra) => (
//                         <div
//                           key={extra.name}
//                           className="flex items-center justify-between text-sm bg-gray-50 px-3 py-1.5 rounded-md"
//                         >
//                           <div className="flex items-center gap-2">
//                             <span>{extra.name}</span>
//                             <span className="text-pink-600 flex items-center">
//                               <Euro size={12} />{extra.price}
//                             </span>
//                           </div>
//                           <button
//                             onClick={() => handleRemoveIngredient(item.id, extra.name)}
//                             className="ml-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <Separator className="my-5" />
//               </div>
//             ))
//           )}

//           {/* Checkout Form */}
//           <AnimatePresence mode="wait">
//             {checkout && (
//               <motion.div
//                 key="checkout-form"
//                 initial={{ opacity: 0, height: 0, y: 20 }}
//                 animate={{ opacity: 1, height: "auto", y: 0 }}
//                 exit={{ opacity: 0, height: 0, y: -20 }}
//                 transition={{ duration: 0.4, ease: "easeInOut", height: { duration: 0.5 } }}
//                 className="overflow-hidden"
//               >
//                 <CheckoutForm deliveryOption={delivery} setCheckout={setCheckout} />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Footer */}
//         {cartItems.length > 0 && !checkout && (
//           <div className="p-5 space-y-6 border-t flex-none">
//             <div className="flex justify-between items-baseline text-xl">
//               <span className="font-bold">Total</span>
//               <span className="font-bold flex items-center gap-1">
//                 <Euro size={18} /> {subtotal.toFixed(2)}
//               </span>
//             </div>

//             <Button
//               disabled={checkout || cartItems.length === 0}
//               onClick={() => setCheckout(true)}
//               className="w-full bg-pink-600 hover:bg-pink-700 text-white py-6 text-base font-medium rounded-xl"
//             >
//               Proceed to Checkout
//             </Button>
//           </div>
//         )}
//       </SheetContent>
//     </Sheet>
//   );
// }


"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, Euro, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  removeFromCart,
  removeIngredientFromCart,
  updateQuantity,
} from "@/utils/cart-helper";
import {
  CheckoutForm,
  DeliveryOption as DO,
} from "../auth/CheckoutForm";
import { motion, AnimatePresence } from "framer-motion";

/* 🔹 SAME cart shape as CartSidebar */
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  selectedSize?: string;

  extraIngredients?: {
    name: string;
    price: number;
  }[];

  extrasTotal?: number;
}

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onCartUpdate?: (updatedCart: CartItem[]) => void;
}

export default function CartSheet({
  isOpen,
  onClose,
  cartItems,
  onCartUpdate,
}: CartSheetProps) {
  const [delivery, setDelivery] = useState<DO>(DO.DELIVERY);
  const [checkout, setCheckout] = useState(false);

  /* ---------- TOTAL (same logic as CartSidebar) ---------- */
  const subtotal = cartItems.reduce((sum, item) => {
    const baseTotal = item.price * item.quantity;
    const extrasTotal = (item.extrasTotal || 0) * item.quantity;
    return sum + baseTotal + extrasTotal;
  }, 0);

  const handleIncrease = (id: string) => {
    const updated = updateQuantity(
      id,
      (cartItems.find((i) => i.id === id)?.quantity || 1) + 1
    );
    onCartUpdate?.(updated);
  };

  const handleDecrease = (id: string) => {
    const currentQty = cartItems.find((i) => i.id === id)?.quantity || 1;
    if (currentQty <= 1) return;
    const updated = updateQuantity(id, currentQty - 1);
    onCartUpdate?.(updated);
  };

  const handleRemove = async (id: string) => {
    const updated = await removeFromCart(id);
    onCartUpdate?.(updated);
    toast.success("Item removed from cart");
  };

  const handleRemoveIngredient = (itemId: string, ingredientName: string) => {
    const updatedCart = removeIngredientFromCart(itemId, ingredientName);
    onCartUpdate?.(updatedCart);
    const itemName =
      updatedCart.find((i) => i.id === itemId)?.name || "item";
    toast.success(`Removed ${ingredientName} from ${itemName}`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="min-w-74 p-0 flex flex-col h-full [&>button]:hidden"
      >
        {/* Header */}
        <SheetHeader className="p-4 border-b flex-none">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">
              All Carts
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-8 w-8" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        {/* Delivery / Pickup */}
        <div className="flex border-b p-4 flex-none">
          <button
            onClick={() => setDelivery(DO.DELIVERY)}
            className={`flex-1 py-3.5 text-center font-medium ${
              delivery === DO.DELIVERY
                ? "bg-white border-b-2 border-pink-600 text-pink-700"
                : "bg-gray-50 text-gray-600"
            }`}
          >
            Delivery
            <span className="block text-xs text-gray-500 mt-0.5">
              15–25 mins
            </span>
          </button>

          <button
            onClick={() => setDelivery(DO.PICKUP)}
            className={`flex-1 py-3.5 text-center font-medium ${
              delivery === DO.PICKUP
                ? "bg-white border-b-2 border-pink-600 text-pink-700"
                : "bg-gray-50 text-gray-600"
            }`}
          >
            Pickup
            <span className="block text-xs text-gray-500 mt-0.5">
              10–25 mins
            </span>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="mb-6">
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.image || "/placeholder-food.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    {item.selectedSize && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        Size: {item.selectedSize}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-pink-600 flex items-center gap-1">
                        <Euro size={14} />
                        {(item.price * item.quantity).toFixed(2)}
                      </span>

                      <div className="flex items-center gap-4">
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
                            className="h-8 w-8"
                            disabled={item.quantity <= 1}
                            onClick={() => handleDecrease(item.id)}
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="px-4 font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleIncrease(item.id)}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ✅ EXTRA INGREDIENTS (same as CartSidebar) */}
                {item.extraIngredients &&
                  item.extraIngredients.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-1.5">
                        Extra Ingredients:
                      </p>

                      <div className="space-y-2">
                        {item.extraIngredients.map((extra) => (
                          <div
                            key={extra.name}
                            className="flex items-center justify-between text-sm bg-gray-50 px-3 py-1.5 rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <span>{extra.name}</span>
                              <span className="text-pink-600 flex items-center gap-1">
                                <Euro size={12} />{" "}
                                {extra.price.toFixed(2)}
                              </span>
                            </div>

                            <button
                              onClick={() =>
                                handleRemoveIngredient(
                                  item.id,
                                  extra.name
                                )
                              }
                              className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
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
            ))
          )}

          {/* Checkout */}
          <AnimatePresence mode="wait">
            {checkout && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <CheckoutForm
                  deliveryOption={delivery}
                  setCheckout={setCheckout}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {cartItems.length > 0 && !checkout && (
          <div className="p-5 space-y-6 border-t flex-none">
            <div className="flex justify-between items-baseline text-xl">
              <span className="font-bold">Total</span>
              <span className="font-bold flex items-center gap-1">
                <Euro size={18} /> {subtotal.toFixed(2)}
              </span>
            </div>

            <Button
              onClick={() => setCheckout(true)}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-6 text-base font-medium rounded-xl"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
