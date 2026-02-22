
// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Trash2, Plus, Minus, Euro } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
// import { toast } from "sonner";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   CartItem,
//   clearCart,
//   getCart,
//   removeFromCart,
//   removeIngredientFromCart,
//   updateQuantity,
// } from "@/utils/cart-helper";
// import { CheckoutForm } from "@/components/auth/CheckoutForm";
// import { useGetMeQuery } from "@/redux/features/user/user.api";
// import { useCreateOrderMutation } from "@/redux/features/order/order.api";

// export default function PosCartSidebar() {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [delivery, setDelivery] = useState<"delivery" | "pickup">("pickup");
//   const [checkout, setCheckout] = useState(false);
//   const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
//   const { data, isLoading, isError } = useGetMeQuery();
//   const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();

//   useEffect(() => {
//     async function loadCart() {
//       const storedCart = await getCart();
//       setCart(storedCart);
//     }

//     loadCart();
//     window.addEventListener("cart-updated", loadCart);
//     return () => {
//       window.removeEventListener("cart-updated", loadCart);
//     };
//   }, []);

//   const handleIncrease = (id: string) => {
//     const item = cart.find((i) => i.id === id);
//     if (!item) return;
//     const updated = updateQuantity(id, item.quantity + 1);
//     setCart(updated);
//   };

//   const handleDecrease = (id: string) => {
//     const item = cart.find((i) => i.id === id);
//     if (!item || item.quantity <= 1) return;
//     const updated = updateQuantity(id, item.quantity - 1);
//     setCart(updated);
//   };

//   const handleRemove = async (id: string) => {
//     const updated = await removeFromCart(id);
//     setCart(updated);
//     toast.success("Item removed from cart");
//   };

//   const handleRemoveIngredient = (itemId: string, ingredientName: string) => {
//     const updatedCart = removeIngredientFromCart(itemId, ingredientName);
//     setCart(updatedCart);

//     const itemName = updatedCart.find((i) => i.id === itemId)?.name || "item";
//     toast.success(`Removed ${ingredientName} from ${itemName}`);
//   };

//   const subtotal = cart.reduce((sum, item) => {
//     let itemTotal = item.price * item.quantity;
//     if (item.ingredients && item.ingredients.length > 0) {
//       const ingredientsSum = item.ingredients.reduce((esum, ing) => esum + ing.price, 0);
//       itemTotal += ingredientsSum * item.quantity;
//     }
//     return sum + itemTotal;
//   }, 0);

//   const handleOrder = async () => {
//     try {
//       const orderPayload: any = {
//         orderType: "POS",
//         paymentMethod: "COD",
//         deliveryOption: delivery === "delivery" ? "DELIVERY" : "PICKUP",
//         foods: cart.map(item => ({
//           food: item.id,
//           quantity: item.quantity,
//           ingredients: item.ingredients?.map(ing => ({ name: ing.name, price: ing.price })) || [],
//         })),
//         customerInfo: {
//           name: data?.data?.name,
//           email: data?.data?.email,
//           phone: data?.data?.phone,
//           address: data?.data?.address,
//         },
//       };

//       const orderResponse = await createOrder(orderPayload).unwrap();

//       if (orderResponse?.data?.order?._id) {
//         toast.success("Order created successfully!");

//         // Cart clear
//         setCart([]);
//         clearCart();

//         if (orderResponse.data.invoiceUrl) {
//           setInvoiceUrl(orderResponse.data.invoiceUrl);
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="w-full sticky top-36 bg-white rounded-xl border border-gray-200 overflow-auto">
//       {/* Delivery / Pickup toggle */}
//       {/* <div className="flex p-4">
//         <button
//           onClick={() => setDelivery("delivery")}
//           className={`flex-1 py-4 text-center font-medium text-gray-500 hover:bg-gray-50 transition-colors ${
//             delivery === "delivery"
//               ? "bg-white border-2 rounded-tl-lg rounded-bl-lg"
//               : "bg-gray-100 rounded-tl-lg rounded-bl-lg"
//           }`}
//         >
//           Delivery
//           <span className="block text-xs text-gray-500 mt-0.5">Standard (15 - 25 mins)</span>
//         </button>
//         <button
//           onClick={() => setDelivery("pickup")}
//           className={`flex-1 py-4 text-center font-medium text-gray-500 hover:bg-gray-50 transition-colors ${
//             delivery === "pickup"
//               ? "bg-white border-2 rounded-tr-lg rounded-br-lg"
//               : "bg-gray-100 rounded-tr-lg rounded-br-lg"
//           }`}
//         >
//           Pick-up
//           <span className="block text-xs text-gray-500 mt-0.5">Standard (10 - 25 mins)</span>
//         </button>
//       </div> */}

