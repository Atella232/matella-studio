import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { augmentedLatex, matrixLatex } from '../matrix.ts'

/* ==========================================================================
   J5 · Matrizeen detektibea (Detective de matrices): a worked solution of
   three lines with one wrong line, the mistakes of this unit. Level 1
   (operations): an entry of AB with only one product, (A + B)² with 2AB,
   kA with one row multiplied, A² entry by entry. Level 2 (rank and
   inverse): the rows counted without reducing, dividing by m − c for
   every m, the inverse as the reciprocal of each entry, a Gauss–Jordan
   operation done on the left part only. Level 3 (equations): A⁻¹ on the
   wrong side, A + 1 instead of A + I, cancelling A without an inverse,
   (AB)⁻¹ = A⁻¹B⁻¹. `right` and `reached` only tell the cases apart.
   ========================================================================== */

export type MatrizeakDetectiveError =
    | 'one-product'
    | 'square-binomial'
    | 'scalar-one-row'
    | 'power-entrywise'
    | 'rows-counted'
    | 'divide-parameter'
    | 'inverse-entrywise'
    | 'left-only'
    | 'wrong-side'
    | 'factor-one'
    | 'cancel'
    | 'inverse-order'

export const matrizeakDetectiveLevels: MatrizeakDetectiveError[][] = [
    ['one-product', 'square-binomial', 'scalar-one-row', 'power-entrywise'],
    ['rows-counted', 'divide-parameter', 'inverse-entrywise', 'left-only'],
    ['wrong-side', 'factor-one', 'cancel', 'inverse-order']
]

export const MATRIZEAK_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

type Grid = number[][]
const pm = (rows: Grid) => matrixLatex(rows)
const mul = (a: Grid, b: Grid): Grid => a.map((row) => b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)))
const plus = (a: Grid, b: Grid): Grid => a.map((row, i) => row.map((value, j) => value + b[i][j]))
const times = (k: number, a: Grid): Grid => a.map((row) => row.map((value) => k * value))
/** 2 × 2 matrices with determinant 1: their inverses are whole numbers */
const UNIMODULAR: Grid[] = [[[2, 1], [1, 1]], [[3, 1], [2, 1]], [[1, 2], [1, 3]], [[2, 3], [1, 2]], [[3, 2], [1, 1]], [[1, 1], [1, 2]], [[2, 5], [1, 3]], [[3, 1], [5, 2]]]
const inverse2 = ([[a, b], [c, d]]: Grid): Grid => {
    const det = a * d - b * c
    return [[d / det, -b / det], [-c / det, a / det]]
}
const small = (random: Random) => pick(random, [-3, -2, -1, 1, 2, 3, 4])
const randomGrid = (random: Random): Grid => [[small(random), small(random)], [small(random), small(random)]]

/** A matrix of LaTeX cells, for entries that are not numbers (3^2, m+1) */
const cells = (rows: string[][]) => `\\begin{pmatrix}${rows.map((row) => row.join('&')).join('\\\\')}\\end{pmatrix}`
/** A signed term of a row operation: -2E_1, +E_2 */
const opTerm = (factor: number, row: number) => (factor === 0 ? '' : `${factor < 0 ? '-' : '+'}${Math.abs(factor) === 1 ? '' : Math.abs(factor)}E_${row}`)
/** x + c as LaTeX: m-3, m+2, m */
const shifted = (name: string, c: number) => (c === 0 ? name : `${name}${c < 0 ? '-' : '+'}${Math.abs(c)}`)
const work = (formula: string, eu: string, es: string, ar: string, en: string) => say(`${eu} $${formula}$.`, `${es} $${formula}$.`, `${ar} $${formula}$.`, `${en} $${formula}$.`)

