# Product Requirements Document

## 1. Product concept

Create an English-language real-estate marketplace with a polished consumer experience. The primary experience is a powerful search engine rather than a marketing-heavy homepage.

The platform should support both:

1. Rent
2. Buy

Future expansion:

3. Sell
4. New developments
5. Land
6. Commercial property
7. Property services

## 2. Primary users

### Property seeker

Wants to quickly find suitable properties, compare them, save them, and contact a provider.

### Property owner / landlord

Wants to publish a property and receive qualified inquiries.

### Real-estate agent

Wants to manage listings, receive leads, and maintain company/agent profiles.

### Administrator

Manages users, listings, moderation, locations, content, and platform configuration.

## 3. Core user journey

Homepage → choose Rent/Buy → choose location → set core criteria → view results → refine filters → inspect property → save/compare → contact/request viewing.

The search flow should never force users through unnecessary pages.

## 4. Homepage

Required:

- Header
- Logo/brand
- Rent / Buy switch
- Location search
- Search CTA
- Quick filters
- Popular cities/areas
- Featured/new listings
- Browse by property type
- Browse by neighborhood
- Helpful guides/articles
- Agent/agency discovery
- Footer

The hero should prioritize search.

## 5. Search

Support:

- City
- Neighborhood
- Address
- Postal code
- Landmark
- Map viewport
- Radius
- Transit/station where relevant
- Keyword

Search filters:

### Rent

- Min/max rent
- Property type
- Bedrooms
- Bathrooms
- Minimum area
- Maximum area
- Furnished
- Pets allowed
- Parking
- Balcony
- Garden
- Elevator
- Air conditioning
- Internet
- Security
- Laundry
- Accessible
- Available from
- Lease duration

### Buy

- Min/max price
- Property type
- Bedrooms
- Bathrooms
- Minimum area
- Maximum area
- Land area
- New/used
- Parking
- Balcony
- Garden
- Elevator
- View
- Construction year
- Availability/status

## 6. Search result presentation

Desktop:

- Filters/sidebar on the left
- Results center/right
- Optional map panel
- Sticky search controls

Mobile:

- Top search bar
- Horizontal filter chips
- Full-screen filter sheet
- List/map toggle
- Bottom navigation where useful

Each result card should show:

- Main image
- Price
- Address/area
- Bedrooms
- Bathrooms
- Area
- Property type
- Key amenities
- Short description
- Agent/agency
- Favorite button
- Optional verified/new/featured badge
- Photo count
- Optional virtual-tour/video indicator

## 7. Result modes

Provide:

- List
- Grid
- Map
- Split map + list on desktop

Changing view should preserve filters.

## 8. Property detail page

Required:

- Photo gallery
- Video/virtual tour if available
- Price
- Property facts
- Description
- Amenities
- Room information
- Location
- Interactive map
- Nearby places
- Transportation/access information where available
- Building/property information
- Agent/agency card
- Contact form
- Request viewing
- Save
- Share
- Similar properties

## 9. User account

Users can:

- Register/login
- Save properties
- Save searches
- View recently viewed properties
- Compare properties
- Manage alerts
- Manage inquiries
- Edit profile

## 10. Agent/agency marketplace

Agency page:

- Agency name
- Logo
- Description
- Locations served
- Office locations
- Contact details
- Active listings
- Team
- Reviews if enabled
- Inquiry CTA

Agent page:

- Name
- Photo
- Bio
- Languages
- Areas served
- Listings
- Contact CTA

## 11. Listing creation

Agent/owner can:

- Create draft
- Upload photos
- Enter address
- Set location
- Enter property facts
- Select amenities
- Add description
- Add pricing
- Add availability
- Preview
- Publish
- Pause
- Edit
- Delete

## 12. Lead/contact flow

Contact forms should capture only necessary information:

- Name
- Email
- Phone, optional
- Message
- Preferred viewing time, optional

Show privacy/consent information appropriate to the deployment jurisdiction.

## 13. Search quality

Ranking should consider:

- Text relevance
- Geographic relevance
- Exact filter matches
- Freshness
- Listing completeness
- Optional paid promotion, clearly labeled

Never silently hide legitimate matching results because of monetization.

## 14. Non-functional requirements

- Fast initial page load
- Mobile-first responsive UI
- Accessible keyboard navigation
- Semantic HTML
- Good Core Web Vitals
- SEO-friendly server rendering
- Robust empty/error/loading states
- Secure authentication
- Server-side validation
- Rate limiting on public forms
- Image optimization
- Structured logging

## 15. MVP boundary

MVP must include:

- Rent/buy
- Location search
- Core filters
- List/grid/map results
- Property detail
- Favorites
- Authentication
- Contact inquiry
- Agent/agency information
- Admin listing management
- SEO metadata

Defer advanced recommendations, payments, reviews, complex messaging, and sophisticated analytics until the foundation is stable.
