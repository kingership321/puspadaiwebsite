# Technical Architecture

## Recommended stack

Frontend/application:

- Next.js
- TypeScript
- React
- Tailwind CSS
- Accessible component library

Backend:

- Next.js server actions/API routes or a dedicated API service
- PostgreSQL
- Prisma

Infrastructure:

- Object storage for images
- CDN
- Managed database
- Map provider
- Email provider

Optional later:

- Redis
- Background job queue
- Search engine such as OpenSearch/Elasticsearch
- Analytics warehouse

## Architectural principles

1. Server-render data-heavy pages when SEO matters.
2. Keep client components small.
3. Validate every external input on the server.
4. Never trust client-provided authorization.
5. Use database transactions for multi-record mutations.
6. Keep business logic out of UI components.
7. Separate domain models from presentation models.
8. Make search queries observable and testable.
9. Optimize images automatically.
10. Avoid premature microservices.

## Suggested application layers

app/

components/

features/

lib/

server/

db/

types/

hooks/

config/

tests/

## Domain modules

- auth
- users
- properties
- search
- locations
- favorites
- saved-searches
- inquiries
- agencies
- agents
- media
- notifications
- moderation
- admin

## Search architecture

MVP:

PostgreSQL filtering + indexes + PostGIS if geospatial search is required.

At larger scale:

Application → search abstraction → PostgreSQL/OpenSearch.

The UI should not depend directly on a specific search engine.

## Caching

Cache:

- Popular locations
- Public agency pages
- Public guide pages
- Static configuration

Be careful caching:

- Personalized favorites
- User inquiries
- Availability
- Draft listings

## Security

Required:

- Secure password/auth provider
- CSRF protection where applicable
- Rate limiting
- Server validation
- File-type validation
- Image size limits
- Authorization checks
- Audit logging for admin actions
- Sanitization of rich text
- Protection against IDOR