export const matrizeakDetectiveNames: Record<MatrizeakDetectiveError, LocalizedText> = {
    'one-product': say('Biderkadura bakar bat hartu du, ez errenkada bider zutabe osoa', 'Tomó un solo producto, no la fila entera por la columna', 'أخذ جداءً واحدًا لا الصف كله في العمود', 'Took a single product, not the whole row by the column'),
    'square-binomial': say('$AB=BA$ balitz bezala garatu du $(A+B)^2$', 'Desarrolló $(A+B)^2$ como si $AB=BA$', 'فكّ $(A+B)^2$ كأن $AB=BA$', 'Expanded $(A+B)^2$ as if $AB=BA$'),
    'scalar-one-row': say('Zenbakiaz errenkada bat bakarrik biderkatu du', 'Multiplicó por el número una sola fila', 'ضرب صفًّا واحدًا فقط في العدد', 'Multiplied only one row by the number'),
    'power-entrywise': say('$A^2$ kalkulatzeko, elementu bakoitza karratura jaso du', 'Calculó $A^2$ elevando cada elemento al cuadrado', 'حسب $A^2$ برفع كل عنصر إلى القوة الثانية', 'Worked out $A^2$ by squaring each entry'),
    'rows-counted': say('Errenkadak zenbatu ditu, mailakatu gabe', 'Contó las filas sin escalonar', 'عدّ الصفوف دون التحويل إلى الشكل الدرجي', 'Counted the rows without reducing'),
    'divide-parameter': say('Parametroa duen adierazpen batez zatitu du, balio kritikoa aztertu gabe', 'Dividió entre una expresión con el parámetro sin estudiar el valor crítico', 'قسم على عبارة فيها الوسيط دون دراسة القيمة الحرجة', 'Divided by an expression with the parameter without studying the critical value'),
    'inverse-entrywise': say('Alderantzizkoa elementu bakoitzaren alderantzizkoa dela uste du', 'Tomó como inversa el inverso de cada elemento', 'اعتبر المعكوس مقلوب كل عنصر', 'Took the reciprocal of each entry as the inverse'),
    'left-only': say('Eragiketa ezkerreko zatian bakarrik egin du', 'Hizo la operación solo en la parte izquierda', 'أجرى العملية في الجزء الأيسر فقط', 'Did the operation on the left part only'),
    'wrong-side': say('$A^{-1}$ alde okerretik biderkatu du', 'Multiplicó por $A^{-1}$ por el lado equivocado', 'ضرب في $A^{-1}$ من الجهة الخاطئة', 'Multiplied by $A^{-1}$ on the wrong side'),
    'factor-one': say('$A+I$ idatzi beharrean $A+1$ idatzi du', 'Escribió $A+1$ en lugar de $A+I$', 'كتب $A+1$ بدل $A+I$', 'Wrote $A+1$ instead of $A+I$'),
    'cancel': say('$A$ sinplifikatu du, alderantzizkorik ez duenean', 'Simplificó $A$ sin que tenga inversa', 'اختصر $A$ مع أنها ليس لها معكوس', 'Cancelled $A$ although it has no inverse'),
    'inverse-order': say('$(AB)^{-1}$ ordena aldatu gabe idatzi du', 'Escribió $(AB)^{-1}$ sin cambiar el orden', 'كتب $(AB)^{-1}$ دون تغيير الترتيب', 'Wrote $(AB)^{-1}$ without changing the order')
}

