# Design & Compliance Guide

## Design System (Glassmorphism & Wellness)
- **Palette**: `bg-indigo-50`, `text-gray-900`, `primary-indigo-600`.
- **Typography**: Inter (Clean, Modern, legible).
- **Components**: Rounded cards (`rounded-3xl`), soft shadows (`shadow-sm`, `shadow-indigo-200`), frosted glass effects on overlays.
- **Micro-interactions**: Active scale states (`active:scale-95`), smooth transitions.

## Compliance (Indian Healthcare Regulations)

### 1. Digital Personal Data Protection Act, 2023 (DPDP)
This application implements "Privacy by Design" to comply with DPDP 2023.

#### **Implemented Features:**
- **Consent Manager**: Located in `Settings > Privacy`. Allows users to granularly toggle:
    - AI Processing Permission.
    - Data Storage Permission.
    - Third-Party Sharing (disabled by default).
- **Right to Erasure**: Explicit "Data Deletion Request" button in Settings.
- **Purpose Limitation**: Data collection is minimal and purpose-bound (Mood, Energy, Purchases).
- **Data Principals**: Users are treated as Data Principals with full control over their artifacts.

### 2. Telemedicine Practice Guidelines, 2020
- **Disclaimer**: The AI Chatbot (`Wellness Buddy`) includes a persistent footer: *"AI can make mistakes. Not medical advice. Consult a doctor for emergencies."*
- **Encryption**: Chatbot UI indicates "End-to-End Encrypted Session" to reassure users of confidentiality.

### 3. Drugs and Cosmetics Act (E-Pharmacy)
- **Discreet Packaging**: The "Order History" screen includes a "Discreet Mode" to blur sensitive item names, protecting patient privacy regarding sexual wellness products.

### 4. DPDP Compliance in Journal-AI Integration
- **Explicit Consent Modal**: Before sharing any journal entry with the AI Chatbot, users see a consent popup that:
    - Previews the data being shared.
    - States purpose: "Your data will only be used for this conversation."
    - States limitations: "Not stored, shared, or used for AI training."
    - Provides opt-out: "You can withdraw consent anytime in Settings."
- **Delete Confirmation**: All destructive actions show a warning modal with clear consequences ("This will permanently remove...") per DPDP Right to Erasure (Section 12).
- **Local Storage Notice**: Entry detail view states: "Your journal data is stored locally on this device only."

### 5. Accessibility (RPwD Act 2016 / WCAG 2.1 AA)
- **Touch Targets**: All interactive elements ≥48px (WCAG 2.1 AA minimum: 44px).
- **Text Labels**: Bottom navigation shows persistent text labels on ALL tabs (not just active), per Tier 2/3 India UX research.
- **Emoji Visual Cues**: Chatbot prompts use emoji prefixes for instant visual comprehension across literacy levels.
- **High Contrast**: Destructive actions use red (#EF4444), primary actions use indigo (#6366F1).

### 6. Quick Exit / Panic Button (Safety)
- **Quick Exit Button**: Available on ALL screens via `PageHeader` and Dashboard. Uses `window.location.replace()` to navigate to Google WITHOUT leaving browser history.
- **FakeWeatherOverlay**: An alternative discreet mode that instantly overlays a fake weather app on screen, activated via the "X" icon in headers.
- **Rationale**: Critical for users in unsafe domestic environments where browsing sensitive health topics could put them at risk (aligned with Protection of Women from Domestic Violence Act, 2005).

### 7. Telemedicine Expert Profiles (Telemedicine Practice Guidelines, 2020)
- **Verifiable Identity**: Each doctor card displays full Name, Qualifications (MBBS, MD, etc.), and State Medical Council Registration Number.
- **Fee Transparency**: Consultation fees are shown upfront BEFORE booking — no hidden charges.
- **Mandatory Disclaimer**: A red "Compliance Notice" in the booking drawer states: "Teleconsultation is not a substitute for in-person emergency medical care."
- **DPDP Integration**: The booking drawer confirms sessions are "100% anonymous, end-to-end encrypted, and protected under DPDP Act 2023."

### 8. Codebase Compliance Audit (Phase 16)
- **JSDoc + COMPLIANCE Tags**: All 14 screen files (`Dashboard`, `Shop`, `Learn`, `Experts`, `Chatbot`, `Profile`, `Settings`, `Cart`, `Onboarding`, `OrderHistory`, `MoodCheckin`, `EnergyCheckin`, `CycleCheckin`, `Journal`) contain searchable `COMPLIANCE (...)` tags referencing the exact regulation and section number.
- **Searchable**: `grep -r "COMPLIANCE" src/` returns all compliance-tagged code for an auditor.
