import { Sun, Cloud, Droplets, Wind, MapPin } from 'lucide-react'

export default function Weather() {
    return (
        <div className="min-h-dvh flex flex-col items-center justify-center page-pad"
            style={{ background: 'linear-gradient(160deg, #74B9FF 0%, #0984E3 100%)' }}>
            <div className="text-center anim-fade">
                <div className="flex items-center justify-center gap-1.5 mb-8 opacity-70">
                    <MapPin size={13} className="text-white" />
                    <span className="text-white font-medium text-xs">Mumbai, India</span>
                </div>

                <Sun size={60} className="text-white mx-auto mb-4 anim-float" />

                <p className="text-6xl font-bold text-white mb-1">32°</p>
                <p className="text-white/70 text-sm font-light mb-10">Partly Cloudy</p>

                <div className="flex gap-6 justify-center">
                    <div className="text-center">
                        <Droplets size={18} className="text-white/60 mx-auto mb-1" />
                        <p className="text-white font-semibold text-sm">65%</p>
                        <p className="text-white/40" style={{ fontSize: '0.625rem' }}>Humidity</p>
                    </div>
                    <div className="text-center">
                        <Wind size={18} className="text-white/60 mx-auto mb-1" />
                        <p className="text-white font-semibold text-sm">12 km/h</p>
                        <p className="text-white/40" style={{ fontSize: '0.625rem' }}>Wind</p>
                    </div>
                    <div className="text-center">
                        <Cloud size={18} className="text-white/60 mx-auto mb-1" />
                        <p className="text-white font-semibold text-sm">26°</p>
                        <p className="text-white/40" style={{ fontSize: '0.625rem' }}>Feels</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
