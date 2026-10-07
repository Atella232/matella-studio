import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { EquationsSystemsStageId } from '../lessons.tsx'
import { lcmChallenges, quadraticChallenges, solverChallenges } from '../../dbh2-ekuazioak-v2/lab/labTools.ts'

/* ==========================================================================
   Ekuazioak eta sistemak (4. DBH aplikatuak) laboratory. The step-by-step
   solver, the denominators and the discriminant come from 2. DBH with
   their own challenges. The new tools are a radical equation squared and
   checked candidate by candidate (some candidates are false), a plane
   where a point is moved until it lies on the two lines of a system (and
   the system is classified), and the reduction method: multiply each
   equation by a number until one unknown cancels when they are added.
   An equation ax + by = c is the triple [a, b, c]. Pure state logic; the
   components live next to this file. Tests in
   tests/ekuazioak-dbh4ap-lab.test.ts.
   ========================================================================== */

export type EquationsSystemsLabToolId = 'solver' | 'lcm' | 'quadratic' | 'radical' | 'plane' | 'reduction'

export interface EquationsSystemsLabTool extends LabToolInfo {
    id: EquationsSystemsLabToolId
    stage: EquationsSystemsStageId
}

const say = (eu: string, es: string, ar: string) => ({ eu, es, ar })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export const equationsSystemsLabTools: EquationsSystemsLabTool[] = [
    { id: 'solver', stage: 'first-degree', lessonTopic: 'brackets', title: say('Urratsez urrats', 'Paso a paso', 'خطوة بخطوة'), observe: say('Urrats bakoitzean ekuazio baliokide bat lortzen da. Saiatu ebazpena idazten urrats guztiak ikusi aurretik.', 'En cada paso se obtiene una ecuación equivalente. Intenta escribir la solución antes de ver todos los pasos.', 'في كل خطوة نحصل على معادلة مكافئة. حاول كتابة الحل قبل رؤية كل الخطوات.') },
    { id: 'lcm', stage: 'first-degree', lessonTopic: 'denominators', title: say('Izendatzaileak kendu', 'Quitar denominadores', 'حذف المقامات'), observe: say('Izendatzaile guztien multiplo batez biderkatzean, zatiki guztiak desagertzen dira. MKTa da horrelako zenbakirik txikiena.', 'Al multiplicar por un múltiplo de todos los denominadores, desaparecen todas las fracciones. El m.c.m. es el menor de esos números.', 'عند الضرب في مضاعف لكل المقامات تختفي كل الكسور. والمضاعف المشترك الأصغر أصغر هذه الأعداد.') },
    { id: 'quadratic', stage: 'quadratic', lessonTopic: 'discriminant', title: say('Diskriminatzailea', 'El discriminante', 'المميّز'), observe: say('Aldatu a, b eta c: parabolak x ardatza bi puntutan, puntu batean edo inon ez du ebakitzen, Δ positiboa, 0 edo negatiboa den arabera.', 'Cambia a, b y c: la parábola corta el eje x en dos puntos, en uno o en ninguno según Δ sea positivo, 0 o negativo.', 'غيّر a وb وc: يقطع القطع المكافئ محور x في نقطتين أو نقطة أو لا يقطعه بحسب كون Δ موجبًا أو 0 أو سالبًا.') },
    { id: 'radical', stage: 'other', lessonTopic: 'radical', title: say('Erroak eta egiaztapena', 'Raíces y comprobación', 'الجذور والتحقق'), observe: say('Karratura jasotzean 2. mailako ekuazio bat ateratzen da, baina haren ebazpen guztiek ez dute balio: erroa ezin da negatiboa izan. Egiaztatu hautagai bakoitza.', 'Al elevar al cuadrado sale una ecuación de 2.º grado, pero no todas sus soluciones valen: una raíz no puede ser negativa. Comprueba cada candidato.', 'بالتربيع تظهر معادلة من الدرجة الثانية، لكن ليست كل حلولها صالحة: الجذر لا يكون سالبًا. تحقّق من كل مرشح.') },
    { id: 'plane', stage: 'systems', lessonTopic: 'graphic', title: say('Sistemak planoan', 'Sistemas en el plano', 'الأنظمة في المستوى'), observe: say('Puntu bat ekuazio baten ebazpena da haren zuzenean badago. Sistemaren ebazpena bi zuzenetan dagoen puntua da: ebaki-puntua.', 'Un punto es solución de una ecuación si está en su recta. La solución del sistema es el punto que está en las dos rectas: el punto de corte.', 'النقطة حل لمعادلة إذا كانت على مستقيمها. وحل النظام النقطة التي على المستقيمين: نقطة التقاطع.') },
    { id: 'reduction', stage: 'methods', lessonTopic: 'reduction', title: say('Laburketa-metodoa', 'Método de reducción', 'طريقة الحذف'), observe: say('Bi ekuazioak zenbaki egokiez biderkatuta eta batuta, ezezagun bat desagertzen da. Koefizienteen MKTak ematen ditu zenbakirik txikienak.', 'Multiplicando las dos ecuaciones por los números adecuados y sumándolas, desaparece una incógnita. El m.c.m. de los coeficientes da los números más pequeños.', 'بضرب المعادلتين في عددين مناسبين وجمعهما يختفي مجهول. والمضاعف المشترك للمعاملات يعطي أصغر الأعداد.') }
]

