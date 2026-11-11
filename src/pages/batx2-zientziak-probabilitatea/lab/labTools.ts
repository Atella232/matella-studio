import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { drawChallenges, probabilityAkLabTools, repeatChallenges, totalChallenges } from '../../dbh4-akademikoak-probabilitatea/lab/labTools.ts'
import { contingencyChallenges, unionChallenges, urnChallenges } from '../../dbh4-aplikatuak-estatistika/lab/labTools.ts'
import type { ProbabilityBatx2StageId } from '../lessons.tsx'
import { causesChallenges } from './causes.ts'
import { paintChallenges } from './events.ts'
import { mosaicChallenges } from './mosaic.ts'
import { peopleChallenges } from './people.ts'
import { zonesChallenges } from './zones.ts'

/* ==========================================================================
   Probabilitatea (Batxilergoa 2 · Zientziak) laboratory. Five tools of its
   own, for what 2.º Bachillerato adds: paint the event (the four zones of
   the Venn diagram and De Morgan), the four zones with probabilities
   (three data fix the diagram), the probability square (multiplication
   rule, total probability and independence as cuts at the same height),
   the causes in the square (total probability as the painted area and
   Bayes as each strip's share of it) and 10 000 people (a diagnostic
   test). The review and the rest come with their challenges and ids from
   4. DBH (the union of events, two draws from an urn, the contingency
   table from aplikatuak; drawing several at once, at least once and the
   die that chooses the urn from académicas); their progress is kept under
   this unit's storage prefix. Tests in tests/probabilitatea-batx2z-lab.test.ts.
   ========================================================================== */

export type ProbabilityBatx2LabToolId = 'union' | 'urn' | 'draw' | 'paint' | 'zones' | 'mosaic' | 'repeat' | 'contingency' | 'total' | 'causes' | 'people'

