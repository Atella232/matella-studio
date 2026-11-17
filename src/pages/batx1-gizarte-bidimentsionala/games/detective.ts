import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J3 · Estatistikaren detektibea, bidimentsionala (1.º Sociales): a worked
   solution of three lines with one wrong line, the mistakes of this unit.
   Level 1 (covariance and r): the covariance without − x̄ȳ, r divided by
   the variances, r changed by the units, a negative r taken as weaker.
   Level 2 (regression lines): the slope divided by σx, x estimated with the
   line of Y on X, ȳ taken as the intercept, r² as the product of the two
   slopes as drawn. Level 3 (tables and r): the conditional divided by N,
   the marginal mean divided by the number of values, the independent cell
   without dividing by N, r with the wrong sign. `right` and `reached` only
   tell the cases apart.
   ========================================================================== */

export type SocialBivarDetectiveError =
    | 'cov-no-mean'
    | 'r-variances'
    | 'r-units'
    | 'sign-strength'
    | 'slope-sigma'
    | 'x-from-yx'
    | 'intercept-mean'
    | 'slope-product'
    | 'conditional-total'
    | 'marginal-values'
    | 'expected-cell'
    | 'root-sign'

export const socialBivarDetectiveLevels: SocialBivarDetectiveError[][] = [
    ['cov-no-mean', 'r-variances', 'r-units', 'sign-strength'],
    ['slope-sigma', 'x-from-yx', 'intercept-mean', 'slope-product'],
    ['conditional-total', 'marginal-values', 'expected-cell', 'root-sign']
]

export const SOCIAL_BIVAR_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const tex = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')
const short = (value: number) => Math.abs(Math.round(value * 100) - value * 100) < 1e-9
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    data: say('Datuak', 'Datos', 'البيانات', 'Data'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    compare: say('Konparatu', 'Compara', 'قارن', 'Compare')
}

export const socialBivarDetectiveNames: Record<SocialBivarDetectiveError, LocalizedText> = {
    'cov-no-mean': say('Kobariantzan ez du $\\bar{x}\\,\\bar{y}$ kendu', 'En la covarianza no restó $\\bar{x}\\,\\bar{y}$', 'لم يطرح $\\bar{x}\\,\\bar{y}$ في التغاير', 'Did not subtract $\\bar{x}\\,\\bar{y}$ in the covariance'),
    'r-variances': say('r kalkulatzeko bariantzez zatitu du', 'Para r dividió entre las varianzas', 'قسم على التباينين لحساب r', 'Divided by the variances to get r'),
    'r-units': say('Unitateak aldatzean r aldatzen dela uste izan du', 'Creyó que r cambia al cambiar las unidades', 'ظن أن r يتغيّر بتغيير الوحدات', 'Thought r changes when the units change'),
    'sign-strength': say('r negatiboa ahulagoa dela uste izan du', 'Creyó que un r negativo es más débil', 'ظن أن r السالب أضعف', 'Thought a negative r is weaker'),
    'slope-sigma': say('Malda $\\sigma_x$ zenbakiaz zatitu du, ez $\\sigma_x^2$ zenbakiaz', 'Dividió la pendiente entre $\\sigma_x$, no entre $\\sigma_x^2$', 'قسم الميل على $\\sigma_x$ لا على $\\sigma_x^2$', 'Divided the slope by $\\sigma_x$, not by $\\sigma_x^2$'),
    'x-from-yx': say('x estimatzeko Y-ren X-rekiko zuzena erabili du', 'Estimó x con la recta de Y sobre X', 'قدّر x بمستقيم Y على X', 'Estimated x with the line of Y on X'),
    'intercept-mean': say('Jatorriko ordenatua $\\bar{y}$ dela uste izan du', 'Tomó la ordenada en el origen como $\\bar{y}$', 'اعتبر الجزء المقطوع هو $\\bar{y}$', 'Took the intercept as $\\bar{y}$'),
    'slope-product': say('Marraztutako bi maldak biderkatu ditu', 'Multiplicó las dos pendientes dibujadas', 'ضرب الميلين المرسومين', 'Multiplied the two slopes as drawn'),
    'conditional-total': say('Baldintzazkoa $N$ zenbakiaz zatitu du', 'Dividió la condicionada entre $N$', 'قسم الشرطي على $N$', 'Divided the conditional by $N$'),
    'marginal-values': say('Batez besteko marjinala balio kopuruaz zatitu du', 'Dividió la media marginal entre el número de valores', 'قسم المتوسط الهامشي على عدد القيم', 'Divided the marginal mean by the number of values'),
    'expected-cell': say('Gelaxka independentea $N$ zenbakiaz zatitu gabe kalkulatu du', 'Calculó la casilla independiente sin dividir entre $N$', 'حسب الخانة المستقلة دون القسمة على $N$', 'Worked out the independent cell without dividing by $N$'),
    'root-sign': say('r positiboa hartu du, maldak negatiboak izanda', 'Tomó r positivo con las pendientes negativas', 'أخذ r موجبًا مع أن الميلين سالبان', 'Took r positive with negative slopes')
}

