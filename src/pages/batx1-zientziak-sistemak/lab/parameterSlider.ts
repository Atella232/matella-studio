import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Parametroaren graduatzailea (El deslizador del parámetro): the
   system x + qy = r, sx + ay = b with the numbers a and b on sliders.
   E2 − s·E1 leaves (a − sq)y = b − sr: when a = sq the coefficient of y
   is 0 and the system is inconsistent (b ≠ sr) or dependent (b = sr);
   for any other a there is one solution. The learner predicts the number
   of solutions before the second line is drawn. Pure logic.
   ========================================================================== */

/** The first equation x + qy = r and the coefficient s of x in the second, sx + ay = b */
export interface ParameterSystem {
    q: number
    r: number
    s: number
}

export const PARAMETER_SYSTEMS: ParameterSystem[] = [
    { q: 2, r: 3, s: 2 },
    { q: -1, r: 2, s: 3 },
    { q: 1, r: 1, s: 3 },
    { q: -2, r: 1, s: -1 }
]

export const PARAMETER_LIMITS = { a: { min: -8, max: 8 }, b: { min: -9, max: 9 } } as const

export type ParameterKind = 'one' | 'none' | 'infinite'

export interface ParameterState {
    system: number
    a: number
    b: number
    prediction: Prediction | null
}

