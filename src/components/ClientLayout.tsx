'use client';

import { useEffect } from 'react';
import useSmoothScroll from '@/hooks/useSmoothScroll';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useSmoothScroll();
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.refresh) {
      ScrollTrigger.refresh();
    }
  }, [pathname]);

  return <>{children}</>;
}
