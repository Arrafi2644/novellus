// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useState } from "react";
// import { ColumnDef } from "@tanstack/react-table";
// import { toast } from "sonner";
// import {
//   useGetAllOrdersQuery,
//   useCancelOrderMutation,
//   useUpdateOrderMutation,
//   useGetSingleOrderQuery,
//   useDeleteOrderMutation,
// } from "@/redux/features/order/order.api";
// import DashboardManagementPageSkeleton from "@/components/dashboard/DashboardManagePageSkeleton";
// import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
// import DeleteAlert from "@/components/dashboard/DeleteAlert";
// import TablePagination from "@/components/shared/TablePagination";
// import { DynamicDataTable } from "@/components/dashboard/DataTable";
// // import OrderDetailsModal from "@/components/dashboard/order/OrderDetailsModal";
// // import UpdateOrderModal from "@/components/dashboard/order/UpdateOrderModal";
// import OrderToolbar from "@/components/dashboard/order/OrderToolbar";
// import { IOrder } from "@/types";
// import { format } from "date-fns";
// import OrderDetailsModal from "@/components/dashboard/order/OrderDetailsModal";
// import UpdateOrderModal from "@/components/dashboard/order/UpdateOrderModal";


// export enum OrderStatus {
//   PENDING = "PENDING",
//   ACCEPTED = "ACCEPTED",
//   COMPLETED = "COMPLETED",
//   CANCELLED = "CANCELLED",
// }

// export enum PaymentMethod {
//   COD = "COD",
//   STRIPE = "STRIPE",
// }

// export enum OrderType {
//   ONLINE = "ONLINE",
//   POS = "POS",
// }
// const OrderManagementPage = () => {
//   const [updateOrderStatus] = useUpdateOrderMutation();
//   const [cancelOrder] = useCancelOrderMutation();
//   const [deleteOrder] = useDeleteOrderMutation();
//   const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
//    const { data: orderDetails, isLoading: isDetailsLoading } = useGetSingleOrderQuery(
//       selectedOrderId!,
//       { skip: !selectedOrderId }
//     );

//   const [searchTerm, setSearchTerm] = React.useState("");
//   const [sort, setSort] = React.useState("");
//   const [statusFilter, setStatusFilter] = React.useState<string>("");
//   const [paymentMethodFilter, setPaymentMethodFilter] = React.useState<string>("");
//   const [page, setPage] = React.useState(1);
//   const limit = 10;

//   const { data, isLoading, isError, refetch } = useGetAllOrdersQuery({
//     ...(searchTerm && { search: searchTerm.trim() }),
//     ...(sort && { sort }),
//     page,
//     limit,
//   });

//   const [orderToUpdate, setOrderToUpdate] = React.useState<IOrder | null>(null);
//   const [openUpdateModal, setOpenUpdateModal] = React.useState(false);

//   const [orderToDelete, setOrderToDelete] = React.useState<IOrder | null>(null);
//   const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

//   // Delete / Cancel handler
//   const handleDeleteOrder = async (order: IOrder) => {

//     try {
//       const id = order._id;
//       const res = await deleteOrder(id).unwrap();
//       if (res.success) {
//         toast.success("Order deleted successfully");
//         refetch(); // Refetch orders list to update UI
//       }
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Failed to cancel order");
//     }
//   };

//   // Table columns
//   const columns: ColumnDef<IOrder>[] = [
//     {
//       accessorKey: "_id",
//       header: "Order ID",
//       cell: ({ row }) => `#${row.original._id.toString().slice(-8)}`,
//     },
//     {
//       accessorKey: "orderType",
//       header: "Type",
//     },
//     {
//       accessorKey: "status",
//       header: "Status",
//       cell: ({ row }) => (
//         <span className="capitalize">{row.original.status.toLowerCase()}</span>
//       ),
//     },
//     {
//       accessorKey: "payment.paymentMethod",
//       header: "Payment Method",
//       cell: ({ row }) => row.original.payment?.paymentMethod || "N/A",
//     },
//     {
//       accessorKey: "totalPrice",
//       header: "Total",
//       cell: ({ row }) => `€${row.original.totalPrice.toFixed(2)}`,
//     },
//     {
//       accessorKey: "createdAt",
//       header: "Date",
//       // cell: ({ row }) => format(new Date(row.original.createdAt), "dd MMM yyyy"),
//       cell: ({ row }) =>
//         row.original.createdAt
//           ? format(new Date(row.original.createdAt), "dd MMM yyyy")
//           : "N/A"

//     },
//   ];

