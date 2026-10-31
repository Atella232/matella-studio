import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L4 · Adinen denbora-lerroa (La línea del tiempo de las edades): two
   people, an older one (A years) and a younger one (B years). Moving the
   time t, both bars grow by the same t, and the readout shows how many
   times the younger age fits into the older one. The question «when will
   A be k times B?» is A + t = k(B + t). The learner predicts whether it
   happens in the past, now or in the future; ▶ runs time forward and
   the ratio falls towards 1, because the years are added to both.
   ========================================================================== */

export interface AgesScenario {
    older: number
    younger: number
    times: number
}

export const AGES_SCENARIOS: AgesScenario[] = [
    { older: 40, younger: 12, times: 2 },
    { older: 38, younger: 8, times: 3 },
    { older: 36, younger: 6, times: 4 },
    { older: 50, younger: 30, times: 2 },
    { older: 33, younger: 11, times: 3 }
]

export const AGES_T = { min: -15, max: 30 } as const

export interface AgesState {
    /** The fixed scenario, or -1 for a new one */
    scenario: number
    people: AgesScenario
    t: number
    prediction: Prediction | null
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
export const startAges = (scenario: number): AgesState => ({ scenario, people: AGES_SCENARIOS[scenario], t: 1, prediction: null })
export const initialAgesState: AgesState = startAges(0)

/** Time can go back only while the younger one was already born */
export const setAges = (state: AgesState, t: number): AgesState => ({ ...state, t: clamp(t, Math.max(AGES_T.min, -state.people.younger + 1), AGES_T.max) })

/** A + t = k(B + t) → t = (A − kB) / (k − 1) */
export const agesAnswer = ({ older, younger, times }: AgesScenario) => (older - times * younger) / (times - 1)
export const agesRatio = (state: AgesState) => (state.people.older + state.t) / (state.people.younger + state.t)
/** In the past (<), now (=) or in the future (>)? */
export const agesPrediction = (state: AgesState): Prediction => compareTo(agesAnswer(state.people), 0)
export const agesFound = (state: AgesState) => state.t === agesAnswer(state.people)

export const setAgesPrediction = (state: AgesState, prediction: Prediction): AgesState => (state.prediction === null ? { ...state, prediction } : state)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const finds = (scenario: number) => (state: AgesState) => state.scenario === scenario && agesFound(state)
const ask = ({ older, younger, times }: AgesScenario) => say(
    `Amak ${older} urte ditu eta semeak ${younger}. Noiz izango du amak semearen ${times === 2 ? 'bikoitza' : times === 3 ? 'hirukoitza' : 'laukoitza'}?`,
    `La madre tiene ${older} años y el hijo ${younger}. ¿Cuándo tendrá la madre el ${times === 2 ? 'doble' : times === 3 ? 'triple' : 'cuádruple'} que el hijo?`,
    `عمر الأم ${older} سنة وعمر الابن ${younger}. متى يصير عمر الأم ${times === 2 ? 'ضعف' : times === 3 ? 'ثلاثة أمثال' : 'أربعة أمثال'} عمر الابن؟`,
    `The mother is ${older} and her son is ${younger}. When will the mother be ${times === 2 ? 'twice' : times === 3 ? 'three times' : 'four times'} the son's age?`
)

export const agesChallenges: LabChallenge<AgesState>[] = AGES_SCENARIOS.map((people, index) => ({
    id: 93401 + index,
    prompt: ask(people),
    hint: say(`$${people.older}+t=${people.times}(${people.younger}+t)$`, `$${people.older}+t=${people.times}(${people.younger}+t)$`, `$${people.older}+t=${people.times}(${people.younger}+t)$`, `$${people.older}+t=${people.times}(${people.younger}+t)$`),
    isSolved: finds(index)
}))

/** Endless practice: new ages with a whole answer that is not now */
const agesMaker: LabChallengeMaker<AgesState> = (random) => {
    for (;;) {
        const times = randomInt(random, 2, 4)
        const younger = randomInt(random, 4, 20)
        const t = randomInt(random, -10, 20)
        const older = times * (younger + t) - t
        const people = { older, younger, times }
        if (t === 0 || younger + t <= 0 || older > 70 || older - younger < 18 || t < Math.max(AGES_T.min, -younger + 1)) continue
        return {
            prompt: ask(people),
            hint: say(`$${older}+t=${times}(${younger}+t)$`, `$${older}+t=${times}(${younger}+t)$`, `$${older}+t=${times}(${younger}+t)$`, `$${older}+t=${times}(${younger}+t)$`),
            isSolved: (state) => state.scenario === -1 && state.people.older === older && state.people.younger === younger && state.people.times === times && agesFound(state),
            solution: { scenario: -1, people, t, prediction: null }
        }
    }
}

export const agesExtra = freshFrom(initialAgesState, agesMaker)
