import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { hundredthsLatex, say } from './probability.ts'

/* ==========================================================================
   L2 · Lau zonak (Las cuatro zonas): P(A), P(B) and P(A∩B) set the four
   zones of the Venn diagram —only A, both, only B and neither—, which add
   up to 1 and are drawn as a bar of 100 %. Before the numbers are shown,
   the learner says whether P(A∪B) is less than, equal to or more than
   P(A)+P(B) (it is equal only when the events are mutually exclusive).
   Everything in hundredths, in steps of 0,05, so every value is exact.
   The endless challenges give three data, as the entrance exam does
   (P(A∪B), a complement or a difference), and ask for the diagram.
   Pure logic.
   ========================================================================== */

export interface ZonesState {
    /** P(A), P(B) and P(A∩B), in hundredths */
    a: number
    b: number
    both: number
    prediction: Prediction | null
}

export const ZONES_STEP = 5
export const initialZonesState: ZonesState = { a: 50, b: 40, both: 20, prediction: null }

const snap = (value: number) => Math.max(0, Math.min(100, Math.round(value / ZONES_STEP) * ZONES_STEP))

/**
 * Changes one probability and keeps the diagram possible: the intersection fits in both events and
 * the union does not pass 1. A change that the others cannot follow is cut back.
 */
export function setZones(state: ZonesState, patch: Partial<Pick<ZonesState, 'a' | 'b' | 'both'>>): ZonesState {
    let a = snap(patch.a ?? state.a)
    let b = snap(patch.b ?? state.b)
    let both = snap(patch.both ?? state.both)
    if (patch.both !== undefined) {
        both = Math.min(both, a, b)
        both = Math.max(both, a + b - 100)
    } else {
        if (patch.a !== undefined) a = Math.min(a, 100 - b + both)
        if (patch.b !== undefined) b = Math.min(b, 100 - a + both)
        both = Math.min(both, a, b)
    }
    const same = a === state.a && b === state.b && both === state.both
    return { a, b, both, prediction: same ? state.prediction : null }
}

/** The four zones in hundredths: only A, both, only B, neither */
export const zonesOf = (state: Pick<ZonesState, 'a' | 'b' | 'both'>): [number, number, number, number] => [state.a - state.both, state.both, state.b - state.both, 100 - state.a - state.b + state.both]
export const unionOf = (state: Pick<ZonesState, 'a' | 'b' | 'both'>) => state.a + state.b - state.both

/** P(A∪B) compared with P(A)+P(B): less (<), equal (=) when mutually exclusive */
export const zonesPrediction = (state: ZonesState): Prediction => (state.both === 0 ? '=' : '<')

const h = hundredthsLatex

/* ---------- Challenges ---------- */

export const zonesChallenges: LabChallenge<ZonesState>[] = [
    { id: 128121, prompt: say('Egin $P(A\\cup B)=P(A)+P(B)$ izatea, $P(A)=0{,}3$ izanik.', 'Haz que $P(A\\cup B)=P(A)+P(B)$, con $P(A)=0{,}3$.', 'اجعل $P(A\\cup B)=P(A)+P(B)$ مع $P(A)=0{,}3$.', 'Make $P(A\\cup B)=P(A)+P(B)$, with $P(A)=0{,}3$.'), hint: say('Ebakidurak 0 izan behar du: gertaera bateraezinak.', 'La intersección tiene que valer 0: sucesos incompatibles.', 'يجب أن يساوي التقاطع 0: حدثان متنافيان.', 'The intersection has to be 0: mutually exclusive events.'), isSolved: (state) => state.a === 30 && state.both === 0 },
    { id: 128122, prompt: say('Egin $P(\\overline{A}\\cap\\overline{B})=0{,}2$ eta $P(A\\cap B)=0{,}1$ izatea.', 'Haz que $P(\\overline{A}\\cap\\overline{B})=0{,}2$ y $P(A\\cap B)=0{,}1$.', 'اجعل $P(\\overline{A}\\cap\\overline{B})=0{,}2$ و$P(A\\cap B)=0{,}1$.', 'Make $P(\\overline{A}\\cap\\overline{B})=0{,}2$ and $P(A\\cap B)=0{,}1$.'), hint: say('Kanpoko zona 0,2 bada, bildura 0,8 da: $P(A)+P(B)=0{,}9$.', 'Si la zona de fuera vale 0,2, la unión vale 0,8: $P(A)+P(B)=0{,}9$.', 'إذا كانت المنطقة الخارجية 0.2 فالاتحاد 0.8: $P(A)+P(B)=0{,}9$.', 'If the outer zone is 0.2, the union is 0.8: $P(A)+P(B)=0{,}9$.'), isSolved: (state) => zonesOf(state)[3] === 20 && state.both === 10 },
    { id: 128123, prompt: say('Egin $P(\\overline{A}\\cup\\overline{B})=0{,}85$ eta $P(A-B)=0{,}25$ izatea.', 'Haz que $P(\\overline{A}\\cup\\overline{B})=0{,}85$ y $P(A-B)=0{,}25$.', 'اجعل $P(\\overline{A}\\cup\\overline{B})=0{,}85$ و$P(A-B)=0{,}25$.', 'Make $P(\\overline{A}\\cup\\overline{B})=0{,}85$ and $P(A-B)=0{,}25$.'), hint: say('De Morgan: $P(A\\cap B)=1-0{,}85$; gero, $P(A)=0{,}25+P(A\\cap B)$.', 'De Morgan: $P(A\\cap B)=1-0{,}85$; después, $P(A)=0{,}25+P(A\\cap B)$.', 'دي مورغان: $P(A\\cap B)=1-0{,}85$، ثم $P(A)=0{,}25+P(A\\cap B)$.', 'De Morgan: $P(A\\cap B)=1-0{,}85$; then $P(A)=0{,}25+P(A\\cap B)$.'), isSolved: (state) => state.both === 15 && state.a === 40 }
]

