import type { RaceSettings } from '../types'

export const SPRINT_DURATION_SECONDS = 60
export const SPRINT_QUESTION_LIMIT = 20

export function getRaceQuestionLimit(settings: RaceSettings, reviewQuestionCount: number = 0): number {
    if (reviewQuestionCount > 0) return reviewQuestionCount
    return settings.format === 'sprint' ? SPRINT_QUESTION_LIMIT : settings.questionCount
}

export function sprintTimeExpired(settings: RaceSettings, elapsedTime: number): boolean {
    return settings.format === 'sprint' && elapsedTime >= SPRINT_DURATION_SECONDS
}

export function perfectRaceFailed(settings: RaceSettings, lastAnswerCorrect: boolean | null): boolean {
    return settings.format === 'perfect' && lastAnswerCorrect === false
}
