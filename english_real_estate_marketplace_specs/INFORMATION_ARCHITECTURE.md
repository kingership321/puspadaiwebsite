# Information Architecture

## Public routes

/

 /rent

 /buy

 /search

 /search/rent

 /search/buy

 /property/[slug]

 /agency/[slug]

 /agent/[slug]

 /city/[citySlug]

 /area/[areaSlug]

 /guides

 /guides/[slug]

 /about

 /contact

 /privacy

 /terms

## Authenticated routes

 /account

 /account/saved

 /account/searches

 /account/history

 /account/compare

 /account/inquiries

 /account/settings

## Listing-management routes

 /dashboard

 /dashboard/listings

 /dashboard/listings/new

 /dashboard/listings/[id]

 /dashboard/leads

 /dashboard/profile

## Admin routes

 /admin

 /admin/users

 /admin/listings

 /admin/agencies

 /admin/locations

 /admin/reports

 /admin/settings

## URL requirements

Search URLs must be shareable and indexable where appropriate.

Example conceptual URL:

/search/rent?city=kathmandu&minPrice=20000&maxPrice=60000&bedrooms=2

Use stable parameter names.

Avoid putting internal database IDs in public URLs when a slug is available.

## Navigation

Primary navigation should expose the user's highest-intent tasks, not every feature.
