import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'

/* ==========================================================================
   L2 · Eraiki dentsitate bat (Construye una densidad): a density made of
   straight pieces — a rectangle f(x) = h, a ramp up f(x) = h·x/b or a
   ramp down f(x) = h·(b − x)/b — on [0, b] with b = 2, 4, 5 or 10 and the
   top height h in hundredths. The learner moves h until the total area is
   1 (the readout shows it as a rectangle or a triangle) and paints a
   window [a₁, a₂] whose probability is its area. Before the area, they
   say whether it is less than, equal to or more than 1. Exact: areas in
   ten-thousandths. Pure.
   ========================================================================== */

export type DensityShape = 'rectangle' | 'up' | 'down'
export const DENSITY_SHAPES: DensityShape[] = ['rectangle', 'up', 'down']
export const DENSITY_BASES = [2, 4, 5, 10] as const

export interface DensityState {
    shape: DensityShape
    base: number
    /** The top height, in hundredths */
    height: number
    from: number
    to: number
    prediction: Prediction | null
}

export const DENSITY_HEIGHT = { min: 5, max: 100, step: 5 } as const
export const initialDensityState: DensityState = { shape: 'rectangle', base: 4, height: 50, from: 1, to: 3, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setDensity(state: DensityState, patch: Partial<Omit<DensityState, 'prediction'>>): DensityState {
    const shape = patch.shape ?? state.shape
    const base = (DENSITY_BASES as readonly number[]).includes(patch.base ?? state.base) ? patch.base ?? state.base : state.base
    const height = clamp(patch.height ?? state.height, DENSITY_HEIGHT.min, DENSITY_HEIGHT.max)
    const from = clamp(patch.from ?? state.from, 0, base - 1)
    const to = clamp(patch.to ?? state.to, from + 1, base)
    const same = shape === state.shape && base === state.base && height === state.height
    return { shape, base, height, from, to, prediction: same ? state.prediction : null }
}

/** The total area in ten-thousandths: rectangle b·h, triangle b·h/2 */
export const totalArea = (state: Pick<DensityState, 'shape' | 'base' | 'height'>) => (state.shape === 'rectangle' ? state.base * state.height * 100 : state.base * state.height * 50)
export const isDensity = (state: Pick<DensityState, 'shape' | 'base' | 'height'>) => totalArea(state) === 10_000
/** The height (in hundredths) that makes it a density, if it is a whole number of hundredths */
export const rightHeight = (shape: DensityShape, base: number) => (shape === 'rectangle' ? 100 / base : 200 / base)

/** The area over [from, to] in ten-thousandths */
export function windowArea(state: Pick<DensityState, 'shape' | 'base' | 'height' | 'from' | 'to'>): number {
    const { base, height, from, to } = state
    if (state.shape === 'rectangle') return (to - from) * height * 100
    if (state.shape === 'up') return (height * (to * to - from * from) * 100) / (2 * base)
    return (height * ((base - from) ** 2 - (base - to) ** 2) * 100) / (2 * base)
}

/** The total area against 1 */
export const densityPrediction = (state: DensityState): Prediction => compareTo(totalArea(state), 10_000)

/* ---------- Challenges ---------- */

export const densityChallenges: LabChallenge<DensityState>[] = [
    { id: 140111, prompt: say('Egin 5 oinarriko laukizuzen bat, dentsitatea izan dadin.', 'Haz un rectángulo de base 5 que sea una densidad.', 'اصنع مستطيلًا قاعدته 5 يكون كثافة.', 'Make a rectangle with base 5 that is a density.'), hint: say('$5\\cdot h=1$', '$5\\cdot h=1$', '$5\\cdot h=1$', '$5\\cdot h=1$'), isSolved: (state) => state.shape === 'rectangle' && state.base === 5 && isDensity(state) },
    { id: 140112, prompt: say('4 oinarriko arrapala igotzaile batekin, dentsitate bat egin eta margotu 0,25 probabilitateko tarte bat.', 'Con una rampa que sube de base 4, haz una densidad y pinta un intervalo de probabilidad 0,25.', 'برمبة صاعدة قاعدتها 4، اصنع كثافة ولوّن مجالًا احتماله 0.25.', 'With a rising ramp of base 4, make a density and paint an interval of probability 0.25.'), hint: say('Altuera $\\frac{2}{4}=0{,}5$; triangelu txikiak $\\frac{2\\cdot 0{,}25}{2}$ du.', 'Altura $\\frac{2}{4}=0{,}5$; el triángulo pequeño tiene $\\frac{2\\cdot 0{,}25}{2}$.', 'الارتفاع $\\frac{2}{4}=0{,}5$؛ وللمثلث الصغير $\\frac{2\\cdot 0{,}25}{2}$.', 'Height $\\frac{2}{4}=0{,}5$; the small triangle has $\\frac{2\\cdot 0{,}25}{2}$.'), isSolved: (state) => state.shape === 'up' && state.base === 4 && isDensity(state) && windowArea(state) === 2500 },
    { id: 140113, prompt: say('10 oinarriko arrapala jaisle batekin, dentsitate bat egin eta margotu 0,36 probabilitateko tarte bat.', 'Con una rampa que baja de base 10, haz una densidad y pinta un intervalo de probabilidad 0,36.', 'برمبة هابطة قاعدتها 10، اصنع كثافة ولوّن مجالًا احتماله 0.36.', 'With a falling ramp of base 10, make a density and paint an interval of probability 0.36.'), hint: say('Altuera $0{,}2$; hasi 0 puntutik.', 'Altura $0{,}2$; empieza en 0.', 'الارتفاع $0{,}2$؛ ابدأ من 0.', 'Height $0{,}2$; start at 0.'), isSolved: (state) => state.shape === 'down' && state.base === 10 && isDensity(state) && windowArea(state) === 3600 }
]

const SHAPE_WORDS: Record<DensityShape, ReturnType<typeof say>> = {
    rectangle: say('laukizuzena', 'el rectángulo', 'المستطيل', 'the rectangle'),
    up: say('arrapala igotzailea', 'la rampa que sube', 'الرمبة الصاعدة', 'the rising ramp'),
    down: say('arrapala jaislea', 'la rampa que baja', 'الرمبة الهابطة', 'the falling ramp')
}

/** Endless practice: a shape and a base made into a density, and a window with a given probability */
const densityMaker: LabChallengeMaker<DensityState> = (random) => {
    for (;;) {
        const shape = pick(random, DENSITY_SHAPES)
        const base = pick(random, DENSITY_BASES)
        const height = rightHeight(shape, base)
        if (!Number.isInteger(height) || height < DENSITY_HEIGHT.min || height > DENSITY_HEIGHT.max || height % DENSITY_HEIGHT.step !== 0) continue
        const from = randomInt(random, 0, base - 1)
        const to = randomInt(random, from + 1, base)
        const solution: DensityState = { shape, base, height, from, to, prediction: null }
        const target = windowArea(solution)
        if (!Number.isInteger(target) || target === 10_000) continue
        const latex = String(target / 10_000).replace('.', '{,}')
        const word = SHAPE_WORDS[shape]
        return {
            prompt: say(`Oinarria ${base} duen ${word.eu}: egin dentsitate bat eta margotu $${latex}$ probabilitateko tarte bat.`, `Con ${word.es} de base ${base}: haz una densidad y pinta un intervalo de probabilidad $${latex}$.`, `مع ${word.ar} ذات القاعدة ${base}: اصنع كثافة ولوّن مجالًا احتماله $${latex}$.`, `With ${word.en} of base ${base}: make a density and paint an interval of probability $${latex}$.`),
            hint: say('Lehenik, azalera osoa 1; gero, tartearen azalera.', 'Primero, área total 1; luego, el área del intervalo.', 'أولًا المساحة الكلية 1، ثم مساحة المجال.', 'First, total area 1; then the area of the interval.'),
            isSolved: (state) => state.shape === shape && state.base === base && isDensity(state) && windowArea(state) === target,
            solution
        }
    }
}

export const densityExtra = freshFrom(initialDensityState, densityMaker)
