/**
 * Shop Page — E-Commerce Catalog
 * Displays OTC wellness products with Grid/List toggle, sorting, and multi-select filtering.
 *
 * COMPLIANCE (Drugs & Cosmetics Act 1940):
 *  - Only OTC (Over-The-Counter) and general wellness products are displayed.
 *  - No Schedule H or Schedule X prescription drugs are listed.
 *  - Discreet packaging is implied via "Discreet Mode" in Order History.
 *
 * COMPLIANCE (DPDP Act 2023):
 *  - No PII is collected during browsing. Cart data is stored locally via localStorage.
 *
 * COMPLIANCE (Quick Exit / Safety):
 *  - FakeWeatherOverlay provides instant discreet mode for user safety.
 *
 * UI/UX: iOS HIG / Material 3 — Grid-first layout with bottom-sheet Filter Drawer.
 */
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { products, categories } from '../data/mockData'
import { Search, Star, Plus, X, LayoutGrid, List, ArrowDownUp, Filter } from 'lucide-react'
import FakeWeatherOverlay from '../components/FakeWeatherOverlay'

export default function Shop() {
    const [cat, setCat] = useState('All')
    const [q, setQ] = useState('')
    const [isDiscreetMode, setIsDiscreetMode] = useState(false)
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
    const [sortBy, setSortBy] = useState('featured') // 'featured', 'price-low', 'price-high', 'rating'
    const [showFilterDrawer, setShowFilterDrawer] = useState(false)
    const [filters, setFilters] = useState({
        categories: [],
        minRating: 0,
        maxPrice: 5000
    })

    // Filter Helpers
    const toggleFilter = (type, value) => {
        setFilters(prev => {
            const current = prev[type]
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value]
            return { ...prev, [type]: updated }
        })
    }

    const clearFilters = () => {
        setFilters({ categories: [], minRating: 0, maxPrice: 5000 })
        setShowFilterDrawer(false)
    }

    // Filter AND Sort Logic
    const sortedAndFilteredList = useMemo(() => {
        let result = products.filter(p => {
            // 1. Search Query
            if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
            // 2. Horizontal Category Pills (Old way, kept for quick access)
            if (cat !== 'All' && p.category !== cat) return false;
            // 3. Drawer Categories (Multi-select)
            if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false;
            // 4. Drawer Max Price
            if (p.price > filters.maxPrice) return false;
            // 5. Drawer Min Rating
            if (filters.minRating > 0 && p.rating < filters.minRating) return false;

            return true;
        })

        // Sorting
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price)
                break
            case 'price-high':
                result.sort((a, b) => b.price - a.price)
                break
            case 'rating':
                result.sort((a, b) => b.rating - a.rating)
                break
            case 'featured':
            default:
                // Keep default order (mockData order)
                break
        }
        return result
    }, [cat, q, sortBy, filters])

    return (
        <div className="pb-24 bg-[var(--color-bg-sub)] min-h-dvh">
            <FakeWeatherOverlay isOpen={isDiscreetMode} onClose={() => setIsDiscreetMode(false)} />

            {/* Sticky Header */}
            <div className="bg-white sticky top-0 z-20 pb-4 border-b border-border/40">
                <div className="page-pad pt-14 pb-2 flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-text">Wellness Store</h1>
                        <p className="text-sm text-text-sub mt-1">Curated products for your journey</p>
                    </div>
                    <button
                        onClick={() => setIsDiscreetMode(true)}
                        className="w-10 h-10 rounded-full bg-danger/5 border border-danger/10 flex items-center justify-center text-danger shadow-sm active:scale-95 transition-transform shrink-0 mt-1"
                        aria-label="Quick Exit"
                    >
                        <X size={18} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Search */}
                <div className="page-pad mt-4">
                    <div className="relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
                        <input type="text" placeholder="Search products..." value={q} onChange={e => setQ(e.target.value)}
                            className="input w-full !pl-12 bg-card-alt border-none shadow-inner" />
                    </div>
                </div>

                {/* Toolbar */}
                <div className="mt-4">
                    {/* Utilities Row */}
                    <div className="flex justify-between items-center page-pad pt-1">
                        <span className="text-xs font-bold text-text-dim uppercase tracking-wider">{sortedAndFilteredList.length} items</span>

                        <div className="flex items-center gap-2">
                            {/* Sort Dropdown */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none bg-[var(--color-bg-sub)] text-text-sub text-xs font-semibold py-1.5 pl-3 pr-8 rounded-lg border border-border/50 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] active:bg-gray-100"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                                <ArrowDownUp size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
                            </div>

                            {/* Layout Toggle */}
                            <div className="flex items-center bg-[var(--color-bg-sub)] rounded-lg border border-border/50 p-0.5">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`w-7 h-7 rounded relative flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-[var(--color-primary)]' : 'text-text-dim hover:text-text-sub'}`}
                                >
                                    <LayoutGrid size={14} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`w-7 h-7 rounded relative flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-[var(--color-primary)]' : 'text-text-dim hover:text-text-sub'}`}
                                >
                                    <List size={14} />
                                </button>
                            </div>

                            {/* Filter Button */}
                            <button
                                onClick={() => setShowFilterDrawer(true)}
                                className={`h-8 px-3 rounded-lg border flex items-center gap-1.5 transition-colors ${filters.categories.length > 0 || filters.minRating > 0 || filters.maxPrice < 5000 ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'border-border/50 bg-[var(--color-bg-sub)] text-text-sub active:bg-gray-100'}`}
                            >
                                <Filter size={14} />
                                <span className="text-xs font-semibold">
                                    Filter {(filters.categories.length > 0) && `(${filters.categories.length})`}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Feed */}
            {sortedAndFilteredList.length === 0 ? (
                <div className="page-pad py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Search size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-text mb-2">No products found</h3>
                    <p className="text-sm text-text-sub mb-6">Try adjusting your filters or search term.</p>
                    <button onClick={clearFilters} className="btn-secondary px-6">Clear All Filters</button>
                </div>
            ) : (
                <div className={`page-pad py-6 overflow-hidden ${viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-6'}`}>
                    {sortedAndFilteredList.map((p, i) => (
                        <Link key={p.id} to={`/product/${p.id}`}
                            className={`block bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] active:scale-[0.99] transition-transform ${viewMode === 'grid' ? 'flex flex-col' : ''}`}>

                            {/* Image Area */}
                            <div className={`relative bg-[#F9F9F9] flex items-center justify-center overflow-hidden ${viewMode === 'grid' ? 'aspect-square' : 'aspect-[4/3] w-full sm:w-1/3 shrink-0'}`}>
                                {/* Optional subtle gradient background to add depth */}
                                <div className="absolute inset-0 opacity-20 mix-blend-overlay"
                                    style={{ background: `radial-gradient(circle, ${i % 2 === 0 ? '#8E7AB5' : '#B4D4B5'} 0%, transparent 80%)` }} />

                                {/* Actual Product Image */}
                                <img src={p.image} alt={p.name} className="relative z-10 w-full h-full object-cover transition-transform duration-500 hover:scale-105" />

                                {p.badge && (
                                    <span className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-sm text-text font-bold text-[0.6rem] px-2.5 py-1 rounded shadow-sm uppercase tracking-wide border border-border/10">
                                        {p.badge}
                                    </span>
                                )}
                            </div>

                            {/* Details Area */}
                            <div className={`p-4 flex flex-col flex-1 ${viewMode === 'grid' ? 'justify-between' : 'sm:p-6'}`}>
                                {viewMode === 'grid' ? (
                                    <>
                                        <div className="mb-2">
                                            <h3 className="text-sm font-bold text-text leading-tight line-clamp-2">{p.name}</h3>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Star size={10} className="text-[var(--color-primary-dark)] fill-[var(--color-primary-dark)]" />
                                                <span className="text-[0.65rem] font-bold text-text">{p.rating}</span>
                                                <span className="text-[0.6rem] text-text-sub">({p.reviews})</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-[var(--color-primary)] whitespace-nowrap">₹{p.price}</span>
                                                <span className="text-[0.6rem] text-text-dim line-through whitespace-nowrap">₹{p.mrp}</span>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-[var(--color-primary-faint)] text-[var(--color-primary)] flex items-center justify-center active:scale-95 transition-transform">
                                                <Plus size={16} />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-start mb-2 gap-3">
                                            <h3 className="text-base sm:text-lg font-bold text-text leading-tight flex-1 line-clamp-2">{p.name}</h3>
                                            <div className="flex flex-col items-end flex-shrink-0">
                                                <span className="text-lg font-bold text-[var(--color-primary)] whitespace-nowrap">₹{p.price}</span>
                                                <span className="text-xs text-text-dim line-through whitespace-nowrap">₹{p.mrp}</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-text-sub line-clamp-2 mb-3 leading-relaxed">{p.desc}</p>
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
                                    </>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Filter Drawer Overlay */}
            {showFilterDrawer && (
                <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm anim-fade" onClick={() => setShowFilterDrawer(false)}>
                    {/* Drawer Container */}
                    <div className="absolute bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-3xl min-h-[50vh] max-h-[85vh] flex flex-col shadow-2xl anim-slide-up" onClick={e => e.stopPropagation()}>

                        {/* Drawer Header (Sticky) */}
                        <div className="sticky top-0 bg-white z-10 pt-6 px-6 pb-4 rounded-t-3xl border-b border-border/40">
                            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-text">Filters</h2>
                                <button onClick={() => setShowFilterDrawer(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-text flex-shrink-0">
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Drawer Body (Scrollable) */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8 pb-32 no-scrollbar">

                            {/* Categories (Multi-select) */}
                            <div>
                                <h3 className="text-sm font-bold text-text mb-3">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.filter(c => c !== 'All').map(c => {
                                        const isSelected = filters.categories.includes(c)
                                        return (
                                            <button
                                                key={c}
                                                onClick={() => toggleFilter('categories', c)}
                                                className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${isSelected
                                                    ? 'bg-[var(--color-primary-faint)] border-[var(--color-primary)] text-[var(--color-primary-dark)]'
                                                    : 'border-border/60 text-text-sub hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                                                    }`}
                                            >
                                                {c}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Max Price Slider */}
                            <div>
                                <div className="flex justify-between items-end mb-3">
                                    <h3 className="text-sm font-bold text-text">Max Price</h3>
                                    <span className="text-sm font-bold text-[var(--color-primary)]">₹{filters.maxPrice}</span>
                                </div>
                                <input
                                    type="range"
                                    min="500"
                                    max="5000"
                                    step="100"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                                />
                                <div className="flex justify-between text-xs text-text-dim mt-2 font-medium">
                                    <span>₹500</span>
                                    <span>₹5000</span>
                                </div>
                            </div>

                            {/* Minimum Rating */}
                            <div>
                                <h3 className="text-sm font-bold text-text mb-3">Minimum Rating</h3>
                                <div className="flex gap-2">
                                    {[3, 4, 4.5].map(rating => (
                                        <button
                                            key={rating}
                                            onClick={() => setFilters(prev => ({ ...prev, minRating: rating === prev.minRating ? 0 : rating }))}
                                            className={`flex-1 py-2 rounded-xl border flex items-center justify-center gap-1.5 transition-colors ${filters.minRating === rating
                                                ? 'bg-[#FFE87C]/20 border-[#FFE87C] text-yellow-700'
                                                : 'border-border/60 text-text-sub'
                                                }`}
                                        >
                                            <span className="font-bold text-sm">{rating}+</span>
                                            <Star size={14} className={filters.minRating === rating ? 'text-[#FFE87C] fill-[#FFE87C]' : 'text-text-dim'} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Drawer Actions (Sticky Bottom) */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-border/40 pb-safe-pb">
                            <div className="flex gap-4">
                                <button onClick={clearFilters} className="flex-1 py-3.5 bg-gray-100 text-text-sub rounded-2xl font-bold text-sm active:scale-[0.98] transition-all">
                                    Reset
                                </button>
                                <button onClick={() => setShowFilterDrawer(false)} className="flex-[2] py-3.5 bg-[var(--color-primary)] text-white rounded-2xl font-bold text-sm shadow-[0_8px_16px_rgba(142,122,181,0.3)] active:scale-[0.98] transition-all">
                                    Apply ({sortedAndFilteredList.length} items)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
