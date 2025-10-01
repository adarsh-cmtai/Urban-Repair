import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    
    // 1. Cookies se token aur role nikalo
    const token = request.cookies.get('authToken')?.value;
    const userRole = request.cookies.get('userRole')?.value;
    
    // 2. Define karo ki kaun se raaste protected hain
    const isAdminPath = path.startsWith('/admin');
    const isCustomerPath = path.startsWith('/customer'); // <-- YEH SABSE IMPORTANT HAI
    const isTechnicianPath = path.startsWith('/technician');
    const isAuthPath = path.startsWith('/login') || path.startsWith('/register') || path.startsWith('/verify-otp');
    
    // 3. LOGIC: Agar user LOGGED IN NAHI hai aur protected raasta khol raha hai
    if (!token && isCustomerPath) {
        // Use seedha login page par bhej do
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // 4. LOGIC: Agar user LOGGED IN hai...
    if (token) {
        // ...lekin woh customer nahi hai (admin ya technician hai) aur customer ka raasta khol raha hai
        if (isCustomerPath && userRole !== 'customer') {
            // To use access deny karo aur uske apne dashboard par bhej do
            if (userRole === 'admin') return NextResponse.redirect(new URL('/dashboard', request.url));
            if (userRole === 'technician') return NextResponse.redirect(new URL('/technician', request.url));
            // Agar role ajeeb hai, to login par bhej do
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    
    // Agar saare checks pass ho jaate hain, to user ko page dekhne do
    return NextResponse.next();
}

// Yeh config batata hai ki middleware ko kaun se routes par chalana hai
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
}