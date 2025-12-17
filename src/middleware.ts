import { NextResponse, NextRequest } from "next/server";
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Create the intl middleware
const intlMiddleware = createIntlMiddleware(routing);

// Protected routes that require authentication
const protectedRoutes = ['/checkout'];

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    console.log("midleware");
    // Check if it's a protected route (accounting for locale prefix)
    const isProtectedRoute = protectedRoutes.some(route => 
        pathname.includes(route)
    );

    // Handle authentication for protected routes
    if (isProtectedRoute) {
        const token = request.cookies.get('hatem-ecommerce-token');
        
        if (!token) {
            //  Updated: Get the locale from the pathname, default to 'fr'
            let locale = 'fr'; // Default locale
            if (pathname.startsWith('/en')) {
                locale = 'en';
            } else if (pathname.startsWith('/ar')) {
                locale = 'ar';
            } else if (pathname.startsWith('/fr')) {
                locale = 'fr';
            }
            
            const redirectUrl = `/${locale}/auth/login`;
            console.log("locale from middleware-------->",locale);
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
        '/(fr|en|ar)/:path*',  //  Make sure 'fr' is included
        '/((?!api|_next|_vercel|.*\\..*).*)'
    ],
};