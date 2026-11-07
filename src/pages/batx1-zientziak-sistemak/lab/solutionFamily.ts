import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · Soluzioen familia (La familia de soluciones): a consistent
   dependent system of two equations in three unknowns, solved with
   z = λ. The learner moves λ and the solution (x, y, z) moves with it:
   seen from above, on the xy-plane, it slides along a straight line, and
   both equations keep holding. Before the line is drawn the learner
   predicts what y does when λ grows: goes down, stays or goes up. Pure
   logic, whole numbers only.
   ========================================================================== */

/** The two equations (rows a, b, c, d of ax + by + cz = d) and the solution x = x0 + x1·λ, y = y0 + y1·λ, z = λ */
export interface Family {
    rows: [[number, number, number, number], [number, number, number, number]]
    x: [number, number]
    y: [number, number]
}

export const FAMILIES: Family[] = [
    { rows: [[1, 2, -1, 5], [0, 1, 1, 4]], x: [-3, 3], y: [4, -1] },
    { rows: [[1, 1, 1, 4], [1, -1, 1, 2]], x: [3, -1], y: [1, 0] },
    { rows: [[1, -1, 0, 1], [0, 1, -1, 2]], x: [3, 1], y: [2, 1] },
    { rows: [[1, 1, 0, 3], [0, 1, 2, 1]], x: [2, 2], y: [1, -2] }
]

/** The drawing shows x and y from −6 to 6 */
export const FAMILY_BOX = 6

export interface FamilyState {
    family: number
    lambda: number
    prediction: Prediction | null
}

export const initialFamilyState: FamilyState = { family: 0, lambda: 0, prediction: null }

/** The point (x, y, z) of a family at λ */
export function familyPoint(family: number, lambda: number): [number, number, number] {
    const { x, y } = FAMILIES[family]
    return [x[0] + x[1] * lambda, y[0] + y[1] * lambda, lambda]
}