//       {/* Cart items */}
//       <div className="p-4">
//         <h3 className="text-lg font-semibold mb-4">Your items</h3>

//         {cart.length === 0 && (
//           <p className="text-sm text-gray-500 text-center py-8">Your cart is empty</p>
//         )}

//         {cart.map((item) => (
//           <div key={item.id} className="mb-6">
//             <div className="flex gap-4">
//               {/* Image */}
//               <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
//                 <Image
//                   src={item.image || "/placeholder-food.jpg"}
//                   alt={item.name}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               {/* Details */}
//               <div className="flex-1">
//                 <h4 className="font-medium">{item.name}</h4>
//                 <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>

//                 <div className="flex items-center justify-between mt-3">
//                   <span className="font-bold text-pink-600 flex items-center gap-1">
//                     <Euro size={14} />
//                     {(item.price * item.quantity).toFixed(2)}
//                   </span>

//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={() => handleRemove(item.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <Trash2 size={18} />
//                     </button>

//                     <div className="flex items-center border rounded-full">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 rounded-none"
//                         disabled={item.quantity <= 1}
//                         onClick={() => handleDecrease(item.id)}
//                       >
//                         <Minus size={16} />
//                       </Button>
//                       <span className="px-4 font-medium">{item.quantity}</span>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 rounded-none"
//                         onClick={() => handleIncrease(item.id)}
//                       >
//                         <Plus size={16} />
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Extra ingredients */}
// {item.ingredients && item.ingredients.length > 0 && (
//   <div className="mt-3 flex flex-col">
//     <p className="text-sm font-medium mb-1.5">Extra Ingredients:</p>
//     <div className="space-y-2 flex items-start gap-2 flex-wrap">
//       {item.ingredients.map((extra) => (
//         <div
//           key={extra.name}
//           className="flex items-center justify-between text-sm bg-gray-50 px-3 py-1.5 rounded-md"
//         >
//           <div className="flex items-center gap-2">
//             <span>{extra.name}</span>
//             <span className="text-pink-600 flex items-center">
//               <Euro size={12} />
//               {extra.price}
//             </span>
//           </div>
//           <button
//             onClick={() => handleRemoveIngredient(item.id, extra.name)}
//             className="ml-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
//             title="Remove this ingredient"
//           >
//             <Trash2 size={14} />
//           </button>
//         </div>
//       ))}
//     </div>
//   </div>
// )}
//             <Separator className="my-5" />
//           </div>
//         ))}
//       </div>

//       {/* Total & Place Order */}
//       <div className="p-5 space-y-6">
//         <div className="flex justify-between items-baseline text-xl">
//           <span className="font-bold">Total</span>
//           <span className="font-bold flex items-center gap-1">
//             <Euro size={18} /> {subtotal.toFixed(2)}
//           </span>
//         </div>

//         <AnimatePresence mode="wait">
//           {checkout ? (
//             <motion.div
//               key="checkout-form"
//               initial={{ opacity: 0, height: 0, y: 20 }}
//               animate={{ opacity: 1, height: "auto", y: 0 }}
//               exit={{ opacity: 0, height: 0, y: -20 }}
//               transition={{ duration: 0.4, ease: "easeInOut", height: { duration: 0.5 } }}
//               className="overflow-hidden"
//             >
//               {/* <CheckoutForm /> */}
//             </motion.div>
//           ) : (
//             <motion.div
//               key="proceed-button"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Button
//                 disabled={cart.length === 0 || isOrderLoading}
//                 onClick={handleOrder}
//                 className="w-full bg-pink-600 hover:bg-pink-700 text-white py-6 text-base font-medium rounded-xl"
//               >
//                 {isOrderLoading ? "Placing Order..." : "Place Order"}
//               </Button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Floating Invoice Button */}
//       {invoiceUrl && (
//         <div className="fixed bottom-6 right-6 z-100">
//           <Button
//             onClick={() => window.open(invoiceUrl, "_blank")}
//             className="btn btn-primary shadow-lg"
//           >
//             View Invoice
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Trash2, Plus, Minus, Euro } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
// import { toast } from "sonner";
// import { motion, AnimatePresence } from "framer-motion";

