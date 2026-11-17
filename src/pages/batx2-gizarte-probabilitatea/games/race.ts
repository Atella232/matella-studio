import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { checkProbabilityBatx2PitAnswer, generateProbabilityBatx2RaceQuestion, probabilityBatx2ParTime, probabilityBatx2RaceErrorTips, type ProbabilityBatx2RaceError } from '../../batx2-zientziak-probabilitatea/games/race.ts'
import { arrangements, combinations } from './order.ts'

/* ==========================================================================
   Probabilitatearen lasterketa (Batxilergoa 2 · Gizarte Zientziak): four
   circuits, one per stage. The first one is this unit's own, counting:
   posts (arrangements), PINs (with repetition), queues (permutations),
   committees (combinations) and a draw by lot (Laplace with
   combinations); the wrong options are the other models. The other three
   (events, conditional probability, total probability and Bayes) are the
   circuits of 2.º Ciencias, which ask the same things. Every question
   carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export type ProbabilityBatx2gRaceError = ProbabilityBatx2RaceError | 'order-counted' | 'repetition' | 'mixed-criteria'

export type ProbabilityBatx2gRaceQuestion = RaceQuestion<ProbabilityBatx2gRaceError> & { meta: Record<string, number> }

const all = (latex: string) => say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)

/** The right count and three wrong ones, all different */
function options(random: Random, right: FractionValue, wrong: Array<[number | FractionValue, ProbabilityBatx2gRaceError]>): RaceOption<ProbabilityBatx2gRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const picked: RaceOption<ProbabilityBatx2gRaceError>[] = []
    for (const [value, error] of wrong) {
        const latex = written(typeof value === 'number' ? fraction(value) : value)
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        picked.push({ latex, correct: false, error })
        if (picked.length === 3) break
    }
    if (picked.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...picked])
}

