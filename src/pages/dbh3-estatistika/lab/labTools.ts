import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { boxChallenges, centreChallenges, cumulativeChallenges, histogramChallenges, pieChallenges, statisticsLabTools as basicTools } from '../../dbh2-estatistika-v2/lab/labTools.ts'
import { intervalsChallenges, percentileChallenges, spreadChallenges, statisticsLabTools as appliedTools, unionChallenges, urnChallenges } from '../../dbh4-aplikatuak-estatistika/lab/labTools.ts'
import type { Stats3StageId } from '../lessons.tsx'
import { axisChallenges } from './axis.ts'
import { neededChallenges } from './needed.ts'
import { sampleChallenges } from './sample.ts'
import { spinnerChallenges } from './spinner.ts'

/* ==========================================================================
   Estatistika eta probabilitatea (3. DBH) laboratory. Four tools are new
   and belong to this unit: the random sample of a school, the misleading
   axis, the seesaw of the mean (which mark do I need?) and the spinner.
   The cumulative frequencies, the histogram, the pie chart, the centre of
   a table and the box come from 2. DBH Estatistika; the intervals, the
   percentiles, the spread, the union of events and the two draws from
   4. DBH aplikatuak Estatistika, with their own challenges. Tests in
   tests/estatistika-dbh3-lab.test.ts.
   ========================================================================== */

export type Stats3LabToolId = 'sample' | 'cumulative' | 'intervals' | 'histogram' | 'pie' | 'axis' | 'needed' | 'centre' | 'percentile' | 'box' | 'spread' | 'union' | 'spinner' | 'urn'

export interface Stats3LabTool extends LabToolInfo {
    id: Stats3LabToolId
    stage: Stats3StageId
}

/** Arabic text runs right to left: every formula in it (40 %, 3,6°) is isolated left to right and kept on one line */
const isolate = (text: string) => text.replace(/[A-Za-z0-9(][A-Za-z0-9²³′ ()+\-−·=°%,.]*[A-Za-z0-9²³°′)%]|[A-Za-z]/g, (formula) => `⁦${formula.replace(/ /g, ' ')}⁩`)
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: isolate(ar) })

/** A tool of an earlier laboratory, put in this unit's stage and lesson */
function borrowed(list: LabToolInfo[], id: Stats3LabToolId, stage: Stats3StageId, lessonTopic: string): Stats3LabTool {
    const tool = list.find((candidate) => candidate.id === id)
    if (!tool) throw new Error(`No borrowed tool ${id}`)
    return { ...tool, id, stage, lessonTopic }
}

