import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import type { StatisticsStageId } from '../lessons.tsx'

/* ==========================================================================
   Estatistika eta probabilitatea (2. DBH) laboratory: a cumulative
   frequency table, a histogram with its polygons, a pie chart from
   percentages, the centre of a table (mean, median, mode), a box plot of
   seven data with the mean deviation, and the table of two dice. Pure state
   logic and challenges; components live next to this file. Tests in
   tests/estatistika-dbh2-lab.test.ts.
   ========================================================================== */

export type StatisticsLabToolId = 'cumulative' | 'histogram' | 'pie' | 'centre' | 'box' | 'dice'

export interface StatisticsLabTool extends LabToolInfo {
    id: StatisticsLabToolId
    stage: StatisticsStageId
}

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })

export const statisticsLabTools: StatisticsLabTool[] = [
    {
        id: 'cumulative',
        stage: 'tables',
        lessonTopic: 'cumulative',
        title: say('Maiztasun metatuak', 'Frecuencias acumuladas', 'التكرارات المتجمّعة'),
        observe: say(
            'Maiztasun bat aldatzean, haren azpiko metatu guztiak aldatzen dira, baina gainekoak ez. Azken metatua beti N da, eta erlatibo metatuaren azkena 1.',
            'Al cambiar una frecuencia, cambian todas las acumuladas de debajo, pero no las de arriba. La última acumulada es siempre N, y la última relativa acumulada, 1.',
            'عند تغيير تكرار تتغيّر كل المتجمّعات التي تحته، لا التي فوقه. وآخر متجمّع دائمًا N، وآخر متجمّع نسبي 1.'
        )
    },
    {
        id: 'histogram',
        stage: 'graphs',
        lessonTopic: 'histogram',
        title: say('Histograma eta poligonoak', 'Histograma y polígonos', 'المدرّج والمضلّعات'),
        observe: say(
            'Laukizuzenak itsatsita daude. Maiztasun-poligonoa klase-marken gainetik doa; poligono metatua beti gorantz doa eta N-n amaitzen da.',
            'Los rectángulos están pegados. El polígono de frecuencias pasa sobre las marcas de clase; el acumulado siempre sube y termina en N.',
            'المستطيلات متلاصقة. يمرّ المضلّع التكراري فوق مراكز الفئات، والمتجمّع يصعد دائمًا وينتهي عند N.'
        )
    },
    {
        id: 'pie',
        stage: 'graphs',
        lessonTopic: 'pie',
        title: say('Ehunekoetatik sektoreetara', 'De porcentajes a sectores', 'من النسب إلى القطاعات'),
        observe: say(
            '% 1 zirkuluaren 3,6° da. Ehunekoek 100 eman behar dute; bestela, diagramak ez du osoa erakusten.',
            'El 1 % del círculo son 3,6°. Los porcentajes tienen que sumar 100; si no, el diagrama no muestra el total.',
            '1 % من الدائرة 3.6°. يجب أن يكون مجموع النسب 100، وإلا فلن يُظهر المخطط الكل.'
        )
    },
    {
        id: 'centre',
        stage: 'centre',
        lessonTopic: 'mean-table',
        title: say('Taula baten erdigunea', 'El centro de una tabla', 'مركز الجدول'),
        observe: say(
            'Batez bestekoa oreka-puntua da: muturreko balio batek asko mugitzen du. Mediana erdiko datua da, eta moda barra altuena.',
            'La media es el punto de equilibrio: un valor extremo la mueve mucho. La mediana es el dato central, y la moda, la barra más alta.',
            'المتوسط نقطة التوازن: تحرّكه قيمة متطرفة كثيرًا. والوسيط البيان الأوسط، والمنوال العمود الأعلى.'
        )
    },
    {
        id: 'box',
        stage: 'spread',
        lessonTopic: 'box-plot',
        title: say('Kutxa eta biboteak', 'Caja y bigotes', 'الصندوق والشاربان'),
        observe: say(
            'Zazpi datu: mediana 4.a da, Q₁ 2.a eta Q₃ 6.a. Zati bakoitzean datuen % 25 dago, nahiz eta luzera desberdina izan.',
            'Siete datos: la mediana es el 4.º, Q₁ el 2.º y Q₃ el 6.º. En cada parte está el 25 % de los datos, aunque midan distinto.',
            'سبعة بيانات: الوسيط الرابع، وQ₁ الثاني، وQ₃ السادس. في كل جزء 25 % من البيانات وإن اختلفت أطوالها.'
        )
    },
    {
        id: 'dice',
        stage: 'chance',
        lessonTopic: 'tree',
        title: say('Bi dadoren taula', 'La tabla de dos dados', 'جدول النردين'),
        observe: say(
            '36 gelaxkak aukera bera dute. Batura batzuk gelaxka askotan agertzen dira (7: sei aldiz) eta beste batzuk bakarrean (2 eta 12).',
            'Las 36 casillas tienen la misma posibilidad. Algunas sumas aparecen en muchas casillas (el 7, seis veces) y otras en una sola (2 y 12).',
            'للخانات الست والثلاثين الإمكان نفسه. بعض المجاميع تظهر في خانات كثيرة (7 ست مرات) وبعضها في خانة واحدة (2 و12).'
        )
    }
]

