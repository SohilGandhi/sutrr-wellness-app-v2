import { Outlet, useLocation, Link } from 'react-router-dom'
import { Home, Compass, BookOpen, Users, User } from 'lucide-react'

/**
 * Main Layout Shell
 * Provides the persistent Bottom Navigation Bar and max-width container.
 * 
 * Logic:
 * - Conditionally hides navigation on "immersive" screens (Splash, Onboarding).
 * - "Glassmorphism" effect applied to the bottom nav for a premium feel.
 */
export default function Layout() {
    const loc = useLocation()

    const navs = [
        { path: '/dashboard', icon: Home, label: 'Home' },
        { path: '/shop', icon: Compass, label: 'Shop' },
        { path: '/learn', icon: BookOpen, label: 'Learn' },
        { path: '/experts', icon: Users, label: 'Experts' },
        { path: '/profile', icon: User, label: 'Profile' },
    ]

    // Hide nav on immersive screens: splash, onboarding, chatbot, check-ins
    const hideNav = ['/', '/onboarding', '/chatbot'].includes(loc.pathname) || loc.pathname.startsWith('/checkin')
    if (hideNav) return <Outlet />

    return (
        <div className="font-sans text-text antialiased selection:bg-primary/20">
            <div className="max-w-md mx-auto bg-[var(--color-bg)] min-h-dvh shadow-2xl relative">
                <Outlet />

                {/* Glassmorphism Bottom Nav */}
                <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass border-t-0 z-50 px-6 pb-6 pt-2">
                    <div className="flex justify-between items-center">
                        {navs.map(n => {
                            const active = loc.pathname === n.path
                            const Icon = n.icon
                            return (
                                <Link key={n.path} to={n.path}
                                    className={`flex flex-col items-center gap-0.5 p-1.5 rounded-2xl transition-all duration-300 ${active ? '-translate-y-1' : 'hover:bg-white/50'}`}>

                                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${active
                                        ? 'bg-[var(--color-primary)] text-white shadow-[0_8px_16px_-4px_rgba(142,122,181,0.5)]'
                                        : 'text-text-dim'
                                        }`}>
                                        <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                                    </div>

                                    <span className={`text-[0.55rem] font-semibold transition-colors duration-300 ${active ? 'text-[var(--color-primary)] font-bold' : 'text-text-dim'}`}>
                                        {n.label}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </nav>
            </div>
        </div>
    )
}
