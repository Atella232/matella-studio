import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { causesChallenges } from '../../batx2-zientziak-probabilitatea/lab/causes.ts'
import { probabilityBatx2LabTools } from '../../batx2-zientziak-probabilitatea/lab/labTools.ts'
import { mosaicChallenges } from '../../batx2-zientziak-probabilitatea/lab/mosaic.ts'
import { peopleChallenges } from '../../batx2-zientziak-probabilitatea/lab/people.ts'
import { zonesChallenges } from '../../batx2-zientziak-probabilitatea/lab/zones.ts'
import { chooseChallenges, combinatoricsAkLabTools, slotsChallenges } from '../../dbh4-akademikoak-konbinatoria/lab/labTools.ts'
import { drawChallenges, probabilityAkLabTools } from '../../dbh4-akademikoak-probabilitatea/lab/labTools.ts'
import type { ProbabilityBatx2gStageId } from '../lessons.tsx'
import { pipesChallenges } from './pipes.ts'
import { surveyChallenges } from './survey.ts'

/* ==========================================================================
   Probabilitatea (Batxilergoa 2 · Gizarte Zientziak) laboratory. Two tools
   of its own: the poll (100 people and a condition: conditional
   probability and independence) and the tree of pipes (10 000 litres:
   total probability and Bayes). The rest come with their challenges and
   ids from other units: the slots and choosing k of n from 4. DBH
   Combinatorics, drawing several at once from 4. DBH Probability, and the
   four zones, the probability square, the causes in the square and the
   10 000 people from 2.º Ciencias. Their progress is kept under this
   unit's storage prefix. Tests in tests/probabilitatea-batx2g-lab.test.ts.
   ========================================================================== */

export type ProbabilityBatx2gLabToolId = 'slots' | 'choose' | 'draw' | 'zones' | 'survey' | 'mosaic' | 'pipes' | 'causes' | 'people'

export interface ProbabilityBatx2gLabTool extends LabToolInfo {
    id: ProbabilityBatx2gLabToolId
    stage: ProbabilityBatx2gStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const fromCombinatorics = (id: string) => combinatoricsAkLabTools.find((tool) => tool.id === id)!
const fromAk = (id: string) => probabilityAkLabTools.find((tool) => tool.id === id)!
const fromCiencias = (id: string) => probabilityBatx2LabTools.find((tool) => tool.id === id)!

export const probabilityBatx2gLabTools: ProbabilityBatx2gLabTool[] = [
    { ...fromCombinatorics('slots'), id: 'slots', stage: 'counting', lessonTopic: 'variations' },
    { ...fromCombinatorics('choose'), id: 'choose', stage: 'counting', lessonTopic: 'combinations' },
    { ...fromAk('draw'), id: 'draw', stage: 'counting', lessonTopic: 'counting-laplace' },
    { ...fromCiencias('zones'), id: 'zones', stage: 'events', lessonTopic: 'two-events' },
    { id: 'survey', stage: 'conditional', lessonTopic: 'conditional', title: say('Inkesta', 'La encuesta', 'الاستطلاع', 'The poll'), observe: say('Baldintza bat aukeratzean, gainerako pertsonak itzaltzen dira: geratzen direnak dira osoko berria. P(S/G) eta P(G/S) ez dira berdinak, osoko berria aldatzen delako. Bi taldeetan «bai» proportzio bera badago, erantzuna eta adina independenteak dira.', 'Al elegir una condición, las demás personas se apagan: las que quedan son el nuevo total. P(S/G) y P(G/S) no son iguales, porque cambia el nuevo total. Si en los dos grupos hay la misma proporción de «sí», la respuesta y la edad son independientes.', 'عند اختيار شرط يخفت باقي الأشخاص: من يبقى هم الكل الجديد. وP(S/G) وP(G/S) ليسا متساويين لأن الكل الجديد يتغيّر. وإذا تساوت نسبة «نعم» في المجموعتين فالإجابة والعمر مستقلان.', 'When you choose a condition, the other people fade: those left are the new total. P(S/G) and P(G/S) are not equal, because the new total changes. If both groups have the same share of ‘yes’, the answer and the age are independent.') },
    { ...fromCiencias('mosaic'), id: 'mosaic', stage: 'conditional', lessonTopic: 'independence' },
    { id: 'pipes', stage: 'bayes', lessonTopic: 'total', title: say('Hodien zuhaitza', 'El árbol de tuberías', 'شجرة الأنابيب', 'The tree of pipes'), observe: say('D andelera iristen den ur guztia probabilitate osoa da: hodi bakoitzaren ura bider haren tasa, batuta. Andeleko uretik hodi bakoitzak jarritako zatia Bayes da: hodirik zabalena ez da beti gehien ekartzen duena.', 'Toda el agua que llega al depósito D es la probabilidad total: el agua de cada tubo por su tasa, sumadas. La parte del depósito que pone cada tubo es Bayes: el tubo más ancho no siempre es el que más trae.', 'كل الماء الذي يصل إلى الخزان D هو الاحتمال الكلي: ماء كل أنبوب في نسبته، مجموعة. والجزء الذي يضعه كل أنبوب في الخزان هو بايز: الأنبوب الأعرض ليس دائمًا الأكثر جلبًا.', 'All the water that reaches tank D is the total probability: each pipe\'s water times its rate, added up. The part of the tank that each pipe puts in is Bayes: the widest pipe is not always the one that brings most.') },
    { ...fromCiencias('causes'), id: 'causes', stage: 'bayes', lessonTopic: 'bayes' },
    { ...fromCiencias('people'), id: 'people', stage: 'bayes', lessonTopic: 'screening' }
]

export const probabilityBatx2gLabToolForTopic: Record<string, ProbabilityBatx2gLabToolId | undefined> = {
    variations: 'slots',
    permutations: 'slots',
    combinations: 'choose',
    'counting-laplace': 'draw',
    events: 'zones',
    frequency: undefined,
    union: 'zones',
    'two-events': 'zones',
    tables: 'survey',
    conditional: 'survey',
    independence: 'mosaic',
    trees: 'mosaic',
    total: 'pipes',
    bayes: 'pipes',
    screening: 'people'
}

export const probabilityBatx2gLabChallengeIds: number[] = [
    slotsChallenges,
    chooseChallenges,
    drawChallenges,
    zonesChallenges,
    surveyChallenges,
    mosaicChallenges,
    pipesChallenges,
    causesChallenges,
    peopleChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
