# SleeckOS Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern tech companies like Linear, Vercel, and GitHub for their sophisticated dark-themed interfaces and professional aesthetics.

## Core Design Elements

### A. Color Palette
**Dark Mode Primary:**
- Background: Pure black (#000000) or near-black (220 8% 4%)
- Text Primary: Pure white (#FFFFFF) 
- Text Secondary: Light gray (220 10% 80%)
- Accent: Cool blue (220 90% 60%) for interactive elements
- Border/Divider: Dark gray (220 10% 20%)

### B. Typography
**Font Stack:**
- Primary: Inter (Google Fonts) - clean, modern sans-serif
- Headings: 600-700 weight
- Body: 400-500 weight
- Code/Technical: JetBrains Mono for any code snippets

**Hierarchy:**
- Hero Title: 3xl-4xl (mobile-desktop)
- Section Headers: 2xl-3xl
- Course Titles: xl
- Body Text: base-lg
- Descriptions: sm-base

### C. Layout System
**Spacing Framework:** Tailwind units of 4, 6, 8, 12, 16
- Container max-width: 7xl with mx-auto
- Section padding: py-16 (desktop), py-12 (mobile)
- Component gaps: gap-6 to gap-8
- Grid layouts: 1 column (mobile), 2-3 columns (desktop)

### D. Component Library

**Navigation:**
- Fixed header with transparent/glass effect
- Logo: White text, bold weight
- Navigation links with subtle hover animations

**Hero Section:**
- Large typography with fade-in animation
- Tagline with staggered text reveal
- Minimal CTA button with hover glow effect

**Course Cards:**
- Dark cards with subtle border (220 10% 20%)
- Hover: Slight scale transform and border glow
- Icon/image placeholder at top
- Title, description, and optional metadata

**Buttons:**
- Primary: Solid with blue background
- Secondary: Outline with transparent background
- Hover: Subtle glow and scale effects

### E. Animations
**Entrance Animations:**
- Fade-in with slight y-translation on scroll
- Staggered reveals for course grid items
- Duration: 0.5-0.8s with ease-out timing

**Hover Effects:**
- Button: Scale 1.02 with glow
- Course cards: Scale 1.01 with border highlight
- Links: Underline expand animation

## Visual Treatment

**Professional Minimalism:**
- High contrast for accessibility (white on black)
- Generous whitespace for breathing room
- Sharp, clean lines with subtle rounded corners (4-6px)
- Focus on typography hierarchy over decorative elements

**Interactive Feedback:**
- Subtle hover states that don't distract
- Smooth transitions (300ms duration)
- Visual feedback for clickable elements

## Content Structure

**Homepage Sections:**
1. Hero: Company name, tagline, mission (single viewport)
2. Overview: Brief SleeckOS description
3. Courses: Grid layout of course offerings
4. Footer: Minimal contact/links

**Responsive Behavior:**
- Mobile-first approach
- Course grid: 1 column (mobile) → 2-3 columns (desktop)
- Typography scales appropriately across breakpoints
- Touch-friendly interactive elements (44px minimum)

## Images
**Minimal Image Usage:**
- Optional course icons: Simple line icons or tech symbols
- No large hero images - focus on typography and clean layout
- If icons used: Monochrome white/gray to maintain aesthetic
- Course placeholders: Abstract geometric shapes or tech-related iconography

This design prioritizes readability, professionalism, and modern web aesthetics while maintaining the requested dark theme and minimalist approach.