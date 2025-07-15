import { type NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/dashboard", "/settings"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    privateRoutes.includes(pathname) &&
    !request.cookies.get("session")?.value
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (pathname === "/auth" && request.cookies.get("session")?.value) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
