import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Batez besteko kostu minimoa (Coste medio mínimo): three firms with
   a cost C(x) = ax² + bx + c. The board draws the average cost
   M(x) = C(x)/x and the cost of the next unit, C′(x), with the point of
   the production x on both. While C′ < M the average goes down, when
   C′ > M it goes up: the minimum is where the two curves cross. Before
   the drawing the learner guesses whether the cheapest production is
   less than, exactly or more than 20 units.
   ========================================================================== */

export type Plant = 'p1' | 'p2' | 'p3'

export const PLANTS: Plant[] = ['p1', 'p2', 'p3']

export const AVERAGE_LIMITS = { x: { min: 1, max: 50 } } as const

export interface AverageState {
    plant: Plant
    x: number
    prediction: Prediction | null
}

export const initialAverageState: AverageState = { plant: 'p1', x: 5, prediction: null }

interface PlantSetup {
    a: number
    b: number
    c: number
    latex: string
}

export const PLANT_SETUP: Record<Plant, PlantSetup> = {
    p1: { a: 1, b: 12, c: 400, latex: 'C(x)=x^2+12x+400' },
    p2: { a: 0.5, b: 8, c: 450, latex: 'C(x)=0{,}5x^2+8x+450' },
    p3: { a: 2, b: 10, c: 200, latex: 'C(x)=2x^2+10x+200' }
}

/** The board shows costs from 0 to 120 euros per unit */
export const AVERAGE_TOP = 120

export function setAverage(state: AverageState, patch: Partial<Omit<AverageState, 'prediction'>>): AverageState {
    const plant = patch.plant ?? state.plant
    const x = Math.min(AVERAGE_LIMITS.x.max, Math.max(AVERAGE_LIMITS.x.min, Math.round(patch.x ?? state.x)))
    return { plant, x, prediction: plant === state.plant ? state.prediction : null }
}

/** M(x) = ax + b + c/x */
export const averageOf = (plant: Plant, x: number) => {
    const { a, b, c } = PLANT_SETUP[plant]
    return a * x + b + c / x
}
/** C′(x) = 2ax + b */
export const nextOf = (plant: Plant, x: number) => 2 * PLANT_SETUP[plant].a * x + PLANT_SETUP[plant].b
/** M′(x) = a − c/x² = 0 */
export const cheapestProduction = (plant: Plant) => Math.sqrt(PLANT_SETUP[plant].c / PLANT_SETUP[plant].a)

/** The cheapest production is less than (<), exactly (=) or more than (>) 20 units */
export const averagePrediction = (state: Pick<AverageState, 'plant'>): Prediction => compareTo(cheapestProduction(state.plant), 20)

const same = (text: string) => say(text, text, text, text)

export const averageChallenges: LabChallenge<AverageState>[] = [
    {
        id: 147201,
        prompt: say('Lehen lantegian, bilatu batez besteko kosturik txikiena ematen duen produkzioa.', 'En la primera fábrica, busca la producción con el menor coste medio.', 'في المصنع الأول، ابحث عن الإنتاج ذي أصغر متوسط تكلفة.', 'In the first factory, find the production with the lowest average cost.'),
        hint: same("$M'(x)=1-\\frac{400}{x^2}=0$"),
        isSolved: (state) => state.plant === 'p1' && state.x === 20
    },
    {
        id: 147202,
        prompt: say("Bigarren lantegian, bilatu $C'(x)=M(x)$ den produkzioa.", "En la segunda fábrica, busca la producción con $C'(x)=M(x)$.", "في المصنع الثاني، ابحث عن الإنتاج الذي يكون فيه $C'(x)=M(x)$.", "In the second factory, find the production with $C'(x)=M(x)$."),
        hint: same('$x+8=0{,}5x+8+\\frac{450}{x}$'),
        isSolved: (state) => state.plant === 'p2' && state.x === 30
    },
    {
        id: 147203,
        prompt: say('Hirugarren lantegian, batez besteko kostua 60 euro da bi produkziotan. Bilatu handiena.', 'En la tercera fábrica, el coste medio es 60 € con dos producciones. Busca la mayor.', 'في المصنع الثالث، متوسط التكلفة 60 € عند إنتاجين. ابحث عن الأكبر.', 'In the third factory, the average cost is €60 at two productions. Find the larger one.'),
        hint: same('$2x+10+\\frac{200}{x}=60$'),
        isSolved: (state) => state.plant === 'p3' && state.x === 20
    },
    {
        id: 147204,
        prompt: say('Lehen lantegian, bilatu hurrengo unitatea batez bestekoa baino garestiagoa den produkzio txikiena.', 'En la primera fábrica, busca la menor producción en la que la unidad siguiente cuesta más que la media.', 'في المصنع الأول، ابحث عن أصغر إنتاج تكلّف فيه الوحدة التالية أكثر من المتوسط.', 'In the first factory, find the smallest production at which the next unit costs more than the average.'),
        hint: same("$C'(x)>M(x)$"),
        isSolved: (state) => state.plant === 'p1' && state.x === 21
    },
    {
        id: 147205,
        prompt: say("Hirugarren lantegian, bilatu $C'(x)=50$ den produkzioa.", "En la tercera fábrica, busca la producción con $C'(x)=50$.", "في المصنع الثالث، ابحث عن الإنتاج الذي يكون فيه $C'(x)=50$.", "In the third factory, find the production with $C'(x)=50$."),
        hint: same('$4x+10=50$'),
        isSolved: (state) => state.plant === 'p3' && state.x === 10
    }
]

const NAMES: Record<Plant, LocalizedText> = {
    p1: say('Lehen lantegian', 'En la primera fábrica', 'في المصنع الأول', 'In the first factory'),
    p2: say('Bigarren lantegian', 'En la segunda fábrica', 'في المصنع الثاني', 'In the second factory'),
    p3: say('Hirugarren lantegian', 'En la tercera fábrica', 'في المصنع الثالث', 'In the third factory')
}

/** Endless practice: set the production where the next unit costs a given amount */
const averageMaker: LabChallengeMaker<AverageState> = (random) => {
    const plant = PLANTS[randomInt(random, 0, PLANTS.length - 1)]
    const x = randomInt(random, 2, 45)
    const target = nextOf(plant, x)
    const name = NAMES[plant]
    const { a, b } = PLANT_SETUP[plant]
    const slope = `${2 * a === 1 ? '' : String(2 * a)}x+${b}`
    return {
        prompt: say(`${name.eu}, bilatu $C'(x)=${target}$ den produkzioa.`, `${name.es}, busca la producción con $C'(x)=${target}$.`, `${name.ar}، ابحث عن الإنتاج الذي يكون فيه $C'(x)=${target}$.`, `${name.en}, find the production with $C'(x)=${target}$.`),
        hint: same(`$C'(x)=${slope}$`),
        isSolved: (state) => state.plant === plant && state.x === x,
        solution: { plant, x, prediction: null }
    }
}

export const averageExtra = freshFrom(initialAverageState, averageMaker)
