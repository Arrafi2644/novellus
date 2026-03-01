"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IFood } from "@/types";

interface SearchInputProps {
  foods: IFood[];
  onSearch?: (term: string) => void;
}

function useDebounce<T>(value: T, delay: number = 350): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchInput({ foods, onSearch }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<IFood[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 350);

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
          food.category.title.toLowerCase().includes(lowerTerm))
    );

    setSuggestions(matched.slice(0, 10));
    setShowSuggestions(true);
  }, [debouncedSearchTerm, foods]);

  // Outside click hide suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
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
    setSearchTerm(food.name);
    if (inputRef.current) {
      inputRef.current.value = food.name;
      inputRef.current.focus();
      inputRef.current.setSelectionRange(food.name.length, food.name.length);
    }
    setShowSuggestions(false);
    onSearch?.(food.name);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch?.("");
  };

  return (
    <div ref={containerRef} className="relative w-full lg:w-80 shrink-0">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-500 pointer-events-none" />
      <Input
        ref={inputRef}
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setShowSuggestions(searchTerm.trim().length > 0)}
        placeholder="Search food name..."
        // className="pl-9 pr-10 bg-gray-50"
className="
  pl-9 pr-10
  bg-white
  border-2 border-pink-400
  shadow-md
  rounded-md
  hover:shadow-lg
  focus:ring-2 focus:ring-pink-300 
  transition-all duration-300
"
      />

      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-900 hover:text-gray-700"
        >
          <X size={18} />
        </button>
      )}

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
                    : food.category?.title || "Unknown"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showSuggestions && searchTerm.trim().length > 1 && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg p-4 text-center text-gray-500">
          No matching food found
        </div>
      )}
    </div>
  );
}