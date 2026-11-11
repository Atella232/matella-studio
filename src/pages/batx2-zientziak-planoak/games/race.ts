import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { add, cross, det3, dot, scale, sub, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { constantLatex, generalLatex, levelLatex, termLatex } from '../lab/common.ts'
import { continuousLatex } from '../lab/parameterT.ts'

/* ==========================================================================
   Zuzen eta planoen lasterketa (Batxilergoa 2 · Zientziak): five
   circuits, one per stage — lines (a point for a t, the point read from
   the continuous equation, the direction of two implicit equations),
   planes (the D of a plane through a point, a coordinate of the normal
   through three points, the d of a parallel plane), two lines (the
   scalar triple product, the k of parallel directions, the k that makes
   them meet), a line and a plane (the t of the meeting point, the m of a
   parallel line, a coordinate of the meeting point) and three planes
   (det M, the a that makes it 0, the k of parallel planes). The wrong
   options are the typical mistakes. Every question carries `meta`, the
   numbers the tests check it against.
   ========================================================================== */

export const PLANES_RACE_CIRCUITS = 5

export type PlanesRaceError =
    | 'swap'
    | 'continuous-sign'
    | 'normal-as-direction'
    | 'j-sign'
    | 'sign'
    | 'kept-d'
    | 'forgot-point'
    | 'calculation'

export type PlanesRaceQuestion = RaceQuestion<PlanesRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const wrap = (value: number) => (value < 0 ? `(${value})` : String(value + 0))
const vec = (a: Vec3) => `(${a.map((value) => value + 0).join(',')})`

interface Candidate {
    value: FractionValue
    error: PlanesRaceError
}
const whole = (value: number, error: PlanesRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: PlanesRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<PlanesRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: PlanesRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<PlanesRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): PlanesRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const COORDINATE: LocalizedText[] = [
    say('Zein da lehen koordenatua?', '¿Cuál es la primera coordenada?', 'ما المركّبة الأولى؟', 'What is the first coordinate?'),
    say('Zein da bigarren koordenatua?', '¿Cuál es la segunda coordenada?', 'ما المركّبة الثانية؟', 'What is the second coordinate?'),
    say('Zein da hirugarren koordenatua?', '¿Cuál es la tercera coordenada?', 'ما المركّبة الثالثة؟', 'What is the third coordinate?')
]
const point = (random: Random, limit = 3): Vec3 => [randomInt(random, -limit, limit), randomInt(random, -limit, limit), randomInt(random, -limit, limit)]
const nonZero = (a: Vec3) => a.every((value) => value !== 0)
const twoNonZero = (a: Vec3) => a.filter((value) => value !== 0).length >= 2
/** A vector as numbered meta entries: u1, u2, u3 */
function flat(name: string, a: Vec3): Record<string, number> {
    return { [`${name}1`]: a[0], [`${name}2`]: a[1], [`${name}3`]: a[2] }
}
const withK = (a: Vec3, index: number) => `(${a.map((value, place) => (place === index ? 'k' : String(value + 0))).join(',')})`
/** a·x + b·y + c·z with a letter in one place: no 1x, no 0y, signs joined well */
function symbolLatex(coefficients: Array<number | string>): string {
    const names = ['x', 'y', '{z}']
    let text = ''
    coefficients.forEach((value, index) => {
        if (typeof value === 'string') {
            text += `${text ? '+' : ''}${value}${names[index]}`
            return
        }
        if (value === 0) return
        const size = Math.abs(value)
        text += `${value < 0 ? '-' : text ? '+' : ''}${size === 1 ? '' : size}${names[index]}`
    })
    return text
}

/* ---------- 1. Equations of a line ---------- */

function linePointQuestion(random: Random): PlanesRaceQuestion | null {
    const a = point(random)
    const u = point(random)
    const t = pick(random, [2, -1, 3, -2])
    const index = randomInt(random, 0, 2)
    const value = a[index] + t * u[index]
    if (u[index] === 0 || a[index] === u[index]) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(u[index] + t * a[index], 'swap'), whole(t * u[index], 'forgot-point'), whole(a[index] - t * u[index], 'sign')])
    const prompt = say(`$r$: $${vec(a)}+t\\,${vec(u)}$, $t=${t}$ puntua. ${COORDINATE[index].eu}`, `$r$: $${vec(a)}+t\\,${vec(u)}$, punto de $t=${t}$. ${COORDINATE[index].es}`, `$r$: ‏$${vec(a)}+t\\,${vec(u)}$، النقطة عند $t=${t}$. ${COORDINATE[index].ar}`, `$r$: $${vec(a)}+t\\,${vec(u)}$, the point for $t=${t}$. ${COORDINATE[index].en}`)
    return choices && build(0, 'line-point', prompt, choices, answer, same(`${a[index]}+${wrap(t)}\\cdot ${wrap(u[index])}=${value}`), { ...flat('a', a), ...flat('u', u), t, index })
}

