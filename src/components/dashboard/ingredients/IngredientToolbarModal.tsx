"use client";

import { SearchForm } from "@/components/shared/search-form";
import Sort from "@/components/shared/Sort";
import CreateIngredientModal from "./CreateGredient";

type IngredientToolbarProps = {
  onSearchChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
};

export default function IngredientToolbar({
  onSearchChange,
  onSortChange,
}: IngredientToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-2 w-full my-4">
      <div className="flex items-center gap-4">
        {/* Search */}
        <SearchForm onSearchChange={onSearchChange} />

        {/* Sort */}
        <Sort onChange={onSortChange} />
      </div>

      {/* Create Ingredient Modal */}
      <CreateIngredientModal />
    </div>
  );
}