export const equationsSystemsLabToolForTopic: Record<string, EquationsSystemsLabToolId | undefined> = {
    brackets: 'solver',
    denominators: 'lcm',
    'linear-problems': 'solver',
    incomplete: 'quadratic',
    formula: 'quadratic',
    discriminant: 'quadratic',
    factored: 'quadratic',
    radical: 'radical',
    'quadratic-problems': 'quadratic',
    'two-unknowns': 'plane',
    graphic: 'plane',
    substitution: 'plane',
    equalization: 'plane',
    reduction: 'reduction',
    'system-problems': 'reduction'
}

/* ---------- Shared: a linear equation ax + by = c as LaTeX ---------- */

export type LinearEquation = readonly [number, number, number]

/** a·x as LaTeX with its sign: first term without +, 1 and −1 without the number */
function term(coefficient: number, letter: string, first: boolean): string {
    if (coefficient === 0) return ''
    const sign = coefficient < 0 ? '-' : first ? '' : '+'
    const size = Math.abs(coefficient)
    return `${sign}${size === 1 && letter ? '' : size}${letter}`
}

export function linearLatex([a, b, c]: LinearEquation): string {
    const left = `${term(a, 'x', true)}${term(b, 'y', a === 0)}` || '0'
    return `${left}=${c}`
}

export const satisfies = ([a, b, c]: LinearEquation, x: number, y: number) => a * x + b * y === c

/* ---------- 1. Radical equations: √(ax + b) = x + c ---------- */

export interface RadicalEquation {
    a: number
    b: number
    c: number
}

export const radicalEquations: RadicalEquation[] = [
    { a: 1, b: 2, c: 0 },
    { a: 1, b: 1, c: -5 },
    { a: 4, b: 5, c: 2 },
    { a: 2, b: -1, c: -2 },
    { a: 1, b: 7, c: 1 }
]

/** The quadratic after squaring: x² + (2c − a)x + (c² − b) = 0, as [1, p, q] */
export const squaredQuadratic = ({ a, b, c }: RadicalEquation): [number, number, number] => [1, 2 * c - a, c * c - b]

/** Integer roots of the squared equation, smallest first (all the equations in the list have them) */
export function radicalCandidates(equation: RadicalEquation): number[] {
    const [, p, q] = squaredQuadratic(equation)
    const delta = p * p - 4 * q
    if (delta < 0) return []
    const root = Math.sqrt(delta)
    return [...new Set([(-p - root) / 2, (-p + root) / 2])].sort((x, y) => x - y)
}

/** A candidate is a true solution when the root exists and equals the right side */
export function isTrueSolution({ a, b, c }: RadicalEquation, x: number): boolean {
    const inside = a * x + b
    return inside >= 0 && Math.sqrt(inside) === x + c
}

export interface RadicalState {
    equation: number
    /** Equations already squared */
    squared: number[]
    /** Candidates checked, per equation */
    checked: Record<number, number[]>
}

export const initialRadicalState: RadicalState = { equation: 0, squared: [], checked: {} }

export const chooseRadical = (state: RadicalState, equation: number): RadicalState => ({ ...state, equation: clamp(equation, 0, radicalEquations.length - 1) })

export const squareRadical = (state: RadicalState): RadicalState => (state.squared.includes(state.equation) ? state : { ...state, squared: [...state.squared, state.equation] })

export function checkCandidate(state: RadicalState, x: number): RadicalState {
    if (!state.squared.includes(state.equation) || !radicalCandidates(radicalEquations[state.equation]).includes(x)) return state
    const done = state.checked[state.equation] ?? []
    return done.includes(x) ? state : { ...state, checked: { ...state.checked, [state.equation]: [...done, x] } }
}

