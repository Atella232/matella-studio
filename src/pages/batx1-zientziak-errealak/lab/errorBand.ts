import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · Errorearen banda (La banda del error): a number (π, √2, e, φ, 1/7
   or a measurement) is approximated to n significant figures by rounding
   or by truncating. A zoomed ruler shows the approximation, the band where
   the exact value must be (± half a unit when rounding, one unit above
   when truncating) and the exact value inside it; the readout gives the
   absolute and relative errors. The learner first predicts whether the
   exact value lies below or above the approximation. Pure logic.
   ========================================================================== */

export type ApproxMode = 'round' | 'truncate'

export interface BandValue {
    value: number
    /** How the number is written in the tool, with a decimal comma */
    label: string
    /** The same in LaTeX */
    latex: string
}

export const BAND_VALUES: BandValue[] = [
    { value: Math.PI, label: 'π', latex: '\\pi' },
    { value: Math.SQRT2, label: '√2', latex: '\\sqrt{2}' },
    { value: Math.E, label: 'e', latex: 'e' },
    { value: (1 + Math.sqrt(5)) / 2, label: 'φ', latex: '\\varphi' },
    { value: 1 / 7, label: '1/7', latex: '\\frac{1}{7}' },
    { value: 0.045918, label: '0,045918', latex: '0{,}045918' },
    { value: 1234.567, label: '1234,567', latex: '1234{,}567' }
]

export const BAND_FIGURES = { min: 1, max: 6 } as const

export interface BandState {
    value: number
    figures: number
    mode: ApproxMode
    prediction: Prediction | null
}

