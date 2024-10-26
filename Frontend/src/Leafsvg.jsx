import React from 'react';

const AgriSmartLogo = () => {
  return (
    <svg viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Main Text Group */}
      <g transform="translate(20, 50)" filter="url(#softGlow)">
        {/* AgriSmart Text */}
        <text
          className="text-4xl font-bold"
          fill="white"
          opacity="0.95"
        >
          Agri
          <tspan dx="5">Smart</tspan>
        </text>
      </g>
    </svg>
  );
};

export default AgriSmartLogo;