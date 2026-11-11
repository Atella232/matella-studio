import { pick, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { detValue, replaceColumn, systemLatex } from '../system.ts'

/* ==========================================================================
   J4 · Sistemen detektibea (Detective de sistemas): a worked solution of
   three lines with one wrong line. Level 1 (Rouché): the rank of A*
   without bordering with B, |A| = 0 read as «no solution», a homogeneous
   system called inconsistent, the rank taken as the number of equations.
   Level 2 (Cramer): x = |A|/|A_x|, B written as a row, B in the column of
   another unknown, the constants not moved across. Level 3 (discussion):
   one root of a² = c, dividing by a − 1 for every a, |A| = ad + bc, the b
   of a dependent system added instead of multiplied. `right` and
   `reached` only tell the cases apart.
   ========================================================================== */

export type SistemakDetectiveError =
    | 'border-forgotten' | 'det-zero-inconsistent' | 'homogeneous-inconsistent' | 'rows-counted'
    | 'inverted' | 'row-replaced' | 'wrong-column' | 'constant-sign'
    | 'missing-root' | 'divide-parameter' | 'det-plus' | 'proportional-b'

export const sistemakDetectiveLevels: SistemakDetectiveError[][] = [
    ['border-forgotten', 'det-zero-inconsistent', 'homogeneous-inconsistent', 'rows-counted'],
    ['inverted', 'row-replaced', 'wrong-column', 'constant-sign'],
    ['missing-root', 'divide-parameter', 'det-plus', 'proportional-b']
]

export const SISTEMAK_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

const vm = (rows: number[][]) => `\\begin{vmatrix}${rows.map((row) => row.join('&')).join('\\\\')}\\end{vmatrix}`
const small = (random: Random) => pick(random, [-3, -2, -1, 1, 2, 3])
const rg = (name: string, value: number) => `\\operatorname{rg}(${name})=${value}`

export const sistemakDetectiveNames: Record<SistemakDetectiveError, LocalizedText> = {
    'border-forgotten': say('$\\operatorname{rg}(A^*)$ eman du, $B$ zutabearekin orlatu gabe', 'Dio $\\operatorname{rg}(A^*)$ sin orlar con la columna $B$', 'أعطى $\\operatorname{rg}(A^*)$ دون التطويق بالعمود $B$', 'Gave $\\operatorname{rg}(A^*)$ without bordering with the column $B$'),
    'det-zero-inconsistent': say('$|A|=0$ denez, soluziorik ez dagoela esan du', 'Como $|A|=0$, dijo que no hay solución', 'بما أن $|A|=0$ قال إنه لا حل', 'As $|A|=0$, said there is no solution'),
    'homogeneous-inconsistent': say('Sistema homogeneo bat bateraezina dela esan du', 'Dijo que un homogéneo es incompatible', 'قال إن نظامًا متجانسًا غير متوافق', 'Said a homogeneous system is inconsistent'),
    'rows-counted': say('Heina ekuazio kopurua dela uste du', 'Tomó como rango el número de ecuaciones', 'اعتبر الرتبة عدد المعادلات', 'Took the rank to be the number of equations'),
    inverted: say('$|A|$ eta $|A_x|$ alderantziz jarri ditu', 'Puso $|A|$ y $|A_x|$ al revés', 'وضع $|A|$ و$|A_x|$ بالمقلوب', 'Put $|A|$ and $|A_x|$ the wrong way up'),
    'row-replaced': say('$B$ errenkada gisa jarri du, ez zutabe gisa', 'Puso $B$ como fila, no como columna', 'وضع $B$ صفًّا لا عمودًا', 'Put $B$ in as a row, not a column'),
    'wrong-column': say('$B$ beste ezezagun baten zutabean jarri du', 'Puso $B$ en la columna de otra incógnita', 'وضع $B$ في عمود مجهول آخر', 'Put $B$ in the column of another unknown'),
    'constant-sign': say('Gai askeak beste aldera pasatu ditu, zeinua aldatu gabe', 'Pasó los términos independientes sin cambiarles el signo', 'نقل الحدود الثابتة دون تغيير إشارتها', 'Moved the constants across without changing their sign'),
    'missing-root': say('$a^2=c$ ekuazioaren erro bakarra hartu du', 'Tomó una sola raíz de $a^2=c$', 'أخذ جذرًا واحدًا لـ $a^2=c$', 'Took only one root of $a^2=c$'),
    'divide-parameter': say('$a-1$ adierazpenaz zatitu du, $a=1$ aztertu gabe', 'Dividió entre $a-1$ sin estudiar $a=1$', 'قسم على $a-1$ دون دراسة $a=1$', 'Divided by $a-1$ without studying $a=1$'),
    'det-plus': say('Determinantean diagonalak batu ditu', 'Sumó las diagonales en el determinante', 'جمع القطرين في المحدد', 'Added the diagonals in the determinant'),
    'proportional-b': say('$b$ kalkulatzean, batu egin du, biderkatu beharrean', 'Para $b$ sumó en lugar de multiplicar', 'لحساب $b$ جمع بدل أن يضرب', 'For $b$, added instead of multiplying')
}

export const sistemakDetectiveTips: Record<SistemakDetectiveError, LocalizedText> = {
    'border-forgotten': say('$\\operatorname{rg}(A^*)$ kalkulatzeko, orlatu menorea $B$ zutabearekin.', 'Para $\\operatorname{rg}(A^*)$, orla el menor con la columna $B$.', 'لحساب $\\operatorname{rg}(A^*)$ طوّق المحدد الأصغر بالعمود $B$.', 'For $\\operatorname{rg}(A^*)$, border the minor with the column $B$.'),
    'det-zero-inconsistent': say('$|A|=0$ adierazpenak determinatua ez dela esaten du bakarrik: konparatu bi heinak.', '$|A|=0$ solo dice que no es determinado: compara los dos rangos.', '$|A|=0$ يقول فقط إنه غير محدد: قارن الرتبتين.', '$|A|=0$ only says it is not independent: compare both ranks.'),
    'homogeneous-inconsistent': say('Homogeneo batek beti du $(0,0,0)$ soluzioa.', 'Un homogéneo siempre tiene la solución $(0,0,0)$.', 'للمتجانس دائمًا الحل $(0,0,0)$.', 'A homogeneous system always has the solution $(0,0,0)$.'),
    'rows-counted': say('Heina 0 ez den menore handienak ematen du: begiratu $|A|$.', 'El rango lo da el mayor menor no nulo: mira $|A|$.', 'الرتبة يحددها أكبر محدد أصغر غير صفري: انظر إلى $|A|$.', 'The rank is given by the largest non-zero minor: look at $|A|$.'),
    inverted: say('$x=\\frac{|A_x|}{|A|}$.', '$x=\\frac{|A_x|}{|A|}$.', '$x=\\frac{|A_x|}{|A|}$.', '$x=\\frac{|A_x|}{|A|}$.'),
    'row-replaced': say('$B$ zutabe bat da: ezezagunaren zutabearen lekuan sartzen da.', '$B$ es una columna: entra en el lugar de la columna de la incógnita.', '$B$ عمود: يدخل مكان عمود المجهول.', '$B$ is a column: it goes in place of the column of the unknown.'),
    'wrong-column': say('$|A_y|$ determinantean, $B$ bigarren zutabean doa.', 'En $|A_y|$, $B$ va en la segunda columna.', 'في $|A_y|$ يوضع $B$ في العمود الثاني.', 'In $|A_y|$, $B$ goes in the second column.'),
    'constant-sign': say('Gai bat beste aldera pasatzean, zeinua aldatzen zaio.', 'Al pasar un término al otro lado, cambia de signo.', 'عند نقل حد إلى الطرف الآخر تتغير إشارته.', 'Moving a term to the other side changes its sign.'),
    'missing-root': say('$a^2=c$ ekuazioak bi erro ditu: $\\sqrt{c}$ eta $-\\sqrt{c}$.', '$a^2=c$ tiene dos raíces: $\\sqrt{c}$ y $-\\sqrt{c}$.', 'للمعادلة $a^2=c$ جذران: $\\sqrt{c}$ و$-\\sqrt{c}$.', '$a^2=c$ has two roots: $\\sqrt{c}$ and $-\\sqrt{c}$.'),
    'divide-parameter': say('Zatitu aurretik, aztertu aparte $a-1=0$ kasua.', 'Antes de dividir, estudia aparte el caso $a-1=0$.', 'قبل القسمة ادرس حالة $a-1=0$ على حدة.', 'Before dividing, study the case $a-1=0$ separately.'),
    'det-plus': say('$\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc$.', '$\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc$.', '$\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc$.', '$\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc$.'),
    'proportional-b': say('$E_2=kE_1$ bada, gai askea ere $k$ aldiz.', 'Si $E_2=kE_1$, el término independiente también va $k$ veces.', 'إذا كان $E_2=kE_1$ فالحد الثابت أيضًا $k$ مرات.', 'If $E_2=kE_1$, the constant term is $k$ times as well.')
}

type Built = Omit<WorkedCase<SistemakDetectiveError>, 'options'>

const solveIt = (latex: string) => say(`Sailkatu $${latex}$.`, `Clasifica $${latex}$.`, `صنّف $${latex}$.`, `Classify $${latex}$.`)
const cramerIt = (latex: string) => say(`Ebatzi Cramerren bidez $${latex}$.`, `Resuelve por Cramer $${latex}$.`, `حُلّ بطريقة كرامر $${latex}$.`, `Solve by Cramer $${latex}$.`)

/** Three rows with E3 = E1 + E2 in A, the constant of E3 off by `shift` */
function dependentThree(random: Random, shift: number): { a: number[][]; b: number[] } | null {
    const e1 = [small(random), small(random), small(random)]
    const e2 = [small(random), small(random), small(random)]
    const a = [e1, e2, e1.map((item, j) => item + e2[j])]
    const b = [small(random), small(random)]
    const full = [...b, b[0] + b[1] + shift]
    const minor = a[0][0] * a[1][1] - a[0][1] * a[1][0]
    if (minor === 0 || a[2].some((item) => Math.abs(item) > 6)) return null
    return { a, b: full }
}

function build(random: Random, error: SistemakDetectiveError): Built | null {
    switch (error) {
        case 'border-forgotten': {
            const made = dependentThree(random, pick(random, [1, 2, -1]))
            if (!made) return null
            const { a, b } = made
            const minor = [[a[0][0], a[0][1]], [a[1][0], a[1][1]]]
            const bordered = [[a[0][0], a[0][1], b[0]], [a[1][0], a[1][1], b[1]], [a[2][0], a[2][1], b[2]]]
            return {
                problem: solveIt(systemLatex(a, b)),
                lines: [line(LABELS.step, `|A|=0`), line(LABELS.step, `${vm(minor)}=${detValue(minor)}\\ \\to\\ ${rg('A', 2)}`), line(LABELS.result, `${rg('A^*', 2)}`)],
                wrong: 2, error, fix: `${vm(bordered)}=${detValue(bordered)}\\neq 0\\ \\to\\ ${rg('A^*', 3)}`, right: 3, reached: 2
            }
        }
        case 'det-zero-inconsistent': {
            const made = dependentThree(random, 0)
            if (!made) return null
            const { a, b } = made
            return {
                problem: solveIt(systemLatex(a, b)),
                lines: [line(LABELS.step, `|A|=0`), line(LABELS.step, `${rg('A^*', 3)}`), line(LABELS.result, '\\varnothing')],
                wrong: 1, error, fix: `E_3=E_1+E_2\\ \\to\\ ${rg('A', 2)},\\ ${rg('A^*', 2)}`, right: 2, reached: 3
            }
        }
        case 'homogeneous-inconsistent': {
            const made = dependentThree(random, 0)
            if (!made) return null
            const zero = [0, 0, 0]
            return {
                problem: solveIt(systemLatex(made.a, zero)),
                lines: [line(LABELS.data, 'B=0'), line(LABELS.step, '|A|=0'), line(LABELS.result, '\\varnothing')],
                wrong: 2, error, fix: `${rg('A', 2)}=${rg('A^*', 2)}<3`, right: 1, reached: 0
            }
        }
        case 'rows-counted': {
            const made = dependentThree(random, 0)
            if (!made) return null
            const { a, b } = made
            const minor = [[a[0][0], a[0][1]], [a[1][0], a[1][1]]]
            return {
                problem: say(`Kalkulatu $\\operatorname{rg}(A)$, $${systemLatex(a, b)}$ sisteman.`, `Calcula $\\operatorname{rg}(A)$ en $${systemLatex(a, b)}$.`, `احسب $\\operatorname{rg}(A)$ في $${systemLatex(a, b)}$.`, `Work out $\\operatorname{rg}(A)$ in $${systemLatex(a, b)}$.`),
                lines: [line(LABELS.data, 'm=3'), line(LABELS.step, rg('A', 3)), line(LABELS.result, rg('A^*', 3))],
                wrong: 1, error, fix: `|A|=0,\\ ${vm(minor)}=${detValue(minor)}\\neq 0\\ \\to\\ ${rg('A', 2)}`, right: 2, reached: 3
            }
        }
        case 'inverted': {
            const a = [[small(random), small(random)], [small(random), small(random)]]
            const s = [small(random), small(random)]
            const b = a.map((row) => row[0] * s[0] + row[1] * s[1])
            const d = detValue(a)
            const dx = detValue(replaceColumn(a, b, 0))
            if (d === 0 || dx === 0 || Math.abs(d) === Math.abs(dx)) return null
            return {
                problem: cramerIt(systemLatex(a, b)),
                lines: [line(LABELS.step, `|A|=${d}`), line(LABELS.step, `|A_x|=${dx}`), line(LABELS.result, `x=\\frac{${d}}{${dx}}`)],
                wrong: 2, error, fix: `x=\\frac{|A_x|}{|A|}=${s[0]}`, right: s[0], reached: d / dx
            }
        }
        case 'row-replaced': {
            const a = [[small(random), small(random)], [small(random), small(random)]]
            const s = [small(random), small(random)]
            const b = a.map((row) => row[0] * s[0] + row[1] * s[1])
            const d = detValue(a)
            const wrongRows = [[b[0], b[1]], [a[1][0], a[1][1]]]
            const reached = detValue(wrongRows)
            const right = detValue(replaceColumn(a, b, 0))
            if (d === 0 || reached === right) return null
            return {
                problem: cramerIt(systemLatex(a, b)),
                lines: [line(LABELS.step, `|A|=${d}`), line(LABELS.step, `|A_x|=${vm(wrongRows)}=${reached}`), line(LABELS.result, `x=\\frac{${reached}}{${d}}`)],
                wrong: 1, error, fix: `|A_x|=${vm(replaceColumn(a, b, 0))}=${right}`, right, reached
            }
        }
        case 'wrong-column': {
            const a = [[small(random), small(random)], [small(random), small(random)]]
            const s = [small(random), small(random)]
            const b = a.map((row) => row[0] * s[0] + row[1] * s[1])
            const d = detValue(a)
            const reached = detValue(replaceColumn(a, b, 0))
            const right = detValue(replaceColumn(a, b, 1))
            if (d === 0 || reached === right) return null
            return {
                problem: say(`Kalkulatu $y$ Cramerren bidez, $${systemLatex(a, b)}$ sisteman.`, `Calcula $y$ por Cramer en $${systemLatex(a, b)}$.`, `احسب $y$ بطريقة كرامر في $${systemLatex(a, b)}$.`, `Work out $y$ by Cramer in $${systemLatex(a, b)}$.`),
                lines: [line(LABELS.step, `|A|=${d}`), line(LABELS.step, `|A_y|=${vm(replaceColumn(a, b, 0))}=${reached}`), line(LABELS.result, `y=\\frac{${reached}}{${d}}`)],
                wrong: 1, error, fix: `|A_y|=${vm(replaceColumn(a, b, 1))}=${right}`, right, reached
            }
        }
        case 'constant-sign': {
            const p = pick(random, [2, 3, 1])
            const c1 = pick(random, [3, 4, 5])
            const c2 = pick(random, [1, 2, -2])
            const system = `\\begin{cases}${p === 1 ? '' : p}x+y-${c1}=0\\\\ x-y${c2 < 0 ? `-${-c2}` : `+${c2}`}=0\\end{cases}`
            return {
                problem: say(`Idatzi $B$ zutabea, $${system}$ sisteman.`, `Escribe la columna $B$ de $${system}$.`, `اكتب العمود $B$ للنظام $${system}$.`, `Write the column $B$ of $${system}$.`),
                lines: [line(LABELS.step, `${p === 1 ? '' : p}x+y=${c1}`), line(LABELS.step, `x-y=${c2}`), line(LABELS.result, `B=\\begin{pmatrix}${c1}\\\\${c2}\\end{pmatrix}`)],
                wrong: 1, error, fix: `x-y=${-c2}`, right: -c2, reached: c2
            }
        }
        case 'missing-root': {
            const c = pick(random, [1, 2, 3, 4])
            return {
                problem: say(`Zein $a$ baliotarako ez da bateragarri determinatua $\\begin{cases}ax+${c}y=1\\\\ ${c}x+ay=2\\end{cases}$?`, `¿Para qué $a$ no es compatible determinado $\\begin{cases}ax+${c}y=1\\\\ ${c}x+ay=2\\end{cases}$?`, `لأي $a$ لا يكون $\\begin{cases}ax+${c}y=1\\\\ ${c}x+ay=2\\end{cases}$ متوافقًا محددًا؟`, `For which $a$ is $\\begin{cases}ax+${c}y=1\\\\ ${c}x+ay=2\\end{cases}$ not consistent and independent?`),
                lines: [line(LABELS.step, `|A|=a^2-${c * c}`), line(LABELS.step, `a^2=${c * c}`), line(LABELS.result, `a=${c}`)],
                wrong: 2, error, fix: `a=${c},\\ a=-${c}`, right: 2, reached: 1
            }
        }
        case 'divide-parameter': {
            const s = pick(random, [2, 3, 1])
            return {
                problem: say(`Ebatzi $\\begin{cases}x+y=${s}\\\\ x+ay=${s}+a-1\\end{cases}$.`, `Resuelve $\\begin{cases}x+y=${s}\\\\ x+ay=${s}+a-1\\end{cases}$.`, `حُلّ $\\begin{cases}x+y=${s}\\\\ x+ay=${s}+a-1\\end{cases}$.`, `Solve $\\begin{cases}x+y=${s}\\\\ x+ay=${s}+a-1\\end{cases}$.`),
                lines: [line(LABELS.step, '(a-1)y=a-1'), line(LABELS.step, 'y=1'), line(LABELS.result, `x=${s - 1}`)],
                wrong: 1, error, fix: `a\\neq 1\\ \\to\\ y=1;\\qquad a=1\\ \\to\\ 0=0`, right: 2, reached: 1
            }
        }
        case 'det-plus': {
            const c = pick(random, [1, 2, 3])
            const k = pick(random, [2, 3, 4])
            return {
                problem: say(`Zein $a$ baliotarako ez da bateragarri determinatua $\\begin{cases}ax+${k}y=1\\\\ ${c}x+ay=2\\end{cases}$?`, `¿Para qué $a$ no es compatible determinado $\\begin{cases}ax+${k}y=1\\\\ ${c}x+ay=2\\end{cases}$?`, `لأي $a$ لا يكون $\\begin{cases}ax+${k}y=1\\\\ ${c}x+ay=2\\end{cases}$ متوافقًا محددًا؟`, `For which $a$ is $\\begin{cases}ax+${k}y=1\\\\ ${c}x+ay=2\\end{cases}$ not consistent and independent?`),
                lines: [line(LABELS.step, `|A|=a^2+${k * c}`), line(LABELS.step, `a^2+${k * c}>0`), line(LABELS.result, `|A|\\neq 0`)],
                wrong: 0, error, fix: `|A|=a^2-${k * c}=0`, right: -k * c, reached: k * c
            }
        }
        case 'proportional-b': {
            const s = pick(random, [2, 3, 4, 5])
            const k = pick(random, [2, 3])
            return {
                problem: say(`Zein $b$ baliotarako da bateragarri indeterminatua $\\begin{cases}x+y=${s}\\\\ ${k}x+${k}y=b\\end{cases}$?`, `¿Para qué $b$ es compatible indeterminado $\\begin{cases}x+y=${s}\\\\ ${k}x+${k}y=b\\end{cases}$?`, `لأي $b$ يكون $\\begin{cases}x+y=${s}\\\\ ${k}x+${k}y=b\\end{cases}$ متوافقًا غير محدد؟`, `For which $b$ is $\\begin{cases}x+y=${s}\\\\ ${k}x+${k}y=b\\end{cases}$ consistent and dependent?`),
                lines: [line(LABELS.step, `E_2=${k}E_1`), line(LABELS.step, `b=${k}+${s}`), line(LABELS.result, `b=${k + s}`)],
                wrong: 1, error, fix: `b=${k}\\cdot ${s}=${k * s}`, right: k * s, reached: k + s
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createSistemakDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, sistemakDetectiveLevels[levelIndex], SISTEMAK_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}

