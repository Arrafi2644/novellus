/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

import {
  useGetAllIngredientsQuery,
  useDeleteIngredientMutation,
} from "@/redux/features/ingredient/ingredient.api";

import DashboardManagementPageSkeleton from "@/components/dashboard/DashboardManagePageSkeleton";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import DeleteAlert from "@/components/dashboard/DeleteAlert";
import TablePagination from "@/components/shared/TablePagination";
import { DynamicDataTable } from "@/components/dashboard/DataTable";
import { IIngredient } from "@/types";
import UpdateIngredientModal from "@/components/dashboard/ingredients/UpdateIngredientModal";
import IngredientToolbar from "@/components/dashboard/ingredients/IngredientToolbarModal";

const IngredientManagementPage = () => {
  const [deleteIngredient] = useDeleteIngredientMutation();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [sort, setSort] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetAllIngredientsQuery({
    ...(searchTerm && { searchTerm }),
    ...(sort && { sort }),
    page,
    limit,
  });

  // Modal states
  const [selectedIngredient, setSelectedIngredient] =
    React.useState<IIngredient | null>(null);
  const [openViewModal, setOpenViewModal] = React.useState(false);

  const [ingredientToUpdate, setIngredientToUpdate] =
    React.useState<IIngredient | null>(null);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);

  const [ingredientToDelete, setIngredientToDelete] =
    React.useState<IIngredient | null>(null);
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

  // Delete handler
  const handleDelete = async (ingredient: IIngredient) => {
    try {
      const res = await deleteIngredient(ingredient._id as string).unwrap();
      if (res.success) {
        toast.success("Ingredient deleted successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete ingredient");
    }
  };

  // Table columns
  const columns: ColumnDef<IIngredient>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "price", header: "Price" },
  ];

  // Row actions
  const actions = [
    {
      label: "Edit",
      onClick: (ingredient: IIngredient) => {
        setIngredientToUpdate(ingredient);
        setOpenUpdateModal(true);
      },
    },
    {
      label: "Delete",
      onClick: (ingredient: IIngredient) => {
        setIngredientToDelete(ingredient);
        setOpenDeleteAlert(true);
      },
    },
  ];

  if (isLoading) return <DashboardManagementPageSkeleton />;
  if (isError) return <p>Error loading ingredients.</p>;

  return (
    <div>
      <DashboardPageHeader title="Ingredient Management" />

      <IngredientToolbar
        onSearchChange={setSearchTerm}
        onSortChange={setSort}
      />

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

      {/* Update Modal */}
      {ingredientToUpdate && (
        <UpdateIngredientModal
          open={openUpdateModal}
          onOpenChange={setOpenUpdateModal}
          ingredient={ingredientToUpdate}
        />
      )}

      {/* Delete Confirmation */}
      {ingredientToDelete && (
        <DeleteAlert
          open={openDeleteAlert}
          onOpenChange={setOpenDeleteAlert}
          description={`Are you sure you want to delete "${ingredientToDelete.name}"? This action is permanent and cannot be undone.`}
          onConfirm={async () => {
            await handleDelete(ingredientToDelete);
            setOpenDeleteAlert(false);
            setIngredientToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default IngredientManagementPage;
