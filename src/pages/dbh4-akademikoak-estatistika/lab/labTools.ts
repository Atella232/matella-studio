import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { centreChallenges, cumulativeChallenges, histogramChallenges } from '../../dbh2-estatistika-v2/lab/labTools.ts'
import { intervalsChallenges, percentileChallenges, scatterChallenges, tableChallenges, whiskersChallenges } from '../../dbh4-aplikatuak-estatistika/lab/labTools.ts'
import type { StatisticsAkStageId } from '../lessons.tsx'

/* ==========================================================================
   Estatistika (4. DBH akademikoak) laboratory. The cumulative table, the
   histogram and the centre of a table come from 2. DBH, and the intervals,
   percentiles, whiskers, σ of a table and the cloud with its regression
   line from 4. DBH aplikatuak, each with its own challenges. The new
   tools: a stratified sample of four courses; two groups joined on a
   balance; five data with their mean deviation and σ; and the data
   a·x + b with their mean, σ and CV. Pure state logic; the components
   live next to this file. Tests in tests/estatistika-dbh4ak-lab.test.ts.
   ========================================================================== */

export type StatisticsAkLabToolId = 'strata' | 'cumulative' | 'intervals' | 'balance' | 'centre' | 'histogram' | 'percentile' | 'whiskers' | 'deviation' | 'table' | 'transform' | 'scatter'

export interface StatisticsAkLabTool extends LabToolInfo {
    id: StatisticsAkLabToolId
    stage: StatisticsAkStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)
const equals = (value: FractionValue | null, numerator: number, denominator = 1) => value !== null && value.numerator * denominator === numerator * value.denominator
const setAt = <T,>(list: T[], index: number, value: T) => list.map((item, position) => (position === index ? value : item))
/** A multiple of step between min and max */
const snap = (value: number, min: number, max: number, step: number) => Math.min(max, Math.max(min, Math.round(value / step) * step))

