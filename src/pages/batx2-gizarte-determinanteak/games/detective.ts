import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { matrixLatex } from '../../batx2-zientziak-matrizeak/matrix.ts'
import { cofactor, cofactorSign, det, sarrusTerms } from '../../batx2-zientziak-determinanteak/determinant.ts'

/* ==========================================================================
   J3 · Determinanteen detektibea (Gizarte Zientziak): a worked solution of
   three lines with one wrong line, the mistakes of this unit. Level 1
   (working out): ad + bc, Sarrus with every product added, |kA| = k|A|.
   Level 2 (cofactors): the sign forgotten, the wrong row and column
   struck out, an expansion without the entries. Level 3 (the inverse):
   Adj A not transposed, 1/|A| forgotten, |A⁻¹| = |A|. `right` and
   `reached` only tell the cases apart.
   ========================================================================== */

export type GizarteDeterminantDetectiveError =
    | 'diagonal-sum'
    | 'sarrus-sign'
    | 'scalar-once'
    | 'cofactor-sign'
    | 'wrong-cross'
    | 'forgot-entry'
    | 'no-transpose'
    | 'no-divide'
    | 'inverse-det'

export const gizarteDeterminantDetectiveLevels: GizarteDeterminantDetectiveError[][] = [
    ['diagonal-sum', 'sarrus-sign', 'scalar-once'],
    ['cofactor-sign', 'wrong-cross', 'forgot-entry'],
    ['no-transpose', 'no-divide', 'inverse-det']
]

export const GIZARTE_DETERMINANT_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

type Grid = number[][]
const pm = (rows: Grid) => matrixLatex(rows)
const vm = (rows: Grid) => `\\begin{vmatrix}${rows.map((row) => row.join('&')).join('\\\\')}\\end{vmatrix}`
const bracket = (value: number) => (value < 0 ? `(${value})` : String(value))
const value = (input: { numerator: number; denominator: number }) => input.numerator / input.denominator
const small = (random: Random) => pick(random, [-3, -2, -1, 1, 2, 3, 4, 5])
const digit = (random: Random) => pick(random, [-2, -1, 0, 1, 2, 3])
const grid = (random: Random, size: number, draw: (random: Random) => number): Grid => Array.from({ length: size }, () => Array.from({ length: size }, () => draw(random)))
const without = (a: Grid, row: number, column: number): Grid => a.filter((_, r) => r !== row).map((cells) => cells.filter((_, c) => c !== column))
/** A fraction in LaTeX, simplified */
function frac(numerator: number, denominator: number): string {
    const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
    const g = gcd(numerator, denominator) || 1
    let n = numerator / g
    let d = denominator / g
    if (d < 0) { n = -n; d = -d }
    return d === 1 ? String(n) : `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}`
}

export const gizarteDeterminantDetectiveNames: Record<GizarteDeterminantDetectiveError, LocalizedText> = {
    'diagonal-sum': say('Bigarren diagonala batu du, kendu beharrean', 'Sumó la diagonal secundaria en vez de restarla', 'جمع القطر الثانوي بدل طرحه', 'Added the other diagonal instead of subtracting it'),
    'sarrus-sign': say('Sarrusen sei biderkadurak batu ditu', 'En Sarrus sumó los seis productos', 'في ساروس جمع الحواصل الستة', 'In Sarrus it added all six products'),
    'scalar-once': say('$|kA|=k|A|$ idatzi du, $k^n|A|$ beharrean', 'Escribió $|kA|=k|A|$ en vez de $k^n|A|$', 'كتب $|kA|=k|A|$ بدل $k^n|A|$', 'Wrote $|kA|=k|A|$ instead of $k^n|A|$'),
    'cofactor-sign': say('Adjuntuaren zeinua ahaztu du', 'Olvidó el signo del adjunto', 'نسي إشارة المتمم الجبري', 'Forgot the sign of the cofactor'),
    'wrong-cross': say('Beste errenkada eta zutabea ezabatu ditu', 'Tachó otra fila y otra columna', 'حذف صفًّا وعمودًا آخرين', 'Struck out another row and column'),
    'forgot-entry': say('Adjuntuak batu ditu, elementuez biderkatu gabe', 'Sumó los adjuntos sin multiplicarlos por los elementos', 'جمع المتممات دون ضربها في العناصر', 'Added the cofactors without multiplying them by the entries'),
    'no-transpose': say('Matrize adjuntua ez du irauli', 'No traspuso la matriz adjunta', 'لم ينقل المصفوفة المرافقة', 'Did not transpose the adjugate'),
    'no-divide': say('Ez du $|A|$ zenbakiaz zatitu', 'No dividió entre $|A|$', 'لم يقسم على $|A|$', 'Did not divide by $|A|$'),
    'inverse-det': say('$|A^{-1}|=|A|$ idatzi du', 'Escribió $|A^{-1}|=|A|$', 'كتب $|A^{-1}|=|A|$', 'Wrote $|A^{-1}|=|A|$')
}

