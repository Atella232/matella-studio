import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { matrixLatex } from '../../batx2-zientziak-matrizeak/matrix.ts'

/* ==========================================================================
   J3 · Matrizeen detektibea (Gizarte Zientziak): a worked solution of
   three lines with one wrong line, the mistakes of this unit. Level 1
   (tables and prices): a_ij read column first, a product done entry by
   entry, a shop's total with a column of Q instead of its row, the unit
   costs subtracted from the income. Level 2 (chains and operations): BA
   instead of AB, 2Q with one row doubled, a transpose written as a turn.
   Level 3 (matrix form and equations): the coefficients written by
   columns, A⁻¹ on the wrong side, A instead of A⁻¹, A + 1 instead of
   A + I. `right` and `reached` only tell the cases apart.
   ========================================================================== */

export type GizarteDetectiveError =
    | 'row-column'
    | 'entrywise'
    | 'column-not-row'
    | 'cost-after'
    | 'chain-order'
    | 'scalar-one-row'
    | 'transpose-turn'
    | 'system-columns'
    | 'wrong-side'
    | 'times-not-inverse'
    | 'factor-one'

export const gizarteDetectiveLevels: GizarteDetectiveError[][] = [
    ['row-column', 'entrywise', 'column-not-row', 'cost-after'],
    ['chain-order', 'scalar-one-row', 'transpose-turn'],
    ['system-columns', 'wrong-side', 'times-not-inverse', 'factor-one']
]

export const GIZARTE_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

type Grid = number[][]
const pm = (rows: Grid) => matrixLatex(rows)
const col = (values: number[]) => matrixLatex(values.map((value) => [value]))
const mul = (a: Grid, b: Grid): Grid => a.map((row) => b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)))
/** 2 × 2 matrices with determinant 1: their inverses are whole numbers */
const UNIMODULAR: Grid[] = [[[2, 1], [1, 1]], [[3, 1], [2, 1]], [[1, 2], [1, 3]], [[2, 3], [1, 2]], [[3, 2], [1, 1]], [[1, 1], [1, 2]], [[2, 5], [1, 3]], [[3, 1], [5, 2]]]
const inverse2 = ([[a, b], [c, d]]: Grid): Grid => [[d, -b], [-c, a]]
const amount = (random: Random) => randomInt(random, 2, 12)
const price = (random: Random) => randomInt(random, 2, 9)
const quantities = (random: Random, rows: number, columns: number): Grid => Array.from({ length: rows }, () => Array.from({ length: columns }, () => amount(random)))

