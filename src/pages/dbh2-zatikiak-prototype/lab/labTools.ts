import type { FractionStageId, LocalizedText, TheoryTopicId } from '../content.ts'
import { checkAnswer, compare, equals, fraction, gcd, hasTerminatingDecimal, type AnswerForm, type FractionValue } from '../math/fraction.ts'
import { freshAnswer, type LabChallenge, type LabToolInfo as UnitLabToolInfo, type LabToolProps, type OperationAnswer } from '../../../features/unit-v2/lab/types.ts'

export type { LabChallenge, OperationAnswer } from '../../../features/unit-v2/lab/types.ts'

export type LabToolId = 'parts' | 'numberline' | 'wall' | 'equivalence' | 'compare' | 'addsub' | 'muldiv' | 'proportion'

export interface LabToolInfo extends UnitLabToolInfo {
    id: LabToolId
    stage: FractionStageId
    lessonTopic: TheoryTopicId
    title: LocalizedText
    observe: LocalizedText
}

/** Props every lab tool receives from the laboratory */
export type ToolProps = LabToolProps<LabToolInfo>

export const labTools: LabToolInfo[] = [
    {
        id: 'parts',
        stage: 'meaning',
        lessonTopic: 'representation',
        title: { eu: 'Osoaren zatiak', es: 'Partes de un todo', ar: 'أجزاء من كلّ' },
        observe: {
            eu: 'Izendatzaileak unitate bakoitza zenbat zati berdinetan banatzen den adierazten du; zenbakitzaileak, zenbat koloreztatzen dituzun. Unitate batean sartzen direnak baino zati gehiago koloreztatzen badituzu, beste unitate bat behar duzu: zatikia inpropioa da.',
            es: 'El denominador dice en cuántas partes iguales se divide cada unidad; el numerador, cuántas coloreas. Si coloreas más partes de las que caben en una unidad, necesitas otra: la fracción es impropia.',
            ar: 'يبيّن المقام عدد الأجزاء المتساوية لكل وحدة، ويبيّن البسط عدد الأجزاء التي تلوّنها. إذا لوّنت أجزاء أكثر مما تتسع له وحدة واحدة فأنت بحاجة إلى وحدة أخرى: الكسر غير حقيقي.'
        }
    },
    {
        id: 'numberline',
        stage: 'meaning',
        lessonTopic: 'meaning',
        title: { eu: 'Zenbaki-zuzena', es: 'Recta numérica', ar: 'خط الأعداد' },
        observe: {
            eu: 'Zatiki bakoitza puntu bat da. Izendatzaileak unitate bakoitza zenbat jauzi berdinetan banatzen den adierazten du; zenbakitzaileak, 0tik zenbat jauzi egiten dituzun.',
            es: 'Cada fracción es un punto. El denominador dice en cuántos saltos iguales se divide cada unidad; el numerador, cuántos saltos das desde el 0.',
            ar: 'كل كسر نقطة. يبيّن المقام عدد القفزات المتساوية في كل وحدة، ويبيّن البسط عدد القفزات التي تقفزها من 0.'
        }
    },
    {
        id: 'wall',
        stage: 'equivalence',
        lessonTopic: 'equivalence',
        title: { eu: 'Zatikien horma', es: 'Muro de fracciones', ar: 'جدار الكسور' },
        observe: {
            eu: 'Errenkada bakoitza zati berdinetan banatutako unitate bat da. Lerro berera zehazki iristen diren zatikiak baliokideak dira; urrunago iristen dena handiagoa da.',
            es: 'Cada fila es una unidad partida en trozos iguales. Las fracciones que llegan exactamente a la misma línea son equivalentes; la que llega más lejos es mayor.',
            ar: 'كل صف وحدة مقسّمة إلى قطع متساوية. الكسور التي تصل تمامًا إلى الخط نفسه متكافئة، والتي تصل أبعد هي الأكبر.'
        }
    },
    {
        id: 'equivalence',
        stage: 'equivalence',
        lessonTopic: 'equivalence',
        title: { eu: 'Baliokidetasuna', es: 'Equivalencia', ar: 'التكافؤ' },
        observe: {
            eu: 'Anplifikatzeak zati bakoitza zati txikiagotan banatzen du; sinplifikatzeak zatiak talde berdinetan biltzen ditu. Bi kasuetan koloreztatutako zatia bera da: balioa ez da aldatzen.',
            es: 'Amplificar parte cada porción en trozos más pequeños; simplificar junta porciones en grupos iguales. En los dos casos la parte coloreada es la misma: el valor no cambia.',
            ar: 'التوسيع يقسّم كل جزء إلى قطع أصغر، والتبسيط يجمع الأجزاء في مجموعات متساوية. في الحالتين يبقى الجزء الملوّن نفسه: القيمة لا تتغيّر.'
        }
    },
    {
        id: 'compare',
        stage: 'ordering',
        lessonTopic: 'ordering',
        title: { eu: 'Konparatu', es: 'Comparar', ar: 'قارن' },
        observe: {
            eu: 'Aurreikusi lehenik zein den handiagoa eta gero egiaztatu estrategia batekin: izendatzaile komuna, zenbaki-zuzena edo biderketa gurutzatua.',
            es: 'Predice primero cuál es mayor y después compruébalo con una estrategia: denominador común, recta numérica o productos cruzados.',
            ar: 'توقّع أولًا أيهما أكبر ثم تحقّق باستعمال استراتيجية: مقام مشترك أو خط الأعداد أو الضرب التبادلي.'
        }
    },
    {
        id: 'addsub',
        stage: 'operations',
        lessonTopic: 'add-subtract',
        title: { eu: 'Batuketa eta kenketa', es: 'Suma y resta', ar: 'الجمع والطرح' },
        observe: {
            eu: 'Tamaina bereko zatiak bakarrik batu edo ken daitezke. Lehenik banatu bi barrak zati kopuru berean (izendatzaile komuna) eta gero bildu edo kendu zatiak.',
            es: 'Solo se pueden sumar o restar trozos del mismo tamaño. Primero parte las dos barras en el mismo número de partes (denominador común) y después junta o quita trozos.',
            ar: 'لا يمكن جمع أو طرح إلا القطع المتساوية في الحجم. قسّم الشريطين أولًا إلى العدد نفسه من الأجزاء (مقام مشترك) ثم اجمع القطع أو اطرحها.'
        }
    },
    {
        id: 'muldiv',
        stage: 'operations',
        lessonTopic: 'multiply-divide',
        title: { eu: 'Biderketa eta zatiketa', es: 'Multiplicación y división', ar: 'الضرب والقسمة' },
        observe: {
            eu: 'Biderkatzea zatiki baten zatikia hartzea da: bi eremuen gurutzea da biderkadura. Zatitzea bigarren zatikia lehenengoan zenbat aldiz sartzen den galdetzea da.',
            es: 'Multiplicar es tomar una fracción de otra: el cruce de las dos zonas es el producto. Dividir es preguntar cuántas veces cabe la segunda fracción en la primera.',
            ar: 'الضرب هو أخذ كسر من كسر آخر: تقاطع المنطقتين هو الناتج. والقسمة هي السؤال عن عدد مرات احتواء الكسر الأول على الكسر الثاني.'
        }
    },
    {
        id: 'proportion',
        stage: 'proportionality',
        lessonTopic: 'fraction-of',
        title: { eu: 'Kantitateak eta ehunekoak', es: 'Cantidades y porcentajes', ar: 'الكميات والنسب المئوية' },
        observe: {
            eu: 'Kantitate baten zatikia zati berdinetan banatu eta batzuk hartzea da. Ehuneko bat 100 izendatzailea duen zatikia da, eta hamartarra balio bera idazteko beste modu bat.',
            es: 'Una fracción de una cantidad es repartir en partes iguales y tomar algunas. Un porcentaje es una fracción con denominador 100, y un decimal es otra forma de escribir el mismo valor.',
            ar: 'كسر من كمية يعني تقسيمها إلى أجزاء متساوية وأخذ بعضها. النسبة المئوية كسر مقامه 100، والعدد العشري طريقة أخرى لكتابة القيمة نفسها.'
        }
    }
]

