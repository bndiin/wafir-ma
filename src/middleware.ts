import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Routes that require authentication
const PROTECTED_PATTERNS = [
  /^\/(fr|ar|en)\/mon-compte/,
  /^\/(fr|ar|en)\/espace-pro/,
  /^\/(fr|ar|en)\/admin/,
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check protected routes — redirect to login if no session cookie
  const isProtected = PROTECTED_PATTERNS.some((p) => p.test(pathname));

  if (isProtected) {
    const token =
      request.cookies.get("__Secure-next-auth.session-token") ||
      request.cookies.get("next-auth.session-token");

    if (!token) {
      const locale = pathname.split("/")[1] || "fr";
      return NextResponse.redirect(
        new URL(`/${locale}/connexion`, request.url)
      );
    }
  }

  // Run next-intl middleware for locale handling
  return intlMiddleware(request);
}

export const config = {
  // Match locale-prefixed paths AND locale-less paths (to redirect them)
  // Exclude Next.js internals, API routes, and static files
  matcher: [
    "/",
    "/(fr|ar|en)/:path*",
    "/((?!_next|api|favicon\\.ico|.*\\..*).*)",
  ],
};
