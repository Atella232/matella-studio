import { checkAnswer, equals, fraction, type AnswerForm, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo, OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import {
    compareRelation,
    equivalenceResult,
    labTools,
    productResult,
    proportionResult,
    sumParts,
    type CompareState,
    type EquivalenceState,
    type NumberLineRange,
    type NumberLineState,
    type PartsState,
    type ProductState,
    type ProportionState,
    type SumState,
    type WallPiece,
    type WallState
} from '../../dbh2-zatikiak-prototype/lab/labTools.ts'
import type { FractionsIntroStageId } from '../lessons.tsx'

/* ==========================================================================
   Zatikiak (1. DBH) laboratory: the eight 2. DBH tools with first-year
   challenges from Santillana (cheese boxes, the sponge cake, the stickers,
   the garrafa). No negative fractions (the number line stops at 0) and no
   percentages (the quantities tool only takes fractions of a quantity).
   Tests in tests/zatikiak-dbh1-lab.test.ts.
   ========================================================================== */

export type FractionsIntroLabToolId = 'parts' | 'numberline' | 'wall' | 'equivalence' | 'compare' | 'addsub' | 'muldiv' | 'proportion'

export interface FractionsIntroLabTool extends LabToolInfo {
    id: FractionsIntroLabToolId
    stage: FractionsIntroStageId
}

const shared = (id: FractionsIntroLabToolId) => labTools.find((tool) => tool.id === id)!

export const INTRO_NUMBER_LINE_RANGES: NumberLineRange[] = ['0-1', '0-2', '0-3']
export const INTRO_PROPORTION_MODES: Array<ProportionState['mode']> = ['of']

export const fractionsIntroLabTools: FractionsIntroLabTool[] = [
    { ...shared('parts'), id: 'parts', stage: 'meaning', lessonTopic: 'represent' },
    { ...shared('numberline'), id: 'numberline', stage: 'types', lessonTopic: 'line' },
    { ...shared('wall'), id: 'wall', stage: 'equivalence', lessonTopic: 'equivalent' },
    { ...shared('equivalence'), id: 'equivalence', stage: 'equivalence', lessonTopic: 'amplify-simplify' },
    { ...shared('compare'), id: 'compare', stage: 'equivalence', lessonTopic: 'compare' },
    { ...shared('addsub'), id: 'addsub', stage: 'operations', lessonTopic: 'add-different' },
    { ...shared('muldiv'), id: 'muldiv', stage: 'operations', lessonTopic: 'multiply' },
    {
        ...shared('proportion'),
        id: 'proportion',
        stage: 'problems',
        lessonTopic: 'fraction-of',
        title: { eu: 'Kopuru baten zatikia', es: 'Fracción de una cantidad', ar: 'كسر من كمية' },
        observe: {
            eu: 'Kopuru baten zatikia kalkulatzeko, banatu kopurua izendatzaileak adina zati berdinetan eta hartu zenbakitzaileak adina.',
            es: 'Para calcular la fracción de una cantidad, reparte la cantidad en tantas partes iguales como el denominador y toma tantas como el numerador.',
            ar: 'لحساب كسر من كمية، وزّع الكمية على أجزاء متساوية بعدد المقام وخذ منها بعدد البسط.'
        }
    }
]

export const fractionsIntroLabToolForTopic: Record<string, FractionsIntroLabToolId | undefined> = {
    what: 'parts',
    represent: 'parts',
    division: 'numberline',
    types: 'parts',
    mixed: 'parts',
    line: 'numberline',
    equivalent: 'wall',
    'amplify-simplify': 'equivalence',
    compare: 'compare',
    'add-same': 'addsub',
    'add-different': 'addsub',
    multiply: 'muldiv',
    divide: 'muldiv',
    'fraction-of': 'proportion',
    problems: 'proportion'
}

const answered = (state: OperationAnswer, expected: FractionValue, form: AnswerForm = 'any') => checkAnswer(state.answer, expected, form) === 'correct'
const sameTerms = (value: FractionValue, numerator: number, denominator: number) => value.numerator === numerator && value.denominator === denominator
const isPiece = (piece: WallPiece | null, numerator: number, denominator: number) => piece !== null && sameTerms(piece, numerator, denominator)
const pair = (first: FractionValue, second: FractionValue, a: [number, number], b: [number, number], ordered = false) =>
    (sameTerms(first, ...a) && sameTerms(second, ...b)) || (!ordered && sameTerms(first, ...b) && sameTerms(second, ...a))
const predictedRight = (state: CompareState) => state.guess !== null && state.guess === compareRelation(state)

/* ---------- Parts of a whole ---------- */

export const introPartsChallenges: LabChallenge<PartsState>[] = [
    {
        id: 5101,
        prompt: { eu: 'Gazta-kutxa: zirkulu bat 8 zatitan, eta Jonek jandako 3 zatiak koloreztatuta.', es: 'La caja de quesitos: un círculo en 8 partes, con las 3 que se ha comido Juan coloreadas.', ar: 'علبة الجبن: دائرة من 8 أجزاء، مع تلوين الأجزاء الثلاثة التي أكلها خوان.' },
        hint: { eu: 'Aukeratu zirkulua, 8 zati, eta sakatu 3.', es: 'Elige el círculo, 8 partes, y pulsa 3.', ar: 'اختر الدائرة و8 أجزاء واضغط 3.' },
        isSolved: (state) => state.shape === 'circle' && state.denominator === 8 && state.filled.length === 3
    },
    {
        id: 5102,
        prompt: { eu: 'Mariaren bizkotxoa: laukizuzen bat 6 zatitan, 2 koloreztatuta.', es: 'El bizcocho de María: un rectángulo en 6 partes, con 2 coloreadas.', ar: 'كعكة ماريا: مستطيل من 6 أجزاء، ملوّن منها 2.' },
        hint: { eu: 'Aukeratu laukizuzena (sareta).', es: 'Elige el rectángulo (cuadrícula).', ar: 'اختر المستطيل (الشبكة).' },
        isSolved: (state) => state.shape === 'grid' && state.denominator === 6 && state.filled.length === 2
    },
    {
        id: 5103,
        prompt: { eu: 'Erakutsi $\\frac{8}{8}$: kutxa osoa.', es: 'Muestra $\\frac{8}{8}$: la caja entera.', ar: 'اعرض $\\frac{8}{8}$: العلبة كاملة.' },
        hint: { eu: 'Unitate bat, 8 zati, denak koloreztatuta.', es: 'Una unidad, 8 partes, todas coloreadas.', ar: 'وحدة واحدة، 8 أجزاء، كلها ملوّنة.' },
        isSolved: (state) => state.denominator === 8 && state.filled.length === 8
    },
    {
        id: 5104,
        prompt: { eu: 'Erakutsi $\\frac{11}{8}$: kutxa bat eta beste baten 3 zati.', es: 'Muestra $\\frac{11}{8}$: una caja y 3 porciones de otra.', ar: 'اعرض $\\frac{11}{8}$: علبة و3 قطع من أخرى.' },
        hint: { eu: 'Behar dituzu bi unitate.', es: 'Necesitas dos unidades.', ar: 'تحتاج إلى وحدتين.' },
        isSolved: (state) => state.denominator === 8 && state.filled.length === 11
    }
]

/* ---------- Number line ---------- */

const lineValue = (state: NumberLineState): FractionValue => ({ numerator: state.numerator, denominator: state.denominator })

export const introNumberLineChallenges: LabChallenge<NumberLineState>[] = [
    {
        id: 5201,
        prompt: { eu: 'Kokatu $\\frac{2}{3}$ zuzenean.', es: 'Sitúa $\\frac{2}{3}$ en la recta.', ar: 'ضع $\\frac{2}{3}$ على المستقيم.' },
        hint: { eu: 'Unitatea 3 jauzitan; eman 2 jauzi.', es: 'La unidad en 3 saltos; da 2 saltos.', ar: 'الوحدة 3 قفزات؛ اقفز قفزتين.' },
        isSolved: (state) => equals(lineValue(state), fraction(2, 3))
    },
    {
        id: 5202,
        prompt: { eu: 'Kokatu $\\frac{5}{3}$: 1 eta 2 artean dago.', es: 'Sitúa $\\frac{5}{3}$: está entre 1 y 2.', ar: 'ضع $\\frac{5}{3}$: يقع بين 1 و2.' },
        hint: { eu: 'Aukeratu 0–2 tartea eta eman 3ko 5 jauzi.', es: 'Elige el tramo 0–2 y da 5 saltos de tercios.', ar: 'اختر المجال 0–2 واقفز 5 أثلاث.' },
        isSolved: (state) => equals(lineValue(state), fraction(5, 3))
    },
    {
        id: 5203,
        prompt: { eu: 'Kokatu $\\frac{11}{4}$. Zein bi zenbaki osoren artean dago?', es: 'Sitúa $\\frac{11}{4}$. ¿Entre qué dos enteros está?', ar: 'ضع $\\frac{11}{4}$. بين أي عددين صحيحين يقع؟' },
        hint: { eu: '$\\frac{11}{4}=2\\frac{3}{4}$: 0–3 tartea behar duzu.', es: '$\\frac{11}{4}=2\\frac{3}{4}$: necesitas el tramo 0–3.', ar: '$\\frac{11}{4}=2\\frac{3}{4}$: تحتاج إلى المجال 0–3.' },
        isSolved: (state) => equals(lineValue(state), fraction(11, 4))
    },
    {
        id: 5204,
        prompt: { eu: 'Kokatu 1 balio duen zatiki bat, seirenekin.', es: 'Sitúa una fracción que valga 1, con sextos.', ar: 'ضع كسرًا قيمته 1 بالأسداس.' },
        hint: { eu: 'Zenbakitzailea = izendatzailea.', es: 'Numerador = denominador.', ar: 'البسط = المقام.' },
        isSolved: (state) => state.denominator === 6 && state.numerator === 6
    }
]

/* ---------- Fraction wall ---------- */

export const introWallChallenges: LabChallenge<WallState>[] = [
    {
        id: 5301,
        prompt: { eu: 'Aurkitu erdiaren baliokide bat, izendatzailea 2 baino handiagoa duena.', es: 'Encuentra una fracción equivalente a un medio con denominador mayor que 2.', ar: 'جد كسرًا يكافئ النصف مقامه أكبر من 2.' },
        hint: { eu: 'Begiratu $\\frac{1}{2}$ren marrara zein zati iristen diren.', es: 'Mira qué piezas llegan a la línea de $\\frac{1}{2}$.', ar: 'انظر أي القطع تصل إلى خط $\\frac{1}{2}$.' },
        isSolved: (state) => state.mode === 'equivalent' && state.first !== null && state.first.denominator > 2 && equals(state.first, fraction(1, 2))
    },
    {
        id: 5302,
        prompt: { eu: 'Hautatu $\\frac{2}{3}$ eta ikusi bere baliokideak.', es: 'Selecciona $\\frac{2}{3}$ y mira sus equivalentes.', ar: 'اختر $\\frac{2}{3}$ وانظر إلى الكسور المكافئة له.' },
        hint: { eu: 'Herenen errenkadan, bigarren zatia.', es: 'En la fila de los tercios, la segunda pieza.', ar: 'في صف الأثلاث، القطعة الثانية.' },
        isSolved: (state) => state.mode === 'equivalent' && isPiece(state.first, 2, 3)
    },
    {
        id: 5303,
        prompt: { eu: 'Konparatu Jorgeren $\\frac{2}{3}$ eta Lucasen $\\frac{3}{4}$.', es: 'Compara los $\\frac{2}{3}$ de Jorge y los $\\frac{3}{4}$ de Lucas.', ar: 'قارن $\\frac{2}{3}$ خورخي و$\\frac{3}{4}$ لوكاس.' },
        hint: { eu: 'Konparatu moduan, hautatu bi zatiak.', es: 'En modo comparar, selecciona las dos piezas.', ar: 'في وضع المقارنة اختر القطعتين.' },
        isSolved: (state) => state.mode === 'compare' && ((isPiece(state.first, 2, 3) && isPiece(state.second, 3, 4)) || (isPiece(state.first, 3, 4) && isPiece(state.second, 2, 3)))
    },
    {
        id: 5304,
        prompt: { eu: 'Konparatu $\\frac{1}{2}$ eta $\\frac{3}{5}$. Zein iristen da urrunago?', es: 'Compara $\\frac{1}{2}$ y $\\frac{3}{5}$. ¿Cuál llega más lejos?', ar: 'قارن $\\frac{1}{2}$ و$\\frac{3}{5}$. أيهما يصل أبعد؟' },
        hint: { eu: 'Urrunago iristen dena da handiena.', es: 'La que llega más lejos es la mayor.', ar: 'الذي يصل أبعد هو الأكبر.' },
        isSolved: (state) => state.mode === 'compare' && ((isPiece(state.first, 1, 2) && isPiece(state.second, 3, 5)) || (isPiece(state.first, 3, 5) && isPiece(state.second, 1, 2)))
    }
]

/* ---------- Amplify and simplify ---------- */

export const introEquivalenceChallenges: LabChallenge<EquivalenceState>[] = [
    {
        id: 5401,
        prompt: { eu: 'Anplifikatu $\\frac{3}{5}$ eta lortu $\\frac{6}{10}$.', es: 'Amplifica $\\frac{3}{5}$ hasta $\\frac{6}{10}$.', ar: 'وسّع $\\frac{3}{5}$ حتى $\\frac{6}{10}$.' },
        hint: { eu: 'Zati bakoitza 2 zatitan.', es: 'Cada porción en 2 trozos.', ar: 'كل جزء إلى قطعتين.' },
        isSolved: (state) => state.mode === 'amplify' && sameTerms(state, 3, 5) && sameTerms(equivalenceResult(state), 6, 10)
    },
    {
        id: 5402,
        prompt: { eu: 'Anplifikatu $\\frac{3}{4}$ eta lortu $\\frac{9}{12}$.', es: 'Amplifica $\\frac{3}{4}$ hasta $\\frac{9}{12}$.', ar: 'وسّع $\\frac{3}{4}$ حتى $\\frac{9}{12}$.' },
        hint: { eu: '4tik 12ra: bider 3.', es: 'De 4 a 12: por 3.', ar: 'من 4 إلى 12: في 3.' },
        isSolved: (state) => sameTerms(state, 3, 4) && sameTerms(equivalenceResult(state), 9, 12)
    },
    {
        id: 5403,
        prompt: { eu: 'Sinplifikatu $\\frac{6}{9}$ laburtezina lortu arte.', es: 'Simplifica $\\frac{6}{9}$ hasta la irreducible.', ar: 'بسّط $\\frac{6}{9}$ حتى أبسط صورة.' },
        hint: { eu: '6k eta 9k 3 dute komunean.', es: '6 y 9 tienen el 3 en común.', ar: 'للعددين 6 و9 القاسم المشترك 3.' },
        isSolved: (state) => state.mode === 'simplify' && sameTerms(state, 6, 9) && sameTerms(equivalenceResult(state), 2, 3)
    },
    {
        id: 5404,
        prompt: { eu: 'Sinplifikatu $\\frac{10}{12}$ laburtezina lortu arte.', es: 'Simplifica $\\frac{10}{12}$ hasta la irreducible.', ar: 'بسّط $\\frac{10}{12}$ حتى أبسط صورة.' },
        hint: { eu: 'Biak bikoitiak dira.', es: 'Los dos son pares.', ar: 'كلاهما زوجي.' },
        isSolved: (state) => state.mode === 'simplify' && sameTerms(state, 10, 12) && sameTerms(equivalenceResult(state), 5, 6)
    }
]

/* ---------- Compare ---------- */

export const introCompareChallenges: LabChallenge<CompareState>[] = [
    {
        id: 5501,
        prompt: { eu: 'Konparatu $\\frac{5}{7}$ eta $\\frac{3}{7}$, eta asmatu ikurra.', es: 'Compara $\\frac{5}{7}$ y $\\frac{3}{7}$ y acierta el signo.', ar: 'قارن $\\frac{5}{7}$ و$\\frac{3}{7}$ وأصب الرمز.' },
        hint: { eu: 'Izendatzaile bera: zenbakitzaile handiena.', es: 'Mismo denominador: el de mayor numerador.', ar: 'المقام نفسه: صاحب البسط الأكبر.' },
        isSolved: (state) => pair(state.first, state.second, [5, 7], [3, 7]) && predictedRight(state)
    },
    {
        id: 5502,
        prompt: { eu: 'Konparatu $\\frac{3}{5}$ eta $\\frac{3}{8}$, eta asmatu ikurra.', es: 'Compara $\\frac{3}{5}$ y $\\frac{3}{8}$ y acierta el signo.', ar: 'قارن $\\frac{3}{5}$ و$\\frac{3}{8}$ وأصب الرمز.' },
        hint: { eu: 'Zenbakitzaile bera: zati handienak izendatzaile txikienekoak dira.', es: 'Mismo numerador: los trozos más grandes son los del menor denominador.', ar: 'البسط نفسه: أكبر القطع لصاحب المقام الأصغر.' },
        isSolved: (state) => pair(state.first, state.second, [3, 5], [3, 8]) && predictedRight(state)
    },
    {
        id: 5503,
        prompt: { eu: 'Konparatu $\\frac{2}{3}$ eta $\\frac{3}{4}$ izendatzaile komunarekin.', es: 'Compara $\\frac{2}{3}$ y $\\frac{3}{4}$ con denominador común.', ar: 'قارن $\\frac{2}{3}$ و$\\frac{3}{4}$ بمقام مشترك.' },
        hint: { eu: 'Biak hamabiren gisa: $\\frac{8}{12}$ eta $\\frac{9}{12}$.', es: 'Las dos en doceavos: $\\frac{8}{12}$ y $\\frac{9}{12}$.', ar: 'الاثنان بالمقام 12: $\\frac{8}{12}$ و$\\frac{9}{12}$.' },
        isSolved: (state) => state.strategy === 'common' && pair(state.first, state.second, [2, 3], [3, 4]) && predictedRight(state)
    },
    {
        id: 5504,
        prompt: { eu: 'Aurkitu gai desberdinak dituzten bi zatiki baliokide eta aukeratu =.', es: 'Encuentra dos fracciones equivalentes con términos distintos y elige =.', ar: 'جد كسرين متكافئين بحدود مختلفة واختر =.' },
        hint: { eu: 'Adibidez $\\frac{1}{2}$ eta $\\frac{3}{6}$.', es: 'Por ejemplo $\\frac{1}{2}$ y $\\frac{3}{6}$.', ar: 'مثلًا $\\frac{1}{2}$ و$\\frac{3}{6}$.' },
        isSolved: (state) => state.guess === '=' && equals(state.first, state.second) && !sameTerms(state.first, state.second.numerator, state.second.denominator)
    }
]

/* ---------- Addition and subtraction ---------- */

export const introSumChallenges: LabChallenge<SumState>[] = [
    {
        id: 5601,
        prompt: { eu: 'Kalkulatu $\\frac{2}{7}+\\frac{3}{7}$.', es: 'Calcula $\\frac{2}{7}+\\frac{3}{7}$.', ar: 'احسب $\\frac{2}{7}+\\frac{3}{7}$.' },
        hint: { eu: 'Izendatzaile bera: batu zenbakitzaileak.', es: 'Mismo denominador: suma los numeradores.', ar: 'المقام نفسه: اجمع البسوط.' },
        isSolved: (state) => state.op === 'add' && pair(state.first, state.second, [2, 7], [3, 7]) && answered(state, fraction(5, 7))
    },
    {
        id: 5602,
        prompt: { eu: 'Kalkulatu $\\frac{1}{2}+\\frac{1}{4}$.', es: 'Calcula $\\frac{1}{2}+\\frac{1}{4}$.', ar: 'احسب $\\frac{1}{2}+\\frac{1}{4}$.' },
        hint: { eu: 'Erdia bi laurden dira.', es: 'Un medio son dos cuartos.', ar: 'النصف ربعان.' },
        isSolved: (state) => state.op === 'add' && pair(state.first, state.second, [1, 2], [1, 4]) && answered(state, fraction(3, 4))
    },
    {
        id: 5603,
        prompt: { eu: 'Kalkulatu $\\frac{5}{6}-\\frac{1}{3}$.', es: 'Calcula $\\frac{5}{6}-\\frac{1}{3}$.', ar: 'احسب $\\frac{5}{6}-\\frac{1}{3}$.' },
        hint: { eu: 'Heren bat bi seiren dira.', es: 'Un tercio son dos sextos.', ar: 'الثلث سدسان.' },
        isSolved: (state) => state.op === 'subtract' && pair(state.first, state.second, [5, 6], [1, 3], true) && answered(state, fraction(1, 2))
    },
    {
        id: 5604,
        prompt: { eu: 'Batu izendatzaile desberdineko bi zatiki eta lortu zehazki 1.', es: 'Suma dos fracciones de distinto denominador que den exactamente 1.', ar: 'اجمع كسرين بمقامين مختلفين ليكون الناتج 1 تمامًا.' },
        hint: { eu: 'Adibidez $\\frac{1}{2}+\\frac{2}{4}$ edo $\\frac{1}{3}+\\frac{4}{6}$.', es: 'Por ejemplo $\\frac{1}{2}+\\frac{2}{4}$ o $\\frac{1}{3}+\\frac{4}{6}$.', ar: 'مثلًا $\\frac{1}{2}+\\frac{2}{4}$ أو $\\frac{1}{3}+\\frac{4}{6}$.' },
        isSolved: (state) => state.op === 'add' && state.first.denominator !== state.second.denominator && equals(sumParts(state).result, fraction(1))
    }
]

/* ---------- Multiplication and division ---------- */

export const introProductChallenges: LabChallenge<ProductState>[] = [
    {
        id: 5701,
        prompt: { eu: 'Kalkulatu $\\frac{2}{3}\\cdot\\frac{3}{4}$ eta sinplifikatu.', es: 'Calcula $\\frac{2}{3}\\cdot\\frac{3}{4}$ y simplifica.', ar: 'احسب $\\frac{2}{3}\\cdot\\frac{3}{4}$ وبسّط.' },
        hint: { eu: 'Goikoak goikoekin, behekoak behekoekin: $\\frac{6}{12}$.', es: 'Arriba con arriba, abajo con abajo: $\\frac{6}{12}$.', ar: 'الأعلى في الأعلى والأسفل في الأسفل: $\\frac{6}{12}$.' },
        isSolved: (state) => state.op === 'multiply' && pair(state.first, state.second, [2, 3], [3, 4]) && answered(state, fraction(1, 2), 'simplified')
    },
    {
        id: 5702,
        prompt: { eu: 'Kalkulatu $\\frac{3}{5}\\cdot\\frac{1}{3}$.', es: 'Calcula $\\frac{3}{5}\\cdot\\frac{1}{3}$.', ar: 'احسب $\\frac{3}{5}\\cdot\\frac{1}{3}$.' },
        hint: { eu: '$\\frac{3}{15}$ sinplifika daiteke.', es: '$\\frac{3}{15}$ se puede simplificar.', ar: 'يمكن تبسيط $\\frac{3}{15}$.' },
        isSolved: (state) => state.op === 'multiply' && pair(state.first, state.second, [3, 5], [1, 3]) && answered(state, fraction(1, 5))
    },
    {
        id: 5703,
        prompt: { eu: 'Zenbat zortziren sartzen dira $\\frac{3}{4}$-n? Kalkulatu $\\frac{3}{4}\\mathbin{:}\\frac{1}{8}$.', es: '¿Cuántos octavos caben en $\\frac{3}{4}$? Calcula $\\frac{3}{4}\\mathbin{:}\\frac{1}{8}$.', ar: 'كم ثُمنًا في $\\frac{3}{4}$؟ احسب $\\frac{3}{4}\\mathbin{:}\\frac{1}{8}$.' },
        hint: { eu: 'Gurutzean: $3\\cdot 8$ eta $4\\cdot 1$.', es: 'En cruz: $3\\cdot 8$ y $4\\cdot 1$.', ar: 'تبادليًا: $3\\cdot 8$ و$4\\cdot 1$.' },
        isSolved: (state) => state.op === 'divide' && pair(state.first, state.second, [3, 4], [1, 8], true) && answered(state, fraction(6))
    },
    {
        id: 5704,
        prompt: { eu: 'Kalkulatu $\\frac{1}{2}\\mathbin{:}\\frac{1}{4}$: zenbat laurden erdi batean?', es: 'Calcula $\\frac{1}{2}\\mathbin{:}\\frac{1}{4}$: ¿cuántos cuartos hay en un medio?', ar: 'احسب $\\frac{1}{2}\\mathbin{:}\\frac{1}{4}$: كم ربعًا في النصف؟' },
        hint: { eu: 'Erdia bi laurden dira.', es: 'Un medio son dos cuartos.', ar: 'النصف ربعان.' },
        isSolved: (state) => state.op === 'divide' && pair(state.first, state.second, [1, 2], [1, 4], true) && answered(state, fraction(2)) && equals(productResult(state), fraction(2))
    }
]

/* ---------- Fraction of a quantity ---------- */

export const introProportionChallenges: LabChallenge<ProportionState>[] = [
    {
        id: 5801,
        prompt: { eu: 'Kalkulatu 120ren $\\frac{3}{8}$.', es: 'Calcula $\\frac{3}{8}$ de 120.', ar: 'احسب $\\frac{3}{8}$ من 120.' },
        hint: { eu: '$120\\mathbin{:}8=15$; hartu 3 zati.', es: '$120\\mathbin{:}8=15$; toma 3 partes.', ar: '$120\\mathbin{:}8=15$؛ خذ 3 أجزاء.' },
        isSolved: (state) => state.mode === 'of' && sameTerms(state, 3, 8) && state.quantity === 120 && answered(state, fraction(45))
    },
    {
        id: 5802,
        prompt: { eu: 'Kalkulatu 20ren $\\frac{3}{4}$.', es: 'Calcula $\\frac{3}{4}$ de 20.', ar: 'احسب $\\frac{3}{4}$ من 20.' },
        hint: { eu: 'Laurden bat: $20\\mathbin{:}4=5$.', es: 'Un cuarto: $20\\mathbin{:}4=5$.', ar: 'الربع: $20\\mathbin{:}4=5$.' },
        isSolved: (state) => state.mode === 'of' && sameTerms(state, 3, 4) && state.quantity === 20 && answered(state, fraction(15))
    },
    {
        id: 5803,
        prompt: { eu: 'Anek 30 €-ko pagaren $\\frac{2}{5}$ gastatu ditu. Zenbat euro?', es: 'Ana ha gastado $\\frac{2}{5}$ de su paga de 30 €. ¿Cuántos euros?', ar: 'أنفقت آنه $\\frac{2}{5}$ مصروفها البالغ 30 €. كم يورو؟' },
        hint: { eu: 'Bosten bat: $30\\mathbin{:}5=6$.', es: 'Un quinto: $30\\mathbin{:}5=6$.', ar: 'الخُمس: $30\\mathbin{:}5=6$.' },
        isSolved: (state) => state.mode === 'of' && sameTerms(state, 2, 5) && state.quantity === 30 && answered(state, fraction(12))
    },
    {
        id: 5804,
        prompt: { eu: 'Aukeratu 60ren zatiki bat 45 ematen duena, eta idatzi emaitza.', es: 'Elige una fracción de 60 que dé 45 y escribe el resultado.', ar: 'اختر كسرًا من 60 ناتجه 45 واكتب النتيجة.' },
        hint: { eu: '45 60ren hiru laurden dira.', es: '45 son tres cuartos de 60.', ar: '45 ثلاثة أرباع 60.' },
        isSolved: (state) => state.mode === 'of' && state.quantity === 60 && equals(proportionResult(state), fraction(45)) && answered(state, fraction(45))
    }
]

export const fractionsIntroLabChallengeIds: number[] = [
    ...introPartsChallenges,
    ...introNumberLineChallenges,
    ...introWallChallenges,
    ...introEquivalenceChallenges,
    ...introCompareChallenges,
    ...introSumChallenges,
    ...introProductChallenges,
    ...introProportionChallenges
].map((challenge) => challenge.id)
