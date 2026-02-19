# Changes and Updates Log

> **Purpose**: This document tracks all coding changes, updates, and deployments. It serves as a reference for rollback and learning.
> **Status**: INTERNAL ONLY (Ignored by Git)

## 2026-02-20 (Current Session)

### [FIX] Build & Deployment
- **Issue**: Vercel deployment failed due to TypeScript strict mode in a JS project and Tailwind v4 syntax errors (spaces in arbitrary values).
- **Fix 1**: Updated `package.json` to remove `tsc` from the build script (`"build": "vite build"`).
- **Fix 2**: Refactored `index.css` to remove spaces from arbitrary shadow values (e.g., `shadow-[0_2px...]`).
- **Fix 3**: Replaced legacy `border-opacity-0` with `border-transparent`.
- **Fix 4**: Converted arbitrary gradients to standard CSS `background` properties to bypass Tailwind parser issues.
- **Outcome**: Local build passed. Vercel deployment succeeded. Live URL generated.

### [NEW] Documentation Structure
- Created `docs/` directory.
- Created `changes_and_updates.md` (This file).
- Created `ui_ux_glossary.md`.
- Created `it_consultant_reference.md`.
- Updated `.gitignore` to exclude internal docs.

### [COMPLETED] Phase 15: Telemedicine Compliance & Expert Profiles
- **Verifiable Credentials**: Added medical qualifications (e.g., MBBS, MD) and State Medical Council Registration Numbers to Expert profiles.
- **Fee Transparency**: Explicitly stated consultation fees upfront.
- **Detailed Profile Drawer**: Replaced immediate checkout with a clinical bio drawer.
- **Legal Disclaimers**: Injected mandatory text stating teleconsultations are not for emergencies (Telemedicine Practice Guidelines 2020).

### [COMPLETED] Phase 14: E-Commerce Experience Overhaul (Shop Page)
- **Layout Toggle**: Added switch between 2x2 Grid (discovery) and 1-column List (details).
- **Advanced Filtering & Sorting**: Added multi-select Filter Drawer and dropdown Sorting (Price, Rating).
- **Branded Imagery**: Replaced generic placeholders with realistic, branded "Sutrr" product images across both Shop and Learn pages.

### [COMPLETED] Phase 13: Global Safety Features (Quick Exit)
- **Quick Exit Component**: Created a discreet escape hatch button using `window.location.replace('https://www.google.com')` to skip browser history.
- **Fake Weather Overlay**: Implemented an instant disguise screen as an alternative discreet mode option.

### [COMPLETED] Phase 12: Navigation Overhaul & Conversion Engine
- **Center AI Nav Bar**: Refactored Bottom Nav with a stylized Chatbot FAB in the center.
- **Conversion Ticker**: Implemented auto-rotating social proof ticker ("3 doctors online").
- **Top App Bar**: Moved Profile avatar next to Notification Bell.

### [COMPLETED] Phase 11: Real-time Dashboard & Notification UX
- **Notification Drawer**: Built functional slide-out UI using framer-motion.
- **Unified Wellness Charts**: Integrated `recharts` for an interactive 3-tab data card (Energy, Mood, Cycle).
- **Data Persistence**: Wired Quick Logs to `localStorage` affecting the Dashboard charts instantly.

### [COMPLETED] Phase 10: Native App Polish & Compliance Verification
- **PWA Upgrades**: Added `viewport-fit=cover`, dynamic `theme-color`, turned off touch highlights (`-webkit-tap-highlight-color: transparent`), and enforced native `select-none` handling.
- **Visual Grammar Audit**: Fixed Onboarding action buttons (aligned "Go Back" and "Continue" with correct `.btn-outline` and `.btn-primary` weights per iOS HIG). Checked Journal/Chatbot modals for HIG/Material 3 compliance (Cancel on Left/Tonal, Action on Right/Filled).
- **Smooth Page Transitions**: Installed `framer-motion` and refactored `Layout.jsx` with `<AnimatePresence>` and `useOutlet()` to deliver 60fps iOS-style slide-in/fade transitions across tabs and immersive screens.
- **Native Haptics Engine**: Created `utils/haptics.js` and wired `navigator.vibrate` into core interactions (Bottom Nav tabs, Journal Save/Delete/Share, Chatbot Send/Delete/Rename) simulating physical device feedback.
- **Compliance Tagger**: Injected explicit `// COMPLIANCE (...)` tags spanning DPDP Act 2023 (Consent, Right to erasure, Purpose limitation), Telemedicine Guidelines 2020 (AI disclaimer), and Drugs & Cosmetics Act 1940 (Discreet E-Pharmacy Mode).
- **DRY Refactoring**: Extracted repetitive Header/ArrowLeft patterns across Settings, OrderHistory, and Cart into a single, unified `<PageHeader />` component handling `safe-pt` notch padding.

