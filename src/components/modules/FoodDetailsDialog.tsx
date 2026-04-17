
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Plus, Minus, X, Euro, ChevronDown, ChevronsUpDown, Check } from "lucide-react";
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
import { useFood } from "@/context/FoodContext";

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
  const [multiPizzas, setMultiPizzas] = useState<Set<string>>(new Set());
  const [pizzaSlices, setPizzaSlices] = useState<number | null>(null);
  const { foods, setSearchTerm } = useFood();
  const [showPizzas, setShowPizzas] = useState(false);

  console.log("Foods ", foods)


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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/all-ingredients?limit=400`);
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

    if (food?.category?.title === "Pizza a Metro") return extras.length * 4;

    if (food?.name === "NOVELLUS AG")
      return extras.length > 4 ? extras.slice(4).reduce((sum, i) => sum + i.price, 0) : 0;

    return extras.reduce((sum, i) => sum + i.price, 0);
  }, [selectedExtras, extraIngredients, food.category?.title, food.name]);
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

    if (food.category?.title === "Pizza a Metro" && !pizzaSlices) {
      toast.error("Please select number of slices for Pizza a Metro");
      return;
    }


    const extras = Array.from(selectedExtras).map((name, index) => {
      const ing = extraIngredients.find((i) => i.name === name);

      let price = 0;

      if (food.category?.title === "Pizza a Metro") {
        price = 4;
      } else if (food.name === "NOVELLUS AG") {
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
        image: food.image,
        price: effectivePrice,
        category: food.category._id,
        selectedSize: selectedVariant?.size || "Normal",
        defaultIngredients: food.ingredients?.filter((i) => !removedDefaults.has(i.name)) || [],
        extraIngredients: extras,
        extrasTotal,

        // ✅ just pass if exists
        selectedPizzas:
          multiPizzas.size > 0
            ? Array.from(multiPizzas)
            : undefined,

        pizzaSlices: pizzaSlices ?? null,
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
            <DialogTitle className="text-2xl">{food?.name}</DialogTitle>
            <DialogDescription>{food.description}</DialogDescription>
          </DialogHeader>

          <Separator />

          <div className="flex items-center justify-between gap-4">
            {/* Size Selection */}
            <div className="flex flex-col gap-2 text-sm">
              <label className="font-medium">Select Size</label>
              <Select

                value={selectedVariantIndex.toString()}
                onValueChange={(val) => setSelectedVariantIndex(Number(val))}
              >
                <SelectTrigger className="min-h-0 !h-6">
                  <SelectValue placeholder="Choose size" />
                </SelectTrigger>
                <SelectContent className="text-sm">
                  {food.variants.map((variant, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {variant.size} - €{variant?.offerPrice?.toFixed(2) || variant.price.toFixed(2)}
                      {variant?.offerPrice !== undefined && variant?.offerPrice < variant.price && (
                        <span className="text-sm text-gray-500 line-through ">
                          €{variant.price.toFixed(2)}
                        </span>
                      )}
                      {variant.totalStock === 0 && (
                        <span className="text-red-500 ml-2">(Stock Out)</span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <p className="text-2xl font-bold flex items-center gap-1">
              <Euro /> {unitTotal.toFixed(2)}
            </p>
          </div>
          {/* Default Ingredients */}
          {food.ingredients && food.ingredients.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {food.ingredients.map((ing) => (
                <button
                  disabled={food?.name === "NOVELLUS AG"}

                  key={ing.name}
                  onClick={() => toggleDefault(ing.name)}
                  className={`px-2 py-1 text-xs rounded-full border transition-colors ${removedDefaults.has(ing.name)
                    ? "bg-red-50 border-red-300 text-red-700 line-through"
                    : "bg-gray-100 border-gray-300"
                    }`}
                >
                  {ing.name}
                </button>
              ))}
            </div>
          )}


          <div className="flex justify-between gap-2 flex-wrap">

            {food.category?.title === "Pizza a Metro" && food.name === "Farcita" && (
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full border justify-between h-8 px-2 text-sm"
                  onClick={() => setShowPizzas(!showPizzas)}
                >
                  Choose up to 4 Pizza{" "}
                  {multiPizzas.size > 0 && `(+${multiPizzas.size})`}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition ${showPizzas ? "rotate-180" : ""
                      }`}
                  />
                </Button>

                {showPizzas && (
                  <div className="flex flex-col gap-1 mt-1.5 max-h-60 overflow-y-auto">
                    {foods.filter((pizza) => pizza.name !== "Margherita" && pizza.name !== "Farcita").map((pizza) => {
                      const isSelected = multiPizzas.has(pizza.name);

                      return (
                        <div
                          key={pizza._id}
                          className="flex justify-between items-center border rounded px-2 py-1"
                        >
                          <span className="text-sm">{pizza.name}</span>

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
                                  toast.error(
                                    "You can select maximum 4 pizzas"
                                  );
                                }

                                return s;
                              });
                            }}
                          >
                            {isSelected ? (
                              <Minus size={12} />
                            ) : (
                              <Plus size={12} />
                            )}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}


            {food.category?.title === "Pizza a Metro" && (
              <div className=" mt-2 flex flex-col gap-2 text-sm">
                <label className="font-medium">Select Slices</label>
                <Select
                  value={pizzaSlices?.toString() || ""}
                  onValueChange={(val) => setPizzaSlices(Number(val))}
                >
                  <SelectTrigger className="!h-6 px-3 text-sm">
                    <SelectValue placeholder="Choose slices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 Slices</SelectItem>
                    <SelectItem value="24">24 Slices</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {extraIngredients.length > 0 && (
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full border justify-between h-8 px-2 text-sm"
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
                      food.category.title === "Pizza a Metro" ? 4 : ing.price || 0;

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
              size="sm"
              className="w-full py-6"
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