export const statisticsAkLabTools: StatisticsAkLabTool[] = [
    { id: 'strata', stage: 'data', lessonTopic: 'sampling', title: say('Lagin geruzatua', 'La muestra estratificada', 'العيّنة الطبقية', 'The stratified sample'), observe: say('Maila bakoitzak laginean duen zatia populazioan duen bera da: n · Nᵢ : N. Maila bat handitzean, haren zatia hazten da eta besteena txikitzen.', 'Cada curso tiene en la muestra la misma fracción que en la población: n · Nᵢ : N. Al agrandar un curso, su parte crece y la de los demás mengua.', 'لكل صف في العيّنة الكسر نفسه الذي له في المجتمع: n · Nᵢ : N. وعند تكبير صف يكبر نصيبه ويصغر نصيب البقية.', 'Each year group has in the sample the same fraction as in the population: n · Nᵢ : N. When you enlarge one year group, its share grows and the others\' shares shrink.') },
    { id: 'cumulative', stage: 'data', lessonTopic: 'frequencies', title: say('Maiztasun metatuak', 'Frecuencias acumuladas', 'التكرارات المتجمّعة', 'Cumulative frequencies'), observe: say('Maiztasun bat aldatzean, haren azpiko metatu guztiak aldatzen dira, baina gainekoak ez. Azken metatua beti N da, eta erlatibo metatuaren azkena 1.', 'Al cambiar una frecuencia, cambian todas las acumuladas de debajo, pero no las de arriba. La última acumulada es siempre N, y la última relativa acumulada, 1.', 'عند تغيير تكرار تتغيّر كل المتجمّعات التي تحته، لا التي فوقه. وآخر متجمّع دائمًا N، وآخر متجمّع نسبي 1.', 'When you change a frequency, all the cumulative frequencies below it change, but not those above. The last cumulative frequency is always N, and the last cumulative relative frequency is 1.') },
    { id: 'intervals', stage: 'data', lessonTopic: 'intervals', title: say('Tarteak egiten', 'Haciendo intervalos', 'صنع الفئات', 'Making intervals'), observe: say('Tarte kopurua aldatzean zabalera eta hasiera aldatzen dira, baina datuak eta haien kopurua ez. Tarte gutxirekin xehetasuna galtzen da; gehiegirekin, tarte hutsak agertzen dira.', 'Al cambiar el número de intervalos cambian la amplitud y el comienzo, pero no los datos ni su número. Con pocos intervalos se pierde detalle; con demasiados, aparecen intervalos vacíos.', 'عند تغيير عدد الفئات يتغيّر الطول والبداية، لا البيانات ولا عددها. مع فئات قليلة تضيع التفاصيل، ومع فئات كثيرة تظهر فئات فارغة.', 'When you change the number of intervals, the width and the starting point change, but not the data or how many there are. With too few intervals you lose detail; with too many, empty intervals appear.') },
    { id: 'balance', stage: 'centre', lessonTopic: 'mean', title: say('Bi taldeen balantza', 'La balanza de dos grupos', 'ميزان المجموعتين', 'The two-group balance'), observe: say('Batez besteko bateratua bi batez bestekoen artean dago beti, eta talde handienera hurbiltzen da. Taldeak berdinak badira, erdian geratzen da.', 'La media conjunta está siempre entre las dos medias y se acerca al grupo más numeroso. Si los grupos son iguales, queda en el punto medio.', 'المتوسط المشترك يقع دائمًا بين المتوسطين ويقترب من المجموعة الأكبر. وإذا تساوت المجموعتان كان في المنتصف.', 'The combined mean is always between the two means and is closer to the larger group. If the groups are equal in size, it sits right in the middle.') },
    { id: 'centre', stage: 'centre', lessonTopic: 'median-mode', title: say('Batez bestekoa, mediana eta moda', 'Media, mediana y moda', 'المتوسط والوسيط والمنوال', 'Mean, median and mode'), observe: say('Muturreko balio baten maiztasuna igotzean, batez bestekoa asko mugitzen da; mediana gutxi, eta moda bakarrik maiztasun handiena aldatzen bada.', 'Al subir la frecuencia de un valor extremo, la media se mueve mucho; la mediana poco, y la moda solo si cambia la mayor frecuencia.', 'عند رفع تكرار قيمة متطرفة يتحرك المتوسط كثيرًا، والوسيط قليلًا، والمنوال فقط إذا تغيّر أكبر تكرار.', 'When you raise the frequency of an extreme value, the mean moves a lot; the median moves very little, and the mode only if the highest frequency changes.') },
    { id: 'histogram', stage: 'centre', lessonTopic: 'grouped-centre', title: say('Histograma eta batez bestekoa', 'Histograma y media', 'المدرّج والمتوسط', 'Histogram and mean'), observe: say('Tarte bakoitzeko datuak haren klase-markan daudela onartzen da. Laukizuzen altuenak tarte modala adierazten du.', 'Se admite que los datos de cada intervalo están en su marca de clase. El rectángulo más alto señala el intervalo modal.', 'نقبل أن بيانات كل فئة موجودة في مركزها. وأعلى مستطيل يدل على الفئة المنوالية.', 'It is assumed that the data in each interval are at its class midpoint. The tallest rectangle shows the modal interval.') },
    { id: 'percentile', stage: 'position', lessonTopic: 'percentiles', title: say('Pertzentilen zinta', 'La cinta de los percentiles', 'شريط المئينات', 'The percentile tape'), observe: say('Ehuneko metatuen zintan, pk zinta k-n mozten den balioa da. Maiztasun bat aldatzean, bloke guztiak mugitzen dira.', 'En la cinta de porcentajes acumulados, pk es el valor donde se corta la cinta en k. Al cambiar una frecuencia, se mueven todos los bloques.', 'في شريط النسب المتجمّعة، pk هي القيمة التي يُقطع عندها الشريط في k. وعند تغيير تكرار تتحرك كل الكتل.', 'On the cumulative percentage tape, pk is the value where the tape is cut at k. When you change a frequency, all the blocks move.') },
    { id: 'whiskers', stage: 'position', lessonTopic: 'box-plot', title: say('Kuartilak, biboteak eta atipikoak', 'Cuartiles, bigotes y atípicos', 'الربيعيات والشاربان والشواذ', 'Quartiles, whiskers and outliers'), observe: say('Biboteek gehienez kutxa bider 1,5 neurtzen dute. Datu bat urruntzen bada, atipiko bihurtzen da, baina kuartilak ez dira aldatzen.', 'Los bigotes miden como mucho 1,5 veces la caja. Si un dato se aleja, se vuelve atípico, pero los cuartiles no cambian.', 'يبلغ طول الشاربين على الأكثر 1.5 مرة الصندوق. وإذا ابتعد بيان صار شاذًا، لكن الربيعيات لا تتغيّر.', 'The whiskers reach at most 1.5 times the box length. If a value moves away, it becomes an outlier, but the quartiles do not change.') },
    { id: 'deviation', stage: 'spread', lessonTopic: 'mean-deviation', title: say('Distantziak eta karratuak', 'Distancias y cuadrados', 'المسافات والمربعات', 'Distances and squares'), observe: say('DM-k distantziak batzen ditu; bariantzak, haien karratuak. Horregatik datu urrun batek σ gehiago igotzen du DM baino.', 'La DM suma las distancias; la varianza, sus cuadrados. Por eso un dato lejano sube σ más que la DM.', 'DM يجمع المسافات، والتباين مربعاتها. لذلك يرفع البيان البعيد σ أكثر من DM.', 'The MD adds up the distances; the variance adds up their squares. That is why a distant value raises σ more than the MD does.') },
    { id: 'table', stage: 'spread', lessonTopic: 'variance', title: say('Taula baten desbideratze tipikoa', 'La desviación típica de una tabla', 'الانحراف المعياري لجدول', 'The standard deviation of a table'), observe: say('Maiztasunak muturretara eramatean σ hazten da; erdira biltzean, txikitzen. Maiztasun guztiak bikoiztuz, x̄ eta σ ez dira aldatzen.', 'Al llevar las frecuencias a los extremos σ crece; al juntarlas en el centro, mengua. Si se duplican todas las frecuencias, x̄ y σ no cambian.', 'عند نقل التكرارات إلى الطرفين يكبر σ، وعند جمعها في الوسط يصغر. وإذا ضوعفت كل التكرارات لا يتغيّر x̄ ولا σ.', 'When you move the frequencies to the extremes, σ grows; when you bring them together in the centre, it shrinks. If all the frequencies are doubled, x̄ and σ do not change.') },
    { id: 'transform', stage: 'spread', lessonTopic: 'cv', title: say('Datuak aldatzen: a · x + b', 'Cambia los datos: a · x + b', 'غيّر البيانات: a · x + b', 'Change the data: a · x + b'), observe: say('b batzean, batez bestekoa b mugitzen da eta σ ez da aldatzen. a biderkatzean, biak a aldiz biderkatzen dira, eta CV ez da aldatzen.', 'Al sumar b, la media se desplaza b y σ no cambia. Al multiplicar por a, las dos se multiplican por a, y el CV no cambia.', 'عند إضافة b ينزاح المتوسط بمقدار b ولا يتغيّر σ. وعند الضرب في a يُضرب كلاهما في a ولا يتغيّر CV.', 'When you add b, the mean shifts by b and σ does not change. When you multiply by a, both are multiplied by a, and the CV does not change.') },
    { id: 'scatter', stage: 'two', lessonTopic: 'regression', title: say('Hodeia, r eta erregresio-zuzena', 'La nube, r y la recta de regresión', 'السحابة وr ومستقيم الانحدار', 'The cloud, r and the regression line'), observe: say('Puntuak zuzen batera hurbiltzean |r| 1era hurbiltzen da. Zuzena beti batez bestekoen puntutik pasatzen da; estimazioa fidagarria da |r| handia bada eta x datuen artean badago.', 'Al acercar los puntos a una recta, |r| se acerca a 1. La recta pasa siempre por el punto de las medias; la estimación es fiable si |r| es grande y x está entre los datos.', 'عند تقريب النقاط من مستقيم يقترب |r| من 1. ويمرّ المستقيم دائمًا بنقطة المتوسطين؛ ويكون التقدير موثوقًا إذا كان |r| كبيرًا وx بين البيانات.', 'When you bring the points closer to a straight line, |r| gets closer to 1. The regression line always passes through the point of means; the estimate is reliable if |r| is large and x lies between the data values.') }
]

