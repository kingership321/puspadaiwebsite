# Data Model

## User

- id
- name
- email
- phone
- role
- avatarUrl
- createdAt
- updatedAt

Roles:

- seeker
- owner
- agent
- admin

## Agency

- id
- name
- slug
- logoUrl
- description
- website
- email
- phone
- address
- cityId
- createdAt
- updatedAt

## Agent

- id
- userId
- agencyId
- name
- slug
- photoUrl
- bio
- languages
- serviceAreas
- createdAt
- updatedAt

## Property

- id
- slug
- listingType: RENT | SALE
- propertyType
- title
- description
- price
- deposit
- currency
- bedrooms
- bathrooms
- area
- landArea
- floor
- totalFloors
- yearBuilt
- furnished
- parking
- address
- cityId
- areaId
- latitude
- longitude
- status
- publishedAt
- createdAt
- updatedAt

## PropertyImage

- id
- propertyId
- url
- alt
- sortOrder
- width
- height

## Amenity

- id
- name
- slug

## PropertyAmenity

- propertyId
- amenityId

## Favorite

- userId
- propertyId
- createdAt

Unique constraint:

(userId, propertyId)

## SavedSearch

- id
- userId
- name
- searchType
- filtersJson
- notificationFrequency
- createdAt
- updatedAt

## Inquiry

- id
- propertyId
- userId nullable
- agencyId
- agentId nullable
- name
- email
- phone
- message
- preferredViewingTime
- status
- createdAt

## Location hierarchy

Country → State/Province → City → Area/Neighborhood → Postal code

Use stable IDs and slugs.

## Listing status

- DRAFT
- PENDING_REVIEW
- PUBLISHED
- PAUSED
- SOLD
- RENTED
- ARCHIVED

## AuditLog

- id
- actorUserId
- action
- entityType
- entityId
- metadata
- createdAt