export const statisticsLabToolForTopic: Record<string, StatisticsLabToolId | undefined> = {
    sample: 'cumulative',
    cumulative: 'cumulative',
    grouped: 'histogram',
    histogram: 'histogram',
    pie: 'pie',
    misleading: 'pie',
    'mean-table': 'centre',
    'median-table': 'centre',
    symmetry: 'centre',
    deviation: 'box',
    quartiles: 'box',
    'box-plot': 'box',
    events: 'dice',
    tree: 'dice',
    'double-table': 'dice'
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)
const same = (a: FractionValue | null, numerator: number, denominator = 1) => a !== null && a.numerator * denominator === numerator * a.denominator

/** Running totals of a list of frequencies: F_i */
export const cumulativeOf = (counts: number[]) => counts.map((_, index) => sum(counts.slice(0, index + 1)))

/* ---------- 1. Cumulative frequencies: books read in summer (values 0–4) ---------- */

export const COUNT_MAX = 12

export interface CumulativeState {
    counts: number[]
}

export const initialCumulativeState: CumulativeState = { counts: [3, 6, 5, 4, 2] }

export function setCount(state: CumulativeState, index: number, count: number): CumulativeState {
    return { counts: state.counts.map((value, position) => (position === index ? clamp(count, 0, COUNT_MAX) : value)) }
}

/** H_i as an exact fraction, or null when there are no data */
export const relativeCumulative = (counts: number[], index: number): FractionValue | null => {
    const total = sum(counts)
    return total === 0 ? null : fraction(cumulativeOf(counts)[index], total)
}

export const cumulativeChallenges: LabChallenge<CumulativeState>[] = [
    {
        id: 26101,
        prompt: say('Lortu 25 datu, eta 2 liburu edo gutxiago 15 ikaslek.', 'Consigue 25 datos, con 15 alumnos de 2 libros o menos.', 'احصل على 25 بيانًا، منهم 15 تلميذًا قرؤوا كتابين أو أقل.'),
        hint: say('Azken metatua 25 izan behar da, eta 2ren metatua 15.', 'La última acumulada tiene que ser 25, y la del 2, 15.', 'يجب أن يكون آخر متجمّع 25، ومتجمّع العدد 2 هو 15.'),
        isSolved: (state) => sum(state.counts) === 25 && cumulativeOf(state.counts)[2] === 15
    },
    {
        id: 26102,
        prompt: say('Egin 1 baliora arteko maiztasun erlatibo metatua 0,5 izatea, gutxienez 10 daturekin.', 'Haz que la frecuencia relativa acumulada hasta el valor 1 sea 0,5, con al menos 10 datos.', 'اجعل التكرار النسبي المتجمّع حتى القيمة 1 يساوي 0.5، بعشرة بيانات على الأقل.'),
        hint: say('0 eta 1 balioen maiztasunak gainerakoenak adina izan behar dira.', 'Las frecuencias del 0 y el 1 tienen que sumar lo mismo que las demás.', 'يجب أن يساوي مجموع تكراري 0 و1 مجموع البقية.'),
        isSolved: (state) => sum(state.counts) >= 10 && same(relativeCumulative(state.counts, 1), 1, 2)
    },
    {
        id: 26103,
        prompt: say('Lortu datuen % 75ek gehienez 2 liburu irakurri izana, eta 4 liburu irakurri dituen norbait egotea.', 'Consigue que el 75 % de los datos sea de 2 libros como mucho, y que alguien haya leído 4.', 'اجعل 75 % من البيانات كتابين على الأكثر، وأن يكون هناك من قرأ 4.'),
        hint: say('2ren erlatibo metatua: 0,75. Adibidez, 20 datutik 15.', 'La relativa acumulada del 2: 0,75. Por ejemplo, 15 de 20 datos.', 'المتجمّع النسبي للعدد 2: 0.75. مثلًا 15 من 20 بيانًا.'),
        isSolved: (state) => state.counts[4] >= 1 && same(relativeCumulative(state.counts, 2), 3, 4)
    }
]

