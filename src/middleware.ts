import { auth } from '@/lib/auth/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // // Pages publiques (auth)
  // const isAuthPage = nextUrl.pathname.startsWith('/auth');
  
  // // Pages protégées (toutes les pages du dossier (core))
  // const protectedRoutes = ['/dashboard', '/daily-task', '/pillars'];
  // const isProtectedPage = protectedRoutes.some(route => 
  //   nextUrl.pathname.startsWith(route)
  // );

  // // Si l'utilisateur n'est pas connecté et essaie d'accéder à une page protégée
  // if (!isLoggedIn && isProtectedPage) {
  //   const loginUrl = new URL(paths.auth.root, nextUrl.origin);
  //   loginUrl.searchParams.set('callbackUrl', nextUrl.pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  // // Si l'utilisateur est connecté et essaie d'accéder à une page d'auth
  // if (isLoggedIn && isAuthPage) {
  //   return NextResponse.redirect(new URL(paths.auth.root, nextUrl.origin));
  // }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
