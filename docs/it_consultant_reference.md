# IT Consultant Reference & Technical PRD

> **Purpose**: High-level technical reference and product requirements for the backend/IT team.
> **Status**: PUBLIC (Pushed to GitHub)

## 1. Project Overview
**Sexual Wellness & Mental Health App (Prototype)**
A privacy-first, premium wellness application tailored for the Indian market, compliant with DPDP and ABHA standards.

## 2. Technical Stack (Frontend)
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4 (Utility-first, Custom Theme)
- **State Management**: React State (Local) + Context (Planned for Global)
- **Icons**: Lucide React
- **Routing**: React Router DOM v7

## 3. Architecture & Patterns
- **Component-Based**: Modular components in `src/components/`.
- **Page-Based Routing**: Key screens in `src/pages/` mapping to routes in `App.jsx`.
- **Mock Data**: Currently using static JSON in `src/data/mockData.js`. *Backend should replace this.*
- **Responsive Design**: Mobile-first approach with breakpoints (`sm`, `md`, `lg`) for larger screens.

## 4. Key Features & Backend Requirements

### A. Authentication & User Profile
- **Current State**: Mocked profile.
- **Requirement**: Secure JWT-based auth.
- **Compliance**:
    - Mobile Number + OTP (Standard Indian flow).
    - **DPDP**: Store consent logs (timestamp, version, specific permission).
    - **ABHA**: Integration for health ID linking.

### B. eCommerce (Shop)
- **Current State**: Static product list, local cart state.
- **Requirement**:
    - Product Catalog API (Images, Pricing, Inventory).
    - **Discreet Shipping**: Backend flag for "Packaging Type".
    - Order Management System (OMS) integration.

### C. Wellness Tools (Tracking)
- **Current State**: Mocked graphs and scores.
- **Requirement**:
    - Time-series database for Mood, Energy, Cycle data.
    - AI Engine (Python/FastAPI recommended) to process logs and generate "Daily Insights".

### D. Chatbot (AI Buddy)
- **Current State**: Hardcoded responses (`setTimeout`). Accepts pre-filled messages from Journal via React Router state.
- **Requirement**:
    - LLM Integration (OpenAI/Anthropic/Llama).
    - **RAG Pipeline**: Retrieval-Augmented Generation on a curated sexual wellness knowledge base (medically verified).
    - **Privacy**: Zero-retention mode for sensitive chats.
    - **Journal-AI Integration**: Accept journal text as context for personalized responses. Must follow DPDP consent (already implemented in frontend).

### E. Journal / Wellness Diary
- **Current State**: 3-view system (Write/History/Detail-Edit) with localStorage persistence. Includes multi-select, delete confirmation, and Share-to-AI with DPDP consent modal.
- **Requirement**:
    - Backend CRUD API for journal entries (encrypted at rest).
    - **DPDP Audit**: Log consent artifacts when user shares journal data with AI.
    - Search/filter entries by date, mood, keyword.

### E. Teleconsultation (Experts)
- **Current State**: Static doctor cards.
- **Requirement**:
    - Video Call SDK (Twilio/Agora/Dyte).
    - Scheduling System (Calendly-like slots).
    - E-Prescription generation (PDF).

## 5. Security & Compliance (Non-Negotiable)
1.  **Data Localization**: All user health data must be stored on servers within India.
2.  **Encryption**: AES-256 for data at rest, TLS 1.3 for data in transit.
3.  **Audit Logs**: Every data access by internal staff must be logged.
4.  **Right to Forget**: The "Delete Account" feature (in Profile) must permanently wipe data from all backups within 30 days.

## 6. Future Roadmap
- **Community**: Anonymous forums.
- **Gamification**: Streaks and rewards system.
- **Wearable Integration**: Sync with Apple Health/Google Fit.
