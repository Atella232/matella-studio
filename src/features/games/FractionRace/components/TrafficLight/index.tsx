import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './TrafficLight.css'

interface TrafficLightProps {
    onComplete: () => void
}

export function TrafficLight({ onComplete }: TrafficLightProps) {
    const { t } = useTranslation()
    const [activeLight, setActiveLight] = useState<'red' | 'yellow' | 'green' | null>('red')

    useEffect(() => {
        const timers: number[] = []

        timers.push(window.setTimeout(() => setActiveLight('yellow'), 1000))
        timers.push(window.setTimeout(() => setActiveLight('green'), 2000))
        timers.push(window.setTimeout(() => {
            onComplete()
        }, 2800))

        return () => timers.forEach(t => clearTimeout(t))
    }, [onComplete])

    return (
        <div
            className="traffic-light-overlay"
            role="status"
            aria-live="assertive"
            aria-label={t('games.fractionRace.countdown')}
        >
            <div className="traffic-light" aria-hidden="true">
                <div className={`light red ${activeLight === 'red' ? 'active' : ''}`} />
                <div className={`light yellow ${activeLight === 'yellow' ? 'active' : ''}`} />
                <div className={`light green ${activeLight === 'green' ? 'active' : ''}`} />
            </div>
            <div className="countdown-text" aria-live="assertive">
                {activeLight === 'red' && '3'}
                {activeLight === 'yellow' && '2'}
                {activeLight === 'green' && t('games.fractionRace.oneGo')}
            </div>
        </div>
    )
}
