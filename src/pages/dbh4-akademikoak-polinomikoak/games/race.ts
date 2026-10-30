import { checkAnswer, fraction, toLatex, toText, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readFunctionsAnswer } from '../../dbh4-akademikoak-funtzioak/answers.ts'
import { polynomialLatex } from '../../dbh4-akademikoak-funtzioak/games/race.ts'
import { same, say } from '../../dbh4-akademikoak-funtzioak/text.ts'

/* ==========================================================================
   Funtzio polinomiko eta arrazionalen lasterketa (4. DBH akademikoak):
   five circuits, one per stage — lines (the slope through two points, the
   intercept of a line through a point, where a line cuts the X axis),
   parabolas (the x of the vertex, the extreme value, the largest root),
   translations and intersections (the q of the vertex form, the a of a
   parabola through its vertex and a point, where a line meets y = x², the
   n of a tangent), absolute values (an image, the peak of a V, the
   largest solution of |x − a| = b, the relative maximum of |x² + bx + c|)
   and rational functions (k of a hyperbola, an inverse proportion, the
   asymptotes of (ax + b)/(cx + d)). Wrong options are typical mistakes:
   Δx over Δy, the points subtracted in different orders, the sign of a
   root, b/a without the 2, the vertex x for its y, the constant term, the
   square forgotten, the absolute value forgotten, the smaller solution,
   x / y for x · y, a direct proportion, the two asymptotes swapped. Every
   answer is one number, so every question can be written at the pit stop;
   every question carries `meta`, the numbers of its prompt, so the test
   recomputes the answer.
   ========================================================================== */

export const POLYNOMIAL_AK_RACE_CIRCUITS = 5

export type PolynomialAkRaceError =
    | 'inverted'
    | 'order'
    | 'sign'
    | 'point-y'
    | 'root-sign'
    | 'half'
    | 'vertex-x'
    | 'constant'
    | 'no-square'
    | 'no-abs'
    | 'smaller'
    | 'divide'
    | 'direct'
    | 'swap'
    | 'calculation'

export type PolynomialAkRaceQuestion = RaceQuestion<PolynomialAkRaceError> & { meta: Record<string, number> }

const math = (latex: string) => `$${latex}$`
const f = (value: number) => fraction(value)

/* ---------- Options ---------- */

interface Choice {
    latex: string
    /** What makes two options the same answer */
    key: string
}

interface Candidate extends Choice {
    error: PolynomialAkRaceError
}

const ofNumber = (value: FractionValue): Choice => ({ latex: toLatex(value), key: `n${toText(value)}` })
const wrong = (value: FractionValue, error: PolynomialAkRaceError): Candidate => ({ ...ofNumber(value), error })
const nearNumbers = (value: number): Candidate[] => [1, -1, 2, -2, 3].map((step) => wrong(f(value + step), 'calculation'))

