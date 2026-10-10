import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import type { GraphSpec } from '../../dbh2-funtzioak-v2/functions.ts'
import { written } from '../../dbh2-gorputzak-v2/games/race.ts'
import { polyLatex } from '../../dbh4-aplikatuak-funtzioak/games/race.ts'
import { sampled } from '../functions.ts'

/* ==========================================================================
   Grafikoen lasterketa (4. DBH aplikatuak): five circuits, one per stage —
   linear functions (the m of y = mx, where a line cuts the X axis, a
   linear model forwards and backwards), the equation of a line (a slope
   from two points, n from a point, where two lines meet), parabolas (a
   value, the vertex, the larger root, c read on a graph), inverse and
   radical functions (k, an inverse problem, an asymptote, a root) and
   exponentials and models (k·aˣ, compound growth and decay, the base, the
   largest rectangle). Wrong options are typical mistakes: x/y instead of
   y/x, the fixed part forgotten, b/2a with the wrong sign, a direct
   proportion instead of an inverse one, simple instead of compound growth…
   Every question carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const GRAPHS_RACE_CIRCUITS = 5

export type GraphsRaceError =
    | 'inverse-ratio'
    | 'sign'
    | 'sign-flip'
    | 'y-intercept'
    | 'no-fixed'
    | 'image-instead'
    | 'order'
    | 'y-instead'
    | 'sign-square'
    | 'no-half'
    | 'direct'
    | 'horizontal'
    | 'vertical'
    | 'no-root'
    | 'times-x'
    | 'simple'
    | 'wrong-way'
    | 'difference'
    | 'no-square'
    | 'calculation'

export type GraphsRaceQuestion = RaceQuestion<GraphsRaceError> & { meta: Record<string, number>; graph?: GraphSpec }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`
// + 0 turns −0 into 0
const exact = (value: number) => fraction(Math.round(value * 1000) + 0, 1000)
const tex = (value: number) => written(exact(value)) ?? String(value)
/** A negative number in brackets, for substitutions */
const br = (value: number) => (value < 0 ? `(${tex(value)})` : tex(value))
const point = (x: number, y: number) => `(${tex(x)},\\,${tex(y)})`
const nonZero = (random: Random, min: number, max: number) => {
    const value = randomInt(random, min, max)
    return value === 0 ? max : value
}

interface Candidate {
    value: number
    error: GraphsRaceError
}

/** The right option and three different mistakes, each exact with at most two decimals */
function options(random: Random, right: number, candidates: Candidate[]): RaceOption<GraphsRaceError>[] | null {
    const rightLatex = written(exact(right))
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: GraphsRaceError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (!Number.isFinite(candidate.value)) continue
        const latex = written(exact(candidate.value))
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

const near = (value: number, step = 1): Candidate[] => [value + step, value - step, value + 2 * step, value - 2 * step, value * 2 + step].map((item) => ({ value: item, error: 'calculation' as const }))

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<GraphsRaceError>[], answer: number, solution: LocalizedText, meta: Record<string, number>, graph?: GraphSpec): GraphsRaceQuestion {
    const value: FractionValue = exact(answer)
    return { circuit, kind, prompt, options: choices, answer: value, answerForm: 'any', percentAnswer: false, writable: true, solution, meta, ...(graph ? { graph } : {}) }
}

/* ---------- Circuit 0: linear functions ---------- */

function proportionalQuestion(random: Random, tier: Tier): GraphsRaceQuestion | null {
    const m = pick(random, tier === 0 ? [2, 3, 4, 5] : [1.5, 2.5, -2, -3, 0.5, -1.5])
    const x = pick(random, tier === 0 ? [2, 3, 4] : [-4, -2, 2, 4, 6])
    const y = m * x
    const choices = options(random, m, [{ value: x / y, error: 'inverse-ratio' }, { value: -m, error: 'sign' }, { value: y - x, error: 'calculation' }, ...near(m)])
    return choices && build(0, 'proportional', say(
        `${math('y=mx')} zuzena ${math(point(x, y))} puntutik pasatzen da. Zenbat da ${math('m')}?`,
        `La recta ${math('y=mx')} pasa por ${math(point(x, y))}. ¿Cuánto vale ${math('m')}?`,
        `يمر المستقيم ${math('y=mx')} بالنقطة ${math(point(x, y))}. كم تساوي ${math('m')}؟`
    ), choices, m, same(`m=\\frac{${tex(y)}}{${tex(x)}}=${tex(m)}`), { x, y })
}

