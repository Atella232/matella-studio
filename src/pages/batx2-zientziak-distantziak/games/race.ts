import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { add, cross, det3, dot, scale, sub, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { fracLatex, isZero, lengthOf, lineLatex, nonZeroCount, planeLatex, root, small, tidy, vec, WHOLE_NORMALS, WHOLE_OFFSETS, wrap } from './common.ts'
import { angleOf, type AngleCase } from './sine.ts'

/* ==========================================================================
   Angelu eta distantzien lasterketa (Batxilergoa 2 · Zientziak): five
   circuits, one per stage — angles (two lines, a line and a plane, two
   planes), projections (the t of the foot on a plane, a coordinate of
   that foot, a coordinate of the foot on a line), symmetric points
   (about a plane, about a line, the D of the mediator plane), distances
   from a point (to a plane, between parallel planes, to a line) and
   between lines (the scalar triple product, skew lines, parallel lines).
   The wrong options are the typical mistakes. Every question carries
   `meta`, the numbers the tests check it against.
   ========================================================================== */

export const DISTANCES_RACE_CIRCUITS = 5

export type DistancesRaceError =
    | 'complement'
    | 'no-abs'
    | 'sign'
    | 'no-norm'
    | 'forgot-point'
    | 't-as-point'
    | 'foot'
    | 'm-minus-p'
    | 'endpoint'
    | 'no-d'
    | 'unequal-normals'
    | 'calculation'

export type DistancesRaceQuestion = RaceQuestion<DistancesRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })

