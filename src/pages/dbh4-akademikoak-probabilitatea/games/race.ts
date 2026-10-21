import { add, checkAnswer, fraction, gcd, multiply, power, subtract, toExactDecimal, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readStatisticsAnswer } from '../../dbh2-estatistika-v2/answers.ts'

/* ==========================================================================
   Probabilitatearen lasterketa (4. DBH akademikoak): five circuits, one per
   stage — events (the elements of a union, the outcomes of coins and
   dice, the contrary and «neither… nor»), probability (two dice, the
   Spanish deck, the union of two events), compound experiments (a coin
   and a die or two dice, two draws without replacement, «at least
   once»), conditional probability (a table, the formula, a die that
   chooses the urn) and counting (drawing at once, the maximum of the dice,
   the expected gain). Wrong options are typical mistakes: the common part
   counted twice, the contrary of what was asked, the sums of two dice
   taken as equally likely, adding instead of multiplying, drawing as if
   the ball were returned, «none» instead of «at least one», the condition
   turned round, one path forgotten, the losses left out… Every answer is
   one number (a fraction, an exact decimal, a count or euros), so every
   question can be written at the pit stop; every question carries
   `meta`, the numbers of its prompt, so the test recomputes the answer.
   ========================================================================== */

export const PROBABILITY_AK_RACE_CIRCUITS = 5

export type ProbabilityAkRaceError =
    | 'double-count'
    | 'intersection'
    | 'contrary'
    | 'sum'
    | 'power'
    | 'equiprobable'
    | 'value'
    | 'no-subtract'
    | 'independent'
    | 'add'
    | 'missing'
    | 'replacement'
    | 'denominator'
    | 'one-path'
    | 'add-probabilities'
    | 'none'
    | 'all'
    | 'joint'
    | 'swap-condition'
    | 'simple'
    | 'product'
    | 'unweighted'
    | 'merge'
    | 'single'
    | 'at-most'
    | 'one-die'
    | 'no-probabilities'
    | 'sign'
    | 'missing-loss'
    | 'calculation'

export type ProbabilityAkRaceQuestion = RaceQuestion<ProbabilityAkRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string | number) => `$${latex}$`
const f = (numerator: number, denominator = 1) => fraction(numerator, denominator)
const valueOf = (value: FractionValue) => value.numerator / value.denominator

/** How the options of a question are written: counts, fractions or exact decimals */
type Mode = 'count' | 'fraction' | 'decimal'