// import {
//   CartItem,
//   clearCart,
//   getCart,
//   removeFromCart,
//   removeIngredientFromCart,
//   updateQuantity,
// } from "@/utils/cart-helper";

// import { useGetMeQuery } from "@/redux/features/user/user.api";
// import { useCreateOrderMutation } from "@/redux/features/order/order.api";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// // Form schema (same as your POS form)
// const posFormSchema = z.object({
//   name: z.string().min(2, "Customer name is required"),
//   phone: z.string().min(10, "Valid phone number is required"),
//   email: z.string().email("Invalid email").optional().or(z.literal("")),
//   address: z.string().optional().or(z.literal("")),
// });

// type FormValues = z.infer<typeof posFormSchema>;

// export default function PosCartSidebar() {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { data: userData } = useGetMeQuery();
//   const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();

//   const form = useForm<FormValues>({
//     resolver: zodResolver(posFormSchema),
//     defaultValues: {
//       name: userData?.data?.name || "",
//       phone: userData?.data?.phone || "",
//       email: userData?.data?.email || "",
//       address: userData?.data?.address || "",
//     },
//   });

//   useEffect(() => {
//     async function loadCart() {
//       const storedCart = await getCart();
//       setCart(storedCart);
//     }
//     loadCart();
//     window.addEventListener("cart-updated", loadCart);
//     return () => window.removeEventListener("cart-updated", loadCart);
//   }, []);

//   // Sync form with user data when it loads
//   useEffect(() => {
//     if (userData?.data) {
//       form.reset({
//         name: userData.data.name || "",
//         phone: userData.data.phone || "",
//         email: userData.data.email || "",
//         address: userData.data.address || "",
//       });
//     }
//   }, [userData, form]);

//   const handleIncrease = (id: string) => {
//     const item = cart.find((i) => i.id === id);
//     if (!item) return;
//     const updated = updateQuantity(id, item.quantity + 1);
//     setCart(updated);
//   };

//   const handleDecrease = (id: string) => {
//     const item = cart.find((i) => i.id === id);
//     if (!item || item.quantity <= 1) return;
//     const updated = updateQuantity(id, item.quantity - 1);
//     setCart(updated);
//   };

//   const handleRemove = async (id: string) => {
//     const updated = await removeFromCart(id);
//     setCart(updated);
//     toast.success("Item removed");
//   };

//   const handleRemoveIngredient = (itemId: string, ingredientName: string) => {
//     const updatedCart = removeIngredientFromCart(itemId, ingredientName);
//     setCart(updatedCart);
//     const itemName = updatedCart.find((i) => i.id === itemId)?.name || "item";
//     toast.success(`Removed ${ingredientName} from ${itemName}`);
//   };

//   const subtotal = cart.reduce((sum, item) => {
//     let itemTotal = item.price * item.quantity;
//     if (item.ingredients?.length) {
//       const extrasSum = item.ingredients.reduce((esum, ing) => esum + ing.price, 0);
//       itemTotal += extrasSum * item.quantity;
//     }
//     return sum + itemTotal;
//   }, 0);

//   const onSubmit = async (values: FormValues) => {
//     if (cart.length === 0) {
//       toast.error("Cart is empty");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const orderPayload = {
//         orderType: "POS",
//         paymentMethod: "COD", // You can make this dynamic later
//         deliveryOption: "PICKUP", // POS = usually pickup / in-store
//         foods: cart.map((item) => ({
//           food: item.id,
//           quantity: item.quantity,
//           ingredients:
//             item.ingredients?.map((ing) => ({
//               name: ing.name,
//               price: ing.price,
//             })) || [],
//         })),
//         customerInfo: {
//           name: values.name.trim(),
//           email: values.email?.trim() || null,
//           phone: values.phone.trim() || null,
//           address: values.address?.trim() || null,
//         },

//         seller: userData?.data?._id || null,
//       };

//       const response = await createOrder(orderPayload).unwrap();

//       if (response?.success && response?.data?.order?._id) {
//         toast.success("Order placed successfully!");

//         // Clear everything
//         setCart([]);
//         clearCart();
//         form.reset();

