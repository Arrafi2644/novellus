"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

import {
  useGetAllFoodsQuery,
  useDeleteFoodMutation,
} from "@/redux/features/food/food.api";

import DashboardManagementPageSkeleton from "@/components/dashboard/DashboardManagePageSkeleton";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import DeleteAlert from "@/components/dashboard/DeleteAlert";
import TablePagination from "@/components/shared/TablePagination";
import { DynamicDataTable } from "@/components/dashboard/DataTable";
import FoodToolbar from "@/components/dashboard/food/FoodToolbar";
import { IFood } from "@/types";
import { useRouter } from "next/navigation";

const FoodManagementPage = () => {
  const [deleteFood] = useDeleteFoodMutation();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [sort, setSort] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetAllFoodsQuery({
    ...(searchTerm && { searchTerm }),
    ...(sort && { sort }),
    page,
    limit,
  });

  // Modal states
  const [selectedFood, setSelectedFood] = React.useState<IFood | null>(null);
  const [openViewModal, setOpenViewModal] = React.useState(false);

  const [foodToUpdate, setFoodToUpdate] = React.useState<IFood | null>(null);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);

  const [foodToDelete, setFoodToDelete] = React.useState<IFood | null>(null);
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

  // Delete handler
  const handleDelete = async (food: IFood) => {
    try {
      const res = await deleteFood(food._id as string).unwrap();
      if (res.success) {
        toast.success("Food deleted successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete food");
    }
  };

  // Table columns
  const columns: ColumnDef<IFood>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "category.title", header: "Category" },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      header: "Price",
      cell: ({ row }) => (
        <div className="text-sm space-y-1">
          {row.original.variants?.map((v, i) => (
            <div key={i}>
              {v.size}: €
              {v.offerPrice ?? v.price}
            </div>
          ))}
        </div>
      ),
    },
    {
      header: "Stock",
      cell: ({ row }) => (
        <div className="text-sm space-y-1">
          {row.original.variants?.map((v, i) => (
            <div key={i}>
              {v.size}: {v.totalStock}
            </div>
          ))}
        </div>
      ),
    }

  ];

  const router = useRouter()

  // Row actions
  const actions = [
    {
      label: "Edit",
      onClick: (food: IFood) => {
        router.push(`/staff/dashboard/owner/product-management/update-food/${food.slug}`);
      },
    },
    {
      label: "Delete",
      onClick: (food: IFood) => {
        setFoodToDelete(food);
        setOpenDeleteAlert(true);
      },
    },
  ];

  if (isLoading) return <DashboardManagementPageSkeleton />;
  if (isError) return <p>Error loading foods.</p>;

  return (
    <div>
      <DashboardPageHeader title="Food Management" />

      {/* Toolbar */}
      <FoodToolbar
        onSearchChange={setSearchTerm}
        onSortChange={setSort}
      />

      {/* Table */}
      <DynamicDataTable
        columns={columns}
        data={data?.data ?? []}
        actions={actions}
      />

      {/* Pagination */}
      <TablePagination
        currentPage={page}
        totalPages={data?.meta?.totalPage ?? 1}
        onPageChange={setPage}
      />

      {/* Delete Confirmation */}
      {foodToDelete && (
        <DeleteAlert
          open={openDeleteAlert}
          onOpenChange={setOpenDeleteAlert}
          description={`Are you sure you want to delete "${foodToDelete.name}"? This action is permanent and cannot be undone.`}
          onConfirm={async () => {
            await handleDelete(foodToDelete);
            setOpenDeleteAlert(false);
            setFoodToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default FoodManagementPage;
