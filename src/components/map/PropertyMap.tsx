"use client";

import React, { useEffect, useRef, useState } from "react";
import { PropertyDto } from "@/types";
import { formatJapanesePrice } from "@/lib/utils";
import { Plus, Minus, Navigation, Layers, Compass } from "lucide-react";

interface PropertyMapProps {
  properties: PropertyDto[];
  selectedPropertyId?: string | null;
  onSelectProperty?: (property: PropertyDto | null) => void;
  onSearchThisArea?: (bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number }) => void;
  className?: string;
}

const METROPOLIS_PRESETS = [
  { name: "東京", nameEn: "Tokyo", lat: 35.6762, lng: 139.6503, zoom: 12 },
  { name: "大阪", nameEn: "Osaka", lat: 34.6937, lng: 135.5023, zoom: 13 },
  { name: "京都", nameEn: "Kyoto", lat: 35.0116, lng: 135.7681, zoom: 13 },
  { name: "横浜", nameEn: "Yokohama", lat: 35.4437, lng: 139.6380, zoom: 13 },
  { name: "福岡", nameEn: "Fukuoka", lat: 33.5904, lng: 130.4017, zoom: 13 },
];

export function PropertyMap({
  properties,
  selectedPropertyId,
  onSelectProperty,
  onSearchThisArea,
  className = "",
}: PropertyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const [mapReady, setMapReady] = useState(false);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    async function initMap() {
      const L = (await import("leaflet")).default;

      if (!mapContainerRef.current || mapInstanceRef.current) return;

      // Determine initial center
      const validProps = properties.filter((p) => p.latitude && p.longitude);
      const initialLat = validProps.length > 0 ? validProps[0].latitude : 35.6762;
      const initialLng = validProps.length > 0 ? validProps[0].longitude : 139.6503;

      // Initialize map instance
      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
      });

      // CartoDB Voyager Tile Layer (Modern, crisp, includes English and Japanese labels)
      const tileLayer = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      // Attribution
      L.control
        .attribution({ position: "bottomright", prefix: false })
        .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OSM</a> &copy; <a href="https://carto.com/" target="_blank" rel="noopener">CARTO</a>')
        .addTo(map);

      mapInstanceRef.current = map;
      if (isMounted) setMapReady(true);

      // Handle map drag/zoom for search this area
      map.on("moveend", () => {
        if (onSearchThisArea) {
          const bounds = map.getBounds();
          onSearchThisArea({
            minLat: bounds.getSouth(),
            maxLat: bounds.getNorth(),
            minLng: bounds.getWest(),
            maxLng: bounds.getEast(),
          });
        }
      });
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers whenever properties or selection changes
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;

    async function renderMarkers() {
      const L = (await import("leaflet")).default;
      const map = mapInstanceRef.current;

      // Remove existing markers
      Object.values(markersRef.current).forEach((marker: any) => marker.remove());
      markersRef.current = {};

      const validProps = properties.filter((p) => p.latitude && p.longitude);
      if (validProps.length === 0) return;

      const bounds = L.latLngBounds([]);

      validProps.forEach((prop) => {
        const isSelected = prop.id === selectedPropertyId;
        const priceStr = formatJapanesePrice(prop.price, prop.listingType === "RENT", "ja");
        const latLng = L.latLng(prop.latitude, prop.longitude);
        bounds.extend(latLng);

        // Custom HTML Marker with Japanese Real Estate badge design
        const customIcon = L.divIcon({
          className: "custom-property-pin",
          html: `
            <div style="position: relative; display: inline-block; cursor: pointer; transform: translate(-50%, -100%);">
              <div style="
                background: ${isSelected ? "#15803d" : "#ffffff"};
                color: ${isSelected ? "#ffffff" : "#166534"};
                border: 2px solid ${isSelected ? "#14532d" : "#15803d"};
                padding: 4px 8px;
                border-radius: 9999px;
                font-size: 11px;
                font-weight: 800;
                white-space: nowrap;
                box-shadow: 0 4px 12px rgba(0,0,0,0.18);
                display: flex;
                align-items: center;
                gap: 4px;
                transition: all 0.15s ease;
                transform: ${isSelected ? "scale(1.15)" : "scale(1)"};
                z-index: ${isSelected ? 100 : 10};
              ">
                <span>${priceStr}</span>
              </div>
              <div style="
                width: 8px;
                height: 8px;
                background: ${isSelected ? "#15803d" : "#ffffff"};
                border-right: 2px solid ${isSelected ? "#14532d" : "#15803d"};
                border-bottom: 2px solid ${isSelected ? "#14532d" : "#15803d"};
                transform: rotate(45deg);
                margin: -4px auto 0;
              "></div>
            </div>
          `,
          iconSize: [0, 0],
        });

        const marker = L.marker(latLng, { icon: customIcon }).addTo(map);

        // Rich Popup Card
        const imageUrl = prop.images?.[0]?.url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80";
        const stationText = prop.stationName ? `${prop.stationLine || ""} ${prop.stationName}駅 徒歩${prop.walkMinutes || 5}分` : "";

        const popupContent = `
          <div style="width: 240px; font-family: sans-serif;">
            <div style="height: 120px; overflow: hidden; position: relative;">
              <img src="${imageUrl}" style="width: 100%; height: 100%; object-fit: cover;" alt="${prop.titleJa || prop.title}" />
              <div style="position: absolute; top: 8px; left: 8px; background: rgba(0,0,0,0.7); color: #fff; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px;">
                ${prop.propertyType}
              </div>
            </div>
            <div style="padding: 10px 12px;">
              <div style="font-size: 15px; font-weight: 900; color: #15803d; margin-bottom: 2px;">
                ${priceStr}
              </div>
              <div style="font-size: 12px; font-weight: bold; color: #0f172a; line-height: 1.3; margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                ${prop.titleJa || prop.title}
              </div>
              ${stationText ? `<div style="font-size: 11px; color: #475569; margin-bottom: 4px;">🚉 ${stationText}</div>` : ""}
              <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">
                ${prop.layout || "1LDK"} • ${prop.area}㎡
              </div>
              <a href="/property/${prop.slug}" style="
                display: block;
                text-align: center;
                background: #15803d;
                color: #ffffff;
                font-size: 11px;
                font-weight: bold;
                padding: 6px 0;
                border-radius: 6px;
                text-decoration: none;
              ">
                物件詳細を見る
              </a>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 260 });

        marker.on("click", () => {
          if (onSelectProperty) onSelectProperty(prop);
        });

        markersRef.current[prop.id] = marker;
      });

      // Fit bounds if we have multiple points and no specific property is selected
      if (!selectedPropertyId && validProps.length > 0) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
      }
    }

    renderMarkers();
  }, [properties, selectedPropertyId, mapReady]);

  // Pan to selected property when selection changes
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !selectedPropertyId) return;
    const marker = markersRef.current[selectedPropertyId];
    if (marker) {
      const latLng = marker.getLatLng();
      mapInstanceRef.current.setView(latLng, Math.max(mapInstanceRef.current.getZoom(), 14), {
        animate: true,
      });
      marker.openPopup();
    }
  }, [selectedPropertyId, mapReady]);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleCityJump = (city: typeof METROPOLIS_PRESETS[0]) => {
    if (mapInstanceRef.current) {
      setActiveCity(city.nameEn);
      mapInstanceRef.current.flyTo([city.lat, city.lng], city.zoom, {
        duration: 1.2,
      });
    }
  };

  const handleResetBounds = () => {
    if (!mapInstanceRef.current) return;
    const validProps = properties.filter((p) => p.latitude && p.longitude);
    if (validProps.length === 0) {
      mapInstanceRef.current.setView([35.6762, 139.6503], 12);
      return;
    }
    const L = (window as any).L;
    if (L) {
      const bounds = L.latLngBounds(validProps.map((p) => [p.latitude, p.longitude]));
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  };

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm ${className}`}>
      {/* Map Container */}
      <div ref={mapContainerRef} className="h-full w-full bg-slate-100 z-0" />

      {/* Top Quick City Jump Bar */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-xl bg-white/95 p-1.5 shadow-md backdrop-blur-md border border-slate-200/80">
        <span className="px-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          エリア
        </span>
        {METROPOLIS_PRESETS.map((city) => (
          <button
            key={city.nameEn}
            type="button"
            onClick={() => handleCityJump(city)}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-colors ${
              activeCity === city.nameEn
                ? "bg-emerald-700 text-white shadow-2xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>

      {/* Floating Zoom & Location Controls */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
        <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md border border-slate-200">
          <button
            type="button"
            onClick={handleZoomIn}
            className="flex h-9 w-9 items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors border-b border-slate-100"
            title="拡大 (Zoom In)"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="flex h-9 w-9 items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
            title="縮小 (Zoom Out)"
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleResetBounds}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-700 shadow-md border border-slate-200 hover:bg-slate-100 transition-colors"
          title="全物件を表示 (Fit All Listings)"
        >
          <Compass className="h-4 w-4 text-emerald-700" />
        </button>
      </div>

      {/* Bottom Listing Counter Tag */}
      <div className="absolute bottom-3 left-3 z-10 rounded-lg bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur-sm">
        表示中: <span className="font-bold text-emerald-400">{properties.length}件</span> の物件
      </div>
    </div>
  );
}
