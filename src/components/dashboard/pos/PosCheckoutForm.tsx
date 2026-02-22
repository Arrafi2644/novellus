// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { clearCart } from "@/utils/cart-helper";

// // Schema - only 4 fields
// const posCheckoutSchema = z.object({
//   fullname: z.string().min(2, "Full name must be at least 2 characters"),
//   email: z.string().email("Please enter a valid email"),
//   phone: z.string().min(10, "Please enter a valid phone number"),
//   address: z.string().min(5, "Address must be at least 5 characters"),
// });

// type POSCheckoutFormValues = z.infer<typeof posCheckoutSchema>;

// interface POSCheckoutFormProps {
//   onClose?: () => void; // optional: to close modal/drawer after submit
// }

// export function POSCheckoutForm({ onClose }: POSCheckoutFormProps) {
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm<POSCheckoutFormValues>({
//     resolver: zodResolver(posCheckoutSchema),
//     defaultValues: {
//       fullname: "",
//       email: "",
//       phone: "",
//       address: "",
//     },
//   });

//   const onSubmit = async (data: POSCheckoutFormValues) => {
//     setIsLoading(true);

//     try {
//       // You can later replace this with actual POS backend API call
//       console.log("POS Order Submitted:", {
//         orderType: "POS",
//         paymentMethod: "CASH", // or CARD / MOBILE — can be made dynamic later
//         customerInfo: {
//           name: data.fullname,
//           email: data.email || null,
//           phone: data.phone,
//           address: data.address || null,
//         },
//         // Optional: include cart items
//         // const cart = await getCart();
//         // foods: cart.map(...)
//       });

//       // Small delay to simulate processing (remove in production)
//       await new Promise((resolve) => setTimeout(resolve, 800));

//       toast.success("Order placed successfully!");

//       // Clear cart after successful POS order
//       clearCart();

//       // Reset form
//       form.reset();

//       // Close modal/drawer if provided
//       onClose?.();
//     } catch (err) {
//       console.error("POS checkout error:", err);
//       toast.error("Failed to place order");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//           {/* Full Name */}
//           <FormField
//             control={form.control}
//             name="fullname"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Customer Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Full name"
//                     {...field}
//                     autoFocus
//                     className="text-base py-5"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Phone */}
//           <FormField
//             control={form.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Phone Number</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="tel"
//                     placeholder="01XXXXXXXXX"
//                     {...field}
//                     className="text-base py-5"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Email - optional */}
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="email"
//                     placeholder="example@email.com"
//                     {...field}
//                     className="text-base py-5"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Address - optional */}
//           <FormField
//             control={form.control}
//             name="address"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Address</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Home / Office / Other"
//                     {...field}
//                     className="text-base py-5"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Submit Button */}
//           <div className="pt-4">
//             <Button
//               type="submit"
//               disabled={isLoading || !form.formState.isValid}
//               className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-medium rounded-xl"
//             >
//               {isLoading ? "Processing..." : "Confirm Order"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }