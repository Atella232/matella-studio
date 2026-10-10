import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { histogramChallenges } from '../../dbh2-estatistika-v2/lab/labTools.ts'
import type { StatisticsStageId } from '../lessons.tsx'
import { boxPlot, correlation, regression, tablePercentile, type FrequencyRow, type Pair } from '../stats.ts'

/* ==========================================================================
   Estatistika eta probabilitatea (4. DBH aplikatuak) laboratory. The
   histogram comes from 2. DBH with its own challenges. The new tools: the
   40 heights in 5, 6, 8 or 10 intervals; percentiles of a table; box and
   whiskers with outliers; five data with x̄, σ and CV; σ of a frequency
   table; a cloud of six points with r and its regression line; the union
   of two events on a die; two draws from an urn with or without
   replacement; and a 2 × 2 contingency table. Pure state logic; the
   components live next to this file. Tests in
   tests/estatistika-dbh4ap-lab.test.ts.
   ========================================================================== */

export type StatisticsLabToolId = 'intervals' | 'histogram' | 'percentile' | 'whiskers' | 'spread' | 'table' | 'scatter' | 'union' | 'urn' | 'contingency'

export interface StatisticsLabTool extends LabToolInfo {
    id: StatisticsLabToolId
    stage: StatisticsStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)
const equals = (value: FractionValue | null, numerator: number, denominator = 1) => value !== null && value.numerator * denominator === numerator * value.denominator
const setAt = <T,>(list: T[], index: number, value: T) => list.map((item, position) => (position === index ? value : item))

export const statisticsLabTools: StatisticsLabTool[] = [
    { id: 'intervals', stage: 'data', lessonTopic: 'intervals', title: say('Tarteak egiten', 'Haciendo intervalos', 'صنع الفئات'), observe: say('Tarte kopurua aldatzean zabalera eta hasiera aldatzen dira. r′ ibiltartea baino handixeagoa da eta tarte kopuruaz zatigarria; soberakina bi muturretan banatzen da.', 'Al cambiar el número de intervalos cambian la amplitud y el comienzo. r′ es algo mayor que el recorrido y divisible entre el número de intervalos; el exceso se reparte entre los dos extremos.', 'عند تغيير عدد الفئات يتغيّر طولها وبدايتها. r′ أكبر قليلًا من المدى ويقبل القسمة على عدد الفئات، ويُوزَّع الفائض على الطرفين.') },
    { id: 'histogram', stage: 'data', lessonTopic: 'charts', title: say('Histograma eta poligonoak', 'Histograma y polígonos', 'المدرّج والمضلّعات'), observe: say('Laukizuzenak itsatsita daude. Maiztasun-poligonoa klase-marken gainetik doa; poligono metatua beti gorantz doa eta N-n amaitzen da.', 'Los rectángulos están pegados. El polígono de frecuencias pasa sobre las marcas de clase; el acumulado siempre sube y termina en N.', 'المستطيلات متلاصقة. يمرّ المضلّع التكراري فوق مراكز الفئات، والمتجمّع يصعد دائمًا وينتهي عند N.') },
    { id: 'percentile', stage: 'centre', lessonTopic: 'percentiles', title: say('Pertzentilen zinta', 'La cinta de los percentiles', 'شريط المئينات'), observe: say('Ehuneko metatuen zintan, pₖ zinta k puntuan mozten duen balioa da. Balio batek maiztasun handia badu, pertzentil askok balio hori bera dute.', 'En la cinta de porcentajes acumulados, pₖ es el valor que corta la cinta en el punto k. Si un valor tiene mucha frecuencia, muchos percentiles valen lo mismo.', 'في شريط النسب المتجمّعة، pₖ هو القيمة التي تقطع الشريط عند النقطة k. وإذا كان لقيمة تكرار كبير، تساوت عندها مئينات كثيرة.') },
    { id: 'whiskers', stage: 'centre', lessonTopic: 'box-plot', title: say('Biboteak eta atipikoak', 'Bigotes y atípicos', 'الشاربان والشواذ'), observe: say('Biboteek gehienez kutxa bider 1,5 egiten dute. Datu bat urrunegi badago, izar bat da, eta biboteak barruko azken datuan gelditzen dira.', 'Los bigotes miden como mucho 1,5 veces la caja. Si un dato está demasiado lejos es un asterisco, y los bigotes se quedan en el último dato de dentro.', 'يبلغ الشاربان على الأكثر 1.5 مرة طول الصندوق. وإذا ابتعد بيان كثيرًا صار نجمة، ويتوقف الشاربان عند آخر بيان في الداخل.') },
    { id: 'spread', stage: 'spread', lessonTopic: 'variance', title: say('Bost datu eta haien sakabanaketa', 'Cinco datos y su dispersión', 'خمسة بيانات وتشتتها'), observe: say('Karratu bakoitza desbideratze baten karratua da; bariantza haien batez bestekoa da. Datu bat batez bestekotik urruntzean, σ asko hazten da.', 'Cada cuadrado es el cuadrado de una desviación; la varianza es su media. Al alejar un dato de la media, σ crece mucho.', 'كل مربع هو مربع انحراف، والتباين متوسطها. وعند إبعاد بيان عن المتوسط تزداد σ كثيرًا.') },
    { id: 'table', stage: 'spread', lessonTopic: 'table-sd', title: say('Taula baten desbideratze tipikoa', 'La desviación típica de una tabla', 'الانحراف المعياري لجدول'), observe: say('Datuak muturretara eramatean σ handitzen da; balio bakar batean pilatzean, σ = 0. Bariantza = Σ fᵢxᵢ² : N − x̄².', 'Al llevar los datos a los extremos σ crece; al juntarlos en un solo valor, σ = 0. Varianza = Σ fᵢxᵢ² : N − x̄².', 'عند دفع البيانات إلى الطرفين تكبر σ، وعند جمعها في قيمة واحدة σ = 0. التباين = Σ fᵢxᵢ² : N − x̄².') },
    { id: 'scatter', stage: 'two', lessonTopic: 'correlation', title: say('Hodeia, r eta erregresio-zuzena', 'La nube, r y la recta de regresión', 'السحابة وr ومستقيم الانحدار'), observe: say('Puntuak zuzen batera hurbiltzean |r| 1era hurbiltzen da. Zuzena beti (x̄, ȳ) puntutik pasatzen da. Datuen tartetik kanpoko estimazioak ez dira fidagarriak.', 'Al acercar los puntos a una recta, |r| se acerca a 1. La recta siempre pasa por (x̄, ȳ). Las estimaciones fuera del intervalo de datos no son fiables.', 'عند تقريب النقاط من مستقيم يقترب |r| من 1. ويمرّ المستقيم دائمًا بـ(x̄, ȳ). والتقديرات خارج مجال البيانات غير موثوقة.') },
    { id: 'union', stage: 'chance', lessonTopic: 'laplace', title: say('Gertaeren bildura', 'La unión de sucesos', 'اتحاد الأحداث'), observe: say('Zati komuna hutsik badago, gertaerak bateraezinak dira eta probabilitateak batu besterik ez da egin behar. Bestela, komuna behin kendu behar da.', 'Si la parte común está vacía, los sucesos son incompatibles y basta sumar las probabilidades. Si no, hay que restar una vez la parte común.', 'إذا كان الجزء المشترك فارغًا فالحدثان متنافيان ويكفي جمع الاحتمالين. وإلا وجب طرح الجزء المشترك مرة.') },
    { id: 'urn', stage: 'chance', lessonTopic: 'compound', title: say('Bi atera kutxa batetik', 'Dos extracciones de una urna', 'سحبتان من جرّة'), observe: say('Itzulita, bigarren adarrak lehenengoaren berdinak dira (independenteak). Itzuli gabe, bigarren adarrak aldatu egiten dira: bola bat gutxiago dago.', 'Devolviendo, las ramas de la segunda son iguales que las de la primera (independientes). Sin devolver, cambian: hay una bola menos.', 'مع الإرجاع تكون فروع السحبة الثانية مثل الأولى (مستقلتان). ودون إرجاع تتغيّر: هناك كرة أقل.') },
    { id: 'contingency', stage: 'chance', lessonTopic: 'contingency', title: say('Kontingentzia-taula', 'Tabla de contingencia', 'جدول التوافق'), observe: say('Baldintzatuan, izendatzailea errenkada edo zutabe baten guztizkoa da. P(betaurrekoak / neska) = P(betaurrekoak) bada, bi ezaugarriak independenteak dira.', 'En la condicionada, el denominador es el total de una fila o columna. Si P(gafas / chica) = P(gafas), las dos características son independientes.', 'في المشروط يكون المقام مجموع سطر أو عمود. وإذا كان احتمال النظارات علمًا أنها بنت يساوي احتمال النظارات فالخاصيتان مستقلتان.') }
]