/** Every candidate of the equation has been checked */
export const radicalSolved = (state: RadicalState, equation: number) => radicalCandidates(radicalEquations[equation]).every((x) => (state.checked[equation] ?? []).includes(x))

export const radicalChallenges: LabChallenge<RadicalState>[] = [
    {
        id: 47101,
        prompt: say('Aurkitu ebazpen faltsu bat: karratura jaso ondoren ateratzen den baina hasierako ekuazioa betetzen ez duen zenbaki bat.', 'Encuentra una solución falsa: un número que sale al elevar al cuadrado pero no cumple la ecuación inicial.', 'جد حلًّا زائفًا: عددًا يظهر بعد التربيع لكنه لا يحقق المعادلة الأصلية.'),
        hint: say('Lehen ekuazioan, probatu $x=-1$.', 'En la primera ecuación, prueba $x=-1$.', 'في المعادلة الأولى جرّب $x=-1$.'),
        isSolved: (state) => radicalEquations.some((equation, index) => (state.checked[index] ?? []).some((x) => !isTrueSolution(equation, x)))
    },
    {
        id: 47102,
        prompt: say('Ebatzi osorik $\\sqrt{x+1}=x-5$: egiaztatu bi hautagaiak.', 'Resuelve por completo $\\sqrt{x+1}=x-5$: comprueba los dos candidatos.', 'حلّ $\\sqrt{x+1}=x-5$ كاملة: تحقّق من المرشحَين.'),
        hint: say('$x^{2}-11x+24=0$: 8 eta 3.', '$x^{2}-11x+24=0$: 8 y 3.', '$x^{2}-11x+24=0$: 8 و3.'),
        isSolved: (state) => radicalSolved(state, 1)
    },
    {
        id: 47103,
        prompt: say('Aurkitu bi hautagaiak egiazkoak dituen ekuazioa eta egiaztatu biak.', 'Encuentra la ecuación cuyos dos candidatos son verdaderos y compruébalos.', 'جد المعادلة التي مرشحاها صحيحان وتحقّق منهما.'),
        hint: say('$\\sqrt{4x+5}=x+2$', '$\\sqrt{4x+5}=x+2$', '$\\sqrt{4x+5}=x+2$'),
        isSolved: (state) => radicalSolved(state, 2)
    },
    {
        id: 47104,
        prompt: say('Ebatzi osorik bost ekuazioetatik lau.', 'Resuelve por completo cuatro de las cinco ecuaciones.', 'حلّ أربعًا من المعادلات الخمس كاملة.'),
        hint: say('Ekuazio bakoitzean: karratura jaso eta egiaztatu hautagai guztiak.', 'En cada ecuación: eleva al cuadrado y comprueba todos los candidatos.', 'في كل معادلة: ربّع وتحقّق من كل المرشحين.'),
        isSolved: (state) => radicalEquations.filter((_, index) => radicalSolved(state, index)).length >= 4
    }
]

/* ---------- 2. Systems on the plane ---------- */

export type SystemKind = 'one' | 'none' | 'infinite'

export interface LinearSystem {
    first: LinearEquation
    second: LinearEquation
}

export const planeSystems: LinearSystem[] = [
    { first: [1, 1, 4], second: [1, -1, 2] },
    { first: [2, 1, 1], second: [1, -1, 5] },
    { first: [1, 2, 5], second: [3, -1, 1] },
    { first: [1, 1, 1], second: [1, 1, 3] },
    { first: [1, 2, 3], second: [2, 4, 6] }
]

export const PLANE_LIMIT = 5

/** The kind of a system from its coefficients: proportional left sides make parallel or equal lines */
export function systemKind({ first, second }: LinearSystem): SystemKind {
    const [a1, b1, c1] = first
    const [a2, b2, c2] = second
    if (a1 * b2 - a2 * b1 !== 0) return 'one'
    return a1 * c2 - a2 * c1 === 0 && b1 * c2 - b2 * c1 === 0 ? 'infinite' : 'none'
}

export interface PlaneState {
    system: number
    x: number
    y: number
    /** Points found on both lines, per system, as "x,y" */
    hits: Record<number, string[]>
    /** The kind chosen for each system */
    kinds: Record<number, SystemKind>
}

export const initialPlaneState: PlaneState = { system: 0, x: 0, y: 0, hits: {}, kinds: {} }

export const choosePlaneSystem = (state: PlaneState, system: number): PlaneState => ({ ...state, system: clamp(system, 0, planeSystems.length - 1) })

