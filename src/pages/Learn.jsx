/**
 * Learn Page — Evidence-Based Education
 * Presents curated, clinically reviewed articles on sexual wellness topics.
 *
 * COMPLIANCE (Telemedicine Practice Guidelines 2020):
 *  - All educational content is evidence-based and does not constitute medical advice.
 *  - Articles link to external clinical sources where applicable.
 *
 * COMPLIANCE (DPDP Act 2023):
 *  - No tracking of articles read. Browsing is fully anonymous.
 *
 * COMPLIANCE (Quick Exit / Safety):
 *  - FakeWeatherOverlay provides instant discreet mode for user safety.
 *
 * UI/UX: iOS HIG — Featured Hero card + scrollable list with branded imagery.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { articles } from '../data/mockData'
import { Clock, Bookmark, X, Search, ChevronRight } from 'lucide-react'
import FakeWeatherOverlay from '../components/FakeWeatherOverlay'

export default function Learn() {
    const nav = useNavigate()
    const [isDiscreetMode, setIsDiscreetMode] = useState(false)
    const featured = articles[0]
    const recent = articles.slice(1)

    return (
        <div className="pb-24 bg-[var(--color-bg-sub)] min-h-dvh">
            <FakeWeatherOverlay isOpen={isDiscreetMode} onClose={() => setIsDiscreetMode(false)} />

            {/* Header */}
            <div className="page-pad pt-14 pb-4 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text">Learn</h1>
                    <p className="text-sm text-text-sub mt-1">Evidence-based education</p>
                </div>
                <button
                    onClick={() => setIsDiscreetMode(true)}
                    className="w-10 h-10 rounded-full bg-danger/5 border border-danger/10 flex items-center justify-center text-danger shadow-sm active:scale-95 transition-transform shrink-0 mt-1"
                    aria-label="Quick Exit"
                >
                    <X size={18} strokeWidth={2.5} />
                </button>
            </div>

            <div className="page-pad mb-8">
                <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
                    <input type="text" placeholder="Search..." className="input w-full !pl-12 bg-white border-transparent shadow-sm" />
                </div>
            </div>

            {/* Featured Article - Magazine Style */}
            <div className="page-pad mb-8">
                <h2 className="text-sm font-bold text-text-dim uppercase tracking-wider mb-4">Featured</h2>
                <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    {/* Featured Image */}
                    <img src={featured.image} alt={featured.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <span className="inline-block px-3 py-1 rounded-lg bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-3 border border-white/10">
                            {featured.category}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-2 leading-tight">{featured.title}</h3>
                        <div className="flex items-center gap-3 text-white/80 text-xs">
                            <span className="flex items-center gap-1"><Clock size={12} /> {featured.readTime}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Articles Stream */}
            <div className="page-pad space-y-4">
                <div className="flex justify-between items-end mb-2">
                    <h2 className="text-sm font-bold text-text-dim uppercase tracking-wider">Latest</h2>
                    <span className="text-xs font-semibold text-[var(--color-primary)]">View All</span>
                </div>

                {recent.map((a, i) => (
                    <div key={a.id} className="bg-white p-5 rounded-3xl shadow-sm border border-border/40 flex items-center gap-4 active:scale-[0.99] transition-transform">
                        {/* Thumbnail */}
                        <img src={a.image} alt={a.title} className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 border border-border/20" />

                        <div className="flex-1 min-w-0">
                            <span className="text-[0.65rem] font-bold text-[var(--color-primary)] uppercase tracking-wide mb-1 block">{a.category}</span>
                            <h3 className="text-base font-bold text-text leading-tight mb-2 line-clamp-2">{a.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-text-dim">
                                <Clock size={11} /> {a.readTime}
                            </div>
                        </div>

                        <button className="text-text-sub"><ChevronRight size={18} /></button>
                    </div>
                ))}
            </div>
        </div>
    )
}
