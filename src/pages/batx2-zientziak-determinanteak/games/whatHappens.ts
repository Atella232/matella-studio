import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'

/* ==========================================================================
   J1 · Zer gertatzen zaio determinanteari? (¿Qué le pasa al determinante?):
   |A| is known, something is done to A, and the learner chooses the new
   determinant among four, without working it out. Level 1: one or two row
   operations or a transpose (−1, k, 1). Level 2: the whole matrix of order
   n — |kA| = kⁿ|A|, |−A|, |A⁻¹|, |Aᵖ|, |AB|. Level 3: a 3 × 3 with letters
   whose determinant is known, and another one built from its rows or
   columns, as in the Basque entrance exams. Every round keeps `factor`
   and `base`, so the tests check that the right option is factor × base.
   ========================================================================== */

export const WHAT_ROUNDS = 6

export interface WhatRound {
    level: number
    /** What is known, in LaTeX */
    given: string
    /** What is asked for, in LaTeX */
    asked: string
    options: FractionValue[]
    answer: number
    why: LocalizedText
    /** The right value is factor × base (factor may be a fraction: p / q) */
    base: number
    factor: [number, number]
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** Four different values: the right one and the first three different mistakes */
function choose(random: Random, right: FractionValue, mistakes: FractionValue[]): { options: FractionValue[]; answer: number } | null {
    const seen = new Set([written(right)])
    const wrong: FractionValue[] = []
    const { numerator: p, denominator: q } = right
    for (const mistake of [...mistakes, fraction(p + q, q), fraction(p - 2 * q, q), fraction(-p, q)]) {
        const latex = written(mistake)
        if (wrong.length === 3 || latex === null || latex === '-0' || seen.has(latex)) continue
        seen.add(latex)
        wrong.push(mistake)
    }
    if (wrong.length < 3 || written(right) === null) return null
    const options = shuffle(random, [right, ...wrong])
    return { options, answer: options.indexOf(right) }
}

/* ---------- Level 1: row operations ---------- */

const rowWhy = {
    swap: say('Bi errenkada trukatzean, zeinua aldatzen da.', 'Al cambiar dos filas, cambia el signo.', 'تبديل صفين يغيّر الإشارة.', 'Swapping two rows changes the sign.'),
    scale: say('Errenkada bat $k$ zenbakiaz biderkatzean, determinantea ere bai.', 'Al multiplicar una fila por $k$, el determinante también.', 'ضرب صف في $k$ يضرب المحدد أيضًا.', 'Multiplying a row by $k$ multiplies the determinant too.'),
    add: say('Beste errenkada baten multiplo bat batzeak ez du aldatzen.', 'Sumar un múltiplo de otra fila no lo cambia.', 'إضافة مضاعف صف آخر لا تغيّره.', 'Adding a multiple of another row does not change it.'),
    transpose: say('Irauliak determinante bera du.', 'La traspuesta tiene el mismo determinante.', 'للمنقول المحدد نفسه.', 'The transpose has the same determinant.')
}

function rowRound(random: Random): WhatRound | null {
    const d = pick(random, [2, 3, 4, 5, -2, -3, 6])
    const k = pick(random, [2, 3, 4])
    const t = pick(random, [2, 3, -1, -2])
    const [i, j] = shuffle(random, [1, 2, 3]).slice(0, 2)
    const steps = [
        { latex: `E_${i}\\leftrightarrow E_${j}`, factor: -1, why: rowWhy.swap },
        { latex: `${k}E_${i}`, factor: k, why: rowWhy.scale },
        { latex: `E_${i}${t < 0 ? '-' : '+'}${Math.abs(t) === 1 ? '' : Math.abs(t)}E_${j}`, factor: 1, why: rowWhy.add }
    ]
    const count = randomInt(random, 1, 2)
    const chosen = shuffle(random, steps).slice(0, count)
    const transposed = count === 1 && randomInt(random, 0, 2) === 0
    const factor = transposed ? 1 : chosen.reduce((product, step) => product * step.factor, 1)
    const asked = transposed ? '|A^t|' : '|B|'
    const given = transposed ? `|A|=${d}` : `|A|=${d},\\ \\ A${chosen.map((step) => `\\xrightarrow{${step.latex}}`).join('\\ ')}B`
    const right = fraction(factor * d)
    const picked = choose(random, right, [fraction(-factor * d), fraction(d), fraction(k * d * (factor > 0 ? -1 : 1)), fraction(factor * d * k)])
    if (!picked) return null
    const why = transposed ? rowWhy.transpose : chosen.length === 1 ? chosen[0].why : say(`${chosen.map((step) => step.why.eu).join(' ')}`, `${chosen.map((step) => step.why.es).join(' ')}`, `${chosen.map((step) => step.why.ar).join(' ')}`, `${chosen.map((step) => step.why.en).join(' ')}`)
    return { level: 0, given, asked, ...picked, why, base: d, factor: [factor, 1] }
}

/* ---------- Level 2: the whole matrix ---------- */

function wholeRound(random: Random): WhatRound | null {
    const n = pick(random, [2, 3])
    const d = pick(random, [2, 3, 4, 5, -2, -3])
    const k = pick(random, [2, 3, -2])
    const e = pick(random, [2, 3, -1, 5])
    const p = pick(random, [2, 3])
    const kinds = [
        { asked: `|${k}A|`, factor: [k ** n, 1], mistakes: [fraction(k * d), fraction(n * k * d)], why: say(`$|kA|=k^n|A|$: $k$ zenbakia ${n} errenkadetatik ateratzen da.`, `$|kA|=k^n|A|$: la $k$ sale de las ${n} filas.`, `$|kA|=k^n|A|$: يخرج $k$ من الصفوف ${n}.`, `$|kA|=k^n|A|$: the $k$ comes out of the ${n} rows.`) },
        { asked: '|-A|', factor: [(-1) ** n, 1], mistakes: [fraction(-((-1) ** n) * d), fraction(1, d)], why: say('$|-A|=(-1)^n|A|$: zeinua errenkada bakoitzetik ateratzen da.', '$|-A|=(-1)^n|A|$: el signo sale de cada fila.', '$|-A|=(-1)^n|A|$: تخرج الإشارة من كل صف.', '$|-A|=(-1)^n|A|$: the sign comes out of every row.') },
        { asked: '|A^{-1}|', factor: [1, d * d], mistakes: [fraction(-d), fraction(-1, d)], why: say('$|A|\\cdot|A^{-1}|=|I|=1$.', '$|A|\\cdot|A^{-1}|=|I|=1$.', '$|A|\\cdot|A^{-1}|=|I|=1$.', '$|A|\\cdot|A^{-1}|=|I|=1$.') },
        { asked: `|A^${p}|`, factor: [d ** (p - 1), 1], mistakes: [fraction(p * d), fraction(d + p)], why: say(`$|A^${p}|=|A|^${p}$.`, `$|A^${p}|=|A|^${p}$.`, `$|A^${p}|=|A|^${p}$.`, `$|A^${p}|=|A|^${p}$.`) },
        { asked: '|AB^t|', factor: [e, 1], mistakes: [fraction(d + e), fraction(-d * e)], why: say('$|AB^t|=|A|\\cdot|B|$: irauliak ez du aldatzen.', '$|AB^t|=|A|\\cdot|B|$: la traspuesta no lo cambia.', '$|AB^t|=|A|\\cdot|B|$: النقل لا يغيّره.', '$|AB^t|=|A|\\cdot|B|$: the transpose does not change it.') }
    ]
    const index = randomInt(random, 0, kinds.length - 1)
    const kind = kinds[index]
    // |A⁻¹| = 1/|A|: written as d × 1/d²
    const right = fraction(kind.factor[0] * d, kind.factor[1])
    const given = index === 4 ? `n=${n},\\ \\ |A|=${d},\\ \\ |B|=${e}` : `n=${n},\\ \\ |A|=${d}`
    const picked = choose(random, right, kind.mistakes)
    if (!picked) return null
    return { level: 1, given, asked: kind.asked, ...picked, why: kind.why, base: d, factor: kind.factor as [number, number] }
}

/* ---------- Level 3: one determinant from another ---------- */

interface LetterTemplate {
    rows: string[][]
    factor: number
    why: LocalizedText
}

const scaled = (k: string, row: string[]) => row.map((cell) => `${k}${cell}`)
const ABC = ['a', 'b', 'c']
const DEF = ['d', 'e', 'f']
const GHI = ['g', 'h', 'i']

export const LETTER_TEMPLATES: LetterTemplate[] = [
    { rows: [scaled('2', ABC), GHI, DEF], factor: -2, why: say('2 zenbakia 1. errenkadatik ateratzen da, eta beste bi errenkadak trukatuta daude.', 'El 2 sale de la fila 1, y las otras dos filas están cambiadas.', 'يخرج 2 من الصف 1، والصفان الآخران مُبدَّلان.', 'The 2 comes out of row 1, and the other two rows are swapped.') },
    { rows: [ABC.map((cell, k) => `${cell}+2${DEF[k]}`), DEF, GHI], factor: 1, why: say('$E_1+2E_2$ eragiketak ez du aldatzen.', '$E_1+2E_2$ no lo cambia.', '$E_1+2E_2$ لا تغيّره.', '$E_1+2E_2$ does not change it.') },
    { rows: [scaled('3', GHI), DEF, ABC], factor: -3, why: say('1. eta 3. errenkadak trukatuta daude, eta 3 zenbakia ateratzen da.', 'Las filas 1 y 3 están cambiadas, y sale el 3.', 'الصفان 1 و3 مُبدَّلان، ويخرج 3.', 'Rows 1 and 3 are swapped, and the 3 comes out.') },
    { rows: [ABC, DEF.map((cell, k) => `${cell}-${ABC[k]}`), scaled('2', GHI)], factor: 2, why: say('$E_2-E_1$ eragiketak ez du aldatzen; 2 zenbakia 3. errenkadatik ateratzen da.', '$E_2-E_1$ no lo cambia; el 2 sale de la fila 3.', '$E_2-E_1$ لا تغيّره؛ ويخرج 2 من الصف 3.', '$E_2-E_1$ does not change it; the 2 comes out of row 3.') },
    { rows: [DEF, ABC, scaled('-', GHI)], factor: 1, why: say('Truke batek eta $-1$ batek: $(-1)(-1)=1$.', 'Un cambio y un $-1$: $(-1)(-1)=1$.', 'تبديل و$-1$: $(-1)(-1)=1$.', 'A swap and a $-1$: $(-1)(-1)=1$.') },
    { rows: [scaled('2', ABC), scaled('3', DEF), GHI], factor: 6, why: say('2 zenbakia eta 3 zenbakia ateratzen dira: $2\\cdot 3=6$.', 'Salen el 2 y el 3: $2\\cdot 3=6$.', 'يخرج 2 و3: $2\\cdot 3=6$.', 'The 2 and the 3 come out: $2\\cdot 3=6$.') },
    { rows: [['b', 'a', 'c'], ['e', 'd', 'f'], ['h', 'g', 'i']], factor: -1, why: say('1. eta 2. zutabeak trukatuta daude.', 'Las columnas 1 y 2 están cambiadas.', 'العمودان 1 و2 مُبدَّلان.', 'Columns 1 and 2 are swapped.') },
    { rows: [['a', 'b', '2c'], ['d', 'e', '2f'], ['g', 'h', '2i']], factor: 2, why: say('2 zenbakia 3. zutabetik ateratzen da.', 'El 2 sale de la columna 3.', 'يخرج 2 من العمود 3.', 'The 2 comes out of column 3.') },
    { rows: [['a+b', 'b', 'c'], ['d+e', 'e', 'f'], ['g+h', 'h', 'i']], factor: 1, why: say('1. zutabeari 2. zutabea batu zaio: ez da aldatzen.', 'A la columna 1 se le ha sumado la 2: no cambia.', 'أُضيف العمود 2 إلى العمود 1: لا يتغير.', 'Column 2 has been added to column 1: it does not change.') },
    { rows: [scaled('3', ABC), scaled('3', DEF), scaled('3', GHI)], factor: 27, why: say('3 zenbakia hiru errenkadetatik ateratzen da: $3^3=27$.', 'El 3 sale de las tres filas: $3^3=27$.', 'يخرج 3 من الصفوف الثلاثة: $3^3=27$.', 'The 3 comes out of all three rows: $3^3=27$.') }
]

const letters = (rows: string[][]) => `\\begin{vmatrix}${rows.map((row) => row.join('&')).join('\\\\')}\\end{vmatrix}`

function letterRound(random: Random): WhatRound | null {
    const template = pick(random, LETTER_TEMPLATES)
    const d = pick(random, [2, 3, 4, 5, -2, -3])
    const right = fraction(template.factor * d)
    const picked = choose(random, right, [fraction(-template.factor * d), fraction(d), fraction(Math.abs(template.factor) * d * (template.factor === 1 ? 2 : 1)), fraction(template.factor + d)])
    if (!picked) return null
    return { level: 2, given: `${letters([ABC, DEF, GHI])}=${d}`, asked: letters(template.rows), ...picked, why: template.why, base: d, factor: [template.factor, 1] }
}

const makers = [rowRound, wholeRound, letterRound]

/** Six rounds of one level, never the same question twice in a row */
export function createWhatRounds(random: Random, level: number): WhatRound[] {
    const maker = makers[level] ?? makers[0]
    const rounds: WhatRound[] = []
    for (let attempt = 0; rounds.length < WHAT_ROUNDS && attempt < 2000; attempt += 1) {
        const round = maker(random)
        if (!round) continue
        const key = `${round.given}|${round.asked}`
        if (rounds.some((other) => `${other.given}|${other.asked}` === key)) continue
        rounds.push(round)
    }
    return rounds
}

/** The value of an option, written as the game shows it */
export const optionLatex = (option: FractionValue) => written(option) ?? `\\frac{${option.numerator}}{${option.denominator}}`