/* ---------- 2. Histogram: heights in four intervals ---------- */

export const HEIGHT_EDGES = [140, 150, 160, 170, 180]
export const CLASS_MAX = 15

export type PolygonKind = 'frequency' | 'cumulative'

export interface HistogramState {
    counts: number[]
    polygon: PolygonKind
}

export const initialHistogramState: HistogramState = { counts: [3, 9, 12, 6], polygon: 'frequency' }

export function setHistogram(state: HistogramState, patch: { index?: number; count?: number; polygon?: PolygonKind }): HistogramState {
    const counts = patch.index === undefined || patch.count === undefined ? state.counts : state.counts.map((value, position) => (position === patch.index ? clamp(patch.count!, 0, CLASS_MAX) : value))
    return { counts, polygon: patch.polygon ?? state.polygon }
}

export const classMarks = HEIGHT_EDGES.slice(0, -1).map((edge, index) => (edge + HEIGHT_EDGES[index + 1]) / 2)

/** Mean of grouped data with the class marks, or null when there are no data */
export const groupedMean = (counts: number[]): FractionValue | null => {
    const total = sum(counts)
    return total === 0 ? null : fraction(sum(counts.map((count, index) => count * classMarks[index])), total)
}

export const histogramChallenges: LabChallenge<HistogramState>[] = [
    {
        id: 26201,
        prompt: say('Egin $[150,160)$ tarteko laukizuzena besteak baino altuagoa.', 'Haz que el rectángulo de $[150,160)$ sea más alto que los demás.', 'اجعل مستطيل $[150,160)$ أعلى من البقية.'),
        hint: say('Bere maiztasunak beste guztienak gainditu behar ditu.', 'Su frecuencia tiene que superar a todas las demás.', 'يجب أن يتجاوز تكراره كل التكرارات الأخرى.'),
        isSolved: (state) => state.counts.every((count, index) => index === 1 || count < state.counts[1])
    },
    {
        id: 26202,
        prompt: say('Egin histograma simetriko bat, erdiko bi tarteak muturretakoak baino altuago.', 'Haz un histograma simétrico, con los dos intervalos centrales más altos que los extremos.', 'اصنع مدرّجًا متماثلًا، بفئتين وسطيين أعلى من الطرفيتين.'),
        hint: say('Lehena eta laugarrena berdinak; bigarrena eta hirugarrena berdinak eta handiagoak. Batez bestekoa 160 izango da.', 'El primero igual al cuarto; el segundo igual al tercero y mayores. La media será 160.', 'الأولى تساوي الرابعة، والثانية تساوي الثالثة وهما أكبر. وسيكون المتوسط 160.'),
        isSolved: (state) => state.counts[0] === state.counts[3] && state.counts[1] === state.counts[2] && state.counts[1] > state.counts[0]
    },
    {
        id: 26203,
        prompt: say('Poligono metatuarekin: 30 ikasle, eta 170 cm baino gutxiago 20k.', 'Con el polígono acumulado: 30 alumnos, y 20 de menos de 170 cm.', 'بالمضلّع المتجمّع: 30 تلميذًا، و20 منهم أقل من 170 سم.'),
        hint: say('Aukeratu poligono metatua. Hirugarren metatua 20 eta azkena 30.', 'Elige el polígono acumulado. La tercera acumulada 20 y la última 30.', 'اختر المضلّع المتجمّع. المتجمّع الثالث 20 والأخير 30.'),
        isSolved: (state) => state.polygon === 'cumulative' && sum(state.counts) === 30 && cumulativeOf(state.counts)[2] === 20
    }
]

/* ---------- 3. Pie chart from percentages ---------- */

export const PERCENT_STEP = 5

export interface PieState {
    percents: number[]
}

export const initialPieState: PieState = { percents: [40, 30, 20, 10] }

