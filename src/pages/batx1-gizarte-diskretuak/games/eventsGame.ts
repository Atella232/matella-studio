import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { binomialPmfDecimal } from '../../batx2-zientziak-banaketak/binomial.ts'

/* ==========================================================================
   J2 · Itzuli gertaera (Traduce el suceso): X counts something in n
   trials and an event comes in words. Level 1 asks for its symbol (≥, >,
   ≤, < or =), with the neighbouring symbols as wrong options («more than»
   taken as ≥, «at most» as <…). Level 2 asks for the complement that
   computes it: «some» is 1 − P(X = 0), not 1 − P(X = 1); «more than one»
   takes off X = 0 and X = 1; «not all» is 1 − P(X = n); «none» is qⁿ, not
   pⁿ. Level 3 asks for the number in a small B(n; p) (n = 3 or 4, p in
   tenths), with the boundary moved by one and the other side as wrong
   options. Pure logic.
   ========================================================================== */

export const EVENTS_ROUNDS = 6

export type Relation = 'ge' | 'gt' | 'le' | 'lt' | 'eq'
export type Complement = 'some' | 'moreThanOne' | 'notAll' | 'none'

export interface EventsRound {
    context: LocalizedText
    /** The event in words */
    event: LocalizedText
    n: number
    /** p in tenths (levels 2 and 3) */
    p: number
    options: string[]
    answer: number
}

const RELATION_LATEX: Record<Relation, string> = { ge: '\\ge', gt: '>', le: '\\le', lt: '<', eq: '=' }
/** The two symbols a learner mixes up with each one */
const CONFUSED: Record<Relation, [Relation, Relation]> = { ge: ['gt', 'le'], gt: ['ge', 'lt'], le: ['lt', 'ge'], lt: ['le', 'gt'], eq: ['ge', 'le'] }

/** The words of an event with a number k */
function relationWords(relation: Relation, k: number): LocalizedText {
    switch (relation) {
        case 'ge': return say(`gutxienez ${k}`, `al menos ${k}`, `${k} على الأقل`, `at least ${k}`)
        case 'gt': return say(`${k} baino gehiago`, `más de ${k}`, `أكثر من ${k}`, `more than ${k}`)
        case 'le': return say(`gehienez ${k}`, `como mucho ${k}`, `${k} على الأكثر`, `at most ${k}`)
        case 'lt': return say(`${k} baino gutxiago`, `menos de ${k}`, `أقل من ${k}`, `fewer than ${k}`)
        case 'eq': return say(`zehazki ${k}`, `exactamente ${k}`, `${k} بالضبط`, `exactly ${k}`)
    }
}

/** What X counts, in n trials */
const CONTEXTS: Array<(n: number) => LocalizedText> = [
    (n) => say(`${n} piezako kutxa bat; $X$ = akastunak.`, `Una caja de ${n} piezas; $X$ = defectuosas.`, `صندوق فيه ${n} قطع؛ $X$ = المعيبة.`, `A box of ${n} parts; $X$ = faulty ones.`),
    (n) => say(`${n} bezero; $X$ = erosten dutenak.`, `${n} clientes; $X$ = los que compran.`, `${n} زبائن؛ $X$ = من يشترون.`, `${n} customers; $X$ = those who buy.`),
    (n) => say(`${n} galderako testa; $X$ = asmatzeak.`, `Un test de ${n} preguntas; $X$ = aciertos.`, `اختبار من ${n} أسئلة؛ $X$ = الإجابات الصحيحة.`, `A test of ${n} questions; $X$ = right answers.`),
    (n) => say(`${n} hegaldi; $X$ = berandu iristen direnak.`, `${n} vuelos; $X$ = los que llegan tarde.`, `${n} رحلات؛ $X$ = المتأخرة.`, `${n} flights; $X$ = late ones.`)
]

const COMPLEMENT_WORDS: Record<Complement, LocalizedText> = {
    some: say('gutxienez bat', 'al menos uno', 'واحد على الأقل', 'at least one'),
    moreThanOne: say('bat baino gehiago', 'más de uno', 'أكثر من واحد', 'more than one'),
    notAll: say('ez denak', 'no todos', 'ليس الكل', 'not all of them'),
    none: say('bat ere ez', 'ninguno', 'لا أحد', 'none')
}

