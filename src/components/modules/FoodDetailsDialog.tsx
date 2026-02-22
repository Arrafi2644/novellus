
// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import Image from "next/image";
// import { Plus, Minus, X, Euro, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { Separator } from "@/components/ui/separator";
// import { IFood, IIngredient } from "@/types";
// import { addToCart } from "@/utils/cart-helper";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface Props {
//   food: IFood;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export default function FoodDetailsDialog({ food, open, onOpenChange }: Props) {
//   const router = useRouter();

//   const [quantity, setQuantity] = useState(1);
//   const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
//   const [removedDefaults, setRemovedDefaults] = useState<Set<string>>(new Set());
//   const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
//   const [showExtras, setShowExtras] = useState(false);
//   const [allIngredients, setAllIngredients] = useState<IIngredient[]>([]);
//   const [loadingIngredients, setLoadingIngredients] = useState(false);

//   console.log("Food in details modal", food)

//   // Fetch all ingredients
//   useEffect(() => {
//     if (!open) return;
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
//   }, [open]);

//   // Filter extra ingredients
//   const extraIngredients = useMemo(() => {
//     const defaultNames = new Set(food?.ingredients?.map((i) => i.name) || []);
//     return allIngredients.filter((ing) => !defaultNames.has(ing.name));
//   }, [allIngredients, food?.ingredients]);

//   // Selected variant
//   const selectedVariant = food.variants[selectedVariantIndex] || food.variants[0];

//   // 🔥 Offer price logic
//   const effectivePrice = selectedVariant?.offerPrice !== undefined
//     ? selectedVariant.offerPrice
//     : selectedVariant?.price || 0;

//   // Toggle default removal
//   const toggleDefault = (name: string) => {
//     setRemovedDefaults((prev) => {
//       const set = new Set(prev);
//       set.has(name) ? set.delete(name) : set.add(name);
//       return set;
//     });
//   };

//   // Toggle extra ingredient
//   const toggleExtra = (name: string) => {
//     setSelectedExtras((prev) => {
//       const set = new Set(prev);
//       set.has(name) ? set.delete(name) : set.add(name);
//       return set;
//     });
//   };

//   // Calculate extras total
//   // const calculateExtrasTotal = () => {
//   //   const count = selectedExtras.size;
//   //   if (food.category === "Metro") {
//   //     return count > 4 ? (count - 4) * 4 : 0;
//   //   }
//   //   if (food.category === "Novellus") {
//   //     if (count <= 4) return 0;
//   //     return Array.from(selectedExtras)
//   //       .slice(4)
//   //       .reduce((sum, name) => {
//   //         const ing = extraIngredients.find((i) => i.name === name);
//   //         return sum + (ing?.price || 0);
//   //       }, 0);
//   //   }
//   //   return Array.from(selectedExtras).reduce((sum, name) => {
//   //     const ing = extraIngredients.find((i) => i.name === name);
//   //     return sum + (ing?.price || 0);
//   //   }, 0);
//   // };

//   const calculateExtrasTotal = () => {
//   const extras = Array.from(selectedExtras).map((name) =>
//     extraIngredients.find((i) => i.name === name)
//   ).filter(Boolean) as IIngredient[];

// console.log(extras)

//   // 🔴 METRO → fixed €4 per extra ingredient
//   if (food.category.title === "Metro") {
//     return extras.length * 4;
//   }

//   if (food.category.title === "Novellus") {
//     if (extras.length <= 4) return 0;

//     return extras
//       .slice(4)
//       .reduce((sum, ing) => sum + ing.price, 0);
//   }

//   return extras.reduce((sum, ing) => sum + ing.price, 0);
// };


//   const extrasTotal = calculateExtrasTotal();
//   const unitTotal = effectivePrice + extrasTotal;
//   const grandTotal = unitTotal * quantity;

//   // Add to cart
//   const handleAddToCart = async () => {
//     const extraIngredientsWithId = Array.from(selectedExtras).map((name) => {
//       const ing = extraIngredients.find((i) => i.name === name);
//       return {
//         _id: ing?._id || "",
//         name,
//         price: ing?.price || 0,
//       };
//     });