/** Lab tool that best illustrates each lesson (lessons without a matching tool are left out) */
export const labToolForTopic: Partial<Record<TheoryTopicId, LabToolId>> = {
    meaning: 'numberline',
    representation: 'parts',
    equivalence: 'equivalence',
    simplification: 'equivalence',
    ordering: 'compare',
    'add-subtract': 'addsub',
    'multiply-divide': 'muldiv',
    combined: 'addsub',
    'fraction-of': 'proportion',
    percentages: 'proportion',
    proportionality: 'proportion'
}

/* ---------- Parts of a whole ---------- */

export type PartsShape = 'bar' | 'circle' | 'grid'

export interface PartsState {
    shape: PartsShape
    /** Equal parts in every unit */
    denominator: number
    /** Number of whole units drawn */
    units: number
    /** Indices of the coloured parts, counted across all units */
    filled: number[]
}

export const PARTS_LIMITS = { minDenominator: 2, maxDenominator: 12, minUnits: 1, maxUnits: 4 } as const

export const initialPartsState: PartsState = { shape: 'bar', denominator: 4, units: 1, filled: [] }

function firstIndices(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index)
}

export function togglePart(state: PartsState, index: number): PartsState {
    if (index < 0 || index >= state.units * state.denominator) return state
    const filled = state.filled.includes(index)
        ? state.filled.filter((item) => item !== index)
        : [...state.filled, index].sort((a, b) => a - b)
    return { ...state, filled }
}

/** Changing the parts per unit keeps how many parts are coloured, as far as they still fit */
export function setPartsDenominator(state: PartsState, denominator: number): PartsState {
    const next = Math.min(PARTS_LIMITS.maxDenominator, Math.max(PARTS_LIMITS.minDenominator, denominator))
    return { ...state, denominator: next, filled: firstIndices(Math.min(state.filled.length, state.units * next)) }
}

export function setPartsUnits(state: PartsState, units: number): PartsState {
    const next = Math.min(PARTS_LIMITS.maxUnits, Math.max(PARTS_LIMITS.minUnits, units))
    return { ...state, units: next, filled: state.filled.filter((index) => index < next * state.denominator) }
}

export function fillAllParts(state: PartsState): PartsState {
    return { ...state, filled: firstIndices(state.units * state.denominator) }
}

export function clearParts(state: PartsState): PartsState {
    return { ...state, filled: [] }
}

/** Rows and columns for the rectangle model: the most square layout that splits it exactly */
export function gridLayout(denominator: number): { rows: number; columns: number } {
    let rows = 1
    for (let candidate = 1; candidate * candidate <= denominator; candidate += 1) {
        if (denominator % candidate === 0) rows = candidate
    }
    return { rows, columns: denominator / rows }
}

const partsCount = (state: PartsState, denominator: number, count: number) =>
    state.denominator === denominator && state.filled.length === count

