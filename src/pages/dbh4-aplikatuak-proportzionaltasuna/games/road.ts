import { fraction } from '../../../features/unit-v2/math/fraction.ts'
import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { durationText, hoursLatex } from './numbers.ts'

/* ==========================================================================
   Errepideko topaketa (Encuentro en la carretera, 4. DBH aplikatuak): two
   vehicles on a road; the player plants a flag where they think they will
   meet, then watches the trip. The closer the flag, the more points, and
   the working is shown after each trip. Level 1: towards each other;
   level 2: a chase; level 3: one of them sets off later. A always starts
   at km 0 and goes to the right. Every meeting point is a whole km, so a
   careful calculation can hit it exactly.
   ========================================================================== */

export type RoadKind = 'meet' | 'chase' | 'late-meet' | 'late-chase'

export const roadLevels: RoadKind[][] = [['meet'], ['chase'], ['late-meet', 'late-chase']]

export const ROAD_ROUNDS = 6

export interface RoadRound {
    kind: RoadKind
    /** km from A's start to B's start: the gap in a chase, 0 when both leave the same town */
    distance: number
    /** km/h of A and of B */
    speeds: [number, number]
    /** Minutes the late vehicle waits: B when they come towards each other, A in a chase */
    delay: number
    /** Minutes from the first departure to the meeting */
    minutes: number
    /** km from A's start to the meeting point, a whole number */
    meeting: number
    /** Length of the road drawn, in km */
    road: number
}

export interface RoadStep {
    label: LocalizedText
    latex: string
}

const SPEEDS = [40, 50, 60, 70, 80, 90, 100, 110, 120] as const
/** Minutes of the trip (after the late departure, if any) */
const TRIP_MINUTES = [30, 36, 40, 45, 48, 50, 60, 72, 75, 80, 90, 96, 100, 105, 120, 135, 144, 150, 160, 180] as const
const DELAYS = [15, 20, 30, 45, 60, 90] as const

const whole = (value: number) => Math.abs(value - Math.round(value)) < 1e-9
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export const isTowards = (kind: RoadKind) => kind === 'meet' || kind === 'late-meet'

/** The road goes on past a chase's meeting point, by a random stretch, so that its end gives nothing away */
function roadAfter(random: Random, meeting: number) {
    const raw = meeting * (1.1 + random() * 0.9)
    const step = raw > 200 ? 50 : raw > 80 ? 20 : 10
    return Math.ceil(raw / step) * step
}

function draft(random: Random, kind: RoadKind): RoadRound | null {
    const a = pick(random, SPEEDS)
    const b = pick(random, SPEEDS)
    const trip = pick(random, TRIP_MINUTES)
    const delay = kind === 'late-meet' || kind === 'late-chase' ? pick(random, DELAYS) : 0
    if (isTowards(kind)) {
        if (a === b) return null
        // A drives alone while B waits, then they close the gap together
        const head = (a * delay) / 60
        const distance = head + ((a + b) * trip) / 60
        const meeting = head + (a * trip) / 60
        if (!whole(head) || !whole(meeting) || !whole(distance) || distance % 5 !== 0 || distance < 60 || distance > 400) return null
        return { kind, distance, speeds: [a, b], delay, minutes: delay + trip, meeting, road: distance }
    }
    // A, behind, has to be faster
    if (a <= b) return null
    if (kind === 'chase') {
        const distance = ((a - b) * trip) / 60
        const meeting = (a * trip) / 60
        if (!whole(distance) || !whole(meeting) || distance % 5 !== 0 || distance < 10 || meeting < 40 || meeting > 400) return null
        return { kind, distance, speeds: [a, b], delay: 0, minutes: trip, meeting, road: roadAfter(random, meeting) }
    }
    // late-chase: B leaves the town first; A leaves the same town later and catches it up
    const head = (b * delay) / 60
    const chase = (60 * head) / (a - b)
    const meeting = (a * chase) / 60
    if (!whole(head) || !whole(chase) || !whole(meeting) || meeting < 40 || meeting > 400) return null
    return { kind, distance: 0, speeds: [a, b], delay, minutes: delay + chase, meeting, road: roadAfter(random, meeting) }
}

export function createRoadRound(random: Random, kind: RoadKind, avoid: RoadRound[] = []): RoadRound {
    for (let attempt = 0; attempt < 20000; attempt += 1) {
        const round = draft(random, kind)
        if (round && !avoid.some((other) => other.distance === round.distance && other.speeds.join() === round.speeds.join())) return round
    }
    throw new Error(`No road round for ${kind}`)
}

