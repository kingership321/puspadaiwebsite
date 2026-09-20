# Deployment and Environment

## Environments

- Local
- Preview/staging
- Production

## Environment variables

Examples:

DATABASE_URL=
AUTH_SECRET=
MAP_PROVIDER_TOKEN=
STORAGE_BUCKET=
STORAGE_ACCESS_KEY=
STORAGE_SECRET=
EMAIL_API_KEY=

Never commit secrets.

## Database

Production database must have:

- Automated backups
- Connection pooling
- Migration strategy
- Monitoring

## Images

Use object storage + CDN.

Generate multiple sizes where appropriate.

## CI

Every pull request should run:

- Typecheck
- Lint
- Unit tests
- Integration tests
- Build

## Production checklist

- Environment variables configured
- Database migrated
- Seed data disabled
- Error monitoring enabled
- Analytics configured
- Rate limits enabled
- Storage configured
- Email configured
- Sitemap enabled
- Robots configured
- HTTPS enabled
- Backups verified
