/**
 * Native Haptic Feedback Utility
 * Uses the Vibration API to simulate iOS/Android native haptics.
 * Fails silently on unsupported devices (e.g., iOS Safari often restricts this, but Chrome/Android supports it well).
 */

export const HAPTIC = {
    light: 10,       // Very subtle tap (e.g., toggles, minor navigation)
    medium: 30,      // Firm tap (e.g., standard buttons, primary actions)
    heavy: 50,       // Strong tap (e.g., destructive actions, crucial saves)
    success: [20, 50, 20], // Double tap (e.g., task complete, successful save)
    warning: [40, 60, 40], // Buzz (e.g., error, delete warning)
}

/**
 * Triggers a haptic feedback vibration.
 * @param {'light'|'medium'|'heavy'|'success'|'warning'} type - The type of haptic feedback to trigger
 */
export const triggerHaptic = (type = 'medium') => {
    if (typeof window !== 'undefined' && navigator.vibrate) {
        try {
            navigator.vibrate(HAPTIC[type] || HAPTIC.medium)
        } catch (e) {
            // Ignore errors on unsupported platforms
        }
    }
}
