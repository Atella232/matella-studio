import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { combinationChallenges, vectorChallenges, vectorsLabTools } from '../../dbh4-akademikoak-bektoreak/lab/labTools.ts'
import type { BachVectorsStageId } from '../lessons.tsx'
import { riverChallenges } from './river.ts'
import { shadowChallenges } from './shadow.ts'
import { skewChallenges } from './skewGrid.ts'

/* ==========================================================================
   Bektoreak (Batxilergoa 1 · Zientziak) laboratory. Three tools of its
   own, for what 1.º Bachillerato adds: the skew grid of a basis (the
   coordinates of a vector in it), the shadow of one vector on another
   (the sign and the size of the dot product, with coordinates) and a boat
   crossing a river (adding velocities). The review comes from 4. DBH with
   its challenges and ids (progress is kept apart, under this unit's
   storage prefix): the vector from A to B and the combination a·u + b·v.
   Tests in tests/bektoreak-batx1z-lab.test.ts.
   ========================================================================== */

export type BachVectorsLabToolId = 'vector' | 'combination' | 'skew-grid' | 'shadow' | 'river'

export interface BachVectorsLabTool extends LabToolInfo {
    id: BachVectorsLabToolId
    stage: BachVectorsStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const bachVectorsLabTools: BachVectorsLabTool[] = [
    { ...from(vectorsLabTools, 'vector'), id: 'vector', stage: 'vectors', lessonTopic: 'free-vectors' },
    { ...from(vectorsLabTools, 'combination'), id: 'combination', stage: 'bases', lessonTopic: 'linear-combination' },
    { id: 'skew-grid', stage: 'bases', lessonTopic: 'basis-coordinates', title: say('Sare okerra', 'La cuadrícula torcida', 'الشبكة المائلة', 'The skew grid'), observe: say('u eta v paraleloak ez badira, haien sareak plano osoa betetzen du, eta w puntu bakoitzera bide bakar batetik iristen da: a urrats u norabidean eta b urrats v norabidean. Paraleloak badira, sarea zuzen batean zapaltzen da.', 'Si u y v no son paralelos, su red llena todo el plano y a cada w se llega por un solo camino: a pasos de u y b pasos de v. Si son paralelos, la red se aplasta en una recta.', 'إذا لم يكن u وv متوازيين فإن شبكتهما تملأ المستوى، ونصل إلى كل w بطريق واحد: a خطوة من u وb خطوة من v. وإذا كانا متوازيين انضغطت الشبكة في مستقيم.', 'If u and v are not parallel, their grid fills the whole plane and each w is reached by a single path: a steps of u and b steps of v. If they are parallel, the grid flattens onto a line.') },
    { id: 'shadow', stage: 'dot', lessonTopic: 'dot-definition', title: say('Itzala', 'La sombra', 'الظل', 'The shadow'), observe: say('Argia u bektorearen zuzenarekiko perpendikularra da. v bektorearen itzala aurrera erortzen bada, biderkadura eskalarra positiboa da; atzera, negatiboa; eta itzalik ez badago, 0. u · v = |u| · itzala.', 'La luz es perpendicular a la recta de u. Si la sombra de v cae hacia delante, el producto escalar es positivo; hacia atrás, negativo; y si no hay sombra, 0. u · v = |u| · sombra.', 'الضوء عمودي على مستقيم u. إذا وقع ظل v إلى الأمام فالجداء السلمي موجب، وإلى الخلف سالب، وإذا لم يكن له ظل فهو 0. u · v = |u| · الظل.', 'The light is perpendicular to the line of u. If the shadow of v falls forwards, the dot product is positive; backwards, negative; and if there is no shadow, 0. u · v = |u| · shadow.') },
    { id: 'river', stage: 'applications', lessonTopic: 'forces', title: say('Txalupa eta ibaia', 'El barco y el río', 'القارب والنهر', 'The boat and the river'), observe: say('Benetako abiadura txalupa propioa gehi korrontea da. Zeharkatzeko denbora txalupak ertzarekiko perpendikularki duen abiaduraren araberakoa da bakarrik; korronteak alde batera eramaten du.', 'La velocidad real es la de la barca más la de la corriente. El tiempo de cruzar solo depende de la parte de la velocidad perpendicular a la orilla; la corriente la desplaza hacia un lado.', 'السرعة الحقيقية هي سرعة القارب زائد سرعة التيار. ولا يتوقف زمن العبور إلا على جزء السرعة العمودي على الضفة؛ والتيار يزيحه جانبًا.', 'The real velocity is the boat\'s own plus the current\'s. The time to cross only depends on the part of the velocity perpendicular to the bank; the current pushes it sideways.') }
]

export const bachVectorsLabToolForTopic: Record<string, BachVectorsLabToolId | undefined> = {
    'free-vectors': 'vector',
    'vector-operations': 'combination',
    'linear-combination': 'combination',
    basis: 'skew-grid',
    'basis-coordinates': 'skew-grid',
    'dot-definition': 'shadow',
    'dot-figures': 'shadow',
    'dot-properties': 'shadow',
    orthonormal: 'shadow',
    'modulus-unit': 'vector',
    'angle-vectors': 'shadow',
    'perpendicular-vectors': 'shadow',
    projection: 'shadow',
    decomposition: 'shadow',
    forces: 'river'
}

export const bachVectorsLabChallengeIds: number[] = [vectorChallenges, combinationChallenges, skewChallenges, shadowChallenges, riverChallenges]
    .flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