//         if (response.data?.invoiceUrl) {
//           setInvoiceUrl(response.data.invoiceUrl);
//         }
//       } else {
//         toast.error("Failed to create order");
//       }
//     } catch (err: any) {
//       console.error("Order creation failed:", err);
//       toast.error(err?.data?.message || "Something went wrong");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full sticky top-36 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
//       {/* Cart Items */}
//       <div className="flex-1 p-5 overflow-y-auto">
//         <h3 className="text-xl font-bold mb-5">Cart ({cart.length})</h3>

//         {cart.length === 0 ? (
//           <div className="text-center py-10 text-gray-500">
//             Your cart is empty
//           </div>
//         ) : (
//           <AnimatePresence>
//             {cart.map((item) => (
//               <motion.div
//                 key={item.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="mb-6 last:mb-0"
//               >
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
//                     <h4 className="font-semibold">{item.name}</h4>
//                     <p className="text-sm text-gray-600 mt-0.5">
//                       Qty: {item.quantity}
//                     </p>

//                     <div className="flex items-center justify-between mt-3">
//                       <span className="font-bold text-pink-600 flex items-center gap-1">
//                         <Euro size={14} />
//                         {(item.price * item.quantity).toFixed(2)}
//                       </span>

//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={() => handleRemove(item.id)}
//                           className="text-red-500 hover:text-red-600"
//                         >
//                           <Trash2 size={18} />
//                         </button>

//                         <div className="flex items-center border rounded-full overflow-hidden">
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 rounded-none hover:bg-gray-100"
//                             disabled={item.quantity <= 1}
//                             onClick={() => handleDecrease(item.id)}
//                           >
//                             <Minus size={16} />
//                           </Button>
//                           <span className="w-10 text-center font-medium">
//                             {item.quantity}
//                           </span>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 rounded-none hover:bg-gray-100"
//                             onClick={() => handleIncrease(item.id)}
//                           >
//                             <Plus size={16} />
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* {item?.ingredients?.length > 0 && (
//                   <div className="mt-4">
//                     <p className="text-sm font-medium mb-2">Extras:</p>
//                     <div className="flex flex-wrap gap-2">
//                       {item?.ingredients.map((extra) => (
//                         <div
//                           key={extra.name}
//                           className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md text-sm"
//                         >
//                           <span>{extra.name}</span>
//                           <span className="text-pink-600 flex items-center gap-0.5">
//                             <Euro size={12} />
//                             {extra.price}
//                           </span>
//                           <button
//                             onClick={() => handleRemoveIngredient(item.id, extra.name)}
//                             className="ml-1 text-red-500 hover:text-red-600"
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )} */}

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
//                               <Euro size={12} />
//                               {extra.price}
//                             </span>
//                           </div>
//                           <button
//                             onClick={() => handleRemoveIngredient(item.id, extra.name)}
//                             className="ml-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
//                             title="Remove this ingredient"
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <Separator className="my-5" />
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         )}
//       </div>

//       {/* Customer Form + Total + Submit */}
//       <div className="p-5 border-t bg-gray-50">
//         <div className="flex justify-between items-center text-xl font-bold mb-6">
//           <span>Total</span>
//           <span className="flex items-center gap-1.5">
//             <Euro size={20} />
//             {subtotal.toFixed(2)}
//           </span>
//         </div>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Customer Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Full name" {...field} className="py-5" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Phone Number</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="tel"
//                       placeholder="01XXXXXXXXX"
//                       {...field}
//                       className="py-5"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email (optional)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="email"
//                       placeholder="example@email.com"
//                       {...field}
//                       className="py-5"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="address"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Address (optional)</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Home / Office / Other"
//                       {...field}
//                       className="py-5"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button
//               type="submit"
//               disabled={
//                 cart.length === 0 ||
//                 isSubmitting ||
//                 isOrderLoading ||
//                 !form.formState.isValid
//               }
//               className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold rounded-xl mt-2"
//             >
//               {isSubmitting || isOrderLoading ? "Placing Order..." : "Confirm & Place Order"}
//             </Button>
//           </form>
//         </Form>
//       </div>

//       {/* Floating Invoice Button */}
//       <AnimatePresence>
//         {invoiceUrl && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             className="fixed bottom-8 right-8 z-50"
//           >
//             <Button
//               onClick={() => window.open(invoiceUrl, "_blank")}
//               className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl px-6 py-5 rounded-full flex items-center gap-2"
//             >
//               View Invoice
//             </Button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
// -------------------------------------------------------------------------------------

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Trash2, Plus, Minus, Euro } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
// import { toast } from "sonner";
// import { motion, AnimatePresence } from "framer-motion";

