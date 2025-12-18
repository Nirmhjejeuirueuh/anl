# ANL Revamp - Migration Checklist

## Completed ✓

### 1. Legacy Site Analysis
- ✓ Extracted all colors from legacy SCSS files
- ✓ Documented typography system (fonts, sizes, weights)
- ✓ Documented spacing system
- ✓ Created comprehensive reference: `LEGACY_COLORS_AND_STYLES.md`

### 2. Theme Updates
- ✓ Updated `src/styles/theme.css` with legacy colors
  - Primary Blue: `#045bc1`
  - Secondary Gray: `#666666`
  - Accent Cyan: `#00d6ff`
  - All grayscale colors
  - Success, Warning, Danger, Info colors
- ✓ Updated typography scale to match legacy (1.333 ratio)
- ✓ Updated breakpoints to match legacy
- ✓ Updated line-height to 1.45 (from legacy)

### 3. Font Updates
- ✓ Changed from "DM Sans" to "Source Sans Pro" (body font)
- ✓ Changed from "Syne" to "Raleway" (heading font)
- ✓ Updated `src/config/fonts.json` with proper weights

### 4. Base Styles
- ✓ Updated heading line-height to 1.2 (legacy value)
- ✓ Changed heading font-weight to semibold (600, legacy value)

## Next Steps - TODO

### 1. Test the Changes
```bash
npm run dev
```
- Check if fonts load correctly
- Verify colors appear correctly across components
- Test responsive breakpoints

### 2. Component-by-Component Migration

#### Priority Components to Check:
1. **Buttons** (`src/layouts/components/CustomButton.astro`)
   - Ensure primary blue (#045bc1) is used
   - Check padding: 0.8rem 1rem (14px font-size)
   - Border radius: 0.1875rem (3px)
   - Font weight: 700 (bold)

2. **Navigation/Header** (`src/layouts/components/global/header/`)
   - Use navbar font-size: 0.8rem
   - Check hover states
   - Verify mobile menu colors

3. **Cards** (`src/layouts/components/cards/`)
   - Check card spacing matches legacy
   - Verify hover effects
   - Update colors to use primary blue

4. **Forms**
   - Border color: #e1e1e1
   - Disabled background: #f2f2f2
   - Focus states should use primary blue

5. **Footer** (`src/layouts/components/global/Footer.astro`)
   - Update background colors
   - Check text colors

### 3. Create Utility Classes

Consider adding these legacy-specific utilities to `src/styles/utilities.css`:

```css
/* Legacy spacing helpers */
.fs-12 { font-size: 0.75rem; }
.fs-14 { font-size: 0.875rem; }
.fs-16 { font-size: 1rem; }
.fs-18 { font-size: 1.125rem; }
.fs-20 { font-size: 1.25rem; }
.fs-30 { font-size: 1.875rem; }

/* Legacy button styles */
.btn-legacy {
  padding: 0.8rem 1rem;
  font-size: 14px;
  font-weight: 700;
  border-radius: 0.1875rem;
}

/* Hero background color */
.bg-hero {
  background-color: #a9c6ca;
}
```

### 4. Assets Migration

Copy from legacy site:
- [ ] Logo files from `/static/assets/images/`
- [ ] Hero images (home-blur.jpg, home-blur-landscape.jpg)
- [ ] Icon files (icheck-blue.png, etc.)
- [ ] Any other image assets

### 5. Page-Specific Styles

Check legacy pages SCSS:
- [ ] `_gallery.scss` - Photo gallery styles
- [ ] `_our-clients.scss` - Client section
- [ ] `_our-service.scss` - Services section
- [ ] `_team.scss` - Team member cards

### 6. Component-Specific Styles

From legacy components:
- [ ] `_menu.scss` - Navigation menu
- [ ] `_carousel.scss` - Image carousel/slider
- [ ] `_contactButton.scss` - Contact button
- [ ] `_dynamic-content.scss` - Dynamic content sections
- [ ] `_testimonials.scss` - Testimonials display

### 7. Special Features

- [ ] Calendar component (if needed)
  - Event color: rgba(4, 91, 193, 0.81)
- [ ] Modal containers (max-width: 700px)
- [ ] Pagination styles
- [ ] Table styles

### 8. Responsive Behavior

- [ ] Test all breakpoints (576px, 768px, 992px, 1200px, 1480px)
- [ ] Verify mobile menu behavior
- [ ] Check carousel controls on mobile
- [ ] Test touch device hover suppression

### 9. Accessibility

Legacy had:
- [ ] Touch device hover suppression
- [ ] Screen reader support
- [ ] Keyboard navigation
- [ ] ARIA labels

### 10. Performance

- [ ] Lazy loading images
- [ ] Optimize image formats
- [ ] Check bundle size
- [ ] Test loading times

## Color Reference Quick Guide

Use these Tailwind classes (now available with legacy colors):

- `bg-primary` or `bg-[#045bc1]` - Primary blue
- `bg-secondary` or `bg-[#666666]` - Secondary gray
- `text-primary` - Primary blue text
- `text-dark` - Black headings
- `text-text-default` - Body text (#404040)
- `text-light` - Muted text (#949494)
- `border-border-light` - Borders (#e1e1e1)
- `bg-theme-light` - Light backgrounds (#fafafa)
- `bg-theme-dark` - Dark backgrounds (#1c1c1c)

## Notes

- Legacy site used Bootstrap 4 + custom SCSS
- New site uses Tailwind CSS v4
- Some components may need CSS adjustments to match exact legacy behavior
- Consider creating Astro components for frequently used legacy patterns

## Questions to Answer

1. Do we need the calendar component (react-big-calendar)?
2. Should we keep the same page structure as legacy?
3. Are there new features to add beyond legacy functionality?
4. What about the S3 integration mentioned in legacy code?

## Resources

- Legacy site source: `../old-anl-soruce-code/`
- Color reference: `LEGACY_COLORS_AND_STYLES.md`
- Project guidelines: `CLAUDE.md` (in root)
