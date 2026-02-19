import { useState, useEffect } from 'react'
import { Cloud, CloudRain, Sun, Search, MapPin, X } from 'lucide-react'

/**
 * Fake Weather App Overlay
 * Acts as a "discreet mode" or "panic screen".
 * When activated, it covers the entire viewport with a highly believable,
 * innocent-looking weather interface.
 *
 * @param {boolean} isOpen - Controls visibility
 * @param {Function} onClose - Handler to dismiss the overlay (often hidden or secret)
 */
export default function FakeWeatherOverlay({ isOpen, onClose }) {
    const [weatherState, setWeatherState] = useState('sunny')

    // Auto-dismiss after a very long time, or just stay until the user re-authenticates/closes it

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[9999] bg-[#87CEEB] text-white overflow-hidden flex flex-col font-sans pointer-events-auto">

            {/* Secret Close Mechanism - Hidden top left corner */}
            <button
                onClick={onClose}
                className="absolute top-0 left-0 w-16 h-16 bg-transparent z-50 opacity-0"
                aria-label="Close discreet mode"
            />

            <div className="safe-pt px-6 pt-8 pb-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <MapPin size={20} className="text-white/80" />
                    <h1 className="text-xl font-medium tracking-wide">Mumbai</h1>
                </div>
                <Search size={22} className="text-white/80" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center -mt-20">
                <Sun size={120} className="text-[#FFE87C] drop-shadow-lg mb-6" fill="currentColor" />
                <h2 className="text-7xl font-light tracking-tighter ml-4 mb-2">32°</h2>
                <p className="text-2xl font-medium text-white/90">Mostly Sunny</p>
                <div className="flex gap-4 mt-4 text-white/80 text-sm font-medium">
                    <span>H: 34°</span>
                    <span>L: 26°</span>
                </div>
            </div>

            {/* Hourly Forecast Mockup */}
            <div className="bg-white/20 backdrop-blur-md rounded-3xl mx-4 mb-safe-mb mb-8 p-5 border border-white/30">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-4">Today</p>
                <div className="flex justify-between items-center px-2">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm">Now</span>
                        <Sun size={24} className="text-[#FFE87C]" fill="currentColor" />
                        <span className="text-lg font-medium">32°</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm">2 PM</span>
                        <Sun size={24} className="text-[#FFE87C]" fill="currentColor" />
                        <span className="text-lg font-medium">34°</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm">3 PM</span>
                        <Cloud size={24} className="text-white" fill="currentColor" />
                        <span className="text-lg font-medium">33°</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm">4 PM</span>
                        <CloudRain size={24} className="text-[#A1C6EA]" fill="currentColor" />
                        <span className="text-lg font-medium">30°</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
