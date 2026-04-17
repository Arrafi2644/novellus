
// // "use client";
// // import React, { useState, useMemo, useEffect } from "react";
// // import { Plus, Minus, ShoppingCart, ChevronDown, Euro } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { addToCart } from "@/utils/cart-helper";
// // import { IFood, IIngredient } from "@/types";
// // import { toast } from "sonner";
// // import { useRouter } from "next/navigation";
// // import {
// //   Select,
// //   SelectTrigger,
// //   SelectValue,
// //   SelectContent,
// //   SelectItem,
// // } from "@/components/ui/select";

// // interface Props {
// //   food: IFood;
// // }

// // export default function CompactFoodCard({ food }: Props) {
// //   const router = useRouter();
// //   const [quantity, setQuantity] = useState(1);
// //   const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
// //   const [removedDefaults, setRemovedDefaults] = useState<Set<string>>(new Set());
// //   const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
// //   const [allIngredients, setAllIngredients] = useState<IIngredient[]>([]);
// //   const [showExtras, setShowExtras] = useState(false);
// //   const [loadingIngredients, setLoadingIngredients] = useState(false);

// //   const selectedVariant = food.variants?.[selectedVariantIndex] ?? food.variants?.[0];
// //   const isOutOfStock = selectedVariant?.totalStock === 0;
// //   const basePrice = selectedVariant?.offerPrice ?? selectedVariant?.price ?? 0;

// //   // Fetch all ingredients once
// //   useEffect(() => {
// //     const fetchIngredients = async () => {
// //       try {
// //         setLoadingIngredients(true);
// //         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/all-ingredients?limit=400`);
// //         const data = await res.json();
// //         setAllIngredients(data.data || []);
// //       } catch (err) {
// //         console.error("Ingredient fetch failed", err);
// //       } finally {
// //         setLoadingIngredients(false);
// //       }
// //     };
// //     fetchIngredients();
// //   }, []);

// //   const extraIngredients = useMemo(() => {
// //     const defaultNames = new Set(food.ingredients?.map((i) => i.name) || []);
// //     return allIngredients.filter((ing) => !defaultNames.has(ing.name));
// //   }, [allIngredients, food.ingredients]);

// //   const extrasTotal = useMemo(() => {
// //     const extras = Array.from(selectedExtras)
// //       .map((name) => extraIngredients.find((i) => i.name === name))
// //       .filter(Boolean) as IIngredient[];

// //     if (food.category.title === "Metro") return extras.length * 4;
// //     if (food.category.title === "Novellus")
// //       return extras.length > 4 ? extras.slice(4).reduce((sum, i) => sum + i.price, 0) : 0;
// //     return extras.reduce((sum, i) => sum + i.price, 0);
// //   }, [selectedExtras, extraIngredients, food.category.title]);

// //   const unitTotal = basePrice + extrasTotal;
// //   const grandTotal = unitTotal * quantity;

// //   const toggleExtra = (name: string) => {
// //     setSelectedExtras((prev) => {
// //       const s = new Set(prev);
// //       s.has(name) ? s.delete(name) : s.add(name);
// //       return s;
// //     });
// //   };

// //   const toggleDefault = (name: string) => {
// //     setRemovedDefaults((prev) => {
// //       const s = new Set(prev);
// //       s.has(name) ? s.delete(name) : s.add(name);
// //       return s;
// //     });
// //   };

// //   // Increase/decrease quantity with stock limit
// //   const increaseQuantity = () => {
// //     if (!selectedVariant) return;
// //     if (quantity < selectedVariant.totalStock) {
// //       setQuantity((prev) => prev + 1);
// //     } else {
// //       toast.error("You cannot select more than available stock");
// //     }
// //   };

// //   const decreaseQuantity = () => {
// //     setQuantity(Math.max(1, quantity - 1));
// //   };

// //   // Reset quantity if variant changes and stock is less than current quantity
// //   useEffect(() => {
// //     if (quantity > selectedVariant.totalStock) {
// //       setQuantity(1);
// //     }
// //   }, [selectedVariantIndex, selectedVariant.totalStock]);

// //   const handleAdd = async () => {
// //     if (isOutOfStock) return;

// //     const extras = Array.from(selectedExtras).map((name) => {
// //       const ing = extraIngredients.find((i) => i.name === name);
// //       return { _id: ing?._id || "", name, price: ing?.price || 0 };
// //     });

