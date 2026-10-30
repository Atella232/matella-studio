import { add, checkAnswer, divide, equals, fraction, multiply, subtract, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker, OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readLabAnswer } from '../answers.ts'
import type { MotionMode } from './labTools.ts'
import { roundedAnswer } from './percentBar.ts'

/* ==========================================================================
   The distance–time graph of two vehicles: each one is a line (steeper is
   faster), flat while it waits to set off. A goes from the start (0 km)
   to the right; B starts d km away and comes towards A (meeting) or goes
   the same way (chase). Either may set off later. Where the lines cross
   they meet: the learner writes the minutes since the first departure.
   Times in minutes and distances in km, exact. Tests in
   tests/proportzionaltasuna-dbh4ap-graph.test.ts.
   ========================================================================== */

export type LateVehicle = 'none' | 'A' | 'B'

export const GRAPH_DISTANCES = [0, 30, 60, 75, 120, 150, 240, 300] as const
export const GRAPH_DELAYS = [15, 30, 45, 60, 90, 120] as const
export const GRAPH_SPEED_MIN = 10
export const GRAPH_SPEED_MAX = 150
export const GRAPH_SPEED_STEP = 10

export interface RoadGraphState extends OperationAnswer {
    /** Typed on the English page (18,700 is eighteen thousand seven hundred) */
    english?: boolean
    mode: MotionMode
    /** km from A's start to B's start; 0 only in a chase (both from the same place) */
    distance: number
    /** km/h of A and of B */
    speeds: [number, number]
    late: LateVehicle
    /** Minutes the late vehicle waits */
    delay: number
}

const freshAnswer = { answer: '', checked: false, revealed: false }

/** Not one of the challenges, so that none is solved on arrival */
export const initialRoadGraphState: RoadGraphState = { mode: 'meet', distance: 240, speeds: [60, 90], late: 'B', delay: 30, ...freshAnswer }

const roundSpeed = (value: number) => Math.min(GRAPH_SPEED_MAX, Math.max(GRAPH_SPEED_MIN, Math.round(value / GRAPH_SPEED_STEP) * GRAPH_SPEED_STEP))

/** A new case clears the answer; meeting from the same place makes no sense, so it moves B 30 km away */
export function setRoadGraph(state: RoadGraphState, patch: { mode?: MotionMode; distance?: number; speed?: [0 | 1, number]; late?: LateVehicle; delay?: number }): RoadGraphState {
    const speeds: [number, number] = [...state.speeds]
    if (patch.speed) speeds[patch.speed[0]] = roundSpeed(patch.speed[1])
    const mode = patch.mode ?? state.mode
    const distance = mode === 'meet' && (patch.distance ?? state.distance) === 0 ? 30 : patch.distance ?? state.distance
    const next = { mode, distance, speeds, late: patch.late ?? state.late, delay: patch.delay ?? state.delay }
    const same = next.mode === state.mode && next.distance === state.distance && speeds[0] === state.speeds[0] && speeds[1] === state.speeds[1] && next.late === state.late && next.delay === state.delay
    return same ? state : { ...next, ...freshAnswer }
}

/** Minute at which each vehicle sets off */
export const departures = (state: RoadGraphState): [number, number] => [state.late === 'A' ? state.delay : 0, state.late === 'B' ? state.delay : 0]

/** km/h → km per minute, exact */
const perMinute = (speed: number) => fraction(speed, 60)

/** Where each vehicle is (km from A's start) at a given minute */
export function positionsAt(state: RoadGraphState, minute: FractionValue): [FractionValue, FractionValue] {
    const [startA, startB] = departures(state)
    const movedA = toNumber(minute) <= startA ? fraction(0) : multiply(perMinute(state.speeds[0]), subtract(minute, fraction(startA)))
    const movedB = toNumber(minute) <= startB ? fraction(0) : multiply(perMinute(state.speeds[1]), subtract(minute, fraction(startB)))
    return [movedA, state.mode === 'meet' ? subtract(fraction(state.distance), movedB) : add(fraction(state.distance), movedB)]
}

/**
 * The first minute after the start at which both are at the same point,
 * or null if they never meet. The gap between them changes at a constant
 * rate between departures, so each stretch is a straight line.
 */
