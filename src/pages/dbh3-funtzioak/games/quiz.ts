import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { quad } from '../content.ts'

/* ==========================================================================
   The three picture games of Funtzioak 3. DBH, each a round of eight
   questions with three or four answers:
   J1 · Zein grafiko da? (¿Qué gráfica es?): a graph is drawn and the
       learner picks its equation; the wrong ones turn the slope round,
       swap m and n, invert the slope or move the vertex to the other side.
   J2 · Ibilaldiaren istorioa (La historia del paseo): a walk is told in
       words and the learner picks the distance–time graph that tells it.
   J3 · Zeinuen ehiztaria (Cazador de signos): a graph is drawn and the
       learner says the signs of m and n, or of a and c, or of a and the
       x of the vertex.
   ========================================================================== */

export const QUIZ_ROUNDS = 8

export type Curve =
    | { kind: 'line'; m: number; n: number }
    | { kind: 'parabola'; a: number; b: number; c: number }
    | { kind: 'walk'; positions: number[] }

export const curveAt = (curve: Curve, x: number): number => {
    if (curve.kind === 'line') return curve.m * x + curve.n
    if (curve.kind === 'parabola') return curve.a * x * x + curve.b * x + curve.c
    const hour = Math.min(curve.positions.length - 2, Math.max(0, Math.floor(x)))
    return curve.positions[hour] + (curve.positions[hour + 1] - curve.positions[hour]) * (x - hour)
}

