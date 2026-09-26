import type { FractionStageId, LocalizedText, TheoryTopicId } from '../content.ts'

export type LabToolId = 'parts' | 'numberline' | 'equivalence' | 'compare' | 'operations' | 'proportion'

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
            eu: 'Zatiki bakoitza zuzeneko puntu bat da. Begiratu non geratzen den 0rekiko eta 1ekiko, eta zer gertatzen den zeinuarekin.',
            es: 'Cada fracción es un punto de la recta. Observa dónde queda respecto a 0 y a 1, y qué pasa con el signo.',
            ar: 'كل كسر نقطة على خط الأعداد. لاحظ موقعه بالنسبة إلى 0 و1 وماذا يحدث مع الإشارة.'
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
    meaning: 'parts',
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

export const labChallengeIds: number[] = partsChallenges.map((challenge) => challenge.id)
