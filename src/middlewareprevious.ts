import { NextResponse, NextRequest } from "next/server";
export function middleware(request: NextRequest) {

    // const path = request.nextUrl.pathname
    // console.log(path);

    const token = request.cookies.get('hatem-ecommerce-token');

    if (!token) {
        const redirectUrl = "/auth/login";
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/checkout',
        // '/content-management',
        // '/sessions',
        // '/all-personal-trainer',
        // '/user-management',
        // '/settings/:path*',
        // '/find-trainers/:path*',
        // '/morfitter-pts/:path*',
        // '/morfitter-sessions/:path*',
        // '/trainer-profile/:path*',
        // '/profile/:path*',
    ],
};
