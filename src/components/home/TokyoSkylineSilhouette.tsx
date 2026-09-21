"use client";

import React from "react";

export function TokyoSkylineLeft() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute left-0 top-2 bottom-0 w-[180px] md:w-[240px] lg:w-[300px] xl:w-[360px] hidden md:block z-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover object-left-bottom opacity-[0.22] hover:opacity-35 transition-opacity duration-700"
        preserveAspectRatio="xMinYMax meet"
      >
        <defs>
          <linearGradient id="skylineGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#059669" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#e11d48" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="fadeToCenterLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="65%" stopColor="#334155" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#334155" stopOpacity="0" />
          </linearGradient>

          <pattern id="windowGridLeft" width="8" height="12" patternUnits="userSpaceOnUse">
            <rect x="2" y="2" width="4" height="6" rx="0.5" fill="#f8fafc" fillOpacity="0.75" />
          </pattern>
          
          <pattern id="denseWindowGrid" width="6" height="8" patternUnits="userSpaceOnUse">
            <rect x="1.5" y="1.5" width="3" height="4" rx="0.5" fill="#ffffff" fillOpacity="0.8" />
          </pattern>
        </defs>

        {/* Background Layer: Distant Skyscrapers (Soft Silhouette) */}
        <g fill="url(#skylineGradLeft)" opacity="0.35">
          {/* Distant Spire & Tower */}
          <rect x="10" y="210" width="35" height="290" rx="1" />
          <polygon points="27.5,140 26,210 29,210" />
          
          <rect x="55" y="180" width="48" height="320" rx="1" />
          <rect x="110" y="230" width="38" height="270" rx="1" />
          <rect x="155" y="190" width="55" height="310" rx="1" />
          <rect x="220" y="260" width="45" height="240" rx="1" />
          <rect x="275" y="290" width="40" height="210" rx="1" />
        </g>

        {/* Midground Layer: Tokyo Tower & Architectural Towers */}
        <g fill="url(#skylineGradLeft)" opacity="0.7">
          {/* TOKYO TOWER SILHOUETTE (Left side landmark) */}
          {/* Spire tip & beacon */}
          <line x1="90" y1="45" x2="90" y2="120" stroke="currentColor" strokeWidth="2.5" className="text-rose-600" />
          <circle cx="90" cy="45" r="2.5" className="fill-rose-500 animate-ping" />
          <circle cx="90" cy="45" r="3" className="fill-rose-500" />
          
          {/* Upper Observation Deck */}
          <polygon points="85,120 95,120 98,135 82,135" />
          <rect x="80" y="135" width="20" height="12" rx="1" />
          
          {/* Middle Shaft Truss */}
          <polygon points="86,147 94,147 99,220 81,220" />
          
          {/* Main Observation Deck */}
          <rect x="73" y="220" width="34" height="22" rx="2" />
          <rect x="76" y="242" width="28" height="6" />
          
          {/* Lower Lattice Legs spreading outward */}
          <polygon points="83,248 97,248 122,390 108,390 90,285 72,390 58,390" />
          
          {/* Tower Base arch */}
          <path d="M72,390 Q90,345 108,390 Z" />
          
          {/* Cross-bracing accents */}
          <line x1="77" y1="265" x2="103" y2="285" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
          <line x1="103" y1="265" x2="77" y2="285" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
          <line x1="70" y1="305" x2="110" y2="330" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
          <line x1="110" y1="305" x2="70" y2="330" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
        </g>

        {/* Foreground Layer: Shinjuku & Roppongi Modern Towers */}
        <g fill="url(#fadeToCenterLeft)">
          {/* Modern Stepped Skyscraper 1 */}
          <rect x="0" y="250" width="55" height="250" rx="2" />
          <rect x="8" y="220" width="38" height="30" rx="1" />
          <rect x="18" y="195" width="18" height="25" rx="1" />
          <line x1="27" y1="170" x2="27" y2="195" stroke="#475569" strokeWidth="2" />
          
          {/* Windows on Building 1 */}
          <rect x="8" y="265" width="38" height="150" fill="url(#denseWindowGrid)" opacity="0.6" />

          {/* Curved High-Rise (Mode Gakuen / Roppongi Hills vibe) */}
          <path d="M 125 500 L 125 240 Q 148 185 168 180 Q 188 185 205 240 L 205 500 Z" />
          <rect x="165" y="150" width="6" height="30" />
          {/* Glass line streaks on curved tower */}
          <line x1="145" y1="210" x2="145" y2="480" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />
          <line x1="165" y1="185" x2="165" y2="480" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
          <line x1="185" y1="210" x2="185" y2="480" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />

          {/* Mid-sized Modern Residential Tower with Balconies */}
          <rect x="215" y="280" width="65" height="220" rx="2" />
          <rect x="235" y="255" width="25" height="25" rx="1" />
          {/* Balcony horizontal stripes */}
          <line x1="218" y1="300" x2="277" y2="300" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
          <line x1="218" y1="320" x2="277" y2="320" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
          <line x1="218" y1="340" x2="277" y2="340" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
          <line x1="218" y1="360" x2="277" y2="360" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
          <line x1="218" y1="380" x2="277" y2="380" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
          <line x1="218" y1="400" x2="277" y2="400" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
          <line x1="218" y1="420" x2="277" y2="420" stroke="#ffffff" strokeWidth="2" opacity="0.5" />

          {/* Stepped Urban Tower 3 */}
          <rect x="290" y="320" width="55" height="180" rx="2" />
          <rect x="302" y="295" width="30" height="25" rx="1" />
          <line x1="317" y1="270" x2="317" y2="295" stroke="#475569" strokeWidth="2" />
          <rect x="298" y="335" width="38" height="100" fill="url(#windowGridLeft)" opacity="0.5" />

          {/* Low-rise modern shop / office building fading toward center */}
          <rect x="350" y="380" width="45" height="120" rx="2" />
        </g>

        {/* Delicate Japanese Modern Accent Line (Rising Sun Arc / Urban Geometry) */}
        <circle cx="90" cy="180" r="70" stroke="#e11d48" strokeWidth="1" strokeDasharray="4 6" opacity="0.25" />
        <circle cx="90" cy="180" r="105" stroke="#f59e0b" strokeWidth="0.75" strokeDasharray="3 8" opacity="0.2" />
      </svg>
    </div>
  );
}