// //     await addToCart(
// //       {
// //         id: food._id,
// //         name: food.name,
// //         price: basePrice,
// //         image: food.image,
// //         selectedSize: selectedVariant?.size || "Normal",
// //         category: food.category._id,
// //         defaultIngredients: food.ingredients?.filter((i) => !removedDefaults.has(i.name)) || [],
// //         extraIngredients: extras,
// //         extrasTotal,
// //       },
// //       quantity
// //     );

// //     setQuantity(1);
// //     setSelectedExtras(new Set());
// //     setRemovedDefaults(new Set());
// //     setSelectedVariantIndex(0);
// //     router.refresh();
// //     toast.success("Added to cart");
// //   };

// //   return (
// //     <Card className="border shadow-sm">
// //       <CardContent className="p-2.5 flex flex-col gap-2 text-sm">
// //         {/* Name + Variant */}
// //         <div className="flex justify-between items-center gap-2">
// //           <h4 className="font-medium leading-tight">{food.name}</h4>

// //           {food.variants?.length > 1 ? (
// //             <Select
// //               value={selectedVariantIndex.toString()}
// //               onValueChange={(v) => setSelectedVariantIndex(Number(v))}
// //             >
// //               <SelectTrigger className="w-max h-8 text-xs">
// //                 <SelectValue />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 {food.variants.map((v, i) => (
// //                   <SelectItem key={i} value={i.toString()} className="text-xs">
// //                     {v.size}{" "}
// //                     <Euro size={12} className="inline" />
// //                     {(v.offerPrice ?? v.price).toFixed(2)}
// //                     {v.totalStock === 0 && (
// //                       <span className="text-red-500 ml-1">(Stock Out)</span>
// //                     )}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //           ) : (
// //             <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
// //               <Euro size={12} />
// //               {basePrice.toFixed(2)}
// //             </span>
// //           )}
// //         </div>

// //         {/* Default ingredients (removable) */}
// //         {food.ingredients && food.ingredients.length > 0 && (
// //           <div className="flex flex-wrap gap-1">
// //             {food.ingredients.map((ing) => (
// //               <button
// //                 disabled={food.category.title === "Novellus"}
// //                 key={ing.name}
// //                 onClick={() => toggleDefault(ing.name)}
// //                 className={`px-1.5 py-0.5 text-[10px] rounded-full border transition-colors ${
// //                   removedDefaults.has(ing.name)
// //                     ? "bg-red-50 border-red-300 text-red-700 line-through"
// //                     : "bg-gray-100 border-gray-300"
// //                 }`}
// //               >
// //                 {ing.name}
// //               </button>
// //             ))}
// //           </div>
// //         )}

// //         {/* Extras toggle + list */}
// //         {extraIngredients.length > 0 && (
// //           <div>
// //             <Button
// //               variant="ghost"
// //               size="sm"
// //               className="w-full justify-between h-8 px-2 text-xs"
// //               onClick={() => setShowExtras(!showExtras)}
// //               disabled={loadingIngredients}
// //             >
// //               Extras {selectedExtras.size > 0 && `(+${selectedExtras.size})`}
// //               <ChevronDown
// //                 className={`h-3.5 w-3.5 transition ${
// //                   showExtras ? "rotate-180" : ""
// //                 }`}
// //               />
// //             </Button>

// //             {showExtras && (
// //               <div className="flex flex-wrap gap-1 mt-1.5">
// //                 {extraIngredients.map((ing) => {
// //                   const isSelected = selectedExtras.has(ing.name);
// //                   return (
// //                     <button
// //                       key={ing._id}
// //                       onClick={() => toggleExtra(ing.name)}
// //                       className={`px-1.5 py-0.5 text-[10px] rounded-full border ${
// //                         isSelected
// //                           ? "bg-green-50 border-green-300 text-green-700"
// //                           : "bg-gray-50 border-gray-200"
// //                       }`}
// //                     >
// //                       {ing.name}
// //                     </button>
// //                   );
// //                 })}
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* Quantity + Total + Add */}
// //         <div className="flex items-center justify-between gap-2 mt-1">
// //           <div className="flex items-center border rounded-full h-8 text-sm">
// //             <Button
// //               size="icon"
// //               variant="ghost"
// //               className="h-8 w-8"
// //               onClick={decreaseQuantity}
// //             >
// //               <Minus size={14} />
// //             </Button>
// //             <span className="w-9 text-center font-medium">{quantity}</span>
// //             <Button
// //               size="icon"
// //               variant="ghost"
// //               className="h-8 w-8"
// //               onClick={increaseQuantity}
// //               disabled={quantity >= selectedVariant.totalStock || isOutOfStock}
// //             >
// //               <Plus size={14} />
// //             </Button>
// //           </div>

