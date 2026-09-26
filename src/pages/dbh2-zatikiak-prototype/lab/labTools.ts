import type { FractionStageId, LocalizedText, TheoryTopicId } from '../content.ts'
import { compare, equals, fraction, type FractionValue } from '../math/fraction.ts'

export type LabToolId = 'parts' | 'numberline' | 'wall' | 'equivalence' | 'compare' | 'operations' | 'proportion'

export interface LabToolInfo {
    id: LabToolId
    stage: FractionStageId
    lessonTopic: TheoryTopicId
    title: LocalizedText
    observe: LocalizedText
}

/** A short goal inside a tool, checked against the tool's current state */
export interface LabChallenge<State> {
    id: number
    prompt: LocalizedText
    hint: LocalizedText
    isSolved: (state: State) => boolean
}

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
            eu: 'Zenbakitzailea eta izendatzailea zenbaki berarekin biderkatzeak zati bakoitza zati txikiagotan banatzen du: koloreztatutako kantitatea ez da aldatzen.',
            es: 'Multiplicar numerador y denominador por el mismo número parte cada porción en trozos más pequeños: la cantidad coloreada no cambia.',
            ar: 'ضرب البسط والمقام في العدد نفسه يقسّم كل جزء إلى قطع أصغر: الكمية الملوّنة لا تتغيّر.'
        }
    },
    {
        id: 'compare',
        stage: 'ordering',
        lessonTopic: 'ordering',
        title: { eu: 'Konparatu', es: 'Comparar', ar: 'قارن' },
        observe: {
            eu: 'Alderatzeko, begiratu balioari eta ez zenbakien tamainari: 3/8 1/2 baino txikiagoa da, nahiz eta 3 eta 8 handiagoak izan.',
            es: 'Para comparar, fíjate en el valor y no en lo grandes que sean los números: 3/8 es menor que 1/2 aunque 3 y 8 sean mayores.',
            ar: 'للمقارنة انظر إلى القيمة لا إلى كبر الأعداد: 3/8 أصغر من 1/2 مع أن 3 و8 أكبر.'
        }
    },
    {
        id: 'operations',
        stage: 'operations',
        lessonTopic: 'add-subtract',
        title: { eu: 'Eragiketak', es: 'Operaciones', ar: 'العمليات' },
        observe: {
            eu: 'Probatu eragiketa bat eta aurreikusi emaitza begiratu aurretik: zatiki bakoitza baino handiagoa ala txikiagoa izango da?',
            es: 'Prueba una operación y predice el resultado antes de mirarlo: ¿será mayor o menor que cada fracción?',
            ar: 'جرّب عملية وتوقّع النتيجة قبل النظر إليها: هل ستكون أكبر أم أصغر من كل كسر؟'
        }
    },
    {
        id: 'proportion',
        stage: 'proportionality',
        lessonTopic: 'fraction-of',
        title: { eu: 'Kantitate baten zatikia', es: 'Fracción de una cantidad', ar: 'كسر من كمية' },
        observe: {
            eu: 'Zatiki batek, hamartar batek eta ehuneko batek kantitate bera adieraz dezakete. Kalkulatu kantitate baten zatikia eta alderatu hiru formak.',
            es: 'Una fracción, un decimal y un porcentaje pueden expresar la misma cantidad. Calcula la fracción de una cantidad y compara las tres formas.',
            ar: 'يمكن للكسر والعدد العشري والنسبة المئوية أن تعبّر عن الكمية نفسها. احسب كسرًا من كمية وقارن بين الصيغ الثلاث.'
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
    'add-subtract': 'operations',
    'multiply-divide': 'operations',
    combined: 'operations',
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

export const labChallengeIds: number[] = [...partsChallenges, ...numberLineChallenges, ...wallChallenges].map((challenge) => challenge.id)
