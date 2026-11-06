import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J4 · Estatistika bidimentsionalaren detektibea (Detective de
   estadística bidimensional): a worked solution of three lines with one
   wrong line, the mistakes of this unit. Level 1 (tables and the cloud):
   a conditional divided by N, a marginal mean divided by the number of
   values, independence read as equal cells, and minus times minus taken
   as minus. Level 2 (covariance and r): not subtracting x̄ȳ, not dividing
   by N, dividing by the variances, and r multiplied by the change of
   units. Level 3 (lines): the slope over σx instead of σx², estimating x
   with the line of y on x, r taken as the product of the slopes, and ȳ
   taken as the constant term. `right` and `reached` only tell the cases
   apart.
   ========================================================================== */

export type BivarDetectiveError =
    | 'conditional-total'
    | 'marginal-count'
    | 'independence-equal'
    | 'quadrant-sign'
    | 'covariance-means'
    | 'covariance-sum'
    | 'r-variances'
    | 'units-r'
    | 'slope-sigma'
    | 'xy-solve'
    | 'r-product'
    | 'intercept-mean'

export const bivarDetectiveLevels: BivarDetectiveError[][] = [
    ['conditional-total', 'marginal-count', 'independence-equal', 'quadrant-sign'],
    ['covariance-means', 'covariance-sum', 'r-variances', 'units-r'],
    ['slope-sigma', 'xy-solve', 'r-product', 'intercept-mean']
]

export const BIVAR_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
/** A decimal for LaTeX: 2{,}5, 12, -0{,}5 */
const tex = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')
/** = when three decimals say it exactly, ≈ otherwise */
const eq = (value: number) => (Math.abs(value * 1000 - Math.round(value * 1000)) < 1e-9 ? '=' : '\\approx ')
/** A number in brackets when it is negative */
const paren = (value: number) => (value < 0 ? `(${tex(value)})` : tex(value))
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    data: say('Datuak', 'Datos', 'البيانات', 'Data'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    compare: say('Konparatu', 'Compara', 'قارن', 'Compare')
}

export const bivarDetectiveNames: Record<BivarDetectiveError, LocalizedText> = {
    'conditional-total': say('Baldintzatuan N zenbakiaz zatitu du, ez errenkadaren guztizkoaz', 'En la condicionada dividió entre N, no entre el total de la fila', 'قسم في التوزيع الشرطي على N لا على مجموع السطر', 'In the conditional, divided by N, not by the row total'),
    'marginal-count': say('Balio kopuruaz zatitu du, ez N zenbakiaz', 'Dividió entre el número de valores, no entre N', 'قسم على عدد القيم لا على N', 'Divided by the number of values, not by N'),
    'independence-equal': say('Independentzia gelaxka berdinak direla uste izan du', 'Creyó que independencia es que las casillas sean iguales', 'ظن أن الاستقلال هو تساوي الخانات', 'Thought independence means equal cells'),
    'quadrant-sign': say('Minus bider minus, minus egin du', 'Hizo menos por menos igual a menos', 'جعل السالب في السالب سالبًا', 'Took minus times minus as minus'),
    'covariance-means': say('Ez du batez bestekoen biderkadura kendu', 'No restó el producto de las medias', 'لم يطرح جداء المتوسطين', 'Did not subtract the product of the means'),
    'covariance-sum': say('Ez du N zenbakiaz zatitu', 'No dividió entre N', 'لم يقسم على N', 'Did not divide by N'),
    'r-variances': say('Bariantzez zatitu du, ez desbideratze tipikoez', 'Dividió entre las varianzas, no entre las desviaciones típicas', 'قسم على التباينين لا على الانحرافين المعياريين', 'Divided by the variances, not by the standard deviations'),
    'units-r': say('Unitate-aldaketak r aldatzen duela uste izan du', 'Creyó que el cambio de unidades cambia r', 'ظن أن تغيير الوحدات يغيّر r', 'Thought changing the units changes r'),
    'slope-sigma': say('Malda kalkulatzean $\\sigma_x$ erabili du, ez $\\sigma_x^2$', 'Usó $\\sigma_x$ en la pendiente, no $\\sigma_x^2$', 'استعمل $\\sigma_x$ في الميل لا $\\sigma_x^2$', 'Used $\\sigma_x$ in the slope, not $\\sigma_x^2$'),
    'xy-solve': say('x estimatu du Y-ren X-rekiko zuzena askatuta', 'Estimó x despejando la recta de Y sobre X', 'قدّر x بعزلها من مستقيم Y على X', 'Estimated x by solving the line of Y on X'),
    'r-product': say('Malden biderkadura r dela uste izan du, ez $r^2$', 'Tomó el producto de las pendientes como r, no como $r^2$', 'اعتبر جداء الميلين r لا $r^2$', 'Took the product of the slopes as r, not as $r^2$'),
    'intercept-mean': say('Gai askea $\\bar{y}$ dela uste izan du', 'Tomó el término independiente como $\\bar{y}$', 'اعتبر الحد الثابت $\\bar{y}$', 'Took the constant term as $\\bar{y}$')
}

