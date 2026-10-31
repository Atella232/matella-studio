import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L4 · Irudiak handitu (Ampliar figuras): a shape on squared paper and a
   copy with scale factor k. The perimeter of the copy is k times the
   original, but the area is k² times: every unit square becomes k by k.
   The learner predicts whether the new area will be less than, exactly or
   more than k times the old one; ▶ grows the copy from k = 1.
   ========================================================================== */

export type ShapeId = 'rectangle' | 'triangle' | 'step'
export const SHAPES: ShapeId[] = ['rectangle', 'triangle', 'step']

/** Area and perimeter of each shape at k = 1, in grid units */
export const SHAPE_SIZES: Record<ShapeId, { area: number; perimeter: number }> = {
    rectangle: { area: 8, perimeter: 12 },
    triangle: { area: 6, perimeter: 12 },
    step: { area: 5, perimeter: 10 }
}

export const FACTORS = [0.5, 1, 1.5, 2, 2.5, 3]

export interface EnlargeState {
    shape: ShapeId
    k: number
    prediction: Prediction | null
}

export const initialEnlargeState: EnlargeState = { shape: 'rectangle', k: 1, prediction: null }

export function setEnlarge(state: EnlargeState, patch: Partial<Pick<EnlargeState, 'shape' | 'k'>>): EnlargeState {
    const shape = patch.shape ?? state.shape
    const k = FACTORS.includes(patch.k ?? state.k) ? patch.k ?? state.k : state.k
    return { shape, k, prediction: shape === state.shape && k === state.k ? state.prediction : null }
}

export const enlargedArea = ({ shape, k }: Pick<EnlargeState, 'shape' | 'k'>) => SHAPE_SIZES[shape].area * k * k
export const enlargedPerimeter = ({ shape, k }: Pick<EnlargeState, 'shape' | 'k'>) => SHAPE_SIZES[shape].perimeter * k
/** Will the new area be less than (<), exactly (=) or more than (>) k times the old one? */
export const enlargePrediction = (state: EnlargeState): Prediction => compareTo(state.k * state.k, state.k)

export const setEnlargePrediction = (state: EnlargeState, prediction: Prediction): EnlargeState => (state.prediction === null ? { ...state, prediction } : state)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const SHAPE_NAMES: Record<ShapeId, LocalizedText> = {
    rectangle: say('laukizuzena', 'el rectángulo', 'المستطيل', 'the rectangle'),
    triangle: say('triangelua', 'el triángulo', 'المثلث', 'the triangle'),
    step: say('eskailera-irudia', 'la escalera', 'شكل الدرج', 'the step shape')
}
const tex = (value: number) => String(value).replace('.', '{,}')
const areaIs = (shape: ShapeId, area: number) => (state: EnlargeState) => state.shape === shape && Math.abs(enlargedArea(state) - area) < 1e-9
const ask = (shape: ShapeId, area: number) => say(`Handitu ${SHAPE_NAMES[shape].eu}, kopiaren azalera $${tex(area)}$ izan dadin.`, `Amplía ${SHAPE_NAMES[shape].es} para que la copia tenga área $${tex(area)}$.`, `كبّر ${SHAPE_NAMES[shape].ar} لتكون مساحة النسخة $${tex(area)}$.`, `Enlarge ${SHAPE_NAMES[shape].en} so that the copy has an area of $${tex(area)}$.`)
const hintFor = (shape: ShapeId, area: number) => say(`$${SHAPE_SIZES[shape].area}\\cdot k^{2}=${tex(area)}$`, `$${SHAPE_SIZES[shape].area}\\cdot k^{2}=${tex(area)}$`, `$${SHAPE_SIZES[shape].area}\\cdot k^{2}=${tex(area)}$`, `$${SHAPE_SIZES[shape].area}\\cdot k^{2}=${tex(area)}$`)

export const enlargeChallenges: LabChallenge<EnlargeState>[] = [
    { id: 95401, prompt: ask('rectangle', 32), hint: hintFor('rectangle', 32), isSolved: areaIs('rectangle', 32) },
    { id: 95402, prompt: ask('triangle', 54), hint: hintFor('triangle', 54), isSolved: areaIs('triangle', 54) },
    { id: 95403, prompt: say('Lortu 18 neurtzen duen laukizuzen-perimetroa.', 'Consigue un rectángulo de perímetro 18.', 'احصل على مستطيل محيطه 18.', 'Get a rectangle with a perimeter of 18.'), hint: formula('k=\\frac{18}{12}'), isSolved: (state) => state.shape === 'rectangle' && Math.abs(enlargedPerimeter(state) - 18) < 1e-9 },
    { id: 95404, prompt: ask('rectangle', 2), hint: hintFor('rectangle', 2), isSolved: areaIs('rectangle', 2) },
    { id: 95405, prompt: say('Edozein irudirekin, egin azalera 9 aldiz handiagoa.', 'Con cualquier figura, haz el área 9 veces mayor.', 'بأي شكل، اجعل المساحة أكبر 9 مرات.', 'With any shape, make the area 9 times larger.'), hint: formula('k^{2}=9'), isSolved: (state) => state.k === 3 }
]

/** The same formula in every language */
function formula(latex: string): LocalizedText {
    return say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
}

/** Endless practice: an area to reach with one of the shapes */
const enlargeMaker: LabChallengeMaker<EnlargeState> = (random) => {
    const shape = pick(random, SHAPES)
    const k = pick(random, FACTORS.filter((factor) => factor !== 1))
    const area = SHAPE_SIZES[shape].area * k * k
    return { prompt: ask(shape, area), hint: hintFor(shape, area), isSolved: areaIs(shape, area), solution: { shape, k, prediction: null } }
}

export const enlargeExtra = freshFrom(initialEnlargeState, enlargeMaker)