// //           <div className="font-bold text-base flex items-center gap-1">
// //             <Euro size={14} />
// //             {grandTotal.toFixed(2)}
// //           </div>

// //           <Button
// //             size="icon"
// //             className="h-8 w-8 bg-pink-600 hover:bg-pink-700"
// //             onClick={handleAdd}
// //             disabled={isOutOfStock}
// //           >
// //             <ShoppingCart size={15} />
// //           </Button>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // }

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
// import { useFood } from "@/context/FoodContext";
// import { useGetAllFoodsQuery } from "@/redux/features/food/food.api";
// import Image from "next/image";

// interface Props {
//   food: IFood;
// }

// export default function CompactFoodCard({ food }: Props) {
//   const router = useRouter();
//   // const { foods } = useFood();

//   // const foods = useGetAllFoodsQuery()
//     const { data, isLoading, isError } = useGetAllFoodsQuery({}
//   );
//   const foods = data?.data
//   const [quantity, setQuantity] = useState(1);
//   const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
//   const [removedDefaults, setRemovedDefaults] = useState<Set<string>>(new Set());
//   const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
//   const [allIngredients, setAllIngredients] = useState<IIngredient[]>([]);
//   const [showExtras, setShowExtras] = useState(false);
//   const [loadingIngredients, setLoadingIngredients] = useState(false);

//   // Pizza a Metro specific state
//   const [multiPizzas, setMultiPizzas] = useState<Set<string>>(new Set());
//   const [pizzaSlices, setPizzaSlices] = useState<number | null>(null);
//   const [showPizzas, setShowPizzas] = useState(false);

//   const isPizzaAMetro = food.category?.title === "Pizza a Metro";
//   const isNovellus = food.name === "NOVELLUS AG";
//   const isFarcita = isPizzaAMetro && food.name === "Farcita";

//   const selectedVariant = food.variants?.[selectedVariantIndex] ?? food.variants?.[0];
//   const isOutOfStock = selectedVariant?.totalStock === 0;
//   const basePrice = selectedVariant?.offerPrice ?? selectedVariant?.price ?? 0;

