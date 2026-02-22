"use client";

import { SearchForm } from "@/components/shared/search-form";
import Sort from "@/components/shared/Sort";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type FoodToolbarProps = {
  onSearchChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
};

export default function FoodToolbar({ onSearchChange, onSortChange }: FoodToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-2 w-full my-4">
      <div className="flex items-center gap-4">
        <SearchForm onSearchChange={onSearchChange} />
        <Sort onChange={onSortChange} />
      </div>

      <Link href="/staff/dashboard/owner/product-management/create-food">
      <Button>Add Food</Button>
      </Link>
    </div>
  );
}
