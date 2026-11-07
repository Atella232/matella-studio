import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../text.ts'

/* ==========================================================================
   L2 · Bi makina segidan (Dos máquinas en cadena): two machines f and g
   (+3, −2, ·2, ·(−1), x²) and a number x. The top row is f ∘ g (x goes
   into g first), the bottom row g ∘ f. Before the numbers come out the
   learner predicts whether (f ∘ g)(x) is smaller than, equal to or larger
   than (g ∘ f)(x); ▶ sends x through both rows. Pure logic, whole numbers.
   ========================================================================== */

export type MachineId = 'add3' | 'sub2' | 'mul2' | 'neg' | 'square'

export const MACHINES: MachineId[] = ['add3', 'sub2', 'mul2', 'neg', 'square']
export const COMPOSITION_LIMITS = { input: { min: -5, max: 5 } } as const

export interface CompositionState {
    f: MachineId
    g: MachineId
    input: number
    prediction: Prediction | null
}

export const initialCompositionState: CompositionState = { f: 'square', g: 'add3', input: 2, prediction: null }

export function setComposition(state: CompositionState, patch: Partial<Omit<CompositionState, 'prediction'>>): CompositionState {
    const f = patch.f ?? state.f
    const g = patch.g ?? state.g
    const input = Math.min(COMPOSITION_LIMITS.input.max, Math.max(COMPOSITION_LIMITS.input.min, Math.round(patch.input ?? state.input)))
    const same = f === state.f && g === state.g && input === state.input
    return { f, g, input, prediction: same ? state.prediction : null }
}

export function applyMachine(machine: MachineId, x: number): number {
    if (machine === 'add3') return x + 3
    if (machine === 'sub2') return x - 2
    if (machine === 'mul2') return 2 * x
    if (machine === 'neg') return -x
    return x * x
}

/** The label on the machine: + 3, − 2, · 2, · (−1), x² */
export const MACHINE_LABEL: Record<MachineId, string> = { add3: '+ 3', sub2: '− 2', mul2: '· 2', neg: '· (−1)', square: 'x²' }
/** The machine as a function of x, in LaTeX */
export const MACHINE_LATEX: Record<MachineId, string> = { add3: 'x+3', sub2: 'x-2', mul2: '2x', neg: '-x', square: 'x^2' }

/** (f ∘ g)(x) = f(g(x)) */
export const fAfterG = (state: Pick<CompositionState, 'f' | 'g'>, x: number) => applyMachine(state.f, applyMachine(state.g, x))
/** (g ∘ f)(x) = g(f(x)) */
export const gAfterF = (state: Pick<CompositionState, 'f' | 'g'>, x: number) => applyMachine(state.g, applyMachine(state.f, x))

export const compositionPrediction = (state: CompositionState): Prediction => compareTo(fAfterG(state, state.input), gAfterF(state, state.input))

/** The two machines give the same in both orders for every x of the tool */
export function commute(state: Pick<CompositionState, 'f' | 'g'>): boolean {
    for (let x = COMPOSITION_LIMITS.input.min; x <= COMPOSITION_LIMITS.input.max; x += 1) if (fAfterG(state, x) !== gAfterF(state, x)) return false
    return true
}

const functions = (f: MachineId, g: MachineId) => ({ f: MACHINE_LATEX[f], g: MACHINE_LATEX[g] })

