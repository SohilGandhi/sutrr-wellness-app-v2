import { useNavigate } from 'react-router-dom'
import { Heart, ShieldCheck, Lock } from 'lucide-react'

export default function Splash() {
    const nav = useNavigate()

    return (
        <div className="min-h-dvh flex flex-col items-center justify-center p-8 text-center relative overflow-hidden bg-[var(--color-bg)]">

            {/* Background Breathing Blobs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-primary)]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 anim-breathe" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--color-secondary)]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 anim-breathe anim-delay-2" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-xs anim-fade">
                <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-[2rem] mx-auto mb-8 flex items-center justify-center shadow-xl shadow-indigo-200/50 anim-float">
                    <Heart size={40} className="text-white fill-white" />
                </div>

                <h1 className="text-4xl font-bold mb-3 text-text">Sutrr.</h1>
                <p className="text-lg text-text-sub font-medium mb-10 leading-relaxed">
                    Your safe space for <br /> sexual wellness & joy.
                </p>

                {/* Age Gate & Data Privacy */}
                <div className="bg-white/60 backdrop-blur-md border border-white/40 p-6 rounded-3xl mb-8 text-left shadow-sm">
                    <label className="text-xs font-bold text-text-dim uppercase tracking-wider mb-2 block">
                        Year of Birth (Age Gate)
                    </label>
                    <select className="input bg-white mb-4 font-semibold text-lg" defaultValue="">
                        <option value="" disabled>Select Year</option>
                        {Array.from({ length: 50 }, (_, i) => 2008 - i).map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>

                    <div className="flex gap-3 items-start p-3 bg-[var(--color-secondary-faint)] rounded-xl border border-[var(--color-secondary)]/20">
                        <ShieldCheck size={18} className="text-[var(--color-secondary-dark)] flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-[var(--color-secondary-dark)] font-medium leading-tight">
                            Your data is encrypted locally. We comply with Indian DPDP Act 2023.
                        </p>
                    </div>
                </div>

                <button onClick={() => nav('/onboarding')}
                    className="btn-primary w-full text-lg shadow-xl shadow-indigo-300/40">
                    Begin Journey <Lock size={18} className="ml-2 opacity-70" />
                </button>
            </div>
        </div>
    )
}
