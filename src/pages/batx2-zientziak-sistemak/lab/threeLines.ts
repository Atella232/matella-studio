import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { classify, cramer, type SystemKind } from '../system.ts'

/* ==========================================================================
   L4 · Hiru zuzen (Tres rectas): three equations ax + by = c, three lines
   of the plane. The learner picks a line and changes a, b and c, and
   predicts how many points the three lines share (none, one, infinitely
   many) before the ranks of A and A* and the picture say it. One point:
   rg(A) = rg(A*) = 2. A triangle or parallel lines: rg(A*) is larger.
   ========================================================================== */

export type Line = [number, number, number]

export interface LinesState {
    lines: Line[]
    selected: number
    prediction: Prediction | null
}

export const COEFFICIENT_LIMITS = { min: -3, max: 3 } as const
export const CONSTANT_LIMITS = { min: -6, max: 6 } as const
export const initialLinesState: LinesState = { lines: [[1, 1, 3], [1, -1, 1], [2, 1, 4]], selected: 2, prediction: null }

export const linesClassification = (state: Pick<LinesState, 'lines'>) => classify(state.lines.map(([a, b]) => [a, b]), state.lines.map(([, , c]) => c))
export const linesKind = (state: Pick<LinesState, 'lines'>) => linesClassification(state).kind
/** None, one, infinitely many common points: below, equal, above */
const COUNT: Record<SystemKind, Prediction> = { inconsistent: '<', determined: '=', indeterminate: '>' }
export const linesPrediction = (state: LinesState): Prediction => COUNT[linesKind(state)]

/** The common point when there is exactly one */
export function commonPoint(state: Pick<LinesState, 'lines'>): [number, number] | null {
    if (linesKind(state) !== 'determined') return null
    const [i, j] = [[0, 1], [0, 2], [1, 2]].find(([p, q]) => state.lines[p][0] * state.lines[q][1] - state.lines[p][1] * state.lines[q][0] !== 0)!
    const solution = cramer([state.lines[i].slice(0, 2), state.lines[j].slice(0, 2)], [state.lines[i][2], state.lines[j][2]])!
    return [solution[0].numerator / solution[0].denominator, solution[1].numerator / solution[1].denominator]
}

export const isLine = ([a, b]: Line) => a !== 0 || b !== 0
export const parallel = (p: Line, q: Line) => p[0] * q[1] === p[1] * q[0]
/** The same line: (a, b, c) proportional */
export const sameLine = (p: Line, q: Line) => parallel(p, q) && p[0] * q[2] === p[2] * q[0] && p[1] * q[2] === p[2] * q[1]

export const chooseLine = (state: LinesState, selected: number): LinesState => (selected === state.selected ? state : { ...state, selected })
export function setCoefficient(state: LinesState, index: 0 | 1 | 2, value: number): LinesState {
    const limits = index === 2 ? CONSTANT_LIMITS : COEFFICIENT_LIMITS
    const next = Math.min(limits.max, Math.max(limits.min, Math.round(value)))
    if (next === state.lines[state.selected][index]) return state
    const lines = state.lines.map((line, i) => (i === state.selected ? (line.map((item, k) => (k === index ? next : item)) as Line) : line))
    return { ...state, lines, prediction: null }
}

/* ---------- Challenges ---------- */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const allLines = (state: LinesState) => state.lines.every(isLine)

