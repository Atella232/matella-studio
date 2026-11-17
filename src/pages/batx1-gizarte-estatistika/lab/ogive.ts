import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Ehuneko metatuen poligonoa (El polígono acumulado): three tables in
   intervals (ages of customers, minutes to get to work, weekly spending)
   drawn as their cumulative percentage polygon. In «percentile» mode the
   learner moves a horizontal line to k % and reads P_k where it meets the
   polygon; in «value» mode a vertical line to a value x and reads its
   percentile. The similar triangles of the interpolation are drawn in the
   interval where the line falls. Before the result, the learner predicts:
   is P_k before, on or after the class mark of its interval? (the class
   mark is what 1.º Ciencias gives); is the percentile of x below, at or
   above 50? Pure logic.
   ========================================================================== */

export interface OgiveBar {
    from: number
    to: number
    /** Percentage of the data in the interval, h_i */
    percent: number
}

export interface OgiveTable {
    name: LocalizedText
    bars: OgiveBar[]
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const OGIVE_TABLES: OgiveTable[] = [
    {
        name: say('Bezeroen adina', 'Edad de los clientes', 'عمر الزبائن', 'Age of the customers'),
        bars: [{ from: 20, to: 30, percent: 10 }, { from: 30, to: 40, percent: 30 }, { from: 40, to: 50, percent: 40 }, { from: 50, to: 60, percent: 20 }]
    },
    {
        name: say('Lanera joateko minutuak', 'Minutos para ir al trabajo', 'دقائق الذهاب إلى العمل', 'Minutes to get to work'),
        bars: [{ from: 0, to: 10, percent: 20 }, { from: 10, to: 20, percent: 50 }, { from: 20, to: 30, percent: 25 }, { from: 30, to: 40, percent: 5 }]
    },
    {
        name: say('Asteko gastua, eurotan', 'Gasto semanal en euros', 'الإنفاق الأسبوعي باليورو', 'Weekly spending in euros'),
        bars: [{ from: 100, to: 120, percent: 15 }, { from: 120, to: 140, percent: 25 }, { from: 140, to: 160, percent: 40 }, { from: 160, to: 180, percent: 20 }]
    }
]

export type OgiveMode = 'percentile' | 'value'

export interface OgiveState {
    table: number
    mode: OgiveMode
    /** The percentage k of «percentile» mode, a whole number from 1 to 99 */
    k: number
    /** The value x of «value» mode, on a grid of a tenth of the width */
    x: number
    prediction: Prediction | null
}

export const initialOgiveState: OgiveState = { table: 0, mode: 'percentile', k: 50, x: 45, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export const tableOf = (state: Pick<OgiveState, 'table'>) => OGIVE_TABLES[state.table]
export const lowOf = (table: OgiveTable) => table.bars[0].from
export const highOf = (table: OgiveTable) => table.bars.at(-1)!.to
/** The step of x: a tenth of the width of the intervals */
export const stepOf = (table: OgiveTable) => (table.bars[0].to - table.bars[0].from) / 10

/** The points of the polygon: (upper end, cumulative percentage), from (lower end, 0) */
export function polygonOf(table: OgiveTable): Array<[number, number]> {
    let running = 0
    return [[lowOf(table), 0], ...table.bars.map((bar): [number, number] => [bar.to, (running += bar.percent)])]
}

/** Where the line meets the polygon: the interval, the cumulative percentage before it */
function intervalOfPercent(table: OgiveTable, k: number) {
    let before = 0
    for (const [index, bar] of table.bars.entries()) {
        if (k <= before + bar.percent || index === table.bars.length - 1) return { index, bar, before }
        before += bar.percent
    }
    throw new Error('unreachable')
}

function intervalOfValue(table: OgiveTable, x: number) {
    let before = 0
    for (const [index, bar] of table.bars.entries()) {
        if (x <= bar.to || index === table.bars.length - 1) return { index, bar, before }
        before += bar.percent
    }
    throw new Error('unreachable')
}

/** P_k = L_i + (k − H_{i−1}) / h_i · a_i */
export function percentileOf(table: OgiveTable, k: number) {
    const { index, bar, before } = intervalOfPercent(table, k)
    return { index, bar, before, value: bar.from + ((k - before) / bar.percent) * (bar.to - bar.from) }
}

/** k = H_{i−1} + (x − L_i) / a_i · h_i */
export function percentOfValue(table: OgiveTable, x: number) {
    const { index, bar, before } = intervalOfValue(table, x)
    return { index, bar, before, value: before + ((x - bar.from) / (bar.to - bar.from)) * bar.percent }
}

const near = (a: number, b: number) => Math.abs(a - b) < 1e-9

export function setOgive(state: OgiveState, change: Partial<Omit<OgiveState, 'prediction'>>): OgiveState {
    const tableIndex = clamp(Math.round(change.table ?? state.table), 0, OGIVE_TABLES.length - 1)
    const table = OGIVE_TABLES[tableIndex]
    const step = stepOf(table)
    const tableChanged = tableIndex !== state.table
    const rawX = change.x ?? (tableChanged ? lowOf(table) + (highOf(table) - lowOf(table)) / 2 : state.x)
    const next: OgiveState = {
        table: tableIndex,
        mode: change.mode ?? state.mode,
        k: clamp(Math.round(change.k ?? state.k), 1, 99),
        x: clamp(Math.round((rawX - lowOf(table)) / step) * step + lowOf(table), lowOf(table) + step, highOf(table) - step),
        prediction: null
    }
    const same = next.table === state.table && next.mode === state.mode && next.k === state.k && near(next.x, state.x)
    return same ? state : next
}

/**
 * The prediction: in «percentile» mode, P_k before (<), on (=) or after (>) the class mark of its interval;
 * in «value» mode, the percentile of x below (<), at (=) or above (>) 50
 */
export function ogivePrediction(state: OgiveState): Prediction {
    const table = tableOf(state)
    if (state.mode === 'value') return compareTo(percentOfValue(table, state.x).value, 50)
    const found = percentileOf(table, state.k)
    return compareTo(found.value, (found.bar.from + found.bar.to) / 2)
}

/* ---------- Challenges ---------- */

const isPercentile = (state: OgiveState, table: number, value: number) => state.table === table && state.mode === 'percentile' && near(percentileOf(OGIVE_TABLES[table], state.k).value, value)
const isValue = (state: OgiveState, table: number, k: number) => state.table === table && state.mode === 'value' && near(percentOfValue(OGIVE_TABLES[table], state.x).value, k)

export const ogiveChallenges: LabChallenge<OgiveState>[] = [
    {
        id: 137101,
        prompt: say('Bezeroen adinetan, bilatu zein pertzentil den 45 urte: eraman marra horizontala $P_k=45$ izan arte.', 'En las edades de los clientes, busca qué percentil son 45 años: lleva la raya horizontal hasta que $P_k=45$.', 'في أعمار الزبائن ابحث أي مئين هو 45 سنة: حرّك الخط الأفقي حتى يصبح $P_k=45$.', 'In the ages of the customers, find which percentile 45 is: move the horizontal line until $P_k=45$.'),
        hint: say('45 urte $[40,50)$ tartearen erdian daude: % 40 eta % 80 artean, erdian.', 'Los 45 años están en la mitad de $[40,50)$: a mitad de camino entre el 40 % y el 80 %.', 'تقع 45 سنة في منتصف $[40,50)$: في منتصف المسافة بين 40٪ و80٪.', '45 is halfway along $[40,50)$: halfway between 40% and 80%.'),
        isSolved: (state) => isPercentile(state, 0, 45)
    },
    {
        id: 137102,
        prompt: say('Lanera joateko minutuetan, «Balioa» moduan: jarri 90. pertzentileko balioa, haren azpian % 90 gera dadin.', 'En los minutos para ir al trabajo, en modo «Valor»: pon el valor que deja por debajo el 90 %.', 'في دقائق الذهاب إلى العمل، في وضع «القيمة»: ضع القيمة التي تترك تحتها 90٪.', 'In the minutes to get to work, in «Value» mode: put the value that leaves 90% below it.'),
        hint: say('% 90 ehunekoa $[20,30)$ tartean dago, % 70 eta % 95 artean.', 'El 90 % está en $[20,30)$, entre el 70 % y el 95 %.', 'تقع 90٪ في $[20,30)$ بين 70٪ و95٪.', 'The 90% is in $[20,30)$, between 70% and 95%.'),
        isSolved: (state) => isValue(state, 1, 90)
    },
    {
        id: 137103,
        prompt: say('Asteko gastuan, bilatu $P_k$ bat zehazki bere tartearen klase-markan erortzen dena.', 'En el gasto semanal, busca un $P_k$ que caiga justo en la marca de clase de su intervalo.', 'في الإنفاق الأسبوعي ابحث عن $P_k$ يقع تمامًا عند مركز فئته.', 'In the weekly spending, find a $P_k$ that falls exactly on the class mark of its interval.'),
        hint: say('Klase-marka tartearen erdia da: tartearen ehunekoaren erdia igo behar da.', 'La marca es la mitad del intervalo: hay que subir la mitad del porcentaje del intervalo.', 'المركز منتصف الفئة: يجب الصعود نصف نسبة الفئة.', 'The class mark is the middle of the interval: you have to rise half the percentage of the interval.'),
        isSolved: (state) => state.table === 2 && state.mode === 'percentile' && ogivePrediction(state) === '='
    }
]

/** Endless practice: find the percentile of a value, or the value of a percentile, with an exact answer */
const ogiveMaker: LabChallengeMaker<OgiveState> = (random) => {
    const tableIndex = pick(random, [0, 1, 2])
    const table = OGIVE_TABLES[tableIndex]
    const step = stepOf(table)
    if (pick(random, ['percentile', 'value'] as const) === 'percentile') {
        // A whole k whose P_k lands on the grid of x, so the answer is a short decimal
        const options = Array.from({ length: 99 }, (_, index) => index + 1).filter((k) => {
            const value = percentileOf(table, k).value
            return k !== 50 && near(Math.round(value / step) * step, value) && value > lowOf(table) && value < highOf(table)
        })
        const k = pick(random, options)
        const value = percentileOf(table, k).value
        const text = String(Math.round(value * 100) / 100).replace('.', '{,}')
        return {
            prompt: say(`${table.name.eu}: eraman marra $P_k=${text}$ izan arte.`, `${table.name.es}: lleva la raya hasta que $P_k=${text}$.`, `${table.name.ar}: حرّك الخط حتى يصبح $P_k=${text}$.`, `${table.name.en}: move the line until $P_k=${text}$.`),
            hint: say('Aurkitu balioa zein tartetan dagoen, eta zer zati igotzen den poligonoa tarte horretan.', 'Busca en qué intervalo está el valor y qué parte sube el polígono en ese tramo.', 'ابحث في أي فئة تقع القيمة وكم يصعد المضلّع في ذلك الجزء.', 'Find which interval the value is in and how much the polygon rises over that stretch.'),
            isSolved: (state) => isPercentile(state, tableIndex, value),
            solution: setOgive(initialOgiveState, { table: tableIndex, mode: 'percentile', k })
        }
    }
    // A value on the grid whose percentile is a whole number
    const values: number[] = []
    for (let x = lowOf(table) + step; x < highOf(table) - 1e-9; x += step) {
        const value = Math.round(x * 100) / 100
        if (near(Math.round(percentOfValue(table, value).value), percentOfValue(table, value).value)) values.push(value)
    }
    const x = pick(random, values)
    const k = Math.round(percentOfValue(table, x).value)
    return {
        prompt: say(`${table.name.eu}, «Balioa» moduan: jarri azpian % ${k} uzten duen balioa.`, `${table.name.es}, en modo «Valor»: pon el valor que deja por debajo el ${k} %.`, `${table.name.ar}، في وضع «القيمة»: ضع القيمة التي تترك تحتها ${k}٪.`, `${table.name.en}, in «Value» mode: put the value that leaves ${k}% below it.`),
        hint: say(`Bilatu % ${k} ehunekoa zein tartetan sartzen den.`, `Busca en qué intervalo entra el ${k} %.`, `ابحث في أي فئة تقع ${k}٪.`, `Find which interval the ${k}% falls in.`),
        isSolved: (state) => isValue(state, tableIndex, k),
        solution: setOgive(setOgive(initialOgiveState, { table: tableIndex, mode: 'value' }), { x })
    }
}

export const ogiveExtra = freshFrom(initialOgiveState, ogiveMaker)
