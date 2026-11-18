import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { objectiveValue, optimum, vertices, withSigns, type Goal, type HalfPlane, type Objective, type Point, type SolutionKind } from '../lp.ts'

/* ==========================================================================
   The round games of Programazio lineala (Batxilergoa 2 · Gizarte
   Zientziak). J1 · Zein erpinek irabazten du? (¿Qué vértice gana?): a
   region and F; choose the optimal vertex among four points (level 2
   adds the origin, which is not in a region of «at least»). J2 ·
   Murrizketa azkarra (Restricción exprés): a sentence and four
   inequalities. J3 · Bakarra, anitza ala bat ere ez? (¿Única, múltiple o
   ninguna?): a region and F; the kind of solution. Everything is worked
   out by lp.ts, so the tests can check every round.
   ========================================================================== */

export const VERTEX_ROUNDS = 5
export const EXPRESS_ROUNDS = 5
export const KIND_ROUNDS = 6
export const KIND_OPTIONS: SolutionKind[] = ['unique', 'multiple', 'unbounded', 'empty']

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const L = (a: number, b: number, c: number, sense: HalfPlane['sense'] = '≤'): HalfPlane => ({ a, b, c, sense })
const samePoint = (p: Point, q: Point) => p[0] === q[0] && p[1] === q[1]

/** Two lines through a whole-number point (p, q), with small positive coefficients */
function twoLines(random: Random, sense: HalfPlane['sense']): HalfPlane[] | null {
    const p = randomInt(random, 1, 5)
    const q = randomInt(random, 1, 5)
    const first = [randomInt(random, 1, 3), randomInt(random, 1, 3)]
    const second = [randomInt(random, 1, 3), randomInt(random, 1, 3)]
    if (first[0] * second[1] - first[1] * second[0] === 0) return null
    return [L(first[0], first[1], first[0] * p + first[1] * q, sense), L(second[0], second[1], second[0] * p + second[1] * q, sense)]
}

/* ---------- J1 · Which vertex wins? ---------- */

export interface VertexRound {
    level: number
    constraints: HalfPlane[]
    objective: Objective
    goal: Goal
    options: Point[]
    answer: number
    values: number[]
}

function vertexRound(random: Random, level: number): VertexRound | null {
    const goal: Goal = level === 1 ? 'min' : 'max'
    const lines = twoLines(random, goal === 'min' ? '≥' : '≤')
    if (!lines) return null
    const constraints = level === 2 ? [...lines, L(1, 0, randomInt(random, 2, 6))] : lines
    const objective = { a: randomInt(random, 1, 6), b: randomInt(random, 1, 6) }
    const found = optimum(withSigns(constraints), objective, goal)
    if (found.kind !== 'unique') return null
    const points = vertices(withSigns(constraints))
    const best = found.at[0]
    const others = shuffle(random, points.filter((point) => !samePoint(point, best)))
    // In a region of «at least» the origin is a trap: it is not in the region
    const traps: Point[] = goal === 'min' ? [[0, 0]] : []
    const options = shuffle(random, [best, ...[...traps, ...others].slice(0, 3)])
    if (options.length < 4) return null
    return { level, constraints, objective, goal, options, answer: options.findIndex((point) => samePoint(point, best)), values: options.map((point) => objectiveValue(objective, point)) }
}

export function createVertexRounds(random: Random, level: number): VertexRound[] {
    const rounds: VertexRound[] = []
    for (let attempt = 0; rounds.length < VERTEX_ROUNDS && attempt < 5000; attempt += 1) {
        const round = vertexRound(random, level)
        if (!round || rounds.some((other) => JSON.stringify(other.constraints) === JSON.stringify(round.constraints))) continue
        rounds.push(round)
    }
    return rounds
}

/* ---------- J2 · Constraint express ---------- */

export interface ExpressRound {
    sentence: LocalizedText
    letters: LocalizedText
    options: string[]
    answer: number
    right: string
    /** A point that makes the sentence true and one that makes it false */
    inside: Point
    outside: Point
}

type ExpressTemplate = (random: Random) => Omit<ExpressRound, 'options' | 'answer'> & { wrong: string[] }

const PRODUCTS = say('$x$: A produktua; $y$: B produktua', '$x$: producto A; $y$: producto B', '$x$: المنتج A؛ $y$: المنتج B', '$x$: product A; $y$: product B')

