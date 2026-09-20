"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PropertyDto } from "@/types";
import { formatCurrency, formatPriceCompact } from "@/lib/utils";
import { MapPin, Plus, Minus, Compass, X, Bed, Bath, Sparkles, Navigation } from "lucide-react";

interface PropertyMapProps {
  properties: PropertyDto[];
  selectedPropertyId?: string | null;
  onSelectProperty?: (property: PropertyDto | null) => void;
  onSearchThisArea?: (bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number }) => void;
  className?: string;
}

export function PropertyMap({
  properties,
  selectedPropertyId,
  onSelectProperty,
  onSearchThisArea,
  className = "",
}: PropertyMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<PropertyDto | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const startDragRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (selectedPropertyId) {
      const found = properties.find((p) => p.id === selectedPropertyId);
      if (found) setSelectedProperty(found);
    }
  }, [selectedPropertyId, properties]);

  // Compute bounding box of properties to center
  const lats = properties.map((p) => p.latitude);
  const lngs = properties.map((p) => p.longitude);

  const minLat = lats.length > 0 ? Math.min(...lats) : 40.7128;
  const maxLat = lats.length > 0 ? Math.max(...lats) : 40.7828;
  const minLng = lngs.length > 0 ? Math.min(...lngs) : -74.0060;
  const maxLng = lngs.length > 0 ? Math.max(...lngs) : -73.9560;

  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;
  const spanLat = Math.max(maxLat - minLat, 0.04);
  const spanLng = Math.max(maxLng - minLng, 0.04);

  // Convert lat/lng to container % coordinates
  const getCoordinates = (lat: number, lng: number) => {
    const x = ((lng - (centerLng - spanLng * 0.6)) / (spanLng * 1.2)) * 100;
    const y = (((centerLat + spanLat * 0.6) - lat) / (spanLat * 1.2)) * 100;
    return {
      x: Math.max(8, Math.min(92, x)),
      y: Math.max(8, Math.min(92, y)),
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    startDragRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    const newX = e.clientX - startDragRef.current.x;
    const newY = e.clientY - startDragRef.current.y;
    setPanOffset({ x: newX, y: newY });
    setHasMoved(true);
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
    setHasMoved(true);
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
    setHasMoved(true);
  };

  const handleResetMap = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setHasMoved(false);
  };

  const handleSearchAreaClick = () => {
    setHasMoved(false);
    if (onSearchThisArea) {
      onSearchThisArea({
        minLat: centerLat - spanLat * 0.5,
        maxLat: centerLat + spanLat * 0.5,
        minLng: centerLng - spanLng * 0.5,
        maxLng: centerLng + spanLng * 0.5,
      });
    }
  };

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-[#e5eef4] select-none ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Stylized Modern Map Canvas / Grid Graphic */}
      <div
        className="absolute inset-0 transition-transform duration-75 cursor-grab active:cursor-grabbing"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          transformOrigin: "center center",
        }}
      >
        {/* Background vector stylized roads and waterways */}
        <svg className="h-full w-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            </pattern>
            <pattern id="roadGrid" width="160" height="160" patternUnits="userSpaceOnUse">
              <path d="M 160 0 L 0 0 0 160" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#f1f5f9" />
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#roadGrid)" />
          {/* Waterway curves */}
          <path
            d="M -100,200 Q 250,150 450,300 T 900,450"
            fill="none"
            stroke="#bae6fd"
            strokeWidth="48"
            strokeLinecap="round"
          />
          <path
            d="M 150,-50 Q 300,200 650,250 T 1200,600"
            fill="none"
            stroke="#e0f2fe"
            strokeWidth="32"
          />
        </svg>

        {/* Property Price Markers */}
        {properties.map((property) => {
          const { x, y } = getCoordinates(property.latitude, property.longitude);
          const isSelected = selectedProperty?.id === property.id;

          return (
            <div
              key={property.id}
              style={{ top: `${y}%`, left: `${x}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProperty(property);
                if (onSelectProperty) onSelectProperty(property);
              }}
            >
              <button
                className={`price-marker flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black shadow-md border transition-all ${
                  isSelected
                    ? "bg-slate-950 text-white border-slate-950 scale-110 ring-4 ring-brand-500/30 z-30"
                    : "bg-white text-slate-900 border-slate-300/80 hover:border-brand-600 hover:text-brand-700 hover:scale-105"
                }`}
              >
                <span>{formatPriceCompact(property.price, property.currency)}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* "Search this area" Button (Top Center) */}
      {hasMoved && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 animate-fade-in">
          <button
            onClick={handleSearchAreaClick}
            className="flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-2 text-xs font-bold text-white shadow-xl backdrop-blur-md hover:bg-slate-950 transition-transform active:scale-95"
          >
            <Compass className="h-3.5 w-3.5 text-brand-400 animate-spin" />
            <span>Search this area</span>
          </button>
        </div>
      )}

      {/* Map Floating Controls (Top Right) */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-1 rounded-xl bg-white/95 p-1 shadow-lg border border-slate-200/80 backdrop-blur-md">
        <button
          onClick={handleZoomIn}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          title="Zoom In"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          title="Zoom Out"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          onClick={handleResetMap}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          title="Recenter Map"
        >
          <Navigation className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Selected Property Preview Card Overlay (Bottom Left) */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 z-30 animate-fade-in">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 z-10"
              aria-label="Close preview"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <div className="flex gap-3">
              <img
                src={selectedProperty.images?.[0]?.url || ""}
                alt={selectedProperty.title}
                className="h-20 w-20 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0 pr-4">
                <span className="text-base font-black text-slate-900">
                  {formatCurrency(selectedProperty.price, selectedProperty.currency)}
                  {selectedProperty.listingType === "RENT" && <span className="text-xs font-semibold text-slate-500">/mo</span>}
                </span>
                <p className="text-xs font-bold text-slate-800 truncate mt-0.5">{selectedProperty.title}</p>
                <p className="text-[11px] text-slate-500 truncate">{selectedProperty.address}</p>

                <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                  <span>{selectedProperty.bedrooms} bd</span>
                  <span>•</span>
                  <span>{selectedProperty.bathrooms} ba</span>
                  <span>•</span>
                  <span>{selectedProperty.area} sqft</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                {selectedProperty.propertyType}
              </span>
              <Link
                href={`/property/${selectedProperty.slug}`}
                className="font-bold text-slate-900 hover:text-brand-700 hover:underline"
              >
                Full Details →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
