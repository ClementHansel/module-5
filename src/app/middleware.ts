import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authToken");

  if (!token && req.nextUrl.pathname.startsWith("/checkout")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/profile"],
};
