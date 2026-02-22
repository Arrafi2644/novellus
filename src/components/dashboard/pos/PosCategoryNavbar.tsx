
"use client";

import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils"; 

interface PosCategoryNavbarProps {
  onCategoryChange: (categoryId: string) => void;
  currentCategory: string; 
}

export default function PosCategoryNavbar({
  onCategoryChange,
  currentCategory = "",
}: PosCategoryNavbarProps) {
  const limit = 200;
  const { data, isLoading } = useGetAllCategoriesQuery({
    limit,
  });

  const categories = data?.data || [];

  const allCategories = [
    { _id: "", title: "All Categories" },
    ...categories,
  ];

  if (isLoading) {
    return (
      <div className="sticky top-25 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-14 items-center">
          <Skeleton className="h-12 w-full max-w-3xl" />
        </div>
      </div>
    );
  }

  return (
    <nav className="sticky top-17 z-50 w-full border-b bg-white">
      <div className="container">
        <Tabs
          value={currentCategory || ""}
          onValueChange={(value) => onCategoryChange(value)}
          className="py-3"
        >
          <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground overflow-x-auto whitespace-nowrap max-w-full">
            {allCategories.map((cat) => (
              <TabsTrigger
                key={cat._id}
                value={cat._id}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                )}
              >
                {cat.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </nav>
  );
}