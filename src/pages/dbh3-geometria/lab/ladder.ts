import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L3 · Eskailera (La escalera): a ladder of length L leans on a wall with
   its foot d metres away; its top is at h = √(L² − d²). The learner moves
   the foot, and first guesses: if the foot moves one metre further out,
   does the top come down less than, exactly or more than one metre? Near
   the wall it drops little; far from it, a lot. ▶ lets the ladder slide.
   ========================================================================== */

export const LADDER_LENGTHS = [5, 10, 13, 15, 17, 20, 25]

export interface LadderState {
    length: number
    foot: number
    prediction: Prediction | null
}

export const initialLadderState: LadderState = { length: 13, foot: 2, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setLadder(state: LadderState, patch: Partial<Pick<LadderState, 'length' | 'foot'>>): LadderState {
    const length = LADDER_LENGTHS.includes(patch.length ?? state.length) ? patch.length ?? state.length : state.length
    const foot = clamp(patch.foot ?? state.foot, 1, length - 1)
    return { length, foot, prediction: length === state.length && foot === state.foot ? state.prediction : null }
}

export const ladderTop = (length: number, foot: number) => Math.sqrt(length * length - foot * foot)
/** How much the top comes down when the foot moves one metre out */
export const ladderDrop = ({ length, foot }: Pick<LadderState, 'length' | 'foot'>) => ladderTop(length, foot) - ladderTop(length, Math.min(length, foot + 1))
export const ladderPrediction = (state: LadderState): Prediction => compareTo(ladderDrop(state), 1)

export const setLadderPrediction = (state: LadderState, prediction: Prediction): LadderState => (state.prediction === null ? { ...state, prediction } : state)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const topAt = (length: number, top: number) => (state: LadderState) => state.length === length && Math.abs(ladderTop(state.length, state.foot) - top) < 1e-9
const reach = (length: number, top: number) => say(`${length} m-ko eskailerarekin, iritsi ${top} m-ko altuerara.`, `Con la escalera de ${length} m, llega a ${top} m de altura.`, `بالسلّم الذي طوله ${length} م بلغ ارتفاع ${top} م.`, `With the ${length} m ladder, reach a height of ${top} m.`)
const foot = (length: number, top: number) => say(`$d=\\sqrt{${length}^{2}-${top}^{2}}$`, `$d=\\sqrt{${length}^{2}-${top}^{2}}$`, `$d=\\sqrt{${length}^{2}-${top}^{2}}$`, `$d=\\sqrt{${length}^{2}-${top}^{2}}$`)

export const ladderChallenges: LabChallenge<LadderState>[] = [
    { id: 95301, prompt: reach(13, 12), hint: foot(13, 12), isSolved: topAt(13, 12) },
    { id: 95302, prompt: reach(10, 8), hint: foot(10, 8), isSolved: topAt(10, 8) },
    { id: 95303, prompt: reach(17, 15), hint: foot(17, 15), isSolved: topAt(17, 15) },
    { id: 95304, prompt: reach(25, 24), hint: foot(25, 24), isSolved: topAt(25, 24) },
    { id: 95305, prompt: reach(5, 3), hint: foot(5, 3), isSolved: topAt(5, 3) }
]

/** The whole-number positions of each ladder: [foot, top] */
export const LADDER_TRIPLES: Record<number, Array<[number, number]>> = {
    5: [[3, 4], [4, 3]], 10: [[6, 8], [8, 6]], 13: [[5, 12], [12, 5]], 15: [[9, 12], [12, 9]], 17: [[8, 15], [15, 8]], 20: [[12, 16], [16, 12]], 25: [[7, 24], [24, 7], [15, 20], [20, 15]]
}

/** Endless practice: a whole-number height to reach with one of the ladders */
const ladderMaker: LabChallengeMaker<LadderState> = (random) => {
    const length = pick(random, LADDER_LENGTHS)
    const [d, top] = LADDER_TRIPLES[length][randomInt(random, 0, LADDER_TRIPLES[length].length - 1)]
    return { prompt: reach(length, top), hint: foot(length, top), isSolved: topAt(length, top), solution: { length, foot: d, prediction: null } }
}

export const ladderExtra = freshFrom(initialLadderState, ladderMaker)
