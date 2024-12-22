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

    // Reapply Text Animation
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

    // Create Bouncing Peaches
    const emojiContainer = document.createElement('div');
    emojiContainer.className = 'emoji-container fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden';
    document.body.appendChild(emojiContainer);

    // Dynamically adjust peach count based on screen size
    const basePeaches = 20; // Minimum number of peaches
    const peachesPerWidth = Math.floor(window.innerWidth / 100); // Additional peaches per 100px of width
    const numberOfPeaches = basePeaches + peachesPerWidth;

    const peaches: HTMLDivElement[] = []; // Define type explicitly
    const velocities: { x: number; y: number }[] = []; // Define velocity type

    for (let i = 0; i < numberOfPeaches; i++) {
      const peach = document.createElement('div');
      peach.innerText = '🍑'; // Peach emoji
      peach.className = 'peach absolute';
      peach.style.fontSize = `${Math.random() * 2 + 1}rem`; // Random size
      peach.style.left = `${Math.random() * window.innerWidth}px`; // Random initial horizontal position
      peach.style.top = `${Math.random() * window.innerHeight}px`; // Random initial vertical position
      emojiContainer.appendChild(peach);
      peaches.push(peach);

      // Random velocity for each peach
      velocities.push({
        x: (Math.random() - 0.5) * 10, // Random x velocity (-5 to 5)
        y: (Math.random() - 0.5) * 10, // Random y velocity (-5 to 5)
      });
    }

    const bouncePeaches = () => {
      peaches.forEach((peach, index) => {
        const rect = peach.getBoundingClientRect();
        let x = parseFloat(peach.style.left);
        let y = parseFloat(peach.style.top);

        // Update position based on velocity
        x += velocities[index].x;
        y += velocities[index].y;

        // Bounce off edges
        if (x <= 0 || x + rect.width >= window.innerWidth) {
          velocities[index].x *= -1; // Reverse x direction
        }
        if (y <= 0 || y + rect.height >= window.innerHeight) {
          velocities[index].y *= -1; // Reverse y direction
        }

        // Update the peach's position
        peach.style.left = `${x}px`;
        peach.style.top = `${y}px`;
      });

      requestAnimationFrame(bouncePeaches); // Repeat the animation
    };

    // Start the bouncing animation
    bouncePeaches();

    // Cleanup on unmount
    return () => {
      document.body.removeChild(emojiContainer);
    };
  }, []);

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