export function graphMeeting(state: RoadGraphState): { minutes: FractionValue; km: FractionValue } | null {
    const [startA, startB] = departures(state)
    const breaks = [...new Set([0, startA, startB])].sort((a, b) => a - b)
    for (let index = 0; index < breaks.length; index += 1) {
        const from = fraction(breaks[index])
        const to = index + 1 < breaks.length ? breaks[index + 1] : Infinity
        const [a, b] = positionsAt(state, from)
        const gap = subtract(b, a)
        // How the gap changes per minute while both keep this pace
        const rateA = breaks[index] >= startA ? perMinute(state.speeds[0]) : fraction(0)
        const rateB = breaks[index] >= startB ? perMinute(state.speeds[1]) : fraction(0)
        const rate = state.mode === 'meet' ? subtract(fraction(0), add(rateA, rateB)) : subtract(rateB, rateA)
        if (rate.numerator === 0) continue
        const wait = divide(subtract(fraction(0), gap), rate)
        if (wait.numerator < 0) continue
        const minutes = add(from, wait)
        if (toNumber(minutes) <= 0 || toNumber(minutes) > to + 1e-9) continue
        return { minutes, km: positionsAt(state, minutes)[0] }
    }
    return null
}

export const expectedGraphAnswer = (state: RoadGraphState) => {
    const meeting = graphMeeting(state)
    return meeting === null ? null : roundedAnswer(meeting.minutes).value
}

/** The learner wrote the meeting minute (a revealed result does not count) */
export function graphAnswered(state: RoadGraphState) {
    const expected = expectedGraphAnswer(state)
    return expected !== null && checkAnswer(readLabAnswer(state), expected) === 'correct'
}

/* ---------- Problems in words ---------- */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const join = (...parts: LocalizedText[]): LocalizedText => ({ eu: parts.map((part) => part.eu).join(' '), es: parts.map((part) => part.es).join(' '), en: parts.map((part) => part.en).join(' '), ar: parts.map((part) => part.ar).join(' ') })

/** The set-up of a case as sentences, and the question */
export function graphProblem(state: RoadGraphState): LocalizedText {
    const { mode, distance, speeds: [a, b], late, delay } = state
    const road = mode === 'meet'
        ? say(`Elkarrengana: ${distance} km daude artean.`, `Al encuentro: los separan ${distance} km.`, `تلاقٍ: المسافة بينهما ${distance} كم.`, `Towards each other: they are ${distance} km apart.`)
        : distance === 0
            ? say('Atzetik: leku beretik abiatzen dira.', 'Persecución: salen del mismo sitio.', 'مطاردة: ينطلقان من المكان نفسه.', 'Chase: they start from the same place.')
            : say(`Atzetik: B ${distance} km aurrerago abiatzen da.`, `Persecución: B sale ${distance} km por delante.`, `مطاردة: ينطلق B متقدمًا بمسافة ${distance} كم.`, `Chase: B starts ${distance} km ahead.`)
    const pace = say(`A: ${a} km/h; B: ${b} km/h.`, `A va a ${a} km/h y B, a ${b} km/h.`, `سرعة A ${a} كم/س وسرعة B ${b} كم/س.`, `A goes at ${a} km/h and B at ${b} km/h.`)
    const start = late === 'none'
        ? say('Batera abiatzen dira.', 'Salen a la vez.', 'وينطلقان معًا.', 'They start at the same time.')
        : say(`${late} ${delay} minutu geroago abiatzen da.`, `${late} sale ${delay} minutos más tarde.`, `وينطلق ${late} بعد ${delay} دقيقة.`, `${late} starts ${delay} minutes later.`)
    const question = say('Lehen irteeratik zenbat minutura elkartzen dira? Prestatu tresnan eta idatzi emaitza.', '¿A los cuántos minutos de la primera salida se encuentran? Prepáralo en la herramienta y escribe el resultado.', 'بعد كم دقيقة من أول انطلاق يلتقيان؟ جهّزها في الأداة واكتب النتيجة.', 'How many minutes after the first departure do they meet? Set it up in the tool and write the result.')
    return join(road, pace, start, question)
}

const sameCase = (state: RoadGraphState, wanted: Omit<RoadGraphState, keyof OperationAnswer>) =>
    state.mode === wanted.mode && state.distance === wanted.distance && state.speeds[0] === wanted.speeds[0] && state.speeds[1] === wanted.speeds[1] && state.late === wanted.late && (state.late === 'none' || state.delay === wanted.delay)

/* ---------- Challenges: the truck and the car, the car and the motorbike, the lesson, halfway ---------- */

