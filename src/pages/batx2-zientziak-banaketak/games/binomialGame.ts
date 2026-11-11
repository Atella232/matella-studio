import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'

/* ==========================================================================
   J1 · Binomiala da? (¿Es binomial?): a situation in words. Level 1 asks
   whether it is binomial and, if not, why (without replacement, no fixed
   number of trials, or it does not count successes); level 2, which
   B(n; p) it is, with p and q swapped and the «two outcomes, so 1/2» or
   «n = 100 because of the percentage» mix-ups as the wrong options; level
   3, which expression is P(X = k), with the binomial coefficient left out
   or p and q swapped. Every set of six rounds of level 1 has each answer
   at least once. Pure logic.
   ========================================================================== */

export const BINOMIAL_ROUNDS = 6

export type BinomialVerdict = 'binomial' | 'replacement' | 'notFixed' | 'notCount'
export const BINOMIAL_VERDICTS: BinomialVerdict[] = ['binomial', 'replacement', 'notFixed', 'notCount']

/** p as a fraction: numerator and denominator */
interface Probability { numerator: number; denominator: number }

export interface BinomialSituation {
    text: LocalizedText
    verdict: BinomialVerdict
    /** n and p when it is binomial */
    n?: number
    p?: Probability
}

export interface BinomialRound {
    situation: BinomialSituation
    /** Level 1: the verdict; levels 2 and 3: three LaTeX options */
    options: string[]
    answer: number
    /** For level 3: the k asked */
    k?: number
}

const percentText = (value: number) => ({ eu: `% ${value}`, es: `${value} %`, en: `${value}%`, ar: `${value}٪` })

/** p for LaTeX: a fraction for dice and tests, a decimal for percentages */
export const pLatex = (p: Probability) => (p.denominator === 100 || p.denominator === 10 || p.denominator === 2 ? String(p.numerator / p.denominator).replace('.', '{,}') : `\\frac{${p.numerator}}{${p.denominator}}`)
export const qOf = (p: Probability): Probability => ({ numerator: p.denominator - p.numerator, denominator: p.denominator })
export const binomialLatex = (n: number, p: Probability) => `B(${n};\\,${pLatex(p)})`

/* ---------- Situations ---------- */

function dice(random: Random): BinomialSituation {
    const n = randomInt(random, 3, 12)
    return { text: say(`Dado bat ${n} aldiz botatzen da, eta seiak zenbatzen dira.`, `Se lanza un dado ${n} veces y se cuentan los seises.`, `يُرمى نرد ${n} مرات وتُعدّ مرات ظهور 6.`, `A die is rolled ${n} times and the sixes are counted.`), verdict: 'binomial', n, p: { numerator: 1, denominator: 6 } }
}

function coin(random: Random): BinomialSituation {
    const n = randomInt(random, 4, 20)
    return { text: say(`Txanpon bat ${n} aldiz botatzen da, eta aurpegiak zenbatzen dira.`, `Se lanza una moneda ${n} veces y se cuentan las caras.`, `تُرمى قطعة نقود ${n} مرة وتُعدّ الأوجه.`, `A coin is tossed ${n} times and the heads are counted.`), verdict: 'binomial', n, p: { numerator: 1, denominator: 2 } }
}

function parts(random: Random): BinomialSituation {
    const n = randomInt(random, 5, 30)
    const percent = pick(random, [2, 5, 8, 10, 15, 20, 25, 30])
    const t = percentText(percent)
    return { text: say(`Lantegi bateko piezen ${t.eu} akastuna da. Ekoizpen oso handi batetik ${n} pieza hartzen dira, eta akastunak zenbatzen dira.`, `El ${t.es} de las piezas de una fábrica es defectuoso. Se toman ${n} piezas de una producción muy grande y se cuentan las defectuosas.`, `${t.ar} من قطع مصنع معيبة. تؤخذ ${n} قطعة من إنتاج كبير جدًّا وتُعدّ المعيبة.`, `${t.en} of the parts of a factory are faulty. ${n} parts are taken from a very large production and the faulty ones are counted.`), verdict: 'binomial', n, p: { numerator: percent, denominator: 100 } }
}

