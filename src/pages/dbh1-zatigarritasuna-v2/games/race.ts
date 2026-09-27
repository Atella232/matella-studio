import type { AnswerCheck } from '../../../features/unit-v2/math/fraction.ts'
import { fraction } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { checkDivisibilityPitAnswer, divisibilityRaceErrorTips, generateDivisibilityRaceQuestion, type DivisibilityRaceError } from '../../dbh2-zatigarritasuna/games/race.ts'

/* ==========================================================================
   Carrera de divisibilidad (1. DBH). The first circuit adds a question of
   its own: things shared out in equal bags or groups, and how many are left
   over (Santillana's pencils). Everything else reuses the 2. DBH questions,
   only at the two easier levels (no rule for 11, small numbers).
   ========================================================================== */

export const INTRO_RACE_CIRCUITS = 5

export type IntroDivisibilityRaceError = DivisibilityRaceError | 'quotient'
export type IntroDivisibilityRaceQuestion = RaceQuestion<IntroDivisibilityRaceError>

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })

interface Grouping {
    text: (total: number, size: number) => LocalizedText
    question: LocalizedText
}

const groupings: Grouping[] = [
    { text: (total, size) => say(`${total} arkatz ${size}ko poltsetan gorde nahi ditugu.`, `Queremos guardar ${total} lápices en bolsas de ${size}.`, `نريد وضع ${total} قلمًا في أكياس من ${size}.`), question: say('Zenbat arkatz geratzen dira soberan?', '¿Cuántos lápices sobran?', 'كم قلمًا يبقى؟') },
    { text: (total, size) => say(`${total} ikasle ${size}ko taldeetan jarri nahi ditugu.`, `Queremos poner a ${total} alumnos en grupos de ${size}.`, `نريد وضع ${total} تلميذًا في مجموعات من ${size}.`), question: say('Zenbat ikasle geratzen dira taldetik kanpo?', '¿Cuántos alumnos se quedan sin grupo?', 'كم تلميذًا يبقى بلا مجموعة؟') },
    { text: (total, size) => say(`${total} pilota ${size}ko poteetan sartu nahi ditugu.`, `Queremos meter ${total} pelotas en botes de ${size}.`, `نريد وضع ${total} كرة في علب من ${size}.`), question: say('Zenbat pilota geratzen dira soberan?', '¿Cuántas pelotas sobran?', 'كم كرة تبقى؟') },
    { text: (total, size) => say(`${total} lata ${size}ko kutxetan gorde nahi ditugu.`, `Queremos guardar ${total} latas en cajas de ${size}.`, `نريد وضع ${total} علبة في صناديق من ${size}.`), question: say('Zenbat lata geratzen dira soberan?', '¿Cuántas latas sobran?', 'كم علبة تبقى؟') }
]

/** How many are left over when sharing out in equal groups: the remainder */
function leftOverQuestion(random: Random, tier: Tier): IntroDivisibilityRaceQuestion | null {
    const size = randomInt(random, 3, [6, 9, 12][tier])
    const groups = randomInt(random, 2, [6, 9, 12][tier])
    const rest = random() < 0.2 ? 0 : randomInt(random, 1, size - 1)
    const total = size * groups + rest
    const wrong: Array<{ value: number; error: IntroDivisibilityRaceError }> = [
        { value: groups, error: 'quotient' },
        { value: size - rest, error: 'calculation' },
        { value: rest + 1, error: 'calculation' },
        { value: rest === 0 ? size : rest - 1, error: 'calculation' },
        { value: rest + 2, error: 'calculation' }
    ]
    const seen = new Set([rest])
    const chosen = wrong.filter(({ value }) => value >= 0 && !seen.has(value) && seen.add(value)).slice(0, 3)
    if (chosen.length < 3) return null
    const options: RaceOption<IntroDivisibilityRaceError>[] = shuffle(random, [
        { latex: String(rest), correct: true, error: null },
        ...chosen.map(({ value, error }) => ({ latex: String(value), correct: false, error }))
    ])
    const grouping = pick(random, groupings)
    const text = grouping.text(total, size)
    const worked = `$${total}=${size}\\cdot ${groups}+${rest}$`
    return {
        circuit: 0,
        kind: 'left-over',
        prompt: say(`${text.eu} ${grouping.question.eu}`, `${text.es} ${grouping.question.es}`, `${text.ar} ${grouping.question.ar}`),
        options,
        answer: fraction(rest),
        answerForm: 'any',
        percentAnswer: false,
        writable: true,
        solution: say(`${worked}: ${rest === 0 ? 'ez da ezer soberan geratzen' : `${rest} soberan`}.`, `${worked}: ${rest === 0 ? 'no sobra nada' : `sobran ${rest}`}.`, `${worked}: ${rest === 0 ? 'لا يبقى شيء' : `يبقى ${rest}`}.`)
    }
}

export function generateIntroDivisibilityRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): IntroDivisibilityRaceQuestion {
    if (circuit === 0 && random() < 0.4) {
        for (let attempt = 0; attempt < 100; attempt += 1) {
            const next = leftOverQuestion(random, tier)
            if (next) return next
        }
    }
    // First year: the two easier levels of the 2. DBH questions
    return generateDivisibilityRaceQuestion(random, circuit, Math.min(tier, 1) as Tier, requireWritable)
}

export function checkIntroDivisibilityPitAnswer(question: IntroDivisibilityRaceQuestion, input: string): AnswerCheck {
    return checkDivisibilityPitAnswer(question as RaceQuestion<DivisibilityRaceError>, input)
}

export function introDivisibilityParTime(circuit: number): number {
    return parTimeFor([8, 9, 10, 12, 15][circuit] ?? 10)
}

export const introDivisibilityRaceErrorTips: Record<IntroDivisibilityRaceError, LocalizedText> = {
    ...divisibilityRaceErrorTips,
    quotient: say('Hori talde kopurua da (zatidura). Soberan geratzen dena hondarra da.', 'Eso es el número de grupos (el cociente). Lo que sobra es el resto.', 'هذا عدد المجموعات (الناتج). وما يبقى هو الباقي.')
}
