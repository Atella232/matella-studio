import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { statsAnswer, statsWork, type StatsCheckKind } from '../content.ts'

/* ==========================================================================
   Estatistikaren lasterketa (3. DBH): five circuits, one per stage —
   tables; charts; centre; spread; chance. Every question is one of the
   checks of ../content.ts, so its kind and data (`meta`) let the tests
   work the answer out again; its solution is the same worked line as in
   the exercises. Probabilities are answered as fractions.
   ========================================================================== */

export const STATS3_RACE_CIRCUITS = 5

export type Stats3RaceError = 'degrees-percent' | 'cumulative-own' | 'mean-unweighted' | 'median-unsorted' | 'mode-frequency' | 'odds' | 'replacement' | 'calculation'

export type Stats3RaceQuestion = RaceQuestion<Stats3RaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const num = (value: number) => String(Math.round(value * 10000) / 10000).replace('.', '{,}')
const show = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : Number.isInteger((value.numerator * 100) / value.denominator) && value.denominator <= 4 ? num(value.numerator / value.denominator) : `\\frac{${value.numerator}}{${value.denominator}}`)
const list = (data: number[]) => data.join(',\\ ')

interface Candidate {
    value: FractionValue
    error: Stats3RaceError
}
const wrong = (top: number, bottom: number, error: Stats3RaceError): Candidate | null => (bottom === 0 || !Number.isInteger(top) || !Number.isInteger(bottom) ? null : { value: fraction(top, bottom), error })

function options(random: Random, right: FractionValue, candidates: Array<Candidate | null>): RaceOption<Stats3RaceError>[] | null {
    const used = new Set([show(right)])
    const chosen: Candidate[] = []
    const extra = [wrong(right.numerator + right.denominator, right.denominator, 'calculation'), wrong(right.numerator * 2, right.denominator, 'calculation'), wrong(right.numerator + 2 * right.denominator, right.denominator, 'calculation')]
    for (const candidate of [...candidates, ...extra]) {
        if (chosen.length === 3) break
        if (!candidate || candidate.value.numerator < 0 || used.has(show(candidate.value))) continue
        used.add(show(candidate.value))
        chosen.push(candidate)
    }
    if (chosen.length < 3) return null
    return shuffle(random, [{ latex: show(right), correct: true, error: null }, ...chosen.map((item) => ({ latex: show(item.value), correct: false, error: item.error }))])
}

function build(random: Random, circuit: number, kind: StatsCheckKind, args: number[], prompt: LocalizedText, candidates: Array<Candidate | null>): Stats3RaceQuestion | null {
    const answer = statsAnswer({ kind, args })
    const choices = options(random, answer, candidates)
    if (!choices) return null
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution: same(statsWork({ kind, args })), meta: Object.fromEntries(args.map((value, index) => [`a${index}`, value])) }
}

/* ---------- Circuit 0: tables ---------- */

function relative(random: Random) {
    const total = pick(random, [10, 20, 25, 50])
    const count = randomInt(random, 1, total - 1)
    return build(random, 0, 'percent', [count, total], say(`${total} datutik ${count} «bai»: zenbat da ehunekoa?`, `${count} «sí» de ${total} datos: ¿qué porcentaje?`, `${count} «نعم» من ${total} بيانًا: ما النسبة المئوية؟`, `${count} «yes» out of ${total} data: what percentage?`), [wrong(count, total, 'calculation'), wrong(100 * count, total - count, 'calculation')])
}

function cumulative(random: Random) {
    const counts = Array.from({ length: 4 }, () => randomInt(random, 1, 9))
    const position = randomInt(random, 2, 4)
    return build(random, 0, 'cumulative', [position, ...counts], say(`$f_{i}=${counts.join(',')}$: $F_{${position}}$?`, `$f_{i}=${counts.join(',')}$: ¿$F_{${position}}$?`, `$f_{i}=${counts.join(',')}$: $F_{${position}}$؟`, `$f_{i}=${counts.join(',')}$: $F_{${position}}$?`), [wrong(counts[position - 1], 1, 'cumulative-own'), wrong(counts.reduce((sum, value) => sum + value, 0), 1, 'calculation')])
}

function mark(random: Random) {
    const low = randomInt(random, 1, 18) * 10
    const width = pick(random, [10, 20])
    return build(random, 0, 'class-mark', [low, low + width], say(`$[${low};\\ ${low + width})$: klase-marka?`, `$[${low};\\ ${low + width})$: ¿marca de clase?`, `$[${low};\\ ${low + width})$: مركز الفئة؟`, `$[${low};\\ ${low + width})$: class midpoint?`), [wrong(low + width, 1, 'calculation'), wrong(low, 1, 'calculation')])
}

/* ---------- Circuit 1: charts ---------- */