export const linesChallenges: LabChallenge<LinesState>[] = [
    { id: 118151, prompt: say('Egin hiru zuzenak puntu beretik pasatzea.', 'Haz que las tres rectas pasen por un mismo punto.', 'اجعل المستقيمات الثلاثة تمر بنقطة واحدة.', 'Make the three lines pass through one point.'), hint: say('Lehen biak $(2,1)$ puntuan ebakitzen dira: aldatu hirugarrenaren $c$.', 'Las dos primeras se cortan en $(2,1)$: cambia la $c$ de la tercera.', 'الأوليان تتقاطعان في $(2,1)$: غيّر $c$ في الثالث.', 'The first two meet at $(2,1)$: change the $c$ of the third.'), isSolved: (state) => allLines(state) && linesKind(state) === 'determined' },
    { id: 118152, prompt: say('Egin hirugarren zuzena lehenaren paraleloa, baina ez zuzen bera.', 'Haz que la tercera recta sea paralela a la primera, pero no la misma.', 'اجعل المستقيم الثالث موازيًا للأول دون أن يكون نفسه.', 'Make the third line parallel to the first, but not the same line.'), hint: say('$a$ eta $b$ proportzionalak; $c$, ez.', '$a$ y $b$ proporcionales; $c$, no.', '$a$ و$b$ متناسبان، و$c$ لا.', '$a$ and $b$ proportional; $c$, not.'), isSolved: (state) => isLine(state.lines[2]) && parallel(state.lines[0], state.lines[2]) && !sameLine(state.lines[0], state.lines[2]) },
    { id: 118153, prompt: say('Egin hiru zuzenak jatorritik pasatzea.', 'Haz que las tres rectas pasen por el origen.', 'اجعل المستقيمات الثلاثة تمر بالأصل.', 'Make the three lines pass through the origin.'), hint: say('Sistema homogeneo bat: $c=0$ hiruretan.', 'Un sistema homogéneo: $c=0$ en las tres.', 'نظام متجانس: $c=0$ في الثلاثة.', 'A homogeneous system: $c=0$ in all three.'), isSolved: (state) => allLines(state) && state.lines.every(([, , c]) => c === 0) },
    { id: 118154, prompt: say('Egin bi zuzen bat etortzea, eta hirugarrenak ebakitzea: soluzio bakarra.', 'Haz que dos rectas coincidan y que la tercera las corte: una sola solución.', 'اجعل مستقيمين منطبقين والثالث يقطعهما: حل واحد.', 'Make two lines coincide and the third cross them: one solution.'), hint: say('Zuzen berak: $(a,b,c)$ proportzionalak.', 'La misma recta: $(a,b,c)$ proporcionales.', 'المستقيم نفسه: $(a,b,c)$ متناسبة.', 'The same line: $(a,b,c)$ proportional.'), isSolved: (state) => allLines(state) && linesKind(state) === 'determined' && [[0, 1], [0, 2], [1, 2]].some(([p, q]) => sameLine(state.lines[p], state.lines[q])) },
    { id: 118155, prompt: say('Lortu $\\operatorname{rg}(A)=1$: hiru zuzenak paraleloak edo bat eginda.', 'Consigue $\\operatorname{rg}(A)=1$: las tres rectas paralelas o coincidentes.', 'احصل على $\\operatorname{rg}(A)=1$: المستقيمات الثلاثة متوازية أو منطبقة.', 'Get $\\operatorname{rg}(A)=1$: the three lines parallel or coinciding.'), hint: say('$(a,b)$ proportzionalak hiru zuzenetan.', '$(a,b)$ proporcionales en las tres rectas.', '$(a,b)$ متناسبة في المستقيمات الثلاثة.', '$(a,b)$ proportional in all three lines.'), isSolved: (state) => allLines(state) && linesClassification(state).rankA === 1 }
]

/** Endless practice: three lines through a given point, the third line changed */
const linesMaker: LabChallengeMaker<LinesState> = (random) => {
    for (;;) {
        const point: [number, number] = [randomInt(random, -2, 2), randomInt(random, -2, 2)]
        const third = pick(random, [[2, 1], [1, 2], [1, -2], [3, 1], [1, 3], [2, -1]] as Array<[number, number]>)
        const lines: Line[] = [[1, 1, point[0] + point[1]], [1, -1, point[0] - point[1]], [third[0], third[1], third[0] * point[0] + third[1] * point[1]]]
        if (lines.some(([, , c]) => c < CONSTANT_LIMITS.min || c > CONSTANT_LIMITS.max)) continue
        const where = `(${point[0]},${point[1]})`
        return {
            prompt: say(`Egin hiru zuzenak $${where}$ puntutik pasatzea.`, `Haz que las tres rectas pasen por $${where}$.`, `اجعل المستقيمات الثلاثة تمر بـ $${where}$.`, `Make the three lines pass through $${where}$.`),
            hint: say('Puntu batetik pasatzeko: $c=ap+bq$, $(p,q)$ puntua izanik.', 'Para pasar por un punto: $c=ap+bq$, con $(p,q)$ el punto.', 'لكي يمر بنقطة: $c=ap+bq$، حيث $(p,q)$ النقطة.', 'To pass through a point: $c=ap+bq$, with $(p,q)$ the point.'),
            isSolved: (state) => {
                const shared = commonPoint(state)
                return shared !== null && shared[0] === point[0] && shared[1] === point[1]
            },
            solution: { lines, selected: 2, prediction: null }
        }
    }
}

export const linesExtra = freshFrom(initialLinesState, linesMaker)
