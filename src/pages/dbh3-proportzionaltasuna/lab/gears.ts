import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L1 · Engranajes: wheel A (the driver) meshes with wheel B. The teeth that
   pass the contact point each minute are the same for both wheels, so
   teeth · turns is constant: teeth and turns per minute are inversely
   proportional. The learner first predicts whether B will turn faster,
   just as fast or more slowly than A, then sees B's speed and can ▶ run
   the pair. Pure state logic; the component lives in ProportionTools.tsx.
   ========================================================================== */

export const GEAR_LIMITS = { teeth: { min: 8, max: 48, step: 2 }, rpm: { min: 5, max: 60, step: 5 } } as const

export interface GearsState {
    teethA: number
    teethB: number
    rpmA: number
    prediction: Prediction | null
}

/** Not the lesson's 12 and 24, so that no challenge is solved on arrival */
export const initialGearsState: GearsState = { teethA: 20, teethB: 16, rpmA: 20, prediction: null }

const snap = (value: number, { min, max, step }: { min: number; max: number; step: number }) => Math.min(max, Math.max(min, Math.round(value / step) * step))

export function setGears(state: GearsState, patch: Partial<Omit<GearsState, 'prediction'>>): GearsState {
    const teethA = snap(patch.teethA ?? state.teethA, GEAR_LIMITS.teeth)
    const teethB = snap(patch.teethB ?? state.teethB, GEAR_LIMITS.teeth)
    const rpmA = snap(patch.rpmA ?? state.rpmA, GEAR_LIMITS.rpm)
    const same = teethA === state.teethA && teethB === state.teethB && rpmA === state.rpmA
    return { teethA, teethB, rpmA, prediction: same ? state.prediction : null }
}

/** The teeth that pass the contact point each minute: the same for both wheels */
export const gearsTeethPerMinute = (state: GearsState) => state.teethA * state.rpmA
/** Turns per minute of B: teeth · turns is constant */
export const gearsRpmB = (state: GearsState) => gearsTeethPerMinute(state) / state.teethB
/** Will B turn more slowly, as fast as or faster than A? */
export const gearsPrediction = (state: GearsState): Prediction => compareTo(gearsRpmB(state), state.rpmA)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const gearsChallenges: LabChallenge<GearsState>[] = [
    {
        id: 87101,
        prompt: say('A-k minutuko 30 bira egiten ditu. Lortu B-k minutuko 45 bira egitea.', 'A da 30 vueltas por minuto. Consigue que B dé 45.', 'تدور A ثلاثين دورة في الدقيقة. اجعل B تدور 45.', 'A turns 30 times a minute. Make B turn 45 times.'),
        hint: say('B-k A-k baino bira gehiago: hortz gutxiago. $\\frac{45}{30}=1{,}5$, beraz A-k B-k baino 1,5 aldiz hortz gehiago.', 'B más rápida que A: menos dientes. $\\frac{45}{30}=1{,}5$: A tiene 1,5 veces los dientes de B.', 'B أسرع من A: أسنان أقل. $\\frac{45}{30}=1{,}5$: أسنان A مرة ونصف أسنان B.', 'B faster than A: fewer teeth. $\\frac{45}{30}=1{,}5$: A has 1.5 times as many teeth as B.'),
        isSolved: (state) => state.rpmA === 30 && Math.abs(gearsRpmB(state) - 45) < 1e-9
    },
    {
        id: 87102,
        prompt: say('Lortu B-k A-k baino hiru aldiz bira gehiago egitea.', 'Consigue que B dé el triple de vueltas que A.', 'اجعل B تدور ثلاثة أضعاف دورات A.', 'Make B turn three times as fast as A.'),
        hint: say('Hortz kopuruak alderantziz: A-k B-k baino hiru aldiz hortz gehiago.', 'Los dientes, al revés: A con el triple de dientes que B.', 'الأسنان بالعكس: أسنان A ثلاثة أضعاف أسنان B.', 'The teeth the other way round: A with three times as many teeth as B.'),
        isSolved: (state) => state.teethA === 3 * state.teethB
    },
    {
        id: 87103,
        prompt: say('A-k 36 hortz ditu eta minutuko 10 bira egiten ditu. Lortu B-k minutuko 20 bira egitea.', 'A tiene 36 dientes y da 10 vueltas por minuto. Consigue que B dé 20.', 'لـ A ستة وثلاثون سنًّا وتدور 10 دورات في الدقيقة. اجعل B تدور 20.', 'A has 36 teeth and turns 10 times a minute. Make B turn 20 times.'),
        hint: say('$36\\cdot 10=360$ hortz minutuko. $360\\mathbin{:}20=18$.', '$36\\cdot 10=360$ dientes por minuto. $360\\mathbin{:}20=18$.', '$36\\cdot 10=360$ سنًّا في الدقيقة. $360\\mathbin{:}20=18$.', '$36\\cdot 10=360$ teeth a minute. $360\\mathbin{:}20=18$.'),
        isSolved: (state) => state.teethA === 36 && state.rpmA === 10 && state.teethB === 18
    },
    {
        id: 87104,
        prompt: say('A-k 24 hortz ditu. Lortu B-k minutuko 8 bira egitea.', 'A tiene 24 dientes. Consigue que B dé 8 vueltas por minuto.', 'لـ A أربعة وعشرون سنًّا. اجعل B تدور 8 دورات في الدقيقة.', 'A has 24 teeth. Make B turn 8 times a minute.'),
        hint: say('$24\\cdot v_{A}=n_{B}\\cdot 8$, beraz $n_{B}=3\\cdot v_{A}$. Hortzak bikoitiak dira.', '$24\\cdot v_{A}=n_{B}\\cdot 8$, así que $n_{B}=3\\cdot v_{A}$. Los dientes son pares.', '$24\\cdot v_{A}=n_{B}\\cdot 8$ إذن $n_{B}=3\\cdot v_{A}$. والأسنان أعداد زوجية.', '$24\\cdot v_{A}=n_{B}\\cdot 8$, so $n_{B}=3\\cdot v_{A}$. The teeth are even numbers.'),
        isSolved: (state) => state.teethA === 24 && Math.abs(gearsRpmB(state) - 8) < 1e-9
    },
    {
        id: 87105,
        prompt: say('Lortu bi gurpilek abiadura bera izatea, A-k 30 hortz baino gehiago dituela.', 'Consigue que las dos ruedas giren igual de rápido, con A de más de 30 dientes.', 'اجعل العجلتين تدوران بالسرعة نفسها و A لها أكثر من 30 سنًّا.', 'Make both wheels turn at the same speed, with A having more than 30 teeth.'),
        hint: say('Abiadura bera: hortz kopuru bera.', 'La misma velocidad: el mismo número de dientes.', 'السرعة نفسها: عدد الأسنان نفسه.', 'The same speed: the same number of teeth.'),
        isSolved: (state) => state.teethA > 30 && state.teethA === state.teethB
    }
]

