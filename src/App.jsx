import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout'
import Splash from './pages/Splash'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Chatbot from './pages/Chatbot'
import Learn from './pages/Learn'
import Experts from './pages/Experts'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import OrderHistory from './pages/OrderHistory'
import MoodCheckin from './pages/checkins/MoodCheckin'
import EnergyCheckin from './pages/checkins/EnergyCheckin'
import CycleCheckin from './pages/checkins/CycleCheckin'
import Journal from './pages/checkins/Journal'

/**
 * Main Application Component
 * Handles client-side routing and global state (like onboarding status).
 * 
 * Architecture:
 * - Uses React Router v7 for navigation.
 * - Wraps all content in a "phone-frame" div for desktop viewing simulation.
 * - Routes are split between "Immersive" (Splash, Onboarding) and "Layout-wrapped" (Dashboard, Shop, etc).
 */
export default function App() {
    // Tracks if user has completed the intro flow. 
    // In a real app, this would check localStorage or a backend user profile.
    const [onboarded, setOnboarded] = useState(false)

    return (
        <div className="phone-frame">
            <Routes>
                <Route path="/" element={<Splash onComplete={() => setOnboarded(true)} />} />
                <Route path="/onboarding" element={<Onboarding onComplete={() => setOnboarded(true)} />} />
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/chatbot" element={<Chatbot />} />
                    <Route path="/learn" element={<Learn />} />
                    <Route path="/experts" element={<Experts />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/order-history" element={<OrderHistory />} />
                    <Route path="/checkin/mood" element={<MoodCheckin />} />
                    <Route path="/checkin/energy" element={<EnergyCheckin />} />
                    <Route path="/checkin/cycle" element={<CycleCheckin />} />
                    <Route path="/checkin/journal" element={<Journal />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    )
}
