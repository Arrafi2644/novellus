// "use client";


// import { SearchForm } from "@/components/shared/search-form";
// import Sort from "@/components/shared/Sort";
// import CategoryFilter from "../category/CategoryFilter";
// import CartBadge from "@/components/modules/CartBadge";
// import { Button } from "@/components/ui/button";

// type PosToolbarProps = {
//     onSearchChange?: (value: string) => void;
//     onSortChange?: (value: string) => void;
//     onFilterChange?: (value: string) => void;
// };

// export default function PosToolbar({ onSearchChange, onSortChange, onFilterChange }: PosToolbarProps) {

//     return (
//         <div className="flex items-center justify-between gap-2 w-full py-4 my-0 bg-white sticky top-0 z-10 border-b">
//             <div className="flex items-center gap-4">

//                 {/* Search */}
//                 <SearchForm onSearchChange={onSearchChange} />

//                 <CategoryFilter onChange={onFilterChange} />
//                 {/* Sort */}
//                 <Sort onChange={onSortChange} />
//                 <Button className="justify-self-end"><CartBadge /></Button>
//             </div>
//         </div>
//     );
// }



"use client";
import { SearchForm } from "@/components/shared/search-form";
import Sort from "@/components/shared/Sort";
import CategoryFilter from "../category/CategoryFilter";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { getCart } from "@/utils/cart-helper";
import PosCartSheet from "./PosCartSheet";

type PosToolbarProps = {
  onSearchChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
  onFilterChange?: (value: string) => void;
};

export default function PosToolbar({
  onSearchChange,
  onSortChange,
  onFilterChange,
}: PosToolbarProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const cart = getCart();
      setCartCount(cart.length);
    };
    updateCount();
    window.addEventListener("cart-updated", updateCount);
    return () => window.removeEventListener("cart-updated", updateCount);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between gap-2 w-full py-4 my-0 bg-white sticky top-0 z-10 border-b">
        <div className="flex items-center gap-4 flex-1">
          <SearchForm onSearchChange={onSearchChange} />
          <CategoryFilter onChange={onFilterChange} />
          {/* <Sort onChange={onSortChange} /> */}
           <div className="hidden md:block">
                  <Sort onChange={onSortChange} />
                  </div>
        </div>

        {/* Mobile-only cart button */}
        <Button
          variant="outline"
          className="lg:hidden relative flex items-center gap-2"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart size={18} />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-pink-600 text-white text-xs rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </div>

      <PosCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}