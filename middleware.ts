import { NextResponse, type NextRequest } from "next/server";

// Protected routes listesi
const protectedRoutes = [
  // about
  "/(protected)/about/create",
  "/(protected)/about/create/skills",
  "/(protected)/about/create/experiences",
  "/(protected)/about/create/educations",
  // articles
  "/(protected)/articles/create",
  "/(protected)/articles/list/:id",
  "/(protected)/articles/list",
  // perspectives
  "/(protected)/perspectives/create",
  "/(protected)/perspectives/list",
  "/(protected)/perspectives/list/:id",
  // projects
  "/(protected)/projects/list",
  "/(protected)/projects/list/:id",

  // dashboard
  "/(protected)/dashboard",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  // Eğer logout query parametresi varsa, token kontrolü yapma
  const isLoggingOut = request.nextUrl.searchParams.has("logout");
  if (isLoggingOut) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Auth sayfası kontrolü - Eğer token varsa dashboard'a yönlendir
  if (pathname === "/auth") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protected route kontrolü
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname.startsWith(route) ||
      pathname.startsWith(route.replace("/(protected)", "")),
  );

  if (isProtectedRoute) {
    if (!token) {
      // Token yoksa auth sayfasına yönlendir
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

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
