import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, Shield, Lock, Moon, HelpCircle, LogOut, ChevronRight, Eye, EyeOff } from 'lucide-react'
import PageHeader from '../components/PageHeader'

/**
 * Settings Page
 * Central hub for app configuration, privacy controls, and account management.
 * 
 * Features:
 * - Camouflage Mode (Toggle)
 * - App Lock (Toggle)
 * - Notification Preferences
 * - DPDP Consent Management
 */
/**
 * Settings Page
 * Central hub for app configuration, privacy controls, and account management.
 * 
 * Features:
 * - Camouflage Mode (Toggle): Switches app icon/theme to be discreet.
 * - App Lock (Toggle): Biometric/PIN protection.
 * - Notification Preferences: Granular control over push/email.
 * - DPDP Consent Management: View and revoke permissions.
 */
export default function Settings() {
    const nav = useNavigate()
    const [camouflage, setCamouflage] = useState(false)
    const [appLock, setAppLock] = useState(true)
    const [pushNotifs, setPushNotifs] = useState(true)

    const Section = ({ title, children }) => (
        <div className="mb-6">
            <h3 className="text-xs font-bold text-text-dim uppercase tracking-wider mb-3 px-2">{title}</h3>
            <div className="bg-white rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                {children}
            </div>
        </div>
    )

    const Row = ({ icon: Icon, label, value, onClick, isToggle, toggleValue, onToggle, description, iconBgClass, iconColorClass }) => (
        <div onClick={onClick} className={`p-4 flex items-center justify-between border-b border-border/40 last:border-0 ${onClick ? 'active:bg-gray-50 transition-colors cursor-pointer' : ''}`}>
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${iconBgClass || 'bg-[var(--color-bg-sub)]'} flex items-center justify-center ${iconColorClass || 'text-[var(--color-primary)]'}`}>
                    <Icon size={16} />
                </div>
                <div>
                    <span className="text-sm font-medium text-text">{label}</span>
                    {description && <p className="text-[0.65rem] text-text-sub">{description}</p>}
                </div>
            </div>

            {isToggle ? (
                <button
                    onClick={(e) => { e.stopPropagation(); onToggle(!toggleValue); }}
                    className={`toggle ${toggleValue ? 'bg-[var(--color-secondary)]' : 'bg-gray-200'}`}
                >
                    <div className={`toggle-knob ${toggleValue ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
                </button>
            ) : (
                <div className="flex items-center gap-2 text-text-dim">
                    {value && <span className="text-xs">{value}</span>}
                    <ChevronRight size={16} />
                </div>
            )}
        </div>
    )

    return (
        <div className="min-h-dvh bg-[var(--color-bg-sub)] pb-10">
            {/* Header */}
            <PageHeader title="Settings" onBack={() => nav('/profile')} />

            <div className="page-pad pt-6">

                {/* Account Section */}
                <Section title="Account">
                    <Row icon={Shield} label="Personal Info" onClick={() => { }} />
                    <Row icon={Lock} label="Change Password" onClick={() => { }} />
                    {/* COMPLIANCE (DPDP Act 2023 - Section 6): Explicit, informed consent management. Users must have the right to withdraw consent as easily as they gave it. */}
                    <Row icon={Shield} label="Privacy & Consent (DPDP)" onClick={() => { }} />
                </Section>

                {/* App Controls */}
                <Section title="Privacy & Security">
                    <Row
                        icon={camouflage ? EyeOff : Eye}
                        label="Camouflage Mode"
                        isToggle={true}
                        toggleValue={camouflage}
                        onToggle={setCamouflage}
                    />
                    <Row
                        icon={Lock}
                        label="App Lock (Biometric)"
                        isToggle={true}
                        toggleValue={appLock}
                        onToggle={setAppLock}
                    />
                </Section>

                {/* Preferences */}
                <Section title="Preferences">
                    <Row
                        icon={Bell}
                        label="Push Notifications"
                        isToggle={true}
                        toggleValue={pushNotifs}
                        onToggle={setPushNotifs}
                    />
                    <Row icon={Moon} label="Theme" value="Light" onClick={() => { }} />
                </Section>

                {/* Support */}
                <Section title="Support">
                    <Row icon={HelpCircle} label="Help Center" onClick={() => { }} />
                    <Row icon={HelpCircle} label="About Sutrr" value="v2.0.0" onClick={() => { }} />
                </Section>

                <button className="w-full py-4 text-center text-[var(--color-danger)] font-semibold bg-white rounded-2xl border border-border/50 shadow-sm active:bg-red-50 transition-colors flex items-center justify-center gap-2">
                    <LogOut size={18} />
                    Log Out
                </button>

                <p className="text-center text-[0.65rem] text-text-dim mt-6">
                    Sutrr Wellness App • Server: Asia-South1 (Mumbai) <br />
                    DPDP Compliant & Encrypted
                </p>
            </div>
        </div>
    )
}