interface Candidate {
    value: FractionValue
    error: DistancesRaceError
}
const whole = (value: number, error: DistancesRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: DistancesRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<DistancesRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: DistancesRaceError }> = []
    for (const candidate of [...candidates, ...nearby(right.numerator / right.denominator)]) {
        if (wrong.length === 3) break
        const latex = written(candidate.value)
        if (latex === null || latex === '-0' || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<DistancesRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): DistancesRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const COORDINATE: LocalizedText[] = [
    say('Zein da lehen koordenatua?', '¿Cuál es la primera coordenada?', 'ما المركّبة الأولى؟', 'What is the first coordinate?'),
    say('Zein da bigarren koordenatua?', '¿Cuál es la segunda coordenada?', 'ما المركّبة الثانية؟', 'What is the second coordinate?'),
    say('Zein da hirugarren koordenatua?', '¿Cuál es la tercera coordenada?', 'ما المركّبة الثالثة؟', 'What is the third coordinate?')
]
/** A vector as numbered meta entries: u1, u2, u3 */
function flat(name: string, a: Vec3): Record<string, number> {
    return { [`${name}1`]: a[0], [`${name}2`]: a[1], [`${name}3`]: a[2] }
}
const ANGLE_FILLERS = [30, 45, 60, 90, 0, 120]

/* ---------- 1. Angles ---------- */

function angleQuestion(random: Random, type: AngleCase): DistancesRaceQuestion | null {
    const a = small(random, 2)
    const b = small(random, 2)
    if (nonZeroCount(a) < 2 || nonZeroCount(b) < 2) return null
    const angle = angleOf(type, a, b)
    if (angle === null) return null
    const answer = fraction(angle)
    const fillers = shuffle(random, ANGLE_FILLERS).map((value) => whole(value, 'calculation' as const))
    const choices = options(random, answer, [whole(90 - angle, 'complement'), whole(180 - angle, 'no-abs'), ...fillers])
    const trig = type === 'line-plane' ? '\\sin' : '\\cos'
    const [nameA, nameB] = type === 'lines' ? ['\\vec{u}', '\\vec{v}'] : type === 'planes' ? ['\\vec{n}_1', '\\vec{n}_2'] : ['\\vec{u}', '\\vec{n}']
    const data = `$${nameA}=${vec(a)}$`
    const other = `$${nameB}=${vec(b)}$`
    const prompt = type === 'lines'
        ? say(`Bi zuzen, ${data} eta ${other}. Zenbat gradu da angelua?`, `Dos rectas con ${data} y ${other}. ¿Cuántos grados mide el ángulo?`, `مستقيمان بـ ${data} و${other}. كم درجة الزاوية؟`, `Two lines with ${data} and ${other}. How many degrees is the angle?`)
        : type === 'planes'
            ? say(`Bi plano, ${data} eta ${other}. Zenbat gradu da angelua?`, `Dos planos con ${data} y ${other}. ¿Cuántos grados mide el ángulo?`, `مستويان بـ ${data} و${other}. كم درجة الزاوية؟`, `Two planes with ${data} and ${other}. How many degrees is the angle?`)
            : say(`Zuzena ${data} norabidearekin eta planoa ${other} normalarekin. Zenbat gradu da angelua?`, `Recta con ${data} y plano con ${other}. ¿Cuántos grados mide el ángulo?`, `مستقيم بـ ${data} ومستوى بـ ${other}. كم درجة الزاوية؟`, `A line with ${data} and a plane with ${other}. How many degrees is the angle?`)
    const solution = same(`${trig}\\alpha=\\frac{|${dot(a, b)}|}{${root(dot(a, a))}\\,${root(dot(b, b))}}\\ \\to\\ \\alpha=${angle}^\\circ`)
    return choices && build(0, `angle-${type}`, prompt, choices, answer, solution, { ...flat('a', a), ...flat('b', b) })
}

/* ---------- 2. Projections ---------- */

function footTQuestion(random: Random): DistancesRaceQuestion | null {
    const n = small(random, 2)
    const p = small(random, 2)
    const D = randomInt(random, -4, 4)
    if (nonZeroCount(n) < 2) return null
    const value = dot(n, p) + D
    const size = dot(n, n)
    if (value === 0) return null
    const answer = fraction(-value, size)
    const choices = options(random, answer, [ratio(value, size, 'sign'), whole(-value, 'no-norm'), ratio(-value, lengthOf(n) || 1, 'calculation')])
    const plane = planeLatex({ normal: n, D })
    const prompt = say(`$P${vec(p)}$ puntutik $${plane}$ planora: $P+t\\,\\vec{n}$ zuzenaren zein $t$ da oina?`, `De $P${vec(p)}$ al plano $${plane}$: ¿qué $t$ de $P+t\\,\\vec{n}$ da el pie?`, `من $P${vec(p)}$ إلى المستوى $${plane}$: أي $t$ في $P+t\\,\\vec{n}$ يعطي المسقط؟`, `From $P${vec(p)}$ to the plane $${plane}$: which $t$ of $P+t\\,\\vec{n}$ gives the foot?`)
    return choices && build(1, 'foot-t', prompt, choices, answer, same(`t=-\\frac{${value}}{${size}}=${fracLatex(-value, size)}`), { ...flat('n', n), ...flat('p', p), D })
}

function footPlaneQuestion(random: Random): DistancesRaceQuestion | null {
    const n = small(random, 2)
    const p = small(random, 2)
    const t = pick(random, [1, -1, 2])
    const index = randomInt(random, 0, 2)
    if (nonZeroCount(n) < 2 || n[index] === 0) return null
    const m = add(p, scale(t, n))
    const D = -dot(n, m) + 0
    const answer = fraction(m[index])
    const choices = options(random, answer, [whole(t * n[index], 'forgot-point'), whole(p[index] - t * n[index], 'sign'), whole(p[index] + 2 * t * n[index], 'calculation')])
    const plane = planeLatex({ normal: n, D })
    const prompt = say(`$P${vec(p)}$ puntuaren proiekzioa $${plane}$ planoan. ${COORDINATE[index].eu}`, `Proyección de $P${vec(p)}$ sobre $${plane}$. ${COORDINATE[index].es}`, `مسقط $P${vec(p)}$ على $${plane}$. ${COORDINATE[index].ar}`, `Projection of $P${vec(p)}$ on $${plane}$. ${COORDINATE[index].en}`)
    return choices && build(1, 'foot-plane', prompt, choices, answer, same(`t=${t}\\ \\to\\ M=${vec(tidy(m))}`), { ...flat('n', n), ...flat('p', p), D, index })
}

function footLineQuestion(random: Random): DistancesRaceQuestion | null {
    const u = small(random, 2)
    const w = small(random, 2)
    const a = small(random, 2)
    const s = pick(random, [1, -1, 2])
    const index = randomInt(random, 0, 2)
    if (nonZeroCount(u) < 2 || isZero(w) || dot(u, w) !== 0) return null
    const m = add(a, scale(s, u))
    const p = tidy(add(m, w))
    const answer = fraction(m[index])
    const choices = options(random, answer, [whole(s, 't-as-point'), whole(a[index], 'calculation'), whole(p[index], 'calculation')])
    const line = lineLatex({ point: a, direction: u })
    const prompt = say(`$P${vec(p)}$ puntuaren proiekzioa $${line}$ zuzenean. ${COORDINATE[index].eu}`, `Proyección de $P${vec(p)}$ sobre la recta $${line}$. ${COORDINATE[index].es}`, `مسقط $P${vec(p)}$ على المستقيم $${line}$. ${COORDINATE[index].ar}`, `Projection of $P${vec(p)}$ on the line $${line}$. ${COORDINATE[index].en}`)
    return choices && build(1, 'foot-line', prompt, choices, answer, same(`\\overrightarrow{MP}\\cdot\\vec{u}=0\\ \\to\\ t=${s}\\ \\to\\ M=${vec(tidy(m))}`), { ...flat('a', a), ...flat('u', u), ...flat('p', p), index })
}

/* ---------- 3. Symmetric points ---------- */

function symmetricPlaneQuestion(random: Random): DistancesRaceQuestion | null {
    const n = small(random, 2)
    const p = small(random, 2)
    const t = pick(random, [1, -1])
    const index = randomInt(random, 0, 2)
    if (nonZeroCount(n) < 2 || n[index] === 0) return null
    const m = add(p, scale(t, n))
    const image = tidy(sub(scale(2, m), p))
    const D = -dot(n, m) + 0
    const answer = fraction(image[index])
    const choices = options(random, answer, [whole(m[index], 'foot'), whole(m[index] - p[index], 'm-minus-p'), whole(p[index] - t * n[index], 'sign')])
    const plane = planeLatex({ normal: n, D })
    const prompt = say(`$P${vec(p)}$ puntuaren simetrikoa $${plane}$ planoarekiko. ${COORDINATE[index].eu}`, `Simétrico de $P${vec(p)}$ respecto de $${plane}$. ${COORDINATE[index].es}`, `نظيرة $P${vec(p)}$ بالنسبة إلى $${plane}$. ${COORDINATE[index].ar}`, `Symmetric point of $P${vec(p)}$ about $${plane}$. ${COORDINATE[index].en}`)
    return choices && build(2, 'symmetric-plane', prompt, choices, answer, same(`M=${vec(tidy(m))}\\ \\to\\ P'=2M-P=${vec(image)}`), { ...flat('n', n), ...flat('p', p), D, index })
}

function symmetricLineQuestion(random: Random): DistancesRaceQuestion | null {
    const u = small(random, 2)
    const w = small(random, 2)
    const a = small(random, 2)
    const s = pick(random, [1, -1])
    const index = randomInt(random, 0, 2)
    if (nonZeroCount(u) < 2 || isZero(w) || dot(u, w) !== 0 || w[index] === 0) return null
    const m = tidy(add(a, scale(s, u)))
    const p = tidy(add(m, w))
    const image = tidy(sub(m, w))
    const answer = fraction(image[index])
    const choices = options(random, answer, [whole(m[index], 'foot'), whole(-w[index], 'm-minus-p'), whole(p[index] + w[index], 'sign')])
    const line = lineLatex({ point: a, direction: u })
    const prompt = say(`$P${vec(p)}$ puntuaren simetrikoa $${line}$ zuzenarekiko. ${COORDINATE[index].eu}`, `Simétrico de $P${vec(p)}$ respecto de la recta $${line}$. ${COORDINATE[index].es}`, `نظيرة $P${vec(p)}$ بالنسبة إلى المستقيم $${line}$. ${COORDINATE[index].ar}`, `Symmetric point of $P${vec(p)}$ about the line $${line}$. ${COORDINATE[index].en}`)
    return choices && build(2, 'symmetric-line', prompt, choices, answer, same(`M=${vec(m)}\\ \\to\\ P'=2M-P=${vec(image)}`), { ...flat('a', a), ...flat('u', u), ...flat('p', p), index })
}

function mediatorQuestion(random: Random): DistancesRaceQuestion | null {
    const a = small(random, 2)
    const half = small(random, 1)
    if (nonZeroCount(half) < 2) return null
    const b = tidy(add(a, scale(2, half)))
    const n = tidy(sub(b, a))
    const middle = tidy(add(a, half))
    const D = -dot(n, middle) + 0
    const answer = fraction(D)
    const choices = options(random, answer, [whole(-dot(n, a), 'endpoint'), whole(dot(n, middle), 'sign'), whole(-dot(n, b), 'endpoint')])
    const prompt = say(`$A${vec(a)}$ eta $B${vec(b)}$ puntuen plano erdikaria: $\\overrightarrow{AB}\\cdot X+D=0$. Zenbat da $D$?`, `Plano mediador de $A${vec(a)}$ y $B${vec(b)}$: $\\overrightarrow{AB}\\cdot X+D=0$. ¿Cuánto vale $D$?`, `المستوى المنصِّف لـ $A${vec(a)}$ و$B${vec(b)}$: $\\overrightarrow{AB}\\cdot X+D=0$. كم تساوي $D$؟`, `Mediator plane of $A${vec(a)}$ and $B${vec(b)}$: $\\overrightarrow{AB}\\cdot X+D=0$. What is $D$?`)
    return choices && build(2, 'mediator-d', prompt, choices, answer, same(`M=${vec(middle)}\\ \\to\\ D=-${vec(n)}\\cdot M=${D}`), { ...flat('a', a), ...flat('b', b) })
}

/* ---------- 4. Distances from a point ---------- */

function pointPlaneQuestion(random: Random): DistancesRaceQuestion | null {
    const n = pick(random, WHOLE_NORMALS)
    const p = small(random, 2)
    const D = randomInt(random, -5, 5)
    const size = lengthOf(n)
    const value = dot(n, p) + D
    const product = dot(n, p)
    if (value === 0 || D === 0) return null
    const answer = fraction(Math.abs(value), size)
    const choices = options(random, answer, [whole(Math.abs(value), 'no-norm'), ratio(Math.abs(product), size, 'no-d'), ratio(Math.abs(value), size * size, 'calculation')])
    const plane = planeLatex({ normal: n, D })
    const prompt = say(`Zein da $P${vec(p)}$ puntutik $${plane}$ planorainoko distantzia?`, `¿Cuál es la distancia de $P${vec(p)}$ al plano $${plane}$?`, `ما المسافة من $P${vec(p)}$ إلى المستوى $${plane}$؟`, `What is the distance from $P${vec(p)}$ to the plane $${plane}$?`)
    return choices && build(3, 'point-plane', prompt, choices, answer, same(`d=\\frac{|${value}|}{${size}}=${fracLatex(Math.abs(value), size)}`), { ...flat('n', n), ...flat('p', p), D })
}

function parallelPlanesQuestion(random: Random): DistancesRaceQuestion | null {
    const n = pick(random, WHOLE_NORMALS.filter((item) => item.filter((value) => value < 0).length <= 1))
    const D1 = randomInt(random, -4, 4)
    const D2 = randomInt(random, -8, 8)
    const size = lengthOf(n)
    const gap = D2 - 2 * D1
    if (gap === 0 || D2 === D1) return null
    const answer = fraction(Math.abs(gap), 2 * size)
    const choices = options(random, answer, [ratio(Math.abs(D2 - D1), size, 'unequal-normals'), ratio(Math.abs(gap), 2, 'no-norm'), ratio(Math.abs(D2 + 2 * D1), 2 * size, 'sign')])
    const first = planeLatex({ normal: n, D: D1 })
    const second = planeLatex({ normal: tidy(scale(2, n)), D: D2 })
    const prompt = say(`Zein da $${first}$ eta $${second}$ planoen arteko distantzia?`, `¿Cuál es la distancia entre $${first}$ y $${second}$?`, `ما المسافة بين $${first}$ و$${second}$؟`, `What is the distance between $${first}$ and $${second}$?`)
    return choices && build(3, 'parallel-planes', prompt, choices, answer, same(`D_2\\to\\frac{${D2}}{2}\\ \\to\\ d=\\frac{|${fracLatex(D2, 2)}-${wrap(D1)}|}{${size}}=${fracLatex(Math.abs(gap), 2 * size)}`), { ...flat('n', n), D1, D2 })
}

/** A point at a whole distance from a line A + t·u with |u| whole */
function lineAndPoint(random: Random) {
    const u = pick(random, WHOLE_NORMALS)
    const offsets = WHOLE_OFFSETS.filter((item) => dot(item, u) === 0 && item.every((value) => Math.abs(value) <= 3))
    const offset = pick(random, offsets)
    const a = small(random, 2)
    const s = pick(random, [1, -1, 2])
    if (!offset) return null
    const p = tidy(add(add(a, scale(s, u)), offset))
    return { u, a, p, k: lengthOf(offset), size: lengthOf(u) }
}

function pointLineQuestion(random: Random): DistancesRaceQuestion | null {
    const data = lineAndPoint(random)
    if (!data) return null
    const { u, a, p, k, size } = data
    const answer = fraction(k)
    const choices = options(random, answer, [whole(k * size, 'no-norm'), whole(k * k, 'calculation'), whole(k + size, 'calculation')])
    const line = lineLatex({ point: a, direction: u })
    const prompt = say(`Zein da $P${vec(p)}$ puntutik $${line}$ zuzenerainoko distantzia?`, `¿Cuál es la distancia de $P${vec(p)}$ a la recta $${line}$?`, `ما المسافة من $P${vec(p)}$ إلى المستقيم $${line}$؟`, `What is the distance from $P${vec(p)}$ to the line $${line}$?`)
    return choices && build(3, 'point-line', prompt, choices, answer, same(`d=\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}=\\frac{${k * size}}{${size}}=${k}`), { ...flat('a', a), ...flat('u', u), ...flat('p', p) })
}

/* ---------- 5. Distances between lines ---------- */

function mixedQuestion(random: Random): DistancesRaceQuestion | null {
    const a = small(random, 2)
    const b = small(random, 2)
    const u = small(random, 2)
    const v = small(random, 2)
    if (nonZeroCount(u) < 2 || nonZeroCount(v) < 2 || isZero(cross(u, v))) return null
    const ab = tidy(sub(b, a))
    const value = det3(ab, u, v) + 0
    if (value === 0) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(-value, 'sign'), whole(dot(ab, cross(u, v)) + dot(u, v), 'calculation')])
    const prompt = say(`$A${vec(a)}$, $B${vec(b)}$, $\\vec{u}=${vec(u)}$ eta $\\vec{v}=${vec(v)}$. Zenbat da $[\\overrightarrow{AB},\\vec{u},\\vec{v}]$?`, `$A${vec(a)}$, $B${vec(b)}$, $\\vec{u}=${vec(u)}$ y $\\vec{v}=${vec(v)}$. ¿Cuánto vale $[\\overrightarrow{AB},\\vec{u},\\vec{v}]$?`, `$A${vec(a)}$ و$B${vec(b)}$ و$\\vec{u}=${vec(u)}$ و$\\vec{v}=${vec(v)}$. كم يساوي $[\\overrightarrow{AB},\\vec{u},\\vec{v}]$؟`, `$A${vec(a)}$, $B${vec(b)}$, $\\vec{u}=${vec(u)}$ and $\\vec{v}=${vec(v)}$. What is $[\\overrightarrow{AB},\\vec{u},\\vec{v}]$?`)
    return choices && build(4, 'mixed', prompt, choices, answer, same(`\\overrightarrow{AB}=${vec(ab)}\\ \\to\\ ${value}`), { ...flat('a', a), ...flat('b', b), ...flat('u', u), ...flat('v', v) })
}

