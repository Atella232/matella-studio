import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Tarifa tarteka (La tarifa por tramos): three tariffs in two
   brackets, p₁x up to a boundary B and p₂x + k beyond it. A stepper moves
   the fixed charge k of the second bracket; the board shows the jump at
   B, and ▶ walks a customer across the boundary so the bill can be seen
   jumping. Before drawing, the learner predicts whether, with the
   tariff as it is, whoever goes just past B pays less (<), the same (=)
   or more (>): water starts with a jump up, parking with one down, and
   electricity with none.
   ========================================================================== */

export type TariffKind = 'water' | 'parking' | 'power'

export const TARIFF_KINDS: TariffKind[] = ['water', 'parking', 'power']

export interface TariffState {
    kind: TariffKind
    k: number
    prediction: Prediction | null
}

interface Tariff {
    /** Price per unit up to the boundary and beyond it */
    first: number
    second: number
    boundary: number
    /** The fixed charge the tariff starts with, and the stepper's range */
    k0: number
    kMax: number
    /** Board: amounts of use and euros */
    xMax: number
    yMax: number
    xStep: number
    yStep: number
}

export const TARIFF_SETUP: Record<TariffKind, Tariff> = {
    water: { first: 2, second: 1.5, boundary: 10, k0: 8, kMax: 15, xMax: 20, yMax: 40, xStep: 5, yStep: 10 },
    parking: { first: 3, second: 2, boundary: 2, k0: 1, kMax: 8, xMax: 6, yMax: 20, xStep: 1, yStep: 5 },
    power: { first: 0.2, second: 0.15, boundary: 300, k0: 15, kMax: 40, xMax: 600, yMax: 120, xStep: 100, yStep: 20 }
}

export const initialTariffState: TariffState = { kind: 'water', k: TARIFF_SETUP.water.k0, prediction: null }

export function setTariff(state: TariffState, patch: Partial<Omit<TariffState, 'prediction'>>): TariffState {
    const kind = patch.kind ?? state.kind
    const setup = TARIFF_SETUP[kind]
    const k = kind !== state.kind && patch.k === undefined ? setup.k0 : Math.min(setup.kMax, Math.max(0, Math.round(patch.k ?? state.k)))
    return { kind, k, prediction: kind === state.kind ? state.prediction : null }
}

/** The bill for an amount x of use */
export function bill(state: Pick<TariffState, 'kind' | 'k'>, x: number): number {
    const { first, second, boundary } = TARIFF_SETUP[state.kind]
    return x <= boundary ? first * x : second * x + state.k
}

/** What the bill is at the boundary (from the left, and f(B)) and just past it (from the right) */
export function tariffSides(state: Pick<TariffState, 'kind' | 'k'>): [number, number] {
    const { first, second, boundary } = TARIFF_SETUP[state.kind]
    return [first * boundary, second * boundary + state.k]
}

/** Right-hand limit minus left-hand limit, rounded to cents */
export function tariffJump(state: Pick<TariffState, 'kind' | 'k'>): number {
    const [left, right] = tariffSides(state)
    return Math.round((right - left) * 100) / 100
}

/** The charge with no jump */
export const fairCharge = (kind: TariffKind) => {
    const { first, second, boundary } = TARIFF_SETUP[kind]
    return Math.round((first - second) * boundary * 100) / 100
}

const texNumber = (value: number) => String(value).replace('.', '{,}')

/** The tariff in LaTeX, with its letter (t for hours of parking) */
export function tariffLatex(state: Pick<TariffState, 'kind' | 'k'>): string {
    const { first, second, boundary } = TARIFF_SETUP[state.kind]
    const letter = state.kind === 'parking' ? 't' : 'x'
    return `f(${letter})=\\begin{cases}${texNumber(first)}${letter} & ${letter}\\le ${boundary}\\\\ ${texNumber(second)}${letter}+${state.k} & ${letter}>${boundary}\\end{cases}`
}

export const tariffPrediction = (state: Pick<TariffState, 'kind' | 'k'>): Prediction => compareTo(tariffJump(state), 0)

