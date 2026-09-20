# UX and Design System

## Design direction

Create an original, modern, trustworthy property marketplace.

Desired feeling:

- Clear
- Calm
- Professional
- Premium but approachable
- Information-dense without feeling cluttered

Do not reproduce SUUMO's exact visual design.

## Layout principles

### Header

Desktop:

- Logo
- Rent
- Buy
- Agents/Agencies
- Guides
- Saved
- Sign in
- Primary CTA where relevant

Mobile:

- Compact logo
- Search
- Saved
- Menu

### Search interface

The search interface is the product's main control surface.

Use:

- Clear labels
- Large touch targets
- Familiar controls
- Persistent selected filters
- Human-readable filter summaries
- Easy reset
- Result count

## Cards

Property cards should have strong visual hierarchy:

1. Image
2. Price
3. Location
4. Main facts
5. Highlights
6. Provider
7. Favorite

Do not overload cards with tiny text.

## Color

Use an original neutral base with one strong brand accent.

Suggested conceptual tokens:

- Background
- Surface
- Surface-muted
- Text
- Text-muted
- Border
- Brand
- Brand-hover
- Success
- Warning
- Error

Do not hard-code colors throughout components. Use design tokens.

## Typography

Use a highly readable sans-serif.

Hierarchy:

- Display
- H1
- H2
- H3
- Body
- Small
- Label

## Spacing

Use a consistent 4px/8px-derived spacing system.

## Responsive breakpoints

Design deliberately for:

- Small mobile
- Large mobile
- Tablet
- Desktop
- Wide desktop

Do not simply shrink desktop layouts.

## Accessibility

Target WCAG 2.2 AA where practical.

Required:

- Visible focus states
- Keyboard navigation
- Labels for inputs
- Accessible dialogs
- Accessible tabs
- Accessible map alternatives
- Proper contrast
- Reduced-motion support
- Screen-reader-friendly favorite controls

## States

Every major component needs:

- Loading
- Empty
- Error
- Disabled
- Success
- Hover
- Focus
- Mobile

## Map UX

The map must not be the only way to understand location.

Always maintain a list alternative.

Map markers should:

- Be clickable
- Display price or useful short information
- Highlight the selected listing
- Support clustering at high density
