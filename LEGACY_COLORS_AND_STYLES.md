# Legacy Site Colors and Styles Reference

This document contains all the colors, typography, and design system elements from the original AgileN Lite website.

## Primary Color Palette

### Brand Colors
- **Primary Blue**: `#045bc1` - Main brand color used for CTAs, links, and primary actions
- **Cyan**: `#00d6ff` - Info/accent color
- **Yellow/Orange**: `#f37f29` - Warning/highlight color
- **Green**: `#7ed321` - Success states
- **Red**: `#d0021b` - Error/danger states

### Background Colors
- **Hero Background**: `#a9c6ca` - Light blue-teal used in homepage hero
- **White**: `#fff` - Primary background
- **Body Background**: White

## Grayscale Palette

```scss
$gray-100: #fafafa  // Lightest gray, light backgrounds
$gray-200: #f2f2f2  // Form disabled backgrounds, table headers
$gray-300: #e1e1e1  // Borders, dividers
$gray-400: #bebebe
$gray-500: #949494  // Muted text
$gray-600: #7F7F7F
$gray-700: #666666  // Secondary text, dropdown links
$gray-800: #555555
$gray-900: #404040  // Primary body text color
$gray-1000: #2b2b2b
$gray-1100: #1c1c1c // Dark theme
$black: #000
```

## Theme Colors

```scss
$primary: #045bc1 (Blue)
$secondary: #666666 (Gray-700)
$success: #7ed321 (Green)
$info: #00d6ff (Cyan)
$warning: #f37f29 (Yellow/Orange)
$danger: #d0021b (Red)
$light: #fafafa (Gray-100)
$dark: #1c1c1c (Gray-1100)
```

## Typography

### Font Families
- **Headings**: `Raleway` (Sans-serif, font-weight: 600)
- **Body**: `Source Sans Pro` (Sans-serif, font-weight: 400)
- **Fallback Stack**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`

### Font Sizes (Modular Scale)
```scss
-1: 0.75rem   (12px)
0:  1rem      (16px) - Base size
1:  1.333rem  (21.33px)
2:  1.777rem  (28.43px)
3:  2.369rem  (37.90px)
4:  3.157rem  (50.51px)
5:  4.199rem  (67.18px)
6:  5.584rem  (89.34px)
7:  7.427rem  (118.83px)
8:  9.878rem  (158.05px)
```

### Heading Sizes
```scss
h1: 3.157rem  (50.51px)
h2: 2.369rem  (37.90px)
h3: 1.777rem  (28.43px)
h4: 1.333rem  (21.33px)
h5: 1rem      (16px)
h6: 0.75rem   (12px)
```

### Font Weights
```scss
$font-weight-thin: 100
$font-weight-extra-light: 200
$font-weight-light: 300
$font-weight-normal: 400 (Body text)
$font-weight-medium: 500
$font-weight-semi-bold: 600 (Headings)
$font-weight-bold: 700 (Buttons)
$font-weight-extra-bold: 800
$font-weight-black: 900 (Displays)
```

### Typography Settings
- **Base Line Height**: 1.45
- **Heading Line Height**: 1.2
- **Body Color**: `#404040` (Gray-900)
- **Headings Color**: `#000` (Black)
- **Muted Text**: `#949494` (Gray-500)

## Spacing System

Based on 1rem (16px) base:
```scss
0: 0
1: 0.25rem   (4px)
2: 0.5rem    (8px)
3: 1rem      (16px)
4: 1.8rem    (28.8px)
5: 3rem      (48px)
6: 4rem      (64px)
7: 5rem      (80px)
8: 7.5rem    (120px)
9: 10rem     (160px)
10: 12.5rem  (200px)
11: 15rem    (240px)
```

## Border Radius
```scss
$border-radius: 0.1875rem (3px) - Default, used everywhere
$border-radius-soft: 0.625rem (10px)
$border-radius-capsule: 3.125rem (50px) - Pill buttons
```

## Buttons

### Default Button Styles
- **Padding**: `0.8rem 1rem` (12.8px 16px)
- **Font Size**: `14px`
- **Font Weight**: 700 (Bold)
- **Border Radius**: `0.1875rem` (3px)

### Button Sizes
```scss
Small:
  padding: 0.4rem 1.2rem

Default:
  padding: 0.8rem 2.5rem

Large:
  padding: 1.2rem 4rem
```

