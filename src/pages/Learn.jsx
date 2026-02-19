import { useNavigate } from 'react-router-dom'
import { articles } from '../data/mockData'
import { Clock, Bookmark, X, Search, ChevronRight } from 'lucide-react'

export default function Learn() {
    const nav = useNavigate()
    const featured = articles[0]
    const recent = articles.slice(1)

    return (
        <div className="pb-24 bg-[var(--color-bg-sub)] min-h-dvh">
            {/* Header */}
            <div className="page-pad pt-14 pb-4 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text">Learn</h1>
                    <p className="text-sm text-text-sub mt-1">Evidence-based education</p>
                </div>
                <button onClick={() => nav('/weather')} className="quick-exit shadow-sm">
                    <X size={12} /> QUICK EXIT
                </button>
            </div>

            <div className="page-pad mb-8">
                <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
                    <input type="text" placeholder="Search..." className="input pl-11 bg-white border-transparent shadow-sm" />
                </div>
            </div>

            {/* Featured Article - Magazine Style */}
            <div className="page-pad mb-8">
                <h2 className="text-sm font-bold text-text-dim uppercase tracking-wider mb-4">Featured</h2>
                <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    {/* Placeholder Image Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-80" />

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
                        <div className="w-20 h-20 rounded-2xl bg-[var(--color-bg-sub)] flex-shrink-0 flex items-center justify-center text-[var(--color-primary)] text-xl font-bold">
                            {a.category[0]}
                        </div>

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
