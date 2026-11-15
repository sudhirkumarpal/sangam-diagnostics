import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export function Logo({
  variant = 'dark',
  size = 'md',
  className = '',
}: LogoProps) {
  const isWhite = variant === 'white';

  // Original aspect ratio is 700 / 220 ~= 3.18
  const sizeMap = {
    sm: { width: 140, height: 44 },
    md: { width: 185, height: 58 },
    lg: { width: 235, height: 74 },
    xl: { width: 290, height: 91 },
  };

  const { width, height } = sizeMap[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center group focus:outline-none transition-transform hover:opacity-95 ${className}`}
    >
      <div
        className={`relative inline-flex items-center justify-center transition-all ${
          isWhite
            ? 'bg-white px-3 py-1.5 rounded-xl shadow-md border border-white/40'
            : 'p-0.5'
        }`}
      >
        <Image
          src="/images/sangam-logo.jpg"
          alt="Sangam Diagnostics — Accuracy | Clarity | Reliable Results"
          width={width}
          height={height}
          priority
          className="h-auto w-auto object-contain max-h-[52px] sm:max-h-[64px] drop-shadow-sm"
          style={{ width: `${width}px`, height: 'auto' }}
        />
      </div>
    </Link>
  );
}
