import { NextResponse, NextRequest } from "next/server";
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Create the intl middleware
const intlMiddleware = createIntlMiddleware(routing);

// Protected routes that require authentication
const protectedRoutes = ['/checkout'];

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    // Check if it's a protected route (accounting for locale prefix)
    const isProtectedRoute = protectedRoutes.some(route => 
        pathname.includes(route)
    );

    // Handle authentication for protected routes
    if (isProtectedRoute) {
        const token = request.cookies.get('hatem-ecommerce-token');
        
        if (!token) {
            // Get the locale from the pathname
            const locale = pathname.startsWith('/ar') ? 'ar' : 'en';
            const redirectUrl = `/${locale}/auth/login`;
            return NextResponse.redirect(new URL(redirectUrl, request.url));
        }
    }

    // Handle internationalization for all routes
    return intlMiddleware(request);
}

export const config = {
    matcher: [
        // Match all pathnames except for
        // - API routes
        // - _next (Next.js internals)
        // - Static files
        '/',
        '/(ar|en)/:path*',
        '/((?!api|_next|_vercel|.*\\..*).*)'
    ],
};