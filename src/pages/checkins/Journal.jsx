import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, BookOpen, Sparkles, Trash2, Edit3, ChevronLeft, CheckSquare, Square, MessageCircle, AlertTriangle, Shield } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'

/**
 * Reflection prompts — conversational suggestions to help users start writing.
 */
const REFLECTIONS = [
    "How are you feeling right now?",
    "What are you grateful for today?",
    "What's one small win from today?",
    "How did you take care of yourself?",
    "What would make tomorrow better?"
]

// Initial mock entries
const INITIAL_ENTRIES = [
    { id: 1, date: '2026-02-19T10:30:00', mood: 'Happy', text: 'Had a really productive day at work. Managed to finish the project early and took some time for a walk in the evening. Feeling accomplished and peaceful.' },
    { id: 2, date: '2026-02-18T21:15:00', mood: 'Neutral', text: 'Feeling a bit overwhelmed with deadlines but managed to stay calm. Practiced some breathing exercises which helped.' },
    { id: 3, date: '2026-02-17T08:45:00', mood: 'Sad', text: 'Didn\'t sleep well last night. Need to work on my sleep schedule. Going to try limiting screen time before bed.' },
]

const moodEmoji = { Happy: '😊', Neutral: '😐', Sad: '😔' }
const moodColor = {
    Happy: 'bg-green-50 text-green-600 border-green-200',
    Neutral: 'bg-amber-50 text-amber-600 border-amber-200',
    Sad: 'bg-blue-50 text-blue-600 border-blue-200',
}

/**
 * Delete Confirmation Modal
 * DPDP-compliant: clearly states consequences + uses red for destructive action.
 */