type Datum = 'union' | 'notBoth' | 'neither' | 'aMinusB' | 'both'

/** The text of a datum and whether the state has it */
function datum(kind: Datum, value: number): { latex: string; holds: (state: ZonesState) => boolean } {
    switch (kind) {
        case 'union': return { latex: `P(A\\cup B)=${h(value)}`, holds: (state) => unionOf(state) === value }
        case 'notBoth': return { latex: `P(\\overline{A}\\cup\\overline{B})=${h(value)}`, holds: (state) => 100 - state.both === value }
        case 'neither': return { latex: `P(\\overline{A}\\cap\\overline{B})=${h(value)}`, holds: (state) => zonesOf(state)[3] === value }
        case 'aMinusB': return { latex: `P(A-B)=${h(value)}`, holds: (state) => state.a - state.both === value }
        case 'both': return { latex: `P(A\\cap B)=${h(value)}`, holds: (state) => state.both === value }
    }
}

/** Endless practice: three data in the style of the entrance exam; the diagram they fix is the only solution */
const zonesMaker: LabChallengeMaker<ZonesState> = (random) => {
    for (;;) {
        const a = 5 * randomInt(random, 2, 14)
        const b = 5 * randomInt(random, 2, 14)
        const both = 5 * randomInt(random, 0, Math.min(a, b) / 5)
        if (a + b - both > 100 || both === Math.min(a, b)) continue
        const solution: ZonesState = { a, b, both, prediction: null }
        const kind = pick<Datum>(random, ['union', 'notBoth', 'neither', 'aMinusB'])
        const value = kind === 'union' ? unionOf(solution) : kind === 'notBoth' ? 100 - both : kind === 'neither' ? zonesOf(solution)[3] : a - both
        const third = datum(kind, value)
        const given = kind === 'aMinusB' ? `P(B)=${h(b)}` : `P(A)=${h(a)}`
        const second = kind === 'aMinusB' ? datum('both', both) : { latex: `P(B)=${h(b)}`, holds: (state: ZonesState) => state.b === b }
        const first = kind === 'aMinusB' ? { latex: given, holds: (state: ZonesState) => state.b === b } : { latex: given, holds: (state: ZonesState) => state.a === a }
        return {
            prompt: say(`Egin diagrama, $${first.latex}$, $${second.latex}$ eta $${third.latex}$ izanik.`, `Construye el diagrama con $${first.latex}$, $${second.latex}$ y $${third.latex}$.`, `ابنِ المخطط مع $${first.latex}$ و$${second.latex}$ و$${third.latex}$.`, `Build the diagram with $${first.latex}$, $${second.latex}$ and $${third.latex}$.`),
            hint: say('Lehenik ebakidura; gero $A$ bakarrik eta $B$ bakarrik; 1 arte falta dena kanpoan dago.', 'Primero la intersección; después solo $A$ y solo $B$; lo que falta hasta 1 queda fuera.', 'أولًا التقاطع، ثم $A$ وحده و$B$ وحده، وما ينقص حتى 1 يبقى خارجًا.', 'First the intersection; then only $A$ and only $B$; what is missing up to 1 lies outside.'),
            isSolved: (state) => first.holds(state) && second.holds(state) && third.holds(state),
            solution
        }
    }
}

export const zonesExtra = freshFrom(initialZonesState, zonesMaker)
