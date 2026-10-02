import { checkAnswer, compare, equals, fraction, type AnswerForm, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo, OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import {
    compareRelation,
    equivalenceResult,
    labTools as fractionTools,
    productResult,
    type CompareState,
    type EquivalenceState,
    type NumberLineRange,
    type NumberLineState,
    type ProductState,
    type SumState
} from '../../dbh2-zatikiak-prototype/lab/labTools.ts'
import { decimalsChallenges, generatrixChallenges, realsLabTools } from '../../dbh4-aplikatuak-errealak/lab/labTools.ts'
import type { RationalsStageId } from '../lessons.tsx'
import { evaluate, hierarchyExpressions, type HierarchyState } from './hierarchy.ts'

/* ==========================================================================
   Zenbaki arrazionalak (3. DBH) laboratory. Five tools of the 2. DBH
   fractions unit (number line, equivalence, comparing, adding and
   subtracting, multiplying and dividing) with third-year challenges:
   negative fractions, irreducible results, a result that is a whole number.
   Two tools of the 4. DBH applied unit (fraction to decimal and the
   generating fraction) with their challenges, and one new tool: the order
   of operations, step by step. Tests in tests/arrazionalak-dbh3-lab.test.ts.
   ========================================================================== */

export type RationalsLabToolId = 'numberline' | 'equivalence' | 'compare' | 'addsub' | 'muldiv' | 'hierarchy' | 'decimals' | 'generatrix'

export interface RationalsLabTool extends LabToolInfo {
    id: RationalsLabToolId
    stage: RationalsStageId
}

const say = (eu: string, es: string, ar: string) => ({ eu, es, ar })
const shared = (id: string) => fractionTools.find((tool) => tool.id === id)!
const applied = (id: string) => realsLabTools.find((tool) => tool.id === id)!

export const RATIONALS_NUMBER_LINE_RANGES: NumberLineRange[] = ['-2-2', '0-3']

export const rationalsLabTools: RationalsLabTool[] = [
    { ...shared('equivalence'), id: 'equivalence', stage: 'fractions', lessonTopic: 'simplify' },
    { ...shared('numberline'), id: 'numberline', stage: 'order', lessonTopic: 'line' },
    { ...shared('compare'), id: 'compare', stage: 'order', lessonTopic: 'compare' },
    { ...shared('addsub'), id: 'addsub', stage: 'operations', lessonTopic: 'add-sub' },
    { ...shared('muldiv'), id: 'muldiv', stage: 'operations', lessonTopic: 'mul-div' },
    { id: 'hierarchy', stage: 'operations', lessonTopic: 'combined', title: say('Eragiketen ordena', 'El orden de las operaciones', 'ترتيب العمليات'), observe: say('Sakatu orain egin daitekeen eragiketaren ikurra: bi eragigaiak zenbakiak direnean bakarrik egin daiteke. Parentesiek eta biderketek itxaron arazten dute.', 'Pulsa el signo de la operación que se puede hacer ahora: solo se puede cuando sus dos operandos ya son números. Los paréntesis y los productos hacen esperar a los demás.', 'اضغط إشارة العملية التي يمكن إجراؤها الآن: لا يمكن إلا إذا كان طرفاها عددين. الأقواس والضرب تجعل غيرها تنتظر.') },
    { ...applied('decimals'), id: 'decimals', stage: 'decimals', lessonTopic: 'decimal-kinds' },
    { ...applied('generatrix'), id: 'generatrix', stage: 'decimals', lessonTopic: 'periodic-generatrix' }
]

export const rationalsLabToolForTopic: Record<string, RationalsLabToolId | undefined> = {
    'rational-meaning': 'numberline',
    equivalent: 'equivalence',
    simplify: 'equivalence',
    compare: 'compare',
    line: 'numberline',
    between: 'numberline',
    'add-sub': 'addsub',
    'mul-div': 'muldiv',
    combined: 'hierarchy',
    'decimal-kinds': 'decimals',
    'exact-generatrix': 'generatrix',
    'periodic-generatrix': 'generatrix',
    'fraction-of': 'muldiv',
    remaining: 'hierarchy',
    'whole-from-part': 'muldiv'
}

const value = (state: NumberLineState): FractionValue => ({ numerator: state.numerator, denominator: state.denominator })
const sameTerms = (fractionValue: FractionValue, numerator: number, denominator: number) => fractionValue.numerator === numerator && fractionValue.denominator === denominator
const isPair = (state: { first: FractionValue; second: FractionValue }, a: [number, number], b: [number, number], ordered = false) =>
    (sameTerms(state.first, ...a) && sameTerms(state.second, ...b)) || (!ordered && sameTerms(state.first, ...b) && sameTerms(state.second, ...a))
const answered = (state: OperationAnswer, expected: FractionValue, form: AnswerForm = 'any') => checkAnswer(state.answer, expected, form) === 'correct'

/* ---------- Number line ---------- */

export const rationalsNumberLineChallenges: LabChallenge<NumberLineState>[] = [
    { id: 31101, prompt: say('Kokatu $-\\frac{7}{4}$.', 'Sitúa $-\\frac{7}{4}$.', 'ضع $-\\frac{7}{4}$.'), hint: say('$-\\frac{7}{4}=-1-\\frac{3}{4}$: −1en ezkerrean, laurdenka.', '$-\\frac{7}{4}=-1-\\frac{3}{4}$: a la izquierda de −1, en cuartos.', '$-\\frac{7}{4}=-1-\\frac{3}{4}$: يسار −1 بالأرباع.'), isSolved: (state) => equals(value(state), fraction(-7, 4)) },
    { id: 31102, prompt: say('Kokatu $\\frac{17}{6}$.', 'Sitúa $\\frac{17}{6}$.', 'ضع $\\frac{17}{6}$.'), hint: say('$\\frac{17}{6}=2+\\frac{5}{6}$: 0tik 3ra doan zuzena, seirenak.', '$\\frac{17}{6}=2+\\frac{5}{6}$: la recta de 0 a 3, en sextos.', '$\\frac{17}{6}=2+\\frac{5}{6}$: المستقيم من 0 إلى 3 بالأسداس.'), isSolved: (state) => equals(value(state), fraction(17, 6)) },
    { id: 31103, prompt: say('Kokatu $-\\frac{1}{2}$ eta $-\\frac{1}{3}$ arteko zatiki bat.', 'Sitúa una fracción entre $-\\frac{1}{2}$ y $-\\frac{1}{3}$.', 'ضع كسرًا بين $-\\frac{1}{2}$ و$-\\frac{1}{3}$.'), hint: say('Hamabirenekin: $-\\frac{6}{12}$ eta $-\\frac{4}{12}$ artean, $-\\frac{5}{12}$.', 'Con doceavos: entre $-\\frac{6}{12}$ y $-\\frac{4}{12}$ está $-\\frac{5}{12}$.', 'بالأجزاء من اثني عشر: بين $-\\frac{6}{12}$ و$-\\frac{4}{12}$ يقع $-\\frac{5}{12}$.'), isSolved: (state) => compare(value(state), fraction(-1, 2)) > 0 && compare(value(state), fraction(-1, 3)) < 0 },
    { id: 31104, prompt: say('Kokatu $-1{,}25$ zatiki gisa.', 'Sitúa $-1{,}25$ como fracción.', 'ضع $-1.25$ كسرًا.'), hint: say('$-1{,}25=-\\frac{125}{100}=-\\frac{5}{4}$.', '$-1{,}25=-\\frac{125}{100}=-\\frac{5}{4}$.', '$-1.25=-\\frac{125}{100}=-\\frac{5}{4}$.'), isSolved: (state) => equals(value(state), fraction(-5, 4)) }
]

/* ---------- Equivalence ---------- */

export const rationalsEquivalenceChallenges: LabChallenge<EquivalenceState>[] = [
    { id: 31201, prompt: say('Anplifikatu $\\frac{5}{6}$ izendatzailea 30 izan dadin.', 'Amplifica $\\frac{5}{6}$ hasta que el denominador sea 30.', 'وسّع $\\frac{5}{6}$ حتى يصبح المقام 30.'), hint: say('$30:6=5$: biderkatu bi gaiak 5ez.', '$30:6=5$: multiplica los dos términos por 5.', '$30:6=5$: اضرب الحدين في 5.'), isSolved: (state) => state.mode === 'amplify' && sameTerms(state, 5, 6) && sameTerms(equivalenceResult(state), 25, 30) },
    { id: 31202, prompt: say('Sinplifikatu $\\frac{8}{12}$ zatiki laburtezinera pauso bakarrean.', 'Simplifica $\\frac{8}{12}$ hasta la irreducible en un solo paso.', 'اختزل $\\frac{8}{12}$ إلى أبسط صورة بخطوة واحدة.'), hint: say('z.k.h.(8, 12) = 4.', 'm.c.d.(8, 12) = 4.', 'ق.م.أ.(8، 12) = 4.'), isSolved: (state) => state.mode === 'simplify' && sameTerms(state, 8, 12) && state.divisor === 4 },
    { id: 31203, prompt: say('Sinplifikatu $\\frac{9}{12}$ zatiki laburtezinera.', 'Simplifica $\\frac{9}{12}$ hasta la irreducible.', 'اختزل $\\frac{9}{12}$ إلى أبسط صورة.'), hint: say('Zatitu 3z.', 'Divide entre 3.', 'اقسم على 3.'), isSolved: (state) => state.mode === 'simplify' && sameTerms(state, 9, 12) && sameTerms(equivalenceResult(state), 3, 4) },
    { id: 31204, prompt: say('Lortu $\\frac{12}{18}$, $\\frac{2}{3}$ anplifikatuta.', 'Consigue $\\frac{12}{18}$ amplificando $\\frac{2}{3}$.', 'احصل على $\\frac{12}{18}$ بتوسيع $\\frac{2}{3}$.'), hint: say('$12:2=6$: biderkatu 6z.', '$12:2=6$: multiplica por 6.', '$12:2=6$: اضرب في 6.'), isSolved: (state) => state.mode === 'amplify' && sameTerms(state, 2, 3) && sameTerms(equivalenceResult(state), 12, 18) }
]

/* ---------- Comparing ---------- */

const predictedRight = (state: CompareState) => state.guess !== null && state.guess === compareRelation(state)

export const rationalsCompareChallenges: LabChallenge<CompareState>[] = [
    { id: 31301, prompt: say('Konparatu $\\frac{5}{9}$ eta $\\frac{4}{7}$ gurutzeko biderkadurekin.', 'Compara $\\frac{5}{9}$ y $\\frac{4}{7}$ con productos cruzados.', 'قارن $\\frac{5}{9}$ و$\\frac{4}{7}$ بالضرب التبادلي.'), hint: say('$5\\cdot 7=35$ eta $9\\cdot 4=36$.', '$5\\cdot 7=35$ y $9\\cdot 4=36$.', '$5\\cdot 7=35$ و$9\\cdot 4=36$.'), isSolved: (state) => state.strategy === 'cross' && isPair(state, [5, 9], [4, 7]) && predictedRight(state) },
    { id: 31302, prompt: say('Konparatu $\\frac{7}{12}$ eta $\\frac{3}{5}$ izendatzaile komunarekin.', 'Compara $\\frac{7}{12}$ y $\\frac{3}{5}$ con denominador común.', 'قارن $\\frac{7}{12}$ و$\\frac{3}{5}$ بمقام مشترك.'), hint: say('m.k.t. = 60: $\\frac{35}{60}$ eta $\\frac{36}{60}$.', 'm.c.m. = 60: $\\frac{35}{60}$ y $\\frac{36}{60}$.', 'م.م.أ. = 60: $\\frac{35}{60}$ و$\\frac{36}{60}$.'), isSolved: (state) => state.strategy === 'common' && isPair(state, [7, 12], [3, 5]) && predictedRight(state) },
    { id: 31303, prompt: say('Aurkitu zenbakitzaile bera duten bi zatiki eta asmatu zein den handiena.', 'Busca dos fracciones con el mismo numerador y acierta cuál es mayor.', 'ابحث عن كسرين لهما البسط نفسه وخمّن أيهما أكبر.'), hint: say('Zenbakitzaile bera: izendatzaile txikiena duena da handiena.', 'Mismo numerador: es mayor la de menor denominador.', 'البسط نفسه: الأكبر صاحب المقام الأصغر.'), isSolved: (state) => state.first.numerator === state.second.numerator && state.first.denominator !== state.second.denominator && predictedRight(state) }
]

/* ---------- Adding and subtracting ---------- */

export const rationalsSumChallenges: LabChallenge<SumState>[] = [
    { id: 31401, prompt: say('Kalkulatu $\\frac{5}{6}-\\frac{3}{4}$.', 'Calcula $\\frac{5}{6}-\\frac{3}{4}$.', 'احسب $\\frac{5}{6}-\\frac{3}{4}$.'), hint: say('m.k.t. = 12: $\\frac{10}{12}-\\frac{9}{12}$.', 'm.c.m. = 12: $\\frac{10}{12}-\\frac{9}{12}$.', 'م.م.أ. = 12: $\\frac{10}{12}-\\frac{9}{12}$.'), isSolved: (state) => state.op === 'subtract' && isPair(state, [5, 6], [3, 4], true) && answered(state, fraction(1, 12)) },
    { id: 31402, prompt: say('Kalkulatu $\\frac{2}{9}+\\frac{5}{12}$.', 'Calcula $\\frac{2}{9}+\\frac{5}{12}$.', 'احسب $\\frac{2}{9}+\\frac{5}{12}$.'), hint: say('m.k.t.(9, 12) = 36.', 'm.c.m.(9, 12) = 36.', 'م.م.أ.(9، 12) = 36.'), isSolved: (state) => state.op === 'add' && isPair(state, [2, 9], [5, 12]) && answered(state, fraction(23, 36)) },
    { id: 31403, prompt: say('Egin emaitza negatiboa duen kenketa bat eta idatzi emaitza.', 'Haz una resta con resultado negativo y escribe el resultado.', 'أجرِ طرحًا نتيجته سالبة واكتب النتيجة.'), hint: say('Kendu zatiki handiago bat: $\\frac{1}{4}-\\frac{2}{3}$.', 'Resta una fracción mayor: $\\frac{1}{4}-\\frac{2}{3}$.', 'اطرح كسرًا أكبر: $\\frac{1}{4}-\\frac{2}{3}$.'), isSolved: (state) => state.op === 'subtract' && compare(state.first, state.second) < 0 && answered(state, fraction(state.first.numerator * state.second.denominator - state.second.numerator * state.first.denominator, state.first.denominator * state.second.denominator)) }
]

/* ---------- Multiplying and dividing ---------- */

export const rationalsProductChallenges: LabChallenge<ProductState>[] = [
    { id: 31501, prompt: say('Kalkulatu $\\frac{4}{5}\\cdot\\frac{5}{8}$ eta idatzi laburtezin gisa.', 'Calcula $\\frac{4}{5}\\cdot\\frac{5}{8}$ y escríbelo irreducible.', 'احسب $\\frac{4}{5}\\cdot\\frac{5}{8}$ واكتبه في أبسط صورة.'), hint: say('$\\frac{20}{40}$: sinplifikatu 20z.', '$\\frac{20}{40}$: simplifica entre 20.', '$\\frac{20}{40}$: اختزل على 20.'), isSolved: (state) => state.op === 'multiply' && isPair(state, [4, 5], [5, 8]) && answered(state, fraction(1, 2), 'simplified') },
    { id: 31502, prompt: say('Kalkulatu $\\frac{3}{4}:\\frac{9}{10}$ eta idatzi laburtezin gisa.', 'Calcula $\\frac{3}{4}:\\frac{9}{10}$ y escríbelo irreducible.', 'احسب $\\frac{3}{4}:\\frac{9}{10}$ واكتبه في أبسط صورة.'), hint: say('Gurutzean: $\\frac{3\\cdot 10}{4\\cdot 9}=\\frac{30}{36}$.', 'En cruz: $\\frac{3\\cdot 10}{4\\cdot 9}=\\frac{30}{36}$.', 'تبادليًا: $\\frac{3\\cdot 10}{4\\cdot 9}=\\frac{30}{36}$.'), isSolved: (state) => state.op === 'divide' && isPair(state, [3, 4], [9, 10], true) && answered(state, fraction(5, 6), 'simplified') },
    { id: 31503, prompt: say('Egin emaitza zenbaki osoa duen zatiketa bat.', 'Haz una división cuyo resultado sea un número entero.', 'أجرِ قسمة نتيجتها عدد صحيح.'), hint: say('Probatu $\\frac{3}{4}:\\frac{3}{8}$.', 'Prueba $\\frac{3}{4}:\\frac{3}{8}$.', 'جرّب $\\frac{3}{4}:\\frac{3}{8}$.'), isSolved: (state) => { const result = productResult(state); return state.op === 'divide' && result.numerator % result.denominator === 0 && answered(state, fraction(result.numerator, result.denominator)) } }
]

/* ---------- The order of operations ---------- */

export const hierarchyChallenges: LabChallenge<HierarchyState>[] = [
    { id: 31601, prompt: say('Ebatzi $\\frac{3}{2}-\\frac{4}{5}\\cdot\\frac{5}{6}$ akatsik gabe.', 'Resuelve $\\frac{3}{2}-\\frac{4}{5}\\cdot\\frac{5}{6}$ sin fallos.', 'حل $\\frac{3}{2}-\\frac{4}{5}\\cdot\\frac{5}{6}$ دون أخطاء.'), hint: say('Biderketa kenketaren aurretik.', 'El producto antes que la resta.', 'الضرب قبل الطرح.'), isSolved: (state) => state.clean.includes(0) },
    { id: 31602, prompt: say('Ebatzi parentesia duen bertsioa eta konparatu emaitzak.', 'Resuelve la versión con paréntesis y compara los resultados.', 'حل الصيغة ذات الأقواس وقارن النتيجتين.'), hint: say('Orain kenketa lehenik: parentesiaren barruan dago.', 'Ahora la resta primero: está dentro del paréntesis.', 'الآن الطرح أولًا: إنه داخل القوس.'), isSolved: (state) => state.clean.includes(0) && state.clean.includes(1) },
    { id: 31603, prompt: say('Ebatzi $\\frac{5}{3}:\\left(\\frac{1}{9}+\\frac{1}{6}\\right)$ akatsik gabe: zenbaki osoa da.', 'Resuelve $\\frac{5}{3}:\\left(\\frac{1}{9}+\\frac{1}{6}\\right)$ sin fallos: da un entero.', 'حل $\\frac{5}{3}:\\left(\\frac{1}{9}+\\frac{1}{6}\\right)$ دون أخطاء: النتيجة عدد صحيح.'), hint: say('Parentesia lehenik.', 'Primero el paréntesis.', 'القوس أولًا.'), isSolved: (state) => state.clean.includes(2) },
    { id: 31604, prompt: say('Ebatzi zenbaki negatiboak dituen adierazpena akatsik gabe.', 'Resuelve sin fallos la expresión con números negativos.', 'حل دون أخطاء التعبير الذي فيه أعداد سالبة.'), hint: say('Zatiketa batuketaren aurretik; zeinu bereko bi zenbakiren zatidura positiboa da.', 'La división antes que la suma; el cociente de dos números del mismo signo es positivo.', 'القسمة قبل الجمع؛ وخارج قسمة عددين بالإشارة نفسها موجب.'), isSolved: (state) => state.clean.includes(4) }
]

/** The values the expressions give, for the tests and the readout */
export const hierarchyValues = hierarchyExpressions.map(evaluate)

export const rationalsLabChallengeIds: number[] = [
    rationalsNumberLineChallenges,
    rationalsEquivalenceChallenges,
    rationalsCompareChallenges,
    rationalsSumChallenges,
    rationalsProductChallenges,
    hierarchyChallenges,
    decimalsChallenges,
    generatrixChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
