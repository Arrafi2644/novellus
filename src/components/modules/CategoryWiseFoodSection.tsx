
// import React from "react";
// import CategoryAccordion from "./CategoryAccordion"; // Import your accordion component
// import { ICategory, IFood } from "@/types";

// type Props = {
//   categories: ICategory[];
//   foods: IFood[];
//   searchTerm: string;
// };

// export default function CategoryWiseFoodSection({
//   categories,
//   foods,
//   searchTerm,
// }: Props) {
//   // Search filter for all foods
//   const filteredFoods = React.useMemo(() => {
//     if (!searchTerm.trim()) return foods;

//     const lowerTerm = searchTerm.toLowerCase();
//     return foods.filter(
//       (food) =>
//         food.name.toLowerCase().includes(lowerTerm) ||
//         food.description?.toLowerCase().includes(lowerTerm) ||
//         (typeof food?.category?.title === "string" &&
//           food?.category?.title.toLowerCase().includes(lowerTerm)),
//     );
//   }, [foods, searchTerm]);

//   // Popular foods (calculated from filteredFoods)
//   // const popularFoods = React.useMemo(() => {
//   //   return [...filteredFoods]
//   //     .sort((a, b) => (b.totalSell ?? 0) - (a.totalSell ?? 0))
//   //     .slice(0, 6);
//   // }, [filteredFoods]);

//   return (
//     <div className="space-y-8">
//       {categories.map((category) => {
//         // Get foods for this category
//         const categoryFoods = filteredFoods.filter((food) =>
//                 typeof food.category === "object"
//                   ? food.category?._id === category._id
//                   : food.category === category._id,
//               );

//         // Only render if there are foods (hide empty categories)
//         if (categoryFoods.length === 0) return null;

//         return (
//           <div key={category._id} id={category._id}>
//             <CategoryAccordion category={category} foods={categoryFoods} />
//           </div>
//         );
//       })}
//     </div>
//   );
// }


// -----------------------------------------


"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import FoodCard from "./FoodCard";
import { ICategory, IFood } from "@/types";
import Image from "next/image";

type Props = {
  categories: ICategory[];
  foods: IFood[];
  searchTerm: string;
  openIds: string[];              // shared state from parent
  setOpenIds: (ids: string[]) => void;
};

export default function CategoryWiseFoodSection({
  categories,
  foods,
  searchTerm,
  openIds,
  setOpenIds,
}: Props) {

  const filteredFoods = React.useMemo(() => {
    if (!searchTerm.trim()) return foods;

    const lower = searchTerm.toLowerCase();
    return foods.filter(
      (food) =>
        food.name.toLowerCase().includes(lower) ||
        food.description?.toLowerCase().includes(lower)
    );
  }, [foods, searchTerm]);

  const searchOpenIds = React.useMemo(() => {
    if (!searchTerm.trim()) return [];

    const ids = filteredFoods.map((f) =>
      typeof f.category === "object"
        ? f.category?._id
        : f.category
    );

    return [...new Set(ids)];
  }, [filteredFoods, searchTerm]);

  // const finalOpenIds = searchTerm.trim().length > 0 ? searchOpenIds : openIds;
  React.useEffect(() => {
  if (searchTerm.trim().length > 0) {
    setOpenIds(searchOpenIds);
  }
}, [searchTerm, searchOpenIds, setOpenIds]);

  return (
    // <Accordion
    //   type="multiple"
    //   value={openIds}
    //   onValueChange={(val) => setOpenIds(val)}  // ✅ use parent state
    //   className="space-y-6 overflow-hidden"
    // >
    <Accordion
  type="multiple"
  value={openIds}
  onValueChange={(val) => setOpenIds(val)}
  // className="space-y-6 overflow-hidden [&_[data-state=open]]:animate-none [&_[data-state=closed]]:animate-none"
  className="space-y-6 overflow-hidden"
>
      {categories.map((category) => {
        const categoryFoods = filteredFoods.filter((food) =>
          typeof food.category === "object"
            ? food.category?._id === category._id
            : food.category === category._id
        );

        if (!categoryFoods.length) return null;

        return (
          <AccordionItem
            key={category._id}
            value={category._id}
            id={category._id}
            // className="border border-pink-500 rounded-xl px-4 last:border-b bg-pink-50  scroll-mt-52 lg:scroll-mt-40"
            className="border border-pink-500 rounded-xl px-4 last:border-b bg-pink-50 scroll-mt-52"
          >
            {/* <AccordionTrigger>
              {category.title}
            </AccordionTrigger> */}


            <AccordionTrigger className="px-0 py-4 text-left hover:no-underline">
              <div className="flex items-center justify-between gap-6 w-full ">
                <div>
                  <h4 className="text-lg font-semibold">{category.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <Image
                  src={category.image}
                  alt={category.title}
                  height={80}
                  width={80}
                  className="rounded-lg object-cover"
                />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryFoods.map((food) => (
                  <FoodCard key={food._id} food={food} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
