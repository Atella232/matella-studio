import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { matrixLatex } from '../../batx2-zientziak-matrizeak/matrix.ts'
import { cofactor, det, minor, sarrusTerms } from '../determinant.ts'

/* ==========================================================================
   J4 · Determinanteen detektibea (Detective de determinantes): a worked
   solution of three lines with one wrong line, the mistakes of this unit.
   Level 1 (working out and properties): ad + bc, the products of Sarrus
   added, |kA| = k|A|, |A + B| = |A| + |B|. Level 2 (cofactors and
   operations): the cofactor without its sign, a swap that keeps the sign,
   2E₂ − E₁ taken as «adding a multiple», the expansion without the entry.
   Level 3 (rank and inverse): the adjugate not transposed, the rank from
   one zero minor, m² = c with one root only, |A⁻¹| = −|A|. `right` and
   `reached` only tell the cases apart.
   ========================================================================== */

export type DeterminanteakDetectiveError =
    | 'diagonal-sum'
    | 'sarrus-sign'
    | 'scalar-power'
    | 'sum-det'
    | 'cofactor-sign'
    | 'swap-sign'
    | 'scaled-row'
    | 'expansion-entry'
    | 'no-transpose'
    | 'one-minor'
    | 'one-root'
    | 'inverse-det'

export const determinanteakDetectiveLevels: DeterminanteakDetectiveError[][] = [
    ['diagonal-sum', 'sarrus-sign', 'scalar-power', 'sum-det'],
    ['cofactor-sign', 'swap-sign', 'scaled-row', 'expansion-entry'],
    ['no-transpose', 'one-minor', 'one-root', 'inverse-det']
]

export const DETERMINANTEAK_DETECTIVE_CASES = 6

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
const detOf = (rows: Grid) => value(det(rows))
const small = (random: Random) => pick(random, [-3, -2, -1, 1, 2, 3, 4])
const randomGrid = (random: Random, size: number): Grid => Array.from({ length: size }, () => Array.from({ length: size }, () => small(random)))
/** 2 × 2 matrices with determinant 1: their adjugates and inverses are whole numbers */
const UNIMODULAR: Grid[] = [[[2, 1], [1, 1]], [[3, 1], [2, 1]], [[1, 2], [1, 3]], [[2, 3], [1, 2]], [[3, 2], [1, 1]], [[1, 1], [1, 2]], [[2, 5], [1, 3]], [[3, 1], [5, 2]]]

export const determinanteakDetectiveNames: Record<DeterminanteakDetectiveError, LocalizedText> = {
    'diagonal-sum': say('Diagonalak batu ditu, kendu beharrean', 'Sumó las diagonales en lugar de restarlas', 'جمع القطرين بدل طرحهما', 'Added the diagonals instead of subtracting'),
    'sarrus-sign': say('Sarrusen, beste diagonalaren biderkadurak batu ditu', 'En Sarrus, sumó los productos de la otra diagonal', 'في ساروس جمع حواصل القطر الآخر', 'In Sarrus, added the products of the other diagonal'),
    'scalar-power': say('$|kA|=k|A|$ idatzi du, $k^n$ beharrean', 'Escribió $|kA|=k|A|$ en lugar de $k^n$', 'كتب $|kA|=k|A|$ بدل $k^n$', 'Wrote $|kA|=k|A|$ instead of $k^n$'),
    'sum-det': say('$|A+B|=|A|+|B|$ dela uste du', 'Creyó que $|A+B|=|A|+|B|$', 'ظنّ أن $|A+B|=|A|+|B|$', 'Thought that $|A+B|=|A|+|B|$'),
    'cofactor-sign': say('Adjuntua zeinurik gabe hartu du', 'Tomó el adjunto sin su signo', 'أخذ المتمم الجبري دون إشارته', 'Took the cofactor without its sign'),
    'swap-sign': say('Bi errenkada trukatu ditu, zeinua aldatu gabe', 'Cambió dos filas sin cambiar el signo', 'بدّل صفين دون تغيير الإشارة', 'Swapped two rows without changing the sign'),
    'scaled-row': say('$2E_2-E_1$ eragiketak ez duela aldatzen uste du', 'Creyó que $2E_2-E_1$ no lo cambia', 'ظنّ أن $2E_2-E_1$ لا تغيّره', 'Thought that $2E_2-E_1$ does not change it'),
    'expansion-entry': say('Garatzean, ez du elementua adjuntuaz biderkatu', 'Al desarrollar, no multiplicó el elemento por su adjunto', 'عند النشر لم يضرب العنصر في متممه الجبري', 'When expanding, did not multiply the entry by its cofactor'),
    'no-transpose': say('Matrize adjuntua ez du irauli', 'No traspuso la matriz adjunta', 'لم ينقل المصفوفة المرافقة', 'Did not transpose the adjugate'),
    'one-minor': say('Menore bat 0 izanik, heina 1 dela esan du', 'Con un solo menor nulo, dijo que el rango es 1', 'بمحدد أصغر صفري واحد قال إن الرتبة 1', 'With one zero minor, said the rank is 1'),
    'one-root': say('$m^2=c$ ekuazioaren erro bakarra hartu du', 'Tomó una sola raíz de $m^2=c$', 'أخذ جذرًا واحدًا فقط لـ $m^2=c$', 'Took only one root of $m^2=c$'),
    'inverse-det': say('$|A^{-1}|=-|A|$ idatzi du', 'Escribió $|A^{-1}|=-|A|$', 'كتب $|A^{-1}|=-|A|$', 'Wrote $|A^{-1}|=-|A|$')
}