export function setPercent(state: PieState, index: number, percent: number): PieState {
    return { percents: state.percents.map((value, position) => (position === index ? clamp(percent, 0, 100) : value)) }
}

/** Angle of a sector in degrees: 3,6° per 1 % */
export const percentAngle = (percent: number) => (percent * 36) / 10
export const percentTotal = (state: PieState) => sum(state.percents)

export const pieChallenges: LabChallenge<PieState>[] = [
    {
        id: 26301,
        prompt: say('Egin autobusaren sektoreak 90° izatea, ehunekoek 100 emanda.', 'Haz que el sector del autobús mida 90°, con los porcentajes sumando 100.', 'اجعل قطاع الحافلة 90°، مع مجموع نسب 100.'),
        hint: say('90° zirkuluaren laurdena da: % 25.', '90° es un cuarto del círculo: el 25 %.', '90° ربع الدائرة: 25 %.'),
        isSolved: (state) => percentTotal(state) === 100 && state.percents[1] === 25
    },
    {
        id: 26302,
        prompt: say('Egin lau sektore berdin.', 'Haz cuatro sectores iguales.', 'اصنع أربعة قطاعات متساوية.'),
        hint: say('Bakoitza % 25: 90°.', 'Cada uno el 25 %: 90°.', 'كل منها 25 %: 90°.'),
        isSolved: (state) => state.percents.every((percent) => percent === 25)
    },
    {
        id: 26303,
        prompt: say('Egin oinezkoen sektoreak 162° eta autoarenak 54° izatea, ehunekoek 100 emanda.', 'Haz que el sector de a pie mida 162° y el del coche 54°, con los porcentajes sumando 100.', 'اجعل قطاع المشي 162° وقطاع السيارة 54°، مع مجموع نسب 100.'),
        hint: say('Zatitu angelua 3,6z: % 45 eta % 15.', 'Divide el ángulo entre 3,6: 45 % y 15 %.', 'اقسم الزاوية على 3.6: 45 % و15 %.'),
        isSolved: (state) => percentTotal(state) === 100 && state.percents[0] === 45 && state.percents[2] === 15
    }
]

/* ---------- 4. Centre of a table: values 0–5 ---------- */

export const CENTRE_VALUES = [0, 1, 2, 3, 4, 5]
export const CENTRE_MAX = 10

export interface CentreState {
    counts: number[]
}

export const initialCentreState: CentreState = { counts: [1, 4, 6, 3, 1, 0] }

export function setCentreCount(state: CentreState, index: number, count: number): CentreState {
    return { counts: state.counts.map((value, position) => (position === index ? clamp(count, 0, CENTRE_MAX) : value)) }
}

export const tableMean = (counts: number[]): FractionValue | null => {
    const total = sum(counts)
    return total === 0 ? null : fraction(sum(counts.map((count, value) => count * value)), total)
}

/** The value in a position (1-based) of the ordered data */
const valueAt = (counts: number[], position: number) => cumulativeOf(counts).findIndex((cumulative) => cumulative >= position)

/** Median of a table: the central datum, or the mean of the two central data */
export const tableMedian = (counts: number[]): FractionValue | null => {
    const total = sum(counts)
    if (total === 0) return null
    if (total % 2 === 1) return fraction(valueAt(counts, (total + 1) / 2))
    return fraction(valueAt(counts, total / 2) + valueAt(counts, total / 2 + 1), 2)
}

/** Values with the greatest frequency (none when there are no data) */
export const tableModes = (counts: number[]) => {
    const top = Math.max(...counts)
    return top === 0 ? [] : counts.flatMap((count, value) => (count === top ? [value] : []))
}