// import {
//   CartItem,
//   clearCart,
//   getCart,
//   removeFromCart,
//   removeIngredientFromCart,
//   updateQuantity,
// } from "@/utils/cart-helper";

// import { useGetMeQuery } from "@/redux/features/user/user.api";
// import { useCreateOrderMutation } from "@/redux/features/order/order.api";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
//  enum OrderType {
//   ONLINE = "ONLINE",
//   POS = "POS",
// }  

//  enum DeliveryOption {
//   DELIVERY = "DELIVERY",
//   PICKUP = "PICKUP",
// }

//  enum PaymentMethod {
//   COD = "COD",
//   STRIPE = "STRIPE",
// }
// // Form schema
// const posFormSchema = z.object({
//    deliveryOption: z.nativeEnum(DeliveryOption, {
//           error: "Delivery option is required",
//       }),
//   name: z.string().min(2, "Customer name is required"),
//   phone: z.string().min(10, "Valid phone number is required"),
//   email: z.string().email("Invalid email"),
//   address: z.string().min(2, "Address is required"),
// });

// type FormValues = z.infer<typeof posFormSchema>;

// export default function PosCartSidebar() {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { data: userData } = useGetMeQuery();
//   const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();

//   const form = useForm<FormValues>({
//     resolver: zodResolver(posFormSchema),
//     defaultValues: {
//       deliveryOption: DeliveryOption.PICKUP,
//       name: userData?.data?.name || "",
//       phone: userData?.data?.phone || "",
//       email: userData?.data?.email || "",
//       address: userData?.data?.address || "",
//     },
//   });

//   useEffect(() => {
//     async function loadCart() {
//       const storedCart = await getCart();
//       setCart(storedCart);
//     }
//     loadCart();
//     window.addEventListener("cart-updated", loadCart);
//     return () => window.removeEventListener("cart-updated", loadCart);
//   }, []);

//   // Sync form with logged-in user data
//   useEffect(() => {
//     if (userData?.data) {
//       form.reset({
//         deliveryOption: form.getValues("deliveryOption"),
//         name: userData.data.name || "",
//         phone: userData.data.phone || "",
//         email: userData.data.email || "",
//         address: userData.data.address || "",
//       });
//     }
//   }, [userData, form]);

//   const handleIncrease = (id: string) => {
//     const item = cart.find((i) => i.id === id);
//     if (!item) return;
//     const updated = updateQuantity(id, item.quantity + 1);
//     setCart(updated);
//   };

//   const handleDecrease = (id: string) => {
//     const item = cart.find((i) => i.id === id);
//     if (!item || item.quantity <= 1) return;
//     const updated = updateQuantity(id, item.quantity - 1);
//     setCart(updated);
//   };

//   const handleRemove = async (id: string) => {
//     const updated = await removeFromCart(id);
//     setCart(updated);
//     toast.success("Item removed");
//   };

//   const handleRemoveIngredient = (itemId: string, ingredientName: string) => {
//     const updatedCart = removeIngredientFromCart(itemId, ingredientName);
//     setCart(updatedCart);
//     const itemName = updatedCart.find((i) => i.id === itemId)?.name || "item";
//     toast.success(`Removed ${ingredientName} from ${itemName}`);
//   };

//   const subtotal = cart.reduce((sum, item) => {
//     let itemTotal = item.price * item.quantity;
//     if (item.ingredients?.length) {
//       const extrasSum = item.ingredients.reduce((esum, ing) => esum + ing.price, 0);
//       itemTotal += extrasSum * item.quantity;
//     }
//     return sum + itemTotal;
//   }, 0);

//   const onSubmit = async (values: FormValues) => {
//     if (cart.length === 0) {
//       toast.error("Cart is empty");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const orderPayload = {
//         orderType: OrderType.POS,
//         paymentMethod: PaymentMethod.COD,
//         deliveryOption: values.deliveryOption,
//         foods: cart.map((item) => ({
//           food: item.id,
//           quantity: item.quantity,
//           ingredients:
//             item.ingredients?.map((ing) => ({
//               name: ing.name,
//               price: ing.price,
//             })) || [],
//         })),
//         customerInfo: {
//           name: values.name.trim(),
//           email: values.email?.trim() ,
//           phone: values.phone.trim(),
//           address: values.address?.trim() ,
//         },
//         seller:  userData?.data?._id || "",
//       };
  
  
//   const response = await createOrder(orderPayload).unwrap();

