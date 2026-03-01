// components/pos/category-filter.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListFilter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";

interface CategoryFilterProps {
  onChange?: (value: string) => void;
}

export default function CategoryFilter({ onChange }: CategoryFilterProps) {
  const { data, isLoading } = useGetAllCategoriesQuery({});

  const categories = data?.data || [];

  const allCategories = [
    { _id: "all", title: "All Categories" },
    ...categories,
  ];

  if (isLoading) {
    return <Skeleton className="h-7.5 w-40" />;
  }

  return (
    <Select
      onValueChange={(value) => {
        onChange?.(value === "all" ? "" : value);
      }}
    >
      <SelectTrigger className="h-7.5 w-40">
        <ListFilter size={13} />
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {allCategories.map((cat) => (
          <SelectItem key={cat._id} value={cat._id}>
            {cat.title} 
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}