# Assets to Copy from Legacy Site

This document lists all the assets that need to be copied from the legacy site (`old-anl-source-code/static/`) to the new Astro project (`astro/public/`).

## Directory Structure

All assets should be copied to: `astro/public/assets/`

## Required Assets

### 1. Logo
**Source:** `old-anl-source-code/static/assets/images/`
**Destination:** `astro/public/assets/images/`

- `logo.png` - Main AgilenLite logo (displayed on home page)

### 2. Hero Background Images
**Source:** `old-anl-source-code/static/assets/images/`
**Destination:** `astro/public/assets/images/`

- `home-blur.jpg` - Hero background (portrait/desktop)
- `home-blur-landscape.jpg` - Hero background (landscape/mobile)

### 3. Navigation Icons (Line Icons)
**Source:** `old-anl-source-code/static/assets/images/lineicons/`
**Destination:** `astro/public/assets/images/lineicons/`

- `about-us.png`
- `our-services.png`
- `testimonials.png`
- `our-clients.png`
- `looking-for-courses.png`
- `our-partners.png`
- `media-gallery.png`
- `contact-us.png`
- `publications-and-resources.png`

### 4. Navigation Background Images
**Source:** `old-anl-source-code/static/assets/images/navigation/`
**Destination:** `astro/public/assets/images/navigation/`

- `about-us.jpg`
- `our-services.jpg`
- `testimonials.jpg`
- `our-clientsl.jpg` (note: typo in original)
- `looking-for-courses.jpg`
- `our-partners.jpg`
- `media-gallery.jpg`
- `contact-us.jpg`
- `publications-resourcesl.jpg` (note: typo in original)

### 5. Sidebar Background Images
**Source:** `old-anl-source-code/static/assets/images/sidebars/`
**Destination:** `astro/public/assets/images/sidebars/`

- `contact-us.jpg` - Default sidebar/footer background
- (Copy all other sidebar images from this directory)

### 6. Close Button Icons
**Source:** `old-anl-source-code/static/assets/images/`
**Destination:** `astro/public/assets/images/`

- `times.svg` - Close button (desktop)
- `times-black.svg` - Close button (mobile)

### 7. Additional Icons
**Source:** `old-anl-source-code/static/assets/images/icons/`
**Destination:** `astro/public/assets/images/icons/`

- `icheck-blue.png` - Checkbox icon
- `icheck-blue@2x.png` - Checkbox icon (HiDPI)
- (Any other icons in this directory)

## Copy Commands

From the legacy site directory, run:

```bash
# Create destination directories
mkdir -p astro/public/assets/images/lineicons
mkdir -p astro/public/assets/images/navigation
mkdir -p astro/public/assets/images/sidebars
mkdir -p astro/public/assets/images/icons

# Copy logo and hero images
cp static/assets/images/logo.png astro/public/assets/images/
cp static/assets/images/home-blur.jpg astro/public/assets/images/
cp static/assets/images/home-blur-landscape.jpg astro/public/assets/images/

# Copy navigation line icons
cp static/assets/images/lineicons/*.png astro/public/assets/images/lineicons/

# Copy navigation background images
cp static/assets/images/navigation/*.jpg astro/public/assets/images/navigation/

# Copy sidebar images
cp static/assets/images/sidebars/*.jpg astro/public/assets/images/sidebars/

# Copy close button icons
cp static/assets/images/times.svg astro/public/assets/images/
cp static/assets/images/times-black.svg astro/public/assets/images/

# Copy checkbox icons
cp static/assets/images/icons/icheck-blue*.png astro/public/assets/images/icons/
```

## Windows PowerShell Commands

If using Windows PowerShell:

```powershell
# From the anl-revamp root directory

# Create destination directories
New-Item -ItemType Directory -Force -Path "astro\public\assets\images\lineicons"
New-Item -ItemType Directory -Force -Path "astro\public\assets\images\navigation"
New-Item -ItemType Directory -Force -Path "astro\public\assets\images\sidebars"
New-Item -ItemType Directory -Force -Path "astro\public\assets\images\icons"

# Copy files
Copy-Item "old-anl-source-code\static\assets\images\logo.png" "astro\public\assets\images\"
Copy-Item "old-anl-source-code\static\assets\images\home-blur.jpg" "astro\public\assets\images\"
Copy-Item "old-anl-source-code\static\assets\images\home-blur-landscape.jpg" "astro\public\assets\images\"
Copy-Item "old-anl-source-code\static\assets\images\lineicons\*.png" "astro\public\assets\images\lineicons\"
Copy-Item "old-anl-source-code\static\assets\images\navigation\*.jpg" "astro\public\assets\images\navigation\"
Copy-Item "old-anl-source-code\static\assets\images\sidebars\*.jpg" "astro\public\assets\images\sidebars\"
Copy-Item "old-anl-source-code\static\assets\images\times.svg" "astro\public\assets\images\"
Copy-Item "old-anl-source-code\static\assets\images\times-black.svg" "astro\public\assets\images\"
Copy-Item "old-anl-source-code\static\assets\images\icons\icheck-blue*.png" "astro\public\assets\images\icons\"
```

## Verification

After copying, verify these files exist in the new project:

- [ ] `/assets/images/logo.png`
- [ ] `/assets/images/home-blur.jpg`
- [ ] `/assets/images/home-blur-landscape.jpg`
- [ ] `/assets/images/lineicons/` (9 PNG files)
- [ ] `/assets/images/navigation/` (9 JPG files)
- [ ] `/assets/images/sidebars/contact-us.jpg`
- [ ] `/assets/images/times.svg`
- [ ] `/assets/images/times-black.svg`

## Notes

- All paths in the new Astro site use `/assets/` instead of `/static/assets/`
- The `public/` directory in Astro serves files at the root, so `public/assets/` becomes `/assets/` in the browser
- Original file names and structure are preserved for easier maintenance
- Some original filenames have typos (e.g., "clientsl" instead of "clients") - these are preserved to match the legacy code
