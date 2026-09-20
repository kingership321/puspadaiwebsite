"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Upload,
  CheckCircle2,
  Sparkles,
  MapPin,
  DollarSign,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CityOption {
  id: string;
  name: string;
  areas: { id: string; name: string }[];
}

export default function NewListingPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [listingType, setListingType] = useState<"RENT" | "SALE">("RENT");
  const [propertyType, setPropertyType] = useState("APARTMENT");
  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [bedrooms, setBedrooms] = useState("2");
  const [bathrooms, setBathrooms] = useState("2");
  const [area, setArea] = useState("1100");
  const [address, setAddress] = useState("");
  const [furnished, setFurnished] = useState(false);
  const [parking, setParking] = useState(true);

  const [cities, setCities] = useState<CityOption[]>([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState("");

  const [imageUrls, setImageUrls] = useState<string[]>([
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&auto=format&fit=crop&q=80",
  ]);
  const [newImageUrl, setNewImageUrl] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cities for dropdown
  useEffect(() => {
    // Default fallback metropolises
    const fallbackCities: CityOption[] = [
      {
        id: "city-ny",
        name: "New York",
        areas: [
          { id: "area-tribeca", name: "Tribeca" },
          { id: "area-west-village", name: "West Village" },
          { id: "area-dumbo", name: "DUMBO" },
        ],
      },
      {
        id: "city-london",
        name: "London",
        areas: [
          { id: "area-kensington", name: "Kensington" },
          { id: "area-marylebone", name: "Marylebone" },
        ],
      },
      {
        id: "city-seattle",
        name: "Seattle",
        areas: [
          { id: "area-capitol-hill", name: "Capitol Hill" },
          { id: "area-ballard", name: "Ballard" },
        ],
      },
    ];

    fetch("/api/search")
      .then((r) => r.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const map = new Map<string, CityOption>();
          data.results.forEach((p: any) => {
            if (p.city && !map.has(p.city.id)) {
              map.set(p.city.id, {
                id: p.city.id,
                name: p.city.name,
                areas: p.area ? [{ id: p.area.id, name: p.area.name }] : [],
              });
            } else if (p.city && p.area) {
              const c = map.get(p.city.id)!;
              if (!c.areas.some((a) => a.id === p.area.id)) {
                c.areas.push({ id: p.area.id, name: p.area.name });
              }
            }
          });
          const list = Array.from(map.values());
          if (list.length > 0) {
            setCities(list);
            setSelectedCityId(list[0].id);
            if (list[0].areas.length > 0) setSelectedAreaId(list[0].areas[0].id);
            return;
          }
        }
        setCities(fallbackCities);
        setSelectedCityId(fallbackCities[0].id);
        setSelectedAreaId(fallbackCities[0].areas[0].id);
      })
      .catch(() => {
        setCities(fallbackCities);
        setSelectedCityId(fallbackCities[0].id);
        setSelectedAreaId(fallbackCities[0].areas[0].id);
      });
  }, []);

  const handleCityChange = (cityId: string) => {
    setSelectedCityId(cityId);
    const found = cities.find((c) => c.id === cityId);
    if (found && found.areas.length > 0) {
      setSelectedAreaId(found.areas[0].id);
    }
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImageUrls([...imageUrls, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (idx: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/dashboard/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          listingType,
          propertyType,
          price,
          deposit: deposit || undefined,
          bedrooms,
          bathrooms,
          area,
          address,
          cityId: selectedCityId,
          areaId: selectedAreaId,
          furnished,
          parking,
          imageUrls,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit property listing.");
      }

      router.push(`/property/${data.property.slug}`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeAreas = cities.find((c) => c.id === selectedCityId)?.areas || [];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Publish New Listing</h1>
            <p className="text-xs text-slate-500">
              Submit a residential property for public search indexing.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs font-semibold text-rose-700">
          {error}
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-8">
        {/* Step 1: Basic Classification */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            1. Classification & Title
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Listing Mode</label>
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setListingType("RENT")}
                  className={`rounded-lg py-2 text-xs font-bold transition-all ${
                    listingType === "RENT" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  For Rent
                </button>
                <button
                  type="button"
                  onClick={() => setListingType("SALE")}
                  className={`rounded-lg py-2 text-xs font-bold transition-all ${
                    listingType === "SALE" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  For Sale
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Property Style</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
              >
                <option value="APARTMENT">Apartment</option>
                <option value="CONDO">Condominium</option>
                <option value="HOUSE">Single-Family House</option>
                <option value="TOWNHOUSE">Townhouse</option>
                <option value="VILLA">Luxury Villa</option>
                <option value="STUDIO">Studio</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Listing Headline Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Designer Triplex with Panoramic Skyline Balcony"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Property Description</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide architectural highlights, renovation details, European appliances, and views..."
              className="w-full rounded-xl border border-slate-200 p-3 text-xs font-medium focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Step 2: Pricing & Location */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            2. Pricing & Address
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {listingType === "RENT" ? "Monthly Rent ($)" : "Asking Price ($)"}
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 4500"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Security Deposit ($)</label>
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                placeholder="Optional"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Metropolis City</label>
              <select
                value={selectedCityId}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
              >
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Neighborhood / District</label>
              <select
                value={selectedAreaId}
                onChange={(e) => setSelectedAreaId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
              >
                {activeAreas.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Street Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 450 West Broadway, Unit 4B"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Step 3: Facts */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            3. Property Facts
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Bedrooms</label>
              <input
                type="number"
                min="0"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Bathrooms</label>
              <input
                type="number"
                step="0.5"
                min="1"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Area (sq ft)</label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={furnished}
                onChange={(e) => setFurnished(e.target.checked)}
                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 h-4 w-4"
              />
              <span>Designer Furnished</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={parking}
                onChange={(e) => setParking(e.target.checked)}
                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 h-4 w-4"
              />
              <span>Dedicated Parking Included</span>
            </label>
          </div>
        </div>

        {/* Step 4: High Resolution Images */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            4. Gallery Photography ({imageUrls.length} Photos)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {imageUrls.map((url, idx) => (
              <div key={idx} className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-slate-100">
                <img src={url} alt={`Listing photo ${idx + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-white shadow opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove photo"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Paste image URL (Unsplash or CDN)..."
              className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-brand-500 focus:outline-none"
            />
            <Button type="button" variant="secondary" size="sm" onClick={handleAddImage}>
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add Photo
            </Button>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <Link href="/dashboard" className="text-xs font-semibold text-slate-500 hover:text-slate-900 px-3">
            Cancel
          </Link>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="px-8 shadow-lg shadow-brand-700/20"
          >
            Submit Listing for Indexing
          </Button>
        </div>
      </form>
    </div>
  );
}
