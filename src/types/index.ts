export type ListingType = "RENT" | "SALE";

export type PropertyType =
  | "APARTMENT"
  | "HOUSE"
  | "CONDO"
  | "TOWNHOUSE"
  | "VILLA"
  | "STUDIO";

export type ListingStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "PUBLISHED"
  | "PAUSED"
  | "SOLD"
  | "RENTED"
  | "ARCHIVED";

export type UserRole = "SEEKER" | "OWNER" | "AGENT" | "ADMIN";

export interface PropertyImageDto {
  id: string;
  url: string;
  alt?: string | null;
  sortOrder: number;
  isMain: boolean;
}

export interface AmenityDto {
  id: string;
  name: string;
  nameJa?: string | null;
  slug: string;
  category?: string | null;
  icon?: string | null;
}

export interface CityDto {
  id: string;
  name: string;
  nameJa?: string | null;
  slug: string;
  state?: string | null;
  country: string;
  latitude: number;
  longitude: number;
  imageUrl?: string | null;
  description?: string | null;
}

export interface AreaDto {
  id: string;
  cityId: string;
  name: string;
  nameJa?: string | null;
  slug: string;
  postalCode?: string | null;
  latitude: number;
  longitude: number;
}

export interface AgencyDto {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  description?: string | null;
  website?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
}

export interface AgentDto {
  id: string;
  name: string;
  slug: string;
  photoUrl?: string | null;
  bio?: string | null;
  languages?: string | null;
  serviceAreas?: string | null;
  email?: string | null;
  phone?: string | null;
  agency?: AgencyDto | null;
}

export interface PropertyDto {
  id: string;
  slug: string;
  listingType: ListingType;
  propertyType: PropertyType;
  title: string;
  titleJa?: string | null;
  description: string;
  descriptionJa?: string | null;
  price: number;
  deposit?: number | null;
  keyMoney?: number | null;
  managementFee?: number | null;
  currency: string;
  layout?: string | null;
  structure?: string | null;
  stationName?: string | null;
  stationLine?: string | null;
  walkMinutes?: number | null;
  bedrooms: number;
  bathrooms: number;
  area: number;
  landArea?: number | null;
  floor?: number | null;
  totalFloors?: number | null;
  yearBuilt?: number | null;
  furnished: boolean;
  parking: boolean;
  address: string;
  cityId: string;
  areaId: string;
  agencyId?: string | null;
  agentId?: string | null;
  latitude: number;
  longitude: number;
  status: ListingStatus;
  featured: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  city: CityDto;
  neighborhood?: AreaDto;
  areaInfo?: AreaDto;
  agency?: AgencyDto | null;
  agent?: AgentDto | null;
  images: PropertyImageDto[];
  amenities: { amenity: AmenityDto }[];
  isFavorite?: boolean;
}

export interface SearchParams {
  type?: ListingType;
  query?: string;
  city?: string;
  area?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  bathrooms?: string;
  propertyType?: string;
  amenities?: string;
  furnished?: string;
  parking?: string;
  sort?: "newest" | "price_asc" | "price_desc" | "area_desc";
  page?: string;
  limit?: string;
  bounds?: string; // swLat,swLng,neLat,neLng
  view?: "split" | "grid" | "list";
}

export interface SearchResponse {
  results: PropertyDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  aggregations: {
    cities: { id: string; name: string; slug: string; count: number }[];
    propertyTypes: { type: string; count: number }[];
    priceRange: { min: number; max: number };
  };
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}
