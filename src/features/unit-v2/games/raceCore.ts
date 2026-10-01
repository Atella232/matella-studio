import type { AnswerCheck, AnswerForm, FractionValue } from '../math/fraction.ts'
import type { ReactNode } from 'react'
import type { LocalizedText, UnitLanguage } from '../types.ts'
import type { Random } from './random.ts'
import type { GameInfo, Stars } from './records.ts'

/* ==========================================================================
   Race shared by every unit: ten right answers finish a lap against three
   rivals running at a steady pace. Each unit brings its own questions,
   whose wrong options come from typical mistakes.
   ========================================================================== */

export const RACE_QUESTIONS = 10
/** The pit stop comes after this many correct answers (half a lap) */
export const PIT_AFTER = 5
export const WRONG_PENALTY_MS = 4000
export const TURBO_STREAK = 3
export const TURBO_BONUS_MS = 1000
export const PIT_BONUS_MS = 5000
export const PIT_PENALTY_MS = 5000

export type Tier = 0 | 1 | 2

export interface RaceOption<Error extends string = string> {
    /** How the option is written (it matters for "simplify fully" questions) */
    latex: string
    correct: boolean
    error: Error | null
}

export interface RaceQuestion<Error extends string = string> {
    circuit: number
    kind: string
    prompt: LocalizedText
    options: RaceOption<Error>[]
    answer: FractionValue
    /** Written answers accepted at the pit stop */
    answerForm: AnswerForm
    /** Percent questions are answered with the number before the % sign */
    percentAnswer: boolean
    /** Only these kinds can be asked with a written answer */
    writable: boolean
    solution: LocalizedText
}

/** What a unit gives the race: its circuits, questions and advice */
export interface RaceRules<Error extends string = string> {
    game: GameInfo
    generate: (random: Random, circuit: number, tier: Tier, requireWritable?: boolean) => RaceQuestion<Error>
    checkPit: (question: RaceQuestion<Error>, input: string) => AnswerCheck
    /** Expected time of an average student (the middle rival), in ms */
    parTime: (circuit: number) => number
    errorTip: (error: Error | null) => LocalizedText
    pitPlaceholder: (question: RaceQuestion<Error>) => string
    pitUnreadable: LocalizedText
    pitWrongForm: LocalizedText
    /** Optional drawing for a question (a graph to read), shown under its prompt */
    figure?: (question: RaceQuestion<Error>, language: UnitLanguage) => ReactNode
}

/** Three right answers in a row raise the level; two wrong answers in a row lower it */
export function nextTier(tier: Tier, streak: number, wrongStreak: number): Tier {
    if (streak > 0 && streak % 3 === 0) return Math.min(2, tier + 1) as Tier
    if (wrongStreak >= 2) return Math.max(0, tier - 1) as Tier
    return tier
}

/** Par time for a circuit where an average question takes this many seconds */
export function parTimeFor(secondsPerQuestion: number): number {
    return (RACE_QUESTIONS * secondsPerQuestion + 20) * 1000
}

export interface Rival {
    id: string
    name: string
    /** Finish time as a multiple of the circuit's par time */
    factor: number
}

export const rivals: Rival[] = [
    { id: 'slow', name: 'Irati', factor: 1.3 },
    { id: 'par', name: 'Unai', factor: 1 },
    { id: 'fast', name: 'Nora', factor: 0.8 }
]

export function rivalTimeFor(par: number, rival: Rival): number {
    return Math.round(par * rival.factor)
}

/** Share of the lap a car running at constant speed has covered */
export function lapShare(elapsedMs: number, finishMs: number): number {
    if (finishMs <= 0) return 1
    return Math.min(1, Math.max(0, elapsedMs / finishMs))
}

export function starsFor(par: number, timeMs: number, mistakes: number): Stars {
    if (timeMs <= par * 0.8 && mistakes <= 1) return 3
    if (timeMs <= par) return 2
    return 1
}

/** 1 = winner. Ties go to the student. */
export function positionFor(par: number, timeMs: number): number {
    return 1 + rivals.filter((rival) => rivalTimeFor(par, rival) < timeMs).length
}
