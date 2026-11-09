import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Elige u y dv: a product of two factors; the learner taps the one
   that will be u (the other is dv) and, before seeing anything, guesses
   whether the new integral ∫ v du will be easier, the same or harder.
   Then the tool shows du and v, the new integral, and the chain of
   integrands that ▶ (or the steps) walks through when parts is applied
   again: with the right u the polynomial goes down to a number (or the
   logarithm disappears); with the wrong one it goes up; with eˣ · sin x
   the starting integral I comes back after two steps. Pure data and
   logic, exported for 2.º Sociales; the drawing is in Bach2IndefiniteTools.
   ========================================================================== */

export type PartsIntegrand = 'x-exp' | 'exp-x2' | 'x-sin' | 'cos-x' | 'x-ln' | 'exp-sin'
export type PartsChoice = 0 | 1

export const PARTS_INTEGRANDS: PartsIntegrand[] = ['x-exp', 'exp-x2', 'x-sin', 'cos-x', 'x-ln', 'exp-sin']

/** What one choice of u gives */
export interface PartsBranch {
    du: string
    v: string
    /** The new integral is easier (<), the same kind (=) or harder (>) */
    outcome: Prediction
    /** LaTeX after each application of parts (one line per step, the right-hand side: = …) */
    lines: string[]
    /** The integrands on the way, for the board: the first is the starting one */
    chain: string[]
    /** The whole result, when this choice gets there */
    final?: string
}

export interface PartsSetup {
    /** The integrand in LaTeX, as the factors are written */
    latex: string
    /** The two factors, in LaTeX and on the board */
    factors: [string, string]
    board: [string, string]
    fn: (x: number) => number
    /** An antiderivative, for the tests (the final result without + k) */
    F: (x: number) => number
    branches: [PartsBranch, PartsBranch]
}

