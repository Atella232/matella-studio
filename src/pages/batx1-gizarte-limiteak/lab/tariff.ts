import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { same, say } from '../text.ts'

/* ==========================================================================
   L2 · Jauzirik gabeko tarifa (La tarifa que no salta): a tariff in two
   pieces, C(x) = p₁·x up to the threshold L and C(x) = p₂·x + k after it.
   The learner moves the prices, the threshold and the fixed part k, and
   predicts, before the second piece is drawn, whether it starts below,
   exactly at or above where the first one ends. ▶ runs a customer along
   the amounts; at L the readout gives both one-sided limits and the jump.
   Prices are halves of a euro and L is even, so every value is exact.
   ========================================================================== */

export const TARIFF_FIRST = [1, 1.5, 2, 2.5, 3] as const
export const TARIFF_SECOND = [0.5, 1, 1.5, 2, 2.5] as const
export const TARIFF_LIMITS = { L: { min: 4, max: 12, step: 2 }, k: { min: -10, max: 20 } } as const
/** The last amount drawn on the board */
export const TARIFF_X = 20

export interface TariffState {
    /** Index in TARIFF_FIRST */
    first: number
    /** Index in TARIFF_SECOND */
    second: number
    L: number
    k: number
    prediction: Prediction | null
}

export const initialTariffState: TariffState = { first: 2, second: 1, L: 6, k: 0, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setTariff(state: TariffState, patch: Partial<Omit<TariffState, 'prediction'>>): TariffState {
    const first = clamp(patch.first ?? state.first, 0, TARIFF_FIRST.length - 1)
    const second = clamp(patch.second ?? state.second, 0, TARIFF_SECOND.length - 1)
    const L = clamp((patch.L ?? state.L) / 2, TARIFF_LIMITS.L.min / 2, TARIFF_LIMITS.L.max / 2) * 2
    const k = clamp(patch.k ?? state.k, TARIFF_LIMITS.k.min, TARIFF_LIMITS.k.max)
    const unchanged = first === state.first && second === state.second && L === state.L && k === state.k
    return { first, second, L, k, prediction: unchanged ? state.prediction : null }
}

export const firstPrice = (state: Pick<TariffState, 'first'>) => TARIFF_FIRST[state.first]
export const secondPrice = (state: Pick<TariffState, 'second'>) => TARIFF_SECOND[state.second]
/** The limit from the left at L: what the first piece reaches */
export const leftAt = (state: Pick<TariffState, 'first' | 'L'>) => firstPrice(state) * state.L
/** The limit from the right at L: where the second piece starts */
export const rightAt = (state: Pick<TariffState, 'second' | 'L' | 'k'>) => secondPrice(state) * state.L + state.k
export const jumpOf = (state: Pick<TariffState, 'first' | 'second' | 'L' | 'k'>) => rightAt(state) - leftAt(state)
export const tariffAt = (state: Pick<TariffState, 'first' | 'second' | 'L' | 'k'>, x: number) => (x <= state.L ? firstPrice(state) * x : secondPrice(state) * x + state.k)

/** Where the second piece starts (<, = or >) against where the first ends */
export const tariffPrediction = (state: TariffState): Prediction => compareTo(rightAt(state), leftAt(state))

const index = (list: readonly number[], value: number) => list.indexOf(value)

export const tariffChallenges: LabChallenge<TariffState>[] = [
    {
        id: 135201,
        prompt: say('Lortu tarifak jauzirik ez egitea.', 'Consigue que la tarifa no salte.', 'اجعل التعرفة لا تقفز.', 'Make the tariff not jump.'),
        hint: same('$p_2\\cdot L+k=p_1\\cdot L$'),
        isSolved: (state) => jumpOf(state) === 0
    },
    {
        id: 135202,
        prompt: say('$p_1=2$, $p_2=1{,}5$ eta $L=8$ direnean, aurkitu jauzia saihesten duen $k$.', 'Con $p_1=2$, $p_2=1{,}5$ y $L=8$, halla el $k$ que evita el salto.', 'مع $p_1=2$ و$p_2=1{,}5$ و$L=8$، أوجد $k$ الذي يمنع القفزة.', 'With $p_1=2$, $p_2=1{,}5$ and $L=8$, find the $k$ that avoids the jump.'),
        hint: same('$1{,}5\\cdot 8+k=2\\cdot 8$'),
        isSolved: (state) => state.first === index(TARIFF_FIRST, 2) && state.second === index(TARIFF_SECOND, 1.5) && state.L === 8 && state.k === 4
    },
    {
        id: 135203,
        prompt: say('Lortu prezioa zehazki 3 € jaistea tartea aldatzean.', 'Consigue que el precio baje exactamente 3 € al cambiar de tramo.', 'اجعل السعر ينخفض 3 € تمامًا عند تغيير الشريحة.', 'Make the price drop exactly €3 when the band changes.'),
        hint: say('Jauzia eskuineko limitea ken ezkerrekoa da.', 'El salto es el límite por la derecha menos el de la izquierda.', 'القفزة هي النهاية من اليمين ناقص النهاية من اليسار.', 'The jump is the limit from the right minus the one from the left.'),
        isSolved: (state) => jumpOf(state) === -3
    },
    {
        id: 135204,
        prompt: say('Bigarren tartea unitateko merkeagoa, jauzirik gabe eta $k=6$ izanik.', 'Que el segundo tramo sea más barato por unidad, sin salto y con $k=6$.', 'اجعل الشريحة الثانية أرخص للوحدة، دون قفزة ومع $k=6$.', 'Make the second band cheaper per unit, with no jump and $k=6$.'),
        hint: same('$(p_1-p_2)\\cdot L=6$'),
        isSolved: (state) => secondPrice(state) < firstPrice(state) && state.k === 6 && jumpOf(state) === 0
    },
    {
        id: 135205,
        prompt: say('Lortu gorako jauzi bat, zehazki 5 eurokoa.', 'Consigue un salto hacia arriba de exactamente 5 €.', 'اصنع قفزة إلى الأعلى قدرها 5 € تمامًا.', 'Make an upward jump of exactly €5.'),
        hint: same('$p_2\\cdot L+k-p_1\\cdot L=5$'),
        isSolved: (state) => jumpOf(state) === 5
    }
]

/** Endless practice: the prices and the threshold are given; find the k that joins them */
const tariffMaker: LabChallengeMaker<TariffState> = (random) => {
    for (;;) {
        const first = randomInt(random, 0, TARIFF_FIRST.length - 1)
        const second = randomInt(random, 0, TARIFF_SECOND.length - 1)
        const L = 2 * randomInt(random, 2, 6)
        const k = (TARIFF_FIRST[first] - TARIFF_SECOND[second]) * L
        if (k < TARIFF_LIMITS.k.min || k > TARIFF_LIMITS.k.max || k === 0) continue
        const p1 = String(TARIFF_FIRST[first]).replace('.', '{,}')
        const p2 = String(TARIFF_SECOND[second]).replace('.', '{,}')
        return {
            prompt: say(`$p_1=${p1}$, $p_2=${p2}$ eta $L=${L}$ direnean, aurkitu jauzia saihesten duen $k$.`, `Con $p_1=${p1}$, $p_2=${p2}$ y $L=${L}$, halla el $k$ que evita el salto.`, `مع $p_1=${p1}$ و$p_2=${p2}$ و$L=${L}$، أوجد $k$ الذي يمنع القفزة.`, `With $p_1=${p1}$, $p_2=${p2}$ and $L=${L}$, find the $k$ that avoids the jump.`),
            hint: same(`$${p2}\\cdot ${L}+k=${p1}\\cdot ${L}$`),
            isSolved: (state) => state.first === first && state.second === second && state.L === L && state.k === k,
            solution: { first, second, L, k, prediction: null }
        }
    }
}

export const tariffExtra = freshFrom(initialTariffState, tariffMaker)
