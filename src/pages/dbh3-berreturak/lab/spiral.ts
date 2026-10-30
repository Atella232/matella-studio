import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   L4 · Espiral de raíces: right triangles with legs √k and 1 add up to a
   spiral whose hypotenuses measure √2, √3, √4… The learner chooses how far
   it goes (the radicand n) and brings the last hypotenuse to the number
   line with the compass. Pure state logic.
   ========================================================================== */

export const SPIRAL_LIMITS = { min: 2, max: 17 } as const

export interface SpiralState {
    /** Radicand reached: the last hypotenuse measures √n */
    n: number
}

export const initialSpiralState: SpiralState = { n: 2 }

export const setSpiral = (n: number): SpiralState => ({ n: Math.min(SPIRAL_LIMITS.max, Math.max(SPIRAL_LIMITS.min, Math.round(n))) })

export const spiralRoot = (state: SpiralState) => Math.sqrt(state.n)
export const spiralExact = (state: SpiralState) => Number.isInteger(spiralRoot(state))

export interface SpiralPoint {
    k: number
    x: number
    y: number
}

/**
 * Vertices P₁ … Pₙ of the spiral: P₁ = (1, 0) and Pₖ is at distance √k from
 * the origin, so the segment OPₖ is the hypotenuse of the k-th triangle. The
 * leg between Pₖ and Pₖ₊₁ measures 1 and is perpendicular to OPₖ.
 */
export function spiralPoints(n: number): SpiralPoint[] {
    const points: SpiralPoint[] = [{ k: 1, x: 1, y: 0 }]
    let angle = 0
    for (let k = 2; k <= n; k += 1) {
        angle += Math.atan(1 / Math.sqrt(k - 1))
        const radius = Math.sqrt(k)
        points.push({ k, x: radius * Math.cos(angle), y: radius * Math.sin(angle) })
    }
    return points
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const spiralChallenges: LabChallenge<SpiralState>[] = [
    { id: 36401, prompt: say('Eraiki $\\sqrt{5}$.', 'Construye $\\sqrt{5}$.', 'أنشئ $\\sqrt{5}$.', 'Construct $\\sqrt{5}$.'), hint: say('Azken hipotenusak $\\sqrt{5}$ neurtu behar du.', 'La última hipotenusa debe medir $\\sqrt{5}$.', 'يجب أن يساوي آخر وتر $\\sqrt{5}$.', 'The last hypotenuse must measure $\\sqrt{5}$.'), isSolved: (state) => state.n === 5 },
    { id: 36402, prompt: say('Eraiki $\\sqrt{13}$.', 'Construye $\\sqrt{13}$.', 'أنشئ $\\sqrt{13}$.', 'Construct $\\sqrt{13}$.'), hint: say('Gehitu triangeluak azken hipotenusa $\\sqrt{13}$ izan arte.', 'Añade triángulos hasta llegar a $13$.', 'أضف مثلثات حتى تصل إلى $13$.', 'Add triangles until you reach $13$.'), isSolved: (state) => state.n === 13 },
    { id: 36403, prompt: say('Aurkitu $9$ edo handiagoa den erro zehatz bat.', 'Encuentra una raíz exacta que sea $9$ o más.', 'جد جذرًا صحيحًا يساوي $9$ أو أكثر.', 'Find an exact root that is $9$ or more.'), hint: say('Karratu perfektuetan hipotenusa zenbaki osoa da.', 'En los cuadrados perfectos la hipotenusa es un número entero.', 'في المربعات الكاملة يكون الوتر عددًا صحيحًا.', 'For perfect squares, the hypotenuse is a whole number.'), isSolved: (state) => state.n >= 9 && state.n === Math.round(Math.sqrt(state.n)) ** 2 },
    { id: 36404, prompt: say('Aurkitu hipotenusa $3$ baino handiagoa den lehen triangelua.', 'Encuentra el primer triángulo cuya hipotenusa supera $3$.', 'جد أول مثلث يتجاوز وتره $3$.', 'Find the first triangle whose hypotenuse is greater than $3$.'), hint: say('$\\sqrt{9}=3$: hurrengoa.', '$\\sqrt{9}=3$: el siguiente.', '$\\sqrt{9}=3$: التالي.', '$\\sqrt{9}=3$: take the next one.'), isSolved: (state) => state.n === 10 },
    { id: 36405, prompt: say('Lortu hipotenusa $3{,}5$ eta $4$ artean.', 'Consigue una hipotenusa entre $3{,}5$ y $4$.', 'احصل على وتر بين $3{,}5$ و$4$.', 'Get a hypotenuse between $3{,}5$ and $4$.'), hint: say('$3{,}5^{2}=12{,}25$ eta $4^{2}=16$.', '$3{,}5^{2}=12{,}25$ y $4^{2}=16$.', '$3{,}5^{2}=12{,}25$ و$4^{2}=16$.', '$3{,}5^{2}=12{,}25$ and $4^{2}=16$.'), isSolved: (state) => spiralRoot(state) > 3.5 && spiralRoot(state) < 4 }
]

/** Endless practice: build √n for a radicand picked at random. It never starts already solved. */
export const spiralExtra: LabChallengeMaker<SpiralState> = (random) => {
    for (;;) {
        const n = randomInt(random, 3, SPIRAL_LIMITS.max)
        if (n === initialSpiralState.n) continue
        return {
            prompt: say(`Eraiki $\\sqrt{${n}}$.`, `Construye $\\sqrt{${n}}$.`, `أنشئ $\\sqrt{${n}}$.`, `Construct $\\sqrt{${n}}$.`),
            hint: say(`Gehitu triangeluak azken hipotenusa $\\sqrt{${n}}$ izan arte.`, `Añade triángulos hasta que la última hipotenusa sea $\\sqrt{${n}}$.`, `أضف مثلثات حتى يصير آخر وتر $\\sqrt{${n}}$.`, `Add triangles until the last hypotenuse is $\\sqrt{${n}}$.`),
            isSolved: (state) => state.n === n,
            solution: { n }
        }
    }
}