export const PARTS_SETUP: Record<PartsIntegrand, PartsSetup> = {
    'x-exp': {
        latex: 'xe^x',
        factors: ['x', 'e^x'],
        board: ['x', 'eˣ'],
        fn: (x) => x * Math.exp(x),
        F: (x) => Math.exp(x) * (x - 1),
        branches: [
            { du: 'du=dx', v: 'v=e^x', outcome: '<', lines: ['=xe^x-\\int e^x\\,dx'], chain: ['x · eˣ', 'eˣ'], final: 'e^x(x-1)+k' },
            { du: 'du=e^x\\,dx', v: 'v=\\frac{x^2}{2}', outcome: '>', lines: ['=\\frac{x^2}{2}e^x-\\int\\frac{x^2}{2}e^x\\,dx'], chain: ['x · eˣ', 'x²/2 · eˣ'] }
        ]
    },
    'exp-x2': {
        latex: 'e^xx^2',
        factors: ['e^x', 'x^2'],
        board: ['eˣ', 'x²'],
        fn: (x) => x * x * Math.exp(x),
        F: (x) => Math.exp(x) * (x * x - 2 * x + 2),
        branches: [
            { du: 'du=e^x\\,dx', v: 'v=\\frac{x^3}{3}', outcome: '>', lines: ['=\\frac{x^3}{3}e^x-\\int\\frac{x^3}{3}e^x\\,dx'], chain: ['eˣ · x²', 'x³/3 · eˣ'] },
            { du: 'du=2x\\,dx', v: 'v=e^x', outcome: '<', lines: ['=x^2e^x-\\int 2xe^x\\,dx', '=x^2e^x-2xe^x+\\int 2e^x\\,dx'], chain: ['eˣ · x²', '2x · eˣ', '2 · eˣ'], final: 'e^x(x^2-2x+2)+k' }
        ]
    },
    'x-sin': {
        latex: 'x\\sin x',
        factors: ['x', '\\sin x'],
        board: ['x', 'sin x'],
        fn: (x) => x * Math.sin(x),
        F: (x) => -x * Math.cos(x) + Math.sin(x),
        branches: [
            { du: 'du=dx', v: 'v=-\\cos x', outcome: '<', lines: ['=-x\\cos x+\\int\\cos x\\,dx'], chain: ['x · sin x', 'cos x'], final: '-x\\cos x+\\sin x+k' },
            { du: 'du=\\cos x\\,dx', v: 'v=\\frac{x^2}{2}', outcome: '>', lines: ['=\\frac{x^2}{2}\\sin x-\\int\\frac{x^2}{2}\\cos x\\,dx'], chain: ['x · sin x', 'x²/2 · cos x'] }
        ]
    },
    'cos-x': {
        latex: '\\cos x\\cdot x',
        factors: ['\\cos x', 'x'],
        board: ['cos x', 'x'],
        fn: (x) => x * Math.cos(x),
        F: (x) => x * Math.sin(x) + Math.cos(x),
        branches: [
            { du: 'du=-\\sin x\\,dx', v: 'v=\\frac{x^2}{2}', outcome: '>', lines: ['=\\frac{x^2}{2}\\cos x+\\int\\frac{x^2}{2}\\sin x\\,dx'], chain: ['cos x · x', 'x²/2 · sin x'] },
            { du: 'du=dx', v: 'v=\\sin x', outcome: '<', lines: ['=x\\sin x-\\int\\sin x\\,dx'], chain: ['cos x · x', 'sin x'], final: 'x\\sin x+\\cos x+k' }
        ]
    },
    'x-ln': {
        latex: 'x\\ln x',
        factors: ['x', '\\ln x'],
        board: ['x', 'ln x'],
        fn: (x) => x * Math.log(x),
        F: (x) => (x * x / 2) * Math.log(x) - (x * x) / 4,
        branches: [
            { du: 'du=dx', v: 'v=x\\ln x-x', outcome: '=', lines: ['\\begin{aligned}&=x(x\\ln x-x)\\\\ &\\quad-\\int(x\\ln x-x)\\,dx\\end{aligned}'], chain: ['x · ln x', 'x ln x − x'] },
            { du: 'du=\\frac{dx}{x}', v: 'v=\\frac{x^2}{2}', outcome: '<', lines: ['=\\frac{x^2}{2}\\ln x-\\int\\frac{x}{2}\\,dx'], chain: ['x · ln x', 'x/2'], final: '\\frac{x^2}{2}\\ln x-\\frac{x^2}{4}+k' }
        ]
    },
    'exp-sin': {
        latex: 'e^x\\sin x',
        factors: ['e^x', '\\sin x'],
        board: ['eˣ', 'sin x'],
        fn: (x) => Math.exp(x) * Math.sin(x),
        F: (x) => (Math.exp(x) * (Math.sin(x) - Math.cos(x))) / 2,
        branches: [
            { du: 'du=e^x\\,dx', v: 'v=-\\cos x', outcome: '=', lines: ['I=-e^x\\cos x+\\int e^x\\cos x\\,dx', 'I=-e^x\\cos x+e^x\\sin x-I'], chain: ['eˣ · sin x', 'eˣ · cos x', 'eˣ · sin x'], final: '\\frac{e^x(\\sin x-\\cos x)}{2}+k' },
            { du: 'du=\\cos x\\,dx', v: 'v=e^x', outcome: '=', lines: ['I=e^x\\sin x-\\int e^x\\cos x\\,dx', 'I=e^x\\sin x-e^x\\cos x-I'], chain: ['eˣ · sin x', 'eˣ · cos x', 'eˣ · sin x'], final: '\\frac{e^x(\\sin x-\\cos x)}{2}+k' }
        ]
    }
}

/** The factor that makes ∫ v du easier, or null when both lead back to the same integral */
export function goodChoice(integrand: PartsIntegrand): PartsChoice | null {
    const index = PARTS_SETUP[integrand].branches.findIndex((branch) => branch.outcome === '<')
    return index < 0 ? null : (index as PartsChoice)
}

/** How many times parts can be applied with this choice (the steps of its chain) */
export const maxSteps = (integrand: PartsIntegrand, choice: PartsChoice) => PARTS_SETUP[integrand].branches[choice].chain.length - 1