function xCutQuestion(random: Random, tier: Tier): GraphsRaceQuestion | null {
    const m = pick(random, tier === 0 ? [1, 2, 3] : [2, 3, -2, -3, 4, -4])
    const root = nonZero(random, -5, 5)
    const n = -m * root
    const choices = options(random, root, [{ value: n, error: 'y-intercept' }, { value: -root, error: 'sign-flip' }, { value: -m / n, error: 'inverse-ratio' }, ...near(root)])
    return choices && build(0, 'x-cut', say(
        `Non ebakitzen du ${math(`y=${polyLatex(0, m, n)}`)} zuzenak X ardatza? Eman ${math('x')}.`,
        `¿Dónde corta la recta ${math(`y=${polyLatex(0, m, n)}`)} al eje X? Da la ${math('x')}.`,
        `أين يقطع المستقيم ${math(`y=${polyLatex(0, m, n)}`)} محور X؟ أعطِ ${math('x')}.`
    ), choices, root, same(`${polyLatex(0, m, n)}=0\\to x=${tex(root)}`), { m, n })
}

const models = [
    { n: 30, m: 15, text: say('Malguki batek $y=30+15x$ neurtzen du ($x$ kg, $y$ cm).', 'Un muelle mide $y=30+15x$ ($x$ en kg, $y$ en cm).', 'طول نابض $y=30+15x$ ($x$ بالكغ و$y$ بالسم).'), xs: [2, 3, 4, 6], ask: say('Zenbat neurtzen du', '¿Cuánto mide con', 'كم طوله مع'), unit: 'kg' },
    { n: 32, m: 1.8, text: say('$y=32+1{,}8x$ formulak °C ($x$) °F ($y$) bihurtzen ditu.', 'La fórmula $y=32+1{,}8x$ pasa de °C ($x$) a °F ($y$).', 'تحوّل الصيغة $y=32+1{,}8x$ من °م ($x$) إلى °ف ($y$).'), xs: [10, 20, 25, 35, 40], ask: say('Zenbat °F dira', '¿Cuántos °F son', 'كم °ف تساوي'), unit: '°C' },
    { n: 3, m: 2, text: say('Mugikor bat $y=3+2x$ metrora dago ($x$ segundoak).', 'Un móvil está a $y=3+2x$ metros ($x$ en segundos).', 'متحرك على بعد $y=3+2x$ مترًا ($x$ بالثواني).'), xs: [5, 8, 12, 15], ask: say('Non dago', '¿Dónde está a los', 'أين يكون بعد'), unit: 's' }
] as const

function modelQuestion(random: Random, tier: Tier): GraphsRaceQuestion | null {
    const index = randomInt(random, 0, models.length - 1)
    const model = models[index]
    const x = pick(random, model.xs)
    const y = model.n + model.m * x
    if (tier > 0 && random() < 0.5) {
        // Backwards: the y is known, find the x
        const choices = options(random, x, [{ value: model.n + model.m * y, error: 'image-instead' }, { value: y / model.m, error: 'no-fixed' }, ...near(x)])
        return choices && build(0, 'model-back', say(
            `${model.text.eu} Zein ${math('x')}-rentzat da ${math(`y=${tex(y)}`)}?`,
            `${model.text.es} ¿Para qué ${math('x')} es ${math(`y=${tex(y)}`)}?`,
            `${model.text.ar} عند أي ${math('x')} يكون ${math(`y=${tex(y)}`)}؟`
        ), choices, x, same(`${tex(model.m)}x=${tex(y)}-${model.n}\\to x=${tex(x)}`), { model: index, y })
    }
    const choices = options(random, y, [{ value: model.m * x, error: 'no-fixed' }, { value: model.n * x + model.m, error: 'calculation' }, ...near(y)])
    return choices && build(0, 'model', say(
        `${model.text.eu} ${model.ask.eu} ${math(`x=${x}`)} denean?`,
        `${model.text.es} ${model.ask.es} ${math(`${x}`)} ${model.unit}?`,
        `${model.text.ar} ${model.ask.ar} ${math(`x=${x}`)}؟`
    ), choices, y, same(`${model.n}+${tex(model.m)}\\cdot ${x}=${tex(y)}`), { model: index, x })
}

/* ---------- Circuit 1: the equation of a line ---------- */

