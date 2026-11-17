import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J3 · Estatistikaren detektibea (Detective de estadística), 1.º Sociales:
   a worked solution of three lines with one wrong line, the mistakes of
   this unit. Level 1 (data and centre): the height of a bar taken as f
   with intervals of different widths, the mean of two groups as the half
   of their means, the cumulative percentage worked out with f and not F,
   a point of the polygon put at the class mark. Level 2 (percentiles of
   grouped data): dividing by the cumulative percentage H_i instead of h_i,
   the class mark given as the percentile, multiplying by the upper end
   instead of the width, the percentile of a value read at the upper end.
   Level 3 (interpret): the cut intervals counted whole, the band with σ²,
   more data in the longer stretch between quartiles, the CV upside down.
   `right` and `reached` only tell the cases apart.
   ========================================================================== */

export type SocialStatsDetectiveError =
    | 'height-f'
    | 'mean-of-means'
    | 'cumulative-f'
    | 'point-mark'
    | 'divide-cumulative'
    | 'class-mark'
    | 'times-end'
    | 'value-upper'
    | 'whole-interval'
    | 'band-variance'
    | 'quartile-length'
    | 'cv-inverse'

export const socialStatsDetectiveLevels: SocialStatsDetectiveError[][] = [
    ['height-f', 'mean-of-means', 'cumulative-f', 'point-mark'],
    ['divide-cumulative', 'class-mark', 'times-end', 'value-upper'],
    ['whole-interval', 'band-variance', 'quartile-length', 'cv-inverse']
]

export const SOCIAL_STATS_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
/** A decimal for LaTeX: 2{,}5, 12 */
const tex = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')
const short = (value: number) => Math.abs(Math.round(value * 100) - value * 100) < 1e-9
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    data: say('Datuak', 'Datos', 'البيانات', 'Data'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    compare: say('Konparatu', 'Compara', 'قارن', 'Compare')
}

export const socialStatsDetectiveNames: Record<SocialStatsDetectiveError, LocalizedText> = {
    'height-f': say('Barraren altuera $f_i$ dela uste izan du', 'Tomó como altura de la barra su $f_i$', 'اعتبر ارتفاع العمود هو $f_i$', 'Took the height of the bar as its $f_i$'),
    'mean-of-means': say('Bi batez bestekoen erdia egin du', 'Hizo la mitad de las dos medias', 'أخذ نصف مجموع المتوسطين', 'Took half the sum of the two means'),
    'cumulative-f': say('Ehuneko metatua $f_i$ erabilita kalkulatu du, ez $F_i$', 'Calculó el porcentaje acumulado con $f_i$, no con $F_i$', 'حسب النسبة المتجمّعة بـ $f_i$ لا بـ $F_i$', 'Worked out the cumulative percentage with $f_i$, not $F_i$'),
    'point-mark': say('Poligonoaren puntua klase-markan jarri du', 'Puso el punto del polígono en la marca de clase', 'وضع نقطة المضلّع عند مركز الفئة', 'Put the point of the polygon at the class mark'),
    'divide-cumulative': say('$H_i$ metatuaz zatitu du, ez $h_i$ zenbakiaz', 'Dividió entre el acumulado $H_i$, no entre $h_i$', 'قسم على المتجمّع $H_i$ لا على $h_i$', 'Divided by the cumulative $H_i$, not by $h_i$'),
    'class-mark': say('Klase-marka eman du pertzentiltzat', 'Dio la marca de clase como percentil', 'أعطى مركز الفئة على أنه المئين', 'Gave the class mark as the percentile'),
    'times-end': say('Goiko muturraz biderkatu du, ez zabaleraz', 'Multiplicó por el extremo superior, no por la amplitud', 'ضرب في الطرف الأعلى لا في الطول', 'Multiplied by the upper end, not by the width'),
    'value-upper': say('Goiko muturreko ehunekoa hartu du', 'Tomó el porcentaje del extremo superior', 'أخذ نسبة الطرف الأعلى', 'Took the percentage at the upper end'),
    'whole-interval': say('Muturretako tartea osorik zenbatu du', 'Contó entero el intervalo del extremo', 'عدّ فئة الطرف كاملة', 'Counted the interval at the end whole'),
    'band-variance': say('Banda $\\sigma^2$ erabilita kalkulatu du', 'Calculó la banda con $\\sigma^2$', 'حسب النطاق باستعمال $\\sigma^2$', 'Worked out the band with $\\sigma^2$'),
    'quartile-length': say('Tarte luzeagoan datu gehiago daudela uste izan du', 'Creyó que en el tramo más largo hay más datos', 'ظن أن الجزء الأطول فيه بيانات أكثر', 'Thought the longer stretch holds more data'),
    'cv-inverse': say('$CV$ alderantziz idatzi du', 'Escribió el $CV$ al revés', 'كتب $CV$ مقلوبًا', 'Wrote the $CV$ upside down')
}

