
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import {
  useGetAllOrdersQuery,
  useCancelOrderMutation,
  useUpdateOrderMutation,
  useGetSingleOrderQuery,
  useDeleteOrderMutation,
} from "@/redux/features/order/order.api";
import DashboardManagementPageSkeleton from "@/components/dashboard/DashboardManagePageSkeleton";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import DeleteAlert from "@/components/dashboard/DeleteAlert";
import TablePagination from "@/components/shared/TablePagination";
import { DynamicDataTable } from "@/components/dashboard/DataTable";
import OrderToolbar from "@/components/dashboard/order/OrderToolbar";
import OrderDetailsModal from "@/components/dashboard/order/OrderDetailsModal";
import UpdateOrderModal from "@/components/dashboard/order/UpdateOrderModal";
import { IOrder } from "@/types";
import { format } from "date-fns";
import { getSocket } from "@/lib/socket";

export enum OrderStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

const OrderManagementPage = () => {
  const [updateOrderStatus] = useUpdateOrderMutation();
  const [cancelOrder] = useCancelOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // প্রিন্ট করার জন্য অর্ডারের ডাটা রাখার স্টেট
  const [activeOrderForPrint, setActiveOrderForPrint] = useState<any>(null);

  const { data, isLoading, isError, refetch } = useGetAllOrdersQuery({
    ...(searchTerm && { searchTerm: searchTerm.trim() }),
    ...(sort && { sort }),
    ...(statusFilter && { status: statusFilter as OrderStatus }),
    page,
    limit,
  });

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { data: orderDetails, isLoading: isDetailsLoading } = useGetSingleOrderQuery(
    selectedOrderId!,
    { skip: !selectedOrderId }
  );

  const [orderToUpdate, setOrderToUpdate] = useState<IOrder | null>(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [orderToDelete, setOrderToDelete] = useState<IOrder | null>(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  useEffect(() => {
    const socket = getSocket();

    const handleNewOrder = (order: any) => {
      // ১. নোটিফিকেশন সাউন্ড
      const audio = new Audio("/sounds/notification.wav");
      audio.play().catch((err) => console.log("Audio play error:", err));

      toast.success("New order received! Printing receipt...");

      // ২. প্রিন্ট স্টেটে অর্ডারের ডাটা সেট করা
      setActiveOrderForPrint(order);

      // ৩. DOM আপডেট হওয়ার জন্য সামান্য সময় দিয়ে সাইলেন্ট প্রিন্ট কল করা
      setTimeout(() => {
        window.print();
        refetch();
      }, 1000); // ১ সেকেন্ড সময় দেওয়া হলো যাতে ডাটা রেন্ডার হয়
    };

    socket.on("new-order", handleNewOrder);

    return () => {
      socket.off("new-order", handleNewOrder);
    };
  }, [refetch]);


  console.log("Active order for print:", activeOrderForPrint);

  // Delete / Cancel handler
  const handleDeleteOrder = async (order: IOrder) => {
    try {
      const id = order._id;
      const res = await deleteOrder(id).unwrap();
      if (res.success) {
        toast.success("Order deleted successfully");
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete order");
    }
  };

  const columns: ColumnDef<IOrder>[] = [
    {
      accessorKey: "_id",
      header: "Order ID",
      cell: ({ row }) => `#${row.original.customOrderId ?? row.original._id.toString()}`,
    },
    {
      accessorKey: "user.name",
      header: "Customer",
    },
    {
      accessorKey: "orderType",
      header: "Type",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.status.toLowerCase()}</span>
      ),
    },
    {
      accessorKey: "payment.paymentMethod",
      header: "Payment Method",
      cell: ({ row }) => row.original.payment?.paymentMethod || "N/A",
    },
    {
      accessorKey: "totalPrice",
      header: "Total",
      cell: ({ row }) => `€${row.original.totalPrice.toFixed(2)}`,
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) =>
        row.original.createdAt
          ? format(new Date(row.original.createdAt), "dd MMM yyyy")
          : "N/A",
    },
  ];

  const actions = [
    {
      label: "View",
      onClick: (order: IOrder) => {
        setSelectedOrderId(order._id);
      },
    },
    {
      label: "Update Status",
      onClick: (order: IOrder) => {
        setOrderToUpdate(order);
        setOpenUpdateModal(true);
      },
    },
    {
      label: "Delete",
      onClick: (order: IOrder) => {
        setOrderToDelete(order);
        setOpenDeleteAlert(true);
      },
      disabled: (order: IOrder) =>
        order.status === OrderStatus.CANCELLED ||
        order.status === OrderStatus.COMPLETED,
    },
  ];

  if (isLoading) return <DashboardManagementPageSkeleton />;
  if (isError) return <p>Error loading orders.</p>;

  return (
    <div>
      <DashboardPageHeader title="Orders" />

      <OrderToolbar
        onSearchChange={setSearchTerm}
        onSortChange={setSort}
        onStatusChange={setStatusFilter}
      />

      <DynamicDataTable columns={columns} data={data?.data ?? []} actions={actions} />

      <TablePagination
        currentPage={page}
        totalPages={data?.meta?.totalPage ?? 1}
        onPageChange={setPage}
      />

      {/* --- Print Template Start --- */}
      <div id="printable-receipt" className="hidden print:block font-mono text-[12px] w-[58mm] leading-snug text-black bg-white p-0">
        {activeOrderForPrint && (
          <div className="flex flex-col px-1">
            <div className="flex flex-col items-center mt-2">
              <h2 className="text-[16px] font-bold uppercase tracking-tighter">Pizzeria Novellus</h2>
              <p className="text-[10px] italic">Delicious Pizza Ordering App</p>
            </div>

            <div className="w-full border-b border-black my-1"></div>

            <div className="w-full space-y-1">
              <div className="flex justify-between font-bold">
                <span>ORDER ID:</span>
                <span>#{activeOrderForPrint.customOrderId || activeOrderForPrint._id.slice(-6)}</span>
              </div>

              <div className="border-t border-black border-dotted pt-1 flex flex-wrap justify-between gap-2">
                <p className="font-bold">CUSTOMER:</p>
                <p className="capitalize text-[13px]">{activeOrderForPrint.user?.name || "Guest Customer"}</p>
              </div>

              <div className="pt-1 flex flex-wrap justify-between gap-2">
                <p className="font-bold">PHONE:</p>
                <p className="capitalize text-[13px]">{activeOrderForPrint.user?.phone || "N/A"}</p>
              </div>

              <div className="pt-1 flex flex-wrap justify-between gap-2">
                <p className="font-bold">EMAIL:</p>
                <p className="capitalize text-[13px]">{activeOrderForPrint.user?.email || "N/A"}</p>
              </div>

              <div className="pt-1 pb-1 flex flex-wrap justify-between gap-2">
                <p className="font-bold">DELIVERY TO:</p>
                {activeOrderForPrint.deliveryAddress && (
                  <p className="text-[12px] leading-tight font-semibold">
                    {activeOrderForPrint.deliveryAddress}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full border-b-2 border-black my-1"></div>

            <div className="w-full">
              <div className="flex justify-between font-bold mb-1 border-b border-black">
                <span>ITEM</span>
                <span>PRICE</span>
              </div>

              {activeOrderForPrint.foods?.map((item: any, idx: number) => (
                <div key={idx} className="mb-2">
                  <div className="flex justify-between items-start">
                    <span className="w-[70%] capitalize font-bold text-[13px]">
                      {item.quantity}x {item.food.name}
                    </span>
                    <span className="w-[30%] text-right font-bold">€{item.lineTotal.toFixed(2)}</span>
                  </div>

                  {item.ingredients?.length > 0 && (
                    <div className="text-[10px] text-black pl-1 italic leading-none mt-1">
                      + {item.ingredients.map((ing: any) => ing.name).join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full border-b-2 border-black my-1"></div>

            <div className="w-full space-y-1">
              <div className="flex justify-between text-[15px] font-bold py-1 border-y border-black">
                <span>GRAND TOTAL</span>
                <span>€{activeOrderForPrint.totalPrice.toFixed(2)}</span>
              </div>

              <div className="text-[11px] flex justify-between pt-1">
                <span>Payment:</span>
                <span className="font-bold uppercase">{activeOrderForPrint.payment?.paymentMethod}</span>
              </div>
            </div>

            <div className="w-full border-b border-black my-2"></div>

            <p className="text-[10px] text-center font-bold">
              {format(new Date(activeOrderForPrint.createdAt), "dd MMM yyyy, hh:mm a")}
            </p>
            <p className="text-center mt-3 font-extrabold text-[14px]">*** THANK YOU ***</p>

            <div className="h-12 text-center text-[10px] pt-2">. . . . . . . . . . . . . . . .</div>
          </div>
        )}
      </div>
      {/* Print Template End */}

      {selectedOrderId && (
        <OrderDetailsModal
          open={!!selectedOrderId}
          onOpenChange={() => setSelectedOrderId(null)}
          orderDetails={orderDetails}
          isDetailsLoading={isDetailsLoading}
          selectedOrderId={selectedOrderId}
        />
      )}

      {orderToUpdate && (
        <UpdateOrderModal
          open={openUpdateModal}
          onOpenChange={setOpenUpdateModal}
          order={orderToUpdate}
        />
      )}

      {orderToDelete && (
        <DeleteAlert
          open={openDeleteAlert}
          onOpenChange={setOpenDeleteAlert}
          description={`Are you sure you want to delete order #${orderToDelete._id.toString().slice(-8)}?`}
          onConfirm={async () => {
            await handleDeleteOrder(orderToDelete);
            setOpenDeleteAlert(false);
            setOrderToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default OrderManagementPage;