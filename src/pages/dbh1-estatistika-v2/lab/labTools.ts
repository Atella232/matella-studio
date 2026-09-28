import { checkAnswer, fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { freshAnswer, type LabChallenge, type LabToolInfo, type OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import type { StatisticsIntroStageId } from '../lessons.tsx'

/* ==========================================================================
   Estatistika (1. DBH) laboratory: variable sorter, frequency table,
   chart maker, balance of the mean and a die simulator. Pure state logic
   and challenges; components live next to this file. Tests in
   tests/estatistika-dbh1-lab.test.ts.
   ========================================================================== */

export type StatisticsLabToolId = 'variables' | 'table' | 'charts' | 'mean' | 'dice'

export interface StatisticsLabTool extends LabToolInfo {
    id: StatisticsLabToolId
    stage: StatisticsIntroStageId
}

export const statisticsLabTools: StatisticsLabTool[] = [
    {
        id: 'variables',
        stage: 'data',
        lessonTopic: 'variables',
        title: { eu: 'Aldagai-sailkatzailea', es: 'Clasificador de variables', ar: 'مصنّف المتغيرات' },
        observe: {
            eu: 'Galdetu zeure buruari: zenbaki bat da? Zenbatu egiten da ala neurtu? Zenbatzen bada diskretua da; neurtzen bada, jarraitua.',
            es: 'Pregúntate: ¿es un número? ¿Se cuenta o se mide? Si se cuenta es discreta; si se mide, continua.',
            ar: 'اسأل نفسك: هل هو عدد؟ هل يُعَدّ أم يُقاس؟ إذا كان يُعَدّ فهو منفصل، وإذا كان يُقاس فهو متصل.'
        }
    },
    {
        id: 'table',
        stage: 'tables',
        lessonTopic: 'table',
        title: { eu: 'Maiztasun-taula', es: 'Tabla de frecuencias', ar: 'جدول التكرارات' },
        observe: {
            eu: 'Aldatu maiztasun absolutuak: N aldatzen da, eta maiztasun erlatibo guztiak ere bai. Haien batura beti da 1 (% 100).',
            es: 'Cambia las frecuencias absolutas: cambia N y también todas las relativas. Su suma siempre es 1 (100 %).',
            ar: 'غيّر التكرارات المطلقة: يتغيّر N وتتغيّر كل التكرارات النسبية. ومجموعها دائمًا 1 (100 %).'
        }
    },
    {
        id: 'charts',
        stage: 'graphs',
        lessonTopic: 'pie-chart',
        title: { eu: 'Grafiko-egilea', es: 'Creador de gráficos', ar: 'صانع المخططات' },
        observe: {
            eu: 'Datu berak bi eratara: barra-diagramak zenbatzen du, sektore-diagramak osoaren zatiak erakusten ditu. Datu bakoitzak 360° : N balio du.',
            es: 'Los mismos datos de dos formas: el de barras cuenta y el de sectores muestra partes del total. Cada dato vale 360° : N.',
            ar: 'البيانات نفسها بطريقتين: مخطط الأعمدة يعدّ والمخطط الدائري يُظهر أجزاء الكل. كل قيمة تساوي 360° : N.'
        }
    },
    {
        id: 'mean',
        stage: 'parameters',
        lessonTopic: 'mean',
        title: { eu: 'Batez bestekoaren balantza', es: 'La balanza de la media', ar: 'ميزان المتوسط' },
        observe: {
            eu: 'Batez bestekoa oreka-puntua da. Datu bakar bat asko igotzen baduzu, batez bestekoa mugitzen da, baina mediana ia ez.',
            es: 'La media es el punto de equilibrio. Si subes mucho un solo dato, la media se mueve, pero la mediana casi no.',
            ar: 'المتوسط نقطة التوازن. إذا رفعت قيمة واحدة كثيرًا يتحرك المتوسط، أما الوسيط فبالكاد يتحرك.'
        }
    },
    {
        id: 'dice',
        stage: 'probability',
        lessonTopic: 'frequency-probability',
        title: { eu: 'Dado-simulagailua', es: 'Simulador de dados', ar: 'محاكي النرد' },
        observe: {
            eu: 'Jaurtiketa gutxirekin maiztasun erlatiboa asko aldatzen da; asko jaurtita, Laplaceren probabilitatera hurbiltzen da.',
            es: 'Con pocos lanzamientos la frecuencia relativa cambia mucho; con muchos, se acerca a la probabilidad de Laplace.',
            ar: 'مع رميات قليلة يتغيّر التكرار النسبي كثيرًا، ومع رميات كثيرة يقترب من احتمال لابلاس.'
        }
    }
]

export const statisticsLabToolForTopic: Record<string, StatisticsLabToolId | undefined> = {
    study: 'variables',
    variables: 'variables',
    frequencies: 'table',
    table: 'table',
    'bar-chart': 'charts',
    'pie-chart': 'charts',
    'line-chart': 'charts',
    mean: 'mean',
    'median-mode': 'mean',
    range: 'mean',
    random: 'dice',
    laplace: 'dice',
    'frequency-probability': 'dice'
}

const answered = (state: OperationAnswer, expected: FractionValue) => checkAnswer(state.answer, expected) === 'correct'
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/* ---------- Variable sorter ---------- */

export type VariableKind = 'qualitative' | 'discrete' | 'continuous'

export interface VariableCard {
    name: LocalizedText
    kind: VariableKind
}

export const variableCards: VariableCard[] = [
    { name: { eu: 'Kirol gogokoena', es: 'Deporte favorito', ar: 'الرياضة المفضلة' }, kind: 'qualitative' },
    { name: { eu: 'Anai-arreba kopurua', es: 'Número de hermanos', ar: 'عدد الإخوة' }, kind: 'discrete' },
    { name: { eu: 'Altuera', es: 'Altura', ar: 'الطول' }, kind: 'continuous' },
    { name: { eu: 'Begien kolorea', es: 'Color de ojos', ar: 'لون العينين' }, kind: 'qualitative' },
    { name: { eu: 'Oinetako-zenbakia', es: 'Número de pie', ar: 'مقاس الحذاء' }, kind: 'discrete' },
    { name: { eu: 'Eskolara iristeko denbora', es: 'Tiempo en llegar al instituto', ar: 'زمن الوصول إلى المدرسة' }, kind: 'continuous' },
    { name: { eu: 'Jaioterria', es: 'Lugar de nacimiento', ar: 'مكان الولادة' }, kind: 'qualitative' },
    { name: { eu: 'Pisua', es: 'Peso', ar: 'الوزن' }, kind: 'continuous' }
]

export interface VariablesState {
    /** The learner's choice for each card, null while unsorted */
    choices: Array<VariableKind | null>
}

export const initialVariablesState: VariablesState = { choices: variableCards.map(() => null) }

export function chooseKind(state: VariablesState, index: number, kind: VariableKind): VariablesState {
    return { choices: state.choices.map((choice, position) => (position === index ? kind : choice)) }
}

/** Every card of that kind is sorted right, and no other card was put there */
function kindSorted(state: VariablesState, kind: VariableKind): boolean {
    return variableCards.every((card, index) => (card.kind === kind) === (state.choices[index] === kind))
}

export const variablesChallenges: LabChallenge<VariablesState>[] = [
    {
        id: 11101,
        prompt: { eu: 'Sailkatu aldagai kualitatibo guztiak.', es: 'Clasifica todas las variables cualitativas.', ar: 'صنّف كل المتغيرات النوعية.' },
        hint: { eu: 'Ez dira zenbakiak: ezaugarriak dira.', es: 'No son números: son cualidades.', ar: 'ليست أعدادًا بل صفات.' },
        isSolved: (state) => kindSorted(state, 'qualitative')
    },
    {
        id: 11102,
        prompt: { eu: 'Sailkatu aldagai diskretu guztiak.', es: 'Clasifica todas las variables discretas.', ar: 'صنّف كل المتغيرات المنفصلة.' },
        hint: { eu: 'Zenbatu egiten dira: 1, 2, 3…', es: 'Se cuentan: 1, 2, 3…', ar: 'تُعَدّ: 1، 2، 3…' },
        isSolved: (state) => kindSorted(state, 'discrete')
    },
    {
        id: 11103,
        prompt: { eu: 'Sailkatu aldagai jarraitu guztiak.', es: 'Clasifica todas las variables continuas.', ar: 'صنّف كل المتغيرات المتصلة.' },
        hint: { eu: 'Neurtu egiten dira, eta hamartarrak izan ditzakete.', es: 'Se miden y pueden tener decimales.', ar: 'تُقاس ويمكن أن تكون لها أجزاء عشرية.' },
        isSolved: (state) => kindSorted(state, 'continuous')
    },
    {
        id: 11104,
        prompt: { eu: 'Sailkatu zortzi aldagaiak ondo.', es: 'Clasifica bien las ocho variables.', ar: 'صنّف المتغيرات الثمانية تصنيفًا صحيحًا.' },
        hint: { eu: 'Hiru kualitatibo, bi diskretu eta hiru jarraitu.', es: 'Tres cualitativas, dos discretas y tres continuas.', ar: 'ثلاثة نوعية واثنان منفصلان وثلاثة متصلة.' },
        isSolved: (state) => variableCards.every((card, index) => state.choices[index] === card.kind)
    }
]

/* ---------- Frequency table and charts ---------- */

export const FREQUENCY_LIMITS = { min: 0, max: 20 } as const

export interface FrequencyState {
    counts: number[]
}

/** The class survey: football, basketball, swimming, pelota */
export const initialFrequencyState: FrequencyState = { counts: [8, 5, 4, 3] }

export function setCount(state: FrequencyState, index: number, count: number): FrequencyState {
    return { ...state, counts: state.counts.map((value, position) => (position === index ? clamp(count, FREQUENCY_LIMITS.min, FREQUENCY_LIMITS.max) : value)) }
}

export const total = (counts: number[]) => counts.reduce((sum, count) => sum + count, 0)
/** Relative frequency of one row, null when there are no data */
export const relative = (counts: number[], index: number): FractionValue | null => (total(counts) === 0 ? null : fraction(counts[index], total(counts)))
export const sectorAngle = (counts: number[], index: number): FractionValue | null => (total(counts) === 0 ? null : fraction(counts[index] * 360, total(counts)))

const relativeIs = (counts: number[], index: number, numerator: number, denominator: number) => total(counts) > 0 && counts[index] * denominator === numerator * total(counts)

export const tableChallenges: LabChallenge<FrequencyState>[] = [
    {
        id: 11201,
        prompt: { eu: 'Egin 25 datuko taula bat (N = 25).', es: 'Haz una tabla de 25 datos (N = 25).', ar: 'أنشئ جدولًا من 25 قيمة (N = 25).' },
        hint: { eu: 'Maiztasun absolutu guztien batura N da.', es: 'La suma de todas las frecuencias absolutas es N.', ar: 'مجموع كل التكرارات المطلقة هو N.' },
        isSolved: (state) => total(state.counts) === 25
    },
    {
        id: 11202,
        prompt: { eu: 'Lortu futbolaren maiztasun erlatiboa 0,5 izatea.', es: 'Consigue que la frecuencia relativa del fútbol sea 0,5.', ar: 'اجعل التكرار النسبي لكرة القدم 0.5.' },
        hint: { eu: 'Futbolak datuen erdia izan behar du.', es: 'El fútbol tiene que ser la mitad de los datos.', ar: 'يجب أن تكون كرة القدم نصف البيانات.' },
        isSolved: (state) => relativeIs(state.counts, 0, 1, 2)
    },
    {
        id: 11203,
        prompt: { eu: 'Lortu lau kirolek % 25 izatea bakoitzak.', es: 'Consigue que cada uno de los cuatro deportes tenga el 25 %.', ar: 'اجعل لكل رياضة من الأربع 25 %.' },
        hint: { eu: 'Lau maiztasun berdinak (ez zero).', es: 'Cuatro frecuencias iguales (no cero).', ar: 'أربعة تكرارات متساوية (غير صفرية).' },
        isSolved: (state) => state.counts.every((_, index) => relativeIs(state.counts, index, 1, 4))
    },
    {
        id: 11204,
        prompt: { eu: 'Egin taula bat maiztasun erlatibo hauekin: 0,4, 0,3, 0,2 eta 0,1.', es: 'Haz una tabla con estas frecuencias relativas: 0,4, 0,3, 0,2 y 0,1.', ar: 'أنشئ جدولًا بهذه التكرارات النسبية: 0.4 و0.3 و0.2 و0.1.' },
        hint: { eu: 'Probatu N = 10: 4, 3, 2 eta 1.', es: 'Prueba con N = 10: 4, 3, 2 y 1.', ar: 'جرّب N = 10: 4 و3 و2 و1.' },
        isSolved: (state) => [4, 3, 2, 1].every((tenths, index) => relativeIs(state.counts, index, tenths, 10))
    }
]

export type ChartKind = 'bar' | 'pie'

export interface ChartsState extends FrequencyState, OperationAnswer {
    chart: ChartKind
    /** Pie angles of football written right, as "count/N" */
    solved: string[]
}

export const initialChartsState: ChartsState = { counts: [8, 5, 4, 3], chart: 'pie', solved: [], ...freshAnswer }

export function setChart(state: ChartsState, patch: { chart?: ChartKind; index?: number; count?: number }): ChartsState {
    const counts = patch.index === undefined || patch.count === undefined ? state.counts : setCount(state, patch.index, patch.count).counts
    return { ...state, counts, chart: patch.chart ?? state.chart, ...freshAnswer }
}

const chartKey = (counts: number[]) => `${counts[0]}/${total(counts)}`

/** The learner writes the angle of the football sector; right answers are recorded */
export function answerChart(state: ChartsState, patch: Partial<OperationAnswer>): ChartsState {
    const next = { ...state, ...patch }
    const expected = sectorAngle(next.counts, 0)
    if (expected && next.checked && !next.revealed && answered(next, expected) && !next.solved.includes(chartKey(next.counts))) return { ...next, solved: [...next.solved, chartKey(next.counts)] }
    return next
}

const angleIs = (counts: number[], index: number, degrees: number) => relativeIs(counts, index, degrees, 360)

export const chartsChallenges: LabChallenge<ChartsState>[] = [
    {
        id: 11301,
        prompt: { eu: 'Sektore-diagrama batean, egin futbolaren sektorea 180°-koa.', es: 'En un diagrama de sectores, haz que el sector del fútbol mida 180°.', ar: 'في مخطط دائري اجعل قطاع كرة القدم 180°.' },
        hint: { eu: '180° zirkuluaren erdia da.', es: '180° es medio círculo.', ar: '180° نصف الدائرة.' },
        isSolved: (state) => state.chart === 'pie' && angleIs(state.counts, 0, 180)
    },
    {
        id: 11302,
        prompt: { eu: 'Egin saskibaloiaren eta igeriketaren sektoreak 90°-koak.', es: 'Haz que los sectores del baloncesto y la natación midan 90°.', ar: 'اجعل قطاعي كرة السلة والسباحة 90° لكل منهما.' },
        hint: { eu: 'Bakoitzak datuen laurdena.', es: 'Cada uno, un cuarto de los datos.', ar: 'لكل منهما ربع البيانات.' },
        isSolved: (state) => state.chart === 'pie' && angleIs(state.counts, 1, 90) && angleIs(state.counts, 2, 90)
    },
    {
        id: 11303,
        prompt: { eu: 'Barra-diagrama batean, egin lau barrak altuera berekoak.', es: 'En un diagrama de barras, haz las cuatro barras de la misma altura.', ar: 'في مخطط الأعمدة اجعل الأعمدة الأربعة بالارتفاع نفسه.' },
        hint: { eu: 'Lau maiztasun berdinak.', es: 'Cuatro frecuencias iguales.', ar: 'أربعة تكرارات متساوية.' },
        isSolved: (state) => state.chart === 'bar' && state.counts[0] > 0 && state.counts.every((count) => count === state.counts[0])
    },
    {
        id: 11304,
        prompt: { eu: 'Idatzi futbolaren sektorearen angelua bi taula desberdinetan.', es: 'Escribe el ángulo del sector del fútbol en dos tablas distintas.', ar: 'اكتب زاوية قطاع كرة القدم في جدولين مختلفين.' },
        hint: { eu: '$\\frac{f}{N}\\cdot 360$', es: '$\\frac{f}{N}\\cdot 360$', ar: '$\\frac{f}{N}\\cdot 360$' },
        isSolved: (state) => state.solved.length >= 2
    }
]

/* ---------- Balance of the mean ---------- */

export const DATA_LIMITS = { min: 0, max: 10 } as const

export interface MeanState extends OperationAnswer {
    values: number[]
    /** Data sets whose mean was written right, as sorted lists */
    solved: string[]
}

export const initialMeanState: MeanState = { values: [5, 7, 7, 8, 9], solved: [], ...freshAnswer }

export function setValue(state: MeanState, index: number, value: number): MeanState {
    return { ...state, values: state.values.map((current, position) => (position === index ? clamp(value, DATA_LIMITS.min, DATA_LIMITS.max) : current)), ...freshAnswer }
}

const sorted = (values: number[]) => [...values].sort((x, y) => x - y)
export const meanOf = (values: number[]): FractionValue => fraction(total(values), values.length)
export const medianOf = (values: number[]): FractionValue => {
    const ordered = sorted(values)
    const middle = Math.floor(ordered.length / 2)
    return ordered.length % 2 === 1 ? fraction(ordered[middle]) : fraction(ordered[middle - 1] + ordered[middle], 2)
}
/** Every value that appears the most times */
export function modesOf(values: number[]): number[] {
    const counts = new Map<number, number>()
    for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1)
    const most = Math.max(...counts.values())
    return [...counts.entries()].filter(([, count]) => count === most).map(([value]) => value).sort((x, y) => x - y)
}
export const rangeOf = (values: number[]) => Math.max(...values) - Math.min(...values)

const meanKey = (values: number[]) => sorted(values).join(',')

export function answerMean(state: MeanState, patch: Partial<OperationAnswer>): MeanState {
    const next = { ...state, ...patch }
    if (next.checked && !next.revealed && answered(next, meanOf(next.values)) && !next.solved.includes(meanKey(next.values))) return { ...next, solved: [...next.solved, meanKey(next.values)] }
    return next
}

const same = (left: FractionValue, right: FractionValue) => left.numerator * right.denominator === right.numerator * left.denominator

export const meanChallenges: LabChallenge<MeanState>[] = [
    {
        id: 11401,
        prompt: { eu: 'Aldatu datuak batez bestekoa 6 izan dadin.', es: 'Cambia los datos para que la media sea 6.', ar: 'غيّر البيانات ليصبح المتوسط 6.' },
        hint: { eu: 'Bost datuen batura 30 izan behar da.', es: 'La suma de los cinco datos tiene que ser 30.', ar: 'يجب أن يكون مجموع القيم الخمس 30.' },
        isSolved: (state) => same(meanOf(state.values), fraction(6))
    },
    {
        id: 11402,
        prompt: { eu: 'Lortu ibiltartea 0 izatea. Zer gertatzen da batez bestekoarekin eta medianarekin?', es: 'Consigue que el rango sea 0. ¿Qué pasa con la media y la mediana?', ar: 'اجعل المدى 0. ماذا يحدث للمتوسط والوسيط؟' },
        hint: { eu: 'Datu guztiak berdinak.', es: 'Todos los datos iguales.', ar: 'كل القيم متساوية.' },
        isSolved: (state) => rangeOf(state.values) === 0
    },
    {
        id: 11403,
        prompt: { eu: 'Egin datu-multzo bat mediana 5 eta batez bestekoa 6 dituena.', es: 'Haz un conjunto de datos con mediana 5 y media 6.', ar: 'أنشئ مجموعة بيانات وسيطها 5 ومتوسطها 6.' },
        hint: { eu: 'Erdiko datua 5; handienak igo batura 30 izan arte.', es: 'El dato central 5; sube los mayores hasta que la suma sea 30.', ar: 'القيمة الوسطى 5؛ ارفع الكبرى حتى يصبح المجموع 30.' },
        isSolved: (state) => same(medianOf(state.values), fraction(5)) && same(meanOf(state.values), fraction(6))
    },
    {
        id: 11404,
        prompt: { eu: 'Idatzi batez bestekoa zenbaki osoa ez denean.', es: 'Escribe la media cuando no sea un número entero.', ar: 'اكتب المتوسط عندما لا يكون عددًا صحيحًا.' },
        hint: { eu: 'Adibidez, batura 32 bada: $32\\mathbin{:}5=6{,}4$.', es: 'Por ejemplo, si la suma es 32: $32\\mathbin{:}5=6{,}4$.', ar: 'مثلًا إذا كان المجموع 32: $32\\mathbin{:}5=6.4$.' },
        isSolved: (state) => state.solved.some((key) => total(key.split(',').map(Number)) % 5 !== 0)
    }
]

/* ---------- Die simulator ---------- */

export type DiceEvent = 'six' | 'even' | 'more-than-3' | 'less-than-5'

export const diceEvents: Record<DiceEvent, { faces: number[]; name: LocalizedText }> = {
    six: { faces: [6], name: { eu: '6 ateratzea', es: 'Sacar un 6', ar: 'الحصول على 6' } },
    even: { faces: [2, 4, 6], name: { eu: 'Bikoitia', es: 'Par', ar: 'زوجي' } },
    'more-than-3': { faces: [4, 5, 6], name: { eu: '3 baino gehiago', es: 'Más de 3', ar: 'أكثر من 3' } },
    'less-than-5': { faces: [1, 2, 3, 4], name: { eu: '5 baino gutxiago', es: 'Menos de 5', ar: 'أقل من 5' } }
}

export interface DiceState extends OperationAnswer {
    event: DiceEvent
    /** How many times each face (1–6) came out */
    faces: number[]
    /** Events whose probability was written right */
    solved: DiceEvent[]
}

export const initialDiceState: DiceState = { event: 'even', faces: [0, 0, 0, 0, 0, 0], solved: [], ...freshAnswer }

export const probabilityOf = (event: DiceEvent): FractionValue => fraction(diceEvents[event].faces.length, 6)
export const throwsOf = (state: Pick<DiceState, 'faces'>) => total(state.faces)
export const favourableOf = (state: Pick<DiceState, 'faces' | 'event'>) => diceEvents[state.event].faces.reduce((sum, face) => sum + state.faces[face - 1], 0)
/** Relative frequency of the chosen event, null before the first throw */
export const eventFrequency = (state: Pick<DiceState, 'faces' | 'event'>): FractionValue | null => (throwsOf(state) === 0 ? null : fraction(favourableOf(state), throwsOf(state)))

export function setEvent(state: DiceState, event: DiceEvent): DiceState {
    return { ...state, event, ...freshAnswer }
}

/** Adds the given rolls (numbers 1–6) to the counts */
export function addRolls(state: DiceState, rolls: number[]): DiceState {
    const faces = [...state.faces]
    for (const roll of rolls) if (roll >= 1 && roll <= 6) faces[roll - 1] += 1
    return { ...state, faces }
}

export const resetRolls = (state: DiceState): DiceState => ({ ...state, faces: [0, 0, 0, 0, 0, 0] })

export function answerDice(state: DiceState, patch: Partial<OperationAnswer>): DiceState {
    const next = { ...state, ...patch }
    if (next.checked && !next.revealed && answered(next, probabilityOf(next.event)) && !next.solved.includes(next.event)) return { ...next, solved: [...next.solved, next.event] }
    return next
}

export const diceChallenges: LabChallenge<DiceState>[] = [
    {
        id: 11501,
        prompt: { eu: 'Idatzi 6 ateratzeko probabilitatea.', es: 'Escribe la probabilidad de sacar un 6.', ar: 'اكتب احتمال الحصول على 6.' },
        hint: { eu: 'Aldeko kasu bat, sei posible.', es: 'Un caso favorable de seis posibles.', ar: 'حالة ملائمة واحدة من ست ممكنة.' },
        isSolved: (state) => state.solved.includes('six')
    },
    {
        id: 11502,
        prompt: { eu: 'Idatzi 5 baino gutxiago ateratzeko probabilitatea.', es: 'Escribe la probabilidad de sacar menos de 5.', ar: 'اكتب احتمال الحصول على أقل من 5.' },
        hint: { eu: 'Aldekoak: 1, 2, 3 eta 4.', es: 'Favorables: 1, 2, 3 y 4.', ar: 'الملائمة: 1 و2 و3 و4.' },
        isSolved: (state) => state.solved.includes('less-than-5')
    },
    {
        id: 11503,
        prompt: { eu: 'Jaurti dadoa gutxienez 100 aldiz.', es: 'Lanza el dado al menos 100 veces.', ar: 'ارمِ النرد 100 مرة على الأقل.' },
        hint: { eu: 'Erabili «×100» botoia.', es: 'Usa el botón «×100».', ar: 'استعمل زر «×100».' },
        isSolved: (state) => throwsOf(state) >= 100
    },
    {
        id: 11504,
        prompt: { eu: '1.000 jaurtiketa edo gehiagorekin, lortu maiztasun erlatiboa probabilitatetik 0,05 baino gutxiagora egotea.', es: 'Con 1.000 lanzamientos o más, consigue que la frecuencia relativa quede a menos de 0,05 de la probabilidad.', ar: 'مع 1000 رمية أو أكثر اجعل التكرار النسبي على بعد أقل من 0.05 من الاحتمال.' },
        hint: { eu: 'Jaurti askotan: maiztasuna probabilitatera hurbiltzen da.', es: 'Lanza muchas veces: la frecuencia se acerca a la probabilidad.', ar: 'ارمِ مرات كثيرة: يقترب التكرار من الاحتمال.' },
        isSolved: (state) => {
            const frequency = eventFrequency(state)
            const probability = probabilityOf(state.event)
            return throwsOf(state) >= 1000 && frequency !== null && Math.abs(frequency.numerator / frequency.denominator - probability.numerator / probability.denominator) < 0.05
        }
    }
]

export const statisticsLabChallengeIds: number[] = [
    ...variablesChallenges,
    ...tableChallenges,
    ...chartsChallenges,
    ...meanChallenges,
    ...diceChallenges
].map((challenge) => challenge.id)
