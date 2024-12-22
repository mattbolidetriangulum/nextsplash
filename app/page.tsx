'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './globals.css';

export const runtime = 'edge';

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl text-center">
        <h1
          ref={titleRef}
          className="text-5xl font-extrabold text-gray-800 mb-4"
        >
          Welcome to the Next Generation
        </h1>
        <p
          ref={descriptionRef}
          className="text-xl text-gray-600"
        >
          Experience the cutting edge with Next.js 13+ App Router, Tailwind CSS, GSAP animations, and Edge Runtime.
        </p>
      </div>
    </div>
  );
}