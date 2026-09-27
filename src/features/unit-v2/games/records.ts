import type { LocalizedText } from '../types.ts'

/* ==========================================================================
   Game records shared by every unit: levels, stars and best results, kept
   in the browser under a key chosen by each unit.
   ========================================================================== */

export type Stars = 0 | 1 | 2 | 3

export interface GameLevelInfo {
    /** Unit progress id, earned with the first star */
    progressId: number
    stage: string
    title: LocalizedText
    description: LocalizedText
}

export interface GameInfo<Id extends string = string> {
    id: Id
    title: LocalizedText
    tagline: LocalizedText
    skills: LocalizedText
    levels: GameLevelInfo[]
}

/** Best result of one level. `score` is "higher is better"; `timeMs` "lower is better" */
export interface LevelRecord {
    stars: Stars
    score: number
    timeMs: number | null
}

export type GameRecords = Record<string, LevelRecord>

export function recordKey(game: string, level: number): string {
    return `${game}-${level}`
}

/**
 * Keeps the best of both results: more stars first, then the better score or time.
 * Stars and bests are tracked independently so a faster but sloppier run still
 * updates the best time without lowering the stars.
 */
export function mergeRecord(previous: LevelRecord | undefined, next: LevelRecord): LevelRecord {
    if (!previous) return next
    const bestTime = previous.timeMs === null ? next.timeMs : next.timeMs === null ? previous.timeMs : Math.min(previous.timeMs, next.timeMs)
    return {
        stars: Math.max(previous.stars, next.stars) as Stars,
        score: Math.max(previous.score, next.score),
        timeMs: bestTime
    }
}

export function parseRecords(stored: string | null): GameRecords {
    if (!stored) return {}
    try {
        const parsed: unknown = JSON.parse(stored)
        if (!parsed || typeof parsed !== 'object') return {}
        const records: GameRecords = {}
        for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
            if (!value || typeof value !== 'object') continue
            const { stars, score, timeMs } = value as Record<string, unknown>
            if (typeof stars !== 'number' || stars < 0 || stars > 3 || !Number.isInteger(stars)) continue
            if (typeof score !== 'number' || !Number.isFinite(score)) continue
            if (timeMs !== null && (typeof timeMs !== 'number' || !Number.isFinite(timeMs))) continue
            records[key] = { stars: stars as Stars, score, timeMs: timeMs as number | null }
        }
        return records
    } catch {
        return {}
    }
}

export function gameStars(records: GameRecords, game: GameInfo): number {
    return game.levels.reduce((total, _level, index) => total + (records[recordKey(game.id, index)]?.stars ?? 0), 0)
}

export function levelProgressIds(games: GameInfo[]): number[] {
    return games.flatMap((game) => game.levels.map((level) => level.progressId))
}
