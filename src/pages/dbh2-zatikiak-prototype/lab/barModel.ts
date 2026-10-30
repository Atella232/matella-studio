import type { LocalizedText } from '../content.ts'
import { checkAnswer, divide, equals, fraction, multiply, subtract, type FractionValue } from '../math/fraction.ts'
import { freshAnswer, type LabChallenge, type OperationAnswer } from '../../../features/unit-v2/lab/types.ts'

/* ==========================================================================
   Problems with bars: a whole split into equal parts, a first part taken,
   and maybe a second part taken from the whole or from what is left. One
   known value fixes every piece, so the asked one can be found.
   ========================================================================== */

/** What the second part is taken from: there is none, the whole, or what is left after the first */
export type BarSecondOf = 'none' | 'whole' | 'rest'

/** The pieces a value can be known or asked about; 'left' is what is left over at the end */
export type BarSegment = 'total' | 'first' | 'second' | 'left'

/** The bar itself, or the second bar that splits what is left after the first part */
export type BarRow = 'whole' | 'rest'

export interface BarModelState extends OperationAnswer {
    /** Equal parts of the whole bar */
    parts: number
    /** Parts of the whole used in the first part */
    first: number
    secondOf: BarSecondOf
    /** Parts used in the second part: parts of the whole, or parts of what is left */
    second: number
    /** Equal parts of what is left after the first part, when the second part is taken from it */
    restParts: number
    known: BarSegment
    knownValue: number
    asked: BarSegment
}

export const BAR_LIMITS = { minParts: 2, maxParts: 12, minValue: 1, maxValue: 9999 } as const

export const initialBarModelState: BarModelState = {
    parts: 4,
    first: 1,
    secondOf: 'none',
    second: 0,
    restParts: 3,
    known: 'total',
    knownValue: 60,
    asked: 'first',
    ...freshAnswer
}

