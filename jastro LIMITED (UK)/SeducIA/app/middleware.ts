import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { SECURITY_HEADERS, AUTH_TOKEN_NAME } from './lib/constants';

/**
 * Middleware Next.js pour la sécurité et l'authentification
 */
export async function middleware(request: NextRequest) {
  // Ajouter les headers de sécurité
  const response = NextResponse.next();
  
  // Appliquer tous les headers de sécurité
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  const authCookie = request.cookies.get(AUTH_TOKEN_NAME);
  const isAuthenticated = authCookie && authCookie.value ? true : false;

  // L'URL demandée par l'utilisateur
  const { pathname } = request.nextUrl;

  // Gérer les routes d'authentification (login, register)
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (isAuthenticated) {
      // Rediriger l'utilisateur connecté vers le chat directement
      return NextResponse.redirect(new URL('/chat', request.url));
    }
    return response;
  }

  // Rediriger la racine vers le chat
  if (pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/chat', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Rediriger toutes les routes dashboard vers le chat
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  // Gérer les routes qui nécessitent une authentification
  if (pathname.startsWith('/chat') || pathname === '/tokens' || pathname === '/subscriptions') {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return response;
  }

  // Continuer normalement pour toutes les autres routes
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (Next-Auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}; 