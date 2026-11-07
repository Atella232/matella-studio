import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../text.ts'
import { argumentOf, complexLatex, modulus, mul, sameComplex, type Complex } from './complex.ts'

/* ==========================================================================
   L2 · Biderkatzea biratzea da (Multiplicar es girar): the learner places
   z = a + bi and chooses a number w (i, −1, −i, 2, 1 + i, 2i or (1 + i)/2).
   Before the product z · w is drawn, the learner predicts whether z turns
   less than 90°, 90° or more; then the tool draws the product, with the
   modulus multiplied by |w| and the argument of w added, and ▶ moves z to
   z · w along a turn that stretches. Pure logic.
   ========================================================================== */

export interface Multiplier {
    id: string
    value: Complex
    /** The number for LaTeX */
    latex: string
    /** Its modulus for LaTeX */
    modulusLatex: string
    /** The number as plain text, for the buttons */
    plain: string
}

export const MULTIPLIERS: Multiplier[] = [
    { id: 'i', value: [0, 1], latex: 'i', modulusLatex: '1', plain: 'i' },
    { id: 'minus-one', value: [-1, 0], latex: '-1', modulusLatex: '1', plain: '−1' },
    { id: 'minus-i', value: [0, -1], latex: '-i', modulusLatex: '1', plain: '−i' },
    { id: 'two', value: [2, 0], latex: '2', modulusLatex: '2', plain: '2' },
    { id: 'one-plus-i', value: [1, 1], latex: '1+i', modulusLatex: '\\sqrt{2}', plain: '1 + i' },
    { id: 'two-i', value: [0, 2], latex: '2i', modulusLatex: '2', plain: '2i' },
    { id: 'half', value: [0.5, 0.5], latex: '\\frac{1+i}{2}', modulusLatex: '\\frac{\\sqrt{2}}{2}', plain: '(1 + i)/2' }
]

export const TURN_LIMIT = 3

export interface TurnState {
    a: number
    b: number
    /** Index in MULTIPLIERS */
    w: number
    prediction: Prediction | null
}

export const initialTurnState: TurnState = { a: 2, b: 1, w: 3, prediction: null }

const clamp = (value: number, max: number, min = -max) => Math.min(max, Math.max(min, Math.round(value)))

export function setTurn(state: TurnState, patch: Partial<Omit<TurnState, 'prediction'>>): TurnState {
    const next = { a: clamp(patch.a ?? state.a, TURN_LIMIT), b: clamp(patch.b ?? state.b, TURN_LIMIT), w: clamp(patch.w ?? state.w, MULTIPLIERS.length - 1, 0) }
    const unchanged = next.a === state.a && next.b === state.b && next.w === state.w
    return { ...next, prediction: unchanged ? state.prediction : null }
}

export const multiplierOf = (state: Pick<TurnState, 'w'>) => MULTIPLIERS[state.w]
export const productOf = (state: Pick<TurnState, 'a' | 'b' | 'w'>): Complex => mul([state.a, state.b], multiplierOf(state).value)
/** How much z turns: the argument of w */
export const turnAngle = (state: Pick<TurnState, 'w'>) => argumentOf(multiplierOf(state).value) ?? 0
/** Less than 90°, 90° or more */
export const turnPrediction = (state: TurnState): Prediction => compareTo(turnAngle(state), 90)
export const stretch = (state: Pick<TurnState, 'w'>) => modulus(multiplierOf(state).value)

const at = (id: string) => MULTIPLIERS.findIndex((item) => item.id === id)
const isZero = (state: Pick<TurnState, 'a' | 'b'>) => state.a === 0 && state.b === 0