export const gizarteDeterminantDetectiveTips: Record<GizarteDeterminantDetectiveError, LocalizedText> = {
    'diagonal-sum': say('$ad-bc$: diagonal nagusia ken bigarrena.', '$ad-bc$: la diagonal principal menos la secundaria.', '$ad-bc$: القطر الرئيسي ناقص الثانوي.', '$ad-bc$: the main diagonal minus the other.'),
    'sarrus-sign': say('Beste diagonalaren hiru biderkadurak kendu egiten dira.', 'Los tres productos de la otra diagonal restan.', 'حواصل القطر الآخر الثلاثة تُطرح.', 'The three products of the other diagonal subtract.'),
    'scalar-once': say('$k$ zenbakia errenkada bakoitzetik ateratzen da: $n$ aldiz.', 'La $k$ sale de cada fila: $n$ veces.', 'يخرج $k$ من كل صف: $n$ مرات.', 'The $k$ comes out of every row: $n$ times.'),
    'cofactor-sign': say('$A_{ij}=(-1)^{i+j}M_{ij}$: $i+j$ bakoitia bada, minus.', '$A_{ij}=(-1)^{i+j}M_{ij}$: si $i+j$ es impar, menos.', '$A_{ij}=(-1)^{i+j}M_{ij}$: إذا كان $i+j$ فرديًا فالإشارة سالبة.', '$A_{ij}=(-1)^{i+j}M_{ij}$: if $i+j$ is odd, minus.'),
    'wrong-cross': say('$A_{ij}$ kalkulatzeko, ezabatu $i$ errenkada eta $j$ zutabea.', 'Para $A_{ij}$ se tachan la fila $i$ y la columna $j$.', 'لحساب $A_{ij}$ احذف الصف $i$ والعمود $j$.', 'For $A_{ij}$ strike out row $i$ and column $j$.'),
    'forgot-entry': say('$|A|=a_{11}A_{11}+a_{12}A_{12}+a_{13}A_{13}$.', '$|A|=a_{11}A_{11}+a_{12}A_{12}+a_{13}A_{13}$.', '$|A|=a_{11}A_{11}+a_{12}A_{12}+a_{13}A_{13}$.', '$|A|=a_{11}A_{11}+a_{12}A_{12}+a_{13}A_{13}$.'),
    'no-transpose': say('$A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$: irauli egin behar da.', '$A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$: hay que trasponer.', '$A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$: يجب النقل.', '$A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$: you must transpose.'),
    'no-divide': say('Iraulitako adjuntua $|A|$ zenbakiaz zatitzen da.', 'La adjunta traspuesta se divide entre $|A|$.', 'تُقسم المرافقة المنقولة على $|A|$.', 'The transposed adjugate is divided by $|A|$.'),
    'inverse-det': say('$|A|\\cdot|A^{-1}|=|I|=1$: $|A^{-1}|=\\frac{1}{|A|}$.', '$|A|\\cdot|A^{-1}|=|I|=1$: $|A^{-1}|=\\frac{1}{|A|}$.', '$|A|\\cdot|A^{-1}|=|I|=1$: $|A^{-1}|=\\frac{1}{|A|}$.', '$|A|\\cdot|A^{-1}|=|I|=1$: $|A^{-1}|=\\frac{1}{|A|}$.')
}

type Built = Omit<WorkedCase<GizarteDeterminantDetectiveError>, 'options'>

