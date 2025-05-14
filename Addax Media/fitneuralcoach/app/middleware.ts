import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { SECURITY_HEADERS } from './lib/constants';

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

  // Vérifier si c'est la page d'accueil ou des ressources statiques
  if (request.nextUrl.pathname === '/' || 
      request.nextUrl.pathname.startsWith('/_next/') ||
      request.nextUrl.pathname.startsWith('/api/auth/')) {
    return response;
  }

  // Vérifier l'authentification pour les routes protégées
  const protectedPaths = [
    '/dashboard',
    '/coach',
    '/programs',
    '/nutrition',
    '/articles',
    '/tokens',
    '/profile',
    '/settings',
    '/billing',
    '/api/tokens',
    '/api/articles',
    '/api/generate',
    '/api/user'
  ];

  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`)
  );

  if (isProtectedPath) {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

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
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 