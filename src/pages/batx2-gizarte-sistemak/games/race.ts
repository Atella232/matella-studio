import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { RaceOption, RaceQuestion, Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { generateSistemakRaceQuestion, sistemakParTime, type SistemakRaceError, type SistemakRaceQuestion } from '../../batx2-zientziak-sistemak/games/race.ts'

/* ==========================================================================
   Sistemen lasterketa (Batxilergoa 2 · Gizarte Zientziak): the five
   circuits of the Ciencias twin, without the three concurrent lines that
   this unit leaves out, and with questions of their own in half of the
   turns of circuits 1 and 5: the price of a third bundle that makes the
   data fit, and an investment split by a sentence («k times as much»).
   ========================================================================== */

/** Kinds of the twin that this unit does not have */
export const LEFT_OUT_KINDS = ['concurrent']

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex}$` })

interface Candidate {
    value: number
    error: SistemakRaceError
}

/** The right option and three different mistakes */
function options(random: Random, right: number, candidates: Candidate[]): RaceOption<SistemakRaceError>[] | null {
    const rightLatex = written(fraction(right))!
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: SistemakRaceError }> = []
    for (const candidate of [...candidates, ...[right + 1, right - 1, right + 2, right + 3].map((value) => ({ value, error: 'calculation' as const }))]) {
        if (wrong.length === 3) break
        if (!Number.isInteger(candidate.value) || candidate.value < 0) continue
        const latex = written(fraction(candidate.value))
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<SistemakRaceError>[], answer: number, solution: LocalizedText, meta: Record<string, number | number[] | number[][]>): SistemakRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer: fraction(answer) as FractionValue, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/** Three bundles of two products: the third is the sum of the first two, so its price must be the sum */
function thirdBundleQuestion(random: Random): SistemakRaceQuestion | null {
    const prices = [randomInt(random, 1, 6), randomInt(random, 1, 6)]
    const first = [randomInt(random, 1, 4), randomInt(random, 1, 4)]
    const second = [randomInt(random, 1, 4), randomInt(random, 1, 4)]
    if (first[0] * second[1] === first[1] * second[0]) return null
    const cost = (row: number[]) => row[0] * prices[0] + row[1] * prices[1]
    const third = [first[0] + second[0], first[1] + second[1]]
    const answer = cost(third)
    const choices = options(random, answer, [{ value: cost(first) * cost(second), error: 'calculation' }, { value: Math.abs(cost(first) - cost(second)), error: 'sign' }, { value: answer + prices[0], error: 'calculation' }])
    const bundle = (row: number[]) => `(${row[0]},${row[1]})`
    return choices && build(0, 'third-bundle', say(
        `Sortak: $${bundle(first)}$ ${cost(first)} euro eta $${bundle(second)}$ ${cost(second)} euro. Zenbat balio behar du $${bundle(third)}$ sortak datuak bat etortzeko?`,
        `Lotes: $${bundle(first)}$ a ${cost(first)} € y $${bundle(second)}$ a ${cost(second)} €. ¿Cuánto debe costar $${bundle(third)}$ para que los datos cuadren?`,
        `المجموعات: $${bundle(first)}$ بـ ${cost(first)} € و$${bundle(second)}$ بـ ${cost(second)} €. كم يجب أن تكلّف $${bundle(third)}$ لكي تتوافق المعطيات؟`,
        `Bundles: $${bundle(first)}$ at €${cost(first)} and $${bundle(second)}$ at €${cost(second)}. How much must $${bundle(third)}$ cost for the data to fit?`
    ), choices, answer, same(`${cost(first)}+${cost(second)}=${answer}`), { first, second, prices })
}

/** x + kx = T: «in the second, k times as much as in the first» */
function investQuestion(random: Random): SistemakRaceQuestion | null {
    const k = pick(random, [2, 3, 4])
    const x = randomInt(random, 2, 9)
    const total = x * (k + 1)
    const choices = options(random, x, [{ value: k * x, error: 'inverted' }, { value: total / k, error: 'inverted' }, { value: total - k, error: 'calculation' }])
    return choices && build(4, 'invest', say(
        `${total} mila euro bi fondotan: bigarrenean, lehenean bezainbeste bider ${k}. Zenbat mila doaz lehenengora?`,
        `${total} mil euros en dos fondos: en el segundo, ${k} veces lo del primero. ¿Cuántos miles van al primero?`,
        `${total} ألف يورو في صندوقين: في الثاني ${k} أضعاف ما في الأول. كم ألفًا يذهب إلى الأول؟`,
        `${total} thousand euros in two funds: in the second, ${k} times as much as in the first. How many thousand go to the first?`
    ), choices, x, same(`x+${k}x=${total}\\ \\to\\ x=${x}`), { k, x, total })
}

const ownGenerators: Record<number, Array<(random: Random) => SistemakRaceQuestion | null>> = {
    0: [thirdBundleQuestion],
    4: [investQuestion]
}

export function generateGizarteSystemsRaceQuestion(random: Random, circuit: number, tier: Tier): SistemakRaceQuestion {
    const own = ownGenerators[circuit]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        if (own && random() < 0.5) {
            const next = pick(random, own)(random)
            if (next) return next
            continue
        }
        const next = generateSistemakRaceQuestion(random, circuit, tier)
        if (!LEFT_OUT_KINDS.includes(next.kind)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkGizarteSystemsPitAnswer(question: RaceQuestion<SistemakRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export const gizarteSystemsParTime = sistemakParTime