function skewQuestion(random: Random): DistancesRaceQuestion | null {
    const b = small(random, 2)
    const u = small(random, 2)
    const v = small(random, 2)
    const w = cross(u, v)
    const size = Math.sqrt(dot(w, w))
    if (isZero(w) || !Number.isInteger(size) || nonZeroCount(u) < 1 || nonZeroCount(v) < 1) return null
    const value = dot(b, w)
    if (value === 0) return null
    const answer = fraction(Math.abs(value), size)
    const choices = options(random, answer, [whole(Math.abs(value), 'no-norm'), ratio(Math.abs(value), size + 1, 'calculation'), ratio(Math.abs(value) + size, size, 'calculation')])
    const prompt = say(`$r$: $(0,0,0)+t\\,${vec(u)}$ eta $s$: $${vec(b)}+\\lambda\\,${vec(v)}$ gurutzatzen dira. Zein da distantzia?`, `$r$: $(0,0,0)+t\\,${vec(u)}$ y $s$: $${vec(b)}+\\lambda\\,${vec(v)}$ se cruzan. ¿Cuál es la distancia?`, `$r$: ‏$(0,0,0)+t\\,${vec(u)}$ و$s$: ‏$${vec(b)}+\\lambda\\,${vec(v)}$ متخالفان. ما المسافة؟`, `$r$: $(0,0,0)+t\\,${vec(u)}$ and $s$: $${vec(b)}+\\lambda\\,${vec(v)}$ are skew. What is the distance?`)
    return choices && build(4, 'skew', prompt, choices, answer, same(`d=\\frac{|${value}|}{|${vec(tidy(w))}|}=${fracLatex(Math.abs(value), size)}`), { ...flat('b', b), ...flat('u', u), ...flat('v', v) })
}

