import { checkAnswer, fraction, toLatex, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { lineLatex, pointLatex, quadrantOf, type Point } from '../functions.ts'

/* ==========================================================================
   Funtzioen lasterketa (2. DBH): five circuits, one per stage. Questions
   are text-only (graphs come as tables of values) and every wrong option is
   a typical mistake: x and y swapped, the sign lost with a negative x, the
   constant n forgotten, Δx over Δy, the equation with m and n exchanged…
   Each question carries `meta`, the data it was built from, so the tests
   can check the right option again without trusting the generator.
   ========================================================================== */

export const FUNCTIONS_RACE_CIRCUITS = 5

export type FunctionsRaceError =
    | 'x-sign'
    | 'y-sign'
    | 'both-signs'
    | 'repeated-input'
    | 'swap-xy'
    | 'forgot-n'
    | 'sign-error'
    | 'power-sign'
    | 'wrong-trend'
    | 'wrong-extreme'
    | 'inverted'
    | 'order'
    | 'added'
    | 'swapped-mn'
    | 'steep-sign'
    | 'axes-mixed'
    | 'calculation'

export type RaceMeta =
    | { kind: 'quadrant'; point: Point }
    | { kind: 'relation'; relations: Point[][]; right: number }
    | { kind: 'area'; vertices: Point[]; area: number }
    | { kind: 'value'; m: number; n: number; x: number; y: number }
    | { kind: 'square'; k: number; x: number; y: number }
    | { kind: 'inverse'; m: number; n: number; y: number; x: number }
    | { kind: 'point-on-line'; m: number; n: number; points: Point[]; right: number }
    | { kind: 'table'; ys: number[]; ask: 'max' | 'argmin' | 'decreasing'; answer: number }
    | { kind: 'intercept'; m: number; n: number; axis: 'x' | 'y'; answer: number }
    | { kind: 'through-origin'; point: Point; m: number }
    | { kind: 'slope'; a: Point; b: Point; m: FractionValue }
    | { kind: 'proportional-value'; m: number; x: number; y: number }
    | { kind: 'steepest' | 'decreasing'; slopes: number[]; right: number }
    | { kind: 'line-n'; a: Point; b: Point; m: number; n: number }
    | { kind: 'equation'; a: Point; b: Point; equations: Array<{ m: number; n: number }>; right: number }
    | { kind: 'tariff'; m: number; n: number; x: number; y: number; mode: 'value' | 'solve' }
    | { kind: 'meeting'; first: { m: number; n: number }; second: { m: number; n: number }; x: number }

export type FunctionsRaceQuestion = RaceQuestion<FunctionsRaceError> & { meta: RaceMeta }

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const math = (latex: string) => `$${latex}$`
const signedRandom = (random: Random, min: number, max: number) => randomInt(random, min, max) * (random() < 0.5 ? -1 : 1)
const roman = ['', 'I', 'II', 'III', 'IV'] as const

/** Table of values as LaTeX */
const table = (xs: number[], ys: number[]) => `\\begin{array}{c|${'c'.repeat(xs.length)}}x&${xs.join('&')}\\\\ \\hline y&${ys.join('&')}\\end{array}`

interface Choice {
    latex: string
    error: FunctionsRaceError | null
}

const numberChoice = (value: number, error: FunctionsRaceError): Choice => ({ latex: String(value), error })

/** Four distinct options: the right one and three typical mistakes (never equal to the right one) */
function pickOptions(random: Random, right: Choice, wrongs: Choice[]): RaceOption<FunctionsRaceError>[] | null {
    const used = new Set([right.latex])
    const chosen: Choice[] = []
    for (const wrong of wrongs) {
        if (chosen.length === 3) break
        if (used.has(wrong.latex)) continue
        used.add(wrong.latex)
        chosen.push(wrong)
    }
    if (chosen.length < 3) return null
    return shuffle(random, [{ latex: right.latex, correct: true, error: null as FunctionsRaceError | null }, ...chosen.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

const near = (value: number): Choice[] => [value + 1, value - 1, value + 2, value - 2, -value].map((item) => numberChoice(item, 'calculation'))

function build(circuit: number, kind: string, prompt: LocalizedText, options: RaceOption<FunctionsRaceError>[], answer: FractionValue | null, worked: LocalizedText, meta: RaceMeta): FunctionsRaceQuestion {
    return { circuit, kind, prompt, options, answer: answer ?? fraction(0), answerForm: 'any', percentAnswer: false, writable: answer !== null, solution: worked, meta }
}

const same = (latex: string): LocalizedText => ({ eu: math(latex), es: math(latex), ar: math(latex) })
const bracket = (value: number) => (value < 0 ? `(${value})` : String(value))

/* ---------- Circuit 0: coordinates and relations ---------- */

function quadrantQuestion(random: Random): FunctionsRaceQuestion | null {
    const point: Point = [signedRandom(random, 1, 8), signedRandom(random, 1, 8)]
    const right = quadrantOf(point)
    const wrongs = ([1, 2, 3, 4] as const).filter((q) => q !== right).map((q) => {
        const xDiffers = (q === 1 || q === 4) !== point[0] > 0
        const yDiffers = (q === 1 || q === 2) !== point[1] > 0
        const error: FunctionsRaceError = xDiffers && yDiffers ? 'both-signs' : xDiffers ? 'x-sign' : 'y-sign'
        return { latex: `\\text{${roman[q]}}`, error }
    })
    const options = pickOptions(random, { latex: `\\text{${roman[right]}}`, error: null }, wrongs)
    if (!options) return null
    return build(0, 'quadrant', say(`Zein koadrantetan dago ${math(`P${pointLatex(point)}`)} puntua?`, `¿En qué cuadrante está el punto ${math(`P${pointLatex(point)}`)}?`, `في أي ربع تقع النقطة ${math(`P${pointLatex(point)}`)}؟`), options, null, same(`P${pointLatex(point)}\\to\\text{${roman[right]}}`), { kind: 'quadrant', point })
}

const relationLatex = (pairs: Point[]) => pairs.map(([x, y]) => `${x}\\to ${y}`).join(',\\ ')

function relationQuestion(random: Random): FunctionsRaceQuestion | null {
    const xs = shuffle(random, [1, 2, 3, 4, 5, 6]).slice(0, 3).sort((a, b) => a - b)
    const ys = xs.map(() => randomInt(random, 1, 8))
    const right: Point[] = xs.map((x, index) => [x, ys[index]] as Point)
    const wrongs: Point[][] = [0, 1, 2].map((index) => {
        const other = (index + 1) % 3
        const clash: Point = [xs[index], ys[index] + randomInt(random, 1, 3)]
        return right.map((pair, position) => (position === other ? clash : pair))
    })
    const all = [right, ...wrongs]
    if (new Set(all.map(relationLatex)).size < 4) return null
    const options = pickOptions(random, { latex: relationLatex(right), error: null }, wrongs.map((relation) => ({ latex: relationLatex(relation), error: 'repeated-input' as const })))
    if (!options) return null
    const shown = options.map((option) => all.find((relation) => relationLatex(relation) === option.latex)!)
    return build(0, 'relation', say('Zein erlazio da funtzioa?', '¿Cuál de estas relaciones es una función?', 'أي هذه العلاقات دالة؟'), options, null, say('Funtzioa: sarrera bakoitzak irteera bakarra du.', 'Es función: cada entrada tiene una sola salida.', 'هي دالة: لكل مدخل مخرج واحد.'), { kind: 'relation', relations: shown, right: options.findIndex((option) => option.correct) })
}

function areaQuestion(random: Random): FunctionsRaceQuestion | null {
    const x1 = randomInt(random, -5, 1)
    const x2 = x1 + randomInt(random, 2, 7)
    const y1 = randomInt(random, -5, 1)
    const y2 = y1 + randomInt(random, 2, 6)
    const dx = x2 - x1
    const dy = y2 - y1
    const area = dx * dy
    const vertices: Point[] = [[x1, y1], [x2, y1], [x2, y2], [x1, y2]]
    const shown = vertices.map((vertex, index) => `${'ABCD'[index]}${pointLatex(vertex)}`).join(',\\ ')
    const options = pickOptions(random, numberChoice(area, 'calculation'), [numberChoice(2 * (dx + dy), 'added'), numberChoice(dx + dy, 'added'), numberChoice(area + dx, 'calculation'), ...near(area)])
    if (!options) return null
    return build(0, 'area', say(`Laukizuzen baten erpinak ${math(shown)} dira. Zenbat da azalera?`, `Los vértices de un rectángulo son ${math(shown)}. ¿Cuánto mide su área?`, `رؤوس مستطيل هي ${math(shown)}. كم مساحته؟`), options, fraction(area), same(`${dx}\\cdot ${dy}=${area}`), { kind: 'area', vertices, area })
}

/* ---------- Circuit 1: tables, formulas and points ---------- */

const functionName = (m: number, n: number) => `f(x)=${lineLatex(m, n).replace('y=', '')}`

function valueQuestion(random: Random, tier: Tier): FunctionsRaceQuestion | null {
    const m = tier === 0 ? randomInt(random, 2, 5) : signedRandom(random, 2, 5)
    const n = signedRandom(random, 1, 7)
    const x = tier === 0 ? randomInt(random, 1, 5) : signedRandom(random, 1, 5)
    const y = m * x + n
    const options = pickOptions(random, numberChoice(y, 'calculation'), [
        numberChoice(m * x, 'forgot-n'),
        numberChoice(m * x - n, 'sign-error'),
        numberChoice(m * Math.abs(x) + n, 'sign-error'),
        numberChoice(m + x + n, 'added'),
        ...near(y)
    ])
    if (!options) return null
    return build(1, 'value', say(`${math(functionName(m, n))} bada, zenbat da ${math(`f(${x})`)}?`, `Si ${math(functionName(m, n))}, ¿cuánto vale ${math(`f(${x})`)}?`, `إذا كانت ${math(functionName(m, n))} فكم تساوي ${math(`f(${x})`)}؟`), options, fraction(y), same(`f(${x})=${m}\\cdot ${bracket(x)}${n < 0 ? '' : '+'}${n}=${y}`), { kind: 'value', m, n, x, y })
}

function squareQuestion(random: Random): FunctionsRaceQuestion | null {
    const k = randomInt(random, 1, 9)
    const x = signedRandom(random, 2, 6)
    const y = x * x - k
    const options = pickOptions(random, numberChoice(y, 'calculation'), [numberChoice(-(x * x) - k, 'power-sign'), numberChoice(2 * x - k, 'power-sign'), numberChoice(x * x + k, 'sign-error'), ...near(y)])
    if (!options) return null
    return build(1, 'square', say(`${math(`f(x)=x^{2}-${k}`)} bada, zenbat da ${math(`f(${x})`)}?`, `Si ${math(`f(x)=x^{2}-${k}`)}, ¿cuánto vale ${math(`f(${x})`)}?`, `إذا كانت ${math(`f(x)=x^{2}-${k}`)} فكم تساوي ${math(`f(${x})`)}؟`), options, fraction(y), same(`f(${x})=${bracket(x)}^{2}-${k}=${x * x}-${k}=${y}`), { kind: 'square', k, x, y })
}

function inverseQuestion(random: Random): FunctionsRaceQuestion | null {
    const m = signedRandom(random, 2, 5)
    const n = signedRandom(random, 1, 8)
    const x = signedRandom(random, 1, 6)
    const y = m * x + n
    const options = pickOptions(random, numberChoice(x, 'calculation'), [
        numberChoice(y - n, 'forgot-n'),
        ...(Number.isInteger((y + n) / m) ? [numberChoice((y + n) / m, 'sign-error')] : []),
        ...(Number.isInteger(y / m - n) ? [numberChoice(y / m - n, 'sign-error')] : []),
        ...near(x)
    ])
    if (!options) return null
    return build(1, 'inverse', say(`${math(functionName(m, n))} funtzioan, zein $x$-rentzat da ${math(`f(x)=${y}`)}?`, `En ${math(functionName(m, n))}, ¿para qué $x$ se cumple ${math(`f(x)=${y}`)}?`, `في ${math(functionName(m, n))} لأي $x$ يتحقق ${math(`f(x)=${y}`)}؟`), options, fraction(x), same(`${m}x${n < 0 ? '' : '+'}${n}=${y}\\ \\to\\ x=${x}`), { kind: 'inverse', m, n, y, x })
}

function pointOnLineQuestion(random: Random): FunctionsRaceQuestion | null {
    const m = signedRandom(random, 1, 4)
    const n = signedRandom(random, 1, 6)
    const x = randomInt(random, 1, 5)
    const y = m * x + n
    const onLine = ([px, py]: Point) => m * px + n === py
    const right: Point = [x, y]
    const candidates: Array<{ point: Point; error: FunctionsRaceError }> = [
        { point: [y, x], error: 'swap-xy' },
        { point: [x, m * x - n], error: 'sign-error' },
        { point: [x, y + 1], error: 'calculation' },
        { point: [x, y - 2], error: 'calculation' },
        { point: [x, m * x], error: 'forgot-n' }
    ]
    const wrongs = candidates.filter((item) => !onLine(item.point)).map((item) => ({ latex: pointLatex(item.point), error: item.error }))
    const options = pickOptions(random, { latex: pointLatex(right), error: null }, wrongs)
    if (!options) return null
    const points = options.map((option) => (option.latex === pointLatex(right) ? right : candidates.find((item) => pointLatex(item.point) === option.latex)!.point))
    return build(1, 'point-on-line', say(`Zein puntu da ${math(lineLatex(m, n))} funtzioarena?`, `¿Cuál de estos puntos es de la función ${math(lineLatex(m, n))}?`, `أي هذه النقاط تنتمي إلى الدالة ${math(lineLatex(m, n))}؟`), options, null, same(`${m}\\cdot ${x}${n < 0 ? '' : '+'}${n}=${y}`), { kind: 'point-on-line', m, n, points, right: options.findIndex((option) => option.correct) })
}

/* ---------- Circuit 2: reading a table ---------- */

/** Six values (x from 0 to 5) with a single highest and a single lowest value */
function series(random: Random): number[] | null {
    for (let attempt = 0; attempt < 50; attempt += 1) {
        const ys = Array.from({ length: 6 }, () => randomInt(random, 0, 12))
        const high = Math.max(...ys)
        const low = Math.min(...ys)
        if (ys.filter((y) => y === high).length === 1 && ys.filter((y) => y === low).length === 1 && high - low >= 4) return ys
    }
    return null
}

const xs6 = [0, 1, 2, 3, 4, 5]

function maxQuestion(random: Random): FunctionsRaceQuestion | null {
    const ys = series(random)
    if (!ys) return null
    const high = Math.max(...ys)
    const options = pickOptions(random, numberChoice(high, 'calculation'), [numberChoice(Math.min(...ys), 'wrong-extreme'), numberChoice(ys.indexOf(high), 'wrong-extreme'), numberChoice(ys[ys.length - 1], 'wrong-extreme'), ...near(high)])
    if (!options) return null
    return build(2, 'max', say(`${math(table(xs6, ys))} Zein da $y$-ren balio maximoa?`, `${math(table(xs6, ys))} ¿Cuál es el valor máximo de $y$?`, `${math(table(xs6, ys))} ما أكبر قيمة لـ $y$؟`), options, fraction(high), same(`\\max y=${high}\\quad (x=${ys.indexOf(high)})`), { kind: 'table', ys, ask: 'max', answer: high })
}

function argminQuestion(random: Random): FunctionsRaceQuestion | null {
    const ys = series(random)
    if (!ys) return null
    const low = Math.min(...ys)
    const at = ys.indexOf(low)
    const options = pickOptions(random, numberChoice(at, 'calculation'), [numberChoice(low, 'wrong-extreme'), numberChoice(ys.indexOf(Math.max(...ys)), 'wrong-extreme'), ...near(at).filter((choice) => Number(choice.latex) >= 0)])
    if (!options) return null
    return build(2, 'argmin', say(`${math(table(xs6, ys))} Zein $x$-rentzat da $y$ minimoa?`, `${math(table(xs6, ys))} ¿Para qué $x$ es mínima $y$?`, `${math(table(xs6, ys))} عند أي $x$ تكون $y$ أصغر ما يمكن؟`), options, fraction(at), same(`\\min y=${low}\\quad \\to\\ x=${at}`), { kind: 'table', ys, ask: 'argmin', answer: at })
}

function decreasingQuestion(random: Random): FunctionsRaceQuestion | null {
    const step = randomInt(random, 0, 4)
    const ys = [randomInt(random, 4, 8)]
    for (let index = 0; index < 5; index += 1) {
        const last = ys[index]
        ys.push(index === step ? last - randomInt(random, 1, 3) : last + randomInt(random, 0, 3))
    }
    const interval = (index: number) => `(${index},\\,${index + 1})`
    const others = shuffle(random, [0, 1, 2, 3, 4].filter((index) => index !== step)).slice(0, 3)
    const options = pickOptions(random, { latex: interval(step), error: null }, others.map((index) => ({ latex: interval(index), error: 'wrong-trend' as const })))
    if (!options) return null
    return build(2, 'decreasing', say(`${math(table(xs6, ys))} Zein tartetan da beherakorra?`, `${math(table(xs6, ys))} ¿En qué intervalo es decreciente?`, `${math(table(xs6, ys))} في أي فترة تكون متناقصة؟`), options, null, same(`f(${step})=${ys[step]}>f(${step + 1})=${ys[step + 1]}`), { kind: 'table', ys, ask: 'decreasing', answer: step })
}

function interceptQuestion(random: Random, tier: Tier): FunctionsRaceQuestion | null {
    const m = signedRandom(random, 1, 4)
    const x0 = signedRandom(random, 1, 6)
    const n = -m * x0
    if (n === 0) return null
    const axis: 'x' | 'y' = tier === 0 ? 'y' : random() < 0.6 ? 'x' : 'y'
    if (axis === 'y') {
        const options = pickOptions(random, numberChoice(n, 'calculation'), [numberChoice(m, 'axes-mixed'), numberChoice(-n, 'sign-error'), numberChoice(x0, 'axes-mixed'), ...near(n)])
        if (!options) return null
        return build(2, 'intercept-y', say(`Zein da ${math(lineLatex(m, n))} zuzenaren Y ardatzeko ebakiduraren ordenatua?`, `¿Cuál es la ordenada del corte de ${math(lineLatex(m, n))} con el eje Y?`, `ما ترتيبة تقاطع ${math(lineLatex(m, n))} مع محور Y؟`), options, fraction(n), same(`x=0\\ \\to\\ y=${n}`), { kind: 'intercept', m, n, axis, answer: n })
    }
    const options = pickOptions(random, numberChoice(x0, 'calculation'), [numberChoice(-x0, 'sign-error'), numberChoice(n, 'axes-mixed'), numberChoice(m, 'axes-mixed'), ...near(x0)])
    if (!options) return null
    return build(2, 'intercept-x', say(`Zein da ${math(lineLatex(m, n))} zuzenak X ardatza ebakitzen duen puntuaren abzisa?`, `¿Cuál es la abscisa del punto donde ${math(lineLatex(m, n))} corta al eje X?`, `ما فاصلة نقطة تقاطع ${math(lineLatex(m, n))} مع محور X؟`), options, fraction(x0), same(`0=${m}x${n < 0 ? '' : '+'}${n}\\ \\to\\ x=${x0}`), { kind: 'intercept', m, n, axis, answer: x0 })
}

/* ---------- Circuit 3: direct proportion and slope ---------- */

function throughOriginQuestion(random: Random, tier: Tier): FunctionsRaceQuestion | null {
    const m = tier === 0 ? randomInt(random, 2, 9) : signedRandom(random, 2, 9)
    const x = randomInt(random, 2, 6)
    const y = m * x
    const options = pickOptions(random, numberChoice(m, 'calculation'), [numberChoice(y - x, 'order'), numberChoice(y + x, 'added'), numberChoice(-m, 'sign-error'), ...near(m)])
    if (!options) return null
    return build(3, 'through-origin', say(`${math('y=mx')} funtzioaren grafikoa ${math(`(${x},\\,${y})`)} puntutik pasatzen da. Zenbat da $m$?`, `La gráfica de ${math('y=mx')} pasa por ${math(`(${x},\\,${y})`)}. ¿Cuánto vale $m$?`, `رسم ${math('y=mx')} يمر بالنقطة ${math(`(${x},\\,${y})`)}. كم تساوي $m$؟`), options, fraction(m), same(`m=\\frac{${y}}{${x}}=${m}`), { kind: 'through-origin', point: [x, y], m })
}

function proportionalValueQuestion(random: Random): FunctionsRaceQuestion | null {
    const m = signedRandom(random, 2, 8)
    const x = signedRandom(random, 2, 6)
    const y = m * x
    const options = pickOptions(random, numberChoice(y, 'calculation'), [numberChoice(-y, 'sign-error'), numberChoice(m + x, 'added'), numberChoice(m - x, 'added'), ...near(y)])
    if (!options) return null
    return build(3, 'proportional-value', say(`${math(`y=${m === 1 ? '' : m === -1 ? '-' : m}x`)} funtzioan, zenbat da $y$ ${math(`x=${x}`)} denean?`, `En ${math(`y=${m}x`)}, ¿cuánto vale $y$ cuando ${math(`x=${x}`)}?`, `في ${math(`y=${m}x`)} كم تساوي $y$ عندما ${math(`x=${x}`)}؟`), options, fraction(y), same(`y=${m}\\cdot ${bracket(x)}=${y}`), { kind: 'proportional-value', m, x, y })
}

const slopeLatex = (value: FractionValue) => toLatex(value)

function slopeQuestion(random: Random, tier: Tier): FunctionsRaceQuestion | null {
    let dx: number
    let dy: number
    if (tier < 2) {
        dx = randomInt(random, 1, 4)
        dy = dx * (tier === 0 ? randomInt(random, 1, 5) : signedRandom(random, 1, 5))
    } else {
        const p = signedRandom(random, 1, 5)
        const q = randomInt(random, 2, 4)
        if (Math.abs(p) % q === 0) return null
        const k = randomInt(random, 1, 2)
        dx = q * k
        dy = p * k
    }
    const x1 = randomInt(random, -4, 3)
    const y1 = randomInt(random, -4, 4)
    const a: Point = [x1, y1]
    const b: Point = [x1 + dx, y1 + dy]
    const m = fraction(dy, dx)
    const rightLatex = slopeLatex(m)
    const wrongs: Choice[] = ([
        { latex: slopeLatex(fraction(dx, dy)), error: 'inverted' },
        { latex: slopeLatex(fraction(-dy, dx)), error: 'order' },
        ...(b[0] + a[0] !== 0 ? [{ latex: slopeLatex(fraction(a[1] + b[1], a[0] + b[0])), error: 'added' as const }] : []),
        { latex: slopeLatex(fraction(dy - dx, 1)), error: 'calculation' },
        { latex: slopeLatex(fraction(dy + 1, dx)), error: 'calculation' }
    ] as Choice[]).filter((choice) => choice.latex !== rightLatex)
    const options = pickOptions(random, { latex: rightLatex, error: null }, wrongs)
    if (!options) return null
    return build(3, 'slope', say(`Zein da ${math(`A${pointLatex(a)}`)} eta ${math(`B${pointLatex(b)}`)} puntuetatik pasatzen den zuzenaren malda?`, `¿Cuál es la pendiente de la recta que pasa por ${math(`A${pointLatex(a)}`)} y ${math(`B${pointLatex(b)}`)}?`, `ما ميل الخط المار بالنقطتين ${math(`A${pointLatex(a)}`)} و${math(`B${pointLatex(b)}`)}؟`), options, m, same(`m=\\frac{${b[1]}-${bracket(a[1])}}{${b[0]}-${bracket(a[0])}}=\\frac{${dy}}{${dx}}=${rightLatex}`), { kind: 'slope', a, b, m })
}

function steepestQuestion(random: Random): FunctionsRaceQuestion | null {
    // The steepest line has a negative slope; the biggest positive slope is the typical wrong answer
    const biggest = randomInt(random, 6, 9)
    const positives = shuffle(random, [2, 3, 4, 5]).slice(0, 3)
    const slopes = shuffle(random, [-biggest, ...positives])
    const right = slopes.indexOf(-biggest)
    const text = (slope: number) => `y=${slope === 1 ? '' : slope === -1 ? '-' : slope}x`
    const options = slopes.map((slope, index) => ({ latex: text(slope), correct: index === right, error: index === right ? null : slope === Math.max(...positives) ? ('steep-sign' as const) : ('calculation' as const) }))
    return build(3, 'steepest', say('Zein zuzen da aldapatsuena?', '¿Cuál de estas rectas es la más inclinada?', 'أي هذه الخطوط أشد انحدارًا؟'), options, null, same(`|{-${biggest}}|=${biggest}`), { kind: 'steepest', slopes, right })
}

function decreasingLineQuestion(random: Random): FunctionsRaceQuestion | null {
    const negative = -randomInt(random, 1, 6)
    const positives = shuffle(random, [1, 2, 3, 4, 5, 6, 7]).slice(0, 3)
    const slopes = shuffle(random, [negative, ...positives])
    const right = slopes.indexOf(negative)
    const text = (slope: number) => `y=${slope === 1 ? '' : slope === -1 ? '-' : slope}x`
    const options = slopes.map((slope, index) => ({ latex: text(slope), correct: index === right, error: index === right ? null : ('sign-error' as const) }))
    return build(3, 'decreasing-line', say('Zein funtzio da beherakorra?', '¿Cuál de estas funciones es decreciente?', 'أي هذه الدوال متناقصة؟'), options, null, same(`m=${negative}<0`), { kind: 'decreasing', slopes, right })
}

/* ---------- Circuit 4: the straight line ---------- */

function lineNQuestion(random: Random): FunctionsRaceQuestion | null {
    const m = signedRandom(random, 1, 4)
    const n = signedRandom(random, 1, 6)
    const x1 = randomInt(random, 1, 4)
    const x2 = x1 + randomInt(random, 1, 3)
    const a: Point = [x1, m * x1 + n]
    const b: Point = [x2, m * x2 + n]
    const options = pickOptions(random, numberChoice(n, 'calculation'), [numberChoice(a[1], 'forgot-n'), numberChoice(-n, 'sign-error'), numberChoice(m * x1 - a[1], 'sign-error'), numberChoice(m, 'swapped-mn'), ...near(n)])
    if (!options) return null
    return build(4, 'line-n', say(`Zuzen bat ${math(`A${pointLatex(a)}`)} eta ${math(`B${pointLatex(b)}`)} puntuetatik pasatzen da. Zenbat da $n$ (${math('y=mx+n')} formulan)?`, `Una recta pasa por ${math(`A${pointLatex(a)}`)} y ${math(`B${pointLatex(b)}`)}. ¿Cuánto vale $n$ (en ${math('y=mx+n')})?`, `خط يمر بالنقطتين ${math(`A${pointLatex(a)}`)} و${math(`B${pointLatex(b)}`)}. كم تساوي $n$ (في ${math('y=mx+n')})؟`), options, fraction(n), same(`m=${m}\\qquad ${a[1]}=${m}\\cdot ${x1}+n\\ \\to\\ n=${n}`), { kind: 'line-n', a, b, m, n })
}

function equationQuestion(random: Random): FunctionsRaceQuestion | null {
    const m = signedRandom(random, 2, 5)
    const n = signedRandom(random, 1, 6)
    const x1 = randomInt(random, 1, 3)
    const x2 = x1 + randomInt(random, 1, 3)
    const a: Point = [x1, m * x1 + n]
    const b: Point = [x2, m * x2 + n]
    const passes = (line: { m: number; n: number }) => line.m * a[0] + line.n === a[1] && line.m * b[0] + line.n === b[1]
    const wrongs = ([
        { line: { m: n, n: m }, error: 'swapped-mn' },
        { line: { m, n: -n }, error: 'sign-error' },
        { line: { m: -m, n }, error: 'sign-error' },
        { line: { m, n: n + 1 }, error: 'calculation' }
    ] as Array<{ line: { m: number; n: number }; error: FunctionsRaceError }>).filter((item) => !passes(item.line))
    const options = pickOptions(random, { latex: lineLatex(m, n), error: null }, wrongs.map((item) => ({ latex: lineLatex(item.line.m, item.line.n), error: item.error })))
    if (!options) return null
    const equations = options.map((option) => (option.correct ? { m, n } : wrongs.find((item) => lineLatex(item.line.m, item.line.n) === option.latex)!.line))
    return build(4, 'equation', say(`Zein da ${math(`A${pointLatex(a)}`)} eta ${math(`B${pointLatex(b)}`)} puntuetatik pasatzen den zuzenaren ekuazioa?`, `¿Cuál es la ecuación de la recta que pasa por ${math(`A${pointLatex(a)}`)} y ${math(`B${pointLatex(b)}`)}?`, `ما معادلة الخط المار بالنقطتين ${math(`A${pointLatex(a)}`)} و${math(`B${pointLatex(b)}`)}؟`), options, null, same(`m=${m},\\ n=${n}\\ \\to\\ ${lineLatex(m, n)}`), { kind: 'equation', a, b, equations, right: options.findIndex((option) => option.correct) })
}

function tariffQuestion(random: Random, tier: Tier): FunctionsRaceQuestion | null {
    const m = randomInt(random, 2, 9)
    const n = randomInt(random, 5, 30)
    const x = randomInt(random, 2, 9)
    const y = m * x + n
    if (tier === 0 || random() < 0.4) {
        const options = pickOptions(random, numberChoice(y, 'calculation'), [numberChoice(m * x, 'forgot-n'), numberChoice((m + n) * x, 'order'), numberChoice(m + n + x, 'added'), ...near(y)])
        if (!options) return null
        return build(4, 'tariff-value', say(`Alokairu batean ${n} € ordaintzen dira hasieran eta ${m} € orduko: ${math(`y=${m}x+${n}`)}. Zenbat € ordaindu behar dira ${x} ordutan?`, `En un alquiler se pagan ${n} € al empezar y ${m} € por hora: ${math(`y=${m}x+${n}`)}. ¿Cuántos € se pagan por ${x} horas?`, `في إيجار يُدفع ${n} € في البداية و${m} € للساعة: ${math(`y=${m}x+${n}`)}. كم € يُدفع عن ${x} ساعات؟`), options, fraction(y), same(`y=${m}\\cdot ${x}+${n}=${m * x}+${n}=${y}`), { kind: 'tariff', m, n, x, y, mode: 'value' })
    }
    const options = pickOptions(random, numberChoice(x, 'calculation'), [numberChoice(y - n, 'forgot-n'), ...(Number.isInteger((y + n) / m) ? [numberChoice((y + n) / m, 'sign-error')] : []), ...(Number.isInteger(y / m) ? [numberChoice(y / m, 'forgot-n')] : []), ...near(x)])
    if (!options) return null
    return build(4, 'tariff-solve', say(`Alokairu batean ${n} € ordaintzen dira hasieran eta ${m} € orduko: ${math(`y=${m}x+${n}`)}. Zenbat ordu erabili dira ${y} € ordaindu bada?`, `En un alquiler se pagan ${n} € al empezar y ${m} € por hora: ${math(`y=${m}x+${n}`)}. ¿Cuántas horas se han usado si se han pagado ${y} €?`, `في إيجار يُدفع ${n} € في البداية و${m} € للساعة: ${math(`y=${m}x+${n}`)}. كم ساعة استُعملت إذا دُفع ${y} €؟`), options, fraction(x), same(`${y}=${m}x+${n}\\ \\to\\ ${m}x=${y - n}\\ \\to\\ x=${x}`), { kind: 'tariff', m, n, x, y, mode: 'solve' })
}

function meetingQuestion(random: Random): FunctionsRaceQuestion | null {
    const a1 = randomInt(random, 2, 5)
    const a2 = a1 + randomInt(random, 1, 4)
    const x = randomInt(random, 2, 9)
    const n = (a2 - a1) * x
    const options = pickOptions(random, numberChoice(x, 'calculation'), [numberChoice(n, 'forgot-n'), ...(Number.isInteger(n / (a1 + a2)) ? [numberChoice(n / (a1 + a2), 'sign-error')] : []), numberChoice(n / (a2 - a1) + 1, 'calculation'), ...near(x)])
    if (!options) return null
    return build(4, 'meeting', say(`Bi tarifa: ${math(`y=${a1}x+${n}`)} eta ${math(`y=${a2}x`)}. Zein $x$-rentzat dira berdinak?`, `Dos tarifas: ${math(`y=${a1}x+${n}`)} e ${math(`y=${a2}x`)}. ¿Para qué $x$ cuestan lo mismo?`, `تعرفتان: ${math(`y=${a1}x+${n}`)} و${math(`y=${a2}x`)}. عند أي $x$ تتساويان؟`), options, fraction(x), same(`${a1}x+${n}=${a2}x\\ \\to\\ ${n}=${a2 - a1}x\\ \\to\\ x=${x}`), { kind: 'meeting', first: { m: a1, n }, second: { m: a2, n: 0 }, x })
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => FunctionsRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [
        (random) => quadrantQuestion(random),
        (random) => relationQuestion(random),
        (random) => areaQuestion(random)
    ],
    [
        (random, tier) => valueQuestion(random, tier === 0 ? 0 : 1),
        (random, tier) => (tier === 0 ? valueQuestion(random, 0) : inverseQuestion(random)),
        (random, tier) => (tier === 2 ? pointOnLineQuestion(random) : valueQuestion(random, 1)),
        (random, tier) => (tier === 2 ? squareQuestion(random) : valueQuestion(random, tier === 0 ? 0 : 1))
    ],
    [
        (random) => maxQuestion(random),
        (random) => argminQuestion(random),
        (random, tier) => (tier === 0 ? maxQuestion(random) : decreasingQuestion(random)),
        (random, tier) => interceptQuestion(random, tier)
    ],
    [
        (random, tier) => throughOriginQuestion(random, tier === 0 ? 0 : 1),
        (random, tier) => slopeQuestion(random, tier),
        (random, tier) => (tier === 0 ? throughOriginQuestion(random, 0) : proportionalValueQuestion(random)),
        (random, tier) => (tier === 2 ? steepestQuestion(random) : tier === 1 ? decreasingLineQuestion(random) : slopeQuestion(random, 0))
    ],
    [
        (random) => lineNQuestion(random),
        (random, tier) => tariffQuestion(random, tier),
        (random, tier) => (tier === 0 ? tariffQuestion(random, 0) : equationQuestion(random)),
        (random, tier) => (tier === 2 ? meetingQuestion(random) : tariffQuestion(random, tier))
    ]
]

export function generateFunctionsRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): FunctionsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkFunctionsPitAnswer(question: RaceQuestion<FunctionsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function functionsParTime(circuit: number): number {
    return parTimeFor([9, 11, 12, 12, 13][circuit] ?? 11)
}

export const functionsRaceErrorTips: Record<FunctionsRaceError, LocalizedText> = {
    'x-sign': say('Begiratu lehen koordenatuaren zeinua: positiboa eskuinera, negatiboa ezkerrera.', 'Mira el signo de la primera coordenada: positiva a la derecha, negativa a la izquierda.', 'انظر إلى إشارة الإحداثي الأول: موجبة يمينًا وسالبة يسارًا.'),
    'y-sign': say('Begiratu bigarren koordenatuaren zeinua: positiboa gora, negatiboa behera.', 'Mira el signo de la segunda coordenada: positiva arriba, negativa abajo.', 'انظر إلى إشارة الإحداثي الثاني: موجبة إلى أعلى وسالبة إلى أسفل.'),
    'both-signs': say('Koadranteak: I (+,+), II (−,+), III (−,−), IV (+,−).', 'Los cuadrantes: I (+,+), II (−,+), III (−,−), IV (+,−).', 'الأرباع: I (+,+) وII (−,+) وIII (−,−) وIV (+,−).'),
    'repeated-input': say('Funtzioan sarrera bakoitzak irteera bakarra du: begiratu errepikatzen den sarrera.', 'En una función cada entrada tiene una sola salida: busca la entrada que se repite.', 'في الدالة لكل مدخل مخرج واحد: ابحث عن المدخل المتكرر.'),
    'swap-xy': say('Puntu bat $(x, y)$ da: lehenengo sarrera, gero emaitza.', 'Un punto es $(x, y)$: primero la entrada y después el resultado.', 'النقطة $(x, y)$: أولًا المدخل ثم النتيجة.'),
    'forgot-n': say('Ez ahaztu $n$ gehitzea (edo kentzea) $m\\cdot x$ kalkulatu ondoren.', 'No olvides sumar (o restar) $n$ después de calcular $m\\cdot x$.', 'لا تنس إضافة (أو طرح) $n$ بعد حساب $m\\cdot x$.'),
    'sign-error': say('Ordeztu $x$ parentesi artean eta zaindu zeinuak.', 'Sustituye $x$ entre paréntesis y cuida los signos.', 'عوّض $x$ بين قوسين وانتبه للإشارات.'),
    'power-sign': say('$(-3)^{2}=9$ da, ez $-9$: parentesiak zeinua ere berretzen du.', '$(-3)^{2}=9$, no $-9$: el paréntesis eleva también el signo.', '$(-3)^{2}=9$ وليس $-9$: القوس يرفع الإشارة أيضًا.'),
    'wrong-trend': say('Beherakorra: $x$ handitzean $y$ txikitzen da. Konparatu bi balio jarraituak.', 'Decreciente: al crecer $x$, $y$ disminuye. Compara dos valores consecutivos.', 'متناقصة: بزيادة $x$ تنقص $y$. قارن قيمتين متتاليتين.'),
    'wrong-extreme': say('Ez nahastu $x$ eta $y$: galdetzen dena $y$-ren balioa ala $x$-ren kokapena den begiratu.', 'No confundas $x$ e $y$: mira si se pide el valor de $y$ o la posición $x$.', 'لا تخلط بين $x$ و$y$: انظر هل يُطلب قيمة $y$ أم موضع $x$.'),
    inverted: say('Malda = $\\Delta y$ / $\\Delta x$, ez alderantziz.', 'Pendiente = $\\Delta y$ / $\\Delta x$, no al revés.', 'الميل = $\\Delta y$ / $\\Delta x$ وليس العكس.'),
    order: say('Kendu bi koordenatuak ordena berean: bigarrena ken lehenengoa, bietan.', 'Resta las dos coordenadas en el mismo orden: segundo menos primero, en las dos.', 'اطرح الإحداثيين بالترتيب نفسه: الثاني ناقص الأول في كليهما.'),
    added: say('Aldaketak kendurak dira, ez batuketak: $y_2-y_1$ eta $x_2-x_1$.', 'Los cambios son restas, no sumas: $y_2-y_1$ y $x_2-x_1$.', 'التغيران طرح لا جمع: $y_2-y_1$ و$x_2-x_1$.'),
    'swapped-mn': say('$y=mx+n$ formulan $m$ $x$-rekin doa (malda) eta $n$ bakarrik (ebakidura).', 'En $y=mx+n$, $m$ va con la $x$ (pendiente) y $n$ va sola (corte con el eje Y).', 'في $y=mx+n$ يرافق $m$ الحرف $x$ (الميل) ويأتي $n$ منفردًا (التقاطع).'),
    'axes-mixed': say('Y ardatza: $x=0$ (zuzenaren $n$). X ardatza: $y=0$ ($x$ askatu).', 'Eje Y: $x=0$ (la $n$ de la recta). Eje X: $y=0$ (despeja $x$).', 'محور Y: $x=0$ ($n$ الخط). محور X: $y=0$ (اعزل $x$).'),
    'steep-sign': say('Aldapak $|m|$ neurtzen du: zeinuak norabidea esaten du, ez aldapa.', 'La inclinación la mide $|m|$: el signo dice la dirección, no cuánto se inclina.', 'الانحدار يقيسه $|m|$: الإشارة تدل على الاتجاه لا على الانحدار.'),
    calculation: say('Berrikusi kalkulua eta egiaztatu emaitza ordeztuz.', 'Revisa el cálculo y comprueba el resultado sustituyendo.', 'راجع الحساب وتحقق من النتيجة بالتعويض.')
}