export const statisticsLabToolForTopic: Record<string, StatisticsLabToolId | undefined> = {
    sampling: 'intervals',
    intervals: 'intervals',
    charts: 'histogram',
    central: 'percentile',
    percentiles: 'percentile',
    'box-plot': 'whiskers',
    variance: 'spread',
    'table-sd': 'table',
    cv: 'spread',
    scatter: 'scatter',
    correlation: 'scatter',
    regression: 'scatter',
    laplace: 'union',
    compound: 'urn',
    contingency: 'contingency'
}

/* ---------- 1. Intervals: the 40 heights of the lesson ---------- */

/** The 40 heights (cm): in 6 intervals of 5 from 147,5 they give 2, 5, 10, 12, 8, 3 */
export const rawHeights = [
    148, 151,
    153, 154, 155, 156, 157,
    158, 158, 159, 160, 160, 161, 161, 162, 162, 162,
    163, 163, 164, 164, 165, 165, 165, 166, 166, 166, 167, 167,
    168, 168, 169, 170, 170, 171, 172, 172,
    173, 175, 177
]

export const INTERVAL_COUNTS = [5, 6, 8, 10] as const

export interface IntervalsState {
    count: number
}

export const initialIntervalsState: IntervalsState = { count: 5 }

export const setIntervals = (state: IntervalsState, count: number): IntervalsState => ({ count: (INTERVAL_COUNTS as readonly number[]).includes(count) ? count : state.count })

/** The textbook plan: r, the first multiple r′ of k above r, the amplitude, the start and the counts */
export function intervalPlan(data: number[], k: number) {
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min
    const extended = (Math.floor(range / k) + 1) * k
    const width = extended / k
    const start = min - (extended - range) / 2
    const edges = Array.from({ length: k + 1 }, (_, index) => start + index * width)
    const counts = edges.slice(0, -1).map((edge, index) => data.filter((value) => value >= edge && value < edges[index + 1]).length)
    const marks = edges.slice(0, -1).map((edge) => edge + width / 2)
    const modal = counts.indexOf(Math.max(...counts))
    return { min, max, range, extended, width, start, edges, counts, marks, modal }
}

