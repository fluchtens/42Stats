import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const currentUser = session?.user;

  const protectedRoutes = ["/leaderboard"];
  const currentPath = request.nextUrl.pathname;

  if (protectedRoutes.some((route) => currentPath.startsWith(route))) {
    if (!currentUser) {
      return Response.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