export const initialParameterState: ParameterState = { system: 0, a: 2, b: 5, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setParameter(state: ParameterState, patch: Partial<Omit<ParameterState, 'prediction'>>): ParameterState {
    const system = clamp(patch.system ?? state.system, 0, PARAMETER_SYSTEMS.length - 1)
    const a = clamp(patch.a ?? state.a, PARAMETER_LIMITS.a.min, PARAMETER_LIMITS.a.max)
    const b = clamp(patch.b ?? state.b, PARAMETER_LIMITS.b.min, PARAMETER_LIMITS.b.max)
    const same = system === state.system && a === state.a && b === state.b
    return { system, a, b, prediction: same ? state.prediction : null }
}

/** The coefficient of y and the right side after E2 − s·E1 */
export function reduced(state: Pick<ParameterState, 'system' | 'a' | 'b'>): { coefficient: number; right: number } {
    const { q, r, s } = PARAMETER_SYSTEMS[state.system]
    return { coefficient: state.a - s * q, right: state.b - s * r }
}

/** The value of a that makes the coefficient of y zero */
export const criticalA = (system: number) => PARAMETER_SYSTEMS[system].s * PARAMETER_SYSTEMS[system].q
/** With the critical a, the b that makes the two equations the same */
export const matchingB = (system: number) => PARAMETER_SYSTEMS[system].s * PARAMETER_SYSTEMS[system].r

export function parameterKind(state: Pick<ParameterState, 'system' | 'a' | 'b'>): ParameterKind {
    const { coefficient, right } = reduced(state)
    return coefficient !== 0 ? 'one' : right === 0 ? 'infinite' : 'none'
}

/** None (<), one (=) or infinitely many (>) solutions */
export const parameterPrediction = (state: ParameterState): Prediction => ({ none: '<', one: '=', infinite: '>' } as const)[parameterKind(state)]

/** The single solution, exact, when there is one */
export function parameterSolution(state: Pick<ParameterState, 'system' | 'a' | 'b'>): [FractionValue, FractionValue] | null {
    const { coefficient, right } = reduced(state)
    if (coefficient === 0) return null
    const { q, r } = PARAMETER_SYSTEMS[state.system]
    // y = right / coefficient; x = r − q·y
    const y = fraction(right, coefficient)
    const x = fraction(r * coefficient - q * right, coefficient)
    return [x, y]
}

const term = (value: number, name: string, first: boolean) => {
    if (value === 0) return first ? '' : ''
    const sign = value < 0 ? '-' : first ? '' : '+'
    return `${sign}${Math.abs(value) === 1 ? '' : Math.abs(value)}${name}`
}

/** The two equations in LaTeX */
export function parameterSystemLatex(state: Pick<ParameterState, 'system' | 'a' | 'b'>): [string, string] {
    const { q, r, s } = PARAMETER_SYSTEMS[state.system]
    const second = `${term(s, 'x', true)}${state.a === 0 ? '' : term(state.a, 'y', false)}`
    return [`x${term(q, 'y', false)}=${r}`, `${second}=${state.b}`]
}

/** The system with a and b as letters, for the prompts: \begin{cases}x+2y=3\\ 2x+ay=b\end{cases} */
export function parameterLetters(system: number): string {
    const { q, r, s } = PARAMETER_SYSTEMS[system]
    return `\\begin{cases}x${term(q, 'y', false)}=${r}\\\\ ${term(s, 'x', true)}+ay=b\\end{cases}`
}

/** The reduced equation in LaTeX: (a-4)y=-1 with the numbers of the state */
export const reducedLatex = (state: Pick<ParameterState, 'system' | 'a' | 'b'>) => {
    const { coefficient, right } = reduced(state)
    return `${coefficient}y=${right}`.replace(/^1y/, 'y').replace(/^-1y/, '-y')
}

/* ---------- Challenges ---------- */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const yIs = (state: ParameterState, value: number) => {
    const solution = parameterSolution(state)
    return solution !== null && solution[1].numerator === value * solution[1].denominator
}

export const parameterChallenges: LabChallenge<ParameterState>[] = [
    { id: 113201, prompt: say('1. sisteman, egin zuzenak paraleloak izan daitezen: sistema bateraezina.', 'En el sistema 1, haz que las rectas sean paralelas: sistema incompatible.', 'في النظام 1 اجعل المستقيمين متوازيين: نظام غير متوافق.', 'In system 1, make the lines parallel: an inconsistent system.'), hint: say('$y$ ezezagunaren koefizienteak 0 izan behar du: $a-4=0$.', 'El coeficiente de $y$ tiene que ser 0: $a-4=0$.', 'يجب أن يكون معامل $y$ صفرًا: $a-4=0$.', 'The coefficient of $y$ must be 0: $a-4=0$.'), isSolved: (state) => state.system === 0 && parameterKind(state) === 'none' },
    { id: 113202, prompt: say('1. sisteman, egin zuzenak bat etor daitezen.', 'En el sistema 1, haz que las rectas coincidan.', 'في النظام 1 اجعل المستقيمين منطبقين.', 'In system 1, make the lines coincide.'), hint: say('$a=4$, eta eskuinean ere 0: $b-6=0$.', '$a=4$, y a la derecha también 0: $b-6=0$.', '$a=4$، وفي اليمين صفر أيضًا: $b-6=0$.', '$a=4$, and 0 on the right too: $b-6=0$.'), isSolved: (state) => state.system === 0 && parameterKind(state) === 'infinite' },
    { id: 113203, prompt: say('1. sisteman, $b=5$ dela, aukeratu $a$ soluzioak $y=1$ izan dezan.', 'En el sistema 1, con $b=5$, elige $a$ para que la solución tenga $y=1$.', 'في النظام 1 ومع $b=5$ اختر $a$ ليكون في الحل $y=1$.', 'In system 1, with $b=5$, choose $a$ so that the solution has $y=1$.'), hint: same('$(a-4)\\cdot 1=-1$'), isSolved: (state) => state.system === 0 && state.b === 5 && yIs(state, 1) },
    { id: 113204, prompt: say('2. sisteman, egin sistemak infinitu soluzio izan ditzan.', 'En el sistema 2, haz que el sistema tenga infinitas soluciones.', 'في النظام 2 اجعل للنظام ما لا نهاية من الحلول.', 'In system 2, make the system have infinitely many solutions.'), hint: say('$E_2-3E_1$ eragiketak $(a+3)y=b-6$ ematen du.', '$E_2-3E_1$ da $(a+3)y=b-6$.', 'تعطي $E_2-3E_1$ المعادلة $(a+3)y=b-6$.', '$E_2-3E_1$ gives $(a+3)y=b-6$.'), isSolved: (state) => state.system === 1 && parameterKind(state) === 'infinite' },
    { id: 113205, prompt: say('4. sisteman, $b=0$ dela, zein $a$ baliok egiten du bateraezina?', 'En el sistema 4, con $b=0$, ¿qué valor de $a$ lo hace incompatible?', 'في النظام 4 ومع $b=0$ أي قيمة لـ $a$ تجعله غير متوافق؟', 'In system 4, with $b=0$, which value of $a$ makes it inconsistent?'), hint: say('$E_2+E_1$ eragiketak $(a-2)y=b+1$ ematen du.', '$E_2+E_1$ da $(a-2)y=b+1$.', 'تعطي $E_2+E_1$ المعادلة $(a-2)y=b+1$.', '$E_2+E_1$ gives $(a-2)y=b+1$.'), isSolved: (state) => state.system === 3 && state.b === 0 && parameterKind(state) === 'none' }
]

function same(value: string): LocalizedText {
    return say(value, value, value, value)
}

type Goal = 'none' | 'infinite' | 'value'

/** Endless practice: one of the four systems made inconsistent, dependent, or with a given y */
const parameterMaker: LabChallengeMaker<ParameterState> = (random) => {
    for (;;) {
        const system = randomInt(random, 0, PARAMETER_SYSTEMS.length - 1)
        const goal = pick<Goal>(random, ['none', 'infinite', 'value'])
        const name = system + 1
        const letters = parameterLetters(system)
        const a0 = criticalA(system)
        const b0 = matchingB(system)
        if (goal === 'none') {
            const b = b0 + (b0 < PARAMETER_LIMITS.b.max ? 1 : -1)
            return {
                prompt: say(`${name}. sisteman, $${letters}$, egin sistema bateraezina.`, `En el sistema ${name}, $${letters}$, haz que sea incompatible.`, `في النظام ${name} $${letters}$ اجعله غير متوافق.`, `In system ${name}, $${letters}$, make it inconsistent.`),
                hint: say('$y$ ezezagunaren koefizienteak 0 izan behar du, eta eskuinekoak ez.', 'El coeficiente de $y$ tiene que ser 0, y el número de la derecha no.', 'يجب أن يكون معامل $y$ صفرًا، والعدد في اليمين غير صفر.', 'The coefficient of $y$ must be 0, and the number on the right must not.'),
                isSolved: (state) => state.system === system && parameterKind(state) === 'none',
                solution: setParameter(initialParameterState, { system, a: a0, b })
            }
        }
        if (goal === 'infinite') {
            return {
                prompt: say(`${name}. sisteman, $${letters}$, egin sistemak infinitu soluzio izan ditzan.`, `En el sistema ${name}, $${letters}$, haz que tenga infinitas soluciones.`, `في النظام ${name} $${letters}$ اجعل له ما لا نهاية من الحلول.`, `In system ${name}, $${letters}$, make it have infinitely many solutions.`),
                hint: say('Bi ekuazioek gauza bera esan behar dute: koefizientea eta eskuinekoa 0.', 'Las dos ecuaciones tienen que decir lo mismo: coeficiente y número de la derecha, 0.', 'يجب أن تقول المعادلتان الشيء نفسه: المعامل والعدد في اليمين صفران.', 'The two equations must say the same thing: coefficient and right-hand number 0.'),
                isSolved: (state) => state.system === system && parameterKind(state) === 'infinite',
                solution: setParameter(initialParameterState, { system, a: a0, b: b0 })
            }
        }
        // A given y with a given b: (a − sq)·y = b − sr fixes a
        const y = pick(random, [-2, -1, 1, 2])
        const a = randomInt(random, PARAMETER_LIMITS.a.min, PARAMETER_LIMITS.a.max)
        if (a === a0) continue
        const b = b0 + y * (a - a0)
        if (b < PARAMETER_LIMITS.b.min || b > PARAMETER_LIMITS.b.max) continue
        return {
            prompt: say(`${name}. sisteman, $${letters}$ eta $b=${b}$ direla, aukeratu $a$ soluzioak $y=${y}$ izan dezan.`, `En el sistema ${name}, $${letters}$, con $b=${b}$, elige $a$ para que la solución tenga $y=${y}$.`, `في النظام ${name} $${letters}$ ومع $b=${b}$ اختر $a$ ليكون في الحل $y=${y}$.`, `In system ${name}, $${letters}$, with $b=${b}$, choose $a$ so that the solution has $y=${y}$.`),
            hint: say('Mailakatu: $y$ ezezagunaren koefizientea bider $y$ eskuineko zenbakia da.', 'Escalona: el coeficiente de $y$ por $y$ es el número de la derecha.', 'حوّل إلى الشكل الدرجي: معامل $y$ ضرب $y$ يساوي العدد في اليمين.', 'Make it triangular: the coefficient of $y$ times $y$ is the number on the right.'),
            isSolved: (state) => state.system === system && state.b === b && yIs(state, y),
            solution: setParameter(initialParameterState, { system, a, b })
        }
    }
}

export const parameterExtra = freshFrom(initialParameterState, parameterMaker)