export const intervalsChallenges: LabChallenge<IntervalsState>[] = [
    { id: 59101, prompt: say('Lortu 4 cm-ko zabalerako tarteak.', 'Consigue intervalos de 4 cm de amplitud.', 'احصل على فئات طولها 4 سم.'), hint: say('$r=29$: 4ren zein multiplo dago gainetik, eta zenbat tarte ematen ditu?', '$r=29$: ¿qué múltiplo de 4 queda justo por encima y cuántos intervalos da?', '$r=29$: أي مضاعف للعدد 4 يأتي فوقه مباشرة، وكم فئة يعطي؟'), isSolved: (state) => intervalPlan(rawHeights, state.count).width === 4 },
    { id: 59102, prompt: say('Lortu tarteak, tarte modalaren klase-marka 165 izanik.', 'Consigue unos intervalos cuyo intervalo modal tenga marca de clase 165.', 'احصل على فئات يكون مركز فئتها المنوالية 165.'), hint: say('Probatu tarte kopuru bakoitza eta begiratu laukizuzen altuenaren erdia.', 'Prueba cada número de intervalos y mira el centro del rectángulo más alto.', 'جرّب كل عدد من الفئات وانظر إلى منتصف المستطيل الأعلى.'), isSolved: (state) => { const plan = intervalPlan(rawHeights, state.count); return plan.marks[plan.modal] === 165 } },
    { id: 59103, prompt: say('Lortu 147,5ean hasi eta 3 cm-ko zabalera duten tarteak.', 'Consigue intervalos que empiecen en 147,5 y midan 3 cm.', 'احصل على فئات تبدأ عند 147.5 وطولها 3 سم.'), hint: say('$r\'=30$ eta $30:3=10$.', '$r\'=30$ y $30:3=10$.', '$r\'=30$ و$30:3=10$.'), isSolved: (state) => { const plan = intervalPlan(rawHeights, state.count); return plan.width === 3 && plan.start === 147.5 } }
]

/* ---------- 2. Percentiles of a table: values 0–4 ---------- */

export const PERCENTILE_VALUES = [0, 1, 2, 3, 4]
export const PERCENTILE_COUNT_MAX = 15
export const PERCENTILE_KS = [10, 25, 50, 75, 90] as const

export interface PercentileState {
    counts: number[]
    k: number
}

export const initialPercentileState: PercentileState = { counts: [3, 12, 4, 4, 2], k: 50 }

export function setPercentile(state: PercentileState, patch: { index?: number; count?: number; k?: number }): PercentileState {
    const counts = patch.index === undefined || patch.count === undefined ? state.counts : setAt(state.counts, patch.index, clamp(patch.count, 0, PERCENTILE_COUNT_MAX))
    const k = patch.k !== undefined && (PERCENTILE_KS as readonly number[]).includes(patch.k) ? patch.k : state.k
    return { counts, k }
}

export const percentileRows = (counts: number[]): FrequencyRow[] => PERCENTILE_VALUES.map((value, index) => ({ value, count: counts[index] }))

/** pₖ of the table, or null without data */
export const percentileOf = (counts: number[], k: number) => (sum(counts) === 0 ? null : tablePercentile(percentileRows(counts).filter((row) => row.count > 0), k))

/** Cumulative percentages of the table */
export const cumulativePercents = (counts: number[]) => counts.map((_, index) => (sum(counts) === 0 ? 0 : (sum(counts.slice(0, index + 1)) / sum(counts)) * 100))

export const percentileChallenges: LabChallenge<PercentileState>[] = [
    { id: 59201, prompt: say('Egin mediana 2 izatea, gutxienez 10 daturekin.', 'Haz que la mediana sea 2, con al menos 10 datos.', 'اجعل الوسيط 2، بعشرة بيانات على الأقل.'), hint: say('2 baliora arteko % metatuak 50 gainditu behar du, eta 1era artekoak ez.', 'El % acumulado hasta el 2 tiene que pasar de 50, y el del 1 no.', 'يجب أن تتجاوز النسبة المتجمّعة حتى 2 القيمة 50، وألّا تتجاوزها حتى 1.'), isSolved: (state) => sum(state.counts) >= 10 && percentileOf(state.counts, 50) === 2 },
    { id: 59202, prompt: say('Egin $Q_1=Q_3$, gutxienez hiru balio desberdinekin.', 'Haz que $Q_1=Q_3$, con datos de al menos tres valores distintos.', 'اجعل $Q_1=Q_3$، ببيانات من ثلاث قيم مختلفة على الأقل.'), hint: say('Balio batek datuen erdia baino gehiago hartu behar du, erdian.', 'Un valor tiene que ocupar más de la mitad de los datos, en el centro.', 'يجب أن تشغل قيمة واحدة أكثر من نصف البيانات في الوسط.'), isSolved: (state) => state.counts.filter((count) => count > 0).length >= 3 && percentileOf(state.counts, 25) === percentileOf(state.counts, 75) },
    { id: 59203, prompt: say('Egin mediana 1 eta $p_{90}=4$.', 'Haz que la mediana sea 1 y $p_{90}=4$.', 'اجعل الوسيط 1 و$p_{90}=4$.'), hint: say('Datu gehienak txikiak, baina % 10 baino gehiago 4an.', 'La mayoría de los datos pequeños, pero más del 10 % en el 4.', 'معظم البيانات صغيرة، لكن أكثر من 10 % عند 4.'), isSolved: (state) => percentileOf(state.counts, 50) === 1 && percentileOf(state.counts, 90) === 4 }
]

