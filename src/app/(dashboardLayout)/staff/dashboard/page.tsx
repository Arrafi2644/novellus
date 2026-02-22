// // src/pages/Dashboard.tsx

// "use client"
// import { useState } from "react";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { 
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { 
//   BarChart, 
//   Bar, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   Legend, 
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from "recharts";
// import { TrendingUp, Package, ShoppingCart, DollarSign, AlertCircle } from "lucide-react";
// import { useGetFoodStateQuery, useGetOrderStateQuery } from "@/redux/features/state/state.api";

// // ────────────────────────────────────────────────
// type DateRange = "today" | "7days" | "30days" | "all";

// const rangeOptions = [
//   { value: "today", label: "Today" },
//   { value: "7days", label: "Last 7 Days" },
//   { value: "30days", label: "Last 30 Days" },
//   { value: "all", label: "All Time" },
// ];

// // ────────────────────────────────────────────────
// export default function Dashboard() {
//   const [range, setRange] = useState<DateRange>("7days");

//   // You can later create separate endpoints that accept ?range=xxx
//   // For now we're using the simple state endpoints + assuming backend trend data
//   const { 
//     data: foodStateData, 
//     isLoading: foodLoading 
//   } = useGetFoodStateQuery();

//   const { 
//     data: orderStateData, 
//     isLoading: orderLoading 
//   } = useGetOrderStateQuery();

// console.log(orderStateData)

//   // ── Mock / Placeholder data for charts ───────────────
//   // In real project → create new RTK Query endpoints that accept range
//   // e.g. getOrderTrendQuery(range), getTopFoodsQuery(range)
//   const mockOrderTrend = [
//     { date: "2025-01-28", orders: 12 },
//     { date: "2025-01-29", orders: 18 },
//     { date: "2025-01-30", orders: 15 },
//     { date: "2025-01-31", orders: 22 },
//     { date: "2025-02-01", orders: 28 },
//     { date: "2025-02-02", orders: 35 },
//     { date: "2025-02-03", orders: 41 },
//   ];

//   const mockTopFoods = [
//     { name: "Chicken Biryani", sold: 142, revenue: 28400 },
//     { name: "Beef Tehari", sold: 98, revenue: 24500 },
//     { name: "Mutton Kacchi", sold: 85, revenue: 29750 },
//     { name: "Fried Rice + Chicken", sold: 76, revenue: 15200 },
//     { name: "Shahi Tukra", sold: 62, revenue: 9300 },
//   ];

//   const foodState = foodStateData?.data ?? { totalFoods: 0, activeFoods: 0, inactiveFoods: 0 };
//   const orderState = orderStateData?.data ?? {
//     totalOrders: 0,
//     pendingOrders: 0,
//     completedOrders: 0,
//     cancelledOrders: 0,
//     totalRevenue: 0,
//   };

//   const loading = foodLoading || orderLoading;

//   return (
//     <div className="container mx-auto py-6 space-y-8">
//       {/* Header + Filter */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h1 className="text-3xl font-bold">Dashboard</h1>

//         <Select value={range} onValueChange={(v) => setRange(v as DateRange)}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select range" />
//           </SelectTrigger>
//           <SelectContent>
//             {rangeOptions.map(opt => (
//               <SelectItem key={opt.value} value={opt.value}>
//                 {opt.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Quick Stats Cards */}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         <StatCard
//           title="Total Orders"
//           value={orderState.totalOrders}
//           icon={<ShoppingCart className="h-6 w-6" />}
//           loading={loading}
//         />
//         <StatCard
//           title="Total Revenue"
//           value={`৳${orderState?.totalRevenue?.toLocaleString()}`}
//           icon={<DollarSign className="h-6 w-6" />}
//           trend="up"
//           loading={loading}
//         />
//         <StatCard
//           title="Total Foods"
//           value={foodState.totalFoods}
//           icon={<Package className="h-6 w-6" />}
//           loading={loading}
//         />
//         <StatCard
//           title="Pending Orders"
//           value={orderState.pendingOrders}
//           icon={<AlertCircle className="h-6 w-6 text-amber-600" />}
//           loading={loading}
//         />
//       </div>

//       {/* Charts Section */}
//       <div className="grid gap-6 md:grid-cols-2">
//         {/* Order Trend - Line Chart */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Order Trend ({rangeOptions.find(r => r.value === range)?.label})</CardTitle>
//           </CardHeader>
//           <CardContent className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={mockOrderTrend}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line 
//                   type="monotone" 
//                   dataKey="orders" 
//                   stroke="#3b82f6" 
//                   strokeWidth={2} 
//                   dot={{ r: 4 }}
//                   activeDot={{ r: 8 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Top Selling Foods - Bar Chart */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Top Selling Foods</CardTitle>
//           </CardHeader>
//           <CardContent className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={mockTopFoods} layout="vertical">
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis type="number" />
//                 <YAxis dataKey="name" type="category" width={140} />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="sold" fill="#10b981" name="Quantity Sold" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* You can add more sections like: 
//           - Recent Orders table 
//           - Low stock items 
//           - Revenue by category pie chart etc.
//       */}
//     </div>
//   );
// }

// // ────────────────────────────────────────────────
// type StatCardProps = {
//   title: string;
//   value: string | number;
//   icon: React.ReactNode;
//   trend?: "up" | "down";
//   loading?: boolean;
// };

// function StatCard({ title, value, icon, trend, loading }: StatCardProps) {
//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between pb-2">
//         <CardTitle className="text-sm font-medium text-muted-foreground">
//           {title}
//         </CardTitle>
//         <div className="text-muted-foreground">{icon}</div>
//       </CardHeader>
//       <CardContent>
//         {loading ? (
//           <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
//         ) : (
//           <div className="text-2xl font-bold">{value}</div>
//         )}
//         {trend && (
//           <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
//             {trend === "up" ? (
//               <TrendingUp className="h-3 w-3 text-green-600" />
//             ) : (
//               <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />
//             )}
//             {/* You can show real % change later */}
//           </p>
//         )}
//       </CardContent>
//     </Card>
//   );
// }


// "use client"

// import { useState } from "react";


// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";

// import {
//   ShoppingCart,
//   DollarSign,
//   Package,
//   AlertCircle,
//   TrendingUp,
// } from "lucide-react";
// import { useGetFoodStateQuery, useGetOrderStateQuery } from "@/redux/features/state/state.api";

// type RangeType = "today" | "7days" | "30days" | "all";

// const rangeOptions = [
//   { value: "today", label: "Today" },
//   { value: "7days", label: "Last 7 Days" },
//   { value: "30days", label: "Last 30 Days" },
//   { value: "all", label: "All Time" },
// ] as const;

// /* -----------------------------------------------
//    Dashboard Component
// ----------------------------------------------- */
// export default function Dashboard() {
//   const [range, setRange] = useState<RangeType>("7days");

//   const {
//     data: orderData,
//     isLoading: orderLoading,
//     isFetching: orderFetching,
//   } = useGetOrderStateQuery(range);

//   const {
//     data: foodData,
//     isLoading: foodLoading,
//     isFetching: foodFetching,
//   } = useGetFoodStateQuery(range);

//   const isLoading = orderLoading || foodLoading || orderFetching || foodFetching;


//   console.log(orderData)
//   console.log(foodData)
//   // Order data
//   const orderState = orderData?.data ?? {
//     totalOrders: 0,
//     completedOrders: 0,
//     cancelledOrders: 0,
//     totalRevenue: 0,
//   };

//   const orderTrend = orderData?.data?.orderTrend ?? [];

//   const orderChartData = orderTrend.map((item) => ({
//     date: item._id,
//     orders: item.totalOrders,
//   }));

//   // Food data
//   const foodState = foodData?.data ?? {
//     totalFoods: 0,
//     topSellingFoods: [],
//   };

//   const topFoodsChartData = foodState.topSellingFoods.map((item) => ({
//     name: item.food.name,
//     sold: item.totalSold,
//     price: item.food.price,
//   }));

//   return (
//     <div className="container mx-auto py-6 space-y-8 px-4 md:px-6">
//       {/* Header + Filter */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

//         <div className="flex items-center gap-3">
//           <span className="text-sm font-medium text-muted-foreground">
//             Show data for
//           </span>
//           <Select value={range} onValueChange={(v) => setRange(v as RangeType)}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select range" />
//             </SelectTrigger>
//             <SelectContent>
//               {rangeOptions.map((opt) => (
//                 <SelectItem key={opt.value} value={opt.value}>
//                   {opt.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Quick Stats Cards */}
//       <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//         <StatCard
//           title="Total Orders"
//           value={orderState.totalOrders}
//           icon={<ShoppingCart className="h-5 w-5" />}
//           loading={isLoading}
//         />
//         <StatCard
//           title="Total Revenue"
//           value={`৳${orderState?.totalRevenue}`}
//           icon={<DollarSign className="h-5 w-5" />}
//           loading={isLoading}
//         />
//         {/* <StatCard
//           title="Pending Orders"
//           value={orderState.pendingOrders}
//           icon={<AlertCircle className="h-5 w-5 text-amber-600" />}
//           loading={isLoading}
//         /> */}
//         <StatCard
//           title="Total Foods"
//           value={foodState.totalFoods}
//           icon={<Package className="h-5 w-5" />}
//           loading={isLoading}
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid gap-6 md:grid-cols-2">
//         {/* Order Trend - Line Chart */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Order Trend</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[360px]">
//               {isLoading ? (
//                 <div className="h-full w-full bg-muted/40 animate-pulse rounded-md" />
//               ) : orderChartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={orderChartData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Line
//                       type="monotone"
//                       dataKey="orders"
//                       stroke="#3b82f6"
//                       strokeWidth={2}
//                       dot={{ r: 4 }}
//                       activeDot={{ r: 8 }}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <div className="h-full flex items-center justify-center text-muted-foreground">
//                   No orders found in this period
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Top Selling Foods - Bar Chart */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Top Selling Foods</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[360px]">
//               {isLoading ? (
//                 <div className="h-full w-full bg-muted/40 animate-pulse rounded-md" />
//               ) : topFoodsChartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={topFoodsChartData} layout="vertical">
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis type="number" />
//                     <YAxis dataKey="name" type="category" width={140} />
//                     <Tooltip
//                       formatter={(value: number, name: string) =>
//                         name === "sold" ? [`${value} sold`, "Quantity"] : value
//                       }
//                     />
//                     <Legend />
//                     <Bar dataKey="sold" fill="#10b981" name="Quantity Sold" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <div className="h-full flex items-center justify-center text-muted-foreground">
//                   No sales data in this period
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// /* -----------------------------------------------
//    Stat Card Component
// ----------------------------------------------- */
// interface StatCardProps {
//   title: string;
//   value: string | number;
//   icon: React.ReactNode;
//   loading: boolean;
// }

// function StatCard({ title, value, icon, loading }: StatCardProps) {
//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium text-muted-foreground">
//           {title}
//         </CardTitle>
//         {icon}
//       </CardHeader>
//       <CardContent>
//         {loading ? (
//           <div className="h-8 w-24 bg-muted animate-pulse rounded" />
//         ) : (
//           <div className="text-2xl font-bold">
//             {typeof value === "number" ? value.toLocaleString() : value}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// src/pages/Dashboard.tsx  (or app/dashboard/page.tsx if using app router)
"use client"
import { useState } from "react";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  ShoppingCart,
  DollarSign,
  Package,
  AlertCircle,
  Euro,
} from "lucide-react";
import { useGetFoodStateQuery, useGetOrderStateQuery } from "@/redux/features/state/state.api";

