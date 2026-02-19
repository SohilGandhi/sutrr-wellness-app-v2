import { useParams, Link } from 'react-router-dom'
import { products } from '../data/mockData'
import { ArrowLeft, Star, ShoppingCart, Shield, Minus, Plus } from 'lucide-react'
import { useState } from 'react'

export default function ProductDetail() {
    const { id } = useParams()
    const p = products.find(i => i.id === parseInt(id))
    const [qty, setQty] = useState(1)

    if (!p) return <div>Not Found</div>

    return (
        <div className="bg-[var(--color-bg)] min-h-dvh pb-24">
            {/* Immersive Header Image */}
            <div className="relative h-[45vh] bg-[var(--color-bg-sub)]">
                <Link to="/shop" className="absolute top-14 left-6 z-20 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm text-text">
                    <ArrowLeft size={20} />
                </Link>
                <div className="w-full h-full flex items-center justify-center">
                    {/* Placeholder Visual */}
                    <div className="w-48 h-48 rounded-full border-4 border-white shadow-2xl bg-gradient-to-br from-[var(--color-primary-light)] to-white opacity-50 blur-sm" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-[var(--color-bg)] rounded-t-[2.5rem]" />
            </div>

            <div className="page-pad -mt-4 relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-3xl font-bold text-text w-3/4 leading-tight">{p.name}</h1>
                    <span className="text-2xl font-bold text-[var(--color-primary)]">₹{p.price}</span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                        <Star size={16} className="text-[var(--color-accent)] fill-[var(--color-accent)]" />
                        <span className="font-bold text-text">{p.rating}</span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-sm text-text-sub underline">{p.reviews} reviews</span>
                </div>

                {/* AI Insight */}
                <div className="bg-[var(--color-primary-faint)] border border-[var(--color-primary)]/20 p-5 rounded-2xl mb-8">
                    <h3 className="text-xs font-bold text-[var(--color-primary)] uppercase mb-2 flex items-center gap-2">
                        <Sparkles size={14} /> AI Wellness Insight
                    </h3>
                    <p className="text-sm text-text leading-relaxed">
                        This {p.category.toLowerCase()} product is often paired with mindfulness exercises.
                        Based on your stress logs, it might help alleviate evening tension.
                    </p>
                </div>

                <div className="space-y-6 mb-8">
                    <div>
                        <h3 className="font-bold text-text mb-2">Description</h3>
                        <p className="text-text-sub leading-relaxed">
                            Designed with body-safe silicone and whisper-quiet motor technology.
                            Waterproof, rechargeable, and discreetly packaged for your peace of mind.
                        </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-border/50">
                        <span className="font-bold text-text">Quantity</span>
                        <div className="flex items-center gap-4 bg-[var(--color-bg-sub)] rounded-xl p-1">
                            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm text-text hover:bg-[var(--color-primary)] hover:text-white transition-colors"><Minus size={16} /></button>
                            <span className="font-bold w-4 text-center">{qty}</span>
                            <button onClick={() => setQty(qty + 1)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm text-text hover:bg-[var(--color-primary)] hover:text-white transition-colors"><Plus size={16} /></button>
                        </div>
                    </div>
                </div>

                <button className="btn-primary w-full text-lg shadow-xl shadow-indigo-200">
                    <ShoppingCart size={20} className="mr-2" /> Add to Cart — ₹{p.price * qty}
                </button>

                <div className="flex justify-center mt-4 gap-2 text-xs text-text-dim items-center">
                    <Shield size={12} /> Descreet delivery in unmarked box
                </div>
            </div>
        </div>
    )
}

function Sparkles({ size, className }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M9 3v4" /><path d="M3 5h4" /><path d="M3 9h4" /></svg>
}