function continuousPointQuestion(random: Random): PlanesRaceQuestion | null {
    const a = point(random)
    const u = point(random)
    const index = randomInt(random, 0, 2)
    if (!nonZero(u) || a[index] === 0 || Math.abs(a[index]) === Math.abs(u[index])) return null
    const answer = fraction(a[index])
    const choices = options(random, answer, [whole(-a[index], 'continuous-sign'), whole(u[index], 'swap'), whole(-u[index], 'calculation')])
    const prompt = say(`$${continuousLatex(a, u)}$ zuzenaren puntua. ${COORDINATE[index].eu}`, `Punto de la recta $${continuousLatex(a, u)}$. ${COORDINATE[index].es}`, `نقطة المستقيم $${continuousLatex(a, u)}$. ${COORDINATE[index].ar}`, `Point of the line $${continuousLatex(a, u)}$. ${COORDINATE[index].en}`)
    return choices && build(0, 'continuous-point', prompt, choices, answer, same(`A=${vec(a)}`), { ...flat('a', a), ...flat('u', u), index })
}

function implicitDirectionQuestion(random: Random): PlanesRaceQuestion | null {
    const n1 = point(random, 2)
    const n2 = point(random, 2)
    const u = cross(n1, n2)
    const index = randomInt(random, 0, 2)
    if (!twoNonZero(n1) || !twoNonZero(n2) || u[index] === 0) return null
    const d1 = randomInt(random, -3, 3)
    const d2 = randomInt(random, -3, 3)
    const answer = fraction(u[index])
    const choices = options(random, answer, [whole(index === 1 ? -u[1] : u[index] + 1, index === 1 ? 'j-sign' : 'calculation'), whole(n1[index], 'normal-as-direction'), whole(-u[index], 'sign')])
    const system = `\\begin{cases}${levelLatex(n1, d1)}\\\\${levelLatex(n2, d2)}\\end{cases}`
    const prompt = say(`$\\vec{n}_1\\times\\vec{n}_2$ norabidea: $${system}$. ${COORDINATE[index].eu}`, `Director $\\vec{n}_1\\times\\vec{n}_2$ de $${system}$. ${COORDINATE[index].es}`, `الاتجاه $\\vec{n}_1\\times\\vec{n}_2$ لـ $${system}$. ${COORDINATE[index].ar}`, `Direction $\\vec{n}_1\\times\\vec{n}_2$ of $${system}$. ${COORDINATE[index].en}`)
    return choices && build(0, 'implicit-direction', prompt, choices, answer, same(`${vec(n1)}\\times${vec(n2)}=${vec(u)}`), { ...flat('n', n1), ...flat('m', n2), index })
}

/* ---------- 2. Equations of a plane ---------- */

