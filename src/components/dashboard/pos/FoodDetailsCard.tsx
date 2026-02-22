// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { Plus, Minus, Euro } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Food } from "@/types";
// import { addToCart } from "@/utils/cart-helper";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// interface FoodCardProps {
//   food: Food;
// }

// export default function FoodDetailCard({ food }: FoodCardProps) {
//   const [quantity, setQuantity] = useState(1);
//   const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());

//   const router = useRouter();

//   const increaseQty = () => setQuantity((prev) => prev + 1);
//   const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   const basePrice = food.price;

//   const extrasTotal = Array.from(selectedExtras).reduce((sum, name) => {
//     const ing = food.ingredients?.find((i) => i.name === name);
//     return sum + (ing?.price || 0);
//   }, 0);

//   const unitTotal = basePrice + extrasTotal;
//   const grandTotal = unitTotal * quantity;

//   const formatPrice = (num: number) => num.toFixed(2);

//   const toggleExtra = (ingredientName: string) => {
//     setSelectedExtras((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(ingredientName)) {
//         newSet.delete(ingredientName);
//       } else {
//         newSet.add(ingredientName);
//       }
//       return newSet;
//     });
//   };

//   const handleAddToCart = async () => {
//     const ingredientsArray = Array.from(selectedExtras).map((name) => {
//       const ing = food.ingredients?.find((i) => i.name === name);
//       return { name, price: ing?.price || 0 };
//     });

//     await addToCart(
//       {
//         id: food._id,
//         name: food.name,
//         price: basePrice,
//         image: food.image,
//         ingredients: ingredientsArray,
//       },
//       quantity
//     );
//     setQuantity(1)
//     setSelectedExtras(new Set());
//     router.refresh();
//     toast.success("Added to cart");
//   };

//   return (
//     // <Card className="w-full max-w-2xl mx-auto overflow-hidden border-0 shadow-xl rounded-2xl">
//     //   {/* Image */}
//     //   <div className="relative h-64 sm:h-72 w-full">
//     //     <Image
//     //       src={food.image}
//     //       alt={food.name}
//     //       fill
//     //       className="object-cover"
//     //       priority
//     //     />
//     //   </div>

//     //   {/* Content */}
//     //   <CardContent className="p-6 pt-5 space-y-6">
//     //     {/* Title & Description */}
//     //     <div className="space-y-1.5">
//     //       <h2 className="text-2xl font-bold">{food.name}</h2>
//     //       <p className="text-base text-muted-foreground">{food.description}</p>
//     //     </div>

//     //     <Separator />

//     //     {/* Base Price */}
//     //     <div className="flex items-baseline gap-3">
//     //       <span className="text-3xl font-bold text-primary flex items-center gap-1">
//     //         <Euro size={26} /> {formatPrice(basePrice)}
//     //       </span>
//     //     </div>

//     //     {/* Extra Ingredients */}
//     //     {food?.ingredients && food.ingredients.length > 0 && (
//     //       <div className="space-y-3">
//     //         <label className="text-lg font-medium block">Extra Ingredients</label>
//     //         <div className="space-y-3">
//     //           {food.ingredients.map((ingredient) => {
//     //             const isSelected = selectedExtras.has(ingredient.name);
//     //             return (
//     //               <div
//     //                 key={ingredient.name}
//     //                 className="flex items-center justify-between py-1.5 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//     //               >
//     //                 <div className="flex items-center gap-2">
//     //                   <span className="font-medium">{ingredient.name}</span>
//     //                   <span className="text-muted-foreground text-sm flex items-center gap-1">
//     //                     + <Euro size={14} /> {ingredient.price}
//     //                   </span>
//     //                 </div>
//     //                 <Button
//     //                   variant="outline"
//     //                   size="sm"
//     //                   className={isSelected ? "border-primary text-primary" : ""}
//     //                   onClick={() => toggleExtra(ingredient.name)}
//     //                 >
//     //                   {isSelected ? <Minus size={16} /> : <Plus size={16} />}
//     //                 </Button>
//     //               </div>
//     //             );
//     //           })}
//     //         </div>
//     //       </div>
//     //     )}

//     //     {/* Quantity & Total */}
//     //     <div className="flex items-center justify-between pt-2">
//     //       <div className="flex items-center border rounded-full overflow-hidden bg-white">
//     //         <Button
//     //           variant="ghost"
//     //           size="icon"
//     //           onClick={decreaseQty}
//     //           disabled={quantity <= 1}
//     //           className="rounded-none hover:bg-gray-100"
//     //         >
//     //           <Minus size={18} />
//     //         </Button>
//     //         <span className="w-16 text-center font-medium text-lg">{quantity}</span>
//     //         <Button
//     //           variant="ghost"
//     //           size="icon"
//     //           onClick={increaseQty}
//     //           className="rounded-none hover:bg-gray-100"
//     //         >
//     //           <Plus size={18} />
//     //         </Button>
//     //       </div>

//     //       <div className="text-right">
//     //         <p className="text-sm text-muted-foreground">Total</p>
//     //         <p className="text-2xl font-bold flex items-center justify-end gap-1">
//     //           <Euro size={20} /> {formatPrice(grandTotal)}
//     //         </p>
//     //       </div>
//     //     </div>

//     //     {/* Add to Cart */}
//     //     <div className="pt-4">
//     //       <Button
//     //         className="w-full bg-pink-500 hover:bg-pink-600 text-white py-6 text-lg font-medium transition-colors"
//     //         onClick={handleAddToCart}
//     //       >
//     //         Add to cart
//     //       </Button>
//     //     </div>
//     //   </CardContent>
//     // </Card>

//     <Card className="w-full max-w-md mx-auto overflow-hidden border shadow-md rounded-xl bg-white"> {/* max-w-md দিয়ে width কমানো */}


//       {/* Content - reduced padding & spacing */}
//       <CardContent className="p-4 space-y-4">

//         <div className="flex gap-4 justify-between">