export const barSegmentNames: Record<BarSegment, LocalizedText> = {
    total: { eu: 'Osoa', es: 'Total', en: 'Whole', ar: 'الكل' },
    first: { eu: '1. zatia', es: '1.ª parte', en: '1st part', ar: 'الجزء الأول' },
    second: { eu: '2. zatia', es: '2.ª parte', en: '2nd part', ar: 'الجزء الثاني' },
    left: { eu: 'Soberakina', es: 'Sobra', en: 'Left over', ar: 'المتبقي' }
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/** Segments that exist in this bar: without a second part there is nothing to know or ask about it */
export function barSegments(state: Pick<BarModelState, 'secondOf'>): BarSegment[] {
    return state.secondOf === 'none' ? ['total', 'first', 'left'] : ['total', 'first', 'second', 'left']
}

/** Every change keeps the bar drawable and clears the typed answer */
export function setBarModel(state: BarModelState, patch: Partial<Omit<BarModelState, keyof OperationAnswer>>): BarModelState {
    const next = { ...state, ...patch }
    const parts = clamp(next.parts, BAR_LIMITS.minParts, BAR_LIMITS.maxParts)
    const first = clamp(next.first, 0, parts)
    const restParts = clamp(next.restParts, BAR_LIMITS.minParts, BAR_LIMITS.maxParts)
    const secondMax = next.secondOf === 'whole' ? parts - first : next.secondOf === 'rest' ? restParts : 0
    const segments = barSegments(next)
    return {
        ...next,
        parts,
        first,
        restParts,
        second: clamp(next.second, 0, secondMax),
        knownValue: clamp(Math.round(next.knownValue), BAR_LIMITS.minValue, BAR_LIMITS.maxValue),
        known: segments.includes(next.known) ? next.known : 'total',
        asked: segments.includes(next.asked) ? next.asked : 'left',
        ...freshAnswer
    }
}

/** What fraction of the whole each segment is */
export function barFractions(state: BarModelState): Record<BarSegment, FractionValue> {
    const first = fraction(state.first, state.parts)
    const rest = fraction(state.parts - state.first, state.parts)
    const second = state.secondOf === 'whole'
        ? fraction(state.second, state.parts)
        : state.secondOf === 'rest' ? multiply(rest, fraction(state.second, state.restParts)) : fraction(0)
    return { total: fraction(1), first, second, left: subtract(subtract(fraction(1), first), second) }
}

/** Value of every segment from the known one; null when the known segment is empty */
export function barValues(state: BarModelState): Record<BarSegment, FractionValue> | null {
    const fractions = barFractions(state)
    const known = fractions[state.known]
    if (known.numerator === 0) return null
    const total = divide(fraction(state.knownValue), known)
    return {
        total,
        first: multiply(total, fractions.first),
        second: multiply(total, fractions.second),
        left: multiply(total, fractions.left)
    }
}

/** The bar and the count of its equal pieces that make up a segment */
export function barSegmentPieces(state: BarModelState, segment: BarSegment): { row: BarRow; count: number } {
    switch (segment) {
        case 'total':
            return { row: 'whole', count: state.parts }
        case 'first':
            return { row: 'whole', count: state.first }
        case 'second':
            return state.secondOf === 'rest' ? { row: 'rest', count: state.second } : { row: 'whole', count: state.second }
        case 'left':
            return state.secondOf === 'rest'
                ? { row: 'rest', count: state.restParts - state.second }
                : { row: 'whole', count: state.parts - state.first - state.second }
    }
}

/** 'remainder' is what is left after the first part, the bar the second part is cut from */
export type BarStepSubject = BarSegment | 'remainder'

/**
 * One line of the worked solution. 'split' shares a value among its pieces
 * (value : count = piece); 'gather' adds pieces up (count · piece = value).
 */
export interface BarStep {
    kind: 'split' | 'gather'
    subject: BarStepSubject
    /** Which bar the pieces belong to */
    row: BarRow
    count: number
    piece: FractionValue
    value: FractionValue
}

/**
 * The worked solution: the value of one piece from the known segment, then,
 * if the question is on the other bar, through what is left after the
 * first part, and finally the asked segment. Null when the known segment is empty.
 */
export function barSolution(state: BarModelState): BarStep[] | null {
    const values = barValues(state)
    if (!values) return null
    const known = barSegmentPieces(state, state.known)
    const asked = barSegmentPieces(state, state.asked)
    const knownValue = fraction(state.knownValue)
    let piece = divide(knownValue, fraction(known.count))
    const steps: BarStep[] = [{ kind: 'split', subject: state.known, row: known.row, count: known.count, piece, value: knownValue }]
    if (asked.row !== known.row) {
        const restCount = state.parts - state.first
        const [fromCount, toRow, toCount] = known.row === 'rest'
            ? [state.restParts, 'whole' as const, restCount]
            : [restCount, 'rest' as const, state.restParts]
        const remainder = multiply(piece, fraction(fromCount))
        steps.push({ kind: 'gather', subject: 'remainder', row: known.row, count: fromCount, piece, value: remainder })
        piece = divide(remainder, fraction(toCount))
        steps.push({ kind: 'split', subject: 'remainder', row: toRow, count: toCount, piece, value: remainder })
    }
    steps.push({ kind: 'gather', subject: state.asked, row: asked.row, count: asked.count, piece, value: multiply(piece, fraction(asked.count)) })
    return steps
}

/* ---------- Challenges ---------- */

const answered = (state: BarModelState, expected: number) => checkAnswer(state.answer, fraction(expected)) === 'correct'

/** The bar shows the problem: its parts, the known value and the question */
function models(state: BarModelState, problem: { first: FractionValue; secondOf: BarSecondOf; second?: FractionValue; known: BarSegment; value: number; asked: BarSegment }) {
    const fractions = barFractions(state)
    const second = problem.second ?? fraction(0)
    // The second part of a remainder is read as a fraction of that remainder, as the problem says it
    const secondRead = state.secondOf === 'rest' ? fraction(state.second, state.restParts) : fractions.second
    // Two parts of the same whole can be drawn in either order
    const sameParts = equals(fractions.first, problem.first) && equals(secondRead, second)
    const swapped = problem.secondOf === 'whole' && equals(fractions.first, second) && equals(secondRead, problem.first)
    return state.secondOf === problem.secondOf && (sameParts || swapped)
        && state.known === problem.known && state.knownValue === problem.value && state.asked === problem.asked
}

export const barChallenges: LabChallenge<BarModelState>[] = [
    {
        id: 1501,
        prompt: {
            eu: 'Institutu bateko ikasleen 3/8 autobusez etortzen dira, eta 45 dira. Zenbat ikasle daude guztira? Marraztu problema barran eta idatzi erantzuna.',
            es: 'En un instituto, 3/8 del alumnado viene en autobús: son 45 estudiantes. ¿Cuántos estudiantes hay en total? Dibuja el problema en la barra y escribe la respuesta.',
            en: 'In a secondary school, 3/8 of the students come by bus: that makes 45 students. How many students are there in total? Draw the problem on the bar and write the answer.',
            ar: 'في مدرسة، يأتي 3/8 من التلاميذ بالحافلة، وعددهم 45. كم عدد التلاميذ في المجموع؟ ارسم المسألة على الشريط واكتب الإجابة.'
        },
        hint: {
            eu: 'Barra 8 zatitan, 3 lehen zatian. Datua: 1. zatia = 45. Galdera: osoa. 3 zatik 45 balio badute, zenbat balio du batek?',
            es: 'Barra de 8 partes, 3 en la 1.ª parte. Dato: 1.ª parte = 45. Pregunta: el total. Si 3 partes valen 45, ¿cuánto vale una?',
            en: 'Bar of 8 parts, 3 in the 1st part. Given: 1st part = 45. Question: the whole. If 3 parts are worth 45, how much is one part worth?',
            ar: 'شريط من 8 أجزاء، 3 منها في الجزء الأول. المعطى: الجزء الأول = 45. السؤال: الكل. إذا كانت 3 أجزاء تساوي 45، فكم يساوي جزء واحد؟'
        },
        isSolved: (state) => models(state, { first: fraction(3, 8), secondOf: 'none', known: 'first', value: 45, asked: 'total' }) && answered(state, 120)
    },
    {
        id: 1502,
        prompt: {
            eu: '120 litroko depositu bat beteta zegoen, eta 2/5 erabili dira. Zenbat litro geratzen dira?',
            es: 'Un depósito de 120 litros estaba lleno y se han gastado 2/5. ¿Cuántos litros quedan?',
            en: 'A 120-litre tank was full and 2/5 of it has been used up. How many litres are left?',
            ar: 'كان خزان سعته 120 لترًا ممتلئًا، واستُهلك 2/5 منه. كم لترًا بقي؟'
        },
        hint: {
            eu: 'Barra 5 zatitan, 2 lehen zatian. Datua: osoa = 120. Galdera: soberakina.',
            es: 'Barra de 5 partes, 2 en la 1.ª parte. Dato: total = 120. Pregunta: lo que sobra.',
            en: 'Bar of 5 parts, 2 in the 1st part. Given: whole = 120. Question: what is left over.',
            ar: 'شريط من 5 أجزاء، 2 منها في الجزء الأول. المعطى: الكل = 120. السؤال: المتبقي.'
        },
        isSolved: (state) => models(state, { first: fraction(2, 5), secondOf: 'none', known: 'total', value: 120, asked: 'left' }) && answered(state, 72)
    },
    {
        id: 1503,
        prompt: {
            eu: 'Anek bere pagaren 1/3 zineman gastatzen du, eta geratzen zaionaren 2/5 liburu batean. 36 € soberan ditu. Zenbat zen bere paga?',
            es: 'Ane gasta 1/3 de su paga en el cine y 2/5 de lo que le queda en un libro. Le sobran 36 €. ¿Cuánto era su paga?',
            en: 'Ane spends 1/3 of her pocket money at the cinema and 2/5 of what is left on a book. She has €36 left over. How much was her pocket money?',
            ar: 'تنفق آنا 1/3 مصروفها في السينما و2/5 مما تبقّى لها في كتاب، فيبقى معها 36 €. كم كان مصروفها؟'
        },
        hint: {
            eu: '2. zatia geratzen denarena da: banatu geratzen dena 5 zatitan eta hartu 2. Datua: soberakina = 36.',
            es: 'La 2.ª parte es «de lo que queda»: parte lo que queda en 5 y toma 2. Dato: sobra = 36.',
            en: 'The 2nd part is ‘of what is left’: split what is left into 5 and take 2. Given: left over = 36.',
            ar: 'الجزء الثاني «من الباقي»: قسّم الباقي إلى 5 أجزاء وخذ 2. المعطى: المتبقي = 36.'
        },
        isSolved: (state) => models(state, { first: fraction(1, 3), secondOf: 'rest', second: fraction(2, 5), known: 'left', value: 36, asked: 'total' }) && answered(state, 90)
    },
    {
        id: 1504,
        prompt: {
            eu: 'Gela bateko ikasleen 1/3 oinez etortzen dira eta 1/4 bizikletaz; beste 10 ikasleak autobusez. Zenbat ikasle daude gelan?',
            es: 'En una clase, 1/3 del alumnado viene andando y 1/4 en bici; los otros 10 vienen en autobús. ¿Cuántos son en la clase?',
            en: 'In a class, 1/3 of the students walk and 1/4 come by bike; the other 10 come by bus. How many are there in the class?',
            ar: 'في صفّ، يأتي 1/3 من التلاميذ مشيًا و1/4 بالدراجة، والعشرة الآخرون بالحافلة. كم عدد تلاميذ الصف؟'
        },
        hint: {
            eu: 'Bi zatiak osoarenak dira. Herenak eta laurdenak sartzen diren barra bat behar duzu: 12 zatikoa.',
            es: 'Las dos partes son «del total». Necesitas una barra en la que quepan tercios y cuartos: de 12 partes.',
            en: 'Both parts are ‘of the whole’. You need a bar in which thirds and quarters both fit: one with 12 parts.',
            ar: 'الجزآن «من الكل». تحتاج إلى شريط تتسع فيه الأثلاث والأرباع: من 12 جزءًا.'
        },
        isSolved: (state) => models(state, { first: fraction(1, 3), secondOf: 'whole', second: fraction(1, 4), known: 'left', value: 10, asked: 'total' }) && answered(state, 24)
    }
]
