
// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { toast } from "sonner";
// import { clearCart, getCart } from "@/utils/cart-helper";

// // Enums
// export enum PaymentMethod {
//     COD = "COD",
//     STRIPE = "STRIPE",
// }

// export enum DeliveryOption {
//     DELIVERY = "DELIVERY",
//     PICKUP = "PICKUP",
// }

// // Schema
// const checkoutSchema = z.object({
//     fullname: z.string().min(2, "Full name must be at least 2 characters"),
//     email: z.string().email("Please enter a valid email address"),
//     phone: z.string().min(10, "Please enter a valid phone number"),
//     address: z.string().min(5, "Address must be at least 5 characters"),
//     paymentMethod: z.nativeEnum(PaymentMethod, {
//         error: "Please select a payment method",
//     }),
//     deliveryOption: z.nativeEnum(DeliveryOption, {
//         error: "Delivery option is required",
//     }),
// });

// type CheckoutFormValues = z.infer<typeof checkoutSchema>;

// type CheckoutFormProps = {
//     deliveryOption: DeliveryOption;
//     setCheckout: (value: boolean) => void; // <-- receive setCheckout
// };

// export function CheckoutForm({ deliveryOption, setCheckout }: CheckoutFormProps) {
//     const [isLoading, setIsLoading] = useState(false);
//     const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

//     const form = useForm<CheckoutFormValues>({
//         resolver: zodResolver(checkoutSchema),
//         defaultValues: {
//             fullname: "",
//             email: "",
//             phone: "",
//             address: "",
//             paymentMethod: undefined as PaymentMethod | undefined,
//             deliveryOption,
//         },
//     });

//     const selectedPaymentMethod = form.watch("paymentMethod");

//     const onSubmit = async (data: CheckoutFormValues) => {
//         setIsLoading(true);

//         try {
//             const cart = await getCart();

//             if (!cart || cart.length === 0) {
//                 toast.error("Your cart is empty");
//                 return;
//             }

//             console.log("cart items ", cart)

//             const orderPayload = {
//                 orderType: "ONLINE",
//                 paymentMethod: data.paymentMethod,
//                 deliveryOption: data.deliveryOption,
//                 foods: cart.map((item: any) => ({
//                     food: item.id,
//                     quantity: item.quantity,
//                     ingredients:
//                         item.ingredients?.map((ing: any) => ({
//                             name: ing.name,
//                             price: ing.price,
//                         })) || [],
//                 })),
//                 customerInfo: {
//                     name: data.fullname,
//                     email: data.email,
//                     phone: data.phone,
//                     address: data.address,
//                 },
//             };

//             console.log("Order Payload:", orderPayload);

//             const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/create-order`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(orderPayload),
//             });

//             const result = await response.json();

//             console.log(result)
//             if (!response.ok) {
//                 throw new Error(result.message || "Failed to create order");
//             }

//             if (result?.success && result?.data?.order?._id) {
//                 toast.success("Order created successfully!");
//                 if(result.data?.order?.payment?.paymentMethod === 'COD'){
//                     setCheckout(false);
//                 }
//                 // Stripe case
//                 if (
//                     data.paymentMethod === PaymentMethod.STRIPE &&
//                     result.data.checkoutUrl
//                 ) {
//                     setCheckoutUrl(result.data.checkoutUrl);
//                     toast.info("Ready to pay — click 'Pay Now'");

//                 }
//                 // COD case
//                 else if (data.paymentMethod === PaymentMethod.COD) {
//                     toast.success("Order placed with Cash on Delivery!");
//                     clearCart();
//                     form.reset(); // optional
//                 }
//             } else {
//                 toast.error(result.message || "Something went wrong");
//             }
//         } catch (error: any) {
//             console.error("Checkout error:", error);
//             toast.error(error.message || "Failed to process order");
//         } finally {
//             setIsLoading(false);

//         }
//     };

//     const isStripeSelected = selectedPaymentMethod === PaymentMethod.STRIPE;
//     const buttonText = checkoutUrl
//         ? "Pay Now"
//         : isLoading
//             ? "Processing..."
//             : isStripeSelected
//                 ? "Create Order & Pay"
//                 : "Place Order";

//     const handleButtonClick = () => {
//         if (checkoutUrl) {
//             clearCart();
//             setCheckout(false);
//             window.open(checkoutUrl, "_blank");
//         } else {
//             form.handleSubmit(onSubmit)();
//         }
//     };

