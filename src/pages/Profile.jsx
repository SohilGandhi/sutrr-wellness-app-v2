import { useState } from 'react'
import { Shield, Fingerprint, Eye, Download, Trash2, FileText, ChevronRight, LogOut } from 'lucide-react'

export default function Profile() {
    const [camo, setCamo] = useState(true)

    return (
        <div className="pb-24 bg-[var(--color-bg-sub)] min-h-dvh">
            <div className="pt-14 pb-8 bg-white rounded-b-[2rem] border-b border-border/40 text-center shadow-sm">
                <div className="w-24 h-24 rounded-full bg-[var(--color-primary-faint)] mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-[var(--color-primary)]">
                    JD
                </div>
                <h1 className="text-2xl font-bold text-text">Jane Doe</h1>
                <p className="text-sm text-text-sub">Joined 2024 • ABHA Linked</p>
            </div>

            <div className="page-pad -mt-6">
                {/* Settings Groups */}
                <div className="space-y-6">

                    {/* Privacy Section */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-border/40">
                        <h3 className="text-xs font-bold text-text-dim uppercase tracking-wider mb-4">Privacy & Security</h3>

                        <div className="flex justify-between items-center mb-6">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-[var(--color-secondary-faint)] flex items-center justify-center text-[var(--color-secondary-dark)]"><Eye size={20} /></div>
                                <div>
                                    <p className="font-bold text-text">Camouflage</p>
                                    <p className="text-xs text-text-sub">Discreet icon & notifications</p>
                                </div>
                            </div>
                            {/* Toggle */}
                            <button onClick={() => setCamo(!camo)} className={`toggle ${camo ? 'bg-[var(--color-secondary)]' : 'bg-gray-300'}`}>
                                <div className={`toggle-knob ${camo ? 'translate-x-[18px]' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500"><Fingerprint size={20} /></div>
                                <div>
                                    <p className="font-bold text-text">Biometric Lock</p>
                                    <p className="text-xs text-text-sub">FaceID required to open</p>
                                </div>
                            </div>
                            <button className="toggle bg-[var(--color-primary)]">
                                <div className="toggle-knob translate-x-[18px]" />
                            </button>
                        </div>
                    </div>

                    {/* Data Management (DPDP) */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-border/40">
                        <h3 className="text-xs font-bold text-text-dim uppercase tracking-wider mb-4">Data Control (DPDP 2023)</h3>

                        <button className="w-full flex items-center justify-between py-3 border-b border-border/40">
                            <div className="flex items-center gap-3">
                                <FileText size={18} className="text-text-sub" />
                                <span className="font-medium text-text">Consent Log</span>
                            </div>
                            <ChevronRight size={16} className="text-text-dim" />
                        </button>

                        <button className="w-full flex items-center justify-between py-3 border-b border-border/40">
                            <div className="flex items-center gap-3">
                                <Download size={18} className="text-text-sub" />
                                <span className="font-medium text-text">Download My Data</span>
                            </div>
                            <ChevronRight size={16} className="text-text-dim" />
                        </button>

                        <button className="w-full flex items-center justify-between py-3 text-danger mt-1">
                            <div className="flex items-center gap-3">
                                <Trash2 size={18} />
                                <span className="font-bold">Delete Account</span>
                            </div>
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