//           {/* Title & Description - smaller text */}
//           <div>
//             <div className="space-y-1">
//               <h2 className="text-xl font-bold leading-tight">{food.name}</h2>
//               <p className="text-sm text-muted-foreground line-clamp-2">{food.description}</p> {/* line-clamp দিয়ে ২ লাইনের বেশি না দেখানো */}
//             </div>

//             {/* Price - compact */}
//             <div className="flex items-baseline gap-2">
//               <span className="text-2xl font-bold text-primary flex items-center gap-1">
//                 <Euro size={20} /> {formatPrice(basePrice)}
//               </span>
//             </div>
//           </div>

//           {/* Image - smaller height */}
//           <div className="relative h-28 min-w-28 w-28">
//             <Image
//               src={food.image}
//               alt={food.name}
//               fill
//               className="object-cover w-full rounded-2xl"
//               priority
//             />
//           </div>
//         </div>
//         {/* Extra Ingredients - smaller & tighter */}
//         {food?.ingredients && food.ingredients.length > 0 && (
//           <div className="space-y-2">
//             <label className="text-base font-medium">Extras</label>
//             <div className="space-y-1.5 max-h-32 overflow-y-auto"> {/* scrollable if too many */}
//               {food.ingredients.map((ingredient) => {
//                 const isSelected = selectedExtras.has(ingredient.name);
//                 return (
//                   <div
//                     key={ingredient.name}
//                     className="flex items-center justify-between py-1 px-2.5 bg-gray-50/80 rounded-md text-sm hover:bg-gray-100"
//                   >
//                     <div className="flex items-center gap-1.5">
//                       <span className="font-medium">{ingredient.name}</span>
//                       <span className="text-muted-foreground flex items-center gap-0.5 text-xs">
//                         +<Euro size={12} /> {ingredient.price}
//                       </span>
//                     </div>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className={`h-7 w-7 ${isSelected ? "border-primary text-primary" : ""}`}
//                       onClick={() => toggleExtra(ingredient.name)}
//                     >
//                       {isSelected ? <Minus size={14} /> : <Plus size={14} />}
//                     </Button>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Quantity & Total - side by side, compact */}
//         <div className="flex items-center justify-between gap-4 pt-1">
//           <div className="flex items-center border rounded-full overflow-hidden bg-white text-base">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={decreaseQty}
//               disabled={quantity <= 1}
//               className="h-8 w-8 rounded-none hover:bg-gray-100"
//             >
//               <Minus size={16} />
//             </Button>
//             <span className="w-10 text-center font-semibold">{quantity}</span>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={increaseQty}
//               className="h-8 w-8 rounded-none hover:bg-gray-100"
//             >
//               <Plus size={16} />
//             </Button>
//           </div>

//           <div className="text-right">
//             <p className="text-xs text-muted-foreground">Total</p>
//             <p className="text-xl font-bold flex items-center justify-end gap-1">
//               <Euro size={16} /> {formatPrice(grandTotal)}
//             </p>
//           </div>
//         </div>

//         {/* Add to Cart - full width, slightly smaller */}
//         <div className="pt-2">
//           <Button
//             className="w-full bg-pink-500 hover:bg-pink-600 text-white py-5 text-base font-medium"
//             onClick={handleAddToCart}
//           >
//             Add to Cart
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
//-------------------------------------------------------------------

// "use client";
// import React, { useState } from "react";
// import { Plus, Minus, Euro, ShoppingCart } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Food } from "@/types";
// import { addToCart } from "@/utils/cart-helper";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// interface FoodCardProps {
//   food: Food;
// }

// export default function CompactFoodCard({ food }: FoodCardProps) {
//   const [quantity, setQuantity] = useState(1);
//   const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());

//   const router = useRouter();

//   const basePrice = food.price;

//   const extrasTotal = Array.from(selectedExtras).reduce((sum, name) => {
//     const ing = food.ingredients?.find((i) => i.name === name);
//     return sum + (ing?.price || 0);
//   }, 0);

//   const unitTotal = basePrice + extrasTotal;
//   const grandTotal = unitTotal * quantity;

//   const formatPrice = (num: number) => num.toFixed(2);

//   const toggleExtra = (name: string) => {
//     setSelectedExtras((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(name)) {
//         newSet.delete(name);
//       } else {
//         newSet.add(name);
//       }
//       return newSet;
//     });
//   };

//   const handleAddToCart = async () => {
//     const ingredientsArray = Array.from(selectedExtras).map((name) => {
//       const ing = food.ingredients?.find((i) => i.name === name);
//       return { name, price: ing?.price || 0 };
//     });

//     await addToCart(
//       {
//         id: food._id,
//         name: food.name,
//         price: basePrice,
//         image: food.image,
//         ingredients: ingredientsArray,
//       },
//       quantity
//     );

//     setQuantity(1);
//     setSelectedExtras(new Set());
//     router.refresh();
//     toast.success("Added to cart");
//   };

//   return (
//     <Card className="border shadow-sm rounded-lg bg-white overflow-hidden">
//       <CardContent className="p-3 space-y-3 text-sm">
//         {/* Row 1: Name + Price + Add Button */}
//         <div className="flex items-center justify-between gap-2">
//           <div className="font-medium leading-tight flex-1">
//             {food.name}
//           </div>

//           <div className="flex items-center gap-3 shrink-0">
//             <span className="font-bold text-base flex items-center gap-0.5 whitespace-nowrap">
//               <Euro size={14} /> {formatPrice(basePrice)}
//             </span>

//             <Button
//               size="icon"
//               variant="default"
//               className="h-8 w-8 bg-pink-600 hover:bg-pink-700 rounded-full"
//               onClick={handleAddToCart}
//             >
//               <ShoppingCart size={16} />
//             </Button>
//           </div>
//         </div>

