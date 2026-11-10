import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { SpaceVectorsStageId } from '../lessons.tsx'
import { boxVolumeChallenges } from './boxVolume.ts'
import { say } from './common.ts'
import { inPlaneChallenges } from './inPlane.ts'
import { pointBoxChallenges } from './pointBox.ts'
import { rightHandChallenges } from './rightHand.ts'
import { spaceShadowChallenges } from './spaceShadow.ts'

/* ==========================================================================
   Espazioko bektoreak (Batxilergoa 2 · Zientziak) laboratory: five tools
   of its own, all on the 3D board of the block, one per stage. Each one
   asks for a prediction before it shows the result and has endless
   challenges after the fixed ones. Tests in
   tests/bektoreak-batx2z-lab.test.ts.
   ========================================================================== */

export type SpaceVectorsLabToolId = 'point-box' | 'in-plane' | 'space-shadow' | 'right-hand' | 'box-volume'

export interface SpaceVectorsLabTool extends LabToolInfo {
    id: SpaceVectorsLabToolId
    stage: SpaceVectorsStageId
}

export const spaceVectorsLabTools: SpaceVectorsLabTool[] = [
    {
        id: 'point-box',
        stage: 'space',
        lessonTopic: 'space-vectors',
        title: say('Puntua eta haren kutxa', 'El punto y su caja', 'النقطة وصندوقها', 'The point and its box'),
        observe: say('AB bektorea kutxa baten diagonala da: haren aldeak koordenatuen diferentziak dira. Modulua hiru karratuen baturaren erroa da, z barne. Erdiko puntua koordenatuen batezbestekoa da.', 'El vector AB es la diagonal de una caja: sus lados son las diferencias de coordenadas. El módulo es la raíz de la suma de los tres cuadrados, también el de z. El punto medio es la media de las coordenadas.', 'المتجه AB قطر صندوق أضلاعه فروق الإحداثيات. وطوله جذر مجموع المربعات الثلاثة، ومنها مربع z. والمنتصف متوسط الإحداثيات.', 'The vector AB is the diagonal of a box whose sides are the differences of the coordinates. Its magnitude is the root of the sum of the three squares, z included. The midpoint is the average of the coordinates.')
    },
    {
        id: 'in-plane',
        stage: 'dependence',
        lessonTopic: 'dependence-rank',
        title: say('Planoan sartzen da?', '¿Cabe en el plano?', 'هل يدخل في المستوى؟', 'Does it fit in the plane?'),
        observe: say('u eta v paraleloak ez badira, plano bat osatzen dute. w planoan badago, hirurak mendekoak dira eta determinantea 0 da; planotik irteten bada, oinarri bat osatzen dute.', 'Si u y v no son paralelos, forman un plano. Si w está en ese plano, los tres son dependientes y el determinante es 0; si sale de él, forman una base.', 'إذا لم يتوازَ u وv كوّنا مستوى. وإذا كان w في هذا المستوى فالثلاثة مرتبطة والمحدد 0؛ وإذا خرج منه كوّنت أساسًا.', 'If u and v are not parallel, they span a plane. If w lies in that plane, the three are dependent and the determinant is 0; if it sticks out, they form a basis.')
    },
    {
        id: 'space-shadow',
        stage: 'dot',
        lessonTopic: 'projection-3d',
        title: say('Itzala espazioan', 'La sombra en el espacio', 'الظل في الفضاء', 'The shadow in space'),
        observe: say('Argia u bektorearen zuzenarekiko perpendikularra da. v bektorearen itzala aurrera erortzen bada, biderkadura eskalarra positiboa da; atzera, negatiboa; itzalik ez badago, 0. Itzalaren luzera u · v zati |u| da.', 'La luz es perpendicular a la recta de u. Si la sombra de v cae hacia delante, el producto escalar es positivo; hacia atrás, negativo; y si no hay sombra, 0. La sombra mide u · v entre |u|.', 'الضوء عمودي على مستقيم u. إذا وقع ظل v إلى الأمام فالجداء السلمي موجب، وإلى الخلف سالب، وإذا لم يكن ظل فهو 0. وطول الظل u · v مقسومًا على |u|.', 'The light is perpendicular to the line of u. If the shadow of v falls forwards, the dot product is positive; backwards, negative; and with no shadow, 0. The shadow measures u · v divided by |u|.')
    },
    {
        id: 'right-hand',
        stage: 'cross',
        lessonTopic: 'cross-product',
        title: say('Eskuineko eskua', 'La mano derecha', 'اليد اليمنى', 'The right hand'),
        observe: say('u × v paralelogramoaren gainean zutik dago, bi bektoreekiko perpendikularra. Haren luzera paralelogramoaren azalera da. Ordena aldatzean, gezia buelta ematen du: v × u = −u × v.', 'u × v está de pie sobre el paralelogramo, perpendicular a los dos vectores. Su longitud es el área del paralelogramo. Al cambiar el orden, la flecha se da la vuelta: v × u = −u × v.', 'يقف u × v على متوازي الأضلاع، عموديًا على المتجهين. وطوله مساحة متوازي الأضلاع. وبتغيير الترتيب ينقلب السهم: v × u = −u × v.', 'u × v stands on the parallelogram, perpendicular to both vectors. Its length is the area of the parallelogram. When you swap the order, the arrow turns round: v × u = −u × v.')
    },
    {
        id: 'box-volume',
        stage: 'mixed',
        lessonTopic: 'mixed-volume',
        title: say('Hiru bektoreren kutxa', 'La caja de tres vectores', 'صندوق ثلاثة متجهات', 'The box of three vectors'),
        observe: say('Bolumena oinarriaren azalera bider altuera da. w oinarriaren paraleloan mugitzen bada, bolumena ez da aldatzen. w oinarriaren planora jaisten bada, kutxa zapaltzen da eta biderkadura mistoa 0 da.', 'El volumen es el área de la base por la altura. Si w se mueve paralelo a la base, el volumen no cambia. Si w baja al plano de la base, la caja se aplasta y el producto mixto es 0.', 'الحجم مساحة القاعدة في الارتفاع. إذا تحرك w موازيًا للقاعدة لم يتغير الحجم. وإذا نزل w إلى مستوى القاعدة انضغط الصندوق وصار الجداء المختلط 0.', 'The volume is the area of the base times the height. If w moves parallel to the base, the volume does not change. If w comes down to the plane of the base, the box flattens and the scalar triple product is 0.')
    }
]

export const spaceVectorsLabToolForTopic: Record<string, SpaceVectorsLabToolId | undefined> = {
    'space-points': 'point-box',
    'space-vectors': 'point-box',
    'midpoint-symmetric': 'point-box',
    'combination-3d': 'in-plane',
    'dependence-rank': 'in-plane',
    'basis-3d': 'in-plane',
    'dot-3d': 'space-shadow',
    'angle-3d': 'space-shadow',
    'projection-3d': 'space-shadow',
    'cross-product': 'right-hand',
    'cross-properties': 'right-hand',
    'cross-area': 'right-hand',
    'mixed-product': 'box-volume',
    'mixed-volume': 'box-volume',
    coplanar: 'box-volume'
}

export const spaceVectorsLabChallengeIds: number[] = [pointBoxChallenges, inPlaneChallenges, spaceShadowChallenges, rightHandChallenges, boxVolumeChallenges]
    .flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