export const partsChallenges: LabChallenge<PartsState>[] = [
    {
        id: 701,
        prompt: { eu: 'Koloreztatu barra baten 3/4.', es: 'Colorea 3/4 de una barra.', ar: 'لوّن 3/4 من شريط.' },
        hint: { eu: 'Aukeratu barra, zatitu 4 zati berdinetan eta koloreztatu 3.', es: 'Elige la barra, divídela en 4 partes iguales y colorea 3.', ar: 'اختر الشريط وقسّمه إلى 4 أجزاء متساوية ولوّن 3 منها.' },
        isSolved: (state) => state.shape === 'bar' && partsCount(state, 4, 3)
    },
    {
        id: 702,
        prompt: { eu: 'Irudikatu 5/6 zirkulu batekin.', es: 'Representa 5/6 con un círculo.', ar: 'مثّل 5/6 بدائرة.' },
        hint: { eu: 'Aukeratu zirkulua, zatitu seirenetan eta koloreztatu 5.', es: 'Elige el círculo, divídelo en sextos y colorea 5.', ar: 'اختر الدائرة وقسّمها إلى أسداس ولوّن 5 منها.' },
        isSolved: (state) => state.shape === 'circle' && partsCount(state, 6, 5)
    },
    {
        id: 703,
        prompt: { eu: 'Irudikatu 7/3. Zenbat unitate behar dituzu?', es: 'Representa 7/3. ¿Cuántas unidades necesitas?', ar: 'مثّل 7/3. كم وحدة تحتاج؟' },
        hint: { eu: 'Unitate bakoitzak 3 heren ditu: 2 unitaterekin 6/3ra baino ez zara iristen.', es: 'Cada unidad tiene 3 tercios: con 2 unidades solo llegas a 6/3.', ar: 'كل وحدة فيها 3 أثلاث: بوحدتين تصل فقط إلى 6/3.' },
        isSolved: (state) => partsCount(state, 3, 7)
    },
    {
        id: 704,
        prompt: { eu: 'Koloreztatu unitate baten erdia zortzirenak erabiliz.', es: 'Colorea la mitad de una unidad usando octavos.', ar: 'لوّن نصف وحدة باستعمال الأثمان.' },
        hint: { eu: 'Zatitu 8 zatitan. Zenbat dira erdia?', es: 'Divide en 8 partes. ¿Cuántas son la mitad?', ar: 'قسّم إلى 8 أجزاء. كم جزءًا يمثّل النصف؟' },
        isSolved: (state) => partsCount(state, 8, 4)
    }
]


/* ---------- Number line ---------- */

export type NumberLineRange = '0-1' | '0-2' | '0-3' | '-2-2'

export const numberLineRanges: Record<NumberLineRange, { min: number; max: number }> = {
    '0-1': { min: 0, max: 1 },
    '0-2': { min: 0, max: 2 },
    '0-3': { min: 0, max: 3 },
    '-2-2': { min: -2, max: 2 }
}

export const NUMBER_LINE_LIMITS = { minDenominator: 1, maxDenominator: 12 } as const

export interface NumberLineState {
    range: NumberLineRange
    /** Equal jumps in every unit */
    denominator: number
    /** Jumps from 0 (negative to the left) */
    numerator: number
}

export const initialNumberLineState: NumberLineState = { range: '0-1', denominator: 4, numerator: 1 }

export function numberLineBounds(state: NumberLineState): { min: number; max: number } {
    const { min, max } = numberLineRanges[state.range]
    return { min: min * state.denominator, max: max * state.denominator }
}

export function moveNumberLinePoint(state: NumberLineState, numerator: number): NumberLineState {
    const { min, max } = numberLineBounds(state)
    return { ...state, numerator: Math.min(max, Math.max(min, Math.round(numerator))) }
}

/** Changing the jumps per unit keeps the point as close as possible to where it was */
export function setNumberLineDenominator(state: NumberLineState, denominator: number): NumberLineState {
    const next = Math.min(NUMBER_LINE_LIMITS.maxDenominator, Math.max(NUMBER_LINE_LIMITS.minDenominator, denominator))
    return moveNumberLinePoint({ ...state, denominator: next }, (state.numerator / state.denominator) * next)
}

export function setNumberLineRange(state: NumberLineState, range: NumberLineRange): NumberLineState {
    return moveNumberLinePoint({ ...state, range }, state.numerator)
}

const lineValue = (state: NumberLineState): FractionValue => ({ numerator: state.numerator, denominator: state.denominator })

export const numberLineChallenges: LabChallenge<NumberLineState>[] = [
    {
        id: 801,
        prompt: { eu: 'Kokatu 3/4 zuzenean.', es: 'Coloca 3/4 en la recta.', ar: 'ضع 3/4 على خط الأعداد.' },
        hint: { eu: 'Zatitu unitate bakoitza 4 jauzitan eta egin 3.', es: 'Divide cada unidad en 4 saltos y da 3.', ar: 'قسّم كل وحدة إلى 4 قفزات واقفز 3.' },
        isSolved: (state) => equals(lineValue(state), fraction(3, 4))
    },
    {
        id: 802,
        prompt: { eu: 'Kokatu 7/3. Zein bi zenbaki osoren artean geratzen da?', es: 'Coloca 7/3. ¿Entre qué dos enteros queda?', ar: 'ضع 7/3. بين أي عددين صحيحين يقع؟' },
        hint: { eu: 'Gutxienez 3raino iristen den tarte bat behar duzu, heren bateko jauziekin.', es: 'Necesitas un tramo que llegue al menos hasta 3, con saltos de un tercio.', ar: 'تحتاج إلى مجال يصل إلى 3 على الأقل بقفزات من ثلث.' },
        isSolved: (state) => equals(lineValue(state), fraction(7, 3))
    },
    {
        id: 803,
        prompt: { eu: 'Kokatu −1/2.', es: 'Coloca −1/2.', ar: 'ضع −1/2.' },
        hint: { eu: 'Aukeratu −2tik 2rako tartea: negatiboak 0ren ezkerrean daude.', es: 'Elige el tramo de −2 a 2: los negativos quedan a la izquierda del 0.', ar: 'اختر المجال من −2 إلى 2: الأعداد السالبة تقع يسار 0.' },
        isSolved: (state) => equals(lineValue(state), fraction(-1, 2))
    },
    {
        id: 804,
        prompt: { eu: 'Kokatu 1/3 eta 1/2 artean dagoen zatiki bat.', es: 'Coloca una fracción que esté entre 1/3 y 1/2.', ar: 'ضع كسرًا يقع بين 1/3 و1/2.' },
        hint: { eu: 'Herenekin edo erdiekin ez da bat ere sartzen: probatu jauzi txikiagoak, hamabirenak adibidez.', es: 'Con tercios o medios no cabe ninguna: prueba saltos más pequeños, como doceavos.', ar: 'لا يتسع أي كسر بالأثلاث أو الأنصاف: جرّب قفزات أصغر مثل أجزاء من اثني عشر.' },
        isSolved: (state) => compare(lineValue(state), fraction(1, 3)) > 0 && compare(lineValue(state), fraction(1, 2)) < 0
    }
]