### [COMPLETED] Missing Features & Enhancements
- **Settings Hub**: Added `Settings.jsx` with Privacy (Camouflage, App Lock), Notifications, and Account management.
- **Order History**: Added `OrderHistory.jsx` with "Discreet Mode" (blurring item names).
- **Wellness Tracking**: Added interactive screens for `MoodCheckin`, `EnergyCheckin`, and `CycleCheckin`.
- **Chatbot**: Added "Clear History" menu and suggested prompts.

### Documentation & Code Quality
- **IT Consultant Reference**: created `docs/it_consultant_reference.md` (Pushed to GitHub).
- **JSDoc Comments**: Added architectural comments to `App.jsx`, `Layout.jsx`, and all Page components.

### [COMPLETED] Phase 6: UI Overhaul & Compliance
- **Journal**: Implemented dedicated `Journal.jsx` with prompts, mood selector, and history view.
- **Chatbot Redesign**: Switched to "Native Mobile" layout with fixed bottom input bar and improved bubbles.
- **Dashboard Trends**: Added "Weekly Energy" bar chart to visualize wellness patterns.
- **Compliance**: Added "Consent Manager" to Settings (DPDP 2023) and updated compliance documentation.
- **UI Refinement**: Hidden Bottom Nav on Chatbot for immersion; added Header Entry Point.

### [COMPLETED] Phase 7: Tier 2/3 Accessibility & Discoverability
- **Bottom Nav Labels**: All 5 tab icons now show persistent text labels (Home, Shop, Learn, Experts, Profile) for users unfamiliar with abstract icons.
- **Dashboard "Ask AI" Button**: Replaced icon-only Sparkles button with labeled pill: "✨ Ask AI".
- **AI Buddy Hero**: Moved AI Wellness Buddy card to top of Dashboard for maximum visibility.
- **Welcome Banner**: First-time users see a dismissible gradient banner: "Tap Ask AI for personalized advice".
- **Touch Targets**: Increased all interactive elements to ≥48px (WCAG 2.1 AA, India RPwD Act 2016).
- **Chatbot Emoji Prompts**: Added emoji prefixes (😟 💤 ❤️ 📅) to suggested prompts for visual scanning.

### [COMPLETED] Phase 8: Journal Screen Overhaul
- **3-View System**: Write (styled editor + sticky Save), History (entry list with management), Detail/Edit (full text view).
- **"Today's Reflection"**: Replaced confusing "Prompt" label with intuitive naming and "✨ New idea" shuffle.
- **Styled Editor**: Clean white card with character count and date footer (replaces raw textarea).
- **Note Management**: Tap-to-view entries, Edit toggle, per-entry trash icon.
- **Multi-Select**: Long-press activates checkbox mode with "Select All" and bulk "Delete" actions.
- **Delete Confirmation Modal**: Warning popup with red "Delete Permanently" button and clear consequence text.
- **Share to AI**: "Ask AI About This" button on entries → DPDP consent modal → pre-fills journal text into Chatbot.
- **DPDP Notices**: Data storage notice on entry detail; privacy/purpose-limitation notice on AI consent modal.
- **Nav Fix**: Bottom navigation hidden on all `/checkin/*` routes to prevent overlap with sticky action bars.
- **localStorage Persistence**: Journal entries persist across sessions.

### [COMPLETED] Phase 9: Chatbot Management Overhaul
- **2-View System**: Conversation List (ChatGPT-style) + Active Chat, inspired by ChatGPT/WhatsApp/Gemini.
- **Conversation List**: Shows all chats with auto-title, preview, relative date, message count, and per-convo trash icon.
- **New Chat**: Prominent "New Chat" button at bottom, "Start First Chat" CTA on empty state.
- **Auto-Title**: First user message becomes the conversation title.
- **Message Timestamps**: Every message shows time (e.g., "01:37 am") below the bubble.
- **Rename**: Inline rename via header menu → editable text field.
- **Delete Confirmation**: Warning modal for single delete and "Clear All" (DPDP-compliant).
- **localStorage Persistence**: All conversations persist across page refreshes.
- **Journal Integration**: "Share to AI" from Journal auto-creates a new conversation with pre-filled text.
- **Clear All**: Header "Clear All" button with confirmation modal for bulk deletion.

### [FIX] Navigation Regression
- **Issue**: All back buttons used `nav(-1)` which silently fails when there's no browser history, trapping users on check-in screens (especially Journal where bottom nav is hidden).
- **Fix**: Replaced `nav(-1)` with explicit route navigation (`/dashboard` or `/profile`) in 7 files: `Journal.jsx`, `Chatbot.jsx`, `MoodCheckin.jsx`, `EnergyCheckin.jsx`, `CycleCheckin.jsx`, `OrderHistory.jsx`, `Settings.jsx`.
- **Regression Test**: Full 10/10 pass across all screens and navigation paths.
