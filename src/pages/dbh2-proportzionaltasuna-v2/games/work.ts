import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   J3 · Amaitu obra (Termina la obra): a job that w₀ workers finish in d₀
   days working h₀ hours a day needs w₀·h₀·d₀ hours of work. The learner
   chooses the workers (and, in level 3, the hours a day) so that the job
   ends exactly on the new deadline: no late days and no idle hours. Level
   1: the same hours a day; level 2: other hours a day, given; level 3:
   both workers and hours, any pair that fits.
   ========================================================================== */

export const WORK_ROUNDS = 6
export const WORK_LIMITS = { workers: { min: 1, max: 24 }, hours: { min: 1, max: 10 } } as const

export interface WorkRound {
    workers: number
    hours: number
    days: number
    /** The new deadline, in days */
    deadline: number
    /** The hours a day set by the round, or null when the learner chooses them */
    fixedHours: number | null
    /** One right answer */
    solution: { workers: number; hours: number }
}

export const totalWork = (round: Pick<WorkRound, 'workers' | 'hours' | 'days'>) => round.workers * round.hours * round.days
/** Days the chosen crew needs: the hours of work over the hours a day of the whole crew */
export const daysNeeded = (round: WorkRound, workers: number, hours: number) => totalWork(round) / (workers * hours)
export const finishesOnTime = (round: WorkRound, workers: number, hours: number) => workers * hours * round.deadline === totalWork(round)

export function createWorkRound(random: Random, levelIndex: number): WorkRound {
    for (;;) {
        const workers = randomInt(random, 2, 8)
        const hours = pick(random, [4, 5, 6, 8])
        const days = randomInt(random, 3, 12)
        const total = workers * hours * days
        const deadline = randomInt(random, 2, 15)
        if (deadline === days) continue
        if (levelIndex === 2) {
            const pairs = Array.from({ length: WORK_LIMITS.hours.max }, (_, index) => index + 1).filter((h) => h >= 4 && total % (h * deadline) === 0 && total / (h * deadline) <= WORK_LIMITS.workers.max)
            if (pairs.length < 2) continue
            const h = pick(random, pairs)
            return { workers, hours, days, deadline, fixedHours: null, solution: { workers: total / (h * deadline), hours: h } }
        }
        const newHours = levelIndex === 0 ? hours : pick(random, [4, 5, 6, 7, 8, 9, 10].filter((h) => h !== hours))
        if (total % (newHours * deadline) !== 0) continue
        const newWorkers = total / (newHours * deadline)
        if (newWorkers < WORK_LIMITS.workers.min || newWorkers > WORK_LIMITS.workers.max || newWorkers === workers) continue
        return { workers, hours, days, deadline, fixedHours: newHours, solution: { workers: newWorkers, hours: newHours } }
    }
}

export const createWorkRounds = (random: Random, levelIndex: number) => Array.from({ length: WORK_ROUNDS }, () => createWorkRound(random, levelIndex))

export function workStars(score: number): Stars {
    if (score >= 6) return 3
    if (score >= 5) return 2
    if (score >= 3) return 1
    return 0
}
