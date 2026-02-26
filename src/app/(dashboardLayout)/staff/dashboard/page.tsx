
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