export const centreChallenges: LabChallenge<CentreState>[] = [
    {
        id: 26401,
        prompt: say('Egin batez bestekoa zehazki 2 izatea, gutxienez 10 daturekin.', 'Haz que la media sea exactamente 2, con al menos 10 datos.', 'اجعل المتوسط 2 تمامًا، بعشرة بيانات على الأقل.'),
        hint: say('$\\sum x_i f_i$ datu kopuruaren bikoitza izan behar da.', '$\\sum x_i f_i$ tiene que ser el doble del número de datos.', 'يجب أن يكون $\\sum x_i f_i$ ضعف عدد البيانات.'),
        isSolved: (state) => sum(state.counts) >= 10 && same(tableMean(state.counts), 2)
    },
    {
        id: 26402,
        prompt: say('Egin banaketa asimetriko bat: mediana 1 eta batez bestekoa 2 edo gehiago.', 'Haz una distribución asimétrica: mediana 1 y media 2 o más.', 'اصنع توزيعًا غير متماثل: الوسيط 1 والمتوسط 2 أو أكثر.'),
        hint: say('Datu gehienak txikiak, eta batzuk oso handiak (5).', 'La mayoría de los datos pequeños, y unos pocos muy grandes (5).', 'معظم البيانات صغيرة وقليل منها كبير جدًا (5).'),
        isSolved: (state) => {
            const mean = tableMean(state.counts)
            return same(tableMedian(state.counts), 1) && mean !== null && mean.numerator >= 2 * mean.denominator
        }
    },
    {
        id: 26403,
        prompt: say('Egin banaketa bimodal bat: bi moda, eta haien artean batez bestekoa.', 'Haz una distribución bimodal: dos modas, y la media entre ellas.', 'اصنع توزيعًا ثنائي المنوال: منوالان والمتوسط بينهما.'),
        hint: say('Bi barra altuenak berdinak; adibidez, 1 eta 4.', 'Las dos barras más altas iguales; por ejemplo, el 1 y el 4.', 'العمودان الأعلى متساويان؛ مثلًا 1 و4.'),
        isSolved: (state) => {
            const modes = tableModes(state.counts)
            const mean = tableMean(state.counts)
            return modes.length === 2 && mean !== null && mean.numerator > modes[0] * mean.denominator && mean.numerator < modes[1] * mean.denominator
        }
    }
]

/* ---------- 5. Box plot of seven data ---------- */

export const BOX_SIZE = 7
export const BOX_MAX = 10

export interface BoxState {
    values: number[]
}

export const initialBoxState: BoxState = { values: [2, 4, 5, 6, 6, 7, 9] }

export function setBoxValue(state: BoxState, index: number, value: number): BoxState {
    return { values: state.values.map((item, position) => (position === index ? clamp(value, 0, BOX_MAX) : item)) }
}

/** Five-number summary of seven data: minimum, Q1 (2nd), median (4th), Q3 (6th), maximum */
export function fiveNumbers(values: number[]) {
    const sorted = [...values].sort((a, b) => a - b)
    return { min: sorted[0], q1: sorted[1], median: sorted[3], q3: sorted[5], max: sorted[6], sorted }
}

export const boxMean = (values: number[]) => fraction(sum(values), values.length)

/** Mean deviation as an exact fraction: Σ |x − x̄| : N */
export function meanDeviation(values: number[]): FractionValue {
    const total = sum(values)
    const n = values.length
    // |x − total/n| = |n·x − total| / n, so DM = Σ |n·x − total| / n²
    return fraction(sum(values.map((value) => Math.abs(n * value - total))), n * n)
}

export const boxChallenges: LabChallenge<BoxState>[] = [
    {
        id: 26501,
        prompt: say('Egin mediana 5 eta ibiltartea 6.', 'Haz que la mediana sea 5 y el recorrido 6.', 'اجعل الوسيط 5 والمدى 6.'),
        hint: say('Ordenatuta, 4. datua 5; handiena ken txikiena, 6.', 'Ordenados, el 4.º dato es 5; el mayor menos el menor, 6.', 'بعد الترتيب البيان الرابع 5، والأكبر ناقص الأصغر 6.'),
        isSolved: (state) => {
            const summary = fiveNumbers(state.values)
            return summary.median === 5 && summary.max - summary.min === 6
        }
    },
    {
        id: 26502,
        prompt: say('Egin kutxa labur bat (2) eta bibote luzeak: ibiltartea gutxienez 8.', 'Haz una caja corta (2) y bigotes largos: recorrido de al menos 8.', 'اصنع صندوقًا قصيرًا (2) وشاربين طويلين: مدى 8 على الأقل.'),
        hint: say('$Q_3-Q_1=2$, baina txikiena eta handiena urrun.', '$Q_3-Q_1=2$, pero el mínimo y el máximo lejos.', '$Q_3-Q_1=2$، لكن الأصغر والأكبر بعيدان.'),
        isSolved: (state) => {
            const summary = fiveNumbers(state.values)
            return summary.q3 - summary.q1 === 2 && summary.max - summary.min >= 8
        }
    },
    {
        id: 26503,
        prompt: say('Egin batez bestekoa eta mediana 5 izatea, ibiltartea 8 dela.', 'Haz que la media y la mediana sean 5, con recorrido 8.', 'اجعل المتوسط والوسيط 5، مع مدى 8.'),
        hint: say('Zazpi datuen batura 35; adibidez, 1 eta 9 muturretan, simetrikoki.', 'La suma de los siete datos, 35; por ejemplo, 1 y 9 en los extremos, de forma simétrica.', 'مجموع البيانات السبعة 35؛ مثلًا 1 و9 في الطرفين بشكل متماثل.'),
        isSolved: (state) => {
            const summary = fiveNumbers(state.values)
            return sum(state.values) === 35 && summary.median === 5 && summary.max - summary.min === 8
        }
    }
]