//   // Fetch all ingredients once
//   useEffect(() => {
//     const fetchIngredients = async () => {
//       try {
//         setLoadingIngredients(true);
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/all-ingredients?limit=400`);
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

//   const extraIngredients = useMemo(() => {
//     const defaultNames = new Set(food.ingredients?.map((i) => i.name) || []);
//     return allIngredients.filter((ing) => !defaultNames.has(ing.name));
//   }, [allIngredients, food.ingredients]);

//   // ── Extras pricing logic (mirrors FoodDetailsDialog) ──
//   const extrasTotal = useMemo(() => {
//     const extras = Array.from(selectedExtras)
//       .map((name) => extraIngredients.find((i) => i.name === name))
//       .filter(Boolean) as IIngredient[];

//     if (isPizzaAMetro) return extras.length * 4;
//     if (isNovellus)
//       return extras.length > 4
//         ? extras.slice(4).reduce((sum, i) => sum + i.price, 0)
//         : 0;
//     return extras.reduce((sum, i) => sum + i.price, 0);
//   }, [selectedExtras, extraIngredients, isPizzaAMetro, isNovellus]);

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

//   const increaseQuantity = () => {
//     if (!selectedVariant) return;
//     if (quantity < selectedVariant.totalStock) {
//       setQuantity((prev) => prev + 1);
//     } else {
//       toast.error("You cannot select more than available stock");
//     }
//   };

//   const decreaseQuantity = () => setQuantity(Math.max(1, quantity - 1));

//   useEffect(() => {
//     if (quantity > selectedVariant.totalStock) setQuantity(1);
//   }, [selectedVariantIndex, selectedVariant.totalStock]);

//   const handleAdd = async () => {
//     if (isOutOfStock) return;

//     // Pizza a Metro slices validation
//     if (isPizzaAMetro && !pizzaSlices) {
//       toast.error("Please select number of slices for Pizza a Metro");
//       return;
//     }

//     // ── Extras with correct per-category pricing (mirrors FoodDetailsDialog) ──
//     const extras = Array.from(selectedExtras).map((name, index) => {
//       const ing = extraIngredients.find((i) => i.name === name);

//       let price = 0;
//       if (isPizzaAMetro) {
//         price = 4;
//       } else if (isNovellus) {
//         price = index < 4 ? 0 : ing?.price || 0;
//       } else {
//         price = ing?.price || 0;
//       }

//       return { _id: ing?._id || "", name, price };
//     });

//     await addToCart(
//       {
//         id: food._id,
//         name: food.name,
//         price: basePrice,
//         image: food.image,
//         selectedSize: selectedVariant?.size || "Normal",
//         category: food.category._id,
//         defaultIngredients:
//           food.ingredients?.filter((i) => !removedDefaults.has(i.name)) || [],
//         extraIngredients: extras,
//         extrasTotal,
//         selectedPizzas:
//           multiPizzas.size > 0 ? Array.from(multiPizzas) : undefined,
//         pizzaSlices: pizzaSlices ?? null,
//       },
//       quantity
//     );

//     setQuantity(1);
//     setSelectedExtras(new Set());
//     setRemovedDefaults(new Set());
//     setSelectedVariantIndex(0);
//     setMultiPizzas(new Set());
//     setPizzaSlices(null);
//     router.refresh();
//     toast.success("Added to cart");
//   };

//   return (
//     <Card className="border shadow-sm">
//       <CardContent className="p-2.5 flex flex-col gap-2 text-sm">
//         {/* Name + Variant */}
//         <div className="flex justify-between items-center gap-2">
//           <h4 className="font-medium leading-tight">{food.name}</h4>

//           <Image
//           src={food.image}
//           alt={food?.name}
//           height={80}
//           width={80}
          
//           />


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
//                     {v.totalStock === 0 && (
//                       <span className="text-red-500 ml-1">(Stock Out)</span>
//                     )}
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

//         {/* Default ingredients (removable) — disabled for Novellus */}
//         {food.ingredients && food.ingredients.length > 0 && (
//           <div className="flex flex-wrap gap-1">
//             {food.ingredients.map((ing) => (
//               <button
//                 disabled={isNovellus}
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

//         {/* Pizza a Metro — choose up to 4 pizzas (Farcita only) */}
//         {isFarcita && (
//           <div>
//             <Button
//               variant="ghost"
//               size="sm"
//               className="w-full border justify-between h-8 px-2 text-xs"
//               onClick={() => setShowPizzas(!showPizzas)}
//             >
//               Choose up to 4 Pizza{multiPizzas.size > 0 && ` (+${multiPizzas.size})`}
//               <ChevronDown
//                 className={`h-3.5 w-3.5 transition ${showPizzas ? "rotate-180" : ""}`}
//               />
//             </Button>

//             {showPizzas && (
//               <div className="flex flex-col gap-1 mt-1.5 max-h-48 overflow-y-auto">
//                 {foods?.filter(
//                     (pizza) =>
//                       pizza.name !== "Margherita" && pizza.name !== "Farcita"
//                   )
//                   .map((pizza) => {
//                     const isSelected = multiPizzas.has(pizza.name);
//                     return (
//                       <div
//                         key={pizza._id}
//                         className="flex justify-between items-center border rounded px-2 py-1"
//                       >
//                         <span className="text-xs">{pizza.name}</span>
//                         <Button
//                           size="icon"
//                           variant="outline"
//                           className="w-6 h-6 p-0"
//                           onClick={() => {
//                             setMultiPizzas((prev) => {
//                               const s = new Set(prev);
//                               if (s.has(pizza.name)) {
//                                 s.delete(pizza.name);
//                               } else if (s.size < 4) {
//                                 s.add(pizza.name);
//                               } else {
//                                 toast.error("You can select maximum 4 pizzas");
//                               }
//                               return s;
//                             });
//                           }}
//                         >
//                           {isSelected ? <Minus size={12} /> : <Plus size={12} />}
//                         </Button>
//                       </div>
//                     );
//                   })}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Pizza a Metro — slice selector */}
//         {isPizzaAMetro && (
//           <div className="flex flex-col gap-1">
//             <label className="text-xs font-medium">Select Slices</label>
//             <Select
//               value={pizzaSlices?.toString() || ""}
//               onValueChange={(val) => setPizzaSlices(Number(val))}
//             >
//               <SelectTrigger className="h-8 text-xs">
//                 <SelectValue placeholder="Choose slices" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="12">12 Slices</SelectItem>
//                 <SelectItem value="24">24 Slices</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         )}

//         {/* Extra ingredients */}
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
//               <ChevronDown
//                 className={`h-3.5 w-3.5 transition ${showExtras ? "rotate-180" : ""}`}
//               />
//             </Button>

//             {showExtras && (
//               <div className="flex flex-wrap gap-1 mt-1.5">
//                 {extraIngredients.map((ing) => {
//                   const isSelected = selectedExtras.has(ing.name);
//                   // Show correct price label per category
//                   const displayPrice = isPizzaAMetro ? 4 : ing.price || 0;
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
//                       {ing.name} +€{displayPrice.toFixed(2)}
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
//               onClick={decreaseQuantity}
//             >
//               <Minus size={14} />
//             </Button>
//             <span className="w-9 text-center font-medium">{quantity}</span>
//             <Button
//               size="icon"
//               variant="ghost"
//               className="h-8 w-8"
//               onClick={increaseQuantity}
//               disabled={quantity >= selectedVariant.totalStock || isOutOfStock}
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
//             disabled={isOutOfStock}
//           >
//             <ShoppingCart size={15} />
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

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
import { useGetAllFoodsQuery } from "@/redux/features/food/food.api";
import Image from "next/image";

interface Props {
  food: IFood;
}

export default function CompactFoodCard({ food }: Props) {
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllFoodsQuery({});
  const foods = data?.data;
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [removedDefaults, setRemovedDefaults] = useState<Set<string>>(new Set());
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
  const [allIngredients, setAllIngredients] = useState<IIngredient[]>([]);
  const [showExtras, setShowExtras] = useState(false);
  const [loadingIngredients, setLoadingIngredients] = useState(false);

  // Pizza a Metro specific state
  const [multiPizzas, setMultiPizzas] = useState<Set<string>>(new Set());
  const [pizzaSlices, setPizzaSlices] = useState<number | null>(null);
  const [showPizzas, setShowPizzas] = useState(false);

  const isPizzaAMetro = food.category?.title === "Pizza a Metro";
  const isNovellus = food.name === "NOVELLUS AG";
  const isFarcita = isPizzaAMetro && food.name === "Farcita";

  const selectedVariant = food.variants?.[selectedVariantIndex] ?? food.variants?.[0];
  const isOutOfStock = selectedVariant?.totalStock === 0;
  const basePrice = selectedVariant?.offerPrice ?? selectedVariant?.price ?? 0;

  // Fetch all ingredients once
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoadingIngredients(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/all-ingredients?limit=400`);
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

    if (isPizzaAMetro) return extras.length * 4;
    if (isNovellus)
      return extras.length > 4
        ? extras.slice(4).reduce((sum, i) => sum + i.price, 0)
        : 0;
    return extras.reduce((sum, i) => sum + i.price, 0);
  }, [selectedExtras, extraIngredients, isPizzaAMetro, isNovellus]);

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

  const increaseQuantity = () => {
    if (!selectedVariant) return;
    if (quantity < selectedVariant.totalStock) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.error("You cannot select more than available stock");
    }
  };

  const decreaseQuantity = () => setQuantity(Math.max(1, quantity - 1));

  useEffect(() => {
    if (quantity > selectedVariant.totalStock) setQuantity(1);
  }, [selectedVariantIndex, selectedVariant.totalStock]);

  const handleAdd = async () => {
    if (isOutOfStock) return;

    if (isPizzaAMetro && !pizzaSlices) {
      toast.error("Please select number of slices for Pizza a Metro");
      return;
    }

    const extras = Array.from(selectedExtras).map((name, index) => {
      const ing = extraIngredients.find((i) => i.name === name);

      let price = 0;
      if (isPizzaAMetro) {
        price = 4;
      } else if (isNovellus) {
        price = index < 4 ? 0 : ing?.price || 0;
      } else {
        price = ing?.price || 0;
      }

      return { _id: ing?._id || "", name, price };
    });

    await addToCart(
      {
        id: food._id,
        name: food.name,
        price: basePrice,
        image: food.image,
        selectedSize: selectedVariant?.size || "Normal",
        category: food.category._id,
        defaultIngredients:
          food.ingredients?.filter((i) => !removedDefaults.has(i.name)) || [],
        extraIngredients: extras,
        extrasTotal,
        selectedPizzas:
          multiPizzas.size > 0 ? Array.from(multiPizzas) : undefined,
        pizzaSlices: pizzaSlices ?? null,
      },
      quantity
    );

    setQuantity(1);
    setSelectedExtras(new Set());
    setRemovedDefaults(new Set());
    setSelectedVariantIndex(0);
    setMultiPizzas(new Set());
    setPizzaSlices(null);
    router.refresh();
    toast.success("Added to cart");
  };

  return (
    <Card className="border shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="flex gap-2">

          {/* ── Left: Food Image ── */}
          <div className="relative w-24 min-w-24 shrink-0 self-stretch">
            <Image
              src={food.image}
              alt={food.name}
              fill
              className="object-cover rounded-2xl ml-2"
              sizes="112px"
            />
            {/* Out of stock overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                <span className="bg-red-600 text-white text-[9px] font-semibold px-2 py-0.5 rounded-full text-center leading-tight">
                  Out of<br />Stock
                </span>
              </div>
            )}
          </div>

          {/* ── Right: All Content ── */}
          <div className="flex flex-col gap-2 p-2.5 text-sm flex-1 min-w-0">

            {/* Name + Variant / Price */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <h4 className="font-semibold leading-tight truncate">{food.name}</h4>

              {food.variants?.length > 1 ? (
                <Select
                  value={selectedVariantIndex.toString()}
                  onValueChange={(v) => setSelectedVariantIndex(Number(v))}
                >
                  <SelectTrigger className="w-max h-8 text-xs shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {food.variants.map((v, i) => (
                      <SelectItem key={i} value={i.toString()} className="text-xs">
                        {v.size}{" "}
                        <Euro size={10} className="inline" />
                        {(v.offerPrice ?? v.price).toFixed(2)}
                        {v.totalStock === 0 && (
                          <span className="text-red-500 ml-1">(Stock Out)</span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <span className="text-xs font-medium text-muted-foreground flex items-center gap-1 shrink-0">
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
                    disabled={isNovellus}
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

            {/* Pizza a Metro — choose up to 4 pizzas (Farcita only) */}
            {isFarcita && (
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full border justify-between h-8 px-2 text-xs"
                  onClick={() => setShowPizzas(!showPizzas)}
                >
                  Choose up to 4 Pizza{multiPizzas.size > 0 && ` (+${multiPizzas.size})`}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition ${showPizzas ? "rotate-180" : ""}`}
                  />
                </Button>

                {showPizzas && (
                  <div className="flex flex-col gap-1 mt-1.5 max-h-48 overflow-y-auto">
                    {foods
                      ?.filter(
                        (pizza) =>
                          pizza.name !== "Margherita" && pizza.name !== "Farcita"
                      )
                      .map((pizza) => {
                        const isSelected = multiPizzas.has(pizza.name);
                        return (
                          <div
                            key={pizza._id}
                            className="flex justify-between items-center border rounded px-2 py-1"
                          >
                            <span className="text-xs">{pizza.name}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="w-6 h-6 p-0"
                              onClick={() => {
                                setMultiPizzas((prev) => {
                                  const s = new Set(prev);
                                  if (s.has(pizza.name)) {
                                    s.delete(pizza.name);
                                  } else if (s.size < 4) {
                                    s.add(pizza.name);
                                  } else {
                                    toast.error("You can select maximum 4 pizzas");
                                  }
                                  return s;
                                });
                              }}
                            >
                              {isSelected ? <Minus size={12} /> : <Plus size={12} />}
                            </Button>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            )}

            {/* Pizza a Metro — slice selector */}
            {isPizzaAMetro && (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium">Select Slices</label>
                <Select
                  value={pizzaSlices?.toString() || ""}
                  onValueChange={(val) => setPizzaSlices(Number(val))}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Choose slices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 Slices</SelectItem>
                    <SelectItem value="24">24 Slices</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Extra ingredients */}
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
                    className={`h-3.5 w-3.5 transition ${showExtras ? "rotate-180" : ""}`}
                  />
                </Button>

                {showExtras && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {extraIngredients.map((ing) => {
                      const isSelected = selectedExtras.has(ing.name);
                      const displayPrice = isPizzaAMetro ? 4 : ing.price || 0;
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
                          {ing.name} +€{displayPrice.toFixed(2)}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Quantity + Total + Add */}
            <div className="flex items-center justify-between gap-2 mt-auto pt-1">
              <div className="flex items-center border rounded-full h-8 text-sm">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-4 w-4 md:h-8 md:w-8"
                  onClick={decreaseQuantity}
                >
                  <Minus size={14} />
                </Button>
                <span className="w-9 text-center font-medium">{quantity}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-4 w-4 md:h-8 md:w-8"
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

          </div>
        </div>
      </CardContent>
    </Card>
  );
}