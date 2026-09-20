# MASTER BUILD PROMPT

You are a senior product engineer, UX designer, architect, and QA engineer.

Build a production-quality English-language real-estate marketplace web application inspired by the functional patterns of major property portals.

IMPORTANT: Create an ORIGINAL product. Do not copy SUUMO's logo, name, exact visual identity, proprietary assets, exact text, source code, or pixel-level layout. The reference is useful only for understanding the breadth of a property-search experience: location-based discovery, detailed filters, list/map results, rich property details, favorites, saved searches, inquiries, and agency discovery.

## Product objective

Build a trustworthy platform where users can discover rental and for-sale properties quickly, refine searches precisely, inspect detailed listings, save properties/searches, compare options, and contact agents or owners.

The product must feel like a real commercial product, not a demo dashboard.

## Required stack

Use:

- Next.js
- TypeScript
- React
- Tailwind CSS
- Accessible component primitives
- PostgreSQL
- Prisma
- Secure authentication
- Mapbox or Google Maps abstraction
- Object storage/CDN abstraction
- Server-side validation

Prefer a modular monolith for the first version.

## Before coding

First inspect the repository.

If an existing app exists:

- Preserve useful existing architecture
- Do not overwrite unrelated functionality
- Identify existing dependencies
- Reuse components where appropriate
- Explain important architectural decisions briefly

If it is empty:

- Initialize the project cleanly

Then read these files before implementing:

- PRODUCT_REQUIREMENTS.md
- UX_AND_DESIGN.md
- INFORMATION_ARCHITECTURE.md
- TECHNICAL_ARCHITECTURE.md
- DATA_MODEL.md
- SEARCH_SPEC.md
- COMPONENTS.md
- AUTH_AND_SECURITY.md
- TESTING.md
- SEO.md
- IMPLEMENTATION_PLAN.md

Treat those documents as the source of truth.

## Product requirements

Implement:

### Homepage

- Strong search-first hero
- Rent / Buy mode
- Location autocomplete
- Core price/property filters
- Search CTA
- Popular areas
- Featured/new listings
- Property type discovery
- Agency discovery
- Guides/content
- Responsive footer

### Search

Support:

- Text
- City
- Neighborhood
- Address
- Postal code
- Map bounds
- Radius
- Price range
- Bedrooms
- Bathrooms
- Property type
- Area
- Amenities
- Listing status
- Furnished
- Parking
- Availability
- Other advanced filters

All meaningful search state must be represented in the URL.

### Results

Support:

- List
- Grid
- Map
- Split map/list on desktop
- Sorting
- Pagination
- Filter chips
- Advanced filter drawer
- Result count
- Loading skeletons
- Empty states
- Error states

### Property detail

Include:

- Large image gallery
- Optional video/virtual tour
- Price
- Facts
- Description
- Amenities
- Location
- Map
- Nearby places
- Agent/agency
- Save
- Share
- Contact
- Viewing request
- Similar listings

### Accounts

Include:

- Login/register
- Saved properties
- Saved searches
- Recently viewed
- Compare
- Inquiry history
- Settings

### Provider marketplace

Include:

- Agency pages
- Agent pages
- Active listings
- Contact CTA

### Dashboard

Allow authorized owners/agents to:

- Create listings
- Save drafts
- Upload images
- Edit listings
- Preview
- Publish
- Pause
- Archive
- View inquiries

### Admin

Implement basic:

- User management
- Listing moderation
- Reports
- Audit log
- Dashboard statistics

## Design requirements

Create an original visual identity.

Do NOT make it look like a clone.

Design goals:

- Modern
- Clean
- Trustworthy
- Highly usable
- Information-rich
- Strong photography
- Excellent mobile UX

Use design tokens rather than scattered hard-coded styles.

Use generous whitespace around major sections while keeping search results information-dense.

The search UI should be the dominant interaction.

## Responsive behavior

Desktop:

- Persistent search controls
- Sidebar filters
- Results
- Map/split view

Mobile:

- Compact header
- Search bar
- Horizontal filter chips
- Filter drawer
- List/map toggle
- Large touch targets

Never simply shrink desktop UI.

## UX details

Favorites must have immediate visual feedback.

Search filters must be easy to clear.

When no results exist, suggest ways to broaden the search.

When changing map position, provide a deliberate "Search this area" interaction rather than firing requests continuously.

Preserve search state when switching between list, grid, and map.

## Data

Implement the database schema described in DATA_MODEL.md.

Create realistic fictional seed data.

Use enough data to make search, filtering, maps, cards, pagination, agencies, and similar-property sections feel real.

Never use private personal information.

## Architecture

Keep domain logic separate from components.

Suggested structure:

app/
components/
features/
lib/
server/
db/
types/
tests/

Use server components for data-heavy SEO pages where appropriate.

Use client components only where interaction requires them.

## Security

Implement:

- Server-side authorization
- Input validation
- Rate limiting strategy
- Secure file upload validation
- Protection against unauthorized listing edits
- Safe inquiry submission
- Audit logs for admin actions
- No secrets in source control

## SEO

Implement:

- Metadata
- Canonicals
- Open Graph
- Sitemaps
- Robots rules
- Property/location structured data where appropriate
- SEO-friendly property/location/agency URLs
- Internal linking

Do not create thousands of low-value indexable filter combinations.

## Accessibility

Target WCAG 2.2 AA.

Verify:

- Keyboard navigation
- Focus states
- Form labels
- Dialog accessibility
- Map/list alternative
- Screen-reader labels
- Contrast
- Reduced motion

## Performance

Optimize:

- Image loading
- Server rendering
- Bundle size
- Database queries
- Search queries
- Map loading
- Pagination

Do not load all properties into the browser.

## Testing

Write tests for:

- Search serialization/parsing
- Filters
- Permissions
- Listing CRUD
- Favorites
- Saved searches
- Inquiry flow
- Critical user journey

Add E2E coverage for the primary search-to-inquiry path.

## Error handling

Every important page/component must handle:

- Loading
- Empty
- Error
- Success

Errors shown to users must be human-readable.

Never expose stack traces.

## Seed experience

After implementation, a developer should be able to run the app locally and immediately see:

- A populated homepage
- Search results
- Map markers
- Property detail pages
- Agencies
- Agents
- Favorites
- Saved searches
- Inquiry flow

## Implementation behavior

Do not ask for permission before implementing obvious requirements.

Make sensible assumptions and document them.

Do not create fake integrations that look functional but silently do nothing.

For external providers such as maps, storage, email, or auth, create clean adapters/interfaces and provide a development fallback where practical.

## Quality bar

Before considering the task complete:

1. Run type checking.
2. Run linting.
3. Run tests.
4. Build the application.
5. Fix errors.
6. Test the primary user journey.
7. Check mobile responsiveness.
8. Check keyboard accessibility.
9. Review SEO metadata.
10. Review security-sensitive endpoints.
11. Confirm database migrations work.
12. Confirm seed data works.

Do not stop at scaffolding.

The final implementation should be coherent, navigable, responsive, and usable from homepage through property inquiry.

## Deliverables

Provide:

- Working application
- Database schema/migrations
- Seed data
- Reusable components
- Search functionality
- Property detail
- Authentication
- Favorites
- Saved searches
- Inquiry flow
- Agency/agent pages
- Dashboard
- Basic admin
- Tests
- README with setup instructions
- Environment variable documentation

When making implementation decisions, prioritize user experience, correctness, maintainability, accessibility, SEO, and performance over unnecessary complexity.
