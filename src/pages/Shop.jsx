import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products, categories } from '../data/mockData'
import { Search, Star, Sparkles, Plus } from 'lucide-react'

export default function Shop() {
    const [cat, setCat] = useState('All')
    const [q, setQ] = useState('')

    const list = products.filter(p =>
        (cat === 'All' || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase())
    )

    return (
        <div className="pb-24 bg-[var(--color-bg-sub)] min-h-dvh">
            {/* Sticky Header */}
            <div className="bg-white sticky top-0 z-20 pb-4 border-b border-border/40">
                <div className="page-pad pt-14 pb-2">
                    <h1 className="text-2xl font-bold text-text">Wellness Store</h1>
                    <p className="text-sm text-text-sub mt-1">Curated products for your journey</p>
                </div>

                {/* Search */}
                <div className="page-pad mt-4 relative">
                    <Search size={18} className="absolute left-10 top-1/2 -translate-y-1/2 text-text-dim" />
                    <input type="text" placeholder="Search products..." value={q} onChange={e => setQ(e.target.value)}
                        className="input pl-11 bg-card-alt border-none shadow-inner" />
                </div>

                {/* Category Pills - Horizontal Scroll */}
                <div className="flex gap-3 overflow-x-auto pt-4 pb-2 page-pad no-scrollbar">
                    {categories.map(c => (
                        <button key={c} onClick={() => setCat(c)}
                            className={`pill flex-shrink-0 ${cat === c ? 'pill-active' : 'pill-inactive'}`}>
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Feed - Single Column (Instagram Style) */}
            <div className="page-pad py-6 space-y-6">
                {list.map((p, i) => (
                    <Link key={p.id} to={`/product/${p.id}`}
                        className="block bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] active:scale-[0.99] transition-transform">

                        {/* Large Hero Image Area */}
                        <div className="aspect-[4/3] relative bg-[var(--color-bg-sub)] flex items-center justify-center p-8">
                            {/* Soft Gradient Blob */}
                            <div className="absolute inset-0 opacity-30"
                                style={{ background: `radial-gradient(circle at center, ${i % 2 === 0 ? '#8E7AB540' : '#B4D4B540'}, transparent 70%)` }} />

                            {/* Product Placeholder */}
                            <div className="w-32 h-32 rounded-full border-4 border-white/40 shadow-xl backdrop-blur-sm relative z-10" />

                            {p.badge && (
                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-text font-bold text-[0.6rem] px-2.5 py-1 rounded-lg shadow-sm uppercase tracking-wide">
                                    {p.badge}
                                </span>
                            )}
                        </div>

                        {/* Details */}
                        {/* Details */}
                        <div className="p-4 sm:p-5">
                            <div className="flex justify-between items-start mb-2 gap-3">
                                <h3 className="text-base sm:text-lg font-bold text-text leading-tight flex-1 line-clamp-2">{p.name}</h3>
                                <div className="flex flex-col items-end flex-shrink-0">
                                    <span className="text-lg font-bold text-[var(--color-primary)] whitespace-nowrap">₹{p.price}</span>
                                    <span className="text-xs text-text-dim line-through whitespace-nowrap">₹{p.mrp}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-1.5 bg-[var(--color-accent)]/30 px-2 py-1 rounded-lg">
                                    <Star size={12} className="text-[var(--color-primary-dark)] fill-[var(--color-primary-dark)]" />
                                    <span className="text-xs font-bold text-text">{p.rating}</span>
                                </div>
                                <span className="text-xs text-text-sub font-medium">{p.reviews} reviews</span>
                            </div>

                            <div className="w-full h-11 sm:h-12 rounded-xl border border-[var(--color-primary)] text-[var(--color-primary)] font-semibold flex items-center justify-center gap-2 active:bg-[var(--color-primary-faint)] transition-colors">
                                <Plus size={16} /> View Details
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