function parallelLinesQuestion(random: Random): DistancesRaceQuestion | null {
    const data = lineAndPoint(random)
    if (!data) return null
    const { u, a, p, k, size } = data
    const factor = pick(random, [1, -1, 2])
    const v = tidy(scale(factor, u))
    const answer = fraction(k)
    const choices = options(random, answer, [whole(k * size, 'no-norm'), whole(k * k, 'calculation'), whole(k + 1, 'calculation')])
    const prompt = say(`$r$: $${vec(a)}+t\\,${vec(u)}$ eta $s$: $${vec(p)}+\\lambda\\,${vec(v)}$ paraleloak dira. Zein da distantzia?`, `$r$: $${vec(a)}+t\\,${vec(u)}$ y $s$: $${vec(p)}+\\lambda\\,${vec(v)}$ son paralelas. ¿Cuál es la distancia?`, `$r$: ‏$${vec(a)}+t\\,${vec(u)}$ و$s$: ‏$${vec(p)}+\\lambda\\,${vec(v)}$ متوازيان. ما المسافة؟`, `$r$: $${vec(a)}+t\\,${vec(u)}$ and $s$: $${vec(p)}+\\lambda\\,${vec(v)}$ are parallel. What is the distance?`)
    return choices && build(4, 'parallel-lines', prompt, choices, answer, same(`d=\\frac{|\\overrightarrow{AB}\\times\\vec{u}|}{|\\vec{u}|}=\\frac{${k * size}}{${size}}=${k}`), { ...flat('a', a), ...flat('u', u), ...flat('p', p) })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => DistancesRaceQuestion | null>> = [
    [(random) => angleQuestion(random, 'lines'), (random) => angleQuestion(random, 'line-plane'), (random) => angleQuestion(random, 'planes')],
    [footTQuestion, footPlaneQuestion, footLineQuestion],
    [symmetricPlaneQuestion, symmetricLineQuestion, mediatorQuestion],
    [pointPlaneQuestion, parallelPlanesQuestion, pointLineQuestion],
    [mixedQuestion, skewQuestion, parallelLinesQuestion]
]

export function generateDistancesRaceQuestion(random: Random, circuit: number, tier: Tier): DistancesRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 2000; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkDistancesPitAnswer(question: RaceQuestion<DistancesRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function distancesParTime(circuit: number): number {
    return parTimeFor([13, 14, 14, 14, 15][circuit] ?? 14)
}

/** The kinds of question, three per circuit (the tests go through all of them) */
export const distancesRaceKinds = ['angle-lines', 'angle-line-plane', 'angle-planes', 'foot-t', 'foot-plane', 'foot-line', 'symmetric-plane', 'symmetric-line', 'mediator-d', 'point-plane', 'parallel-planes', 'point-line', 'mixed', 'skew', 'parallel-lines'] as const

export const distancesRaceErrorTips: Record<DistancesRaceError, LocalizedText> = {
    complement: say('Hori angelu osagarria da: zuzena eta planoa sinuarekin, bi zuzen edo bi plano kosinuarekin.', 'Ese es el complementario: recta y plano con el seno; dos rectas o dos planos con el coseno.', 'هذه المتممة: مستقيم ومستوى بالجيب، ومستقيمان أو مستويان بجيب التمام.', 'That is the complement: a line and a plane use the sine; two lines or two planes use the cosine.'),
    'no-abs': say('Angelua 0 eta 90 gradu artean dago: balio absolutua.', 'El ángulo está entre 0 y 90 grados: valor absoluto.', 'الزاوية بين 0 و90 درجة: القيمة المطلقة.', 'The angle is between 0 and 90 degrees: absolute value.'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    'no-norm': say('Zatitu moduluaz: normalarena edo norabidearena.', 'Divide entre el módulo: el del normal o el del director.', 'اقسم على الطول: طول الناظم أو متجه التوجيه.', 'Divide by the magnitude: of the normal or of the direction.'),
    'forgot-point': say('Oina M = P + t n da: ez ahaztu P.', 'El pie es M = P + t n: no olvides la P.', 'المسقط M = P + t n: لا تنسَ P.', 'The foot is M = P + t n: do not forget P.'),
    't-as-point': say('t ez da puntua: ordezkatu zuzenean.', 't no es el punto: sustitúyelo en la recta.', 't ليست النقطة: عوّضها في المستقيم.', 't is not the point: put it into the line.'),
    foot: say('Hori oina da; simetrikoa P′ = 2M − P.', 'Ese es el pie; el simétrico es P′ = 2M − P.', 'هذا المسقط؛ والنظيرة P′ = 2M − P.', 'That is the foot; the symmetric point is P′ = 2M − P.'),
    'm-minus-p': say('M − P bektore bat da, ez puntua: P′ = M + (M − P).', 'M − P es un vector, no un punto: P′ = M + (M − P).', 'M − P متجه لا نقطة: P′ = M + (M − P).', 'M − P is a vector, not a point: P′ = M + (M − P).'),
    endpoint: say('Plano erdikaria erdiko puntutik pasatzen da, ez muturretik.', 'El plano mediador pasa por el punto medio, no por un extremo.', 'المستوى المنصِّف يمر بالمنتصف لا بطرف.', 'The mediator plane goes through the midpoint, not an end point.'),
    'no-d': say('Zenbakitzailean D ere bai: |n · P + D|.', 'En el numerador también va la D: |n · P + D|.', 'في البسط D أيضًا: |n · P + D|.', 'The numerator holds D too: |n · P + D|.'),
    'unequal-normals': say('Lehenik bi planoek normal bera izan behar dute.', 'Primero los dos planos con el mismo normal.', 'أولًا المستويان بالناظم نفسه.', 'First both planes with the same normal.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