export function createRoadRounds(random: Random, level: number): RoadRound[] {
    const kinds = roadLevels[level]
    const rounds: RoadRound[] = []
    for (const kind of shuffle(random, Array.from({ length: ROAD_ROUNDS }, (_, index) => kinds[index % kinds.length]))) {
        rounds.push(createRoadRound(random, kind, rounds))
    }
    return rounds
}

/** km from A's start to A and to B after the given minutes; a late vehicle waits at its start */
export function roadPositions(round: RoadRound, minutes: number): [number, number] {
    const [a, b] = round.speeds
    const driving = (start: number) => Math.max(0, minutes - start) / 60
    const aKm = a * driving(round.kind === 'late-chase' ? round.delay : 0)
    const bTravel = b * driving(round.kind === 'late-meet' ? round.delay : 0)
    return [aKm, isTowards(round.kind) ? round.distance - bTravel : round.distance + bTravel]
}

/* ---------- Points ---------- */

export type RoadGrade = 'bullseye' | 'close' | 'near' | 'far'

export interface RoadThrow {
    points: number
    grade: RoadGrade
}

/** Within 1 % of the road: 100 points; then fewer and fewer, none from 15 % of the road */
export function scoreFlag(flag: number, round: RoadRound): RoadThrow {
    const share = Math.abs(flag - round.meeting) / round.road
    const points = share <= 0.01 ? 100 : Math.max(0, Math.round(100 * (1 - (share - 0.01) / 0.14)))
    const grade: RoadGrade = share <= 0.01 ? 'bullseye' : share <= 0.03 ? 'close' : share <= 0.07 ? 'near' : 'far'
    return { points, grade }
}

export function roadStars(total: number): Stars {
    if (total >= 510) return 3
    if (total >= 390) return 2
    if (total >= 240) return 1
    return 0
}

/* ---------- Texts ---------- */

/** The problem, as a short text; the speeds and distances are also on the drawing */
export function roadProblem(round: RoadRound): LocalizedText {
    const [a, b] = round.speeds
    const speeds = say(`Abiadurak: A, ${a} km/h; B, ${b} km/h.`, `A va a ${a} km/h y B a ${b} km/h.`, `سرعة أ ${a} كم/س وسرعة ب ${b} كم/س.`, `A goes at ${a} km/h and B at ${b} km/h.`)
    const join = (first: LocalizedText, last: LocalizedText) => say(`${first.eu} ${speeds.eu}${last.eu}`, `${first.es} ${speeds.es}${last.es}`, `${first.ar} ${speeds.ar}${last.ar}`, `${first.en} ${speeds.en}${last.en}`)
    switch (round.kind) {
        case 'meet':
            return join(
                say('A eta B elkarrengana abiatzen dira, aldi berean.', 'A y B salen a la vez, uno hacia el otro.', 'تنطلق أ وب في اللحظة نفسها، كلٌّ نحو الأخرى.', 'A and B set off at the same time, towards each other.'),
                say(` Bien arteko distantzia: ${round.distance} km.`, ` Los separan ${round.distance} km.`, ` والمسافة بينهما ${round.distance} كم.`, ` They are ${round.distance} km apart.`)
            )
        case 'chase':
            return join(
                say('B aurretik doa eta A atzetik; biak norabide berean abiatzen dira, aldi berean.', 'B va delante y A lo persigue; salen a la vez y en el mismo sentido.', 'ب في المقدمة وأ تلاحقها؛ تنطلقان في اللحظة نفسها وفي الاتجاه نفسه.', 'B is ahead and A is chasing it; they set off at the same time and in the same direction.'),
                say(` Abiatzean, bien arteko distantzia: ${round.distance} km.`, ` Al salir, B le lleva ${round.distance} km.`, ` وعند الانطلاق تتقدم ب بمسافة ${round.distance} كم.`, ` When they set off, B is already ${round.distance} km ahead.`)
            )
        case 'late-meet':
            return join(
                say(`A eta B elkarrengana doaz, baina B geroago abiatzen da: ${round.delay} minutu geroago.`, `A y B van uno hacia el otro, pero B sale ${round.delay} min más tarde.`, `تسير أ وب كلٌّ نحو الأخرى، لكن ب تنطلق بعد ${round.delay} دقيقة.`, `A and B are going towards each other, but B sets off ${round.delay} min later.`),
                say(` Bien arteko distantzia: ${round.distance} km.`, ` Los separan ${round.distance} km.`, ` والمسافة بينهما ${round.distance} كم.`, ` They are ${round.distance} km apart.`)
            )
        case 'late-chase':
            return join(
                say(`B herritik irteten da. A herri beretik irteten da, ${round.delay} minutu geroago, eta B-ren atzetik doa.`, `B sale del pueblo. A sale del mismo pueblo ${round.delay} min más tarde y lo persigue.`, `تنطلق ب من البلدة. ثم تنطلق أ من البلدة نفسها بعد ${round.delay} دقيقة وتلاحقها.`, `B sets off from the village. A sets off from the same village ${round.delay} min later and chases B.`),
                say('', '', '', '')
            )
    }
}