/* ---------- Fraction wall ---------- */

export const WALL_DENOMINATORS = Array.from({ length: 12 }, (_, index) => index + 1)

export interface WallPiece {
    /** The fraction reaches the end of this piece: pieces 1..numerator of its row */
    numerator: number
    denominator: number
}

export interface WallState {
    mode: 'equivalent' | 'compare'
    first: WallPiece | null
    second: WallPiece | null
}

export const initialWallState: WallState = { mode: 'equivalent', first: null, second: null }

/** Switching mode starts a fresh selection, so a leftover piece never becomes half of a comparison */
export function setWallMode(state: WallState, mode: WallState['mode']): WallState {
    return state.mode === mode ? state : { mode, first: null, second: null }
}

export function selectWallPiece(state: WallState, piece: WallPiece): WallState {
    if (state.mode === 'equivalent') return { ...state, first: piece, second: null }
    if (state.first === null || state.second !== null) return { ...state, first: piece, second: null }
    return { ...state, second: piece }
}

/** Every piece in the wall whose right edge lands exactly on the same value */
export function wallEquivalents(piece: WallPiece): WallPiece[] {
    return WALL_DENOMINATORS
        .filter((denominator) => (piece.numerator * denominator) % piece.denominator === 0)
        .map((denominator) => ({ numerator: (piece.numerator * denominator) / piece.denominator, denominator }))
}

const isPiece = (piece: WallPiece | null, numerator: number, denominator: number) =>
    piece !== null && piece.numerator === numerator && piece.denominator === denominator

export const wallChallenges: LabChallenge<WallState>[] = [
    {
        id: 901,
        prompt: { eu: 'Hautatu 2/3ren baliokidea den zatiki bat, 3 baino izendatzaile handiagoarekin.', es: 'Selecciona una fracción equivalente a 2/3 con un denominador mayor que 3.', ar: 'اختر كسرًا مكافئًا لـ 2/3 مقامه أكبر من 3.' },
        hint: { eu: 'Bilatu pieza bat 2/3ren lerro berean amaitzen den errenkadak.', es: 'Busca las filas donde una pieza termina justo en la misma línea que 2/3.', ar: 'ابحث عن الصفوف التي تنتهي فيها قطعة عند خط 2/3 نفسه تمامًا.' },
        isSolved: (state) => state.mode === 'equivalent' && state.first !== null && state.first.denominator > 3 && equals(state.first, fraction(2, 3))
    },
    {
        id: 902,
        prompt: { eu: 'Zein da handiagoa, 3/5 ala 5/8? Hautatu handiena.', es: '¿Qué es mayor, 3/5 o 5/8? Selecciona la mayor.', ar: 'أيهما أكبر، 3/5 أم 5/8؟ اختر الأكبر.' },
        hint: { eu: 'Hautatu bata eta gero bestea: urrunen iristen dena da handiena.', es: 'Selecciona primero una y después la otra: la que llegue más lejos es la mayor.', ar: 'اختر أحدهما ثم الآخر: الذي يصل أبعد هو الأكبر.' },
        isSolved: (state) => state.mode === 'equivalent' && isPiece(state.first, 5, 8)
    },
    {
        id: 903,
        prompt: { eu: 'Hautatu 1/8 baino handiagoa den unitate-zatiki txikiena.', es: 'Selecciona la fracción unitaria más pequeña que sea mayor que 1/8.', ar: 'اختر أصغر كسر وحدي أكبر من 1/8.' },
        hint: { eu: 'Unitate-zatikiek 1 dute zenbakitzaile. Zenbat eta zati gehiago, orduan eta txikiagoa da bakoitza.', es: 'Las fracciones unitarias tienen numerador 1. Cuantas más partes, más pequeña es cada una.', ar: 'الكسور الوحدية بسطها 1. كلما زاد عدد الأجزاء صغر كل جزء.' },
        isSolved: (state) => state.mode === 'equivalent' && isPiece(state.first, 1, 7)
    },
    {
        id: 904,
        prompt: { eu: 'Konparatzeko moduan, markatu 2/3 eta 3/4.', es: 'En modo comparar, marca 2/3 y 3/4.', ar: 'في وضع المقارنة، حدّد 2/3 و3/4.' },
        hint: { eu: 'Aukeratu «Konparatu» eta sakatu herenen bigarren pieza eta laurdenen hirugarrena.', es: 'Elige «Comparar» y pulsa la segunda pieza de los tercios y la tercera de los cuartos.', ar: 'اختر «مقارنة» واضغط القطعة الثانية من الأثلاث والقطعة الثالثة من الأرباع.' },
        isSolved: (state) => state.mode === 'compare'
            && ((isPiece(state.first, 2, 3) && isPiece(state.second, 3, 4)) || (isPiece(state.first, 3, 4) && isPiece(state.second, 2, 3)))
    }
]


/* ---------- Equivalence ---------- */

export interface EquivalenceState {
    numerator: number
    denominator: number
    mode: 'amplify' | 'simplify'
    /** Pieces each part is split into when amplifying */
    factor: number
    /** Common divisor chosen when simplifying (null until the learner picks one) */
    divisor: number | null
}

export const EQUIVALENCE_LIMITS = { minDenominator: 2, maxDenominator: 12, minFactor: 2, maxFactor: 6 } as const

export const initialEquivalenceState: EquivalenceState = { numerator: 2, denominator: 3, mode: 'amplify', factor: 2, divisor: null }