const atMostHours: ExpressTemplate = (random) => {
    const p = randomInt(random, 2, 4)
    const q = p === 2 ? 3 : randomInt(random, 1, p - 1)
    const n = 10 * randomInt(random, 3, 8)
    return { sentence: say(`A-k ${p} ordu behar ditu eta B-k ${q}; gehienez ${n} ordu daude.`, `A necesita ${p} horas y B, ${q}; hay como mucho ${n} horas.`, `يحتاج A إلى ${p} ساعات وB إلى ${q}؛ وتتوفر ${n} ساعة على الأكثر.`, `A needs ${p} hours and B ${q}; there are at most ${n} hours.`), letters: PRODUCTS, right: `${p}x+${q}y\\le ${n}`, wrong: [`${p}x+${q}y\\ge ${n}`, `${q}x+${p}y\\le ${n}`, `x+y\\le ${n}`], inside: [1, 1], outside: [n, 0] }
}
const atLeastTotal: ExpressTemplate = (random) => {
    const n = randomInt(random, 5, 30)
    return { sentence: say(`Guztira gutxienez ${n} unitate egin behar dira.`, `Hay que hacer al menos ${n} unidades en total.`, `يجب صنع ${n} وحدة على الأقل إجمالًا.`, `At least ${n} units must be made in total.`), letters: PRODUCTS, right: `x+y\\ge ${n}`, wrong: [`x+y\\le ${n}`, `x\\ge ${n}`, `xy\\ge ${n}`], inside: [n, 1], outside: [1, 1] }
}
const noMoreA: ExpressTemplate = (random) => {
    const n = randomInt(random, 4, 20)
    return { sentence: say(`A-tik ezin dira ${n} baino gehiago egin.`, `De A no se pueden hacer más de ${n}.`, `لا يمكن صنع أكثر من ${n} من A.`, `No more than ${n} of A can be made.`), letters: PRODUCTS, right: `x\\le ${n}`, wrong: [`x\\ge ${n}`, `y\\le ${n}`, `x+y\\le ${n}`], inside: [1, n + 3], outside: [n + 1, 0] }
}
const twiceAsMuch: ExpressTemplate = (random) => {
    const k = randomInt(random, 2, 3)
    return { sentence: say(`A-tik gutxienez B-tik adina bider ${k} egin behar da.`, `De A hay que hacer al menos ${k} veces lo que de B.`, `يجب أن يُصنع من A على الأقل ${k} أضعاف ما يُصنع من B.`, `At least ${k} times as much A as B must be made.`), letters: PRODUCTS, right: `x\\ge ${k}y`, wrong: [`y\\ge ${k}x`, `x\\le ${k}y`, `x+y\\ge ${k}`], inside: [k + 1, 1], outside: [1, 1] }
}
const budget: ExpressTemplate = (random) => {
    const [p, q] = [randomInt(random, 2, 6), randomInt(random, 2, 6)]
    const n = 10 * randomInt(random, 5, 12)
    if (p === q) return budget(random)
    return { sentence: say(`A-k ${p} euro balio du eta B-k ${q}; aurrekontuak ez ditu ${n} euro gainditzen.`, `A cuesta ${p} € y B, ${q} €; el presupuesto no supera los ${n} €.`, `ثمن A ${p} € وB ${q} €؛ والميزانية لا تتجاوز ${n} €.`, `A costs €${p} and B €${q}; the budget does not exceed €${n}.`), letters: PRODUCTS, right: `${p}x+${q}y\\le ${n}`, wrong: [`${p}x+${q}y\\ge ${n}`, `${p}x+${q}y=${n}`, `x+y\\le ${n}`], inside: [1, 1], outside: [n, n] }
}
const notMoreThanA: ExpressTemplate = () => ({ sentence: say('B-tik ezin da A-tik baino gehiago egin.', 'De B no se puede hacer más que de A.', 'لا يمكن أن يُصنع من B أكثر مما يُصنع من A.', 'No more B than A can be made.'), letters: PRODUCTS, right: 'y\\le x', wrong: ['x\\le y', 'y\\ge x', 'x+y\\le 0'], inside: [3, 1], outside: [1, 3] })
const atLeastEach: ExpressTemplate = (random) => {
    const n = randomInt(random, 2, 8)
    return { sentence: say(`B-tik gutxienez ${n} unitate egin behar dira.`, `De B hay que hacer al menos ${n} unidades.`, `يجب صنع ${n} وحدات على الأقل من B.`, `At least ${n} units of B must be made.`), letters: PRODUCTS, right: `y\\ge ${n}`, wrong: [`y\\le ${n}`, `x\\ge ${n}`, `x+y\\ge ${n}`], inside: [0, n + 1], outside: [n + 5, 0] }
}
const proteins: ExpressTemplate = (random) => {
    const p = randomInt(random, 3, 5)
    const q = randomInt(random, 1, 2)
    const n = randomInt(random, 10, 30)
    return { sentence: say(`A pentsuak ${p} unitate proteina ditu kiloko, eta B pentsuak ${q}; gutxienez ${n} behar dira.`, `El pienso A tiene ${p} unidades de proteína por kilo y el B, ${q}; hacen falta al menos ${n}.`, `في العلف A ${p} وحدات بروتين لكل كيلوغرام وفي B ${q}؛ ويلزم ${n} على الأقل.`, `Feed A has ${p} units of protein per kilo and B ${q}; at least ${n} are needed.`), letters: say('$x$, $y$: A eta B pentsuen kiloak', '$x$, $y$: kilos de los piensos A y B', '$x$ و$y$: كيلوغرامات العلفين A وB', '$x$, $y$: kilos of feeds A and B'), right: `${p}x+${q}y\\ge ${n}`, wrong: [`${p}x+${q}y\\le ${n}`, `${q}x+${p}y\\ge ${n}`, `x+y\\ge ${n}`], inside: [n, n], outside: [0, 0] }
}