function test(random: Random): BinomialSituation {
    const n = randomInt(random, 5, 20)
    const choices = randomInt(random, 3, 5)
    return { text: say(`${n} galderako test bat, galdera bakoitza ${choices} aukerakoa, zoriz erantzuten da, eta asmatzeak zenbatzen dira.`, `Un test de ${n} preguntas de ${choices} opciones se contesta al azar y se cuentan los aciertos.`, `يُجاب عشوائيًّا عن اختبار من ${n} سؤالًا لكل منها ${choices} خيارات وتُعدّ الإجابات الصحيحة.`, `A test of ${n} questions with ${choices} options each is answered at random and the right answers are counted.`), verdict: 'binomial', n, p: { numerator: 1, denominator: choices } }
}

function throws(random: Random): BinomialSituation {
    const n = randomInt(random, 3, 10)
    const tenths = pick(random, [6, 7, 8, 9])
    const t = percentText(tenths * 10)
    return { text: say(`Jokalari batek bere jaurtiketa libreen ${t.eu} sartzen du. ${n} jaurtitzen ditu, eta saskiratzeak zenbatzen dira.`, `Una jugadora encesta el ${t.es} de sus tiros libres. Lanza ${n} y se cuentan las canastas.`, `تسجّل لاعبة ${t.ar} من رمياتها الحرة. ترمي ${n} رميات وتُعدّ الإصابات.`, `A player scores ${t.en} of her free throws. She takes ${n} and the baskets are counted.`), verdict: 'binomial', n, p: { numerator: tenths, denominator: 10 } }
}

function replacement(random: Random): BinomialSituation {
    const red = randomInt(random, 3, 8)
    const blue = randomInt(random, 3, 8)
    const n = randomInt(random, 2, 4)
    return { text: say(`${red} bola gorri eta ${blue} urdin dituen kutxa batetik ${n} bola ateratzen dira itzuli gabe, eta gorriak zenbatzen dira.`, `De una urna con ${red} bolas rojas y ${blue} azules se sacan ${n} sin devolver y se cuentan las rojas.`, `من جرّة فيها ${red} كرات حمراء و${blue} زرقاء تُسحب ${n} كرات دون إرجاع وتُعدّ الحمراء.`, `${n} balls are drawn without replacement from an urn with ${red} red and ${blue} blue balls, and the red ones are counted.`), verdict: 'replacement' }
}

function notFixed(random: Random): BinomialSituation {
    return pick(random, [
        { text: say('Txanpon bat botatzen da aurpegia atera arte, eta botaldiak zenbatzen dira.', 'Se lanza una moneda hasta que sale cara y se cuentan los lanzamientos.', 'تُرمى قطعة نقود حتى يظهر الوجه وتُعدّ الرميات.', 'A coin is tossed until heads comes up and the tosses are counted.'), verdict: 'notFixed' as const },
        { text: say('Dado bat botatzen da 6 atera arte, eta botaldiak zenbatzen dira.', 'Se lanza un dado hasta que sale un 6 y se cuentan los lanzamientos.', 'يُرمى نرد حتى يظهر 6 وتُعدّ الرميات.', 'A die is rolled until a 6 comes up and the rolls are counted.'), verdict: 'notFixed' as const },
        { text: say('Tiro libreak jaurtitzen dira lehen huts egin arte, eta saskiratzeak zenbatzen dira.', 'Se lanzan tiros libres hasta el primer fallo y se cuentan las canastas.', 'تُرمى رميات حرة حتى أول إخفاق وتُعدّ الإصابات.', 'Free throws are taken until the first miss and the baskets are counted.'), verdict: 'notFixed' as const }
    ])
}

function notCount(random: Random): BinomialSituation {
    const n = randomInt(random, 2, 6)
    return pick(random, [
        { text: say(`Dado bat ${n} aldiz botatzen da, eta puntuak batzen dira.`, `Se lanza un dado ${n} veces y se suman los puntos.`, `يُرمى نرد ${n} مرات وتُجمع النقاط.`, `A die is rolled ${n} times and the points are added.`), verdict: 'notCount' as const },
        { text: say(`Dado bat ${n} aldiz botatzen da, eta ateratako zenbakirik handiena hartzen da.`, `Se lanza un dado ${n} veces y se toma el número más alto que sale.`, `يُرمى نرد ${n} مرات ويؤخذ أكبر عدد يظهر.`, `A die is rolled ${n} times and the highest number is taken.`), verdict: 'notCount' as const }
    ])
}