/** The whole values of λ whose point fits the drawing (and −5 ≤ λ ≤ 5) */
export function lambdaRange(family: number): [number, number] {
    const fits = (lambda: number) => familyPoint(family, lambda).slice(0, 2).every((value) => Math.abs(value) <= FAMILY_BOX)
    const values = Array.from({ length: 11 }, (_, index) => index - 5).filter(fits)
    return [values[0], values[values.length - 1]]
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** A new family resets λ and the prediction; moving λ keeps the prediction, which is about the family */
export function setFamily(state: FamilyState, patch: Partial<Omit<FamilyState, 'prediction'>>): FamilyState {
    const family = clamp(patch.family ?? state.family, 0, FAMILIES.length - 1)
    const [min, max] = lambdaRange(family)
    const lambda = clamp(patch.lambda ?? (family === state.family ? state.lambda : 0), min, max)
    return { family, lambda, prediction: family === state.family ? state.prediction : null }
}

/** What y does when λ grows: goes down (<), stays (=) or goes up (>) */
export const familyPrediction = (state: FamilyState): Prediction => compareTo(FAMILIES[state.family].y[1], 0)

/** a + bλ in LaTeX: -3+3\lambda, 4-\lambda, 1 */
export function linearLambda([constant, slope]: [number, number]): string {
    if (slope === 0) return String(constant)
    const size = Math.abs(slope) === 1 ? '' : String(Math.abs(slope))
    if (constant === 0) return `${slope < 0 ? '-' : ''}${size}\\lambda`
    return `${constant}${slope < 0 ? '-' : '+'}${size}\\lambda`
}

/** The general solution in LaTeX: (-3+3\lambda,\ 4-\lambda,\ \lambda) */
export const familyLatex = (family: number) => `(${linearLambda(FAMILIES[family].x)},\\ ${linearLambda(FAMILIES[family].y)},\\ \\lambda)`

/** One equation in LaTeX: x+2y-z=5 */
export function equationLatex([a, b, c, d]: [number, number, number, number]): string {
    const terms = [[a, 'x'], [b, 'y'], [c, 'z']].filter(([value]) => value !== 0) as Array<[number, string]>
    return `${terms.map(([value, name], index) => `${value < 0 ? '-' : index === 0 ? '' : '+'}${Math.abs(value) === 1 ? '' : Math.abs(value)}${name}`).join('')}=${d}`
}

/** One equation as plain text for the drawing: x + 2y − z = 5 */
export const equationText = (row: [number, number, number, number]) => equationLatex(row).replace(/([+=-])/g, ' $1 ').replace(/-/g, '−').replace(/^ − /, '−').trim()

/** The left side of an equation worked out at a point, in LaTeX: 3+2\cdot 2-2=5 */
export function checkLatex(row: [number, number, number, number], point: [number, number, number]): string {
    const parts = row.slice(0, 3).map((value, index) => ({ value, at: point[index] })).filter(({ value }) => value !== 0)
    const written = parts.map(({ value, at }, index) => {
        const number = at < 0 ? `(${at})` : String(at)
        const body = Math.abs(value) === 1 ? number : `${Math.abs(value)}\\cdot ${number}`
        return `${value < 0 ? '-' : index === 0 ? '' : '+'}${body}`
    }).join('')
    return `${written}=${row[3]}`
}

/* ---------- Challenges ---------- */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const at = (state: FamilyState) => familyPoint(state.family, state.lambda)

export const familyChallenges: LabChallenge<FamilyState>[] = [
    { id: 113301, prompt: say('1. sisteman, bilatu $z=3$ duen soluzioa.', 'En el sistema 1, busca la solución con $z=3$.', 'في النظام 1 ابحث عن الحل الذي فيه $z=3$.', 'In system 1, find the solution with $z=3$.'), hint: say('$z=\\lambda$ da.', '$z=\\lambda$.', '$z=\\lambda$.', '$z=\\lambda$.'), isSolved: (state) => state.family === 0 && at(state)[2] === 3 },
    { id: 113302, prompt: say('1. sisteman, bilatu $x=0$ duen soluzioa.', 'En el sistema 1, busca la solución con $x=0$.', 'في النظام 1 ابحث عن الحل الذي فيه $x=0$.', 'In system 1, find the solution with $x=0$.'), hint: same('$-3+3\\lambda=0$'), isSolved: (state) => state.family === 0 && at(state)[0] === 0 },
    { id: 113303, prompt: say('3. sisteman, bilatu $y=0$ duen soluzioa.', 'En el sistema 3, busca la solución con $y=0$.', 'في النظام 3 ابحث عن الحل الذي فيه $y=0$.', 'In system 3, find the solution with $y=0$.'), hint: same('$2+\\lambda=0$'), isSolved: (state) => state.family === 2 && at(state)[1] === 0 },
    { id: 113304, prompt: say('4. sisteman, bilatu $y=-3$ duen soluzioa.', 'En el sistema 4, busca la solución con $y=-3$.', 'في النظام 4 ابحث عن الحل الذي فيه $y=-3$.', 'In system 4, find the solution with $y=-3$.'), hint: same('$1-2\\lambda=-3$'), isSolved: (state) => state.family === 3 && at(state)[1] === -3 },
    { id: 113305, prompt: say('1. sisteman, bilatu $x+y+z=7$ duen soluzioa.', 'En el sistema 1, busca la solución con $x+y+z=7$.', 'في النظام 1 ابحث عن الحل الذي فيه $x+y+z=7$.', 'In system 1, find the solution with $x+y+z=7$.'), hint: say('Batu hiru koordenatuak: $1+3\\lambda$.', 'Suma las tres coordenadas: $1+3\\lambda$.', 'اجمع الإحداثيات الثلاث: $1+3\\lambda$.', 'Add the three coordinates: $1+3\\lambda$.'), isSolved: (state) => state.family === 0 && at(state).reduce((total, value) => total + value, 0) === 7 }
]

function same(value: string): LocalizedText {
    return say(value, value, value, value)
}

/** Endless practice: the solution of one family with a given x, y or z */
const familyMaker: LabChallengeMaker<FamilyState> = (random) => {
    for (;;) {
        const family = randomInt(random, 0, FAMILIES.length - 1)
        const [min, max] = lambdaRange(family)
        const lambda = randomInt(random, min, max)
        const coordinate = pick(random, [0, 1, 2])
        const slope = coordinate === 0 ? FAMILIES[family].x[1] : coordinate === 1 ? FAMILIES[family].y[1] : 1
        // A coordinate that does not move with λ would be true for every solution
        if (slope === 0) continue
        const name = ['x', 'y', 'z'][coordinate]
        const value = familyPoint(family, lambda)[coordinate]
        const number = family + 1
        return {
            prompt: say(`${number}. sisteman, bilatu $${name}=${value}$ duen soluzioa.`, `En el sistema ${number}, busca la solución con $${name}=${value}$.`, `في النظام ${number} ابحث عن الحل الذي فيه $${name}=${value}$.`, `In system ${number}, find the solution with $${name}=${value}$.`),
            hint: say(`Soluzio orokorra $${familyLatex(family)}$ da.`, `La solución general es $${familyLatex(family)}$.`, `الحل العام هو $${familyLatex(family)}$.`, `The general solution is $${familyLatex(family)}$.`),
            isSolved: (state) => state.family === family && familyPoint(state.family, state.lambda)[coordinate] === value,
            solution: setFamily(initialFamilyState, { family, lambda })
        }
    }
}

export const familyExtra = freshFrom(initialFamilyState, familyMaker)
