"use client";

import React, { useState, useId } from "react";
import { X, SlidersHorizontal, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    bathrooms?: string;
    propertyType?: string;
    amenities?: string;
    furnished?: string;
    parking?: string;
  };
  onApply: (newFilters: Record<string, string>) => void;
  onReset: () => void;
}

const AMENITY_OPTIONS = [
  { slug: "balcony", label: "Balcony / Terrace" },
  { slug: "central-ac", label: "Central Air Conditioning" },
  { slug: "pool", label: "Swimming Pool" },
  { slug: "gym", label: "Fitness Center / Gym" },
  { slug: "parking-garage", label: "Private Parking" },
  { slug: "pet-friendly", label: "Pet Friendly" },
  { slug: "in-unit-laundry", label: "In-unit Washer/Dryer" },
  { slug: "doorman", label: "24/7 Concierge / Doorman" },
  { slug: "private-garden", label: "Private Garden" },
  { slug: "elevator", label: "Elevator" },
  { slug: "ev-charger", label: "EV Charging" },
  { slug: "smart-home", label: "Smart Home Tech" },
];

export function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onApply,
  onReset,
}: FilterDrawerProps) {
  const [minPrice, setMinPrice] = useState(filters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || "");
  const [bedrooms, setBedrooms] = useState(filters.bedrooms || "");
  const [bathrooms, setBathrooms] = useState(filters.bathrooms || "");
  const [propertyType, setPropertyType] = useState(filters.propertyType || "");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    filters.amenities ? filters.amenities.split(",") : []
  );
  const [furnished, setFurnished] = useState(filters.furnished || "");
  const [parking, setParking] = useState(filters.parking || "");

  const minPriceInputId = useId();
  const maxPriceInputId = useId();

  if (!isOpen) return null;

  const toggleAmenity = (slug: string) => {
    if (selectedAmenities.includes(slug)) {
      setSelectedAmenities(selectedAmenities.filter((s) => s !== slug));
    } else {
      setSelectedAmenities([...selectedAmenities, slug]);
    }
  };

  const handleApply = () => {
    const newFilters: Record<string, string> = {};
    if (minPrice) newFilters.minPrice = minPrice;
    if (maxPrice) newFilters.maxPrice = maxPrice;
    if (bedrooms) newFilters.bedrooms = bedrooms;
    if (bathrooms) newFilters.bathrooms = bathrooms;
    if (propertyType) newFilters.propertyType = propertyType;
    if (selectedAmenities.length > 0) newFilters.amenities = selectedAmenities.join(",");
    if (furnished) newFilters.furnished = furnished;
    if (parking) newFilters.parking = parking;

    onApply(newFilters);
    onClose();
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setBathrooms("");
    setPropertyType("");
    setSelectedAmenities([]);
    setFurnished("");
    setParking("");
    onReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl z-10">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-brand-700" />
            <h3 className="text-base font-bold text-slate-900">Advanced Filters</h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Price Range */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Price Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={minPriceInputId} className="text-[11px] text-slate-400 mb-1 block">Minimum</label>
                <input
                  id={minPriceInputId}
                  type="number"
                  placeholder="No Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold focus:border-brand-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={maxPriceInputId} className="text-[11px] text-slate-400 mb-1 block">Maximum</label>
                <input
                  id={maxPriceInputId}
                  type="number"
                  placeholder="No Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Bedrooms
            </label>
            <div className="flex flex-wrap gap-2">
              {["", "0", "1", "2", "3", "4"].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBedrooms(b)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-semibold border transition-all ${
                    bedrooms === b
                      ? "border-brand-600 bg-brand-50 text-brand-700"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {b === "" ? "Any" : b === "0" ? "Studio" : `${b}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Bathrooms
            </label>
            <div className="flex flex-wrap gap-2">
              {["", "1", "2", "3", "4"].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBathrooms(b)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-semibold border transition-all ${
                    bathrooms === b
                      ? "border-brand-600 bg-brand-50 text-brand-700"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {b === "" ? "Any" : `${b}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Property Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { type: "", label: "All Types" },
                { type: "APARTMENT", label: "Apartment" },
                { type: "CONDO", label: "Condominium" },
                { type: "HOUSE", label: "House" },
                { type: "TOWNHOUSE", label: "Townhouse" },
                { type: "VILLA", label: "Villa" },
                { type: "STUDIO", label: "Studio" },
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setPropertyType(item.type)}
                  className={`rounded-xl p-2 text-xs font-semibold border text-left transition-all ${
                    propertyType === item.type
                      ? "border-brand-600 bg-brand-50 text-brand-700 font-bold"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities Checklist */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Must-Have Amenities
            </label>
            <div className="grid grid-cols-1 gap-2">
              {AMENITY_OPTIONS.map((a) => {
                const isChecked = selectedAmenities.includes(a.slug);
                return (
                  <label
                    key={a.slug}
                    onClick={() => toggleAmenity(a.slug)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-700 select-none"
                  >
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                        isChecked
                          ? "bg-brand-600 border-brand-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                    <span>{a.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Furnished & Parking toggles */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Furnished</label>
              <select
                value={furnished}
                onChange={(e) => setFurnished(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2 text-xs font-semibold focus:border-brand-500 focus:outline-none"
              >
                <option value="">Any</option>
                <option value="true">Must be Furnished</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Parking</label>
              <select
                value={parking}
                onChange={(e) => setParking(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2 text-xs font-semibold focus:border-brand-500 focus:outline-none"
              >
                <option value="">Any</option>
                <option value="true">Dedicated Parking</option>
              </select>
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="border-t border-slate-100 p-4 bg-slate-50 flex items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-slate-500">
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Reset All
          </Button>
          <Button variant="primary" size="md" onClick={handleApply} className="flex-1">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