/** The right option and three mistakes with different answers */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<PolynomialAkRaceError>[] | null {
    const answer = ofNumber(right)
    const picked: Candidate[] = []
    for (const candidate of candidates) {
        if (picked.length === 3) break
        if ([answer, ...picked].some((other) => other.key === candidate.key)) continue
        picked.push(candidate)
    }
    if (picked.length < 3) return null
    return shuffle(random, [{ latex: answer.latex, correct: true, error: null }, ...picked.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<PolynomialAkRaceError>[] | null, answer: FractionValue, solution: string, meta: Record<string, number>): PolynomialAkRaceQuestion | null {
    if (!choices) return null
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution: same(math(solution)), meta }
}

const nonZero = (random: Random, size: number) => {
    const value = randomInt(random, 1, size)
    return random() < 0.5 ? -value : value
}
const reach = (tier: Tier) => [3, 4, 5][tier]
/** A number in parentheses when negative, for substitutions */
const paren = (value: number) => (value < 0 ? `(${value})` : String(value))
/** x − d written as x-3, x+2 or x */
const shifted = (d: number) => (d === 0 ? 'x' : d > 0 ? `x-${d}` : `x+${-d}`)
/** a − b with the sign of b folded in: 5-(-2) becomes 5+2 */
const minus = (a: number, b: number) => `${a}${b < 0 ? `+${-b}` : `-${b}`}`
const point = (x: number, y: number) => `(${x},\\,${y})`

/* ---------- Circuit 0: lines ---------- */

function slopeQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const m = nonZero(random, tier === 2 ? 4 : 3)
    const x1 = randomInt(random, -4, 3)
    const dx = randomInt(random, 2, 3)
    const y1 = randomInt(random, -5, 5)
    const x2 = x1 + dx
    const y2 = y1 + m * dx
    return build(0, 'slope', say(
        `Zein da ${math(point(x1, y1))} eta ${math(point(x2, y2))} puntuetatik pasatzen den zuzenaren malda?`,
        `¿Cuál es la pendiente de la recta que pasa por ${math(point(x1, y1))} y ${math(point(x2, y2))}?`,
        `ما ميل المستقيم المار بـ ${math(point(x1, y1))} و${math(point(x2, y2))}؟`, `What is the slope of the straight line through ${math(point(x1, y1))} and ${math(point(x2, y2))}?`
    ), options(random, f(m), [
        wrong(fraction(dx, m * dx), 'inverted'),
        wrong(f(-m), 'order'),
        ...nearNumbers(m)
    ]), f(m), `m=\\frac{${minus(y2, y1)}}{${minus(x2, x1)}}=\\frac{${y2 - y1}}{${dx}}=${m}`, { x1, y1, x2, y2 })
}

function interceptQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const m = nonZero(random, tier === 0 ? 3 : 4)
    const x0 = nonZero(random, reach(tier))
    const y0 = randomInt(random, -6, 6)
    const n = y0 - m * x0
    if (y0 === n) return null
    return build(0, 'intercept', say(
        `Zuzen batek ${math(`m=${m}`)} malda du eta ${math(point(x0, y0))} puntutik pasatzen da. Zein da haren jatorriko ordenatua?`,
        `Una recta tiene pendiente ${math(`m=${m}`)} y pasa por ${math(point(x0, y0))}. ¿Cuál es su ordenada en el origen?`,
        `مستقيم ميله ${math(`m=${m}`)} ويمر بـ ${math(point(x0, y0))}. ما الجزء المقطوع من محور Y؟`, `A straight line has slope ${math(`m=${m}`)} and passes through ${math(point(x0, y0))}. What is its y-intercept?`
    ), options(random, f(n), [
        wrong(f(y0 + m * x0), 'sign'),
        wrong(f(y0), 'point-y'),
        ...nearNumbers(n)
    ]), f(n), `n=${y0}-${paren(m)}\\cdot ${paren(x0)}=${n}`, { m, x0, y0 })
}

function xCutQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const m = nonZero(random, tier === 0 ? 2 : 4)
    const root = nonZero(random, reach(tier))
    const n = -m * root
    if (Math.abs(m) === 1 && Math.abs(root) === 1) return null
    return build(0, 'x-cut', say(
        `Zein abszisatan ebakitzen du ${math(`y=${polynomialLatex([m, n])}`)} zuzenak X ardatza?`,
        `¿En qué abscisa corta la recta ${math(`y=${polynomialLatex([m, n])}`)} al eje X?`,
        `عند أي إحداثي سيني يقطع المستقيم ${math(`y=${polynomialLatex([m, n])}`)} محور X؟`, `At what x-coordinate does the straight line ${math(`y=${polynomialLatex([m, n])}`)} cross the x-axis?`
    ), options(random, f(root), [
        wrong(f(-root), 'root-sign'),
        wrong(fraction(-m, n), 'inverted'),
        wrong(f(n), 'constant'),
        ...nearNumbers(root)
    ]), f(root), `${polynomialLatex([m, n])}=0\\ \\to\\ x=${root}`, { m, n })
}

/* ---------- Circuit 1: parabolas ---------- */

function vertexXQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const a = tier === 0 ? 1 : nonZero(random, 2)
    const h = nonZero(random, reach(tier))
    const b = -2 * a * h
    const c = randomInt(random, -6, 6)
    return build(1, 'vertex-x', say(
        `Zein da ${math(`y=${polynomialLatex([a, b, c])}`)} parabolaren erpinaren abszisa?`,
        `¿Cuál es la abscisa del vértice de ${math(`y=${polynomialLatex([a, b, c])}`)}?`,
        `ما الإحداثي السيني لرأس ${math(`y=${polynomialLatex([a, b, c])}`)}؟`, `What is the x-coordinate of the vertex of ${math(`y=${polynomialLatex([a, b, c])}`)}?`
    ), options(random, f(h), [
        wrong(f(-h), 'root-sign'),
        wrong(f(2 * h), 'half'),
        ...nearNumbers(h)
    ]), f(h), `x_v=\\frac{${-b}}{${2 * a}}=${h}`, { a, b, c })
}

function extremeQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const a = pick(random, [1, -1])
    const h = nonZero(random, reach(tier))
    const k = randomInt(random, -6, 6)
    const c = a * h * h + k
    if (c === k || h === k || k === 0) return null
    return build(1, 'extreme', say(
        `Zein da ${math(`y=${polynomialLatex([a, -2 * a * h, c])}`)} funtzioaren ${a > 0 ? 'balio minimoa' : 'balio maximoa'}?`,
        `¿Cuál es el valor ${a > 0 ? 'mínimo' : 'máximo'} de ${math(`y=${polynomialLatex([a, -2 * a * h, c])}`)}?`,
        `ما القيمة ${a > 0 ? 'الصغرى' : 'العظمى'} لـ ${math(`y=${polynomialLatex([a, -2 * a * h, c])}`)}؟`, `What is the ${a > 0 ? 'minimum' : 'maximum'} value of ${math(`y=${polynomialLatex([a, -2 * a * h, c])}`)}?`
    ), options(random, f(k), [
        wrong(f(h), 'vertex-x'),
        wrong(f(c), 'constant'),
        wrong(f(-k), 'sign'),
        ...nearNumbers(k)
    ]), f(k), `x_v=${h}\\qquad y_v=${a > 0 ? '' : '-'}${paren(h)}^{2}${-2 * a * h >= 0 ? '+' : '-'}${Math.abs(2 * a * h)}\\cdot ${paren(h)}${c >= 0 ? '+' : '-'}${Math.abs(c)}=${k}`, { a, h, k })
}

function largestRootQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const r = randomInt(random, -reach(tier), reach(tier))
    const s = randomInt(random, -reach(tier), reach(tier))
    if (r === s || r === -s) return null
    const b = -(r + s)
    const c = r * s
    const big = Math.max(r, s)
    return build(1, 'largest-root', say(
        `${math(`y=${polynomialLatex([1, b, c])}`)} parabolak bi puntutan ebakitzen du X ardatza. Zein da handienaren abszisa?`,
        `La parábola ${math(`y=${polynomialLatex([1, b, c])}`)} corta al eje X en dos puntos. ¿Cuál es la abscisa del mayor?`,
        `يقطع القطع ${math(`y=${polynomialLatex([1, b, c])}`)} محور X في نقطتين. ما الإحداثي السيني للأكبر؟`, `The parabola ${math(`y=${polynomialLatex([1, b, c])}`)} crosses the x-axis at two points. What is the x-coordinate of the larger one?`
    ), options(random, f(big), [
        wrong(f(-big), 'root-sign'),
        wrong(f(Math.min(r, s)), 'smaller'),
        wrong(f(c), 'constant'),
        ...nearNumbers(big)
    ]), f(big), `${polynomialLatex([1, b, c])}=0\\ \\to\\ x=${Math.min(r, s)},\\ x=${big}`, { b, c })
}

/* ---------- Circuit 2: translations and intersections ---------- */

function vertexFormQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const h = nonZero(random, reach(tier))
    const c = randomInt(random, -6, 8)
    const q = c - h * h
    if (q === c || q === -h || q === h) return null
    return build(2, 'vertex-form', say(
        `${math(`y=${polynomialLatex([1, -2 * h, c])}`)} idatzi ${math('y=(x-p)^{2}+q')} forman. Zenbat da ${math('q')}?`,
        `Escribe ${math(`y=${polynomialLatex([1, -2 * h, c])}`)} como ${math('y=(x-p)^{2}+q')}. ¿Cuánto vale ${math('q')}?`,
        `اكتب ${math(`y=${polynomialLatex([1, -2 * h, c])}`)} على صورة ${math('y=(x-p)^{2}+q')}. كم قيمة ${math('q')}؟`, `Write ${math(`y=${polynomialLatex([1, -2 * h, c])}`)} as ${math('y=(x-p)^{2}+q')}. What is ${math('q')}?`
    ), options(random, f(q), [
        wrong(f(c), 'constant'),
        wrong(f(h), 'vertex-x'),
        wrong(f(c + h * h), 'sign'),
        ...nearNumbers(q)
    ]), f(q), `y=(${shifted(h)})^{2}${q >= 0 ? '+' : '-'}${Math.abs(q)}`, { h, c })
}

function fitQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const a = nonZero(random, tier === 0 ? 1 : 3)
    const p = randomInt(random, -3, 3)
    const q = randomInt(random, -4, 4)
    const d = pick(random, [2, -2, 3, -3])
    const x0 = p + d
    const y0 = q + a * d * d
    if (Math.abs(y0) > 30) return null
    return build(2, 'fit-a', say(
        `Parabola baten erpina ${math(point(p, q))} da eta ${math(point(x0, y0))} puntutik pasatzen da. Zenbat da ${math('a')}?`,
        `Una parábola tiene el vértice en ${math(point(p, q))} y pasa por ${math(point(x0, y0))}. ¿Cuánto vale ${math('a')}?`,
        `قطع مكافئ رأسه ${math(point(p, q))} ويمر بـ ${math(point(x0, y0))}. كم قيمة ${math('a')}؟`, `A parabola has its vertex at ${math(point(p, q))} and passes through ${math(point(x0, y0))}. What is ${math('a')}?`
    ), options(random, f(a), [
        wrong(fraction(y0 - q, d), 'no-square'),
        wrong(f(-a), 'sign'),
        ...nearNumbers(a)
    ]), f(a), `${y0}=a\\cdot ${paren(d)}^{2}${q >= 0 ? '+' : '-'}${Math.abs(q)}\\ \\to\\ a=${a}`, { p, q, x0, y0 })
}

function meetQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const r = randomInt(random, -reach(tier), reach(tier))
    const s = randomInt(random, -reach(tier), reach(tier))
    if (r === s || r === -s) return null
    // x² = mx + n has the roots r and s
    const m = r + s
    const n = -r * s
    const big = Math.max(r, s)
    if (n === 0) return null
    return build(2, 'meet', say(
        `${math(`y=x^{2}`)} parabolak eta ${math(`y=${polynomialLatex([m, n])}`)} zuzenak bi puntutan ebakitzen dute elkar. Zein da handienaren abszisa?`,
        `La parábola ${math('y=x^{2}')} y la recta ${math(`y=${polynomialLatex([m, n])}`)} se cortan en dos puntos. ¿Cuál es la abscisa del mayor?`,
        `يتقاطع القطع ${math('y=x^{2}')} والمستقيم ${math(`y=${polynomialLatex([m, n])}`)} في نقطتين. ما الإحداثي السيني للأكبر؟`, `The parabola ${math('y=x^{2}')} and the straight line ${math(`y=${polynomialLatex([m, n])}`)} meet at two points. What is the x-coordinate of the larger one?`
    ), options(random, f(big), [
        wrong(f(-big), 'root-sign'),
        wrong(f(Math.min(r, s)), 'smaller'),
        ...nearNumbers(big)
    ]), f(big), `${polynomialLatex([1, -m, -n])}=0\\ \\to\\ x=${Math.min(r, s)},\\ x=${big}`, { m, n })
}

function tangentQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const half = nonZero(random, reach(tier))
    const m = 2 * half
    const n = -half * half
    return build(2, 'tangent', say(
        `Zenbat da ${math('n')}, ${math(`y=${m}x+n`)} zuzena ${math('y=x^{2}')} parabolaren ukitzailea izan dadin?`,
        `¿Cuánto vale ${math('n')} para que la recta ${math(`y=${m}x+n`)} sea tangente a ${math('y=x^{2}')}?`,
        `كم قيمة ${math('n')} ليكون المستقيم ${math(`y=${m}x+n`)} مماسًا للقطع ${math('y=x^{2}')}؟`, `What value of ${math('n')} makes the straight line ${math(`y=${m}x+n`)} tangent to ${math('y=x^{2}')}?`
    ), options(random, f(n), [
        wrong(f(-n), 'sign'),
        wrong(f(half), 'vertex-x'),
        ...nearNumbers(n)
    ]), f(n), `x^{2}${m > 0 ? '-' : '+'}${Math.abs(m)}x-n=0\\qquad \\Delta=${m * m}+4n=0\\ \\to\\ n=${n}`, { m })
}

/* ---------- Circuit 3: absolute values ---------- */

function absValueQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const m = nonZero(random, tier === 0 ? 2 : 3)
    const n = randomInt(random, -6, 6)
    const x = randomInt(random, -reach(tier), reach(tier))
    const inside = m * x + n
    if (inside >= 0) return null
    return build(3, 'abs-value', say(
        `${math(`f(x)=\\left|${polynomialLatex([m, n])}\\right|`)} bada, zenbat da ${math(`f(${x})`)}?`,
        `Si ${math(`f(x)=\\left|${polynomialLatex([m, n])}\\right|`)}, ¿cuánto vale ${math(`f(${x})`)}?`,
        `إذا كان ${math(`f(x)=\\left|${polynomialLatex([m, n])}\\right|`)} فكم تساوي ${math(`f(${x})`)}؟`, `If ${math(`f(x)=\\left|${polynomialLatex([m, n])}\\right|`)}, what is ${math(`f(${x})`)}?`
    ), options(random, f(-inside), [
        wrong(f(inside), 'no-abs'),
        ...nearNumbers(-inside)
    ]), f(-inside), `\\left|${inside}\\right|=${-inside}`, { m, n, x })
}

function peakQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const m = nonZero(random, tier === 0 ? 2 : 4)
    const root = nonZero(random, reach(tier))
    const n = -m * root
    return build(3, 'peak', say(
        `Zein abszisatan du erpina ${math(`y=\\left|${polynomialLatex([m, n])}\\right|`)} funtzioaren grafikoak?`,
        `¿En qué abscisa tiene el pico la gráfica de ${math(`y=\\left|${polynomialLatex([m, n])}\\right|`)}?`,
        `عند أي إحداثي سيني يقع رأس رسم ${math(`y=\\left|${polynomialLatex([m, n])}\\right|`)}؟`, `At what x-coordinate does the graph of ${math(`y=\\left|${polynomialLatex([m, n])}\\right|`)} have its corner?`
    ), options(random, f(root), [
        wrong(f(-root), 'root-sign'),
        wrong(f(n), 'constant'),
        ...nearNumbers(root)
    ]), f(root), `${polynomialLatex([m, n])}=0\\ \\to\\ x=${root}`, { m, n })
}

function absEquationQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const a = nonZero(random, reach(tier))
    const b = randomInt(random, 1, tier === 0 ? 4 : 7)
    if (b === a || a + b === b - a) return null
    return build(3, 'abs-equation', say(
        `Zein da ${math(`\\left|${polynomialLatex([1, -a])}\\right|=${b}`)} ekuazioaren soluzio handiena?`,
        `¿Cuál es la mayor solución de ${math(`\\left|${polynomialLatex([1, -a])}\\right|=${b}`)}?`,
        `ما أكبر حل للمعادلة ${math(`\\left|${polynomialLatex([1, -a])}\\right|=${b}`)}؟`, `What is the largest solution of ${math(`\\left|${polynomialLatex([1, -a])}\\right|=${b}`)}?`
    ), options(random, f(a + b), [
        wrong(f(a - b), 'smaller'),
        wrong(f(b - a), 'root-sign'),
        wrong(f(b), 'constant'),
        ...nearNumbers(a + b)
    ]), f(a + b), `${polynomialLatex([1, -a])}=\\pm ${b}\\ \\to\\ x=${a - b},\\ x=${a + b}`, { a, b })
}

function foldQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const h = randomInt(random, -reach(tier), reach(tier))
    const depth = pick(random, [1, 4, 9, 16].slice(0, tier + 2))
    const b = -2 * h
    const c = h * h - depth
    if (depth === Math.abs(h) || depth === c) return null
    return build(3, 'fold', say(
        `Zein da ${math(`y=\\left|${polynomialLatex([1, b, c])}\\right|`)} funtzioaren maximo erlatiboaren balioa?`,
        `¿Cuál es el valor del máximo relativo de ${math(`y=\\left|${polynomialLatex([1, b, c])}\\right|`)}?`,
        `ما قيمة العظمى النسبية لـ ${math(`y=\\left|${polynomialLatex([1, b, c])}\\right|`)}؟`, `What is the value of the local maximum of ${math(`y=\\left|${polynomialLatex([1, b, c])}\\right|`)}?`
    ), options(random, f(depth), [
        wrong(f(-depth), 'no-abs'),
        wrong(f(h), 'vertex-x'),
        wrong(f(c), 'constant'),
        ...nearNumbers(depth)
    ]), f(depth), `x_v=${h}\\qquad y_v=${-depth}\\ \\to\\ ${point(h, depth)}`, { b, c })
}

/* ---------- Circuit 4: rational functions ---------- */

function kQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const x0 = nonZero(random, reach(tier))
    const y0 = nonZero(random, reach(tier) + 2)
    if (Math.abs(x0) === 1) return null
    return build(4, 'k', say(
        `${math('y=\\frac{k}{x}')} hiperbola ${math(point(x0, y0))} puntutik pasatzen da. Zenbat da ${math('k')}?`,
        `La hipérbola ${math('y=\\frac{k}{x}')} pasa por ${math(point(x0, y0))}. ¿Cuánto vale ${math('k')}?`,
        `يمر القطع الزائد ${math('y=\\frac{k}{x}')} بـ ${math(point(x0, y0))}. كم قيمة ${math('k')}؟`, `The hyperbola ${math('y=\\frac{k}{x}')} passes through ${math(point(x0, y0))}. What is ${math('k')}?`
    ), options(random, f(x0 * y0), [
        wrong(fraction(y0, x0), 'divide'),
        wrong(f(-x0 * y0), 'sign'),
        ...nearNumbers(x0 * y0)
    ]), f(x0 * y0), `k=${paren(x0)}\\cdot ${paren(y0)}=${x0 * y0}`, { x0, y0 })
}

function inverseQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const workers = randomInt(random, 2, 6)
    const answer = randomInt(random, 2, tier === 2 ? 12 : 8)
    const other = randomInt(random, 2, 10)
    const days = (answer * other) / workers
    if (!Number.isInteger(days) || other === workers || days === answer) return null
    return build(4, 'inverse', say(
        `${workers} langilek ${days} egunean egiten dute lan bat. Zenbat egunetan egingo lukete ${other} langilek?`,
        `${workers} obreros hacen un trabajo en ${days} días. ¿En cuántos días lo harían ${other} obreros?`,
        `ينجز ${workers} عمال عملًا في ${days} يومًا. في كم يومًا ينجزه ${other} عاملًا؟`, `${workers} workers complete a job in ${days} days. In how many days would ${other} workers do it?`
    ), options(random, f(answer), [
        wrong(fraction(days * other, workers), 'direct'),
        ...nearNumbers(answer)
    ]), f(answer), `\\frac{${workers}\\cdot ${days}}{${other}}=${answer}`, { workers, days, other })
}

function verticalQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const a = nonZero(random, 4)
    const b = randomInt(random, -6, 6)
    const d = nonZero(random, reach(tier))
    if (b === a * d || a === -d) return null
    return build(4, 'vertical', say(
        `${math(`y=\\frac{${polynomialLatex([a, b])}}{${polynomialLatex([1, d])}}`)} funtzioaren asintota bertikala ${math('x=k')} da. Zenbat da ${math('k')}?`,
        `La asíntota vertical de ${math(`y=\\frac{${polynomialLatex([a, b])}}{${polynomialLatex([1, d])}}`)} es ${math('x=k')}. ¿Cuánto vale ${math('k')}?`,
        `المقارب الرأسي لـ ${math(`y=\\frac{${polynomialLatex([a, b])}}{${polynomialLatex([1, d])}}`)} هو ${math('x=k')}. كم قيمة ${math('k')}؟`, `The vertical asymptote of ${math(`y=\\frac{${polynomialLatex([a, b])}}{${polynomialLatex([1, d])}}`)} is ${math('x=k')}. What is ${math('k')}?`
    ), options(random, f(-d), [
        wrong(f(d), 'root-sign'),
        wrong(f(a), 'swap'),
        ...nearNumbers(-d)
    ]), f(-d), `${polynomialLatex([1, d])}=0\\ \\to\\ x=${-d}`, { a, b, d })
}

function horizontalQuestion(random: Random, tier: Tier): PolynomialAkRaceQuestion | null {
    const c = randomInt(random, 1, tier === 0 ? 2 : 3)
    const value = nonZero(random, 4)
    const a = value * c
    const b = randomInt(random, -6, 6)
    const d = nonZero(random, 5)
    if (b * c === a * d || -d === a || b === 0) return null
    return build(4, 'horizontal', say(
        `${math(`y=\\frac{${polynomialLatex([a, b])}}{${polynomialLatex([c, d])}}`)} funtzioaren asintota horizontala ${math('y=k')} da. Zenbat da ${math('k')}?`,
        `La asíntota horizontal de ${math(`y=\\frac{${polynomialLatex([a, b])}}{${polynomialLatex([c, d])}}`)} es ${math('y=k')}. ¿Cuánto vale ${math('k')}?`,
        `المقارب الأفقي لـ ${math(`y=\\frac{${polynomialLatex([a, b])}}{${polynomialLatex([c, d])}}`)} هو ${math('y=k')}. كم قيمة ${math('k')}؟`, `The horizontal asymptote of ${math(`y=\\frac{${polynomialLatex([a, b])}}{${polynomialLatex([c, d])}}`)} is ${math('y=k')}. What is ${math('k')}?`
    ), options(random, f(value), [
        wrong(fraction(b, d), 'constant'),
        wrong(fraction(-d, c), 'swap'),
        ...nearNumbers(value)
    ]), f(value), `y=\\frac{${a}}{${c}}=${value}`, { a, c })
}

/* ---------- Circuits ---------- */

type Generator = (random: Random, tier: Tier) => PolynomialAkRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [slopeQuestion, interceptQuestion, xCutQuestion],
    [vertexXQuestion, extremeQuestion, largestRootQuestion],
    [vertexFormQuestion, fitQuestion, meetQuestion, tangentQuestion],
    [absValueQuestion, peakQuestion, absEquationQuestion, foldQuestion],
    [kQuestion, inverseQuestion, verticalQuestion, horizontalQuestion]
]

export function generatePolynomialAkRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): PolynomialAkRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkPolynomialAkPitAnswer(question: RaceQuestion<PolynomialAkRaceError>, input: string): AnswerCheck {
    return checkAnswer(readFunctionsAnswer(input), question.answer as FractionValue, question.answerForm)
}

export function polynomialAkParTime(circuit: number): number {
    return parTimeFor([13, 14, 15, 14, 15][circuit] ?? 14)
}

