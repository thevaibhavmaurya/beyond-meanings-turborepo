# Create BeyondMeanings SaaS Landing Page

## Project Overview

Create a premium SaaS landing page for **BeyondMeanings** - an intelligent browser extension that brings Mac's Lookup feature to any browser with AI-powered multi-source research capabilities.

## Tech Stack & Requirements

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Components**: Use shadcn/ui extensively for premium look
- **Animation**: NO Framer Motion - server-side first, minimal client components
- **Theme**: Modern, premium, professional design
- **Responsive**: Mobile-first approach

## Page Structure & Sections

### Header/Navigation

- Logo: "BeyondMeanings"
- Navigation items: Home, Problems, Features, How To, Pricing, FAQ
- Login button (right aligned)
- Sticky header with backdrop blur
- Mobile hamburger menu

### Hero Section

- **Title**: Compelling headline about intelligent lookup extension
- **Subtitle**: Supporting text about Mac Lookup for any browser
- **CTA Button**: "Download Extension" (primary button)
- **YouTube Video**: Embedded demo video player
- **Background**: Gradient or subtle pattern
- Use `@repo/ui/components/button` for CTA

### Problems Section

- **Title**: "Problems That People Face Looking for Mac Lookup Features"
- **Subtitle**: Supporting description
- **Cards Layout**: Creative grid of problem cards
- Each card has:
  - Title
  - Description
  - "Read More" button
- Use `@repo/ui/components/card` components
- Problems to highlight:
  1. Constant tab switching for research
  2. Fragmented information sources
  3. Time wasted on repetitive searches
  4. Lack of organized results
  5. Missing context while reading
  6. Poor mobile research experience

### Features Section

- **Title**: "Powerful Features"
- **Subtitle**: Feature overview
- **Feature Cards**: Showcase key capabilities
- Features to highlight:
  1. **Multi-Source Research** - Wikipedia, Web Search, Movies, Games, Dictionary
  2. **AI-Powered Intelligence** - Context-aware results
  3. **Organized Tab Interface** - Clean, structured presentation
  4. **Real-time Information** - Current web results
  5. **Cross-Platform** - Works on any browser
  6. **Privacy Focused** - No tracking
- Use `@repo/ui/components/badge` for feature tags

### How To Section

- **Title**: "How It Works"
- **Subtitle**: Simple 3-step process
- **Steps**:
  1. Highlight any text
  2. Click BeyondMeanings icon
  3. Get organized results instantly
- Use step indicators and icons

### Pricing Section

- **Title**: "Simple, Affordable Pricing"
- **Subtitle**: Pricing description
- **Use This Exact Object** (import and map over it):

```typescript
export const BILLING_PLANS = {
  FREE: {
    name: "Free",
    yearlyPrice: 0,
    halfYearlyPrice: 0,
    features: [
      "15 Lookups per day",
      "Use on 1 Device",
      "Wikipedia Information",
      "Dictionary Definitions",
      "Basic Web Search Results",
      "Standard Response Time",
    ],
  },
  PRO: {
    name: "Pro",
    yearlyPrice: 24,
    halfYearlyPrice: 15,
    features: [
      "Unlimited Lookups",
      "Use on 5 Devices",
      "All Information Sources",
      "Movie & TV Database (TMDB)",
      "Gaming Database (IGDB)",
      "Real-time Web Search",
      "Custom Shortcut Keys",
      "Priority Response Time",
      "Organized Tab Interface",
      "Advanced AI Summaries",
    ],
  },
};
```

- Use `@repo/ui/components/card` for pricing cards
- Toggle between yearly/half-yearly pricing
- Highlight popular plan

### FAQ Section

- **Title**: "Frequently Asked Questions"
- **Subtitle**: FAQ description
- Use `@repo/ui/components/accordion` for collapsible FAQs
- Include 6-8 relevant questions about:
  - Browser compatibility
  - Privacy & security
  - Usage limits
  - Installation process
  - Subscription management
  - Feature differences

### Footer

- Company info and links
- Social media icons
- Copyright notice
- Privacy policy & Terms links
- Newsletter signup
- Use multi-column layout

## Design Guidelines

### Color Scheme

- Primary: Modern blue/purple gradient
- Secondary: Complementary accent colors
- Background: Clean whites/light grays
- Text: High contrast for readability

### Typography

- Headings: Bold, modern sans-serif
- Body: Clean, readable font
- Use proper font weights and sizes
- Excellent hierarchy

### Components to Use

- `@repo/ui/components/button`
- `@repo/ui/components/card`
- `@repo/ui/components/badge`
- `@repo/ui/components/accordion`
- `@repo/ui/components/separator`
- `@repo/ui/components/navigation-menu`
- `@repo/ui/components/sheet` (for mobile menu)

### Layout Guidelines

- Generous white space
- Consistent spacing system
- Grid-based layouts
- Premium visual hierarchy
- Smooth scrolling between sections

## File Structure

```
app/
├── page.tsx (main landing page)
├── globals.css
├── layout.tsx
components/
├── ui/ (shadcn components)
├── Header.tsx
├── Hero.tsx
├── Problems.tsx
├── Features.tsx
├── HowTo.tsx
├── Pricing.tsx
├── FAQ.tsx
├── Footer.tsx
lib/
├── utils.ts
├── billing-plans.ts (pricing data)
```

## Key Requirements

1. **Premium Look**: High-quality, professional design
2. **Performance**: Fast loading, optimized images
3. **Accessibility**: Proper ARIA labels, keyboard navigation
4. **SEO Ready**: Proper meta tags, structured data
5. **Responsive**: Perfect on all devices
6. **Server-Side**: Minimize client components
7. **shadcn Integration**: Use components consistently

## Additional Notes

- Add proper TypeScript types
- Include loading states where needed
- Implement proper error boundaries
- Use semantic HTML elements
- Add smooth anchor link navigation
- Include proper meta descriptions and OG tags

Create a landing page that converts visitors and showcases BeyondMeanings as the premier intelligent research extension for modern web browsers.
