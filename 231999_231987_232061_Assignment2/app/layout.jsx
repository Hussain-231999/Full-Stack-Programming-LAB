'use client';

import './globals.css';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter, usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const addToCart = () => setCartCount(c => c + 1);
  const pathname = usePathname();

  // Scroll to top on route change
  if (typeof window !== 'undefined') {
    const currentPath = pathname;
    // This is handled by useEffect in a client component
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Oswald:wght@400;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <title>HotSpring - Portable Spas</title>
      </head>
      <body>
        <Header cartCount={cartCount} />
        <PageScrollTop />
        {children}
        <Footer />
      </body>
    </html>
  );
}

function PageScrollTop() {
  const pathname = usePathname();
  
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }

  return null;
}
