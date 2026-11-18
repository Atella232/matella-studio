import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { detValue, systemLatex } from '../../batx2-zientziak-sistemak/system.ts'

/* ==========================================================================
   J3 · Sistemen detektibea (Gizarte Zientziak): a worked solution of
   three lines with one wrong line, the mistakes of this unit. Level 1
   (Gauss): a row operation done on the left side only, a last row 0z = k
   read as many solutions, three bundles called inconsistent because there
   are more equations than unknowns. Level 2 (Rouché and Cramer): rg(A*)
   taken equal to rg(A), B in the wrong column, Cramer upside down.
   Level 3 (discussion and statements): dividing by a − 1 for every a,
   «twice» the other way round, «less than» the other way round.
   `right` and `reached` only tell the cases apart.
   ========================================================================== */

export type GizarteSystemsDetectiveError =
    | 'one-side'
    | 'last-row'
    | 'count-equations'
    | 'rank-star'
    | 'cramer-column'
    | 'cramer-upside'
    | 'divide-parameter'
    | 'twice-reversed'
    | 'less-reversed'

export const gizarteSystemsDetectiveLevels: GizarteSystemsDetectiveError[][] = [
    ['one-side', 'last-row', 'count-equations'],
    ['rank-star', 'cramer-column', 'cramer-upside'],
    ['divide-parameter', 'twice-reversed', 'less-reversed']
]

export const GIZARTE_SYSTEMS_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
const vm = (rows: number[][]) => `\\begin{vmatrix}${rows.map((row) => row.join('&')).join('\\\\')}\\end{vmatrix}`
const rg = (star = false) => `\\operatorname{rg}(A${star ? '^*' : ''})`

export const gizarteSystemsDetectiveNames: Record<GizarteSystemsDetectiveError, LocalizedText> = {
    'one-side': say('Eragiketa ezkerreko aldean bakarrik egin du', 'Hizo la operación solo en el lado izquierdo', 'أجرى العملية على الطرف الأيسر فقط', 'Did the operation on the left side only'),
    'last-row': say('$0z=k$ infinitu soluzio gisa irakurri du', 'Leyó $0z=k$ como infinitas soluciones', 'قرأ $0z=k$ على أنها حلول لا نهائية', 'Read $0z=k$ as infinitely many solutions'),
    'count-equations': say('Ekuazioak zenbatu ditu, heinak begiratu gabe', 'Contó ecuaciones sin mirar los rangos', 'عدّ المعادلات دون النظر إلى الرتب', 'Counted equations without looking at the ranks'),
    'rank-star': say('$\\operatorname{rg}(A^*)$ eta $\\operatorname{rg}(A)$ berdintzat hartu ditu', 'Tomó $\\operatorname{rg}(A^*)$ igual que $\\operatorname{rg}(A)$', 'اعتبر $\\operatorname{rg}(A^*)$ مساويًا لـ $\\operatorname{rg}(A)$', 'Took $\\operatorname{rg}(A^*)$ to be $\\operatorname{rg}(A)$'),
    'cramer-column': say('$B$ beste zutabe batean jarri du', 'Puso $B$ en otra columna', 'وضع $B$ في عمود آخر', 'Put $B$ in another column'),
    'cramer-upside': say('Cramerren zatiketa alderantziz egin du', 'Hizo la división de Cramer al revés', 'قلب قسمة كرامر', 'Did Cramer\'s division upside down'),
    'divide-parameter': say('$a-1$ zenbakiaz zatitu du, $a=1$ aztertu gabe', 'Dividió entre $a-1$ sin estudiar $a=1$', 'قسم على $a-1$ دون دراسة $a=1$', 'Divided by $a-1$ without studying $a=1$'),
    'twice-reversed': say('«Bikoitza» alderantziz idatzi du', 'Escribió «el doble» al revés', 'كتب «الضعف» بالعكس', 'Wrote «twice» the other way round'),
    'less-reversed': say('«Baino gutxiago» alderantziz idatzi du', 'Escribió «menos que» al revés', 'كتب «أقل من» بالعكس', 'Wrote «less than» the other way round')
}

