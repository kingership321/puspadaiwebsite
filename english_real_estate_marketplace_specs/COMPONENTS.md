# Component Architecture

## Global

- AppHeader
- MobileNav
- Footer
- Container
- Breadcrumbs
- Toast
- Modal
- Drawer
- Button
- Input
- Select
- Checkbox
- RadioGroup
- RangeInput
- Tabs
- Badge
- Skeleton

## Search

- SearchBar
- SearchModeToggle
- LocationAutocomplete
- PriceFilter
- BedroomFilter
- PropertyTypeFilter
- AmenityFilter
- AdvancedFilters
- FilterChips
- FilterDrawer
- SearchSummary
- SortMenu
- ViewToggle
- ResultCount

## Property

- PropertyCard
- PropertyCardCompact
- PropertyGallery
- PropertyFacts
- AmenityList
- PropertyDescription
- PropertyMap
- NearbyPlaces
- AgentCard
- AgencyCard
- InquiryForm
- ViewingRequestForm
- SimilarProperties
- FavoriteButton
- ShareButton

## Map

- PropertyMap
- MapMarker
- ClusterMarker
- SelectedMarker
- MapControls

## Account

- SavedPropertyList
- SavedSearchList
- RecentlyViewed
- CompareTable
- InquiryList

## Dashboard

- ListingEditor
- ImageUploader
- ListingPreview
- ListingStatusBadge
- LeadTable
- DashboardSidebar

## Rules

Components should:

- Be composable
- Avoid business logic where possible
- Receive typed props
- Have loading/error/empty states where relevant
- Be keyboard accessible
- Be responsive
- Have tests for important interactions