export const compositionChallenges: LabChallenge<CompositionState>[] = [
    {
        id: 108201,
        prompt: say('$f(x)=x^2$ eta $g(x)=x+3$ direnean, lortu $(f\\circ g)(x)=16$.', 'Con $f(x)=x^2$ y $g(x)=x+3$, consigue $(f\\circ g)(x)=16$.', 'مع $f(x)=x^2$ و$g(x)=x+3$ احصل على $(f\\circ g)(x)=16$.', 'With $f(x)=x^2$ and $g(x)=x+3$, get $(f\\circ g)(x)=16$.'),
        hint: say('$g$ makinak 4 eman behar du.', 'La máquina $g$ tiene que dar 4.', 'يجب أن تعطي الآلة $g$ العدد 4.', 'Machine $g$ has to give 4.'),
        isSolved: (state) => state.f === 'square' && state.g === 'add3' && fAfterG(state, state.input) === 16
    },
    {
        id: 108202,
        prompt: say('Aukeratu $f$ eta $g$, $(f\\circ g)(2)=10$ izan dadin.', 'Elige $f$ y $g$ para que $(f\\circ g)(2)=10$.', 'اختر $f$ و$g$ بحيث $(f\\circ g)(2)=10$.', 'Choose $f$ and $g$ so that $(f\\circ g)(2)=10$.'),
        hint: say('$10=2\\cdot 5$, eta 5 zenbakia 2 gehi 3 da.', '$10=2\\cdot 5$, y 5 es 2 más 3.', '$10=2\\cdot 5$، و5 هو 2 زائد 3.', '$10=2\\cdot 5$, and 5 is 2 plus 3.'),
        isSolved: (state) => state.input === 2 && fAfterG(state, 2) === 10
    },
    {
        id: 108203,
        prompt: say('$f(x)=x^2$ eta $g(x)=-x$ direnean, bilatu $x$ bat, $(f\\circ g)(x)=(g\\circ f)(x)$ izan dadin.', 'Con $f(x)=x^2$ y $g(x)=-x$, busca un $x$ con $(f\\circ g)(x)=(g\\circ f)(x)$.', 'مع $f(x)=x^2$ و$g(x)=-x$ ابحث عن $x$ بحيث $(f\\circ g)(x)=(g\\circ f)(x)$.', 'With $f(x)=x^2$ and $g(x)=-x$, find an $x$ with $(f\\circ g)(x)=(g\\circ f)(x)$.'),
        hint: say('Batak $x^2$ ematen du, eta besteak $-x^2$.', 'Una da $x^2$ y la otra, $-x^2$.', 'إحداهما تعطي $x^2$ والأخرى $-x^2$.', 'One gives $x^2$ and the other $-x^2$.'),
        isSolved: (state) => state.f === 'square' && state.g === 'neg' && state.input === 0
    },
    {
        id: 108204,
        prompt: say('Aukeratu bi makina desberdin, bi ordenetan beti gauza bera ematen dutenak.', 'Elige dos máquinas distintas que den siempre lo mismo en los dos órdenes.', 'اختر آلتين مختلفتين تعطيان دائمًا الشيء نفسه في الترتيبين.', 'Choose two different machines that always give the same in both orders.'),
        hint: say('Bi batuketa, edo bi biderketa.', 'Dos sumas, o dos multiplicaciones.', 'جمعان، أو ضربان.', 'Two additions, or two multiplications.'),
        isSolved: (state) => state.f !== state.g && commute(state)
    },
    {
        id: 108205,
        prompt: say('Deskonposatu $h(x)=(x-2)^2$: aukeratu $f$ eta $g$, $h=f\\circ g$ izan dadin.', 'Descompón $h(x)=(x-2)^2$: elige $f$ y $g$ con $h=f\\circ g$.', 'فكّك $h(x)=(x-2)^2$: اختر $f$ و$g$ بحيث $h=f\\circ g$.', 'Break down $h(x)=(x-2)^2$: choose $f$ and $g$ with $h=f\\circ g$.'),
        hint: say('Barruan, lehenik, 2 kentzen da.', 'Dentro, primero, se resta 2.', 'في الداخل، أولًا، نطرح 2.', 'Inside, first, 2 is subtracted.'),
        isSolved: (state) => state.f === 'square' && state.g === 'sub2'
    }
]

/** Endless practice: given f and g, find an x with (f ∘ g)(x) or (g ∘ f)(x) equal to a value */
const compositionMaker: LabChallengeMaker<CompositionState> = (random) => {
    for (;;) {
        const f = pick(random, MACHINES)
        const g = pick(random, MACHINES)
        if (f === g) continue
        const x = randomInt(random, -4, 4)
        const order = pick(random, ['fg', 'gf'] as const)
        const value = order === 'fg' ? fAfterG({ f, g }, x) : gAfterF({ f, g }, x)
        const { f: F, g: G } = functions(f, g)
        const composed = order === 'fg' ? '(f\\circ g)(x)' : '(g\\circ f)(x)'
        return {
            prompt: say(`$f(x)=${F}$ eta $g(x)=${G}$ direnean, lortu $${composed}=${value}$.`, `Con $f(x)=${F}$ y $g(x)=${G}$, consigue $${composed}=${value}$.`, `مع $f(x)=${F}$ و$g(x)=${G}$ احصل على $${composed}=${value}$.`, `With $f(x)=${F}$ and $g(x)=${G}$, get $${composed}=${value}$.`),
            hint: order === 'fg'
                ? say('$x$ zenbakia $g$ makinan sartzen da lehenik.', 'El número $x$ entra primero en la máquina $g$.', 'يدخل $x$ أولًا في الآلة $g$.', 'The number $x$ goes into machine $g$ first.')
                : say('$x$ zenbakia $f$ makinan sartzen da lehenik.', 'El número $x$ entra primero en la máquina $f$.', 'يدخل $x$ أولًا في الآلة $f$.', 'The number $x$ goes into machine $f$ first.'),
            isSolved: (state) => state.f === f && state.g === g && (order === 'fg' ? fAfterG(state, state.input) : gAfterF(state, state.input)) === value,
            solution: { f, g, input: x, prediction: null }
        }
    }
}

export const compositionExtra = freshFrom(initialCompositionState, compositionMaker)