//       if (response?.success && response?.data?.order?._id) {
//         toast.success("Order placed successfully!");

//         setCart([]);
//         clearCart();
//         form.reset({
//           deliveryOption: DeliveryOption.PICKUP,
//           name: "",
//           phone: "",
//           email: "",
//           address: "",
//         });

//         if (response.data?.invoiceUrl) {
//           setInvoiceUrl(response.data.invoiceUrl);
//         }
//       } else {
//         toast.error("Failed to create order");
//       }
//     } catch (err: any) {
//       console.error("Order creation failed:", err);
//       toast.error(err?.data?.message || "Something went wrong");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full sticky top-36 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
//       {/* Cart Items */}
//       <div className="flex-1 p-5 overflow-y-auto">
//         <h3 className="text-xl font-bold mb-5">Cart ({cart.length})</h3>

//         {cart.length === 0 ? (
//           <div className="text-center py-10 text-gray-500">
//             Your cart is empty
//           </div>
//         ) : (
//           <AnimatePresence>
//             {cart.map((item) => (
//               <motion.div
//                 key={item.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="mb-6 last:mb-0"
//               >
//                 {/* ... same cart item rendering as before ... */}
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
//                     <h4 className="font-semibold">{item.name}</h4>
//                     <p className="text-sm text-gray-600 mt-0.5">
//                       Qty: {item.quantity}
//                     </p>

//                     <div className="flex items-center justify-between mt-3">
//                       <span className="font-bold text-pink-600 flex items-center gap-1">
//                         <Euro size={14} />
//                         {(item.price * item.quantity)?.toFixed(2)}
//                       </span>

//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={() => handleRemove(item.id)}
//                           className="text-red-500 hover:text-red-600"
//                         >
//                           <Trash2 size={18} />
//                         </button>

//                         <div className="flex items-center border rounded-full overflow-hidden">
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 rounded-none hover:bg-gray-100"
//                             disabled={item.quantity <= 1}
//                             onClick={() => handleDecrease(item.id)}
//                           >
//                             <Minus size={16} />
//                           </Button>
//                           <span className="w-10 text-center font-medium">
//                             {item.quantity}
//                           </span>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 rounded-none hover:bg-gray-100"
//                             onClick={() => handleIncrease(item.id)}
//                           >
//                             <Plus size={16} />
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {item.ingredients && item.ingredients?.length > 0 && (
//                   <div className="mt-4">
//                     <p className="text-sm font-medium mb-2">Extras:</p>
//                     <div className="flex flex-wrap gap-2">
//                       {item.ingredients.map((extra) => (
//                         <div
//                           key={extra.name}
//                           className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md text-sm"
//                         >
//                           <span>{extra.name}</span>
//                           <span className="text-pink-600 flex items-center gap-0.5">
//                             <Euro size={12} />
//                             {extra.price}
//                           </span>
//                           <button
//                             onClick={() => handleRemoveIngredient(item.id, extra.name)}
//                             className="ml-1 text-red-500 hover:text-red-600"
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <Separator className="my-5" />
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         )}
//       </div>

//       {/* Form Section */}
//       <div className="p-5 border-t bg-gray-50">
//         <div className="flex justify-between items-center text-xl font-bold mb-6">
//           <span>Total</span>
//           <span className="flex items-center gap-1.5">
//             <Euro size={20} />
//             {subtotal.toFixed(2)}
//           </span>
//         </div>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {/* Delivery Option Radio Buttons */}
//             <FormField
//               control={form.control}
//               name="deliveryOption"
//               render={({ field }) => (
//                 <FormItem className="space-y-3">
//                   <FormLabel>Order Type</FormLabel>
//                   <FormControl>
//                     <RadioGroup
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                       className="flex flex-row gap-6"
//                     >
//                       <FormItem className="flex items-center space-x-3 space-y-0">
//                         <FormControl>
//                           <RadioGroupItem value="PICKUP" />
//                         </FormControl>
//                         <FormLabel className="font-medium cursor-pointer">
//                           Pickup
//                         </FormLabel>
//                       </FormItem>

