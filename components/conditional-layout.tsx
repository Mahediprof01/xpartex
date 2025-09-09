"use client";

import { usePathname } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Define routes where header and footer should be hidden
  const hiddenLayoutRoutes = ['/login', '/signup'];
  const isHiddenLayoutRoute = hiddenLayoutRoutes.includes(pathname) || pathname.startsWith('/dashboard');

  if (isHiddenLayoutRoute) {
    // Auth pages and dashboard without header and footer
    return <>{children}</>;
  }

  // Regular pages with header and footer
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
