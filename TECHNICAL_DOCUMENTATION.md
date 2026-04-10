# Femme Flex Ladies Gym & Fitness
## Technical Documentation & User Manual

**Version:** 1.0  
**Date:** April 2025  
**Prepared for:** Client Handover  
**Developer:** AWS-7

---

## 1. PROJECT OVERVIEW

### 1.1 About Femme Flex
**Femme Flex** is a luxury, women-only fitness sanctuary located in Madurai, Tamil Nadu. The website serves as the digital front door for the gym, showcasing its premium facilities, expert trainers, and exclusive community for women.

### 1.2 Business Details
- **Brand Name:** Femme Flex
- **Tagline:** "Madurai's Premier Women-Only Fitness Sanctuary"
- **Location:** Kadachanenthal & Ottakadai, Madurai
- **Target Audience:** Women seeking a safe, judgment-free fitness environment
- **Contact Numbers:** 
  - Kadachanenthal: 90808 82873
  - Ottakadai: 93442 49843

### 1.3 Website Purpose
- Attract new members through visual appeal
- Showcase facilities and services
- Enable easy contact and enquiry
- Build brand authority in fitness industry
- Integrate social media presence

---

## 2. TECHNOLOGY STACK

### 2.1 Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.x | UI Component Library |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Vite** | 5.x | Build Tool & Dev Server |
| **Tailwind CSS** | 3.x | Utility-first CSS Framework |
| **Lucide React** | Latest | Icon Library |
| **AOS (Animate On Scroll)** | 2.x | Scroll Animations |
| **Canvas Confetti** | Latest | Celebration Effects |

### 2.2 Design Specifications
- **Color Scheme:** Luxury Black & Gold
  - Primary Gold: `#D4AF37`
  - Secondary Purple: `#800080`
  - Background: `#111111`
- **Typography:** Serif Display Font (Bold, Elegant)
- **Responsive Breakpoints:**
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### 2.3 Deployment & Hosting
| Platform | Purpose | URL |
|----------|---------|-----|
| **GitHub** | Code Repository | https://github.com/aws-7/F-F-L-G-F-MADURAI-byAWS |
| **GitHub Pages** | Frontend Hosting | https://aws-7.github.io/F-F-L-G-F-MADURAI-byAWS/ |
| **Netlify** | Production (Future) | (To be configured) |

---

## 3. WEBSITE STRUCTURE & FEATURES

### 3.1 Section Breakdown

#### 1. Hero Section
- Full-screen background
- Animated headline
- CTA buttons with confetti effect

#### 2. Our Story (About)
- **Animated Text Cycling:** Expert Trainers → Elite Branches → Active Many Members
- Fade-in animation (2-second intervals)
- Gym philosophy and founding story

#### 3. Our Spaces (Gallery)
- **Follow Us Sub-section:**
  - Instagram: Purple-Magenta-Orange gradient glow
  - Facebook: Vibrant blue (#1877F2) glow
- **Facility Gallery:** 6 images with gold hover glow

#### 4. Our Programs
- Horizontal scrolling cards
- Auto-scroll carousel

#### 5. Diet Plans
- Nutrition guidance cards
- Auto-scrolling carousel

#### 6. BMI Calculator
- Height & Weight input
- Real-time BMI calculation
- Color-coded health categories

#### 7. Membership (Pricing)
- 3-tier pricing structure
- Monthly/Yearly toggle
- "Most Popular" badge

#### 8. Class Schedule
- Weekly timetable
- WhatsApp booking integration

#### 9. Contact
- Two branch locations
- Click-to-call phone numbers
- WhatsApp integration

---

## 4. KEY FEATURES

### 4.1 Design Features
| Feature | Description | Status |
|---------|-------------|--------|
| Black & Gold Theme | Luxury color scheme | Active |
| Responsive Layout | Mobile-first design | Active |
| Gold Hover Effects | Cards glow on hover | Active |
| Neon Social Buttons | Instagram/Facebook glow | Active |
| Text Animations | Cycling stats | Active |

### 4.2 Social Media Integration
| Platform | Link | Style |
|----------|------|-------|
| **Instagram** | instagram.com/femme_flexmdu59 | Neon gradient |
| **Facebook** | facebook.com/share/18EeaQWTW1/ | Neon blue |
| **WhatsApp** | wa.me/919080882873 | Click-to-chat |

---

## 5. ADMIN INSTRUCTIONS

### 5.1 How to Update Phone Numbers

**Files:** `Contact.tsx`, `Footer.tsx`, `CTABanner.tsx`

```typescript
// Find and replace phone numbers
phone: '90808 82873', // Change this
```

### 5.2 How to Update Social Media Links

**File:** `src/components/Gallery.tsx`

```tsx
<a href="https://www.instagram.com/NEW_USERNAME">
```

### 5.3 How to Update Images

**Location:** `src/images/` (component images) or `public/images/` (videos)

1. Add new file to folder
2. Import in component
3. Reference in code

### 5.4 Deployment Process

```bash
# 1. Make changes
# 2. Test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "Description"
git push origin main

# 4. Wait 2-3 minutes for deployment
```

---

## 6. CONTACT INFORMATION

### Business Contact
- **Kadachanenthal:** 90808 82873
- **Ottakadai:** 93442 49843
- **Instagram:** @femme_flexmdu59
- **Facebook:** Femme Flex Madurai

### Technical Support
- **Developer:** AWS-7
- **Repository:** https://github.com/aws-7/F-F-L-G-F-MADURAI-byAWS

---

## 7. LICENSE & COPYRIGHT

**Copyright 2025 Femme Flex. All Rights Reserved.**

This website and its content are the property of Femme Flex. Unauthorized copying or reproduction is prohibited.

---

*Document Version 1.0 - April 2025*