export const socialStatsDetectiveTips: Record<SocialStatsDetectiveError, LocalizedText> = {
    'height-f': say('Histograman maiztasuna azalera da: altuera $\\frac{f_i}{a_i}$ da.', 'En el histograma la frecuencia es el área: la altura es $\\frac{f_i}{a_i}$.', 'في المدرّج التكرار هو المساحة: الارتفاع $\\frac{f_i}{a_i}$.', 'In the histogram the frequency is the area: the height is $\\frac{f_i}{a_i}$.'),
    'mean-of-means': say('Batu bi taldeen guztizkoak, $N_A\\,\\bar{x}_A+N_B\\,\\bar{x}_B$, eta zatitu guztien kopuruaz.', 'Suma los totales de los dos grupos, $N_A\\,\\bar{x}_A+N_B\\,\\bar{x}_B$, y divide entre todos.', 'اجمع مجموعي المجموعتين $N_A\\,\\bar{x}_A+N_B\\,\\bar{x}_B$ واقسم على الكل.', 'Add the totals of the two groups, $N_A\\,\\bar{x}_A+N_B\\,\\bar{x}_B$, and divide by everyone.'),
    'cumulative-f': say('Ehuneko metatua $\\frac{F_i}{N}\\cdot 100$ da: aurreko guztiak batuta.', 'El porcentaje acumulado es $\\frac{F_i}{N}\\cdot 100$: con todos los anteriores.', 'النسبة المتجمّعة $\\frac{F_i}{N}\\cdot 100$: بكل ما قبلها.', 'The cumulative percentage is $\\frac{F_i}{N}\\cdot 100$: with all the earlier ones.'),
    'point-mark': say('Puntua goiko muturrean doa: balio horretaraino iristen da ehuneko metatua.', 'El punto va en el extremo superior: hasta ese valor llega el porcentaje acumulado.', 'توضع النقطة عند الطرف الأعلى: حتى تلك القيمة تصل النسبة المتجمّعة.', 'The point goes at the upper end: the cumulative percentage reaches up to that value.'),
    'divide-cumulative': say('Zatitu tartearen beraren ehunekoaz, $h_i$: poligonoak tarte horretan igotzen duena.', 'Divide entre el porcentaje del propio intervalo, $h_i$: lo que sube el polígono en ese tramo.', 'اقسم على نسبة الفئة نفسها $h_i$: أي ما يصعده المضلّع في ذلك الجزء.', 'Divide by the percentage of the interval itself, $h_i$: how much the polygon rises over that stretch.'),
    'class-mark': say('Interpolatu: $P_k=L_i+\\frac{k-H_{i-1}}{h_i}\\cdot a_i$.', 'Interpola: $P_k=L_i+\\frac{k-H_{i-1}}{h_i}\\cdot a_i$.', 'استكمل: $P_k=L_i+\\frac{k-H_{i-1}}{h_i}\\cdot a_i$.', 'Interpolate: $P_k=L_i+\\frac{k-H_{i-1}}{h_i}\\cdot a_i$.'),
    'times-end': say('Zatia tartearen zabaleraz biderkatzen da, $a_i$, eta beheko muturrari batzen zaio.', 'La parte se multiplica por la amplitud $a_i$ y se suma al extremo inferior.', 'يُضرب الجزء في الطول $a_i$ ويُضاف إلى الطرف الأدنى.', 'The part is multiplied by the width $a_i$ and added to the lower end.'),
    'value-upper': say('Interpolatu tartearen barruan: $k=H_{i-1}+\\frac{x-L_i}{a_i}\\cdot h_i$.', 'Interpola dentro del intervalo: $k=H_{i-1}+\\frac{x-L_i}{a_i}\\cdot h_i$.', 'استكمل داخل الفئة: $k=H_{i-1}+\\frac{x-L_i}{a_i}\\cdot h_i$.', 'Interpolate inside the interval: $k=H_{i-1}+\\frac{x-L_i}{a_i}\\cdot h_i$.'),
    'whole-interval': say('Muturretako tartetik, barruko zatia bakarrik: zabaleraren zati bera, maiztasunaren zati bera.', 'Del intervalo del extremo, solo la parte de dentro: la misma parte de la amplitud, de la frecuencia.', 'من فئة الطرف الجزء الداخلي فقط: الجزء نفسه من الطول هو الجزء نفسه من التكرار.', 'From the interval at the end, only the part inside: the same part of the width, of the frequency.'),
    'band-variance': say('Banda $\\bar{x}\\pm\\sigma$ da, datuen unitateetan.', 'La banda es $\\bar{x}\\pm\\sigma$, en las unidades de los datos.', 'النطاق هو $\\bar{x}\\pm\\sigma$ بوحدات البيانات.', 'The band is $\\bar{x}\\pm\\sigma$, in the units of the data.'),
    'quartile-length': say('Ondoz ondoko bi kuartilen artean beti % 25 dago.', 'Entre dos cuartiles seguidos siempre está el 25 %.', 'بين ربيعيين متتاليين دائمًا 25٪.', 'Between two consecutive quartiles there is always 25%.'),
    'cv-inverse': say('$CV=\\frac{\\sigma}{\\bar{x}}$: $\\sigma$ goian.', '$CV=\\frac{\\sigma}{\\bar{x}}$: $\\sigma$ arriba.', '$CV=\\frac{\\sigma}{\\bar{x}}$: $\\sigma$ في الأعلى.', '$CV=\\frac{\\sigma}{\\bar{x}}$: $\\sigma$ on top.')
}

