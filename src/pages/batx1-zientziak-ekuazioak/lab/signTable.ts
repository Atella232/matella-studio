import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Zeinuen taula (La tabla de signos): two or three factors (x − a)
   whose roots slide along the line; the last one can go to the
   denominator, where its root is a hole. Each factor shows its sign on
   each side of its root, and the product (or quotient) row multiplies
   them. A probe x is placed on the line and the learner first predicts the
   sign there: negative, zero (or it does not exist) or positive. Pure
   logic, whole numbers only.
   ========================================================================== */

export const SIGN_LIMITS = { root: { min: -5, max: 5 }, probe: { min: -6, max: 6 } } as const

export interface SignTableState {
    roots: [number, number, number]
    factors: 2 | 3
    /** The last factor goes to the denominator */
    denominator: boolean
    probe: number
    prediction: Prediction | null
}

export const initialSignTableState: SignTableState = { roots: [-1, 2, 4], factors: 2, denominator: false, probe: 0, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setSignTable(state: SignTableState, patch: Partial<Omit<SignTableState, 'prediction'>>): SignTableState {
    const roots = (patch.roots ?? state.roots).map((root) => clamp(root, SIGN_LIMITS.root.min, SIGN_LIMITS.root.max)) as [number, number, number]
    const factors = patch.factors ?? state.factors
    const denominator = patch.denominator ?? state.denominator
    const probe = clamp(patch.probe ?? state.probe, SIGN_LIMITS.probe.min, SIGN_LIMITS.probe.max)
    const same = roots.every((root, index) => root === state.roots[index]) && factors === state.factors && denominator === state.denominator && probe === state.probe
    return { roots, factors, denominator, probe, prediction: same ? state.prediction : null }
}

/** The roots of the factors in use */
export const activeRoots = (state: Pick<SignTableState, 'roots' | 'factors'>) => state.roots.slice(0, state.factors)
/** The root of the denominator, if there is one */
export const holeOf = (state: Pick<SignTableState, 'roots' | 'factors' | 'denominator'>) => (state.denominator ? state.roots[state.factors - 1] : null)

/** The value of the expression at x, or null where the denominator is 0 */
export function signValue(state: Pick<SignTableState, 'roots' | 'factors' | 'denominator'>, x: number): number | null {
    const roots = activeRoots(state)
    const hole = holeOf(state)
    if (hole !== null && x === hole) return null
    const top = (hole === null ? roots : roots.slice(0, -1)).reduce((total, root) => total * (x - root), 1)
    return hole === null ? top : top / (x - hole)
}

/** Negative (<), zero or not defined (=), positive (>) at the probe */
export function signPrediction(state: SignTableState): Prediction {
    const value = signValue(state, state.probe)
    return value === null ? '=' : compareTo(value, 0)
}

/** A factor x − a in LaTeX: x, x-3, x+2 */
export const factorLatex = (root: number) => (root === 0 ? 'x' : root > 0 ? `x-${root}` : `x+${-root}`)
/** A product of factors, with powers for repeated roots: x(x-2)^2 */
export function productLatex(roots: number[]): string {
    const counts = new Map<number, number>()
    for (const root of roots) counts.set(root, (counts.get(root) ?? 0) + 1)
    if (roots.length === 0) return '1'
    return [...counts.entries()].map(([root, count]) => {
        const power = count > 1 ? `^${count}` : ''
        return root === 0 ? `x${power}` : `(${factorLatex(root)})${power}`
    }).join('')
}
/** The whole expression in LaTeX */
export function expressionLatex(state: Pick<SignTableState, 'roots' | 'factors' | 'denominator'>): string {
    const roots = activeRoots(state)
    if (!state.denominator) return productLatex(roots)
    const top = roots.slice(0, -1)
    const top1 = top.length === 1 ? factorLatex(top[0]) : productLatex(top)
    return `\\frac{${top1}}{${factorLatex(roots[roots.length - 1])}}`
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const sorted = (values: number[]) => [...values].sort((a, b) => a - b)
const sameRoots = (state: SignTableState, roots: number[]) => sorted(activeRoots(state)).join() === sorted(roots).join()

export const signTableChallenges: LabChallenge<SignTableState>[] = [
    { id: 101101, prompt: say('Eraiki $x(x-2)(x+2)$.', 'Construye $x(x-2)(x+2)$.', 'ابنِ $x(x-2)(x+2)$.', 'Build $x(x-2)(x+2)$.'), hint: say('Hiru faktore, eta erroak $-2$, 0 eta 2.', 'Tres factores, con raíces $-2$, 0 y 2.', 'ثلاثة عوامل جذورها $-2$ و0 و2.', 'Three factors, with roots $-2$, 0 and 2.'), isSolved: (state) => state.factors === 3 && !state.denominator && sameRoots(state, [-2, 0, 2]) },
    { id: 101102, prompt: say('Eraiki $\\frac{x-1}{x+2}$.', 'Construye $\\frac{x-1}{x+2}$.', 'ابنِ $\\frac{x-1}{x+2}$.', 'Build $\\frac{x-1}{x+2}$.'), hint: say('Bi faktore, eta bigarrena izendatzailera.', 'Dos factores, y el segundo al denominador.', 'عاملان، والثاني في المقام.', 'Two factors, the second one in the denominator.'), isSolved: (state) => state.factors === 2 && state.denominator && state.roots[0] === 1 && state.roots[1] === -2 },
    { id: 101103, prompt: say('$(x+1)(x-3)$ adierazpenarekin, jarri zunda negatiboa den tarte batean.', 'Con $(x+1)(x-3)$, pon la sonda en un tramo donde es negativo.', 'مع $(x+1)(x-3)$ ضع المسبار في مجال تكون فيه سالبة.', 'With $(x+1)(x-3)$, put the probe on a stretch where it is negative.'), hint: say('Bi faktoreek zeinu desberdina dute erroen artean.', 'Entre las raíces, los dos factores tienen distinto signo.', 'بين الجذرين للعاملين إشارتان مختلفتان.', 'Between the roots, the two factors have different signs.'), isSolved: (state) => state.factors === 2 && !state.denominator && sameRoots(state, [-1, 3]) && (signValue(state, state.probe) ?? 0) < 0 },
    { id: 101104, prompt: say('$\\frac{x-4}{x}$ adierazpenarekin, jarri zunda existitzen ez den lekuan.', 'Con $\\frac{x-4}{x}$, pon la sonda donde no existe.', 'مع $\\frac{x-4}{x}$ ضع المسبار حيث لا توجد.', 'With $\\frac{x-4}{x}$, put the probe where it does not exist.'), hint: say('Izendatzailea 0 denean.', 'Donde el denominador vale 0.', 'حيث يساوي المقام 0.', 'Where the denominator is 0.'), isSolved: (state) => state.factors === 2 && state.denominator && state.roots[0] === 4 && state.roots[1] === 0 && state.probe === 0 },
    { id: 101105, prompt: say('Eraiki $(x-1)^2(x+3)$. Non ez du zeinua aldatzen?', 'Construye $(x-1)^2(x+3)$. ¿Dónde no cambia de signo?', 'ابنِ $(x-1)^2(x+3)$. أين لا تتغير الإشارة؟', 'Build $(x-1)^2(x+3)$. Where does it not change sign?'), hint: say('Erro bikoitzak, 1 zenbakiak, ez du zeinua aldatzen.', 'La raíz doble, el 1, no cambia el signo.', 'الجذر المضاعف 1 لا يغيّر الإشارة.', 'The double root, 1, does not change the sign.'), isSolved: (state) => state.factors === 3 && !state.denominator && sameRoots(state, [-3, 1, 1]) }
]

/** Endless practice: a product or a quotient of two factors, and a stretch with a given sign */
const signTableMaker: LabChallengeMaker<SignTableState> = (random) => {
    for (;;) {
        const a = randomInt(random, -4, 4)
        const b = randomInt(random, -4, 4)
        if (a === b) continue
        const denominator = randomInt(random, 0, 1) === 1
        const wanted = pick(random, [1, -1])
        const base: SignTableState = { roots: [a, b, 0], factors: 2, denominator, probe: 0, prediction: null }
        const probes = Array.from({ length: 13 }, (_, i) => i - 6).filter((x) => {
            const value = signValue(base, x)
            return value !== null && Math.sign(value) === wanted
        })
        if (probes.length === 0) continue
        const latex = expressionLatex(base)
        const word = wanted > 0
            ? say('positiboa', 'positivo', 'موجبة', 'positive')
            : say('negatiboa', 'negativo', 'سالبة', 'negative')
        return {
            prompt: say(`Eraiki $${latex}$ eta jarri zunda ${word.eu} den tarte batean.`, `Construye $${latex}$ y pon la sonda en un tramo donde es ${word.es}.`, `ابنِ $${latex}$ وضع المسبار في مجال تكون فيه ${word.ar}.`, `Build $${latex}$ and put the probe on a stretch where it is ${word.en}.`),
            hint: say('Biderkatu faktoreen zeinuak zundaren lekuan.', 'Multiplica los signos de los factores donde está la sonda.', 'اضرب إشارات العوامل عند المسبار.', 'Multiply the signs of the factors where the probe is.'),
            isSolved: (state) => {
                if (state.factors !== 2 || state.denominator !== denominator || state.roots[0] !== a || state.roots[1] !== b) return false
                const value = signValue(state, state.probe)
                return value !== null && Math.sign(value) === wanted
            },
            solution: { ...base, probe: pick(random, probes) }
        }
    }
}

export const signTableExtra = freshFrom(initialSignTableState, signTableMaker)
