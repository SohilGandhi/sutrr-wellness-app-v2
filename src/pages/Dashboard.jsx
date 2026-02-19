import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { wellnessScore, quickLogs, dailyInsight } from '../data/mockData'
import { Bell, ChevronRight, Wind, Zap, Activity, BookOpen, Sparkles, TrendingUp, X, MessageCircle, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts'
import NotificationDrawer from '../components/NotificationDrawer'
import FakeWeatherOverlay from '../components/FakeWeatherOverlay'

/**
 * Unified Wellness Charts — Interactive Data Card
 * Replaces the static CSS chart with a dynamic 3-tab chart using Recharts and local storage.
 */
const WellnessAtAGlance = () => {
    const [activeTab, setActiveTab] = useState('Energy')

    // Mock data structures
    const data = {
        Energy: [
            { day: 'M', value: 60 }, { day: 'T', value: 45 }, { day: 'W', value: 75 },
            { day: 'T', value: 50 }, { day: 'F', value: 80 }, { day: 'S', value: 70 },
            { day: 'S', value: 85 }
        ],
        Mood: [
            { day: 'M', value: 3 }, { day: 'T', value: 2 }, { day: 'W', value: 4 },
            { day: 'T', value: 4 }, { day: 'F', value: 5 }, { day: 'S', value: 4 },
            { day: 'S', value: 5 } // 1-5 scale
        ],
        Cycle: [
            { day: '10', value: 1 }, { day: '11', value: 1 }, { day: '12', value: 2 },
            { day: '13', value: 3 }, { day: '14', value: 4 }, { day: '15', value: 3 },
            { day: '16', value: 2 }
        ]
    }

    // Pull real data from localStorage for today's value (Immediate Gratification UX)
    const localCheckins = JSON.parse(localStorage.getItem('sutrr_checkins') || '{}')
    if (localCheckins.energy) data.Energy[6].value = parseInt(localCheckins.energy)
    if (localCheckins.mood) data.Mood[6].value = parseInt(localCheckins.mood)

    const renderChart = () => {
        if (activeTab === 'Energy') {
            return (
                <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={data.Energy} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} dy={10} />
                        <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="value" fill="#818cf8" radius={[4, 4, 4, 4]} barSize={24} />
                    </BarChart>
                </ResponsiveContainer>
            )
        }
        if (activeTab === 'Mood') {
            return (
                <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={data.Mood} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} dy={10} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={3} dot={{ fill: '#34d399', strokeWidth: 2, r: 4, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            )
        }
        return (
            <ResponsiveContainer width="100%" height={120}>
                <LineChart data={data.Cycle} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} dy={10} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="value" stroke="#f472b6" strokeWidth={3} dot={{ fill: '#f472b6', strokeWidth: 2, r: 4, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        )
    }

    return (
        <div className="bg-white rounded-3xl p-5 border border-border/40 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-text">At a Glance</h3>
                <div className="flex bg-gray-100 rounded-full p-1">
                    {['Energy', 'Mood', 'Cycle'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${activeTab === tab ? 'bg-white text-text shadow-sm' : 'text-text-sub hover:text-text'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-32 w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full"
                    >
                        {renderChart()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

// Icon mapping for Quick Log buttons
const iconMap = {
    'Mood': <Wind size={22} />,
    'Energy': <Zap size={22} />,
    'Cycle': <Activity size={22} />,
    'Journal': <BookOpen size={22} />
}

/**
 * Conversion Ticker — Live Social Proof
 * Displays anonymized, compliant social proof to build trust and urgency.
 */
const ConversionTicker = () => {
    const [index, setIndex] = useState(0)

    // COMPLIANCE (Telemedicine 2020 / DPDP 2023): Anonymized social proof, no guaranteed medical outcomes or PII.
    // COMPLIANCE (Drugs & Cosmetics Act): Promoting only general wellness/OTC, no Schedule H/X drugs.
    const messages = [
        "⚡ Dr. Anjali is online for instant consultation",
        "🔥 12 people bought the Intimacy Kit today",
        "⭐ Someone just rated their expert session 5 stars",
        "🌿 5 users just started their Ayurveda wellness plan"
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-3 flex items-center justify-center overflow-hidden h-12 shadow-sm">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="text-xs font-bold text-indigo-700 text-center w-full truncate px-2"
                >
                    {messages[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

/**
 * Dashboard (Home Screen)
 * The central hub showing wellness status and quick actions.
 * 
 * Phase 7 Improvements (Tier 2/3 India):
 * - AI Buddy card moved to TOP (first thing users see)
 * - "Ask AI" label on header button (not just icon)
 * - Welcome banner for first-time users
 * - Larger touch targets (≥48px)
 */
export default function Dashboard() {
    const nav = useNavigate()
    const [score] = useState(wellnessScore)
    const [showWelcome, setShowWelcome] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const [isDiscreetMode, setIsDiscreetMode] = useState(false)

    // Show welcome banner only on first visit
    useEffect(() => {
        const visited = localStorage.getItem('sutrr_visited')
        if (!visited) {
            setShowWelcome(true)
            localStorage.setItem('sutrr_visited', 'true')
        }
    }, [])

    // Quick Log Navigation Handler
    const handleQuickLog = (label) => {
        const routes = {
            'Mood': '/checkin/mood',
            'Energy': '/checkin/energy',
            'Cycle': '/checkin/cycle',
            'Journal': '/checkin/journal'
        }
        if (routes[label]) nav(routes[label])
    }

    return (
        <div className="pb-28 min-h-dvh bg-[var(--color-bg-sub)]">
            <FakeWeatherOverlay isOpen={isDiscreetMode} onClose={() => setIsDiscreetMode(false)} />

            {/* Header */}
            <div className="page-pad pt-14 pb-4 flex justify-between items-center bg-white sticky top-0 z-10 border-b border-border/40">
                <div>
                    <p className="text-xs font-bold text-text-dim uppercase tracking-wider mb-0.5">Wellness Journey</p>
                    <h1 className="text-2xl font-bold text-text">Hello, User <span className="text-xl">👋</span></h1>
                </div>
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => setShowNotifications(true)}
                        className="relative w-10 h-10 rounded-full bg-card border border-border/60 flex items-center justify-center text-text-sub shadow-sm active:scale-95 transition-transform"
                    >
                        <Bell size={18} />
                        {/* Red unread indicator */}
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <button
                        onClick={() => setIsDiscreetMode(true)}
                        className="w-10 h-10 rounded-full bg-danger/5 border border-danger/10 flex items-center justify-center text-danger shadow-sm active:scale-95 transition-transform"
                        aria-label="Quick Exit"
                    >
                        <X size={18} strokeWidth={2.5} />
                    </button>
                    <Link to="/profile" className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm active:scale-95 transition-transform">
                        <User size={18} />
                    </Link>
                </div>
            </div>

            <div className="page-pad space-y-6 pt-5">

                {/* Welcome Banner — First-time users only */}
                {showWelcome && (
                    <div className="relative bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-4 text-white shadow-lg anim-fade overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-x-8 -translate-y-8" />
                        <button
                            onClick={() => setShowWelcome(false)}
                            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                            <X size={14} />
                        </button>
                        <div className="relative z-10">
                            <p className="text-sm font-bold mb-1">👋 Welcome to Sutrr!</p>
                            <p className="text-xs text-white/90 leading-relaxed">
                                Tap the ✨ in the navigation bar to get personalized wellness advice from anywhere!
                            </p>
                        </div>
                    </div>
                )}

                {/* Conversion Ticker — Live Social Proof */}
                <ConversionTicker />

                {/* Wellness Score - Breathing Animation */}
                <div className="card-premium p-6 relative overflow-hidden bg-white">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-faint)] rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

                    <div className="flex items-center gap-6">
                        <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-4 border-[var(--color-primary-faint)] anim-breathe" />
                            <svg className="w-full h-full rotate-[-90deg]">
                                <circle cx="48" cy="48" r="38" fill="none" stroke="var(--color-border)" strokeWidth="6" />
                                <circle cx="48" cy="48" r="38" fill="none" stroke="var(--color-primary)" strokeWidth="6"
                                    strokeDasharray="238" strokeDashoffset={238 - (238 * score.score) / 100}
                                    strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-text">{score.score}</span>
                                <span className="text-[0.6rem] font-bold text-text-dim uppercase">Score</span>
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-text mb-1">{score.status}</h3>
                            <p className="text-sm text-text-sub leading-relaxed mb-3">Your wellness is looking good today.</p>
                            <div className="flex gap-1.5">
                                <div className="h-1.5 flex-1 rounded-full bg-[var(--color-primary)] opacity-80" />
                                <div className="h-1.5 flex-1 rounded-full bg-[var(--color-primary)] opacity-60" />
                                <div className="h-1.5 flex-1 rounded-full bg-[var(--color-primary)] opacity-40" />
                                <div className="h-1.5 flex-1 rounded-full bg-border" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trends Widget */}
                <WellnessAtAGlance />

                {/* Quick Log — Larger Touch Targets (min 48px per WCAG) */}
                <div>
                    <h2 className="text-sm font-bold text-text-sub uppercase tracking-wide mb-4">Quick Log</h2>
                    <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar snap-x">
                        {quickLogs.map((log, i) => (
                            <button key={log.id} onClick={() => handleQuickLog(log.label)}
                                className="snap-start flex-shrink-0 w-28 h-28 rounded-3xl bg-white border border-border/50 shadow-sm flex flex-col items-center justify-center gap-2 active:scale-95 transition-all">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${i === 0 ? 'bg-[var(--color-primary-faint)] text-[var(--color-primary)]' :
                                    i === 1 ? 'bg-[var(--color-secondary-faint)] text-[var(--color-secondary-dark)]' :
                                        'bg-[var(--color-accent)] text-[var(--color-accent-dark)]'
                                    }`}>
                                    {iconMap[log.label]}
                                </div>
                                <span className="text-sm font-semibold text-text">{log.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Daily Insight */}
                <div className="rounded-3xl bg-white p-6 border border-border/40 shadow-sm">
                    <div className="flex gap-2 items-center mb-3">
                        <span className="badge bg-[var(--color-secondary-faint)] text-[var(--color-secondary-dark)]">DAILY INSIGHT</span>
                    </div>
                    <p className="text-lg font-serif italic text-text leading-relaxed">
                        "{dailyInsight.text}"
                    </p>
                </div>

            </div>

            <NotificationDrawer isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
        </div>
    )
}