export interface ProbabilityBatx2LabTool extends LabToolInfo {
    id: ProbabilityBatx2LabToolId
    stage: ProbabilityBatx2StageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const fromAk = (id: string) => probabilityAkLabTools.find((tool) => tool.id === id)!

export const probabilityBatx2LabTools: ProbabilityBatx2LabTool[] = [
    { ...fromAk('union'), id: 'union', stage: 'review', lessonTopic: 'review-events' },
    { ...fromAk('urn'), id: 'urn', stage: 'review', lessonTopic: 'review-compound' },
    { ...fromAk('draw'), id: 'draw', stage: 'review', lessonTopic: 'review-counting' },
    { id: 'paint', stage: 'events', lessonTopic: 'event-algebra', title: say('Margotu gertaera', 'Pinta el suceso', 'لوّن الحدث', 'Paint the event'), observe: say('Bi gertaerek lau zona sortzen dituzte, eta A eta B gertaeretatik eraikitako gertaera bakoitza zona batzuk dira. Gertaera berak izen bat baino gehiago izan ditzake: bilduraren aurkakoa eta aurkakoen ebakidura zona bera dira, De Morganen legea.', 'Dos sucesos forman cuatro zonas, y cada suceso construido con A y B es un conjunto de zonas. El mismo suceso puede tener varios nombres: el contrario de la unión y la intersección de los contrarios son la misma zona, la ley de De Morgan.', 'يكوّن حدثان أربع مناطق، وكل حدث مبني من A وB مجموعة من المناطق. وقد يكون للحدث نفسه عدة أسماء: معاكس الاتحاد وتقاطع المعاكسين منطقة واحدة، وهذا قانون دي مورغان.', 'Two events make four zones, and every event built from A and B is a set of zones. The same event can have several names: the complement of the union and the intersection of the complements are the same zone, De Morgan\'s law.') },
    { id: 'zones', stage: 'events', lessonTopic: 'from-data', title: say('Lau zonak', 'Las cuatro zonas', 'المناطق الأربع', 'The four zones'), observe: say('Hiru datu nahikoak dira lau zonak betetzeko, eta lauek 1 batzen dute. P(A ∪ B) beti da P(A) + P(B) baino txikiagoa, gertaerak bateraezinak direnean izan ezik: orduan berdinak dira.', 'Con tres datos se llenan las cuatro zonas, y las cuatro suman 1. P(A ∪ B) siempre es menor que P(A) + P(B), salvo cuando los sucesos son incompatibles: entonces son iguales.', 'تكفي ثلاث معطيات لملء المناطق الأربع، ومجموعها 1. ويكون P(A ∪ B) دائمًا أصغر من P(A) + P(B) إلا إذا كان الحدثان متنافيين: عندئذ يتساويان.', 'Three data are enough to fill in the four zones, and the four add up to 1. P(A ∪ B) is always less than P(A) + P(B), except when the events are mutually exclusive: then they are equal.') },
    { id: 'mosaic', stage: 'conditional', lessonTopic: 'conditional', title: say('Probabilitatearen karratua', 'El cuadrado de probabilidad', 'مربع الاحتمال', 'The probability square'), observe: say('Pieza bakoitza ebakidura bat da: zerrendaren zabalera bider mozketaren altuera, biderkaduraren erregela. B jakinda, B piezak bakarrik geratzen dira: P(A/B) haietatik A zerrendan dagoen zatia da. Bi mozketak altuera berean badaude, A eta B independenteak dira.', 'Cada pieza es una intersección: el ancho de la franja por la altura del corte, la regla del producto. Sabiendo B, solo quedan las piezas de B: P(A/B) es la parte de ellas que está en la franja A. Si los dos cortes están a la misma altura, A y B son independientes.', 'كل قطعة تقاطع: عرض الشريط في ارتفاع الخط، وهذه قاعدة الضرب. ومع العلم بـ B لا تبقى إلا قطع B، وP(A/B) هو جزؤها الواقع في شريط A. وإذا كان الخطان على الارتفاع نفسه فالحدثان مستقلان.', 'Each piece is an intersection: the width of the strip times the height of the cut, the multiplication rule. Given B, only the pieces of B are left: P(A/B) is the part of them in strip A. If both cuts are at the same height, A and B are independent.') },
    { ...fromAk('repeat'), id: 'repeat', stage: 'conditional', lessonTopic: 'independence' },
    { ...fromAk('contingency'), id: 'contingency', stage: 'conditional', lessonTopic: 'percent-tables' },
    { ...fromAk('total'), id: 'total', stage: 'bayes', lessonTopic: 'two-stage' },
    { id: 'causes', stage: 'bayes', lessonTopic: 'bayes', title: say('Kausak karratuan', 'Las causas en el cuadrado', 'الأسباب في المربع', 'The causes in the square'), observe: say('Margotutako azalera osoa probabilitate osoa da. D jakinda, zerrenda bakoitzak margotutakoan duen zatia a posteriori probabilitatea da: kausarik probableena ez da beti gehien ekoizten duena, ezta huts gehien egiten duena ere.', 'Toda el área pintada es la probabilidad total. Sabiendo D, la parte de lo pintado que pone cada franja es la probabilidad a posteriori: la causa más probable no siempre es la que más produce ni la que más falla.', 'كل المساحة الملوّنة هي الاحتمال الكلي. ومع العلم بـ D تكون حصة كل شريط من الملوّن هي الاحتمال البعدي: السبب الأرجح ليس دائمًا الأكثر إنتاجًا ولا الأكثر خطأ.', 'The whole painted area is the total probability. Given D, each strip\'s share of the painted area is the posterior probability: the likeliest cause is not always the one that makes most, nor the one that fails most.') },
    { id: 'people', stage: 'bayes', lessonTopic: 'diagnostic-tests', title: say('10 000 pertsona', '10 000 personas', '10 000 شخص', '10,000 people'), observe: say('Positiboak bi taldetatik datoz: positibo ateratzen diren gaixoak eta positibo faltsuak. Gaixotasuna arraroa denean, osasuntsuak hain dira asko, non haien ehuneko txiki batek ere gaixoak bezainbeste positibo ematen dituen.', 'Los positivos vienen de dos grupos: los enfermos que dan positivo y los falsos positivos. Cuando la enfermedad es rara, los sanos son tantos que un pequeño porcentaje de ellos da tantos positivos como los enfermos.', 'يأتي الإيجابيون من مجموعتين: المرضى الذين نتيجتهم إيجابية والإيجابيات الكاذبة. وعندما يكون المرض نادرًا يكثر الأصحاء حتى إن نسبة صغيرة منهم تعطي إيجابيات بعدد المرضى.', 'The positives come from two groups: the ill who test positive and the false positives. When the disease is rare, the healthy are so many that a small percentage of them gives as many positives as the ill.') }
]

export const probabilityBatx2LabToolForTopic: Record<string, ProbabilityBatx2LabToolId | undefined> = {
    'review-events': 'union',
    'review-compound': 'urn',
    'review-counting': 'draw',
    'event-space': 'paint',
    'event-algebra': 'paint',
    axioms: 'zones',
    'from-data': 'zones',
    conditional: 'mosaic',
    'product-rule': 'mosaic',
    independence: 'mosaic',
    'percent-tables': 'contingency',
    'total-probability': 'causes',
    bayes: 'causes',
    'diagnostic-tests': 'people',
    'two-stage': 'total'
}

export const probabilityBatx2LabChallengeIds: number[] = [
    unionChallenges,
    urnChallenges,
    drawChallenges,
    paintChallenges,
    zonesChallenges,
    mosaicChallenges,
    repeatChallenges,
    contingencyChallenges,
    totalChallenges,
    causesChallenges,
    peopleChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
