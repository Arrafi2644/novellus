import { FileText, Users, MessageCircle, LayoutDashboardIcon, Quote, ToolCase, Inbox, Search, Mails, Newspaper, StoreIcon, ListOrdered } from "lucide-react";

export const sellerSidebar = [
  {
    title: "Management",
    items: [
      { title: "Dashboard", url: "/staff/dashboard", icon: LayoutDashboardIcon },
      { title: "POS", url: "/staff/dashboard/pos", icon: StoreIcon },
      { title: "My Orders", url: "/staff/dashboard/my-orders", icon: ListOrdered }
    ],
  }
];

export const ownerSidebar = [
  {
    title: "Owner Management",
    items: [
      { title: "Dashboard", url: "/staff/dashboard", icon: LayoutDashboardIcon },
      { title: "Product Management", url: "/staff/dashboard/owner/product-management", icon: ToolCase },
      { title: "Category Management", url: "/staff/dashboard/owner/category-management", icon: ToolCase },
      { title: "Ingredient Management", url: "/staff/dashboard/owner/ingredient-management", icon: ToolCase },
      { title: "User Management", url: "/staff/dashboard/owner/user-management", icon: Users },
      { title: "Order Management", url: "/staff/dashboard/owner/order-management", icon: ListOrdered },
      { title: "POS", url: "/staff/dashboard/pos", icon: StoreIcon },
      { title: "My Orders", url: "/staff/dashboard/my-orders", icon: ListOrdered },
    ],
  }
];

export const userSidebar = [
  {
    title: "Owner Management",
    items: [
      { title: "My Orders", url: "/customer/dashboard/my-orders", icon: ToolCase },
    ],
  }
];