export const statisticsAkLabToolForTopic: Record<string, StatisticsAkLabToolId | undefined> = {
    sampling: 'strata',
    frequencies: 'cumulative',
    intervals: 'intervals',
    mean: 'balance',
    'median-mode': 'centre',
    'grouped-centre': 'histogram',
    quartiles: 'whiskers',
    percentiles: 'percentile',
    'box-plot': 'whiskers',
    'mean-deviation': 'deviation',
    variance: 'table',
    cv: 'transform',
    scatter: 'scatter',
    correlation: 'scatter',
    regression: 'scatter'
}

/* ---------- 1. Stratified sample: four courses ---------- */

export const STRATA_STEP = 10
export const STRATA_MAX = 300
export const SAMPLE_STEP = 5
export const SAMPLE_MIN = 10
export const SAMPLE_MAX = 100

export interface StrataState {
    /** Students of each course */
    sizes: number[]
    /** Size of the sample */
    sample: number
}

export const initialStrataState: StrataState = { sizes: [180, 150, 140, 130], sample: 60 }

export function setStrata(state: StrataState, patch: { index?: number; size?: number; sample?: number }): StrataState {
    const sizes = patch.index === undefined || patch.size === undefined ? state.sizes : setAt(state.sizes, patch.index, snap(patch.size, STRATA_STEP, STRATA_MAX, STRATA_STEP))
    return { sizes, sample: patch.sample === undefined ? state.sample : snap(patch.sample, SAMPLE_MIN, SAMPLE_MAX, SAMPLE_STEP) }
}

