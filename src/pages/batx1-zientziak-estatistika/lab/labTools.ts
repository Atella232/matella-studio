import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { centreChallenges, cumulativeChallenges, histogramChallenges } from '../../dbh2-estatistika-v2/lab/labTools.ts'
import { axisChallenges } from '../../dbh3-estatistika/lab/axis.ts'
import { stats3LabTools } from '../../dbh3-estatistika/lab/labTools.ts'
import { balanceChallenges, deviationChallenges, statisticsAkLabTools, transformChallenges } from '../../dbh4-akademikoak-estatistika/lab/labTools.ts'
import { intervalsChallenges, percentileChallenges, tableChallenges, whiskersChallenges } from '../../dbh4-aplikatuak-estatistika/lab/labTools.ts'
import type { BachStatsStageId } from '../lessons.tsx'
import { tailChallenges } from './histogramTail.ts'
import { outlierChallenges } from './outlierBand.ts'
import { scoreChallenges } from './standardScore.ts'

/* ==========================================================================
   Estatistika unidimentsionala (Batxilergoa 1 · Zientziak) laboratory.
   Three tools of its own, for what 1.º Bachillerato adds: the standard
   score (two marks lined up in standard deviations), «outlier or not?»
   (a datum dragged away from nineteen others, with the band x̄ ± 3σ and
   the fences of the box) and the tail of the histogram (bars that move
   the mean away from the median). The review comes with its challenges
   and ids from 4. DBH académicas (cumulative frequencies, intervals, the
   two-group balance, centre, histogram, percentile tape, whiskers,
   distances and squares, σ of a table, a·x + b) and the misleading axis
   of 3. DBH; their progress is kept under this unit's storage prefix.
   Tests in tests/estatistika-batx1z-lab.test.ts.
   ========================================================================== */

export type BachStatsLabToolId = 'cumulative' | 'intervals' | 'axis' | 'centre' | 'histogram' | 'balance' | 'percentile' | 'whiskers' | 'tail' | 'deviation' | 'table' | 'outlier' | 'score' | 'transform'