export const polynomialAkRaceErrorTips: Record<PolynomialAkRaceError, LocalizedText> = {
    inverted: say('Alderantziz zatitu duzu: malda $\\frac{\\Delta y}{\\Delta x}$ da.', 'Has dividido al revés: la pendiente es $\\frac{\\Delta y}{\\Delta x}$.', 'قسمت بالعكس: الميل هو $\\frac{\\Delta y}{\\Delta x}$.', 'You divided the wrong way round: the slope is $\\frac{\\Delta y}{\\Delta x}$.'),
    order: say('Kendu bi koordenatuak ordena berean: $y_2-y_1$ eta $x_2-x_1$.', 'Resta las dos coordenadas en el mismo orden: $y_2-y_1$ y $x_2-x_1$.', 'اطرح الإحداثيين بالترتيب نفسه: $y_2-y_1$ و$x_2-x_1$.', 'Subtract the two coordinates in the same order: $y_2-y_1$ and $x_2-x_1$.'),
    sign: say('Begiratu zeinuari: gai bat aldatu da.', 'Mira el signo: ha cambiado algún término.', 'انتبه للإشارة: تغيّر أحد الحدود.', 'Check the signs: a term has changed sign.'),
    'point-y': say('Hori puntuaren $y$ da; $n=y_0-m\\cdot x_0$.', 'Esa es la $y$ del punto; $n=y_0-m\\cdot x_0$.', 'هذا $y$ النقطة؛ $n=y_0-m\\cdot x_0$.', 'That is the $y$-value of the point; $n=y_0-m\\cdot x_0$.'),
    'root-sign': say('Erroak aurkako zeinua du: $x-3=0$ bada, $x=3$.', 'La raíz tiene el signo contrario: si $x-3=0$, $x=3$.', 'للجذر الإشارة المعاكسة: إذا $x-3=0$ فإن $x=3$.', 'The solution has the opposite sign: if $x-3=0$, then $x=3$.'),
    half: say('Erpina $\\frac{-b}{2a}$ da: 2a-z zatitu, ez a-z.', 'El vértice es $\\frac{-b}{2a}$: divide entre 2a, no entre a.', 'الرأس $\\frac{-b}{2a}$: اقسم على 2a لا على a.', 'The vertex is $\\frac{-b}{2a}$: divide by 2a, not by a.'),
    'vertex-x': say('Hori erpinaren abszisa da; balioa haren ordenatua da.', 'Esa es la abscisa del vértice; el valor es su ordenada.', 'هذا الإحداثي السيني للرأس؛ والقيمة هي إحداثيه الصادي.', 'That is the x-coordinate of the vertex; the value is its y-coordinate.'),
    constant: say('Gai askea ez da emaitza: egin kalkulu osoa.', 'El término independiente no es el resultado: haz la cuenta entera.', 'الحد الثابت ليس النتيجة: أكمل الحساب.', 'The constant term is not the answer: do the whole calculation.'),
    'no-square': say('Ahaztu duzu karratua: $(x-p)^{2}$.', 'Te has olvidado del cuadrado: $(x-p)^{2}$.', 'نسيت التربيع: $(x-p)^{2}$.', 'You forgot the square: $(x-p)^{2}$.'),
    'no-abs': say('Balio absolutua ez da inoiz negatiboa.', 'El valor absoluto nunca es negativo.', 'القيمة المطلقة ليست سالبة أبدًا.', 'The absolute value is never negative.'),
    smaller: say('Hori soluzio txikiena da; handiena eskatzen da.', 'Esa es la solución menor; se pide la mayor.', 'هذا الحل الأصغر؛ والمطلوب الأكبر.', 'That is the smaller solution; the question asks for the larger one.'),
    divide: say('Alderantzizkoan biderkadura da konstantea: $k=x\\cdot y$.', 'En la inversa lo constante es el producto: $k=x\\cdot y$.', 'في التناسب العكسي الثابت هو حاصل الضرب: $k=x\\cdot y$.', 'In an inverse proportion, the constant is the product: $k=x\\cdot y$.'),
    direct: say('Langile gehiagok denbora gutxiago behar dute: alderantzizko proportzionaltasuna da.', 'Más obreros tardan menos: es proporcionalidad inversa.', 'عمال أكثر يحتاجون وقتًا أقل: إنه تناسب عكسي.', 'More workers take less time: it is inverse proportion.'),
    swap: say('Asintotak trukatu dituzu: bertikala izendatzailetik dator, horizontala koefizienteetatik.', 'Has cambiado las asíntotas: la vertical sale del denominador y la horizontal de los coeficientes.', 'بدّلت المقاربين: الرأسي من المقام والأفقي من المعاملات.', 'You mixed up the asymptotes: the vertical one comes from the denominator and the horizontal one from the coefficients.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