/** n · Nᵢ / N for each course, exact */
export const strataShares = (state: StrataState): FractionValue[] => state.sizes.map((size) => fraction(state.sample * size, sum(state.sizes)))
/** n / N */
export const samplingFraction = (state: StrataState) => fraction(state.sample, sum(state.sizes))

export const strataChallenges: LabChallenge<StrataState>[] = [
    { id: 81101, prompt: say('Egin maila bakoitzetik zehazki 20 ikasle aukeratzea.', 'Haz que se elijan exactamente 20 alumnos de cada curso.', 'اجعل الاختيار 20 تلميذًا بالضبط من كل صف.', 'Make sure exactly 20 students are chosen from each year group.'), hint: say('Maila guztiek tamaina bera behar dute, eta lagina $4\\cdot 20=80$.', 'Todos los cursos deben tener el mismo tamaño, y la muestra $4\\cdot 20=80$.', 'يجب أن تتساوى أحجام كل الصفوف، والعيّنة $4\\cdot 20=80$.', 'All the year groups must be the same size, and the sample is $4\\cdot 20=80$.'), isSolved: (state) => strataShares(state).every((share) => equals(share, 20)) },
    { id: 81102, prompt: say('$n=50$ izanik, egin 1. mailak 25 ikasle jartzea.', 'Con $n=50$, haz que 1.º aporte 25 alumnos.', 'مع $n=50$، اجعل الصف الأول يساهم بـ25 تلميذًا.', 'With $n=50$, make 1st year contribute 25 students.'), hint: say('25 laginaren erdia da: 1. mailak ikastetxearen erdia izan behar du.', '25 es la mitad de la muestra: 1.º tiene que ser la mitad del centro.', '25 نصف العيّنة: يجب أن يكون الصف الأول نصف المدرسة.', '25 is half the sample: 1st year has to be half of the school.'), isSolved: (state) => state.sample === 50 && equals(strataShares(state)[0], 25) },
    { id: 81103, prompt: say('Egin laginketa-zatia $\\frac{1}{10}$ izatea eta 4. mailak 9 ikasle jartzea.', 'Haz que la fracción de muestreo sea $\\frac{1}{10}$ y que 4.º aporte 9 alumnos.', 'اجعل كسر المعاينة $\\frac{1}{10}$ وأن يساهم الصف الرابع بـ9 تلاميذ.', 'Make the sampling fraction $\\frac{1}{10}$ and make 4th year contribute 9 students.'), hint: say('Hamarretik bat: 4. mailak 90 ikasle behar ditu eta $n$ guztien hamarrena da.', 'Uno de cada diez: 4.º necesita 90 alumnos y $n$ es la décima parte del total.', 'واحد من كل عشرة: يحتاج الصف الرابع إلى 90 تلميذًا و$n$ عُشر المجموع.', 'One in ten: 4th year needs 90 students and $n$ is a tenth of the total.'), isSolved: (state) => equals(samplingFraction(state), 1, 10) && equals(strataShares(state)[3], 9) }
]