function planeDQuestion(random: Random): PlanesRaceQuestion | null {
    const n = point(random)
    const p = point(random)
    const value = -dot(n, p) + 0
    if (!twoNonZero(n) || value === 0) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(-value, 'sign'), whole(-dot(n, p) + n[0], 'calculation'), whole(p[0] + p[1] + p[2], 'calculation')])
    const prompt = say(`$P${vec(p)}$ puntutik $\\vec{n}=${vec(n)}$ normalarekin pasatzen den planoa: $${generalLatex(n, 1).replace('+1=0', '+D=0')}$. Zenbat da $D$?`, `Plano por $P${vec(p)}$ con normal $\\vec{n}=${vec(n)}$: $${generalLatex(n, 1).replace('+1=0', '+D=0')}$. ¿Cuánto vale $D$?`, `المستوى المار بـ $P${vec(p)}$ وناظمه $\\vec{n}=${vec(n)}$: ‏$${generalLatex(n, 1).replace('+1=0', '+D=0')}$. كم يساوي $D$؟`, `Plane through $P${vec(p)}$ with normal $\\vec{n}=${vec(n)}$: $${generalLatex(n, 1).replace('+1=0', '+D=0')}$. What is $D$?`)
    return choices && build(1, 'plane-d', prompt, choices, answer, same(`D=-\\vec{n}\\cdot P=${value}`), { ...flat('n', n), ...flat('p', p) })
}

function threePointsQuestion(random: Random): PlanesRaceQuestion | null {
    const a = point(random, 2)
    const b = point(random, 2)
    const c = point(random, 2)
    const n = cross(sub(b, a), sub(c, a))
    const index = randomInt(random, 0, 2)
    if (n[index] === 0 || !twoNonZero(n)) return null
    const answer = fraction(n[index])
    const choices = options(random, answer, [whole(-n[index], index === 1 ? 'j-sign' : 'sign'), whole(n[(index + 1) % 3], 'calculation'), whole(n[index] + 1, 'calculation')])
    const prompt = say(`$\\overrightarrow{AB}\\times\\overrightarrow{AC}$, $A${vec(a)}$, $B${vec(b)}$ eta $C${vec(c)}$ puntuetarako. ${COORDINATE[index].eu}`, `$\\overrightarrow{AB}\\times\\overrightarrow{AC}$ con $A${vec(a)}$, $B${vec(b)}$ y $C${vec(c)}$. ${COORDINATE[index].es}`, `$\\overrightarrow{AB}\\times\\overrightarrow{AC}$ مع $A${vec(a)}$ و$B${vec(b)}$ و$C${vec(c)}$. ${COORDINATE[index].ar}`, `$\\overrightarrow{AB}\\times\\overrightarrow{AC}$ with $A${vec(a)}$, $B${vec(b)}$ and $C${vec(c)}$. ${COORDINATE[index].en}`)
    return choices && build(1, 'three-points', prompt, choices, answer, same(`${vec(sub(b, a))}\\times${vec(sub(c, a))}=${vec(n)}`), { ...flat('a', a), ...flat('b', b), ...flat('c', c), index })
}

function parallelDQuestion(random: Random): PlanesRaceQuestion | null {
    const n = point(random)
    const p = point(random)
    const d0 = randomInt(random, -5, 5)
    const value = dot(n, p) + 0
    if (!twoNonZero(n) || value === d0 || value === 0) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(d0, 'kept-d'), whole(-value, 'sign'), whole(value + d0, 'calculation')])
    const prompt = say(`$P${vec(p)}$ puntutik pasatzen den eta $${levelLatex(n, d0)}$ planoaren paraleloa den planoa: $${levelLatex(n, 0).replace(/=0$/, '=d')}$. Zenbat da $d$?`, `Plano por $P${vec(p)}$ paralelo a $${levelLatex(n, d0)}$: $${levelLatex(n, 0).replace(/=0$/, '=d')}$. ¿Cuánto vale $d$?`, `المستوى المار بـ $P${vec(p)}$ والموازي لـ $${levelLatex(n, d0)}$: ‏$${levelLatex(n, 0).replace(/=0$/, '=d')}$. كم يساوي $d$؟`, `Plane through $P${vec(p)}$ parallel to $${levelLatex(n, d0)}$: $${levelLatex(n, 0).replace(/=0$/, '=d')}$. What is $d$?`)
    return choices && build(1, 'parallel-d', prompt, choices, answer, same(`d=\\vec{n}\\cdot P=${value}`), { ...flat('n', n), ...flat('p', p), d0 })
}

/* ---------- 3. Two lines ---------- */