export const bivarDetectiveTips: Record<BivarDetectiveError, LocalizedText> = {
    'conditional-total': say('Baldintzatuan, kasu posibleak baldintzaren errenkada bakarrik dira.', 'En la condicionada, los casos posibles son solo la fila de la condición.', 'في التوزيع الشرطي تكون الحالات الممكنة سطر الشرط فقط.', 'In a conditional, the possible cases are only the row of the condition.'),
    'marginal-count': say('Guztizkoak maiztasunak dira: zatitu haien baturaz, $N$.', 'Los totales son frecuencias: divide entre su suma, $N$.', 'المجاميع تكرارات: اقسم على مجموعها $N$.', 'The totals are frequencies: divide by their sum, $N$.'),
    'independence-equal': say('Independentzia: zutabe baten zatia bera errenkada guztietan; gelaxka = errenkada · zutabea / N.', 'Independencia: la misma parte de cada columna en todas las filas; casilla = fila · columna / N.', 'الاستقلال: نصيب العمود نفسه في كل الأسطر؛ الخانة = السطر · العمود / N.', 'Independence: the same share of each column in every row; cell = row · column / N.'),
    'quadrant-sign': say('Behean ezkerrean bi desbideratzeak negatiboak dira: biderkadura positiboa da.', 'Abajo a la izquierda las dos desviaciones son negativas: el producto es positivo.', 'في الأسفل يسارًا الانحرافان سالبان: الجداء موجب.', 'Down on the left both deviations are negative: the product is positive.'),
    'covariance-means': say('$\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}-\\bar{x}\\,\\bar{y}$: ez ahaztu kenketa.', '$\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}-\\bar{x}\\,\\bar{y}$: no olvides restar.', '$\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}-\\bar{x}\\,\\bar{y}$: لا تنسَ الطرح.', '$\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}-\\bar{x}\\,\\bar{y}$: do not forget to subtract.'),
    'covariance-sum': say('Kobariantza batez bestekoa da: zatitu puntu kopuruaz.', 'La covarianza es una media: divide entre el número de puntos.', 'التغاير متوسط: اقسم على عدد النقاط.', 'The covariance is a mean: divide by the number of points.'),
    'r-variances': say('$r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$, beti −1 eta 1 artean.', '$r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$, siempre entre −1 y 1.', '$r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$، دائمًا بين −1 و1.', '$r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$, always between −1 and 1.'),
    'units-r': say('r koefizienteak ez du unitaterik: berdin geratzen da.', 'r no tiene unidades: se queda igual.', 'ليس لـ r وحدات: يبقى كما هو.', 'r has no units: it stays the same.'),
    'slope-sigma': say('Y-ren X-rekiko malda $\\frac{\\sigma_{xy}}{\\sigma_x^2}$ da.', 'La pendiente de Y sobre X es $\\frac{\\sigma_{xy}}{\\sigma_x^2}$.', 'ميل Y على X هو $\\frac{\\sigma_{xy}}{\\sigma_x^2}$.', 'The slope of Y on X is $\\frac{\\sigma_{xy}}{\\sigma_x^2}$.'),
    'xy-solve': say('x estimatzeko, X-ren Y-rekiko zuzena: koefizientea $\\frac{r^2}{m_{yx}}$.', 'Para estimar x, la recta de X sobre Y: su coeficiente es $\\frac{r^2}{m_{yx}}$.', 'لتقدير x استعمل مستقيم X على Y: معامله $\\frac{r^2}{m_{yx}}$.', 'To estimate x, use the line of X on Y: its coefficient is $\\frac{r^2}{m_{yx}}$.'),
    'r-product': say('$m_{yx}\\cdot m_{xy}=r^2$: atera erro karratua, malden zeinuarekin.', '$m_{yx}\\cdot m_{xy}=r^2$: saca la raíz, con el signo de las pendientes.', '$m_{yx}\\cdot m_{xy}=r^2$: خذ الجذر بإشارة الميلين.', '$m_{yx}\\cdot m_{xy}=r^2$: take the root, with the sign of the slopes.'),
    'intercept-mean': say('$\\bar{y}$ zuzenaren balioa da $\\bar{x}$ puntuan.', '$\\bar{y}$ es el valor de la recta en $\\bar{x}$.', '$\\bar{y}$ قيمة المستقيم عند $\\bar{x}$.', '$\\bar{y}$ is the value of the line at $\\bar{x}$.')
}