export const determinanteakDetectiveTips: Record<DeterminanteakDetectiveError, LocalizedText> = {
    'diagonal-sum': say('$\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc$: bigarren diagonala kendu egiten da.', '$\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc$: la diagonal secundaria resta.', '$\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc$: القطر الثانوي يُطرح.', '$\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc$: the other diagonal subtracts.'),
    'sarrus-sign': say('Sarrus: diagonal nagusiaren norabideko hiru biderkadurak batu, eta besteak kendu.', 'Sarrus: se suman los tres productos en el sentido de la diagonal principal y se restan los otros.', 'ساروس: تُجمع الحواصل الثلاثة في اتجاه القطر الرئيسي وتُطرح الأخرى.', 'Sarrus: add the three products along the main diagonal and subtract the others.'),
    'scalar-power': say('$k$ zenbakia errenkada bakoitzetik ateratzen da: $|kA|=k^n|A|$.', 'La $k$ sale de cada fila: $|kA|=k^n|A|$.', 'يخرج $k$ من كل صف: $|kA|=k^n|A|$.', 'The $k$ comes out of every row: $|kA|=k^n|A|$.'),
    'sum-det': say('Biderkaduraren determinantea bai, $|AB|=|A||B|$; baturarena, ez.', 'El del producto sí, $|AB|=|A||B|$; el de la suma, no.', 'محدد الجداء نعم $|AB|=|A||B|$، أما محدد المجموع فلا.', 'For a product yes, $|AB|=|A||B|$; for a sum, no.'),
    'cofactor-sign': say('$A_{ij}=(-1)^{i+j}M_{ij}$: begiratu zeinuen taula.', '$A_{ij}=(-1)^{i+j}M_{ij}$: mira el tablero de signos.', '$A_{ij}=(-1)^{i+j}M_{ij}$: انظر إلى لوحة الإشارات.', '$A_{ij}=(-1)^{i+j}M_{ij}$: look at the sign board.'),
    'swap-sign': say('Truke bakoitzak zeinua aldatzen du.', 'Cada cambio de filas cambia el signo.', 'كل تبديل لصفين يغيّر الإشارة.', 'Every swap of rows changes the sign.'),
    'scaled-row': say('$E_2$ errenkada 2 zenbakiaz biderkatu da: determinantea ere bai.', 'La fila $E_2$ se ha multiplicado por 2: el determinante también.', 'ضُرب الصف $E_2$ في 2: والمحدد أيضًا.', 'Row $E_2$ has been multiplied by 2: so has the determinant.'),
    'expansion-entry': say('$|A|=a_{i1}A_{i1}+a_{i2}A_{i2}+\\dots$: elementua bider adjuntua.', '$|A|=a_{i1}A_{i1}+a_{i2}A_{i2}+\\dots$: elemento por adjunto.', '$|A|=a_{i1}A_{i1}+a_{i2}A_{i2}+\\dots$: العنصر في متممه.', '$|A|=a_{i1}A_{i1}+a_{i2}A_{i2}+\\dots$: entry times cofactor.'),
    'no-transpose': say('$A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$: iraultzea ez ahaztu.', '$A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$: no olvides trasponer.', '$A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$: لا تنسَ النقل.', '$A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$: do not forget to transpose.'),
    'one-minor': say('Menore bat 0 bada, begiratu besteak: bat 0 ez bada, heina 2 da.', 'Si un menor vale 0, mira los demás: si alguno no es 0, el rango es 2.', 'إذا كان محدد أصغر صفرًا فانظر إلى الأخرى: إذا كان أحدها غير صفري فالرتبة 2.', 'If one minor is 0, look at the others: if any is not 0, the rank is 2.'),
    'one-root': say('$m^2=c$ ekuazioak bi erro ditu: $m=\\sqrt{c}$ eta $m=-\\sqrt{c}$.', '$m^2=c$ tiene dos raíces: $m=\\sqrt{c}$ y $m=-\\sqrt{c}$.', 'للمعادلة $m^2=c$ جذران: $m=\\sqrt{c}$ و$m=-\\sqrt{c}$.', '$m^2=c$ has two roots: $m=\\sqrt{c}$ and $m=-\\sqrt{c}$.'),
    'inverse-det': say('$|A|\\cdot|A^{-1}|=1$: $|A^{-1}|=\\frac{1}{|A|}$.', '$|A|\\cdot|A^{-1}|=1$: $|A^{-1}|=\\frac{1}{|A|}$.', '$|A|\\cdot|A^{-1}|=1$: $|A^{-1}|=\\frac{1}{|A|}$.', '$|A|\\cdot|A^{-1}|=1$: $|A^{-1}|=\\frac{1}{|A|}$.')
}

