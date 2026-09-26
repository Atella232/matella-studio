import { useCallback, useEffect, useState } from 'react'
import { useLabText } from '../lab/useLabText'
import { GAME_RECORDS_KEY, mergeRecord, parseRecords, recordKey, type GameId, type GameRecords, type LevelRecord } from './records'

export const useGameText = useLabText

/** Best results per level, kept in the browser */
export function useGameRecords() {
    const [records, setRecords] = useState<GameRecords>(() => {
        try {
            return parseRecords(localStorage.getItem(GAME_RECORDS_KEY))
        } catch {
            return {}
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(GAME_RECORDS_KEY, JSON.stringify(records))
        } catch {
            // Storage can be unavailable (private mode); records then last for the session only
        }
    }, [records])

    const save = useCallback((game: GameId, level: number, record: LevelRecord) => {
        setRecords((current) => {
            const key = recordKey(game, level)
            return { ...current, [key]: mergeRecord(current[key], record) }
        })
    }, [])

    return { records, save }
}

export function formatTime(ms: number): string {
    const safe = Math.max(0, ms)
    const minutes = Math.floor(safe / 60000)
    const seconds = Math.floor((safe % 60000) / 1000)
    const tenths = Math.floor((safe % 1000) / 100)
    return `${minutes}:${String(seconds).padStart(2, '0')}.${tenths}`
}

/** Wall-clock time, kept outside components so handlers stay pure to the linter */
export function nowMs(): number {
    return Date.now()
}
