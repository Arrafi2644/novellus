
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ICategory, IFood } from "@/types";

interface CategoryProps {
  categories: ICategory[];
  foods: IFood[];
  onSearch?: (term: string) => void;
}

function useDebounce<T>(value: T, delay: number = 350): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function CategoryNavbar({
  categories,
  foods,
  onSearch,
}: CategoryProps) {
  const [activeCategory, setActiveCategory] = useState("Popular");
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<IFood[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 350);

  // Generate suggestions
  useEffect(() => {
    if (debouncedSearchTerm.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const lowerTerm = debouncedSearchTerm.toLowerCase();
    const matched = foods.filter(
      (food) =>
        food.name.toLowerCase().includes(lowerTerm) ||
        food.description?.toLowerCase().includes(lowerTerm) ||
        (typeof food.category.title === "string" &&
          food.category.title.toLowerCase().includes(lowerTerm)),
    );

    setSuggestions(matched.slice(0, 10));
    setShowSuggestions(true);
  }, [debouncedSearchTerm, foods]);

  // Hide suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleSuggestionClick = (food: IFood) => {
    const foodName = food.name;

    // State update
    setSearchTerm(foodName);

    // Force set value directly in DOM (fixes the issue)
    if (inputRef.current) {
      inputRef.current.value = foodName;
      inputRef.current.focus();
      inputRef.current.setSelectionRange(foodName.length, foodName.length);
    }

    setShowSuggestions(false);
    onSearch?.(foodName);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch?.("");
  };

  // Scroll logic
  const checkOverflow = () => {
    if (!scrollRef.current) return;
    setShowScrollBtn(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [categories]);

    const scrollContainer = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

const handleCategoryClick = (cat: ICategory) => {
  setActiveCategory(cat.title);

  const element = document.getElementById(cat._id);
  if (element) {
    const navbarOffset = window.innerWidth >= 1024 ? 180 : 260;

    const y = 
      element.getBoundingClientRect().top + 
      window.scrollY - 
      navbarOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }
};

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 sticky top-34 lg:top-26 z-30 bg-white">
      <div className="py-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          {/* Search with suggestions */}
          <div ref={containerRef} className="relative w-full lg:w-80 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <Input
              ref={inputRef}
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(searchTerm.trim().length > 0)}
              placeholder="Search food name..."
              className="pl-9 pr-10 bg-gray-50"
            />

            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            )}

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-80 overflow-y-auto divide-y divide-gray-100">
                {suggestions.map((food) => (
                  <div
                    key={food._id}
                    onClick={() => handleSuggestionClick(food)}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden shrink-0">
                      {food.image ? (
                        <img
                          src={food.image}
                          alt={food.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No img
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{food.name}</div>
                      <div className="text-sm text-gray-500 truncate">
                        {typeof food.category === "string"
                          ? food.category
                          : food.category?.title || "Unknown"}{" "}
                       
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No results */}
            {showSuggestions && searchTerm.trim().length > 1 && suggestions.length === 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg p-4 text-center text-gray-500">
                No matching food found
              </div>
            )}
          </div>

          {/* Category Bar */}
          <div className="flex items-center gap-2 flex-1">
            {showScrollBtn && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => scrollContainer("left")}
                className="shrink-0 border rounded-full bg-gray-50"
              >
                <ChevronLeft />
              </Button>
            )}

            <div
              ref={scrollRef}
              className="flex gap-2 flex-1 overflow-x-auto scrollbar-hide"
            >
              {categories.map((cat) => (
                <Button
                  key={cat._id}
                  variant="ghost"
                  onClick={() => handleCategoryClick(cat)}
                  className={`shrink-0 whitespace-nowrap ${
                    activeCategory === cat.title
                      ? "text-pink-600 border-b-2 border-pink-600 rounded-none"
                      : "text-gray-600"
                  }`}
                >
                  {cat.title}
                </Button>
              ))}
            </div>

            {showScrollBtn && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => scrollContainer("right")}
                className="shrink-0 border rounded-full bg-gray-50"
              >
                <ChevronRight />
              </Button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}