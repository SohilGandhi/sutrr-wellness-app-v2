import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Activity, Droplets, Calendar } from 'lucide-react'

const phases = [
    { title: 'Menstrual', desc: 'Days 1-5', color: 'bg-red-100 text-red-600 border-red-200' },
    { title: 'Follicular', desc: 'Days 6-14', color: 'bg-blue-100 text-blue-600 border-blue-200' },
    { title: 'Ovulation', desc: 'Day 14', color: 'bg-purple-100 text-purple-600 border-purple-200' },
    { title: 'Luteal', desc: 'Days 15-28', color: 'bg-yellow-100 text-yellow-600 border-yellow-200' },
]

export default function CycleCheckin() {
    const nav = useNavigate()
    const [selected, setSelected] = useState(0)
    const [saving, setSaving] = useState(false)

    const handleSave = () => {
        setSaving(true)
        setTimeout(() => nav('/dashboard'), 1500)
    }

    return (
        <div className="min-h-dvh bg-[var(--color-bg-sub)] flex flex-col">
            <div className="p-4 pt-14 flex items-center gap-3 bg-white border-b border-border/40">
                <button onClick={() => nav('/dashboard')} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-2 text-text">
                    <Activity size={18} className="text-pink-500" />
                    <span className="font-bold text-lg">Cycle Tracking</span>
                </div>
            </div>

            <div className="flex-1 p-6 space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm text-center border border-border/40">
                    <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-3 text-pink-500">
                        <Droplets size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-text mb-1">How is your flow?</h2>
                    <p className="text-sm text-text-sub">Select current phase</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {phases.map((p, i) => (
                        <button
                            key={i}
                            onClick={() => setSelected(i)}
                            className={`p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${selected === i
                                ? `${p.color} border-current shadow-md scale-[1.02]`
                                : 'bg-white border-transparent text-text-dim'
                                }`}
                        >
                            <div className="text-left">
                                <h3 className="font-bold text-base">{p.title}</h3>
                                <p className="text-xs font-semibold opacity-80">{p.desc}</p>
                            </div>
                            {selected === i && <Check size={20} />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 bg-white border-t border-border/40">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`w-full h-14 rounded-2xl flex items-center justify-center gap-2 text-lg font-bold text-white shadow-lg transition-all ${saving ? 'bg-green-500' : 'bg-pink-500'
                        }`}
                >
                    {saving ? <Check /> : 'Update Cycle'}
                </button>
            </div>
        </div>
    )
}
