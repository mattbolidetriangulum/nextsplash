'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './globals.css';

export const runtime = 'edge';

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the text
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power4.out',
        }
      );
    });

    return () => ctx.revert(); // Clean up GSAP context
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <h1
        ref={titleRef}
        className="text-6xl font-extrabold text-gray-800"
      >
        Welcome to the Next Generation
      </h1>
    </div>
  );
}