function mixedQuestion(random: Random): PlanesRaceQuestion | null {
    const ab = point(random, 2)
    const u = point(random, 2)
    const v = point(random, 2)
    const value = det3(ab, u, v) + 0
    if (value === 0) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(-value, 'sign'), whole(dot(u, v), 'calculation'), whole(value + 2, 'calculation')])
    const prompt = say(`$[\\overrightarrow{AB},\\vec{u},\\vec{v}]$, $\\overrightarrow{AB}=${vec(ab)}$, $\\vec{u}=${vec(u)}$ eta $\\vec{v}=${vec(v)}$ izanik. Zenbat da?`, `$[\\overrightarrow{AB},\\vec{u},\\vec{v}]$ con $\\overrightarrow{AB}=${vec(ab)}$, $\\vec{u}=${vec(u)}$ y $\\vec{v}=${vec(v)}$. ¿Cuánto vale?`, `$[\\overrightarrow{AB},\\vec{u},\\vec{v}]$ حيث $\\overrightarrow{AB}=${vec(ab)}$ و$\\vec{u}=${vec(u)}$ و$\\vec{v}=${vec(v)}$. كم يساوي؟`, `$[\\overrightarrow{AB},\\vec{u},\\vec{v}]$ with $\\overrightarrow{AB}=${vec(ab)}$, $\\vec{u}=${vec(u)}$ and $\\vec{v}=${vec(v)}$. What is it?`)
    return choices && build(2, 'mixed', prompt, choices, answer, same(`\\det=${value}`), { ...flat('w', ab), ...flat('u', u), ...flat('v', v) })
}

function parallelKQuestion(random: Random): PlanesRaceQuestion | null {
    const u = point(random, 3)
    const factor = pick(random, [2, -1, -2, 3])
    const index = randomInt(random, 0, 2)
    if (!nonZero(u)) return null
    const v = scale(factor, u)
    const answer = fraction(v[index])
    const choices = options(random, answer, [whole(u[index], 'calculation'), whole(-v[index], 'sign'), ratio(u[index], factor, 'calculation')])
    const prompt = say(`$${withK(v, index)}$ norabidea $${vec(u)}$ norabidearen paraleloa da. Zenbat da $k$?`, `La dirección $${withK(v, index)}$ es paralela a $${vec(u)}$. ¿Cuánto vale $k$?`, `الاتجاه $${withK(v, index)}$ موازٍ لـ $${vec(u)}$. كم يساوي $k$؟`, `The direction $${withK(v, index)}$ is parallel to $${vec(u)}$. What is $k$?`)
    return choices && build(2, 'parallel-k', prompt, choices, answer, same(`${withK(v, index)}=${wrap(factor)}\\,${vec(u)}\\ \\to\\ k=${v[index]}`), { ...flat('u', u), factor, index })
}

/** B = (b1, b2, k): the k that makes r and s meet */
function meetKQuestion(random: Random): PlanesRaceQuestion | null {
    const a = point(random, 2)
    const u = point(random, 2)
    const v = point(random, 2)
    const t = randomInt(random, -1, 1)
    const lambda = pick(random, [1, -1])
    const c = cross(u, v)
    if (c[2] === 0) return null
    const b = sub(add(a, scale(t, u)), scale(lambda, v))
    const k = b[2] + 0
    if (Math.abs(k) > 6) return null
    const answer = fraction(k)
    const choices = options(random, answer, [whole(-k, 'sign'), whole(a[2], 'calculation'), whole(k + 1, 'calculation')])
    const prompt = say(`$r$: $${vec(a)}+t\\,${vec(u)}$ eta $s$: $${withK(b, 2)}+\\lambda\\,${vec(v)}$ ebakitzen dira. Zenbat da $k$?`, `$r$: $${vec(a)}+t\\,${vec(u)}$ y $s$: $${withK(b, 2)}+\\lambda\\,${vec(v)}$ se cortan. ¿Cuánto vale $k$?`, `$r$: ‏$${vec(a)}+t\\,${vec(u)}$ و$s$: ‏$${withK(b, 2)}+\\lambda\\,${vec(v)}$ متقاطعان. كم يساوي $k$؟`, `$r$: $${vec(a)}+t\\,${vec(u)}$ and $s$: $${withK(b, 2)}+\\lambda\\,${vec(v)}$ meet. What is $k$?`)
    return choices && build(2, 'meet-k', prompt, choices, answer, same(`[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0\\ \\to\\ k=${k}`), { ...flat('a', a), ...flat('u', u), ...flat('v', v), b1: b[0], b2: b[1] })
}

