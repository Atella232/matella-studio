import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Zenbat sartzen dira? (¿Cuántos caben?): a histogram in intervals and
   two cuts that the learner drags along the axis. The data between the
   cuts are counted with the intervals at the ends split in proportion
   (the data spread evenly inside each interval), and the part that counts
   is drawn in green. Two tables: the lengths of 500 parts of a factory and
   the waiting minutes of 50 patients (x̄ = 20, σ = 7). Before the count,
   the learner predicts whether less than, exactly or more than half of the
   data lie between the cuts; ▶ opens the cuts from the centre to the ends.
   Pure logic.
   ========================================================================== */

export interface BetweenBar {
    from: number
    to: number
    count: number
}

export interface BetweenTable {
    name: LocalizedText
    bars: BetweenBar[]
    /** x̄ and σ when they are whole numbers worth showing */
    mean?: number
    sd?: number
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const BETWEEN_TABLES: BetweenTable[] = [
    {
        name: say('500 piezaren luzera (mm)', 'Longitud de 500 piezas (mm)', 'طول 500 قطعة (مم)', 'Length of 500 parts (mm)'),
        bars: [{ from: 40, to: 44, count: 20 }, { from: 44, to: 48, count: 150 }, { from: 48, to: 52, count: 260 }, { from: 52, to: 56, count: 60 }, { from: 56, to: 60, count: 10 }]
    },
    {
        name: say('50 pazienteren itxaronaldia (min)', 'Espera de 50 pacientes (min)', 'انتظار 50 مريضًا (دقيقة)', 'Wait of 50 patients (min)'),
        bars: [{ from: 0, to: 10, count: 3 }, { from: 10, to: 20, count: 22 }, { from: 20, to: 30, count: 22 }, { from: 30, to: 40, count: 3 }],
        mean: 20,
        sd: 7
    }
]

export interface BetweenState {
    table: number
    low: number
    high: number
    prediction: Prediction | null
}

export const initialBetweenState: BetweenState = { table: 0, low: 44, high: 56, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export const betweenTable = (state: Pick<BetweenState, 'table'>) => BETWEEN_TABLES[state.table]
export const tableLow = (table: BetweenTable) => table.bars[0].from
export const tableHigh = (table: BetweenTable) => table.bars.at(-1)!.to
export const tableTotal = (table: BetweenTable) => table.bars.reduce((sum, bar) => sum + bar.count, 0)

/** The part of each interval between the cuts, in data (the data spread evenly inside each interval) */
export function pieces(table: BetweenTable, low: number, high: number) {
    return table.bars.map((bar) => {
        const from = Math.max(bar.from, low)
        const to = Math.min(bar.to, high)
        return { bar, from, to, count: to > from ? (bar.count * (to - from)) / (bar.to - bar.from) : 0 }
    })
}

export const insideCount = (table: BetweenTable, low: number, high: number) => pieces(table, low, high).reduce((sum, piece) => sum + piece.count, 0)

export function setBetween(state: BetweenState, change: Partial<Omit<BetweenState, 'prediction'>>): BetweenState {
    const tableIndex = clamp(Math.round(change.table ?? state.table), 0, BETWEEN_TABLES.length - 1)
    const table = BETWEEN_TABLES[tableIndex]
    const tableChanged = tableIndex !== state.table
    const min = tableLow(table)
    const max = tableHigh(table)
    let low = clamp(Math.round(change.low ?? (tableChanged ? min + (max - min) / 4 : state.low)), min, max - 1)
    let high = clamp(Math.round(change.high ?? (tableChanged ? max - (max - min) / 4 : state.high)), min + 1, max)
    // The cuts never cross: the one that moves pushes the other
    if (high <= low) {
        if (change.low !== undefined) high = low + 1
        else low = high - 1
    }
    const next: BetweenState = { table: tableIndex, low, high, prediction: null }
    return next.table === state.table && next.low === state.low && next.high === state.high ? state : next
}

/** Less than (<), exactly (=) or more than (>) half of the data between the cuts */
export function betweenPrediction(state: BetweenState): Prediction {
    const table = betweenTable(state)
    return compareTo(insideCount(table, state.low, state.high), tableTotal(table) / 2)
}

/* ---------- Challenges ---------- */

const near = (a: number, b: number) => Math.abs(a - b) < 1e-9

export const betweenChallenges: LabChallenge<BetweenState>[] = [
    {
        id: 137201,
        prompt: say('Piezetan, utzi kanpoan piezen % 27 zehazki: 135 pieza akastun.', 'En las piezas, deja fuera exactamente el 27 % de las piezas: 135 defectuosas.', 'في القطع اترك خارجًا 27٪ من القطع تمامًا: 135 قطعة معيبة.', 'In the parts, leave out exactly 27% of the parts: 135 faulty ones.'),
        hint: say('Barruan 365 pieza geratu behar dira. Saiatu 46 inguruan eta 54 inguruan.', 'Dentro tienen que quedar 365 piezas. Prueba cerca de 46 y de 54.', 'يجب أن تبقى 365 قطعة في الداخل. جرّب قرب 46 و54.', '365 parts have to stay inside. Try near 46 and 54.'),
        isSolved: (state) => state.table === 0 && near(insideCount(BETWEEN_TABLES[0], state.low, state.high), 365)
    },
    {
        id: 137202,
        prompt: say('Pazienteetan, jarri ebakiak $\\bar{x}-\\sigma$ eta $\\bar{x}+\\sigma$ balioetan.', 'En los pacientes, pon los cortes en $\\bar{x}-\\sigma$ y $\\bar{x}+\\sigma$.', 'في المرضى ضع القطعين عند $\\bar{x}-\\sigma$ و$\\bar{x}+\\sigma$.', 'In the patients, put the cuts at $\\bar{x}-\\sigma$ and $\\bar{x}+\\sigma$.'),
        hint: say('$\\bar{x}=20$ eta $\\sigma=7$ dira.', 'Aquí $\\bar{x}=20$ y $\\sigma=7$.', 'هنا $\\bar{x}=20$ و$\\sigma=7$.', 'Here $\\bar{x}=20$ and $\\sigma=7$.'),
        isSolved: (state) => state.table === 1 && state.low === 13 && state.high === 27
    },
    {
        id: 137203,
        prompt: say('Pazienteetan, utzi barruan 22 paziente zehazki, eta batez bestekoa erdian.', 'En los pacientes, deja dentro exactamente 22 pacientes, con la media en el centro.', 'في المرضى اترك في الداخل 22 مريضًا تمامًا، والمتوسط في الوسط.', 'In the patients, leave exactly 22 patients inside, with the mean in the middle.'),
        hint: say('Alde bakoitzean 22 paziente daude 10 minutuko; erdia 20 da.', 'En cada lado hay 22 pacientes por cada 10 minutos; el centro es 20.', 'في كل جانب 22 مريضًا لكل 10 دقائق؛ والوسط 20.', 'On each side there are 22 patients per 10 minutes; the centre is 20.'),
        isSolved: (state) => state.table === 1 && state.low + state.high === 40 && near(insideCount(BETWEEN_TABLES[1], state.low, state.high), 22)
    }
]

/** Endless practice: leave exactly N data inside, N worked out from a pair of cuts */
const betweenMaker: LabChallengeMaker<BetweenState> = (random) => {
    const tableIndex = pick(random, [0, 1])
    const table = BETWEEN_TABLES[tableIndex]
    const pairs: Array<[number, number]> = []
    for (let low = tableLow(table); low < tableHigh(table); low += 1) {
        for (let high = low + 2; high <= tableHigh(table); high += 1) {
            const inside = insideCount(table, low, high)
            // A short decimal, and not the same count as the tool's first state
            if (near(Math.round(inside * 10) / 10, inside) && !(tableIndex === initialBetweenState.table && near(inside, insideCount(table, initialBetweenState.low, initialBetweenState.high)))) pairs.push([low, high])
        }
    }
    const [low, high] = pick(random, pairs)
    const inside = Math.round(insideCount(table, low, high) * 10) / 10
    const text = String(inside).replace('.', '{,}')
    return {
        prompt: say(`${table.name.eu}: utzi barruan $${text}$ datu zehazki.`, `${table.name.es}: deja dentro exactamente $${text}$ datos.`, `${table.name.ar}: اترك في الداخل $${text}$ بيانًا تمامًا.`, `${table.name.en}: leave exactly $${text}$ data inside.`),
        hint: say('Tarte osoak batu, eta muturretakoen zatia bakarrik.', 'Suma los intervalos enteros y, de los de los extremos, solo su parte.', 'اجمع الفئات الكاملة ومن فئتي الطرفين جزءهما فقط.', 'Add the whole intervals and, from those at the ends, only their part.'),
        isSolved: (state) => state.table === tableIndex && near(insideCount(table, state.low, state.high), inside),
        solution: setBetween(setBetween(initialBetweenState, { table: tableIndex }), { low, high })
    }
}

export const betweenExtra = freshFrom(initialBetweenState, betweenMaker)