/** Divisors greater than 1 shared by both terms, smallest first */
export function commonDivisors(numerator: number, denominator: number): number[] {
    const greatest = gcd(numerator, denominator)
    return Array.from({ length: greatest }, (_, index) => index + 1).filter((candidate) => candidate > 1 && greatest % candidate === 0)
}

export function equivalenceResult(state: EquivalenceState): FractionValue {
    if (state.mode === 'amplify') return { numerator: state.numerator * state.factor, denominator: state.denominator * state.factor }
    if (state.divisor === null || !commonDivisors(state.numerator, state.denominator).includes(state.divisor)) {
        return { numerator: state.numerator, denominator: state.denominator }
    }
    return { numerator: state.numerator / state.divisor, denominator: state.denominator / state.divisor }
}

/** New starting fraction: numerator stays within one unit and a divisor that no longer fits is dropped */
export function setEquivalenceBase(state: EquivalenceState, numerator: number, denominator: number): EquivalenceState {
    const nextDenominator = Math.min(EQUIVALENCE_LIMITS.maxDenominator, Math.max(EQUIVALENCE_LIMITS.minDenominator, denominator))
    const nextNumerator = Math.min(nextDenominator, Math.max(1, numerator))
    const divisor = state.divisor !== null && commonDivisors(nextNumerator, nextDenominator).includes(state.divisor) ? state.divisor : null
    return { ...state, numerator: nextNumerator, denominator: nextDenominator, divisor }
}

const sameTerms = (value: FractionValue, numerator: number, denominator: number) =>
    value.numerator === numerator && value.denominator === denominator

export const equivalenceChallenges: LabChallenge<EquivalenceState>[] = [
    {
        id: 1001,
        prompt: { eu: 'Lortu 3/4ren zatiki baliokide bat, 12 izendatzailearekin.', es: 'Consigue una fracción equivalente a 3/4 con denominador 12.', ar: 'كوّن كسرًا مكافئًا لـ 3/4 مقامه 12.' },
        hint: { eu: 'Zein zenbakiz biderkatu behar da 4, 12ra iristeko?', es: '¿Por qué número hay que multiplicar 4 para llegar a 12?', ar: 'في أي عدد نضرب 4 لنصل إلى 12؟' },
        isSolved: (state) => sameTerms(equivalenceResult(state), 9, 12)
    },
    {
        id: 1002,
        prompt: { eu: 'Sinplifikatu 8/12 zatiki laburtezinera arte.', es: 'Simplifica 8/12 hasta la fracción irreducible.', ar: 'بسّط 8/12 إلى أبسط صورة.' },
        hint: { eu: '8ren eta 12ren zatitzaile komun handiena 4 da.', es: 'El mayor divisor común de 8 y 12 es 4.', ar: 'القاسم المشترك الأكبر لـ 8 و12 هو 4.' },
        isSolved: (state) => state.mode === 'simplify' && sameTerms(state, 8, 12) && sameTerms(equivalenceResult(state), 2, 3)
    },
    {
        id: 1003,
        prompt: { eu: 'Aurkitu 6 zenbakitzailea duen 2/5ren zatiki baliokidea.', es: 'Encuentra la fracción equivalente a 2/5 que tiene numerador 6.', ar: 'جد الكسر المكافئ لـ 2/5 الذي بسطه 6.' },
        hint: { eu: '2 × 3 = 6: biderkatu izendatzailea ere 3z.', es: '2 × 3 = 6: multiplica también el denominador por 3.', ar: '2 × 3 = 6: اضرب المقام أيضًا في 3.' },
        isSolved: (state) => sameTerms(equivalenceResult(state), 6, 15)
    },
    {
        id: 1004,
        prompt: { eu: 'Egiaztatu 5/7 sinplifika daitekeen.', es: 'Comprueba si 5/7 se puede simplificar.', ar: 'تحقّق مما إذا كان يمكن تبسيط 5/7.' },
        hint: { eu: 'Bilatu 5 eta 7 aldi berean zatitzen dituen zenbaki bat.', es: 'Busca un número que divida a la vez a 5 y a 7.', ar: 'ابحث عن عدد يقسم 5 و7 معًا.' },
        isSolved: (state) => state.mode === 'simplify' && sameTerms(state, 5, 7)
    }
]

/* ---------- Compare ---------- */

export type Relation = '<' | '=' | '>'
export type CompareStrategy = 'common' | 'line' | 'cross'

export interface CompareState {
    first: FractionValue
    second: FractionValue
    strategy: CompareStrategy
    /** The learner's prediction; cleared whenever a fraction changes */
    guess: Relation | null
}

export const COMPARE_LIMITS = { minDenominator: 2, maxDenominator: 12 } as const

export const initialCompareState: CompareState = {
    first: { numerator: 2, denominator: 3 },
    second: { numerator: 3, denominator: 5 },
    strategy: 'common',
    guess: null
}

export function lcm(left: number, right: number): number {
    return (left * right) / gcd(left, right)
}

export function compareRelation(state: CompareState): Relation {
    const result = compare(state.first, state.second)
    return result === 0 ? '=' : result < 0 ? '<' : '>'
}

/** Changing a fraction keeps it within one unit and asks for a new prediction */
export function setCompareFraction(state: CompareState, which: 'first' | 'second', numerator: number, denominator: number): CompareState {
    const nextDenominator = Math.min(COMPARE_LIMITS.maxDenominator, Math.max(COMPARE_LIMITS.minDenominator, denominator))
    const nextNumerator = Math.min(nextDenominator, Math.max(1, numerator))
    return { ...state, [which]: { numerator: nextNumerator, denominator: nextDenominator }, guess: null }
}

const comparesPair = (state: CompareState, a: [number, number], b: [number, number]) =>
    (sameTerms(state.first, ...a) && sameTerms(state.second, ...b)) || (sameTerms(state.first, ...b) && sameTerms(state.second, ...a))