/** A value in LaTeX in the mode of its question, or null when it cannot be written so */
export function written(value: FractionValue, mode: Mode): string | null {
    if (mode === 'decimal') {
        const text = toExactDecimal(value, ',')
        if (text === null || (text.split(',')[1] ?? '').length > 3) return null
        return text.replace(',', '{,}')
    }
    if (value.denominator === 1) return String(value.numerator)
    if (mode === 'count') return null
    return `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
}
/** A decimal from hundredths, for prompts: 35 → 0{,}35 */
const hundredths = (value: number) => written(f(value, 100), 'decimal')!

interface Candidate {
    value: FractionValue
    error: ProbabilityAkRaceError
}

const wrong = (value: FractionValue | number, error: ProbabilityAkRaceError): Candidate => ({ value: typeof value === 'number' ? f(value) : value, error })
/** Slips of the count or of the numerator over the same denominator */
const near = (value: FractionValue, denominator = value.denominator): Candidate[] => {
    const top = (value.numerator * denominator) / value.denominator
    return [top + 1, top - 1, top + 2, top - 2].map((item) => wrong(f(item, denominator), 'calculation'))
}

/** The right option and three different mistakes, all within [min, max]; a wrong probability is never 0 */
function options(random: Random, right: FractionValue, candidates: Candidate[], mode: Mode, [min, max] = mode === 'count' ? [1, 100_000] : [1e-9, 1]): RaceOption<ProbabilityAkRaceError>[] | null {
    const rightLatex = written(right, mode)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const picked: Array<{ latex: string; error: ProbabilityAkRaceError }> = []
    for (const candidate of candidates) {
        if (picked.length === 3) break
        const value = valueOf(candidate.value)
        if (!Number.isFinite(value) || value < min || value > max) continue
        const latex = written(candidate.value, mode)
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        picked.push({ latex, error: candidate.error })
    }
    if (picked.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...picked.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<ProbabilityAkRaceError>[] | null, answer: FractionValue, solution: string, meta: Record<string, number>): ProbabilityAkRaceQuestion | null {
    if (!choices) return null
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution: same(solution), meta }
}

/** «= simplified» when the fraction simplifies */
const simplified = (numerator: number, denominator: number, mode: Mode = 'fraction') => {
    const value = f(numerator, denominator)
    const text = written(value, mode)!
    return text === `\\frac{${numerator}}{${denominator}}` ? '' : `=${text}`
}

/* ---------- Circuit 0: events ---------- */

const multiplesUpTo = (limit: number, step: number) => Math.floor(limit / step)
const lcm = (a: number, b: number) => (a * b) / gcd(a, b)

const ballsIntro = (total: number) => say(
    `${math(total)} bola daude, 1etik hasita zenbakituta.`,
    `Hay ${math(total)} bolas numeradas desde el 1.`,
    `هناك ${math(total)} كرة مرقّمة بدءًا من 1.`
)
const join = (first: LocalizedText, second: LocalizedText): LocalizedText => ({ eu: `${first.eu} ${second.eu}`, es: `${first.es} ${second.es}`, ar: `${first.ar} ${second.ar}` })

function unionCountQuestion(random: Random, tier: Tier): ProbabilityAkRaceQuestion | null {
    const total = pick(random, tier === 0 ? [20, 30] : [20, 24, 30, 36, 40])
    const a = pick(random, [2, 3, 4, 5])
    const b = pick(random, [3, 4, 5, 6].filter((value) => value > a))
    const both = multiplesUpTo(total, lcm(a, b))
    const fa = multiplesUpTo(total, a)
    const fb = multiplesUpTo(total, b)
    const right = fa + fb - both
    const prompt = join(ballsIntro(total), say(
        `$A$ = «${math(a)} zenbakiaren multiploa» eta $B$ = «${math(b)} zenbakiaren multiploa». Zenbat elementu ditu ${math('A\\cup B')} gertaerak?`,
        `$A$ = «múltiplo de ${math(a)}» y $B$ = «múltiplo de ${math(b)}». ¿Cuántos elementos tiene ${math('A\\cup B')}?`,
        `$A$ = «مضاعف للعدد ${math(a)}» و$B$ = «مضاعف للعدد ${math(b)}». كم عنصرًا في ${math('A\\cup B')}؟`
    ))
    return build(0, 'union-count', prompt, options(random, f(right), [wrong(fa + fb, 'double-count'), wrong(both, 'intersection'), wrong(total - right, 'contrary'), ...near(f(right))], 'count'), f(right), `${fa}+${fb}-${both}=${right}`, { total, a, b })
}

function sampleSpaceQuestion(random: Random, tier: Tier): ProbabilityAkRaceQuestion | null {
    const coins = randomInt(random, 1, 3)
    const dice = randomInt(random, 1, tier === 0 ? 1 : 2)
    const right = 2 ** coins * 6 ** dice
    const factors = [...Array.from({ length: coins }, () => 2), ...Array.from({ length: dice }, () => 6)]
    return build(0, 'sample-space', say(
        `Txanponak eta daduak batera botatzen dira. Txanponak: ${math(coins)}. Daduak: ${math(dice)}. Zenbat emaitza ditu lagin-espazioak?`,
        `Se lanzan a la vez monedas y dados. Monedas: ${math(coins)}. Dados: ${math(dice)}. ¿Cuántos resultados tiene el espacio muestral?`,
        `تُرمى قطع نقود ونرود معًا. عدد القطع: ${math(coins)}. عدد النرود: ${math(dice)}. كم نتيجة في فضاء العيّنة؟`
    ), options(random, f(right), [wrong(2 * coins + 6 * dice, 'sum'), wrong(2 * coins * 6 * dice, 'power'), wrong(2 ** coins + 6 ** dice, 'sum'), ...near(f(right))], 'count'), f(right), `${factors.join('\\cdot ')}=${right}`, { coins, dice })
}

function neitherQuestion(random: Random, tier: Tier): ProbabilityAkRaceQuestion | null {
    const total = pick(random, [20, 24, 30, 36, 40])
    const a = pick(random, [2, 3, 4, 5])
    const fa = multiplesUpTo(total, a)
    if (tier === 0) {
        const right = total - fa
        return build(0, 'neither', join(ballsIntro(total), say(
            `Zenbat bolak osatzen dute «${math(a)} zenbakiaren multiploa» gertaeraren aurkakoa?`,
            `¿Cuántas forman el suceso contrario de «múltiplo de ${math(a)}»?`,
            `كم كرة في الحدث المعاكس للحدث «مضاعف للعدد ${math(a)}»؟`
        )), options(random, f(right), [wrong(fa, 'contrary'), ...near(f(right))], 'count'), f(right), `${total}-${fa}=${right}`, { total, a, b: 0 })
    }
    const b = pick(random, [3, 4, 5, 6].filter((value) => value > a))
    const fb = multiplesUpTo(total, b)
    const both = multiplesUpTo(total, lcm(a, b))
    const union = fa + fb - both
    const right = total - union
    return build(0, 'neither', join(ballsIntro(total), say(
        `Zenbat bola ez dira ${math(a)} zenbakiaren multiplo, ezta ${math(b)} zenbakiarena ere?`,
        `¿Cuántas no son múltiplo ni de ${math(a)} ni de ${math(b)}?`,
        `كم كرة ليست مضاعفًا للعدد ${math(a)} ولا للعدد ${math(b)}؟`
    )), options(random, f(right), [wrong(total - fa - fb, 'double-count'), wrong(union, 'contrary'), wrong(total - both, 'intersection'), ...near(f(right))], 'count'), f(right), `${total}-(${fa}+${fb}-${both})=${right}`, { total, a, b })
}

/* ---------- Circuit 1: probability ---------- */

function twoDiceQuestion(random: Random, tier: Tier): ProbabilityAkRaceQuestion | null {
    const total = randomInt(random, tier === 0 ? 5 : 2, tier === 0 ? 9 : 12)
    const cases = 6 - Math.abs(total - 7)
    const right = f(cases, 36)
    return build(1, 'two-dice', say(
        `Bi dado botatzen dira. Zein da batura ${math(total)} izateko probabilitatea?`,
        `Se lanzan dos dados. ¿Cuál es la probabilidad de que la suma sea ${math(total)}?`,
        `يُرمى نردان. ما احتمال أن يكون المجموع ${math(total)}؟`
    ), options(random, right, [wrong(f(1, 11), 'equiprobable'), wrong(f(total, 36), 'value'), ...near(right, 36)], 'fraction'), right, `\\frac{${cases}}{36}${simplified(cases, 36)}`, { total })
}

/** Events of a card from the Spanish deck, with the count of cards and the typical slip */
export const deckEvents: Array<{ count: number; hard: boolean; slip?: Candidate; name: LocalizedText }> = [
    { count: 4, hard: false, name: say('batekoa', 'un as', 'آس') },
    { count: 10, hard: false, name: say('urre bat', 'una carta de oros', 'ورقة من الذهب') },
    { count: 12, hard: false, name: say('irudi bat', 'una figura', 'صورة') },
    { count: 30, hard: false, slip: wrong(f(10, 40), 'contrary'), name: say('urrea ez den karta bat', 'una carta que no sea de oros', 'ورقة ليست من الذهب') },
    { count: 13, hard: true, slip: wrong(f(14, 40), 'double-count'), name: say('batekoa edo urre bat', 'un as o una carta de oros', 'آس أو ورقة من الذهب') },
    { count: 19, hard: true, slip: wrong(f(22, 40), 'double-count'), name: say('irudi bat edo kopa bat', 'una figura o una carta de copas', 'صورة أو ورقة من الكؤوس') },
    { count: 24, hard: true, slip: wrong(f(16, 40), 'contrary'), name: say('ez batekoa ez irudia den karta bat', 'una carta que no sea ni as ni figura', 'ورقة ليست آسًا ولا صورة') }
]

function deckQuestion(random: Random, tier: Tier): ProbabilityAkRaceQuestion | null {
    const event = randomInt(random, 0, tier === 0 ? 3 : deckEvents.length - 1)
    const { count, slip, name } = deckEvents[event]
    const right = f(count, 40)
    return build(1, 'deck', say(
        `40 kartako sorta espainiar batetik karta bat ateratzen da. Zein da ${name.eu} ateratzeko probabilitatea?`,
        `Se saca una carta de una baraja española de 40. ¿Cuál es la probabilidad de sacar ${name.es}?`,
        `تُسحب ورقة من مجموعة ورق إسباني من 40 ورقة. ما احتمال سحب ${name.ar}؟`
    ), options(random, right, [...(slip ? [slip] : []), ...near(right, 40)], 'fraction'), right, `\\frac{${count}}{40}${simplified(count, 40)}`, { event })
}

function unionProbabilityQuestion(random: Random, tier: Tier): ProbabilityAkRaceQuestion | null {
    const p = 5 * randomInt(random, 4, 12)
    const q = 5 * randomInt(random, 4, 12)
    const i = 5 * randomInt(random, 1, Math.min(p, q) / 5 - 1)
    const u = p + q - i
    if (u > 100) return null
    if (tier === 0 || random() < 0.5) {
        return build(1, 'union', say(
            `${math(`P(A)=${hundredths(p)}`)}, ${math(`P(B)=${hundredths(q)}`)} eta ${math(`P(A\\cap B)=${hundredths(i)}`)}. Kalkulatu ${math('P(A\\cup B)')}.`,
            `${math(`P(A)=${hundredths(p)}`)}, ${math(`P(B)=${hundredths(q)}`)} y ${math(`P(A\\cap B)=${hundredths(i)}`)}. Calcula ${math('P(A\\cup B)')}.`,
            `${math(`P(A)=${hundredths(p)}`)} و${math(`P(B)=${hundredths(q)}`)} و${math(`P(A\\cap B)=${hundredths(i)}`)}. احسب ${math('P(A\\cup B)')}.`
        ), options(random, f(u, 100), [wrong(f(p + q, 100), 'no-subtract'), wrong(f(p * q, 10000), 'independent'), wrong(f(100 - u, 100), 'contrary'), ...near(f(u, 100), 100)], 'decimal'), f(u, 100), `${hundredths(p)}+${hundredths(q)}-${hundredths(i)}=${hundredths(u)}`, { p, q, i, form: 0 })
    }
    return build(1, 'union', say(
        `${math(`P(A)=${hundredths(p)}`)}, ${math(`P(B)=${hundredths(q)}`)} eta ${math(`P(A\\cup B)=${hundredths(u)}`)}. Kalkulatu ${math('P(A\\cap B)')}.`,
        `${math(`P(A)=${hundredths(p)}`)}, ${math(`P(B)=${hundredths(q)}`)} y ${math(`P(A\\cup B)=${hundredths(u)}`)}. Calcula ${math('P(A\\cap B)')}.`,
        `${math(`P(A)=${hundredths(p)}`)} و${math(`P(B)=${hundredths(q)}`)} و${math(`P(A\\cup B)=${hundredths(u)}`)}. احسب ${math('P(A\\cap B)')}.`
    ), options(random, f(i, 100), [wrong(f(p * q, 10000), 'independent'), wrong(f(100 - i, 100), 'contrary'), ...near(f(i, 100), 100)], 'decimal'), f(i, 100), `${hundredths(p)}+${hundredths(q)}-${hundredths(u)}=${hundredths(i)}`, { p, q, i, form: 1 })
}

/* ---------- Circuit 2: compound experiments ---------- */

/** Events of one die, with their faces */
export const dieEvents: Array<{ faces: number[]; name: LocalizedText }> = [
    { faces: [6], name: say('6 bat', 'un 6', 'العدد 6') },
    { faces: [2, 4, 6], name: say('zenbaki bikoiti bat', 'un número par', 'عدد زوجي') },
    { faces: [3, 6], name: say('3ren multiplo bat', 'un múltiplo de 3', 'مضاعف للعدد 3') },
    { faces: [1, 2, 3, 4], name: say('5 baino txikiagoa den zenbaki bat', 'un número menor que 5', 'عدد أصغر من 5') },
    { faces: [2, 3, 5], name: say('zenbaki lehen bat', 'un número primo', 'عدد أولي') }
]

function independentQuestion(random: Random, tier: Tier): ProbabilityAkRaceQuestion | null {
    const second = randomInt(random, 0, dieEvents.length - 1)
    const p2 = f(dieEvents[second].faces.length, 6)
    if (tier === 0) {
        const right = multiply(f(1, 2), p2)
        const name = dieEvents[second].name
        return build(2, 'independent', say(
            `Txanpon bat eta dado bat botatzen dira. Zein da aurpegia eta ${name.eu} ateratzeko probabilitatea?`,
            `Se lanzan una moneda y un dado. ¿Cuál es la probabilidad de sacar cara y ${name.es}?`,
            `تُرمى قطعة نقود ونرد. ما احتمال الحصول على الوجه و${name.ar}؟`
        ), options(random, right, [wrong(add(f(1, 2), p2), 'add'), wrong(p2, 'missing'), ...near(right)], 'fraction'), right, `\\frac{1}{2}\\cdot\\frac{${dieEvents[second].faces.length}}{6}${simplified(dieEvents[second].faces.length, 12)}`, { coin: 1, first: -1, second })
    }
    const first = randomInt(random, 0, dieEvents.length - 1)
    const p1 = f(dieEvents[first].faces.length, 6)
    const right = multiply(p1, p2)
    const [n1, n2] = [dieEvents[first].name, dieEvents[second].name]
    const cases = dieEvents[first].faces.length * dieEvents[second].faces.length
    return build(2, 'independent', say(
        `Bi dado botatzen dira. Zein da lehenengoan ${n1.eu} eta bigarrenean ${n2.eu} ateratzeko probabilitatea?`,
        `Se lanzan dos dados. ¿Cuál es la probabilidad de sacar ${n1.es} en el primero y ${n2.es} en el segundo?`,
        `يُرمى نردان. ما احتمال الحصول على ${n1.ar} في الأول و${n2.ar} في الثاني؟`
    ), options(random, right, [wrong(add(p1, p2), 'add'), wrong(p1, 'missing'), wrong(p2, 'missing'), ...near(right)], 'fraction'), right, `\\frac{${dieEvents[first].faces.length}}{6}\\cdot\\frac{${dieEvents[second].faces.length}}{6}${simplified(cases, 36)}`, { coin: 0, first, second })
}

function withoutReplacementQuestion(random: Random, tier: Tier): ProbabilityAkRaceQuestion | null {
    const red = randomInt(random, 2, 6)
    const blue = randomInt(random, 2, 6)
    const total = red + blue
    const oneOfEach = tier > 0 && random() < 0.5
    if (!oneOfEach) {
        const right = f(red * (red - 1), total * (total - 1))
        return build(2, 'no-replacement', say(
            `Kutxa batean ${math(red)} bola gorri eta ${math(blue)} urdin daude. Bi ateratzen dira, itzuli gabe. Zein da biak gorriak izateko probabilitatea?`,
            `Una urna tiene ${math(red)} bolas rojas y ${math(blue)} azules. Se sacan dos sin devolver. ¿Cuál es la probabilidad de que las dos sean rojas?`,
            `في جرّة ${math(red)} كرات حمراء و${math(blue)} زرقاء. تُسحب كرتان دون إرجاع. ما احتمال أن تكون الكرتان حمراوين؟`
        ), options(random, right, [wrong(f(red * red, total * total), 'replacement'), wrong(f(red * (red - 1), total * total), 'denominator'), ...near(right)], 'fraction'), right, `\\frac{${red}}{${total}}\\cdot\\frac{${red - 1}}{${total - 1}}${simplified(red * (red - 1), total * (total - 1))}`, { red, blue, oneOfEach: 0 })
    }
    const right = f(2 * red * blue, total * (total - 1))
    return build(2, 'no-replacement', say(
        `Kutxa batean ${math(red)} bola gorri eta ${math(blue)} urdin daude. Bi ateratzen dira, itzuli gabe. Zein da kolore bakoitzeko bat ateratzeko probabilitatea?`,
        `Una urna tiene ${math(red)} bolas rojas y ${math(blue)} azules. Se sacan dos sin devolver. ¿Cuál es la probabilidad de sacar una de cada color?`,
        `في جرّة ${math(red)} كرات حمراء و${math(blue)} زرقاء. تُسحب كرتان دون إرجاع. ما احتمال سحب كرة من كل لون؟`
    ), options(random, right, [wrong(f(red * blue, total * (total - 1)), 'one-path'), wrong(f(2 * red * blue, total * total), 'replacement'), ...near(right)], 'fraction'), right, `2\\cdot\\frac{${red}}{${total}}\\cdot\\frac{${blue}}{${total - 1}}${simplified(2 * red * blue, total * (total - 1))}`, { red, blue, oneOfEach: 1 })
}

function atLeastOnceQuestion(random: Random, tier: Tier): ProbabilityAkRaceQuestion | null {
    const die = random() < 0.6
    const times = die ? randomInt(random, 2, tier === 0 ? 3 : 4) : randomInt(random, 2, tier === 0 ? 4 : 6)
    const p = die ? f(1, 6) : f(1, 2)
    const q = subtract(f(1), p)
    const right = subtract(f(1), power(q, times))
    const prompt = die
        ? say(`Dado bat ${math(times)} aldiz botatzen da. Zein da gutxienez 6 bat ateratzeko probabilitatea?`, `Se lanza un dado ${math(times)} veces. ¿Cuál es la probabilidad de sacar al menos un 6?`, `يُرمى نرد ${math(times)} مرات. ما احتمال الحصول على 6 مرة على الأقل؟`)
        : say(`Txanpon bat ${math(times)} aldiz botatzen da. Zein da gutxienez aurpegi bat ateratzeko probabilitatea?`, `Se lanza una moneda ${math(times)} veces. ¿Cuál es la probabilidad de sacar al menos una cara?`, `تُرمى قطعة نقود ${math(times)} مرات. ما احتمال ظهور الوجه مرة على الأقل؟`)
    return build(2, 'at-least', prompt, options(random, right, [wrong(multiply(f(times), p), 'add-probabilities'), wrong(power(q, times), 'none'), wrong(subtract(f(1), power(p, times)), 'all'), ...near(right)], 'fraction'), right, `1-\\left(\\frac{${q.numerator}}{${q.denominator}}\\right)^{${times}}=${written(right, 'fraction')}`, { die: die ? 1 : 0, times })
}

/* ---------- Circuit 3: conditional probability ---------- */

function tableQuestion(random: Random, tier: Tier): ProbabilityAkRaceQuestion | null {
    const top = tier === 0 ? 20 : 30
    const [a, b, c, d] = [randomInt(random, 5, top), randomInt(random, 5, top), randomInt(random, 5, top), randomInt(random, 5, top)]
    const all = a + b + c + d
    const givenGirl = random() < 0.5
    const intro = say(
        `Mutilak: ${math(a)} betaurrekoekin eta ${math(b)} betaurrekorik gabe. Neskak: ${math(c)} betaurrekoekin eta ${math(d)} betaurrekorik gabe.`,
        `Chicos: ${math(a)} con gafas y ${math(b)} sin gafas. Chicas: ${math(c)} con gafas y ${math(d)} sin gafas.`,
        `الأولاد: ${math(a)} بنظارات و${math(b)} بلا نظارات. البنات: ${math(c)} بنظارات و${math(d)} بلا نظارات.`
    )
    if (givenGirl) {
        const right = f(c, c + d)
        return build(3, 'table', join(intro, say('Neska bat zoriz aukeratzen da: zein da betaurrekoak eramateko probabilitatea?', 'Se elige al azar una chica: ¿cuál es la probabilidad de que lleve gafas?', 'تُختار بنت عشوائيًا: ما احتمال أن تلبس نظارات؟')), options(random, right, [wrong(f(c, all), 'joint'), wrong(f(c, a + c), 'swap-condition'), wrong(f(a + c, all), 'simple'), ...near(right)], 'fraction'), right, `\\frac{${c}}{${c}+${d}}=${written(right, 'fraction')}`, { a, b, c, d, givenGirl: 1 })
    }
    const right = f(c, a + c)
    return build(3, 'table', join(intro, say('Betaurrekoak dituen norbait zoriz aukeratzen da: zein da neska izateko probabilitatea?', 'Se elige al azar a alguien con gafas: ¿cuál es la probabilidad de que sea chica?', 'يُختار عشوائيًا شخص يلبس نظارات: ما احتمال أن يكون بنتًا؟')), options(random, right, [wrong(f(c, all), 'joint'), wrong(f(c, c + d), 'swap-condition'), wrong(f(c + d, all), 'simple'), ...near(right)], 'fraction'), right, `\\frac{${c}}{${a}+${c}}=${written(right, 'fraction')}`, { a, b, c, d, givenGirl: 0 })
}

function formulaQuestion(random: Random, tier: Tier): ProbabilityAkRaceQuestion | null {
    const y = pick(random, [20, 25, 40, 50, 60, 80])
    const ratio = pick(random, tier === 0 ? [f(1, 2), f(1, 4), f(3, 4)] : [f(1, 2), f(1, 4), f(3, 4), f(1, 5), f(2, 5), f(3, 5), f(4, 5)])
    if ((y * ratio.numerator) % ratio.denominator !== 0) return null
    const x = (y * ratio.numerator) / ratio.denominator
    const z = x + 5 * randomInt(random, 1, 8)
    // P(A ∪ B) = P(A) + P(B) − P(A ∩ B) can never pass 1
    if (z === y || z > 95 || z + y - x > 100) return null
    return build(3, 'formula', say(
        `${math(`P(A)=${hundredths(z)}`)}, ${math(`P(B)=${hundredths(y)}`)} eta ${math(`P(A\\cap B)=${hundredths(x)}`)}. Kalkulatu ${math('P(A/B)')}.`,
        `${math(`P(A)=${hundredths(z)}`)}, ${math(`P(B)=${hundredths(y)}`)} y ${math(`P(A\\cap B)=${hundredths(x)}`)}. Calcula ${math('P(A/B)')}.`,
        `${math(`P(A)=${hundredths(z)}`)} و${math(`P(B)=${hundredths(y)}`)} و${math(`P(A\\cap B)=${hundredths(x)}`)}. احسب ${math('P(A/B)')}.`
    ), options(random, ratio, [wrong(f(x, z), 'swap-condition'), wrong(f(x, 100), 'joint'), wrong(f(x * y, 10000), 'product'), ...near(ratio, 20)], 'decimal'), ratio, `\\frac{${hundredths(x)}}{${hundredths(y)}}=${written(ratio, 'decimal')}`, { x, y, z })
}

function totalQuestion(random: Random, tier: Tier): ProbabilityAkRaceQuestion | null {
    const faces = tier === 0 ? 3 : randomInt(random, 1, 5)
    const size1 = pick(random, [4, 5])
    const size2 = pick(random, [4, 5])
    const red1 = randomInt(random, 1, size1 - 1)
    const red2 = randomInt(random, 1, size2 - 1)
    if (red1 * size2 === red2 * size1) return null
    const path1 = multiply(f(faces, 6), f(red1, size1))
    const path2 = multiply(f(6 - faces, 6), f(red2, size2))
    const right = add(path1, path2)
    return build(3, 'total', say(
        `Dado bat botatzen da. ${math(faces)} edo txikiagoa ateratzen bada, I kutxatik bola bat ateratzen da (${math(size1)} bolatatik ${math(red1)} gorri); bestela, II kutxatik (${math(size2)} bolatatik ${math(red2)} gorri). Zein da gorria ateratzeko probabilitatea?`,
        `Se lanza un dado. Si sale un número menor o igual que ${math(faces)}, se saca una bola de la urna I (${math(red1)} rojas de ${math(size1)}); si no, de la urna II (${math(red2)} rojas de ${math(size2)}). ¿Cuál es la probabilidad de sacar roja?`,
        `يُرمى نرد. إذا ظهر عدد أصغر من ${math(faces)} أو يساويه تُسحب كرة من الجرّة I (فيها ${math(red1)} حمراء من ${math(size1)})، وإلا فمن الجرّة II (فيها ${math(red2)} حمراء من ${math(size2)}). ما احتمال سحب كرة حمراء؟`
    ), options(random, right, [wrong(path1, 'one-path'), wrong(multiply(f(1, 2), add(f(red1, size1), f(red2, size2))), 'unweighted'), wrong(f(red1 + red2, size1 + size2), 'merge'), ...near(right)], 'fraction'), right, `\\frac{${faces}}{6}\\cdot\\frac{${red1}}{${size1}}+\\frac{${6 - faces}}{6}\\cdot\\frac{${red2}}{${size2}}=${written(right, 'fraction')}`, { faces, red1, size1, red2, size2 })
}

/* ---------- Circuit 4: counting and deciding ---------- */

const choose = (n: number, k: number): number => (k < 0 || k > n ? 0 : k === 0 ? 1 : (choose(n, k - 1) * (n - k + 1)) / k)

function drawAllQuestion(random: Random, tier: Tier): ProbabilityAkRaceQuestion | null {
    const total = randomInt(random, 6, 12)
    const drawn = tier === 0 ? 2 : pick(random, [2, 3])
    const red = randomInt(random, Math.max(drawn, 3), total - 2)
    const right = f(choose(red, drawn), choose(total, drawn))
    return build(4, 'draw-all', say(
        `Kutxa batean ${math(total)} bola daude, horietatik ${math(red)} gorriak. ${math(drawn)} ateratzen dira batera. Zein da denak gorriak izateko probabilitatea?`,
        `Una urna tiene ${math(total)} bolas, ${math(red)} de ellas rojas. Se sacan ${math(drawn)} a la vez. ¿Cuál es la probabilidad de que todas sean rojas?`,
        `في جرّة ${math(total)} كرات، منها ${math(red)} حمراء. تُسحب ${math(drawn)} معًا. ما احتمال أن تكون كلها حمراء؟`
    ), options(random, right, [wrong(power(f(red, total), drawn), 'replacement'), wrong(f(red, total), 'single'), ...near(right)], 'fraction'), right, `\\frac{\\text{C}_{${red},${drawn}}}{\\text{C}_{${total},${drawn}}}=\\frac{${choose(red, drawn)}}{${choose(total, drawn)}}${simplified(choose(red, drawn), choose(total, drawn))}`, { total, red, drawn })
}

function maxDiceQuestion(random: Random, tier: Tier): ProbabilityAkRaceQuestion | null {
    const dice = tier === 0 ? 2 : pick(random, [2, 3])
    const top = randomInt(random, 2, 6)
    const cases = top ** dice - (top - 1) ** dice
    const right = f(cases, 6 ** dice)
    return build(4, 'max-dice', say(
        `${math(dice)} dado botatzen dira. Zein da puntuazio handiena ${math(top)} izateko probabilitatea?`,
        `Se lanzan ${math(dice)} dados. ¿Cuál es la probabilidad de que la mayor puntuación sea ${math(top)}?`,
        `تُرمى ${math(dice)} نرود. ما احتمال أن تكون أكبر نتيجة ${math(top)}؟`
    ), options(random, right, [wrong(f(top ** dice, 6 ** dice), 'at-most'), wrong(f(1, 6), 'one-die'), ...near(right, 6 ** dice)], 'fraction'), right, `\\frac{${top}^{${dice}}-${top - 1}^{${dice}}}{${6 ** dice}}=\\frac{${cases}}{${6 ** dice}}${simplified(cases, 6 ** dice)}`, { dice, top })
}

function expectationQuestion(random: Random, tier: Tier): ProbabilityAkRaceQuestion | null {
    const faces = randomInt(random, 1, 5)
    const prize = randomInt(random, 1, tier === 0 ? 6 : 12)
    const loss = randomInt(random, 1, 6)
    const right = f(prize * faces - loss * (6 - faces), 6)
    return build(4, 'expectation', say(
        `Dado bat botatzen duzu: ${math(faces)} edo txikiagoa ateratzen bada, ${math(prize)} € irabazten dituzu; bestela, ${math(loss)} € galtzen dituzu. Zein da irabazi itxaropena?`,
        `Lanzas un dado: si sale un número menor o igual que ${math(faces)}, ganas ${math(prize)} €; si no, pierdes ${math(loss)} €. ¿Cuál es la ganancia esperada?`,
        `ترمي نردًا: إذا ظهر عدد أصغر من ${math(faces)} أو يساويه تربح ${math(prize)} €، وإلا تخسر ${math(loss)} €. ما الربح المتوقع؟`
    ), options(random, right, [wrong(prize - loss, 'no-probabilities'), wrong(f(prize * faces + loss * (6 - faces), 6), 'sign'), wrong(f(prize * faces, 6), 'missing-loss'), ...near(right, 6)], 'fraction', [-20, 20]), right, `${prize}\\cdot\\frac{${faces}}{6}-${loss}\\cdot\\frac{${6 - faces}}{6}=${written(right, 'fraction')}`, { faces, prize, loss })
}

/* ---------- Circuits ---------- */

type Generator = (random: Random, tier: Tier) => ProbabilityAkRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [unionCountQuestion, sampleSpaceQuestion, neitherQuestion],
    [twoDiceQuestion, deckQuestion, unionProbabilityQuestion],
    [independentQuestion, withoutReplacementQuestion, atLeastOnceQuestion],
    [tableQuestion, formulaQuestion, totalQuestion],
    [drawAllQuestion, maxDiceQuestion, expectationQuestion]
]

export function generateProbabilityAkRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): ProbabilityAkRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 2000; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkProbabilityAkPitAnswer(question: RaceQuestion<ProbabilityAkRaceError>, input: string): AnswerCheck {
    return checkAnswer(readStatisticsAnswer(input), question.answer as FractionValue, question.answerForm)
}

export function probabilityAkParTime(circuit: number): number {
    return parTimeFor([15, 16, 17, 18, 18][circuit] ?? 16)
}

export const probabilityAkRaceErrorTips: Record<ProbabilityAkRaceError, LocalizedText> = {
    'double-count': say('Bien zati komuna bi aldiz zenbatu duzu: kendu behin.', 'Has contado dos veces la parte común: réstala una vez.', 'عددت الجزء المشترك مرتين: اطرحه مرة.'),
    intersection: say('Hori bietan dauden elementuak dira bakarrik ($A\\cap B$).', 'Eso son solo los que están en los dos ($A\\cap B$).', 'هذه العناصر الموجودة في كليهما فقط ($A\\cap B$).'),
    contrary: say('Hori galdetutakoaren aurkakoa da: begiratu ondo «ez» dagoen.', 'Eso es el contrario de lo que se pregunta: mira bien si hay un «no».', 'هذا معاكس المطلوب: انتبه لوجود «لا».'),
    sum: say('Emaitzak ez dira batzen: txanpon bakoitzak 2 aldiz biderkatzen du eta dado bakoitzak 6 aldiz.', 'Los resultados no se suman: cada moneda multiplica por 2 y cada dado por 6.', 'النتائج لا تُجمع: كل قطعة تضرب في 2 وكل نرد في 6.'),
    power: say('Hiru txanpon: $2\\cdot 2\\cdot 2$, ez $2\\cdot 3$. Berreturak dira.', 'Tres monedas: $2\\cdot 2\\cdot 2$, no $2\\cdot 3$. Son potencias.', 'ثلاث قطع: $2\\cdot 2\\cdot 2$ لا $2\\cdot 3$. إنها قوى.'),
    equiprobable: say('Baturak ez dira ekiprobableak: zenbatu 36 laukietatik zenbat diren aldekoak.', 'Las sumas no son equiprobables: cuenta las casillas favorables de las 36.', 'المجاميع ليست متساوية الاحتمال: عُدّ الخانات الملائمة من 36.'),
    value: say('Aldeko kasuak batura hori duten laukiak dira, ez baturaren balioa.', 'Los casos favorables son las casillas con esa suma, no el valor de la suma.', 'الحالات الملائمة هي الخانات ذات ذلك المجموع، لا قيمة المجموع.'),
    'no-subtract': say('Bateragarriak dira: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.', 'Son compatibles: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.', 'هما متوافقان: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.'),
    independent: say('Ez dakigu independenteak diren: erabili emandako datuak, ez $P(A)\\cdot P(B)$.', 'No sabemos si son independientes: usa los datos dados, no $P(A)\\cdot P(B)$.', 'لا نعرف أنهما مستقلان: استعمل المعطيات لا $P(A)\\cdot P(B)$.'),
    add: say('«Eta» aldi berean gertatzea da: probabilitateak biderkatu, ez batu.', '«Y» es que ocurran a la vez: multiplica las probabilidades, no las sumes.', '«و» تعني الوقوع معًا: اضرب الاحتمالات ولا تجمعها.'),
    missing: say('Bi esperientziek parte hartzen dute: biderkatu bien probabilitateak.', 'Intervienen las dos experiencias: multiplica las dos probabilidades.', 'تشارك التجربتان: اضرب الاحتمالين.'),
    replacement: say('Bola ez da itzultzen: bigarrenean bola bat gutxiago dago.', 'La bola no se devuelve: en la segunda hay una bola menos.', 'الكرة لا تُعاد: في السحبة الثانية كرة أقل.'),
    denominator: say('Bigarren ateratzean izendatzailea ere jaisten da: $n-1$.', 'En la segunda extracción también baja el denominador: $n-1$.', 'في السحبة الثانية ينقص المقام أيضًا: $n-1$.'),
    'one-path': say('Bi bide daude (gorria-urdina eta urdina-gorria): batu biak.', 'Hay dos caminos (roja-azul y azul-roja): suma los dos.', 'هناك مساران: اجمعهما.'),
    'add-probabilities': say('Probabilitateak ezin dira $n$ aldiz batu: erabili aurkakoa, $1-(1-p)^{n}$.', 'Las probabilidades no se suman $n$ veces: usa el contrario, $1-(1-p)^{n}$.', 'لا تُجمع الاحتمالات $n$ مرة: استعمل المعاكس $1-(1-p)^{n}$.'),
    none: say('Hori «behin ere ez» da: kendu 1etik.', 'Eso es «ninguna vez»: réstalo de 1.', 'هذا «ولا مرة»: اطرحه من 1.'),
    all: say('«Gutxienez behin» gertaeraren aurkakoa «behin ere ez» da, ez «beti».', 'El contrario de «al menos una vez» es «ninguna vez», no «todas».', 'معاكس «مرة على الأقل» هو «ولا مرة» لا «كل مرة».'),
    joint: say('Hori ebakidura da, guztizko nagusiaren gainean; baldintzatuan kasu posibleak baldintzarenak dira.', 'Eso es la intersección sobre el total; en la condicionada los casos posibles son los de la condición.', 'هذا التقاطع على المجموع العام؛ وفي المشروط الحالات الممكنة هي حالات الشرط.'),
    'swap-condition': say('Baldintza aldatu duzu: $P(A/B)$-n $B$-ren guztizkoaz zatitzen da.', 'Has cambiado la condición: en $P(A/B)$ se divide entre lo de $B$.', 'بدّلت الشرط: في $P(A/B)$ نقسم على ما يخص $B$.'),
    simple: say('Hori probabilitate soila da; baldintza ahaztu duzu.', 'Eso es la probabilidad simple; has olvidado la condición.', 'هذا احتمال بسيط؛ نسيت الشرط.'),
    product: say('$P(A/B)$ zatiketa bat da: $\\frac{P(A\\cap B)}{P(B)}$.', '$P(A/B)$ es una división: $\\frac{P(A\\cap B)}{P(B)}$.', '$P(A/B)$ قسمة: $\\frac{P(A\\cap B)}{P(B)}$.'),
    unweighted: say('Kutxek ez dute probabilitate bera: biderkatu bide bakoitza bere adarrarekin.', 'Las urnas no tienen la misma probabilidad: multiplica cada camino por su rama.', 'الجرّتان ليستا متساويتي الاحتمال: اضرب كل مسار في فرعه.'),
    merge: say('Kutxak ez dira batzen: bide bakoitzak bere probabilitatea du.', 'Las urnas no se juntan: cada camino tiene su probabilidad.', 'لا تُدمج الجرّتان: لكل مسار احتماله.'),
    single: say('Hori bola bakar batena da; batera hainbat ateratzen dira: konbinazioak.', 'Eso es para una sola bola; se sacan varias a la vez: combinaciones.', 'هذا لكرة واحدة؛ تُسحب عدة كرات معًا: توافيق.'),
    'at-most': say('Hori «handiena gehienez» da; kendu txikiagoen kasuak.', 'Eso es «el mayor como mucho»; resta los casos del valor anterior.', 'هذا «الأكبر على الأكثر»؛ اطرح حالات القيمة السابقة.'),
    'one-die': say('Dado bakarrarentzat da; hainbat daduren kasuak zenbatu behar dira.', 'Eso vale para un solo dado; hay que contar los casos de varios dados.', 'هذا لنرد واحد؛ يجب عدّ حالات عدة نرود.'),
    'no-probabilities': say('Irabaziak eta galerak bakoitza bere probabilitateaz biderkatzen dira.', 'Ganancias y pérdidas se multiplican cada una por su probabilidad.', 'يُضرب كل ربح وكل خسارة في احتماله.'),
    sign: say('Galera negatiboa da: kendu egiten da.', 'La pérdida es negativa: se resta.', 'الخسارة سالبة: تُطرح.'),
    'missing-loss': say('Galerak ere itxaropenean sartzen dira.', 'Las pérdidas también entran en la esperanza.', 'الخسائر تدخل أيضًا في الأمل.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
