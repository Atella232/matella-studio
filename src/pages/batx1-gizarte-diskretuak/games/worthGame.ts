import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'

/* ==========================================================================
   J3 · Merezi du? (¿Merece la pena?): a raffle, a die game or a two-coin
   game, with its prizes and its price. Level 1 asks for the player's mean
   gain: the wrong options forget the price, or take it the wrong way
   round. Level 2 asks whether the game is unfavourable, fair or
   favourable: the rounds have each verdict. Level 3 asks for the fair
   price: the wrong options are the plain mean of the prizes (without
   their probabilities) and the top prize alone. Money is kept in cents,
   so every value is exact. Pure logic.
   ========================================================================== */

export const WORTH_ROUNDS = 6

export type Verdict = 'unfavourable' | 'fair' | 'favourable'
export const WORTH_VERDICTS: Verdict[] = ['unfavourable', 'fair', 'favourable']

export interface WorthGame {
    text: LocalizedText
    /** The price, in cents */
    price: number
    /** The mean prize μ, in cents */
    mean: number
    /** The plain mean of the prizes, and what the top prize alone gives, in cents (the level 3 mistakes) */
    plain: number
    top: number
}

/** A game before its price is set: what it pays, and its text for a price */
interface Draft {
    text: (price: number) => LocalizedText
    mean: number
    plain: number
    top: number
}

export interface WorthRound {
    game: WorthGame
    options: string[]
    answer: number
}

/** Cents written as euros for LaTeX: 250 → 2{,}5, −50 → −0{,}5 */
export const eurosLatex = (cents: number) => {
    const sign = cents < 0 ? '-' : ''
    const whole = Math.floor(Math.abs(cents) / 100)
    const rest = Math.abs(cents) % 100
    return `${sign}${whole}${rest ? `{,}${String(rest).padStart(2, '0').replace(/0$/, '')}` : ''}`
}
/** Euros in the words of each language */
const money = (cents: number) => {
    const value = eurosLatex(cents).replace('{,}', ',')
    return { eu: `${value} €`, es: `${value} €`, ar: `${value.replace(',', '.')} €`, en: `€${value.replace(',', '.')}` }
}

/** A raffle: N tickets, one top prize and some small ones */
function raffle(random: Random): Draft | null {
    const tickets = pick(random, [100, 200, 500, 1000])
    const top = 50 * randomInt(random, 1, 10)
    const count = randomInt(random, 2, 10)
    const small = 10 * randomInt(random, 1, 5)
    const mean = (100 * (top + count * small)) / tickets
    if (!Number.isInteger(mean) || mean % 10 !== 0) return null
    const t = money(100 * top)
    const s = money(100 * small)
    return {
        text: (price) => { const c = money(price); return say(`Zozketa batean ${tickets} txartel saltzen dira, bakoitza ${c.eu}. Sari bat dago, ${t.eu}, eta ${count}, ${s.eu} bakoitza.`, `En una rifa se venden ${tickets} boletos a ${c.es}. Hay un premio de ${t.es} y ${count} de ${s.es}.`, `في يانصيب تُباع ${tickets} بطاقة بسعر ${c.ar}. هناك جائزة قدرها ${t.ar} و${count} جوائز قدر كل منها ${s.ar}.`, `In a raffle ${tickets} tickets are sold at ${c.en}. There is one prize of ${t.en} and ${count} of ${s.en}.`); },
        mean, plain: Math.round((100 * (top + count * small)) / (count + 1)), top: (100 * top) / tickets
    }
}

/** A die: a prize for a six and another for a five */
function die(random: Random): Draft | null {
    const six = randomInt(random, 2, 12)
    const five = randomInt(random, 0, 6)
    const mean = (100 * (six + five)) / 6
    if (!Number.isInteger(mean) || mean % 10 !== 0) return null
    const a = money(100 * six)
    const b = money(100 * five)
    const fiveText = five ? say(`, eta 5 ateratzen bada, ${b.eu}`, ` y con un 5, ${b.es}`, `، ومع 5 ${b.ar}`, ` and a 5 pays ${b.en}`) : say('', '', '', '')
    return {
        text: (price) => { const c = money(price); return say(`Jokatzeak ${c.eu} balio du. Dado bat botatzen da: 6 ateratzen bada, ${a.eu} ematen dira${fiveText.eu}.`, `Jugar cuesta ${c.es}. Se lanza un dado: con un 6 te dan ${a.es}${fiveText.es}.`, `يكلّف اللعب ${c.ar}. يُرمى نرد: مع 6 تأخذ ${a.ar}${fiveText.ar}.`, `Playing costs ${c.en}. A die is rolled: a 6 pays ${a.en}${fiveText.en}.`); },
        mean, plain: five ? (100 * (six + five)) / 2 : 100 * six, top: (100 * six) / 6
    }
}

