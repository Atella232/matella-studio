import { checkAnswer, fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { freshAnswer, type LabChallenge, type LabToolInfo, type OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { linear, type Linear } from '../../dbh1-aljebra-v2/algebra.ts'
import type { EquationsStageId } from '../lessons.tsx'

/* ==========================================================================
   Ekuazioak (2. DBH) laboratory: trying values, a step-by-step solver,
   clearing denominators with the lcm, planning problems and exploring the
   discriminant. Pure state logic and challenges; components live next to
   this file. Tests in tests/ekuazioak-dbh2-lab.test.ts.
   ========================================================================== */

export type EquationsLabToolId = 'trial' | 'solver' | 'lcm' | 'problems' | 'quadratic'

export interface EquationsLabTool extends LabToolInfo {
    id: EquationsLabToolId
    stage: EquationsStageId
}

export const equationsLabTools: EquationsLabTool[] = [
    {
        id: 'trial',
        stage: 'basics',
        lessonTopic: 'meaning',
        title: { eu: 'Probatu balioak', es: 'Prueba valores', ar: 'جرّب القيم' },
        observe: {
            eu: 'Ekuazio batean bi atalak balio batzuetarako bakarrik dira berdinak. Identitate batean, beti; eta ebazpenik gabeko ekuazio batean, inoiz ez.',
            es: 'En una ecuación los dos miembros solo coinciden para algunos valores. En una identidad, siempre; y en una ecuación sin solución, nunca.',
            ar: 'في المعادلة لا يتساوى الطرفان إلا لبعض القيم. وفي المتطابقة دائمًا، وفي المعادلة التي لا حل لها أبدًا.'
        }
    },
    {
        id: 'solver',
        stage: 'first-degree',
        lessonTopic: 'brackets',
        title: { eu: 'Urratsez urrats', es: 'Paso a paso', ar: 'خطوة بخطوة' },
        observe: {
            eu: 'Urrats bakoitzean ekuazio baliokide bat lortzen da. Saiatu ebazpena idazten urrats guztiak ikusi aurretik.',
            es: 'En cada paso se obtiene una ecuación equivalente. Intenta escribir la solución antes de ver todos los pasos.',
            ar: 'في كل خطوة نحصل على معادلة مكافئة. حاول كتابة الحل قبل رؤية كل الخطوات.'
        }
    },
    {
        id: 'lcm',
        stage: 'denominators',
        lessonTopic: 'lcm',
        title: { eu: 'Izendatzaileak kendu', es: 'Quitar denominadores', ar: 'حذف المقامات' },
        observe: {
            eu: 'Zenbaki batez biderkatzean, izendatzaile guztien multiploa bada, zatiki guztiak desagertzen dira. MKTa da horrelako zenbakirik txikiena.',
            es: 'Al multiplicar por un número que sea múltiplo de todos los denominadores, desaparecen todas las fracciones. El m.c.m. es el menor de esos números.',
            ar: 'عند الضرب في عدد مضاعف لكل المقامات تختفي كل الكسور. وم.م.أ هو أصغر هذه الأعداد.'
        }
    },
    {
        id: 'problems',
        stage: 'problems',
        lessonTopic: 'problem-steps',
        title: { eu: 'Buruketak planteatu', es: 'Plantea problemas', ar: 'صياغة المسائل' },
        observe: {
            eu: 'Lehenik erabaki zer den x, gero aukeratu enuntziatua ondo itzultzen duen ekuazioa, eta azkenik ebatzi.',
            es: 'Primero decide qué es x, después elige la ecuación que traduce bien el enunciado y al final resuélvela.',
            ar: 'حدّد أولًا ما هو x، ثم اختر المعادلة التي تترجم النص جيدًا، وأخيرًا حلّها.'
        }
    },
    {
        id: 'quadratic',
        stage: 'quadratic',
        lessonTopic: 'formula',
        title: { eu: 'Diskriminatzailea', es: 'El discriminante', ar: 'المميّز' },
        observe: {
            eu: 'Aldatu a, b eta c: parabolak x ardatza bi puntutan, puntu batean edo inon ez du ebakitzen, Δ positiboa, 0 edo negatiboa den arabera.',
            es: 'Cambia a, b y c: la parábola corta el eje x en dos puntos, en uno o en ninguno según Δ sea positivo, 0 o negativo.',
            ar: 'غيّر a وb وc: يقطع القطع المكافئ محور x في نقطتين أو نقطة أو لا يقطعه بحسب كون Δ موجبًا أو 0 أو سالبًا.'
        }
    }
]

export const equationsLabToolForTopic: Record<string, EquationsLabToolId | undefined> = {
    meaning: 'trial',
    elements: 'trial',
    simple: 'solver',
    brackets: 'solver',
    special: 'trial',
    denominators: 'lcm',
    lcm: 'lcm',
    mixed: 'lcm',
    'problem-steps': 'problems',
    'problems-ages': 'problems',
    'problems-geometry': 'problems',
    quadratic: 'quadratic',
    incomplete: 'quadratic',
    formula: 'quadratic'
}

const answered = (state: OperationAnswer, expected: FractionValue) => checkAnswer(state.answer, expected) === 'correct'
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/* ---------- Trying values ---------- */

export interface TrialEquation {
    latex: string
    left: (x: number) => number
    right: (x: number) => number
}

export const trialEquations: TrialEquation[] = [
    { latex: '2x+5=3x+2', left: (x) => 2 * x + 5, right: (x) => 3 * x + 2 },
    { latex: '2(x+1)=2x+2', left: (x) => 2 * (x + 1), right: (x) => 2 * x + 2 },
    { latex: 'x+1=x+3', left: (x) => x + 1, right: (x) => x + 3 },
    { latex: 'x^{2}+2x+1=4', left: (x) => x * x + 2 * x + 1, right: () => 4 },
    { latex: 'x^{2}-5x+6=0', left: (x) => x * x - 5 * x + 6, right: () => 0 }
]

export const TRIAL_LIMITS = { min: -6, max: 10 } as const

export interface TrialState {
    equation: number
    x: number
    /** Values tried for each equation */
    tried: Record<number, number[]>
}

export const initialTrialState: TrialState = { equation: 0, x: 0, tried: {} }

export function tryValue(state: TrialState, x: number): TrialState {
    const next = clamp(x, TRIAL_LIMITS.min, TRIAL_LIMITS.max)
    const tried = state.tried[state.equation] ?? []
    return { ...state, x: next, tried: { ...state.tried, [state.equation]: tried.includes(next) ? tried : [...tried, next] } }
}

export const setTrialEquation = (state: TrialState, equation: number): TrialState => ({ ...state, equation: clamp(equation, 0, trialEquations.length - 1), x: 0 })

export function trialSides(state: Pick<TrialState, 'equation' | 'x'>): { left: number; right: number } {
    const equation = trialEquations[state.equation]
    return { left: equation.left(state.x), right: equation.right(state.x) }
}

/** Tried values that make both sides equal */
export const foundSolutions = (state: TrialState, equation: number) => (state.tried[equation] ?? []).filter((x) => trialEquations[equation].left(x) === trialEquations[equation].right(x))

export const trialChallenges: LabChallenge<TrialState>[] = [
    {
        id: 28101,
        prompt: { eu: 'Aurkitu $2x+5=3x+2$ ekuazioaren ebazpena.', es: 'Encuentra la solución de $2x+5=3x+2$.', ar: 'جد حل $2x+5=3x+2$.' },
        hint: { eu: 'Probatu 1, 2, 3…', es: 'Prueba 1, 2, 3…', ar: 'جرّب 1، 2، 3…' },
        isSolved: (state) => foundSolutions(state, 0).includes(3)
    },
    {
        id: 28102,
        prompt: { eu: 'Probatu hiru balio $2(x+1)=2x+2$ identitatean: zer gertatzen da?', es: 'Prueba tres valores en la identidad $2(x+1)=2x+2$: ¿qué pasa?', ar: 'جرّب ثلاث قيم في المتطابقة $2(x+1)=2x+2$: ماذا يحدث؟' },
        hint: { eu: 'Edozein balio.', es: 'Cualquier valor.', ar: 'أي قيمة.' },
        isSolved: (state) => foundSolutions(state, 1).length >= 3
    },
    {
        id: 28103,
        prompt: { eu: 'Aurkitu $x^{2}+2x+1=4$ ekuazioaren bi ebazpenak.', es: 'Encuentra las dos soluciones de $x^{2}+2x+1=4$.', ar: 'جد حلّي $x^{2}+2x+1=4$.' },
        hint: { eu: 'Bat positiboa da eta bestea negatiboa.', es: 'Una es positiva y la otra negativa.', ar: 'أحدهما موجب والآخر سالب.' },
        isSolved: (state) => foundSolutions(state, 3).length === 2
    },
    {
        id: 28104,
        prompt: { eu: 'Probatu bost balio $x+1=x+3$ ekuazioan. Zergatik ez dago ebazpenik?', es: 'Prueba cinco valores en $x+1=x+3$. ¿Por qué no hay solución?', ar: 'جرّب خمس قيم في $x+1=x+3$. لماذا لا يوجد حل؟' },
        hint: { eu: 'Bigarren atala beti da 2 handiagoa.', es: 'El segundo miembro siempre es 2 más.', ar: 'الطرف الثاني دائمًا أكبر بـ 2.' },
        isSolved: (state) => (state.tried[2]?.length ?? 0) >= 5
    }
]

/* ---------- Step-by-step solver ---------- */

export interface SolverEquation {
    latex: string
    /** The equation once the brackets are removed, when there were any */
    expanded?: string
    left: Linear
    right: Linear
}

export const solverEquations: SolverEquation[] = [
    { latex: '5x-4=2x+11', left: linear(5, -4), right: linear(2, 11) },
    { latex: '4x-7=3-x', left: linear(4, -7), right: linear(-1, 3) },
    { latex: '3(x-2)-(x-4)=8', expanded: '3x-6-x+4=8', left: linear(2, -2), right: linear(0, 8) },
    { latex: '2(3x-1)=4(x+2)', expanded: '6x-2=4x+8', left: linear(6, -2), right: linear(4, 8) },
    { latex: '3-2(x+1)=x-8', expanded: '3-2x-2=x-8', left: linear(-2, 1), right: linear(1, -8) }
]

export interface SolverState extends OperationAnswer {
    equation: number
    /** How many steps are shown */
    shown: number
    /** Equations solved by typing x, and whether before the last step */
    solved: number[]
    early: number[]
}

export const initialSolverState: SolverState = { equation: 0, shown: 1, solved: [], early: [], ...freshAnswer }

export const solverSolution = (equation: SolverEquation): FractionValue => fraction(equation.right.b - equation.left.b, equation.left.a - equation.right.a)

/** Number of lines: the equation, the expanded one (if any), grouped, reduced and x */
export const solverStepCount = (equation: SolverEquation) => (equation.expanded ? 5 : 4)

export const setSolverEquation = (state: SolverState, equation: number): SolverState => ({ ...state, equation: clamp(equation, 0, solverEquations.length - 1), shown: 1, ...freshAnswer })

export const nextSolverStep = (state: SolverState): SolverState => ({ ...state, shown: Math.min(solverStepCount(solverEquations[state.equation]), state.shown + 1) })

export function answerSolver(state: SolverState, patch: Partial<OperationAnswer>): SolverState {
    const next = { ...state, ...patch }
    const equation = solverEquations[next.equation]
    if (!next.checked || next.revealed || !answered(next, solverSolution(equation)) || next.solved.includes(next.equation)) return next
    const early = next.shown < solverStepCount(equation)
    return { ...next, solved: [...next.solved, next.equation], early: early ? [...next.early, next.equation] : next.early }
}

export const solverChallenges: LabChallenge<SolverState>[] = [
    {
        id: 28201,
        prompt: { eu: 'Ebatzi $5x-4=2x+11$ eta idatzi x.', es: 'Resuelve $5x-4=2x+11$ y escribe x.', ar: 'حلّ $5x-4=2x+11$ واكتب x.' },
        hint: { eu: 'Ikusi urratsak bata bestearen atzetik.', es: 'Mira los pasos uno detrás de otro.', ar: 'انظر إلى الخطوات واحدة تلو الأخرى.' },
        isSolved: (state) => state.solved.includes(0)
    },
    {
        id: 28202,
        prompt: { eu: 'Ebatzi parentesiak dituzten bi ekuazio.', es: 'Resuelve dos ecuaciones con paréntesis.', ar: 'حلّ معادلتين بأقواس.' },
        hint: { eu: 'Lehen urratsa: parentesiak kendu.', es: 'Primer paso: quitar paréntesis.', ar: 'الخطوة الأولى: حذف الأقواس.' },
        isSolved: (state) => state.solved.filter((index) => solverEquations[index].expanded).length >= 2
    },
    {
        id: 28203,
        prompt: { eu: 'Ebatzi $3-2(x+1)=x-8$: x-ren koefizientea negatiboa geratzen da.', es: 'Resuelve $3-2(x+1)=x-8$: el coeficiente de x queda negativo.', ar: 'حلّ $3-2(x+1)=x-8$: يبقى معامل x سالبًا.' },
        hint: { eu: 'Negatiboa zati negatiboa: positiboa.', es: 'Negativo entre negativo: positivo.', ar: 'سالب على سالب: موجب.' },
        isSolved: (state) => state.solved.includes(4)
    },
    {
        id: 28204,
        prompt: { eu: 'Ebatzi bi ekuazio azken urratsa ikusi gabe.', es: 'Resuelve dos ecuaciones sin ver el último paso.', ar: 'حلّ معادلتين دون رؤية الخطوة الأخيرة.' },
        hint: { eu: 'Idatzi x urrats guztiak agertu aurretik.', es: 'Escribe x antes de que salgan todos los pasos.', ar: 'اكتب x قبل ظهور كل الخطوات.' },
        isSolved: (state) => state.early.length >= 2
    }
]

/* ---------- Clearing denominators ---------- */

/** sign · (a·x + b) / d */
export interface FractionTerm {
    sign: 1 | -1
    numerator: Linear
    denominator: number
}

export interface LcmEquation {
    left: FractionTerm[]
    right: FractionTerm[]
}

const term = (a: number, b: number, denominator: number, sign: 1 | -1 = 1): FractionTerm => ({ sign, numerator: linear(a, b), denominator })

export const lcmEquations: LcmEquation[] = [
    { left: [term(1, 0, 2), term(1, 0, 3)], right: [term(0, 5, 1)] },
    { left: [term(1, 0, 4), term(1, 0, 6, -1)], right: [term(0, 1, 1)] },
    { left: [term(1, 1, 2), term(1, -3, 4, -1)], right: [term(0, 3, 1)] },
    { left: [term(1, -1, 2), term(1, 2, 3, -1)], right: [term(0, 1, 1)] }
]

export const MULTIPLIER_LIMITS = { min: 1, max: 36 } as const

export interface LcmState {
    equation: number
    multiplier: number
    /** Equations cleared with their lcm, and with a bigger common multiple */
    cleared: number[]
    clearedBigger: number[]
}

export const initialLcmState: LcmState = { equation: 0, multiplier: 1, cleared: [], clearedBigger: [] }

const gcd = (left: number, right: number): number => (right === 0 ? left : gcd(right, left % right))
export const lcmOf = (values: number[]) => values.reduce((result, value) => (result * value) / gcd(result, value), 1)
export const equationLcm = (equation: LcmEquation) => lcmOf([...equation.left, ...equation.right].map((item) => item.denominator))
export const clearsAll = (equation: LcmEquation, multiplier: number) => [...equation.left, ...equation.right].every((item) => multiplier % item.denominator === 0)

/** a·x + b of one side after multiplying by m (only meaningful when m clears every denominator) */
export function clearedSide(terms: FractionTerm[], multiplier: number): Linear {
    return terms.reduce((sum, item) => {
        const factor = (item.sign * multiplier) / item.denominator
        return { a: sum.a + factor * item.numerator.a, b: sum.b + factor * item.numerator.b }
    }, linear(0, 0))
}

export function lcmSolution(equation: LcmEquation): FractionValue {
    const multiplier = equationLcm(equation)
    const left = clearedSide(equation.left, multiplier)
    const right = clearedSide(equation.right, multiplier)
    return fraction(right.b - left.b, left.a - right.a)
}

export function setLcm(state: LcmState, patch: Partial<Pick<LcmState, 'equation' | 'multiplier'>>): LcmState {
    const equation = clamp(patch.equation ?? state.equation, 0, lcmEquations.length - 1)
    const multiplier = patch.equation !== undefined && patch.equation !== state.equation ? 1 : clamp(patch.multiplier ?? state.multiplier, MULTIPLIER_LIMITS.min, MULTIPLIER_LIMITS.max)
    const next = { ...state, equation, multiplier }
    const current = lcmEquations[equation]
    if (!clearsAll(current, multiplier)) return next
    if (multiplier === equationLcm(current)) return next.cleared.includes(equation) ? next : { ...next, cleared: [...next.cleared, equation] }
    return next.clearedBigger.includes(equation) ? next : { ...next, clearedBigger: [...next.clearedBigger, equation] }
}

export const lcmChallenges: LabChallenge<LcmState>[] = [
    {
        id: 28301,
        prompt: { eu: 'Kendu $\\frac{x}{2}+\\frac{x}{3}=5$ ekuazioaren izendatzaileak zenbakirik txikienarekin.', es: 'Quita los denominadores de $\\frac{x}{2}+\\frac{x}{3}=5$ con el menor número posible.', ar: 'احذف مقامات $\\frac{x}{2}+\\frac{x}{3}=5$ بأصغر عدد ممكن.' },
        hint: { eu: 'MKT(2, 3)', es: 'm.c.m.(2, 3)', ar: 'م.م.أ(2، 3)' },
        isSolved: (state) => state.cleared.includes(0)
    },
    {
        id: 28302,
        prompt: { eu: 'Egin gauza bera $\\frac{x}{4}-\\frac{x}{6}=1$ ekuazioarekin.', es: 'Haz lo mismo con $\\frac{x}{4}-\\frac{x}{6}=1$.', ar: 'افعل الشيء نفسه مع $\\frac{x}{4}-\\frac{x}{6}=1$.' },
        hint: { eu: '24 ere balio du, baina txikiago bat dago.', es: '24 también vale, pero hay uno menor.', ar: '24 يصلح أيضًا لكن يوجد أصغر.' },
        isSolved: (state) => state.cleared.includes(1)
    },
    {
        id: 28303,
        prompt: { eu: 'Kendu izendatzaileak zenbakitzaile luzeak dituzten bi ekuazioetan.', es: 'Quita los denominadores en las dos ecuaciones con numeradores largos.', ar: 'احذف المقامات في المعادلتين ذواتي البسط الطويل.' },
        hint: { eu: 'Gogoratu: minusak zenbakitzaile osoari eragiten dio.', es: 'Recuerda: el menos afecta a todo el numerador.', ar: 'تذكّر: الناقص يؤثر في البسط كله.' },
        isSolved: (state) => state.cleared.includes(2) && state.cleared.includes(3)
    },
    {
        id: 28304,
        prompt: { eu: 'Kendu izendatzaileak MKTa ez den multiplo komun batekin. Ebazpena aldatzen da?', es: 'Quita los denominadores con un múltiplo común que no sea el m.c.m. ¿Cambia la solución?', ar: 'احذف المقامات بمضاعف مشترك ليس م.م.أ. هل يتغيّر الحل؟' },
        hint: { eu: 'Adibidez, 12 lehen ekuazioan.', es: 'Por ejemplo, 12 en la primera ecuación.', ar: 'مثلًا 12 في المعادلة الأولى.' },
        isSolved: (state) => state.clearedBigger.length >= 1
    }
]

/* ---------- Planning problems ---------- */

export interface ProblemCard {
    statement: LocalizedText
    unknown: LocalizedText
    /** The right equation first */
    options: [string, string, string]
    answer: FractionValue
}

export const problemCards: ProblemCard[] = [
    {
        statement: { eu: 'Zenbaki baten erdiari 13 batuz, bere bikoitzari 11 kenduta bezainbeste lortzen da.', es: 'Sumando 13 a la mitad de un número se obtiene lo mismo que restando 11 a su doble.', ar: 'بإضافة 13 إلى نصف عدد نحصل على ما نحصل عليه بطرح 11 من ضعفه.' },
        unknown: { eu: 'x = zenbakia', es: 'x = el número', ar: 'x = العدد' },
        options: ['\\frac{x}{2}+13=2x-11', '\\frac{x+13}{2}=2x-11', '\\frac{x}{2}+13=2(x-11)'],
        answer: fraction(16)
    },
    {
        statement: { eu: 'Aitak semeak baino 30 urte gehiago ditu, eta 5 urte barru semearen hirukoitza izango du.', es: 'Un padre tiene 30 años más que su hijo y dentro de 5 años tendrá el triple que él.', ar: 'الأب أكبر من ابنه بـ 30 سنة، وبعد 5 سنوات سيكون عمره ثلاثة أضعاف عمره.' },
        unknown: { eu: 'x = semearen adina gaur', es: 'x = edad del hijo hoy', ar: 'x = عمر الابن اليوم' },
        options: ['x+35=3(x+5)', 'x+30=3x', 'x+35=3x+5'],
        answer: fraction(10)
    },
    {
        statement: { eu: 'Laukizuzen bat zabalera baino 3 m luzeagoa da eta perimetroa 30 m da.', es: 'Un rectángulo es 3 m más largo que ancho y su perímetro mide 30 m.', ar: 'مستطيل طوله أكبر من عرضه بـ 3 م ومحيطه 30 م.' },
        unknown: { eu: 'x = zabalera', es: 'x = el ancho', ar: 'x = العرض' },
        options: ['2x+2(x+3)=30', 'x+(x+3)=30', 'x(x+3)=30'],
        answer: fraction(6)
    },
    {
        statement: { eu: 'Sarreren heren bat lehen egunean saldu zen, laurden bat bigarrenean eta gainerako 200ak hirugarrenean.', es: 'Un tercio de las entradas se vendió el primer día, un cuarto el segundo y las 200 restantes el tercero.', ar: 'بيع ثلث التذاكر في اليوم الأول وربعها في الثاني والـ 200 الباقية في الثالث.' },
        unknown: { eu: 'x = sarrera guztiak', es: 'x = total de entradas', ar: 'x = مجموع التذاكر' },
        options: ['\\frac{x}{3}+\\frac{x}{4}+200=x', '\\frac{x}{3}+\\frac{x}{4}=200', 'x+\\frac{x}{3}+\\frac{x}{4}=200'],
        answer: fraction(480)
    }
]

export interface ProblemsState extends OperationAnswer {
    problem: number
    /** Chosen option per problem */
    chosen: Record<number, number>
    solved: number[]
}

export const initialProblemsState: ProblemsState = { problem: 0, chosen: {}, solved: [], ...freshAnswer }

export const setProblem = (state: ProblemsState, problem: number): ProblemsState => ({ ...state, problem: clamp(problem, 0, problemCards.length - 1), ...freshAnswer })

export const chooseEquation = (state: ProblemsState, option: number): ProblemsState => ({ ...state, chosen: { ...state.chosen, [state.problem]: option }, ...freshAnswer })

export const planned = (state: ProblemsState, problem: number) => state.chosen[problem] === 0

export function answerProblem(state: ProblemsState, patch: Partial<OperationAnswer>): ProblemsState {
    const next = { ...state, ...patch }
    if (planned(next, next.problem) && next.checked && !next.revealed && answered(next, problemCards[next.problem].answer) && !next.solved.includes(next.problem)) return { ...next, solved: [...next.solved, next.problem] }
    return next
}

export const problemsChallenges: LabChallenge<ProblemsState>[] = problemCards.map((_, index) => ({
    id: 28401 + index,
    prompt: {
        eu: `${index + 1}. buruketa: aukeratu ekuazioa eta idatzi ebazpena.`,
        es: `Problema ${index + 1}: elige la ecuación y escribe la solución.`,
        ar: `المسألة ${index + 1}: اختر المعادلة واكتب الحل.`
    },
    hint: { eu: 'Irakurri enuntziatua zatika eta itzuli zati bakoitza.', es: 'Lee el enunciado por partes y traduce cada una.', ar: 'اقرأ النص جزءًا جزءًا وترجم كل جزء.' },
    isSolved: (state: ProblemsState) => state.solved.includes(index)
}))

/* ---------- The discriminant ---------- */

export const QUADRATIC_LIMITS = { a: { min: -3, max: 3 }, b: { min: -10, max: 10 }, c: { min: -12, max: 12 } } as const

export interface QuadraticState {
    a: number
    b: number
    c: number
}

export const initialQuadraticState: QuadraticState = { a: 1, b: -5, c: 6 }

export function setQuadratic(state: QuadraticState, patch: Partial<QuadraticState>): QuadraticState {
    let a = clamp(patch.a ?? state.a, QUADRATIC_LIMITS.a.min, QUADRATIC_LIMITS.a.max)
    // a = 0 is not a second-degree equation: skip it in the direction of the change
    if (a === 0) a = patch.a !== undefined && patch.a < state.a ? -1 : 1
    return { a, b: clamp(patch.b ?? state.b, QUADRATIC_LIMITS.b.min, QUADRATIC_LIMITS.b.max), c: clamp(patch.c ?? state.c, QUADRATIC_LIMITS.c.min, QUADRATIC_LIMITS.c.max) }
}

export const discriminant = (state: QuadraticState) => state.b * state.b - 4 * state.a * state.c

/** Real solutions, smallest first */
export function quadraticSolutions(state: QuadraticState): number[] {
    const delta = discriminant(state)
    if (delta < 0) return []
    if (delta === 0) return [-state.b / (2 * state.a)]
    const root = Math.sqrt(delta)
    return [(-state.b - root) / (2 * state.a), (-state.b + root) / (2 * state.a)].sort((x, y) => x - y)
}

const isInteger = (value: number) => Math.abs(value - Math.round(value)) < 1e-9

export const quadraticChallenges: LabChallenge<QuadraticState>[] = [
    {
        id: 28501,
        prompt: { eu: 'Egin 2 eta 3 ebazpenak dituen ekuazio bat.', es: 'Construye una ecuación cuyas soluciones sean 2 y 3.', ar: 'ابنِ معادلة حلاها 2 و3.' },
        hint: { eu: '$(x-2)(x-3)=x^{2}-5x+6$', es: '$(x-2)(x-3)=x^{2}-5x+6$', ar: '$(x-2)(x-3)=x^{2}-5x+6$' },
        isSolved: (state) => { const roots = quadraticSolutions(state); return roots.length === 2 && Math.abs(roots[0] - 2) < 1e-9 && Math.abs(roots[1] - 3) < 1e-9 }
    },
    {
        id: 28502,
        prompt: { eu: 'Egin ebazpen bakarra (bikoitza) duen ekuazio bat, c ≠ 0 izanik.', es: 'Construye una ecuación con una sola solución (doble), con c ≠ 0.', ar: 'ابنِ معادلة لها حل واحد (مضاعف) مع c ≠ 0.' },
        hint: { eu: 'Δ = 0: adibidez $x^{2}-6x+9$.', es: 'Δ = 0: por ejemplo $x^{2}-6x+9$.', ar: 'Δ = 0: مثلًا $x^{2}-6x+9$.' },
        isSolved: (state) => discriminant(state) === 0 && state.c !== 0
    },
    {
        id: 28503,
        prompt: { eu: 'Egin ebazpenik gabeko ekuazio bat, b ≠ 0 izanik.', es: 'Construye una ecuación sin solución, con b ≠ 0.', ar: 'ابنِ معادلة بلا حل مع b ≠ 0.' },
        hint: { eu: 'Δ < 0: c handia eta a-ren zeinu berekoa.', es: 'Δ < 0: c grande y del mismo signo que a.', ar: 'Δ < 0: c كبير وبإشارة a نفسها.' },
        isSolved: (state) => discriminant(state) < 0 && state.b !== 0
    },
    {
        id: 28504,
        prompt: { eu: 'Egin bi ebazpen oso eta aurkako dituen ekuazio bat.', es: 'Construye una ecuación con dos soluciones enteras y opuestas.', ar: 'ابنِ معادلة لها حلان صحيحان متعاكسان.' },
        hint: { eu: 'b = 0: $x^{2}-16=0$.', es: 'b = 0: $x^{2}-16=0$.', ar: 'b = 0: $x^{2}-16=0$.' },
        isSolved: (state) => { const roots = quadraticSolutions(state); return roots.length === 2 && Math.abs(roots[0] + roots[1]) < 1e-9 && isInteger(roots[1]) }
    }
]

export const equationsLabChallengeIds: number[] = [
    ...trialChallenges,
    ...solverChallenges,
    ...lcmChallenges,
    ...problemsChallenges,
    ...quadraticChallenges
].map((challenge) => challenge.id)
