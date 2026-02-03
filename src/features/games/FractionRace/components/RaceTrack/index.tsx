import { useTranslation } from 'react-i18next'
import type { RacerState } from '../../types'
import './RaceTrack.css'

interface RaceTrackProps {
    racers: RacerState[]
    showTurbo: boolean
}

export function RaceTrack({ racers, showTurbo }: RaceTrackProps) {
    const { t } = useTranslation()

    // Sort racers by position for display order
    const sortedRacers = [...racers].sort((a, b) => b.position - a.position)
    const playerRank = sortedRacers.findIndex(r => r.isPlayer) + 1

    return (
        <div className="race-track">
            <div className="track-header">
                <span className="track-label">{t('games.fractionRace.track')}</span>
                <span className="position-indicator">
                    {t('games.fractionRace.position')}: {playerRank}º
                </span>
            </div>

            <div className="track-lanes">
                {racers.map((racer) => (
                    <div
                        key={racer.id}
                        className={`track-lane ${racer.isPlayer ? 'player-lane' : ''}`}
                        style={{ '--lane-color': racer.color } as React.CSSProperties}
                    >
                        <div className="lane-label">{t(`games.fractionRace.${racer.id}`)}</div>
                        <div className="lane-road">
                            <div className="lane-progress" style={{ width: `${racer.position}%` }} />
                            <div
                                className={`racer-car ${racer.hasTurbo ? 'turbo-active' : ''}`}
                                style={{ left: `${racer.position}%` }}
                            >
                                <span className="car-avatar">{racer.avatar}</span>
                                {racer.isPlayer && racer.hasTurbo && (
                                    <span className="turbo-flames">🔥</span>
                                )}
                            </div>
                        </div>
                        <div className="finish-line">🏁</div>
                    </div>
                ))}
            </div>

            {showTurbo && (
                <div className="turbo-notification">
                    ⚡ {t('games.fractionRace.turboActivated')} ⚡
                </div>
            )}
        </div>
    )
}