export const matrizeakDetectiveTips: Record<MatrizeakDetectiveError, LocalizedText> = {
    'one-product': say('$c_{ij}$ elementua $i$ errenkada bider $j$ zutabea da: biderkadura guztiak batu behar dira.', '$c_{ij}$ es la fila $i$ por la columna $j$: hay que sumar todos los productos.', '$c_{ij}$ هو الصف $i$ في العمود $j$: يجب جمع كل الحواصل.', '$c_{ij}$ is row $i$ times column $j$: all the products must be added.'),
    'square-binomial': say('$(A+B)^2=A^2+AB+BA+B^2$: $AB$ eta $BA$ desberdinak izan ohi dira.', '$(A+B)^2=A^2+AB+BA+B^2$: $AB$ y $BA$ suelen ser distintas.', '$(A+B)^2=A^2+AB+BA+B^2$: عادةً $AB$ و$BA$ مختلفتان.', '$(A+B)^2=A^2+AB+BA+B^2$: $AB$ and $BA$ are usually different.'),
    'scalar-one-row': say('$kA$ matrizean, $k$ zenbakiak elementu guztiak biderkatzen ditu.', 'En $kA$, $k$ multiplica todos los elementos.', 'في $kA$ يضرب $k$ كل العناصر.', 'In $kA$, $k$ multiplies every entry.'),
    'power-entrywise': say('$A^2=A\\cdot A$, errenkada bider zutabe.', '$A^2=A\\cdot A$, fila por columna.', '$A^2=A\\cdot A$، صفًّا في عمود.', '$A^2=A\\cdot A$, row by column.'),
    'rows-counted': say('Heina zeroz osatuta ez dauden errenkadak dira, mailakatu ondoren.', 'El rango son las filas que no son de ceros, después de escalonar.', 'الرتبة عدد الصفوف التي ليست أصفارًا بعد التحويل.', 'The rank is the rows that are not all zeros, after reducing.'),
    'divide-parameter': say('Zatitu aurretik, aztertu aparte adierazpena zero egiten duen balioa.', 'Antes de dividir, estudia aparte el valor que anula la expresión.', 'قبل القسمة ادرس على حدة القيمة التي تعدم العبارة.', 'Before dividing, study separately the value that makes the expression zero.'),
    'inverse-entrywise': say('Alderantzizkoak $AA^{-1}=I$ bete behar du: egiaztatu biderkatuz.', 'La inversa tiene que cumplir $AA^{-1}=I$: compruébalo multiplicando.', 'يجب أن يحقق المعكوس $AA^{-1}=I$: تحقق بالضرب.', 'The inverse must satisfy $AA^{-1}=I$: check it by multiplying.'),
    'left-only': say('Eragiketa errenkada osoan egiten da, $I$ zatian ere.', 'La operación se hace en la fila entera, también en la parte de $I$.', 'تُجرى العملية على الصف كله، وفي جزء $I$ أيضًا.', 'The operation is done on the whole row, the $I$ part too.'),
    'wrong-side': say('$AX=B$ bada, $A^{-1}$ ezkerretik: $X=A^{-1}B$.', 'Si $AX=B$, $A^{-1}$ va por la izquierda: $X=A^{-1}B$.', 'إذا كان $AX=B$ يوضع $A^{-1}$ من اليسار: $X=A^{-1}B$.', 'If $AX=B$, $A^{-1}$ goes on the left: $X=A^{-1}B$.'),
    'factor-one': say('$X=IX$; beraz, $AX+X=(A+I)X$.', 'Como $X=IX$, $AX+X=(A+I)X$.', 'بما أن $X=IX$ فإن $AX+X=(A+I)X$.', 'As $X=IX$, $AX+X=(A+I)X$.'),
    'cancel': say('$A$ sinplifikatzeko $A^{-1}$ behar da; heina maximoa ez bada, ez dago.', 'Para simplificar $A$ hace falta $A^{-1}$; si el rango no es máximo, no existe.', 'لاختصار $A$ يلزم $A^{-1}$؛ وإذا لم تكن الرتبة عظمى فهو غير موجود.', 'To cancel $A$ you need $A^{-1}$; if the rank is not full, there is none.'),
    'inverse-order': say('$(AB)^{-1}=B^{-1}A^{-1}$: ordena aldatzen da.', '$(AB)^{-1}=B^{-1}A^{-1}$: el orden cambia.', '$(AB)^{-1}=B^{-1}A^{-1}$: يتغيّر الترتيب.', '$(AB)^{-1}=B^{-1}A^{-1}$: the order changes.')
}

type Built = Omit<WorkedCase<MatrizeakDetectiveError>, 'options'>

const given = (names: string, eu: string, es: string, ar: string, en: string) => say(`${eu} ${names}.`, `${es} ${names}.`, `${ar} ${names}.`, `${en} ${names}.`)
const pair = (a: Grid, b: Grid) => `$A=${pm(a)}$, $B=${pm(b)}$`

