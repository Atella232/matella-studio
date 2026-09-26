import { useCallback, useRef, useState } from 'react'
import type { RaceRecord, RecordAchievements } from '../types'
import {
    getRaceRecordKey,
    loadRaceRecords,
    saveRaceRecords,
    updateRaceRecord,
    type RaceProgressResult,
    type RaceRecords
} from '../utils/progress'
import type { RaceFormat } from '../types'

export function useRaceProgress() {
    const [records, setRecords] = useState<RaceRecords>(loadRaceRecords)
    const recordsRef = useRef(records)
    const [latestAchievements, setLatestAchievements] = useState<RecordAchievements | null>(null)

    const getRecord = useCallback((levelId: string, format: RaceFormat): RaceRecord | undefined => (
        records[getRaceRecordKey(levelId, format)]
    ), [records])

    const registerRace = useCallback((
        levelId: string,
        format: RaceFormat,
        result: RaceProgressResult
    ) => {
        const key = getRaceRecordKey(levelId, format)
        const previous = recordsRef.current
        const updated = updateRaceRecord(previous[key], result)
        const next = { ...previous, [key]: updated.record }
        recordsRef.current = next
        setRecords(next)
        setLatestAchievements(updated.achievements)
        saveRaceRecords(next)
    }, [])

    const clearLatestAchievements = useCallback(() => setLatestAchievements(null), [])

    return {
        records,
        getRecord,
        registerRace,
        latestAchievements,
        clearLatestAchievements
    }
}
