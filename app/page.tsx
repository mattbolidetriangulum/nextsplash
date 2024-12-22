'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './globals.css';

export const runtime = 'edge';

export default function Home() {
  const titleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars = Array.from(
      titleContainerRef.current?.querySelectorAll('.char') || []
    );

    // Apply Animation 4: Jump out and fade
    anime.timeline({ loop: true })
      .add({
        targets: chars,
        opacity: [0, 1],
        scale: [4, 1],
        translateZ: 0,
        easing: 'easeOutExpo',
        duration: 800,
        delay: anime.stagger(100),
      })
      .add({
        targets: chars,
        opacity: [1, 0],
        scale: [1, 0],
        easing: 'easeInExpo',
        duration: 800,
        delay: anime.stagger(100),
      });
  }, []);

  const text = 'send nudes';
  const characters = text.split('').map((char, index) => (
    <span key={index} className="char inline-block">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div
        ref={titleContainerRef}
        className="uppercase font-extrabold text-gray-800 text-center"
        style={{
          fontSize: '8vw', // Dynamic font size
          lineHeight: '1', // Prevent extra spacing
          whiteSpace: 'pre-wrap', // Preserve spaces and line breaks
        }}
      >
        {characters}
      </div>
    </div>
  );
}