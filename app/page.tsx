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

    // Apply the "jump out and fade" animation
    anime.timeline({ loop: true }) // Infinite loop
      .add({
        targets: chars,
        opacity: [0, 1], // Fade in
        scale: [4, 1], // Jump out then scale to normal
        translateZ: 0, // Ensure no perspective distortion
        easing: 'easeOutExpo', // Smooth easing
        duration: 800, // Duration for each character
        delay: anime.stagger(100), // Stagger the animation for each character
      })
      .add({
        targets: chars,
        opacity: [1, 0], // Fade out
        scale: [1, 0], // Shrink to nothing
        easing: 'easeInExpo',
        duration: 800,
        delay: anime.stagger(100), // Stagger the fade out as well
      });
  }, []);

  // Render the text as individual characters
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
        className="text-6xl font-extrabold text-gray-800 uppercase"
      >
        {characters}
      </div>
    </div>
  );
}