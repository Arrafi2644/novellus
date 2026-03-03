
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { ICategory, IFood } from "@/types";

// interface CategoryNavbarProps {
//   categories: ICategory[];
//   foods: IFood[];
//   searchTerm: string;
// }

// export default function CategoryNavbar({
//   categories,
// }: CategoryNavbarProps) {
//   const [activeCategory, setActiveCategory] = useState("");
//   const [showScrollBtn, setShowScrollBtn] = useState(false);

//   const scrollRef = useRef<HTMLDivElement | null>(null);

//   const checkOverflow = () => {
//     if (!scrollRef.current) return;
//     setShowScrollBtn(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
//   };

//   useEffect(() => {
//     checkOverflow();
//     window.addEventListener("resize", checkOverflow);
//     return () => window.removeEventListener("resize", checkOverflow);
//   }, [categories]);

//   const scrollContainer = (dir: "left" | "right") => {
//     scrollRef.current?.scrollBy({
//       left: dir === "left" ? -200 : 200,
//       behavior: "smooth",
//     });
//   };

//   const handleCategoryClick = (cat: ICategory) => {
//     setActiveCategory(cat.title);
//     const element = document.getElementById(cat._id);
//     if (element) {
//       const navbarOffset = window.innerWidth >= 1024 ? 180 : 260;
//       const y = element.getBoundingClientRect().top + window.scrollY - navbarOffset;
//       window.scrollTo({ top: y, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 md:px-6 lg:px-8 sticky top-40 lg:top-24 z-30 bg-white">
//       <div className="py-4 flex flex-col lg:flex-row lg:items-center gap-3">

//         {/* Category Bar */}
//         <div className="flex items-center gap-2 flex-1">
//           {showScrollBtn && (
//             <Button
//               size="icon"
//               variant="ghost"
//               onClick={() => scrollContainer("left")}
//               className="shrink-0 border rounded-full bg-gray-50"
//             >
//               <ChevronLeft />
//             </Button>
//           )}

//           <div ref={scrollRef} className="flex gap-2 flex-1 overflow-x-auto scrollbar-hide">
//             {categories?.map((cat) => (
//               <Button
//                 key={cat._id}
//                 variant="ghost"
//                 onClick={() => handleCategoryClick(cat)}
//                 className={`shrink-0 whitespace-nowrap ${
//                   activeCategory === cat.title
//                     ? "text-pink-600 border-b-2 border-pink-600 rounded-none"
//                     : "text-gray-600"
//                 }`}
//               >
//                 {cat.title}
//               </Button>
//             ))}
//           </div>

//           {showScrollBtn && (
//             <Button
//               size="icon"
//               variant="ghost"
//               onClick={() => scrollContainer("right")}
//               className="shrink-0 border rounded-full bg-gray-50"
//             >
//               <ChevronRight />
//             </Button>
//           )}
//         </div>

//       </div>

//       <style jsx>{`
//         .scrollbar-hide {
//           scrollbar-width: none;
//           -ms-overflow-style: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// }


"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ICategory } from "@/types";

interface CategoryNavbarProps {
  categories: ICategory[];
  onCategoryClick: (ids: string[]) => void;
}

export default function CategoryNavbar({
  categories,
  onCategoryClick,
}: CategoryNavbarProps) {
  const [active, setActive] = useState("");
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ✅ STATIC NAV STRUCTURE
  const NAV_STRUCTURE = [
    { label: "Pizze", children: ["Pizze"] },
    { label: "Pizza a Metro", children: ["Pizza a Metro"] },
    {
      label: "Panini",
      children: ["Panini Fastfood", "Panini Pizza", "Panini Novita"],
    },
    { label: "Primi Piatti", children: ["Primi Piatti"] },
    { label: "Secondi Piatti", children: ["Secondi Piatti"] },
    { label: "Secondi di pesce", children: ["Secondi di pesce"] },
    { label: "Fritti", children: ["Fritti"] },
    {
      label: "Insalate",
      children: ["Insalate", "Insalte Plus"],
    },
    { label: "Contorni", children: ["Contorni"] },
    { label: "Dolci", children: ["Dolci"] },
    {
      label: "Bibite",
      children: ["Bibite", "Birre", "Vini"],
    },
  ];

  const structuredCategories = useMemo(() => {
    return NAV_STRUCTURE.map((item) => {
      const matched = categories.filter((cat) =>
        item.children.includes(cat.title)
      );

      return {
        label: item.label,
        ids: matched.map((m) => m._id),
      };
    }).filter((item) => item.ids.length > 0);
  }, [categories]);

  const handleClick = (item: any) => {
    if (!item.ids.length) return;

    setActive(item.label);
    onCategoryClick(item.ids);

    const firstElement = document.getElementById(item.ids[0]);
    if (firstElement) {
      const offset = window.innerWidth >= 1024 ? 180 : 260;
      const y =
        firstElement.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const checkOverflow = () => {
    if (!scrollRef.current) return;
    setShowScrollBtn(
      scrollRef.current.scrollWidth >
        scrollRef.current.clientWidth
    );
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () =>
      window.removeEventListener("resize", checkOverflow);
  }, [structuredCategories]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 sticky top-40 lg:top-24 z-30 bg-white">
      <div className="py-6 flex items-center gap-2">
        {showScrollBtn && (
          <Button size="icon" className="border border-pink-500 bg-pink-50 hover:bg-pink-100 hover:text-pink-500" variant="ghost" onClick={() => scroll("left")}>
            <ChevronLeft />
          </Button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-2 flex-1 overflow-x-auto scrollbar-hide"
        >
          {structuredCategories.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              onClick={() => handleClick(item)}
              className={`whitespace-nowrap border border-pink-500 bg-pink-50 ${
                active === item.label
                  ? "text-pink-600 border border-b-2 border-pink-600 bg-pink-100"
                  : "text-gray-600"
              }`}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {showScrollBtn && (
          <Button size="icon" className="border border-pink-500 bg-pink-50 hover:bg-pink-100 hover:text-pink-500" variant="ghost" onClick={() => scroll("right")}>
            <ChevronRight />
          </Button>
        )}
      </div>
    </div>
  );
}