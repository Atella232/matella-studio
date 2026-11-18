import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { RaceOption, RaceQuestion, Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { determinanteakParTime, generateDeterminanteakRaceQuestion, type DeterminanteakRaceError, type DeterminanteakRaceQuestion } from '../../batx2-zientziak-determinanteak/games/race.ts'

/* ==========================================================================
   Determinanteen lasterketa (Batxilergoa 2 · Gizarte Zientziak): the five
   circuits of the Ciencias twin, without the determinants of order 4 that
   the Sociales books leave out, and with questions of their own in half
   of the turns of circuits 1 and 5: |A| of two bundles, and the value of
   a that leaves the prices of two bundles undecided.
   ========================================================================== */

/** Kinds of the twin that the Sociales books do not have */
export const LEFT_OUT_KINDS = ['block']

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex}$` })
const pm = (rows: Array<Array<number | string>>) => `\\begin{pmatrix}${rows.map((row) => row.join('&')).join('\\\\')}\\end{pmatrix}`

interface Candidate {
    value: number
    error: DeterminanteakRaceError
}

/** The right option and three different mistakes */
function options(random: Random, right: number, candidates: Candidate[]): RaceOption<DeterminanteakRaceError>[] | null {
    const rightLatex = written(fraction(right))!
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: DeterminanteakRaceError }> = []
    for (const candidate of [...candidates, ...[right + 1, right - 1, right + 2, -right].map((value) => ({ value, error: 'calculation' as const }))]) {
        if (wrong.length === 3) break
        if (!Number.isInteger(candidate.value)) continue
        const latex = written(fraction(candidate.value))
        if (latex === null || latex === '-0' || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<DeterminanteakRaceError>[], answer: number, solution: LocalizedText, meta: Record<string, number | number[][]>): DeterminanteakRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer: fraction(answer) as FractionValue, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/** |A| of two bundles of two products */
function bundlesQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const q = [[randomInt(random, 1, 6), randomInt(random, 1, 6)], [randomInt(random, 1, 6), randomInt(random, 1, 6)]]
    const [[p, s1], [r, s]] = q
    const answer = p * s - s1 * r
    const choices = options(random, answer, [{ value: p * s + s1 * r, error: 'diagonal-sum' }, { value: s1 * r - p * s, error: 'sign' }])
    return choices && build(0, 'bundles', say(
        `Bi sorta: $${pm(q)}$, errenkada bat sorta bakoitzeko. Zenbat da $|A|$?`,
        `Dos lotes: $${pm(q)}$, una fila por lote. ¿Cuánto vale $|A|$?`,
        `مجموعتان: $${pm(q)}$، صف لكل مجموعة. كم يساوي $|A|$؟`,
        `Two bundles: $${pm(q)}$, one row per bundle. What is $|A|$?`
    ), choices, answer, same(`|A|=${p}\\cdot ${s}-${s1}\\cdot ${r}=${answer}`), { q })
}

/** The a with |p a / r s| = 0: the prices of the two bundles cannot be found */
function criticalQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const r = randomInt(random, 1, 4)
    const a = randomInt(random, 1, 8)
    const p = randomInt(random, 1, 6)
    if ((a * r) % p !== 0) return null
    const s = (a * r) / p
    if (s > 9 || s === a) return null
    const choices = options(random, a, [{ value: -a, error: 'sign' }, { value: (r * s) / p, error: 'calculation' }, { value: p * s - r, error: 'calculation' }])
    const matrix = pm([[p, 'a'], [r, s]])
    return choices && build(4, 'critical-bundle', say(
        `Sortak: $${matrix}$. Zein $a$ baliotarako ezin dira prezioak ondorioztatu?`,
        `Lotes: $${matrix}$. ¿Para qué $a$ no se pueden deducir los precios?`,
        `المجموعات: $${matrix}$. لأي $a$ لا يمكن استنتاج الأسعار؟`,
        `Bundles: $${matrix}$. For which $a$ can the prices not be found?`
    ), choices, a, same(`${p}\\cdot ${s}-${r}a=0\\ \\to\\ a=${a}`), { p, r, s, a })
}

const ownGenerators: Record<number, Array<(random: Random) => DeterminanteakRaceQuestion | null>> = {
    0: [bundlesQuestion],
    4: [criticalQuestion]
}

export function generateGizarteDeterminantRaceQuestion(random: Random, circuit: number, tier: Tier): DeterminanteakRaceQuestion {
    const own = ownGenerators[circuit]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        if (own && random() < 0.5) {
            const next = pick(random, own)(random)
            if (next) return next
            continue
        }
        const next = generateDeterminanteakRaceQuestion(random, circuit, tier)
        if (!LEFT_OUT_KINDS.includes(next.kind)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkGizarteDeterminantPitAnswer(question: RaceQuestion<DeterminanteakRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export const gizarteDeterminantParTime = determinanteakParTime
