import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Pair } from '../../batx1-zientziak-bidimentsionala/bivariate.ts'
import { cloudWithR, noiseFrom } from '../data.ts'

/* ==========================================================================
   J1 · Zein r dagokio? (¿Qué r le toca?): a cloud of ten points built with
   an exact r, and three coefficients; the learner taps the one that fits.
   Level 1: strong or weak and the sign (±0,95 against ±0,15); level 2: the
   same sign, three strengths (0,9, 0,6, 0,3); level 3: closer and with the
   sign as a trap (±0,8 and ±0,5). Each cloud has its own random noise, so
   the shapes change from round to round. Pure logic.
   ========================================================================== */

export const WHICH_R_ROUNDS = 6

export interface WhichRRound {
    r: number
    points: Pair[]
    options: number[]
}

function randomNoise(random: Random): number[] {
    for (;;) {
        const raw = Array.from({ length: 10 }, () => Math.round((random() * 4 - 2) * 10) / 10)
        const noise = noiseFrom(raw)
        const spread = noise.reduce((sum, value) => sum + value * value, 0) / noise.length
        if (spread > 0.6) return noise
    }
}

function makeRound(random: Random, level: number): WhichRRound {
    const sign = pick(random, [1, -1])
    let r: number
    let options: number[]
    if (level === 0) {
        const strong = pick(random, [true, false])
        r = sign * (strong ? 0.95 : 0.15)
        options = [r, -r, sign * (strong ? 0.15 : 0.95)]
    } else if (level === 1) {
        r = sign * pick(random, [0.9, 0.6, 0.3])
        options = [0.9, 0.6, 0.3].map((value) => sign * value)
    } else {
        const strong = pick(random, [0.8, 0.5])
        r = sign * strong
        options = [r, -r, sign * (strong === 0.8 ? 0.5 : 0.8)]
    }
    return { r, points: cloudWithR(r, randomNoise(random)), options: shuffle(random, options) }
}

export function createWhichRRounds(random: Random, level: number): WhichRRound[] {
    return Array.from({ length: WHICH_R_ROUNDS }, () => makeRound(random, level))
}