const predictedRight = (state: CompareState) => state.guess !== null && state.guess === compareRelation(state)

export const compareChallenges: LabChallenge<CompareState>[] = [
    {
        id: 1101,
        prompt: { eu: 'Alderatu 3/8 eta 1/2 eta aukeratu zeinu zuzena.', es: 'Compara 3/8 y 1/2 y elige el signo correcto.', ar: 'قارن بين 3/8 و1/2 واختر الإشارة الصحيحة.' },
        hint: { eu: 'Izendatzaile komunarekin: 1/2 = 4/8.', es: 'Con denominador común: 1/2 = 4/8.', ar: 'بمقام مشترك: 1/2 = 4/8.' },
        isSolved: (state) => comparesPair(state, [3, 8], [1, 2]) && predictedRight(state)
    },
    {
        id: 1102,
        prompt: { eu: 'Alderatu 5/6 eta 7/9 izendatzaile komuna erabiliz.', es: 'Compara 5/6 y 7/9 usando el denominador común.', ar: 'قارن بين 5/6 و7/9 باستعمال مقام مشترك.' },
        hint: { eu: '6ren eta 9ren multiplo komunetako txikiena 18 da.', es: 'El mínimo común múltiplo de 6 y 9 es 18.', ar: 'المضاعف المشترك الأصغر لـ 6 و9 هو 18.' },
        isSolved: (state) => state.strategy === 'common' && comparesPair(state, [5, 6], [7, 9]) && predictedRight(state)
    },
    {
        id: 1103,
        prompt: { eu: 'Aukeratu balio bera duten bi zatiki desberdin eta markatu =.', es: 'Elige dos fracciones distintas que valgan lo mismo y marca =.', ar: 'اختر كسرين مختلفين لهما القيمة نفسها وحدّد =.' },
        hint: { eu: 'Biderkatu baten zenbakitzailea eta izendatzailea zenbaki berarekin.', es: 'Multiplica numerador y denominador de una por el mismo número.', ar: 'اضرب بسط أحدهما ومقامه في العدد نفسه.' },
        isSolved: (state) => state.guess === '=' && equals(state.first, state.second)
            && !sameTerms(state.first, state.second.numerator, state.second.denominator)
    },
    {
        id: 1104,
        prompt: { eu: 'Alderatu 7/12 eta 3/5 biderketa gurutzatuarekin.', es: 'Compara 7/12 y 3/5 con productos cruzados.', ar: 'قارن بين 7/12 و3/5 بالضرب التبادلي.' },
        hint: { eu: 'Kalkulatu 7 × 5 eta 3 × 12.', es: 'Calcula 7 × 5 y 3 × 12.', ar: 'احسب 7 × 5 و3 × 12.' },
        isSolved: (state) => state.strategy === 'cross' && comparesPair(state, [7, 12], [3, 5]) && predictedRight(state)
    }
]

/* ---------- Operations: shared answer handling ---------- */

export const OPERATION_LIMITS = { minDenominator: 2, maxDenominator: 12 } as const

/** Operands stay within one unit; any change asks for a new answer */
function withOperand<State extends { first: FractionValue; second: FractionValue } & OperationAnswer>(
    state: State,
    which: 'first' | 'second',
    numerator: number,
    denominator: number
): State {
    const nextDenominator = Math.min(OPERATION_LIMITS.maxDenominator, Math.max(OPERATION_LIMITS.minDenominator, denominator))
    const nextNumerator = Math.min(nextDenominator, Math.max(1, numerator))
    return { ...state, [which]: { numerator: nextNumerator, denominator: nextDenominator }, ...freshAnswer }
}

/** Whether a tool should show its worked result: the learner got it right or asked to see it */
export function resultVisible(state: OperationAnswer, expected: FractionValue): boolean {
    return state.revealed || (state.checked && checkAnswer(state.answer, expected) === 'correct')
}

const answered = (state: OperationAnswer, expected: FractionValue, form: AnswerForm = 'any') =>
    checkAnswer(state.answer, expected, form) === 'correct'

const operands = (state: { first: FractionValue; second: FractionValue }, a: [number, number], b: [number, number], ordered: boolean) =>
    (sameTerms(state.first, ...a) && sameTerms(state.second, ...b)) || (!ordered && sameTerms(state.first, ...b) && sameTerms(state.second, ...a))

/* ---------- Addition and subtraction ---------- */

export interface SumState extends OperationAnswer {
    first: FractionValue
    second: FractionValue
    op: 'add' | 'subtract'
    /** Show the bars with their own parts or split into the common denominator */
    view: 'original' | 'common'
}

export const initialSumState: SumState = {
    first: { numerator: 1, denominator: 2 },
    second: { numerator: 1, denominator: 3 },
    op: 'add',
    view: 'original',
    ...freshAnswer
}

/** Both operands over their least common denominator, and the unsimplified result */
export function sumParts(state: SumState): { common: number; first: number; second: number; result: FractionValue } {
    const common = lcm(state.first.denominator, state.second.denominator)
    const first = state.first.numerator * (common / state.first.denominator)
    const second = state.second.numerator * (common / state.second.denominator)
    return { common, first, second, result: { numerator: state.op === 'add' ? first + second : first - second, denominator: common } }
}

export const setSumOperand = (state: SumState, which: 'first' | 'second', numerator: number, denominator: number) =>
    withOperand(state, which, numerator, denominator)

export const setSumOp = (state: SumState, op: SumState['op']): SumState => state.op === op ? state : { ...state, op, ...freshAnswer }