export const stats3LabTools: Stats3LabTool[] = [
    { id: 'sample', stage: 'data', lessonTopic: 'population-sample', title: say('Lagina', 'La muestra', 'العيّنة', 'The sample'), observe: say('Ikastetxeko ikasleen % 40 futbolzaleak dira. Lagin txiki batek oso bestelako ehunekoa eman dezake; lagina handitu ahala, ehunekoa % 40 baliotik gertuago geratzen da.', 'El 40 % de los alumnos del centro son futboleros. Una muestra pequeña puede dar un porcentaje muy distinto; cuanto mayor es la muestra, más cerca del 40 % queda.', 'يحب 40 % من طلاب المدرسة كرة القدم. قد تعطي عيّنة صغيرة نسبة مختلفة جدًا، وكلما كبرت العيّنة اقتربت النسبة من 40 %.', '40% of the pupils at the school are football fans. A small sample can give a very different percentage; the larger the sample, the closer it gets to 40%.') },
    borrowed(basicTools, 'cumulative', 'data', 'frequency-table'),
    borrowed(appliedTools, 'intervals', 'data', 'grouped-data'),
    borrowed(basicTools, 'histogram', 'charts', 'bar-histogram'),
    borrowed(basicTools, 'pie', 'charts', 'pie-chart'),
    { id: 'axis', stage: 'charts', lessonTopic: 'reading-charts', title: say('Ardatz engainagarria', 'El eje engañoso', 'المحور المضلِّل', 'The misleading axis'), observe: say('Benetako proportzioa ez da aldatzen, baina ardatza 0-tik urrunago hasi ahala, B barra A baino askoz altuagoa dirudi. Grafiko zintzo batean ardatza 0-tik hasten da.', 'La proporción real no cambia, pero cuanto más lejos de 0 empieza el eje, más alta parece la barra B frente a la A. En un gráfico honrado el eje empieza en 0.', 'النسبة الحقيقية لا تتغيّر، لكن كلما ابتعدت بداية المحور عن الصفر بدا العمود B أعلى بكثير من A. وفي المخطط الصادق يبدأ المحور من الصفر.', 'The true ratio does not change, but the further from 0 the axis starts, the taller bar B looks next to A. In an honest chart the axis starts at 0.') },
    { id: 'needed', stage: 'centre', lessonTopic: 'mean', title: say('Zer nota behar dut?', '¿Qué nota necesito?', 'ما الدرجة التي أحتاجها؟', 'Which mark do I need?'), observe: say('Batez bestekoa zabuaren oreka-puntua da. Nota berri bat batez bestekoaren gainetik badago, oreka-puntua eskuinera doa; azpitik badago, ezkerrera. Muturreko nota batek mediana baino askoz gehiago mugitzen du batez bestekoa.', 'La media es el punto de equilibrio del balancín. Si una nota nueva está por encima de la media, el punto de equilibrio se va a la derecha; si está por debajo, a la izquierda. Una nota extrema mueve la media mucho más que la mediana.', 'المتوسط نقطة توازن الأرجوحة. إذا كانت الدرجة الجديدة فوق المتوسط تحركت نقطة التوازن يمينًا، وإذا كانت تحته فيسارًا. والدرجة المتطرفة تحرّك المتوسط أكثر بكثير من الوسيط.', 'The mean is the balance point of the seesaw. A new mark above the mean moves the balance point to the right; below it, to the left. An extreme mark moves the mean much more than the median.') },
    borrowed(basicTools, 'centre', 'centre', 'median'),
    borrowed(appliedTools, 'percentile', 'spread', 'range-quartiles'),
    borrowed(basicTools, 'box', 'spread', 'box-plot'),
    borrowed(appliedTools, 'spread', 'spread', 'variance'),
    borrowed(appliedTools, 'union', 'chance', 'events'),
    { id: 'spinner', stage: 'chance', lessonTopic: 'laplace', title: say('Ruleta', 'La ruleta', 'الدولاب', 'The spinner'), observe: say('Sektore guztiak berdinak direnez, gorriaren probabilitatea sektore gorriak zati sektore guztiak da. Hamar jaurtiketarekin maiztasuna urrun egon daiteke; milarekin, oso hurbil.', 'Como todos los sectores son iguales, la probabilidad del rojo es sectores rojos entre todos los sectores. Con diez tiradas la frecuencia puede quedar lejos; con mil, muy cerca.', 'لأن كل القطاعات متساوية فاحتمال الأحمر هو القطاعات الحمراء على كل القطاعات. ومع عشر رميات قد يبتعد التكرار، ومع ألف يقترب كثيرًا.', 'As every sector is the same size, the probability of red is the red sectors over all the sectors. With ten spins the frequency can be far off; with a thousand, very close.') },
    borrowed(appliedTools, 'urn', 'chance', 'compound')
]

export const stats3LabToolForTopic: Record<string, Stats3LabToolId | undefined> = {
    'population-sample': 'sample',
    'frequency-table': 'cumulative',
    'grouped-data': 'intervals',
    'bar-histogram': 'histogram',
    'pie-chart': 'pie',
    'reading-charts': 'axis',
    mean: 'needed',
    median: 'centre',
    mode: 'centre',
    'range-quartiles': 'percentile',
    'box-plot': 'box',
    variance: 'spread',
    events: 'union',
    laplace: 'spinner',
    compound: 'urn'
}

export const stats3LabChallengeIds: number[] = [sampleChallenges, cumulativeChallenges, intervalsChallenges, histogramChallenges, pieChallenges, axisChallenges, neededChallenges, centreChallenges, percentileChallenges, boxChallenges, spreadChallenges, unionChallenges, spinnerChallenges, urnChallenges].flatMap((list) => list.map((challenge) => challenge.id))