const work = (latex: string) => say(`Kalkulatu $${latex}$.`, `Calcula $${latex}$.`, `احسب $${latex}$.`, `Work out $${latex}$.`)
const cofactorOf = (latex: string, i: number, j: number) => say(`$A=${latex}$ matrizean, kalkulatu $A_{${i}${j}}$ adjuntua.`, `En $A=${latex}$, calcula el adjunto $A_{${i}${j}}$.`, `في $A=${latex}$ احسب المتمم الجبري $A_{${i}${j}}$.`, `In $A=${latex}$, work out the cofactor $A_{${i}${j}}$.`)
const entryOfInverse = (latex: string, i: number, j: number) => say(`Kalkulatu $A=${latex}$ matrizearen alderantzizkoaren $(${i},${j})$ elementua.`, `Calcula el elemento $(${i},${j})$ de la inversa de $A=${latex}$.`, `احسب العنصر $(${i},${j})$ من معكوس $A=${latex}$.`, `Work out the entry $(${i},${j})$ of the inverse of $A=${latex}$.`)

function build(random: Random, error: GizarteDeterminantDetectiveError): Built | null {
    switch (error) {
        case 'diagonal-sum': {
            const a = grid(random, 2, small)
            const [[p, q], [r, s]] = a
            if (q * r === 0) return null
            return {
                problem: work(vm(a)),
                lines: [line(LABELS.data, `|A|=${vm(a)}`), line(LABELS.step, `${bracket(p)}\\cdot ${bracket(s)}+${bracket(q)}\\cdot ${bracket(r)}`), line(LABELS.result, `|A|=${p * s + q * r}`)],
                wrong: 1, error, fix: `${bracket(p)}\\cdot ${bracket(s)}-${bracket(q)}\\cdot ${bracket(r)}=${p * s - q * r}`, right: p * s - q * r, reached: p * s + q * r
            }
        }
        case 'sarrus-sign': {
            const a = grid(random, 3, digit)
            const { plus, minus } = sarrusTerms(a)
            const P = plus.reduce((sum, item) => sum + item, 0)
            const M = minus.reduce((sum, item) => sum + item, 0)
            if (M === 0) return null
            return {
                problem: work(vm(a)),
                lines: [line(LABELS.step, `(${plus.map(bracket).join('+')})`), line(LABELS.step, `+(${minus.map(bracket).join('+')})`), line(LABELS.result, `|A|=${P + M}`)],
                wrong: 1, error, fix: `(${plus.map(bracket).join('+')})-(${minus.map(bracket).join('+')})=${P - M}`, right: P - M, reached: P + M
            }
        }
        case 'scalar-once': {
            const n = randomInt(random, 2, 3)
            const k = pick(random, [2, 3, -2])
            const d = pick(random, [2, 3, 4, 5, -2, -3])
            return {
                problem: say(`$A$ matrizea ${n}. ordenakoa da, eta $|A|=${d}$. Zenbat da $|${k}A|$?`, `$A$ es de orden ${n} y $|A|=${d}$. ¿Cuánto vale $|${k}A|$?`, `$A$ من الرتبة ${n} و$|A|=${d}$. كم يساوي $|${k}A|$؟`, `$A$ has order ${n} and $|A|=${d}$. What is $|${k}A|$?`),
                lines: [line(LABELS.data, `n=${n},\\ |A|=${d}`), line(LABELS.step, `|${k}A|=${bracket(k)}\\cdot|A|`), line(LABELS.result, `|${k}A|=${k * d}`)],
                wrong: 1, error, fix: `|${k}A|=${bracket(k)}^${n}\\cdot ${bracket(d)}=${k ** n * d}`, right: k ** n * d, reached: k * d
            }
        }
        case 'cofactor-sign': {
            const a = grid(random, 3, digit)
            const [i, j] = pick(random, [[0, 1], [1, 0], [1, 2], [2, 1]])
            const m = -value(cofactor(a, i, j))
            if (m === 0) return null
            return {
                problem: cofactorOf(pm(a), i + 1, j + 1),
                lines: [line(LABELS.step, `M_{${i + 1}${j + 1}}=${vm(without(a, i, j))}=${m}`), line(LABELS.step, `A_{${i + 1}${j + 1}}=M_{${i + 1}${j + 1}}`), line(LABELS.result, `A_{${i + 1}${j + 1}}=${m}`)],
                wrong: 1, error, fix: `A_{${i + 1}${j + 1}}=-M_{${i + 1}${j + 1}}=${-m}`, right: -m, reached: m
            }
        }
        case 'wrong-cross': {
            const a = grid(random, 3, digit)
            const i = randomInt(random, 0, 2)
            const j = randomInt(random, 0, 2)
            if (i === j) return null
            const right = value(cofactor(a, i, j))
            const reached = value(cofactor(a, j, i))
            const sign = cofactorSign(i, j) === 1 ? '' : '-'
            return {
                problem: cofactorOf(pm(a), i + 1, j + 1),
                lines: [line(LABELS.data, `A=${pm(a)}`), line(LABELS.step, `A_{${i + 1}${j + 1}}=${sign}${vm(without(a, j, i))}`), line(LABELS.result, `A_{${i + 1}${j + 1}}=${reached}`)],
                wrong: 1, error, fix: `A_{${i + 1}${j + 1}}=${sign}${vm(without(a, i, j))}=${right}`, right, reached
            }
        }
        case 'forgot-entry': {
            const a = grid(random, 3, digit)
            const cofactors = [0, 1, 2].map((j) => value(cofactor(a, 0, j)))
            const right = value(det(a))
            const reached = cofactors.reduce((sum, item) => sum + item, 0)
            return {
                problem: say(`Kalkulatu $${vm(a)}$, 1. errenkadaren arabera garatuz.`, `Calcula $${vm(a)}$ desarrollando por la fila 1.`, `احسب $${vm(a)}$ بالنشر حسب الصف 1.`, `Work out $${vm(a)}$ by expanding along row 1.`),
                lines: [line(LABELS.step, '|A|=A_{11}+A_{12}+A_{13}'), line(LABELS.step, `=${cofactors.map(bracket).join('+')}`), line(LABELS.result, `|A|=${reached}`)],
                wrong: 0, error, fix: `|A|=${a[0].map((entry, j) => `${bracket(entry)}\\cdot ${bracket(cofactors[j])}`).join('+')}=${right}`, right, reached
            }
        }
        case 'no-transpose': {
            const a = pick(random, [[[2, 1], [3, 2]], [[3, 1], [5, 2]], [[2, 5], [1, 3]], [[1, 3], [2, 7]], [[4, 3], [1, 1]], [[1, 4], [2, 9]]])
            const [[p, q], [r, s]] = a
            const adj = [[s, -r], [-q, p]]
            return {
                problem: entryOfInverse(pm(a), 1, 2),
                lines: [line(LABELS.step, `|A|=1,\\ \\operatorname{Adj}A=${pm(adj)}`), line(LABELS.step, `A^{-1}=\\operatorname{Adj}A=${pm(adj)}`), line(LABELS.result, `(A^{-1})_{12}=${-r}`)],
                wrong: 1, error, fix: `A^{-1}=(\\operatorname{Adj}A)^t=${pm([[s, -q], [-r, p]])}`, right: -q, reached: -r
            }
        }
        case 'no-divide': {
            const a = pick(random, [[[3, 1], [1, 1]], [[2, 1], [1, 3]], [[4, 1], [2, 1]], [[1, 2], [1, 5]], [[3, 2], [1, 2]], [[5, 1], [3, 1]]])
            const [[p, q], [r, s]] = a
            const d = p * s - q * r
            const adjT = [[s, -q], [-r, p]]
            return {
                problem: entryOfInverse(pm(a), 1, 1),
                lines: [line(LABELS.step, `|A|=${d}`), line(LABELS.step, `A^{-1}=(\\operatorname{Adj}A)^t=${pm(adjT)}`), line(LABELS.result, `(A^{-1})_{11}=${s}`)],
                wrong: 1, error, fix: `A^{-1}=\\frac{1}{${d}}${pm(adjT)},\\ (A^{-1})_{11}=${frac(s, d)}`, right: s / d, reached: s
            }
        }
        case 'inverse-det': {
            const d = pick(random, [2, 3, 4, 5, -2, -4])
            const n = randomInt(random, 2, 3)
            return {
                problem: say(`$A$ matrizea ${n}. ordenakoa da, eta $|A|=${d}$. Zenbat da $|A^{-1}|$?`, `$A$ es de orden ${n} y $|A|=${d}$. ¿Cuánto vale $|A^{-1}|$?`, `$A$ من الرتبة ${n} و$|A|=${d}$. كم يساوي $|A^{-1}|$؟`, `$A$ has order ${n} and $|A|=${d}$. What is $|A^{-1}|$?`),
                lines: [line(LABELS.data, `|A|=${d}`), line(LABELS.step, '|A^{-1}|=|A|'), line(LABELS.result, `|A^{-1}|=${d}`)],
                wrong: 1, error, fix: `|A^{-1}|=\\frac{1}{|A|}=${frac(1, d)}`, right: 1 / d, reached: d
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createGizarteDeterminantDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, gizarteDeterminantDetectiveLevels[levelIndex], GIZARTE_DETERMINANT_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}
