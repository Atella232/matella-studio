import type { RaceFormat, RaceRecord, RecordAchievements } from '../types'

export const RACE_RECORDS_STORAGE_KEY = 'matella:fraction-race:records:v2'

export type RaceRecords = Record<string, RaceRecord>

export interface RaceProgressResult {
    score: number
    elapsedTime: number
    correctAnswers: number
    attempts: number
    rank: number
    completed: boolean
}

export function getRaceRecordKey(levelId: string, format: RaceFormat): string {
    return `${levelId}:${format}`
}

export function emptyRaceRecord(): RaceRecord {
    return {
        racesPlayed: 0,
        wins: 0,
        perfectRaces: 0,
        bestScore: 0,
        bestTime: null,
        bestAccuracy: 0
    }
}

export function updateRaceRecord(
    previous: RaceRecord | undefined,
    result: RaceProgressResult
): { record: RaceRecord, achievements: RecordAchievements } {
    const current = previous ?? emptyRaceRecord()
    const accuracy = result.attempts > 0 ? result.correctAnswers / result.attempts : 0
    const perfectRace = result.completed && result.attempts > 0 && result.correctAnswers === result.attempts
    const isFirstRace = current.racesPlayed === 0
    const newBestScore = result.score > current.bestScore
    const newBestTime = result.completed
        && result.elapsedTime > 0
        && (current.bestTime === null || result.elapsedTime < current.bestTime)
    const newBestAccuracy = accuracy > current.bestAccuracy
    const firstWin = result.rank === 1 && current.wins === 0

    return {
        record: {
            racesPlayed: current.racesPlayed + 1,
            wins: current.wins + (result.rank === 1 ? 1 : 0),
            perfectRaces: current.perfectRaces + (perfectRace ? 1 : 0),
            bestScore: Math.max(current.bestScore, result.score),
            bestTime: newBestTime ? result.elapsedTime : current.bestTime,
            bestAccuracy: Math.max(current.bestAccuracy, accuracy)
        },
        achievements: {
            firstRace: isFirstRace,
            firstWin,
            newBestScore,
            newBestTime,
            newBestAccuracy,
            perfectRace
        }
    }
}

export function loadRaceRecords(): RaceRecords {
    if (typeof window === 'undefined') return {}

    try {
        const stored = window.localStorage.getItem(RACE_RECORDS_STORAGE_KEY)
        return stored ? JSON.parse(stored) as RaceRecords : {}
    } catch {
        return {}
    }
}

export function saveRaceRecords(records: RaceRecords): void {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(RACE_RECORDS_STORAGE_KEY, JSON.stringify(records))
}