export interface PartsState {
    integrand: PartsIntegrand
    /** Which factor is u (the other one is dv); none until the learner taps one */
    choice: PartsChoice | null
    /** Applications of parts shown, from 1 to the chain's length */
    steps: number
    prediction: Prediction | null
}

export const initialPartsState: PartsState = { integrand: 'x-exp', choice: null, steps: 1, prediction: null }

/** A new integrand or a new u starts again (and asks for a new guess); the steps stay within the chain */
export function setParts(state: PartsState, patch: Partial<Omit<PartsState, 'prediction'>>): PartsState {
    const integrand = patch.integrand ?? state.integrand
    if (integrand !== state.integrand) return { integrand, choice: null, steps: 1, prediction: null }
    const choice = patch.choice === undefined ? state.choice : patch.choice
    if (choice !== state.choice) return { integrand, choice, steps: 1, prediction: null }
    const top = choice === null ? 1 : maxSteps(integrand, choice)
    const steps = Math.min(top, Math.max(1, Math.round(patch.steps ?? state.steps)))
    return { integrand, choice, steps, prediction: state.prediction }
}

/** The outcome the learner has to guess for the chosen u */
export const partsPrediction = (state: PartsState): Prediction => PARTS_SETUP[state.integrand].branches[state.choice ?? 0].outcome

const withIntegral = (integrand: PartsIntegrand, goal: LocalizedText): LocalizedText => {
    const f = `\\int ${PARTS_SETUP[integrand].latex}\\,dx`
    return say(`$${f}$ integralean, ${goal.eu}`, `En $${f}$, ${goal.es}`, `في $${f}$، ${goal.ar}`, `In $${f}$, ${goal.en}`)
}

const seen = (state: PartsState) => state.prediction !== null

export const partsChallenges: LabChallenge<PartsState>[] = [
    {
        id: 126101,
        prompt: withIntegral('x-exp', say('aukeratu $u$, integral berrian $x$ bat ere gera ez dadin.', 'elige $u$ para que en la integral nueva no quede ninguna $x$.', 'اختر $u$ حتى لا يبقى أي $x$ في التكامل الجديد.', 'choose $u$ so that no $x$ is left in the new integral.')),
        hint: say('Deribatzean sinplifikatzen dena da $u$.', '$u$ es lo que se simplifica al derivar.', '$u$ هو ما يبسط عند الاشتقاق.', '$u$ is what gets simpler when you differentiate it.'),
        isSolved: (state) => state.integrand === 'x-exp' && state.choice === 0 && seen(state)
    },
    {
        id: 126102,
        prompt: withIntegral('exp-x2', say('iritsi integral berehalako batera bi urratsetan.', 'llega en dos pasos a una integral inmediata.', 'صِل في خطوتين إلى تكامل مباشر.', 'reach a basic integral in two steps.')),
        hint: say('$x^2$ bi aldiz deribatuta zenbaki bat da.', '$x^2$ derivado dos veces es un número.', '$x^2$ إذا اشتققناه مرتين يصير عددًا.', '$x^2$ differentiated twice is a number.'),
        isSolved: (state) => state.integrand === 'exp-x2' && state.choice === 1 && state.steps === 2 && seen(state)
    },
    {
        id: 126103,
        prompt: withIntegral('x-ln', say('aukeratu $u$, logaritmoa desager dadin.', 'elige $u$ para que desaparezca el logaritmo.', 'اختر $u$ حتى يختفي اللوغاريتم.', 'choose $u$ so that the logarithm disappears.')),
        hint: say('$\\ln x$ deribatzean $\\frac{1}{x}$ ateratzen da.', 'Al derivar $\\ln x$ sale $\\frac{1}{x}$.', 'باشتقاق $\\ln x$ يخرج $\\frac{1}{x}$.', 'Differentiating $\\ln x$ gives $\\frac{1}{x}$.'),
        isSolved: (state) => state.integrand === 'x-ln' && state.choice === 1 && seen(state)
    },
    {
        id: 126104,
        prompt: withIntegral('exp-sin', say('aplikatu zatika bi aldiz, $I$ berriro agertu arte.', 'aplica partes dos veces, hasta que vuelva a salir $I$.', 'طبّق التجزئة مرتين حتى يعود $I$.', 'apply parts twice, until $I$ comes back.')),
        hint: say('Hemen bi aukerak balio dute; bi aldietan mota bera hartu behar da $u$ gisa.', 'Aquí valen las dos elecciones; las dos veces se toma como $u$ el mismo tipo.', 'هنا يصلح الاختياران، وفي المرتين نأخذ $u$ من النوع نفسه.', 'Both choices work here; both times take the same kind as $u$.'),
        isSolved: (state) => state.integrand === 'exp-sin' && state.choice !== null && state.steps === 2 && seen(state)
    },
    {
        id: 126105,
        prompt: withIntegral('cos-x', say('ikusi aukera txarra: lortu $x^2$ duen integral berri bat.', 'mira la mala elección: consigue una integral nueva con $x^2$.', 'انظر إلى الاختيار السيئ: احصل على تكامل جديد فيه $x^2$.', 'look at the bad choice: get a new integral with $x^2$.')),
        hint: say('$x$ integratzean, maila igo egiten da.', 'Si integras $x$, el grado sube.', 'إذا كاملت $x$ ترتفع الدرجة.', 'If you integrate $x$, the degree goes up.'),
        isSolved: (state) => state.integrand === 'cos-x' && state.choice === 0 && seen(state)
    }
]