/* ---------- 2. Two groups on a balance ---------- */

export const GROUP_MAX = 40
/** Means are kept in tenths: 0 to 10 */
export const MEAN_TENTHS_MAX = 100

export interface BalanceState {
    sizes: [number, number]
    /** The two means in tenths (65 is 6,5) */
    means: [number, number]
}

export const initialBalanceState: BalanceState = { sizes: [20, 30], means: [65, 72] }

export function setBalance(state: BalanceState, patch: { group: 0 | 1; size?: number; mean?: number }): BalanceState {
    const sizes = [...state.sizes] as [number, number]
    const means = [...state.means] as [number, number]
    if (patch.size !== undefined) sizes[patch.group] = clamp(patch.size, 1, GROUP_MAX)
    if (patch.mean !== undefined) means[patch.group] = clamp(patch.mean, 0, MEAN_TENTHS_MAX)
    return { sizes, means }
}

/** (n₁·x̄₁ + n₂·x̄₂) / (n₁ + n₂), exact */
export const joinedMeanOf = (state: BalanceState) => fraction(state.sizes[0] * state.means[0] + state.sizes[1] * state.means[1], 10 * (state.sizes[0] + state.sizes[1]))

export const balanceChallenges: LabChallenge<BalanceState>[] = [
    { id: 81201, prompt: say('Batez besteko desberdinekin, egin batez besteko bateratua bien erdia izatea.', 'Con medias distintas, haz que la media conjunta sea el punto medio de las dos.', 'بمتوسطين مختلفين، اجعل المتوسط المشترك منتصف المتوسطين.', 'With different means, make the combined mean the midpoint of the two.'), hint: say('Bi taldeek ikasle kopuru bera behar dute.', 'Los dos grupos necesitan el mismo número de alumnos.', 'تحتاج المجموعتان إلى العدد نفسه من التلاميذ.', 'The two groups need the same number of students.'), isSolved: (state) => state.means[0] !== state.means[1] && state.sizes[0] === state.sizes[1] },
    { id: 81202, prompt: say('Batez bestekoak 6 eta 8 izanik, lortu 7,5eko batez besteko bateratua.', 'Con medias 6 y 8, consigue una media conjunta de 7,5.', 'بمتوسطين 6 و8، احصل على متوسط مشترك 7.5.', 'With means of 6 and 8, get a combined mean of 7.5.'), hint: say('7,5 8tik hiru aldiz hurbilago dago 6tik baino: 8ko taldeak hiru aldiz handiagoa izan behar du.', 'El 7,5 está tres veces más cerca del 8 que del 6: el grupo del 8 tiene que ser el triple.', 'العدد 7.5 أقرب إلى 8 بثلاث مرات منه إلى 6: يجب أن تكون مجموعة 8 ثلاثة أضعاف.', '7.5 is three times as close to 8 as to 6: the group with 8 has to be three times as big.'), isSolved: (state) => [...state.means].sort((a, b) => a - b).join() === '60,80' && equals(joinedMeanOf(state), 15, 2) },
    { id: 81203, prompt: say('Tamaina eta batez besteko desberdineko taldeekin, lortu 5eko batez besteko bateratua.', 'Con grupos de distinto tamaño y medias distintas, consigue una media conjunta de 5.', 'بمجموعتين مختلفتين في الحجم والمتوسط، احصل على متوسط مشترك 5.', 'With groups of different sizes and different means, get a combined mean of 5.'), hint: say('Adibidez, 10 ikasle 4rekin eta 10en erdia 7rekin: $\\frac{10\\cdot 4+5\\cdot 7}{15}=5$.', 'Por ejemplo, 10 alumnos con 4 y la mitad, 5, con 7: $\\frac{10\\cdot 4+5\\cdot 7}{15}=5$.', 'مثلًا 10 تلاميذ بمتوسط 4 ونصفهم، 5، بمتوسط 7: $\\frac{10\\cdot 4+5\\cdot 7}{15}=5$.', 'For example, 10 students with a mean of 4, and half as many, 5, with a mean of 7: $\\frac{10\\cdot 4+5\\cdot 7}{15}=5$.'), isSolved: (state) => state.sizes[0] !== state.sizes[1] && state.means[0] !== state.means[1] && equals(joinedMeanOf(state), 5) }
]

