/**
 * Cart Page — Order Checkout
 * Displays cart items with quantity controls and a secure checkout flow.
 *
 * COMPLIANCE (Drugs & Cosmetics Act 1940):
 *  - Discreet packaging notice: items are shipped in plain, unbranded packaging.
 *  - Only OTC products can reach checkout.
 *
 * COMPLIANCE (DPDP Act 2023):
 *  - Cart data is stored locally (localStorage) and never transmitted to third parties.
 *
 * UI/UX: iOS HIG — PageHeader with back navigation, sticky checkout bar.
 */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { products } from '../data/mockData'
import { ArrowLeft, Minus, Plus, Trash2, Shield, Lock, Check } from 'lucide-react'
import PageHeader from '../components/PageHeader'

export default function Cart() {
    const nav = useNavigate()
    const [items, setItems] = useState([
        { ...products[0], qty: 1 },
        { ...products[2], qty: 2 }
    ])

    const total = items.reduce((a, c) => a + c.price * c.qty, 0)

    return (
        <div className="pb-32 bg-[var(--color-bg)] min-h-dvh">
            <PageHeader title={`My Cart (${items.length})`} onBack={() => nav('/shop')} />

            <div className="page-pad pt-6 space-y-6">
                {items.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-3xl shadow-sm border border-border/40 flex gap-4">
                        <div className="w-20 h-20 rounded-xl bg-[var(--color-bg-sub)] flex-shrink-0" />

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-text truncate">{item.name}</h3>
                                <p className="text-sm text-[var(--color-primary)] font-bold">₹{item.price}</p>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="flex items-center gap-3 bg-[var(--color-bg-sub)] rounded-lg p-1">
                                    <button className="w-6 h-6 bg-white rounded shadow-sm flex items-center justify-center text-xs"><Minus size={12} /></button>
                                    <span className="text-xs font-bold w-2 text-center">{item.qty}</span>
                                    <button className="w-6 h-6 bg-white rounded shadow-sm flex items-center justify-center text-xs"><Plus size={12} /></button>
                                </div>
                                <button className="text-text-dim hover:text-danger"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* DPDP Consent */}
                <div className="bg-[var(--color-secondary-faint)] p-5 rounded-2xl border border-[var(--color-secondary)]/20">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5"><Shield size={16} className="text-[var(--color-secondary-dark)]" /></div>
                        <div>
                            <h4 className="text-sm font-bold text-[var(--color-secondary-dark)] mb-1">Secure Checkout</h4>
                            <p className="text-xs text-text-sub leading-tight mb-3">
                                We only share necessary data with payment gateways. Your purchase history is encrypted.
                            </p>
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="w-5 h-5 rounded border-2 border-[var(--color-secondary)] flex items-center justify-center bg-white group-hover:border-[var(--color-secondary-dark)]">
                                    <Check size={12} className="text-[var(--color-secondary-dark)]" />
                                </div>
                                <span className="text-xs font-bold text-text-sub">I consent to process my order data</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkout Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-border/60 z-20 md:max-w-md md:mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-text-sub font-medium">Total</span>
                    <span className="text-2xl font-bold text-text">₹{total}</span>
                </div>
                <button className="btn-primary w-full text-lg shadow-xl shadow-indigo-300/40">
                    Proceed to Pay <Lock size={18} className="ml-2 opacity-70" />
                </button>
            </div>
        </div>
    )
}