type Built = Omit<WorkedCase<DeterminanteakDetectiveError>, 'options'>

const work = (formula: string, eu: string, es: string, ar: string, en: string) => say(`${eu} $${formula}$.`, `${es} $${formula}$.`, `${ar} $${formula}$.`, `${en} $${formula}$.`)
const ask = (eu: string, es: string, ar: string, en: string) => say(eu, es, ar, en)

function build(random: Random, error: DeterminanteakDetectiveError): Built | null {
    switch (error) {
        case 'diagonal-sum': {
            const a = randomGrid(random, 2)
            const [[p, q], [r, s]] = a
            const right = p * s - q * r
            const reached = p * s + q * r
            return {
                problem: work(vm(a), 'Kalkulatu', 'Calcula', 'احسب', 'Work out'),
                lines: [line(LABELS.step, `${vm(a)}=${bracket(p)}\\cdot ${bracket(s)}+${bracket(q)}\\cdot ${bracket(r)}`), line(LABELS.step, `=${p * s}+${bracket(q * r)}`), line(LABELS.result, `|A|=${reached}`)],
                wrong: 0, error, fix: `${vm(a)}=${bracket(p)}\\cdot ${bracket(s)}-${bracket(q)}\\cdot ${bracket(r)}=${right}`, right, reached
            }
        }
        case 'sarrus-sign': {
            const a = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => pick(random, [0, 1, 2, 3, -1])))
            const { plus, minus } = sarrusTerms(a)
            const P = plus.reduce((sum, item) => sum + item, 0)
            const M = minus.reduce((sum, item) => sum + item, 0)
            if (M === 0) return null
            return {
                problem: work(vm(a), 'Kalkulatu Sarrusen erregelarekin', 'Calcula con la regla de Sarrus', 'احسب بقاعدة ساروس', 'Work out with Sarrus\' rule'),
                lines: [line(LABELS.step, `${plus.map(bracket).join('+')}=${P}`), line(LABELS.step, `${minus.map(bracket).join('+')}=${M}`), line(LABELS.result, `|A|=${bracket(P)}+${bracket(M)}=${P + M}`)],
                wrong: 2, error, fix: `|A|=${bracket(P)}-${bracket(M)}=${P - M}`, right: P - M, reached: P + M
            }
        }
        case 'scalar-power': {
            const n = pick(random, [2, 3])
            const k = pick(random, [2, 3])
            const d = pick(random, [2, 3, 5, -2, -4])
            return {
                problem: ask(`$A$ matrizea ${n}. ordenakoa da, eta $|A|=${d}$. Kalkulatu $|${k}A|$.`, `$A$ es de orden ${n} y $|A|=${d}$. Calcula $|${k}A|$.`, `$A$ من الرتبة ${n} و$|A|=${d}$. احسب $|${k}A|$.`, `$A$ is of order ${n} and $|A|=${d}$. Work out $|${k}A|$.`),
                lines: [line(LABELS.data, `n=${n},\\ |A|=${d}`), line(LABELS.step, `|${k}A|=${k}\\cdot|A|`), line(LABELS.result, `|${k}A|=${k * d}`)],
                wrong: 1, error, fix: `|${k}A|=${k}^${n}\\cdot ${bracket(d)}=${k ** n * d}`, right: k ** n * d, reached: k * d
            }
        }
        case 'sum-det': {
            const a = pick(random, UNIMODULAR)
            const b = randomGrid(random, 2)
            const sum = a.map((row, i) => row.map((item, j) => item + b[i][j]))
            const right = detOf(sum)
            const reached = detOf(a) + detOf(b)
            return {
                problem: ask(`$A=${pm(a)}$ eta $B=${pm(b)}$. Kalkulatu $|A+B|$.`, `$A=${pm(a)}$ y $B=${pm(b)}$. Calcula $|A+B|$.`, `$A=${pm(a)}$ و$B=${pm(b)}$. احسب $|A+B|$.`, `$A=${pm(a)}$ and $B=${pm(b)}$. Work out $|A+B|$.`),
                lines: [line(LABELS.step, `|A|=${detOf(a)}`), line(LABELS.step, `|B|=${detOf(b)}`), line(LABELS.result, `|A+B|=${detOf(a)}+${bracket(detOf(b))}=${reached}`)],
                wrong: 2, error, fix: `|A+B|=${vm(sum)}=${right}`, right, reached
            }
        }
        case 'cofactor-sign': {
            const a = randomGrid(random, 3)
            const [i, j] = pick(random, [[0, 1], [1, 0], [1, 2], [2, 1]])
            const m = value(minor(a, i, j))
            if (m === 0) return null
            const rest = a.filter((_, r) => r !== i).map((row) => row.filter((_, c) => c !== j))
            const name = `${i + 1}${j + 1}`
            return {
                problem: ask(`$A=${pm(a)}$. Kalkulatu $A_{${name}}$ adjuntua.`, `$A=${pm(a)}$. Calcula el adjunto $A_{${name}}$.`, `$A=${pm(a)}$. احسب المتمم الجبري $A_{${name}}$.`, `$A=${pm(a)}$. Work out the cofactor $A_{${name}}$.`),
                lines: [line(LABELS.step, `M_{${name}}=${vm(rest)}=${m}`), line(LABELS.step, `A_{${name}}=M_{${name}}`), line(LABELS.result, `A_{${name}}=${m}`)],
                wrong: 1, error, fix: `A_{${name}}=(-1)^${i + j + 2}\\cdot ${bracket(m)}=${value(cofactor(a, i, j))}`, right: value(cofactor(a, i, j)), reached: m
            }
        }
        case 'swap-sign': {
            const d = pick(random, [2, 3, 4, 5, -3])
            const k = pick(random, [2, 3, 4])
            const [i, j] = pick(random, [[1, 2], [1, 3], [2, 3]])
            const other = 6 - i - j
            return {
                problem: ask(`$|A|=${d}$. $B$ matrizea lortzeko, $E_${i}$ eta $E_${j}$ trukatu dira, eta $E_${other}$ errenkada ${k} zenbakiaz biderkatu da. Kalkulatu $|B|$.`, `$|A|=${d}$. Para obtener $B$ se cambian $E_${i}$ y $E_${j}$ y se multiplica $E_${other}$ por ${k}. Calcula $|B|$.`, `$|A|=${d}$. للحصول على $B$ نبدّل $E_${i}$ و$E_${j}$ ونضرب $E_${other}$ في ${k}. احسب $|B|$.`, `$|A|=${d}$. To get $B$, $E_${i}$ and $E_${j}$ are swapped and $E_${other}$ is multiplied by ${k}. Work out $|B|$.`),
                lines: [line(LABELS.step, `E_${i}\\leftrightarrow E_${j}\\ \\to\\ ${d}`), line(LABELS.step, `${k}E_${other}\\ \\to\\ ${k}\\cdot ${bracket(d)}`), line(LABELS.result, `|B|=${k * d}`)],
                wrong: 0, error, fix: `E_${i}\\leftrightarrow E_${j}\\ \\to\\ ${-d},\\ |B|=${k}\\cdot ${bracket(-d)}=${-k * d}`, right: -k * d, reached: k * d
            }
        }
        case 'scaled-row': {
            const d = pick(random, [2, 3, 4, 5, -3, -2])
            const k = pick(random, [2, 3])
            const [i, j] = pick(random, [[2, 1], [3, 1], [3, 2], [1, 3]])
            return {
                problem: ask(`$|A|=${d}$. $B$ matrizean, $E_${i}$ errenkadaren ordez $${k}E_${i}-E_${j}$ dago. Kalkulatu $|B|$.`, `$|A|=${d}$. En $B$, la fila $E_${i}$ se cambia por $${k}E_${i}-E_${j}$. Calcula $|B|$.`, `$|A|=${d}$. في $B$ يُستبدل بالصف $E_${i}$ الصفُّ $${k}E_${i}-E_${j}$. احسب $|B|$.`, `$|A|=${d}$. In $B$, row $E_${i}$ is replaced by $${k}E_${i}-E_${j}$. Work out $|B|$.`),
                lines: [line(LABELS.data, `E_${i}\\to ${k}E_${i}-E_${j}`), line(LABELS.step, '|B|=|A|'), line(LABELS.result, `|B|=${d}`)],
                wrong: 1, error, fix: `|B|=${k}\\cdot ${bracket(d)}=${k * d}`, right: k * d, reached: d
            }
        }
        case 'expansion-entry': {
            const j = randomInt(random, 0, 2)
            const i = randomInt(random, 0, 2)
            const entry = pick(random, [2, 3, -2, 4])
            const a = Array.from({ length: 3 }, (_, r) => Array.from({ length: 3 }, (_, c) => (c === j ? (r === i ? entry : 0) : small(random))))
            const c = value(cofactor(a, i, j))
            if (c === 0) return null
            const name = `A_{${i + 1}${j + 1}}`
            return {
                problem: work(vm(a), `Garatu ${j + 1}. zutabearen arabera:`, `Desarrolla por la columna ${j + 1}:`, `انشر حسب العمود ${j + 1}:`, `Expand along column ${j + 1}:`),
                lines: [line(LABELS.step, `${name}=${c}`), line(LABELS.step, `|A|=${name}`), line(LABELS.result, `|A|=${c}`)],
                wrong: 1, error, fix: `|A|=${bracket(entry)}\\cdot ${name}=${bracket(entry)}\\cdot ${bracket(c)}=${entry * c}`, right: entry * c, reached: c
            }
        }
        case 'no-transpose': {
            const a = pick(random, UNIMODULAR)
            if (a[0][1] === a[1][0]) return null
            const adj = [[a[1][1], -a[1][0]], [-a[0][1], a[0][0]]]
            const inverse = [[a[1][1], -a[0][1]], [-a[1][0], a[0][0]]]
            return {
                problem: ask(`Kalkulatu $A=${pm(a)}$ matrizearen alderantzizkoa, adjuntuekin.`, `Calcula con adjuntos la inversa de $A=${pm(a)}$.`, `احسب بالمتممات الجبرية معكوس $A=${pm(a)}$.`, `Work out with cofactors the inverse of $A=${pm(a)}$.`),
                lines: [line(LABELS.step, `|A|=${detOf(a)}`), line(LABELS.step, `\\operatorname{Adj}(A)=${pm(adj)}`), line(LABELS.result, `A^{-1}=\\operatorname{Adj}(A)=${pm(adj)}`)],
                wrong: 2, error, fix: `A^{-1}=(\\operatorname{Adj}A)^t=${pm(inverse)}`, right: inverse[0][1], reached: adj[0][1]
            }
        }
        case 'one-minor': {
            const p = pick(random, [1, 2, -1])
            const k = pick(random, [2, 3, -2])
            const s = small(random)
            const t = k * s + pick(random, [1, 2, -1, 3])
            const e1 = [p, 2 * p, s]
            const e2 = [k * p, 2 * k * p, t]
            const e3 = e1.map((item, c) => item + e2[c])
            const rows = [e1, e2, e3]
            if (detOf(rows) !== 0) return null
            const zero = [[e1[0], e1[1]], [e2[0], e2[1]]]
            const other = [[e1[0], e1[2]], [e2[0], e2[2]]]
            return {
                problem: ask(`Kalkulatu $${pm(rows)}$ matrizearen heina, menoreekin.`, `Halla con menores el rango de $${pm(rows)}$.`, `أوجد بالمحددات الصغرى رتبة $${pm(rows)}$.`, `Find with minors the rank of $${pm(rows)}$.`),
                lines: [line(LABELS.step, '|A|=0'), line(LABELS.step, `${vm(zero)}=0`), line(LABELS.result, '\\operatorname{rg}(A)=1')],
                wrong: 2, error, fix: `${vm(other)}=${detOf(other)}\\neq 0\\ \\to\\ \\operatorname{rg}(A)=2`, right: 2, reached: 1
            }
        }
        case 'one-root': {
            const c = pick(random, [1, 2, 3, 4])
            const [x, y] = pick(random, [[c, c], [1, c * c], [c * c, 1]])
            const matrix = `\\begin{pmatrix}m&${x}\\\\${y}&m\\end{pmatrix}`
            return {
                problem: ask(`Zein $m$ baliotarako ez du alderantzizkorik $${matrix}$ matrizeak?`, `¿Para qué valores de $m$ no tiene inversa $${matrix}$?`, `لأي قيم لـ $m$ ليس لـ $${matrix}$ معكوس؟`, `For which values of $m$ does $${matrix}$ have no inverse?`),
                lines: [line(LABELS.step, `|A|=m^2-${c * c}`), line(LABELS.step, `m^2=${c * c}`), line(LABELS.result, `m=${c}`)],
                wrong: 2, error, fix: `m=${c},\\ m=-${c}`, right: 2, reached: 1
            }
        }
        case 'inverse-det': {
            const d = pick(random, [2, 4, 5, -2, 8])
            return {
                problem: ask(`$|A|=${d}$. Kalkulatu $|A^{-1}|$.`, `$|A|=${d}$. Calcula $|A^{-1}|$.`, `$|A|=${d}$. احسب $|A^{-1}|$.`, `$|A|=${d}$. Work out $|A^{-1}|$.`),
                lines: [line(LABELS.data, `AA^{-1}=I`), line(LABELS.step, '|A^{-1}|=-|A|'), line(LABELS.result, `|A^{-1}|=${-d}`)],
                wrong: 1, error, fix: `|A^{-1}|=\\frac{1}{|A|}=${d < 0 ? '-' : ''}\\frac{1}{${Math.abs(d)}}`, right: 1 / d, reached: -d
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createDeterminanteakDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, determinanteakDetectiveLevels[levelIndex], DETERMINANTEAK_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}