/* ---------- 4. A line and a plane ---------- */

function meetTQuestion(random: Random): PlanesRaceQuestion | null {
    const a = point(random, 2)
    const u = point(random, 2)
    const n = point(random, 2)
    const along = dot(u, n)
    if (along === 0 || !twoNonZero(n)) return null
    const t = pick(random, [1, 2, -1, -2, 3])
    const d = dot(n, a) + t * along
    const answer = fraction(t)
    const choices = options(random, answer, [whole(-t, 'sign'), whole(d, 'calculation'), ratio(d, along, 'forgot-point')])
    const prompt = say(`$r$: $${vec(a)}+t\\,${vec(u)}$ eta $\\pi$: $${levelLatex(n, d)}$. Zein $t$ baliotan ebakitzen dira?`, `$r$: $${vec(a)}+t\\,${vec(u)}$ y $\\pi$: $${levelLatex(n, d)}$. ¿En qué $t$ se cortan?`, `$r$: ‏$${vec(a)}+t\\,${vec(u)}$ و$\\pi$: ‏$${levelLatex(n, d)}$. عند أي $t$ يتقاطعان؟`, `$r$: $${vec(a)}+t\\,${vec(u)}$ and $\\pi$: $${levelLatex(n, d)}$. For which $t$ do they meet?`)
    return choices && build(3, 'meet-t', prompt, choices, answer, same(`${constantLatex(dot(n, a), true)}${termLatex(along, 't', dot(n, a) === 0)}=${d}\\ \\to\\ t=${t}`), { ...flat('a', a), ...flat('u', u), ...flat('n', n), d })
}

function parallelMQuestion(random: Random): PlanesRaceQuestion | null {
    const n = point(random, 3)
    const u = point(random, 3)
    const index = randomInt(random, 0, 2)
    if (n[index] === 0 || !twoNonZero(n)) return null
    const rest = dot(n, u) - n[index] * u[index]
    if (rest % n[index] !== 0) return null
    const m = -rest / n[index] + 0
    if (Math.abs(m) > 8 || m === 0) return null
    const answer = fraction(m)
    const choices = options(random, answer, [whole(-m, 'sign'), whole(rest, 'calculation'), whole(m + 1, 'calculation')])
    const prompt = say(`$${withK(u, index).replace('k', 'm')}$ norabidea duen zuzena $${levelLatex(n, 1)}$ planoaren paraleloa da. Zenbat da $m$?`, `La recta de dirección $${withK(u, index).replace('k', 'm')}$ es paralela a $${levelLatex(n, 1)}$. ¿Cuánto vale $m$?`, `المستقيم ذو الاتجاه $${withK(u, index).replace('k', 'm')}$ موازٍ لـ $${levelLatex(n, 1)}$. كم يساوي $m$؟`, `The line with direction $${withK(u, index).replace('k', 'm')}$ is parallel to $${levelLatex(n, 1)}$. What is $m$?`)
    return choices && build(3, 'parallel-m', prompt, choices, answer, same(`\\vec{u}\\cdot\\vec{n}=0\\ \\to\\ m=${m}`), { ...flat('n', n), ...flat('u', u), index })
}

