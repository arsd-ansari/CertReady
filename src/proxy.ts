import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "certready_session";

/**
 * Cheap edge check: bounce unauthenticated visitors away from account areas.
 * Real authorization (role, suspension, expiry) happens in server layouts via requireUser/requireAdmin.
 */
export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has(SESSION_COOKIE);
  const { pathname, search } = request.nextUrl;

  if (!hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
