import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isMaintenanceMode =
    process.env.MAINTENANCE_MODE === "true";

  if (!isMaintenanceMode) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Allow the maintenance page itself
  if (pathname === "/maintenance") {
    return NextResponse.next();
  }

  // Allow Next.js assets and favicon
  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Show maintenance page without changing the URL
  const maintenanceUrl = request.nextUrl.clone();
  maintenanceUrl.pathname = "/maintenance";

  return NextResponse.rewrite(maintenanceUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};