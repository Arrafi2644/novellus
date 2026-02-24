
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
