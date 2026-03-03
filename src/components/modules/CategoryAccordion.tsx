
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import Image from "next/image";
// import FoodCard from "./FoodCard";
// import { ICategory, IFood } from "@/types";

// type Props = {
//   category: ICategory;
//   foods: IFood[];
// };

// export default function CategoryAccordion({ category, foods }: Props) {
//   // const popularFoods = [...foods]
//   //   .sort((a, b) => (b.totalSell ?? 0) - (a.totalSell ?? 0))
//   //   .slice(0, 6);

//   // const categoryFoods =
//   //   category.title === "Popular"
//   //     ? popularFoods
//   //     : foods.filter(
//   //       (food) =>
//   //         typeof food.category === "object" &&
//   //         food.category?._id === category._id
//   //     );

//   const categoryFoods = foods.filter(
//     (food) =>
//       typeof food.category === "object" &&
//       food.category?._id === category._id
//   );

//   return (
//     <Accordion type="single" collapsible className="w-full border border-pink-500 rounded-xl">

//       <AccordionItem
//         value={category._id}
//         id={category._id}
//         className=" data-[state=open]:bg-pink-50
//     transition-colors rounded-xl scroll-mt-170 lg:scroll-mt-130 "
//       >
//         <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
//           <div className="flex items-center justify-between gap-6 w-full">
//             <div>
//               <h4 className="text-lg font-semibold">{category.title}</h4>
//               <p className="text-sm text-muted-foreground">
//                 {category.description}
//               </p>
//             </div>
//             <Image
//               src={category.image}
//               alt={category.title}
//               height={80}
//               width={80}
//               className="rounded-lg object-cover"
//             />
//           </div>
//         </AccordionTrigger>

//         <AccordionContent className="px-6 pb-6">
//           {categoryFoods.length === 0 ? (
//             <p className="text-sm text-muted-foreground">
//               No items available in this category.
//             </p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {categoryFoods.map((food) => (
//                 <FoodCard key={food._id} food={food} />
//               ))}
//             </div>
//           )}
//         </AccordionContent>
//       </AccordionItem>
//     </Accordion>

//   );
// }

// ------------------------------------------------


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import FoodCard from "./FoodCard";
import { ICategory, IFood } from "@/types";

type Props = {
  category: ICategory;
  foods: IFood[];
  activeCategoryId?: string;
};

export default function CategoryAccordion({ category, foods, activeCategoryId }: Props) {
  // const popularFoods = [...foods]
  //   .sort((a, b) => (b.totalSell ?? 0) - (a.totalSell ?? 0))
  //   .slice(0, 6);

  // const categoryFoods =
  //   category.title === "Popular"
  //     ? popularFoods
  //     : foods.filter(
  //       (food) =>
  //         typeof food.category === "object" &&
  //         food.category?._id === category._id
  //     );

  const categoryFoods = foods.filter(
    (food) =>
      typeof food.category === "object" &&
      food.category?._id === category._id

  );

  return (
    // <Accordion type="single" collapsible className="w-full border border-pink-500 rounded-xl">
    <Accordion
      type="single"
      collapsible
      value={activeCategoryId === category._id ? category._id : undefined}
      className="w-full border border-pink-500 rounded-xl"
    >

      <AccordionItem
        value={category._id}
        id={category._id}
        className=" data-[state=open]:bg-pink-50
    transition-colors rounded-xl scroll-mt-170 lg:scroll-mt-130 "
      >
        <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
          <div className="flex items-center justify-between gap-6 w-full">
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

        <AccordionContent className="px-6 pb-6">
          {categoryFoods.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No items available in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryFoods.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>

  );
}