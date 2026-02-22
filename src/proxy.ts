import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  UserRole,
  getDefaultDashboardRoute,
  getRouteOwner,
  isValidRouteForRole,
} from "./utils/auth-utils";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value;

  let userRole: UserRole | null = null;

  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      ) as JwtPayload;

      userRole = decoded.role as UserRole;
    } catch (error) {
      // Invalid token → clear cookies
      const res = NextResponse.redirect(new URL("/", request.url));
      res.cookies.delete("accessToken");
      res.cookies.delete("refreshToken");
      return res;
    }
  }

  const routeOwner = getRouteOwner(pathname);

  // 🔹 Public route (homepage, product page etc.)
  if (routeOwner === null) {
    return NextResponse.next();
  }

  // 🔹 Protected route but NOT logged in
  if (!accessToken || !userRole) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🔹 Role mismatch
  if (!isValidRouteForRole(pathname, userRole)) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole), request.url)
    );
  }

  // ✅ Everything OK
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
