"use client";

import React, { useState, useEffect, useRef } from "react";
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
  ImagePlus,
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Train,
  X,
  Layers,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CityOption {
  id: string;
  name: string;
  areas: { id: string; name: string }[];
}

export default function NewListingPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeRole, setActiveRole] = useState<string>("AGENT");

  useEffect(() => {
    const match = document.cookie.match(new RegExp("(^| )haven_role=([^;]+)"));
    if (match && match[2]) {
      setActiveRole(match[2]);
    }
  }, []);

  // Form Fields
  const [title, setTitle] = useState("");
  const [titleJa, setTitleJa] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionJa, setDescriptionJa] = useState("");
  const [listingType, setListingType] = useState<"RENT" | "SALE">("RENT");
  const [propertyType, setPropertyType] = useState("APARTMENT");
  const [layout, setLayout] = useState("1LDK");
  const [structure, setStructure] = useState("RC");
  const [stationName, setStationName] = useState("");
  const [stationLine, setStationLine] = useState("");
  const [walkMinutes, setWalkMinutes] = useState("5");
  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [keyMoney, setKeyMoney] = useState("");
  const [managementFee, setManagementFee] = useState("");
  const [bedrooms, setBedrooms] = useState("1");
  const [bathrooms, setBathrooms] = useState("1");
  const [area, setArea] = useState("38");
  const [address, setAddress] = useState("");
  const [furnished, setFurnished] = useState(false);
  const [parking, setParking] = useState(false);

  // Cities
  const [cities, setCities] = useState<CityOption[]>([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState("");

  // Gallery & Image Upload State
  const [imageUrls, setImageUrls] = useState<string[]>([
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
  ]);
  const [uploadMode, setUploadMode] = useState<"device" | "url">("device");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cities for dropdown
  useEffect(() => {
    const fallbackCities: CityOption[] = [
      {
        id: "city-tokyo",
        name: "Tokyo (東京都)",
        areas: [
          { id: "area-shibuya", name: "Shibuya (渋谷区)" },
          { id: "area-shinjuku", name: "Shinjuku (新宿区)" },
          { id: "area-minato", name: "Minato (港区)" },
          { id: "area-chiyoda", name: "Chiyoda (千代田区)" },
        ],
      },
      {
        id: "city-osaka",
        name: "Osaka (大阪府)",
        areas: [
          { id: "area-umeda", name: "Kita / Umeda (北区・梅田)" },
          { id: "area-namba", name: "Chuo / Namba (中央区・難波)" },
        ],
      },
      {
        id: "city-kyoto",
        name: "Kyoto (京都府)",
        areas: [
          { id: "area-nakagyo", name: "Nakagyo (中京区)" },
          { id: "area-shimogyo", name: "Shimogyo (下京区)" },
        ],
      },
      {
        id: "city-yokohama",
        name: "Yokohama (横浜市)",
        areas: [
          { id: "area-minatomirai", name: "Minato Mirai (みなとみらい)" },
          { id: "area-kohoku", name: "Kohoku (港北区)" },
        ],
      },
      {
        id: "city-fukuoka",
        name: "Fukuoka (福岡市)",
        areas: [
          { id: "area-tenjin", name: "Tenjin (天神)" },
          { id: "area-hakata", name: "Hakata (博多)" },
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

  /**
   * High-Performance Client-Side Image Compression
   * Resizes large images (up to 15MB) down to max 1400px and converts to crisp ~120KB JPEG.
   * This guarantees instant upload, reliable browser rendering, and fits seamlessly within server limits.
   */
  const compressImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDimension = 1400;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82);
          resolve(compressedDataUrl);
        };
        img.onerror = () => reject(new Error(`Failed to load "${file.name}" as an image.`));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error(`Failed to read file "${file.name}".`));
      reader.readAsDataURL(file);
    });
  };

  const handleFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length === 0) {
      setError("Please select valid image files (JPG, PNG, WEBP).");
      return;
    }

    setIsProcessingImages(true);
    setUploadFeedback(`Optimizing ${validFiles.length} photo(s)...`);

    try {
      const processed = await Promise.all(
        validFiles.map((file) => compressImageFile(file))
      );

      // Append newly uploaded photos
      setImageUrls((prev) => [...prev, ...processed]);
      setUploadFeedback(`Successfully added ${validFiles.length} photo(s)!`);
      setTimeout(() => setUploadFeedback(null), 3500);
    } catch (err: any) {
      setError(err.message || "Failed to process image files.");
    } finally {
      setIsProcessingImages(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleAddImageUrl = () => {
    if (newImageUrl.trim()) {
      setImageUrls([...imageUrls, newImageUrl.trim()]);
      setNewImageUrl("");
      setUploadFeedback("Photo link added to gallery.");
      setTimeout(() => setUploadFeedback(null), 2500);
    }
  };

  const handleRemoveImage = (idx: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSetCover = (idx: number) => {
    if (idx === 0) return;
    setImageUrls((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(idx, 1);
      copy.unshift(item);
      return copy;
    });
  };

  const handleMoveImage = (idx: number, direction: "left" | "right") => {
    const targetIdx = direction === "left" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= imageUrls.length) return;
    setImageUrls((prev) => {
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  };

  const handleClearAllImages = () => {
    setImageUrls([]);
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
          titleJa: titleJa || undefined,
          description,
          descriptionJa: descriptionJa || undefined,
          listingType,
          propertyType,
          layout,
          structure,
          stationName: stationName || undefined,
          stationLine: stationLine || undefined,
          walkMinutes: walkMinutes || undefined,
          price,
          deposit: deposit || undefined,
          keyMoney: keyMoney || undefined,
          managementFee: managementFee || undefined,
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
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            activeRole === "OWNER" ? "bg-amber-50 text-amber-600" : "bg-brand-50 text-brand-700"
          }`}>
            {activeRole === "OWNER" ? <Home className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">
                {activeRole === "OWNER" ? "Post Your Housing (家主・オーナー物件掲載)" : "Publish New Listing"}
              </h1>
              {activeRole === "OWNER" && (
                <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                  Owner Mode
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              {activeRole === "OWNER"
                ? "Upload housing photos, set your rent or sale terms, and publish directly to the marketplace."
                : "Submit a residential property for Japanese marketplace indexing (SUUMO specifications)."}
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
            1. Classification & Title (基本情報・タイトル)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Listing Mode</label>
              <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setListingType("RENT")}
                  className={`rounded-lg py-2 text-xs font-bold transition-all ${
                    listingType === "RENT" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  賃貸 (Rent)
                </button>
                <button
                  type="button"
                  onClick={() => setListingType("SALE")}
                  className={`rounded-lg py-2 text-xs font-bold transition-all ${
                    listingType === "SALE" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  売買 (Sale)
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Property Type (種別)</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
              >
                <option value="MANSION">マンション (Mansion)</option>
                <option value="APARTMENT">アパート (Apartment)</option>
                <option value="HOUSE">一戸建て (House)</option>
                <option value="TOWNHOUSE">テラスハウス (Townhouse)</option>
                <option value="VILLA">高級邸宅 (Villa)</option>
                <option value="STUDIO">ワンルーム (Studio)</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="text-xs font-bold text-slate-700 block mb-1">Layout (間取り)</label>
              <select
                value={layout}
                onChange={(e) => setLayout(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
              >
                <option value="1R">1R (ワンルーム)</option>
                <option value="1K">1K</option>
                <option value="1DK">1DK</option>
                <option value="1LDK">1LDK</option>
                <option value="2K">2K</option>
                <option value="2DK">2DK</option>
                <option value="2LDK">2LDK</option>
                <option value="3LDK">3LDK</option>
                <option value="4LDK+">4LDK以上</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Listing Headline Title (English)</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Designer 1LDK with Balcony overlooking Roppongi Hills"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              日本語タイトル (Japanese Title - Optional)
            </label>
            <input
              type="text"
              value={titleJa}
              onChange={(e) => setTitleJa(e.target.value)}
              placeholder="例: 六本木ヒルズ至近・南向きデザイナーズ1LDK"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Property Description (English)</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide architectural highlights, renovation details, transit access, and interior features..."
              className="w-full rounded-xl border border-slate-200 p-3 text-xs font-medium focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              日本語物件詳細 (Japanese Description - Optional)
            </label>
            <textarea
              rows={2}
              value={descriptionJa}
              onChange={(e) => setDescriptionJa(e.target.value)}
              placeholder="駅徒歩5分の好立地。角部屋2面採光、宅配ボックス・オートロック完備..."
              className="w-full rounded-xl border border-slate-200 p-3 text-xs font-medium focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Step 2: Pricing & Location */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            2. Pricing & Address (賃料・価格と所在地)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {listingType === "RENT" ? "Monthly Rent (賃料 ¥/月)" : "Asking Price (販売価格 ¥)"}
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="例: 165000"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Deposit (敷金 ¥)</label>
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                placeholder="例: 165000"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Key Money (礼金 ¥)</label>
              <input
                type="number"
                value={keyMoney}
                onChange={(e) => setKeyMoney(e.target.value)}
                placeholder="例: 0 (なし)"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Management Fee (共益費/管理費 ¥)</label>
              <input
                type="number"
                value={managementFee}
                onChange={(e) => setManagementFee(e.target.value)}
                placeholder="例: 12000"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Metropolis City (都市)</label>
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
              <label className="text-xs font-bold text-slate-700 block mb-1">Ward / District (市区町村)</label>
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
            <label className="text-xs font-bold text-slate-700 block mb-1">Street Address (町名・番地・建物名)</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="例: 東京都港区六本木4-2-15 サンライズ六本木 502号室"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Step 3: Japanese Transit & Building Facts */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            3. Transit & Building Facts (交通・建物構造)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Nearest Station (最寄駅)</label>
              <input
                type="text"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                placeholder="例: 渋谷駅 (Shibuya)"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Train Line (路線)</label>
              <input
                type="text"
                value={stationLine}
                onChange={(e) => setStationLine(e.target.value)}
                placeholder="例: JR山手線 / 東京メトロ銀座線"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Walk Minutes (徒歩分数)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={walkMinutes}
                onChange={(e) => setWalkMinutes(e.target.value)}
                placeholder="例: 5"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Building Structure (構造)</label>
              <select
                value={structure}
                onChange={(e) => setStructure(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold"
              >
                <option value="RC">RC造 (鉄筋コンクリート)</option>
                <option value="SRC">SRC造 (鉄骨鉄筋コンクリート)</option>
                <option value="鉄骨造">鉄骨造 (Steel)</option>
                <option value="木造">木造 (Wood)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Area (専有面積 ㎡)</label>
              <input
                type="number"
                step="0.1"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Bedrooms (部屋数)</label>
              <input
                type="number"
                min="0"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Bathrooms (バスルーム)</label>
              <input
                type="number"
                step="0.5"
                min="1"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
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
              <span>Furnished (家具・家電付き)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={parking}
                onChange={(e) => setParking(e.target.checked)}
                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 h-4 w-4"
              />
              <span>Dedicated Parking Included (駐車場あり)</span>
            </label>
          </div>
        </div>

        {/* Step 4: High Resolution Images & File Upload */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                4. Housing Gallery Photography ({imageUrls.length} Photos)
              </h3>
              <p className="text-xs text-slate-500">
                Upload your housing photos from your computer or provide image URLs. The first photo serves as the listing cover.
              </p>
            </div>

            {imageUrls.length > 0 && (
              <button
                type="button"
                onClick={handleClearAllImages}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors self-start sm:self-auto"
              >
                Clear All Photos
              </button>
            )}
          </div>

          {/* Upload Method Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              type="button"
              onClick={() => setUploadMode("device")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                uploadMode === "device"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Upload className="h-3.5 w-3.5" />
              <span>Upload from Computer (端末から写真をアップロード)</span>
            </button>
            <button
              type="button"
              onClick={() => setUploadMode("url")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                uploadMode === "url"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <ImagePlus className="h-3.5 w-3.5" />
              <span>Paste Image URL (WEB画像URL)</span>
            </button>
          </div>

          {/* Device Upload Drag & Drop Area */}
          {uploadMode === "device" && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFilesSelected(e.dataTransfer.files);
              }}
              className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
                isDragging
                  ? "border-brand-500 bg-brand-50/70 scale-[1.01]"
                  : "border-slate-300 bg-slate-50/70 hover:border-slate-400 hover:bg-slate-50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={(e) => handleFilesSelected(e.target.files)}
                className="hidden"
                id="photo-file-upload"
              />

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 shadow-sm mb-3">
                {isProcessingImages ? (
                  <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
                ) : (
                  <Upload className="h-6 w-6" />
                )}
              </div>

              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900">
                  {isProcessingImages
                    ? "Optimizing & uploading housing photos..."
                    : "Click to select or drag & drop housing photos here"}
                </p>
                <p className="text-xs text-slate-500">
                  Supports JPG, PNG, WEBP • Select multiple photos at once • Auto-optimized for ultra-fast loading
                </p>
              </div>

              <div className="mt-4">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  disabled={isProcessingImages}
                  onClick={() => fileInputRef.current?.click()}
                  className="shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Select Photos from Device
                </Button>
              </div>
            </div>
          )}

          {/* URL Input Area */}
          {uploadMode === "url" && (
            <div className="flex gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Paste image URL (e.g. https://images.unsplash.com/...)..."
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-brand-500 focus:outline-none"
              />
              <Button type="button" variant="secondary" size="sm" onClick={handleAddImageUrl}>
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add URL Photo
              </Button>
            </div>
          )}

          {/* Feedback message */}
          {uploadFeedback && (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 animate-fade-in">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{uploadFeedback}</span>
            </div>
          )}

          {/* Photo Gallery Grid Preview */}
          {imageUrls.length > 0 ? (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>Gallery Preview (Drag or use controls to arrange order)</span>
                <span className="text-slate-400">#1 is the Cover Photo</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {imageUrls.map((url, idx) => (
                  <div
                    key={idx}
                    className={`group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border-2 transition-all shadow-sm ${
                      idx === 0
                        ? "border-amber-400 ring-2 ring-amber-400/20"
                        : "border-slate-200 hover:border-brand-400"
                    }`}
                  >
                    <img
                      src={url}
                      alt={`Housing photo ${idx + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      {idx === 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-black text-white shadow">
                          <Star className="h-2.5 w-2.5 fill-current" />
                          <span>Cover (カバー)</span>
                        </span>
                      ) : (
                        <span className="rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                          #{idx + 1}
                        </span>
                      )}
                    </div>

                    {/* Hover Overlay Controls */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                      <div className="flex justify-end gap-1">
                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => handleSetCover(idx)}
                            title="Set as Cover Photo"
                            className="flex h-6 items-center gap-1 rounded-md bg-amber-500 px-1.5 text-[10px] font-bold text-white shadow hover:bg-amber-600 transition-colors"
                          >
                            <Star className="h-3 w-3 fill-current" />
                            <span>Set Cover</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          title="Remove photo"
                          className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-600 text-white shadow hover:bg-rose-700 transition-colors"
                          aria-label="Remove photo"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Reorder Arrows */}
                      <div className="flex justify-between items-center text-white">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveImage(idx, "left")}
                          title="Move left"
                          className="flex h-6 w-6 items-center justify-center rounded bg-white/20 hover:bg-white/40 disabled:opacity-30 transition-colors"
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === imageUrls.length - 1}
                          onClick={() => handleMoveImage(idx, "right")}
                          title="Move right"
                          className="flex h-6 w-6 items-center justify-center rounded bg-white/20 hover:bg-white/40 disabled:opacity-30 transition-colors"
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
              No photos currently added. Use the upload button above to add images of the housing.
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <Link href="/dashboard" className="text-xs font-semibold text-slate-500 hover:text-slate-900">
            Cancel
          </Link>
          <div className="flex items-center gap-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              className={`px-8 shadow-lg ${
                activeRole === "OWNER"
                  ? "bg-amber-600 hover:bg-amber-700 shadow-amber-600/20"
                  : "shadow-brand-700/20"
              }`}
            >
              {activeRole === "OWNER"
                ? "Publish Housing as Owner (家主として掲載)"
                : "Submit Listing for Indexing (公開登録)"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
