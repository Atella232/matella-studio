import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { scoreChallenges } from '../../batx1-zientziak-estatistika/lab/standardScore.ts'
import { bachStatsLabTools } from '../../batx1-zientziak-estatistika/lab/labTools.ts'
import { combinatoricsAkLabTools, pascalChallenges } from '../../dbh4-akademikoak-konbinatoria/lab/labTools.ts'
import type { DistributionsBatx2StageId } from '../lessons.tsx'
import { approxChallenges } from './approx.ts'
import { bellChallenges } from './bell.ts'
import { buildChallenges } from './build.ts'
import { lookupChallenges } from './lookup.ts'
import { machineChallenges } from './machine.ts'

/* ==========================================================================
   Banaketak (Batxilergoa 2 · Zientziak) laboratory. Five tools of its
   own, one for each new idea: build a distribution (the bars that add up
   to 1 and balance at μ), the binomial machine (B(n; p) and the bars of
   «at least» and «at most»), under the bell (an area of N(μ; σ) and the
   ▶ that standardises it), the normal table (row, column, sign and side)
   and the binomial under the bell (the bars, the bell and the continuity
   correction). The review comes with its challenges and ids from
   Tartaglia's triangle of 4. DBH académicas and the standard score of
   1.º Ciencias; their progress is kept under this unit's storage prefix.
   Tests in tests/banaketak-batx2z-lab.test.ts.
   ========================================================================== */

export type DistributionsBatx2LabToolId = 'pascal' | 'score' | 'build' | 'machine' | 'bell' | 'lookup' | 'approx'

