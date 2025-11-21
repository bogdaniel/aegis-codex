# CSS Guide
- **Stack defaults:** Modern CSS (flex/grid), prefers utility tokens (variables) and component scopes; avoid global leaks.

## Structure & Style
- Use custom properties for colors/spacing/typography; define light/dark tokens if needed.
- Prefer flex/grid over floats; avoid absolute positioning except for layering.
- Keep specificity low; use BEM or component-scoped styles; avoid `!important`.

## Performance & Quality
- Minimize unused CSS; leverage `content-visibility`, `prefers-reduced-motion` considerations.
- Use `min()`/`max()`/`clamp()` for responsive sizing; defer heavy animations; prefer hardware-accelerated transforms.

## Accessibility
- Ensure focus states; respect `prefers-reduced-motion`; maintain contrast ratios.
