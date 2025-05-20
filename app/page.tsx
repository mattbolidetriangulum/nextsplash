'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Analytics } from "@vercel/analytics/next"

export const runtime = 'edge';

export default function Home() {
  const titleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars = Array.from(
      titleContainerRef.current?.querySelectorAll('.char') || []
    );

    // Apply Text Animation
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

    // Create Bouncing Peaches
    const emojiContainer = document.createElement('div');
    emojiContainer.className = 'emoji-container fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden';
    document.body.appendChild(emojiContainer);

    // Dynamically adjust peach count based on screen size
    const basePeaches = 20; // Minimum number of peaches
    const peachesPerWidth = Math.floor(window.innerWidth / 100); // Additional peaches per 100px of width
    const numberOfPeaches = basePeaches + peachesPerWidth;

    const peaches: HTMLDivElement[] = [];
    const velocities: { x: number; y: number }[] = [];
    const addedVelocities: { x: number; y: number }[] = [];
    const cursor = { x: 0, y: 0 }; // Mouse cursor position

    for (let i = 0; i < numberOfPeaches; i++) {
      const peach = document.createElement('div');
      peach.innerText = '🍑'; // Peach emoji
      peach.className = 'peach absolute';
      peach.style.fontSize = `${Math.random() * 2 + 1}rem`; // Random size
      peach.style.left = `${Math.random() * window.innerWidth}px`;
      peach.style.top = `${Math.random() * window.innerHeight}px`;
      emojiContainer.appendChild(peach);
      peaches.push(peach);

      // Random velocity for each peach
      velocities.push({
        x: (Math.random() - 0.5) * 10, // Random x velocity (-5 to 5)
        y: (Math.random() - 0.5) * 10, // Random y velocity (-5 to 5)
      });

      // Momentum decay velocity
      addedVelocities.push({ x: 0, y: 0 });
    }

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const bouncePeaches = () => {
      peaches.forEach((peach, index) => {
        const rect = peach.getBoundingClientRect();
        let x = parseFloat(peach.style.left);
        let y = parseFloat(peach.style.top);

        // Update position based on velocity
        x += velocities[index].x + addedVelocities[index].x;
        y += velocities[index].y + addedVelocities[index].y;

        // Bounce off edges
        if (x <= 0 || x + rect.width >= window.innerWidth) {
          velocities[index].x *= -1;
          addedVelocities[index].x = 0;
        }
        if (y <= 0 || y + rect.height >= window.innerHeight) {
          velocities[index].y *= -1;
          addedVelocities[index].y = 0;
        }

        // Calculate distance from cursor
        const dx = cursor.x - (x + rect.width / 2);
        const dy = cursor.y - (y + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Push peaches away if within avoidance radius
        const avoidanceRadius = 100;
        if (distance < avoidanceRadius) {
          const angle = Math.atan2(dy, dx);
          addedVelocities[index].x -= Math.cos(angle) * 5;
          addedVelocities[index].y -= Math.sin(angle) * 5;
        }

        // Decay momentum
        addedVelocities[index].x *= 0.9;
        addedVelocities[index].y *= 0.9;

        // Update position
        peach.style.left = `${x}px`;
        peach.style.top = `${y}px`;
      });

      requestAnimationFrame(bouncePeaches);
    };

    // Start peach bouncing
    bouncePeaches();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
    <div className="flex items-center justify-center min-h-screen animated-gradient no-select">
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