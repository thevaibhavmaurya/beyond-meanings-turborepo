# BeyondMeanings Browser Extension - Production Rewrite

## Project Overview

Build a production-ready browser extension that brings intelligent research capabilities to any webpage. Create a Mac-style floating popup with horizontal tabs that provides comprehensive information about selected text using AI-powered research.

## Technical Stack

- **Framework**: React 18+ with TypeScript
- **Styling**: TailwindCSS + shadcn/ui components from `@repo/ui`
- **Build**: Vite with Chrome Extension plugin
- **Manifest**: Chrome Extension Manifest V3
- **State Management**: React hooks (useState, useReducer, useContext)
- **Types**: Import from `@repo/types` and extend as needed

## Project Structure

```
extension/
├── manifest.json                   # Manifest V3 configuration
├── src/
│   ├── background/
│   │   └── service-worker.ts       # Background service worker
│   ├── content/
│   │   ├── content-script.tsx      # Main content script
│   │   ├── FloatingPopup.tsx       # Popup component
│   │   └── SelectionHandler.ts     # Text selection logic
│   ├── popup/
│   │   ├── popup.html              # Extension popup HTML
│   │   ├── Popup.tsx               # Extension popup component
│   │   └── Settings.tsx            # Settings panel
│   ├── components/
│   │   ├── ui/                     # shadcn components from @repo/ui
│   │   ├── TabSystem.tsx           # Horizontal tabs
│   │   ├── ContentViewer.tsx       # Tab content display
│   │   ├── LoadingState.tsx        # Loading animations
│   │   └── ErrorBoundary.tsx       # Error handling
│   ├── lib/
│   │   ├── api.ts                  # API integration
│   │   ├── storage.ts              # Chrome storage wrapper
│   │   ├── utils.ts                # Utility functions
│   │   └── constants.ts            # App constants
│   ├── hooks/
│   │   ├── useResearch.ts          # Research API hook
│   │   ├── useStorage.ts           # Storage hook
│   │   └── useSelection.ts         # Text selection hook
│   ├── types/
│   │   └── index.ts                # Extension-specific types
│   └── styles/
│       ├── globals.css             # Import from @repo/ui
│       ├── content.css             # Content script styles
│       └── floating-popup.css      # Popup-specific styles
├── public/
│   ├── icons/                      # Extension icons (16,32,48,128px)
│   └── popup.html                  # Popup HTML template
├── dist/                          # Built extension files
├── package.json
├── vite.config.ts                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration
└── tsconfig.json                  # TypeScript configuration
```

## Core Components Implementation

### 1. Floating Popup Component (`FloatingPopup.tsx`)

Create a Mac-style floating popup that appears near selected text:

**Design Requirements:**

- **Dimensions**: 400px width × 320px height (responsive)
- **Positioning**: Smart positioning near text selection
- **Theme**: Use exact colors from `@repo/ui/globals.css`
- **Animation**: Smooth fade-in/out transitions
- **Shadow**: Mac-style drop shadow with backdrop blur
- **Border**: 8px rounded corners

**Layout Structure:**

```
┌─────────────────────────────────────┐
│  Primary Summary (if available)     │
├─────────────────────────────────────┤
│                                     │
│  Tab Content Area                   │
│  (scrollable)                       │
│                                     │
├─────────────────────────────────────┤
│ [Wiki] [Dict] [Web] [Movie] [Game]  │ ← Horizontal tabs
└─────────────────────────────────────┘
```

**Key Features:**

- Smart positioning (avoid screen edges)
- Escape key to close
- Click outside to dismiss
- Smooth tab switching animations
- Loading states for each tab
- Error handling for failed content

### 2. Tab System (`TabSystem.tsx`)

Implement horizontal tabs at the bottom of the popup:

**Tab Types:**

- **Wikipedia**: Encyclopedia information
- **Definition**: Dictionary definitions
- **Web Search**: Real-time web results
- **Movies**: TMDB movie/TV data (when relevant)
- **Gaming**: IGDB game data (when relevant)

**Tab Features:**

- Active tab highlighting with `text-primary` and `border-primary`
- Smooth transitions using CSS transforms
- Badge indicators for tab content availability
- Icons using Lucide React icons
- Responsive tab sizing

### 3. API Integration (`api.ts`)

Implement the research API workflow:

**Lookup Request:**

```typescript
const lookupResult = await fetch("/api/research/lookup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": `${apiKey}`,
  },
  body: JSON.stringify({ query: selectedText }),
});
```

**Status Polling:**

```typescript
const pollStatus = async (researchId: string) => {
  const response = await fetch(`/api/research/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${apiKey}`,
    },
    body: JSON.stringify({ research_id: researchId }),
  });
  return response.json();
};
```

**Features:**

- Exponential backoff for polling
- Request timeout handling (15 seconds)
- Rate limit respect (429 responses)
- Error recovery and retry logic
- API key validation

### 4. Text Selection Handler (`SelectionHandler.ts`)

Handle text selection detection and triggering:

**Selection Detection:**

- Monitor `mouseup` and `keyup` events
- Validate selection length (3-200 characters)
- Handle special characters and Unicode
- Ignore selections in form inputs

**Keyboard Shortcuts:**

- `Ctrl+I` (Windows/Linux) or `Cmd+I` (Mac)
- Customizable shortcuts for Pro users
- Context menu integration
- Selection highlighting

### 5. Storage Management (`storage.ts`)

Handle Chrome storage for settings and caching:

**Stored Data:**

- API key (encrypted in `chrome.storage.sync`)
- User preferences (shortcuts, theme, default tabs)
- Recent research cache (last 20 queries)
- Usage analytics (privacy-compliant)

**Features:**