export interface DistributionsBatx2LabTool extends LabToolInfo {
    id: DistributionsBatx2LabToolId
    stage: DistributionsBatx2StageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const fromCombinatorics = (id: string) => combinatoricsAkLabTools.find((tool) => tool.id === id)!
const fromStatistics = (id: string) => bachStatsLabTools.find((tool) => tool.id === id)!

export const distributionsBatx2LabTools: DistributionsBatx2LabTool[] = [
    { ...fromCombinatorics('pascal'), id: 'pascal', stage: 'review', lessonTopic: 'review-combinatorial' },
    { ...fromStatistics('score'), id: 'score', stage: 'review', lessonTopic: 'review-mean-sd' },
    { id: 'build', stage: 'discrete', lessonTopic: 'mean-variance', title: say('Eraiki banaketa', 'Construye la distribución', 'ابنِ التوزيع', 'Build the distribution'), observe: say('Barrek 1 egiten dutenean bakarrik da probabilitate-funtzioa. Batez bestekoa barrak orekan dauden puntua da, eta ez da zertan balio bat izan; bariantza hazi egiten da pisua muturretara doanean.', 'Las barras solo son una función de probabilidad cuando suman 1. La media es el punto donde se equilibran, y no tiene por qué ser un valor; la varianza crece cuando el peso se va a los extremos.', 'لا تكون الأعمدة دالة احتمال إلا إذا كان مجموعها 1. والمتوسط هو النقطة التي تتوازن عندها، ولا يلزم أن يكون قيمة من القيم؛ ويكبر التباين عندما يذهب الوزن إلى الطرفين.', 'The bars are a probability function only when they add up to 1. The mean is the point where they balance, and it need not be one of the values; the variance grows when the weight moves to the ends.') },
    { id: 'machine', stage: 'binomial', lessonTopic: 'binomial-formula', title: say('Makina binomiala', 'La máquina binomial', 'الآلة الثنائية', 'The binomial machine'), observe: say('p = 0,5 denean, barrak simetrikoak dira; p txikia bada, ezkerrera pilatzen dira. Batez bestekoa np da, eta n handitzean barrak zabaldu egiten dira, √(npq) bezala.', 'Con p = 0,5 las barras son simétricas; con p pequeña se amontonan a la izquierda. La media es np, y al crecer n las barras se abren, como √(npq).', 'مع p = 0.5 تكون الأعمدة متماثلة، ومع p صغير تتكدس يسارًا. والمتوسط np، وعندما يكبر n تنفتح الأعمدة مثل √(npq).', 'With p = 0.5 the bars are symmetric; with a small p they pile up on the left. The mean is np, and as n grows the bars spread out, like √(npq).') },
    { id: 'bell', stage: 'normal', lessonTopic: 'standardize', title: say('Kanpaiaren azpian', 'Bajo la campana', 'تحت الجرس', 'Under the bell'), observe: say('μ aldatzeak kanpaia mugitzen du, eta σ aldatzeak zabaldu edo estutu egiten du, baina azalerak z balioen araberakoak dira bakarrik. Tipifikatzean eskala aldatzen da, ez kanpaia.', 'Cambiar μ mueve la campana y cambiar σ la ensancha o la estrecha, pero las áreas solo dependen de los valores de z. Al tipificar cambia la escala, no la campana.', 'تغيير μ يحرّك الجرس وتغيير σ يوسّعه أو يضيّقه، لكن المساحات لا تتوقف إلا على قيم z. وعند التوحيد المعياري يتغيّر المقياس لا الجرس.', 'Changing μ moves the bell and changing σ widens or narrows it, but the areas depend only on the values of z. Standardising changes the scale, not the bell.') },
    { id: 'lookup', stage: 'normal', lessonTopic: 'standard-table', title: say('Normalaren taula', 'La tabla de la normal', 'جدول التوزيع الطبيعي', 'The normal table'), observe: say('Taulak 0 eta gehiagoko z balioak bakarrik ditu. Negatibo baterako, irakurri balio absolutuaren errenkada eta erabili simetria: −z puntuaren azpikoa z puntuaren gainekoa da.', 'La tabla solo trae z de 0 en adelante. Para un negativo, lee la fila de su valor absoluto y usa la simetría: lo de debajo de −z es lo de encima de z.', 'لا يضم الجدول إلا قيم z من 0 فما فوق. وللقيمة السالبة اقرأ صف قيمتها المطلقة واستعمل التماثل: ما تحت −z هو ما فوق z.', 'The table only has z from 0 up. For a negative one, read the row of its absolute value and use symmetry: what lies below −z is what lies above z.') },
    { id: 'approx', stage: 'approximation', lessonTopic: 'continuity', title: say('Binomiala kanpaiaren azpian', 'La binomial bajo la campana', 'التوزيع الثنائي تحت الجرس', 'The binomial under the bell'), observe: say('Kanpaia barren erditik igarotzen da. Zuzenketarik gabe, barra erdi galtzen da mutur bakoitzean, eta «zehazki k» 0 da; puntu erdia gehituta, normala ia binomial zehatza da. B(25; 0,2) banaketan np = 5 da, muga-mugan: barrak alde batera makurtzen dira, eta errorea handiagoa da.', 'La campana pasa por el centro de las barras. Sin corrección se pierde media barra en cada extremo, y «exactamente k» da 0; con el medio punto, la normal casi coincide con la binomial exacta. En B(25; 0,2), np = 5 justo: las barras se tuercen y el error crece.', 'يمر الجرس بمنتصف الأعمدة. ودون تصحيح يضيع نصف عمود في كل طرف ويعطي «بالضبط k» القيمة 0؛ ومع نصف الوحدة يكاد الطبيعي يطابق الثنائي الدقيق. وفي B(25; 0.2) يكون np = 5 بالكاد: تميل الأعمدة ويكبر الخطأ.', 'The bell passes through the middle of the bars. Without the correction half a bar is lost at each end, and ‘exactly k’ gives 0; with the half unit, the normal almost matches the exact binomial. In B(25; 0.2), np = 5 only just: the bars lean and the error grows.') }
]

export const distributionsBatx2LabToolForTopic: Record<string, DistributionsBatx2LabToolId | undefined> = {
    'review-combinatorial': 'pascal',
    'review-mean-sd': 'score',
    'random-variable': 'build',
    'mean-variance': 'build',
    'expected-value': 'build',
    'is-binomial': 'machine',
    'binomial-formula': 'machine',
    'binomial-parameters': 'machine',
    density: 'bell',
    'normal-curve': 'bell',
    'standard-table': 'lookup',
    standardize: 'bell',
    'inverse-normal': 'lookup',
    'binomial-to-normal': 'approx',
    continuity: 'approx'
}

export const distributionsBatx2LabChallengeIds: number[] = [
    pascalChallenges,
    scoreChallenges,
    buildChallenges,
    machineChallenges,
    bellChallenges,
    lookupChallenges,
    approxChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