/* ---------- 3. Box and whiskers: eight data ---------- */

export const WHISKER_SIZE = 8
export const WHISKER_MAX = 30

export interface WhiskersState {
    values: number[]
}

export const initialWhiskersState: WhiskersState = { values: [6, 9, 10, 11, 12, 13, 14, 20] }

export const setWhisker = (state: WhiskersState, index: number, value: number): WhiskersState => ({ values: setAt(state.values, index, clamp(value, 0, WHISKER_MAX)) })

export const whiskersOf = (state: WhiskersState) => boxPlot(state.values)

export const whiskersChallenges: LabChallenge<WhiskersState>[] = [
    { id: 59301, prompt: say('Kendu datu atipikoa, datu bakar bat aldatuta.', 'Quita el dato atípico cambiando un solo dato.', 'أزل البيان الشاذ بتغيير بيان واحد فقط.'), hint: say('Goiko muga $Q_3+1{,}5\\cdot(Q_3-Q_1)$ da: hurbildu 20 hara.', 'El límite superior es $Q_3+1{,}5\\cdot(Q_3-Q_1)$: acerca el 20.', 'الحد الأعلى $Q_3+1{,}5\\cdot(Q_3-Q_1)$: قرّب العدد 20.'), isSolved: (state) => whiskersOf(state).outliers.length === 0 && state.values.filter((value, index) => value !== initialWhiskersState.values[index]).length <= 1 },
    { id: 59302, prompt: say('Lortu bi datu atipiko, bat alde bakoitzean.', 'Consigue dos datos atípicos, uno a cada lado.', 'احصل على بيانين شاذين، واحد في كل جهة.'), hint: say('Kutxa estu bat eta bi datu oso urrun: bat txikia eta bat handia.', 'Una caja estrecha y dos datos muy lejos: uno pequeño y uno grande.', 'صندوق ضيق وبيانان بعيدان جدًا: صغير وكبير.'), isSolved: (state) => { const box = whiskersOf(state); return box.outliers.some((value) => value < box.q1) && box.outliers.some((value) => value > box.q3) } },
    { id: 59303, prompt: say('Egin kutxa 6koa, atipikorik gabe eta ibiltartea gutxienez 15.', 'Haz una caja de 6, sin atípicos y con un recorrido de al menos 15.', 'اصنع صندوقًا طوله 6، بلا شواذ ومداه 15 على الأقل.'), hint: say('$1{,}5\\cdot 6=9$: biboteak 9 luza daitezke alde bakoitzera.', '$1{,}5\\cdot 6=9$: los bigotes pueden alargarse 9 a cada lado.', '$1{,}5\\cdot 6=9$: يمكن أن يمتد الشاربان 9 في كل جهة.'), isSolved: (state) => { const box = whiskersOf(state); return box.q3 - box.q1 === 6 && box.outliers.length === 0 && Math.max(...state.values) - Math.min(...state.values) >= 15 } }
]

/* ---------- 4. Five data: x̄, σ² and CV ---------- */

export const SPREAD_SIZE = 5
export const SPREAD_MAX = 20

export interface SpreadState {
    values: number[]
}

export const initialSpreadState: SpreadState = { values: [4, 6, 7, 8, 10] }

export const setSpread = (state: SpreadState, index: number, value: number): SpreadState => ({ values: setAt(state.values, index, clamp(value, 0, SPREAD_MAX)) })

export const spreadMean = (values: number[]) => fraction(sum(values), values.length)

/** σ² as an exact fraction: (n·Σx² − (Σx)²) / n² */
export const spreadVariance = (values: number[]) => fraction(values.length * sum(values.map((value) => value * value)) - sum(values) ** 2, values.length ** 2)

export const spreadChallenges: LabChallenge<SpreadState>[] = [
    { id: 59401, prompt: say('Egin $\\sigma=0$ eta batez bestekoa 8.', 'Haz que $\\sigma=0$ y la media sea 8.', 'اجعل $\\sigma=0$ والمتوسط 8.'), hint: say('Desbideratzerik ez: datu guztiak berdinak.', 'Sin desviaciones: todos los datos iguales.', 'بلا انحرافات: كل البيانات متساوية.'), isSolved: (state) => state.values.every((value) => value === 8) },
    { id: 59402, prompt: say('Batez bestekoa 7 izanik, egin $\\sigma^2=0{,}4$.', 'Con media 7, haz que $\\sigma^2=0{,}4$.', 'بمتوسط 7، اجعل $\\sigma^2=0{,}4$.'), hint: say('Karratuen batura $0{,}4\\cdot 5=2$: bi desbideratze ±1 eta beste guztiak 0.', 'La suma de cuadrados es $0{,}4\\cdot 5=2$: dos desviaciones ±1 y las demás 0.', 'مجموع المربعات $0{,}4\\cdot 5=2$: انحرافان ±1 والبقية 0.'), isSolved: (state) => equals(spreadMean(state.values), 7) && equals(spreadVariance(state.values), 2, 5) },
    { id: 59403, prompt: say('Egin $\\bar{x}=10$ eta $\\text{CV}=0{,}2$.', 'Haz que $\\bar{x}=10$ y $\\text{CV}=0{,}2$.', 'اجعل $\\bar{x}=10$ و$\\text{CV}=0{,}2$.'), hint: say('$\\sigma=0{,}2\\cdot 10=2$, beraz karratuen batura $4\\cdot 5=20$: adibidez −3, −1, 0, 1, 3.', '$\\sigma=0{,}2\\cdot 10=2$, así que la suma de cuadrados es $4\\cdot 5=20$: por ejemplo −3, −1, 0, 1, 3.', '$\\sigma=0{,}2\\cdot 10=2$، إذن مجموع المربعات $4\\cdot 5=20$: مثلًا −3، −1، 0، 1، 3.'), isSolved: (state) => equals(spreadMean(state.values), 10) && equals(spreadVariance(state.values), 4) }
]

