import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { ELLIPSE_TRIPLES, ratio } from './conicLatex.ts'

/* ==========================================================================
   J3 · Antena (La antena): the rays that reach a parabolic dish parallel
   to its axis bounce off to the focus, and the waves that leave one focus
   of an elliptical mirror reach the other one. Where does the receiver
   go? Level 1 gives the dish as y² = 2px (the focus is p/2 from the
   vertex); level 2, its width and depth (the rim gives p); level 3, an
   elliptical room (the foci are c from the centre). The wrong answers are
   the mistakes of this unit: p for p/2, 2p, the depth, half the width, a
   vertex, the semi-minor axis and the distance from the vertex.
   ========================================================================== */

export const ANTENNA_ROUNDS = 6

export type AntennaError = 'not-half' | 'two-p' | 'depth' | 'rim' | 'vertex' | 'minor' | 'from-vertex' | 'calculation'

export interface AntennaOption {
    latex: string
    error: AntennaError | null
}

export type AntennaShape =
    | { kind: 'parabola'; focus: number; rim: number; depth: number }
    | { kind: 'ellipse'; a: number; b: number; c: number }

export interface AntennaRound {
    prompt: LocalizedText
    options: AntennaOption[]
    working: string
    shape: AntennaShape
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

function options(random: Random, right: string, wrong: Array<[string, AntennaError]>): AntennaOption[] | null {
    const all: AntennaOption[] = [{ latex: right, error: null }, ...wrong.map(([latex, error]) => ({ latex, error }))]
    if (new Set(all.map((option) => option.latex)).size !== all.length) return null
    return shuffle(random, all)
}

/** Level 1: the dish y² = nx; the receiver is n/4 from the vertex */
function fromEquation(random: Random): AntennaRound | null {
    const n = pick(random, [2, 3, 4, 5, 6, 8, 10, 12, 16, 20])
    const choices = options(random, ratio(n, 4), [[ratio(n, 2), 'not-half'], [String(n), 'two-p'], [ratio(n + 4, 4), 'calculation']])
    const rim = 2.4 * (n / 4)
    return choices && {
        prompt: say(`Antena baten profila $y^2=${n}x$ da. Erpinetik zer distantziara jarri behar da hargailua?`, `El perfil de una antena es $y^2=${n}x$. ¿A qué distancia del vértice hay que poner el receptor?`, `مقطع هوائي هو $y^2=${n}x$. على أي بعد من الرأس يوضع المستقبِل؟`, `The profile of a dish is $y^2=${n}x$. How far from the vertex must the receiver go?`),
        options: choices,
        working: `2p=${n}\\ \\to\\ \\frac{p}{2}=${ratio(n, 4)}`,
        shape: { kind: 'parabola', focus: n / 4, rim, depth: (rim * rim) / n }
    }
}

/** Whole dishes (focus f, half width R, depth D) with R² = 4fD, in tens of centimetres */
const DISHES: Array<[number, number, number]> = []
for (let f = 1; f <= 8; f += 1) {
    for (let r = 2; r <= 24; r += 2) {
        const d = (r * r) / (4 * f)
        if (Number.isInteger(d) && d <= 30 && new Set([f, 2 * f, d, r]).size === 4) DISHES.push([f, r, d])
    }
}

/** Level 2: the width and the depth of the dish; the rim (D, R) gives p */
function fromRim(random: Random): AntennaRound | null {
    const [f, r, d] = pick(random, DISHES)
    const [width, depth, focus] = [20 * r, 10 * d, 10 * f]
    const choices = options(random, String(focus), [[String(2 * focus), 'not-half'], [String(depth), 'depth'], [String(10 * r), 'rim']])
    return choices && {
        prompt: say(`Antena paraboliko batek $${width}$ cm-ko zabalera eta $${depth}$ cm-ko sakonera ditu. Erpinetik zenbat zentimetrora doa hargailua?`, `Una antena parabólica mide $${width}$ cm de ancho y $${depth}$ cm de profundidad. ¿A cuántos centímetros del vértice va el receptor?`, `هوائي مقعّر عرضه $${width}$ سم وعمقه $${depth}$ سم. على كم سنتيمترًا من الرأس يوضع المستقبِل؟`, `A satellite dish is $${width}$ cm wide and $${depth}$ cm deep. How many centimetres from the vertex does the receiver go?`),
        options: choices,
        working: `\\begin{gathered}${10 * r}^2=2p\\cdot ${depth}\\\\ \\to\\ p=${2 * focus}\\qquad\\frac{p}{2}=${focus}\\end{gathered}`,
        shape: { kind: 'parabola', focus: f, rim: r, depth: d }
    }
}

/** Level 3: an elliptical room; what is said at one focus is heard at the other, c from the centre */
function fromEllipse(random: Random): AntennaRound | null {
    const [a, b, c] = pick(random, [...ELLIPSE_TRIPLES, [25, 24, 7], [25, 7, 24]] as Array<[number, number, number]>)
    const choices = options(random, String(c), [[String(a), 'vertex'], [String(b), 'minor'], [String(a - c), 'from-vertex']])
    return choices && {
        prompt: say(`Gela batek elipse-forma du, $${a}$ m eta $${b}$ m ardatzerdiekin. Foku batean esaten dena bestean entzuten da. Zentrotik zenbat metrora dago foku bakoitza?`, `Una sala tiene forma de elipse de semiejes $${a}$ m y $${b}$ m. Lo que se dice en un foco se oye en el otro. ¿A cuántos metros del centro está cada foco?`, `قاعة على شكل قطع ناقص نصفا محوريه $${a}$ م و$${b}$ م. ما يُقال في بؤرة يُسمع في الأخرى. على كم مترًا من المركز تقع كل بؤرة؟`, `A room has the shape of an ellipse with semi-axes $${a}$ m and $${b}$ m. What is said at one focus is heard at the other. How many metres from the centre is each focus?`),
        options: choices,
        working: `c=\\sqrt{${a * a}-${b * b}}=${c}`,
        shape: { kind: 'ellipse', a, b, c }
    }
}

const makers = [fromEquation, fromRim, fromEllipse]

/** Six rounds of one level, no question twice */
export function createAntennaRounds(random: Random, level: number): AntennaRound[] {
    const make = makers[level] ?? fromEquation
    const rounds: AntennaRound[] = []
    for (let attempt = 0; rounds.length < ANTENNA_ROUNDS && attempt < 2000; attempt += 1) {
        const round = make(random)
        if (round && !rounds.some((other) => other.prompt.es === round.prompt.es)) rounds.push(round)
    }
    return rounds
}

export const rightAntennaOption = (round: AntennaRound) => round.options.find((option) => option.error === null)!
