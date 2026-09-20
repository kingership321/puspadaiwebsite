# Search and Filtering Specification

## Search modes

Support:

1. Text search
2. Area search
3. Map search
4. Radius search
5. Saved search

## Filter behavior

Filters should update the URL.

Example:

?minPrice=25000&maxPrice=60000&bedrooms=2

A user must be able to copy the URL and reproduce the search.

## Price

Use inclusive min/max ranges.

Currency should be configurable.

Do not hard-code currency assumptions into the domain model.

## Location

Autocomplete should rank:

1. Exact area
2. Exact city
3. Postal code
4. Nearby areas
5. Landmark
6. Address

## Map bounds

When the map moves, offer:

"Search this area"

Do not automatically reload results on every tiny map movement.

## Sorting

Default: relevance/freshness appropriate to product rules.

Options:

- Newest
- Price low to high
- Price high to low
- Largest area
- Most relevant

Do not imply that paid placement is organic relevance.

## Empty state

When zero results:

- Explain the current constraints
- Offer one-click removal of restrictive filters
- Show nearby areas
- Show related property types
- Never simply show a blank page

## Performance

Debounce autocomplete.

Paginate results.

Use cursor pagination when offset pagination becomes expensive.

Do not load every property onto the client.

## Search analytics

Track:

- Search submitted
- Filter applied
- Filter removed
- View changed
- Property opened
- Favorite added
- Inquiry submitted

Do not collect unnecessary personal information.