function slopeQuestion(random: Random, tier: Tier): GraphsRaceQuestion | null {
    const x1 = randomInt(random, -4, 3)
    const y1 = randomInt(random, -5, 5)
    const dx = pick(random, tier === 0 ? [1, 2] : [2, 4, 5, -2])
    const dy = nonZero(random, -8, 8)
    const m = dy / dx
    const [x2, y2] = [x1 + dx, y1 + dy]
    const choices = options(random, m, [{ value: dx / dy, error: 'inverse-ratio' }, { value: -m, error: 'order' }, { value: (y2 + y1) / (x2 + x1), error: 'sign' }, ...near(m)])
    return choices && build(1, 'slope', say(
        `Zein da ${math(point(x1, y1))} eta ${math(point(x2, y2))} puntuetatik pasatzen den zuzenaren malda?`,
        `¿Cuál es la pendiente de la recta que pasa por ${math(point(x1, y1))} y ${math(point(x2, y2))}?`,
        `ما ميل المستقيم المار بـ ${math(point(x1, y1))} و${math(point(x2, y2))}؟`
    ), choices, m, same(`m=\\frac{${tex(y2)}-${br(y1)}}{${tex(x2)}-${br(x1)}}=${tex(m)}`), { x1, y1, x2, y2 })
}

function interceptQuestion(random: Random, tier: Tier): GraphsRaceQuestion | null {
    const m = pick(random, tier === 0 ? [1, 2, 3, -1, -2] : [2, 3, -2, -3, 0.5, -0.5, 4])
    const x0 = nonZero(random, -4, 4)
    const y0 = randomInt(random, -6, 6)
    const n = y0 - m * x0
    const parallel = random() < 0.5
    const k = n + nonZero(random, -3, 3)
    const choices = options(random, n, [{ value: y0 + m * x0, error: 'sign' }, { value: y0, error: 'y-instead' }, { value: parallel ? k : x0 - m * y0, error: parallel ? 'calculation' : 'y-instead' }, ...near(n)])
    if (!choices) return null
    if (parallel) {
        return build(1, 'parallel', say(
            `Zuzen bat ${math(`y=${polyLatex(0, m, k)}`)} zuzenaren paraleloa da eta ${math(point(x0, y0))} puntutik pasatzen da. Zenbat da bere ${math('n')}?`,
            `Una recta es paralela a ${math(`y=${polyLatex(0, m, k)}`)} y pasa por ${math(point(x0, y0))}. ¿Cuánto vale su ${math('n')}?`,
            `مستقيم يوازي ${math(`y=${polyLatex(0, m, k)}`)} ويمر بـ ${math(point(x0, y0))}. كم تساوي ${math('n')} له؟`
        ), choices, n, same(`${tex(y0)}=${tex(m)}\\cdot ${br(x0)}+n\\to n=${tex(n)}`), { m, x0, y0 })
    }
    return build(1, 'intercept', say(
        `Zuzen bat ${math(point(x0, y0))} puntutik pasatzen da eta bere malda ${math(tex(m))} da. Zenbat da ${math('n')}?`,
        `Una recta pasa por ${math(point(x0, y0))} y tiene pendiente ${math(tex(m))}. ¿Cuánto vale ${math('n')}?`,
        `يمر مستقيم بـ ${math(point(x0, y0))} وميله ${math(tex(m))}. كم تساوي ${math('n')}؟`
    ), choices, n, same(`${tex(y0)}=${tex(m)}\\cdot ${br(x0)}+n\\to n=${tex(n)}`), { m, x0, y0 })
}

function meetQuestion(random: Random, tier: Tier): GraphsRaceQuestion | null {
    const x = randomInt(random, -4, 4)
    const y = randomInt(random, -5, 5)
    const m1 = pick(random, [1, 2, 3])
    const m2 = pick(random, tier === 0 ? [-1, -2] : [-1, -2, -3, 4, 5])
    if (m1 === m2) return null
    const n1 = y - m1 * x
    const n2 = y - m2 * x
    const choices = options(random, x, [{ value: y, error: 'y-instead' }, { value: -x, error: 'sign-flip' }, { value: (n2 + n1) / (m1 - m2), error: 'sign' }, ...near(x)])
    return choices && build(1, 'meet', say(
        `Non ebakitzen dute ${math(`y=${polyLatex(0, m1, n1)}`)} eta ${math(`y=${polyLatex(0, m2, n2)}`)} zuzenek? Eman ${math('x')}.`,
        `¿Dónde se cortan ${math(`y=${polyLatex(0, m1, n1)}`)} e ${math(`y=${polyLatex(0, m2, n2)}`)}? Da la ${math('x')}.`,
        `أين يتقاطع ${math(`y=${polyLatex(0, m1, n1)}`)} و${math(`y=${polyLatex(0, m2, n2)}`)}؟ أعطِ ${math('x')}.`
    ), choices, x, same(`${polyLatex(0, m1, n1)}=${polyLatex(0, m2, n2)}\\to x=${tex(x)}`), { m1, n1, m2, n2 })
}

/* ---------- Circuit 2: parabolas ---------- */