export const turnChallenges: LabChallenge<TurnState>[] = [
    { id: 104201, prompt: say('$w=i$ erabilita, eraman lehen koadranteko ${z}$ bat bigarren koadrantera.', 'Con $w=i$, lleva un ${z}$ del primer cuadrante al segundo.', 'مع $w=i$ انقل ${z}$ من الربع الأول إلى الربع الثاني.', 'With $w=i$, take a ${z}$ from the first quadrant to the second.'), hint: say('$i$ zenbakiaz biderkatzeak 90° biratzen du.', 'Multiplicar por $i$ gira 90°.', 'الضرب في $i$ دوران بزاوية 90°.', 'Multiplying by $i$ turns 90°.'), isSolved: (state) => state.w === at('i') && state.a > 0 && state.b > 0 },
    { id: 104202, prompt: say('Lortu ${z}\\cdot w=-{z}$, ${z}$ zenbakia 0 izan gabe.', 'Consigue ${z}\\cdot w=-{z}$, sin que ${z}$ sea 0.', 'احصل على ${z}\\cdot w=-{z}$ دون أن يكون ${z}$ صفرًا.', 'Make ${z}\\cdot w=-{z}$, with ${z}$ not 0.'), hint: say('Bira erdia: 180°.', 'Media vuelta: 180°.', 'نصف دورة: 180°.', 'Half a turn: 180°.'), isSolved: (state) => state.w === at('minus-one') && !isZero(state) },
    { id: 104203, prompt: say('Lortu ${z}\\cdot w$ zenbaki erreal negatiboa izatea, ${z}$ erreala izan gabe.', 'Consigue que ${z}\\cdot w$ sea un real negativo, sin que ${z}$ sea real.', 'اجعل ${z}\\cdot w$ عددًا حقيقيًا سالبًا دون أن يكون ${z}$ حقيقيًا.', 'Make ${z}\\cdot w$ a negative real number, with ${z}$ not real.'), hint: say('Argumentuen batura 180° izan behar da.', 'Los argumentos tienen que sumar 180°.', 'يجب أن يكون مجموع العمدتين 180°.', 'The arguments have to add up to 180°.'), isSolved: (state) => state.b !== 0 && Math.abs(productOf(state)[1]) < 1e-9 && productOf(state)[0] < 0 },
    { id: 104204, prompt: say('Biratu 90° eta bikoiztu modulua aldi berean.', 'Gira 90° y duplica el módulo a la vez.', 'دوّر 90° وضاعف الطويلة في الوقت نفسه.', 'Turn 90° and double the modulus at the same time.'), hint: say('Bilatu 2 modulua eta 90° argumentua dituen $w$.', 'Busca un $w$ de módulo 2 y argumento 90°.', 'ابحث عن $w$ طويلته 2 وعمدته 90°.', 'Look for a $w$ with modulus 2 and argument 90°.'), isSolved: (state) => state.w === at('two-i') && !isZero(state) },
    { id: 104205, prompt: say('Lortu ${z}\\cdot w$ erreal positiboa izatea, ${z}$ laugarren koadrantean dagoela.', 'Consigue que ${z}\\cdot w$ sea real positivo con ${z}$ en el cuarto cuadrante.', 'اجعل ${z}\\cdot w$ عددًا حقيقيًا موجبًا و${z}$ في الربع الرابع.', 'Make ${z}\\cdot w$ a positive real number with ${z}$ in the fourth quadrant.'), hint: say('Bi argumentuek bira oso bat osatu behar dute: 315° eta 45°, adibidez.', 'Los dos argumentos tienen que sumar una vuelta: 315° y 45°, por ejemplo.', 'يجب أن يكون مجموع العمدتين دورة كاملة: 315° و45° مثلًا.', 'The two arguments have to add up to a full turn: 315° and 45°, for example.'), isSolved: (state) => state.a > 0 && state.b < 0 && Math.abs(productOf(state)[1]) < 1e-9 && productOf(state)[0] > 0 }
]

const values = Array.from({ length: 2 * TURN_LIMIT + 1 }, (_, index) => index - TURN_LIMIT)
/** The multipliers whose products have whole coordinates */
const wholeMultipliers = MULTIPLIERS.map((_, index) => index).filter((index) => Number.isInteger(MULTIPLIERS[index].value[0]))

/** Endless practice: get a given product z · w */
const turnMaker: LabChallengeMaker<TurnState> = (random) => {
    for (;;) {
        const state = { a: pick(random, values), b: pick(random, values), w: pick(random, wholeMultipliers), prediction: null }
        if (isZero(state)) continue
        const target = productOf(state)
        const latex = complexLatex(target)
        return {
            prompt: say(`Lortu $${'{z}'}\\cdot w=${latex}$.`, `Consigue $${'{z}'}\\cdot w=${latex}$.`, `احصل على $${'{z}'}\\cdot w=${latex}$.`, `Make $${'{z}'}\\cdot w=${latex}$.`),
            hint: say('${z}\\cdot w$ zenbakiaren modulua $|{z}|\\cdot|w|$ da, eta haren argumentua, argumentuen batura.', 'El módulo de ${z}\\cdot w$ es $|{z}|\\cdot|w|$, y su argumento, la suma de los argumentos.', 'طويلة ${z}\\cdot w$ هي $|{z}|\\cdot|w|$، وعمدته مجموع العمدتين.', 'The modulus of ${z}\\cdot w$ is $|{z}|\\cdot|w|$, and its argument the sum of the arguments.'),
            isSolved: (current) => sameComplex(productOf(current), target),
            solution: state
        }
    }
}

export const turnExtra = freshFrom(initialTurnState, turnMaker)
