import { useCallback, useEffect, useRef, useState } from 'react'

type RaceSound = 'start' | 'correct' | 'incorrect' | 'turbo' | 'finish'

interface AudioWindow extends Window {
    webkitAudioContext?: typeof AudioContext
}

const SOUND_STORAGE_KEY = 'matella:fraction-race:sound:v1'

export function useRaceAudio() {
    const [soundEnabled, setSoundEnabled] = useState(() => (
        typeof window !== 'undefined' && window.localStorage.getItem(SOUND_STORAGE_KEY) === 'true'
    ))
    const audioContextRef = useRef<AudioContext | null>(null)

    useEffect(() => {
        window.localStorage.setItem(SOUND_STORAGE_KEY, String(soundEnabled))
    }, [soundEnabled])

    const playSound = useCallback((sound: RaceSound) => {
        if (!soundEnabled || typeof window === 'undefined') return

        const AudioContextConstructor = window.AudioContext
            || (window as AudioWindow).webkitAudioContext
        if (!AudioContextConstructor) return

        const context = audioContextRef.current ?? new AudioContextConstructor()
        audioContextRef.current = context
        if (context.state === 'suspended') void context.resume()

        const patterns: Record<RaceSound, Array<[number, number, number]>> = {
            start: [[440, 0, 0.08], [560, 0.1, 0.08], [720, 0.2, 0.12]],
            correct: [[660, 0, 0.08], [880, 0.08, 0.12]],
            incorrect: [[240, 0, 0.16]],
            turbo: [[520, 0, 0.08], [720, 0.08, 0.08], [980, 0.16, 0.18]],
            finish: [[520, 0, 0.1], [660, 0.1, 0.1], [880, 0.2, 0.24]]
        }

        for (const [frequency, delay, duration] of patterns[sound]) {
            const oscillator = context.createOscillator()
            const gain = context.createGain()
            const startAt = context.currentTime + delay
            oscillator.type = sound === 'incorrect' ? 'triangle' : 'sine'
            oscillator.frequency.setValueAtTime(frequency, startAt)
            gain.gain.setValueAtTime(0.045, startAt)
            gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration)
            oscillator.connect(gain)
            gain.connect(context.destination)
            oscillator.start(startAt)
            oscillator.stop(startAt + duration)
        }
    }, [soundEnabled])

    const toggleSound = useCallback(() => setSoundEnabled(previous => !previous), [])

    return { soundEnabled, toggleSound, playSound }
}