function quadValueQuestion(random: Random, tier: Tier): GraphsRaceQuestion | null {
    const a = pick(random, tier === 0 ? [1, -1] : [2, -2, 3, 0.5, -3])
    const b = randomInt(random, -4, 4)
    const c = randomInt(random, -5, 5)
    const k = randomInt(random, -4, -1)
    const answer = a * k * k + b * k + c
    const choices = options(random, answer, [{ value: -a * k * k + b * k + c, error: 'sign-square' }, { value: a * k * k - b * k + c, error: 'sign' }, ...near(answer)])
    return choices && build(2, 'quad-value', say(
        `${math(`y=${polyLatex(a, b, c)}`)} parabolan, zenbat da ${math('y')} ${math(`x=${k}`)} denean?`,
        `En la parábola ${math(`y=${polyLatex(a, b, c)}`)}, ¿cuánto vale ${math('y')} para ${math(`x=${k}`)}?`,
        `في القطع ${math(`y=${polyLatex(a, b, c)}`)}، كم تساوي ${math('y')} عند ${math(`x=${k}`)}؟`
    ), choices, answer, same(`${br(k)}^{2}=${k * k}\\to y=${tex(answer)}`), { a, b, c, k })
}

function vertexQuestion(random: Random, tier: Tier): GraphsRaceQuestion | null {
    const a = pick(random, tier === 0 ? [1] : [1, -1, 2, -2])
    const p = nonZero(random, -4, 4)
    const q = randomInt(random, -6, 6)
    const b = -2 * a * p
    const c = a * p * p + q
    const formula = `y=${polyLatex(a, b, c)}`
    if (random() < 0.5) {
        const choices = options(random, p, [{ value: -p, error: 'sign-flip' }, { value: -b / a, error: 'no-half' }, { value: q, error: 'y-instead' }, ...near(p)])
        return choices && build(2, 'vertex-x', say(
            `Zein da ${math(formula)} parabolaren erpinaren abszisa?`,
            `¿Cuál es la abscisa del vértice de ${math(formula)}?`,
            `ما فاصلة رأس ${math(formula)}؟`
        ), choices, p, same(`x_V=\\frac{${tex(-b)}}{${tex(2 * a)}}=${tex(p)}`), { a, b, c })
    }
    const choices = options(random, q, [{ value: c, error: 'y-intercept' }, { value: p, error: 'y-instead' }, { value: a * p * p - b * p + c, error: 'sign' }, ...near(q)])
    return choices && build(2, 'vertex-y', say(
        `Zein da ${math(formula)} parabolaren erpinaren ordenatua?`,
        `¿Cuál es la ordenada del vértice de ${math(formula)}?`,
        `ما ترتيبة رأس ${math(formula)}؟`
    ), choices, q, same(`x_V=${tex(p)}\\to y_V=${tex(q)}`), { a, b, c })
}

function rootsQuestion(random: Random): GraphsRaceQuestion | null {
    const r1 = randomInt(random, -5, 3)
    const r2 = r1 + randomInt(random, 1, 6)
    const b = -(r1 + r2)
    const c = r1 * r2
    const choices = options(random, r2, [{ value: -r2, error: 'sign-flip' }, { value: c, error: 'y-intercept' }, { value: r1, error: 'calculation' }, ...near(r2)])
    return choices && build(2, 'roots', say(
        `${math(`y=${polyLatex(1, b, c)}`)} parabolak X ardatza bi puntutan ebakitzen du. Zein da handiena?`,
        `La parábola ${math(`y=${polyLatex(1, b, c)}`)} corta al eje X en dos puntos. ¿Cuál es el mayor?`,
        `يقطع القطع ${math(`y=${polyLatex(1, b, c)}`)} محور X في نقطتين. ما الأكبر؟`
    ), choices, r2, same(`${polyLatex(1, b, c)}=(x${r1 > 0 ? '-' : '+'}${Math.abs(r1)})(x${r2 > 0 ? '-' : '+'}${Math.abs(r2)})`.replace(/\+0\)/g, ')').replace(/-0\)/g, ')')), { b, c })
}

function graphCQuestion(random: Random): GraphsRaceQuestion | null {
    const p = nonZero(random, -2, 2)
    const q = randomInt(random, -4, 1)
    const c = p * p + q
    if (c > 5) return null
    const graph: GraphSpec = { box: { xMin: -4, xMax: 4, yMin: -5, yMax: 6 }, cell: 26, curves: [{ points: sampled((x) => (x - p) ** 2 + q, -4, 4) }], points: [{ at: [p, q], name: 'V', color: 'second', below: true }] }
    const choices = options(random, c, [{ value: q, error: 'y-instead' }, { value: -c, error: 'sign' }, { value: p, error: 'y-instead' }, ...near(c)])
    return choices && build(2, 'graph-c', say(
        `Grafikoa ${math('y=x^{2}+bx+c')} da. Zenbat da ${math('c')}?`,
        `La gráfica es ${math('y=x^{2}+bx+c')}. ¿Cuánto vale ${math('c')}?`,
        `البيان هو ${math('y=x^{2}+bx+c')}. كم تساوي ${math('c')}؟`
    ), choices, c, say(
        `${math('c')} Y ardatzeko ebakidura da: ${math(point(0, c))}.`,
        `${math('c')} es el corte con el eje Y: ${math(point(0, c))}.`,
        `${math('c')} هو التقاطع مع محور Y: ${math(point(0, c))}.`
    ), { p, q }, graph)
}