//     return (
//         <div className="space-y-6 max-h-[70vh] overflow-y-auto">
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                     {/* Full Name */}
//                     <FormField
//                         control={form.control}
//                         name="fullname"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Full name</FormLabel>
//                                 <FormControl>
//                                     <Input placeholder="Enter your full name" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     {/* Email */}
//                     <FormField
//                         control={form.control}
//                         name="email"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Email address</FormLabel>
//                                 <FormControl>
//                                     <Input type="email" placeholder="Enter your email" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     {/* Phone */}
//                     <FormField
//                         control={form.control}
//                         name="phone"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Phone number</FormLabel>
//                                 <FormControl>
//                                     <Input type="tel" placeholder="Enter your phone number" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     {/* Address */}
//                     <FormField
//                         control={form.control}
//                         name="address"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Delivery Address</FormLabel>
//                                 <FormControl>
//                                     <Input placeholder="Enter your full address" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     {/* Payment Method */}
//                     <FormField
//                         control={form.control}
//                         name="paymentMethod"
//                         render={({ field }) => (
//                             <FormItem className="space-y-3">
//                                 <FormLabel>Pay with</FormLabel>
//                                 <FormControl>
//                                     <RadioGroup
//                                         value={field.value}
//                                         onValueChange={field.onChange}
//                                         className="flex flex-col gap-3"
//                                     >
//                                         <FormItem className="space-y-0">
//                                             <FormLabel
//                                                 htmlFor="stripe"
//                                                 className={`flex items-center gap-3 border rounded-md p-4 cursor-pointer transition-colors ${field.value === PaymentMethod.STRIPE
//                                                     ? "border-pink-600 bg-pink-50"
//                                                     : "hover:bg-gray-50"
//                                                     }`}
//                                             >
//                                                 <RadioGroupItem id="stripe" value={PaymentMethod.STRIPE} />
//                                                 <span className="font-medium">Pay with Stripe</span>
//                                             </FormLabel>
//                                         </FormItem>

//                                         <FormItem className="space-y-0">
//                                             <FormLabel
//                                                 htmlFor="cod"
//                                                 className={`flex items-center gap-3 border rounded-md p-4 cursor-pointer transition-colors ${field.value === PaymentMethod.COD
//                                                     ? "border-pink-600 bg-pink-50"
//                                                     : "hover:bg-gray-50"
//                                                     }`}
//                                             >
//                                                 <RadioGroupItem id="cod" value={PaymentMethod.COD} />
//                                                 <span className="font-medium">Cash on Delivery</span>
//                                             </FormLabel>
//                                         </FormItem>
//                                     </RadioGroup>
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </form>
//             </Form>

//             {/* একই জায়গায় ডাইনামিক বাটন */}
//             <Button
//                 onClick={handleButtonClick}
//                 disabled={isLoading || !form.formState.isValid}
//                 className="w-full bg-[#FF2B85] hover:bg-pink-600 text-white py-6 text-base font-medium rounded-xl"
//             >
//                 {buttonText}
//             </Button>

//             {/* অপশনাল: payment complete message */}
//             {checkoutUrl && (
//                 <p className="text-center text-sm text-green-600 mt-2">
//                     Order created! Click "Pay Now" to complete payment.
//                 </p>
//             )}
//         </div>
//     );
// }

// ----------------------------------------------------------------------------------------

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { clearCart, getCart } from "@/utils/cart-helper";

// Enums
export enum PaymentMethod {
    COD = "COD",
    STRIPE = "STRIPE",
}

export enum DeliveryOption {
    DELIVERY = "DELIVERY",
    PICKUP = "PICKUP",
}