/* ---------- 3. Five data: mean deviation and σ ---------- */

export const DEVIATION_MAX = 10

export interface DeviationState {
    values: number[]
}

export const initialDeviationState: DeviationState = { values: [4, 6, 7, 8, 10] }

export const setDeviation = (state: DeviationState, index: number, value: number): DeviationState => ({ values: setAt(state.values, index, clamp(value, 0, DEVIATION_MAX)) })

export const deviationMean = (values: number[]) => fraction(sum(values), values.length)
/** Σ |xᵢ − x̄| / n, exact: Σ |n·xᵢ − Σx| / n² */
export const meanDeviationOf = (values: number[]) => fraction(sum(values.map((value) => Math.abs(values.length * value - sum(values)))), values.length ** 2)
/** σ² = (n·Σx² − (Σx)²) / n² */
export const varianceOf = (values: number[]) => fraction(values.length * sum(values.map((value) => value * value)) - sum(values) ** 2, values.length ** 2)

export const deviationChallenges: LabChallenge<DeviationState>[] = [
    { id: 81301, prompt: say('Batez bestekoa 5 izanik, egin $\\text{DM}=2$.', 'Con media 5, haz que $\\text{DM}=2$.', 'بمتوسط 5، اجعل $\\text{DM}=2$.', 'With a mean of 5, make $\\text{MD}=2$.'), hint: say('Distantziek $5\\cdot 2=10$ batu behar dute: adibidez 2, 3, 5, 7, 8.', 'Las distancias tienen que sumar $5\\cdot 2=10$: por ejemplo 2, 3, 5, 7, 8.', 'يجب أن يكون مجموع المسافات $5\\cdot 2=10$: مثلًا 2، 3، 5، 7، 8.', 'The distances have to add up to $5\\cdot 2=10$: for example 2, 3, 5, 7, 8.'), isSolved: (state) => equals(deviationMean(state.values), 5) && equals(meanDeviationOf(state.values), 2) },
    { id: 81302, prompt: say('Batez bestekoa 6 izanik, egin $\\text{DM}=1{,}2$.', 'Con media 6, haz que $\\text{DM}=1{,}2$.', 'بمتوسط 6، اجعل $\\text{DM}=1{,}2$.', 'With a mean of 6, make $\\text{MD}=1{,}2$.'), hint: say('Distantziek 6 batu behar dute: adibidez 4, 5, 6, 7, 8.', 'Las distancias tienen que sumar 6: por ejemplo 4, 5, 6, 7, 8.', 'يجب أن يكون مجموع المسافات 6: مثلًا 4، 5، 6، 7، 8.', 'The distances have to add up to 6: for example 4, 5, 6, 7, 8.'), isSolved: (state) => equals(deviationMean(state.values), 6) && equals(meanDeviationOf(state.values), 6, 5) },
    { id: 81303, prompt: say('Egin $\\text{DM}=2$ eta $\\sigma^2=6$ batera.', 'Haz a la vez $\\text{DM}=2$ y $\\sigma^2=6$.', 'اجعل معًا $\\text{DM}=2$ و$\\sigma^2=6$.', 'Make $\\text{MD}=2$ and $\\sigma^2=6$ at the same time.'), hint: say('Desbideratzeak −4, −1, 0, 2, 3: distantziek 10 batzen dute eta karratuek 30. Adibidez 1, 4, 5, 7, 8.', 'Desviaciones −4, −1, 0, 2, 3: las distancias suman 10 y los cuadrados 30. Por ejemplo 1, 4, 5, 7, 8.', 'الانحرافات −4، −1، 0، 2، 3: مجموع المسافات 10 والمربعات 30. مثلًا 1، 4، 5، 7، 8.', 'Deviations −4, −1, 0, 2, 3: the distances add up to 10 and the squares to 30. For example 1, 4, 5, 7, 8.'), isSolved: (state) => equals(meanDeviationOf(state.values), 2) && equals(varianceOf(state.values), 6) }
]

/* ---------- 4. The data a · x + b ---------- */