### Primary Button (Blue)
- **Background**: `#045bc1`
- **Text**: White
- **Hover Background**: `#03499c`
- **Active Border**: `#03438f`

## Forms & Inputs

### Input Styles
- **Border Color**: `#e1e1e1` (Gray-300)
- **Text Color**: `#404040` (Gray-900)
- **Disabled Background**: `#f2f2f2` (Gray-200)
- **Padding**: Same as buttons

### Form Elements
- **Border Radius**: `0.1875rem` (3px)
- **Focus State**: Uses primary blue

## Grid Breakpoints
```scss
xs: 0
sm: 576px
md: 768px
lg: 992px
xl: 1200px
xxl: 1480px
```

## Container Max Widths
```scss
sm: 540px
md: 720px
lg: 960px
xl: 1140px
xxl: 1400px
```

## Special Component Colors

### Calendar/Event Components
- **Event Background**: `rgba(4, 91, 193, 0.81)` - Semi-transparent primary blue
- **Active State**: `#045bc1` (Primary blue)
- **Hover State**: `#03499c` (Darker blue)

### Carousel/Slider
- **Arrow Color**: `#000` (Black on desktop)
- **Mobile Arrow Background**: `rgba(128, 128, 128, 0.4)` - Semi-transparent gray
- **Mobile Arrow Color**: `#fff` (White)
- **Arrow Font Size**: `4.199rem` (Desktop), `2rem` (Mobile)

### Pagination
- **Default Color**: `#000` (Black)
- **Border**: `#e1e1e1` (Gray-300)
- **Hover/Active Background**: `#000` (Black)
- **Hover/Active Text**: `#fff` (White)

### Tables
- **Border**: `#e1e1e1` (Gray-300)
- **Header Background**: `#f2f2f2` (Gray-200)
- **Header Text**: `#1c1c1c` (Dark)

## Shadow
```scss
$box-shadow-lg: 0 1rem 4rem rgba(0, 0, 0, .175)
```

## Navigation
- **Font Size**: `0.8rem` (Smaller than body)
- **Padding Vertical**: `0.5rem`
- **Padding Horizontal**: `1rem`

### Light Navbar
- **Link Color**: `rgba(0, 0, 0, .55)`
- **Hover Color**: `rgba(0, 0, 0, .9)`
- **Active Color**: `#000`

### Dark Navbar
- **Link Color**: `rgba(255, 255, 255, .55)`
- **Hover Color**: `rgba(255, 255, 255, .9)`
- **Active Color**: `#fff`

## Social Media Colors
```scss
$linkedin: #0077B5
$facebook: #3b5998
$twitter: #1da1f2
$google-plus: #db4437
$github: #24292e
$youtube: #ff0002
```

## Key Design Patterns

### Card Spacing
- **Vertical Padding**: `1rem` (16px)
- **Horizontal Padding**: `3rem` (48px)

### Modal Container
- **Desktop Width**: `700px`
- **Mobile Width**: `100%`

### Hero Banner
- **Background Image**: `/static/assets/images/home-blur.jpg`
- **Background Color Fallback**: `#a9c6ca`
- **Logo Width**: `50%` (Desktop), `40%` (Tablet), `100%` (Mobile <375px)

### Text Spacing
- **First Paragraph Top**: `1.5rem`
- **Between Paragraphs**: `2rem`
- **After Images**: `1.5rem`

## Color Usage Guidelines

1. **Primary Blue (#045bc1)**: Use for all primary actions, CTAs, links, and interactive elements
2. **Cyan (#00d6ff)**: Use for informational states and accents
3. **Yellow/Orange (#f37f29)**: Use for warnings and highlights
4. **Green (#7ed321)**: Use for success states
5. **Red (#d0021b)**: Use for errors and critical actions
6. **Gray-900 (#404040)**: Use for body text
7. **Black (#000)**: Use for headings and high-emphasis text
8. **Gray-500 (#949494)**: Use for muted/secondary text
9. **Gray-300 (#e1e1e1)**: Use for borders and dividers
10. **Gray-200 (#f2f2f2)**: Use for subtle backgrounds and disabled states

## Mobile Responsiveness Notes

- Touch devices have hover effects disabled (see _custom.scss)
- Carousel controls are larger and more visible on mobile
- Typography scales down appropriately using the modular scale
- Maximum viewport width is constrained to prevent horizontal scrolling