/* ---------- Circuit 3: inverse and radical functions ---------- */

function kQuestion(random: Random, tier: Tier): GraphsRaceQuestion | null {
    const x = pick(random, tier === 0 ? [2, 3, 4] : [-4, -3, -2, 2, 5, 0.5])
    const y = pick(random, tier === 0 ? [2, 3, 5, 6] : [-3, -2, 4, 6, 8])
    const k = x * y
    const choices = options(random, k, [{ value: y / x, error: 'inverse-ratio' }, { value: x + y, error: 'calculation' }, { value: -k, error: 'sign' }, ...near(k)])
    return choices && build(3, 'k', say(
        `${math('y=\\frac{k}{x}')} hiperbola ${math(point(x, y))} puntutik pasatzen da. Zenbat da ${math('k')}?`,
        `La hipérbola ${math('y=\\frac{k}{x}')} pasa por ${math(point(x, y))}. ¿Cuánto vale ${math('k')}?`,
        `يمر القطع ${math('y=\\frac{k}{x}')} بالنقطة ${math(point(x, y))}. كم تساوي ${math('k')}؟`
    ), choices, k, same(`k=${tex(x)}\\cdot ${br(y)}=${tex(k)}`), { x, y })
}

function inverseProblemQuestion(random: Random): GraphsRaceQuestion | null {
    const workers = pick(random, [2, 3, 4, 6])
    const hours = pick(random, [6, 8, 12, 15])
    const total = workers * hours
    const more = pick(random, [3, 4, 5, 6, 8, 10, 12].filter((value) => value !== workers && total % value === 0))
    if (!more) return null
    const answer = total / more
    const choices = options(random, answer, [{ value: (hours * more) / workers, error: 'direct' }, { value: hours - (more - workers), error: 'calculation' }, ...near(answer)])
    return choices && build(3, 'inverse-problem', say(
        `${math(String(workers))} langilek ${math(String(hours))} orduan egiten dute lan bat. Zenbat ordu beharko dituzte ${math(String(more))} langilek?`,
        `${math(String(workers))} trabajadores hacen un trabajo en ${math(String(hours))} horas. ¿Cuántas horas tardarán ${math(String(more))} trabajadores?`,
        `ينجز ${math(String(workers))} عمال عملًا في ${math(String(hours))} ساعات. كم ساعة يحتاج ${math(String(more))} عمال؟`
    ), choices, answer, same(`k=${workers}\\cdot ${hours}=${total}\\to y=\\frac{${total}}{${more}}=${tex(answer)}`), { workers, hours, more })
}

function asymptoteQuestion(random: Random): GraphsRaceQuestion | null {
    const k = nonZero(random, -5, 5)
    const a = nonZero(random, -5, 5)
    const b = nonZero(random, -4, 4)
    if (Math.abs(a) === Math.abs(b)) return null
    const formula = `y=\\frac{${k}}{${polyLatex(0, 1, -a)}}${b > 0 ? '+' : '-'}${Math.abs(b)}`
    if (random() < 0.5) {
        const choices = options(random, a, [{ value: -a, error: 'sign-flip' }, { value: b, error: 'horizontal' }, { value: k, error: 'calculation' }, ...near(a)])
        return choices && build(3, 'vertical', say(
            `Zein da ${math(formula)} funtzioaren asintota bertikala? Idatzi ${math('x')}.`,
            `¿Cuál es la asíntota vertical de ${math(formula)}? Escribe la ${math('x')}.`,
            `ما المقارب الرأسي لـ ${math(formula)}؟ اكتب ${math('x')}.`
        ), choices, a, same(`${polyLatex(0, 1, -a)}=0\\to x=${a}`), { k, a, b })
    }
    const choices = options(random, b, [{ value: a, error: 'vertical' }, { value: -b, error: 'sign' }, { value: k, error: 'calculation' }, ...near(b)])
    return choices && build(3, 'horizontal', say(
        `Zein da ${math(formula)} funtzioaren asintota horizontala? Idatzi ${math('y')}.`,
        `¿Cuál es la asíntota horizontal de ${math(formula)}? Escribe la ${math('y')}.`,
        `ما المقارب الأفقي لـ ${math(formula)}؟ اكتب ${math('y')}.`
    ), choices, b, same(`y=${b}`), { k, a, b })
}