function build(kind: string, prompt: LocalizedText, choices: RaceOption<ProbabilityBatx2gRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): ProbabilityBatx2gRaceQuestion {
    return { circuit: 0, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

function postsQuestion(random: Random): ProbabilityBatx2gRaceQuestion | null {
    const n = randomInt(random, 5, 10)
    const k = randomInt(random, 2, 3)
    const answer = fraction(arrangements(n, k))
    const choices = options(random, answer, [[combinations(n, k), 'order-counted'], [n ** k, 'repetition'], [n * k, 'calculation'], [arrangements(n, k) + n, 'calculation']])
    const posts = k === 2
        ? say('lehendakaria eta idazkaria', 'presidente y secretario', 'رئيسًا وأمين سر', 'a president and a secretary')
        : say('lehendakaria, idazkaria eta diruzaina', 'presidente, secretario y tesorero', 'رئيسًا وأمين سر وأمين صندوق', 'a president, a secretary and a treasurer')
    return choices && build('posts', say(`${n} bazkideren artean ${posts.eu} aukeratzen dira. Zenbat modutan?`, `Entre ${n} socios se eligen ${posts.es}. ¿De cuántas formas?`, `يُختار من بين ${n} أعضاء ${posts.ar}. بكم طريقة؟`, `${posts.en.charAt(0).toUpperCase()}${posts.en.slice(1)} are chosen among ${n} members. In how many ways?`), choices, answer, all(`V_{${n},${k}}=${arrangements(n, k)}`), { n, k })
}

function pinQuestion(random: Random): ProbabilityBatx2gRaceQuestion | null {
    const n = pick(random, [2, 3, 10])
    const k = n === 10 ? randomInt(random, 2, 4) : randomInt(random, 3, 6)
    const answer = fraction(n ** k)
    const choices = options(random, answer, [[n * k, 'calculation'], [arrangements(n, Math.min(k, n)), 'repetition'], [k ** n, 'calculation'], [n ** k + n, 'calculation']])
    const prompt = n === 10
        ? say(`Zenbat ${k} zifrako kode daude, zifrak errepika badaitezke?`, `¿Cuántos códigos de ${k} cifras hay si se pueden repetir?`, `كم رمزًا من ${k} أرقام إذا جاز التكرار؟`, `How many ${k}-digit codes are there if digits can repeat?`)
        : n === 2
            ? say(`Inkesta batek bai/ez motako ${k} galdera ditu. Zenbat erantzun-orri daude?`, `Una encuesta tiene ${k} preguntas de sí o no. ¿Cuántas hojas de respuestas hay?`, `في استطلاع ${k} أسئلة بنعم أو لا. كم ورقة إجابات توجد؟`, `A poll has ${k} yes-or-no questions. How many answer sheets are there?`)
            : say(`Kiniela batek ${k} partida ditu (1, X, 2). Zenbat kiniela daude?`, `Una quiniela tiene ${k} partidos (1, X, 2). ¿Cuántas quinielas hay?`, `في ورقة توقعات ${k} مباريات (1، X، 2). كم ورقة توجد؟`, `A pools coupon has ${k} matches (1, X, 2). How many coupons are there?`)
    return choices && build('pin', prompt, choices, answer, all(`VR_{${n},${k}}=${n}^{${k}}=${n ** k}`), { n, k })
}

function queueQuestion(random: Random): ProbabilityBatx2gRaceQuestion | null {
    const n = randomInt(random, 4, 7)
    const answer = fraction(arrangements(n, n))
    const choices = options(random, answer, [[n ** n, 'repetition'], [n * n, 'calculation'], [arrangements(n, n - 1) / 2, 'order-counted'], [n * (n - 1), 'calculation']])
    return choices && build('queue', say(`Zenbat modutan jar daitezke ${n} pertsona ilara batean?`, `¿De cuántas formas se ponen ${n} personas en una cola?`, `بكم طريقة يُوضع ${n} أشخاص في طابور؟`, `In how many ways can ${n} people stand in a queue?`), choices, answer, all(`P_{${n}}=${n}!=${arrangements(n, n)}`), { n })
}

function committeeQuestion(random: Random): ProbabilityBatx2gRaceQuestion | null {
    const n = randomInt(random, 6, 12)
    const k = randomInt(random, 2, 4)
    const answer = fraction(combinations(n, k))
    const choices = options(random, answer, [[arrangements(n, k), 'order-counted'], [n ** k, 'repetition'], [n * k, 'calculation'], [combinations(n, k) * 2, 'calculation']])
    return choices && build('committee', say(`${n} bizilagunen artean ${k} pertsonako batzorde bat osatzen da. Zenbat batzorde daude?`, `Entre ${n} vecinos se forma una comisión de ${k}. ¿Cuántas comisiones hay?`, `تُكوَّن لجنة من ${k} أشخاص من بين ${n} جيران. كم لجنة توجد؟`, `A committee of ${k} is formed from ${n} neighbours. How many committees are there?`), choices, answer, all(`C_{${n},${k}}=${combinations(n, k)}`), { n, k })
}

function lotQuestion(random: Random): ProbabilityBatx2gRaceQuestion | null {
    const women = randomInt(random, 3, 7)
    const men = randomInt(random, 2, 6)
    const total = women + men
    const answer = fraction(combinations(women, 2), combinations(total, 2))
    const choices = options(random, answer, [[fraction(arrangements(women, 2), combinations(total, 2)), 'mixed-criteria'], [fraction(women * women, total * total), 'replacement'], [fraction(women, total), 'multiply'], [fraction(combinations(women, 2), arrangements(total, 2)), 'mixed-criteria']])
    return choices && build('lot', say(`${women} emakume eta ${men} gizonetik 2 zozketatzen dira. Zein da biak emakumeak izateko probabilitatea?`, `De ${women} mujeres y ${men} hombres se sortean 2. ¿Probabilidad de dos mujeres?`, `من ${women} نساء و${men} رجال تُجرى قرعة لاثنين. ما احتمال امرأتين؟`, `2 are drawn from ${women} women and ${men} men. What is the probability of two women?`), choices, answer, all(`\\frac{C_{${women},2}}{C_{${total},2}}=\\frac{${combinations(women, 2)}}{${combinations(total, 2)}}=${written(answer)}`), { women, men })
}

const countingGenerators = [postsQuestion, pinQuestion, queueQuestion, committeeQuestion, lotQuestion]

export function generateProbabilityBatx2gRaceQuestion(random: Random, circuit: number, tier: Tier): ProbabilityBatx2gRaceQuestion {
    if (circuit >= 1 && circuit <= 3) return generateProbabilityBatx2RaceQuestion(random, circuit, tier) as ProbabilityBatx2gRaceQuestion
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, countingGenerators)(random)
        if (next) return next
    }
    throw new Error('No counting question')
}

export const checkProbabilityBatx2gPitAnswer = (question: RaceQuestion<ProbabilityBatx2gRaceError>, input: string) => checkProbabilityBatx2PitAnswer(question as RaceQuestion<ProbabilityBatx2RaceError>, input)

export function probabilityBatx2gParTime(circuit: number): number {
    return circuit === 0 ? parTimeFor(12) : probabilityBatx2ParTime(circuit)
}

export const probabilityBatx2gRaceErrorTips: Record<ProbabilityBatx2gRaceError, LocalizedText> = {
    ...probabilityBatx2RaceErrorTips,
    'order-counted': say('Batzorde edo talde batean ordenak ez du axola: konbinazioak.', 'En una comisión o un grupo el orden no importa: combinaciones.', 'لا يهم الترتيب في لجنة أو مجموعة: توافيق.', 'In a committee or a group the order does not matter: combinations.'),
    repetition: say('Errepika daiteke? Kode batean bai; kargu batean ez.', '¿Se puede repetir? En un código sí; en un cargo no.', 'هل يجوز التكرار؟ في رمز نعم، وفي منصب لا.', 'Can it repeat? In a code, yes; in a post, no.'),
    'mixed-criteria': say('Aldekoak eta posibleak irizpide berarekin zenbatu.', 'Cuenta favorables y posibles con el mismo criterio.', 'عُدّ الملائمة والممكنة بالمعيار نفسه.', 'Count favourable and possible cases the same way.')
}
