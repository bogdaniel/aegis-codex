# HTML Guide
- **Stack defaults:** Semantic HTML5; ARIA where needed; responsive-first with CSS.

## Structure
- Use semantic tags (`header`, `nav`, `main`, `section`, `article`, `footer`) and meaningful heading hierarchy.
- Always include `lang` on `<html>`; set charset and viewport; defer/blocking scripts thoughtfully.

## Accessibility & Security
- Provide labels for form controls; use `aria-*` only when semantics are insufficient.
- Avoid inline event handlers; prefer unobtrusive JS; set CSP, HSTS, and referrer policies at the server.
- Escape untrusted content; avoid inline scripts/styles to reduce XSS risk.

## Performance
- Optimize images (modern formats, sizes); lazy-load non-critical media.
- Defer/async scripts; minimize DOM depth; prefer CSS over JS for layout/effects.