//                       <FormItem className="flex items-center space-x-3 space-y-0">
//                         <FormControl>
//                           <RadioGroupItem value="DELIVERY" />
//                         </FormControl>
//                         <FormLabel className="font-medium cursor-pointer">
//                           Delivery
//                         </FormLabel>
//                       </FormItem>
//                     </RadioGroup>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Customer Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Full name" {...field} className="py-5" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Phone Number</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="tel"
//                       placeholder="01XXXXXXXXX"
//                       {...field}
//                       className="py-5"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email (optional)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="email"
//                       placeholder="example@email.com"
//                       {...field}
//                       className="py-5"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="address"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Address (optional for pickup)</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Home / Office / Other"
//                       {...field}
//                       className="py-5"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button
//               type="submit"
//               disabled={
//                 cart.length === 0 ||
//                 isSubmitting ||
//                 isOrderLoading ||
//                 !form.formState.isValid
//               }
//               className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold rounded-xl mt-4"
//             >
//               {isSubmitting || isOrderLoading ? "Placing Order..." : "Confirm & Place Order"}
//             </Button>
//           </form>
//         </Form>
//       </div>

//       {/* Floating Invoice Button */}
//       <AnimatePresence>
//         {invoiceUrl && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             className="fixed bottom-8 right-8 z-50"
//           >
//             <Button
//               onClick={() => window.open(invoiceUrl, "_blank")}
//               className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl px-6 py-5 rounded-full flex items-center gap-2"
//             >
//               View Invoice
//             </Button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, Euro } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import {
  CartItem,
  clearCart,
  getCart,
  removeFromCart,
  removeIngredientFromCart,
  updateQuantity,
} from "@/utils/cart-helper";

import { useGetMeQuery } from "@/redux/features/user/user.api";
import { useCreateOrderMutation } from "@/redux/features/order/order.api";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

enum OrderType {
  ONLINE = "ONLINE",
  POS = "POS",
}

export enum DeliveryOption {
  DELIVERY = "DELIVERY",
  PICKUP = "PICKUP",
}

enum PaymentMethod {
  COD = "COD",
  STRIPE = "STRIPE",
}

// Form schema
const posFormSchema = z.object({
  deliveryOption: z.nativeEnum(DeliveryOption, {
    error: "Delivery option is required",
  }),
  name: z.string().min(2, "Customer name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email"),
  address: z.string().min(2, "Address is required"),
});

type FormValues = z.infer<typeof posFormSchema>;

