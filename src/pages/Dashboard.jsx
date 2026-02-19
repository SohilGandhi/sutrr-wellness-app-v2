import { useState } from 'react'
import { Link } from 'react-router-dom'
import { wellnessScore, quickLogs, dailyInsight } from '../data/mockData'
import { Bell, ChevronRight, Wind, Zap, Activity, BookOpen, Sparkles } from 'lucide-react'

// Icon mapping
const iconMap = {
    'Mood': <Wind size={22} />,
    'Energy': <Zap size={22} />,
    'Cycle': <Activity size={22} />,
    'Journal': <BookOpen size={22} />
}

export default function Dashboard() {
    const [score] = useState(wellnessScore)

    return (
        <div className="pb-24 min-h-dvh bg-[var(--color-bg-sub)]">
            {/* Header */}
            <div className="page-pad pt-14 pb-4 flex justify-between items-center bg-white sticky top-0 z-10 border-b border-border/40">
                <div>
                    <p className="text-xs font-bold text-text-dim uppercase tracking-wider mb-0.5">Wellness Journey</p>
                    <h1 className="text-2xl font-bold text-text">Hello, User <span className="text-xl">👋</span></h1>
                </div>
                <button className="w-10 h-10 rounded-full bg-card border border-border/60 flex items-center justify-center text-text-sub shadow-sm active:scale-95 transition-transform">
                    <Bell size={18} />
                </button>
            </div>

            <div className="page-pad space-y-8 pt-6">

                {/* Wellness Score - Breathing Animation */}
                <div className="card-premium p-6 relative overflow-hidden bg-white">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-faint)] rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

                    <div className="flex items-center gap-6">
                        <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                            {/* Outer pulsing ring */}
                            <div className="absolute inset-0 rounded-full border-4 border-[var(--color-primary-faint)] anim-breathe" />
                            {/* Progress ring */}
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

                {/* Quick Log - Horizontal Scroll (Spacious V2) */}
                <div>
                    <h2 className="text-sm font-bold text-text-sub uppercase tracking-wide mb-4">Quick Log</h2>
                    <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar snap-x">
                        {quickLogs.map((log, i) => (
                            <button key={log.id}
                                className="snap-start flex-shrink-0 w-28 h-28 rounded-3xl bg-white border border-border/50 shadow-sm flex flex-col items-center justify-center gap-2 active:scale-95 transition-all">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${i === 0 ? 'bg-[var(--color-primary-faint)] text-[var(--color-primary)]' :
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

                {/* AI Buddy */}
                <Link to="/chatbot" className="block relative overflow-hidden rounded-3xl grad-primary p-6 text-white shadow-lg shadow-indigo-200">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-x-8 -translate-y-8" />
                    <div className="flex items-start justify-between relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles size={16} className="text-[var(--color-accent)]" />
                                <span className="text-xs font-bold uppercase tracking-wider text-white/90">AI Health Buddy</span>
                            </div>
                            <h3 className="text-xl font-bold mb-1">Ask anything...</h3>
                            <p className="text-white/80 text-sm">Personalized wellness advice</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <ChevronRight size={20} />
                        </div>
                    </div>
                </Link>

                {/* Daily Insight - Full Bleed Card */}
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
