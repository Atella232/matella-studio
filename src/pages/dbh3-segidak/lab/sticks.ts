import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L1 · Patroiak makilekin (Los patrones de palillos): four patterns built
   step by step — a row of squares (3n + 1 sticks), a row of triangles
   (2n + 1), a staircase of blocks (n(n + 1)/2) and a square of blocks
   (n²). The first two grow by the same amount each step (arithmetic); the
   other two grow more each time. The learner predicts what is added from
   one step to the next, then sees the figure and its table. Pure logic.
   ========================================================================== */

export type PatternId = 'squares' | 'triangles' | 'stairs' | 'square'

export const PATTERNS: PatternId[] = ['squares', 'triangles', 'stairs', 'square']
export const STICKS_N_MAX = 12

export interface SticksState {
    pattern: number
    n: number
    prediction: Prediction | null
}

export const initialSticksState: SticksState = { pattern: 0, n: 3, prediction: null }

export const patternTerm = (pattern: PatternId, n: number) => {
    switch (pattern) {
        case 'squares': return 3 * n + 1
        case 'triangles': return 2 * n + 1
        case 'stairs': return (n * (n + 1)) / 2
        case 'square': return n * n
    }
}

/** The general term in LaTeX */
export const patternFormula: Record<PatternId, string> = { squares: 'a_{n}=3n+1', triangles: 'a_{n}=2n+1', stairs: 'a_{n}=\\frac{n\\cdot(n+1)}{2}', square: 'a_{n}=n^{2}' }

export const isArithmetic = (pattern: PatternId) => pattern === 'squares' || pattern === 'triangles'

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setSticks(state: SticksState, patch: Partial<Omit<SticksState, 'prediction'>>): SticksState {
    const pattern = clamp(patch.pattern ?? state.pattern, 0, PATTERNS.length - 1)
    const n = clamp(patch.n ?? state.n, 1, STICKS_N_MAX)
    // The prediction is about the pattern, so only a new pattern asks for a new one
    return { pattern, n, prediction: pattern === state.pattern ? state.prediction : null }
}

export const sticksValue = (state: SticksState) => patternTerm(PATTERNS[state.pattern], state.n)
/** From one step to the next, is less (<), the same (=) or more (>) added each time? */
export const sticksPrediction = (state: SticksState): Prediction => (isArithmetic(PATTERNS[state.pattern]) ? '=' : '>')

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

const at = (pattern: number, n: number) => (state: SticksState) => state.pattern === pattern && state.n === n

export const sticksChallenges: LabChallenge<SticksState>[] = [
    { id: 89101, prompt: say('Karratuen patroiarekin, erabili 31 makila.', 'Con el patrón de cuadrados, usa 31 palillos.', 'بنمط المربعات استعمل 31 عودًا.', 'With the squares pattern, use 31 sticks.'), hint: say('$3n+1=31$.', '$3n+1=31$.', '$3n+1=31$.', '$3n+1=31$.'), isSolved: at(0, 10) },
    { id: 89102, prompt: say('Triangeluen patroiarekin, erabili 25 makila.', 'Con el patrón de triángulos, usa 25 palillos.', 'بنمط المثلثات استعمل 25 عودًا.', 'With the triangles pattern, use 25 sticks.'), hint: say('$2n+1=25$.', '$2n+1=25$.', '$2n+1=25$.', '$2n+1=25$.'), isSolved: at(1, 12) },
    { id: 89103, prompt: say('Egin 21 blokeko eskailera bat.', 'Haz una escalera de 21 bloques.', 'اصنع درجًا من 21 كتلة.', 'Build a staircase of 21 blocks.'), hint: say('$1+2+3+\\cdots$ 21 arte.', '$1+2+3+\\cdots$ hasta 21.', '$1+2+3+\\cdots$ حتى 21.', '$1+2+3+\\cdots$ up to 21.'), isSolved: at(2, 6) },
    { id: 89104, prompt: say('Egin 49 blokeko karratu bat.', 'Haz un cuadrado de 49 bloques.', 'اصنع مربعًا من 49 كتلة.', 'Build a square of 49 blocks.'), hint: say('$n^{2}=49$.', '$n^{2}=49$.', '$n^{2}=49$.', '$n^{2}=49$.'), isSolved: at(3, 7) },
    { id: 89105, prompt: say('Aurkitu 36 elementu dituen urrats bat, progresio aritmetikoa ez den patroi batean.', 'Encuentra un paso con 36 elementos en un patrón que no sea una progresión aritmética.', 'جد خطوة فيها 36 عنصرًا في نمط ليس متتالية حسابية.', 'Find a step with 36 items in a pattern that is not an arithmetic progression.'), hint: say('Bi aukera daude: eskailera eta karratua.', 'Hay dos posibilidades: la escalera y el cuadrado.', 'هناك احتمالان: الدرج والمربع.', 'There are two possibilities: the staircase and the square.'), isSolved: (state) => !isArithmetic(PATTERNS[state.pattern]) && sticksValue(state) === 36 }
]

const names: Record<PatternId, LocalizedText> = {
    squares: say('karratuen patroiarekin', 'con el patrón de cuadrados', 'بنمط المربعات', 'with the squares pattern'),
    triangles: say('triangeluen patroiarekin', 'con el patrón de triángulos', 'بنمط المثلثات', 'with the triangles pattern'),
    stairs: say('eskaileraren patroiarekin', 'con el patrón de la escalera', 'بنمط الدرج', 'with the staircase pattern'),
    square: say('karratu handiaren patroiarekin', 'con el patrón del cuadrado grande', 'بنمط المربع الكبير', 'with the big square pattern')
}

/** Endless practice: reach a number of sticks or blocks with a given pattern */
const sticksMaker: LabChallengeMaker<SticksState> = (random) => {
    const pattern = randomInt(random, 0, PATTERNS.length - 1)
    const n = pick(random, [2, 4, 5, 7, 8, 9, 11, 12])
    const value = patternTerm(PATTERNS[pattern], n)
    const name = names[PATTERNS[pattern]]
    return {
        prompt: say(`Lortu ${value} elementu ${name.eu}.`, `Consigue ${value} elementos ${name.es}.`, `احصل على ${value} عنصرًا ${name.ar}.`, `Get ${value} items ${name.en}.`),
        hint: say(`$${patternFormula[PATTERNS[pattern]]}=${value}$`, `$${patternFormula[PATTERNS[pattern]]}=${value}$`, `$${patternFormula[PATTERNS[pattern]]}=${value}$`, `$${patternFormula[PATTERNS[pattern]]}=${value}$`),
        isSolved: at(pattern, n),
        solution: { pattern, n, prediction: null }
    }
}

export const sticksExtra = freshFrom(initialSticksState, sticksMaker)