export function quizStars(score: number): Stars {
    if (score >= 8) return 3
    if (score >= 6) return 2
    if (score >= 4) return 1
    return 0
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/* ---------- J1. Which graph is it? ---------- */

export interface MatchRound {
    curve: Curve
    /** LaTeX equations; the first one is right before shuffling */
    options: string[]
    answer: string
    why: LocalizedText
}

const slopeTex = (top: number, bottom: number) => {
    if (bottom === 1) return top === 1 ? '' : top === -1 ? '-' : String(top)
    return `${top < 0 ? '-' : ''}\\frac{${Math.abs(top)}}{${bottom}}`
}
const lineTex = (top: number, bottom: number, n: number) => `y=${slopeTex(top, bottom)}x${n === 0 ? '' : n > 0 ? `+${n}` : n}`

function lineRound(random: Random, fractional: boolean): MatchRound | null {
    const bottom = fractional ? pick(random, [2, 3]) : 1
    const top = fractional ? pick(random, [-2, -1, 1, 2].filter((value) => value % bottom !== 0)) : pick(random, [-3, -2, -1, 1, 2, 3])
    const n = randomInt(random, -4, 4)
    const answer = lineTex(top, bottom, n)
    const wrong = [lineTex(-top, bottom, n), fractional ? lineTex(bottom * Math.sign(top), Math.abs(top), n) : n === 0 ? lineTex(top, 1, top) : lineTex(n, 1, top), lineTex(top, bottom, -n === n ? n + 2 : -n)]
    const options = [...new Set([answer, ...wrong])]
    if (options.length < 4) return null
    return {
        curve: { kind: 'line', m: top / bottom, n },
        options: shuffle(random, options),
        answer,
        why: say(
            `Y ardatza $(0,${n})$ puntuan mozten du, eta ${bottom === 1 ? `1 eskuinera joatean $${top}$ aldatzen da` : `${bottom} eskuinera joatean $${top}$ aldatzen da`}: $${answer}$.`,
            `Corta al eje Y en $(0,${n})$ y ${bottom === 1 ? `al avanzar 1 a la derecha cambia $${top}$` : `al avanzar ${bottom} a la derecha cambia $${top}$`}: $${answer}$.`,
            `يقطع محور Y في $(0,${n})$، وعند التقدم $${bottom}$ إلى اليمين يتغيّر بمقدار $${top}$: $${answer}$.`,
            `It meets the Y axis at $(0,${n})$ and ${bottom === 1 ? `moving 1 to the right it changes by $${top}$` : `moving ${bottom} to the right it changes by $${top}$`}: $${answer}$.`
        )
    }
}

function parabolaRound(random: Random): MatchRound | null {
    const a = pick(random, [1, -1])
    const p = randomInt(random, -3, 3)
    const q = randomInt(random, -3, 3)
    const expanded = (aa: number, pp: number, qq: number) => `y=${quad(aa, -2 * aa * pp, aa * pp * pp + qq)}`
    const answer = expanded(a, p, q)
    const options = [...new Set([answer, expanded(-a, p, q), expanded(a, -p, q), expanded(a, p, q === 0 ? 2 : -q)])]
    if (options.length < 4 || p === 0) return null
    return {
        curve: { kind: 'parabola', a, b: -2 * a * p, c: a * p * p + q },
        options: shuffle(random, options),
        answer,
        why: say(
            `${a > 0 ? 'Gora' : 'Behera'} irekitzen da ($a${a > 0 ? '>' : '<'}0$) eta erpina $(${p},${q})$ da: $x_{v}=\\frac{-b}{2a}=${p}$.`,
            `Se abre hacia ${a > 0 ? 'arriba' : 'abajo'} ($a${a > 0 ? '>' : '<'}0$) y el vértice es $(${p},${q})$: $x_{v}=\\frac{-b}{2a}=${p}$.`,
            `ينفتح إلى ${a > 0 ? 'الأعلى' : 'الأسفل'} ($a${a > 0 ? '>' : '<'}0$) والرأس $(${p},${q})$: $x_{v}=\\frac{-b}{2a}=${p}$.`,
            `It opens ${a > 0 ? 'upwards' : 'downwards'} ($a${a > 0 ? '>' : '<'}0$) and the vertex is $(${p},${q})$: $x_{v}=\\frac{-b}{2a}=${p}$.`
        )
    }
}

export function createMatchRounds(random: Random, level: number): MatchRound[] {
    const rounds: MatchRound[] = []
    while (rounds.length < QUIZ_ROUNDS) {
        const next = level === 2 ? parabolaRound(random) : lineRound(random, level === 1)
        if (next && !rounds.some((round) => round.answer === next.answer)) rounds.push(next)
    }
    return rounds
}

/* ---------- J2. The story of a walk ---------- */

export type Stretch = 'up' | 'up-fast' | 'up-slow' | 'flat' | 'down' | 'down-fast' | 'down-slow'

const SPEED: Record<Stretch, number> = { up: 2, 'up-fast': 3, 'up-slow': 1, flat: 0, down: -2, 'down-fast': -3, 'down-slow': -1 }

const PHRASES: Record<Stretch, LocalizedText> = {
    up: say('etxetik urrundu da', 'se aleja de casa', 'يبتعد عن البيت', 'walks away from home'),
    'up-fast': say('azkar urrundu da', 'se aleja deprisa', 'يبتعد بسرعة', 'moves away quickly'),
    'up-slow': say('poliki urrundu da', 'se aleja despacio', 'يبتعد ببطء', 'moves away slowly'),
    flat: say('gelditu egin da', 'se para', 'يتوقّف', 'stops'),
    down: say('etxerantz itzuli da', 'vuelve hacia casa', 'يعود نحو البيت', 'walks back towards home'),
    'down-fast': say('azkar itzuli da etxerantz', 'vuelve deprisa hacia casa', 'يعود بسرعة نحو البيت', 'hurries back towards home'),
    'down-slow': say('poliki itzuli da etxerantz', 'vuelve despacio hacia casa', 'يعود ببطء نحو البيت', 'comes back slowly towards home')
}

export const storyPositions = (stretches: Stretch[]) => stretches.reduce((positions, stretch) => [...positions, positions.at(-1)! + SPEED[stretch]], [0])
const valid = (stretches: Stretch[]) => storyPositions(stretches).every((position) => position >= 0)

export function storyText(stretches: Stretch[]): LocalizedText {
    const parts = (language: keyof LocalizedText) => stretches.map((stretch) => PHRASES[stretch][language])
    /** «first A, then B and finally C» */
    const join = (words: string[], first: string, then: string, last: string, comma: string) => `${first} ${words.slice(0, -1).map((word, index) => (index === 0 ? word : `${then} ${word}`)).join(comma)} ${last} ${words.at(-1)}.`
    return {
        eu: `Ordu bakoitzean: ${join(parts('eu'), 'lehenik', 'gero', 'eta azkenik', ', ')}`,
        es: `Cada hora: ${join(parts('es'), 'primero', 'después', 'y por último', ', ')}`,
        ar: `في كل ساعة: ${join(parts('ar'), 'أولًا', 'ثم', 'وأخيرًا', '، ')}`,
        en: `Hour by hour: ${join(parts('en'), 'first it', 'then it', 'and finally it', ', ')}`
    }
}

export interface StoryRound {
    stretches: Stretch[]
    story: LocalizedText
    /** Distance at each hour of every option; the first one is right before shuffling */
    options: number[][]
    answer: number[]
}

const POOLS: Stretch[][] = [['up', 'flat', 'down'], ['up-fast', 'up-slow', 'flat', 'down-fast', 'down-slow'], ['up-fast', 'up-slow', 'flat', 'down-fast', 'down-slow']]

/** A wrong graph: two stretches swapped, one read the other way or one at the wrong speed */
function twist(random: Random, stretches: Stretch[]): Stretch[] {
    const copy = [...stretches]
    const i = randomInt(random, 0, copy.length - 1)
    const move = randomInt(random, 0, 2)
    if (move === 0 && i + 1 < copy.length) [copy[i], copy[i + 1]] = [copy[i + 1], copy[i]]
    else if (move === 1) copy[i] = copy[i] === 'flat' ? 'up' : copy[i].startsWith('up') ? 'flat' : 'up'
    else copy[i] = ({ up: 'down', 'up-fast': 'up-slow', 'up-slow': 'up-fast', flat: 'down', down: 'up', 'down-fast': 'down-slow', 'down-slow': 'down-fast' } as const)[copy[i]]
    return copy
}

function storyRound(random: Random, level: number): StoryRound | null {
    const pool = POOLS[level] ?? POOLS[0]
    const length = level === 2 ? 4 : 3
    const stretches = Array.from({ length }, () => pick(random, pool))
    if (!valid(stretches) || new Set(stretches).size < 2) return null
    const answer = storyPositions(stretches)
    const key = (positions: number[]) => positions.join(',')
    const options = [answer]
    for (let attempt = 0; attempt < 60 && options.length < 3; attempt += 1) {
        const other = twist(random, stretches)
        if (!valid(other)) continue
        const positions = storyPositions(other)
        if (options.some((option) => key(option) === key(positions))) continue
        options.push(positions)
    }
    if (options.length < 3) return null
    return { stretches, story: storyText(stretches), options: shuffle(random, options), answer }
}

export function createStoryRounds(random: Random, level: number): StoryRound[] {
    const rounds: StoryRound[] = []
    while (rounds.length < QUIZ_ROUNDS) {
        const next = storyRound(random, level)
        if (next && !rounds.some((round) => round.answer.join() === next.answer.join())) rounds.push(next)
    }
    return rounds
}

/* ---------- J3. Signs ---------- */

export type SignPair = '++' | '+-' | '-+' | '--'
export const SIGN_PAIRS: SignPair[] = ['++', '+-', '-+', '--']
/** The two letters each level asks about */
export const SIGN_LETTERS: Array<[string, string]> = [['m', 'n'], ['a', 'c'], ['a', 'x_{v}']]

export interface SignsRound {
    curve: Curve
    answer: SignPair
}

const signOf = (value: number) => (value > 0 ? '+' : '-')

function signsRound(random: Random, level: number): SignsRound | null {
    if (level === 0) {
        const m = pick(random, [-3, -2, -1, -0.5, 0.5, 1, 2, 3])
        const n = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
        return { curve: { kind: 'line', m, n }, answer: `${signOf(m)}${signOf(n)}` as SignPair }
    }
    const a = pick(random, [-1, -0.5, 0.5, 1])
    const p = randomInt(random, -3, 3)
    const q = randomInt(random, -3, 3)
    const b = -2 * a * p
    const c = a * p * p + q
    if (level === 1 && c === 0) return null
    if (level === 2 && p === 0) return null
    return { curve: { kind: 'parabola', a, b, c }, answer: `${signOf(a)}${signOf(level === 1 ? c : p)}` as SignPair }
}

export function createSignsRounds(random: Random, level: number): SignsRound[] {
    const plan = shuffle(random, Array.from({ length: QUIZ_ROUNDS }, (_, index) => SIGN_PAIRS[index % 4]))
    return plan.map((wanted) => {
        for (;;) {
            const next = signsRound(random, level)
            if (next && next.answer === wanted) return next
        }
    })
}

export const signsLatex = (pair: SignPair, [first, second]: [string, string]) => `${first}${pair[0] === '+' ? '>' : '<'}0,\\ ${second}${pair[1] === '+' ? '>' : '<'}0`

export function signsWhy(round: SignsRound, level: number): LocalizedText {
    const answer = `$${signsLatex(round.answer, SIGN_LETTERS[level])}$`
    if (level === 0) return say(`Igotzen bada $m>0$; Y ardatza 0-tik gora mozten badu $n>0$: ${answer}.`, `Si sube, $m>0$; si corta al eje Y por encima del 0, $n>0$: ${answer}.`, `إذا صعد فإن $m>0$؛ وإذا قطع محور Y فوق $0$ فإن $n>0$: ${answer}.`, `Rising means $m>0$; meeting the Y axis above 0 means $n>0$: ${answer}.`)
    if (level === 1) return say(`Gora irekitzen bada $a>0$; $c$ Y ardatzeko puntua da: ${answer}.`, `Si se abre hacia arriba, $a>0$; $c$ es el corte con el eje Y: ${answer}.`, `إذا انفتح إلى الأعلى فإن $a>0$؛ و$c$ هو التقاطع مع محور Y: ${answer}.`, `Opening upwards means $a>0$; $c$ is where it meets the Y axis: ${answer}.`)
    return say(`Gora irekitzen bada $a>0$; erpina Y ardatzaren eskuinean badago $x_{v}>0$: ${answer}.`, `Si se abre hacia arriba, $a>0$; si el vértice está a la derecha del eje Y, $x_{v}>0$: ${answer}.`, `إذا انفتح إلى الأعلى فإن $a>0$؛ وإذا كان الرأس يمين محور Y فإن $x_{v}>0$: ${answer}.`, `Opening upwards means $a>0$; a vertex to the right of the Y axis means $x_{v}>0$: ${answer}.`)
}

