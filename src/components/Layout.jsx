import { useLocation, Link, useOutlet } from 'react-router-dom'
import { Home, Compass, BookOpen, Users, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { triggerHaptic } from '../utils/haptics'

/**
 * Main Layout Shell
 * Provides the persistent Bottom Navigation Bar and max-width container.
 * 
 * Logic:
 * - Employs Framer Motion for native iOS-like smooth slide/fade transitions.
 * - Conditionally hides navigation on "immersive" screens.
 * - Applies PWA safe-area paddings for notch/home bar.
 */
export default function Layout() {
    const loc = useLocation()
    const baseOutlet = useOutlet()

    const navs = [
        { path: '/dashboard', icon: Home, label: 'Home' },
        { path: '/learn', icon: BookOpen, label: 'Learn' },
        { path: '/chatbot', icon: Sparkles, label: 'AI Chat', isFab: true },
        { path: '/shop', icon: Compass, label: 'Shop' },
        { path: '/experts', icon: Users, label: 'Experts' },
    ]

    // Hide nav on immersive screens: splash, onboarding, chatbot, check-ins
    const hideNav = ['/', '/onboarding', '/chatbot'].includes(loc.pathname) || loc.pathname.startsWith('/checkin')

    // Determine transition depth/direction based on route type
    // We stick to a subtle fade & slight scale for cross-tab, 
    // and a slide-in for deep screens (like checkins)
    const isImmersive = hideNav
    const variants = {
        initial: { opacity: 0, y: isImmersive ? 20 : 5, scale: 0.98 },
        enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
        exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }
    }

    if (hideNav) {
        return (
            <AnimatePresence mode="wait">
                <motion.div key={loc.pathname} variants={variants} initial="initial" animate="enter" exit="exit" className="min-h-dvh flex flex-col safe-pt safe-pb bg-[var(--color-bg)]">
                    {baseOutlet}
                </motion.div>
            </AnimatePresence>
        )
    }

    return (
        <div className="font-sans text-text antialiased selection:bg-primary/20">
            <div className="max-w-md mx-auto bg-[var(--color-bg)] min-h-dvh shadow-2xl relative overflow-hidden flex flex-col pb-24 safe-pt">
                <AnimatePresence mode="wait">
                    <motion.div key={loc.pathname} variants={variants} initial="initial" animate="enter" exit="exit" className="flex-1 flex flex-col">
                        {baseOutlet}
                    </motion.div>
                </AnimatePresence>

                {/* Glassmorphism Bottom Nav */}
                <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass border-t-0 z-50 px-2 pb-4 pt-2 safe-pb">
                    <div className="flex justify-between items-center w-full">
                        {navs.map(n => {
                            const active = loc.pathname === n.path
                            const Icon = n.icon

                            if (n.isFab) {
                                return (
                                    <div key={n.path} className="flex-1 flex justify-center -mt-8 relative z-10">
                                        <Link to={n.path}
                                            onClick={() => triggerHaptic('medium')}
                                            className="flex flex-col items-center">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-[0_8px_16px_rgba(99,102,241,0.4)] active:scale-95 transition-transform border-[4px] border-white dark:border-[var(--color-bg)]">
                                                <Icon size={24} strokeWidth={2.5} />
                                            </div>
                                        </Link>
                                    </div>
                                )
                            }

                            return (
                                <div key={n.path} className="flex-1 flex justify-center">
                                    <Link to={n.path}
                                        onClick={() => !active && triggerHaptic('light')}
                                        className={`flex flex-col items-center gap-0.5 p-1 rounded-2xl transition-all duration-300 ${active ? '-translate-y-1' : 'hover:bg-white/50'}`}>

                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${active
                                            ? 'bg-[var(--color-primary)] text-white shadow-[0_8px_16px_-4px_rgba(142,122,181,0.5)]'
                                            : 'text-text-dim'
                                            }`}>
                                            <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                                        </div>

                                        <span className={`text-[0.6rem] font-semibold transition-colors duration-300 ${active ? 'text-[var(--color-primary)] font-bold' : 'text-text-dim'}`}>
                                            {n.label}
                                        </span>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </nav>
            </div>
        </div>
    )
}
