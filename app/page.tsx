'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export const runtime = 'edge';

export default function Home() {
  const titleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars = Array.from(
      titleContainerRef.current?.querySelectorAll('.char') || []
    );

    // Apply Animation 4: Jump out and fade
    anime.timeline({ loop: true }) // Infinite loop
      .add({
        targets: chars,
        opacity: [0, 1], // Fade in
        scale: [4, 1], // Scale down from larger size
        translateZ: 0, // Ensure no perspective distortion
        easing: 'easeOutExpo', // Smooth easing
        duration: 800, // Duration for each character
        delay: anime.stagger(100), // Staggered animation for each character
      })
      .add({
        targets: chars,
        opacity: [1, 0], // Fade out
        scale: [1, 0], // Scale down to disappear
        easing: 'easeInExpo',
        duration: 800,
        delay: anime.stagger(100), // Staggered animation for each character
      });
  }, []);

  // Render the text with responsive stacking
  const textSend = 'SEND';
  const textNudes = 'NUDES';

  const charactersSend = textSend.split('').map((char, index) => (
    <span key={index} className="char inline-block">
      {char}
    </span>
  ));

  const charactersNudes = textNudes.split('').map((char, index) => (
    <span key={index} className="char inline-block">
      {char}
    </span>
  ));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div
        ref={titleContainerRef}
        className="uppercase font-extrabold text-gray-800 text-center leading-none md:space-x-4 md:flex md:justify-center text-[24vw] md:text-[10vw]"
      >
        <span className="block md:inline">{charactersSend}</span>
        <span className="block md:inline">{charactersNudes}</span>
      </div>

    </div>
  );
}