/** Two coins: a prize for two heads and another for one */
function coins(random: Random): Draft | null {
    const two = randomInt(random, 2, 10)
    const one = randomInt(random, 1, 4)
    const mean = 25 * two + 50 * one
    if (mean % 10 !== 0) return null
    const a = money(100 * two)
    const b = money(100 * one)
    return {
        text: (price) => { const c = money(price); return say(`Jokatzeak ${c.eu} balio du. Bi txanpon botatzen dira: bi aurpegi ateratzen badira, ${a.eu} ematen dira, eta aurpegi bakarra, ${b.eu}.`, `Jugar cuesta ${c.es}. Se lanzan dos monedas: con dos caras te dan ${a.es}, y con una sola cara, ${b.es}.`, `يكلّف اللعب ${c.ar}. تُرمى قطعتا نقود: مع وجهين تأخذ ${a.ar}، ومع وجه واحد ${b.ar}.`, `Playing costs ${c.en}. Two coins are tossed: two heads pay ${a.en}, and a single head, ${b.en}.`); },
        mean, plain: (100 * (two + one)) / 2, top: 25 * two
    }
}

const SOURCES = [raffle, die, coins]

/** A game with the verdict asked for: the price is set around the mean prize */
function gameWith(random: Random, verdict: Verdict): WorthGame | null {
    const draft = pick(random, SOURCES)(random)
    if (!draft) return null
    const price = verdict === 'fair' ? draft.mean : verdict === 'unfavourable' ? draft.mean + 50 * randomInt(random, 1, 4) : draft.mean - 50 * randomInt(random, 1, 4)
    if (price < 50 || price % 10 !== 0) return null
    return { text: draft.text(price), price, mean: draft.mean, plain: draft.plain, top: draft.top }
}

export const gainOf = (game: WorthGame) => game.mean - game.price
export const verdictOf = (game: WorthGame): Verdict => (gainOf(game) < 0 ? 'unfavourable' : gainOf(game) === 0 ? 'fair' : 'favourable')

function makeRound(random: Random, level: number, verdict: Verdict): WorthRound | null {
    const game = gameWith(random, verdict)
    if (!game) return null
    if (level === 1) return { game, options: WORTH_VERDICTS, answer: WORTH_VERDICTS.indexOf(verdictOf(game)) }
    const values = level === 0 ? [gainOf(game), game.mean, game.price - game.mean] : [game.mean, game.plain, game.top]
    if (!values.every(Number.isInteger)) return null
    const latex = values.map(eurosLatex)
    if (new Set(latex).size < 3) return null
    const options = shuffle(random, latex)
    return { game, options, answer: options.indexOf(latex[0]) }
}

/** Six rounds; on level 2, each verdict twice; on level 1 no fair game (its gain, 0, is also price − μ); never the same game twice */
export function createWorthRounds(random: Random, level: number): WorthRound[] {
    const verdicts = level === 1 ? shuffle(random, [...WORTH_VERDICTS, ...WORTH_VERDICTS]) : Array.from({ length: WORTH_ROUNDS }, () => pick(random, (level === 0 ? ['unfavourable', 'unfavourable', 'favourable'] : ['unfavourable', 'unfavourable', 'fair', 'favourable']) as Verdict[]))
    const rounds: WorthRound[] = []
    for (const verdict of verdicts) {
        for (let attempt = 0; attempt < 500; attempt += 1) {
            const round = makeRound(random, level, verdict)
            if (round && !rounds.some((other) => other.game.text.es === round.game.text.es)) {
                rounds.push(round)
                break
            }
        }
    }
    return rounds
}