//     await addToCart(
//       {
//         id: food._id,
//         name: food.name,
//         image: food.image,
//         price: effectivePrice,               
//         category: food.category._id,
//         selectedSize: selectedVariant?.size || "Normal",
//         defaultIngredients: food?.ingredients?.filter((i) => !removedDefaults.has(i.name)) || [],
//         extraIngredients: extraIngredientsWithId,
//         extrasTotal,
//       },
//       quantity
//     );

//     router.refresh();
//     toast.success("Added to cart");
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-125 max-h-[90vh] overflow-y-auto p-0">
//         <DialogClose asChild>
//           <Button variant="ghost" size="icon" className="absolute right-4 top-4 z-10">
//             <X />
//           </Button>
//         </DialogClose>

//         <div className="relative h-64 w-full">
//           <Image src={food.image} alt={food.name} fill className="object-cover" />
//         </div>

//         <div className="p-6 space-y-6">
//           <DialogHeader>
//             <DialogTitle className="text-2xl">{food.name}</DialogTitle>
//             <DialogDescription>{food.description}</DialogDescription>
//           </DialogHeader>

//           <Separator />

//           {/* Size Selection */}
//           <div className="space-y-2">
//             <label className="font-medium">Select Size</label>
//             <Select
//               value={selectedVariantIndex.toString()}
//               onValueChange={(val) => setSelectedVariantIndex(Number(val))}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Choose size" />
//               </SelectTrigger>
//               <SelectContent>
//                 {food.variants.map((variant, index) => (
//                   <SelectItem key={index} value={index.toString()}>
//                     {variant.size} - {variant.price.toFixed(2)}
//                     {variant.offerPrice !== undefined && (
//                       <span className="text-sm text-green-600 ml-2">
//                         ({variant.offerPrice.toFixed(2)})
//                       </span>
//                     )}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Price Display */}
//           <p className="text-3xl font-bold flex items-center gap-1">
//             <Euro /> {unitTotal.toFixed(2)}
//             {selectedVariant?.offerPrice !== undefined && (
//               <span className="text-base text-muted-foreground line-through ml-3">
//                 {selectedVariant.price.toFixed(2)}
//               </span>
//             )}
//           </p>

//           {/* Default Ingredients */}
//           {food.ingredients && food.ingredients.length > 0 && (
//             <div className="space-y-2">
//               <p className="font-medium">Ingredients</p>
//               {food.ingredients.map((ing) => (
//                 <div key={ing.name} className="flex justify-between items-center">
//                   <span
//                     className={
//                       removedDefaults.has(ing.name) ? "line-through text-muted-foreground" : ""
//                     }
//                   >
//                     {ing.name}
//                   </span>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     className={food.category.title === "Novellus" ? "hidden" : ""}
//                     onClick={() => toggleDefault(ing.name)}
//                   >
//                     {removedDefaults.has(ing.name) ? "Add" : "Remove"}
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Extra Ingredients Toggle */}
//           {extraIngredients.length > 0 && (
//             <Button
//               variant="outline"
//               className="w-full flex justify-between"
//               onClick={() => setShowExtras(!showExtras)}
//               disabled={loadingIngredients}
//             >
//               Extra Ingredients
//               <ChevronDown className={`transition ${showExtras ? "rotate-180" : ""}`} />
//             </Button>
//           )}

//           {/* Extra Ingredients List */}
//           {showExtras && (
//             <div className="space-y-2">
//               {extraIngredients.map((ing) => {
//                 const selected = selectedExtras.has(ing.name);
//                 return (
//                   <div
//                     key={ing._id}
//                     className="flex justify-between items-center bg-gray-50 p-2 rounded"
//                   >
//                     <div className="flex items-center gap-2">
//                   {ing.name} - <span className="flex items-center gap-0.5 text-sm text-green-600">
//                       <Euro size={12} />
//                       {food.category.title === "Metro"? (ing.price + 1.5 ).toFixed(2) : ing.price.toFixed(2)}</span>
                      