function rootQuestion(random: Random, tier: Tier): GraphsRaceQuestion | null {
    const shift = nonZero(random, -6, 6)
    const inside = polyLatex(0, 1, shift)
    if (tier === 0 || random() < 0.5) {
        const start = -shift
        const choices = options(random, start, [{ value: shift, error: 'sign-flip' }, { value: 0, error: 'calculation' }, ...near(start)])
        return choices && build(3, 'root-domain', say(
            `${math(`y=\\sqrt{${inside}}`)} funtzioaren izate-eremua ${math('[a,\\,+\\infty)')} da. Zenbat da ${math('a')}?`,
            `El dominio de ${math(`y=\\sqrt{${inside}}`)} es ${math('[a,\\,+\\infty)')}. ¿Cuánto vale ${math('a')}?`,
            `مجال ${math(`y=\\sqrt{${inside}}`)} هو ${math('[a,\\,+\\infty)')}. كم تساوي ${math('a')}؟`
        ), choices, start, same(`${inside}\\ge 0\\to x\\ge ${start}`), { shift })
    }
    const root = randomInt(random, 1, 6)
    const x = root * root - shift
    const plusB = randomInt(random, -3, 3)
    const answer = root + plusB
    const choices = options(random, answer, [{ value: root * root + plusB, error: 'no-root' }, { value: plusB - root, error: 'sign' }, ...near(answer)])
    const formula = `y=${plusB === 0 ? '' : `${plusB}+`}\\sqrt{${inside}}`
    return choices && build(3, 'root-value', say(
        `${math(formula)} bada, zenbat da ${math('y')} ${math(`x=${x}`)} denean?`,
        `Si ${math(formula)}, ¿cuánto vale ${math('y')} para ${math(`x=${x}`)}?`,
        `إذا كانت ${math(formula)} فكم تساوي ${math('y')} عند ${math(`x=${x}`)}؟`
    ), choices, answer, same(`\\sqrt{${root * root}}=${root}\\to y=${tex(answer)}`), { shift, x, plusB })
}

/* ---------- Circuit 4: exponentials and models ---------- */

function exponentialQuestion(random: Random, tier: Tier): GraphsRaceQuestion | null {
    const base = pick(random, tier === 0 ? [2, 3] : [2, 3, 0.5, 4])
    const k = pick(random, tier === 0 ? [1, 2, 3] : [1, 2, 3, 5])
    const x = tier === 0 ? randomInt(random, 1, 3) : randomInt(random, -3, 3)
    const answer = k * base ** x
    const choices = options(random, answer, [{ value: k * base * x, error: 'times-x' }, { value: (k * base) ** x, error: 'calculation' }, { value: -answer, error: 'sign' }, ...near(answer)])
    const formula = `y=${k === 1 ? '' : `${k}\\cdot `}${base === 0.5 ? '\\left(\\frac{1}{2}\\right)' : base}^{x}`
    return choices && build(4, 'exponential', say(
        `${math(formula)} funtzioan, zenbat da ${math('y')} ${math(`x=${x}`)} denean?`,
        `En ${math(formula)}, ¿cuánto vale ${math('y')} para ${math(`x=${x}`)}?`,
        `في ${math(formula)}، كم تساوي ${math('y')} عند ${math(`x=${x}`)}؟`
    ), choices, answer, same(`${k === 1 ? '' : `${k}\\cdot `}${base === 0.5 ? '\\left(\\frac{1}{2}\\right)' : base}^{${x}}=${tex(answer)}`), { k, base, x })
}

function growthQuestion(random: Random, tier: Tier): GraphsRaceQuestion | null {
    const percent = pick(random, [10, 20, 50])
    const years = tier === 0 ? 2 : pick(random, [2, 3])
    const start = pick(random, [1000, 2000, 500])
    const up = random() < 0.6
    const factor = up ? 1 + percent / 100 : 1 - percent / 100
    const answer = start * factor ** years
    const other = start * (up ? 1 - percent / 100 : 1 + percent / 100) ** years
    const simple = start * (1 + (up ? 1 : -1) * (percent * years) / 100)
    const choices = options(random, answer, [{ value: simple, error: 'simple' }, { value: other, error: 'wrong-way' }, { value: start * factor, error: 'calculation' }, ...near(answer, 10)])
    const thing = up
        ? say(`Populazio bat ${math(String(start))} biztanlekoa da eta urtero % ${percent} hazten da.`, `Una población de ${math(String(start))} habitantes crece un ${percent} % cada año.`, `يبلغ عدد سكان ${math(String(start))} نسمة ويزيد ${percent} % كل سنة.`)
        : say(`Makina batek ${math(String(start))} € balio du eta urtero bere balioaren % ${percent} galtzen du.`, `Una máquina vale ${math(String(start))} € y pierde cada año el ${percent} % de su valor.`, `قيمة آلة ${math(String(start))} € وتفقد كل سنة ${percent} % من قيمتها.`)
    return choices && build(4, up ? 'growth' : 'decay', say(
        `${thing.eu} Zenbat izango da ${math(String(years))} urte barru?`,
        `${thing.es} ¿Cuánto será dentro de ${math(String(years))} años?`,
        `${thing.ar} كم ستصبح بعد ${math(String(years))} سنوات؟`
    ), choices, answer, same(`${start}\\cdot ${tex(factor)}^{${years}}=${tex(answer)}`), { start, factor, years })
}