export default function PosCartSidebar() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: userData } = useGetMeQuery();
  const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(posFormSchema),
    defaultValues: {
      deliveryOption: DeliveryOption.PICKUP,
      name: userData?.data?.name || "",
      phone: userData?.data?.phone || "",
      email: userData?.data?.email || "",
      address: userData?.data?.address || "",
    },
  });

  // Load cart + listen to updates
  useEffect(() => {
    async function loadCart() {
      const storedCart = await getCart();
      setCart(storedCart);
    }
    loadCart();
    window.addEventListener("cart-updated", loadCart);
    return () => window.removeEventListener("cart-updated", loadCart);
  }, []);

  // Sync form with user
  useEffect(() => {
    if (userData?.data) {
      form.reset({
        deliveryOption: form.getValues("deliveryOption"),
        name: userData.data.name || "",
        phone: userData.data.phone || "",
        email: userData.data.email || "",
        address: userData.data.address || "",
      });
    }
  }, [userData, form]);



  // Quantity handlers
  const handleIncrease = (id: string) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    const updated = updateQuantity(id, item.quantity + 1);
    setCart(updated);
  };

  const handleDecrease = (id: string) => {
    const item = cart.find((i) => i.id === id);
    if (!item || item.quantity <= 1) return;
    const updated = updateQuantity(id, item.quantity - 1);
    setCart(updated);
  };

  const handleRemove = async (id: string) => {
    const updated = await removeFromCart(id);
    setCart(updated);
    toast.success("Item removed");
  };

  const handleRemoveIngredient = (itemId: string, ingredientName: string) => {
    const updatedCart = removeIngredientFromCart(itemId, ingredientName);
    setCart(updatedCart);
    const itemName = updatedCart.find((i) => i.id === itemId)?.name || "item";
    toast.success(`Removed ${ingredientName} from ${itemName}`);
  };

  const subtotal = cart.reduce((sum, item) => {
    const baseTotal = item.price * item.quantity;
    const extrasTotal = (item.extrasTotal || 0) * item.quantity;
    return sum + baseTotal + extrasTotal;
  }, 0);

  // Submit order
  const onSubmit = async (values: FormValues) => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    setIsSubmitting(true);
    try {
      const orderPayload = {
        orderType: OrderType.POS,
        paymentMethod: PaymentMethod.COD,
        deliveryOption: values.deliveryOption,
       foods: cart.map((item: any) => ({
                    food: item.id,
                    quantity: item.quantity,

                    ingredients: item.defaultIngredients?.map((ing: any) => ({
                        ingredient: ing._id,
                        name: ing.name,
                        price: ing.price,
                    })) || [],

                    extraIngredients: item.extraIngredients?.map((ing: any) => ({
                        ingredient: ing._id,
                        name: ing.name,
                        price: ing.price,
                    })) || [],

                    extrasTotal: item.extrasTotal || 0,
                    unitPrice: item.price,
                    totalPrice:(item.price + (item.extrasTotal || 0)) * item.quantity,
                    variant: item.selectedSize || null,
                })),

        // foods: cart.map((item) => ({
        //   food: item.id,
        //   quantity: item.quantity,
        //    variant: item.selectedSize || null,
        //   ingredients: [
        //     ...(item.defaultIngredients?.map((ing) => ({ name: ing.name, price: ing.price })) || []),
        //     ...(item.extraIngredients?.map((ing) => ({ name: ing.name, price: ing.price })) || []),
        //   ],
        // })),
        customerInfo: {
          name: values.name.trim(),
          email: values.email?.trim(),
          phone: values.phone.trim(),
          address: values.address?.trim(),
        },
        seller: userData?.data?._id || "",
      };

      const response = await createOrder(orderPayload).unwrap();

      if (response?.success && response?.data?.order?._id) {
        toast.success("Order placed successfully!");
        setCart([]);
        clearCart();
        form.reset({
          deliveryOption: DeliveryOption.PICKUP,
          name: "",
          phone: "",
          email: "",
          address: "",
        });
        if (response.data?.invoiceUrl) setInvoiceUrl(response.data.invoiceUrl);
      } else {
        toast.error("Failed to create order");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="w-full sticky top-36 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      {/* Cart Items */}
      <div className="flex-1 p-5 overflow-y-auto">
        <h3 className="text-xl font-bold mb-5">Cart ({cart.length})</h3>

        {cart.length === 0 ? (
          <div className="text-center py-10 text-gray-500">Your cart is empty</div>
        ) : (
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 last:mb-0"
              >
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
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600 mt-0.5">Qty: {item.quantity}</p>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-pink-600 flex items-center gap-1">
                        <Euro size={14} />
                        {((item.price * item.quantity) +
                         ((item.extrasTotal || 0) * item.quantity)
                        ).toFixed(2)}
                      </span>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>

                        <div className="flex items-center border rounded-full overflow-hidden">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                            onClick={() => handleDecrease(item.id)}
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="w-10 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none hover:bg-gray-100"
                            onClick={() => handleIncrease(item.id)}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extras */}
                {item.extraIngredients && item.extraIngredients.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Extras:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.extraIngredients.map((extra) => (
                        <div
                          key={extra._id || extra.name}
                          className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md text-sm"
                        >
                          <span>{extra.name}</span>
                          {/* <span className="text-pink-600 flex items-center gap-0.5">
                            <Euro size={12} /> {extra.price.toFixed(2)}
                          </span> */}
                          <button
                            onClick={() => handleRemoveIngredient(item.id, extra.name)}
                            className="ml-1 text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Separator className="my-5" />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Form Section */}
      <div className="p-5 border-t bg-gray-50">
        <div className="flex justify-between items-center text-xl font-bold mb-6">
          <span>Total</span>
          <span className="flex items-center gap-1.5">
            <Euro size={20} /> {subtotal.toFixed(2)}
          </span>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="deliveryOption"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Order Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row gap-6"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="PICKUP" />
                        </FormControl>
                        <FormLabel className="font-medium cursor-pointer">Pickup</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="DELIVERY" />
                        </FormControl>
                        <FormLabel className="font-medium cursor-pointer">Delivery</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" className="py-5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="01XXXXXXXXX" className="py-5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" className="py-5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Home / Office / Other" className="py-5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={cart.length === 0 || isSubmitting || isOrderLoading || !form.formState.isValid}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold rounded-xl mt-4"
            >
              {isSubmitting || isOrderLoading ? "Placing Order..." : "Confirm & Place Order"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Floating Invoice */}
      <AnimatePresence>
        {invoiceUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              onClick={() => window.open(invoiceUrl, "_blank")}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl px-6 py-5 rounded-full flex items-center gap-2"
            >
              View Invoice
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