export const initialBandState: BandState = { value: 0, figures: 2, mode: 'round', prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setBand(state: BandState, patch: Partial<Omit<BandState, 'prediction'>>): BandState {
    const value = clamp(patch.value ?? state.value, 0, BAND_VALUES.length - 1)
    const figures = clamp(patch.figures ?? state.figures, BAND_FIGURES.min, BAND_FIGURES.max)
    const mode = patch.mode ?? state.mode
    const same = value === state.value && figures === state.figures && mode === state.mode
    return { value, figures, mode, prediction: same ? state.prediction : null }
}

/** Ten to the place of the last figure kept: 0,01 for π with three figures */
export function bandUnit({ value, figures }: BandState): number {
    const exponent = Math.floor(Math.log10(Math.abs(BAND_VALUES[value].value)))
    return 10 ** (exponent - figures + 1)
}

const tidy = (value: number) => Number(value.toPrecision(12))

/** The approximation, rounded or truncated to the figures chosen */
export function bandApprox(state: BandState): number {
    const exact = BAND_VALUES[state.value].value
    const unit = bandUnit(state)
    const steps = exact / unit
    return tidy((state.mode === 'round' ? Math.round(steps) : Math.floor(steps)) * unit)
}

export const bandAbsolute = (state: BandState) => Math.abs(BAND_VALUES[state.value].value - bandApprox(state))
export const bandRelative = (state: BandState) => bandAbsolute(state) / BAND_VALUES[state.value].value
/** The bound we can give without knowing the exact value: half a unit when rounding, a whole unit when truncating */
export const bandBound = (state: BandState) => tidy(state.mode === 'round' ? bandUnit(state) / 2 : bandUnit(state))
/** The band where the exact value must be */
export function bandInterval(state: BandState): { low: number; high: number } {
    const approx = bandApprox(state)
    const unit = bandUnit(state)
    return state.mode === 'round' ? { low: tidy(approx - unit / 2), high: tidy(approx + unit / 2) } : { low: approx, high: tidy(approx + unit) }
}
/** Is the exact value below (<), on (=) or above (>) the approximation? */
export const bandPrediction = (state: BandState): Prediction => compareTo(BAND_VALUES[state.value].value, bandApprox(state))

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const bandChallenges: LabChallenge<BandState>[] = [
    { id: 99301, prompt: say('Biribildu $\\pi$ hiru zifra esanguratsutara.', 'Redondea $\\pi$ a tres cifras significativas.', 'قرّب $\\pi$ إلى ثلاثة أرقام معنوية.', 'Round $\\pi$ to three significant figures.'), hint: say('Aukeratu $\\pi$, biribildu eta 3 zifra.', 'Elige $\\pi$, redondeo y 3 cifras.', 'اختر $\\pi$ والتدوير و3 أرقام.', 'Choose $\\pi$, rounding and 3 figures.'), isSolved: (state) => state.value === 0 && state.mode === 'round' && state.figures === 3 },
    { id: 99302, prompt: say('Biribildu $\\sqrt{2}$, errore erlatiboa % 0,1 baino txikiagoa izan dadin, ahalik eta zifra gutxienekin.', 'Redondea $\\sqrt{2}$ con un error relativo menor que el 0,1 %, con las menos cifras posibles.', 'قرّب $\\sqrt{2}$ بخطأ نسبي أقل من 0.1 % بأقل عدد من الأرقام.', 'Round $\\sqrt{2}$ with a relative error below 0.1%, with as few figures as possible.'), hint: say('Probatu 3 zifrarekin eta gero 4 zifrarekin.', 'Prueba con 3 cifras y después con 4.', 'جرّب 3 أرقام ثم 4.', 'Try 3 figures and then 4.'), isSolved: (state) => state.value === 1 && state.mode === 'round' && state.figures === 4 },
    { id: 99303, prompt: say('Moztu $e$ bi zifratara. Bornea zifra baten unitatea da.', 'Trunca $e$ a dos cifras. La cota es una unidad de la última cifra.', 'اقطع $e$ إلى رقمين. الحدّ وحدة كاملة من الرقم الأخير.', 'Truncate $e$ to two figures. The bound is one unit of the last figure.'), hint: say('Aukeratu moztu: $e\\approx 2{,}7$.', 'Elige truncar: $e\\approx 2{,}7$.', 'اختر القطع: $e\\approx 2{,}7$.', 'Choose truncating: $e\\approx 2{,}7$.'), isSolved: (state) => state.value === 2 && state.mode === 'truncate' && state.figures === 2 },
    { id: 99304, prompt: say('Hurbildu $\\frac{1}{7}$ hiru zifrarekin, errore absolutua $0{,}0005$ baino txikiagoa izan dadin.', 'Aproxima $\\frac{1}{7}$ con tres cifras y un error absoluto menor que $0{,}0005$.', 'قرّب $\\frac{1}{7}$ بثلاثة أرقام وبخطأ مطلق أقل من $0{,}0005$.', 'Approximate $\\frac{1}{7}$ with three figures and an absolute error below $0{,}0005$.'), hint: say('Moztuta ez da nahikoa: biribildu.', 'Truncando no basta: redondea.', 'القطع لا يكفي: قرّب بالتدوير.', 'Truncating is not enough: round.'), isSolved: (state) => state.value === 4 && state.figures === 3 && bandAbsolute(state) < 0.0005 },
    { id: 99305, prompt: say('$1234{,}567$ neurketarekin, lortu 5 errore-bornea.', 'Con la medida $1234{,}567$, consigue una cota del error de 5.', 'مع القياس $1234{,}567$ احصل على حدّ خطأ يساوي 5.', 'With the measurement $1234{,}567$, get an error bound of 5.'), hint: say('Biribiltzean bornea unitate erdia da: hamarrekoetara.', 'Al redondear la cota es media unidad: a las decenas.', 'عند التدوير الحدّ نصف وحدة: إلى العشرات.', 'When rounding, the bound is half a unit: to the tens.'), isSolved: (state) => state.value === 6 && state.mode === 'round' && bandBound(state) === 5 }
]

/** Endless practice: round or truncate a number to a few figures */
const bandMaker: LabChallengeMaker<BandState> = (random) => {
    const value = randomInt(random, 0, BAND_VALUES.length - 1)
    const figures = randomInt(random, 2, 4)
    const mode = pick(random, ['round', 'truncate'] as const)
    const latex = BAND_VALUES[value].latex
    const solution: BandState = { value, figures, mode, prediction: null }
    const approx = String(bandApprox(solution)).replace('.', '{,}')
    return {
        prompt: mode === 'round'
            ? say(`Biribildu $${latex}$ ${figures} zifra esanguratsutara.`, `Redondea $${latex}$ a ${figures} cifras significativas.`, `قرّب $${latex}$ إلى ${figures} أرقام معنوية.`, `Round $${latex}$ to ${figures} significant figures.`)
            : say(`Moztu $${latex}$ ${figures} zifra esanguratsutara.`, `Trunca $${latex}$ a ${figures} cifras significativas.`, `اقطع $${latex}$ إلى ${figures} أرقام معنوية.`, `Truncate $${latex}$ to ${figures} significant figures.`),
        hint: say(`$${latex}\\approx ${approx}$`, `$${latex}\\approx ${approx}$`, `$${latex}\\approx ${approx}$`, `$${latex}\\approx ${approx}$`),
        isSolved: (state) => state.value === value && state.figures === figures && state.mode === mode,
        solution
    }
}

export const bandExtra = freshFrom(initialBandState, bandMaker)