/* ---------- 5. σ of a frequency table: values 0–5 ---------- */

export const TABLE_VALUES = [0, 1, 2, 3, 4, 5]
export const TABLE_COUNT_MAX = 12

export interface TableState {
    counts: number[]
}

export const initialTableState: TableState = { counts: [12, 9, 7, 6, 3, 3] }

export const setTableCount = (state: TableState, index: number, count: number): TableState => ({ counts: setAt(state.counts, index, clamp(count, 0, TABLE_COUNT_MAX)) })

/** Σ fᵢ, Σ fᵢxᵢ and Σ fᵢxᵢ² */
export function tableSums(counts: number[]) {
    return {
        n: sum(counts),
        fx: sum(counts.map((count, value) => count * value)),
        fx2: sum(counts.map((count, value) => count * value * value))
    }
}

export const tableMeanOf = (counts: number[]) => { const { n, fx } = tableSums(counts); return n === 0 ? null : fraction(fx, n) }

/** σ² = Σfx²/N − x̄² = (N·Σfx² − (Σfx)²) / N², exact */
export const tableVarianceOf = (counts: number[]) => { const { n, fx, fx2 } = tableSums(counts); return n === 0 ? null : fraction(n * fx2 - fx * fx, n * n) }

export const tableChallenges: LabChallenge<TableState>[] = [
    { id: 59501, prompt: say('Egin $\\sigma=0$, gutxienez 5 daturekin.', 'Haz que $\\sigma=0$, con al menos 5 datos.', 'اجعل $\\sigma=0$، بخمسة بيانات على الأقل.'), hint: say('Datu guztiak balio berean.', 'Todos los datos en el mismo valor.', 'كل البيانات عند القيمة نفسها.'), isSolved: (state) => tableSums(state.counts).n >= 5 && equals(tableVarianceOf(state.counts), 0) },
    { id: 59502, prompt: say('10 daturekin, lortu ahalik eta $\\sigma$ handiena.', 'Con 10 datos, consigue la mayor $\\sigma$ posible.', 'بعشرة بيانات، احصل على أكبر $\\sigma$ ممكنة.'), hint: say('Eraman datuak bi muturretara, erdia bakoitzean.', 'Lleva los datos a los dos extremos, la mitad en cada uno.', 'ادفع البيانات إلى الطرفين، نصفها في كل طرف.'), isSolved: (state) => tableSums(state.counts).n === 10 && equals(tableVarianceOf(state.counts), 25, 4) },
    { id: 59503, prompt: say('Egin batez bestekoa 2 eta bariantza 1.', 'Haz que la media sea 2 y la varianza 1.', 'اجعل المتوسط 2 والتباين 1.'), hint: say('Adibidez, datuak 1ean eta 3an, kopuru berean.', 'Por ejemplo, datos en el 1 y en el 3, en la misma cantidad.', 'مثلًا بيانات عند 1 وعند 3 بالعدد نفسه.'), isSolved: (state) => equals(tableMeanOf(state.counts), 2) && equals(tableVarianceOf(state.counts), 1) }
]

/* ---------- 6. A cloud of six points ---------- */

export const SCATTER_XS = [1, 2, 3, 4, 5, 6]
export const SCATTER_Y_MAX = 10
export const ESTIMATE_MAX = 12

export interface ScatterState {
    ys: number[]
    /** The x where the line is used to estimate */
    at: number
}

export const initialScatterState: ScatterState = { ys: [2, 3, 5, 4, 7, 8], at: 8 }

export function setScatter(state: ScatterState, patch: { index?: number; y?: number; at?: number }): ScatterState {
    const ys = patch.index === undefined || patch.y === undefined ? state.ys : setAt(state.ys, patch.index, clamp(patch.y, 0, SCATTER_Y_MAX))
    return { ys, at: clamp(patch.at ?? state.at, 0, ESTIMATE_MAX) }
}

export const scatterPoints = (state: ScatterState): Pair[] => SCATTER_XS.map((x, index) => [x, state.ys[index]])

/** r, or null when every y is the same (no correlation can be measured) */
export const scatterR = (state: ScatterState) => (state.ys.every((y) => y === state.ys[0]) ? null : correlation(scatterPoints(state)))

export const scatterLine = (state: ScatterState) => regression(scatterPoints(state))

/** ŷ at the chosen x */
export const scatterEstimate = (state: ScatterState) => { const line = scatterLine(state); return line.slope * state.at + line.intercept }

/** Reliable: strong correlation and the x inside the data */
export const isReliable = (state: ScatterState) => { const r = scatterR(state); return r !== null && Math.abs(r) >= 0.7 && state.at >= SCATTER_XS[0] && state.at <= SCATTER_XS[SCATTER_XS.length - 1] }

const onALine = (state: ScatterState) => { const r = scatterR(state); return r !== null && Math.abs(Math.abs(r) - 1) < 1e-9 }