/** Endless practice: reach a speed for B. B's teeth are always an even number in range. */
const gearsMaker: LabChallengeMaker<GearsState> = (random) => {
    for (;;) {
        const teethA = randomInt(random, 5, 22) * 2
        const rpmA = pick(random, [10, 15, 20, 25, 30, 40])
        const teethB = randomInt(random, 4, 24) * 2
        if (teethB === teethA) continue
        const rpmB = (teethA * rpmA) / teethB
        if (!Number.isInteger(rpmB) || rpmB > 120) continue
        return {
            prompt: say(`A-k ${teethA} hortz ditu eta minutuko ${rpmA} bira egiten ditu. Lortu B-k minutuko ${rpmB} bira egitea.`, `A tiene ${teethA} dientes y da ${rpmA} vueltas por minuto. Consigue que B dé ${rpmB}.`, `لـ A عدد ${teethA} من الأسنان وتدور ${rpmA} دورة في الدقيقة. اجعل B تدور ${rpmB}.`, `A has ${teethA} teeth and turns ${rpmA} times a minute. Make B turn ${rpmB} times.`),
            hint: say(`$${teethA}\\cdot ${rpmA}=${teethA * rpmA}$ hortz minutuko. Zatitu $${rpmB}$ zenbakiaz.`, `$${teethA}\\cdot ${rpmA}=${teethA * rpmA}$ dientes por minuto. Divide entre $${rpmB}$.`, `$${teethA}\\cdot ${rpmA}=${teethA * rpmA}$ سنًّا في الدقيقة. اقسم على $${rpmB}$.`, `$${teethA}\\cdot ${rpmA}=${teethA * rpmA}$ teeth a minute. Divide by $${rpmB}$.`),
            isSolved: (state) => state.teethA === teethA && state.rpmA === rpmA && state.teethB === teethB,
            solution: { teethA, teethB, rpmA, prediction: null }
        }
    }
}

export const gearsExtra = freshFrom(initialGearsState, gearsMaker)
