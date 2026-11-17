import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   J2 · Itxi tarifa (Cierra la tarifa): a tariff or a model in pieces with
   a parameter; the learner picks the value that leaves no jump. Level 1:
   the fixed charge k of the second bracket (p₁B = p₂B + k). Level 2: the
   price p of the second bracket (p₁B = pB + c). Level 3: three brackets
   and two charges; the question asks for one of them. The wrong options
   are the typical slips: the difference of prices without the edge, the
   amount at the edge itself, the other side's value, a sign.
   ========================================================================== */

export const CLOSE_ROUNDS = 6

export interface CloseRound {
    story: LocalizedText
    /** The tariff as a piecewise function */
    latex: string
    /** The letter asked for */
    letter: string
    answer: number
    options: number[]
    /** The equation at the edge, as LaTeX */
    equation: string
}

const tex = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')
const times = (price: number) => (price === 1 ? 'x' : `${tex(price)}x`)

type Service = 'water' | 'power' | 'parking' | 'phone'

const STORIES: Record<Service, LocalizedText> = {
    water: say('Ur-tarifa bat, eurotan, $x$ metro kubikoen arabera:', 'Una tarifa de agua, en euros, según los $x$ metros cúbicos:', 'تعريفة ماء باليورو حسب $x$ متر مكعب:', 'A water tariff, in euros, by $x$ cubic metres:'),
    power: say('Argi-tarifa bat, eurotan, $x$ kWh-en arabera:', 'Una tarifa de luz, en euros, según los $x$ kWh:', 'تعريفة كهرباء باليورو حسب $x$ كيلوواط ساعة:', 'An electricity tariff, in euros, by $x$ kWh:'),
    parking: say('Aparkaleku bat, eurotan, $x$ orduen arabera:', 'Un aparcamiento, en euros, según las $x$ horas:', 'موقف سيارات باليورو حسب $x$ ساعة:', 'A car park, in euros, by $x$ hours:'),
    phone: say('Telefono-tarifa bat, eurotan, $x$ gigaren arabera:', 'Una tarifa de móvil, en euros, según los $x$ gigas:', 'تعريفة هاتف باليورو حسب $x$ غيغا:', 'A phone tariff, in euros, by $x$ gigabytes:')
}

const SETUPS: Record<Service, { prices: Array<[number, number]>; edges: number[] }> = {
    water: { prices: [[2, 1.5], [3, 2], [2.5, 2]], edges: [10, 20, 30] },
    power: { prices: [[0.2, 0.15], [0.3, 0.2], [0.25, 0.2]], edges: [100, 200, 300] },
    parking: { prices: [[3, 2], [4, 3], [2, 1]], edges: [2, 3, 4] },
    phone: { prices: [[5, 2], [4, 1], [6, 3]], edges: [5, 10, 20] }
}

const round2 = (value: number) => Math.round(value * 100) / 100

/** The right value first, then three different wrong ones, shuffled */
function choices(random: Random, answer: number, wrong: number[]): number[] | null {
    const values = [answer]
    for (const value of [...wrong, answer + 1, answer - 1, answer * 2]) {
        const v = round2(value)
        if (values.length < 4 && !values.some((other) => Math.abs(other - v) < 1e-9)) values.push(v)
    }
    return values.length === 4 ? shuffle(random, values) : null
}

/** Level 1: the fixed charge k */
function chargeRound(random: Random): CloseRound | null {
    const service = pick(random, Object.keys(SETUPS) as Service[])
    const [p1, p2] = pick(random, SETUPS[service].prices)
    const edge = pick(random, SETUPS[service].edges)
    const k = round2((p1 - p2) * edge)
    const options = choices(random, k, [p1 - p2, p1 * edge, -k])
    if (!options) return null
    return {
        story: STORIES[service],
        latex: `f(x)=\\begin{cases}${times(p1)} & 0\\le x\\le ${edge}\\\\ ${times(p2)}+k & x>${edge}\\end{cases}`,
        letter: 'k',
        answer: k,
        options,
        equation: `${tex(p1)}\\cdot ${edge}=${tex(p2)}\\cdot ${edge}+k\\ \\to\\ k=${tex(k)}`
    }
}