function build(random: Random, error: MatrizeakDetectiveError): Built | null {
    switch (error) {
        case 'one-product': {
            const a = randomGrid(random)
            const b = randomGrid(random)
            const right = mul(a, b)[0][0]
            const reached = a[0][0] * b[0][0]
            return {
                problem: given(pair(a, b), 'Kalkulatu $AB$ matrizearen $c_{11}$ elementua,', 'Calcula el elemento $c_{11}$ de $AB$ con', 'احسب العنصر $c_{11}$ من $AB$ مع', 'Work out the entry $c_{11}$ of $AB$ with'),
                lines: [line(LABELS.data, `\\begin{pmatrix}${a[0][0]}&${a[0][1]}\\end{pmatrix},\\ \\begin{pmatrix}${b[0][0]}\\\\${b[1][0]}\\end{pmatrix}`), line(LABELS.step, `c_{11}=${a[0][0]}\\cdot ${b[0][0] < 0 ? `(${b[0][0]})` : b[0][0]}`), line(LABELS.result, `c_{11}=${reached}`)],
                wrong: 1, error, fix: `c_{11}=${a[0][0]}\\cdot ${b[0][0] < 0 ? `(${b[0][0]})` : b[0][0]}+${a[0][1]}\\cdot ${b[1][0] < 0 ? `(${b[1][0]})` : b[1][0]}=${right}`.replace(/\+-/g, '-'), right, reached
            }
        }
        case 'square-binomial': {
            const a = randomGrid(random)
            const b = randomGrid(random)
            const ab = mul(a, b)
            const ba = mul(b, a)
            const rightM = plus(plus(mul(a, a), plus(ab, ba)), mul(b, b))
            const wrongM = plus(plus(mul(a, a), times(2, ab)), mul(b, b))
            if (rightM[0][0] === wrongM[0][0]) return null
            return {
                problem: given(pair(a, b), 'Kalkulatu $(A+B)^2$,', 'Calcula $(A+B)^2$ con', 'احسب $(A+B)^2$ مع', 'Work out $(A+B)^2$ with'),
                lines: [line(LABELS.step, '(A+B)^2=A^2+2AB+B^2'), line(LABELS.step, `2AB=${pm(times(2, ab))}`), line(LABELS.result, `(A+B)^2=${pm(wrongM)}`)],
                wrong: 0, error, fix: `(A+B)^2=A^2+AB+BA+B^2=${pm(rightM)}`, right: rightM[0][0], reached: wrongM[0][0]
            }
        }
        case 'scalar-one-row': {
            const a = randomGrid(random)
            const k = pick(random, [2, 3, -2, 4])
            const wrongM = [a[0].map((value) => k * value), [...a[1]]]
            if (a[1][0] === 0 || k * a[1][0] === a[1][0]) return null
            return {
                problem: work(`${k}A,\\ A=${pm(a)}`, 'Kalkulatu', 'Calcula', 'احسب', 'Work out'),
                lines: [line(LABELS.step, `${k}A=${pm(wrongM)}`), line(LABELS.step, `a_{21}=${a[1][0]}`), line(LABELS.result, `(${k}A)_{21}=${a[1][0]}`)],
                wrong: 0, error, fix: `${k}A=${pm(times(k, a))}`, right: k * a[1][0], reached: a[1][0]
            }
        }
        case 'power-entrywise': {
            const a = randomGrid(random)
            const square = mul(a, a)
            const wrongM = a.map((row) => row.map((value) => value * value))
            if (square[0][0] === wrongM[0][0]) return null
            return {
                problem: work(`A^2,\\ A=${pm(a)}`, 'Kalkulatu', 'Calcula', 'احسب', 'Work out'),
                lines: [line(LABELS.step, `A^2=${cells(a.map((row) => row.map((value) => (value < 0 ? `(${value})^2` : `${value}^2`))))}`), line(LABELS.step, `A^2=${pm(wrongM)}`), line(LABELS.result, `(A^2)_{11}=${wrongM[0][0]}`)],
                wrong: 0, error, fix: `A^2=A\\cdot A=${pm(square)}`, right: square[0][0], reached: wrongM[0][0]
            }
        }
        case 'rows-counted': {
            const first = [1, randomInt(random, -2, 3), randomInt(random, -2, 3)]
            const second = [0, 1, randomInt(random, -3, 3)]
            const p = pick(random, [2, 3, -1])
            const q = pick(random, [1, 2, -2])
            const third = first.map((value, j) => p * value + q * second[j])
            const m = [first, second.map((value, j) => value + 2 * first[j]), third]
            return {
                problem: work(`\\operatorname{rg}${pm(m)}`, 'Kalkulatu', 'Calcula', 'احسب', 'Work out'),
                lines: [line(LABELS.step, `E_2-2E_1\\ \\to\\ ${pm([first, second, third])}`), line(LABELS.step, `E_3${opTerm(-p, 1)}${opTerm(-q, 2)}\\ \\to\\ (0\\ \\ 0\\ \\ 0)`), line(LABELS.result, '\\operatorname{rg}=3')],
                wrong: 2, error, fix: '\\operatorname{rg}=2', right: 2, reached: 3
            }
        }
        case 'divide-parameter': {
            const c = pick(random, [2, 3, 4, -1, -2])
            const b = pick(random, [1, 2, 3])
            return {
                problem: work(`\\operatorname{rg}${cells([['1', String(b)], ['1', shifted('m', b - c)]])}`, 'Aztertu, $m$ parametroaren arabera:', 'Estudia según $m$:', 'ادرس حسب $m$:', 'Study for the values of $m$:'),
                lines: [line(LABELS.step, `E_2-E_1\\ \\to\\ (0\\ \\ ${shifted('m', -c)})`), line(LABELS.step, `\\frac{1}{${shifted('m', -c)}}E_2\\ \\to\\ (0\\ \\ 1)`), line(LABELS.result, '\\operatorname{rg}=2')],
                wrong: 1, error, fix: `m=${c}\\ \\to\\ \\operatorname{rg}=1`, right: 1, reached: 2
            }
        }
        case 'inverse-entrywise': {
            const a = pick(random, UNIMODULAR)
            const inv = inverse2(a)
            const reciprocal = (value: number) => (value === 1 ? '1' : `\\frac{1}{${value}}`)
            return {
                problem: work(`A=${pm(a)}`, 'Aurkitu alderantzizkoa:', 'Halla la inversa de', 'أوجد معكوس', 'Find the inverse of'),
                lines: [line(LABELS.data, `(A\\mid I)=${augmentedLatex(a, [[1, 0], [0, 1]])}`), line(LABELS.step, `A^{-1}=\\begin{pmatrix}${reciprocal(a[0][0])}&${reciprocal(a[0][1])}\\\\${reciprocal(a[1][0])}&${reciprocal(a[1][1])}\\end{pmatrix}`), line(LABELS.result, `(A^{-1})_{11}=${reciprocal(a[0][0])}`)],
                wrong: 1, error, fix: `A^{-1}=${pm(inv)}`, right: inv[0][0], reached: 1 / a[0][0]
            }
        }
        case 'left-only': {
            const k = pick(random, [2, 3, -2, 4, -3])
            const a = [[1, k], [0, 1]]
            return {
                problem: work(`${pm(a)}`, 'Aurkitu alderantzizkoa Gauss-Jordan metodoaz:', 'Halla por Gauss-Jordan la inversa de', 'أوجد بطريقة غاوس-جوردان معكوس', 'Find by Gauss–Jordan the inverse of'),
                lines: [line(LABELS.data, augmentedLatex(a, [[1, 0], [0, 1]])), line(LABELS.step, `E_1${k < 0 ? '+' : '-'}${Math.abs(k)}E_2\\ \\to\\ ${augmentedLatex([[1, 0], [0, 1]], [[1, 0], [0, 1]])}`), line(LABELS.result, 'A^{-1}=I')],
                wrong: 1, error, fix: augmentedLatex([[1, 0], [0, 1]], [[1, -k], [0, 1]]), right: -k, reached: 0
            }
        }
        case 'wrong-side': {
            const a = pick(random, UNIMODULAR)
            const b = randomGrid(random)
            const inv = inverse2(a)
            const rightM = mul(inv, b)
            const wrongM = mul(b, inv)
            if (rightM[0][0] === wrongM[0][0]) return null
            return {
                problem: given(pair(a, b), 'Ebatzi $AX=B$,', 'Resuelve $AX=B$ con', 'حُلّ $AX=B$ مع', 'Solve $AX=B$ with'),
                lines: [line(LABELS.step, 'X=BA^{-1}'), line(LABELS.step, `A^{-1}=${pm(inv)}`), line(LABELS.result, `X=${pm(wrongM)}`)],
                wrong: 0, error, fix: `X=A^{-1}B=${pm(rightM)}`, right: rightM[0][0], reached: wrongM[0][0]
            }
        }
        case 'factor-one': {
            const a = randomGrid(random)
            if (a[0][1] === -1) return null
            return {
                problem: work(`AX+X=B,\\ A=${pm(a)}`, 'Askatu $X$:', 'Despeja $X$:', 'استخرج $X$:', 'Solve for $X$:'),
                lines: [line(LABELS.step, '(A+1)X=B'), line(LABELS.step, `A+1=${pm(a.map((row) => row.map((value) => value + 1)))}`), line(LABELS.result, 'X=(A+1)^{-1}B')],
                wrong: 0, error, fix: `(A+I)X=B,\\ A+I=${pm(plus(a, [[1, 0], [0, 1]]))}`, right: a[0][1], reached: a[0][1] + 1
            }
        }
        case 'cancel': {
            const k = pick(random, [1, 2, 3])
            const t = pick(random, [1, 2, -1])
            const u = pick(random, [1, -2, 2])
            const a = [[k, k], [k, k]]
            const b = [[1, 0], [0, 1]]
            const c = [[1 - t, -u], [t, 1 + u]]
            if (JSON.stringify(mul(a, b)) !== JSON.stringify(mul(a, c))) return null
            return {
                problem: say(`$A=${pm(a)}$, $B=${pm(b)}$ eta $C=${pm(c)}$. $AB=AC$ betetzen da. $B=C$ al da?`, `$A=${pm(a)}$, $B=${pm(b)}$ y $C=${pm(c)}$ cumplen $AB=AC$. ¿Es $B=C$?`, `$A=${pm(a)}$ و$B=${pm(b)}$ و$C=${pm(c)}$ تحقق $AB=AC$. هل $B=C$؟`, `$A=${pm(a)}$, $B=${pm(b)}$ and $C=${pm(c)}$ satisfy $AB=AC$. Is $B=C$?`),
                lines: [line(LABELS.data, `AB=${pm(mul(a, b))}=AC`), line(LABELS.step, 'A^{-1}AB=A^{-1}AC'), line(LABELS.result, 'B=C')],
                wrong: 1, error, fix: `\\operatorname{rg}(A)=1\\ \\to\\ B\\neq C`, right: 0, reached: 1
            }
        }
        case 'inverse-order': {
            const a = pick(random, UNIMODULAR)
            const b = pick(random, UNIMODULAR)
            const rightM = mul(inverse2(b), inverse2(a))
            const wrongM = mul(inverse2(a), inverse2(b))
            if (rightM[0][0] === wrongM[0][0]) return null
            return {
                problem: given(pair(a, b), 'Kalkulatu $(AB)^{-1}$,', 'Calcula $(AB)^{-1}$ con', 'احسب $(AB)^{-1}$ مع', 'Work out $(AB)^{-1}$ with'),
                lines: [line(LABELS.step, '(AB)^{-1}=A^{-1}B^{-1}'), line(LABELS.step, `A^{-1}=${pm(inverse2(a))},\\ B^{-1}=${pm(inverse2(b))}`), line(LABELS.result, `(AB)^{-1}=${pm(wrongM)}`)],
                wrong: 0, error, fix: `(AB)^{-1}=B^{-1}A^{-1}=${pm(rightM)}`, right: rightM[0][0], reached: wrongM[0][0]
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createMatrizeakDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, matrizeakDetectiveLevels[levelIndex], MATRIZEAK_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}

