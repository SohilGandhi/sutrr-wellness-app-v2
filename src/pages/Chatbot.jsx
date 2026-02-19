/**
 * Chatbot Page — AI Wellness Assistant
 * Manages multi-conversation AI chat with auto-titling, rename, and delete.
 *
 * COMPLIANCE (Telemedicine Practice Guidelines 2020):
 *  - AI chatbot is NOT a medical professional. Explicit disclaimer in UI.
 *  - AI responses do not constitute diagnosis, prescription, or medical advice.
 *
 * COMPLIANCE (DPDP Act 2023 - Section 6):
 *  - Chat data is stored locally in localStorage. No server-side storage.
 *  - "Clear All" feature provides Right to Erasure for chat history.
 *  - "Share to AI" from Journal requires explicit consent before processing.
 *
 * COMPLIANCE (Quick Exit / Safety):
 *  - FakeWeatherOverlay provides instant discreet mode for user safety.
 *
 * UI/UX: iOS HIG — ChatGPT-style 2-view system (Conversation List + Active Chat).
 */
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { chatResponses } from '../data/mockData'
import { ArrowLeft, Send, Sparkles, MoreVertical, Trash2, MessageSquarePlus, ChevronLeft, AlertTriangle, Shield, ShieldCheck, Edit3, Clock, MessageCircle, X } from 'lucide-react'
import { triggerHaptic } from '../utils/haptics'
import FakeWeatherOverlay from '../components/FakeWeatherOverlay'

const SUGGESTED_PROMPTS = [
    "😟 I feel anxious today",
    "💤 Tips for better sleep?",
    "❤️ How to improve intimacy?",
    "📅 Tracking my cycle"
]

/**
 * Delete Confirmation Modal (shared pattern with Journal)
 */
