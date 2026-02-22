// "use client"
// import PosMainSection from '@/components/dashboard/pos/PosMainSection'
// import PosToolbar from '@/components/dashboard/pos/PosToolbar';
// import TablePagination from '@/components/shared/TablePagination';
// import { useGetAllFoodsQuery } from '@/redux/features/food/food.api';
// import React from 'react';

// export default function PosPage() {
//   // const { data, isLoading, isError } = useGetAllFoodsQuery({});
//   const [searchTerm, setSearchTerm] = React.useState("");
//   const [sort, setSort] = React.useState("");
//   const [page, setPage] = React.useState(1);
//   const limit = 10;

//   const { data, isLoading, isError } = useGetAllFoodsQuery({
//     ...(searchTerm && { searchTerm }),
//     ...(sort && { sort }),
//     page,
//     limit,
//   });

//   return (
//     <>

//       <PosToolbar />

//       <PosMainSection foods={data?.data} />

//       {/* Pagination */}
//       <TablePagination
//         currentPage={page}
//         totalPages={data?.meta?.totalPage ?? 1}
//         onPageChange={setPage}
//       />
//     </>
//   )
// }


"use client";

import React, { useState } from 'react';
import PosMainSection from '@/components/dashboard/pos/PosMainSection';
import PosToolbar from '@/components/dashboard/pos/PosToolbar';
import TablePagination from '@/components/shared/TablePagination';
import { useGetAllFoodsQuery } from '@/redux/features/food/food.api';
import PosCategoryNavbar from '@/components/dashboard/pos/PosCategoryNavbar';

export default function PosPage() {
  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");           
  const [category, setCategory] = useState(""); 
  const [page, setPage] = useState(1);

  const limit = 500;

  const { data, isLoading, isError, error } = useGetAllFoodsQuery({
    searchTerm: searchTerm || undefined,
    sort: sort || undefined,
    category: category || undefined,
    page,
    limit,
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  return (
    <div className="space-y-6 p-4 md:p-6 relative">
      <PosToolbar
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        onFilterChange={handleCategoryChange}
      />

      <PosCategoryNavbar
        onCategoryChange={handleCategoryChange}
        currentCategory={category}
      />

      <PosMainSection
        foods={data?.data || []}
        isLoading={isLoading}
        isError={isError}
        errorMessage={
          isError
            ? (error as any)?.data?.message || "Foods loading failed"
            : undefined
        }
      />

      {!isLoading && !isError && data?.meta && (
        <div className="mt-8 flex justify-center">
          <TablePagination
            currentPage={page}
            totalPages={data.meta.totalPage ?? 1}
            onPageChange={setPage}
          />
        </div>
      )}

      {!isLoading && !isError && data?.data?.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">No foods found with current filters</p>
          <p className="mt-2">Try changing search, category or sort</p>
        </div>
      )}
    </div>
  );
}