export const roadGraphChallenges: LabChallenge<RoadGraphState>[] = [
    {
        id: 43701,
        prompt: say(
            'Kamioi bat (B) 80 km/h abiaduran abiatzen da. Ordubete geroago, auto bat (A) leku beretik abiatzen da, 120 km/h abiaduran. Kamioia abiatu eta zenbat minutura harrapatzen du autoak?',
            'Un camión (B) sale a 80 km/h. Una hora después sale un coche (A) del mismo sitio a 120 km/h. ¿A los cuántos minutos de salir el camión lo alcanza el coche?',
            'تنطلق شاحنة (B) بسرعة 80 كم/س. وبعد ساعة تنطلق سيارة (A) من المكان نفسه بسرعة 120 كم/س. بعد كم دقيقة من انطلاق الشاحنة تلحق بها السيارة؟', 'A lorry (B) sets off at 80 km/h. One hour later, a car (A) sets off from the same place at 120 km/h. How many minutes after the lorry sets off does the car catch up with it?'
        ),
        hint: say('Autoa abiatzean, kamioiak 80 km egin ditu. Gero A-k 40 km murrizten ditu orduko.', 'Cuando sale el coche, el camión lleva 80 km. Después, A recorta 40 km cada hora.', 'عند انطلاق السيارة تكون الشاحنة قد قطعت 80 كم. بعدها تقلّص A المسافة 40 كم كل ساعة.', 'When the car sets off, the lorry is already 80 km ahead. Then A closes 40 km every hour.'),
        isSolved: (state) => sameCase(state, { mode: 'chase', distance: 0, speeds: [120, 80], late: 'A', delay: 60 }) && graphAnswered(state)
    },
    {
        id: 43702,
        prompt: say(
            'A eta B herriek 300 km dute artean. Auto bat A-tik abiatzen da, 90 km/h abiaduran; ordu erdi geroago, moto bat B-tik abiatzen da A-rantz, 60 km/h abiaduran. Autoa abiatu eta zenbat minutura gurutzatzen dira?',
            'A y B distan 300 km. Un coche sale de A a 90 km/h; media hora después sale una moto de B hacia A a 60 km/h. ¿A los cuántos minutos de salir el coche se cruzan?',
            'المسافة بين A وB هي 300 كم. تنطلق سيارة من A بسرعة 90 كم/س، وبعد نصف ساعة تنطلق دراجة نارية من B نحو A بسرعة 60 كم/س. بعد كم دقيقة من انطلاق السيارة يتقاطعان؟', 'A and B are 300 km apart. A car sets off from A at 90 km/h; half an hour later, a motorbike sets off from B towards A at 60 km/h. How many minutes after the car sets off do they pass each other?'
        ),
        hint: say('Ordu erdian autoak 45 km egiten ditu; geratzen diren 255 km $90+60=150$ km/h abiaduran murrizten dira.', 'En media hora el coche hace 45 km; los 255 km que quedan se acortan a $90+60=150$ km/h.', 'في نصف ساعة تقطع السيارة 45 كم، والـ255 كم الباقية تتقلص بسرعة $90+60=150$ كم/س.', 'In half an hour the car covers 45 km; the 255 km left close at $90+60=150$ km/h.'),
        isSolved: (state) => sameCase(state, { mode: 'meet', distance: 300, speeds: [90, 60], late: 'B', delay: 30 }) && graphAnswered(state)
    },
    {
        id: 43703,
        prompt: say(
            'Ikasgaiko adibidea grafikoan: 240 km, 70 eta 110 km/h, elkarrengana eta batera abiatuta. Zenbat minutura gurutzatzen dira?',
            'El ejemplo de la lección en la gráfica: 240 km, a 70 y 110 km/h, al encuentro y saliendo a la vez. ¿A los cuántos minutos se cruzan?',
            'مثال الدرس على المنحنى: 240 كم، بسرعة 70 و110 كم/س، تلاقٍ وانطلاق معًا. بعد كم دقيقة يتقاطعان؟', 'The lesson\'s example on the graph: 240 km, at 70 and 110 km/h, towards each other and starting at the same time. How many minutes until they meet?'
        ),
        hint: say('$240\\mathbin{:}(70+110)$ h; pasatu minututara.', '$240\\mathbin{:}(70+110)$ h; pásalo a minutos.', '$240\\mathbin{:}(70+110)$ س؛ حوّلها إلى دقائق.', '$240\\mathbin{:}(70+110)$ h; convert it to minutes.'),
        isSolved: (state) => sameCase(state, { mode: 'meet', distance: 240, speeds: [70, 110], late: 'none', delay: state.delay }) && graphAnswered(state)
    },
    {
        id: 43704,
        prompt: say(
            'Elkarrengana eta abiadura desberdinekin, lortu bidearen erdian gurutzatzea.',
            'Al encuentro y con velocidades distintas, consigue que se crucen justo a mitad de camino.',
            'في التلاقي وبسرعتين مختلفتين، اجعلهما يتقاطعان في منتصف الطريق تمامًا.', 'Towards each other with different speeds: make them meet exactly halfway.'
        ),
        hint: say('Motelenak lehenago abiatu behar du.', 'El más lento tiene que salir antes.', 'يجب أن ينطلق الأبطأ أولًا.', 'The slower one has to set off first.'),
        isSolved: (state) => {
            const meeting = graphMeeting(state)
            return state.mode === 'meet' && state.speeds[0] !== state.speeds[1] && meeting !== null && equals(multiply(meeting.km, fraction(2)), fraction(state.distance))
        }
    }
]

