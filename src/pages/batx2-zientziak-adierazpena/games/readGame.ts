import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   J2 · Irakurri deribatua (Lee la derivada): the graph of f′ — not of f —
   and a question about f with three answers. Level 1: where f has its
   maximum or its minimum (f′ is a line or a parabola); level 2: where f
   increases and where it has its inflection; level 3: how many extrema
   f has (f′ may touch the axis without crossing it), mixed with the rest.
   The wrong answers are the typical misreadings: the other root, the
   vertex of f′, the interval where f′ increases.
   ========================================================================== */

export const READ_ROUNDS = 8

export type ReadQuestion = 'max' | 'min' | 'inflection' | 'increase' | 'count'

export interface ReadRound {
    /** f′, as drawn */
    fp: (x: number) => number
    question: ReadQuestion
    options: string[]
    correct: number
    explain: LocalizedText
    /** The numbers the tests check the round against */
    meta: { a: number; b: number; s: number }
}

export const READ_PROMPTS: Record<ReadQuestion, LocalizedText> = {
    max: say('Zein $x$ baliotan du $f$ funtzioak maximo bat?', '¿En qué $x$ tiene $f$ un máximo?', 'عند أي $x$ تكون لـ $f$ قيمة عظمى؟', 'At which $x$ does $f$ have a maximum?'),
    min: say('Zein $x$ baliotan du $f$ funtzioak minimo bat?', '¿En qué $x$ tiene $f$ un mínimo?', 'عند أي $x$ تكون لـ $f$ قيمة صغرى؟', 'At which $x$ does $f$ have a minimum?'),
    inflection: say('Zein $x$ baliotan du $f$ funtzioak inflexio-puntu bat?', '¿En qué $x$ tiene $f$ un punto de inflexión?', 'عند أي $x$ تكون لـ $f$ نقطة انعطاف؟', 'At which $x$ does $f$ have a point of inflection?'),
    increase: say('Non da $f$ gorakorra?', '¿Dónde crece $f$?', 'أين تتزايد $f$؟', 'Where does $f$ increase?'),
    count: say('Zenbat mutur erlatibo ditu $f$ funtzioak?', '¿Cuántos extremos relativos tiene $f$?', 'كم قيمة قصوى محلية للدالة $f$؟', 'How many local extrema does $f$ have?')
}

const at = (x: number) => `x=${x}`
const fromPlusToMinus = (x: number) => say(`$x=${x}$ puntuan $f'$ deribatua $+$ zeinutik $-$ zeinura pasatzen da: maximoa.`, `En $x=${x}$, $f'$ pasa de $+$ a $-$: máximo.`, `عند $x=${x}$ تنتقل $f'$ من $+$ إلى $-$: قيمة عظمى.`, `At $x=${x}$, $f'$ goes from $+$ to $-$: a maximum.`)
const fromMinusToPlus = (x: number) => say(`$x=${x}$ puntuan $f'$ deribatua $-$ zeinutik $+$ zeinura pasatzen da: minimoa.`, `En $x=${x}$, $f'$ pasa de $-$ a $+$: mínimo.`, `عند $x=${x}$ تنتقل $f'$ من $-$ إلى $+$: قيمة صغرى.`, `At $x=${x}$, $f'$ goes from $-$ to $+$: a minimum.`)

/** A line through (a, 0): s = 1 rises, s = −1 falls */
function lineRound(random: Random, question: 'max' | 'min'): ReadRound | null {
    const a = pick(random, [-3, -2, -1, 1, 2, 3])
    const s = question === 'min' ? 1 : -1
    const options = shuffle(random, [at(a), at(-a), at(0)])
    return { fp: (x) => s * (x - a), question, options, correct: options.indexOf(at(a)), explain: s > 0 ? fromMinusToPlus(a) : fromPlusToMinus(a), meta: { a, b: a, s } }
}

/** A parabola through (a, 0) and (b, 0), a < b, with its vertex at a whole number */
function parabola(random: Random) {
    const a = randomInt(random, -4, 2)
    const b = a + pick(random, [2, 4])
    if (b > 4) return null
    const s = pick(random, [1, -1])
    return { a, b, s, v: (a + b) / 2, fp: (x: number) => (s * (x - a) * (x - b) * 4) / ((b - a) * (b - a)) }
}

function extremumRound(random: Random, question: 'max' | 'min'): ReadRound | null {
    const p = parabola(random)
    if (!p) return null
    const { a, b, s, v } = p
    // s = 1: + − +, a maximum at a and a minimum at b; s = −1 the other way round
    const right = (question === 'max') === (s > 0) ? a : b
    const other = right === a ? b : a
    const options = shuffle(random, [at(right), at(other), at(v)])
    return { fp: p.fp, question, options, correct: options.indexOf(at(right)), explain: question === 'max' ? fromPlusToMinus(right) : fromMinusToPlus(right), meta: { a, b, s } }
}

