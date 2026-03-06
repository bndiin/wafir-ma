import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match locale-prefixed paths AND locale-less paths (to redirect them)
  // Exclude Next.js internals and static files
  matcher: [
    '/',
    '/(fr|ar|en)/:path*',
    '/((?!_next|api|favicon\\.ico|.*\\..*).*)',
  ],
};