//                     </div>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => toggleExtra(ing.name)}
//                     >
//                       {selected ? <Minus /> : <Plus />}
//                     </Button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* Quantity & Grand Total */}
//           <div className="flex justify-between items-center">
//             <div className="flex items-center border rounded-full">
//               <Button
//                 size="icon"
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//               >
//                 <Minus />
//               </Button>
//               <span className="px-6 text-lg font-medium">{quantity}</span>
//               <Button size="icon" onClick={() => setQuantity(quantity + 1)}>
//                 <Plus />
//               </Button>
//             </div>

//             <p className="text-2xl font-bold flex items-center gap-1">
//               <Euro /> {grandTotal.toFixed(2)}
//             </p>
//           </div>

//           <DialogFooter>
//             <Button className="w-full py-6 text-lg" onClick={handleAddToCart}>
//               Add to Cart
//             </Button>
//           </DialogFooter>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }



// --------------------------------------------------------------------------

// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import Image from "next/image";
// import { Plus, Minus, X, Euro, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { Separator } from "@/components/ui/separator";
// import { IFood, IIngredient } from "@/types";
// import { addToCart } from "@/utils/cart-helper";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface Props {
//   food: IFood;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export default function FoodDetailsDialog({ food, open, onOpenChange }: Props) {
//   const router = useRouter();

//   const [quantity, setQuantity] = useState(1);
//   const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
//   const [removedDefaults, setRemovedDefaults] = useState<Set<string>>(new Set());
//   const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
//   const [showExtras, setShowExtras] = useState(false);
//   const [allIngredients, setAllIngredients] = useState<IIngredient[]>([]);

//   const selectedVariant =
//     food.variants[selectedVariantIndex] || food.variants[0];

//   const isOutOfStock = selectedVariant?.totalStock === 0;

//   const effectivePrice =
//     selectedVariant?.offerPrice !== undefined
//       ? selectedVariant.offerPrice
//       : selectedVariant?.price || 0;

//   // Prevent quantity overflow
//   // const increaseQuantity = () => {
//   //   if (quantity < selectedVariant.totalStock) {
//   //     setQuantity(quantity + 1);
//   //   }
//   // };

//   const increaseQuantity = () => {
//   if (!selectedVariant) return;

//   if (quantity < selectedVariant.totalStock) {
//     setQuantity((prev) => prev + 1);
//   } else {
//     toast.error("You cannot select more than available stock");
//   }
// };


//   const decreaseQuantity = () => {
//     setQuantity(Math.max(1, quantity - 1));
//   };

//   // Reset quantity if variant changes and stock কম
//   useEffect(() => {
//     if (quantity > selectedVariant.totalStock) {
//       setQuantity(1);
//     }
//   }, [selectedVariantIndex]);

//   // Fetch ingredients
//   useEffect(() => {
//     if (!open) return;
//     const fetchIngredients = async () => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/ingredient/all-ingredients`
//       );
//       const data = await res.json();
//       setAllIngredients(data.data || []);
//     };
//     fetchIngredients();
//   }, [open]);

//   const extraIngredients = useMemo(() => {
//     const defaultNames = new Set(food?.ingredients?.map((i) => i.name) || []);
//     return allIngredients.filter((ing) => !defaultNames.has(ing.name));
//   }, [allIngredients, food?.ingredients]);

//   const calculateExtrasTotal = () => {
//     const extras = Array.from(selectedExtras)
//       .map((name) => extraIngredients.find((i) => i.name === name))
//       .filter(Boolean) as IIngredient[];

//     return extras.reduce((sum, ing) => sum + ing.price, 0);
//   };

//   const extrasTotal = calculateExtrasTotal();
//   const unitTotal = effectivePrice + extrasTotal;
//   const grandTotal = unitTotal * quantity;

//   const handleAddToCart = async () => {
//     if (isOutOfStock) return;

//     await addToCart(
//       {
//         id: food._id,
//         name: food.name,
//         image: food.image,
//         price: effectivePrice,
//         category: food.category._id,
//         selectedSize: selectedVariant?.size || "Normal",
//         defaultIngredients:
//           food?.ingredients?.filter((i) => !removedDefaults.has(i.name)) || [],
//         extraIngredients: [],
//         extrasTotal,
//       },
//       quantity
//     );

