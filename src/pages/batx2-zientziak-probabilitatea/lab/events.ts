import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from './probability.ts'

/* ==========================================================================
   L1 · Margotu gertaera (Pinta el suceso): two events A and B split the
   sample space into four zones —only A, both, only B and neither—, and
   every event built from A and B with ∪, ∩, the complement and the
   difference is a set of zones. The learner picks an event, says how many
   zones it takes and paints them; the tool names what is painted with
   every expression of the list that gives it, so De Morgan shows itself
   ($\overline{A\cup B}$ and $\overline{A}\cap\overline{B}$ are one zone).
   Pure logic, exported for the games and for 2.º Sociales.
   ========================================================================== */

/** The four zones of a Venn diagram of two events */
export type Zone = 'onlyA' | 'both' | 'onlyB' | 'none'
export const ZONES: Zone[] = ['onlyA', 'both', 'onlyB', 'none']

/** A set of zones as four flags, in the order of ZONES */
export type ZoneSet = [boolean, boolean, boolean, boolean]

export interface EventExpression {
    id: string
    latex: string
    zones: ZoneSet
}

const set = (...zones: Zone[]): ZoneSet => ZONES.map((zone) => zones.includes(zone)) as ZoneSet

/** Every event the tool knows, with its zones; several expressions can give the same zones */
export const EVENT_EXPRESSIONS: EventExpression[] = [
    { id: 'A', latex: 'A', zones: set('onlyA', 'both') },
    { id: 'B', latex: 'B', zones: set('both', 'onlyB') },
    { id: 'notA', latex: '\\overline{A}', zones: set('onlyB', 'none') },
    { id: 'notB', latex: '\\overline{B}', zones: set('onlyA', 'none') },
    { id: 'and', latex: 'A\\cap B', zones: set('both') },
    { id: 'or', latex: 'A\\cup B', zones: set('onlyA', 'both', 'onlyB') },
    { id: 'aMinusB', latex: 'A-B', zones: set('onlyA') },
    { id: 'aNotB', latex: 'A\\cap\\overline{B}', zones: set('onlyA') },
    { id: 'bMinusA', latex: 'B-A', zones: set('onlyB') },
    { id: 'notAB', latex: '\\overline{A}\\cap B', zones: set('onlyB') },
    { id: 'notOr', latex: '\\overline{A\\cup B}', zones: set('none') },
    { id: 'neither', latex: '\\overline{A}\\cap\\overline{B}', zones: set('none') },
    { id: 'notAnd', latex: '\\overline{A\\cap B}', zones: set('onlyA', 'onlyB', 'none') },
    { id: 'notAOrNotB', latex: '\\overline{A}\\cup\\overline{B}', zones: set('onlyA', 'onlyB', 'none') },
    { id: 'notAOrB', latex: '\\overline{A}\\cup B', zones: set('both', 'onlyB', 'none') },
    { id: 'aOrNotB', latex: 'A\\cup\\overline{B}', zones: set('onlyA', 'both', 'none') },
    { id: 'exactlyOne', latex: '(A-B)\\cup(B-A)', zones: set('onlyA', 'onlyB') },
    { id: 'same', latex: '(A\\cap B)\\cup(\\overline{A}\\cap\\overline{B})', zones: set('both', 'none') },
    { id: 'empty', latex: '\\varnothing', zones: set() },
    { id: 'all', latex: 'E', zones: set('onlyA', 'both', 'onlyB', 'none') }
]

/** The events the learner can choose to paint: from one to three zones */
export const PAINT_TARGETS = EVENT_EXPRESSIONS.filter((expression) => {
    const count = expression.zones.filter(Boolean).length
    return count >= 1 && count <= 3
})

export interface PaintState {
    painted: ZoneSet
    /** Index in PAINT_TARGETS of the event to paint */
    target: number
    prediction: Prediction | null
}

export const initialPaintState: PaintState = { painted: [false, false, false, false], target: PAINT_TARGETS.findIndex((item) => item.id === 'notOr'), prediction: null }

export const sameZones = (left: ZoneSet, right: ZoneSet) => left.every((flag, index) => flag === right[index])
export const zoneCount = (zones: ZoneSet) => zones.filter(Boolean).length

export function toggleZone(state: PaintState, zone: Zone): PaintState {
    const index = ZONES.indexOf(zone)
    const painted = state.painted.map((flag, at) => (at === index ? !flag : flag)) as ZoneSet
    return { ...state, painted }
}