type RangeType = "today" | "7days" | "30days" | "all";

const rangeOptions = [
  { value: "today", label: "Today" },
  { value: "7days", label: "Last 7 Days" },
  { value: "30days", label: "Last 30 Days" },
  { value: "all", label: "All Time" },
] as const;

export default function Dashboard() {
  const [range, setRange] = useState<RangeType>("7days");

  // API calls with range
  const {
    data: orderData,
    isLoading: orderLoading,
    isFetching: orderFetching,
  } = useGetOrderStateQuery(range);

  const {
    data: foodData,
    isLoading: foodLoading,
  } = useGetFoodStateQuery(range);

  const isLoading = orderLoading || foodLoading || orderFetching;

  // ==================== ORDER DATA ====================
  const orderState = orderData?.data ?? {
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    orderTrend: [],
  };

  const orderChartData = (orderState.orderTrend ?? []).map((item: any) => ({
    date: item._id,
    orders: item.totalOrders,
  }));

  // ==================== FOOD DATA ====================
  const foodState = foodData?.data ?? {
    totalFoods: 0,
    topSellingFoods: [],
  };

  const topFoodsChartData = foodState.topSellingFoods.map((item: any) => ({
    name: item.food.name,
    sold: item.totalSold,
    revenue: item.totalSold * item.food.price, // extra: total revenue from this food
  }));

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 space-y-8">
      {/* Header + Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Show data for
          </span>
          <Select value={range} onValueChange={(v) => setRange(v as RangeType)}>
            <SelectTrigger className="w-45">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {rangeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={orderState.totalOrders}
          icon={<ShoppingCart className="h-5 w-5" />}
          loading={isLoading}
        />
        <StatCard
          title="Total Revenue"
          value={`${orderState.totalRevenue.toLocaleString()}`}
          icon={<Euro className="h-5 w-5" />}
          loading={isLoading}
        />
        <StatCard
          title="Pending Orders"
          value={orderState.pendingOrders}
          icon={<AlertCircle className="h-5 w-5 text-amber-600" />}
          loading={isLoading}
        />
        <StatCard
          title="Total Foods"
          value={foodState.totalFoods}
          icon={<Package className="h-5 w-5" />}
          loading={isLoading}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Order Trend - Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Order Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-90">
              {isLoading ? (
                <div className="h-full w-full bg-muted/40 rounded-md animate-pulse" />
              ) : orderChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={orderChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#3b82f6"
                      name="Orders"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No orders in this period
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Selling Foods - Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Foods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-90">
              {isLoading ? (
                <div className="h-full w-full bg-muted/40 rounded-md animate-pulse" />
              ) : topFoodsChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topFoodsChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={130} />
                    {/* <Tooltip
                      formatter={(value: number, name: string) => {
                        if (name === "sold") return [`${value} units`, "Sold"];
                        if (name === "revenue") return [`${value.toLocaleString()}`, "Revenue"];
                        return value;
                      }}
                    /> */}
                    <Tooltip
                      formatter={(value: number | undefined, name: string | undefined) => {
                        // Early return if either is missing/undefined
                        if (value === undefined || name === undefined) {
                          return "";
                        }

                        if (name === "sold") {
                          return [`${value} units`, "Sold"];
                        }

                        if (name === "revenue") {
                          return [`${value.toLocaleString()}`, "Revenue"];
                        }

                        // fallback — just show the raw value
                        return value;
                      }}
                    />
                    <Legend />
                    <Bar dataKey="sold" fill="#10b981" name="Sold" />
                    {/* Optional: show revenue as second bar */}
                    {/* <Bar dataKey="revenue" fill="#f59e0b" name="Revenue (৳)" /> */}
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No sales data in this period
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ================ Reusable Stat Card ================ */
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  loading: boolean;
}

function StatCard({ title, value, icon, loading }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-8 w-32 bg-muted animate-pulse rounded" />
        ) : (
          <div className="text-2xl font-bold">
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>
        )}
      </CardContent>
    </Card>
  );
}