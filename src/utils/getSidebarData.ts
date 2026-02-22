import { ownerSidebar, sellerSidebar, userSidebar } from "./sidebarItems";

export const getSidebarData = (role: "OWNER" | "SELLER" | "USER") => {
  if (role === "OWNER") {
    return ownerSidebar;
  }
  if (role === "USER") {
    return userSidebar;
  }

  if (role === "SELLER") {
    return sellerSidebar;
  }
};