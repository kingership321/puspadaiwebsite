"use client";

import React, { useState } from "react";
import { PropertyImageDto } from "@/types";
import { Grid, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface PropertyGalleryProps {
  images: PropertyImageDto[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const displayImages = images.length > 0 ? images : [
    { id: "default-1", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80", alt: title, sortOrder: 0, isMain: true }
  ];

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);

  const nextImage = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % displayImages.length);
  };

  const prevImage = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <div className="relative">
      {/* Desktop Grid Layout (1 large + 4 small) */}
      <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-3 h-[480px] rounded-3xl overflow-hidden shadow-sm">
        {/* Main large image */}
        <div
          onClick={() => openLightbox(0)}
          className="col-span-2 row-span-2 relative cursor-pointer group overflow-hidden bg-slate-100"
        >
          <img
            src={displayImages[0]?.url}
            alt={displayImages[0]?.alt || title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>

        {/* 4 secondary images */}
        {displayImages.slice(1, 5).map((img, idx) => (
          <div
            key={img.id || idx}
            onClick={() => openLightbox(idx + 1)}
            className="relative cursor-pointer group overflow-hidden bg-slate-100"
          >
            <img
              src={img.url}
              alt={img.alt || `${title} photo ${idx + 2}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        ))}

        {/* View All Photos Button */}
        <button
          onClick={() => openLightbox(0)}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2 text-xs font-bold text-slate-800 shadow-lg backdrop-blur-md hover:bg-white hover:scale-105 transition-all"
        >
          <Grid className="h-4 w-4" />
          <span>View all {displayImages.length} photos</span>
        </button>
      </div>

      {/* Mobile Single Hero Carousel */}
      <div className="relative md:hidden aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100">
        <img
          src={displayImages[0]?.url}
          alt={title}
          onClick={() => openLightbox(0)}
          className="h-full w-full object-cover"
        />
        <button
          onClick={() => openLightbox(0)}
          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm"
        >
          <Grid className="h-3.5 w-3.5" />
          <span>1 / {displayImages.length}</span>
        </button>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in">
          {/* Header controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-50">
            <span className="text-sm font-semibold tracking-wide">
              {lightboxIdx + 1} of {displayImages.length} — {title}
            </span>
            <button
              onClick={closeLightbox}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-40"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-40"
            aria-label="Next photo"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Main Photo View */}
          <div className="max-h-[85vh] max-w-[90vw] p-4">
            <img
              src={displayImages[lightboxIdx]?.url}
              alt={displayImages[lightboxIdx]?.alt || title}
              className="max-h-[80vh] max-w-full rounded-xl object-contain mx-auto shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
