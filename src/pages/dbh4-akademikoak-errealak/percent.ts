/* ==========================================================================
   Zenbaki errealak eta ehunekoak · 4. DBH (akademikoak) — percentages and
   interest. Plain numbers rounded to remove floating noise; money is rounded
   to the cent as the textbook does. The decimals, the real line and the
   intervals come from the applied unit (../dbh4-aplikatuak-errealak/reals.ts).
   ========================================================================== */

/** A value without floating noise (0.1 + 0.2 → 0.3) */
export const tidy = (value: number, places = 9) => Number(value.toFixed(places))

/** Money: rounded to the cent */
export const cents = (value: number) => Math.round(tidy(value, 6) * 100) / 100

/** p % of an amount */
export const percentOf = (p: number, amount: number) => tidy((p / 100) * amount)

/** What percent `part` is of `whole` */
export const percentWhich = (part: number, whole: number) => tidy((part / whole) * 100)

/** Index of variation: +21 % → 1,21; −20 % → 0,8 */
export const variationIndex = (p: number) => tidy(1 + p / 100)

/** The percent change an index means: 1,105 → +10,5 %; 0,85 → −15 % */
export const indexToPercent = (index: number) => tidy((index - 1) * 100)

/** Final amount after one or several changes in a row (in %, + increase, − decrease) */
export const applyChanges = (amount: number, changes: number[]) => tidy(changes.reduce((value, change) => value * variationIndex(change), amount))

/** The single index of several changes in a row */
export const chainedIndex = (changes: number[]) => tidy(changes.reduce((index, change) => index * variationIndex(change), 1))

/** Initial amount from the final one: C = final : index */
export const initialAmount = (final: number, changes: number[]) => tidy(final / chainedIndex(changes))

/** Simple interest: I = C · r · t / 100 (t in years) */
export const simpleInterest = (capital: number, rate: number, years: number) => tidy((capital * rate * years) / 100)

/** Compound interest: Cf = Ci · (1 + r/100)^t, to the cent */
export const compoundFinal = (capital: number, rate: number, years: number) => cents(capital * (1 + rate / 100) ** years)

/** Final capital year by year with simple and with compound interest (to the cent) */
export function interestTable(capital: number, rate: number, years: number): Array<{ year: number; simple: number; compound: number }> {
    return Array.from({ length: years + 1 }, (_, year) => ({ year, simple: cents(capital + simpleInterest(capital, rate, year)), compound: compoundFinal(capital, rate, year) }))
}

/** A decimal written with a comma, without trailing zeros: 1.2100 → "1,21" */
export const commaNumber = (value: number) => String(tidy(value, 6)).replace('.', ',')

/** Money written with two decimals and a comma: 1104.08 → "1104,08" */
export const money = (value: number) => cents(value).toFixed(2).replace('.', ',')