const DeleteModal = ({ count, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 anim-fade">
        <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={28} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-text text-center mb-2">
                Delete {count > 1 ? `${count} Entries` : 'Entry'}?
            </h3>
            <p className="text-sm text-text-sub text-center leading-relaxed mb-6">
                This will <strong>permanently remove</strong> {count > 1 ? 'these entries' : 'this entry'} from your journal. This action cannot be undone.
            </p>
            <div className="flex gap-3">
                <button
                    onClick={onCancel}
                    className="flex-1 py-3.5 bg-gray-100 text-text-sub rounded-2xl font-bold text-sm active:scale-[0.98] transition-all"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="flex-1 py-3.5 bg-red-500 text-white rounded-2xl font-bold text-sm active:scale-[0.98] transition-all shadow-lg shadow-red-200"
                >
                    Delete Permanently
                </button>
            </div>
        </div>
    </div>
)

/**
 * Share-to-AI Consent Modal
 * DPDP 2023 Compliance: Requires explicit, informed consent before sharing
 * journal data with AI. Purpose limitation + data minimization notice.
 */
const ShareToAIModal = ({ entryPreview, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 anim-fade">
        <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={28} className="text-[var(--color-primary)]" />
            </div>
            <h3 className="text-lg font-bold text-text text-center mb-2">
                Share with AI Buddy?
            </h3>
            <p className="text-sm text-text-sub text-center leading-relaxed mb-4">
                Your journal entry will be shared with the AI Wellness Buddy to provide personalized advice.
            </p>

            {/* Entry Preview */}
            <div className="bg-gray-50 rounded-xl p-3 mb-4 max-h-20 overflow-hidden">
                <p className="text-xs text-text-sub italic line-clamp-3">"{entryPreview}"</p>
            </div>

            {/* DPDP Consent Notice */}
            <div className="bg-indigo-50 rounded-xl p-3 mb-5 flex gap-2">
                <Shield size={14} className="text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-[0.65rem] text-text-sub leading-relaxed">
                        <strong>Privacy Notice (DPDP Act 2023):</strong> Your data will only be used for this conversation. It is not stored, shared, or used for AI training. You can withdraw consent anytime in Settings.
                    </p>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onCancel}
                    className="flex-1 py-3.5 bg-gray-100 text-text-sub rounded-2xl font-bold text-sm active:scale-[0.98] transition-all"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="flex-1 py-3.5 bg-[var(--color-primary)] text-white rounded-2xl font-bold text-sm active:scale-[0.98] transition-all shadow-lg shadow-indigo-200"
                >
                    Share & Ask AI
                </button>
            </div>
        </div>
    </div>
)

/**
 * Journal — Complete Journaling Experience
 * 
 * 3 Views: Write, History, Detail/Edit
 * Features: Delete confirmation, Share-to-AI with DPDP consent, localStorage persistence
 */
export default function Journal() {
    const nav = useNavigate()
    const textRef = useRef(null)

    // Core state
    const [entries, setEntries] = useState(() => {
        const saved = localStorage.getItem('sutrr_journal')
        return saved ? JSON.parse(saved) : INITIAL_ENTRIES
    })
    const [view, setView] = useState('write')
    const [entry, setEntry] = useState('')
    const [mood, setMood] = useState(null)
    const [promptIdx, setPromptIdx] = useState(Math.floor(Math.random() * REFLECTIONS.length))

    // Detail/Edit state
    const [activeEntry, setActiveEntry] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState('')

    // Multi-select state
    const [selectMode, setSelectMode] = useState(false)
    const [selected, setSelected] = useState(new Set())

    // Modal state
    const [deleteModal, setDeleteModal] = useState(null) // { ids: [...], count: N }
    const [shareModal, setShareModal] = useState(null) // { text: '...' }

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('sutrr_journal', JSON.stringify(entries))
    }, [entries])

    // --- Handlers ---
    const handleSave = () => {
        if (!entry.trim()) return
        const newEntry = {
            id: Date.now(),
            date: new Date().toISOString(),
            mood: mood || 'Neutral',
            text: entry.trim()
        }
        setEntries(prev => [newEntry, ...prev])
        setEntry('')
        setMood(null)
        setView('history')
        triggerHaptic('success')
    }

    const openDetail = (e) => {
        if (selectMode) { toggleSelect(e.id); return }
        setActiveEntry(e)
        setEditText(e.text)
        setIsEditing(false)
        setView('detail')
    }

    const saveEdit = () => {
        if (!editText.trim()) return
        setEntries(prev => prev.map(e =>
            e.id === activeEntry.id ? { ...e, text: editText.trim() } : e
        ))
        setActiveEntry(prev => ({ ...prev, text: editText.trim() }))
        setIsEditing(false)
        triggerHaptic('success')
    }

    // Delete with confirmation modal
    const requestDelete = (ids) => {
        setDeleteModal({ ids: Array.isArray(ids) ? ids : [ids], count: Array.isArray(ids) ? ids.length : 1 })
    }

    const confirmDelete = () => {
        if (!deleteModal) return
        const idSet = new Set(deleteModal.ids)
        setEntries(prev => prev.filter(e => !idSet.has(e.id)))
        setDeleteModal(null)
        if (view === 'detail') setView('history')
        // Clear selection if in multi-select
        setSelected(new Set())
        setSelectMode(false)
        triggerHaptic('heavy')
    }

    // Share to AI with DPDP consent
    const requestShareToAI = (text) => {
        setShareModal({ text })
    }

    const confirmShareToAI = () => {
        if (!shareModal) return
        // Navigate to chatbot with the journal text as a pre-filled message
        nav('/chatbot', { state: { prefill: `Based on my journal: "${shareModal.text.substring(0, 200)}..." — can you give me advice?` } })
        setShareModal(null)
        triggerHaptic('medium')
    }

    const toggleSelect = (id) => {
        setSelected(prev => {
            const next = new Set(prev)
            next.has(id) ? next.delete(id) : next.add(id)
            return next
        })
    }

    const selectAll = () => {
        selected.size === entries.length ? setSelected(new Set()) : setSelected(new Set(entries.map(e => e.id)))
    }

    const formatDate = (iso) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    const formatTime = (iso) => new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

    // --- WRITE VIEW ---
    const WriteView = () => (
        <>
            <div className="flex-1 p-5 space-y-5 overflow-y-auto pb-28">
                {/* Mood Selector */}
                <div className="bg-white p-4 rounded-2xl border border-border/40 shadow-sm">
                    <label className="text-xs font-bold text-text-dim uppercase tracking-wider block mb-3">How are you feeling?</label>
                    <div className="flex gap-2">
                        {['Happy', 'Neutral', 'Sad'].map((m) => (
                            <button key={m} onClick={() => setMood(m)}
                                className={`flex-1 py-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all active:scale-95 ${mood === m ? moodColor[m] : 'border-gray-100 hover:border-gray-200 text-text-sub bg-gray-50'}`}>
                                <span className="text-2xl">{moodEmoji[m]}</span>
                                <span className="text-[0.65rem] font-bold uppercase">{m}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Today's Reflection */}
                <div className="bg-white p-5 rounded-2xl border border-border/40 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-text-dim uppercase tracking-wider flex items-center gap-1.5">
                            💭 Today's Reflection
                        </span>
                        <button onClick={() => setPromptIdx((promptIdx + 1) % REFLECTIONS.length)}
                            className="text-xs text-[var(--color-primary)] font-bold flex items-center gap-1 active:scale-95 transition-transform">
                            <Sparkles size={12} /> New idea
                        </button>
                    </div>
                    <p className="text-base font-serif italic text-text/80 leading-relaxed">
                        "{REFLECTIONS[promptIdx]}"
                    </p>
                </div>

                {/* Styled Text Editor */}
                <div className="bg-white rounded-2xl border border-border/40 shadow-sm overflow-hidden">
                    <textarea ref={textRef} value={entry} onChange={(e) => setEntry(e.target.value)}
                        placeholder="Start writing your thoughts..." rows={8}
                        className="w-full bg-transparent border-none resize-none text-base leading-relaxed focus:ring-0 p-5 placeholder:text-gray-300" />
                    <div className="px-5 pb-3 flex justify-between items-center border-t border-gray-50">
                        <span className="text-[0.6rem] text-text-dim">{entry.length} characters</span>
                        <span className="text-[0.6rem] text-text-dim">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
                    </div>
                </div>
            </div>

            {/* Sticky Save Button */}
            <div className="p-4 bg-white border-t border-border/40 sticky bottom-0 z-10">
                <button onClick={handleSave} disabled={!entry.trim()}
                    className="w-full py-4 bg-[var(--color-primary)] text-white rounded-2xl font-bold text-base shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all disabled:opacity-40 disabled:shadow-none">
                    Save Entry
                </button>
            </div>
        </>
    )

    // --- HISTORY VIEW ---
    const HistoryView = () => (
        <>
            <div className="flex-1 p-5 space-y-3 overflow-y-auto pb-28">
                {/* Multi-select toolbar */}
                {selectMode && (
                    <div className="bg-red-50 p-3 rounded-2xl flex items-center justify-between anim-fade">
                        <div className="flex items-center gap-2">
                            <button onClick={selectAll} className="text-xs font-bold text-red-600 underline">
                                {selected.size === entries.length ? 'Deselect All' : 'Select All'}
                            </button>
                            <span className="text-xs text-red-400">{selected.size} selected</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => { setSelectMode(false); setSelected(new Set()) }}
                                className="text-xs font-bold text-gray-500 px-3 py-1.5 rounded-lg bg-white border border-gray-200">
                                Cancel
                            </button>
                            <button onClick={() => requestDelete([...selected])} disabled={selected.size === 0}
                                className="text-xs font-bold text-white px-3 py-1.5 rounded-lg bg-red-500 disabled:opacity-40 active:scale-95 transition-transform">
                                Delete
                            </button>
                        </div>
                    </div>
                )}

                {entries.map(e => (
                    <button key={e.id} onClick={() => openDetail(e)}
                        onContextMenu={(ev) => { ev.preventDefault(); setSelectMode(true); toggleSelect(e.id) }}
                        className={`w-full text-left bg-white p-4 rounded-2xl border shadow-sm flex items-start gap-3 active:scale-[0.98] transition-all ${selected.has(e.id) ? 'border-red-300 bg-red-50/50' : 'border-border/40'}`}>

                        {selectMode && (
                            <div className="pt-0.5 flex-shrink-0">
                                {selected.has(e.id) ? <CheckSquare size={20} className="text-red-500" /> : <Square size={20} className="text-gray-300" />}
                            </div>
                        )}

                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg ${moodColor[e.mood]?.split(' ')[0] || 'bg-gray-100'}`}>
                            {moodEmoji[e.mood] || '😐'}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-bold text-text">{formatDate(e.date)}</span>
                                <span className="text-[0.6rem] text-text-dim">{formatTime(e.date)}</span>
                            </div>
                            <p className="text-sm text-text-sub leading-relaxed line-clamp-2">{e.text}</p>
                        </div>

                        {!selectMode && (
                            <button onClick={(ev) => { ev.stopPropagation(); requestDelete(e.id) }}
                                className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors">
                                <Trash2 size={14} />
                            </button>
                        )}
                    </button>
                ))}

                {entries.length === 0 && (
                    <div className="text-center py-16 text-text-dim">
                        <BookOpen size={40} className="mx-auto mb-4 opacity-15" />
                        <p className="text-base font-semibold mb-1">No entries yet</p>
                        <p className="text-sm text-text-dim/60">Tap "Write" to start your first reflection</p>
                    </div>
                )}
            </div>

            {!selectMode && entries.length > 0 && (
                <div className="p-4 bg-white border-t border-border/40 sticky bottom-0 z-10">
                    <div className="flex gap-2">
                        <button onClick={() => setView('write')}
                            className="flex-1 py-3.5 bg-[var(--color-primary)] text-white rounded-2xl font-bold text-sm active:scale-[0.98] transition-all shadow-lg shadow-indigo-200">
                            + New Entry
                        </button>
                        <button onClick={() => setSelectMode(true)}
                            className="py-3.5 px-5 bg-gray-100 text-text-sub rounded-2xl font-bold text-sm active:scale-[0.98] transition-all">
                            Select
                        </button>
                    </div>
                </div>
            )}
        </>
    )

    // --- DETAIL/EDIT VIEW ---
    const DetailView = () => {
        if (!activeEntry) return null
        return (
            <>
                <div className="flex-1 p-5 space-y-4 overflow-y-auto pb-28">
                    {/* Meta */}
                    <div className="flex items-center gap-3">
                        <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${moodColor[activeEntry.mood]}`}>
                            {moodEmoji[activeEntry.mood]} {activeEntry.mood}
                        </div>
                        <span className="text-sm text-text-dim">{formatDate(activeEntry.date)} · {formatTime(activeEntry.date)}</span>
                    </div>

                    {/* Entry Content */}
                    <div className="bg-white rounded-2xl border border-border/40 shadow-sm overflow-hidden">
                        {isEditing ? (
                            <textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={12}
                                className="w-full bg-transparent border-none resize-none text-base leading-relaxed focus:ring-2 focus:ring-indigo-100 p-5 placeholder:text-gray-300" autoFocus />
                        ) : (
                            <div className="p-5">
                                <p className="text-base text-text leading-relaxed whitespace-pre-wrap">{activeEntry.text}</p>
                            </div>
                        )}
                    </div>

                    {/* DPDP Data Notice — only in view mode */}
                    {!isEditing && (
                        <div className="bg-gray-50 rounded-xl p-3 flex gap-2">
                            <Shield size={12} className="text-text-dim flex-shrink-0 mt-0.5" />
                            <p className="text-[0.6rem] text-text-dim leading-relaxed">
                                Your journal data is stored locally on this device only. Per DPDP Act 2023, you can delete your data anytime.
                            </p>
                        </div>
                    )}
                </div>

                {/* Action Bar */}
                <div className="p-4 bg-white border-t border-border/40 sticky bottom-0 z-10">
                    {isEditing ? (
                        <div className="flex gap-2">
                            <button onClick={() => { setIsEditing(false); setEditText(activeEntry.text) }}
                                className="flex-1 py-3.5 bg-gray-100 text-text-sub rounded-2xl font-bold text-sm active:scale-[0.98] transition-all">
                                Cancel
                            </button>
                            <button onClick={saveEdit} disabled={!editText.trim()}
                                className="flex-1 py-3.5 bg-[var(--color-primary)] text-white rounded-2xl font-bold text-sm active:scale-[0.98] transition-all shadow-lg shadow-indigo-200 disabled:opacity-40">
                                Save Changes
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <button onClick={() => requestShareToAI(activeEntry.text)}
                                className="flex-1 py-3.5 bg-indigo-50 text-[var(--color-primary)] rounded-2xl font-bold text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-indigo-100">
                                <MessageCircle size={16} /> Ask AI About This
                            </button>
                            <button onClick={() => setIsEditing(true)}
                                className="py-3.5 px-5 bg-[var(--color-primary)] text-white rounded-2xl font-bold text-sm active:scale-[0.98] transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-1">
                                <Edit3 size={16} />
                            </button>
                            <button onClick={() => requestDelete(activeEntry.id)}
                                className="py-3.5 px-5 bg-red-50 text-red-500 rounded-2xl font-bold text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-1">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </>
        )
    }

    return (
        <div className="min-h-dvh bg-[var(--color-bg-sub)] flex flex-col">
            {/* Modals */}
            {deleteModal && <DeleteModal count={deleteModal.count} onConfirm={confirmDelete} onCancel={() => setDeleteModal(null)} />}
            {shareModal && <ShareToAIModal entryPreview={shareModal.text} onConfirm={confirmShareToAI} onCancel={() => setShareModal(null)} />}

            {/* Header */}
            <div className="bg-white px-4 pt-14 pb-3 flex items-center justify-between border-b border-border/40 sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <button onClick={() => { if (view === 'detail') { setView('history'); setActiveEntry(null) } else nav('/dashboard') }}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                        {view === 'detail' ? <ChevronLeft size={22} className="text-text" /> : <ArrowLeft size={20} className="text-text" />}
                    </button>
                    <div>
                        <h1 className="font-bold text-lg text-text flex items-center gap-2">
                            {view === 'detail' ? 'Entry' : 'Journal'} <BookOpen size={16} className="text-[var(--color-primary)]" />
                        </h1>
                        <p className="text-xs text-text-sub flex items-center gap-1">
                            <Calendar size={10} />
                            {view === 'detail' && activeEntry ? formatDate(activeEntry.date) : new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </p>
                    </div>
                </div>

                {view !== 'detail' && (
                    <div className="flex bg-gray-100 rounded-xl p-1">
                        <button onClick={() => { setView('write'); setSelectMode(false); setSelected(new Set()) }}
                            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${view === 'write' ? 'bg-white shadow-sm text-text' : 'text-text-dim'}`}>
                            ✏️ Write
                        </button>
                        <button onClick={() => setView('history')}
                            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${view === 'history' ? 'bg-white shadow-sm text-text' : 'text-text-dim'}`}>
                            📋 History
                        </button>
                    </div>
                )}
            </div>

            {/* Views */}
            {view === 'write' && <WriteView />}
            {view === 'history' && <HistoryView />}
            {view === 'detail' && <DetailView />}
        </div>
    )
}