/* ---------- 6. Two dice: events on the sum ---------- */

export type DiceRule = 'equal' | 'atLeast' | 'atMost'

export interface DiceState {
    rule: DiceRule
    target: number
}

export const initialDiceState: DiceState = { rule: 'equal', target: 6 }

export function setDice(state: DiceState, patch: Partial<DiceState>): DiceState {
    return { rule: patch.rule ?? state.rule, target: clamp(patch.target ?? state.target, 2, 12) }
}

export const diceCell = (rule: DiceRule, target: number, a: number, b: number) =>
    rule === 'equal' ? a + b === target : rule === 'atLeast' ? a + b >= target : a + b <= target

/** Favourable cells of the 36 */
export function diceFavourable(state: DiceState): number {
    let count = 0
    for (let a = 1; a <= 6; a += 1) for (let b = 1; b <= 6; b += 1) if (diceCell(state.rule, state.target, a, b)) count += 1
    return count
}

export const diceProbability = (state: DiceState) => fraction(diceFavourable(state), 36)

export const diceChallenges: LabChallenge<DiceState>[] = [
    {
        id: 26601,
        prompt: say('Aurkitu batura probableena: «batura = …» gertaerarik onena.', 'Encuentra la suma más probable: el mejor suceso «suma = …».', 'أوجد المجموع الأكثر احتمالًا: أفضل حدث «المجموع = …».'),
        hint: say('Begiratu diagonalak: zein da luzeena?', 'Mira las diagonales: ¿cuál es la más larga?', 'انظر إلى الأقطار: أيها الأطول؟'),
        isSolved: (state) => state.rule === 'equal' && state.target === 7
    },
    {
        id: 26602,
        prompt: say('Aurkitu $\\frac{1}{12}$ probabilitateko gertaera bat.', 'Encuentra un suceso de probabilidad $\\frac{1}{12}$.', 'أوجد حدثًا احتماله $\\frac{1}{12}$.'),
        hint: say('$\\frac{1}{12}=\\frac{3}{36}$: hiru gelaxka.', '$\\frac{1}{12}=\\frac{3}{36}$: tres casillas.', '$\\frac{1}{12}=\\frac{3}{36}$: ثلاث خانات.'),
        isSolved: (state) => diceFavourable(state) === 3
    },
    {
        id: 26603,
        prompt: say('Aurkitu «batura ≥ …» gertaera bat, haren aurkakoaren probabilitatea $\\frac{5}{6}$ izanik.', 'Encuentra un suceso «suma ≥ …» cuyo contrario tenga probabilidad $\\frac{5}{6}$.', 'أوجد حدثًا «المجموع ≥ …» احتمال معاكسه $\\frac{5}{6}$.'),
        hint: say('Gertaerak $\\frac{1}{6}=\\frac{6}{36}$ izan behar du: sei gelaxka goiko izkinan.', 'El suceso tiene que valer $\\frac{1}{6}=\\frac{6}{36}$: seis casillas en la esquina de arriba.', 'يجب أن يكون احتمال الحدث $\\frac{1}{6}=\\frac{6}{36}$: ست خانات في الزاوية.'),
        isSolved: (state) => state.rule === 'atLeast' && diceFavourable(state) === 6
    }
]

export const statisticsLabChallengeIds: number[] = [
    ...cumulativeChallenges,
    ...histogramChallenges,
    ...pieChallenges,
    ...centreChallenges,
    ...boxChallenges,
    ...diceChallenges
].map((challenge) => challenge.id)
