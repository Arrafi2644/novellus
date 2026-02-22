// import { ICategory, IFood } from '@/types';
// import CategoryAccordion from './CategoryAccordion';
// export interface Category {
//     _id: string;
//     name: string;
//     count: number;
//     description: string;
//     categoryImg: string;
// }

// interface CategoryWiseFoodSectionProps {
//     categories: ICategory[];
//     foods: IFood[];
// }

// export enum CategoryStatus {
//   ACTIVE = "ACTIVE",
//   INACTIVE = "INACTIVE",
// }

// export default function CategoryWiseFoodSection({categories, foods}: CategoryWiseFoodSectionProps) {

//     return (
//         <div className=''>
//             <h3 className='text-3xl lg:text-4xl font-bold mb-2'>Explore Food By Category</h3>
//             <p className='mb-4'>
//             Discover delicious dishes from every category, made just for you.
//             </p>
            
//             <div className='space-y-4'>
//                 {
//                     categories.map(category => <CategoryAccordion key={category._id} category={category} foods={foods} />)
//                 }

//             </div>
//         </div>
//     )
// }


// CategoryWiseFoodSection.tsx
// import React from "react";
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
//   // Search ফিল্টার
//   const filteredFoods = React.useMemo(() => {
//     if (!searchTerm.trim()) return foods;

//     const lowerTerm = searchTerm.toLowerCase();
//     return foods.filter(
//       (food) =>
//         food.name.toLowerCase().includes(lowerTerm) ||
//         food.description?.toLowerCase().includes(lowerTerm) ||
//         (typeof food.category === "string" &&
//           food.category.toLowerCase().includes(lowerTerm)),
//     );
//   }, [foods, searchTerm]);

//   // Popular foods
//   const popularFoods = React.useMemo(() => {
//     return [...filteredFoods]
//       .sort((a, b) => (b.totalSell ?? 0) - (a.totalSell ?? 0))
//       .slice(0, 6);
//   }, [filteredFoods]);

//   return (
//     <div className="space-y-8">
//       {categories.map((category) => {
//         const categoryFoods =
//           category.title === "Popular"
//             ? popularFoods
//             : filteredFoods.filter((food) =>
//                 typeof food.category === "object"
//                   ? food.category?._id === category._id
//                   : food.category === category._id,
//               );

//         return (
//           <div key={category._id} id={category._id}>
//             {/* <CategoryAccordion category={category} foods={categoryFoods} /> */}
//             <div className="bg-white p-6 rounded-xl border">
//               <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
//               <p className="text-gray-600 mb-6">{category.description}</p>

//               {categoryFoods.length === 0 ? (
//                 <p className="text-center text-gray-500 py-8">
//                   No items found
//                 </p>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {categoryFoods.map((food) => (
//                     <div key={food._id} className="border rounded-lg p-4">
//                       <div className="aspect-square relative mb-3">
//                         <img
//                           src={food.image}
//                           alt={food.name}
//                           className="object-cover w-full h-full rounded-md"
//                         />
//                       </div>
//                       <h3 className="font-semibold">{food.name}</h3>
//                       <p className="text-sm text-gray-600 mt-1">
//                         {food.description?.substring(0, 60)}...
//                       </p>
//                       <div className="mt-3 font-bold text-pink-600">
//                         ৳{food.price}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// CategoryWiseFoodSection.tsx
import React from "react";
import CategoryAccordion from "./CategoryAccordion"; // Import your accordion component
import { ICategory, IFood } from "@/types";

type Props = {
  categories: ICategory[];
  foods: IFood[];
  searchTerm: string;
};

export default function CategoryWiseFoodSection({
  categories,
  foods,
  searchTerm,
}: Props) {
  // Search filter for all foods
  const filteredFoods = React.useMemo(() => {
    if (!searchTerm.trim()) return foods;

    const lowerTerm = searchTerm.toLowerCase();
    return foods.filter(
      (food) =>
        food.name.toLowerCase().includes(lowerTerm) ||
        food.description?.toLowerCase().includes(lowerTerm) ||
        (typeof food.category.title === "string" &&
          food.category.title.toLowerCase().includes(lowerTerm)),
    );
  }, [foods, searchTerm]);

  // Popular foods (calculated from filteredFoods)
  const popularFoods = React.useMemo(() => {
    return [...filteredFoods]
      .sort((a, b) => (b.totalSell ?? 0) - (a.totalSell ?? 0))
      .slice(0, 6);
  }, [filteredFoods]);

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        // Get foods for this category
        const categoryFoods =
          category.title === "Popular"
            ? popularFoods
            : filteredFoods.filter((food) =>
                typeof food.category === "object"
                  ? food.category?._id === category._id
                  : food.category === category._id,
              );

        // Only render if there are foods (hide empty categories)
        if (categoryFoods.length === 0) return null;

        return (
          <div key={category._id} id={category._id}>
            <CategoryAccordion category={category} foods={categoryFoods} />
          </div>
        );
      })}
    </div>
  );
}