function meetPointQuestion(random: Random): PlanesRaceQuestion | null {
    const a = point(random, 2)
    const u = point(random, 2)
    const n = point(random, 2)
    const along = dot(u, n)
    const index = randomInt(random, 0, 2)
    if (along === 0 || !twoNonZero(n) || u[index] === 0 || a[index] === 0) return null
    const t = pick(random, [1, 2, -1, -2])
    const d = dot(n, a) + t * along
    const value = a[index] + t * u[index]
    const answer = fraction(value)
    const choices = options(random, answer, [whole(t, 'forgot-point'), whole(t * u[index], 'forgot-point'), whole(a[index] - t * u[index], 'sign')])
    const prompt = say(`$r$: $${vec(a)}+t\\,${vec(u)}$ zuzenak $${levelLatex(n, d)}$ planoa ebakitzen duen puntua. ${COORDINATE[index].eu}`, `Punto donde $r$: $${vec(a)}+t\\,${vec(u)}$ corta a $${levelLatex(n, d)}$. ${COORDINATE[index].es}`, `النقطة التي يقطع فيها $r$: ‏$${vec(a)}+t\\,${vec(u)}$ المستوى $${levelLatex(n, d)}$. ${COORDINATE[index].ar}`, `Point where $r$: $${vec(a)}+t\\,${vec(u)}$ meets $${levelLatex(n, d)}$. ${COORDINATE[index].en}`)
    return choices && build(3, 'meet-point', prompt, choices, answer, same(`t=${t}\\ \\to\\ ${a[index]}+${wrap(t)}\\cdot ${wrap(u[index])}=${value}`), { ...flat('a', a), ...flat('u', u), ...flat('n', n), d, index })
}

/* ---------- 5. Three planes ---------- */

function detQuestion(random: Random): PlanesRaceQuestion | null {
    const rows = [point(random, 2), point(random, 2), point(random, 2)] as const
    const value = det3(rows[0], rows[1], rows[2]) + 0
    if (value === 0 || rows.some((row) => !twoNonZero(row))) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(-value, 'sign'), whole(rows[0][0] * rows[1][1] * rows[2][2], 'calculation'), whole(value + 2, 'calculation')])
    const planes = rows.map((row, index) => levelLatex(row, index + 1))
    const prompt = say(`$\\det M$, $${planes[0]}$, $${planes[1]}$ eta $${planes[2]}$ planoetarako. Zenbat da?`, `$\\det M$ para $${planes[0]}$, $${planes[1]}$ y $${planes[2]}$. ¿Cuánto vale?`, `$\\det M$ للمستويات $${planes[0]}$ و$${planes[1]}$ و$${planes[2]}$. كم يساوي؟`, `$\\det M$ for $${planes[0]}$, $${planes[1]}$ and $${planes[2]}$. What is it?`)
    return choices && build(4, 'det', prompt, choices, answer, same(`\\det M=${value}`), { ...flat('r', rows[0]), ...flat('s', rows[1]), ...flat('t', rows[2]) })
}

/** The a in a coefficient of the third plane that makes det M = 0 */
function detAQuestion(random: Random): PlanesRaceQuestion | null {
    const r = point(random, 2)
    const s = point(random, 2)
    const t: [number, number, number] = [randomInt(random, -2, 2), randomInt(random, -2, 2), randomInt(random, -2, 2)]
    const index = randomInt(random, 0, 2)
    t[index] = 0
    const slope = cross(r, s)[index] + 0
    const offset = det3(r, s, t) + 0
    if (slope === 0 || offset % slope !== 0) return null
    const a = -offset / slope + 0
    if (Math.abs(a) > 6) return null
    const answer = fraction(a)
    const choices = options(random, answer, [whole(-a, 'sign'), whole(offset, 'calculation'), whole(a + 1, 'calculation')])
    const third = `${symbolLatex(t.map((value, place) => (place === index ? 'a' : value)))}=1`
    const prompt = say(`$a$ parametroaren zein baliotarako da $\\det M=0$, $${levelLatex(r, 1)}$, $${levelLatex(s, 2)}$ eta $${third}$ planoetarako?`, `¿Para qué $a$ es $\\det M=0$ con $${levelLatex(r, 1)}$, $${levelLatex(s, 2)}$ y $${third}$?`, `لأي $a$ يكون $\\det M=0$ مع $${levelLatex(r, 1)}$ و$${levelLatex(s, 2)}$ و$${third}$؟`, `For which $a$ is $\\det M=0$ with $${levelLatex(r, 1)}$, $${levelLatex(s, 2)}$ and $${third}$?`)
    return choices && build(4, 'det-a', prompt, choices, answer, same(`${termLatex(slope, 'a', true)}${constantLatex(offset)}=0\\ \\to\\ a=${a}`), { ...flat('r', r), ...flat('s', s), ...flat('t', t), index })
}