function baseQuestion(random: Random): GraphsRaceQuestion | null {
    const k = pick(random, [2, 3, 4, 5, 10])
    const base = pick(random, [1.2, 1.5, 2, 3, 0.5, 0.8])
    const y1 = k * base
    const choices = options(random, base, [{ value: y1 - k, error: 'difference' }, { value: k / y1, error: 'inverse-ratio' }, { value: y1, error: 'y-instead' }, ...near(base, 0.1)])
    return choices && build(4, 'base', say(
        `${math('y=k\\cdot a^{x}')} funtzioa ${math(point(0, k))} eta ${math(point(1, y1))} puntuetatik pasatzen da. Zenbat da ${math('a')}?`,
        `La función ${math('y=k\\cdot a^{x}')} pasa por ${math(point(0, k))} y ${math(point(1, y1))}. ¿Cuánto vale ${math('a')}?`,
        `تمر الدالة ${math('y=k\\cdot a^{x}')} بـ ${math(point(0, k))} و${math(point(1, y1))}. كم تساوي ${math('a')}؟`
    ), choices, base, same(`k=${k}\\to a=\\frac{${tex(y1)}}{${k}}=${tex(base)}`), { k, y1 })
}

function maxAreaQuestion(random: Random): GraphsRaceQuestion | null {
    const perimeter = pick(random, [8, 12, 16, 20, 24, 28, 36, 40])
    const side = perimeter / 4
    const answer = side * side
    const choices = options(random, answer, [{ value: (perimeter / 2) ** 2, error: 'no-square' }, { value: side, error: 'y-instead' }, { value: (side - 1) * (side + 1), error: 'calculation' }, ...near(answer)])
    return choices && build(4, 'max-area', say(
        `${math(String(perimeter))} m-ko hesi batekin laukizuzen bat itxi nahi da. Zenbat da azalera handiena (m²)?`,
        `Con ${math(String(perimeter))} m de valla se cierra un rectángulo. ¿Cuál es el área máxima (m²)?`,
        `نحيط مستطيلًا بسياج طوله ${math(String(perimeter))} م. ما أكبر مساحة (م²)؟`
    ), choices, answer, same(`A=x\\,(${perimeter / 2}-x)\\to x_V=${side}\\to A=${side}^{2}=${answer}`), { perimeter })
}

type Generator = (random: Random, tier: Tier) => GraphsRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [proportionalQuestion, xCutQuestion, modelQuestion, modelQuestion],
    [slopeQuestion, slopeQuestion, interceptQuestion, meetQuestion],
    [quadValueQuestion, vertexQuestion, vertexQuestion, rootsQuestion, graphCQuestion],
    [kQuestion, inverseProblemQuestion, asymptoteQuestion, rootQuestion],
    [exponentialQuestion, growthQuestion, growthQuestion, baseQuestion, maxAreaQuestion]
]

