import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { bisectorChallenges, circleChallenges, vectorsLabTools } from '../../dbh4-akademikoak-bektoreak/lab/labTools.ts'
import type { BachConicsStageId } from '../lessons.tsx'
import { directrixChallenges } from './directrix.ts'
import { eccentricityChallenges } from './eccentricity.ts'
import { gardenerChallenges } from './gardener.ts'

/* ==========================================================================
   Leku geometrikoak eta konikak (Batxilergoa 1 · Zientziak) laboratory.
   Three tools of its own: the gardener's ellipse (two nails and a string
   of length 2a), the focus and the directrix of a parabola, and the
   eccentricity that turns a circle into an ellipse, a parabola and a
   hyperbola. The perpendicular bisector and the circle come from 4. DBH,
   with their challenges and ids (progress is kept apart, under this
   unit's storage prefix). Tests in tests/konikak-batx1z-lab.test.ts.
   ========================================================================== */

export type BachConicsLabToolId = 'bisector' | 'circle' | 'gardener' | 'eccentricity' | 'directrix'

export interface BachConicsLabTool extends LabToolInfo {
    id: BachConicsLabToolId
    stage: BachConicsStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const bachConicsLabTools: BachConicsLabTool[] = [
    { ...from(vectorsLabTools, 'bisector'), id: 'bisector', stage: 'loci', lessonTopic: 'perpendicular-bisector' },
    { ...from(vectorsLabTools, 'circle'), id: 'circle', stage: 'circle', lessonTopic: 'circle-equation' },
    { id: 'gardener', stage: 'ellipse', lessonTopic: 'ellipse-definition', title: say('Lorazainaren elipsea', 'El jardinero', 'قطع البستاني', 'The gardener\'s ellipse'), observe: say('Soka beti tenkatuta dagoenez, PF + PF′ batura 2a da elipseko puntu guztietan. Fokuak urrundu ahala, elipsea zapalagoa da; bi fokuak elkartzen badira, zirkunferentzia bat ateratzen da.', 'Como la cuerda está siempre tensa, PF + PF′ vale 2a en todos los puntos de la elipse. Cuanto más se separan los focos, más achatada es; si los dos focos se juntan, sale una circunferencia.', 'لأن الخيط مشدود دائمًا فإن PF + PF′ يساوي 2a في كل نقاط القطع الناقص. وكلما تباعدت البؤرتان صار أكثر تفلطحًا؛ وإذا اجتمعت البؤرتان نتجت دائرة.', 'As the string is always tight, PF + PF′ is 2a at every point of the ellipse. The further apart the foci, the flatter it is; if both foci come together, you get a circle.') },
    { id: 'eccentricity', stage: 'hyperbola', lessonTopic: 'hyperbola-asymptotes', title: say('Eszentrikotasuna', 'La excentricidad', 'الاختلاف المركزي', 'The eccentricity'), observe: say('Kurbako puntu bakoitzean, fokurako distantzia zuzentzailerakoa bider e da. e = 0 denean zirkunferentzia da; e 1 baino txikiagoa denean, elipsea; e = 1 denean, parabola; eta e 1 baino handiagoa denean, hiperbola.', 'En cada punto de la curva, la distancia al foco es e veces la distancia a la directriz. Con e = 0 es una circunferencia; con e menor que 1, una elipse; con e = 1, una parábola; y con e mayor que 1, una hipérbola.', 'في كل نقطة من المنحنى تساوي المسافة إلى البؤرة e مرة المسافة إلى الدليل. عندما e = 0 تكون دائرة؛ وعندما e أصغر من 1 قطعًا ناقصًا؛ وعندما e = 1 قطعًا مكافئًا؛ وعندما e أكبر من 1 قطعًا زائدًا.', 'At each point of the curve, the distance to the focus is e times the distance to the directrix. With e = 0 it is a circle; with e less than 1, an ellipse; with e = 1, a parabola; and with e greater than 1, a hyperbola.') },
    { id: 'directrix', stage: 'parabola', lessonTopic: 'parabola-definition', title: say('Fokua eta zuzentzailea', 'Foco y directriz', 'البؤرة والدليل', 'Focus and directrix'), observe: say('Parabolako puntu bakoitza fokutik eta zuzentzailetik distantzia berera dago: PF = PH. p handitzean, fokua eta zuzentzailea urruntzen dira, eta parabola irekiagoa da.', 'Cada punto de la parábola está a la misma distancia del foco y de la directriz: PF = PH. Al aumentar p, el foco y la directriz se separan y la parábola se abre más.', 'كل نقطة من القطع المكافئ على المسافة نفسها من البؤرة والدليل: PF = PH. وعند زيادة p تتباعد البؤرة والدليل وينفتح القطع أكثر.', 'Each point of the parabola is the same distance from the focus and from the directrix: PF = PH. As p grows, the focus and the directrix move apart and the parabola opens wider.') }
]

export const bachConicsLabToolForTopic: Record<string, BachConicsLabToolId | undefined> = {
    'perpendicular-bisector': 'bisector',
    'angle-bisectors': 'bisector',
    'distance-loci': 'circle',
    'circle-equation': 'circle',
    'circle-general': 'circle',
    'circle-line': 'circle',
    'two-circles': 'circle',
    'ellipse-definition': 'gardener',
    'ellipse-elements': 'gardener',
    'ellipse-shifted': 'gardener',
    'hyperbola-definition': 'eccentricity',
    'hyperbola-asymptotes': 'eccentricity',
    'parabola-definition': 'directrix',
    'parabola-positions': 'directrix',
    'recognize-conic': 'eccentricity'
}

export const bachConicsLabChallengeIds: number[] = [bisectorChallenges, circleChallenges, gardenerChallenges, eccentricityChallenges, directrixChallenges]
    .flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