/** Eight data with mean 5 and σ = 2 */
export const TRANSFORM_DATA = [2, 4, 4, 4, 5, 5, 7, 9]
export const A_MIN = 1
export const A_MAX = 4
export const B_MIN = -5
export const B_MAX = 15

export interface TransformState {
    a: number
    b: number
}

export const initialTransformState: TransformState = { a: 1, b: 0 }

export const setTransform = (state: TransformState, patch: Partial<TransformState>): TransformState => ({
    a: clamp(patch.a ?? state.a, A_MIN, A_MAX),
    b: clamp(patch.b ?? state.b, B_MIN, B_MAX)
})

export const transformedData = (state: TransformState) => TRANSFORM_DATA.map((value) => state.a * value + state.b)
export const transformedMean = (state: TransformState) => deviationMean(transformedData(state))
/** σ of a·x + b is a·σ (a > 0) */
export const transformedSigma = (state: TransformState) => Math.sqrt(varianceOf(transformedData(state)).numerator / varianceOf(transformedData(state)).denominator)
/** CV = σ / x̄, exact (σ is a whole number here) */
export const transformedCv = (state: TransformState): FractionValue | null => {
    const mean = transformedMean(state)
    return mean.numerator <= 0 ? null : fraction(2 * state.a * mean.denominator, mean.numerator)
}

export const transformChallenges: LabChallenge<TransformState>[] = [
    { id: 81401, prompt: say('Lortu 15eko batez bestekoa $\\sigma$ aldatu gabe.', 'Consigue una media de 15 sin cambiar $\\sigma$.', 'احصل على متوسط 15 دون تغيير $\\sigma$.', 'Get a mean of 15 without changing $\\sigma$.'), hint: say('Batzeak ez du $\\sigma$ aldatzen: $a=1$ eta $b=10$.', 'Sumar no cambia $\\sigma$: $a=1$ y $b=10$.', 'الجمع لا يغيّر $\\sigma$: $a=1$ و$b=10$.', 'Adding does not change $\\sigma$: $a=1$ and $b=10$.'), isSolved: (state) => state.a === 1 && equals(transformedMean(state), 15) },
    { id: 81402, prompt: say('Lortu $\\sigma=6$ eta 15eko batez bestekoa.', 'Consigue $\\sigma=6$ y media 15.', 'احصل على $\\sigma=6$ ومتوسط 15.', 'Get $\\sigma=6$ and a mean of 15.'), hint: say('$\\sigma$ hirukoizteko $a=3$; orduan batez bestekoa $3\\cdot 5=15$ da jada.', 'Para triplicar $\\sigma$, $a=3$; entonces la media ya es $3\\cdot 5=15$.', 'لمضاعفة $\\sigma$ ثلاث مرات $a=3$؛ عندها يكون المتوسط $3\\cdot 5=15$ أصلًا.', 'To triple $\\sigma$, $a=3$; then the mean is already $3\\cdot 5=15$.'), isSolved: (state) => state.a === 3 && equals(transformedMean(state), 15) },
    { id: 81403, prompt: say('Lortu $\\text{CV}=0{,}2$.', 'Consigue $\\text{CV}=0{,}2$.', 'احصل على $\\text{CV}=0{,}2$.', 'Get $\\text{CV}=0{,}2$.'), hint: say('$\\frac{2a}{5a+b}=0{,}2$ betetzen da $b=5a$ denean: adibidez $a=1$, $b=5$.', 'Se cumple $\\frac{2a}{5a+b}=0{,}2$ cuando $b=5a$: por ejemplo $a=1$, $b=5$.', 'تتحقّق $\\frac{2a}{5a+b}=0{,}2$ عندما $b=5a$: مثلًا $a=1$ و$b=5$.', '$\\frac{2a}{5a+b}=0{,}2$ holds when $b=5a$: for example $a=1$, $b=5$.'), isSolved: (state) => equals(transformedCv(state), 1, 5) }
]

export const statisticsAkLabChallengeIds: number[] = [
    strataChallenges,
    cumulativeChallenges,
    intervalsChallenges,
    balanceChallenges,
    centreChallenges,
    histogramChallenges,
    percentileChallenges,
    whiskersChallenges,
    deviationChallenges,
    tableChallenges,
    transformChallenges,
    scatterChallenges
].flatMap((challenges) => challenges.map((challenge: { id: number }) => challenge.id))