export function TokyoSkylineRight() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute right-0 top-2 bottom-0 w-[180px] md:w-[240px] lg:w-[300px] xl:w-[360px] hidden md:block z-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover object-right-bottom opacity-[0.22] hover:opacity-35 transition-opacity duration-700"
        preserveAspectRatio="xMaxYMax meet"
      >
        <defs>
          <linearGradient id="skylineGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#0284c7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="fadeToCenterRight" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="65%" stopColor="#334155" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#334155" stopOpacity="0" />
          </linearGradient>

          <pattern id="windowGridRight" width="8" height="12" patternUnits="userSpaceOnUse">
            <rect x="2" y="2" width="4" height="6" rx="0.5" fill="#ffffff" fillOpacity="0.75" />
          </pattern>
          
          <pattern id="denseWindowGridRight" width="6" height="8" patternUnits="userSpaceOnUse">
            <rect x="1.5" y="1.5" width="3" height="4" rx="0.5" fill="#ffffff" fillOpacity="0.8" />
          </pattern>
        </defs>

        {/* Background Layer: Distant Skyscrapers */}
        <g fill="url(#skylineGradRight)" opacity="0.35">
          <rect x="350" y="200" width="40" height="300" rx="1" />
          <rect x="290" y="170" width="50" height="330" rx="1" />
          <rect x="235" y="230" width="45" height="270" rx="1" />
          <rect x="175" y="210" width="50" height="290" rx="1" />
          <rect x="120" y="270" width="45" height="230" rx="1" />
          <rect x="70" y="310" width="40" height="190" rx="1" />
        </g>

        {/* Midground Layer: TOKYO SKYTREE (Right side landmark) */}
        <g fill="url(#skylineGradRight)" opacity="0.7">
          {/* Skytree Needle Spire */}
          <line x1="310" y1="30" x2="310" y2="105" stroke="currentColor" strokeWidth="2.5" className="text-teal-600" />
          <circle cx="310" cy="30" r="2.5" className="fill-teal-500 animate-ping" />
          <circle cx="310" cy="30" r="3" className="fill-teal-500" />

          {/* Tembo Galleria (Upper Observation Pod - 450m) */}
          <polygon points="304,105 316,105 318,125 302,125" />
          <rect x="300" y="125" width="20" height="10" rx="2" />

          {/* Column between decks */}
          <rect x="305" y="135" width="10" height="40" />

          {/* Tembo Deck (Main Observation Pod - 350m) */}
          <polygon points="296,175 324,175 328,205 292,205" />
          <rect x="294" y="205" width="32" height="15" rx="2" />

          {/* Triangular Lattice Tower Trunk narrowing then tapering */}
          <polygon points="302,220 318,220 338,420 326,420 310,270 294,420 282,420" />

          {/* Arch at base */}
          <path d="M 294,420 Q 310,360 326,420 Z" />

          {/* Skytree horizontal ring braces */}
          <line x1="301" y1="245" x2="319" y2="245" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
          <line x1="298" y1="275" x2="322" y2="275" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
          <line x1="294" y1="315" x2="326" y2="315" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
          <line x1="290" y1="355" x2="330" y2="355" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
        </g>

        {/* Foreground Layer: Shibuya & Marunouchi Skyscraper Monoliths */}
        <g fill="url(#fadeToCenterRight)">
          {/* Monolith Glass Tower 1 (Shibuya Scramble Square style) */}
          <rect x="330" y="190" width="65" height="310" rx="2" />
          <polygon points="330,190 375,160 395,170 395,190" />
          {/* Helipad & crown beacon */}
          <line x1="365" y1="140" x2="365" y2="165" stroke="#475569" strokeWidth="2" />
          <circle cx="365" cy="140" r="2" fill="#ef4444" />
          {/* Glass Facade Grid */}
          <rect x="338" y="210" width="50" height="230" fill="url(#denseWindowGridRight)" opacity="0.55" />

          {/* Modern Stepped Tower 2 (High-Tech Tokyo Office/Residence) */}
          <rect x="220" y="235" width="65" height="265" rx="2" />
          <rect x="232" y="210" width="42" height="25" rx="1" />
          <rect x="244" y="190" width="18" height="20" rx="1" />
          <line x1="253" y1="165" x2="253" y2="190" stroke="#475569" strokeWidth="2" />
          <rect x="228" y="250" width="50" height="180" fill="url(#windowGridRight)" opacity="0.6" />

          {/* Slanted Glass Facade Tower */}
          <polygon points="150,500 150,290 205,245 205,500" />
          <line x1="165" y1="295" x2="165" y2="480" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />
          <line x1="185" y1="275" x2="185" y2="480" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />

          {/* Urban Residential High-Rise with Balconies */}
          <rect x="90" y="325" width="52" height="175" rx="2" />
          <rect x="105" y="305" width="22" height="20" rx="1" />
          {/* Balcony lines */}
          <line x1="93" y1="345" x2="139" y2="345" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
          <line x1="93" y1="365" x2="139" y2="365" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
          <line x1="93" y1="385" x2="139" y2="385" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
          <line x1="93" y1="405" x2="139" y2="405" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
          <line x1="93" y1="425" x2="139" y2="425" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />

          {/* Low-rise urban building near center */}
          <rect x="40" y="375" width="42" height="125" rx="2" />
        </g>

        {/* Japanese Modern Aesthetic Accent Ring */}
        <circle cx="310" cy="180" r="75" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 6" opacity="0.25" />
        <circle cx="310" cy="180" r="110" stroke="#10b981" strokeWidth="0.75" strokeDasharray="3 8" opacity="0.2" />
      </svg>
    </div>
  );
}

export function TokyoSkylineBackdrop() {
  return (
    <>
      <TokyoSkylineLeft />
      <TokyoSkylineRight />
    </>
  );
}