//         {/* Row 2: Extras (horizontal scroll if many) */}
//         {food?.ingredients && food.ingredients.length > 0 && (
//           <div className="space-y-1.5">
//             <div className="text-xs text-muted-foreground font-medium">Extras</div>
//             <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto -mx-1 px-1 pb-1">
//               {food.ingredients.map((ing) => {
//                 const isSelected = selectedExtras.has(ing.name);
//                 return (
//                   <button
//                     key={ing.name}
//                     onClick={() => toggleExtra(ing.name)}
//                     className={`
//                       flex items-center gap-1 px-2.5 py-1 text-xs rounded-full transition-colors
//                       ${
//                         isSelected
//                           ? "bg-primary/10 border border-primary text-primary"
//                           : "bg-gray-100 hover:bg-gray-200 border border-transparent"
//                       }
//                     `}
//                   >
//                     <span>{ing.name}</span>
//                     <span className="text-xs opacity-75">
//                       +{formatPrice(ing.price)}
//                     </span>
//                     {isSelected ? (
//                       <Minus size={12} className="ml-0.5" />
//                     ) : (
//                       <Plus size={12} className="ml-0.5" />
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Row 3: Quantity + Total */}
//         <div className="flex items-center justify-between gap-3 pt-1">
//           {/* Quantity */}
//           <div className="flex items-center border rounded-lg overflow-hidden bg-white">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-7 w-7 rounded-none hover:bg-gray-100"
//               onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
//               disabled={quantity <= 1}
//             >
//               <Minus size={14} />
//             </Button>

//             <span className="w-9 text-center font-semibold text-base">
//               {quantity}
//             </span>

//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-7 w-7 rounded-none hover:bg-gray-100"
//               onClick={() => setQuantity((q) => q + 1)}
//             >
//               <Plus size={14} />
//             </Button>
//           </div>

//           {/* Total */}
//           <div className="text-right">
//             <p className="text-xs text-muted-foreground">Total</p>
//             <p className="font-bold text-lg flex items-center justify-end gap-0.5">
//               <Euro size={14} /> {formatPrice(grandTotal)}
//             </p>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// "use client";
// import React, { useState } from "react";
// import { Plus, Minus, Euro, ShoppingCart } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { addToCart } from "@/utils/cart-helper";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { cn } from "@/lib/utils";
// import { IFood } from "@/types";

// interface FoodCardProps {
//   food: IFood;
// }

// export default function UltraCompactFoodRow({ food }: FoodCardProps) {
//   const [quantity, setQuantity] = useState(1);
//   const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());

//   const router = useRouter();

//   const basePrice = food.variants && food.variants.length > 0 ? food.variants[0].price : food.price;
//   const extrasTotal = Array.from(selectedExtras).reduce((sum, name) => {
//     const ing = food.ingredients?.find((i) => i.name === name);
//     return sum + (ing?.price || 0);
//   }, 0);

//   const unitTotal = basePrice + extrasTotal;
//   const grandTotal = unitTotal * quantity;

//   const formatPrice = (num: number) => num?.toFixed(2);

//   const toggleExtra = (name: string) => {
//     setSelectedExtras((prev) => {
//       const s = new Set(prev);
//       if (s.has(name)) s.delete(name);
//       else s.add(name);
//       return s;
//     });
//   };

//   const handleAdd = async () => {
//     const ingredientsArray = Array.from(selectedExtras).map((name) => {
//       const ing = food.ingredients?.find((i) => i.name === name);
//       return { name, price: ing?.price || 0 };
//     });

//     await addToCart(
//       {
//         id: food._id,
//         name: food.name,
//         price: basePrice,
//         image: food.image,
//         ingredients: ingredientsArray,
//       },
//       quantity
//     );

//     setQuantity(1);
//     setSelectedExtras(new Set());
//     router.refresh();
//     toast.success("Added");
//   };

//   return (
//     <Card className="border rounded-md shadow-none  py-2 hover:bg-gray-50/60 transition-colors">
//       <CardContent className="p-2 flex flex-col gap-1.5 text-sm">
//         {/* Main row – name | price | quantity | total | add */}
//         <div className="flex items-center gap-3">
//           {/* Name – takes most space */}
//           <div className="flex-1 font-medium leading-tight truncate">
//             {food.name}
//           </div>

//           {/* Price */}
//           <div className="min-w-15 text-right font-semibold">
//             <span className="flex items-center justify-end gap-0.5">
//               <Euro size={13} className="opacity-80" />
//               {formatPrice(basePrice)}
//             </span>
//           </div>

//           {/* Quantity */}
//           <div className="flex items-center border rounded-md overflow-hidden bg-white shrink-0">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-6 w-6 rounded-none p-0 hover:bg-gray-100"
//               onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
//               disabled={quantity <= 1}
//             >
//               <Minus size={13} />
//             </Button>
//             <span className="w-7 text-center font-medium">{quantity}</span>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-6 w-6 rounded-none p-0 hover:bg-gray-100"
//               onClick={() => setQuantity((q) => q + 1)}
//             >
//               <Plus size={13} />
//             </Button>
//           </div>

//           {/* Total */}
//           <div className="min-w-17.5 text-right font-bold">
//             <span className="flex items-center justify-end gap-0.5">
//               <Euro size={13} />
//               {formatPrice(grandTotal)}
//             </span>
//           </div>

//           {/* Add button */}
//           <Button
//             size="icon"
//             variant="default"
//             className="h-7 w-7 cursor-pointer rounded-md bg-pink-600 hover:bg-pink-700 shrink-0"
//             onClick={handleAdd}
//           >
//             <ShoppingCart size={14} />
//           </Button>
//         </div>