export const scatterChallenges: LabChallenge<ScatterState>[] = [
    { id: 59601, prompt: say('Egin $r=1$: erlazio funtzional gorakorra.', 'Haz que $r=1$: una relación funcional creciente.', 'اجعل $r=1$: علاقة دالية متزايدة.'), hint: say('Puntu guztiak gorantz doan zuzen batean: adibidez, y = x + 2.', 'Todos los puntos en una recta que sube: por ejemplo, y = x + 2.', 'كل النقاط على مستقيم صاعد: مثلًا y = x + 2.'), isSolved: (state) => onALine(state) && scatterR(state)! > 0 },
    { id: 59602, prompt: say('Egin korrelazio negatibo sendoa ($r<-0{,}9$), puntuak zuzen batean egon gabe.', 'Haz una correlación negativa fuerte ($r<-0{,}9$) sin que los puntos estén en una recta.', 'اصنع ارتباطًا سالبًا قويًا ($r<-0{,}9$) دون أن تكون النقاط على مستقيم.'), hint: say('Beherantz, eta puntu bat apur bat aldatu zuzenetik.', 'Hacia abajo, y mueve un punto un poco fuera de la recta.', 'نحو الأسفل، وأبعد نقطة قليلًا عن المستقيم.'), isSolved: (state) => { const r = scatterR(state); return r !== null && r < -0.9 && !onALine(state) } },
    { id: 59603, prompt: say('Egin korrelazioa ia nulua: $|r|<0{,}1$.', 'Haz que la correlación sea casi nula: $|r|<0{,}1$.', 'اجعل الارتباط شبه منعدم: $|r|<0{,}1$.'), hint: say('Puntuak gora eta behera, joerarik gabe; adibidez, 2, 8, 5, 5, 8, 2.', 'Puntos arriba y abajo, sin tendencia; por ejemplo, 2, 8, 5, 5, 8, 2.', 'نقاط إلى الأعلى والأسفل بلا اتجاه؛ مثلًا 2، 8، 5، 5، 8، 2.'), isSolved: (state) => { const r = scatterR(state); return r !== null && Math.abs(r) < 0.1 } },
    { id: 59604, prompt: say('Egin estimazio fidagarri bat: $r>0{,}9$ eta $x$ datuen tartean, $\\hat{y}=5$ izanik.', 'Haz una estimación fiable: $r>0{,}9$ y $x$ dentro de los datos, con $\\hat{y}=5$.', 'أجرِ تقديرًا موثوقًا: $r>0{,}9$ و$x$ داخل البيانات، و$\\hat{y}=5$.'), hint: say('Hodei gorakor eta estua, eta aukeratu 1 eta 6 arteko $x$ bat.', 'Una nube creciente y estrecha, y elige una $x$ entre 1 y 6.', 'سحابة متزايدة وضيقة، واختر $x$ بين 1 و6.'), isSolved: (state) => { const r = scatterR(state); return r !== null && r > 0.9 && isReliable(state) && Math.abs(scatterEstimate(state) - 5) < 1e-9 } }
]

/* ---------- 7. Union of two events on a die ---------- */

export type DieEventId = 'even' | 'odd' | 'below3' | 'above3' | 'below5' | 'three' | 'prime' | 'six'

export const dieEvents: Record<DieEventId, { faces: number[]; name: LocalizedText }> = {
    even: { faces: [2, 4, 6], name: say('bikoitia', 'par', 'زوجي') },
    odd: { faces: [1, 3, 5], name: say('bakoitia', 'impar', 'فردي') },
    below3: { faces: [1, 2], name: say('< 3', '< 3', '< 3') },
    above3: { faces: [4, 5, 6], name: say('> 3', '> 3', '> 3') },
    below5: { faces: [1, 2, 3, 4], name: say('< 5', '< 5', '< 5') },
    three: { faces: [3, 6], name: say('3ren multiploa', 'múltiplo de 3', 'مضاعف 3') },
    prime: { faces: [2, 3, 5], name: say('lehena', 'primo', 'أولي') },
    six: { faces: [6], name: say('6', '6', '6') }
}

export const DIE_EVENT_IDS = Object.keys(dieEvents) as DieEventId[]

export interface UnionState {
    a: DieEventId
    b: DieEventId
}

export const initialUnionState: UnionState = { a: 'even', b: 'odd' }

export const setUnion = (state: UnionState, patch: Partial<UnionState>): UnionState => ({ ...state, ...patch })

export function unionOf({ a, b }: UnionState) {
    const A = dieEvents[a].faces
    const B = dieEvents[b].faces
    const both = A.filter((face) => B.includes(face))
    const either = [1, 2, 3, 4, 5, 6].filter((face) => A.includes(face) || B.includes(face))
    return { A, B, both, either, compatible: both.length > 0 }
}

