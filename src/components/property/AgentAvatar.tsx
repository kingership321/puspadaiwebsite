"use client";

import React, { useState } from "react";

const RELIABLE_AGENT_PORTRAITS = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
];

interface AgentAvatarProps {
  src?: string | null;
  alt: string;
  className?: string;
}

export function AgentAvatar({ src, alt, className = "" }: AgentAvatarProps) {
  const [hasError, setHasError] = useState(false);

  // If initial src is missing or an invalid placeholder, use a verified photo
  const isInvalidPlaceholder = !src || src.includes("photo-1500000000000") || src.includes("photo-150000");
  const effectiveSrc = isInvalidPlaceholder || hasError ? RELIABLE_AGENT_PORTRAITS[0] : src;

  return (
    <img
      src={effectiveSrc}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
}