export const socialBivarDetectiveTips: Record<SocialBivarDetectiveError, LocalizedText> = {
    'cov-no-mean': say('$\\sigma_{xy}=\\frac{\\sum x_i y_i}{N}-\\bar{x}\\,\\bar{y}$.', '$\\sigma_{xy}=\\frac{\\sum x_i y_i}{N}-\\bar{x}\\,\\bar{y}$.', '$\\sigma_{xy}=\\frac{\\sum x_i y_i}{N}-\\bar{x}\\,\\bar{y}$.', '$\\sigma_{xy}=\\frac{\\sum x_i y_i}{N}-\\bar{x}\\,\\bar{y}$.'),
    'r-variances': say('$r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$: desbideratze tipikoekin.', '$r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$: con las desviaciones típicas.', '$r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$: بالانحرافين المعياريين.', '$r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$: with the standard deviations.'),
    'r-units': say('r koefizienteak ez du unitaterik: ez da aldatzen.', 'r no tiene unidades: no cambia.', 'r بلا وحدات: لا يتغيّر.', 'r has no units: it does not change.'),
    'sign-strength': say('Indarra $|r|$ da; zeinuak noranzkoa bakarrik ematen du.', 'La fuerza es $|r|$; el signo solo da el sentido.', 'القوة هي $|r|$؛ والإشارة تعطي الاتجاه فقط.', 'The strength is $|r|$; the sign only gives the direction.'),
    'slope-sigma': say('$m_{yx}=\\frac{\\sigma_{xy}}{\\sigma_x^2}$: bariantzaz zatitzen da.', '$m_{yx}=\\frac{\\sigma_{xy}}{\\sigma_x^2}$: se divide entre la varianza.', '$m_{yx}=\\frac{\\sigma_{xy}}{\\sigma_x^2}$: نقسم على التباين.', '$m_{yx}=\\frac{\\sigma_{xy}}{\\sigma_x^2}$: divide by the variance.'),
    'x-from-yx': say('x estimatzeko: $x=\\bar{x}+m_{xy}\\,(y-\\bar{y})$.', 'Para estimar x: $x=\\bar{x}+m_{xy}\\,(y-\\bar{y})$.', 'لتقدير x: $x=\\bar{x}+m_{xy}\\,(y-\\bar{y})$.', 'To estimate x: $x=\\bar{x}+m_{xy}\\,(y-\\bar{y})$.'),
    'intercept-mean': say('$\\bar{y}$ zuzenean ordezkatuz ateratzen da: $\\bar{y}=m\\,\\bar{x}+n$.', '$\\bar{y}$ sale sustituyendo en la recta: $\\bar{y}=m\\,\\bar{x}+n$.', 'نجد $\\bar{y}$ بالتعويض في المستقيم: $\\bar{y}=m\\,\\bar{x}+n$.', '$\\bar{y}$ comes from substituting in the line: $\\bar{y}=m\\,\\bar{x}+n$.'),
    'slope-product': say('y askatuta, $r^2$ malda txikiena zati handiena da.', 'Con y despejada, $r^2$ es la pendiente menor entre la mayor.', 'بعد عزل y يكون $r^2$ الميل الأصغر مقسومًا على الأكبر.', 'Solved for y, $r^2$ is the smaller slope divided by the larger.'),
    'conditional-total': say('Baldintzazkoa bere errenkadaren edo zutabearen guztizkoaz zatitzen da.', 'La condicionada se divide entre el total de su fila o columna.', 'يُقسَم الشرطي على مجموع سطره أو عموده.', 'The conditional is divided by the total of its row or column.'),
    'marginal-values': say('Zatitu datu kopuruaz, $N=\\sum f_i$.', 'Divide entre el número de datos, $N=\\sum f_i$.', 'اقسم على عدد البيانات $N=\\sum f_i$.', 'Divide by the number of data, $N=\\sum f_i$.'),
    'expected-cell': say('Gelaxka independentea: errenkada bider zutabea, zati $N$.', 'Casilla independiente: fila por columna, entre $N$.', 'الخانة المستقلة: السطر في العمود مقسومًا على $N$.', 'Independent cell: row times column, divided by $N$.'),
    'root-sign': say('r koefizienteak malden zeinua du.', 'r tiene el signo de las pendientes.', 'r بإشارة الميلين.', 'r has the sign of the slopes.')
}