function degrees(random: Random) {
    const total = pick(random, [20, 30, 36, 40, 60])
    const count = randomInt(random, 1, total / 2)
    return build(random, 1, 'degrees', [count, total], say(`${total} datutik ${count}: sektorearen graduak?`, `${count} de ${total} datos: ¿grados del sector?`, `${count} من ${total} بيانًا: درجات القطاع؟`, `${count} out of ${total} data: degrees of the sector?`), [wrong(100 * count, total, 'degrees-percent'), wrong(count, 1, 'calculation')])
}

function change(random: Random) {
    const before = pick(random, [20, 40, 50, 80, 100, 200])
    const after = before + pick(random, [-1, 1]) * before * pick(random, [1, 2, 3]) / pick(random, [4, 5, 10])
    if (!Number.isInteger(after) || after <= 0) return null
    return build(random, 1, 'change-percent', [before, after], say(`${before} → ${after}: aldaketa %?`, `${before} → ${after}: ¿variación en %?`, `${before} ← ${after}: التغيّر %؟`, `${before} → ${after}: change in %?`), [wrong(after - before, 1, 'calculation'), wrong(-100 * (after - before), before, 'calculation')])
}

function share(random: Random) {
    const total = pick(random, [40, 50, 200])
    const count = randomInt(random, 1, total / 2)
    return build(random, 1, 'percent', [count, total], say(`Barra-diagraman: ${count} datu, guztira ${total}. Ehunekoa?`, `En un diagrama de barras: ${count} datos de ${total}. ¿Porcentaje?`, `في مخطط أعمدة: ${count} من ${total}. النسبة المئوية؟`, `In a bar chart: ${count} data out of ${total}. Percentage?`), [wrong(360 * count, total, 'calculation'), wrong(count, 1, 'calculation')])
}

/* ---------- Circuit 2: centre ---------- */

function mean(random: Random) {
    const data = Array.from({ length: pick(random, [4, 5]) }, () => randomInt(random, 1, 10))
    const total = data.reduce((sum, value) => sum + value, 0)
    if (total % data.length !== 0) return null
    return build(random, 2, 'mean', data, say(`$${list(data)}$: batez bestekoa?`, `$${list(data)}$: ¿media?`, `$${list(data)}$: المتوسط؟`, `$${list(data)}$: mean?`), [wrong(total, 1, 'calculation'), wrong(total, data.length + 1, 'calculation')])
}

function median(random: Random) {
    const data = Array.from({ length: 5 }, () => randomInt(random, 1, 20))
    const sorted = [...data].sort((a, b) => a - b)
    return build(random, 2, 'median', data, say(`$${list(data)}$: mediana?`, `$${list(data)}$: ¿mediana?`, `$${list(data)}$: الوسيط؟`, `$${list(data)}$: median?`), [wrong(data[2], 1, 'median-unsorted'), wrong(sorted[1], 1, 'calculation')])
}

function mode(random: Random) {
    const values = [1, 2, 3, 4]
    const counts = shuffle(random, [2, 4, 6, 9])
    const pairs = values.flatMap((value, index) => [value, counts[index]])
    return build(random, 2, 'table-mode', pairs, say(`$x_{i}=1,2,3,4$, $f_{i}=${counts.join(',')}$: moda?`, `$x_{i}=1,2,3,4$, $f_{i}=${counts.join(',')}$: ¿moda?`, `$x_{i}=1,2,3,4$، $f_{i}=${counts.join(',')}$: المنوال؟`, `$x_{i}=1,2,3,4$, $f_{i}=${counts.join(',')}$: mode?`), [wrong(9, 1, 'mode-frequency'), wrong(4, 1, 'calculation')])
}

/* ---------- Circuit 3: spread ---------- */

function range(random: Random) {
    const data = Array.from({ length: 5 }, () => randomInt(random, -5, 20))
    const sorted = [...data].sort((a, b) => a - b)
    return build(random, 3, 'range', data, say(`$${list(data)}$: ibiltartea?`, `$${list(data)}$: ¿recorrido?`, `$${list(data)}$: المدى؟`, `$${list(data)}$: range?`), [wrong(Math.abs(data[4] - data[0]), 1, 'median-unsorted'), wrong(sorted[4], 1, 'calculation')])
}

const SPREAD_SETS = [[4, 4, 10, 10], [3, 3, 11, 11], [5, 5, 5, 9, 9, 9], [1, 1, 7, 7], [2, 2, 12, 12], [2, 4, 6, 8, 10], [1, 2, 3, 4, 5, 6, 7]]

function variance(random: Random) {
    const data = pick(random, SPREAD_SETS)
    return build(random, 3, 'variance', data, say(`$${list(data)}$: bariantza?`, `$${list(data)}$: ¿varianza?`, `$${list(data)}$: التباين؟`, `$${list(data)}$: variance?`), [wrong(Math.round(Math.sqrt(statsAnswer({ kind: 'variance', args: data }).numerator)), 1, 'calculation'), wrong(Math.max(...data) - Math.min(...data), 1, 'calculation')])
}