export interface BachStatsLabTool extends LabToolInfo {
    id: BachStatsLabToolId
    stage: BachStatsStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const fromAk = (id: string) => statisticsAkLabTools.find((tool) => tool.id === id)!
const from3 = (id: string) => stats3LabTools.find((tool) => tool.id === id)!

export const bachStatsLabTools: BachStatsLabTool[] = [
    { ...fromAk('cumulative'), id: 'cumulative', stage: 'data', lessonTopic: 'frequency-tables' },
    { ...fromAk('intervals'), id: 'intervals', stage: 'data', lessonTopic: 'class-intervals' },
    { ...from3('axis'), id: 'axis', stage: 'data', lessonTopic: 'charts' },
    { ...fromAk('centre'), id: 'centre', stage: 'centre', lessonTopic: 'centre-measures' },
    { ...fromAk('histogram'), id: 'histogram', stage: 'centre', lessonTopic: 'grouped-centre' },
    { ...fromAk('balance'), id: 'balance', stage: 'centre', lessonTopic: 'missing-datum' },
    { ...fromAk('percentile'), id: 'percentile', stage: 'position', lessonTopic: 'quartiles-percentiles' },
    { ...fromAk('whiskers'), id: 'whiskers', stage: 'position', lessonTopic: 'box-plot' },
    { id: 'tail', stage: 'position', lessonTopic: 'skewness', title: say('Histogramaren isatsa', 'La cola del histograma', 'ذيل المدرّج', 'The tail of the histogram'), observe: say('Muturreko barra bat igotzean, batez bestekoa haren aldera mugitzen da asko, eta mediana gutxi. Isatsa eskuinean badago, x̄ medianaren eskuinean geratzen da; ezkerrean badago, ezkerrean.', 'Al subir una barra de un extremo, la media se va mucho hacia ese lado y la mediana poco. Si la cola está a la derecha, x̄ queda a la derecha de la mediana; si está a la izquierda, a la izquierda.', 'عند رفع عمود في طرف يتحرك المتوسط كثيرًا نحو ذلك الجانب والوسيط قليلًا. فإذا كان الذيل في اليمين بقي x̄ يمين الوسيط، وإذا كان في اليسار بقي يساره.', 'When you raise a bar at one end, the mean moves a lot towards that side and the median only a little. If the tail is on the right, x̄ ends up to the right of the median; if it is on the left, to the left.') },
    { ...fromAk('deviation'), id: 'deviation', stage: 'spread', lessonTopic: 'range-mean-deviation' },
    { ...fromAk('table'), id: 'table', stage: 'spread', lessonTopic: 'variance-sd' },
    { id: 'outlier', stage: 'interpretation', lessonTopic: 'outliers', title: say('Atipikoa ala ez?', '¿Atípico o no?', 'شاذ أم لا؟', 'Outlier or not?'), observe: say('Datua urruntzean, batez bestekoa eta σ hazten dira, eta x̄ ± 3σ banda zabaltzen da: urrun dagoen datu batek bere burua ezkutatzen du. Kutxaren mugak ia ez dira mugitzen, kuartilek ordena bakarrik erabiltzen dutelako.', 'Al alejar el dato, la media y σ crecen y la banda x̄ ± 3σ se ensancha: un dato muy alejado se esconde a sí mismo. Los límites de la caja apenas se mueven, porque los cuartiles solo usan el orden.', 'عند إبعاد البيان يكبر المتوسط وσ ويتّسع النطاق x̄ ± 3σ: البيان البعيد جدًّا يخفي نفسه. أما حدّا الصندوق فلا يكادان يتحركان، لأن الربيعيات لا تستعمل إلا الترتيب.', 'As the datum moves away, the mean and σ grow and the band x̄ ± 3σ widens: a datum far away hides itself. The box limits hardly move, because quartiles only use the order.') },
    { id: 'score', stage: 'interpretation', lessonTopic: 'standard-scores', title: say('Puntuazio tipikoa', 'La puntuación típica', 'الدرجة المعيارية', 'The standard score'), observe: say('Bi erregelak desbideratze tipikotan lerrokatzean, nota bakoitza z = (x − x̄) : σ puntuan geratzen da. Nota txikiago bat nabarmenago egon daiteke, bere taldean σ txikia bada.', 'Al alinear las dos reglas en desviaciones típicas, cada nota queda en z = (x − x̄) : σ. Una nota más baja puede destacar más si en su grupo σ es pequeña.', 'عند محاذاة المسطرتين بالانحرافات المعيارية تقع كل علامة عند z = (x − x̄) : σ. وقد تتميّز علامة أقل أكثر إذا كان σ صغيرًا في مجموعتها.', 'When the two rulers are lined up in standard deviations, each mark sits at z = (x − x̄) : σ. A lower mark can stand out more if σ is small in its group.') },
    { ...fromAk('transform'), id: 'transform', stage: 'interpretation', lessonTopic: 'transform-data' }
]

export const bachStatsLabToolForTopic: Record<string, BachStatsLabToolId | undefined> = {
    'frequency-tables': 'cumulative',
    'class-intervals': 'intervals',
    charts: 'axis',
    'centre-measures': 'centre',
    'grouped-centre': 'histogram',
    'missing-datum': 'balance',
    'quartiles-percentiles': 'percentile',
    'box-plot': 'whiskers',
    skewness: 'tail',
    'range-mean-deviation': 'deviation',
    'variance-sd': 'table',
    'coefficient-variation': 'transform',
    outliers: 'outlier',
    'standard-scores': 'score',
    'transform-data': 'transform'
}

export const bachStatsLabChallengeIds: number[] = [
    cumulativeChallenges,
    intervalsChallenges,
    axisChallenges,
    centreChallenges,
    histogramChallenges,
    balanceChallenges,
    percentileChallenges,
    whiskersChallenges,
    tailChallenges,
    deviationChallenges,
    tableChallenges,
    outlierChallenges,
    scoreChallenges,
    transformChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
