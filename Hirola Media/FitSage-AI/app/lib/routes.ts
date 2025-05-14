// Routes protégées qui nécessitent une authentification
export const protectedRoutes = [
  '/dashboard',
  '/coach',
  '/programs',
  '/nutrition',
  '/articles',
  '/tokens',
  '/profile',
];

// Vérifier si une route est protégée
export const isProtectedRoute = (pathname: string | null): boolean => {
  if (!pathname) return false;
  
  return protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
};

// Routes publiques qui ne nécessitent pas d'authentification
export const publicRoutes = [
  '/',
  '/login',
  '/login-success',
  '/register',
  '/unsubscribe',
  '/contact',
  '/about',
  '/pricing',
  '/terms',
  '/privacy',
];

// Vérifier si une route est publique
export const isPublicRoute = (pathname: string | null): boolean => {
  if (!pathname) return true;
  
  return publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
}; 