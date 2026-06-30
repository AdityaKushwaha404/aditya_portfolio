import React, { useRef, useState } from "react";
import { cn } from "../../../lib/utils";

export const GlareCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  // Calculate tilt rotate angles based on coords
  const getTiltStyle = () => {
    if (!isHovered || !containerRef.current) return {};
    const rect = containerRef.current.getBoundingClientRect();
    const rotateX = ((coords.y / rect.height) - 0.5) * -12; // Max 12 deg tilt
    const rotateY = ((coords.x / rect.width) - 0.5) * 12;

    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out, box-shadow 0.2s ease-out",
    };
  };

  const getGlareStyle = () => {
    if (!isHovered) return { opacity: 0 };
    return {
      opacity: 0.15,
      background: `radial-gradient(circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.8) 0%, transparent 60%)`,
    };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={getTiltStyle()}
      className={cn(
        "relative rounded-2xl overflow-hidden transition-all duration-300",
        className
      )}
    >
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
      {/* Dynamic reflective glare element */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
        style={getGlareStyle()}
      />
    </div>
  );
};
