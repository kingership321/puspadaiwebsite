# Testing Strategy

## Unit tests

Test:

- Search filter serialization
- Search filter parsing
- Price ranges
- Permission checks
- Listing state transitions
- Favorite logic
- Inquiry validation
- Slug generation

## Integration tests

Test:

- Create listing
- Publish listing
- Search listing
- Save listing
- Save search
- Submit inquiry
- Agent receives inquiry

## End-to-end tests

Critical journey:

1. Open homepage
2. Select Rent
3. Search location
4. Apply price filter
5. Apply bedroom filter
6. Submit
7. Open property
8. Save property
9. Submit inquiry

Also test:

- Mobile search
- Map/list switching
- Login
- Listing creation
- Unauthorized access

## Accessibility tests

Check:

- Keyboard navigation
- Focus order
- Dialogs
- Forms
- Color contrast
- Screen-reader labels

## Performance

Measure:

- Core Web Vitals
- Search latency
- Image performance
- API response time

## Definition of done

A feature is not complete until:

- It works on mobile and desktop
- It has loading/error/empty states
- It is accessible
- It has appropriate tests
- It handles unauthorized access
- It has analytics events if required
- It does not introduce obvious SEO regressions