//         {/* Extras row – only if there are ingredients */}
//         {food?.ingredients && food.ingredients.length > 0 && (
//           <div className="flex flex-wrap gap-1.5 pl-1">
//             {food?.ingredients?.map((ing) => {
//               const active = selectedExtras.has(ing.name);
//               return (
//                 <button
//                   key={ing.name}
//                   onClick={() => toggleExtra(ing.name)}
//                   className={cn(
//                     "flex items-center gap-1 px-2 py-0.5 text-xs rounded-full border transition-colors",
//                     active
//                       ? "bg-primary/10 border-primary text-primary"
//                       : "bg-gray-100 border-transparent hover:bg-gray-200"
//                   )}
//                 >
//                   {ing.name}
//                   <span className="opacity-70">+{formatPrice(ing.price)}</span>
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// ----------------------------------------------------------------------------------------------

// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import Image from "next/image";
// import { Plus, Minus, Euro, ShoppingCart, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { addToCart } from "@/utils/cart-helper";
// import { IFood, IIngredient } from "@/types";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// interface Props {
//   food: IFood;
// }

// export default function FoodDetailsCard({ food }: Props) {
//   const router = useRouter();

//   const [quantity, setQuantity] = useState(1);
//   const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
//   const [removedDefaults, setRemovedDefaults] = useState<Set<string>>(new Set());
//   const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
//   const [allIngredients, setAllIngredients] = useState<IIngredient[]>([]);
//   const [showExtras, setShowExtras] = useState(false);
//   const [loadingIngredients, setLoadingIngredients] = useState(false);