function inflectionRound(random: Random): ReadRound | null {
    const p = parabola(random)
    if (!p) return null
    const { a, b, s, v } = p
    const options = shuffle(random, [at(v), at(a), at(b)])
    return {
        fp: p.fp, question: 'inflection', options, correct: options.indexOf(at(v)), meta: { a, b, s },
        explain: say(`$f$ funtzioaren inflexioa $f'$ deribatuak mutur bat duen tokian dago, parabolaren erpinean: $x=${v}$.`, `La inflexión de $f$ está donde $f'$ tiene un extremo, en el vértice de la parábola: $x=${v}$.`, `انعطاف $f$ حيث تبلغ $f'$ قيمة قصوى، عند رأس القطع المكافئ: $x=${v}$.`, `The inflection of $f$ is where $f'$ has an extremum, at the vertex of the parabola: $x=${v}$.`)
    }
}

function increaseRound(random: Random): ReadRound | null {
    const p = parabola(random)
    if (!p) return null
    const { a, b, s, v } = p
    const outside = `(-\\infty,\\,${a})\\cup(${b},\\,+\\infty)`
    const inside = `(${a},\\,${b})`
    // The typical misreading: where f′ itself increases
    const misread = s > 0 ? `(${v},\\,+\\infty)` : `(-\\infty,\\,${v})`
    const right = s > 0 ? outside : inside
    const options = shuffle(random, [outside, inside, misread])
    const explain = s > 0
        ? say(`$f'>0$ da $${a}$ eta $${b}$ artetik kanpo: han $f$ gorakorra da.`, `$f'>0$ fuera de $${a}$ y $${b}$: ahí $f$ crece.`, `$f'>0$ خارج ما بين $${a}$ و$${b}$: هناك تتزايد $f$.`, `$f'>0$ outside $${a}$ and $${b}$: there $f$ increases.`)
        : say(`$f'>0$ da $${a}$ eta $${b}$ artean: han $f$ gorakorra da.`, `$f'>0$ entre $${a}$ y $${b}$: ahí $f$ crece.`, `$f'>0$ بين $${a}$ و$${b}$: هناك تتزايد $f$.`, `$f'>0$ between $${a}$ and $${b}$: there $f$ increases.`)
    return { fp: p.fp, question: 'increase', options, correct: options.indexOf(right), explain, meta: { a, b, s } }
}

/** How many extrema: f′ touching the axis does not count */
function countRound(random: Random): ReadRound | null {
    const a = randomInt(random, -3, 1)
    const b = a + pick(random, [2, 3])
    const kinds: Array<{ count: number; fp: (x: number) => number }> = [
        { count: 0, fp: (x) => ((x - a) ** 2) / 2 },
        { count: 0, fp: (x) => ((x - a) ** 2) / 2 + 1 },
        { count: 1, fp: (x) => ((x - a) ** 2 * (x - b)) / 4 },
        { count: 2, fp: (x) => (x - a) * (x - b) },
        { count: 3, fp: (x) => ((x - a) * (x - b) * (x - (b + 2))) / 3 }
    ]
    const chosen = pick(random, kinds)
    if (chosen.count === 3 && b + 2 > 4) return null
    const pool = ['0', '1', '2', '3'].filter((value) => value !== String(chosen.count))
    const options = shuffle(random, [String(chosen.count), ...shuffle(random, pool).slice(0, 2)])
    const n = chosen.count
    return {
        fp: chosen.fp, question: 'count', options, correct: options.indexOf(String(n)), meta: { a, b, s: n },
        explain: say(`$f'$ deribatuaren zeinu-aldaketak: ${n}. Hori da mutur kopurua; ardatza ukitu bai, baina zeharkatzen ez duen tokian ez dago muturrik.`, `Cambios de signo de $f'$: ${n}. Ese es el número de extremos; donde toca el eje sin cruzarlo no hay extremo.`, `عدد مرات تغيّر إشارة $f'$: ${n}. وهذا عدد القيم القصوى؛ وحيث تلمس المحور دون أن تقطعه لا توجد قيمة قصوى.`, `Sign changes of $f'$: ${n}. That is the number of extrema; where it touches the axis without crossing it there is no extremum.`)
    }
}

type Maker = (random: Random) => ReadRound | null

const LEVELS: Maker[][] = [
    [(random) => lineRound(random, 'max'), (random) => lineRound(random, 'min'), (random) => extremumRound(random, 'max'), (random) => extremumRound(random, 'min')],
    [increaseRound, inflectionRound, (random) => extremumRound(random, 'max')],
    [countRound, countRound, increaseRound, inflectionRound, (random) => extremumRound(random, 'min')]
]

/** Eight rounds of one level, no two alike */
export function createReadRounds(random: Random, levelIndex: number): ReadRound[] {
    const makers = LEVELS[levelIndex] ?? LEVELS[0]
    const rounds: ReadRound[] = []
    const keys = new Set<string>()
    for (let attempt = 0; attempt < 600 && rounds.length < READ_ROUNDS; attempt += 1) {
        const round = pick(random, makers)(random)
        if (!round) continue
        const key = `${round.question}:${round.options[round.correct]}:${round.fp(0.37).toFixed(4)}`
        if (keys.has(key)) continue
        keys.add(key)
        rounds.push(round)
    }
    if (rounds.length < READ_ROUNDS) throw new Error('No reading rounds')
    return rounds
}
