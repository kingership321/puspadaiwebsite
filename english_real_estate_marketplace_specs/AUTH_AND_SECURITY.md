# Authentication, Authorization, and Security

## Authentication

Support:

- Email/password or passwordless
- OAuth providers if desired
- Email verification
- Password reset

## Authorization

Roles:

- seeker
- owner
- agent
- admin

Every protected server operation must verify authorization server-side.

Never trust:

- Hidden form fields
- Client-side role checks
- URL IDs
- Browser state

## Property ownership

Only the property owner/assigned agent can edit a listing.

Admins can moderate all listings.

## Inquiry protection

Public inquiry forms are abuse targets.

Implement:

- Rate limiting
- CAPTCHA/Turnstile when needed
- Input validation
- Email verification where appropriate
- Spam detection
- Duplicate submission protection

## File uploads

Accept only approved image types.

Verify:

- MIME type
- File signature where practical
- Maximum file size
- Image dimensions

Never execute uploaded files.

## Personal data

Collect the minimum data required.

Provide:

- Privacy policy
- Data deletion mechanism where legally required
- Account export/deletion considerations
- Consent handling where applicable

## Logging

Never log:

- Passwords
- Authentication secrets
- Full sensitive form contents

Audit:

- Admin changes
- Listing publication
- Listing deletion
- Permission changes