/** Level 2: the price p of the second bracket */
function priceRound(random: Random): CloseRound | null {
    const service = pick(random, Object.keys(SETUPS) as Service[])
    const [p1, p2] = pick(random, SETUPS[service].prices)
    const edge = pick(random, SETUPS[service].edges)
    const c = round2((p1 - p2) * edge)
    if (c <= 0) return null
    const options = choices(random, p2, [p1, round2(p1 * edge), round2((p1 * edge + c) / edge)])
    if (!options) return null
    return {
        story: STORIES[service],
        latex: `f(x)=\\begin{cases}${times(p1)} & 0\\le x\\le ${edge}\\\\ px+${tex(c)} & x>${edge}\\end{cases}`,
        letter: 'p',
        answer: p2,
        options,
        equation: `${tex(p1)}\\cdot ${edge}=${edge}p+${tex(c)}\\ \\to\\ p=${tex(p2)}`
    }
}

/** Level 3: three brackets, two charges; ask for the second one (it needs the first) */
function twoRound(random: Random): CloseRound | null {
    const service = pick(random, ['water', 'parking', 'phone'] as Service[])
    const edges = SETUPS[service].edges
    const [b1, b2] = [edges[0], edges[randomInt(random, 1, 2)]]
    const p1 = randomInt(random, 3, 6)
    const p2 = p1 - 1
    const p3 = p2 - 1
    const k1 = (p1 - p2) * b1
    const k2 = p2 * b2 + k1 - p3 * b2
    const options = choices(random, k2, [(p2 - p3) * b2, k1, p2 * b2 + k1])
    if (!options) return null
    return {
        story: STORIES[service],
        latex: `f(x)=\\begin{cases}${times(p1)} & 0\\le x\\le ${b1}\\\\ ${times(p2)}+a & ${b1}<x\\le ${b2}\\\\ ${times(p3)}+b & x>${b2}\\end{cases}`,
        letter: 'b',
        answer: k2,
        options,
        equation: `a=${k1}\\qquad ${p2}\\cdot ${b2}+${k1}=${p3}\\cdot ${b2}+b\\ \\to\\ b=${k2}`
    }
}

/** Six rounds of a level, no tariff twice */
export function createCloseRounds(random: Random, levelIndex: number): CloseRound[] {
    const generator = [chargeRound, priceRound, twoRound][levelIndex] ?? chargeRound
    const rounds: CloseRound[] = []
    for (let tries = 0; rounds.length < CLOSE_ROUNDS && tries < 2000; tries += 1) {
        const round = generator(random)
        if (round && !rounds.some((other) => other.latex === round.latex)) rounds.push(round)
    }
    if (rounds.length < CLOSE_ROUNDS) throw new Error('No tariff rounds')
    return rounds
}

/** The two sides at every edge, for the tests: the tariff with the answer has no jump */
export function tariffSidesAt(round: CloseRound): Array<[number, number]> {
    const value = (piece: string, x: number, letters: Record<string, number>) => {
        const match = piece.match(/^(?:([\d{},]+)?x)(?:\+([\d{},]+|[a-z]))?$/)
        if (!match) throw new Error(piece)
        const price = match[1] ? Number(match[1].replace('{,}', '.')) : 1
        const extra = match[2] === undefined ? 0 : /[a-z]/.test(match[2]) ? letters[match[2]] : Number(match[2].replace('{,}', '.'))
        return price * x + extra
    }
    const rows = round.latex.replace(/^f\(x\)=\\begin\{cases\}|\\end\{cases\}$/g, '').split('\\\\').map((row) => row.trim().split(' & '))
    const edges = rows.slice(0, -1).map((row) => Number(row[1].match(/\\le (\d+)$/)![1]))
    const letters: Record<string, number> = { [round.letter]: round.answer }
    // The first charge of level 3 comes from the first edge
    if (round.letter === 'b') letters.a = Number(round.equation.match(/^a=(\d+)/)![1])
    if (round.letter === 'p') {
        return edges.map((edge, index) => [value(rows[index][0], edge, letters), Number(round.answer) * edge + Number(rows[index + 1][0].replace(/^px\+/, '').replace('{,}', '.'))])
    }
    return edges.map((edge, index) => [value(rows[index][0], edge, letters), value(rows[index + 1][0], edge, letters)])
}
