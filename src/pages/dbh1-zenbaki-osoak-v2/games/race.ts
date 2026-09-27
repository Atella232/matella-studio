import type { AnswerCheck } from '../../../features/unit-v2/math/fraction.ts'
import { fraction } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { checkIntegerPitAnswer, generateIntegerRaceQuestion, integerRaceErrorTips, signedLatex, type IntegerRaceError } from '../../dbh2-zenbaki-osoak/games/race.ts'

/* ==========================================================================
   Carrera de enteros (1. DBH). The first circuit is new: everyday
   situations written as integers. The other four reuse the 2. DBH
   questions, only at the two easier levels.
   ========================================================================== */

export const INTRO_RACE_CIRCUITS = 5

export type IntroRaceError = IntegerRaceError | 'situation'
export type IntroRaceQuestion = RaceQuestion<IntroRaceError>

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })

interface Situation {
    sign: 1 | -1
    text: (size: number) => LocalizedText
}

const situations: Situation[] = [
    { sign: -1, text: (size) => say(`Autoa ${size}. sotoan dago.`, `El coche está en el sótano ${size}.`, `السيارة في القبو ${size}.`) },
    { sign: 1, text: (size) => say(`Bulegoa ${size}. solairuan dago.`, `La oficina está en la planta ${size}.`, `المكتب في الطابق ${size}.`) },
    { sign: -1, text: (size) => say(`Zero azpitik ${size} gradu daude.`, `Hace ${size} grados bajo cero.`, `الحرارة ${size} درجات تحت الصفر.`) },
    { sign: 1, text: (size) => say(`Zero gainetik ${size} gradu daude.`, `Hace ${size} grados sobre cero.`, `الحرارة ${size} درجات فوق الصفر.`) },
    { sign: -1, text: (size) => say(`${size} € zor ditut.`, `Debo ${size} €.`, `عليّ ${size} €.`) },
    { sign: 1, text: (size) => say(`${size} € aurreztuta ditut.`, `Tengo ${size} € ahorrados.`, `لديّ ${size} € مدّخرة.`) },
    { sign: -1, text: (size) => say(`Itsaspeko bat ${size} metroko sakoneran dago.`, `Un submarino está a ${size} metros de profundidad.`, `غواصة على عمق ${size} مترًا.`) },
    { sign: 1, text: (size) => say(`Kaio bat itsasotik ${size} metrora hegan dabil.`, `Una gaviota vuela a ${size} metros sobre el mar.`, `نورس يطير على ارتفاع ${size} مترًا فوق البحر.`) },
    { sign: 1, text: (size) => say(`Igogailua ${size} solairu igo da.`, `El ascensor ha subido ${size} plantas.`, `صعد المصعد ${size} طوابق.`) },
    { sign: -1, text: (size) => say(`Tenperatura ${size} gradu jaitsi da.`, `La temperatura ha bajado ${size} grados.`, `انخفضت الحرارة ${size} درجات.`) }
]

function situationQuestion(random: Random, tier: Tier): IntroRaceQuestion | null {
    const situation = pick(random, situations)
    const size = randomInt(random, 1, [9, 25, 150][tier])
    const answer = situation.sign * size
    const wrong = [-answer, answer + situation.sign, 0].filter((value, index, list) => value !== answer && list.indexOf(value) === index)
    if (wrong.length < 3) wrong.push(answer - situation.sign)
    const options: RaceOption<IntroRaceError>[] = shuffle(random, [
        { latex: signedLatex(answer), correct: true, error: null },
        ...wrong.slice(0, 3).map((value) => ({ latex: signedLatex(value), correct: false, error: (value === -answer ? 'situation' : 'calculation') as IntroRaceError }))
    ])
    const sentence = situation.text(size)
    return {
        circuit: 0,
        kind: 'situation',
        prompt: say(`${sentence.eu} Zein zenbaki oso da?`, `${sentence.es} ¿Qué número entero es?`, `${sentence.ar} ما العدد الصحيح؟`),
        options,
        answer: fraction(answer),
        answerForm: 'any',
        percentAnswer: false,
        writable: true,
        solution: { eu: `$${signedLatex(answer)}$`, es: `$${signedLatex(answer)}$`, ar: `$${signedLatex(answer)}$` }
    }
}

/** 1. DBH circuit → 2. DBH circuit whose questions it reuses */
const sharedCircuit: Record<number, number> = { 1: 1, 2: 0, 3: 2, 4: 3 }

export function generateIntroRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): IntroRaceQuestion {
    if (circuit === 0) {
        for (let attempt = 0; attempt < 100; attempt += 1) {
            const next = situationQuestion(random, tier)
            if (next) return next
        }
        throw new Error('No situation question')
    }
    // First year: the two easier levels of the 2. DBH questions
    const shared = generateIntegerRaceQuestion(random, sharedCircuit[circuit] ?? 1, Math.min(tier, 1) as Tier, requireWritable)
    return { ...shared, circuit }
}

export function checkIntroPitAnswer(question: IntroRaceQuestion, input: string): AnswerCheck {
    return checkIntegerPitAnswer(question as RaceQuestion<IntegerRaceError>, input)
}

export function introParTime(circuit: number): number {
    return parTimeFor([7, 7, 8, 10, 9][circuit] ?? 9)
}

export const introRaceErrorTips: Record<IntroRaceError, LocalizedText> = {
    ...integerRaceErrorTips,
    situation: say('Zeinua da kontua: zero azpitik, zorrak, sotoak eta jaitsierak negatiboak dira.', 'Fíjate en el signo: bajo cero, deudas, sótanos y bajadas son negativos.', 'انتبه للإشارة: تحت الصفر والديون والأقبية والنزول سالبة.')
}