export const gizarteDetectiveNames: Record<GizarteDetectiveError, LocalizedText> = {
    'row-column': say('Lehenik zutabea irakurri du, gero errenkada', 'Leyó primero la columna y después la fila', 'قرأ العمود أولًا ثم الصف', 'Read the column first, then the row'),
    entrywise: say('Laukiz lauki biderkatu du, ez errenkada bider zutabe', 'Multiplicó casilla a casilla, no fila por columna', 'ضرب خانةً في خانة لا صفًّا في عمود', 'Multiplied cell by cell, not row by column'),
    'column-not-row': say('Dendaren guztizkoa zutabe batekin kalkulatu du, ez haren errenkadarekin', 'Calculó el total de la tienda con una columna, no con su fila', 'حسب مجموع المتجر بعمود لا بصفّه', 'Worked out the shop\'s total with a column, not with its row'),
    'cost-after': say('Unitateko kostuak kendu dizkio diru-sarrerari, kopuruez biderkatu gabe', 'Restó al ingreso los costes por unidad sin multiplicarlos por las cantidades', 'طرح من الإيراد تكاليف الوحدة دون ضربها في الكميات', 'Subtracted the unit costs from the income without multiplying them by the quantities'),
    'chain-order': say('$BA$ egin du, katearen ordena $AB$ izanik', 'Hizo $BA$ cuando el orden de la cadena es $AB$', 'حسب $BA$ مع أن ترتيب السلسلة $AB$', 'Did $BA$ when the order of the chain is $AB$'),
    'scalar-one-row': say('$2Q$ matrizean errenkada bat bakarrik bikoiztu du', 'En $2Q$ duplicó una sola fila', 'في $2Q$ ضاعف صفًّا واحدًا فقط', 'In $2Q$ it doubled only one row'),
    'transpose-turn': say('Matrizea biratu du, errenkadak zutabe bihurtu beharrean', 'Giró la matriz en lugar de pasar las filas a columnas', 'أدار المصفوفة بدل جعل الصفوف أعمدة', 'Turned the matrix instead of making the rows columns'),
    'system-columns': say('Koefizienteak zutabeka idatzi ditu, ez ekuazioka', 'Escribió los coeficientes por columnas, no por ecuaciones', 'كتب المعاملات بالأعمدة لا بالمعادلات', 'Wrote the coefficients by columns, not by equations'),
    'wrong-side': say('$A^{-1}$ matrizeaz alde okerretik biderkatu du', 'Multiplicó por $A^{-1}$ por el lado equivocado', 'ضرب في $A^{-1}$ من الجهة الخطأ', 'Multiplied by $A^{-1}$ on the wrong side'),
    'times-not-inverse': say('$A$ matrizeaz biderkatu du, $A^{-1}$ matrizeaz beharrean', 'Multiplicó por $A$ en vez de por $A^{-1}$', 'ضرب في $A$ بدل $A^{-1}$', 'Multiplied by $A$ instead of $A^{-1}$'),
    'factor-one': say('$A+1$ idatzi du, $A+I$ beharrean', 'Escribió $A+1$ en vez de $A+I$', 'كتب $A+1$ بدل $A+I$', 'Wrote $A+1$ instead of $A+I$')
}

export const gizarteDetectiveTips: Record<GizarteDetectiveError, LocalizedText> = {
    'row-column': say('$a_{ij}$: $i$ errenkada (denda), $j$ zutabea (produktua).', '$a_{ij}$: fila $i$ (la tienda), columna $j$ (el producto).', '$a_{ij}$: الصف $i$ (المتجر) والعمود $j$ (المنتج).', '$a_{ij}$: row $i$ (the shop), column $j$ (the product).'),
    entrywise: say('$c_{ij}$ elementua $i$ errenkada bider $j$ zutabea da: biderkatu eta batu.', '$c_{ij}$ es la fila $i$ por la columna $j$: multiplica y suma.', '$c_{ij}$ هو الصف $i$ في العمود $j$: اضرب ثم اجمع.', '$c_{ij}$ is row $i$ times column $j$: multiply and add.'),
    'column-not-row': say('Denda baten datuak haren errenkadan daude.', 'Los datos de una tienda están en su fila.', 'بيانات المتجر في صفّه.', 'A shop\'s data are in its row.'),
    'cost-after': say('Irabazia $Q(V-C)$ da: kostuak ere kopuruez biderkatzen dira.', 'El beneficio es $Q(V-C)$: los costes también se multiplican por las cantidades.', 'الربح هو $Q(V-C)$: التكاليف أيضًا تُضرب في الكميات.', 'The profit is $Q(V-C)$: the costs are multiplied by the quantities too.'),
    'chain-order': say('Bezeroak → produktuak → piezak: lehen urratsaren matrizea ezkerrean.', 'Clientes → productos → piezas: la matriz del primer paso, a la izquierda.', 'الزبائن ← المنتجات ← القطع: مصفوفة الخطوة الأولى على اليسار.', 'Customers → products → parts: the matrix of the first step, on the left.'),
    'scalar-one-row': say('$kQ$ matrizean, $k$ zenbakiak elementu guztiak biderkatzen ditu.', 'En $kQ$, $k$ multiplica todos los elementos.', 'في $kQ$ يضرب $k$ كل العناصر.', 'In $kQ$, $k$ multiplies every entry.'),
    'transpose-turn': say('$Q^t$: lehen errenkada lehen zutabea da, ordena berean.', '$Q^t$: la primera fila es la primera columna, en el mismo orden.', '$Q^t$: الصف الأول هو العمود الأول بالترتيب نفسه.', '$Q^t$: the first row is the first column, in the same order.'),
    'system-columns': say('Errenkada bat ekuazio bakoitzeko: haren koefizienteak ordenan.', 'Una fila por ecuación, con sus coeficientes en orden.', 'صف لكل معادلة ومعاملاتها بالترتيب.', 'One row per equation, with its coefficients in order.'),
    'wrong-side': say('$AX=B$: $A$ ezkerrean dago, $X=A^{-1}B$.', '$AX=B$: $A$ está a la izquierda, $X=A^{-1}B$.', '$AX=B$: $A$ على اليسار، $X=A^{-1}B$.', '$AX=B$: $A$ is on the left, $X=A^{-1}B$.'),
    'times-not-inverse': say('Matrizeak ez dira zatitzen: alderantzizkoaz biderkatzen da.', 'Las matrices no se dividen: se multiplica por la inversa.', 'المصفوفات لا تُقسم: نضرب في المعكوس.', 'Matrices are not divided: you multiply by the inverse.'),
    'factor-one': say('$X=IX$: faktore komuna $A+I$ da, diagonalean bakarrik batzen da 1.', '$X=IX$: el factor común es $A+I$; el 1 solo se suma en la diagonal.', '$X=IX$: العامل المشترك $A+I$؛ يُضاف 1 على القطر فقط.', '$X=IX$: the common factor is $A+I$; the 1 is added on the diagonal only.')
}

