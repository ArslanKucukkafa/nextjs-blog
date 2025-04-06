import { NextResponse, type NextRequest } from "next/server";

// Protected routes listesi
const protectedRoutes = [
  "/dashboard",
  // about
  "/about/create",
  "/about/create/skills",
  "/about/create/experiences",
  "/about/create/educations",
  // articles
  "/articles/create",
  "/articles/list",
  // perspectives
  "/perspectives/create",
  "/perspectives/list",
  // projects
  "/projects/list",
  // hero
  "/hero",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Token'ı auth store'dan al
  const authStorage = request.cookies.get("auth-storage")?.value;

  let token = null;

  if (authStorage) {
    try {
      const authData = JSON.parse(decodeURIComponent(authStorage));
      token = authData?.state?.token || null;
    } catch (error) {
      console.error("Error parsing auth storage:", error);
    }
  }

  // Eğer korumalı bir route ise ve token yoksa, login sayfasına yönlendir
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.includes(route),
  );
  if (isProtectedRoute && !token) {
    console.log("Protected route access denied, redirecting to auth");
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Auth sayfasındaysa ve token varsa dashboard'a yönlendir
  if (pathname === "/auth" && token) {
    console.log("Authenticated user on auth page, redirecting to dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Matcher'ı güncelle
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
