# Sexual Wellness App: Wireframe Breakdown

This document provides a component-level breakdown of the screens, which can be shared with the IT consultant for implementation.

## Screen 1: The "Soft" Onboarding
**Goal**: Build trust and verify eligibility.
- **Top Section**: Large, breathing-style background animation (Gradients).
- **Center**: "Welcome to Your Safe Space" (Outfit Bold, 24px).
- **Input**: "Year of Birth" dropdown (Age gate).
- **Compliance**: Toggle switch: "I consent to secure data processing under India's DPDP Act" (Link to Privacy Policy).
- **CTA**: "Begin My Journey" (Soft Violet button).

## Screen 2: The Wellness Dashboard (Home)
**Goal**: Daily check-in and engagement.
- **Header**: Profile icon (camouflaged) + Notification bell (silent).
- **Core Component**: "The Wellness Lotus" - A circular gauge showing an aggregate score based on logs.
- **Grid (2x2)**:
  - Button 1: "Log Mood"
  - Button 2: "Log Cycle"
  - Button 3: "Log Libido"
  - Button 4: "Log Activity"
- **Daily Insight**: A card with a 1-minute read on sexual wellness.

## Screen 3: Incognito Library (Learn)
**Goal**: Secure education with a panic exit.
- **Top Bar**: Search bar + **"QUICK EXIT" (Bright Red)** - Clicking this switches to a fake "Weather" screen.
- **Categorized Feed**: "Basics of Intimacy", "Consent & Communication", "Health Tips".
- **Visuals**: Abstract art/Icons only (No human photos to avoid censorship issues).

## Screen 4: Expert Connect
**Goal**: Clinical support.
- **ABHA Banner**: "Link your ABHA Health Account for seamless records."
- **Search Filters**: Gender of expert, Language (Hindi, English, etc.), Speciality.
- **Experts**: Vertical list with "Verified" badge.

---

## Navigation Logic (UX)
1.  **Bottom Navigation**: Dashboard, Track, Learn, Expert.
2.  **Double-Tap to Hide**: A gesture (e.g., double-tapping the logo) that immediately locks the app with Biometrics.
3.  **No Screenshot Policy**: Technical flag to disable screen capture on Android/iOS.
