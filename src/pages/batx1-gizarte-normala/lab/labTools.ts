import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { bachStatsLabTools } from '../../batx1-zientziak-estatistika/lab/labTools.ts'
import { scoreChallenges } from '../../batx1-zientziak-estatistika/lab/standardScore.ts'
import { approxChallenges } from '../../batx2-zientziak-banaketak/lab/approx.ts'
import { bellChallenges } from '../../batx2-zientziak-banaketak/lab/bell.ts'
import { distributionsBatx2LabTools } from '../../batx2-zientziak-banaketak/lab/labTools.ts'
import { lookupChallenges } from '../../batx2-zientziak-banaketak/lab/lookup.ts'
import type { NormalBatx1gStageId } from '../lessons.tsx'
import { densityChallenges } from './density.ts'
import { fitNormalChallenges } from './fitNormal.ts'
import { histogramChallenges } from './histogram.ts'

/* ==========================================================================
   Normala (Batxilergoa 1 · Gizarte Zientziak) laboratory. Three tools of
   its own, for what this book has and 2.º Ciencias does not: the
   histogram that turns into a bell, a density built from straight pieces
   and fitting grouped data to a normal with Matella's 5 % rule. Borrowed,
   with their own challenges and ids: the standard score of 1.º Ciencias
   and, from 2.º Ciencias, under the bell, the normal table and the
   binomial under the bell. Tests in tests/normala-batx1g-lab.test.ts.
   ========================================================================== */

export type NormalBatx1gLabToolId = 'score' | 'histogram' | 'density' | 'lookup' | 'bell' | 'approx' | 'fitNormal'

export interface NormalBatx1gLabTool extends LabToolInfo {
    id: NormalBatx1gLabToolId
    stage: NormalBatx1gStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const fromStatistics = (id: string) => bachStatsLabTools.find((tool) => tool.id === id)!
const fromDistributions = (id: string) => distributionsBatx2LabTools.find((tool) => tool.id === id)!

export const normalBatx1gLabTools: NormalBatx1gLabTool[] = [
    { ...fromStatistics('score'), id: 'score', stage: 'review', lessonTopic: 'standard-score' },
    { id: 'histogram', stage: 'continuous', lessonTopic: 'density', title: say('Histogramatik kanpaira', 'Del histograma a la campana', 'من المدرج إلى الجرس', 'From the histogram to the bell'), observe: say('Datu gutxirekin, barrak gora eta behera dabiltza; milaka daturekin eta klase estuagoekin, kanpaiaren forma hartzen dute. Barra bakoitzaren azalera bere datuen zatia da, eta normalaren probabilitatetik hurbil geratzen da.', 'Con pocos datos, las barras suben y bajan; con miles de datos y clases más estrechas, toman la forma de la campana. El área de cada barra es la parte de sus datos, y se queda cerca de la probabilidad de la normal.', 'مع بيانات قليلة تعلو الأعمدة وتنخفض؛ ومع آلاف البيانات وفئات أضيق تأخذ شكل الجرس. ومساحة كل عمود هي جزء بياناته، وتبقى قريبة من احتمال التوزيع الطبيعي.', 'With few data the bars go up and down; with thousands of data and narrower classes, they take the shape of the bell. The area of each bar is the share of its data, and it stays close to the normal\'s probability.') },
    { id: 'density', stage: 'continuous', lessonTopic: 'straight-density', title: say('Eraiki dentsitate bat', 'Construye una densidad', 'ابنِ كثافة', 'Build a density'), observe: say('Altuera bakarra dago azalera osoa 1 egiten duena: laukizuzenean 1 zati oinarria, eta triangeluan bikoitza. Tarte baten probabilitatea haren gaineko azalera da; arrapalan, zabalera bereko bi tarteek ez dute probabilitate bera.', 'Solo hay una altura que hace el área total 1: en el rectángulo, 1 entre la base, y en el triángulo, el doble. La probabilidad de un intervalo es el área encima; en la rampa, dos intervalos de la misma anchura no tienen la misma probabilidad.', 'هناك ارتفاع واحد فقط يجعل المساحة الكلية 1: في المستطيل 1 على القاعدة، وفي المثلث ضعف ذلك. واحتمال مجال هو المساحة فوقه؛ وفي الرمبة لا يكون لمجالين بالعرض نفسه الاحتمال نفسه.', 'Only one height makes the total area 1: for the rectangle, 1 over the base, and for the triangle, twice that. The probability of an interval is the area above it; on the ramp, two intervals of the same width do not have the same probability.') },
    { ...fromDistributions('lookup'), id: 'lookup', stage: 'normal', lessonTopic: 'standard-table' },
    { ...fromDistributions('bell'), id: 'bell', stage: 'normal', lessonTopic: 'standardize' },
    { ...fromDistributions('approx'), id: 'approx', stage: 'approximation', lessonTopic: 'continuity' },
    { id: 'fitNormal', stage: 'fit', lessonTopic: 'fit-decision', title: say('Doitu normal batera', 'Ajusta a una normal', 'طابق مع توزيع طبيعي', 'Fit a normal'), observe: say('x̄ eta s jarrita, altuerek eta notek % 5 baino gutxiago desberdintzen dute: normalak balio du. Itxaronaldiak, ordea, alde batera okertuta daude, eta ez dago μ eta σ bikoterik konpontzen dituenik: forma da arazoa.', 'Con x̄ y s, las estaturas y las notas se separan menos del 5 %: la normal sirve. Las esperas, en cambio, están torcidas hacia un lado, y no hay μ ni σ que las arreglen: el problema es la forma.', 'مع x̄ وs تختلف الأطوال والعلامات بأقل من 5٪: التوزيع الطبيعي صالح. أما فترات الانتظار فمائلة إلى جهة، ولا توجد μ ولا σ تصلحها: المشكلة في الشكل.', 'With x̄ and s, the heights and the marks differ by less than 5%: the normal works. The waits, however, lean to one side, and no μ or σ fixes them: the problem is the shape.') }
]

export const normalBatx1gLabToolForTopic: Record<string, NormalBatx1gLabToolId | undefined> = {
    histogram: 'histogram',
    'standard-score': 'score',
    density: 'histogram',
    'straight-density': 'density',
    'normal-curve': 'bell',
    'sigma-rule': 'bell',
    'standard-table': 'lookup',
    'table-symmetry': 'lookup',
    standardize: 'bell',
    inverse: 'lookup',
    'binomial-to-normal': 'approx',
    continuity: 'approx',
    'fit-parameters': 'fitNormal',
    'fit-expected': 'fitNormal',
    'fit-decision': 'fitNormal'
}

export const normalBatx1gLabChallengeIds: number[] = [
    scoreChallenges,
    histogramChallenges,
    densityChallenges,
    lookupChallenges,
    bellChallenges,
    approxChallenges,
    fitNormalChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
