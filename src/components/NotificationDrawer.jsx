import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, Calendar, MessageCircle, ShoppingBag, Wind } from 'lucide-react'

/**
 * Slide-out Notification Drawer
 * Displays mock but realistic notifications with unread indicators.
 */
export default function NotificationDrawer({ isOpen, onClose }) {
    const notifications = [
        {
            id: 1,
            icon: Wind,
            title: "Time for your Mood Check-in",
            desc: "How are you feeling today? Take 30 seconds to log your mood.",
            time: "2m ago",
            unread: true,
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            id: 2,
            icon: MessageCircle,
            title: "New AI Journey Available",
            desc: "Based on your recent activity, we've unlocked 'Managing Evening Stress'.",
            time: "1h ago",
            unread: true,
            color: "text-indigo-500",
            bg: "bg-indigo-50"
        },
        {
            id: 3,
            icon: Calendar,
            title: "Upcoming Expert Session",
            desc: "Your session with Dr. Anjali is tomorrow at 4 PM.",
            time: "5h ago",
            unread: false,
            color: "text-green-500",
            bg: "bg-green-50"
        },
        {
            id: 4,
            icon: ShoppingBag,
            title: "Order Delivered",
            desc: "Your Intimacy Kit has been delivered discreetly.",
            time: "1d ago",
            unread: false,
            color: "text-orange-500",
            bg: "bg-orange-50"
        }
    ]

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="notification-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
                />
            )}

            {isOpen && (
                <motion.div
                    key="notification-drawer"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed top-0 right-0 bottom-0 w-[90%] sm:w-80 bg-white z-50 shadow-2xl flex flex-col pt-safe-top"
                >
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-border/40 flex justify-between items-center bg-white/80 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                                <Bell size={16} />
                            </div>
                            <h2 className="font-bold text-lg text-text">Notifications</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                            <X size={16} className="text-text-sub" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-5 pb-20 space-y-4">
                        {notifications.map((notif) => {
                            const Icon = notif.icon
                            return (
                                <div key={notif.id} className={`p-4 rounded-2xl border ${notif.unread ? 'border-indigo-100 bg-indigo-50/30' : 'border-border/40 bg-white'} shadow-sm relative overflow-hidden`}>
                                    {notif.unread && (
                                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-indigo-500" />
                                    )}
                                    <div className="flex gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.bg} ${notif.color}`}>
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <h3 className={`text-sm font-bold ${notif.unread ? 'text-indigo-900' : 'text-text'} mb-0.5 pr-4`}>
                                                {notif.title}
                                            </h3>
                                            <p className="text-xs text-text-sub leading-snug mb-2">
                                                {notif.desc}
                                            </p>
                                            <span className="text-[0.65rem] font-medium text-text-dim">
                                                {notif.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
