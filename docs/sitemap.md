# Sexual Wellness App: Information Architecture (Sitemap)

This sitemap defines the user journey and navigation structure, ensuring compliance with Indian regulations and focusing on emotional safety.

## 1. Onboarding Flow (The Entry)
*   **Splash Screen**: Minimalist branding.
*   **Age Verification**: DPDP-compliant "Year of Birth" entry.
*   **Privacy Manifesto**: Brief on data encryption and Indian server hosting.
*   **Granular Consent**: Toggle-based selection for data sharing.
*   **Identity Setup**: Gender-neutral options (Male, Female, Non-Binary, Prefer not to say).

## 2. Main Navigation (Bottom Bar — 5 Tabs + Center FAB)
*   **Home (Dashboard)**: Wellness score, At-a-Glance recharts, Quick Logs (Mood/Energy/Cycle), Conversion Ticker.
*   **Learn**: Evidence-based articles with branded imagery. Featured hero + scrollable list.
*   **[AI Chatbot FAB]**: Center Floating Action Button. Multi-conversation AI chat (ChatGPT-style).
*   **Shop**: E-Commerce catalog with Grid/List toggle, sorting, multi-select filter drawer.
*   **Experts**: Teleconsultation directory with Telemedicine-compliant doctor profiles.

### Top App Bar
*   **Notification Bell**: Slide-out notification drawer.
*   **Quick Exit (X)**: Instant discreet mode / fake weather overlay.
*   **Profile Avatar**: Links to Profile/Settings hub.

## 3. Page-by-Page Wireframe Concepts

### A. The Dashboard (Home)
*   **Header**: "Hello, User 👋" with notification/profile/quick-exit icons.
*   **Conversion Ticker**: Auto-rotating social proof ("Dr. Anjali is online for instant consultation").
*   **Wellness Ring**: Animated score card with progress bars.
*   **At a Glance**: 3-tab recharts visualization (Energy, Mood, Cycle) powered by localStorage.
*   **Quick Log**: Direct access to Mood, Energy, and Cycle check-ins.

### B. The "Safe Space" (Profile/Settings)
*   **Camouflage Mode**: Settings to change the app icon and notification style.
*   **Biometric Toggle**: Enable FaceID/Fingerprint for entry.
*   **Data Export/Delete**: Clear buttons for DPDP compliance (Right to Erasure, Data Portability).

### C. Expert Connect (Consultation)
*   **ABHA Link**: Section to link Ayushman Bharat Health Account.
*   **Expert Profile Cards**: Real avatar, name, qualifications, RegNo, fee, rating, languages, "Verified" badge.
*   **Booking Drawer**: Bottom-sheet with bio, RegNo badge, Fee badge, Compliance Notice, and "Confirm Booking" CTA.

### D. Shop (E-Commerce)
*   **Grid/List Toggle**: Switch between 2x2 visual grid and detailed list view.
*   **Sort & Filter**: Dropdown sorting + bottom-sheet multi-select filter drawer.
*   **Product Cards**: Branded "Sutrr" imagery, ratings, pricing, "Add to Cart" actions.

---

## 4. Visual Navigation Legend
*   **Primary Action**: Bottom-centered Floating Action Button (FAB) for AI Chatbot.
*   **Secondary Actions**: Tab-based navigation with persistent text labels.
*   **Quick Exit**: Fixed "X" button in headers across ALL screens — uses `window.location.replace()` to prevent back-button tracking.
