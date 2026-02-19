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
import Weather from './pages/Weather'

export default function App() {
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
                </Route>
                <Route path="/weather" element={<Weather />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    )
}