type Built = Omit<WorkedCase<BivarDetectiveError>, 'options'>

function build(random: Random, error: BivarDetectiveError): Built | null {
    switch (error) {
        case 'conditional-total': {
            const row = pick(random, [20, 25, 40, 50])
            const total = row + pick(random, [30, 50, 60])
            const count = randomInt(random, 2, row - 1)
            const right = count / row
            const reached = count / total
            if ([right, reached].some((value) => Math.abs(value * 1000 - Math.round(value * 1000)) > 1e-9)) return null
            return {
                problem: say(`${total} ikasletik ${row} neskak dira, eta horietatik ${count} kirola egiten dute. Zer zatik egiten du kirola nesken artean?`, `De ${total} alumnos, ${row} son chicas y ${count} de ellas hacen deporte. ¿Qué parte de las chicas hace deporte?`, `من ${total} تلميذًا ${row} بنات، و${count} منهن يمارسن الرياضة. ما نصيب الرياضة بين البنات؟`, `Of ${total} students, ${row} are girls and ${count} of them do sport. What share of the girls does sport?`),
                lines: [line(LABELS.data, `f=${count}\\qquad N=${total}`), line(LABELS.step, `h=\\frac{${count}}{${total}}=${tex(reached)}`), line(LABELS.result, `100\\cdot ${tex(reached)}=${tex(100 * reached)}`)],
                wrong: 1, error, fix: `h=\\frac{${count}}{${row}}=${tex(right)}`, right, reached
            }
        }
        case 'marginal-count': {
            const counts = [randomInt(random, 2, 9), randomInt(random, 2, 9), randomInt(random, 2, 9)]
            const total = counts[0] + counts[1] + counts[2]
            const sum = counts[1] + 2 * counts[2]
            const right = sum / total
            const reached = sum / 3
            if (sum % 3 !== 0 || Math.abs(right * 100 - Math.round(right * 100)) > 1e-9 || reached === right) return null
            return {
                problem: say(`$Y=0$, $Y=1$ eta $Y=2$ zutabeen guztizkoak ${counts[0]}, ${counts[1]} eta ${counts[2]} dira. Kalkulatu $\\bar{y}$.`, `Los totales de las columnas $Y=0$, $Y=1$ e $Y=2$ son ${counts[0]}, ${counts[1]} y ${counts[2]}. Calcula $\\bar{y}$.`, `مجاميع الأعمدة $Y=0$ و$Y=1$ و$Y=2$ هي ${counts[0]} و${counts[1]} و${counts[2]}. احسب $\\bar{y}$.`, `The totals of the columns $Y=0$, $Y=1$ and $Y=2$ are ${counts[0]}, ${counts[1]} and ${counts[2]}. Work out $\\bar{y}$.`),
                lines: [line(LABELS.data, `N=${counts[0]}+${counts[1]}+${counts[2]}=${total}`), line(LABELS.step, `0\\cdot ${counts[0]}+1\\cdot ${counts[1]}+2\\cdot ${counts[2]}=${sum}`), line(LABELS.result, `\\bar{y}=\\frac{${sum}}{3}=${tex(reached)}`)],
                wrong: 2, error, fix: `\\bar{y}=\\frac{${sum}}{${total}}=${tex(right)}`, right, reached
            }
        }
        case 'independence-equal': {
            const total = pick(random, [50, 100, 200])
            const column = pick(random, [0.2, 0.3, 0.4, 0.6, 0.7, 0.8]) * total
            const row = pick(random, [20, 30, 40, 60])
            if (row >= total) return null
            const right = (row * column) / total
            const reached = row / 2
            if (!Number.isInteger(right) || right === reached) return null
            const share = column / total
            return {
                problem: say(`Errenkada baten guztizkoa ${row} da, 1. zutabearena ${column}, eta $N=${total}$. Zenbat izan behar du gelaxka horrek independentzia egoteko?`, `Una fila suma ${row}, la columna 1 suma ${column} y $N=${total}$. ¿Cuánto debe valer su casilla para que haya independencia?`, `مجموع سطر ${row}، ومجموع العمود 1 هو ${column}، و$N=${total}$. كم يجب أن تكون خانتهما ليتحقق الاستقلال؟`, `A row adds up to ${row}, column 1 adds up to ${column} and $N=${total}$. What must their cell be for independence?`),
                lines: [line(LABELS.step, `\\frac{${column}}{${total}}=${tex(share)}`), line(LABELS.result, `\\frac{${row}}{2}=${tex(reached)}`), line(LABELS.compare, `${tex(reached)}+${tex(reached)}=${row}`)],
                wrong: 1, error, fix: `${tex(share)}\\cdot ${row}=${tex(right)}`, right, reached
            }
        }
        case 'quadrant-sign': {
            const mx = randomInt(random, 4, 8)
            const my = randomInt(random, 4, 9)
            const dx = randomInt(random, 1, 3)
            const dy = randomInt(random, 1, 4)
            const x = mx - dx
            const y = my - dy
            const right = dx * dy
            return {
                problem: say(`Grabitate-zentroa $(${mx},\\,${my})$ da. Zenbat da $(${x},\\,${y})$ puntuaren $(x-\\bar{x})(y-\\bar{y})$ biderkadura?`, `El centro de gravedad es $(${mx},\\,${my})$. ¿Cuánto vale el producto $(x-\\bar{x})(y-\\bar{y})$ del punto $(${x},\\,${y})$?`, `مركز الثقل $(${mx},\\,${my})$. كم الجداء $(x-\\bar{x})(y-\\bar{y})$ للنقطة $(${x},\\,${y})$؟`, `The centre of gravity is $(${mx},\\,${my})$. What is the product $(x-\\bar{x})(y-\\bar{y})$ of the point $(${x},\\,${y})$?`),
                lines: [line(LABELS.step, `${x}-${mx}=${-dx}\\qquad ${y}-${my}=${-dy}`), line(LABELS.result, `(${-dx})\\cdot(${-dy})=${-right}`), line(LABELS.compare, `${-right}<0`)],
                wrong: 1, error, fix: `(${-dx})\\cdot(${-dy})=${right}>0`, right, reached: -right
            }
        }
        case 'covariance-means': {
            const n = pick(random, [4, 5])
            const mx = randomInt(random, 2, 6)
            const my = randomInt(random, 2, 8)
            const cxy = pick(random, [1, 1.5, 2, 2.5, 3])
            const sx = pick(random, [2, 3])
            const sy = pick(random, [2, 3, 4])
            const right = cxy
            const mean = cxy + mx * my
            const reached = mean
            if (cxy / (sx * sy) > 1 || mean / (sx * sy) <= 1) return null
            const wrongR = mean / (sx * sy)
            return {
                problem: say(`${n} puntutan, $\\frac{\\sum x_i\\,y_i}{N}=${tex(mean)}$, $\\bar{x}=${mx}$ eta $\\bar{y}=${my}$; $\\sigma_x=${sx}$ eta $\\sigma_y=${sy}$. Kalkulatu $\\sigma_{xy}$ eta r.`, `En ${n} puntos, $\\frac{\\sum x_i\\,y_i}{N}=${tex(mean)}$, $\\bar{x}=${mx}$ e $\\bar{y}=${my}$; $\\sigma_x=${sx}$ y $\\sigma_y=${sy}$. Calcula $\\sigma_{xy}$ y r.`, `في ${n} نقاط $\\frac{\\sum x_i\\,y_i}{N}=${tex(mean)}$ و$\\bar{x}=${mx}$ و$\\bar{y}=${my}$؛ و$\\sigma_x=${sx}$ و$\\sigma_y=${sy}$. احسب $\\sigma_{xy}$ وr.`, `For ${n} points, $\\frac{\\sum x_i\\,y_i}{N}=${tex(mean)}$, $\\bar{x}=${mx}$ and $\\bar{y}=${my}$; $\\sigma_x=${sx}$ and $\\sigma_y=${sy}$. Work out $\\sigma_{xy}$ and r.`),
                lines: [line(LABELS.data, `\\bar{x}\\,\\bar{y}=${mx}\\cdot ${my}=${mx * my}`), line(LABELS.step, `\\sigma_{xy}=${tex(mean)}`), line(LABELS.result, `r=\\frac{${tex(mean)}}{${sx}\\cdot ${sy}}${eq(wrongR)}${tex(wrongR)}`)],
                wrong: 1, error, fix: `\\sigma_{xy}=${tex(mean)}-${mx * my}=${tex(right)}`, right, reached
            }
        }
        case 'covariance-sum': {
            const n = pick(random, [4, 5])
            const products = Array.from({ length: n }, () => randomInt(random, -3, 9))
            const sum = products.reduce((total, value) => total + value, 0)
            const sx = pick(random, [1, 2])
            const sy = pick(random, [2, 3])
            const right = sum / n
            if (sum <= 0 || right / (sx * sy) > 1 || sum / (sx * sy) <= 1 || Math.abs(right * 100 - Math.round(right * 100)) > 1e-9) return null
            const wrongR = sum / (sx * sy)
            const written = products.map((value, index) => (index === 0 ? String(value) : value < 0 ? String(value) : `+${value}`)).join('')
            return {
                problem: say(`${n} punturen $(x-\\bar{x})(y-\\bar{y})$ biderkadurak $${products.join(',\\ ')}$ dira, eta $\\sigma_x=${sx}$, $\\sigma_y=${sy}$. Kalkulatu $\\sigma_{xy}$ eta r.`, `Los productos $(x-\\bar{x})(y-\\bar{y})$ de ${n} puntos son $${products.join(',\\ ')}$, y $\\sigma_x=${sx}$, $\\sigma_y=${sy}$. Calcula $\\sigma_{xy}$ y r.`, `جداءات $(x-\\bar{x})(y-\\bar{y})$ لـ ${n} نقاط هي $${products.join(',\\ ')}$، و$\\sigma_x=${sx}$ و$\\sigma_y=${sy}$. احسب $\\sigma_{xy}$ وr.`, `The products $(x-\\bar{x})(y-\\bar{y})$ of ${n} points are $${products.join(',\\ ')}$, and $\\sigma_x=${sx}$, $\\sigma_y=${sy}$. Work out $\\sigma_{xy}$ and r.`),
                lines: [line(LABELS.step, `${written}=${sum}`), line(LABELS.step, `\\sigma_{xy}=${sum}`), line(LABELS.result, `r=\\frac{${sum}}{${sx}\\cdot ${sy}}${eq(wrongR)}${tex(wrongR)}`)],
                wrong: 1, error, fix: `\\sigma_{xy}=\\frac{${sum}}{${n}}=${tex(right)}`, right, reached: sum
            }
        }
        case 'r-variances': {
            const sx = pick(random, [2, 3, 4])
            const sy = pick(random, [2, 3, 5])
            const r = pick(random, [0.5, 0.6, 0.75, 0.8, 0.9, -0.5, -0.8])
            const cxy = r * sx * sy
            if (Math.abs(cxy * 100 - Math.round(cxy * 100)) > 1e-9) return null
            const reached = cxy / (sx * sx * sy * sy)
            return {
                problem: say(`$\\sigma_{xy}=${tex(cxy)}$, $\\sigma_x=${sx}$ eta $\\sigma_y=${sy}$. Zenbat da r?`, `$\\sigma_{xy}=${tex(cxy)}$, $\\sigma_x=${sx}$ y $\\sigma_y=${sy}$. ¿Cuánto vale r?`, `$\\sigma_{xy}=${tex(cxy)}$ و$\\sigma_x=${sx}$ و$\\sigma_y=${sy}$. كم r؟`, `If $\\sigma_{xy}=${tex(cxy)}$, $\\sigma_x=${sx}$ and $\\sigma_y=${sy}$, what is r?`),
                lines: [line(LABELS.data, `\\sigma_x^2=${sx * sx}\\qquad\\sigma_y^2=${sy * sy}`), line(LABELS.step, `r=\\frac{${tex(cxy)}}{${sx * sx}\\cdot ${sy * sy}}${eq(reached)}${tex(reached)}`), line(LABELS.result, `|r|<0{,}3`)],
                wrong: 1, error, fix: `r=\\frac{${tex(cxy)}}{${sx}\\cdot ${sy}}=${tex(r)}`, right: r, reached
            }
        }
        case 'units-r': {
            const factor = pick(random, [10, 60, 100])
            const r = pick(random, [0.4, 0.6, 0.7, 0.85, -0.5, -0.9])
            const cxy = pick(random, [0.3, 0.5, 1.2, 2.5])
            return {
                problem: say(`x aldagaia beste unitate batera pasatzen da: ${factor} bider. Lehen $\\sigma_{xy}=${tex(cxy)}$ eta $r=${tex(r)}$ ziren. Zenbat dira orain?`, `La variable x se pasa a otra unidad: se multiplica por ${factor}. Antes, $\\sigma_{xy}=${tex(cxy)}$ y $r=${tex(r)}$. ¿Cuánto valen ahora?`, `تُحوَّل x إلى وحدة أخرى فتُضرب في ${factor}. وكان $\\sigma_{xy}=${tex(cxy)}$ و$r=${tex(r)}$. كم يصبحان الآن؟`, `The variable x is changed to another unit: it is multiplied by ${factor}. Before, $\\sigma_{xy}=${tex(cxy)}$ and $r=${tex(r)}$. What are they now?`),
                lines: [line(LABELS.step, `\\sigma_{xy}'=${factor}\\cdot ${tex(cxy)}=${tex(factor * cxy)}`), line(LABELS.result, `r'=${factor}\\cdot ${paren(r)}=${tex(factor * r)}`), line(LABELS.compare, `|r'|>1`)],
                wrong: 1, error, fix: `r'=\\frac{${factor}}{${factor}}\\cdot ${paren(r)}=${tex(r)}`, right: r, reached: factor * r
            }
        }
        case 'slope-sigma': {
            const sx = pick(random, [2, 4, 5])
            const mx = randomInt(random, 2, 6)
            const my = randomInt(random, 4, 12)
            const slope = pick(random, [0.5, 1, 1.5, 2, -0.5, -1])
            const cxy = slope * sx * sx
            const reached = cxy / sx
            const intercept = my - reached * mx
            return {
                problem: say(`$\\bar{x}=${mx}$, $\\bar{y}=${my}$, $\\sigma_x=${sx}$ eta $\\sigma_{xy}=${tex(cxy)}$. Idatzi Y-ren X-rekiko zuzena.`, `$\\bar{x}=${mx}$, $\\bar{y}=${my}$, $\\sigma_x=${sx}$ y $\\sigma_{xy}=${tex(cxy)}$. Escribe la recta de Y sobre X.`, `$\\bar{x}=${mx}$ و$\\bar{y}=${my}$ و$\\sigma_x=${sx}$ و$\\sigma_{xy}=${tex(cxy)}$. اكتب مستقيم انحدار Y على X.`, `If $\\bar{x}=${mx}$, $\\bar{y}=${my}$, $\\sigma_x=${sx}$ and $\\sigma_{xy}=${tex(cxy)}$, write the line of Y on X.`),
                lines: [line(LABELS.step, `m_{yx}=\\frac{${tex(cxy)}}{${sx}}=${tex(reached)}`), line(LABELS.step, `y-${my}=${paren(reached)}\\,(x-${mx})`), line(LABELS.result, `y=${tex(reached)}x${intercept < 0 ? '' : '+'}${tex(intercept)}`)],
                wrong: 0, error, fix: `m_{yx}=\\frac{${tex(cxy)}}{${sx}^2}=${tex(slope)}`, right: slope, reached
            }
        }
        case 'xy-solve': {
            const slope = pick(random, [2, 4, 0.5])
            const r2 = pick(random, [0.36, 0.64, 0.16])
            const coefficient = r2 / slope
            const mx = randomInt(random, 2, 6)
            const b = randomInt(random, 1, 5)
            const my = slope * mx + b
            const y = my + pick(random, [2, 4, 6])
            const reached = (y - b) / slope
            const right = mx + coefficient * (y - my)
            if (Math.abs(coefficient * 1000 - Math.round(coefficient * 1000)) > 1e-9 || Math.abs(right * 1000 - Math.round(right * 1000)) > 1e-9 || !Number.isInteger(reached * 2)) return null
            const lineText = `y=${tex(slope)}x+${b}`
            return {
                problem: say(`Y-ren X-rekiko zuzena $${lineText}$ da, $\\bar{x}=${mx}$ eta $r^2=${tex(r2)}$ izanik. Zer x estimatzen da $y=${tex(y)}$ denean?`, `La recta de Y sobre X es $${lineText}$, con $\\bar{x}=${mx}$ y $r^2=${tex(r2)}$. ¿Qué x se estima para $y=${tex(y)}$?`, `مستقيم انحدار Y على X هو $${lineText}$، مع $\\bar{x}=${mx}$ و$r^2=${tex(r2)}$. ما قيمة x المقدّرة عندما $y=${tex(y)}$؟`, `The line of Y on X is $${lineText}$, with $\\bar{x}=${mx}$ and $r^2=${tex(r2)}$. What x is estimated for $y=${tex(y)}$?`),
                lines: [line(LABELS.data, `\\bar{y}=${tex(slope)}\\cdot ${mx}+${b}=${tex(my)}`), line(LABELS.step, `${tex(y)}=${tex(slope)}x+${b}\\ \\to\\ x=${tex(reached)}`), line(LABELS.result, `x=${tex(reached)}`)],
                wrong: 1, error, fix: `\\begin{gathered}m_{xy}=\\frac{${tex(r2)}}{${tex(slope)}}=${tex(coefficient)}\\\\ x=${mx}+${tex(coefficient)}\\cdot ${tex(y - my)}=${tex(right)}\\end{gathered}`, right, reached
            }
        }
        case 'r-product': {
            const [a, c] = pick(random, [[0.8, 0.45], [0.9, 0.4], [1.6, 0.4], [2, 0.32], [0.5, 0.5], [1.2, 0.3], [-0.8, -0.45], [-1.6, -0.4]] as Array<[number, number]>)
            const reached = a * c
            const right = Math.sign(a) * Math.sqrt(a * c)
            return {
                problem: say(`Erregresio-zuzenen koefizienteak $m_{yx}=${tex(a)}$ eta $m_{xy}=${tex(c)}$ dira. Zenbat da r?`, `Los coeficientes de las rectas de regresión son $m_{yx}=${tex(a)}$ y $m_{xy}=${tex(c)}$. ¿Cuánto vale r?`, `معاملا مستقيمي الانحدار $m_{yx}=${tex(a)}$ و$m_{xy}=${tex(c)}$. كم r؟`, `The coefficients of the regression lines are $m_{yx}=${tex(a)}$ and $m_{xy}=${tex(c)}$. What is r?`),
                lines: [line(LABELS.data, `m_{yx}=${tex(a)}\\quad m_{xy}=${tex(c)}`), line(LABELS.result, `r=${paren(a)}\\cdot ${paren(c)}=${tex(reached)}`), line(LABELS.compare, `|r|<1`)],
                wrong: 1, error, fix: `r=${right < 0 ? '-' : ''}\\sqrt{${tex(reached)}}=${tex(right)}`, right, reached
            }
        }
        case 'intercept-mean': {
            const slope = pick(random, [0.5, 1.5, 2, 3, -1, -2])
            const intercept = randomInt(random, -4, 9)
            const mx = randomInt(random, 2, 6)
            const right = slope * mx + intercept
            if (intercept === 0 || right === intercept) return null
            const lineText = `y=${tex(slope)}x${intercept < 0 ? '' : '+'}${intercept}`
            return {
                problem: say(`Y-ren X-rekiko zuzena $${lineText}$ da, eta $\\bar{x}=${mx}$. Zein da grabitate-zentroa?`, `La recta de Y sobre X es $${lineText}$ y $\\bar{x}=${mx}$. ¿Cuál es el centro de gravedad?`, `مستقيم انحدار Y على X هو $${lineText}$ و$\\bar{x}=${mx}$. ما مركز الثقل؟`, `The line of Y on X is $${lineText}$ and $\\bar{x}=${mx}$. What is the centre of gravity?`),
                lines: [line(LABELS.data, `m_{yx}=${tex(slope)}`), line(LABELS.result, `\\bar{y}=${intercept}`), line(LABELS.compare, `(\\bar{x},\\,\\bar{y})=(${mx},\\,${intercept})`)],
                wrong: 1, error, fix: `\\bar{y}=${paren(slope)}\\cdot ${mx}${intercept < 0 ? '' : '+'}${intercept}=${tex(right)}`, right, reached: intercept
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBivarDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bivarDetectiveLevels[levelIndex], BIVAR_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}
