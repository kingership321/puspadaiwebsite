# English Real Estate Marketplace — Product Specification

This repository contains the product, UX, architecture, data, API, testing, SEO, and AI-development instructions for building an English-language real-estate marketplace inspired by the functional breadth of large property portals such as SUUMO.

## Product goal

Build a fast, trustworthy property-discovery platform where users can:

- Search rentals and properties for sale
- Search by city, neighborhood, address, landmark, or map
- Filter by price, bedrooms, bathrooms, property type, size, amenities, and other criteria
- Browse results as list, grid, or map
- Open rich property detail pages
- Save properties and searches
- Contact listing agents/owners
- Request a viewing
- Discover real-estate agencies and agents
- Compare saved properties
- Receive alerts for new matching properties

## Important

This is an original product. Do not copy SUUMO's logo, brand identity, exact layouts, text, proprietary assets, or source code. Use the referenced product only as functional inspiration.

## Recommended implementation

- Next.js + TypeScript
- Tailwind CSS
- shadcn/ui or an equivalent accessible component system
- PostgreSQL
- Prisma ORM
- Auth.js or equivalent authentication
- Mapbox or Google Maps
- Object storage/CDN for images
- Full-text/geospatial search through PostgreSQL initially
- Redis/queue layer when scale requires it
- Vercel or equivalent frontend deployment
- Managed PostgreSQL

See the other markdown files for detailed requirements.