export const unionChallenges: LabChallenge<UnionState>[] = [
    { id: 59701, prompt: say('Aukeratu bi gertaera bateraezin, bata bestearen aurkakoa izan gabe.', 'Elige dos sucesos incompatibles que no sean contrarios.', 'اختر حدثين متنافيين ليس أحدهما معاكسًا للآخر.'), hint: say('Zati komunik ez, baina bien artean ez dute dado osoa betetzen.', 'Sin parte común, pero entre los dos no cubren todo el dado.', 'بلا جزء مشترك، لكنهما معًا لا يغطيان النرد كله.'), isSolved: (state) => { const result = unionOf(state); return !result.compatible && result.either.length < 6 } },
    { id: 59702, prompt: say('Lortu $P(A\\cup B)=1$, A eta B bateragarriak izanik.', 'Consigue $P(A\\cup B)=1$ con A y B compatibles.', 'احصل على $P(A\\cup B)=1$ وA وB متوافقان.'), hint: say('Bien artean sei aurpegiak, eta gutxienez bat bietan.', 'Entre los dos, las seis caras, y al menos una en los dos.', 'معًا الأوجه الستة، وواحد على الأقل في كليهما.'), isSolved: (state) => { const result = unionOf(state); return result.compatible && result.either.length === 6 } },
    { id: 59703, prompt: say('Lortu $P(A\\cup B)=\\frac{2}{3}$, $P(A\\cap B)=\\frac{1}{6}$ izanik.', 'Consigue $P(A\\cup B)=\\frac{2}{3}$ con $P(A\\cap B)=\\frac{1}{6}$.', 'احصل على $P(A\\cup B)=\\frac{2}{3}$ مع $P(A\\cap B)=\\frac{1}{6}$.'), hint: say('Lau aurpegi bilduran eta bakarra bietan: adibidez, bikoitia eta 3ren multiploa.', 'Cuatro caras en la unión y una sola en las dos: por ejemplo, par y múltiplo de 3.', 'أربعة أوجه في الاتحاد وواحد فقط في كليهما: مثلًا زوجي ومضاعف 3.'), isSolved: (state) => { const result = unionOf(state); return result.either.length === 4 && result.both.length === 1 } }
]

/* ---------- 8. Two draws from an urn ---------- */

export const URN_MAX = 6

export interface UrnState {
    red: number
    blue: number
    replace: boolean
}

export const initialUrnState: UrnState = { red: 3, blue: 2, replace: false }

export const setUrn = (state: UrnState, patch: Partial<UrnState>): UrnState => ({
    red: clamp(patch.red ?? state.red, 1, URN_MAX),
    blue: clamp(patch.blue ?? state.blue, 1, URN_MAX),
    replace: patch.replace ?? state.replace
})

/** The four paths: first colour, second colour, each branch and the product */
export function urnTree({ red, blue, replace }: UrnState) {
    const total = red + blue
    const second = (firstRed: boolean, secondRed: boolean) => {
        const left = replace ? total : total - 1
        const reds = replace || !firstRed ? red : red - 1
        const blues = replace || firstRed ? blue : blue - 1
        return fraction(secondRed ? reds : blues, left)
    }
    return [[true, true], [true, false], [false, true], [false, false]].map(([firstRed, secondRed]) => {
        const first = fraction(firstRed ? red : blue, total)
        const then = second(firstRed, secondRed)
        return { firstRed, secondRed, first, then, path: fraction(first.numerator * then.numerator, first.denominator * then.denominator) }
    })
}

const pathSum = (state: UrnState, keep: (firstRed: boolean, secondRed: boolean) => boolean) => {
    const paths = urnTree(state).filter((path) => keep(path.firstRed, path.secondRed))
    return paths.reduce((total, path) => fraction(total.numerator * path.path.denominator + path.path.numerator * total.denominator, total.denominator * path.path.denominator), fraction(0))
}

export const twoRed = (state: UrnState) => pathSum(state, (a, b) => a && b)
export const sameColour = (state: UrnState) => pathSum(state, (a, b) => a === b)
export const someBlue = (state: UrnState) => pathSum(state, (a, b) => !a || !b)

export const urnChallenges: LabChallenge<UrnState>[] = [
    { id: 59801, prompt: say('Itzulita, lortu $P(\\text{bi gorri})=\\frac{1}{4}$.', 'Devolviendo, consigue $P(\\text{dos rojas})=\\frac{1}{4}$.', 'مع الإرجاع، احصل على احتمال حمراوين يساوي $\\frac{1}{4}$.'), hint: say('$\\frac{1}{2}\\cdot\\frac{1}{2}$: gorri adina urdin.', '$\\frac{1}{2}\\cdot\\frac{1}{2}$: tantas rojas como azules.', '$\\frac{1}{2}\\cdot\\frac{1}{2}$: الحمراء بعدد الزرقاء.'), isSolved: (state) => state.replace && equals(twoRed(state), 1, 4) },
    { id: 59802, prompt: say('Itzuli gabe, lortu $P(\\text{gutxienez bat urdin})=\\frac{5}{6}$.', 'Sin devolver, consigue $P(\\text{al menos una azul})=\\frac{5}{6}$.', 'دون إرجاع، احصل على احتمال زرقاء واحدة على الأقل يساوي $\\frac{5}{6}$.'), hint: say('Aurkakoa: $P(\\text{bi gorri})=\\frac{1}{6}$. Probatu 2 gorri eta 2 urdin.', 'El contrario: $P(\\text{dos rojas})=\\frac{1}{6}$. Prueba 2 rojas y 2 azules.', 'المعاكس: احتمال حمراوين $\\frac{1}{6}$. جرّب حمراوين وزرقاوين.'), isSolved: (state) => !state.replace && equals(someBlue(state), 5, 6) },
    { id: 59803, prompt: say('Itzuli gabe, lortu $P(\\text{kolore bera})=\\frac{1}{2}$.', 'Sin devolver, consigue $P(\\text{mismo color})=\\frac{1}{2}$.', 'دون إرجاع، احصل على احتمال اللون نفسه يساوي $\\frac{1}{2}$.'), hint: say('Probatu 3 gorri eta urdin bat.', 'Prueba 3 rojas y una azul.', 'جرّب 3 حمراء وزرقاء واحدة.'), isSolved: (state) => !state.replace && equals(sameColour(state), 1, 2) }
]

