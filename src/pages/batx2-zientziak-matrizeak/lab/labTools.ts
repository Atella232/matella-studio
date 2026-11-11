import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { gaussChallenges } from '../../batx1-zientziak-sistemak/lab/gaussMachine.ts'
import { bachSystemsLabTools } from '../../batx1-zientziak-sistemak/lab/labTools.ts'
import type { MatrizeakStageId } from '../lessons.tsx'
import { jordanChallenges } from './jordanMachine.ts'
import { rankChallenges } from './rankSlider.ts'
import { routeChallenges } from './routeMap.ts'
import { rowColumnChallenges } from './rowColumn.ts'

/* ==========================================================================
   Matrizeak (Batxilergoa 2 · Zientziak) laboratory. Four tools of its own:
   row by column (the cell of AB and the numbers of B that make it), the
   route map (a graph, its matrix A and A², the trips with one change), the
   Gauss–Jordan machine ((A | I) → (I | A⁻¹), or a row of zeros) and the
   rank slider (a parameter m and the values that bring the rank down).
   The Gauss machine of 1.º Bachillerato comes back as it is, with its
   challenges and ids (progress is kept under this unit's prefix), to
   review reducing before the rank. Tests in tests/matrizeak-batx2z-lab.test.ts.
   ========================================================================== */

export type MatrizeakLabToolId = 'row-column' | 'route-map' | 'gauss-machine' | 'rank-slider' | 'gauss-jordan'

export interface MatrizeakLabTool extends LabToolInfo {
    id: MatrizeakLabToolId
    stage: MatrizeakStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const gaussMachine = bachSystemsLabTools.find((tool) => tool.id === 'gauss-machine')!

export const matrizeakLabTools: MatrizeakLabTool[] = [
    {
        id: 'row-column',
        stage: 'operations',
        lessonTopic: 'matrix-product',
        title: say('Errenkada bider zutabe', 'Fila por columna', 'صفّ في عمود', 'Row by column'),
        observe: say('AB matrizearen lauki bakoitza A matrizearen errenkada bat bider B matrizearen zutabe bat da: banan-banan biderkatu eta batu. B matrizearen zutabe bateko zenbaki bat aldatzean, AB matrizearen zutabe horretako bi laukiak aldatzen dira.', 'Cada casilla de AB es una fila de A por una columna de B: se multiplica uno a uno y se suma. Al cambiar un número de una columna de B, cambian las dos casillas de esa columna de AB.', 'كل خانة من AB هي صفّ من A في عمود من B: نضرب واحدًا في واحد ثم نجمع. وعند تغيير عدد في عمود من B تتغير خانتا ذلك العمود في AB.', 'Each cell of AB is a row of A times a column of B: multiply one by one and add. Changing a number in a column of B changes both cells of that column of AB.')
    },
    {
        id: 'route-map',
        stage: 'operations',
        lessonTopic: 'matrix-applications',
        title: say('Bideen mapa', 'El mapa de rutas', 'خريطة الطرق', 'The route map'),
        observe: say('A matrizean, 1 bat dago i herritik j herrira linea bat dagoenean. A² matrizeko lauki bakoitzak aldaketa bateko bidaiak zenbatzen ditu: i → k → j, k herri bakoitzeko.', 'En A hay un 1 cuando hay línea del pueblo i al j. Cada casilla de A² cuenta los viajes con un transbordo: i → k → j, por cada pueblo k.', 'في A يوجد 1 عندما يوجد خط من البلدة i إلى j. وكل خانة في A² تعدّ الرحلات بتبديل واحد: i → k → j لكل بلدة k.', 'In A there is a 1 when there is a line from town i to town j. Each cell of A² counts the trips with one change: i → k → j, for every town k.')
    },
    { ...gaussMachine, id: 'gauss-machine', stage: 'rank', lessonTopic: 'rank-gauss' },
    {
        id: 'rank-slider',
        stage: 'rank',
        lessonTopic: 'rank-parameter',
        title: say('Heinaren graduatzailea', 'El deslizador del rango', 'منزلقة الرتبة', 'The rank slider'),
        observe: say('m mugitzean, matrizea aldatu egiten da. Ia balio guztietan heina berdina da; balio kritiko batzuetan errenkada bat zero bihurtzen da, eta heina jaitsi egiten da.', 'Al mover m cambia la matriz. Con casi todos los valores el rango es el mismo; en unos pocos valores críticos una fila se anula y el rango baja.', 'عند تحريك m تتغير المصفوفة. مع كل القيم تقريبًا تبقى الرتبة نفسها؛ وفي قيم حرجة قليلة ينعدم صف وتنقص الرتبة.', 'As m moves, the matrix changes. For almost every value the rank is the same; at a few critical values a row vanishes and the rank goes down.')
    },
    {
        id: 'gauss-jordan',
        stage: 'inverse',
        lessonTopic: 'gauss-jordan',
        title: say('Gauss-Jordanen makina', 'La máquina de Gauss-Jordan', 'آلة غاوس-جوردان', 'The Gauss–Jordan machine'),
        observe: say('Eragiketa bakoitzak errenkada osoa aldatzen du, I zatia ere bai. Ezkerrean I geratzen denean, eskuinean A⁻¹ dago. Ezkerrean zeroko errenkada bat agertzen bada, A matrizeak ez du alderantzizkorik.', 'Cada operación cambia la fila entera, también la parte de I. Cuando a la izquierda queda I, a la derecha está A⁻¹. Si a la izquierda aparece una fila de ceros, A no tiene inversa.', 'كل عملية تغيّر الصف كله، وجزء I أيضًا. وعندما يبقى I في اليسار يكون A⁻¹ في اليمين. وإذا ظهر في اليسار صف أصفار فليس لـ A معكوس.', 'Each operation changes the whole row, the I part too. When I is left on the left, A⁻¹ is on the right. If a row of zeros appears on the left, A has no inverse.')
    }
]

export const matrizeakLabToolForTopic: Record<string, MatrizeakLabToolId | undefined> = {
    'what-is-a-matrix': 'row-column',
    'sum-scalar': 'row-column',
    'matrix-product': 'row-column',
    'product-properties': 'row-column',
    'matrix-applications': 'route-map',
    'linear-dependence': 'rank-slider',
    'rank-gauss': 'gauss-machine',
    'rank-parameter': 'rank-slider',
    'inverse-definition': 'gauss-jordan',
    'gauss-jordan': 'gauss-jordan',
    'matrix-powers': 'route-map',
    'matrix-equations': 'gauss-jordan'
}

export const matrizeakLabChallengeIds: number[] = [
    rowColumnChallenges,
    routeChallenges,
    gaussChallenges,
    rankChallenges,
    jordanChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
