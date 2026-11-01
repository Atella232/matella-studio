import { equals, fraction, multiply, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { decimalKind, expand, expansionLatex, type DecimalKind } from '../../dbh4-aplikatuak-errealak/reals.ts'
import { freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L3 · Zatiki sortzailearen makina (La máquina de la generatriz): the
   decimal x is multiplied by 10, 100, 1000… twice, and the two strips are
   lined up at the comma. When their tails are the same, the subtraction
   leaves a whole number: (10ᵐ − 10ⁿ)·x = N, and x = N / (10ᵐ − 10ⁿ). An
   exact decimal needs no subtraction: 10ᵐ·x is already whole. First a
   guess: what kind of decimal is it, and so what will the denominator
   look like (10, 100…; 9, 99…; 90, 990…)? ▶ does the subtraction.
   ========================================================================== */

/** The decimals of the machine, as the fractions they come from */
export const MACHINE_DECIMALS: FractionValue[] = [fraction(4, 9), fraction(14, 11), fraction(1, 6), fraction(47, 20), fraction(1, 12), fraction(28, 9), fraction(7, 11), fraction(5, 4)]

export const MACHINE_LIMITS = { m: { min: 1, max: 4 }, n: { min: -1, max: 3 } } as const

export interface MachineState {
    /** Which decimal, in MACHINE_DECIMALS */
    decimal: number
    /** The top strip is 10ᵐ·x */
    m: number
    /** The bottom strip is 10ⁿ·x; −1 means nothing is subtracted */
    n: number
    prediction: Prediction | null
}

export const initialMachineState: MachineState = { decimal: 0, m: 1, n: -1, prediction: null }

const clamp = (value: number, { min, max }: { min: number; max: number }) => Math.min(max, Math.max(min, Math.round(value)))

/** A new decimal forgets the guess; m and n can change while it stays */
export function setMachine(state: MachineState, patch: Partial<Pick<MachineState, 'decimal' | 'm' | 'n'>>): MachineState {
    const decimal = clamp(patch.decimal ?? state.decimal, { min: 0, max: MACHINE_DECIMALS.length - 1 })
    const m = clamp(patch.m ?? state.m, MACHINE_LIMITS.m)
    const n = clamp(patch.n ?? state.n, MACHINE_LIMITS.n)
    return { decimal, m, n, prediction: decimal === state.decimal ? state.prediction : null }
}

export const machineValue = (state: Pick<MachineState, 'decimal'>) => MACHINE_DECIMALS[state.decimal]
export const machineKind = (state: Pick<MachineState, 'decimal'>): DecimalKind => decimalKind(expand(machineValue(state)))

/** 10ᵏ·x written out: its whole part and the first digits after the comma */
export function strip(value: FractionValue, k: number, digits = 12): { whole: number; tail: string } {
    const shifted = multiply(value, fraction(10 ** k))
    const whole = Math.floor(shifted.numerator / shifted.denominator)
    let remainder = shifted.numerator - whole * shifted.denominator
    let tail = ''
    for (let index = 0; index < digits; index += 1) {
        remainder *= 10
        tail += String(Math.floor(remainder / shifted.denominator))
        remainder %= shifted.denominator
    }
    return { whole, tail }
}

/** The bottom strip: 10ⁿ·x, or zero when nothing is subtracted */
export const bottomStrip = (state: MachineState) => (state.n < 0 ? { whole: 0, tail: '0'.repeat(12) } : strip(machineValue(state), state.n))

/** The tails cancel: the subtraction leaves a whole number */
export function tailsCancel(state: MachineState): boolean {
    if (state.n >= state.m) return false
    return strip(machineValue(state), state.m).tail === bottomStrip(state).tail
}

/** The whole number N and the factor 10ᵐ − 10ⁿ of the subtraction */
export function machineDifference(state: MachineState) {
    const top = strip(machineValue(state), state.m).whole
    const bottom = bottomStrip(state).whole
    return { number: top - bottom, factor: 10 ** state.m - (state.n < 0 ? 0 : 10 ** state.n) }
}

/** The fraction the machine gives, or null while the tails do not cancel */
export function machineFraction(state: MachineState): FractionValue | null {
    if (!tailsCancel(state)) return null
    const { number, factor } = machineDifference(state)
    return fraction(number, factor)
}

/** Exact (<), pure recurring (=) or mixed recurring (>)? */
const KIND_GUESS: Record<DecimalKind, Prediction> = { exact: '<', pure: '=', mixed: '>' }
export const machinePrediction = (state: MachineState): Prediction => KIND_GUESS[machineKind(state)]

/** The decimal as LaTeX, with the bar over the period: 0{,}1\overline{6} */
export const machineLatex = (decimal: number) => expansionLatex(expand(MACHINE_DECIMALS[decimal]))

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const findFraction = (decimal: number) => {
    const x = machineLatex(decimal)
    return say(
        `Aukeratu $${x}$ eta bilatu bi zerrenda, buztanak berdinak izan daitezen. Zein da zatiki sortzailea?`,
        `Elige $${x}$ y busca dos tiras con la misma cola. ¿Cuál es la fracción generatriz?`,
        `اختر $${x}$ وابحث عن شريطين لهما الذيل نفسه. ما الكسر المولّد؟`,
        `Choose $${x}$ and find two strips with the same tail. What is the generating fraction?`
    )
}
const shiftHint = (decimal: number) => {
    const { preperiod, period } = expand(MACHINE_DECIMALS[decimal])
    if (period === '') return say(`Hamartar zehatza: $10^{${preperiod.length}}$ aski da, kendu gabe.`, `Decimal exacto: basta $10^{${preperiod.length}}$, sin restar.`, `عشري منتهٍ: يكفي $10^{${preperiod.length}}$ دون طرح.`, `A terminating decimal: $10^{${preperiod.length}}$ is enough, with nothing to subtract.`)
    return say(
        `Behekoak aurreperiodoa pasatu behar du ($n=${preperiod.length}$), eta goikoak periodo oso bat gehiago ($m=${preperiod.length + period.length}$).`,
        `La de abajo debe saltar el anteperiodo ($n=${preperiod.length}$) y la de arriba, un periodo más ($m=${preperiod.length + period.length}$).`,
        `السفلي يتجاوز ما قبل الدور ($n=${preperiod.length}$) والعلوي دورًا إضافيًا ($m=${preperiod.length + period.length}$).`,
        `The bottom strip must skip the non-repeating digits ($n=${preperiod.length}$) and the top one, one more period ($m=${preperiod.length + period.length}$).`
    )
}

const solvedFor = (decimal: number) => (state: MachineState) => state.decimal === decimal && tailsCancel(state)

export const machineChallenges: LabChallenge<MachineState>[] = [
    { id: 31901, prompt: findFraction(0), hint: shiftHint(0), isSolved: solvedFor(0) },
    { id: 31902, prompt: findFraction(1), hint: shiftHint(1), isSolved: solvedFor(1) },
    { id: 31903, prompt: say(`Aukeratu $${machineLatex(2)}$ eta ezabatu buztana ahalik eta zerrenda txikienekin.`, `Elige $${machineLatex(2)}$ y anula la cola con las tiras más pequeñas posibles.`, `اختر $${machineLatex(2)}$ وألغِ الذيل بأصغر شريطين ممكنين.`, `Choose $${machineLatex(2)}$ and cancel the tail with the smallest strips you can.`), hint: shiftHint(2), isSolved: (state) => solvedFor(2)(state) && state.m === 2 && state.n === 1 },
    { id: 31904, prompt: findFraction(3), hint: shiftHint(3), isSolved: (state) => solvedFor(3)(state) && state.n < 0 },
    { id: 31905, prompt: say(`$${machineLatex(2)}$ zenbakiarentzat, aurkitu buztana ezabatzen duen beste bikote bat: $100x-10x$ ez dena. Zatikia aldatzen da?`, `Para $${machineLatex(2)}$, encuentra otra pareja de tiras que anule la cola, distinta de $100x-10x$. ¿Cambia la fracción?`, `للعدد $${machineLatex(2)}$، جد زوجًا آخر من الشرائط يلغي الذيل غير $100x-10x$. هل يتغيّر الكسر؟`, `For $${machineLatex(2)}$, find another pair of strips that cancels the tail, other than $100x-10x$. Does the fraction change?`), hint: say('Probatu $1000x-100x$.', 'Prueba $1000x-100x$.', 'جرّب $1000x-100x$.', 'Try $1000x-100x$.'), isSolved: (state) => solvedFor(2)(state) && !(state.m === 2 && state.n === 1) }
]

/** Endless practice: a decimal of the machine and its generating fraction */
const machineMaker: LabChallengeMaker<MachineState> = (random) => {
    const decimal = 1 + Math.floor(random() * (MACHINE_DECIMALS.length - 1))
    const { preperiod, period } = expand(MACHINE_DECIMALS[decimal])
    const solution: MachineState = period === '' ? { decimal, m: Math.max(1, preperiod.length), n: -1, prediction: null } : { decimal, m: preperiod.length + period.length, n: preperiod.length, prediction: null }
    return { prompt: findFraction(decimal), hint: shiftHint(decimal), isSolved: solvedFor(decimal), solution }
}

export const machineExtra = freshFrom(initialMachineState, machineMaker)

/** The fraction the machine gives is the decimal's own (checked by the tests) */
export const machineGivesValue = (state: MachineState) => {
    const result = machineFraction(state)
    return result !== null && equals(result, machineValue(state))
}