export const gizarteSystemsDetectiveTips: Record<GizarteSystemsDetectiveError, LocalizedText> = {
    'one-side': say('Errenkada baten eragiketa ekuazio osoan egiten da, eskuineko zenbakia barne.', 'La operación de fila va en toda la ecuación, también el número de la derecha.', 'عملية الصف تشمل المعادلة كلها، والعدد الأيمن أيضًا.', 'A row operation goes on the whole equation, the number on the right too.'),
    'last-row': say('$0z=k$ eta $k\\neq 0$: ezinezkoa da, sistema bateraezina.', '$0z=k$ con $k\\neq 0$: es imposible, incompatible.', '$0z=k$ مع $k\\neq 0$: مستحيل، غير متوافق.', '$0z=k$ with $k\\neq 0$: impossible, inconsistent.'),
    'count-equations': say('Ekuazio gehiago egoteak ez du esan nahi bateraezina denik: konparatu heinak.', 'Más ecuaciones no quiere decir incompatible: compara los rangos.', 'كثرة المعادلات لا تعني عدم التوافق: قارن الرتب.', 'More equations does not mean inconsistent: compare the ranks.'),
    'rank-star': say('Orlatu $A$ matrizearen menorea $B$ zutabearekin: 0 ez bada, $\\operatorname{rg}(A^*)$ igotzen da.', 'Orla el menor de $A$ con la columna $B$: si no es 0, $\\operatorname{rg}(A^*)$ sube.', 'طوّق المحدد الأصغر لـ $A$ بالعمود $B$: إذا لم يكن 0 ترتفع $\\operatorname{rg}(A^*)$.', 'Border the minor of $A$ with the column $B$: if it is not 0, $\\operatorname{rg}(A^*)$ goes up.'),
    'cramer-column': say('$|A_x|$: $B$ zutabea $x$ ezezagunaren zutabean.', '$|A_x|$: la columna $B$ en la de $x$.', '$|A_x|$: العمود $B$ مكان عمود $x$.', '$|A_x|$: the column $B$ in that of $x$.'),
    'cramer-upside': say('$x=\\frac{|A_x|}{|A|}$: $|A|$ beti behean.', '$x=\\frac{|A_x|}{|A|}$: $|A|$ siempre abajo.', '$x=\\frac{|A_x|}{|A|}$: $|A|$ دائمًا في المقام.', '$x=\\frac{|A_x|}{|A|}$: $|A|$ always below.'),
    'divide-parameter': say('Zatitu aurretik, aztertu aparte zatitzailea 0 egiten duen balioa.', 'Antes de dividir, estudia aparte el valor que anula el divisor.', 'قبل القسمة ادرس على حدة القيمة التي تعدم المقسوم عليه.', 'Before dividing, study apart the value that makes the divisor 0.'),
    'twice-reversed': say('Egiaztatu zenbaki batekin: A 5 bada, B 10 da.', 'Compruébalo con un número: si A es 5, B es 10.', 'تحقق بعدد: إذا كان A يساوي 5 فإن B يساوي 10.', 'Check with a number: if A is 5, B is 10.'),
    'less-reversed': say('Gutxiago dena da bestea ken zenbakia.', 'Lo que es menos es lo otro menos el número.', 'الأقل هو الآخر ناقص العدد.', 'The smaller one is the other one minus the number.')
}

type Built = Omit<WorkedCase<GizarteSystemsDetectiveError>, 'options'>

const solveCases = (system: string) => say(`Ebatzi $${system}$.`, `Resuelve $${system}$.`, `حُلّ $${system}$.`, `Solve $${system}$.`)
const classifyCases = (system: string) => say(`Sailkatu $${system}$.`, `Clasifica $${system}$.`, `صنّف $${system}$.`, `Classify $${system}$.`)