function parallelPlanesQuestion(random: Random): PlanesRaceQuestion | null {
    const n = point(random, 3)
    const factor = pick(random, [2, -1, 3, -2])
    const index = randomInt(random, 0, 2)
    if (!nonZero(n)) return null
    const m = scale(factor, n)
    const answer = fraction(m[index])
    const choices = options(random, answer, [whole(n[index], 'calculation'), whole(-m[index], 'sign'), ratio(n[index], factor, 'calculation')])
    const second = symbolLatex(m.map((value, place) => (place === index ? 'k' : value)))
    const prompt = say(`$${levelLatex(n, 1)}$ eta $${second}=5$ paraleloak dira. Zenbat da $k$?`, `$${levelLatex(n, 1)}$ y $${second}=5$ son paralelos. ¿Cuánto vale $k$?`, `$${levelLatex(n, 1)}$ و$${second}=5$ متوازيان. كم يساوي $k$؟`, `$${levelLatex(n, 1)}$ and $${second}=5$ are parallel. What is $k$?`)
    return choices && build(4, 'parallel-planes', prompt, choices, answer, same(`\\vec{n}_2=${wrap(factor)}\\,\\vec{n}_1\\ \\to\\ k=${m[index]}`), { ...flat('n', n), factor, index })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => PlanesRaceQuestion | null>> = [
    [linePointQuestion, continuousPointQuestion, implicitDirectionQuestion],
    [planeDQuestion, threePointsQuestion, parallelDQuestion],
    [mixedQuestion, parallelKQuestion, meetKQuestion],
    [meetTQuestion, parallelMQuestion, meetPointQuestion],
    [detQuestion, detAQuestion, parallelPlanesQuestion]
]

export function generatePlanesRaceQuestion(random: Random, circuit: number, tier: Tier): PlanesRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkPlanesPitAnswer(question: RaceQuestion<PlanesRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function planesParTime(circuit: number): number {
    return parTimeFor([13, 14, 14, 14, 14][circuit] ?? 14)
}

/** The kinds of question, three per circuit (the tests go through all of them) */
export const planesRaceKinds = ['line-point', 'continuous-point', 'implicit-direction', 'plane-d', 'three-points', 'parallel-d', 'mixed', 'parallel-k', 'meet-k', 'meet-t', 'parallel-m', 'meet-point', 'det', 'det-a', 'parallel-planes'] as const

export const planesRaceErrorTips: Record<PlanesRaceError, LocalizedText> = {
    swap: say('Puntua gai askean doa eta norabidea t parametroaren ondoan.', 'El punto va suelto y el director junto a t.', 'النقطة وحدها والاتجاه بجانب t.', 'The point goes alone and the direction next to t.'),
    'continuous-sign': say('x − a idatzita dago: x + 2 bada, puntua −2 da.', 'Pone x − a: si es x + 2, el punto es −2.', 'المكتوب x − a: إذا كان x + 2 فالنقطة −2.', 'It says x − a: if it is x + 2, the point is −2.'),
    'normal-as-direction': say('Norabidea bi normalen biderkadura bektoriala da.', 'El director es el producto vectorial de los dos normales.', 'الاتجاه هو الجداء المتجهي للناظمين.', 'The direction is the cross product of the two normals.'),
    'j-sign': say('Biderkadura bektorialean j minus zeinuarekin doa.', 'En el producto vectorial, la j va con signo menos.', 'في الجداء المتجهي يأتي j بإشارة سالبة.', 'In the cross product, the j goes with a minus sign.'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    'kept-d': say('Plano paraleloak normal bera du, baina d berria: n · P.', 'El plano paralelo tiene el mismo normal, pero una d nueva: n · P.', 'المستوى الموازي له الناظم نفسه لكن d جديدة: n · P.', 'The parallel plane has the same normal, but a new d: n · P.'),
    'forgot-point': say('Puntua A + t u da: ez ahaztu A.', 'El punto es A + t u: no olvides la A.', 'النقطة A + t u: لا تنسَ A.', 'The point is A + t u: do not forget A.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