function quartile(random: Random) {
    const data = Array.from({ length: 8 }, () => randomInt(random, 1, 30)).sort((a, b) => a - b)
    if (new Set(data).size < 8) return null
    return build(random, 3, 'q1', data, say(`$${list(data)}$: $Q_{1}$?`, `$${list(data)}$: ¿$Q_{1}$?`, `$${list(data)}$: $Q_{1}$؟`, `$${list(data)}$: $Q_{1}$?`), [wrong(data[1], 1, 'calculation'), wrong(data[2], 1, 'calculation')])
}

/* ---------- Circuit 4: chance ---------- */

function bag(random: Random) {
    const red = randomInt(random, 1, 6)
    const blue = randomInt(random, 1, 6)
    return build(random, 4, 'laplace', [red, red + blue], say(`${red} gorri eta ${blue} urdin, guztira ${red + blue}: gorria ateratzeko probabilitatea?`, `${red} rojas y ${blue} azules, ${red + blue} en total: ¿P(roja)?`, `${red} حمراء و${blue} زرقاء، المجموع ${red + blue}: احتمال الحمراء؟`, `${red} red and ${blue} blue, ${red + blue} in all: P(red)?`), [wrong(red, blue, 'odds'), wrong(blue, red + blue, 'calculation')])
}

function draws(random: Random) {
    const total = randomInt(random, 5, 9)
    const red = randomInt(random, 2, total - 2)
    return build(random, 4, 'without', [red, total], say(`${total} bola, ${red} gorri; bi itzuli gabe: biak gorri?`, `${total} bolas, ${red} rojas; dos sin devolver: ¿las dos rojas?`, `${total} كرات منها ${red} حمراء؛ كرتان دون إرجاع: كلتاهما حمراء؟`, `${total} balls, ${red} red; two without putting back: both red?`), [wrong(red * red, total * total, 'replacement'), wrong(red, total, 'calculation')])
}

function expected(random: Random) {
    const favourable = randomInt(random, 1, 5)
    const rolls = pick(random, [60, 120, 300, 600])
    return build(random, 4, 'expected', [favourable, 6, rolls], say(`Dadoa ${rolls} aldiz; aldeko kasuak: ${favourable}, posibleak: 6. Zenbat aldiz?`, `Dado ${rolls} veces, ${favourable} casos favorables de 6. ¿Cuántas veces?`, `نرد ${rolls} مرة، ${favourable} حالات مواتية من 6. كم مرة؟`, `A die ${rolls} times, ${favourable} favourable cases out of 6. How many times?`), [wrong(rolls, favourable, 'calculation'), wrong(rolls * favourable, 1, 'calculation')])
}

type Generator = (random: Random, tier: Tier) => Stats3RaceQuestion | null

const circuitGenerators: Generator[][] = [
    [relative, cumulative, mark],
    [degrees, change, share],
    [mean, median, mode],
    [range, variance, quartile],
    [bag, draws, expected]
]

export function generateStats3RaceQuestion(random: Random, circuit: number, tier: Tier): Stats3RaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkStats3PitAnswer(question: RaceQuestion<Stats3RaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function stats3ParTime(circuit: number): number {
    return parTimeFor([12, 13, 13, 15, 15][circuit] ?? 13)
}

export const stats3RaceErrorTips: Record<Stats3RaceError, LocalizedText> = {
    'degrees-percent': say('Zirkulua 360° da, ez 100.', 'El círculo son 360°, no 100.', 'الدائرة 360° لا 100.', 'The circle is 360°, not 100.'),
    'cumulative-own': say('Metatua: aurrekoak ere batu.', 'Acumulada: suma también las anteriores.', 'المتجمّع: اجمع السابقة أيضًا.', 'Cumulative: add the earlier ones too.'),
    'mean-unweighted': say('Biderkatu maiztasunez.', 'Multiplica por las frecuencias.', 'اضرب في التكرارات.', 'Multiply by the frequencies.'),
    'median-unsorted': say('Lehenik ordenatu.', 'Primero ordena.', 'رتّب أولًا.', 'Sort first.'),
    'mode-frequency': say('Moda balioa da, ez maiztasuna.', 'La moda es el valor, no la frecuencia.', 'المنوال هو القيمة لا التكرار.', 'The mode is the value, not the frequency.'),
    odds: say('Aldekoak zati guztiak.', 'Favorables entre todos.', 'المواتية على الكل.', 'Favourable over all.'),
    replacement: say('Itzuli gabe: bola bat gutxiago.', 'Sin devolver: una bola menos.', 'دون إرجاع: كرة أقل.', 'Without putting back: one ball fewer.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
