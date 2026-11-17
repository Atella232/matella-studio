import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L4 · Hurrengo unitatetik kostu osora (Del marginal al total, la función
   área en economía): three firms with the cost of the next unit C′(x)
   and a fixed cost K. The board shades the area under C′ from 0 to x;
   the readout adds it to K: C(x) = K + ∫₀ˣ C′. Before the area is shown,
   the learner guesses whether the first 20 units cost (without the fixed
   cost) less than, exactly or more than €400.
   ========================================================================== */

export type Plant = 'full' | 'press' | 'software'

export const PLANTS: Plant[] = ['full', 'press', 'software']

export const TOTAL_LIMITS = { x: { min: 0, max: 20 } } as const

export interface TotalState {
    plant: Plant
    x: number
    prediction: Prediction | null
}

export const initialTotalState: TotalState = { plant: 'full', x: 0, prediction: null }

interface PlantSetup {
    /** C′(x) = a·x + b */
    a: number
    b: number
    fixed: number
    latex: string
}

export const PLANT_SETUP: Record<Plant, PlantSetup> = {
    full: { a: 2, b: 10, fixed: 200, latex: "C'(x)=2x+10" },
    press: { a: -1, b: 30, fixed: 100, latex: "C'(x)=30-x" },
    software: { a: -0.5, b: 20, fixed: 300, latex: "C'(x)=20-0{,}5x" }
}

export function setTotal(state: TotalState, patch: Partial<Omit<TotalState, 'prediction'>>): TotalState {
    const plant = patch.plant ?? state.plant
    const x = Math.min(TOTAL_LIMITS.x.max, Math.max(TOTAL_LIMITS.x.min, Math.round(patch.x ?? state.x)))
    return { plant, x, prediction: plant === state.plant ? state.prediction : null }
}

export const marginalOf = (plant: Plant, x: number) => PLANT_SETUP[plant].a * x + PLANT_SETUP[plant].b
/** ∫₀ˣ C′ = a x²/2 + b x */
export const variableOf = (plant: Plant, x: number) => (PLANT_SETUP[plant].a * x * x) / 2 + PLANT_SETUP[plant].b * x
export const totalOf = (plant: Plant, x: number) => PLANT_SETUP[plant].fixed + variableOf(plant, x)

/** The first 20 units cost (without K) less than (<), exactly (=) or more than (>) €400 */
export const totalPrediction = (state: Pick<TotalState, 'plant'>): Prediction => compareTo(variableOf(state.plant, 20), 400)

const same = (text: string) => say(text, text, text, text)

export const totalChallenges: LabChallenge<TotalState>[] = [
    {
        id: 149101,
        prompt: say('Lantegi beteta, bilatu $C(x)=400$ den produkzioa.', 'En el taller lleno, busca la producción con $C(x)=400$.', 'في الورشة المزدحمة، ابحث عن الإنتاج الذي يكون فيه $C(x)=400$.', 'In the crowded workshop, find the production with $C(x)=400$.'),
        hint: same('$x^2+10x+200=400$'),
        isSolved: (state) => state.plant === 'full' && state.x === 10
    },
    {
        id: 149102,
        prompt: say('Inprimategian, bilatu $C(x)=500$ den produkzioa.', 'En la imprenta, busca la producción con $C(x)=500$.', 'في المطبعة، ابحث عن الإنتاج الذي يكون فيه $C(x)=500$.', 'In the print shop, find the production with $C(x)=500$.'),
        hint: same('$100+30x-\\frac{x^2}{2}=500$'),
        isSolved: (state) => state.plant === 'press' && state.x === 20
    },
    {
        id: 149103,
        prompt: say('Software-enpresan, bilatu $C(x)=475$ den produkzioa.', 'En la empresa de software, busca la producción con $C(x)=475$.', 'في شركة البرمجيات، ابحث عن الإنتاج الذي يكون فيه $C(x)=475$.', 'In the software firm, find the production with $C(x)=475$.'),
        hint: same('$300+20x-\\frac{x^2}{4}=475$'),
        isSolved: (state) => state.plant === 'software' && state.x === 10
    },
    {
        id: 149104,
        prompt: say("Lantegi beteta, bilatu $C'(x)=40$ den produkzioa.", "En el taller lleno, busca la producción con $C'(x)=40$.", "في الورشة المزدحمة، ابحث عن الإنتاج الذي يكون فيه $C'(x)=40$.", "In the crowded workshop, find the production with $C'(x)=40$."),
        hint: same('$2x+10=40$'),
        isSolved: (state) => state.plant === 'full' && state.x === 15
    },
    {
        id: 149105,
        prompt: say("Software-enpresan, bilatu $C'(x)=12$ den produkzioa.", "En la empresa de software, busca la producción con $C'(x)=12$.", "في شركة البرمجيات، ابحث عن الإنتاج الذي يكون فيه $C'(x)=12$.", "In the software firm, find the production with $C'(x)=12$."),
        hint: same('$20-0{,}5x=12$'),
        isSolved: (state) => state.plant === 'software' && state.x === 16
    }
]

const NAMES: Record<Plant, LocalizedText> = {
    full: say('Lantegi beteta', 'En el taller lleno', 'في الورشة المزدحمة', 'In the crowded workshop'),
    press: say('Inprimategian', 'En la imprenta', 'في المطبعة', 'In the print shop'),
    software: say('Software-enpresan', 'En la empresa de software', 'في شركة البرمجيات', 'In the software firm')
}

/** Endless practice: set the production with a given total cost */
const totalMaker: LabChallengeMaker<TotalState> = (random) => {
    const plant = PLANTS[randomInt(random, 0, PLANTS.length - 1)]
    const x = randomInt(random, 1, 20)
    const target = totalOf(plant, x)
    const shown = String(target).replace('.', '{,}')
    const shownAr = String(target)
    const name = NAMES[plant]
    return {
        prompt: say(`${name.eu}, bilatu $C(x)=${shown}$ den produkzioa.`, `${name.es}, busca la producción con $C(x)=${shown}$.`, `${name.ar}، ابحث عن الإنتاج الذي يكون فيه $C(x)=${shownAr}$.`, `${name.en}, find the production with $C(x)=${shown}$.`),
        hint: same(`$${PLANT_SETUP[plant].latex}\\qquad K=${PLANT_SETUP[plant].fixed}$`),
        isSolved: (state) => state.plant === plant && state.x === x,
        solution: { plant, x, prediction: null }
    }
}

export const totalExtra = freshFrom(initialTotalState, totalMaker)