/** Moves the point and remembers it when it lies on both lines */
export function movePoint(state: PlaneState, x: number, y: number): PlaneState {
    const next = { ...state, x: clamp(x, -PLANE_LIMIT, PLANE_LIMIT), y: clamp(y, -PLANE_LIMIT, PLANE_LIMIT) }
    const { first, second } = planeSystems[state.system]
    if (!satisfies(first, next.x, next.y) || !satisfies(second, next.x, next.y)) return next
    const key = `${next.x},${next.y}`
    const found = state.hits[state.system] ?? []
    return found.includes(key) ? next : { ...next, hits: { ...state.hits, [state.system]: [...found, key] } }
}

export const chooseKind = (state: PlaneState, kind: SystemKind): PlaneState => ({ ...state, kinds: { ...state.kinds, [state.system]: kind } })

export const planeChallenges: LabChallenge<PlaneState>[] = [
    {
        id: 47201,
        prompt: say('Eraman puntua $x+y=4$, $x-y=2$ sistemaren ebazpenera.', 'Lleva el punto a la solución del sistema $x+y=4$, $x-y=2$.', 'انقل النقطة إلى حل النظام $x+y=4$ و$x-y=2$.'),
        hint: say('Bi zuzenak ebakitzen diren puntua.', 'El punto donde se cortan las dos rectas.', 'النقطة التي يتقاطع فيها المستقيمان.'),
        isSolved: (state) => (state.hits[0] ?? []).length > 0
    },
    {
        id: 47202,
        prompt: say('Aurkitu $2x+y=1$, $x-y=5$ sistemaren ebazpena.', 'Encuentra la solución del sistema $2x+y=1$, $x-y=5$.', 'جد حل النظام $2x+y=1$ و$x-y=5$.'),
        hint: say('y negatiboa da.', 'La y es negativa.', 'قيمة y سالبة.'),
        isSolved: (state) => (state.hits[1] ?? []).length > 0
    },
    {
        id: 47203,
        prompt: say('$x+2y=3$, $2x+4y=6$ sisteman, aurkitu bi ebazpen desberdin.', 'En el sistema $x+2y=3$, $2x+4y=6$, encuentra dos soluciones distintas.', 'في النظام $x+2y=3$ و$2x+4y=6$ جد حلين مختلفين.'),
        hint: say('Zuzen berdinak dira: zuzenaren edozein puntuk balio du, adibidez $(3, 0)$ eta $(1, 1)$.', 'Las rectas coinciden: vale cualquier punto de la recta, por ejemplo $(3, 0)$ y $(1, 1)$.', 'المستقيمان منطبقان: تصلح أي نقطة منه، مثل $(3, 0)$ و$(1, 1)$.'),
        isSolved: (state) => (state.hits[4] ?? []).length >= 2
    },
    {
        id: 47204,
        prompt: say('Sailkatu bost sistemak ondo: ebazpen bat, bat ere ez edo infinitu.', 'Clasifica bien los cinco sistemas: una solución, ninguna o infinitas.', 'صنّف الأنظمة الخمسة تصنيفًا صحيحًا: حل واحد أو لا حل أو ما لا نهاية.'),
        hint: say('Zuzenak ebakitzen dira, paraleloak dira edo bat datoz.', 'Las rectas se cortan, son paralelas o coinciden.', 'المستقيمان متقاطعان أو متوازيان أو منطبقان.'),
        isSolved: (state) => planeSystems.every((system, index) => state.kinds[index] === systemKind(system))
    }
]

/* ---------- 3. The reduction method ---------- */

export const reductionSystems: LinearSystem[] = [
    { first: [3, 2, 13], second: [5, -4, 7] },
    { first: [2, 3, 8], second: [3, -2, -1] },
    { first: [1, 1, 10], second: [1, -1, 4] },
    { first: [2, 5, 1], second: [3, -5, 14] },
    { first: [4, 3, 18], second: [3, 2, 13] }
]

export const MULTIPLIER_LIMIT = 6

export interface ReductionState {
    system: number
    m1: number
    m2: number
    /** Unknowns eliminated, per system */
    eliminated: Record<number, Array<'x' | 'y'>>
}

export const initialReductionState: ReductionState = { system: 0, m1: 1, m2: 1, eliminated: {} }

const scale = ([a, b, c]: LinearEquation, k: number): LinearEquation => [a * k, b * k, c * k]

/** The two scaled equations and their sum */
export function reductionRows(state: Pick<ReductionState, 'system' | 'm1' | 'm2'>): { first: LinearEquation; second: LinearEquation; sum: LinearEquation } {
    const system = reductionSystems[state.system]
    const first = scale(system.first, state.m1)
    const second = scale(system.second, state.m2)
    return { first, second, sum: [first[0] + second[0], first[1] + second[1], first[2] + second[2]] }
}