//     router.refresh();
//     toast.success("Added to cart");
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-125 max-h-[90vh] overflow-y-auto p-0">
//         <DialogClose asChild>
//           <Button
//             size="icon"
//             className="absolute right-4 top-4 z-10"
//           >
//             <X />
//           </Button>
//         </DialogClose>

//         <div className="relative h-64 w-full">
//           <Image src={food.image} alt={food.name} fill className="object-cover" />
//         </div>

//         <div className="p-6 space-y-6">
//           <DialogHeader>
//             <DialogTitle className="text-2xl">{food.name}</DialogTitle>
//             <DialogDescription>{food.description}</DialogDescription>
//           </DialogHeader>

//           <Separator />

//           {/* Size Selection */}
//           <div className="space-y-2">
//             <label className="font-medium">Select Size</label>
//             <Select
//               value={selectedVariantIndex.toString()}
//               onValueChange={(val) => setSelectedVariantIndex(Number(val))}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Choose size" />
//               </SelectTrigger>
//               <SelectContent>
//                 {food.variants.map((variant, index) => (
//                   <SelectItem key={index} value={index.toString()}>
//                     {variant.size} - €{variant.price.toFixed(2)}
//                     {variant.totalStock === 0 && (
//                       <span className="text-red-500 ml-2">
//                         (Out of Stock)
//                       </span>
//                     )}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Price */}
//           <p className="text-3xl font-bold flex items-center gap-1">
//             <Euro /> {unitTotal.toFixed(2)}
//           </p>

//           {/* Quantity */}
//           <div className="flex justify-between items-center">
//             <div className="flex items-center border rounded-full">
//               <Button size="icon" onClick={decreaseQuantity}>
//                 <Minus />
//               </Button>
//               <span className="px-6 text-lg font-medium">{quantity}</span>
//               <Button
//                 size="icon"
//                 onClick={increaseQuantity}
//                 disabled={quantity >= selectedVariant.totalStock}
//               >
//                 <Plus />
//               </Button>
//             </div>

//             <p className="text-2xl font-bold flex items-center gap-1">
//               <Euro /> {grandTotal.toFixed(2)}
//             </p>
//           </div>

//           {/* Add To Cart */}
//           <DialogFooter>
//             <Button
//               className="w-full py-6 text-lg"
//               onClick={handleAddToCart}
//               disabled={isOutOfStock}
//             >
//               {isOutOfStock ? "Stock Out" : "Add to Cart"}
//             </Button>
//           </DialogFooter>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }


"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Plus, Minus, X, Euro, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { IFood, IIngredient } from "@/types";
import { addToCart } from "@/utils/cart-helper";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  food: IFood;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FoodDetailsDialog({ food, open, onOpenChange }: Props) {
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [removedDefaults, setRemovedDefaults] = useState<Set<string>>(new Set());
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
  const [allIngredients, setAllIngredients] = useState<IIngredient[]>([]);
  const [showExtras, setShowExtras] = useState(false);

  const selectedVariant =
    food.variants[selectedVariantIndex] || food.variants[0];

  const isOutOfStock = selectedVariant?.totalStock === 0;
  const effectivePrice =
    selectedVariant?.offerPrice !== undefined
      ? selectedVariant.offerPrice
      : selectedVariant?.price || 0;

  // Quantity handlers
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

  // Fetch ingredients when dialog opens
  useEffect(() => {
    if (!open) return;
    const fetchIngredients = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/all-ingredients`);
        const data = await res.json();
        setAllIngredients(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchIngredients();
  }, [open]);

  // Extras
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

  const unitTotal = effectivePrice + extrasTotal;
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

  const handleAddToCart = async () => {
    if (isOutOfStock) return;

    const extras = Array.from(selectedExtras).map((name) => {
      const ing = extraIngredients.find((i) => i.name === name);
      return { _id: ing?._id || "", name, price: ing?.price || 0 };
    });

    await addToCart(
      {
        id: food._id,
        name: food.name,
        image: food.image,
        price: effectivePrice,
        category: food.category._id,
        selectedSize: selectedVariant?.size || "Normal",
        defaultIngredients: food.ingredients?.filter((i) => !removedDefaults.has(i.name)) || [],
        extraIngredients: extras,
        extrasTotal,
      },
      quantity
    );

    router.refresh();
    toast.success("Added to cart");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125 max-h-[90vh] overflow-y-auto p-0">
        <DialogClose asChild>
          <Button size="icon" className="absolute right-4 top-4 z-10">
            <X />
          </Button>
        </DialogClose>

        <div className="relative h-64 w-full">
          <Image src={food.image} alt={food.name} fill className="object-cover" />
        </div>

        <div className="p-6 space-y-6">
          <DialogHeader>
            <DialogTitle className="text-2xl">{food.name}</DialogTitle>
            <DialogDescription>{food.description}</DialogDescription>
          </DialogHeader>

          <Separator />

          {/* Size Selection */}
          <div className="space-y-2">
            <label className="font-medium">Select Size</label>
            <Select
              value={selectedVariantIndex.toString()}
              onValueChange={(val) => setSelectedVariantIndex(Number(val))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose size" />
              </SelectTrigger>
              <SelectContent>
                {food.variants.map((variant, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {variant.size} - €{variant.price.toFixed(2)}
                    {variant.totalStock === 0 && (
                      <span className="text-red-500 ml-2">(Out of Stock)</span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold flex items-center gap-1">
            <Euro /> {unitTotal.toFixed(2)}
          </p>

          {/* Default Ingredients */}
          {food.ingredients && food.ingredients.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {food.ingredients.map((ing) => (
                <button
                disabled={food.category.title === "Novellus"}
                  key={ing.name}
                  onClick={() => toggleDefault(ing.name)}
                  className={`px-2 py-1 text-xs rounded-full border transition-colors ${
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

          {/* Extras */}
          {/* {extraIngredients.length > 0 && (
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between h-8 px-2 text-xs"
                onClick={() => setShowExtras(!showExtras)}
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
                    return (
                      <button
                        key={ing._id}
                        onClick={() => toggleExtra(ing.name)}
                        className={`px-2 py-1 text-sm rounded-full border ${
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
          )} */}

{extraIngredients.length > 0 && (
  <div className="space-y-2">
    <Button
      variant="ghost"
      size="sm"
      className="w-full justify-between h-8 px-2 text-xs"
      onClick={() => setShowExtras(!showExtras)}
    >
      Extra Ingredients {selectedExtras.size > 0 && `(+${selectedExtras.size})`}
      <ChevronDown
        className={`h-3.5 w-3.5 transition ${showExtras ? "rotate-180" : ""}`}
      />
    </Button>

    {showExtras && (
      <div className="flex flex-col gap-1 mt-1.5 max-h-60 overflow-y-auto">
        {extraIngredients.map((ing) => {
          const isSelected = selectedExtras.has(ing.name);
          const price =
            food.category.title === "Metro" ? 4 : ing.price || 0;

          return (
            <div
              key={ing._id}
              className="flex justify-between items-center border rounded px-2 py-1"
            >
              <span className="text-sm">{ing.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  +€{price.toFixed(2)}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  className="w-6 h-6 p-0"
                  onClick={() => toggleExtra(ing.name)}
                >
                  {isSelected ? <Minus size={12} /> : <Plus size={12} />}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
)}



          {/* Quantity + Total */}
          <div className="flex justify-between items-center">
            <div className="flex items-center border rounded-full">
              <Button size="icon" onClick={decreaseQuantity}>
                <Minus />
              </Button>
              <span className="px-6 text-lg font-medium">{quantity}</span>
              <Button size="icon" onClick={increaseQuantity} disabled={quantity >= selectedVariant.totalStock}>
                <Plus />
              </Button>
            </div>

            <p className="text-2xl font-bold flex items-center gap-1">
              <Euro /> {grandTotal.toFixed(2)}
            </p>
          </div>

          {/* Add To Cart */}
          <DialogFooter>
            <Button
              className="w-full py-6 text-lg"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? "Stock Out" : "Add to Cart"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
