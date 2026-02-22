"use client";


import { SearchForm } from "@/components/shared/search-form";
import Sort from "@/components/shared/Sort";
import CategoryFilter from "../category/CategoryFilter";

type PosToolbarProps = {
    onSearchChange?: (value: string) => void;
    onSortChange?: (value: string) => void;
    onFilterChange?: (value: string) => void;
};

export default function PosToolbar({ onSearchChange, onSortChange, onFilterChange }: PosToolbarProps) {

    return (
        <div className="flex items-center justify-between gap-2 w-full py-4 my-0 bg-white sticky top-0 z-10 border-b">
            <div className="flex items-center gap-4">

                {/* Search */}
                <SearchForm onSearchChange={onSearchChange} />

                <CategoryFilter onChange={onFilterChange} />
                {/* Sort */}
                <Sort onChange={onSortChange} />
            </div>
        </div>
    );
}
