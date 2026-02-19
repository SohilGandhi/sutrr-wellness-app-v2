import { useState } from 'react'
import { experts } from '../data/mockData'
import { Star, Shield, CalendarCheck, Search, Video, Languages } from 'lucide-react'

export default function Experts() {
    const [q, setQ] = useState('')
    const [booking, setBooking] = useState(null)

    const list = experts.filter(e => e.name.toLowerCase().includes(q.toLowerCase()))

    return (
        <div className="pb-24 bg-[var(--color-bg-sub)] min-h-dvh">
            <div className="bg-[var(--color-primary)] text-white pt-14 pb-12 px-6 rounded-b-[2.5rem] relative" style={{ marginBottom: '6rem' }}>
                <h1 className="text-2xl font-bold mb-2">Expert Connect</h1>
                <p className="text-white/80 text-sm mb-6">Verified professionals for your privacy</p>

                {/* Search Bar Floating */}
                <div className="absolute -bottom-6 left-4 right-4 sm:left-6 sm:right-6 h-12 bg-white rounded-2xl shadow-lg flex items-center px-4">
                    <Search size={18} className="text-text-dim mr-3" />
                    <input type="text" placeholder="Search experts..." value={q} onChange={e => setQ(e.target.value)}
                        className="flex-1 outline-none text-text placeholder:text-text-dim min-w-0" />
                </div>
            </div>

            <div className="page-pad space-y-5 pt-12">

                {/* ABHA Banner */}
                <div className="bg-[var(--color-secondary-faint)] border border-[var(--color-secondary)]/30 rounded-2xl p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-secondary)] flex items-center justify-center flex-shrink-0">
                        <Shield size={16} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-[var(--color-secondary-dark)]">Link ABHA Account</h3>
                        <p className="text-xs text-text-sub mt-0.5">Seamlessly connect your Indian health records via ABDM.</p>
                    </div>
                </div>

                {/* Expert Cards */}
                {list.map((e, i) => (
                    <div key={e.id} className="bg-white rounded-3xl p-6 shadow-sm border border-border/50">
                        <div className="flex gap-4 mb-4">
                            {/* Avatar */}
                            <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary-light)] flex items-center justify-center text-white text-xl font-bold shadow-md">
                                {e.name.split(' ').pop()[0]}
                            </div>

                            <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex flex-col items-start gap-1 mb-1">
                                    <h3 className="text-lg font-bold text-text leading-tight line-clamp-1">{e.name}</h3>
                                    <span className="text-[var(--color-secondary-dark)] bg-[var(--color-secondary-faint)] text-[0.6rem] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">Verified</span>
                                </div>
                                <p className="text-sm text-[var(--color-primary)] font-medium mb-1">{e.speciality}</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 text-xs font-semibold text-text">
                                        <Star size={12} className="text-[var(--color-accent)] fill-[var(--color-accent)]" /> {e.rating}
                                    </div>
                                    <span className="text-xs text-text-dim">• {e.experience} exp</span>
                                </div>
                            </div>
                        </div>

                        {/* Languages Scroll */}
                        <div className="flex items-center gap-2 mb-5 overflow-x-auto no-scrollbar">
                            <Languages size={14} className="text-text-dim flex-shrink-0" />
                            {e.languages.map(l => (
                                <span key={l} className="px-2.5 py-1 rounded-lg bg-[var(--color-bg-sub)] text-xs text-text-sub font-medium whitespace-nowrap">
                                    {l}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button disabled={!e.available} onClick={() => e.available && setBooking(e)}
                                className={`flex-1 h-11 sm:h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all ${e.available ? 'bg-[var(--color-primary)] text-white shadow-md active:scale-95' : 'bg-border text-text-dim'
                                    }`}>
                                <CalendarCheck size={16} /> Book Session
                            </button>
                            {e.available && (
                                <button className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-border/60 flex items-center justify-center text-[var(--color-primary)] active:bg-[var(--color-primary-faint)]">
                                    <Video size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {booking && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setBooking(null)}>
                    <div className="bg-white rounded-3xl p-6 w-full max-w-sm anim-fade" onClick={e => e.stopPropagation()}>
                        <div className="w-14 h-14 rounded-full bg-[var(--color-primary-faint)] mx-auto mb-4 flex items-center justify-center">
                            <CalendarCheck size={28} className="text-[var(--color-primary)]" />
                        </div>
                        <h3 className="text-xl font-bold text-center text-text mb-2">Book with {booking.name}</h3>
                        <p className="text-sm text-center text-text-sub mb-6 px-2">
                            All sessions are fully anonymous and end-to-end encrypted. Protected under DPDP Act 2023.
                        </p>
                        <button onClick={() => setBooking(null)} className="btn-primary w-full">Confirm Booking</button>
                    </div>
                </div>
            )}
        </div>
    )
}