function build(random: Random, error: GizarteSystemsDetectiveError): Built | null {
    switch (error) {
        case 'one-side': {
            const k = randomInt(random, 2, 3)
            const s = randomInt(random, 3, 8)
            const t = randomInt(random, 10, 30)
            const a = [[1, 1], [k, k + 1]]
            const right = t - k * s
            return {
                problem: solveCases(systemLatex(a, [s, t], ['x', 'y'])),
                lines: [line(LABELS.step, `E_2-${k}E_1`), line(LABELS.step, `y=${t}`), line(LABELS.result, `y=${t},\\ x=${s - t}`)],
                wrong: 1, error, fix: `y=${t}-${k}\\cdot ${s}=${right}`, right, reached: t
            }
        }
        case 'last-row': {
            const k = pick(random, [2, 3, 5, -4])
            const a = randomInt(random, 2, 9)
            const b = randomInt(random, 1, 6)
            return {
                problem: classifyCases(`\\begin{cases}x+y+z=${a}\\\\ y+z=${b}\\\\ 0z=${k}\\end{cases}`),
                lines: [line(LABELS.data, `0z=${k}`), line(LABELS.step, `${rg()}=2,\\ ${rg(true)}=2`), line(LABELS.result, `${rg()}=${rg(true)}<3`)],
                wrong: 1, error, fix: `0z=${k}\\neq 0\\ \\to\\ ${rg(true)}=3\\neq ${rg()}`, right: 3, reached: 2
            }
        }
        case 'count-equations': {
            const prices = [randomInt(random, 1, 6), randomInt(random, 1, 6)]
            const q = [[2, 1], [1, 1], [randomInt(random, 1, 4), randomInt(random, 1, 4)]]
            const totals = q.map((row) => row[0] * prices[0] + row[1] * prices[1])
            return {
                problem: classifyCases(systemLatex(q, totals, ['x', 'y'])),
                lines: [line(LABELS.data, '3>2'), line(LABELS.step, `${rg(true)}=3`), line(LABELS.result, `${rg()}=2\\neq ${rg(true)}`)],
                wrong: 1, error, fix: `|A^*|=0\\ \\to\\ ${rg(true)}=2,\\ x=${prices[0]},\\ y=${prices[1]}`, right: 2, reached: 3
            }
        }
        case 'rank-star': {
            const r1 = [1, randomInt(random, 1, 3), randomInt(random, 0, 2)]
            const r2 = [randomInt(random, 0, 2), 1, randomInt(random, 1, 3)]
            if (r1[0] * r2[1] - r1[1] * r2[0] === 0) return null
            const r3 = r1.map((value, k) => value + r2[k])
            const b = [randomInt(random, 1, 6), randomInt(random, 1, 6)]
            const b3 = b[0] + b[1] + pick(random, [1, 2, -1])
            const bordered = detValue([[r1[0], r1[1], b[0]], [r2[0], r2[1], b[1]], [r3[0], r3[1], b3]])
            if (bordered === 0) return null
            return {
                problem: classifyCases(systemLatex([r1, r2, r3], [...b, b3])),
                lines: [line(LABELS.step, `|A|=0,\\ ${rg()}=2`), line(LABELS.step, `${rg(true)}=2`), line(LABELS.result, `${rg()}=${rg(true)}=2<3`)],
                wrong: 1, error, fix: `${vm([[r1[0], r1[1], b[0]], [r2[0], r2[1], b[1]], [r3[0], r3[1], b3]])}=${bordered}\\neq 0\\ \\to\\ ${rg(true)}=3`, right: 3, reached: 2
            }
        }
        case 'cramer-column': {
            const a = [[randomInt(random, 1, 4), randomInt(random, 1, 3)], [randomInt(random, 1, 3), -randomInt(random, 1, 3)]]
            const solution = [randomInt(random, 1, 5), randomInt(random, 1, 5)]
            if (solution[0] === solution[1]) return null
            const b = a.map((row) => row[0] * solution[0] + row[1] * solution[1])
            const d = a[0][0] * a[1][1] - a[0][1] * a[1][0]
            if (d === 0) return null
            const wrongAx = [[a[0][0], b[0]], [a[1][0], b[1]]]
            const dy = detValue(wrongAx)
            return {
                problem: solveCases(systemLatex(a, b, ['x', 'y'])),
                lines: [line(LABELS.step, `|A|=${d}`), line(LABELS.step, `|A_x|=${vm(wrongAx)}=${dy}`), line(LABELS.result, `x=\\frac{${dy}}{${d}}`)],
                wrong: 1, error, fix: `|A_x|=${vm([[b[0], a[0][1]], [b[1], a[1][1]]])}=${solution[0] * d},\\ x=${solution[0]}`, right: solution[0], reached: dy / d
            }
        }
        case 'cramer-upside': {
            const a = [[2, 1], [1, randomInt(random, 2, 4)]]
            const solution = [randomInt(random, 2, 5), randomInt(random, 1, 4)]
            const b = a.map((row) => row[0] * solution[0] + row[1] * solution[1])
            const d = detValue(a)
            const dx = solution[0] * d
            return {
                problem: solveCases(systemLatex(a, b, ['x', 'y'])),
                lines: [line(LABELS.step, `|A|=${d}`), line(LABELS.step, `|A_x|=${dx}`), line(LABELS.result, `x=\\frac{${d}}{${dx}}`)],
                wrong: 2, error, fix: `x=\\frac{|A_x|}{|A|}=\\frac{${dx}}{${d}}=${solution[0]}`, right: solution[0], reached: d / dx
            }
        }
        case 'divide-parameter': {
            const c = randomInt(random, 1, 5)
            return {
                problem: say(`Eztabaidatu $\\begin{cases}x+y=1\\\\ x+ay=${1 + c}\\end{cases}$, $a$ parametroaren arabera.`, `Discute $\\begin{cases}x+y=1\\\\ x+ay=${1 + c}\\end{cases}$ según $a$.`, `ناقش $\\begin{cases}x+y=1\\\\ x+ay=${1 + c}\\end{cases}$ حسب $a$.`, `Discuss $\\begin{cases}x+y=1\\\\ x+ay=${1 + c}\\end{cases}$ according to $a$.`),
                lines: [line(LABELS.step, `E_2-E_1:\\ (a-1)y=${c}`), line(LABELS.step, `y=\\frac{${c}}{a-1}\\ \\ \\forall a`), line(LABELS.result, `x=1-\\frac{${c}}{a-1}`)],
                wrong: 1, error, fix: `a=1:\\ 0y=${c}\\ \\to\\ ${rg(true)}=2\\neq ${rg()}=1`, right: 1, reached: 0
            }
        }
        case 'twice-reversed': {
            const x = randomInt(random, 2, 9)
            const total = 3 * x
            return {
                problem: say(`${total} mila euro bi fondotan: B fondoan A fondoan bezainbeste bider bi. Zenbat doa A fondora?`, `${total} mil euros en dos fondos: en B, el doble que en A. ¿Cuánto va a A?`, `${total} ألف يورو في صندوقين: في B ضعف ما في A. كم يذهب إلى A؟`, `${total} thousand euros in two funds: twice as much in B as in A. How much goes to A?`),
                lines: [line(LABELS.data, `x+y=${total}`), line(LABELS.step, 'x=2y'), line(LABELS.result, `x=${2 * x}`)],
                wrong: 1, error, fix: `y=2x\\ \\to\\ 3x=${total},\\ x=${x}`, right: x, reached: 2 * x
            }
        }
        case 'less-reversed': {
            const n = pick(random, [2, 4, 6])
            const y = randomInt(random, 2, 8)
            const x = y + n
            const total = x + y
            return {
                problem: say(`${total} kilo kafe eta te saldu dira, eta kafea baino ${n} kilo te gutxiago. Zenbat kilo kafe?`, `Se venden ${total} kilos de café y té, con ${n} kilos menos de té que de café. ¿Cuántos kilos de café?`, `بيع ${total} كيلوغرامًا من القهوة والشاي، والشاي أقل من القهوة بـ ${n} كيلوغرامات. كم كيلوغرامًا من القهوة؟`, `${total} kilos of coffee and tea are sold, with ${n} kilos less tea than coffee. How many kilos of coffee?`),
                lines: [line(LABELS.data, `x+y=${total}`), line(LABELS.step, `x=y-${n}`), line(LABELS.result, `x=${(total - n) / 2}`)],
                wrong: 1, error, fix: `y=x-${n}\\ \\to\\ 2x=${total + n},\\ x=${x}`, right: x, reached: (total - n) / 2
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createGizarteSystemsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, gizarteSystemsDetectiveLevels[levelIndex], GIZARTE_SYSTEMS_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}