/* ---------- 9. A 2 × 2 contingency table ---------- */

export const CELL_MAX = 30

export interface ContingencyState {
    /** [boys with glasses, girls with glasses, boys without, girls without] */
    cells: number[]
}

export const initialContingencyState: ContingencyState = { cells: [6, 4, 14, 16] }

/** The steppers of the four cells, in the order of `cells` */
export const cellsLabels: LocalizedText[] = [
    say('Mutilak betaurrekoekin', 'Chicos con gafas', 'أولاد بنظارات'),
    say('Neskak betaurrekoekin', 'Chicas con gafas', 'بنات بنظارات'),
    say('Mutilak betaurrekorik gabe', 'Chicos sin gafas', 'أولاد بلا نظارات'),
    say('Neskak betaurrekorik gabe', 'Chicas sin gafas', 'بنات بلا نظارات')
]

export const setCell = (state: ContingencyState, index: number, value: number): ContingencyState => ({ cells: setAt(state.cells, index, clamp(value, 0, CELL_MAX)) })

export function contingencyOf({ cells: [boysGlasses, girlsGlasses, boysWithout, girlsWithout] }: ContingencyState) {
    const glasses = boysGlasses + girlsGlasses
    const girls = girlsGlasses + girlsWithout
    const boys = boysGlasses + boysWithout
    const total = glasses + boysWithout + girlsWithout
    const ratio = (part: number, whole: number) => (whole === 0 ? null : fraction(part, whole))
    return {
        glasses,
        girls,
        boys,
        total,
        pGlasses: ratio(glasses, total),
        pGlassesGivenGirl: ratio(girlsGlasses, girls),
        pGlassesGivenBoy: ratio(boysGlasses, boys),
        pGirlGivenGlasses: ratio(girlsGlasses, glasses)
    }
}

const sameValue = (a: FractionValue | null, b: FractionValue | null) => a !== null && b !== null && a.numerator * b.denominator === b.numerator * a.denominator

export const contingencyChallenges: LabChallenge<ContingencyState>[] = [
    { id: 59901, prompt: say('Lortu $P(\\text{betaurrekoak}/\\text{neska})=\\frac{1}{2}$ eta $P(\\text{betaurrekoak}/\\text{mutila})=\\frac{1}{4}$.', 'Consigue $P(\\text{gafas}/\\text{chica})=\\frac{1}{2}$ y $P(\\text{gafas}/\\text{chico})=\\frac{1}{4}$.', 'احصل على احتمال النظارات علمًا أنها بنت $\\frac{1}{2}$، وعلمًا أنه ولد $\\frac{1}{4}$.'), hint: say('Nesken zutabean, erdiak betaurrekoekin; mutilenean, laurdena.', 'En la columna de las chicas, la mitad con gafas; en la de los chicos, la cuarta parte.', 'في عمود البنات نصفهن بنظارات، وفي عمود الأولاد الربع.'), isSolved: (state) => { const table = contingencyOf(state); return equals(table.pGlassesGivenGirl, 1, 2) && equals(table.pGlassesGivenBoy, 1, 4) } },
    { id: 59902, prompt: say('Egin bi ezaugarriak independenteak: $P(\\text{betaurrekoak}/\\text{neska})=P(\\text{betaurrekoak})$, gelaxka guztiak beteta.', 'Haz las dos características independientes: $P(\\text{gafas}/\\text{chica})=P(\\text{gafas})$, con todas las casillas llenas.', 'اجعل الخاصيتين مستقلتين: احتمال النظارات علمًا أنها بنت يساوي احتمال النظارات، وكل الخانات ممتلئة.'), hint: say('Betaurrekoen proportzio bera nesketan eta mutiletan: adibidez, 5 eta 15 bi zutabeetan.', 'La misma proporción de gafas en chicas y en chicos: por ejemplo, 5 y 15 en las dos columnas.', 'نسبة النظارات نفسها عند البنات والأولاد: مثلًا 5 و15 في العمودين.'), isSolved: (state) => state.cells.every((cell) => cell > 0) && sameValue(contingencyOf(state).pGlassesGivenGirl, contingencyOf(state).pGlasses) },
    { id: 59903, prompt: say('40 ikaslerekin, lortu $P(\\text{neska}/\\text{betaurrekoak})=\\frac{3}{4}$.', 'Con 40 alumnos, consigue $P(\\text{chica}/\\text{gafas})=\\frac{3}{4}$.', 'بأربعين تلميذًا، احصل على احتمال أن تكون بنتًا علمًا أنها بنظارات $\\frac{3}{4}$.'), hint: say('Betaurrekoen errenkadan, lautik hiru neskak.', 'En la fila de las gafas, tres de cada cuatro son chicas.', 'في سطر النظارات ثلاث من كل أربع بنات.'), isSolved: (state) => { const table = contingencyOf(state); return table.total === 40 && equals(table.pGirlGivenGlasses, 3, 4) } }
]

export const statisticsLabChallengeIds: number[] = [
    intervalsChallenges,
    histogramChallenges,
    percentileChallenges,
    whiskersChallenges,
    spreadChallenges,
    tableChallenges,
    scatterChallenges,
    unionChallenges,
    urnChallenges,
    contingencyChallenges
].flatMap((list) => list.map((challenge) => challenge.id))