export function setPainted(state: PaintState, painted: ZoneSet): PaintState {
    return { ...state, painted: [...painted] as ZoneSet }
}

/** A new event to paint starts with an empty board and a new prediction */
export function setTarget(state: PaintState, target: number): PaintState {
    const next = Math.max(0, Math.min(PAINT_TARGETS.length - 1, Math.round(target)))
    return next === state.target ? state : { painted: [false, false, false, false], target: next, prediction: null }
}

/** How many zones the event takes: one (<), two (=) or three (>) */
export function paintPrediction(state: PaintState): Prediction {
    const count = zoneCount(PAINT_TARGETS[state.target].zones)
    return count === 1 ? '<' : count === 2 ? '=' : '>'
}

/** Every expression of the list that gives the painted zones */
export const namesOf = (zones: ZoneSet) => EVENT_EXPRESSIONS.filter((expression) => sameZones(expression.zones, zones))

export const isPainted = (state: PaintState, id: string) => sameZones(state.painted, EVENT_EXPRESSIONS.find((expression) => expression.id === id)!.zones)

/* ---------- Challenges ---------- */

export const paintChallenges: LabChallenge<PaintState>[] = [
    { id: 128101, prompt: say('Margotu $\\overline{A\\cup B}$: ez $A$ ez $B$.', 'Pinta $\\overline{A\\cup B}$: ni $A$ ni $B$.', 'لوّن $\\overline{A\\cup B}$: لا $A$ ولا $B$.', 'Paint $\\overline{A\\cup B}$: neither $A$ nor $B$.'), hint: say('Bilduraren aurkakoa: bi zirkuluetatik kanpo dagoena.', 'El contrario de la unión: lo que queda fuera de los dos círculos.', 'معاكس الاتحاد: ما يقع خارج الدائرتين.', 'The complement of the union: what lies outside both circles.'), isSolved: (state) => isPainted(state, 'notOr') },
    { id: 128102, prompt: say('Margotu $\\overline{A\\cap B}$.', 'Pinta $\\overline{A\\cap B}$.', 'لوّن $\\overline{A\\cap B}$.', 'Paint $\\overline{A\\cap B}$.'), hint: say('De Morgan: $\\overline{A}\\cup\\overline{B}$, hau da, zona komuna izan ezik dena.', 'De Morgan: $\\overline{A}\\cup\\overline{B}$, es decir, todo menos la zona común.', 'دي مورغان: $\\overline{A}\\cup\\overline{B}$، أي كل شيء إلا المنطقة المشتركة.', 'De Morgan: $\\overline{A}\\cup\\overline{B}$, that is, everything except the common zone.'), isSolved: (state) => isPainted(state, 'notAnd') },
    { id: 128103, prompt: say('Margotu «bietako bat bakarrik»: $(A-B)\\cup(B-A)$.', 'Pinta «exactamente uno de los dos»: $(A-B)\\cup(B-A)$.', 'لوّن «واحد منهما بالضبط»: $(A-B)\\cup(B-A)$.', 'Paint ‘exactly one of the two’: $(A-B)\\cup(B-A)$.'), hint: say('$A$ bakarrik eta $B$ bakarrik: ez zona komuna, ez kanpokoa.', 'Solo $A$ y solo $B$: ni la zona común ni la de fuera.', '$A$ وحده و$B$ وحده: لا المنطقة المشتركة ولا الخارجية.', 'Only $A$ and only $B$: neither the common zone nor the outer one.'), isSolved: (state) => isPainted(state, 'exactlyOne') }
]

/** Endless practice: paint an event of the list (with one to three zones) */
const paintMaker: LabChallengeMaker<PaintState> = (random) => {
    const expression = pick(random, PAINT_TARGETS)
    const solution = setPainted(initialPaintState, expression.zones)
    return {
        prompt: say(`Margotu $${expression.latex}$.`, `Pinta $${expression.latex}$.`, `لوّن $${expression.latex}$.`, `Paint $${expression.latex}$.`),
        hint: say('Zona bakoitzerako, galdetu: hor gertatzen da gertaera?', 'En cada zona, pregúntate: ¿ocurre ahí el suceso?', 'في كل منطقة اسأل نفسك: هل يقع الحدث هناك؟', 'For each zone, ask yourself: does the event happen there?'),
        isSolved: (state) => sameZones(state.painted, expression.zones),
        solution
    }
}

export const paintExtra = freshFrom(initialPaintState, paintMaker)