type Built = Omit<WorkedCase<SocialBivarDetectiveError>, 'options'>

function build(random: Random, error: SocialBivarDetectiveError): Built | null {
    switch (error) {
        case 'cov-no-mean': {
            const n = pick(random, [4, 5, 10])
            const mx = randomInt(random, 2, 8)
            const my = randomInt(random, 2, 8)
            const cov = randomInt(random, 1, 6)
            const sum = n * (cov + mx * my)
            return {
                problem: say(`$\\sum x_i y_i=${sum}$, $N=${n}$, $\\bar{x}=${mx}$ eta $\\bar{y}=${my}$. Kalkulatu $\\sigma_{xy}$.`, `$\\sum x_i y_i=${sum}$, $N=${n}$, $\\bar{x}=${mx}$ e $\\bar{y}=${my}$. Calcula $\\sigma_{xy}$.`, `$\\sum x_i y_i=${sum}$ و$N=${n}$ و$\\bar{x}=${mx}$ و$\\bar{y}=${my}$. احسب $\\sigma_{xy}$.`, `$\\sum x_i y_i=${sum}$, $N=${n}$, $\\bar{x}=${mx}$ and $\\bar{y}=${my}$. Work out $\\sigma_{xy}$.`),
                lines: [line(LABELS.data, `N=${n}`), line(LABELS.step, `\\frac{${sum}}{${n}}=${sum / n}`), line(LABELS.result, `\\sigma_{xy}=${sum / n}`)],
                wrong: 2, error, fix: `\\sigma_{xy}=${sum / n}-${mx}\\cdot ${my}=${cov}`, right: cov, reached: sum / n
            }
        }
        case 'r-variances': {
            const sx = pick(random, [2, 3, 4])
            const sy = pick(random, [2, 5, 10])
            const r = pick(random, [0.5, 0.6, 0.8])
            const cov = r * sx * sy
            const reached = cov / (sx * sx * sy * sy)
            if (!short(cov) || !short(reached) || sx === sy) return null
            return {
                problem: say(`$\\sigma_{xy}=${tex(cov)}$, $\\sigma_x=${sx}$ eta $\\sigma_y=${sy}$. Kalkulatu r.`, `$\\sigma_{xy}=${tex(cov)}$, $\\sigma_x=${sx}$ y $\\sigma_y=${sy}$. Calcula r.`, `$\\sigma_{xy}=${tex(cov)}$ و$\\sigma_x=${sx}$ و$\\sigma_y=${sy}$. احسب r.`, `$\\sigma_{xy}=${tex(cov)}$, $\\sigma_x=${sx}$ and $\\sigma_y=${sy}$. Work out r.`),
                lines: [line(LABELS.data, `\\sigma_x^2=${sx * sx}\\qquad\\sigma_y^2=${sy * sy}`), line(LABELS.step, `r=\\frac{${tex(cov)}}{${sx * sx}\\cdot ${sy * sy}}`), line(LABELS.result, `r=${tex(reached)}`)],
                wrong: 1, error, fix: `r=\\frac{${tex(cov)}}{${sx}\\cdot ${sy}}=${tex(r)}`, right: r, reached
            }
        }
        case 'r-units': {
            const r = pick(random, [0.6, 0.75, 0.9])
            const factor = pick(random, [10, 100])
            return {
                problem: say(`Altuera metrotan dagoela, $r=${tex(r)}$. Zenbat da r, altuera ${factor === 100 ? 'zentimetrotan' : 'dezimetrotan'} jarriz gero?`, `Con la altura en metros, $r=${tex(r)}$. ¿Cuánto vale r si la altura se pasa a ${factor === 100 ? 'centímetros' : 'decímetros'}?`, `مع الطول بالمتر $r=${tex(r)}$. كم r إذا حُوّل الطول إلى ${factor === 100 ? 'السنتيمتر' : 'الديسيمتر'}؟`, `With the height in metres, $r=${tex(r)}$. What is r if the height is changed to ${factor === 100 ? 'centimetres' : 'decimetres'}?`),
                lines: [line(LABELS.data, `r=${tex(r)}`), line(LABELS.step, `x\\to ${factor}\\,x`), line(LABELS.result, `r=${tex(r)}\\cdot ${factor}=${tex(r * factor)}`)],
                wrong: 2, error, fix: `r=${tex(r)}`, right: r, reached: r * factor
            }
        }
        case 'sign-strength': {
            const negative = pick(random, [0.7, 0.8, 0.9])
            const positive = pick(random, [0.3, 0.4, 0.5])
            return {
                problem: say(`Bi hodei: A, $r=-${tex(negative)}$; B, $r=${tex(positive)}$. Zeinek du korrelazio sendoena?`, `Dos nubes: A, con $r=-${tex(negative)}$; B, con $r=${tex(positive)}$. ¿Cuál tiene la correlación más fuerte?`, `سحابتان: A مع $r=-${tex(negative)}$، وB مع $r=${tex(positive)}$. أيهما ارتباطه أقوى؟`, `Two clouds: A, with $r=-${tex(negative)}$; B, with $r=${tex(positive)}$. Which has the stronger correlation?`),
                lines: [line(LABELS.data, `r_A=-${tex(negative)}\\qquad r_B=${tex(positive)}`), line(LABELS.compare, `-${tex(negative)}<${tex(positive)}`), line(LABELS.result, `B:\\ ${tex(positive)}`)],
                wrong: 1, error, fix: `|r_A|=${tex(negative)}>${tex(positive)}\\ \\to\\ A`, right: negative, reached: positive
            }
        }
        case 'slope-sigma': {
            const sx = pick(random, [2, 3, 4])
            const slope = pick(random, [0.5, 1, 1.5, 2])
            const cov = slope * sx * sx
            return {
                problem: say(`$\\sigma_{xy}=${tex(cov)}$ eta $\\sigma_x=${sx}$. Zein da Y-ren X-rekiko zuzenaren malda?`, `$\\sigma_{xy}=${tex(cov)}$ y $\\sigma_x=${sx}$. ¿Cuál es la pendiente de la recta de Y sobre X?`, `$\\sigma_{xy}=${tex(cov)}$ و$\\sigma_x=${sx}$. ما ميل مستقيم Y على X؟`, `$\\sigma_{xy}=${tex(cov)}$ and $\\sigma_x=${sx}$. What is the slope of the line of Y on X?`),
                lines: [line(LABELS.data, `\\sigma_x=${sx}`), line(LABELS.step, `m_{yx}=\\frac{${tex(cov)}}{${sx}}`), line(LABELS.result, `m_{yx}=${tex(cov / sx)}`)],
                wrong: 1, error, fix: `m_{yx}=\\frac{${tex(cov)}}{${sx * sx}}=${tex(slope)}`, right: slope, reached: cov / sx
            }
        }
        case 'x-from-yx': {
            const mx = randomInt(random, 3, 8)
            const my = randomInt(random, 10, 20)
            const myx = pick(random, [2, 4])
            const mxy = pick(random, [0.2, 0.125, 0.1])
            const y = my + pick(random, [4, 8])
            const right = mx + mxy * (y - my)
            const reached = mx + (y - my) / myx
            if (!short(right) || !short(reached) || myx * mxy > 1) return null
            return {
                problem: say(`$\\bar{x}=${mx}$, $\\bar{y}=${my}$, $m_{yx}=${myx}$ eta $m_{xy}=${tex(mxy)}$. Estimatu x, $y=${y}$ denean.`, `$\\bar{x}=${mx}$, $\\bar{y}=${my}$, $m_{yx}=${myx}$ y $m_{xy}=${tex(mxy)}$. Estima x para $y=${y}$.`, `$\\bar{x}=${mx}$ و$\\bar{y}=${my}$ و$m_{yx}=${myx}$ و$m_{xy}=${tex(mxy)}$. قدّر x عندما $y=${y}$.`, `$\\bar{x}=${mx}$, $\\bar{y}=${my}$, $m_{yx}=${myx}$ and $m_{xy}=${tex(mxy)}$. Estimate x for $y=${y}$.`),
                lines: [line(LABELS.step, `y-${my}=${myx}\\,(x-${mx})`), line(LABELS.step, `${y}-${my}=${myx}\\,(x-${mx})`), line(LABELS.result, `x=${tex(reached)}`)],
                wrong: 0, error, fix: `x=${mx}+${tex(mxy)}\\cdot(${y}-${my})=${tex(right)}`, right, reached
            }
        }
        case 'intercept-mean': {
            const slope = pick(random, [2, 3, 0.5])
            const intercept = randomInt(random, 1, 9)
            const mx = randomInt(random, 4, 10)
            const right = slope * mx + intercept
            if (!short(right)) return null
            return {
                problem: say(`Y-ren X-rekiko zuzena $y=${tex(slope)}x+${intercept}$ da, eta $\\bar{x}=${mx}$. Zenbat da $\\bar{y}$?`, `La recta de Y sobre X es $y=${tex(slope)}x+${intercept}$ y $\\bar{x}=${mx}$. ¿Cuánto vale $\\bar{y}$?`, `مستقيم Y على X هو $y=${tex(slope)}x+${intercept}$ و$\\bar{x}=${mx}$. كم $\\bar{y}$؟`, `The line of Y on X is $y=${tex(slope)}x+${intercept}$ and $\\bar{x}=${mx}$. What is $\\bar{y}$?`),
                lines: [line(LABELS.data, `m=${tex(slope)}`), line(LABELS.result, `\\bar{y}=${intercept}`), line(LABELS.compare, `(${mx},\\,${intercept})`)],
                wrong: 1, error, fix: `\\bar{y}=${tex(slope)}\\cdot ${mx}+${intercept}=${tex(right)}`, right, reached: intercept
            }
        }
        case 'slope-product': {
            const pairs: Array<[number, number]> = [[0.8, 1.25], [0.5, 2], [0.4, 2.5], [0.6, 1.5], [0.3, 1.2]]
            const [a, b] = pick(random, pairs)
            const right = a / b
            const reached = a * b
            if (Math.abs(right - reached) < 1e-9) return null
            return {
                problem: say(`Zuzenak, y askatuta: $y=${tex(a)}x+1$ (Y-ren X-rekiko) eta $y=${tex(b)}x-2$ (X-ren Y-rekiko). Zenbat da $r^2$?`, `Las rectas, con y despejada: $y=${tex(a)}x+1$ (Y sobre X) e $y=${tex(b)}x-2$ (X sobre Y). ¿Cuánto vale $r^2$?`, `المستقيمان بعد عزل y: $y=${tex(a)}x+1$ (Y على X) و$y=${tex(b)}x-2$ (X على Y). كم $r^2$؟`, `The lines, solved for y: $y=${tex(a)}x+1$ (Y on X) and $y=${tex(b)}x-2$ (X on Y). What is $r^2$?`),
                lines: [line(LABELS.data, `m_{yx}=${tex(a)}`), line(LABELS.step, `r^2=${tex(a)}\\cdot ${tex(b)}`), line(LABELS.result, `r^2=${tex(reached)}`)],
                wrong: 1, error, fix: `m_{xy}=\\frac{1}{${tex(b)}}\\ \\to\\ r^2=\\frac{${tex(a)}}{${tex(b)}}=${tex(right)}`, right, reached
            }
        }
        case 'conditional-total': {
            const row = pick(random, [20, 25, 40])
            const total = row + pick(random, [20, 30, 60])
            const cell = randomInt(random, 3, row - 3)
            const right = cell / row
            const reached = cell / total
            if (!short(right) || !short(reached)) return null
            return {
                problem: say(`${total} pertsonatik ${row} neskak dira, eta haietatik ${cell} neskak kirola egiten dute. Nesken zer zatik egiten du kirola?`, `De ${total} personas, ${row} son chicas, y ${cell} de ellas hacen deporte. ¿Qué parte de las chicas hace deporte?`, `من ${total} شخصًا ${row} فتاة، تمارس ${cell} منهن الرياضة. ما الجزء من الفتيات الذي يمارس الرياضة؟`, `Of ${total} people, ${row} are girls, and ${cell} of them do sport. What part of the girls does sport?`),
                lines: [line(LABELS.data, `f=${cell}`), line(LABELS.step, `\\frac{${cell}}{${total}}`), line(LABELS.result, `${tex(reached)}`)],
                wrong: 1, error, fix: `\\frac{${cell}}{${row}}=${tex(right)}`, right, reached
            }
        }
        case 'marginal-values': {
            const counts = [randomInt(random, 1, 6), randomInt(random, 2, 9), randomInt(random, 1, 6)]
            const marks = [10, 20, 30]
            const total = counts[0] + counts[1] + counts[2]
            const sum = counts[0] * 10 + counts[1] * 20 + counts[2] * 30
            const right = sum / total
            const reached = sum / 3
            if (!short(right) || !short(reached) || total === 3) return null
            return {
                problem: say(`x-ren marjinala: $${marks.join(',\\ ')}$ balioak, $${counts.join(',\\ ')}$ maiztasunekin. Kalkulatu $\\bar{x}$.`, `Marginal de x: valores $${marks.join(',\\ ')}$ con frecuencias $${counts.join(',\\ ')}$. Calcula $\\bar{x}$.`, `هامشي x: القيم $${marks.join(',\\ ')}$ بالتكرارات $${counts.join(',\\ ')}$. احسب $\\bar{x}$.`, `Marginal of x: values $${marks.join(',\\ ')}$ with frequencies $${counts.join(',\\ ')}$. Work out $\\bar{x}$.`),
                lines: [line(LABELS.step, `\\sum f_i x_i=${sum}`), line(LABELS.data, 'N=3'), line(LABELS.result, `\\bar{x}=\\frac{${sum}}{3}=${tex(reached)}`)],
                wrong: 1, error, fix: `N=${total}\\ \\to\\ \\bar{x}=\\frac{${sum}}{${total}}=${tex(right)}`, right, reached
            }
        }
        case 'expected-cell': {
            const total = pick(random, [50, 100, 200])
            const row = total * pick(random, [0.3, 0.4, 0.6])
            const column = total * pick(random, [0.2, 0.5, 0.7])
            const right = (row * column) / total
            return {
                problem: say(`$N=${total}$; errenkadak ${row} batzen du, eta zutabeak ${column}. Zein litzateke gelaxka, independenteak balira?`, `$N=${total}$; la fila suma ${row} y la columna ${column}. ¿Qué valor tendría la casilla si fueran independientes?`, `$N=${total}$؛ مجموع السطر ${row} ومجموع العمود ${column}. ما قيمة الخانة لو كانا مستقلين؟`, `$N=${total}$; the row adds up to ${row} and the column to ${column}. What would the cell be if they were independent?`),
                lines: [line(LABELS.data, `N=${total}`), line(LABELS.step, `${row}\\cdot ${column}=${row * column}`), line(LABELS.result, `${row * column}`)],
                wrong: 2, error, fix: `\\frac{${row}\\cdot ${column}}{${total}}=${tex(right)}`, right, reached: row * column
            }
        }
        case 'root-sign': {
            const pairs: Array<[number, number]> = [[0.8, 1.25], [0.5, 2], [0.4, 2.5], [0.6, 1.5]]
            const [a, b] = pick(random, pairs)
            const r = Math.sqrt(a / b)
            if (!short(r)) return null
            return {
                problem: say(`Zuzenak, y askatuta: $y=-${tex(a)}x+9$ eta $y=-${tex(b)}x+12$. Zenbat da r?`, `Las rectas, con y despejada: $y=-${tex(a)}x+9$ e $y=-${tex(b)}x+12$. ¿Cuánto vale r?`, `المستقيمان بعد عزل y: $y=-${tex(a)}x+9$ و$y=-${tex(b)}x+12$. كم r؟`, `The lines, solved for y: $y=-${tex(a)}x+9$ and $y=-${tex(b)}x+12$. What is r?`),
                lines: [line(LABELS.step, `r^2=\\frac{${tex(a)}}{${tex(b)}}=${tex(a / b)}`), line(LABELS.step, `\\sqrt{${tex(a / b)}}=${tex(r)}`), line(LABELS.result, `r=${tex(r)}`)],
                wrong: 2, error, fix: `r=-${tex(r)}`, right: -r, reached: r
            }
        }
    }
}

export function createSocialBivarDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, socialBivarDetectiveLevels[levelIndex] ?? socialBivarDetectiveLevels[0], SOCIAL_BIVAR_DETECTIVE_CASES, build)
    let made = draw()
    // No two cases with the same statement in one game
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}
