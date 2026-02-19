import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, X } from 'lucide-react'
import FakeWeatherOverlay from './FakeWeatherOverlay'

/**
 * Reusable Page Header Component
 * Encapsulates the safe-area padding, back button, title, and optional actions.
 * 
 * @param {string|React.ReactNode} title - The main page title
 * @param {string|React.ReactNode} [subtitle] - Optional subtitle (e.g. date, status)
 * @param {Function} [onBack] - Custom back handler. Defaults to returning to dashboard.
 * @param {React.ReactNode} [action] - Optional right-side actions or buttons
 * @param {boolean} [sticky=true] - Whether the header should stick to the top
 */
export default function PageHeader({ title, subtitle, onBack, action, sticky = true }) {
    const nav = useNavigate()
    const [isDiscreetMode, setIsDiscreetMode] = useState(false)

    const handleBack = () => {
        if (onBack) onBack()
        else nav('/dashboard')
    }

    return (
        <div className={`bg-white px-4 pt-6 pb-3 flex items-center justify-between border-b border-border/40 safe-pt ${sticky ? 'sticky top-0 z-40' : ''}`}>
            {/* Global Discreet Mode Overlay */}
            <FakeWeatherOverlay isOpen={isDiscreetMode} onClose={() => setIsDiscreetMode(false)} />

            <div className="flex items-center gap-3">
                <button
                    onClick={handleBack}
                    className="w-10 h-10 rounded-full hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center transition-colors"
                >
                    <ArrowLeft size={20} className="text-text" />
                </button>
                <div>
                    <h1 className="font-bold text-lg text-text flex items-center gap-2">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-xs text-text-sub font-medium truncate max-w-[200px] flex items-center gap-1">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
                {action}
                {/* Discreet Quick Exit Button - Always present in headers */}
                <button
                    onClick={() => setIsDiscreetMode(true)}
                    className="w-8 h-8 rounded-full bg-danger/5 hover:bg-danger/10 text-danger flex items-center justify-center transition-colors active:scale-95"
                    aria-label="Quick Exit"
                >
                    <X size={16} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    )
}
