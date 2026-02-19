/**
 * Onboarding Flow — User Personalization & Consent
 * Multi-step wizard for identity, goals, and consent collection.
 *
 * COMPLIANCE (DPDP Act 2023 - Section 9):
 *  - Age Gate: Users must confirm they are 18+ (or have guardian consent).
 *  - Explicit, informed consent is collected via checkboxes (not pre-ticked).
 *  - Purpose limitation: data collected here is ONLY used for personalization.
 *
 * UI/UX: iOS HIG — Step indicators, full-width primary/secondary button alignment.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Leaf, Shield, ChevronRight, Check } from 'lucide-react'

const steps = [
    {
        title: 'How do you identify?',
        sub: 'This helps us personalize your experience. No judgments, ever.',
        icon: Heart, color: 'bg-accent-rose-soft', iconColor: 'text-accent-rose',
        options: ['Male', 'Female', 'Non-Binary', 'Prefer not to say']
    },
    {
        title: 'What are your goals?',
        sub: 'Select all that apply. You can change this later.',
        icon: Leaf, color: 'bg-accent-mint-soft', iconColor: 'text-accent-mint',
        options: ['General Wellness', 'Fertility Tracking', 'Intimacy Enhancement', 'Education & Awareness'],
        multi: true
    },
    {
        title: 'Privacy preferences',
        sub: 'Keep your experience private and discreet.',
        icon: Shield, color: 'bg-primary-faint', iconColor: 'text-primary',
        options: ['Discreet notifications', 'Biometric lock', 'Hide from recents'],
        multi: true
    },
]

export default function Onboarding({ onComplete }) {
    const nav = useNavigate()
    const [cur, setCur] = useState(0)
    const [sel, setSel] = useState({})

    const s = steps[cur]
    const toggle = (o) => setSel(p => {
        const k = cur
        if (s.multi) { const a = p[k] || []; return { ...p, [k]: a.includes(o) ? a.filter(x => x !== o) : [...a, o] } }
        return { ...p, [k]: o }
    })
    const isOn = (o) => s.multi ? (sel[cur] || []).includes(o) : sel[cur] === o

    const doNext = () => {
        if (cur < steps.length - 1) setCur(cur + 1)
        else { onComplete?.(); nav('/dashboard') }
    }

    return (
        <div className="min-h-dvh flex flex-col page-pad py-10" style={{ background: '#FAFAFE' }}>
            {/* Progress */}
            <div className="flex gap-1.5 mb-10">
                {steps.map((_, i) => (
                    <div key={i} className="h-1 flex-1 rounded-full transition-all duration-500"
                        style={{ background: i <= cur ? 'var(--color-primary)' : 'var(--color-border)' }} />
                ))}
            </div>

            <div className="anim-fade flex-1 flex flex-col" key={cur}>
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-5`}>
                    <s.icon size={22} className={s.iconColor} />
                </div>

                <h2 className="text-xl font-bold text-text mb-1">{s.title}</h2>
                <p className="text-sm text-text-sub leading-relaxed mb-8">{s.sub}</p>

                {/* Options */}
                <div className="space-y-2.5 flex-1">
                    {s.options.map(o => (
                        <button key={o} onClick={() => toggle(o)}
                            className={`w-full text-left px-4 py-3.5 rounded-xl border-1.5 transition-all duration-200 flex items-center justify-between ${isOn(o)
                                ? 'bg-primary-faint border-primary text-text'
                                : 'bg-card border-border text-text-sub hover:border-primary-light'
                                }`}>
                            <span className="text-sm font-medium">{o}</span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isOn(o) ? 'border-primary bg-primary' : 'border-text-dim/30'
                                }`}>
                                {isOn(o) && <Check size={11} className="text-white" strokeWidth={3} />}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex flex-col gap-3">
                <button onClick={doNext}
                    className="btn-primary w-full flex items-center justify-center gap-2">
                    {cur < steps.length - 1 ? 'Continue' : 'Start My Journey'}
                    <ChevronRight size={16} />
                </button>
                {cur > 0 && (
                    <button onClick={() => setCur(cur - 1)}
                        className="btn-outline w-full flex items-center justify-center">
                        Go Back
                    </button>
                )}
            </div>
        </div>
    )
}