export function generateGraphsRaceQuestion(random: Random, circuit: number, tier: Tier): GraphsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkGraphsPitAnswer(question: RaceQuestion<GraphsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function graphsParTime(circuit: number): number {
    return parTimeFor([11, 13, 13, 12, 13][circuit] ?? 12)
}

export const graphsRaceErrorTips: Record<GraphsRaceError, LocalizedText> = {
    'inverse-ratio': say('Zatiketa alderantziz egin duzu: malda y : x da (Δy : Δx), eta k = x · y.', 'Has dividido al revés: la pendiente es y : x (Δy : Δx), y k = x · y.', 'قسمت بالعكس: الميل y : x ‏(Δy : Δx)، وk = x · y.'),
    sign: say('Kontuz zeinuekin: − bider − = +.', 'Cuidado con los signos: − por − = +.', 'انتبه للإشارات: − في − = +.'),
    'sign-flip': say('Zeinua aldatu zaizu: x − 3 = 0 bada, x = 3; x + 3 = 0 bada, x = −3.', 'Se te ha cambiado el signo: si x − 3 = 0, x = 3; si x + 3 = 0, x = −3.', 'تغيّرت الإشارة: إذا كان x − 3 = 0 فإن x = 3، وإذا كان x + 3 = 0 فإن x = −3.'),
    'y-intercept': say('Hori Y ardatzeko ebakidura da (x = 0); X ardatzean y = 0 jarri.', 'Eso es el corte con el eje Y (x = 0); para el eje X pon y = 0.', 'هذا التقاطع مع محور Y ‏(x = 0)؛ لمحور X ضع y = 0.'),
    'no-fixed': say('Ahaztu duzu hasierako balioa, n.', 'Te has olvidado del valor inicial, n.', 'نسيت القيمة الابتدائية n.'),
    'image-instead': say('Irudia kalkulatu duzu; x-a eskatzen da: ebatzi ekuazioa.', 'Has calculado la imagen; se pide la x: resuelve la ecuación.', 'حسبت الصورة؛ والمطلوب x: حُلّ المعادلة.'),
    order: say('Kendu ordena berean goian eta behean: (y₂ − y₁) : (x₂ − x₁).', 'Resta en el mismo orden arriba y abajo: (y₂ − y₁) : (x₂ − x₁).', 'اطرح بالترتيب نفسه في البسط والمقام: (y₂ − y₁) : (x₂ − x₁).'),
    'y-instead': say('Beste koordenatua edo beste datu bat eman duzu: begiratu zer eskatzen den.', 'Has dado la otra coordenada u otro dato: mira qué se pide.', 'أعطيت الإحداثي الآخر أو معطى آخر: انظر إلى المطلوب.'),
    'sign-square': say('Ordeztu parentesi artean: (−3)² = 9, ez −9.', 'Sustituye entre paréntesis: (−3)² = 9, no −9.', 'عوّض بين قوسين: (−3)² = 9 لا −9.'),
    'no-half': say('Erpina: x = −b : 2a. Ez ahaztu 2a-z zatitzea.', 'Vértice: x = −b : 2a. No olvides dividir entre 2a.', 'الرأس: x = −b : 2a. لا تنسَ القسمة على 2a.'),
    direct: say('Langile gehiagok denbora gutxiago behar dute: alderantzizkoa da, x · y = k.', 'Más trabajadores tardan menos: es inversa, x · y = k.', 'عمال أكثر يحتاجون وقتًا أقل: إنه تناسب عكسي x · y = k.'),
    horizontal: say('Hori asintota horizontala da (y = b); bertikala izendatzailea 0 egiten duen x da.', 'Esa es la asíntota horizontal (y = b); la vertical es la x que anula el denominador.', 'هذا المقارب الأفقي (y = b)؛ والرأسي هو x الذي يعدم المقام.'),
    vertical: say('Hori asintota bertikala da; horizontala batzen den zenbakia da.', 'Esa es la asíntota vertical; la horizontal es el número que se suma.', 'هذا المقارب الرأسي؛ والأفقي هو العدد المضاف.'),
    'no-root': say('Ahaztu duzu erro karratua ateratzea.', 'Te has olvidado de hacer la raíz cuadrada.', 'نسيت حساب الجذر التربيعي.'),
    'times-x': say('aˣ ez da a · x: a bider a, x aldiz.', 'aˣ no es a · x: es a por a, x veces.', 'aˣ ليست a · x: إنها a في a بعدد x من المرات.'),
    simple: say('Ehunekoa urtero aurreko balioari aplikatzen zaio: biderkatu (1 ± p/100)ⁿ.', 'El porcentaje se aplica cada año sobre el valor anterior: multiplica por (1 ± p/100)ⁿ.', 'تُطبّق النسبة كل سنة على القيمة السابقة: اضرب في (1 ± p/100)ⁿ.'),
    'wrong-way': say('Igotzea 1 + p/100 da; jaistea 1 − p/100.', 'Subir es 1 + p/100; bajar es 1 − p/100.', 'الزيادة 1 + p/100؛ والنقصان 1 − p/100.'),
    difference: say('Oinarria zatiketa da, ez kenketa: a = y(1) : y(0).', 'La base es un cociente, no una resta: a = y(1) : y(0).', 'الأساس خارج قسمة لا فرق: a = y(1) : y(0).'),
    'no-square': say('Perimetroaren erdia oinarria + altuera da; maximoa karratua da, P : 4 aldekoa.', 'El semiperímetro es base + altura; el máximo es el cuadrado de lado P : 4.', 'نصف المحيط = القاعدة + الارتفاع؛ والأكبر هو المربع الذي ضلعه P : 4.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
