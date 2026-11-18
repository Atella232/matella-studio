import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom } from '../../dbh3-segidak/lab/prediction.ts'
import { region } from '../../dbh4-akademikoak-sistemak/systems.ts'
import { vertices, withSigns, type HalfPlane, type Point } from '../lp.ts'

/* ==========================================================================
   L2 · Eraiki eskualdea (Construye la región): up to three constraints
   ax + by ≤ c or ≥ c (with x, y ≥ 0). The learner changes a, b, c and the
   sense and sees the region and its vertices: a triangle, a polygon of
   more sides, a region that does not close, or nothing at all. A
   constraint with a = b = 0 is switched off.
   ========================================================================== */

export interface BuildState {
    constraints: HalfPlane[]
    chosen: number
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export const BUILD_LIMITS = { coefficient: { min: 0, max: 4 }, c: { min: 0, max: 20 } } as const
export const BUILD_SIZE = 10

export const initialBuildState: BuildState = {
    constraints: [{ a: 1, b: 1, c: 6, sense: '≤' }, { a: 1, b: 2, c: 8, sense: '≤' }, { a: 0, b: 0, c: 0, sense: '≤' }],
    chosen: 0
}

const clamp = (value: number, limits: { min: number; max: number }) => Math.min(limits.max, Math.max(limits.min, Math.round(value)))

export const chooseConstraint = (state: BuildState, chosen: number): BuildState => ({ ...state, chosen })

export function setConstraint(state: BuildState, patch: Partial<HalfPlane>): BuildState {
    const constraints = state.constraints.map((h, index) => (index !== state.chosen ? h : {
        ...h,
        ...patch,
        a: patch.a === undefined ? h.a : clamp(patch.a, BUILD_LIMITS.coefficient),
        b: patch.b === undefined ? h.b : clamp(patch.b, BUILD_LIMITS.coefficient),
        c: patch.c === undefined ? h.c : clamp(patch.c, BUILD_LIMITS.c)
    }))
    return { ...state, constraints }
}

/** The constraints that are switched on */
export const activeConstraints = (state: BuildState) => state.constraints.filter((h) => h.a !== 0 || h.b !== 0)
export const buildVertices = (state: BuildState): Point[] => vertices(withSigns(activeConstraints(state)))

export type RegionShape = 'empty' | 'open' | 'closed'

/** Empty, open (it reaches the edge of a very large box) or closed */
export function buildShape(state: BuildState): RegionShape {
    const far = 1000
    const polygon = region({ xMin: -far, xMax: far, yMin: -far, yMax: far }, withSigns(activeConstraints(state)))
    if (polygon.length < 3) return 'empty'
    return polygon.some(([x, y]) => Math.abs(x) > far - 1 || Math.abs(y) > far - 1) ? 'open' : 'closed'
}

const hasVertex = (state: BuildState, [x, y]: Point) => buildVertices(state).some(([px, py]) => Math.abs(px - x) < 1e-9 && Math.abs(py - y) < 1e-9)

/* ---------- Challenges ---------- */

export const buildChallenges: LabChallenge<BuildState>[] = [
    {
        id: 144151,
        prompt: say('Egin eskualde itxi bat, triangelu bat: 3 erpin.', 'Haz una región cerrada que sea un triángulo: 3 vértices.', 'اصنع منطقة مغلقة تكون مثلثًا: 3 رؤوس.', 'Make a closed region that is a triangle: 3 vertices.'),
        hint: say('Itzali murrizketa bat ($a=b=0$), edo egin bat bestea baino zabalagoa.', 'Apaga una restricción ($a=b=0$) o haz que una quede por fuera de la otra.', 'أطفئ قيدًا ($a=b=0$) أو اجعل أحدهما خارج الآخر.', 'Switch a constraint off ($a=b=0$) or make one lie outside the other.'),
        isSolved: (state) => buildShape(state) === 'closed' && buildVertices(state).length === 3
    },
    {
        id: 144152,
        prompt: say('Egin 5 erpineko eskualde itxi bat.', 'Haz una región cerrada de 5 vértices.', 'اصنع منطقة مغلقة لها 5 رؤوس.', 'Make a closed region with 5 vertices.'),
        hint: say('Piztu hirugarren murrizketa, $x\\le 5$ adibidez.', 'Enciende la tercera restricción, por ejemplo $x\\le 5$.', 'شغّل القيد الثالث، مثلًا $x\\le 5$.', 'Switch on the third constraint, for example $x\\le 5$.'),
        isSolved: (state) => buildShape(state) === 'closed' && buildVertices(state).length === 5
    },
    {
        id: 144153,
        prompt: say('Egin eskualde hutsa: ez dago murrizketa guztiak betetzen dituen punturik.', 'Haz una región vacía: ningún punto cumple todas las restricciones.', 'اصنع منطقة خالية: لا توجد نقطة تحقق كل القيود.', 'Make an empty region: no point satisfies every constraint.'),
        hint: say('Jarri bat $\\le$ eta beste bat $\\ge$, zenbaki handiagoarekin.', 'Pon una con $\\le$ y otra con $\\ge$ y un número mayor.', 'ضع قيدًا بـ $\\le$ وآخر بـ $\\ge$ مع عدد أكبر.', 'Put one with $\\le$ and another with $\\ge$ and a larger number.'),
        isSolved: (state) => buildShape(state) === 'empty'
    },
    {
        id: 144154,
        prompt: say('Egin ixten ez den eskualde bat.', 'Haz una región que no se cierre.', 'اصنع منطقة لا تنغلق.', 'Make a region that does not close.'),
        hint: say('$\\ge$ murrizketekin, eskualdea gorantz irekita geratzen da.', 'Con restricciones de $\\ge$ la región queda abierta hacia arriba.', 'مع قيود $\\ge$ تبقى المنطقة مفتوحة إلى الأعلى.', 'With $\\ge$ constraints the region stays open upwards.'),
        isSolved: (state) => buildShape(state) === 'open'
    },
    {
        id: 144155,
        prompt: say('Lortu $(3,2)$ eskualdeko erpin bat izatea.', 'Consigue que $(3,2)$ sea un vértice de la región.', 'اجعل $(3,2)$ رأسًا من رؤوس المنطقة.', 'Make $(3,2)$ a vertex of the region.'),
        hint: say('Bi zuzenek $(3,2)$ puntutik pasatu behar dute: $x+y=5$ eta $x+2y=7$, adibidez.', 'Dos rectas tienen que pasar por $(3,2)$: $x+y=5$ y $x+2y=7$, por ejemplo.', 'يجب أن يمر مستقيمان بـ $(3,2)$: مثلًا $x+y=5$ و$x+2y=7$.', 'Two lines must go through $(3,2)$: $x+y=5$ and $x+2y=7$, for example.'),
        isSolved: (state) => hasVertex(state, [3, 2])
    }
]

/** Endless practice: make a given point a vertex of the region */
const buildMaker: LabChallengeMaker<BuildState> = (random) => {
    const x = randomInt(random, 1, 4)
    const y = randomInt(random, 1, 4)
    const solution: BuildState = { constraints: [{ a: 1, b: 1, c: x + y, sense: '≤' }, { a: 1, b: 2, c: x + 2 * y, sense: '≤' }, { a: 0, b: 0, c: 0, sense: '≤' }], chosen: 0 }
    return {
        prompt: say(`Lortu $(${x},${y})$ eskualdeko erpin bat izatea.`, `Consigue que $(${x},${y})$ sea un vértice de la región.`, `اجعل $(${x},${y})$ رأسًا من رؤوس المنطقة.`, `Make $(${x},${y})$ a vertex of the region.`),
        hint: say('Bi zuzenek puntu horretatik pasatu behar dute.', 'Dos rectas tienen que pasar por ese punto.', 'يجب أن يمر مستقيمان بتلك النقطة.', 'Two lines must go through that point.'),
        isSolved: (state) => hasVertex(state, [x, y]),
        solution
    }
}

export const buildExtra = freshFrom(initialBuildState, buildMaker)