export const EXPRESS_LEVELS: ExpressTemplate[][] = [[atMostHours, atLeastTotal, noMoreA], [budget, atLeastEach, notMoreThanA], [twiceAsMuch, proteins, atMostHours]]

export function createExpressRounds(random: Random, level: number): ExpressRound[] {
    const templates = EXPRESS_LEVELS[level] ?? EXPRESS_LEVELS[0]
    return shuffle(random, [...templates, ...templates]).slice(0, EXPRESS_ROUNDS).map((template) => {
        const made = template(random)
        const options = shuffle(random, [made.right, ...made.wrong])
        return { sentence: made.sentence, letters: made.letters, right: made.right, inside: made.inside, outside: made.outside, options, answer: options.indexOf(made.right) }
    })
}

/* ---------- J3 · Unique, multiple or none? ---------- */

export interface KindRound {
    level: number
    constraints: HalfPlane[]
    objective: Objective
    goal: Goal
    kind: SolutionKind
    answer: number
}

function kindRound(random: Random, level: number, kind: SolutionKind): KindRound | null {
    let constraints: HalfPlane[] | null
    let objective: Objective
    let goal: Goal = level === 2 ? pick(random, ['max', 'min'] as Goal[]) : 'max'
    if (kind === 'empty') {
        const c = randomInt(random, 2, 6)
        constraints = pick(random, [[L(1, 1, c), L(1, 1, c + randomInt(random, 2, 4), '≥')], [L(1, 0, c), L(1, 0, c + randomInt(random, 2, 4), '≥'), L(0, 1, 5)]])
        objective = { a: randomInt(random, 1, 4), b: randomInt(random, 1, 4) }
    } else if (kind === 'unbounded') {
        constraints = twoLines(random, '≥')
        objective = { a: randomInt(random, 1, 4), b: randomInt(random, 1, 4) }
        goal = 'max'
    } else {
        const ofGoal = goal === 'min' ? '≥' : '≤'
        constraints = twoLines(random, ofGoal)
        if (!constraints) return null
        objective = kind === 'multiple' ? { a: constraints[0].a, b: constraints[0].b } : { a: randomInt(random, 1, 5), b: randomInt(random, 1, 5) }
    }
    if (!constraints) return null
    const found = optimum(withSigns(constraints), objective, goal)
    if (found.kind !== kind) return null
    return { level, constraints, objective, goal, kind, answer: KIND_OPTIONS.indexOf(kind) }
}

/** Which kinds each level has: first unique and multiple, then all four */
const KIND_MIX: SolutionKind[][] = [
    ['unique', 'multiple', 'unique', 'multiple', 'unique', 'multiple'],
    ['unique', 'multiple', 'unbounded', 'empty', 'unbounded', 'multiple'],
    ['unique', 'multiple', 'unbounded', 'empty', 'unique', 'empty']
]

export function createKindRounds(random: Random, level: number): KindRound[] {
    const kinds = shuffle(random, KIND_MIX[level] ?? KIND_MIX[0])
    const rounds: KindRound[] = []
    for (let attempt = 0; rounds.length < KIND_ROUNDS && attempt < 8000; attempt += 1) {
        const round = kindRound(random, level, kinds[rounds.length])
        if (!round || rounds.some((other) => JSON.stringify(other.constraints) === JSON.stringify(round.constraints) && other.objective.a === round.objective.a && other.objective.b === round.objective.b)) continue
        rounds.push(round)
    }
    return rounds
}