type Built = Omit<WorkedCase<GizarteDetectiveError>, 'options'>
const shopsAndPrices = (q: Grid, v: number[]) => say(
    `$Q=${pm(q)}$ (dendak × produktuak) eta $V=${col(v)}$ (prezioak).`,
    `$Q=${pm(q)}$ (tiendas × productos) y $V=${col(v)}$ (precios).`,
    `$Q=${pm(q)}$ (المتاجر × المنتجات) و$V=${col(v)}$ (الأسعار).`,
    `$Q=${pm(q)}$ (shops × products) and $V=${col(v)}$ (prices).`
)
const join = (first: LocalizedText, second: LocalizedText) => say(`${first.eu} ${second.eu}`, `${first.es} ${second.es}`, `${first.ar} ${second.ar}`, `${first.en} ${second.en}`)

function build(random: Random, error: GizarteDetectiveError): Built | null {
    switch (error) {
        case 'row-column': {
            const q = quantities(random, 2, 3)
            if (q[1][0] === q[0][1]) return null
            return {
                problem: say(`$Q=${pm(q)}$ matrizean, dendak errenkadetan daude eta produktuak zutabeetan. Zenbat saldu du 2. dendak 1. produktutik?`, `En $Q=${pm(q)}$ las tiendas van en filas y los productos en columnas. ¿Cuánto vende la tienda 2 del producto 1?`, `في $Q=${pm(q)}$ المتاجر في الصفوف والمنتجات في الأعمدة. كم يبيع المتجر 2 من المنتج 1؟`, `In $Q=${pm(q)}$ the shops are in rows and the products in columns. How much does shop 2 sell of product 1?`),
                lines: [line(LABELS.data, `Q=${pm(q)}`), line(LABELS.step, 'a_{12}'), line(LABELS.result, `a_{12}=${q[0][1]}`)],
                wrong: 1, error, fix: `a_{21}=${q[1][0]}`, right: q[1][0], reached: q[0][1]
            }
        }
        case 'entrywise': {
            const q = quantities(random, 2, 2)
            const p = [[price(random), price(random)], [price(random), price(random)]]
            const right = mul(q, p)[0][0]
            const reached = q[0][0] * p[0][0]
            return {
                problem: say(`$Q=${pm(q)}$ (dendak × produktuak) eta $P=${pm(p)}$ (produktuak × hornitzaileak). Zenbat ordaintzen du 1. dendak 1. hornitzailearekin?`, `$Q=${pm(q)}$ (tiendas × productos) y $P=${pm(p)}$ (productos × proveedores). ¿Cuánto paga la tienda 1 con el proveedor 1?`, `$Q=${pm(q)}$ (المتاجر × المنتجات) و$P=${pm(p)}$ (المنتجات × الموردون). كم يدفع المتجر 1 مع المورد 1؟`, `$Q=${pm(q)}$ (shops × products) and $P=${pm(p)}$ (products × suppliers). How much does shop 1 pay with supplier 1?`),
                lines: [line(LABELS.step, 'QP'), line(LABELS.step, `QP=${pm(q.map((row, i) => row.map((value, j) => value * p[i][j])))}`), line(LABELS.result, `c_{11}=${reached}`)],
                wrong: 1, error, fix: `c_{11}=${q[0][0]}\\cdot ${p[0][0]}+${q[0][1]}\\cdot ${p[1][0]}=${right}`, right, reached
            }
        }
        case 'column-not-row': {
            const q = quantities(random, 2, 2)
            const v = [price(random), price(random)]
            if (q[0][1] === q[1][0]) return null
            const right = q[0][0] * v[0] + q[0][1] * v[1]
            const reached = q[0][0] * v[0] + q[1][0] * v[1]
            return {
                problem: join(shopsAndPrices(q, v), say('Zenbat jasotzen du 1. dendak?', '¿Cuánto ingresa la tienda 1?', 'كم إيراد المتجر 1؟', 'How much does shop 1 take in?')),
                lines: [line(LABELS.data, `Q=${pm(q)},\\ V=${col(v)}`), line(LABELS.step, `${q[0][0]}\\cdot ${v[0]}+${q[1][0]}\\cdot ${v[1]}`), line(LABELS.result, `${reached}`)],
                wrong: 1, error, fix: `${q[0][0]}\\cdot ${v[0]}+${q[0][1]}\\cdot ${v[1]}=${right}`, right, reached
            }
        }
        case 'cost-after': {
            const q = quantities(random, 2, 2)
            const c = [price(random), price(random)]
            const v = c.map((value) => value + randomInt(random, 1, 5))
            const income = mul(q, v.map((value) => [value])).map((row) => row[0])
            const wrongProfit = income.map((value, i) => value - c[i])
            const profit = mul(q, v.map((value, k) => [value - c[k]])).map((row) => row[0])
            return {
                problem: join(shopsAndPrices(q, v), say(`Kostuak $C=${col(c)}$ dira. Zenbat irabazten du 1. dendak?`, `Los costes son $C=${col(c)}$. ¿Cuánto gana la tienda 1?`, `التكاليف $C=${col(c)}$. كم ربح المتجر 1؟`, `The costs are $C=${col(c)}$. How much profit does shop 1 make?`)),
                lines: [line(LABELS.step, `QV=${col(income)}`), line(LABELS.step, `QV-C=${col(wrongProfit)}`), line(LABELS.result, `${wrongProfit[0]}`)],
                wrong: 1, error, fix: `Q(V-C)=${col(profit)}\\ \\to\\ ${profit[0]}`, right: profit[0], reached: wrongProfit[0]
            }
        }
        case 'chain-order': {
            const a = quantities(random, 2, 2)
            const b = [[randomInt(random, 1, 6), randomInt(random, 1, 6)], [randomInt(random, 1, 6), randomInt(random, 1, 6)]]
            const ab = mul(a, b)
            const ba = mul(b, a)
            return {
                problem: say(`$A=${pm(a)}$ (bezeroak × produktuak) eta $B=${pm(b)}$ (produktuak × piezak). Zenbat 1. pieza behar ditu 1. bezeroak?`, `$A=${pm(a)}$ (clientes × productos) y $B=${pm(b)}$ (productos × piezas). ¿Cuántas piezas 1 necesita el cliente 1?`, `$A=${pm(a)}$ (الزبائن × المنتجات) و$B=${pm(b)}$ (المنتجات × القطع). كم قطعة من النوع 1 يحتاج الزبون 1؟`, `$A=${pm(a)}$ (customers × products) and $B=${pm(b)}$ (products × parts). How many parts 1 does customer 1 need?`),
                lines: [line(LABELS.step, `BA=${pm(ba)}`), line(LABELS.step, '(BA)_{11}'), line(LABELS.result, `${ba[0][0]}`)],
                wrong: 0, error, fix: `AB=${pm(ab)}\\ \\to\\ ${ab[0][0]}`, right: ab[0][0], reached: ba[0][0]
            }
        }
        case 'scalar-one-row': {
            const q = quantities(random, 2, 2)
            const v = [price(random), price(random)]
            const half = [q[0].map((value) => 2 * value), [...q[1]]]
            const right = 2 * (q[1][0] * v[0] + q[1][1] * v[1])
            const reached = q[1][0] * v[0] + q[1][1] * v[1]
            return {
                problem: join(shopsAndPrices(q, v), say('Larunbatean ostiralean bezainbeste saltzen da. Zenbat jasotzen du 2. dendak bi egunetan?', 'El sábado se vende lo mismo que el viernes. ¿Cuánto ingresa la tienda 2 en los dos días?', 'يُباع يوم السبت ما بيع يوم الجمعة. كم إيراد المتجر 2 في اليومين؟', 'On Saturday they sell the same as on Friday. How much does shop 2 take in over the two days?')),
                lines: [line(LABELS.step, `2Q=${pm(half)}`), line(LABELS.step, `2QV=${col(mul(half, v.map((value) => [value])).map((row) => row[0]))}`), line(LABELS.result, `${reached}`)],
                wrong: 0, error, fix: `2Q=${pm(q.map((row) => row.map((value) => 2 * value)))}\\ \\to\\ ${right}`, right, reached
            }
        }
        case 'transpose-turn': {
            const q = quantities(random, 2, 3)
            const turned = [0, 1, 2].map((i) => [q[1][2 - i], q[0][2 - i]])
            const transposed = [0, 1, 2].map((i) => [q[0][i], q[1][i]])
            if (turned[0][1] === transposed[0][1]) return null
            return {
                problem: say(`$Q=${pm(q)}$ (dendak × produktuak). Idatzi $Q^t$ eta eman haren $(1,2)$ elementua.`, `$Q=${pm(q)}$ (tiendas × productos). Escribe $Q^t$ y da su elemento $(1,2)$.`, `$Q=${pm(q)}$ (المتاجر × المنتجات). اكتب $Q^t$ وأعطِ عنصرها $(1,2)$.`, `$Q=${pm(q)}$ (shops × products). Write $Q^t$ and give its entry $(1,2)$.`),
                lines: [line(LABELS.data, `Q=${pm(q)}`), line(LABELS.step, `Q^t=${pm(turned)}`), line(LABELS.result, `${turned[0][1]}`)],
                wrong: 1, error, fix: `Q^t=${pm(transposed)}\\ \\to\\ ${transposed[0][1]}`, right: transposed[0][1], reached: turned[0][1]
            }
        }
        case 'system-columns': {
            const a = pick(random, UNIMODULAR)
            const x = [randomInt(random, 1, 6), randomInt(random, 1, 6)]
            const b = mul(a, x.map((value) => [value])).map((row) => row[0])
            const at = [[a[0][0], a[1][0]], [a[0][1], a[1][1]]]
            if (at[0][1] === at[1][0]) return null
            const wrongX = mul(inverse2(at), b.map((value) => [value])).map((row) => row[0])
            const equation = (row: number[], value: number) => `${row[0] === 1 ? '' : row[0]}x+${row[1] === 1 ? '' : row[1]}y=${value}`
            return {
                problem: say(`Idatzi $${equation(a[0], b[0])}$, $${equation(a[1], b[1])}$ sistema $AX=B$ gisa, eta ebatzi.`, `Escribe $${equation(a[0], b[0])}$, $${equation(a[1], b[1])}$ como $AX=B$ y resuélvelo.`, `اكتب $${equation(a[0], b[0])}$، $${equation(a[1], b[1])}$ على الشكل $AX=B$ وحُلّه.`, `Write $${equation(a[0], b[0])}$, $${equation(a[1], b[1])}$ as $AX=B$ and solve it.`),
                lines: [line(LABELS.step, `A=${pm(at)}`), line(LABELS.step, `A^{-1}=${pm(inverse2(at))}`), line(LABELS.result, `x=${wrongX[0]}`)],
                wrong: 0, error, fix: `A=${pm(a)}\\ \\to\\ x=${x[0]}`, right: x[0], reached: wrongX[0]
            }
        }
        case 'wrong-side': {
            const a = pick(random, UNIMODULAR)
            const b = [[randomInt(random, 1, 5), randomInt(random, 0, 4)], [randomInt(random, 0, 4), randomInt(random, 1, 5)]]
            const right = mul(inverse2(a), b)
            const reached = mul(b, inverse2(a))
            return {
                problem: say(`Ebatzi $AX=B$, $A=${pm(a)}$ eta $B=${pm(b)}$ izanik, eta eman $x_{11}$.`, `Resuelve $AX=B$ con $A=${pm(a)}$ y $B=${pm(b)}$, y da $x_{11}$.`, `حُلّ $AX=B$ مع $A=${pm(a)}$ و$B=${pm(b)}$، وأعطِ $x_{11}$.`, `Solve $AX=B$ with $A=${pm(a)}$ and $B=${pm(b)}$, and give $x_{11}$.`),
                lines: [line(LABELS.step, 'X=BA^{-1}'), line(LABELS.step, `A^{-1}=${pm(inverse2(a))}`), line(LABELS.result, `X=${pm(reached)}`)],
                wrong: 0, error, fix: `X=A^{-1}B=${pm(right)}`, right: right[0][0], reached: reached[0][0]
            }
        }
        case 'times-not-inverse': {
            const a = pick(random, UNIMODULAR)
            const b = [[randomInt(random, 1, 5), randomInt(random, 0, 4)], [randomInt(random, 0, 4), randomInt(random, 1, 5)]]
            const right = mul(inverse2(a), b)
            const reached = mul(a, b)
            return {
                problem: say(`Ebatzi $AX=B$, $A=${pm(a)}$ eta $B=${pm(b)}$ izanik, eta eman $x_{11}$.`, `Resuelve $AX=B$ con $A=${pm(a)}$ y $B=${pm(b)}$, y da $x_{11}$.`, `حُلّ $AX=B$ مع $A=${pm(a)}$ و$B=${pm(b)}$، وأعطِ $x_{11}$.`, `Solve $AX=B$ with $A=${pm(a)}$ and $B=${pm(b)}$, and give $x_{11}$.`),
                lines: [line(LABELS.step, 'X=AB'), line(LABELS.step, `X=${pm(a)}${pm(b)}`), line(LABELS.result, `x_{11}=${reached[0][0]}`)],
                wrong: 0, error, fix: `X=A^{-1}B=${pm(inverse2(a))}${pm(b)}\\ \\to\\ x_{11}=${right[0][0]}`, right: right[0][0], reached: reached[0][0]
            }
        }
        case 'factor-one': {
            const m = pick(random, UNIMODULAR)
            const a = [[m[0][0] - 1, m[0][1]], [m[1][0], m[1][1] - 1]]
            const plusOne = a.map((row) => row.map((value) => value + 1))
            return {
                problem: say(`Ebatzi $AX+X=B$, $A=${pm(a)}$ izanik. Zein matrizek biderkatzen du $X$?`, `Resuelve $AX+X=B$ con $A=${pm(a)}$. ¿Qué matriz multiplica a $X$?`, `حُلّ $AX+X=B$ مع $A=${pm(a)}$. أي مصفوفة تضرب $X$؟`, `Solve $AX+X=B$ with $A=${pm(a)}$. Which matrix multiplies $X$?`),
                lines: [line(LABELS.step, '(A+1)X=B'), line(LABELS.step, `A+1=${pm(plusOne)}`), line(LABELS.result, `X=(A+1)^{-1}B`)],
                wrong: 0, error, fix: `(A+I)X=B,\\ A+I=${pm(m)}`, right: m[0][1], reached: plusOne[0][1]
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createGizarteDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, gizarteDetectiveLevels[levelIndex], GIZARTE_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}
