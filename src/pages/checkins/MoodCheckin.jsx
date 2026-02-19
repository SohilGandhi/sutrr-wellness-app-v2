/**
 * Mood Check-in — Emotional Wellness Tracker
 * Allows users to log their current mood with emoji-based selection and optional notes.
 *
 * COMPLIANCE (DPDP Act 2023 - Section 5):
 *  - Mood data is stored locally in localStorage. No server transmission.
 *  - Purpose limitation: data is used ONLY for wellness chart visualization on Dashboard.
 *
 * UI/UX: iOS HIG — Immersive full-screen, hidden bottom nav, large tap targets (≥48px).
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Wind } from 'lucide-react'

// Mood Emoji Map
const moods = [
    { val: 1, emoji: '😫', label: 'Stressed' },
    { val: 2, emoji: '😕', label: 'Anxious' },
    { val: 3, emoji: '😐', label: 'Neutral' },
    { val: 4, emoji: '🙂', label: 'Calm' },
    { val: 5, emoji: '🤩', label: 'Energetic' },
]

/**
 * Mood Check-in Screen
 * Interactive slider to log emotional state.
 * 
 * UX:
 * - Dynamic background gradient changes based on mood value (Red -> Blue -> Green).
 * - Animated emoji feedback provides immediate visual cue.
 * - "Save" button simulates API call with loading state.
 */
export default function MoodCheckin() {
    const nav = useNavigate()
    const [val, setVal] = useState(3)
    const [saving, setSaving] = useState(false)

    const handleSave = () => {
        setSaving(true)

        // Persistence Logic
        const existing = JSON.parse(localStorage.getItem('sutrr_checkins') || '{}')
        localStorage.setItem('sutrr_checkins', JSON.stringify({ ...existing, mood: val }))

        setTimeout(() => {
            nav('/dashboard')
        }, 1500)
    }

    return (
        <div className="min-h-dvh bg-white flex flex-col relative overflow-hidden">
            {/* Background Blob */}
            <div className={`absolute top-0 inset-x-0 h-2/3 bg-gradient-to-b ${val < 3 ? 'from-red-50 to-white' :
                val > 3 ? 'from-green-50 to-white' :
                    'from-blue-50 to-white'
                } transition-colors duration-500`} />

            {/* Header */}
            <div className="p-4 pt-14 flex items-center gap-3 relative z-10">
                <button onClick={() => nav('/dashboard')} className="w-10 h-10 rounded-full bg-white/80 shadow-sm flex items-center justify-center">
                    <ArrowLeft size={20} className="text-text" />
                </button>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/60 rounded-full backdrop-blur-md border border-border/20">
                    <Wind size={14} className="text-[var(--color-primary)]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-text-sub">Mood Check-in</span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 text-center">
                <div className="mb-10 transform transition-all duration-300 scale-125">
                    <div className="text-8xl mb-4 animate-bounce-slow">
                        {moods.find(m => m.val === val)?.emoji}
                    </div>
                    <h2 className="text-3xl font-bold text-text transition-all">
                        {moods.find(m => m.val === val)?.label}
                    </h2>
                </div>

                {/* Slider */}
                <div className="w-full max-w-xs mb-12">
                    <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={val}
                        onChange={(e) => setVal(parseInt(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                    />
                    <div className="flex justify-between mt-3 text-xs font-bold text-text-dim uppercase tracking-wider">
                        <span>Low</span>
                        <span>High</span>
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="p-6 bg-white border-t border-border/20">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`w-full h-14 rounded-2xl flex items-center justify-center gap-2 text-lg font-bold text-white shadow-lg transition-all ${saving ? 'bg-green-500 scale-95' : 'bg-[var(--color-primary)] active:scale-95'
                        }`}
                >
                    {saving ? (
                        <>
                            <Check size={24} /> Saved!
                        </>
                    ) : 'Save Log'}
                </button>
            </div>
        </div>
    )
}