//   // Row actions
//   const actions = [
//     {
//       label: "View",
//     onClick: (order: IOrder) => {
//       setSelectedOrderId(order._id);
//     },
//     },
//     {
//       label: "Update Status",
//       onClick: (order: IOrder) => {
//         setOrderToUpdate(order);
//         setOpenUpdateModal(true);
//       },
//     },
//     {
//       label: "Delete",
//       onClick: (order: IOrder) => {
//         setOrderToDelete(order);
//         setOpenDeleteAlert(true);
//       },
//       disabled: (order: IOrder) => order.status === OrderStatus.CANCELLED || order.status === OrderStatus.COMPLETED,
//     },
//   ];

//   if (isLoading) return <DashboardManagementPageSkeleton />;
//   if (isError) return <p>Error loading orders.</p>;

//   return (
//     <div>
//       <DashboardPageHeader title="Order Management" />

//       <OrderToolbar
//         onSearchChange={setSearchTerm}
//         onSortChange={setSort}
//         onStatusChange={setStatusFilter}
//         onPaymentMethodChange={setPaymentMethodFilter}
//       />

//       <DynamicDataTable
//         columns={columns}
//         data={data?.data ?? []}
//         actions={actions}
//       />

//       {/* Pagination */}
//       <TablePagination
//         currentPage={page}
//         totalPages={data?.meta?.totalPage ?? 1}
//         onPageChange={setPage}
//       />

//       {/* View Modal */}
//       {/* {selectedOrderId && (
//         <OrderDetailsModal
//           open={!!selectedOrderId}
//           onOpenChange={() => setSelectedOrderId(null)}
//           orderDetails={orderDetails}          
//           isDetailsLoading={isDetailsLoading}
//           selectedOrderId={selectedOrderId}
//         />
//       )} */}

//       {selectedOrderId && (
//   <OrderDetailsModal
//     open={!!selectedOrderId}
//     onOpenChange={() => setSelectedOrderId(null)}
//     orderDetails={orderDetails}
//     isDetailsLoading={isDetailsLoading}
//     selectedOrderId={selectedOrderId}
//   />
// )}

//       {/* Update Modal */}
//       {orderToUpdate && (
//         <UpdateOrderModal
//           open={openUpdateModal}
//           onOpenChange={setOpenUpdateModal}
//           order={orderToUpdate}
//         />
//       )}

//       {/* Delete / Cancel Confirmation */}
//       {orderToDelete && (
//         <DeleteAlert
//           open={openDeleteAlert}
//           onOpenChange={setOpenDeleteAlert}
//           description={`Are you sure you want to delete order #${orderToDelete._id.toString().slice(-8)}? This action is permanent and cannot be undone.`}
//           onConfirm={async () => {
//             await handleDeleteOrder(orderToDelete);
//             setOpenDeleteAlert(false);
//             setOrderToDelete(null);
//           }}
//         />
//       )}


//     </div>
//   );
// };

// export default OrderManagementPage;



/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
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
  const [statusFilter, setStatusFilter] = useState<string>(""); // ← status filter state
  const [page, setPage] = useState(1);
  const limit = 10;

const { data, isLoading, isError, refetch } = useGetAllOrdersQuery({
  ...(searchTerm && { searchTerm: searchTerm.trim() }),
  ...(sort && { sort }),
  ...(statusFilter && { status: statusFilter as OrderStatus }), // ← type assertion
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

  // Table columns
  const columns: ColumnDef<IOrder>[] = [
    {
      accessorKey: "_id",
      header: "Order ID",
      cell: ({ row }) => `#${row.original._id.toString()}`,
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

  // Row actions
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
      <DashboardPageHeader title="Order Management" />

      <OrderToolbar
        onSearchChange={setSearchTerm}
        onSortChange={setSort}
        onStatusChange={setStatusFilter}           // ← status filter পাস করা হচ্ছে
      />

      <DynamicDataTable columns={columns} data={data?.data ?? []} actions={actions} />

      {/* Pagination */}
      <TablePagination
        currentPage={page}
        totalPages={data?.meta?.totalPage ?? 1}
        onPageChange={setPage}
      />

      {/* View Modal */}
      {selectedOrderId && (
        <OrderDetailsModal
          open={!!selectedOrderId}
          onOpenChange={() => setSelectedOrderId(null)}
          orderDetails={orderDetails}
          isDetailsLoading={isDetailsLoading}
          selectedOrderId={selectedOrderId}
        />
      )}

      {/* Update Modal */}
      {orderToUpdate && (
        <UpdateOrderModal
          open={openUpdateModal}
          onOpenChange={setOpenUpdateModal}
          order={orderToUpdate}
        />
      )}

      {/* Delete Confirmation */}
      {orderToDelete && (
        <DeleteAlert
          open={openDeleteAlert}
          onOpenChange={setOpenDeleteAlert}
          description={`Are you sure you want to delete order #${orderToDelete._id
            .toString()
            .slice(-8)}? This action is permanent and cannot be undone.`}
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