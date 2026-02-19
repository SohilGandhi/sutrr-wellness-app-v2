/**
 * Experts Page — Teleconsultation Directory
 * Displays verified medical professionals with searchable, filterable cards.
 *
 * COMPLIANCE (Telemedicine Practice Guidelines 2020):
 *  - Only Registered Medical Practitioners (RMPs) are listed.
 *  - Each doctor card displays: Name, Qualifications, State Medical Council Registration Number.
 *  - Consultation fees are explicitly stated BEFORE booking.
 *  - Mandatory disclaimer: "Teleconsultation is not a substitute for in-person emergency care."
 *
 * COMPLIANCE (DPDP Act 2023 - Section 4, 6):
 *  - All sessions are anonymized and end-to-end encrypted (stated in booking drawer).
 *  - No patient data is collected without explicit consent.
 *
 * COMPLIANCE (Quick Exit / Safety):
 *  - FakeWeatherOverlay provides instant discreet mode for user safety.
 *
 * UI/UX: iOS HIG / Material 3 — Card-based layout with bottom-sheet Profile Drawer.
 */
import { useState } from 'react'
import { experts } from '../data/mockData'
import { Star, Shield, CalendarCheck, Search, Video, Languages, X } from 'lucide-react'
import FakeWeatherOverlay from '../components/FakeWeatherOverlay'

export default function Experts() {
    const [q, setQ] = useState('')
    const [booking, setBooking] = useState(null)
    const [isDiscreetMode, setIsDiscreetMode] = useState(false)

    const list = experts.filter(e => e.name.toLowerCase().includes(q.toLowerCase()))

    return (
        <div className="pb-24 bg-[var(--color-bg-sub)] min-h-dvh">
            <FakeWeatherOverlay isOpen={isDiscreetMode} onClose={() => setIsDiscreetMode(false)} />

            <div className="bg-[var(--color-primary)] text-white pt-14 pb-12 px-6 rounded-b-[2.5rem] relative" style={{ marginBottom: '6rem' }}>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Expert Connect</h1>
                        <p className="text-white/80 text-sm mb-6">Verified professionals for your privacy</p>
                    </div>
                    <button
                        onClick={() => setIsDiscreetMode(true)}
                        className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-sm active:scale-95 transition-transform mt-1 shrink-0"
                        aria-label="Quick Exit"
                    >
                        <X size={18} strokeWidth={2.5} />
                    </button>
                </div>

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
                            <img src={e.image} alt={e.name} className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-border/40 shrink-0" />

                            <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-text leading-tight line-clamp-1">{e.name}</h3>
                                    <span className="text-[var(--color-secondary-dark)] bg-[var(--color-secondary-faint)] text-[0.6rem] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide shrink-0">Verified</span>
                                </div>
                                <p className="text-[0.65rem] text-text-sub line-clamp-1 mb-0.5 font-medium">{e.qualifications}</p>
                                <p className="text-sm text-[var(--color-primary)] font-bold mb-1.5">{e.fee} <span className="text-xs font-medium text-text-dim ml-1">• {e.speciality}</span></p>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 text-xs font-semibold text-text">
                                        <Star size={12} className="text-[var(--color-accent)] fill-[var(--color-accent)]" /> {e.rating}
                                    </div>
                                    <span className="text-xs text-text-dim">• {e.experience}</span>
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
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex flex-col justify-end sm:items-center sm:justify-center p-0 sm:p-6" onClick={() => setBooking(null)}>
                    {/* Slide-up drawer for mobile, centered modal for larger screens */}
                    <div className="bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full sm:max-w-md anim-slide-up sm:anim-fade max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>

                        {/* Drawer Header */}
                        <div className="flex justify-between items-start mb-5">
                            <div className="flex items-center gap-4">
                                <img src={booking.image} alt={booking.name} className="w-14 h-14 rounded-full object-cover shadow-sm border border-border/50" />
                                <div>
                                    <h3 className="text-lg font-bold text-text leading-tight">{booking.name}</h3>
                                    <p className="text-xs text-text-sub mt-0.5">{booking.qualifications}</p>
                                </div>
                            </div>
                            <button onClick={() => setBooking(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-bg-sub)] text-text-dim shrink-0">
                                <X size={16} strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Bio */}
                        <div className="bg-[var(--color-bg-sub)] rounded-2xl p-4 mb-4">
                            <p className="text-sm text-text leading-relaxed">{booking.bio}</p>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="px-3 py-1.5 bg-white border border-border/60 rounded-xl text-[0.65rem] font-semibold text-text-sub uppercase tracking-wider">Reg: {booking.regNo}</span>
                            <span className="px-3 py-1.5 bg-[var(--color-primary-faint)] border border-[var(--color-primary)]/20 rounded-xl text-[0.65rem] font-bold text-[var(--color-primary)] uppercase tracking-wider">Fee: {booking.fee}</span>
                        </div>

                        {/* COMPLIANCE (Telemedicine 2020) & (DPDP Act) */}
                        <div className="bg-danger/5 border border-danger/10 p-3.5 rounded-xl mb-6">
                            <h4 className="text-xs font-bold text-danger mb-1.5 flex items-center gap-1.5"><Shield size={12} /> Compliance Notice</h4>
                            <p className="text-[0.65rem] text-danger/80 leading-relaxed">
                                Teleconsultation is not a substitute for in-person emergency medical care. All sessions are 100% anonymous, end-to-end encrypted, and records are protected under the strict provisions of the DPDP Act 2023.
                            </p>
                        </div>

                        <button onClick={() => setBooking(null)} className="btn-primary w-full py-4 text-[0.95rem] shadow-lg shadow-[var(--color-primary-light)]/20">
                            Confirm Booking • {booking.fee}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
