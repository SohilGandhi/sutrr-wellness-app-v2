/**
 * Energy Check-in — Physical Vitality Tracker
 * Users rate their energy level on a 1-5 scale with optional time-of-day context.
 *
 * COMPLIANCE (DPDP Act 2023 - Section 5):
 *  - Energy data stored locally in localStorage. No server transmission.
 *  - Purpose limitation: data used ONLY for Dashboard wellness charts.
 *
 * UI/UX: iOS HIG — Immersive full-screen with slider and large tap targets.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Zap } from 'lucide-react'

export default function EnergyCheckin() {
    const nav = useNavigate()
    const [level, setLevel] = useState(70)
    const [saving, setSaving] = useState(false)

    const handleSave = () => {
        setSaving(true)

        const existing = JSON.parse(localStorage.getItem('sutrr_checkins') || '{}')
        localStorage.setItem('sutrr_checkins', JSON.stringify({ ...existing, energy: level }))

        setTimeout(() => nav('/dashboard'), 1500)
    }

    const getColor = (l) => {
        if (l < 30) return 'text-red-500'
        if (l < 60) return 'text-yellow-500'
        return 'text-green-500'
    }

    return (
        <div className="min-h-dvh bg-white flex flex-col relative">
            <div className="p-4 pt-14 flex items-center gap-3">
                <button onClick={() => nav('/dashboard')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                    <Zap size={14} className="text-yellow-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-text-sub">Energy Level</span>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8">
                {/* Battery Visual */}
                <div className="relative w-40 h-72 border-4 border-gray-300 rounded-[2rem] p-2 mb-8">
                    {/* Cap */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-300 rounded-t-lg" />

                    {/* Liquid */}
                    <div className="w-full h-full bg-gray-100 rounded-[1.5rem] relative overflow-hidden flex items-end">
                        <div
                            style={{ height: `${level}%` }}
                            className={`w-full transition-all duration-500 ease-out ${level < 30 ? 'bg-red-400' :
                                level < 60 ? 'bg-yellow-400' : 'bg-green-400'
                                }`}
                        >
                            {/* Bubbles */}
                            <div className="w-full h-2 bg-white/20 absolute top-0 animate-pulse" />
                        </div>
                    </div>

                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-4xl font-bold bg-white/80 backdrop-blur px-4 py-2 rounded-xl shadow-sm ${getColor(level)}`}>
                            {level}%
                        </span>
                    </div>
                </div>

                <input
                    type="range" min="0" max="100" step="10"
                    value={level}
                    onChange={e => setLevel(parseInt(e.target.value))}
                    className="w-full max-w-xs h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                />
            </div>

            <div className="p-6">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`w-full h-14 rounded-2xl flex items-center justify-center gap-2 text-lg font-bold text-white shadow-lg transition-all ${saving ? 'bg-green-500' : 'bg-[var(--color-primary)]'
                        }`}
                >
                    {saving ? <Check /> : 'Log Energy'}
                </button>
            </div>
        </div>
    )
}
