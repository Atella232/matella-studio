import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { AnglesDistancesStageId } from '../lessons.tsx'
import { say } from './common.ts'
import { footChallenges } from './foot.ts'
import { mirrorChallenges } from './mirror.ts'
import { protractorChallenges } from './protractor.ts'
import { rulerChallenges } from './ruler.ts'
import { skewBoxChallenges } from './skewBox.ts'

/* ==========================================================================
   Angeluak eta distantziak (Batxilergoa 2 · Zientziak) laboratory: five
   tools of its own, all on the 3D board of the Espacio block, one per
   stage. Each one asks for a prediction before it shows the result and
   has endless challenges after the fixed ones. Tests in
   tests/distantziak-batx2z-lab.test.ts.
   ========================================================================== */

export type AnglesDistancesLabToolId = 'protractor' | 'foot' | 'mirror' | 'ruler' | 'skew-box'

export interface AnglesDistancesLabTool extends LabToolInfo {
    id: AnglesDistancesLabToolId
    stage: AnglesDistancesStageId
}

export const anglesDistancesLabTools: AnglesDistancesLabTool[] = [
    {
        id: 'protractor',
        stage: 'angles',
        lessonTopic: 'angle-lines',
        title: say('3D garraiagailua', 'El transportador 3D', 'المنقلة ثلاثية الأبعاد', 'The 3D protractor'),
        observe: say('Bi zuzen eta bi plano: norabideen edo normalen kosinua, balio absolutuarekin. Zuzena eta planoa: formula berak sinua ematen du. Biderkadura eskalarra 0 bada, 90 gradu (zuzena eta planoa: 0 gradu).', 'Dos rectas y dos planos: el coseno de directores o normales, con valor absoluto. Recta y plano: la misma fórmula da el seno. Si el producto escalar es 0, 90 grados (en recta y plano, 0 grados).', 'مستقيمان ومستويان: جيب تمام الاتجاهين أو الناظمين بالقيمة المطلقة. مستقيم ومستوى: الصيغة نفسها تعطي الجيب. وإذا كان الجداء السلمي 0 فالزاوية 90 درجة (في المستقيم والمستوى 0 درجة).', 'Two lines and two planes: the cosine of directions or normals, with absolute value. Line and plane: the same formula gives the sine. If the dot product is 0, 90 degrees (for a line and a plane, 0 degrees).')
    },
    {
        id: 'foot',
        stage: 'projections',
        lessonTopic: 'project-point-plane',
        title: say('Perpendikularra eta oina', 'El pie de la perpendicular', 'مسقط العمودي', 'The foot of the perpendicular'),
        observe: say('Oina perpendikularrak planoa edo zuzena ebakitzen duen puntua da: P puntutik hurbilena. Planoan, P + t·n; zuzenean, A + t·u, PM perpendikularra izan dadin.', 'El pie es donde la perpendicular corta al plano o a la recta: el punto más cercano a P. En el plano, P + t·n; en la recta, A + t·u con PM perpendicular.', 'المسقط هو حيث يقطع العمودي المستوى أو المستقيم: أقرب نقطة إلى P. في المستوى P + t·n؛ وفي المستقيم A + t·u مع PM عمودي.', 'The foot is where the perpendicular meets the plane or the line: the point closest to P. On the plane, P + t·n; on the line, A + t·u with PM perpendicular.')
    },
    {
        id: 'mirror',
        stage: 'symmetric',
        lessonTopic: 'symmetric-plane',
        title: say('Ispilua', 'El espejo', 'المرآة', 'The mirror'),
        observe: say('Simetrikoa ispiluaren beste aldean dago, distantzia berera: oina erdian geratzen da. Zuzenkia islatzeko, bi muturrak islatzen dira.', 'El simétrico está al otro lado del espejo, a la misma distancia: el pie queda en medio. Para reflejar un segmento, se reflejan sus dos extremos.', 'النظيرة في الجهة الأخرى من المرآة وعلى البعد نفسه: المسقط في المنتصف. ولعكس قطعة نعكس طرفيها.', 'The symmetric point is on the other side of the mirror, at the same distance: the foot is in the middle. To reflect a segment, reflect its two ends.')
    },
    {
        id: 'ruler',
        stage: 'point-distances',
        lessonTopic: 'point-plane',
        title: say('Distantziaren erregela', 'La regla de la distancia', 'مسطرة المسافة', 'The distance ruler'),
        observe: say('Planorako distantzia: puntua ekuazioan ordezkatu, balio absolutua, eta normalaren moduluaz zatitu. Zuzenerako distantzia: paralelogramoaren altuera. Planoa paralelo mugitzean, distantzia d aldatzen den bezala aldatzen da.', 'Distancia a un plano: sustituir el punto, valor absoluto y dividir entre el módulo del normal. A una recta: la altura del paralelogramo. Al mover el plano en paralelo, la distancia cambia al cambiar d.', 'المسافة إلى مستوى: نعوّض النقطة ونأخذ القيمة المطلقة ونقسم على طول الناظم. وإلى مستقيم: ارتفاع متوازي الأضلاع. وعند تحريك المستوى موازيًا تتغير المسافة بتغير d.', 'Distance to a plane: put the point in, absolute value and divide by the magnitude of the normal. To a line: the height of the parallelogram. Moving the plane parallel, the distance changes as d changes.')
    },
    {
        id: 'skew-box',
        stage: 'line-distances',
        lessonTopic: 'skew-distance',
        title: say('Gurutzatzen diren zuzenen kutxa', 'La caja de las que se cruzan', 'صندوق المستقيمين المتخالفين', 'The box of skew lines'),
        observe: say('AB, u eta v bektoreen kutxaren altuera zuzenen arteko distantzia da. B bere zuzenean mugitzean kutxa aldatzen da, baina ez altuera. Kutxa zapaltzen bada, zuzenak ebakitzen dira.', 'La altura de la caja de AB, u y v es la distancia entre las rectas. Al mover B por su recta, la caja cambia pero la altura no. Si la caja se aplasta, las rectas se cortan.', 'ارتفاع صندوق AB وu وv هو المسافة بين المستقيمين. وعند تحريك B على مستقيمه يتغير الصندوق ولا يتغير الارتفاع. وإذا انضغط الصندوق تقاطع المستقيمان.', 'The height of the box of AB, u and v is the distance between the lines. Moving B along its line changes the box but not the height. If the box flattens, the lines meet.')
    }
]

export const anglesDistancesLabToolForTopic: Record<string, AnglesDistancesLabToolId | undefined> = {
    'angle-lines': 'protractor',
    'angle-line-plane': 'protractor',
    'angle-planes': 'protractor',
    'project-point-plane': 'foot',
    'project-point-line': 'foot',
    'project-line-plane': 'foot',
    'symmetric-plane': 'mirror',
    'symmetric-line': 'mirror',
    'mediator-plane': 'mirror',
    'point-plane': 'ruler',
    'parallel-planes': 'ruler',
    'point-line': 'ruler',
    'parallel-lines': 'skew-box',
    'skew-distance': 'skew-box',
    'common-perpendicular': 'skew-box'
}

export const anglesDistancesLabChallengeIds: number[] = [protractorChallenges, footChallenges, mirrorChallenges, rulerChallenges, skewBoxChallenges]
    .flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