const tenths = (value: number) => String(value / 10).replace('.', '{,}')
/** A decimal exact to four places, for LaTeX */
const decimal = (value: number) => {
    for (let places = 0; places <= 4; places += 1) {
        if (Math.abs(Math.round(value * 10 ** places) - value * 10 ** places) < 1e-7) return value.toFixed(places).replace('.', '{,}')
    }
    return value.toFixed(4).replace('.', '{,}')
}
/** P(relation k) in B(n; p/10) */
export function eventProbability(n: number, p: number, relation: Relation, k: number): number {
    let sum = 0
    for (let j = 0; j <= n; j += 1) {
        const inside = relation === 'ge' ? j >= k : relation === 'gt' ? j > k : relation === 'le' ? j <= k : relation === 'lt' ? j < k : j === k
        if (inside) sum += binomialPmfDecimal(n, p / 10, j)
    }
    return sum
}

function makeRound(random: Random, level: number): EventsRound | null {
    if (level === 0) {
        const n = randomInt(random, 6, 10)
        const k = randomInt(random, 2, n - 2)
        const relation = pick(random, ['ge', 'gt', 'le', 'lt', 'eq'] as Relation[])
        const right = `X${RELATION_LATEX[relation]} ${k}`
        const options = shuffle(random, [right, ...CONFUSED[relation].map((other) => `X${RELATION_LATEX[other]} ${k}`)])
        return { context: pick(random, CONTEXTS)(n), event: relationWords(relation, k), n, p: 0, options, answer: options.indexOf(right) }
    }
    if (level === 1) {
        const n = randomInt(random, 4, 8)
        const p = randomInt(random, 1, 4)
        const kind = pick(random, ['some', 'moreThanOne', 'notAll', 'none'] as Complement[])
        const values: Record<Complement, string[]> = {
            some: ['1-P(X=0)', '1-P(X=1)', 'P(X=1)'],
            moreThanOne: ['1-P(X=0)-P(X=1)', '1-P(X=0)', '1-P(X=1)'],
            notAll: [`1-P(X=${n})`, `P(X=${n})`, '1-P(X=0)'],
            none: [`${tenths(10 - p)}^{${n}}`, `${tenths(p)}^{${n}}`, `1-${tenths(10 - p)}^{${n}}`]
        }
        const [right, ...wrong] = values[kind]
        const options = shuffle(random, [right, ...wrong])
        return { context: pick(random, CONTEXTS)(n), event: COMPLEMENT_WORDS[kind], n, p, options, answer: options.indexOf(right) }
    }
    const n = randomInt(random, 3, 4)
    const p = randomInt(random, 1, 9)
    const relation = pick(random, ['ge', 'gt', 'le', 'lt'] as Relation[])
    const k = randomInt(random, 1, n - 1)
    const right = eventProbability(n, p, relation, k)
    // The boundary taken on the other side (≥ for >, < for ≤…), and the complement of the right one
    const moved: Record<Relation, Relation> = { ge: 'gt', gt: 'ge', le: 'lt', lt: 'le', eq: 'eq' }
    const values = [right, eventProbability(n, p, moved[relation], k), 1 - right].map(decimal)
    if (new Set(values).size < 3 || values.some((value) => value === '0' || value === '1')) return null
    const options = shuffle(random, values)
    return { context: pick(random, CONTEXTS)(n), event: relationWords(relation, k), n, p, options, answer: options.indexOf(values[0]) }
}

export function createEventsRounds(random: Random, level: number): EventsRound[] {
    const rounds: EventsRound[] = []
    for (let attempt = 0; attempt < 2000 && rounds.length < EVENTS_ROUNDS; attempt += 1) {
        const round = makeRound(random, level)
        if (round && !rounds.some((other) => other.context.es === round.context.es && other.event.es === round.event.es && other.p === round.p)) rounds.push(round)
    }
    return rounds
}

export const eventsBinomialLatex = (round: EventsRound) => `X\\sim B(${round.n};\\,${tenths(round.p)})`
