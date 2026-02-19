import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { wellnessScore, quickLogs, dailyInsight } from '../data/mockData'
import { Bell, ChevronRight, Wind, Zap, Activity, BookOpen, Sparkles, TrendingUp, X, MessageCircle } from 'lucide-react'

/**
 * Weekly Trends — Simple Bar Chart for Mood/Energy
 * Visualizes 7-day energy data to help users identify patterns.
 */
const WeeklyTrends = () => {
    const data = [60, 45, 75, 50, 80, 70, 85]
    return (
        <div className="bg-white rounded-3xl p-5 border border-border/40 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                        <TrendingUp size={16} />
                    </div>
                    <h3 className="text-sm font-bold text-text">Weekly Energy</h3>
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">+12%</span>
            </div>

            <div className="flex items-end justify-between h-24 gap-2">
                {data.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end items-center gap-1">
                        <div
                            style={{ height: `${h}%` }}
                            className={`w-full rounded-t-lg transition-all duration-500 ${i === 6 ? 'bg-[var(--color-primary)]' : 'bg-gray-100'
                                }`}
                        />
                        <span className="text-[0.6rem] text-text-dim font-medium">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                        </span>
                    </div>
                ))}
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
            {/* Header */}
            <div className="page-pad pt-14 pb-4 flex justify-between items-center bg-white sticky top-0 z-10 border-b border-border/40">
                <div>
                    <p className="text-xs font-bold text-text-dim uppercase tracking-wider mb-0.5">Wellness Journey</p>
                    <h1 className="text-2xl font-bold text-text">Hello, User <span className="text-xl">👋</span></h1>
                </div>
                <div className="flex gap-2 items-center">
                    {/* AI Button with Label — Tier 2/3 users need text, not just icons */}
                    <Link to="/chatbot" className="flex items-center gap-1.5 bg-[var(--color-primary)] text-white px-4 h-10 rounded-full shadow-lg shadow-indigo-200 active:scale-95 transition-transform">
                        <Sparkles size={16} />
                        <span className="text-xs font-bold">Ask AI</span>
                    </Link>
                    <button className="w-10 h-10 rounded-full bg-card border border-border/60 flex items-center justify-center text-text-sub shadow-sm active:scale-95 transition-transform">
                        <Bell size={18} />
                    </button>
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
                                Tap <strong>"Ask AI"</strong> above to get personalized wellness advice. Track your mood, energy & more!
                            </p>
                        </div>
                    </div>
                )}

                {/* AI Buddy — HERO Position (moved to top per research) */}
                <Link to="/chatbot" className="block relative overflow-hidden rounded-3xl grad-primary p-6 text-white shadow-lg shadow-indigo-200 active:scale-[0.98] transition-transform">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-x-8 -translate-y-8" />
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <MessageCircle size={16} />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-white/90">AI Wellness Buddy</span>
                            </div>
                            <h3 className="text-xl font-bold mb-1">Ask anything...</h3>
                            <p className="text-white/80 text-sm">Get personalized wellness advice</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                            <ChevronRight size={22} />
                        </div>
                    </div>
                </Link>

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
                <WeeklyTrends />

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
        </div>
    )
}