//   // 🔹 Fetch all ingredients (to distinguish default vs extras)
//   useEffect(() => {
//     const fetchIngredients = async () => {
//       try {
//         setLoadingIngredients(true);
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/all-ingredients`);
//         const data = await res.json();
//         setAllIngredients(data.data || []);
//       } catch (err) {
//         console.error("Ingredient fetch failed", err);
//       } finally {
//         setLoadingIngredients(false);
//       }
//     };
//     fetchIngredients();
//   }, []);

//   // 🔹 Selected variant
//   const selectedVariant = food.variants[selectedVariantIndex] || food.variants[0];

//   // 🔹 Effective price → offerPrice if available
//   const basePrice = selectedVariant?.offerPrice ?? selectedVariant?.price ?? 0;

//   // 🔹 Extras ingredients (all ingredients not in defaults)
//   const extraIngredients = useMemo(() => {
//     const defaultNames = new Set(food.ingredients?.map((i) => i.name) || []);
//     return allIngredients.filter((ing) => !defaultNames.has(ing.name));
//   }, [allIngredients, food.ingredients]);

//   // 🔹 Extras total
//   const extrasTotal = useMemo(() => {
//     const extras = Array.from(selectedExtras)
//       .map((name) => extraIngredients.find((i) => i.name === name))
//       .filter(Boolean) as IIngredient[];

//     if (food.category.title === "Metro") return extras.length * 4;
//     if (food.category.title === "Novellus")
//       return extras.length > 4
//         ? extras.slice(4).reduce((sum, i) => sum + i.price, 0)
//         : 0;
//     return extras.reduce((sum, i) => sum + i.price, 0);
//   }, [selectedExtras, extraIngredients, food.category.title]);

//   const unitTotal = basePrice + extrasTotal;
//   const grandTotal = unitTotal * quantity;

//   const toggleExtra = (name: string) => {
//     setSelectedExtras((prev) => {
//       const s = new Set(prev);
//       s.has(name) ? s.delete(name) : s.add(name);
//       return s;
//     });
//   };

//   const toggleDefault = (name: string) => {
//     setRemovedDefaults((prev) => {
//       const s = new Set(prev);
//       s.has(name) ? s.delete(name) : s.add(name);
//       return s;
//     });
//   };

//   const handleAdd = async () => {
//     const extras = Array.from(selectedExtras).map((name) => {
//       const ing = extraIngredients.find((i) => i.name === name);
//       return { _id: ing?._id || "", name, price: ing?.price || 0 };
//     });

//     await addToCart(
//       {
//         id: food._id,
//         name: food.name,
//         price: basePrice,
//         image: food.image,
//         selectedSize: selectedVariant?.size || "Normal",
//         category: food.category._id,
//         defaultIngredients: food.ingredients?.filter((i) => !removedDefaults.has(i.name)) || [],
//         extraIngredients: extras,
//         extrasTotal,
//       },
//       quantity
//     );

//     setQuantity(1);
//     setSelectedExtras(new Set());
//     setRemovedDefaults(new Set());
//     setSelectedVariantIndex(0);
//     router.refresh();
//     toast.success("Added to cart");
//   };

//   return (
//     <Card className="border rounded-md shadow-sm hover:bg-gray-50 transition-colors">
//       <CardContent className="p-3 flex flex-col gap-2">
//         {/* Image & Name */}
//         <div className="flex gap-3 items-center">
//           <div className="relative w-20 h-20 rounded-lg overflow-hidden">
//             <Image src={food.image} alt={food.name} fill className="object-cover" />
//           </div>
//           <div className="flex-1 flex flex-col">
//             <h4 className="font-medium">{food.name}</h4>
//             <p className="text-sm text-gray-500">{food.description}</p>
//           </div>
//         </div>

//         {/* Variant Selection */}
//         {food.variants?.length > 1 && (
//           <div className="mt-2">
//             <Select
//               value={selectedVariantIndex.toString()}
//               onValueChange={(val) => setSelectedVariantIndex(Number(val))}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select Size" />
//               </SelectTrigger>
//               <SelectContent>
//                 {food.variants.map((variant, index) => (
//                   <SelectItem key={index} value={index.toString()}>
//                     {variant.size} - ৳{variant.price.toFixed(2)}
//                     {variant.offerPrice !== undefined && (
//                       <span className="text-sm text-green-600 ml-2">
//                         (৳{variant.offerPrice.toFixed(2)})
//                       </span>
//                     )}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         )}

//         {/* Default Ingredients */}
//         {food?.ingredients && food.ingredients?.length > 0 && (
//           <div className="flex flex-wrap gap-2 mt-2">
//             {food.ingredients.map((ing) => (
//               <button
//                 key={ing.name}
//                 onClick={() => toggleDefault(ing.name)}
//                 className={`px-2 py-0.5 text-xs rounded-full border ${
//                   removedDefaults.has(ing.name)
//                     ? "bg-red-50 border-red-400 text-red-600 line-through"
//                     : "bg-gray-100 border-transparent"
//                 }`}
//               >
//                 {ing.name}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Extra Ingredients */}
//         {extraIngredients.length > 0 && (
//           <div className="mt-2">
//             <Button
//               variant="outline"
//               className="w-full flex justify-between"
//               onClick={() => setShowExtras(!showExtras)}
//               disabled={loadingIngredients}
//             >
//               Extra Ingredients
//               <ChevronDown className={`transition ${showExtras ? "rotate-180" : ""}`} />
//             </Button>

//             {showExtras && (
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {extraIngredients.map((ing) => {
//                   const selected = selectedExtras.has(ing.name);
//                   return (
//                     <button
//                       key={ing._id}
//                       onClick={() => toggleExtra(ing.name)}
//                       className={`px-2 py-0.5 text-xs rounded-full border ${
//                         selected
//                           ? "bg-green-50 border-green-400 text-green-600"
//                           : "bg-gray-100 border-transparent"
//                       }`}
//                     >
//                       {ing.name} +{ing.price.toFixed(2)}
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Quantity & Total */}
//         <div className="flex justify-between items-center mt-2">
//           <div className="flex items-center border rounded-full">
//             <Button size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
//               <Minus size={14} />
//             </Button>
//             <span className="px-4">{quantity}</span>
//             <Button size="icon" onClick={() => setQuantity(quantity + 1)}>
//               <Plus size={14} />
//             </Button>
//           </div>

//           <p className="text-lg font-bold flex items-center gap-1">
//             <Euro size={14} /> {grandTotal.toFixed(2)}
//           </p>

//           <Button
//             size="icon"
//             variant="default"
//             className="bg-pink-600 hover:bg-pink-700"
//             onClick={handleAdd}
//           >
//             <ShoppingCart size={16} />
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


// ------------------------------------------------------------------------------

// "use client";
// import React, { useState, useMemo, useEffect } from "react";
// import { Plus, Minus, ShoppingCart, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { addToCart } from "@/utils/cart-helper";
// import { IFood, IIngredient } from "@/types";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// interface Props {
//   food: IFood;
// }

// export default function CompactFoodCard({ food }: Props) {
//   const router = useRouter();
//   const [quantity, setQuantity] = useState(1);
//   const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
//   const [removedDefaults, setRemovedDefaults] = useState<Set<string>>(new Set());
//   const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
//   const [allIngredients, setAllIngredients] = useState<IIngredient[]>([]);
//   const [showExtras, setShowExtras] = useState(false);
//   const [loadingIngredients, setLoadingIngredients] = useState(false);

//   // Fetch all ingredients once
//   useEffect(() => {
//     const fetchIngredients = async () => {
//       try {
//         setLoadingIngredients(true);
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/all-ingredients`);
//         const data = await res.json();
//         setAllIngredients(data.data || []);
//       } catch (err) {
//         console.error("Ingredient fetch failed", err);
//       } finally {
//         setLoadingIngredients(false);
//       }
//     };
//     fetchIngredients();
//   }, []);

//   const selectedVariant = food.variants?.[selectedVariantIndex] ?? food.variants?.[0];
//   const basePrice = selectedVariant?.offerPrice ?? selectedVariant?.price ?? 0;

//   const extraIngredients = useMemo(() => {
//     const defaultNames = new Set(food.ingredients?.map((i) => i.name) || []);
//     return allIngredients.filter((ing) => !defaultNames.has(ing.name));
//   }, [allIngredients, food.ingredients]);

//   const extrasTotal = useMemo(() => {
//     const extras = Array.from(selectedExtras)
//       .map((name) => extraIngredients.find((i) => i.name === name))
//       .filter(Boolean) as IIngredient[];

//     if (food.category.title === "Metro") return extras.length * 4;
//     if (food.category.title === "Novellus")
//       return extras.length > 4 ? extras.slice(4).reduce((sum, i) => sum + i.price, 0) : 0;
//     return extras.reduce((sum, i) => sum + i.price, 0);
//   }, [selectedExtras, extraIngredients, food.category.title]);

//   const unitTotal = basePrice + extrasTotal;
//   const grandTotal = unitTotal * quantity;

//   const toggleExtra = (name: string) => {
//     setSelectedExtras((prev) => {
//       const s = new Set(prev);
//       s.has(name) ? s.delete(name) : s.add(name);
//       return s;
//     });
//   };

//   const toggleDefault = (name: string) => {
//     setRemovedDefaults((prev) => {
//       const s = new Set(prev);
//       s.has(name) ? s.delete(name) : s.add(name);
//       return s;
//     });
//   };

//   const handleAdd = async () => {
//     const extras = Array.from(selectedExtras).map((name) => {
//       const ing = extraIngredients.find((i) => i.name === name);
//       return { _id: ing?._id || "", name, price: ing?.price || 0 };
//     });

//     await addToCart(
//       {
//         id: food._id,
//         name: food.name,
//         price: basePrice,
//         image: food.image,
//         selectedSize: selectedVariant?.size || "Normal",
//         category: food.category._id,
//         defaultIngredients: food.ingredients?.filter((i) => !removedDefaults.has(i.name)) || [],
//         extraIngredients: extras,
//         extrasTotal,
//       },
//       quantity
//     );

//     setQuantity(1);
//     setSelectedExtras(new Set());
//     setRemovedDefaults(new Set());
//     setSelectedVariantIndex(0);
//     router.refresh();
//     toast.success("Added to cart");
//   };

//   return (
//     <Card className="border shadow-sm">
//       <CardContent className="p-2.5 flex flex-col gap-2 text-sm">
//         {/* Name + Variant */}
//         <div className="flex justify-between items-center gap-2">
//           <h4 className="font-medium leading-tight">{food.name}</h4>

//           {food.variants?.length > 1 ? (
//             <Select
//               value={selectedVariantIndex.toString()}
//               onValueChange={(v) => setSelectedVariantIndex(Number(v))}
//             >
//               <SelectTrigger className="w-28 h-8 text-xs">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {food.variants.map((v, i) => (
//                   <SelectItem key={i} value={i.toString()} className="text-xs">
//                     {v.size} ৳{(v.offerPrice ?? v.price).toFixed(2)}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           ) : (
//             <span className="text-xs font-medium text-muted-foreground">
//               ৳{basePrice.toFixed(2)}
//             </span>
//           )}
//         </div>

//         {/* Default ingredients (removable) */}
//         {food.ingredients?.length > 0 && (
//           <div className="flex flex-wrap gap-1">
//             {food.ingredients.map((ing) => (
//               <button
//                 key={ing.name}
//                 onClick={() => toggleDefault(ing.name)}
//                 className={`px-1.5 py-0.5 text-[10px] rounded-full border transition-colors ${
//                   removedDefaults.has(ing.name)
//                     ? "bg-red-50 border-red-300 text-red-700 line-through"
//                     : "bg-gray-100 border-gray-300"
//                 }`}
//               >
//                 {ing.name}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Extras toggle + list */}
//         {extraIngredients.length > 0 && (
//           <div>
//             <Button
//               variant="ghost"
//               size="sm"
//               className="w-full justify-between h-8 px-2 text-xs"
//               onClick={() => setShowExtras(!showExtras)}
//               disabled={loadingIngredients}
//             >
//               Extras {selectedExtras.size > 0 && `(+${selectedExtras.size})`}
//               <ChevronDown className={`h-3.5 w-3.5 transition ${showExtras ? "rotate-180" : ""}`} />
//             </Button>

//             {showExtras && (
//               <div className="flex flex-wrap gap-1 mt-1.5">
//                 {extraIngredients.map((ing) => {
//                   const isSelected = selectedExtras.has(ing.name);
//                   return (
//                     <button
//                       key={ing._id}
//                       onClick={() => toggleExtra(ing.name)}
//                       className={`px-1.5 py-0.5 text-[10px] rounded-full border ${
//                         isSelected
//                           ? "bg-green-50 border-green-300 text-green-700"
//                           : "bg-gray-50 border-gray-200"
//                       }`}
//                     >
//                       {ing.name} +{ing.price.toFixed(2)}
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Quantity + Total + Add */}
//         <div className="flex items-center justify-between gap-2 mt-1">
//           <div className="flex items-center border rounded-full h-8 text-sm">
//             <Button
//               size="icon"
//               variant="ghost"
//               className="h-8 w-8"
//               onClick={() => setQuantity(Math.max(1, quantity - 1))}
//             >
//               <Minus size={14} />
//             </Button>
//             <span className="w-9 text-center font-medium">{quantity}</span>
//             <Button
//               size="icon"
//               variant="ghost"
//               className="h-8 w-8"
//               onClick={() => setQuantity(quantity + 1)}
//             >
//               <Plus size={14} />
//             </Button>
//           </div>

//           <div className="font-bold text-base">
//             ৳{grandTotal.toFixed(2)}
//           </div>

//           <Button
//             size="icon"
//             className="h-8 w-8 bg-pink-600 hover:bg-pink-700"
//             onClick={handleAdd}
//           >
//             <ShoppingCart size={15} />
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


// -----------------------------------------------------------------------


// "use client";
// import React, { useState, useMemo, useEffect } from "react";
// import { Plus, Minus, ShoppingCart, ChevronDown, Euro } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { addToCart } from "@/utils/cart-helper";
// import { IFood, IIngredient } from "@/types";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// interface Props {
//   food: IFood;
// }

// export default function CompactFoodCard({ food }: Props) {
//   const router = useRouter();
//   const [quantity, setQuantity] = useState(1);
//   const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
//   const [removedDefaults, setRemovedDefaults] = useState<Set<string>>(new Set());
//   const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
//   const [allIngredients, setAllIngredients] = useState<IIngredient[]>([]);
//   const [showExtras, setShowExtras] = useState(false);
//   const [loadingIngredients, setLoadingIngredients] = useState(false);

//   // Fetch all ingredients once
//   useEffect(() => {
//     const fetchIngredients = async () => {
//       try {
//         setLoadingIngredients(true);
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/all-ingredients`);
//         const data = await res.json();
//         setAllIngredients(data.data || []);
//       } catch (err) {
//         console.error("Ingredient fetch failed", err);
//       } finally {
//         setLoadingIngredients(false);
//       }
//     };
//     fetchIngredients();
//   }, []);

//   const selectedVariant = food.variants?.[selectedVariantIndex] ?? food.variants?.[0];
//   const basePrice = selectedVariant?.offerPrice ?? selectedVariant?.price ?? 0;

//   const extraIngredients = useMemo(() => {
//     const defaultNames = new Set(food.ingredients?.map((i) => i.name) || []);
//     return allIngredients.filter((ing) => !defaultNames.has(ing.name));
//   }, [allIngredients, food.ingredients]);

//   const extrasTotal = useMemo(() => {
//     const extras = Array.from(selectedExtras)
//       .map((name) => extraIngredients.find((i) => i.name === name))
//       .filter(Boolean) as IIngredient[];

//     if (food.category.title === "Metro") return extras.length * 4;
//     if (food.category.title === "Novellus")
//       return extras.length > 4 ? extras.slice(4).reduce((sum, i) => sum + i.price, 0) : 0;
//     return extras.reduce((sum, i) => sum + i.price, 0);
//   }, [selectedExtras, extraIngredients, food.category.title]);

//   const unitTotal = basePrice + extrasTotal;
//   const grandTotal = unitTotal * quantity;

//   const toggleExtra = (name: string) => {
//     setSelectedExtras((prev) => {
//       const s = new Set(prev);
//       s.has(name) ? s.delete(name) : s.add(name);
//       return s;
//     });
//   };

//   const toggleDefault = (name: string) => {
//     setRemovedDefaults((prev) => {
//       const s = new Set(prev);
//       s.has(name) ? s.delete(name) : s.add(name);
//       return s;
//     });
//   };

//   const handleAdd = async () => {
//     const extras = Array.from(selectedExtras).map((name) => {
//       const ing = extraIngredients.find((i) => i.name === name);
//       return { _id: ing?._id || "", name, price: ing?.price || 0 };
//     });

//     await addToCart(
//       {
//         id: food._id,
//         name: food.name,
//         price: basePrice,
//         image: food.image,
//         selectedSize: selectedVariant?.size || "Normal",
//         category: food.category._id,
//         defaultIngredients: food.ingredients?.filter((i) => !removedDefaults.has(i.name)) || [],
//         extraIngredients: extras,
//         extrasTotal,
//       },
//       quantity
//     );

//     setQuantity(1);
//     setSelectedExtras(new Set());
//     setRemovedDefaults(new Set());
//     setSelectedVariantIndex(0);
//     router.refresh();
//     toast.success("Added to cart");
//   };

//   return (
//     <Card className="border shadow-sm">
//       <CardContent className="p-2.5 flex flex-col gap-2 text-sm">
//         {/* Name + Variant */}
//         <div className="flex justify-between items-center gap-2">
//           <h4 className="font-medium leading-tight">{food.name}</h4>

//           {food.variants?.length > 1 ? (
//             <Select
//               value={selectedVariantIndex.toString()}
//               onValueChange={(v) => setSelectedVariantIndex(Number(v))}
//             >
//               <SelectTrigger className="w-max h-8 text-xs">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {food.variants.map((v, i) => (
//                   <SelectItem key={i} value={i.toString()} className="text-xs">
//                     {v.size}{" "}
//                     <Euro size={12} className="inline" />
//                     {(v.offerPrice ?? v.price).toFixed(2)}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           ) : (
//             <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
//               <Euro size={12} />
//               {basePrice.toFixed(2)}
//             </span>
//           )}
//         </div>

//         {/* Default ingredients (removable) */}
//         {food.ingredients && food.ingredients?.length > 0 && (
//           <div className="flex flex-wrap gap-1">
//             {food.ingredients.map((ing) => (
//               <button
//               disabled={food.category.title === "Novellus"} // Novellus items can't remove defaults
//                 key={ing.name}
//                 onClick={() => toggleDefault(ing.name)}
//                 className={`px-1.5 py-0.5 text-[10px] rounded-full border transition-colors ${
//                   removedDefaults.has(ing.name)
//                     ? "bg-red-50 border-red-300 text-red-700 line-through"
//                     : "bg-gray-100 border-gray-300"
//                 }`}
//               >
//                 {ing.name}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Extras toggle + list */}
//         {extraIngredients.length > 0 && (
//           <div>
//             <Button
//               variant="ghost"
//               size="sm"
//               className="w-full justify-between h-8 px-2 text-xs"
//               onClick={() => setShowExtras(!showExtras)}
//               disabled={loadingIngredients}
//             >
//               Extras {selectedExtras.size > 0 && `(+${selectedExtras.size})`}
//               <ChevronDown className={`h-3.5 w-3.5 transition ${showExtras ? "rotate-180" : ""}`} />
//             </Button>

//             {showExtras && (
//               <div className="flex flex-wrap gap-1 mt-1.5">
//                 {extraIngredients.map((ing) => {
//                   const isSelected = selectedExtras.has(ing.name);
//                   return (
//                     <button
//                       key={ing._id}
//                       onClick={() => toggleExtra(ing.name)}
//                       className={`px-1.5 py-0.5 text-[10px] rounded-full border ${
//                         isSelected
//                           ? "bg-green-50 border-green-300 text-green-700"
//                           : "bg-gray-50 border-gray-200"
//                       }`}
//                     >
//                       {ing.name}
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Quantity + Total + Add */}
//         <div className="flex items-center justify-between gap-2 mt-1">
//           <div className="flex items-center border rounded-full h-8 text-sm">
//             <Button
//               size="icon"
//               variant="ghost"
//               className="h-8 w-8"
//               onClick={() => setQuantity(Math.max(1, quantity - 1))}
//             >
//               <Minus size={14} />
//             </Button>
//             <span className="w-9 text-center font-medium">{quantity}</span>
//             <Button
//               size="icon"
//               variant="ghost"
//               className="h-8 w-8"
//               onClick={() => setQuantity(quantity + 1)}
//             >
//               <Plus size={14} />
//             </Button>
//           </div>

//           <div className="font-bold text-base flex items-center gap-1">
//             <Euro size={14} />
//             {grandTotal.toFixed(2)}
//           </div>

//           <Button
//             size="icon"
//             className="h-8 w-8 bg-pink-600 hover:bg-pink-700"
//             onClick={handleAdd}
//           >
//             <ShoppingCart size={15} />
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


// ---------------------------------------------------------------

"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Plus, Minus, ShoppingCart, ChevronDown, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addToCart } from "@/utils/cart-helper";
import { IFood, IIngredient } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Props {
  food: IFood;
}

export default function CompactFoodCard({ food }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [removedDefaults, setRemovedDefaults] = useState<Set<string>>(new Set());
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
  const [allIngredients, setAllIngredients] = useState<IIngredient[]>([]);
  const [showExtras, setShowExtras] = useState(false);
  const [loadingIngredients, setLoadingIngredients] = useState(false);

  const selectedVariant = food.variants?.[selectedVariantIndex] ?? food.variants?.[0];
  const isOutOfStock = selectedVariant?.totalStock === 0;
  const basePrice = selectedVariant?.offerPrice ?? selectedVariant?.price ?? 0;

  // Fetch all ingredients once
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoadingIngredients(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/all-ingredients`);
        const data = await res.json();
        setAllIngredients(data.data || []);
      } catch (err) {
        console.error("Ingredient fetch failed", err);
      } finally {
        setLoadingIngredients(false);
      }
    };
    fetchIngredients();
  }, []);

  const extraIngredients = useMemo(() => {
    const defaultNames = new Set(food.ingredients?.map((i) => i.name) || []);
    return allIngredients.filter((ing) => !defaultNames.has(ing.name));
  }, [allIngredients, food.ingredients]);

  const extrasTotal = useMemo(() => {
    const extras = Array.from(selectedExtras)
      .map((name) => extraIngredients.find((i) => i.name === name))
      .filter(Boolean) as IIngredient[];

    if (food.category.title === "Metro") return extras.length * 4;
    if (food.category.title === "Novellus")
      return extras.length > 4 ? extras.slice(4).reduce((sum, i) => sum + i.price, 0) : 0;
    return extras.reduce((sum, i) => sum + i.price, 0);
  }, [selectedExtras, extraIngredients, food.category.title]);

  const unitTotal = basePrice + extrasTotal;
  const grandTotal = unitTotal * quantity;

  const toggleExtra = (name: string) => {
    setSelectedExtras((prev) => {
      const s = new Set(prev);
      s.has(name) ? s.delete(name) : s.add(name);
      return s;
    });
  };

  const toggleDefault = (name: string) => {
    setRemovedDefaults((prev) => {
      const s = new Set(prev);
      s.has(name) ? s.delete(name) : s.add(name);
      return s;
    });
  };

  // Increase/decrease quantity with stock limit
  const increaseQuantity = () => {
    if (!selectedVariant) return;
    if (quantity < selectedVariant.totalStock) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.error("You cannot select more than available stock");
    }
  };

  const decreaseQuantity = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  // Reset quantity if variant changes and stock is less than current quantity
  useEffect(() => {
    if (quantity > selectedVariant.totalStock) {
      setQuantity(1);
    }
  }, [selectedVariantIndex, selectedVariant.totalStock]);

  const handleAdd = async () => {
    if (isOutOfStock) return;

    const extras = Array.from(selectedExtras).map((name) => {
      const ing = extraIngredients.find((i) => i.name === name);
      return { _id: ing?._id || "", name, price: ing?.price || 0 };
    });

    await addToCart(
      {
        id: food._id,
        name: food.name,
        price: basePrice,
        image: food.image,
        selectedSize: selectedVariant?.size || "Normal",
        category: food.category._id,
        defaultIngredients: food.ingredients?.filter((i) => !removedDefaults.has(i.name)) || [],
        extraIngredients: extras,
        extrasTotal,
      },
      quantity
    );

    setQuantity(1);
    setSelectedExtras(new Set());
    setRemovedDefaults(new Set());
    setSelectedVariantIndex(0);
    router.refresh();
    toast.success("Added to cart");
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-2.5 flex flex-col gap-2 text-sm">
        {/* Name + Variant */}
        <div className="flex justify-between items-center gap-2">
          <h4 className="font-medium leading-tight">{food.name}</h4>

          {food.variants?.length > 1 ? (
            <Select
              value={selectedVariantIndex.toString()}
              onValueChange={(v) => setSelectedVariantIndex(Number(v))}
            >
              <SelectTrigger className="w-max h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {food.variants.map((v, i) => (
                  <SelectItem key={i} value={i.toString()} className="text-xs">
                    {v.size}{" "}
                    <Euro size={12} className="inline" />
                    {(v.offerPrice ?? v.price).toFixed(2)}
                    {v.totalStock === 0 && (
                      <span className="text-red-500 ml-1">(Out of Stock)</span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Euro size={12} />
              {basePrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Default ingredients (removable) */}
        {food.ingredients && food.ingredients.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {food.ingredients.map((ing) => (
              <button
                disabled={food.category.title === "Novellus"}
                key={ing.name}
                onClick={() => toggleDefault(ing.name)}
                className={`px-1.5 py-0.5 text-[10px] rounded-full border transition-colors ${
                  removedDefaults.has(ing.name)
                    ? "bg-red-50 border-red-300 text-red-700 line-through"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                {ing.name}
              </button>
            ))}
          </div>
        )}

        {/* Extras toggle + list */}
        {extraIngredients.length > 0 && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between h-8 px-2 text-xs"
              onClick={() => setShowExtras(!showExtras)}
              disabled={loadingIngredients}
            >
              Extras {selectedExtras.size > 0 && `(+${selectedExtras.size})`}
              <ChevronDown
                className={`h-3.5 w-3.5 transition ${
                  showExtras ? "rotate-180" : ""
                }`}
              />
            </Button>

            {showExtras && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {extraIngredients.map((ing) => {
                  const isSelected = selectedExtras.has(ing.name);
                  return (
                    <button
                      key={ing._id}
                      onClick={() => toggleExtra(ing.name)}
                      className={`px-1.5 py-0.5 text-[10px] rounded-full border ${
                        isSelected
                          ? "bg-green-50 border-green-300 text-green-700"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      {ing.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Quantity + Total + Add */}
        <div className="flex items-center justify-between gap-2 mt-1">
          <div className="flex items-center border rounded-full h-8 text-sm">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={decreaseQuantity}
            >
              <Minus size={14} />
            </Button>
            <span className="w-9 text-center font-medium">{quantity}</span>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={increaseQuantity}
              disabled={quantity >= selectedVariant.totalStock || isOutOfStock}
            >
              <Plus size={14} />
            </Button>
          </div>

          <div className="font-bold text-base flex items-center gap-1">
            <Euro size={14} />
            {grandTotal.toFixed(2)}
          </div>

          <Button
            size="icon"
            className="h-8 w-8 bg-pink-600 hover:bg-pink-700"
            onClick={handleAdd}
            disabled={isOutOfStock}
          >
            <ShoppingCart size={15} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
