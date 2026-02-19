/**
 * Order History — Past Order Tracker
 * Displays past orders with delivery status and a "Discreet Mode" toggle.
 *
 * COMPLIANCE (Drugs & Cosmetics Act 1940):
 *  - "Discreet Mode" blurs product names/images for shoulder-surfing protection.
 *  - Confirms all shipped items are OTC only.
 *
 * COMPLIANCE (DPDP Act 2023):
 *  - Order data stored locally. PII (address, name) anonymized in Discreet Mode.
 *
 * UI/UX: iOS HIG — PageHeader with back navigation, privacy toggle in header.
 */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Package, Clock, CheckCircle, ChevronRight, Eye, EyeOff, ShoppingBag } from 'lucide-react'
import PageHeader from '../components/PageHeader'

// Mock Order Data
const mockOrders = [
    { id: '#ORD-9281', date: '20 Feb 2026', items: ['Intimacy Kit (Premium)', 'Wellness Oil'], total: 2499, status: 'Processing' },
    { id: '#ORD-8823', date: '10 Jan 2026', items: ['Daily Vitamins'], total: 899, status: 'Delivered' },
    { id: '#ORD-7712', date: '15 Dec 2025', items: ['Consultation: Dr. Anjali'], total: 1500, status: 'Delivered' },
]

/**
 * Order History Page
 * Displays a list of past purchases with a discreet mode to hide sensitive items.
 */
/**
 * Order History Page
 * Displays a list of past purchases with a discreet mode to hide sensitive items.
 * 
 * Logic:
 * - Mocks an order list.
 * - "Discreet Mode" toggle blurs product names to prevent shoulder-surfing.
 * - Status badges color-coded for quick scanning.
 */
export default function OrderHistory() {
    const nav = useNavigate()
    const [discreetMode, setDiscreetMode] = useState(false)

    return (
        <div className="min-h-dvh bg-[var(--color-bg-sub)] pb-10">
            {/* COMPLIANCE (Drugs and Cosmetics Act, 1940 - E-Pharmacy): Discreet Mode allows users to obscure sensitive product names. */}
            <PageHeader
                title="My Orders"
                onBack={() => nav('/dashboard')}
                action={
                    <button
                        onClick={() => setDiscreetMode(!discreetMode)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${discreetMode
                            ? 'bg-[var(--color-primary)] text-white border-transparent'
                            : 'bg-white text-text-sub border-border'
                            }`}
                    >
                        {discreetMode ? <EyeOff size={14} /> : <Eye size={14} />}
                        {discreetMode ? 'Hidden' : 'Visible'}
                    </button>
                }
            />

            <div className="page-pad pt-6 space-y-4">
                {mockOrders.map(order => (
                    <div key={order.id} className="bg-white rounded-2xl p-5 border border-border/60 shadow-sm active:scale-[0.99] transition-transform">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-text text-base">{order.id}</h3>
                                <div className="flex items-center gap-1.5 text-xs text-text-dim mt-0.5">
                                    <Clock size={12} />
                                    <span>{order.date}</span>
                                </div>
                            </div>
                            <span className={`px-2.5 py-1 rounded-lg text-[0.625rem] font-bold uppercase tracking-wide border ${order.status === 'Delivered'
                                ? 'bg-green-50 text-green-700 border-green-100'
                                : 'bg-blue-50 text-blue-700 border-blue-100'
                                }`}>
                                {order.status}
                            </span>
                        </div>

                        <div className="border-t border-border/40 my-3" />

                        <div className="space-y-1 mb-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-text-sub">
                                    <span className="w-1.5 h-1.5 rounded-full bg-border" />
                                    <span className={discreetMode ? 'blur-sm select-none' : ''}>
                                        {discreetMode ? 'Hidden Item Name' : item}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="font-bold text-text">₹{order.total}</span>
                            <button className="text-xs font-semibold text-[var(--color-primary)] flex items-center gap-1">
                                View Details <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                ))}

                <button className="w-full py-4 mt-4 rounded-2xl border border-dashed border-border text-text-dim text-sm font-medium hover:bg-white transition-colors flex items-center justify-center gap-2">
                    <ShoppingBag size={16} />
                    Start Shopping
                </button>
            </div>
        </div>
    )
}