export const sumChallenges: LabChallenge<SumState>[] = [
    {
        id: 1201,
        prompt: { eu: 'Kalkulatu 1/2 + 1/3 eta idatzi emaitza.', es: 'Calcula 1/2 + 1/3 y escribe el resultado.', ar: 'احسب 1/2 + 1/3 واكتب النتيجة.' },
        hint: { eu: 'Banatu bi barrak seirenetan: 1/2 = 3/6 eta 1/3 = 2/6.', es: 'Parte las dos barras en sextos: 1/2 = 3/6 y 1/3 = 2/6.', ar: 'قسّم الشريطين إلى أسداس: 1/2 = 3/6 و1/3 = 2/6.' },
        isSolved: (state) => state.op === 'add' && operands(state, [1, 2], [1, 3], false) && answered(state, fraction(5, 6))
    },
    {
        id: 1202,
        prompt: { eu: 'Kalkulatu 3/4 − 1/6 eta idatzi emaitza.', es: 'Calcula 3/4 − 1/6 y escribe el resultado.', ar: 'احسب 3/4 − 1/6 واكتب النتيجة.' },
        hint: { eu: '4ren eta 6ren izendatzaile komuna 12 da.', es: 'El denominador común de 4 y 6 es 12.', ar: 'المقام المشترك لـ 4 و6 هو 12.' },
        isSolved: (state) => state.op === 'subtract' && operands(state, [3, 4], [1, 6], true) && answered(state, fraction(7, 12))
    },
    {
        id: 1203,
        prompt: { eu: 'Batu izendatzaile desberdineko bi zatiki, emaitza zehazki 1 izan dadin.', es: 'Suma dos fracciones con distinto denominador que den exactamente 1.', ar: 'اجمع كسرين مختلفي المقام يكون ناتجهما 1 تمامًا.' },
        hint: { eu: 'Probatu 1/2rekin eta 1/2ren balio bera duen beste zatiki batekin.', es: 'Prueba con 1/2 y otra fracción que valga lo mismo que 1/2.', ar: 'جرّب 1/2 وكسرًا آخر يساوي 1/2.' },
        isSolved: (state) => state.op === 'add' && state.first.denominator !== state.second.denominator && equals(sumParts(state).result, fraction(1))
    },
    {
        id: 1204,
        prompt: { eu: 'Kalkulatu 5/6 + 3/4 eta idatzi emaitza zenbaki misto gisa.', es: 'Calcula 5/6 + 3/4 y escribe el resultado como número mixto.', ar: 'احسب 5/6 + 3/4 واكتب النتيجة عددًا كسريًا.' },
        hint: { eu: 'Batura 19/12 da: zenbat unitate oso sartzen dira?', es: 'La suma es 19/12: ¿cuántas unidades completas caben?', ar: 'المجموع 19/12: كم وحدة كاملة فيه؟' },
        isSolved: (state) => state.op === 'add' && operands(state, [5, 6], [3, 4], false) && answered(state, fraction(19, 12), 'mixed')
    }
]

/* ---------- Multiplication and division ---------- */

export interface ProductState extends OperationAnswer {
    first: FractionValue
    second: FractionValue
    op: 'multiply' | 'divide'
}

export const initialProductState: ProductState = {
    first: { numerator: 2, denominator: 3 },
    second: { numerator: 1, denominator: 2 },
    op: 'multiply',
    ...freshAnswer
}

/** Unsimplified result: a·c/(b·d) or a·d/(b·c) */
export function productResult(state: ProductState): FractionValue {
    const { first, second } = state
    return state.op === 'multiply'
        ? { numerator: first.numerator * second.numerator, denominator: first.denominator * second.denominator }
        : { numerator: first.numerator * second.denominator, denominator: first.denominator * second.numerator }
}

export const setProductOperand = (state: ProductState, which: 'first' | 'second', numerator: number, denominator: number) =>
    withOperand(state, which, numerator, denominator)

export const setProductOp = (state: ProductState, op: ProductState['op']): ProductState => state.op === op ? state : { ...state, op, ...freshAnswer }

export const productChallenges: LabChallenge<ProductState>[] = [
    {
        id: 1301,
        prompt: { eu: 'Kalkulatu 2/3 × 3/4 eta idatzi emaitza.', es: 'Calcula 2/3 × 3/4 y escribe el resultado.', ar: 'احسب 2/3 × 3/4 واكتب النتيجة.' },
        hint: { eu: 'Zenbatu gurutzeko laukiak eta lauki guztiak.', es: 'Cuenta las casillas del cruce y las casillas totales.', ar: 'عُدّ خانات التقاطع وجميع الخانات.' },
        isSolved: (state) => state.op === 'multiply' && operands(state, [2, 3], [3, 4], false) && answered(state, fraction(1, 2))
    },
    {
        id: 1302,
        prompt: { eu: 'Zenbat aldiz sartzen da 1/4 3/4an? Idatzi emaitza.', es: '¿Cuántas veces cabe 1/4 en 3/4? Escribe el resultado.', ar: 'كم مرة يتسع 3/4 لـ 1/4؟ اكتب النتيجة.' },
        hint: { eu: 'Erabili zatiketa: lehen zatikia 3/4, bigarrena 1/4.', es: 'Usa la división: primera fracción 3/4, segunda 1/4.', ar: 'استعمل القسمة: الكسر الأول 3/4 والثاني 1/4.' },
        isSolved: (state) => state.op === 'divide' && operands(state, [3, 4], [1, 4], true) && answered(state, fraction(3))
    },
    {
        id: 1303,
        prompt: { eu: 'Kalkulatu 2/3 : 3/4. Behin osorik sartzen da?', es: 'Calcula 2/3 : 3/4. ¿Cabe una vez entera?', ar: 'احسب 2/3 ÷ 3/4. هل يتسع مرة كاملة؟' },
        hint: { eu: 'Biderkatu 2/3 3/4ren alderantzizkoarekin, hau da, 4/3rekin.', es: 'Multiplica 2/3 por la inversa de 3/4, que es 4/3.', ar: 'اضرب 2/3 في مقلوب 3/4 أي 4/3.' },
        isSolved: (state) => state.op === 'divide' && operands(state, [2, 3], [3, 4], true) && answered(state, fraction(8, 9))
    },
    {
        id: 1304,
        prompt: { eu: 'Aurkitu 1 baino txikiagoak diren bi zatiki, biderkadura 1/4 izan dezaten.', es: 'Encuentra dos fracciones menores que 1 cuyo producto sea 1/4.', ar: 'جد كسرين أصغر من 1 حاصل ضربهما 1/4.' },
        hint: { eu: 'Adibidez, erdiaren erdia.', es: 'Por ejemplo, la mitad de la mitad.', ar: 'مثلًا، نصف النصف.' },
        isSolved: (state) => state.op === 'multiply'
            && state.first.numerator < state.first.denominator && state.second.numerator < state.second.denominator
            && equals(productResult(state), fraction(1, 4))
    }
]