/** Endless practice: the right u for a random product, or all the way to the result */
const partsMaker: LabChallengeMaker<PartsState> = (random) => {
    const integrand = PARTS_INTEGRANDS[randomInt(random, 0, PARTS_INTEGRANDS.length - 1)]
    const good = goodChoice(integrand)
    if (good === null) {
        const choice = randomInt(random, 0, 1) as PartsChoice
        return {
            prompt: withIntegral(integrand, say(`hartu $u=${PARTS_SETUP[integrand].factors[choice]}$, eta aplikatu zatika $I$ berriro agertu arte.`, `toma $u=${PARTS_SETUP[integrand].factors[choice]}$ y aplica partes hasta que vuelva a salir $I$.`, `خذ $u=${PARTS_SETUP[integrand].factors[choice]}$ وطبّق التجزئة حتى يعود $I$.`, `take $u=${PARTS_SETUP[integrand].factors[choice]}$ and apply parts until $I$ comes back.`)),
            hint: say('Bi urrats behar dira.', 'Hacen falta dos pasos.', 'تلزم خطوتان.', 'It takes two steps.'),
            isSolved: (state) => state.integrand === integrand && state.choice === choice && state.steps === 2 && seen(state),
            solution: { integrand, choice, steps: 2, prediction: '=' }
        }
    }
    const steps = maxSteps(integrand, good)
    const whole = random() < 0.5
    return {
        prompt: withIntegral(integrand, whole
            ? say('aukeratu $u$ ondo, eta iritsi emaitzaraino.', 'elige bien $u$ y llega hasta el resultado.', 'أحسن اختيار $u$ وصِل حتى النتيجة.', 'choose $u$ well and go all the way to the result.')
            : say('aukeratu $u$, integral berria errazagoa izan dadin.', 'elige $u$ para que la integral nueva sea más fácil.', 'اختر $u$ ليكون التكامل الجديد أسهل.', 'choose $u$ so that the new integral is easier.')),
        hint: say('$u$ deribatzean sinplifikatu behar da, eta $dv$ integratzen jakin behar da.', '$u$ tiene que simplificarse al derivar, y $dv$ hay que saber integrarlo.', 'يجب أن يبسط $u$ بالاشتقاق، وأن نعرف تكامل $dv$.', '$u$ must get simpler when differentiated, and you must know how to integrate $dv$.'),
        isSolved: (state) => state.integrand === integrand && state.choice === good && seen(state) && (!whole || state.steps === steps),
        solution: { integrand, choice: good, steps: whole ? steps : 1, prediction: '<' }
    }
}

export const partsExtra = freshFrom(initialPartsState, partsMaker)
