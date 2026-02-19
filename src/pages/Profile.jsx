import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Added Link and useNavigate
import { Shield, Fingerprint, Eye, Download, Trash2, FileText, ChevronRight, LogOut, Settings, ShoppingBag, Bell } from 'lucide-react' // Added icons

export default function Profile() {
    const nav = useNavigate()
    const [camo, setCamo] = useState(true)

    return (
        <div className="pb-24 bg-[var(--color-bg-sub)] min-h-dvh">
            {/* Header */}
            <div className="pt-14 pb-8 bg-white rounded-b-[2rem] border-b border-border/40 text-center shadow-sm relative">
                {/* Settings Icon - Top Right */}
                <Link to="/settings" className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[var(--color-bg-sub)] flex items-center justify-center text-text shadow-sm hover:scale-105 transition-transform">
                    <Settings size={20} />
                </Link>

                <div className="w-24 h-24 rounded-full bg-[var(--color-primary-faint)] mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-[var(--color-primary)] ring-4 ring-offset-2 ring-[var(--color-primary-faint)]">
                    JD
                </div>
                <h1 className="text-2xl font-bold text-text">Jane Doe</h1>
                <p className="text-sm text-text-sub flex items-center justify-center gap-1.5 mt-1">
                    <Shield size={12} className="text-[var(--color-secondary-dark)]" />
                    ABHA Linked • Premium Member
                </p>
            </div>

            <div className="page-pad -mt-6 relative z-10">
                {/* Stats Row */}
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 bg-white p-4 rounded-3xl shadow-sm border border-border/40 text-center">
                        <p className="text-2xl font-bold text-[var(--color-primary)]">85</p>
                        <p className="text-[0.65rem] font-bold text-text-dim uppercase tracking-wider">Wellness Score</p>
                    </div>
                    <div className="flex-1 bg-white p-4 rounded-3xl shadow-sm border border-border/40 text-center">
                        <p className="text-2xl font-bold text-[var(--color-secondary-dark)]">12</p>
                        <p className="text-[0.65rem] font-bold text-text-dim uppercase tracking-wider">Sessions</p>
                    </div>
                    <div className="flex-1 bg-white p-4 rounded-3xl shadow-sm border border-border/40 text-center">
                        <p className="text-2xl font-bold text-[var(--color-accent-dark)]">5</p>
                        <p className="text-[0.65rem] font-bold text-text-dim uppercase tracking-wider">Orders</p>
                    </div>
                </div>

                {/* Settings Groups */}
                <div className="space-y-6">

                    {/* Quick Access */}
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border/40">
                        <Link to="/order-history" className="w-full flex items-center justify-between p-4 border-b border-border/40 active:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                    <ShoppingBag size={20} />
                                </div>
                                <span className="font-bold text-text">My Orders</span>
                            </div>
                            <ChevronRight size={16} className="text-text-dim" />
                        </Link>

                        <div className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500">
                                    <Bell size={20} />
                                </div>
                                <span className="font-bold text-text">Notifications</span>
                            </div>
                            <div className="bg-[var(--color-danger)] text-white text-[0.6rem] font-bold px-2 py-0.5 rounded-full">2 NEW</div>
                        </div>
                    </div>

                    {/* Data Management (DPDP) */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-border/40">
                        <h3 className="text-xs font-bold text-text-dim uppercase tracking-wider mb-4">Data Control (DPDP 2023)</h3>

                        <button className="w-full flex items-center justify-between py-3 border-b border-border/40 active:bg-gray-50">
                            <div className="flex items-center gap-3">
                                <FileText size={18} className="text-text-sub" />
                                <span className="font-medium text-text">Consent Log</span>
                            </div>
                            <ChevronRight size={16} className="text-text-dim" />
                        </button>

                        <button className="w-full flex items-center justify-between py-3 border-b border-border/40 active:bg-gray-50">
                            <div className="flex items-center gap-3">
                                <Download size={18} className="text-text-sub" />
                                <span className="font-medium text-text">Download My Data</span>
                            </div>
                            <ChevronRight size={16} className="text-text-dim" />
                        </button>

                        <button className="w-full flex items-center justify-between py-3 text-danger mt-1 active:bg-red-50 rounded-lg px-2 -mx-2 bg-transparent">
                            <div className="flex items-center gap-3">
                                <Trash2 size={18} />
                            </div>
                            <span className="font-bold">Delete Account</span>
                        </button>
                    </div>

                    <button className="w-full py-4 text-center font-bold text-text-dim hover:text-text transition-colors flex items-center justify-center gap-2">
                        <LogOut size={18} /> Log Out
                    </button>
                </div>
            </div>
        </div>
    )
}