/* ---------- Quantities and percentages ---------- */

export interface ProportionState extends OperationAnswer {
    mode: 'of' | 'percent' | 'forms'
    numerator: number
    denominator: number
    quantity: number
    percent: number
}

export const PROPORTION_LIMITS = {
    minDenominator: 2,
    maxDenominator: 12,
    minQuantity: 10,
    maxQuantity: 600,
    quantityStep: 10,
    percentStep: 5
} as const

export const initialProportionState: ProportionState = { mode: 'of', numerator: 3, denominator: 4, quantity: 120, percent: 25, ...freshAnswer }

/** Exact result of the current question: n/d of Q, or p % of Q */
export function proportionResult(state: ProportionState): FractionValue {
    return state.mode === 'percent'
        ? fraction(state.percent * state.quantity, 100)
        : fraction(state.numerator * state.quantity, state.denominator)
}

/** Any change to the question asks for a new answer */
export function updateProportion(state: ProportionState, patch: Partial<Pick<ProportionState, 'mode' | 'numerator' | 'denominator' | 'quantity' | 'percent'>>): ProportionState {
    const next = { ...state, ...patch }
    const denominator = Math.min(PROPORTION_LIMITS.maxDenominator, Math.max(PROPORTION_LIMITS.minDenominator, next.denominator))
    return {
        ...next,
        denominator,
        numerator: Math.min(denominator, Math.max(1, next.numerator)),
        quantity: Math.min(PROPORTION_LIMITS.maxQuantity, Math.max(PROPORTION_LIMITS.minQuantity, next.quantity)),
        percent: Math.min(100, Math.max(0, next.percent)),
        ...freshAnswer
    }
}

/** Decimal digits of a non-negative fraction, with the repeating block (period) separated */
export function decimalExpansion(numerator: number, denominator: number): { integer: number; fixed: string; repeating: string } {
    const integer = Math.floor(numerator / denominator)
    let remainder = numerator % denominator
    const digits: number[] = []
    const seen = new Map<number, number>()
    while (remainder !== 0 && !seen.has(remainder)) {
        seen.set(remainder, digits.length)
        remainder *= 10
        digits.push(Math.floor(remainder / denominator))
        remainder %= denominator
    }
    if (remainder === 0) return { integer, fixed: digits.join(''), repeating: '' }
    const start = seen.get(remainder) ?? 0
    return { integer, fixed: digits.slice(0, start).join(''), repeating: digits.slice(start).join('') }
}

export const proportionChallenges: LabChallenge<ProportionState>[] = [
    {
        id: 1401,
        prompt: { eu: 'Kalkulatu 120ren 3/5 eta idatzi emaitza.', es: 'Calcula 3/5 de 120 y escribe el resultado.', ar: 'احسب 3/5 من 120 واكتب النتيجة.' },
        hint: { eu: 'Banatu 120 5 talde berdinetan eta hartu 3.', es: 'Reparte 120 en 5 grupos iguales y toma 3.', ar: 'قسّم 120 إلى 5 مجموعات متساوية وخذ 3 منها.' },
        isSolved: (state) => state.mode === 'of' && sameTerms(state, 3, 5) && state.quantity === 120 && answered(state, fraction(72))
    },
    {
        id: 1402,
        prompt: { eu: 'Zenbat da 80ren % 25? Idatzi emaitza.', es: '¿Cuánto es el 25 % de 80? Escribe el resultado.', ar: 'كم يساوي 25٪ من 80؟ اكتب النتيجة.' },
        hint: { eu: '% 25 laurdena da.', es: 'El 25 % es la cuarta parte.', ar: '25٪ هي الربع.' },
        isSolved: (state) => state.mode === 'percent' && state.percent === 25 && state.quantity === 80 && answered(state, fraction(20))
    },
    {
        id: 1403,
        prompt: { eu: 'Eraiki zehazki % 75 balio duen zatiki bat.', es: 'Construye una fracción que valga exactamente el 75 %.', ar: 'كوّن كسرًا يساوي 75٪ تمامًا.' },
        hint: { eu: '100etik 75… zenbat 4tik?', es: '75 de cada 100… ¿cuántos de cada 4?', ar: '75 من كل 100... كم من كل 4؟' },
        isSolved: (state) => state.mode === 'forms' && equals(state, fraction(3, 4))
    },
    {
        id: 1404,
        prompt: { eu: 'Aurkitu hamartarra inoiz amaitzen ez den zatiki bat (periodikoa).', es: 'Encuentra una fracción cuyo decimal no se acabe nunca (periódico).', ar: 'جد كسرًا لا ينتهي عدده العشري أبدًا (دوري).' },
        hint: { eu: 'Probatu herenekin edo zazpirenekin.', es: 'Prueba con tercios o séptimos.', ar: 'جرّب الأثلاث أو الأسباع.' },
        isSolved: (state) => state.mode === 'forms' && !hasTerminatingDecimal(state)
    }
]

export const labChallengeIds: number[] = [
    ...partsChallenges,
    ...numberLineChallenges,
    ...wallChallenges,
    ...equivalenceChallenges,
    ...compareChallenges,
    ...sumChallenges,
    ...productChallenges,
    ...proportionChallenges
].map((challenge) => challenge.id)
