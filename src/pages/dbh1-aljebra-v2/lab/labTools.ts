import { checkAnswer, fraction } from '../../../features/unit-v2/math/fraction.ts'
import { freshAnswer, type LabChallenge, type LabToolInfo, type OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { linear, reduceTerms, valueAt, type Linear, type Term } from '../algebra.ts'
import type { AlgebraIntroStageId } from '../lessons.tsx'

/* ==========================================================================
   Aljebra (1. DBH) laboratory: translate phrases, the number machine,
   algebra tiles, the balance and trial and error. Pure state logic and
   challenges; components live next to this file. Tests in
   tests/aljebra-dbh1-lab.test.ts.
   ========================================================================== */

export type AlgebraLabToolId = 'translate' | 'machine' | 'tiles' | 'balance' | 'trial'

export interface AlgebraLabTool extends LabToolInfo {
    id: AlgebraLabToolId
    stage: AlgebraIntroStageId
}

export const algebraLabTools: AlgebraLabTool[] = [
    {
        id: 'translate',
        stage: 'language',
        lessonTopic: 'translate',
        title: { eu: 'Itzultzailea', es: 'Traductor', ar: 'المترجم' },
        observe: {
            eu: 'Irakurri esaldia hitzez hitz: «bikoitza» x-ren aurrean 2 bat da, «gehi 3» amaieran batzen da, eta «baturaren bikoitza» parentesi batekin idazten da.',
            es: 'Lee la frase palabra a palabra: «el doble» es un 2 delante de la x, «más 3» se suma al final y «el doble de la suma» se escribe con un paréntesis.',
            ar: 'اقرأ الجملة كلمة كلمة: «الضعف» 2 أمام x، و«زائد 3» يُضاف في النهاية، و«ضعف المجموع» يُكتب بقوس.'
        }
    },
    {
        id: 'machine',
        stage: 'language',
        lessonTopic: 'value',
        title: { eu: 'Zenbaki-makina', es: 'Máquina de números', ar: 'آلة الأعداد' },
        observe: {
            eu: 'Makinak x hartu eta adierazpenak esaten duena egiten du. x aldatzean balioa aldatzen da, baina adierazpena beti bera da.',
            es: 'La máquina toma x y hace lo que dice la expresión. Al cambiar x cambia el valor, pero la expresión es siempre la misma.',
            ar: 'تأخذ الآلة x وتنفّذ ما تقوله العبارة. عند تغيير x تتغيّر القيمة لكن العبارة تبقى نفسها.'
        }
    },
    {
        id: 'tiles',
        stage: 'operations',
        lessonTopic: 'add-monomials',
        title: { eu: 'Fitxa aljebraikoak', es: 'Fichas algebraicas', ar: 'البطاقات الجبرية' },
        observe: {
            eu: 'Fitxa bakoitza gai bat da: karratu handia x², barra x, karratu txikia 1. Mota bereko fitxak bakarrik elkartzen dira: horregatik antzekoak bakarrik batzen dira. Fitxa gorri batek eta urdin batek elkar ezabatzen dute.',
            es: 'Cada ficha es un término: el cuadrado grande x², la barra x, el cuadradito 1. Solo se juntan fichas del mismo tipo: por eso solo se suman los semejantes. Una ficha roja y una azul se anulan.',
            ar: 'كل بطاقة حد: المربع الكبير x²، والشريط x، والمربع الصغير 1. لا تجتمع إلا البطاقات من النوع نفسه: لذلك نجمع المتشابهة فقط. البطاقة الحمراء والزرقاء تلغي إحداهما الأخرى.'
        }
    },
    {
        id: 'balance',
        stage: 'equations',
        lessonTopic: 'transpose',
        title: { eu: 'Balantza', es: 'La balanza', ar: 'الميزان' },
        observe: {
            eu: 'Bi platerretan gauza bera egiten bada, balantza orekan geratzen da. Kendu unitateak bietatik eta gero zatitu: horixe da gaiak atalez aldatzea.',
            es: 'Si se hace lo mismo en los dos platos, la balanza sigue en equilibrio. Quita unidades de los dos y después divide: eso es transponer términos.',
            ar: 'إذا فعلنا الشيء نفسه في الكفتين يبقى الميزان متوازنًا. أزل وحدات من الكفتين ثم اقسم: هذا هو نقل الحدود.'
        }
    },
    {
        id: 'trial',
        stage: 'equations',
        lessonTopic: 'trial',
        title: { eu: 'Probatu eta zuzendu', es: 'Prueba y corrige', ar: 'جرّب وصحّح' },
        observe: {
            eu: 'Balio bat probatzean, konparatu bi atalak. Lehen atala handiegia bada, probatu x txikiago bat (x-ren koefizientea positiboa bada), eta alderantziz.',
            es: 'Al probar un valor, compara los dos miembros. Si el primero se pasa, prueba una x menor (si el coeficiente de x es positivo), y al revés.',
            ar: 'عند تجربة قيمة قارن الطرفين. إذا زاد الطرف الأول فجرّب x أصغر (إذا كان معامل x موجبًا)، وبالعكس.'
        }
    }
]

export const algebraLabToolForTopic: Record<string, AlgebraLabToolId | undefined> = {
    letters: 'translate',
    translate: 'translate',
    value: 'machine',
    monomial: 'tiles',
    'like-terms': 'tiles',
    polynomial: 'tiles',
    'add-monomials': 'tiles',
    'multiply-monomials': 'tiles',
    brackets: 'tiles',
    equation: 'balance',
    trial: 'trial',
    transpose: 'balance',
    solve: 'balance',
    problems: 'translate'
}

const answered = (state: OperationAnswer, expected: number) => checkAnswer(state.answer, fraction(expected)) === 'correct'

/* ---------- Translate phrases ---------- */

export interface PhraseCard {
    id: string
    phrase: LocalizedText
    /** The right expression first; the others are typical mistakes */
    options: [string, string, string]
}

export const phraseCards: PhraseCard[] = [
    { id: 'double', phrase: { eu: 'Zenbaki baten bikoitza', es: 'El doble de un número', ar: 'ضعف عدد' }, options: ['2x', 'x^{2}', 'x+2'] },
    { id: 'minus3', phrase: { eu: 'Zenbaki bat ken 3', es: 'Un número disminuido en 3', ar: 'عدد ناقص 3' }, options: ['x-3', '3-x', '3x'] },
    { id: 'half', phrase: { eu: 'Zenbaki baten erdia', es: 'La mitad de un número', ar: 'نصف عدد' }, options: ['\\frac{x}{2}', '2x', 'x-2'] },
    { id: 'square', phrase: { eu: 'Zenbaki baten karratua', es: 'El cuadrado de un número', ar: 'مربع عدد' }, options: ['x^{2}', '2x', 'x+x'] },
    { id: 'triple-plus', phrase: { eu: 'Zenbaki baten hirukoitza gehi 5', es: 'El triple de un número más 5', ar: 'ثلاثة أضعاف عدد زائد 5' }, options: ['3x+5', '3(x+5)', 'x+15'] },
    { id: 'double-sum', phrase: { eu: 'Bi zenbakiren baturaren bikoitza', es: 'El doble de la suma de dos números', ar: 'ضعف مجموع عددين' }, options: ['2(x+y)', '2x+y', 'x^{2}+y^{2}'] },
    { id: 'ago', phrase: { eu: 'Zure adina duela 4 urte', es: 'Tu edad hace 4 años', ar: 'عمرك قبل 4 سنوات' }, options: ['x-4', 'x+4', '4x'] },
    { id: 'consecutive', phrase: { eu: 'Zenbaki bat eta hurrengoa batuta', es: 'Un número más el siguiente', ar: 'عدد زائد العدد الذي يليه' }, options: ['x+(x+1)', 'x+1', '2x'] }
]

export interface TranslateState {
    /** Card id → index of the chosen option in the shown order */
    answers: Record<string, string>
    mistakes: number
}

export const initialTranslateState: TranslateState = { answers: {}, mistakes: 0 }

export function chooseTranslation(state: TranslateState, id: string, latex: string): TranslateState {
    const card = phraseCards.find((item) => item.id === id)
    if (!card || state.answers[id] === card.options[0]) return state
    return { answers: { ...state.answers, [id]: latex }, mistakes: state.mistakes + (latex === card.options[0] ? 0 : 1) }
}

export const translatedRight = (state: TranslateState) => phraseCards.filter((card) => state.answers[card.id] === card.options[0]).length

export const translateChallenges: LabChallenge<TranslateState>[] = [
    {
        id: 7101,
        prompt: { eu: 'Itzuli ondo lau esaldi.', es: 'Traduce bien cuatro frases.', ar: 'ترجم أربع جمل ترجمة صحيحة.' },
        hint: { eu: '«Bikoitza» = 2 bider; «erdia» = zati 2.', es: '«Doble» = por 2; «mitad» = entre 2.', ar: '«الضعف» = في 2؛ «النصف» = على 2.' },
        isSolved: (state) => translatedRight(state) >= 4
    },
    {
        id: 7102,
        prompt: { eu: 'Itzuli «bi zenbakiren baturaren bikoitza».', es: 'Traduce «el doble de la suma de dos números».', ar: 'ترجم «ضعف مجموع عددين».' },
        hint: { eu: 'Lehenik batura, parentesi artean; gero bikoitza.', es: 'Primero la suma, entre paréntesis; después el doble.', ar: 'أولًا المجموع بين قوسين، ثم الضعف.' },
        isSolved: (state) => state.answers['double-sum'] === '2(x+y)'
    },
    {
        id: 7103,
        prompt: { eu: 'Itzuli esaldi guztiak akatsik gabe.', es: 'Traduce todas las frases sin ningún error.', ar: 'ترجم كل الجمل دون أي خطأ.' },
        hint: { eu: 'Akatsen bat egin baduzu, sakatu «Berriro hasi».', es: 'Si te has equivocado, pulsa «Empezar de nuevo».', ar: 'إذا أخطأت فاضغط «ابدأ من جديد».' },
        isSolved: (state) => state.mistakes === 0 && translatedRight(state) === phraseCards.length
    }
]

/* ---------- The number machine ---------- */

export interface MachineExpression {
    latex: string
    value: (x: number) => number
}

export const machineExpressions: MachineExpression[] = [
    { latex: '2x+1', value: (x) => 2 * x + 1 },
    { latex: '3x-5', value: (x) => 3 * x - 5 },
    { latex: 'x^{2}+1', value: (x) => x * x + 1 },
    { latex: '5-2x', value: (x) => 5 - 2 * x },
    { latex: '\\frac{x}{2}+3', value: (x) => x / 2 + 3 }
]

export const MACHINE_LIMITS = { min: -5, max: 10 } as const

export interface MachineState extends OperationAnswer {
    expression: number
    x: number
}

export const initialMachineState: MachineState = { expression: 0, x: 1, ...freshAnswer }

export function setMachine(state: MachineState, patch: Partial<Pick<MachineState, 'expression' | 'x'>>): MachineState {
    const x = Math.min(MACHINE_LIMITS.max, Math.max(MACHINE_LIMITS.min, Math.round(patch.x ?? state.x)))
    const expression = Math.min(machineExpressions.length - 1, Math.max(0, patch.expression ?? state.expression))
    return { ...state, x, expression, ...freshAnswer }
}

export const machineValue = (state: Pick<MachineState, 'expression' | 'x'>) => machineExpressions[state.expression].value(state.x)

const machineAt = (state: MachineState, latex: string, x: number) => machineExpressions[state.expression].latex === latex && state.x === x

export const machineChallenges: LabChallenge<MachineState>[] = [
    {
        id: 7201,
        prompt: { eu: 'Kalkulatu $2x+1$ balioa $x=4$ denean.', es: 'Calcula el valor de $2x+1$ para $x=4$.', ar: 'احسب قيمة $2x+1$ عندما $x=4$.' },
        hint: { eu: '$2\\cdot 4+1$', es: '$2\\cdot 4+1$', ar: '$2\\cdot 4+1$' },
        isSolved: (state) => machineAt(state, '2x+1', 4) && answered(state, 9)
    },
    {
        id: 7202,
        prompt: { eu: 'Kalkulatu $3x-5$ balioa $x=-2$ denean.', es: 'Calcula el valor de $3x-5$ para $x=-2$.', ar: 'احسب قيمة $3x-5$ عندما $x=-2$.' },
        hint: { eu: '$3\\cdot(-2)-5$', es: '$3\\cdot(-2)-5$', ar: '$3\\cdot(-2)-5$' },
        isSolved: (state) => machineAt(state, '3x-5', -2) && answered(state, -11)
    },
    {
        id: 7203,
        prompt: { eu: 'Kalkulatu $x^{2}+1$ balioa $x=3$ denean.', es: 'Calcula el valor de $x^{2}+1$ para $x=3$.', ar: 'احسب قيمة $x^{2}+1$ عندما $x=3$.' },
        hint: { eu: 'Lehenik berretura.', es: 'Primero la potencia.', ar: 'القوة أولًا.' },
        isSolved: (state) => machineAt(state, 'x^{2}+1', 3) && answered(state, 10)
    },
    {
        id: 7204,
        prompt: { eu: 'Aurkitu zein x-rekin ematen duen $2x+1$ makinak 11, eta idatzi balioa.', es: 'Encuentra con qué x da 11 la máquina $2x+1$ y escribe el valor.', ar: 'جد قيمة x التي تجعل الآلة $2x+1$ تعطي 11، واكتب القيمة.' },
        hint: { eu: 'Probatu x = 4, 5, 6…', es: 'Prueba x = 4, 5, 6…', ar: 'جرّب x = 4، 5، 6…' },
        isSolved: (state) => machineAt(state, '2x+1', 5) && answered(state, 11)
    }
]

/* ---------- Algebra tiles ---------- */

export const TILE_LIMIT = 6

/** Counts of x², x and 1 tiles (negative = red tiles) */
export interface TileGroup {
    squares: number
    bars: number
    units: number
}

export interface TilesState {
    first: TileGroup
    second: TileGroup
    op: 'add' | 'subtract'
}

export const emptyGroup: TileGroup = { squares: 0, bars: 0, units: 0 }

export const initialTilesState: TilesState = { first: { squares: 0, bars: 3, units: 2 }, second: { squares: 0, bars: 2, units: 1 }, op: 'add' }

export function setTiles(state: TilesState, which: 'first' | 'second', patch: Partial<TileGroup>): TilesState {
    const clamp = (value: number) => Math.min(TILE_LIMIT, Math.max(-TILE_LIMIT, Math.round(value)))
    const group = { ...state[which], ...patch }
    return { ...state, [which]: { squares: clamp(group.squares), bars: clamp(group.bars), units: clamp(group.units) } }
}

export const groupTerms = (group: TileGroup): Term[] => [
    { coefficient: group.squares, power: 2 },
    { coefficient: group.bars, power: 1 },
    { coefficient: group.units, power: 0 }
].filter((term) => term.coefficient !== 0)

/** The reduced result of first ± second */
export function tilesResult(state: TilesState): Term[] {
    const sign = state.op === 'add' ? 1 : -1
    const second = groupTerms(state.second).map((term) => ({ ...term, coefficient: term.coefficient * sign }))
    return reduceTerms([...groupTerms(state.first), ...second])
}

const isGroup = (group: TileGroup, squares: number, bars: number, units: number) => group.squares === squares && group.bars === bars && group.units === units
const result = (state: TilesState) => tilesResult(state).map((term) => `${term.coefficient}^${term.power}`).join(',')

export const tilesChallenges: LabChallenge<TilesState>[] = [
    {
        id: 7301,
        prompt: { eu: 'Batu $3x+2$ eta $2x+1$. Zer lortzen duzu?', es: 'Suma $3x+2$ y $2x+1$. ¿Qué obtienes?', ar: 'اجمع $3x+2$ و$2x+1$. ماذا تحصل؟' },
        hint: { eu: 'Barrak barrekin eta karratu txikiak haiekin.', es: 'Las barras con las barras y los cuadraditos con los cuadraditos.', ar: 'الأشرطة مع الأشرطة والمربعات الصغيرة معًا.' },
        isSolved: (state) => state.op === 'add' && isGroup(state.first, 0, 3, 2) && isGroup(state.second, 0, 2, 1)
    },
    {
        id: 7302,
        prompt: { eu: 'Laburtu $x^{2}+4x+5x^{2}+x$: jarri $x^{2}+4x$ eta $5x^{2}+x$ eta batu.', es: 'Reduce $x^{2}+4x+5x^{2}+x$: pon $x^{2}+4x$ y $5x^{2}+x$ y súmalos.', ar: 'بسّط $x^{2}+4x+5x^{2}+x$: ضع $x^{2}+4x$ و$5x^{2}+x$ واجمعهما.' },
        hint: { eu: 'Emaitza: $6x^{2}+5x$.', es: 'Resultado: $6x^{2}+5x$.', ar: 'الناتج: $6x^{2}+5x$.' },
        isSolved: (state) => state.op === 'add' && isGroup(state.first, 1, 4, 0) && isGroup(state.second, 5, 1, 0)
    },
    {
        id: 7303,
        prompt: { eu: 'Egin batuketa bat, zenbakiak dituena, eta emaitza zehazki $5x$ izan dadila.', es: 'Haz una suma que tenga números y cuyo resultado sea exactamente $5x$.', ar: 'اصنع جمعًا فيه أعداد ويكون ناتجه $5x$ تمامًا.' },
        hint: { eu: 'Fitxa gorriek zenbakiak ezaba ditzakete: $+3$ eta $-3$.', es: 'Las fichas rojas pueden anular números: $+3$ y $-3$.', ar: 'البطاقات الحمراء تلغي الأعداد: $+3$ و$-3$.' },
        isSolved: (state) => state.op === 'add' && (state.first.units !== 0 || state.second.units !== 0) && result(state) === '5^1'
    },
    {
        id: 7304,
        prompt: { eu: 'Kendu adierazpen bat bere buruari eta ikusi zer geratzen den.', es: 'Resta una expresión a sí misma y mira qué queda.', ar: 'اطرح عبارة من نفسها وانظر ماذا يبقى.' },
        hint: { eu: 'Bi taldeak berdinak eta «−» eragiketa.', es: 'Los dos grupos iguales y la operación «−».', ar: 'المجموعتان متساويتان والعملية «−».' },
        isSolved: (state) => state.op === 'subtract' && groupTerms(state.first).length > 0 && isGroup(state.first, state.second.squares, state.second.bars, state.second.units)
    }
]

/* ---------- The balance ---------- */

/** a·x + b = c, with a > 0 and b, c ≥ 0 so it can be drawn with boxes and weights */
export interface BalanceExercise {
    id: number
    a: number
    b: number
    c: number
}

export const balanceExercises: BalanceExercise[] = [
    { id: 1, a: 1, b: 2, c: 8 },
    { id: 2, a: 2, b: 1, c: 7 },
    { id: 3, a: 3, b: 2, c: 11 },
    { id: 4, a: 4, b: 3, c: 15 }
]

export interface BalanceState {
    exercise: number
    /** Current equation: a·x + b = c */
    left: Linear
    right: number
    /** Moves that would have broken the balance */
    mistakes: number
    finished: number[]
}

const exerciseById = (id: number) => balanceExercises.find((exercise) => exercise.id === id) ?? balanceExercises[0]

export function startBalance(id: number, finished: number[] = []): BalanceState {
    const exercise = exerciseById(id)
    return { exercise: exercise.id, left: linear(exercise.a, exercise.b), right: exercise.c, mistakes: 0, finished }
}

export const initialBalanceState = startBalance(1)

const withFinished = (state: BalanceState): BalanceState =>
    state.left.a === 1 && state.left.b === 0 && !state.finished.includes(state.exercise) ? { ...state, finished: [...state.finished, state.exercise] } : state

/** Take one unit from both pans; impossible when the left pan has no loose units */
export function removeUnit(state: BalanceState): BalanceState {
    if (state.left.b === 0) return { ...state, mistakes: state.mistakes + 1 }
    return withFinished({ ...state, left: linear(state.left.a, state.left.b - 1), right: state.right - 1 })
}

/** Split both pans into as many equal parts as boxes; only when there are no loose units and it divides */
export function divideByBoxes(state: BalanceState): BalanceState {
    if (state.left.b !== 0 || state.left.a === 1 || state.right % state.left.a !== 0) return { ...state, mistakes: state.mistakes + 1 }
    return withFinished({ ...state, left: linear(1, 0), right: state.right / state.left.a })
}

export const balanceSolved = (state: BalanceState) => state.left.a === 1 && state.left.b === 0

export const balanceChallenges: LabChallenge<BalanceState>[] = [
    {
        id: 7401,
        prompt: { eu: 'Ebatzi $x+2=8$ balantzarekin.', es: 'Resuelve $x+2=8$ con la balanza.', ar: 'حلّ $x+2=8$ بالميزان.' },
        hint: { eu: 'Kendu unitate bat bi platerretatik, bi aldiz.', es: 'Quita una unidad de los dos platos, dos veces.', ar: 'أزل وحدة من الكفتين مرتين.' },
        isSolved: (state) => state.finished.includes(1)
    },
    {
        id: 7402,
        prompt: { eu: 'Ebatzi $2x+1=7$: lehenik unitateak, gero zatitu.', es: 'Resuelve $2x+1=7$: primero las unidades, después divide.', ar: 'حلّ $2x+1=7$: الوحدات أولًا ثم القسمة.' },
        hint: { eu: '$2x=6$ lortu ondoren, zatitu bi kutxatan.', es: 'Cuando tengas $2x=6$, divide entre las dos cajas.', ar: 'عندما تحصل على $2x=6$ اقسم على الصندوقين.' },
        isSolved: (state) => state.finished.includes(2)
    },
    {
        id: 7403,
        prompt: { eu: 'Ebatzi $3x+2=11$.', es: 'Resuelve $3x+2=11$.', ar: 'حلّ $3x+2=11$.' },
        hint: { eu: '$3x=9$ eta gero hiru zatitan.', es: '$3x=9$ y después en tres partes.', ar: '$3x=9$ ثم ثلاثة أجزاء.' },
        isSolved: (state) => state.finished.includes(3)
    },
    {
        id: 7404,
        prompt: { eu: 'Ebatzi $4x+3=15$ balantza desorekatu gabe (akatsik gabe).', es: 'Resuelve $4x+3=15$ sin desequilibrar la balanza (sin errores).', ar: 'حلّ $4x+3=15$ دون أن يختلّ الميزان (دون أخطاء).' },
        hint: { eu: 'Ezin da zatitu plater batean unitate solteak dauden bitartean.', es: 'No se puede dividir mientras queden unidades sueltas en un plato.', ar: 'لا يمكن القسمة ما دامت هناك وحدات منفردة في كفة.' },
        isSolved: (state) => state.exercise === 4 && balanceSolved(state) && state.mistakes === 0
    }
]

/* ---------- Trial and error ---------- */

export interface TrialEquation {
    left: Linear
    right: Linear
}

export const trialEquations: TrialEquation[] = [
    { left: linear(2, 3), right: linear(0, 11) },
    { left: linear(-1, 11), right: linear(0, 6) },
    { left: linear(5, -4), right: linear(3, 6) },
    { left: linear(3, -2), right: linear(1, 8) }
]

export const TRIAL_LIMITS = { min: -5, max: 12 } as const

export interface TrialState {
    equation: number
    x: number
    /** Values tried for each equation */
    tried: Record<number, number[]>
}

export const initialTrialState: TrialState = { equation: 0, x: 0, tried: {} }

export function tryValue(state: TrialState, x: number): TrialState {
    const next = Math.min(TRIAL_LIMITS.max, Math.max(TRIAL_LIMITS.min, Math.round(x)))
    const tried = state.tried[state.equation] ?? []
    return { ...state, x: next, tried: { ...state.tried, [state.equation]: tried.includes(next) ? tried : [...tried, next] } }
}

export const setTrialEquation = (state: TrialState, equation: number): TrialState => ({ ...state, equation: Math.min(trialEquations.length - 1, Math.max(0, equation)), x: 0 })

export function trialSides(state: Pick<TrialState, 'equation' | 'x'>): { left: number; right: number } {
    const equation = trialEquations[state.equation]
    return { left: valueAt(equation.left, state.x), right: valueAt(equation.right, state.x) }
}

const foundSolution = (state: TrialState, equation: number) => state.equation === equation && (() => { const { left, right } = trialSides(state); return left === right })()

export const trialChallenges: LabChallenge<TrialState>[] = [
    {
        id: 7501,
        prompt: { eu: 'Aurkitu $2x+3=11$ ebazpena probatuz.', es: 'Encuentra la solución de $2x+3=11$ probando.', ar: 'جد حل $2x+3=11$ بالتجربة.' },
        hint: { eu: 'x = 3 laburregia da (9); probatu handiago bat.', es: 'x = 3 se queda corto (9); prueba uno mayor.', ar: 'x = 3 أقل (9)؛ جرّب قيمة أكبر.' },
        isSolved: (state) => foundSolution(state, 0)
    },
    {
        id: 7502,
        prompt: { eu: 'Aurkitu $11-x=6$ ebazpena.', es: 'Encuentra la solución de $11-x=6$.', ar: 'جد حل $11-x=6$.' },
        hint: { eu: 'Kontuz: x handitzean, lehen atala txikitzen da.', es: 'Cuidado: al aumentar x, el primer miembro disminuye.', ar: 'انتبه: عند زيادة x يصغر الطرف الأول.' },
        isSolved: (state) => foundSolution(state, 1)
    },
    {
        id: 7503,
        prompt: { eu: 'Aurkitu $5x-4=3x+6$ ebazpena gehienez 4 probatan.', es: 'Encuentra la solución de $5x-4=3x+6$ en 4 intentos como máximo.', ar: 'جد حل $5x-4=3x+6$ في 4 محاولات على الأكثر.' },
        hint: { eu: 'Begiratu zenbat aldatzen den aldea x bakoitzeko.', es: 'Mira cuánto cambia la diferencia con cada x.', ar: 'انظر كم يتغيّر الفرق مع كل x.' },
        isSolved: (state) => foundSolution(state, 2) && (state.tried[2]?.length ?? 99) <= 4
    },
    {
        id: 7504,
        prompt: { eu: 'Aurkitu $3x-2=x+8$ ebazpena.', es: 'Encuentra la solución de $3x-2=x+8$.', ar: 'جد حل $3x-2=x+8$.' },
        hint: { eu: 'Bi ataletan dago x: konparatu biak.', es: 'Hay x en los dos miembros: compáralos.', ar: 'يوجد x في الطرفين: قارن بينهما.' },
        isSolved: (state) => foundSolution(state, 3)
    }
]

export const algebraLabChallengeIds: number[] = [
    ...translateChallenges,
    ...machineChallenges,
    ...tilesChallenges,
    ...balanceChallenges,
    ...trialChallenges
].map((challenge) => challenge.id)