export const tariffChallenges: LabChallenge<TariffState>[] = [
    {
        id: 145201,
        prompt: say('Ur-tarifan, kendu jauzia $x=10$ puntuan.', 'En la tarifa de agua, quita el salto de $x=10$.', 'في تعريفة الماء، أزل القفزة عند $x=10$.', 'In the water tariff, remove the jump at $x=10$.'),
        hint: same('$2\\cdot 10=1{,}5\\cdot 10+k$'),
        isSolved: (state) => state.kind === 'water' && tariffJump(state) === 0
    },
    {
        id: 145202,
        prompt: say('Aparkalekuan, kendu jauzia $t=2$ puntuan.', 'En el aparcamiento, quita el salto de $t=2$.', 'في الموقف، أزل القفزة عند $t=2$.', 'In the car park, remove the jump at $t=2$.'),
        hint: same('$3\\cdot 2=2\\cdot 2+k$'),
        isSolved: (state) => state.kind === 'parking' && tariffJump(state) === 0
    },
    {
        id: 145203,
        prompt: say('Argi-tarifan, egin 6 euroko jauzia gorantz $x=300$ puntuan.', 'En la tarifa de luz, haz que en $x=300$ haya un salto de 6 € hacia arriba.', 'في تعريفة الكهرباء، اجعل عند $x=300$ قفزة مقدارها 6 € إلى الأعلى.', 'In the electricity tariff, make a jump of €6 upwards at $x=300$.'),
        hint: same('$0{,}15\\cdot 300+k=0{,}2\\cdot 300+6$'),
        isSolved: (state) => state.kind === 'power' && tariffJump(state) === 6
    },
    {
        id: 145204,
        prompt: say('Ur-tarifan, egin 10 m³ igarotzen dituenak euro 1 gutxiago ordain dezan.', 'En la tarifa de agua, haz que quien pasa de 10 m³ pague 1 € menos.', 'في تعريفة الماء، اجعل من يتجاوز 10 m³ يدفع 1 € أقل.', 'In the water tariff, make whoever goes past 10 m³ pay €1 less.'),
        hint: same('$15+k=20-1$'),
        isSolved: (state) => state.kind === 'water' && tariffJump(state) === -1
    },
    {
        id: 145205,
        prompt: say('Aparkalekuan, egin 3 euroko jauzia gorantz bi ordu igarotzean.', 'En el aparcamiento, haz que al pasar de dos horas se paguen de golpe 3 € más.', 'في الموقف، اجعل تجاوز ساعتين يكلّف فجأة 3 € إضافية.', 'In the car park, make going past two hours cost €3 more all at once.'),
        hint: same('$4+k=6+3$'),
        isSolved: (state) => state.kind === 'parking' && tariffJump(state) === 3
    }
]

function same(text: string) {
    return say(text, text, text, text)
}

const TARIFF_NAMES = {
    water: say('Ur-tarifan', 'En la tarifa de agua', 'في تعريفة الماء', 'In the water tariff'),
    parking: say('Aparkalekuan', 'En el aparcamiento', 'في الموقف', 'In the car park'),
    power: say('Argi-tarifan', 'En la tarifa de luz', 'في تعريفة الكهرباء', 'In the electricity tariff')
}

/** Endless practice: make the jump a given number of euros, up or down (or none) */
const tariffMaker: LabChallengeMaker<TariffState> = (random) => {
    for (;;) {
        const kind = TARIFF_KINDS[randomInt(random, 0, 2)]
        const jump = randomInt(random, -3, 6)
        const k = fairCharge(kind) + jump
        if (k < 0 || k > TARIFF_SETUP[kind].kMax) continue
        const name = TARIFF_NAMES[kind]
        const { boundary } = TARIFF_SETUP[kind]
        const prompt = jump === 0
            ? say(`${name.eu}, kendu jauzia ${boundary} puntuan.`, `${name.es}, quita el salto de ${boundary}.`, `${name.ar}، أزل القفزة عند ${boundary}.`, `${name.en}, remove the jump at ${boundary}.`)
            : jump > 0
                ? say(`${name.eu}, egin ${jump} euroko jauzia gorantz ${boundary} puntuan.`, `${name.es}, haz un salto de ${jump} € hacia arriba en ${boundary}.`, `${name.ar}، اجعل قفزة مقدارها ${jump} € إلى الأعلى عند ${boundary}.`, `${name.en}, make a jump of €${jump} upwards at ${boundary}.`)
                : say(`${name.eu}, egin ${-jump} euroko jauzia beherantz ${boundary} puntuan.`, `${name.es}, haz un salto de ${-jump} € hacia abajo en ${boundary}.`, `${name.ar}، اجعل قفزة مقدارها ${-jump} € إلى الأسفل عند ${boundary}.`, `${name.en}, make a jump of €${-jump} downwards at ${boundary}.`)
        return {
            prompt,
            hint: say('Jauzia = eskuineko limitea − ezkerrekoa.', 'Salto = límite por la derecha − por la izquierda.', 'القفزة = النهاية اليمنى − اليسرى.', 'Jump = right-hand limit − left-hand limit.'),
            isSolved: (state) => state.kind === kind && tariffJump(state) === jump,
            solution: { kind, k, prediction: null }
        }
    }
}

export const tariffExtra = freshFrom(initialTariffState, tariffMaker)