- Automatic sync across devices
- Cache expiration (24 hours)
- Storage quota management
- Migration handling for updates

## shadcn/ui Component Usage

Import and use components exactly as specified:

```typescript
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import { Separator } from "@repo/ui/components/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { ScrollArea } from "@repo/ui/components/scroll-area";
```

**Component Styling:**

- Use default shadcn variants only
- Apply `@repo/ui/globals.css` theme exactly
- Responsive classes: `sm:`, `md:`, `lg:` breakpoints
- Color tokens: `text-primary`, `bg-muted`, `border-border`
- No custom CSS beyond component composition

## State Management Architecture

### Research Hook (`useResearch.ts`)

```typescript
export const useResearch = () => {
  const [state, dispatch] = useReducer(researchReducer, initialState);

  const startResearch = async (query: string) => {
    // Implementation with polling logic
  };

  const getTabContent = (tabName: string) => {
    // Return content for specific tab
  };

  return {
    isLoading: state.isLoading,
    currentQuery: state.currentQuery,
    tabs: state.tabs,
    primarySummary: state.primarySummary,
    error: state.error,
    startResearch,
    getTabContent,
  };
};
```

### Storage Hook (`useStorage.ts`)

```typescript
export const useStorage = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  const saveApiKey = async (key: string) => {
    // Secure storage implementation
  };

  const getSettings = async () => {
    // Load user preferences
  };

  return { apiKey, settings, saveApiKey, getSettings };
};
```

## Content Script Implementation

### Main Content Script (`content-script.tsx`)

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import FloatingPopup from './FloatingPopup';
import SelectionHandler from './SelectionHandler';

// Create shadow DOM for style isolation
const shadowHost = document.createElement('div');
shadowHost.id = 'beyondmeanings-extension-root';
document.body.appendChild(shadowHost);

const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(/* CSS from globals.css and tailwind */);
shadowRoot.adoptedStyleSheets = [styleSheet];

// React app container
const container = document.createElement('div');
shadowRoot.appendChild(container);

const root = ReactDOM.createRoot(container);
root.render(<App />);
```

## Manifest V3 Configuration

```json
{
  "manifest_version": 3,
  "name": "BeyondMeanings",
  "version": "1.0.0",
  "description": "Intelligent research for any text on the web",
  "permissions": ["storage", "activeTab", "contextMenus"],
  "host_permissions": ["<all_urls>"],
  "background": {
    "service_worker": "background/service-worker.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content/content-script.js"],
      "css": ["styles/content.css"]
    }
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon-16.png",
      "32": "icons/icon-32.png",
      "48": "icons/icon-48.png",
      "128": "icons/icon-128.png"
    }
  }
}
```

## Build Configuration (`vite.config.ts`)

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@repo/ui": path.resolve(__dirname, "../packages/ui/src"),
      "@repo/types": path.resolve(__dirname, "../packages/types/src"),
    },
  },
});
```

## Error Handling Strategy

### API Error Handling

- Network timeouts (15 seconds)
- Rate limiting (429 status codes)
- Authentication errors (401/403)
- Server errors (500+ status codes)
- Graceful degradation for partial failures

### UI Error Boundaries

- Component-level error boundaries
- Fallback UI for broken tabs
- Recovery mechanisms
- User-friendly error messages

### Edge Cases

- Very long text selections (truncate to 200 chars)
- Special characters and emoji handling
- Protected/encrypted content
- CSP-restricted pages

## Performance Requirements

### Loading Performance

- Popup appears within 200ms of trigger
- First tab content within 3 seconds
- Smooth 60fps animations
- Memory usage under 50MB

### API Performance

- Debounced API calls (500ms delay)
- Request caching (24-hour TTL)
- Background prefetching for common queries
- Efficient polling intervals (2s → 5s → 10s)

## Accessibility Standards

### Keyboard Navigation

- Full keyboard support for all interactions
- Proper tab order and focus management
- Escape key handling
- Arrow key tab navigation

### Screen Reader Support

- Proper ARIA labels and descriptions
- Role definitions for custom components
- Live regions for dynamic content updates
- High contrast mode compatibility

## Security Implementation

### Content Security Policy

- Strict CSP compliance
- No inline scripts or styles
- Nonce-based script loading
- Safe content sanitization

### Data Security

- API key encryption in storage
- HTTPS-only API communications
- Input validation and sanitization
- No sensitive data logging

## Development Commands

```json
{
  "scripts": {
    "dev": "vite build --watch --mode development",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx",
    "type-check": "tsc --noEmit",
    "package": "npm run build && zip -r extension.zip dist/"
  }
}
```

## Quality Checklist

### Functionality

- [ ] Text selection detection works on all websites
- [ ] Floating popup positions correctly
- [ ] All API endpoints integrate properly
- [ ] Tab system switches content smoothly
- [ ] Settings persist across browser sessions
- [ ] Keyboard shortcuts work reliably

### Performance

- [ ] Popup loads within 200ms
- [ ] No memory leaks after extended use
- [ ] Smooth animations on all devices
- [ ] Efficient polling without blocking UI
- [ ] Minimal impact on page load times

### Design System Compliance

- [ ] Exact color matching with `@repo/ui/globals.css`
- [ ] Consistent typography and spacing
- [ ] Proper dark/light mode support
- [ ] Responsive design across screen sizes
- [ ] shadcn component styling integrity

### Browser Compatibility

- [ ] Chrome (latest 3 versions)
- [ ] Firefox (Manifest V3 support)
- [ ] Edge (Chromium-based)
- [ ] Safari (basic support)

Build a production-ready extension that feels like a native browser feature while delivering the intelligent research capabilities that make BeyondMeanings unique.
