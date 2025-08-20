//export { default } from "next-auth/middleware";
import { auth } from "@/app/_lib/authentication/auth";
import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "tc"];

const protectedRoutes = ["/someRoute"];

// 1. attach locale to path
// 2. protect routes
export async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  //console.log("current path ", pathname);

  const defaultLocale = "tc";
  const currentLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  //console.log("current locale:" ,currentLocale)

  // get locale from cookie
  const cookieLocale = request.cookies.get("locale")?.value;

  const cleanPathname = removeLocaleFromPathname(pathname); // Remove locale before checking

  // redirect to sign in if not authorized
  if (protectedRoutes.some((route) => cleanPathname.startsWith(route))) {
    // check session existence & session expiry
    const session = await auth();
    if (!session || new Date(session.expires).getTime() < Date.now()) {
      request.nextUrl.pathname = `/${
        currentLocale ?? cookieLocale ?? defaultLocale
      }/signin`;
      return NextResponse.redirect(request.nextUrl);
    }
  }

  if (currentLocale) return NextResponse.next();

  request.nextUrl.pathname = `/${cookieLocale ?? defaultLocale}${pathname}`;

  // e.g. incoming request is /products
  // The new URL is now /en/products

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next|assets|favicon.ico).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};

// =======================
// helper function

function removeLocaleFromPathname(pathname: string): string {
  const segments = (pathname ?? "").split("/");
  if (locales.includes(segments[1])) {
    return `/${segments.slice(2).join("/")}`; // Remove the locale segment
  }
  return pathname;
}