const binomialSituations = [dice, coin, parts, test, throws]

/* ---------- Options ---------- */

/** Level 2: B(n; p), with p and q swapped, and the decoy of each situation */
function parameterOptions(random: Random, situation: BinomialSituation): BinomialRound | null {
    const { n, p } = situation
    if (!n || !p || p.numerator * 2 === p.denominator) return null
    let decoy: string
    if (p.denominator === 6 || p.denominator === 10) decoy = binomialLatex(n, { numerator: 1, denominator: 2 })
    else if (p.denominator === 100) decoy = binomialLatex(100, p)
    else decoy = binomialLatex(p.denominator, { numerator: 1, denominator: n })
    const right = binomialLatex(n, p)
    const swapped = binomialLatex(n, qOf(p))
    if (new Set([right, swapped, decoy]).size < 3) return null
    const options = shuffle(random, [right, swapped, decoy])
    return { situation, options, answer: options.indexOf(right) }
}

/** A power of p for LaTeX: a fraction in brackets, a decimal as it is */
const power = (p: Probability, exponent: number) => (p.denominator === 100 || p.denominator === 10 || p.denominator === 2 ? `${pLatex(p)}^{${exponent}}` : `\\left(${pLatex(p)}\\right)^{${exponent}}`)

/** Level 3: P(X = k), without the binomial coefficient, or with p and q swapped */
function formulaOptions(random: Random, situation: BinomialSituation): BinomialRound | null {
    const { n, p } = situation
    if (!n || !p || n > 10 || p.numerator * 2 === p.denominator) return null
    const k = randomInt(random, 1, n - 1)
    // With k = n − k, p and q swapped give the same number: never asked
    if (2 * k === n) return null
    const q = qOf(p)
    // A value too small to read on a card is not asked either
    let coefficient = 1
    for (let i = 1; i <= k; i += 1) coefficient = (coefficient * (n - k + i)) / i
    if (coefficient * (p.numerator / p.denominator) ** k * (q.numerator / q.denominator) ** (n - k) < 0.001) return null
    const right = `\\binom{${n}}{${k}}\\cdot ${power(p, k)}\\cdot ${power(q, n - k)}`
    const bare = `${power(p, k)}\\cdot ${power(q, n - k)}`
    const swapped = `\\binom{${n}}{${k}}\\cdot ${power(q, k)}\\cdot ${power(p, n - k)}`
    if (new Set([right, bare, swapped]).size < 3) return null
    const options = shuffle(random, [right, bare, swapped])
    return { situation, options, answer: options.indexOf(right), k }
}

function makeRound(random: Random, level: number, verdict: BinomialVerdict): BinomialRound | null {
    if (level === 0) {
        const situation = verdict === 'binomial' ? pick(random, binomialSituations)(random) : verdict === 'replacement' ? replacement(random) : verdict === 'notFixed' ? notFixed(random) : notCount(random)
        return { situation, options: BINOMIAL_VERDICTS, answer: BINOMIAL_VERDICTS.indexOf(situation.verdict) }
    }
    const situation = pick(random, [dice, parts, test, throws])(random)
    return level === 1 ? parameterOptions(random, situation) : formulaOptions(random, situation)
}

/** Six rounds: on level 1, each verdict at least once; never the same situation twice */
export function createBinomialRounds(random: Random, level: number): BinomialRound[] {
    const verdicts = level === 0 ? shuffle(random, [...BINOMIAL_VERDICTS, 'binomial', 'binomial'] as BinomialVerdict[]) : Array<BinomialVerdict>(BINOMIAL_ROUNDS).fill('binomial')
    const rounds: BinomialRound[] = []
    for (const verdict of verdicts) {
        for (let attempt = 0; attempt < 500; attempt += 1) {
            const round = makeRound(random, level, verdict)
            if (round && !rounds.some((other) => other.situation.text.es === round.situation.text.es)) {
                rounds.push(round)
                break
            }
        }
    }
    return rounds.length === BINOMIAL_ROUNDS ? rounds : createBinomialRounds(random, level)
}
