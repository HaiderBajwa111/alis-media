import React from "react";
import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const sizeMap = {
    sm: 32,
    md: 48, 
    lg: 64
  };

  return (
    <div className={`flex items-center ${className}`}>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <HorizontalLogo size={sizeMap[size]} />
      </motion.div>
    </div>
  );
}

// Logo Components - Always dark theme since we force dark mode
function HorizontalLogo({ size }: { size: number }) {
  const textSize = size === 32 ? 'text-sm' : size === 48 ? 'text-lg' : 'text-xl';
  
  return (
    <div className="flex items-center gap-3">
      <AliaseLogoIcon size={size} />
      <div className="flex items-center gap-2 leading-none">
        <span className={`${textSize} font-bold tracking-tight text-primary`}>
          ALIASE
        </span>
        <span className={`${textSize} font-bold tracking-tight text-foreground`}>
          MEDIA
        </span>
      </div>
    </div>
  );
}

function AliaseLogoIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1080 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <defs>
        <style>
          {`
            .cls-1 { fill: #fff; }
            .cls-2 { fill: #ef4444; }
            .cls-3 { fill: #0f0f0f; }
          `}
        </style>
      </defs>
      <g>
        <rect className="cls-3" width="1080" height="1080"/>
        <g>
          <polygon className="cls-1" points="215.53 755.37 559.72 153.87 719.84 580.23 864.47 581.16 786.52 716.4 439.51 716.4 516.52 580.23 562.07 580.23 524.97 484.9 370.49 755.37 215.53 755.37"/>
          <polygon className="cls-2" points="629.84 755.37 671.79 871.67 850.85 926.13 785.74 755.37 629.84 755.37"/>
        </g>
      </g>
    </svg>
  );
}

function LogoIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#f87171" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
      
      <path
        d="M20 2 L35 20 L20 38 L5 20 Z"
        fill="url(#growthGradient)"
        opacity="0.08"
      />
      
      <circle cx="20" cy="20" r="3.5" fill="url(#growthGradient)" />
      
      <path
        d="M20 7 L20 13 M13 20 L7 20 M20 33 L20 27 M27 20 L33 20"
        stroke="url(#growthGradient)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      
      <circle cx="20" cy="7" r="2.2" fill="url(#accentGradient)" />
      <circle cx="7" cy="20" r="2.2" fill="url(#accentGradient)" />
      <circle cx="33" cy="20" r="2.2" fill="url(#accentGradient)" />
      <circle cx="20" cy="33" r="2.2" fill="url(#accentGradient)" />
      
      <circle 
        cx="20" 
        cy="20" 
        r="18.5" 
        fill="none" 
        stroke="url(#growthGradient)" 
        strokeWidth="0.6"
        opacity="0.25"
      />
    </svg>
  );
}