
"use client"

import { DashboardContent } from "@/components/dashboard/DashboardContent";
// import { GlobalOrderListener } from "@/components/dashboard/order/GlobalOrderListener";
import { SidebarProvider } from "@/components/ui/sidebar";
import ReduxProvider from "@/providers/ReduxProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <SidebarProvider>
        <DashboardContent>
          {/* <GlobalOrderListener /> */}
          {children}
          </DashboardContent>
      </SidebarProvider>
    </ReduxProvider>
  );
}
