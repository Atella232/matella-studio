import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { geometry3LabTools } from '../../dbh3-geometria/lab/labTools.ts'
import { notableChallenges } from '../../dbh3-geometria/lab/notable.ts'
import { alignChallenges, formsChallenges, segmentChallenges, twoLinesChallenges, vectorsLabTools } from '../../dbh4-akademikoak-bektoreak/lab/labTools.ts'
import type { BachGeometryStageId } from '../lessons.tsx'
import { lineAngleChallenges } from './lineAngle.ts'
import { pencilChallenges } from './pencil.ts'
import { shortestChallenges } from './shortest.ts'

/* ==========================================================================
   Geometria analitikoa (Batxilergoa 1 · Zientziak) laboratory. Three
   tools of its own, for what 1.º Bachillerato adds: the pencil of lines
   (a line turning around its centre, and which side of it a point is),
   the angle of two lines (the acute one, against 45°) and the shortest
   distance (a point walking along a line until it is closest to P). The
   review comes from 4. DBH (segment, third point, the forms of a line,
   the second line) and 3. DBH (notable points), with their challenges and
   ids (progress is kept apart, under this unit's storage prefix).
   Tests in tests/geometria-batx1z-lab.test.ts.
   ========================================================================== */

export type BachGeometryLabToolId = 'segment' | 'align' | 'forms' | 'pencil' | 'two-lines' | 'line-angle' | 'shortest' | 'notable'

export interface BachGeometryLabTool extends LabToolInfo {
    id: BachGeometryLabToolId
    stage: BachGeometryStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const bachGeometryLabTools: BachGeometryLabTool[] = [
    { ...from(vectorsLabTools, 'segment'), id: 'segment', stage: 'points', lessonTopic: 'midpoint-symmetric' },
    { ...from(vectorsLabTools, 'align'), id: 'align', stage: 'points', lessonTopic: 'collinear' },
    { ...from(vectorsLabTools, 'forms'), id: 'forms', stage: 'lines', lessonTopic: 'general-normal' },
    { id: 'pencil', stage: 'lines', lessonTopic: 'pencil', title: say('Zuzen-sorta', 'El haz de rectas', 'حزمة المستقيمات', 'The pencil of lines'), observe: say('Malda aldatzean, zuzenak P zentroaren inguruan biratzen du: sortako zuzen guztiak P puntutik pasatzen dira. Puntu bat zuzenaren gainean dago y-ren balioa zuzenaren altuera baino handiagoa denean.', 'Al cambiar la pendiente, la recta gira alrededor del centro P: todas las rectas del haz pasan por P. Un punto está por encima de la recta cuando su y es mayor que la altura de la recta en su x.', 'عند تغيير الميل يدور المستقيم حول المركز P: كل مستقيمات الحزمة تمر بـ P. وتكون النقطة فوق المستقيم عندما يكون y لها أكبر من ارتفاع المستقيم عند x نفسه.', 'When the slope changes, the line turns around the centre P: every line of the pencil passes through P. A point is above the line when its y is greater than the height of the line at its x.') },
    { ...from(vectorsLabTools, 'two-lines'), id: 'two-lines', stage: 'positions', lessonTopic: 'parallel-perpendicular' },
    { id: 'line-angle', stage: 'positions', lessonTopic: 'line-angle', title: say('Bi zuzenen angelua', 'El ángulo de dos rectas', 'زاوية مستقيمين', 'The angle of two lines'), observe: say('Bi zuzenek lau angelu osatzen dituzte, binaka berdinak; zuzenen angelua zorrotza da. Horregatik biderkadura eskalarra balio absolutuan hartzen da: bektore bat buelta emanda ere, angelua ez da aldatzen.', 'Dos rectas forman cuatro ángulos, iguales dos a dos; el ángulo de las rectas es el agudo. Por eso el producto escalar se toma en valor absoluto: aunque se dé la vuelta a un vector, el ángulo no cambia.', 'يصنع المستقيمان أربع زوايا متساوية مثنى مثنى؛ وزاوية المستقيمين هي الحادة. لذلك يؤخذ الجداء السلمي بالقيمة المطلقة: فلو عكسنا أحد المتجهين لا تتغير الزاوية.', 'Two lines make four angles, equal in pairs; the angle of the lines is the acute one. That is why the dot product is taken in absolute value: turning one vector round does not change the angle.') },
    { id: 'shortest', stage: 'distances', lessonTopic: 'point-line', title: say('Biderik laburrena', 'La distancia más corta', 'أقصر مسافة', 'The shortest distance'), observe: say('Q zuzenean mugitzean, PQ luzera aldatzen da, eta txikiena perpendikularraren oinean da. Luzera txiki hori da P puntutik zuzenerako distantzia, eta formulak oina aurkitu gabe ematen du.', 'Al mover Q por la recta, la longitud PQ cambia, y la menor está en el pie de la perpendicular. Esa longitud mínima es la distancia de P a la recta, y la fórmula la da sin hallar el pie.', 'عند تحريك Q على المستقيم يتغير طول PQ، وأصغره عند موقع العمود. وهذا الطول الأصغر هو المسافة من P إلى المستقيم، وتعطيه الصيغة دون إيجاد موقع العمود.', 'As Q moves along the line, the length PQ changes, and the smallest one is at the foot of the perpendicular. That smallest length is the distance from P to the line, and the formula gives it without finding the foot.') },
    { ...from(geometry3LabTools, 'notable'), id: 'notable', stage: 'triangles', lessonTopic: 'triangle-points' }
]

export const bachGeometryLabToolForTopic: Record<string, BachGeometryLabToolId | undefined> = {
    'midpoint-symmetric': 'segment',
    collinear: 'align',
    'divide-segment': 'align',
    'vector-parametric': 'forms',
    'general-normal': 'forms',
    'explicit-slope': 'pencil',
    pencil: 'pencil',
    'parallel-perpendicular': 'two-lines',
    'relative-position': 'two-lines',
    'line-angle': 'line-angle',
    'point-line': 'shortest',
    'parallel-lines': 'shortest',
    reflection: 'shortest',
    'triangle-points': 'notable',
    'triangle-area': 'shortest'
}

export const bachGeometryLabChallengeIds: number[] = [segmentChallenges, alignChallenges, formsChallenges, pencilChallenges, twoLinesChallenges, lineAngleChallenges, shortestChallenges, notableChallenges]
    .flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