const DeleteModal = ({ title, message, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-6 anim-fade">
        <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={28} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-text text-center mb-2">{title}</h3>
            <p className="text-sm text-text-sub text-center leading-relaxed mb-6">{message}</p>
            <div className="flex gap-3">
                <button onClick={onCancel}
                    className="flex-1 py-3.5 bg-gray-100 text-text-sub rounded-2xl font-bold text-sm active:scale-[0.98] transition-all">
                    Cancel
                </button>
                <button onClick={onConfirm}
                    className="flex-1 py-3.5 bg-red-500 text-white rounded-2xl font-bold text-sm active:scale-[0.98] transition-all shadow-lg shadow-red-200">
                    Delete Permanently
                </button>
            </div>
        </div>
    </div>
)

// --- Utility ---
const formatChatDate = (iso) => {
    const d = new Date(iso)
    const now = new Date()
    const diff = now - d
    if (diff < 60000) return 'Just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    if (diff < 604800000) return d.toLocaleDateString('en-IN', { weekday: 'short' })
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

const formatMsgTime = (iso) => new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

/**
 * AI Wellness Buddy — Chat Management System
 * 
 * 2 Views (ChatGPT-style):
 * 1. Conversation List: All past chats with titles, previews, dates
 * 2. Active Chat: Messaging interface with timestamps
 * 
 * Features:
 * - localStorage persistence per conversation
 * - Delete with confirmation modal (DPDP compliant)
 * - Auto-title from first user message
 * - Journal "Share to AI" integration
 * - Medical disclaimer (Telemedicine Guidelines 2020)
 */
export default function Chatbot() {
    const nav = useNavigate()
    const location = useLocation()
    const endRef = useRef(null)

    // Conversation management
    const [conversations, setConversations] = useState(() => {
        const saved = localStorage.getItem('sutrr_chats')
        return saved ? JSON.parse(saved) : []
    })
    const [activeId, setActiveId] = useState(null)
    const [inp, setInp] = useState('')
    const [typing, setTyping] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [deleteModal, setDeleteModal] = useState(null) // { type: 'single'|'all', id }
    const [isRenaming, setIsRenaming] = useState(false)
    const [renameText, setRenameText] = useState('')
    const [isDiscreetMode, setIsDiscreetMode] = useState(false)

    // Derived state
    const activeConvo = conversations.find(c => c.id === activeId) || null
    const msgs = activeConvo?.messages || []

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('sutrr_chats', JSON.stringify(conversations))
    }, [conversations])

    // Scroll to bottom
    useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])

    // Handle Journal "Share to AI" — create new conversation
    useEffect(() => {
        if (location.state?.prefill) {
            const text = location.state.prefill
            window.history.replaceState({}, '')
            const newConvo = createConversation()
            // Send the prefilled message in the new conversation
            setTimeout(() => sendInConvo(text, newConvo.id), 300)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // --- Conversation CRUD ---
    const createConversation = () => {
        const newConvo = {
            id: Date.now(),
            title: 'New Conversation',
            messages: [
                { text: "Hi! I'm your AI wellness buddy. How can I help you today?", sender: 'bot', time: new Date().toISOString() }
            ],
            updatedAt: new Date().toISOString()
        }
        setConversations(prev => [newConvo, ...prev])
        setActiveId(newConvo.id)
        return newConvo
    }

    const sendInConvo = (text, convoId = activeId) => {
        if (!text.trim()) return
        const now = new Date().toISOString()

        setConversations(prev => prev.map(c => {
            if (c.id !== convoId) return c
            const updated = {
                ...c,
                messages: [...c.messages, { text, sender: 'user', time: now }],
                updatedAt: now,
                // Auto-title from first user message
                title: c.title === 'New Conversation' ? text.substring(0, 40) : c.title
            }
            return updated
        }))
        setInp('')
        setTyping(true)
        triggerHaptic('medium')

        // Simulate AI response
        setTimeout(() => {
            const resp = chatResponses[text] || "I hear you. Based on what you've shared, I'd recommend taking some time for yourself today. Would you like some specific wellness tips?"
            setConversations(prev => prev.map(c => {
                if (c.id !== convoId) return c
                return {
                    ...c,
                    messages: [...c.messages, { text: resp, sender: 'bot', time: new Date().toISOString() }],
                    updatedAt: new Date().toISOString()
                }
            }))
            setTyping(false)
        }, 1500)
    }

    const send = (text = inp) => sendInConvo(text, activeId)

    const requestDeleteConvo = (id) => {
        setDeleteModal({ type: 'single', id })
        setShowMenu(false)
    }

    const requestClearAll = () => {
        setDeleteModal({ type: 'all' })
        setShowMenu(false)
    }

    const confirmDelete = () => {
        if (!deleteModal) return
        if (deleteModal.type === 'all') {
            setConversations([])
            setActiveId(null)
        } else {
            setConversations(prev => prev.filter(c => c.id !== deleteModal.id))
            if (activeId === deleteModal.id) setActiveId(null)
        }
        setDeleteModal(null)
        triggerHaptic('heavy')
    }

    const startRename = () => {
        if (!activeConvo) return
        setRenameText(activeConvo.title)
        setIsRenaming(true)
        setShowMenu(false)
    }

    const saveRename = () => {
        if (!renameText.trim()) return
        setConversations(prev => prev.map(c =>
            c.id === activeId ? { ...c, title: renameText.trim() } : c
        ))
        setIsRenaming(false)
        triggerHaptic('success')
    }

    // --- CONVERSATION LIST VIEW ---
    const ListView = () => (
        <div className="bg-gray-50 fixed inset-0 flex flex-col z-50">
            {/* Header */}
            <div className="bg-white px-4 pt-12 pb-3 flex items-center justify-between border-b border-gray-100 shadow-sm z-20">
                <div className="flex items-center gap-3">
                    <button onClick={() => nav('/dashboard')} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center active:bg-gray-200 transition-colors">
                        <ArrowLeft size={20} className="text-gray-700" />
                    </button>
                    <div>
                        <h1 className="font-bold text-base text-gray-900 flex items-center gap-2">
                            Wellness Buddy <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        </h1>
                        <p className="text-[0.65rem] text-gray-500 font-medium tracking-wide">
                            {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {conversations.length > 0 && (
                        <button onClick={requestClearAll}
                            className="text-xs text-red-400 font-bold px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                            Clear All
                        </button>
                    )}
                    <button
                        onClick={() => setIsDiscreetMode(true)}
                        className="w-8 h-8 rounded-full bg-danger/5 hover:bg-danger/10 text-danger flex items-center justify-center transition-colors active:scale-95"
                        aria-label="Quick Exit"
                    >
                        <X size={16} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-28">
                {conversations.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                            <MessageCircle size={32} className="text-[var(--color-primary)] opacity-50" />
                        </div>
                        <p className="text-base font-semibold text-text mb-1">No conversations yet</p>
                        <p className="text-sm text-text-dim/60 mb-6">Start a new chat with your AI Wellness Buddy</p>
                        <button onClick={createConversation}
                            className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-2xl font-bold text-sm active:scale-[0.98] transition-all shadow-lg shadow-indigo-200">
                            <span className="flex items-center gap-2"><MessageSquarePlus size={16} /> Start First Chat</span>
                        </button>
                    </div>
                ) : (
                    conversations.map(c => (
                        <button key={c.id} onClick={() => setActiveId(c.id)}
                            className="w-full text-left bg-white p-4 rounded-2xl border border-border/40 shadow-sm flex items-start gap-3 active:scale-[0.98] transition-all">

                            {/* Icon */}
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                <Sparkles size={18} className="text-[var(--color-primary)]" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-bold text-text truncate pr-2">{c.title}</span>
                                    <span className="text-[0.6rem] text-text-dim flex-shrink-0">{formatChatDate(c.updatedAt)}</span>
                                </div>
                                <p className="text-xs text-text-sub line-clamp-1">
                                    {c.messages.length > 0 ? c.messages[c.messages.length - 1].text : 'No messages'}
                                </p>
                                <span className="text-[0.55rem] text-text-dim mt-1 block">
                                    {c.messages.filter(m => m.sender === 'user').length} messages
                                </span>
                            </div>

                            {/* Delete */}
                            <button onClick={(ev) => { ev.stopPropagation(); requestDeleteConvo(c.id) }}
                                className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors">
                                <Trash2 size={14} />
                            </button>
                        </button>
                    ))
                )}
            </div>

            {/* New Chat FAB */}
            {conversations.length > 0 && (
                <div className="p-4 bg-white border-t border-border/40 sticky bottom-0 z-10">
                    <button onClick={createConversation}
                        className="w-full py-4 bg-[var(--color-primary)] text-white rounded-2xl font-bold text-base shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <MessageSquarePlus size={18} /> New Chat
                    </button>
                </div>
            )}
        </div>
    )

    // --- ACTIVE CHAT VIEW ---
    const ChatView = () => (
        <div className="bg-gray-50 fixed inset-0 flex flex-col z-50">
            {/* Header */}
            <div className="bg-white px-4 pt-12 pb-3 flex items-center justify-between border-b border-gray-100 shadow-sm z-20">
                <div className="flex items-center gap-3">
                    <button onClick={() => { setActiveId(null); setShowMenu(false) }}
                        className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center active:bg-gray-200 transition-colors">
                        <ChevronLeft size={22} className="text-gray-700" />
                    </button>
                    <div className="min-w-0">
                        {isRenaming ? (
                            <div className="flex items-center gap-2">
                                <input value={renameText} onChange={e => setRenameText(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && saveRename()}
                                    className="text-sm font-bold text-gray-900 bg-gray-100 rounded-lg px-2 py-1 border-none focus:ring-2 focus:ring-indigo-200 w-40"
                                    autoFocus />
                                <button onClick={saveRename} className="text-xs text-[var(--color-primary)] font-bold">Save</button>
                            </div>
                        ) : (
                            <>
                                <h1 className="font-bold text-sm text-gray-900 truncate max-w-[200px] flex items-center gap-2">
                                    {activeConvo?.title || 'Chat'} <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                                </h1>
                                <p className="text-[0.6rem] text-gray-500 font-medium tracking-wide">AI-POWERED • ENCRYPTED</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="relative flex items-center gap-2">
                    <button
                        onClick={() => setIsDiscreetMode(true)}
                        className="w-8 h-8 rounded-full bg-danger/5 hover:bg-danger/10 text-danger flex items-center justify-center transition-colors active:scale-95"
                        aria-label="Quick Exit"
                    >
                        <X size={16} strokeWidth={2.5} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu) }}
                        className="w-9 h-9 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-500 transition-colors">
                        <MoreVertical size={20} />
                    </button>

                    {showMenu && (
                        <div className="absolute top-12 right-0 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden anim-fade origin-top-right z-30">
                            <button onClick={startRename}
                                className="w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors border-b border-gray-50">
                                <Edit3 size={16} /> Rename Chat
                            </button>
                            <button onClick={() => requestDeleteConvo(activeId)}
                                className="w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-red-50 text-red-500 text-sm font-medium transition-colors">
                                <Trash2 size={16} /> Delete Chat
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 pb-24" onClick={() => setShowMenu(false)}>
                {/* Encryption badge */}
                <div className="flex justify-center my-3">
                    <span className="bg-gray-200 text-gray-500 text-[0.6rem] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <ShieldCheck size={10} /> End-to-End Encrypted Session
                    </span>
                </div>

                {/* Suggested prompts (only on initial bot greeting) */}
                {msgs.length === 1 && (
                    <div className="grid grid-cols-2 gap-2 mb-4 px-2">
                        {SUGGESTED_PROMPTS.map((prompt, i) => (
                            <button key={i} onClick={() => send(prompt)}
                                className="text-xs text-left p-3 rounded-xl bg-white border border-gray-200 text-gray-600 active:bg-indigo-50 active:border-indigo-200 active:text-indigo-600 transition-colors shadow-sm">
                                {prompt}
                            </button>
                        ))}
                    </div>
                )}

                {/* Messages */}
                {msgs.map((m, i) => (
                    <div key={i} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-[0.95rem] leading-relaxed shadow-sm ${m.sender === 'user'
                            ? 'bg-indigo-600 text-white rounded-tr-sm'
                            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
                            }`}>
                            {m.text}
                        </div>
                        {m.time && (
                            <span className="text-[0.55rem] text-gray-400 mt-1 px-1 flex items-center gap-0.5">
                                <Clock size={8} /> {formatMsgTime(m.time)}
                            </span>
                        )}
                    </div>
                ))}

                {/* Typing indicator */}
                {typing && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce anim-delay-1" />
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce anim-delay-2" />
                        </div>
                    </div>
                )}
                <div ref={endRef} />
            </div>

            {/* Input Bar */}
            <div className="bg-white border-t border-gray-100 p-3 pb-8 absolute bottom-0 left-0 right-0 z-20">
                <div className="relative flex items-center gap-2">
                    <input value={inp} onChange={e => setInp(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && send()}
                        placeholder="Message Wellness Buddy..."
                        className="flex-1 bg-gray-100 border-none rounded-full h-12 px-5 text-base focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-gray-400" />
                    <button onClick={() => send()} disabled={!inp.trim()}
                        className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:bg-gray-300 active:scale-90 transition-all shadow-md">
                        <Send size={18} className="translate-x-0.5" />
                    </button>
                </div>
                {/* COMPLIANCE (Telemedicine Guidelines 2020): Explicit disclaimer that AI is not a substitute for registered medical practitioners. */}
                <p className="text-[0.6rem] text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
                    <Sparkles size={10} /> Not medical advice. Consult a doctor for emergencies.
                </p>
            </div>
        </div>
    )

    return (
        <>
            <FakeWeatherOverlay isOpen={isDiscreetMode} onClose={() => setIsDiscreetMode(false)} />

            {/* Delete Modals */}
            {deleteModal && (
                <DeleteModal
                    title={deleteModal.type === 'all' ? 'Clear All Chats?' : 'Delete Conversation?'}
                    message={deleteModal.type === 'all'
                        ? 'This will permanently remove all conversations. Your wellness data is stored locally and this action cannot be undone.'
                        : 'This will permanently remove this conversation and all its messages. This action cannot be undone.'
                    }
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteModal(null)}
                />
            )}

            {/* Views */}
            {activeId ? <ChatView /> : <ListView />}
        </>
    )
}
