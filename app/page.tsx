// app/page.tsx
'use client'; // Add this at the top of the file

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './globals.css'; // Import global CSS or Tailwind styles

export default function Home() {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1
        ref={titleRef}
        className="text-4xl font-bold text-gray-800 mb-4"
      >
        Welcome to the Cutting-Edge Next.js App
      </h1>
      <p
        ref={descriptionRef}
        className="text-lg text-gray-600"
      >
        This page uses Next.js 13+ App Router, Tailwind CSS, and GSAP animations.
      </p>
    </div>
  );
}

export const runtime = 'edge';