
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