type Built = Omit<WorkedCase<SocialStatsDetectiveError>, 'options'>

/** A table of four intervals as a percentage set, for the polygon cases */
const SETS = [[10, 30, 40, 20], [20, 40, 30, 10], [15, 35, 30, 20], [20, 30, 40, 10], [10, 40, 25, 25]]

function build(random: Random, error: SocialStatsDetectiveError): Built | null {
    switch (error) {
        case 'height-f': {
            const from = pick(random, [0, 10, 20])
            const width = pick(random, [4, 5, 20])
            const count = width * randomInt(random, 2, 9)
            const right = count / width
            return {
                problem: say(`$[${from},${from + width})$ tartean ${count} datu daude. Zer altuera du haren barrak?`, `El intervalo $[${from},${from + width})$ tiene ${count} datos. ¿Qué altura tiene su barra?`, `في الفئة $[${from},${from + width})$ يوجد ${count} بيانًا. ما ارتفاع عمودها؟`, `The interval $[${from},${from + width})$ has ${count} data. How tall is its bar?`),
                lines: [line(LABELS.data, `a=${from + width}-${from}=${width}`), line(LABELS.data, `f=${count}`), line(LABELS.result, `${count}`)],
                wrong: 2, error, fix: `\\frac{${count}}{${width}}=${tex(right)}`, right, reached: count
            }
        }
        case 'mean-of-means': {
            const a = randomInt(random, 10, 40)
            const b = randomInt(random, 5, 20)
            const meanA = randomInt(random, 4, 9)
            const meanB = meanA + randomInt(random, 1, 4)
            const total = a * meanA + b * meanB
            const right = total / (a + b)
            const reached = (meanA + meanB) / 2
            if (a === b || !short(right) || !short(reached)) return null
            return {
                problem: say(`${a} ikaslek batez beste ${meanA} lortu dute, eta ${b} ikaslek, ${meanB}. Zein da guztien batez bestekoa?`, `${a} alumnos tienen media ${meanA} y ${b} alumnos, ${meanB}. ¿Cuál es la media de todos?`, `${a} طالبًا متوسطهم ${meanA} و${b} طالبًا متوسطهم ${meanB}. ما متوسط الجميع؟`, `${a} students have a mean of ${meanA} and ${b} students, ${meanB}. What is the mean of all of them?`),
                lines: [line(LABELS.data, `N=${a}+${b}=${a + b}`), line(LABELS.step, `\\frac{${meanA}+${meanB}}{2}=${tex(reached)}`), line(LABELS.result, `\\bar{x}=${tex(reached)}`)],
                wrong: 1, error, fix: `\\frac{${a}\\cdot ${meanA}+${b}\\cdot ${meanB}}{${a + b}}=${tex(right)}`, right, reached
            }
        }
        case 'cumulative-f': {
            const counts = [randomInt(random, 2, 8), randomInt(random, 4, 12), randomInt(random, 4, 12), randomInt(random, 2, 8)]
            const total = counts.reduce((sum, count) => sum + count, 0)
            if (![20, 25, 40, 50].includes(total)) return null
            const cumulative = counts[0] + counts[1] + counts[2]
            const right = (cumulative / total) * 100
            const reached = (counts[2] / total) * 100
            return {
                problem: say(`Maiztasunak $${counts.join(',\\ ')}$ dira. Zer ehuneko metatu du hirugarren tarteak?`, `Las frecuencias son $${counts.join(',\\ ')}$. ¿Qué porcentaje acumulado tiene el tercer intervalo?`, `التكرارات $${counts.join(',\\ ')}$. ما النسبة المتجمّعة للفئة الثالثة؟`, `The frequencies are $${counts.join(',\\ ')}$. What cumulative percentage does the third interval have?`),
                lines: [line(LABELS.data, `N=${total}`), line(LABELS.step, `\\frac{${counts[2]}}{${total}}\\cdot 100=${tex(reached)}`), line(LABELS.result, `H_3=${tex(reached)}`)],
                wrong: 1, error, fix: `F_3=${cumulative}\\ \\to\\ \\frac{${cumulative}}{${total}}\\cdot 100=${tex(right)}`, right, reached
            }
        }
        case 'point-mark': {
            const from = pick(random, [10, 20, 30, 40])
            const width = pick(random, [10, 20])
            const percent = pick(random, [20, 30, 40, 60])
            const right = from + width
            const reached = from + width / 2
            return {
                problem: say(`$[${from},${from + width})$ tartean % ${percent} metatua lortzen da. Non dago poligonoaren puntua?`, `En el intervalo $[${from},${from + width})$ se llega al ${percent} % acumulado. ¿Dónde va el punto del polígono?`, `في الفئة $[${from},${from + width})$ نصل إلى ${percent}٪ متجمّعة. أين توضع نقطة المضلّع؟`, `In the interval $[${from},${from + width})$ the cumulative percentage reaches ${percent}%. Where does the point of the polygon go?`),
                lines: [line(LABELS.data, `H=${percent}`), line(LABELS.step, `x=\\frac{${from}+${from + width}}{2}=${tex(reached)}`), line(LABELS.result, `(${tex(reached)},\\,${percent})`)],
                wrong: 1, error, fix: `x=${right}\\ \\to\\ (${right},\\,${percent})`, right, reached
            }
        }
        case 'divide-cumulative':
        case 'class-mark':
        case 'times-end': {
            const percents = pick(random, SETS)
            const width = pick(random, [10, 20])
            const start = pick(random, [0, 20, 40])
            const k = pick(random, [25, 50, 75])
            let before = 0
            let index = 0
            while (k > before + percents[index]) before += percents[index++]
            const from = start + index * width
            const share = (k - before) / percents[index]
            const right = from + share * width
            if (before === k || !short(right)) return null
            const H = before + percents[index]
            const name = k === 25 ? 'Q_1' : k === 50 ? 'Me' : 'Q_3'
            const problem = say(`Ehunekoak: $${percents.join(',\\ ')}$, $${width}$ zabalerako tarteetan, ${start} zenbakitik hasita. Aurkitu $${name}$.`, `Porcentajes: $${percents.join(',\\ ')}$, en intervalos de amplitud $${width}$ desde ${start}. Halla $${name}$.`, `النسب: $${percents.join(',\\ ')}$ في فئات طولها $${width}$ بدءًا من ${start}. أوجد $${name}$.`, `Percentages: $${percents.join(',\\ ')}$, in intervals of width $${width}$ from ${start}. Find $${name}$.`)
            const where = line(LABELS.data, `[${from},${from + width}):\\ H_{i-1}=${before},\\ h_i=${percents[index]}`)
            if (error === 'divide-cumulative') {
                const reached = from + ((k - before) / H) * width
                if (!short(reached)) return null
                return { problem, lines: [where, line(LABELS.step, `\\frac{${k}-${before}}{${H}}\\cdot ${width}=${tex(reached - from)}`), line(LABELS.result, `${name}=${tex(reached)}`)], wrong: 1, error, fix: `\\frac{${k}-${before}}{${percents[index]}}\\cdot ${width}=${tex(right - from)}\\ \\to\\ ${tex(right)}`, right, reached }
            }
            if (error === 'class-mark') {
                const reached = from + width / 2
                return { problem, lines: [where, line(LABELS.step, `\\frac{${from}+${from + width}}{2}=${tex(reached)}`), line(LABELS.result, `${name}=${tex(reached)}`)], wrong: 1, error, fix: `${from}+\\frac{${k}-${before}}{${percents[index]}}\\cdot ${width}=${tex(right)}`, right, reached }
            }
            const reached = from + share * (from + width)
            return { problem, lines: [where, line(LABELS.step, `\\frac{${k}-${before}}{${percents[index]}}=${tex(share)}`), line(LABELS.result, `${name}=${from}+${tex(share)}\\cdot ${from + width}=${tex(reached)}`)], wrong: 2, error, fix: `${name}=${from}+${tex(share)}\\cdot ${width}=${tex(right)}`, right, reached }
        }
        case 'value-upper': {
            const percents = pick(random, SETS)
            const width = pick(random, [10, 20])
            const start = pick(random, [0, 20, 40])
            const index = randomInt(random, 1, 2)
            const before = percents.slice(0, index).reduce((sum, value) => sum + value, 0)
            const from = start + index * width
            const x = from + width / 2
            const right = before + percents[index] / 2
            const reached = before + percents[index]
            return {
                problem: say(`Ehunekoak: $${percents.join(',\\ ')}$, $${width}$ zabalerako tarteetan, ${start} zenbakitik hasita. Zer pertzentil du ${x} balioak?`, `Porcentajes: $${percents.join(',\\ ')}$, en intervalos de amplitud $${width}$ desde ${start}. ¿Qué percentil tiene el valor ${x}?`, `النسب: $${percents.join(',\\ ')}$ في فئات طولها $${width}$ بدءًا من ${start}. ما مئين القيمة ${x}؟`, `Percentages: $${percents.join(',\\ ')}$, in intervals of width $${width}$ from ${start}. What percentile does the value ${x} have?`),
                lines: [line(LABELS.data, `${x}\\in[${from},${from + width})`), line(LABELS.step, `H_i=${before}+${percents[index]}=${reached}`), line(LABELS.result, `k=${reached}`)],
                wrong: 2, error, fix: `k=${before}+\\frac{${x}-${from}}{${width}}\\cdot ${percents[index]}=${tex(right)}`, right, reached
            }
        }
        case 'whole-interval': {
            const width = pick(random, [2, 4])
            const start = pick(random, [10, 20, 30])
            const a = 4 * randomInt(random, 5, 20)
            const b = 4 * randomInt(random, 10, 40)
            const share = pick(random, [0.25, 0.5, 0.75])
            const low = start + (1 - share) * width
            const high = start + 2 * width
            const part = a * share
            const right = part + b
            const reached = a + b
            return {
                problem: say(`$[${start},${start + width})$ tartean ${a} pieza daude, eta $[${start + width},${start + 2 * width})$ tartean ${b}. Zenbat daude ${tex(low)} eta ${high} artean?`, `Hay ${a} piezas en $[${start},${start + width})$ y ${b} en $[${start + width},${start + 2 * width})$. ¿Cuántas hay entre ${tex(low)} y ${high}?`, `هناك ${a} قطعة في $[${start},${start + width})$ و${b} في $[${start + width},${start + 2 * width})$. كم قطعة بين ${tex(low)} و${high}؟`, `There are ${a} parts in $[${start},${start + width})$ and ${b} in $[${start + width},${start + 2 * width})$. How many are between ${tex(low)} and ${high}?`),
                lines: [line(LABELS.step, `${tex(low)}\\in[${start},${start + width})\\ \\to\\ ${a}`), line(LABELS.step, `[${start + width},${start + 2 * width})\\ \\to\\ ${b}`), line(LABELS.result, `${a}+${b}=${reached}`)],
                wrong: 0, error, fix: `\\frac{${start + width}-${tex(low)}}{${width}}\\cdot ${a}=${tex(part)}\\ \\to\\ ${tex(right)}`, right, reached
            }
        }
        case 'band-variance': {
            const mean = randomInt(random, 20, 60)
            const sigma = randomInt(random, 2, 5)
            const right = mean + sigma
            const reached = mean + sigma * sigma
            return {
                problem: say(`$\\bar{x}=${mean}$ eta $\\sigma^2=${sigma * sigma}$. Zein da $\\bar{x}+\\sigma$ muga?`, `$\\bar{x}=${mean}$ y $\\sigma^2=${sigma * sigma}$. ¿Cuál es el extremo $\\bar{x}+\\sigma$?`, `$\\bar{x}=${mean}$ و$\\sigma^2=${sigma * sigma}$. ما الطرف $\\bar{x}+\\sigma$؟`, `$\\bar{x}=${mean}$ and $\\sigma^2=${sigma * sigma}$. What is the end $\\bar{x}+\\sigma$?`),
                lines: [line(LABELS.data, `\\sigma^2=${sigma * sigma}`), line(LABELS.step, `\\bar{x}+\\sigma=${mean}+${sigma * sigma}`), line(LABELS.result, `${reached}`)],
                wrong: 1, error, fix: `\\sigma=\\sqrt{${sigma * sigma}}=${sigma}\\ \\to\\ ${mean}+${sigma}=${right}`, right, reached
            }
        }
        case 'quartile-length': {
            const total = pick(random, [200, 400, 800])
            const q1 = randomInt(random, 10, 30)
            const me = q1 + randomInt(random, 2, 6)
            const q3 = me + randomInt(random, 7, 15)
            const right = total / 4
            const reached = total / 2 * ((q3 - me) / (q3 - q1))
            if (!Number.isInteger(reached) || reached === right) return null
            return {
                problem: say(`${total} datutan $Q_1=${q1}$, $Me=${me}$ eta $Q_3=${q3}$. Zenbat datu daude $Me$ eta $Q_3$ artean?`, `En ${total} datos, $Q_1=${q1}$, $Me=${me}$ y $Q_3=${q3}$. ¿Cuántos datos hay entre $Me$ y $Q_3$?`, `في ${total} بيان $Q_1=${q1}$ و$Me=${me}$ و$Q_3=${q3}$. كم بيانًا بين $Me$ و$Q_3$؟`, `In ${total} data, $Q_1=${q1}$, $Me=${me}$ and $Q_3=${q3}$. How many data are between $Me$ and $Q_3$?`),
                lines: [line(LABELS.data, `Q_3-Q_1=${q3 - q1}`), line(LABELS.step, `\\frac{${q3 - me}}{${q3 - q1}}\\cdot ${total / 2}=${reached}`), line(LABELS.result, `${reached}`)],
                wrong: 1, error, fix: `0{,}25\\cdot ${total}=${right}`, right, reached
            }
        }
        case 'cv-inverse': {
            const mean = pick(random, [20, 25, 40, 50])
            const sigma = pick(random, [2, 4, 5, 10].filter((value) => mean % value === 0))
            return {
                problem: say(`$\\bar{x}=${mean}$ eta $\\sigma=${sigma}$. Kalkulatu aldakuntza-koefizientea.`, `$\\bar{x}=${mean}$ y $\\sigma=${sigma}$. Calcula el coeficiente de variación.`, `$\\bar{x}=${mean}$ و$\\sigma=${sigma}$. احسب معامل الاختلاف.`, `$\\bar{x}=${mean}$ and $\\sigma=${sigma}$. Work out the coefficient of variation.`),
                lines: [line(LABELS.data, `\\bar{x}=${mean}`), line(LABELS.data, `\\sigma=${sigma}`), line(LABELS.result, `CV=\\frac{${mean}}{${sigma}}=${mean / sigma}`)],
                wrong: 2, error, fix: `CV=\\frac{${sigma}}{${mean}}=${tex(sigma / mean)}`, right: sigma / mean, reached: mean / sigma
            }
        }
    }
}

export function createSocialStatsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, socialStatsDetectiveLevels[levelIndex] ?? socialStatsDetectiveLevels[0], SOCIAL_STATS_DETECTIVE_CASES, build)
    let made = draw()
    // No two cases with the same statement in one game
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}
