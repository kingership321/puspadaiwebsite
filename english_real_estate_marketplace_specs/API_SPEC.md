# API Specification

Use REST or typed server actions consistently. Do not mix arbitrary patterns.

## Search

GET /api/search

Parameters:

- type
- query
- city
- area
- minPrice
- maxPrice
- bedrooms
- bathrooms
- minArea
- maxArea
- propertyType
- amenities
- lat
- lng
- radius
- bounds
- sort
- page
- limit

Response:

- results
- total
- page
- pageSize
- filters
- mapBounds
- aggregations

## Property

GET /api/properties/:slug

Returns public property detail.

## Favorites

POST /api/favorites

DELETE /api/favorites/:propertyId

GET /api/favorites

## Saved searches

POST /api/saved-searches

GET /api/saved-searches

PATCH /api/saved-searches/:id

DELETE /api/saved-searches/:id

## Inquiry

POST /api/inquiries

Server must:

- Validate input
- Rate-limit requests
- Verify property exists and is contactable
- Store inquiry
- Notify responsible provider
- Return a safe success response

## Agencies

GET /api/agencies

GET /api/agencies/:slug

## Agents

GET /api/agents/:slug

## Listing management

POST /api/dashboard/properties

PATCH /api/dashboard/properties/:id

POST /api/dashboard/properties/:id/publish

POST /api/dashboard/properties/:id/pause

DELETE /api/dashboard/properties/:id

All dashboard endpoints require authorization.

## Error format

Use a predictable structure:

{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable message",
    "fields": {}
  }
}

Do not expose stack traces or database errors to users.
