import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { chatResponses } from '../data/mockData'
import { ArrowLeft, Send, Sparkles, X, StopCircle } from 'lucide-react'

export default function Chatbot() {
    const [msgs, setMsgs] = useState([
        { text: "Hi! I'm your AI wellness buddy. How are you feeling today?", sender: 'bot' }
    ])
    const [inp, setInp] = useState('')
    const [typing, setTyping] = useState(false)
    const endRef = useRef(null)
    const nav = useNavigate()

    const send = () => {
        if (!inp.trim()) return
        const txt = inp
        setMsgs(p => [...p, { text: txt, sender: 'user' }])
        setInp('')
        setTyping(true)

        // Simulate AI delay
        setTimeout(() => {
            const resp = chatResponses[txt] || "That's interesting. Tell me more about how that affects your mood?"
            setMsgs(p => [...p, { text: resp, sender: 'bot' }])
            setTyping(false)
        }, 1500)
    }

    useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [msgs, typing])

    return (
        <div className="bg-[var(--color-bg)] h-dvh flex flex-col">
            {/* Header */}
            <div className="bg-white p-4 pt-14 flex items-center justify-between border-b border-border/40 shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <Link to="/dashboard" className="w-10 h-10 rounded-full hover:bg-[var(--color-bg-sub)] flex items-center justify-center transition-colors">
                        <ArrowLeft size={20} className="text-text" />
                    </Link>
                    <div>
                        <h1 className="font-bold text-lg text-text flex items-center gap-2">
                            Wellness Buddy <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse" />
                        </h1>
                        <p className="text-xs text-text-sub">AI-powered • Encrypted</p>
                    </div>
                </div>
                <button onClick={() => nav('/weather')} className="quick-exit">
                    <StopCircle size={14} /> EXIT
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {msgs.map((m, i) => (
                    <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${m.sender === 'user'
                                ? 'bg-[var(--color-primary)] text-white rounded-tr-none'
                                : 'bg-white text-text border border-border/50 rounded-tl-none'
                            }`}>
                            {m.text}
                        </div>
                    </div>
                ))}

                {typing && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-border/50 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5 items-center">
                            <span className="w-1.5 h-1.5 bg-text-dim rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-text-dim rounded-full animate-bounce anim-delay-1" />
                            <span className="w-1.5 h-1.5 bg-text-dim rounded-full animate-bounce anim-delay-2" />
                        </div>
                    </div>
                )}
                <div ref={endRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-border/40">
                <div className="relative">
                    <input
                        value={inp}
                        onChange={e => setInp(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && send()}
                        placeholder="Type thoughtfully..."
                        className="input pr-12 text-base shadow-inner bg-[var(--color-bg-sub)] border-none"
                    />
                    <button onClick={send} disabled={!inp.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--color-primary)] text-white rounded-xl flex items-center justify-center disabled:opacity-50 active:scale-95 transition-all shadow-md">
                        <Send size={16} />
                    </button>
                </div>
                <p className="text-[0.6rem] text-center text-text-dim mt-2">
                    AI can make mistakes. Not medical advice.
                </p>
            </div>
        </div>
    )
}