/** The solution of a system (all of them have one) */
export function reductionSolution({ first, second }: LinearSystem): { x: number; y: number } {
    const [a1, b1, c1] = first
    const [a2, b2, c2] = second
    const det = a1 * b2 - a2 * b1
    return { x: (c1 * b2 - c2 * b1) / det, y: (a1 * c2 - a2 * c1) / det }
}

/** Which unknown disappears with these multipliers, if any */
export function eliminatedUnknown(state: Pick<ReductionState, 'system' | 'm1' | 'm2'>): 'x' | 'y' | null {
    const [a, b] = reductionRows(state).sum
    if (a === 0 && b !== 0) return 'x'
    if (b === 0 && a !== 0) return 'y'
    return null
}

/** Multipliers skip 0: multiplying an equation by 0 loses it */
export function setMultipliers(state: ReductionState, patch: Partial<Pick<ReductionState, 'm1' | 'm2' | 'system'>>): ReductionState {
    const fix = (value: number, previous: number) => {
        const next = clamp(value, -MULTIPLIER_LIMIT, MULTIPLIER_LIMIT)
        return next === 0 ? (value < previous ? -1 : 1) : next
    }
    const system = patch.system === undefined ? state.system : clamp(patch.system, 0, reductionSystems.length - 1)
    const next: ReductionState = {
        ...state,
        system,
        m1: patch.system !== undefined ? 1 : fix(patch.m1 ?? state.m1, state.m1),
        m2: patch.system !== undefined ? 1 : fix(patch.m2 ?? state.m2, state.m2)
    }
    const gone = eliminatedUnknown(next)
    const done = next.eliminated[system] ?? []
    return gone && !done.includes(gone) ? { ...next, eliminated: { ...next.eliminated, [system]: [...done, gone] } } : next
}

export const reductionChallenges: LabChallenge<ReductionState>[] = [
    {
        id: 47301,
        prompt: say('$3x+2y=13$, $5x-4y=7$ sisteman, desagerrarazi y.', 'En el sistema $3x+2y=13$, $5x-4y=7$, haz desaparecer la y.', 'في النظام $3x+2y=13$ و$5x-4y=7$ احذف y.'),
        hint: say('Biderkatu lehenengoa 2z.', 'Multiplica la primera por 2.', 'اضرب الأولى في 2.'),
        isSolved: (state) => (state.eliminated[0] ?? []).includes('y')
    },
    {
        id: 47302,
        prompt: say('Sistema berean, orain desagerrarazi x.', 'En el mismo sistema, haz desaparecer ahora la x.', 'في النظام نفسه احذف x الآن.'),
        hint: say('$5\\cdot 3=15$ eta $-3\\cdot 5=-15$.', '$5\\cdot 3=15$ y $-3\\cdot 5=-15$.', '$5\\cdot 3=15$ و$-3\\cdot 5=-15$.'),
        isSolved: (state) => (state.eliminated[0] ?? []).includes('x')
    },
    {
        id: 47303,
        prompt: say('Ebatzi $4x+3y=18$, $3x+2y=13$: bi ekuazioak biderkatu behar dira.', 'Resuelve $4x+3y=18$, $3x+2y=13$: hay que multiplicar las dos ecuaciones.', 'حلّ $4x+3y=18$ و$3x+2y=13$: يجب ضرب المعادلتين.'),
        hint: say('y desagertzeko: 2 eta −3.', 'Para quitar la y: 2 y −3.', 'لحذف y: 2 و−3.'),
        isSolved: (state) => (state.eliminated[4] ?? []).length > 0
    },
    {
        id: 47304,
        prompt: say('Desagerrarazi ezezagun bat bost sistemetan.', 'Haz desaparecer una incógnita en los cinco sistemas.', 'احذف مجهولًا في الأنظمة الخمسة.'),
        hint: say('Koefizienteak aurkakoak badira, nahikoa da 1 eta 1.', 'Si los coeficientes ya son opuestos, basta con 1 y 1.', 'إذا كان المعاملان متعاكسين يكفي 1 و1.'),
        isSolved: (state) => reductionSystems.every((_, index) => (state.eliminated[index] ?? []).length > 0)
    }
]

export const equationsSystemsLabChallengeIds: number[] = [
    ...solverChallenges,
    ...lcmChallenges,
    ...quadraticChallenges,
    ...radicalChallenges,
    ...planeChallenges,
    ...reductionChallenges
].map((challenge) => challenge.id)
