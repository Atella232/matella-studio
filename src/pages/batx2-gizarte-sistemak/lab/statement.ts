import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom } from '../../dbh3-segidak/lab/prediction.ts'
import { classify, cramer } from '../../batx2-zientziak-sistemak/system.ts'

/* ==========================================================================
   L2 · Enuntziatutik ekuaziora (Del enunciado a la ecuación): a problem
   with three sentences and three unknowns. The learner builds the
   equation of each sentence with the coefficients of x, y, z and the
   number on the right. An equation is right when it is the sentence's,
   or a multiple of it; when the three are right, the system is solved
   and the solution is checked in every sentence.
   ========================================================================== */

export interface StatementState {
    scenario: number
    sentence: number
    /** One row per sentence: the coefficients of the three unknowns and the right-hand side */
    rows: number[][]
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export interface StatementScenario {
    name: LocalizedText
    /** The three unknowns: letter and meaning */
    unknowns: Array<{ letter: string; meaning: LocalizedText }>
    sentences: LocalizedText[]
    /** The equation of each sentence, as [a, b, c, d]: ax + by + cz = d */
    targets: number[][]
    solution: number[]
}

export const STATEMENT_SCENARIOS: StatementScenario[] = [
    {
        name: say('Fondoak', 'Fondos', 'الصناديق', 'Funds'),
        unknowns: [
            { letter: 'x', meaning: say('A fondoa (milaka euro)', 'fondo A (miles de euros)', 'الصندوق A (آلاف اليوروهات)', 'fund A (thousands of euros)') },
            { letter: 'y', meaning: say('B fondoa', 'fondo B', 'الصندوق B', 'fund B') },
            { letter: 'z', meaning: say('C fondoa', 'fondo C', 'الصندوق C', 'fund C') }
        ],
        sentences: [
            say('Guztira 30 mila euro inbertitzen dira.', 'En total se invierten 30 mil euros.', 'يُستثمر 30 ألف يورو إجمالًا.', '30 thousand euros are invested in total.'),
            say('B fondoan A fondoan bezainbeste bider bi.', 'En B, el doble que en A.', 'في B ضعف ما في A.', 'In B, twice as much as in A.'),
            say('C fondoan A fondoan baino 6 mila gehiago.', 'En C, 6 mil más que en A.', 'في C أكثر مما في A بـ 6 آلاف.', 'In C, 6 thousand more than in A.')
        ],
        targets: [[1, 1, 1, 30], [2, -1, 0, 0], [-1, 0, 1, 6]],
        solution: [6, 12, 12]
    },
    {
        name: say('Azterketa', 'Examen', 'الامتحان', 'Exam'),
        unknowns: [
            { letter: 'a', meaning: say('asmatuak', 'aciertos', 'الصحيحة', 'right answers') },
            { letter: 'f', meaning: say('hutsak', 'fallos', 'الخاطئة', 'wrong answers') },
            { letter: 'b', meaning: say('zuriak', 'en blanco', 'الفارغة', 'blanks') }
        ],
        sentences: [
            say('Azterketak 20 galdera ditu.', 'El examen tiene 20 preguntas.', 'في الامتحان 20 سؤالًا.', 'The exam has 20 questions.'),
            say('Asmatze bakoitzak 3 puntu ematen ditu eta huts bakoitzak bat kentzen du; guztira, 32 puntu.', 'Cada acierto da 3 puntos y cada fallo quita 1: en total, 32 puntos.', 'كل إجابة صحيحة تعطي 3 نقاط وكل خاطئة تنقص 1: المجموع 32 نقطة.', 'Each right answer gives 3 points and each wrong one takes 1 away: 32 points in total.'),
            say('Huts adina zuri daude.', 'Hay tantas en blanco como fallos.', 'الفارغة بعدد الخاطئة.', 'There are as many blanks as wrong answers.')
        ],
        targets: [[1, 1, 1, 20], [3, -1, 0, 32], [0, -1, 1, 0]],
        solution: [12, 4, 4]
    },
    {
        name: say('Denda', 'Tienda', 'المتجر', 'Shop'),
        unknowns: [
            { letter: 'x', meaning: say('kafe-kiloak', 'kilos de café', 'كيلوغرامات القهوة', 'kilos of coffee') },
            { letter: 'y', meaning: say('te-kiloak', 'kilos de té', 'كيلوغرامات الشاي', 'kilos of tea') },
            { letter: 'z', meaning: say('kakao-kiloak', 'kilos de cacao', 'كيلوغرامات الكاكاو', 'kilos of cocoa') }
        ],
        sentences: [
            say('Guztira 11 kilo saldu dira.', 'Se han vendido 11 kilos en total.', 'بيع 11 كيلوغرامًا إجمالًا.', '11 kilos have been sold in total.'),
            say('Kafea baino 4 kilo te gutxiago saldu da.', 'Se han vendido 4 kilos menos de té que de café.', 'بيع من الشاي أقل من القهوة بـ 4 كيلوغرامات.', '4 kilos less tea than coffee have been sold.'),
            say('Kakaoa kafearen erdia da.', 'De cacao, la mitad que de café.', 'من الكاكاو نصف ما بيع من القهوة.', 'Of cocoa, half as much as of coffee.')
        ],
        targets: [[1, 1, 1, 11], [1, -1, 0, 4], [1, 0, -2, 0]],
        solution: [6, 2, 3]
    }
]

export const COEFFICIENT_LIMITS = { min: -3, max: 3 } as const
export const RIGHT_LIMITS = { min: -10, max: 40 } as const

const clamp = (value: number, limits: { min: number; max: number }) => Math.min(limits.max, Math.max(limits.min, Math.round(value)))
const empty = () => [0, 1, 2].map(() => [0, 0, 0, 0])

export const loadStatement = (scenario: number): StatementState => ({ scenario, sentence: 0, rows: empty() })
export const initialStatementState = loadStatement(0)

export const chooseSentence = (state: StatementState, sentence: number): StatementState => ({ ...state, sentence })

/** Changes one number (0, 1, 2: a coefficient; 3: the right-hand side) of the chosen sentence */
export function setTerm(state: StatementState, term: number, value: number): StatementState {
    const rows = state.rows.map((row) => [...row])
    rows[state.sentence][term] = clamp(value, term === 3 ? RIGHT_LIMITS : COEFFICIENT_LIMITS)
    return { ...state, rows }
}

/** The row is the target times a number k ≠ 0 */
export function isRightRow(row: number[], target: number[]): boolean {
    const lead = target.findIndex((value) => value !== 0)
    if (row[lead] === 0) return false
    const k = row[lead] / target[lead]
    return row.every((value, i) => Math.abs(value - k * target[i]) < 1e-9)
}

export const rightRows = (state: StatementState) => state.rows.map((row, i) => isRightRow(row, STATEMENT_SCENARIOS[state.scenario].targets[i]))
export const systemDone = (state: StatementState) => rightRows(state).every(Boolean)

/** The solution of the system built, when it has one */
export function builtSolution(state: StatementState): number[] | null {
    const a = state.rows.map((row) => row.slice(0, 3))
    const b = state.rows.map((row) => row[3])
    if (classify(a, b).kind !== 'determined') return null
    const values = cramer(a, b)
    return values && values.map((value) => value.numerator / value.denominator)
}

/* ---------- Challenges ---------- */

export const statementChallenges: LabChallenge<StatementState>[] = [
    {
        id: 143151,
        prompt: say('Fondoetan, idatzi 1. esaldiaren ekuazioa.', 'En los fondos, escribe la ecuación de la frase 1.', 'في الصناديق اكتب معادلة الجملة 1.', 'In the funds, write the equation of sentence 1.'),
        hint: say('«Guztira» batuketa da: $x+y+z=30$.', '«En total» es una suma: $x+y+z=30$.', '«إجمالًا» جمع: $x+y+z=30$.', '«In total» is a sum: $x+y+z=30$.'),
        isSolved: (state) => state.scenario === 0 && rightRows(state)[0]
    },
    {
        id: 143152,
        prompt: say('Fondoetan, osatu sistema osoa, eta ikusi soluzioa.', 'En los fondos, completa el sistema entero y mira la solución.', 'في الصناديق أكمل النظام كله وانظر إلى الحل.', 'In the funds, complete the whole system and look at the solution.'),
        hint: say('$y=2x$ idazten da $2x-y=0$ gisa.', '$y=2x$ se escribe $2x-y=0$.', '$y=2x$ تُكتب $2x-y=0$.', '$y=2x$ is written $2x-y=0$.'),
        isSolved: (state) => state.scenario === 0 && systemDone(state)
    },
    {
        id: 143153,
        prompt: say('Azterketan, osatu sistema.', 'En el examen, completa el sistema.', 'في الامتحان أكمل النظام.', 'In the exam, complete the system.'),
        hint: say('Puntuak: $3a-f=32$. Zuriak eta hutsak: $b-f=0$.', 'Puntos: $3a-f=32$. Blancos y fallos: $b-f=0$.', 'النقاط: $3a-f=32$. الفارغة والخاطئة: $b-f=0$.', 'Points: $3a-f=32$. Blanks and wrong: $b-f=0$.'),
        isSolved: (state) => state.scenario === 1 && systemDone(state)
    },
    {
        id: 143154,
        prompt: say('Dendan, idatzi 2. esaldiaren ekuazioa. Kontuz: zer da txikiagoa?', 'En la tienda, escribe la ecuación de la frase 2. Ojo: ¿qué es lo menor?', 'في المتجر اكتب معادلة الجملة 2. انتبه: ما الأصغر؟', 'In the shop, write the equation of sentence 2. Careful: which is smaller?'),
        hint: say('Te gutxiago dago: $y=x-4$, hau da, $x-y=4$.', 'Hay menos té: $y=x-4$, es decir, $x-y=4$.', 'الشاي أقل: $y=x-4$، أي $x-y=4$.', 'There is less tea: $y=x-4$, that is, $x-y=4$.'),
        isSolved: (state) => state.scenario === 2 && rightRows(state)[1]
    },
    {
        id: 143155,
        prompt: say('Dendan, osatu sistema, eta egiaztatu soluzioa esaldietan.', 'En la tienda, completa el sistema y comprueba la solución en las frases.', 'في المتجر أكمل النظام وتحقق من الحل في الجمل.', 'In the shop, complete the system and check the solution in the sentences.'),
        hint: say('«Erdia»: $z=\\frac{x}{2}$, hau da, $x-2z=0$.', '«La mitad»: $z=\\frac{x}{2}$, es decir, $x-2z=0$.', '«النصف»: $z=\\frac{x}{2}$، أي $x-2z=0$.', '«Half»: $z=\\frac{x}{2}$, that is, $x-2z=0$.'),
        isSolved: (state) => state.scenario === 2 && systemDone(state)
    }
]

/** Endless practice: write the equation of one sentence of one problem */
const statementMaker: LabChallengeMaker<StatementState> = (random) => {
    const scenario = randomInt(random, 0, STATEMENT_SCENARIOS.length - 1)
    const sentence = randomInt(random, 0, 2)
    const rows = empty()
    rows[sentence] = [...STATEMENT_SCENARIOS[scenario].targets[sentence]]
    const name = STATEMENT_SCENARIOS[scenario].name
    return {
        prompt: say(
            `${name.eu}: idatzi ${sentence + 1}. esaldiaren ekuazioa.`,
            `${name.es}: escribe la ecuación de la frase ${sentence + 1}.`,
            `${name.ar}: اكتب معادلة الجملة ${sentence + 1}.`,
            `${name.en}: write the equation of sentence ${sentence + 1}.`
        ),
        hint: say('Pasatu ezezagun guztiak ezkerrera, eta zenbakia eskuinera.', 'Pasa todas las incógnitas a la izquierda y el número a la derecha.', 'انقل كل المجاهيل إلى اليسار والعدد إلى اليمين.', 'Move every unknown to the left and the number to the right.'),
        isSolved: (state) => state.scenario === scenario && rightRows(state)[sentence],
        solution: { scenario, sentence, rows }
    }
}

export const statementExtra = freshFrom(initialStatementState, statementMaker)