// Schema
const checkoutSchema = z.object({
    fullname: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    paymentMethod: z.nativeEnum(PaymentMethod, {
        error: "Please select a payment method",
    }),
    deliveryOption: z.nativeEnum(DeliveryOption, {
        error: "Delivery option is required",
    }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

type CheckoutFormProps = {
    deliveryOption: DeliveryOption;
    setCheckout: (value: boolean) => void; // <-- receive setCheckout
};

export function CheckoutForm({ deliveryOption, setCheckout }: CheckoutFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            fullname: "",
            email: "",
            phone: "",
            address: "",
            paymentMethod: undefined as PaymentMethod | undefined,
            deliveryOption,
        },
    });

    const selectedPaymentMethod = form.watch("paymentMethod");

    const onSubmit = async (data: CheckoutFormValues) => {
        setIsLoading(true);

        try {
            const cart = await getCart();

            if (!cart || cart.length === 0) {
                toast.error("Your cart is empty");
                return;
            }

            console.log("cart items ", cart)

            const orderPayload = {
                orderType: "ONLINE",
                paymentMethod: data.paymentMethod,
                deliveryOption: data.deliveryOption,
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
                //     food: item.id,
                //     quantity: item.quantity,
                //     variant: item.selectedSize || null,
                //     ingredients: [
                //         ...(item.defaultIngredients?.map((ing) => ({ name: ing.name, price: ing.price })) || []),
                //         ...(item.extraIngredients?.map((ing) => ({ name: ing.name, price: ing.price })) || []),
                //     ],
                // })),
                customerInfo: {
                    name: data.fullname,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                },
            };

            console.log("Order Payload:", orderPayload);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/create-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderPayload),
            });

            const result = await response.json();

            console.log(result)
            if (!response.ok) {
                throw new Error(result.message || "Failed to create order");
            }

            if (result?.success && result?.data?.order?._id) {
                toast.success("Order created successfully!");
                if (result.data?.order?.payment?.paymentMethod === 'COD') {
                    setCheckout(false);
                }
                // Stripe case
                if (
                    data.paymentMethod === PaymentMethod.STRIPE &&
                    result.data.checkoutUrl
                ) {
                    setCheckoutUrl(result.data.checkoutUrl);
                    toast.info("Ready to pay — click 'Pay Now'");

                }
                // COD case
                else if (data.paymentMethod === PaymentMethod.COD) {
                    toast.success("Order placed with Cash on Delivery!");
                    clearCart();
                    form.reset(); // optional
                }
            } else {
                toast.error(result.message || "Something went wrong");
            }
        } catch (error: any) {
            console.error("Checkout error:", error);
            toast.error(error.message || "Failed to process order");
        } finally {
            setIsLoading(false);

        }
    };

    const isStripeSelected = selectedPaymentMethod === PaymentMethod.STRIPE;
    const buttonText = checkoutUrl
        ? "Pay Now"
        : isLoading
            ? "Processing..."
            : isStripeSelected
                ? "Create Order & Pay"
                : "Place Order";

    const handleButtonClick = () => {
        if (checkoutUrl) {
            clearCart();
            setCheckout(false);
            window.open(checkoutUrl, "_blank");
        } else {
            form.handleSubmit(onSubmit)();
        }
    };

    return (
        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Full Name */}
                    <FormField
                        control={form.control}
                        name="fullname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email address</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                    <Input type="tel" placeholder="Enter your phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Address */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Delivery Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your full address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Payment Method */}
                    <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Pay with</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        className="flex flex-col gap-3"
                                    >
                                        <FormItem className="space-y-0">
                                            <FormLabel
                                                htmlFor="stripe"
                                                className={`flex items-center gap-3 border rounded-md p-4 cursor-pointer transition-colors ${field.value === PaymentMethod.STRIPE
                                                    ? "border-pink-600 bg-pink-50"
                                                    : "hover:bg-gray-50"
                                                    }`}
                                            >
                                                <RadioGroupItem id="stripe" value={PaymentMethod.STRIPE} />
                                                <span className="font-medium">Pay with Stripe</span>
                                            </FormLabel>
                                        </FormItem>

                                        <FormItem className="space-y-0">
                                            <FormLabel
                                                htmlFor="cod"
                                                className={`flex items-center gap-3 border rounded-md p-4 cursor-pointer transition-colors ${field.value === PaymentMethod.COD
                                                    ? "border-pink-600 bg-pink-50"
                                                    : "hover:bg-gray-50"
                                                    }`}
                                            >
                                                <RadioGroupItem id="cod" value={PaymentMethod.COD} />
                                                <span className="font-medium">Cash on Delivery</span>
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>

            {/* একই জায়গায় ডাইনামিক বাটন */}
            <Button
                onClick={handleButtonClick}
                disabled={isLoading || !form.formState.isValid}
                className="w-full bg-[#FF2B85] hover:bg-pink-600 text-white py-6 text-base font-medium rounded-xl"
            >
                {buttonText}
            </Button>

            {/* অপশনাল: payment complete message */}
            {checkoutUrl && (
                <p className="text-center text-sm text-green-600 mt-2">
                    Order created! Click "Pay Now" to complete payment.
                </p>
            )}
        </div>
    );
}