/* ---------- Endless challenges ---------- */

/** An endless challenge is never already solved by the tool's first state */
function freshFrom<State>(start: State, maker: LabChallengeMaker<State>): LabChallengeMaker<State> {
    return (random) => {
        for (;;) {
            const challenge = maker(random)
            if (!challenge.isSolved(start)) return challenge
        }
    }
}

/** Any case whose meeting falls on a whole minute within ten hours */
export const roadGraphExtra: LabChallengeMaker<RoadGraphState> = freshFrom(initialRoadGraphState, (random) => {
    for (;;) {
        const mode: MotionMode = random() < 0.55 ? 'meet' : 'chase'
        const distance = pick(random, mode === 'meet' ? GRAPH_DISTANCES.slice(1) : GRAPH_DISTANCES)
        const speeds: [number, number] = [GRAPH_SPEED_STEP * randomInt(random, 3, 15), GRAPH_SPEED_STEP * randomInt(random, 3, 15)]
        const late = pick(random, ['none', 'A', 'B'] as const)
        const delay = late === 'none' ? 30 : pick(random, GRAPH_DELAYS)
        const solution: RoadGraphState = { mode, distance, speeds, late, delay, ...freshAnswer }
        const meeting = graphMeeting(solution)
        if (meeting === null || meeting.minutes.denominator !== 1 || meeting.minutes.numerator > 600) continue
        // Both must be on the road when they meet: a meeting while one still waits is a different story
        if (meeting.minutes.numerator <= Math.max(...departures(solution))) continue
        const wanted = { mode, distance, speeds, late, delay }
        return {
            prompt: graphProblem(solution),
            hint: late === 'none'
                ? mode === 'meet'
                    ? say(`$${distance}\\mathbin{:}(${speeds[0]}+${speeds[1]})$ h; pasatu minututara.`, `$${distance}\\mathbin{:}(${speeds[0]}+${speeds[1]})$ h; pásalo a minutos.`, `$${distance}\\mathbin{:}(${speeds[0]}+${speeds[1]})$ س؛ حوّلها إلى دقائق.`, `$${distance}\\mathbin{:}(${speeds[0]}+${speeds[1]})$ h; convert it to minutes.`)
                    : say(`$${distance}\\mathbin{:}(${speeds[0]}-${speeds[1]})$ h; pasatu minututara.`, `$${distance}\\mathbin{:}(${speeds[0]}-${speeds[1]})$ h; pásalo a minutos.`, `$${distance}\\mathbin{:}(${speeds[0]}-${speeds[1]})$ س؛ حوّلها إلى دقائق.`, `$${distance}\\mathbin{:}(${speeds[0]}-${speeds[1]})$ h; convert it to minutes.`)
                : say('Bata zain dagoen bitartean, bestea bakarrik mugitzen da: kalkulatu lehenik zenbat geratzen den biak abiatzean.', 'Mientras uno espera, solo avanza el otro: calcula primero cuánto queda cuando salen los dos.', 'ما دام أحدهما ينتظر يتحرك الآخر وحده: احسب أولًا ما يبقى عندما ينطلقان معًا.', 'While one is waiting, only the other one moves: first work out how far is left when both have set off.'),
            isSolved: (state) => sameCase(state, wanted) && graphAnswered(state),
            solution: { ...solution, answer: String(meeting.minutes.numerator), checked: true }
        }
    }
})