/** The working, three lines: what changes each hour, the time and the place */
export function roadSteps(round: RoadRound): RoadStep[] {
    const [a, b] = round.speeds
    const late = round.kind === 'late-meet' || round.kind === 'late-chase'
    const trip = round.minutes - round.delay
    const hours = hoursLatex(fraction(trip, 60))
    const wait = hoursLatex(fraction(round.delay, 60))
    const place = say('A-ren irteeratik (km)', 'Desde la salida de A (km)', 'من نقطة انطلاق أ (كم)', 'From A\'s starting point (km)')
    if (!late) {
        const towards = round.kind === 'meet'
        const closing = towards ? a + b : a - b
        return [
            towards
                ? { label: say('Orduko hurbiltzen dira (km)', 'Se acercan cada hora (km)', 'تقتربان كل ساعة (كم)', 'Closing in each hour (km)'), latex: `${a}+${b}=${closing}` }
                : { label: say('Orduko murrizten du tartea (km)', 'Cada hora recorta (km)', 'تقلّص المسافة كل ساعة (كم)', 'Gap closed each hour (km)'), latex: `${a}-${b}=${closing}` },
            { label: say('Elkartu arteko denbora (h)', 'Tiempo hasta el encuentro (h)', 'الزمن حتى اللقاء (س)', 'Time until they meet (h)'), latex: `${round.distance}\\mathbin{:}${closing}=${hours}` },
            { label: place, latex: `${a}\\cdot ${hours}=${round.meeting}` }
        ]
    }
    if (round.kind === 'late-meet') {
        const head = (a * round.delay) / 60
        return [
            { label: say('A bakarrik, B abiatu arte (km)', 'A sola, hasta que sale B (km)', 'أ وحدها حتى تنطلق ب (كم)', 'A alone, until B sets off (km)'), latex: `${a}\\cdot ${wait}=${head}` },
            { label: say('B abiatu eta elkartu arte (h)', 'Desde que sale B hasta el encuentro (h)', 'من انطلاق ب حتى اللقاء (س)', 'From when B sets off until they meet (h)'), latex: `(${round.distance}-${head})\\mathbin{:}(${a}+${b})=${hours}` },
            { label: place, latex: `${head}+${a}\\cdot ${hours}=${round.meeting}` }
        ]
    }
    const head = (b * round.delay) / 60
    return [
        { label: say('B aurretik, A abiatzean (km)', 'Ventaja de B cuando sale A (km)', 'تقدّم ب عند انطلاق أ (كم)', 'B\'s lead when A sets off (km)'), latex: `${b}\\cdot ${wait}=${head}` },
        { label: say('A abiatu eta harrapatu arte (h)', 'Desde que sale A hasta que la alcanza (h)', 'من انطلاق أ حتى اللحاق (س)', 'From when A sets off until it catches up (h)'), latex: `${head}\\mathbin{:}(${a}-${b})=${hours}` },
        { label: place, latex: `${a}\\cdot ${hours}=${round.meeting}` }
    ]
}

/** When and where they meet, in words */
export function roadAnswer(round: RoadRound): LocalizedText {
    return say(
        `Elkartzeko: ${durationText(round.minutes, 'eu')}. Lekua: A-ren irteeratik ${round.meeting} km.`,
        `Se encuentran al cabo de ${durationText(round.minutes, 'es')}, a ${round.meeting} km de la salida de A.`,
        `تلتقيان بعد ${durationText(round.minutes, 'ar')}، على بعد ${round.meeting} كم من نقطة انطلاق أ.`, `They meet after ${durationText(round.minutes, 'en')}, ${round.meeting} km from A's starting point.`
    )
}

export const roadGradeTexts: Record<RoadGrade, LocalizedText> = {
    bullseye: say('Itua! Justu han elkartu dira.', '¡Diana! Se encuentran justo ahí.', 'إصابة! التقتا هناك تمامًا.', 'Bullseye! They meet right there.'),
    close: say('Oso gertu!', '¡Muy cerca!', 'قريب جدًا!', 'Very close!'),
    near: say('Gertu.', 'Cerca.', 'قريب.', 'Close.'),
    far: say('Urrun geratu zara.', 'Te has quedado lejos.', 'كنت بعيدًا.', 'You’re far off.')
}
