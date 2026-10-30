import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   L2 · El cuadrado de la raíz: √n is the side of a square of area n. The
   learner picks the side s of the blocks to carve out of the n unit squares;
   when s² divides n they tile exactly and √n = s·√(n / s²). Pure state logic.
   ========================================================================== */

export const SQUARE_LIMITS = { n: { min: 2, max: 200 }, s: { min: 1, max: 14 } } as const

export interface SquareState {
    n: number
    s: number
}

export const initialSquareState: SquareState = { n: 72, s: 1 }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export const setSquare = (state: SquareState, patch: Partial<SquareState>): SquareState => ({
    n: clamp(patch.n ?? state.n, SQUARE_LIMITS.n.min, SQUARE_LIMITS.n.max),
    s: clamp(patch.s ?? state.s, SQUARE_LIMITS.s.min, SQUARE_LIMITS.s.max)
})

/** The blocks of side s tile the area exactly */
export const squareFits = ({ n, s }: SquareState) => n % (s * s) === 0

/** Number of blocks (the new radicand) when the side fits */
export const squareInside = (state: SquareState) => (squareFits(state) ? state.n / (state.s * state.s) : null)

/** Largest side whose square divides n */
export function maxSide(n: number): number {
    let best = 1
    for (let s = 2; s * s <= n; s += 1) if (n % (s * s) === 0) best = s
    return best
}

/** The side fits and no bigger block would: the radical is fully simplified */
export const squareSimplified = (state: SquareState) => squareFits(state) && state.s === maxSide(state.n)

export const isPerfectSquare = (n: number) => maxSide(n) ** 2 === n

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const tex = (coefficient: number, radicand: number) => (radicand === 1 ? `$${coefficient}$` : `$${coefficient === 1 ? '' : coefficient}\\sqrt{${radicand}}$`)

export const squareChallenges: LabChallenge<SquareState>[] = [
    { id: 36201, prompt: say('Lortu $\\sqrt{72}=6\\sqrt{2}$.', 'Consigue $\\sqrt{72}=6\\sqrt{2}$.', 'احصل على $\\sqrt{72}=6\\sqrt{2}$.'), hint: say('$72=6^{2}\\cdot 2$: aukeratu aldea 6.', '$72=6^{2}\\cdot 2$: elige el lado 6.', '$72=6^{2}\\cdot 2$: اختر الضلع 6.'), isSolved: (state) => state.n === 72 && state.s === 6 },
    { id: 36202, prompt: say('Lortu $3\\sqrt{5}$ sinplifikatuta.', 'Consigue $3\\sqrt{5}$ simplificado.', 'احصل على $3\\sqrt{5}$ مبسّطًا.'), hint: say('$3^{2}\\cdot 5=45$.', '$3^{2}\\cdot 5=45$.', '$3^{2}\\cdot 5=45$.'), isSolved: (state) => state.n === 45 && state.s === 3 },
    { id: 36203, prompt: say('Aukeratu karratu perfektu bat $50$ eta $100$ artean, bloke bakar batekin betetzen dena.', 'Elige un cuadrado perfecto entre $50$ y $100$ que se llene con un solo bloque.', 'اختر مربعًا كاملًا بين $50$ و$100$ يُملأ بكتلة واحدة.'), hint: say('Azalera $s^{2}$ bada, aldea $s$ da.', 'Si el área es $s^{2}$, el lado es $s$.', 'إذا كانت المساحة $s^{2}$ فالضلع $s$.'), isSolved: (state) => state.n >= 50 && state.n <= 100 && state.s * state.s === state.n },
    { id: 36204, prompt: say('Lortu $4\\sqrt{k}$ sinplifikatuta, $n\\le 100$ eta $n\\neq 48$ izanik.', 'Consigue $4\\sqrt{k}$ simplificado, con $n\\le 100$ y $n\\neq 48$.', 'احصل على $4\\sqrt{k}$ مبسّطًا مع $n\\le 100$ و$n\\neq 48$.'), hint: say('$n=16k$, eta $k$ ezin da karratu perfekturik izan.', '$n=16k$, con $k$ sin cuadrados dentro.', '$n=16k$ مع $k$ بلا مربع كامل.'), isSolved: (state) => state.s === 4 && squareSimplified(state) && state.n <= 100 && state.n !== 48 },
    { id: 36205, prompt: say('Aukeratu $s$ bat blokeak ez betetzeko $n=50$ azalera.', 'Elige un lado $s$ cuyos bloques no llenen el área $n=50$.', 'اختر ضلعًا $s$ لا تملأ كتله المساحة $n=50$.'), hint: say('$s^{2}$ ez da $50$ zenbakiaren zatitzailea.', '$s^{2}$ no divide a $50$.', '$s^{2}$ لا يقسم $50$.'), isSolved: (state) => state.n === 50 && !squareFits(state) }
]

const SQUARE_FREE = [2, 3, 5, 6, 7, 10, 11, 13] as const

/** Endless practice: reach a·√k simplified. It never starts already solved. */
export const squareExtra: LabChallengeMaker<SquareState> = (random) => {
    for (;;) {
        const s = randomInt(random, 2, 7)
        const k = pick(random, SQUARE_FREE)
        const n = s * s * k
        if (n > SQUARE_LIMITS.n.max) continue
        return {
            prompt: say(`Lortu ${tex(s, k)} sinplifikatuta.`, `Consigue ${tex(s, k)} simplificado.`, `احصل على ${tex(s, k)} مبسّطًا.`),
            hint: say(`$${s}^{2}\\cdot ${k}=${n}$: $n=${n}$ eta $s=${s}$.`, `$${s}^{2}\\cdot ${k}=${n}$: $n=${n}$ y $s=${s}$.`, `$${s}^{2}\\cdot ${k}=${n}$: $n=${n}$ و$s=${s}$.`),
            isSolved: (state) => state.n === n && state.s === s,
            solution: { n, s }
        }
    }
}
