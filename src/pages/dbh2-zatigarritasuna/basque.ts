/* ==========================================================================
   Basque suffixes after a number written in digits: 3ren / 5en, 9rekin /
   10ekin. The suffix depends on whether the spoken number ends in a vowel
   (hiru, bederatzi, hogei) or a consonant (bat, bost, hamar, ehun).
   ========================================================================== */

const unitEndsInVowel = [false, false, true, true, true, false, true, true, true, true]
// 10 hamar, 20 hogei, 30 hogeita hamar, 40 berrogei, 50 berrogeita hamar…
const tensEndInVowel = [false, false, true, false, true, false, true, false, true, false]
// 10 hamar … 15 hamabost … 19 hemeretzi
const teensEndInVowel = [false, true, true, true, true, false, true, true, true, true]

export function endsInVowel(value: number): boolean {
    const n = Math.abs(Math.trunc(value))
    if (n === 0) return false // zero
    const lastTwo = n % 100
    if (lastTwo >= 10 && lastTwo <= 19) return teensEndInVowel[lastTwo - 10]
    if (n % 10 !== 0) return unitEndsInVowel[n % 10]
    if (lastTwo !== 0) return tensEndInVowel[lastTwo / 10]
    if (n % 1000 !== 0) return false // ehun, berrehun…
    return true // mila
}

/** Genitive: 3ren, 5en, 12ren, 100en */
export const ren = (value: number) => `${value}${endsInVowel(value) ? 'ren' : 'en'}`

/** Sociative: 3rekin, 5ekin, 10ekin, 11rekin */
export const rekin = (value: number) => `${value}${endsInVowel(value) ? 'rekin' : 'ekin'}`
