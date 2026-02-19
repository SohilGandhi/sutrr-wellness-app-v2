import { Outlet, useLocation, Link } from 'react-router-dom'
import { Home, Compass, BookOpen, Users, User } from 'lucide-react'

export default function Layout() {
    const loc = useLocation()

    const navs = [
        { path: '/dashboard', icon: Home, label: 'Home' },
        { path: '/shop', icon: Compass, label: 'Shop' },
        { path: '/learn', icon: BookOpen, label: 'Learn' },
        { path: '/experts', icon: Users, label: 'Experts' },
        { path: '/profile', icon: User, label: 'Profile' },
    ]

    // Hide nav on splash/onboarding
    if (['/', '/onboarding'].includes(loc.pathname)) return <Outlet />

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
                                    className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 ${active ? '-translate-y-2' : 'hover:bg-white/50'}`}>

                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${active
                                            ? 'bg-[var(--color-primary)] text-white shadow-[0_8px_16px_-4px_rgba(142,122,181,0.5)]'
                                            : 'text-text-dim'
                                        }`}>
                                        <Icon size={24} strokeWidth={active ? 2.5 : 2} />
                                    </div>

                                    {active && (
                                        <span className="text-[0.65rem] font-bold text-[var(--color-primary)] absolute -bottom-4 anim-fade">
                                            {n.label}
                                        </span>
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </nav>
            </div>
        </div>
    )
}
