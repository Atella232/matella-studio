import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LinesPlanesStageId } from '../lessons.tsx'
import { say } from './common.ts'
import { cutOrCrossChallenges } from './cutOrCross.ts'
import { parameterChallenges } from './parameterT.ts'
import { planeNormalChallenges } from './planeNormal.ts'
import { threePlanesChallenges } from './threePlanes.ts'
import { throughPlaneChallenges } from './throughPlane.ts'

/* ==========================================================================
   Zuzenak eta planoak espazioan (Batxilergoa 2 · Zientziak) laboratory:
   five tools of its own, all on the 3D board of the Espacio block, one
   per stage. Each one asks for a prediction before it shows the result
   and has endless challenges after the fixed ones. Tests in
   tests/planoak-batx2z-lab.test.ts.
   ========================================================================== */

export type LinesPlanesLabToolId = 'parameter-t' | 'plane-normal' | 'cut-or-cross' | 'through-plane' | 'three-planes'

export interface LinesPlanesLabTool extends LabToolInfo {
    id: LinesPlanesLabToolId
    stage: LinesPlanesStageId
}

export const linesPlanesLabTools: LinesPlanesLabTool[] = [
    {
        id: 'parameter-t',
        stage: 'lines',
        lessonTopic: 'line-parametric',
        title: say('t parametroa', 'El parámetro t', 'الوسيط t', 'The parameter t'),
        observe: say('t zenbaki bakoitzak zuzeneko puntu bat ematen du: A gehi t aldiz u. t = 0 denean, A; t negatiboa denean, u bektorearen kontrako aldera. Ekuazio jarraituko hiru zatikiek t balio dute.', 'Cada número t da un punto de la recta: A más t veces u. Con t = 0 sale A; con t negativo, hacia el lado contrario de u. Las tres fracciones de la continua valen t.', 'كل عدد t يعطي نقطة من المستقيم: A زائد t مرة u. عندما t = 0 نحصل على A، وعندما يكون t سالبًا نتجه عكس u. والكسور الثلاثة في المعادلة المتصلة تساوي t.', 'Each number t gives a point of the line: A plus t times u. With t = 0 you get A; with a negative t, the opposite way to u. The three fractions of the continuous equation are worth t.')
    },
    {
        id: 'plane-normal',
        stage: 'planes',
        lessonTopic: 'plane-general',
        title: say('Planoa eta haren normala', 'El plano y su normal', 'المستوى وناظمه', 'The plane and its normal'),
        observe: say('Normalaren koordenatuak x, y eta z aldagaien koefizienteak dira, eta D zenbakiak planoa A puntutik pasarazten du. Puntu bat ekuazioan ordezkatzean, 0 planoan dago; positiboa, normalaren aldean; negatiboa, beste aldean.', 'Las coordenadas del normal son los coeficientes de x, y y z, y la D hace que el plano pase por A. Al sustituir un punto en la ecuación, 0 es que está en el plano; positivo, del lado del normal; negativo, al otro lado.', 'مركّبات الناظم هي معاملات x وy وz، وD يجعل المستوى يمر بـ A. عند تعويض نقطة في المعادلة: 0 يعني أنها في المستوى، والموجب في جهة الناظم، والسالب في الجهة الأخرى.', 'The coordinates of the normal are the coefficients of x, y and z, and D makes the plane go through A. When you put a point into the equation, 0 means it is on the plane; positive, on the side of the normal; negative, on the other side.')
    },
    {
        id: 'cut-or-cross',
        stage: 'two-lines',
        lessonTopic: 'lines-cross',
        title: say('Ebakitzen dira ala gurutzatzen?', '¿Se cortan o se cruzan?', 'متقاطعان أم متخالفان؟', 'Do they meet or are they skew?'),
        observe: say('Norabideak paraleloak badira, zuzenak paraleloak dira edo bat datoz. Bestela, biderkadura mistoa 0 bada, plano berean daude eta ebakitzen dira; 0 ez bada, gurutzatu egiten dira. Biratu taula: gurutzatzen direnak ez dira inoiz ukitzen.', 'Si los directores son paralelos, las rectas son paralelas o coinciden. Si no, con producto mixto 0 están en un plano y se cortan; si no es 0, se cruzan. Gira el tablero: las que se cruzan nunca se tocan.', 'إذا توازى الاتجاهان فالمستقيمان متوازيان أو منطبقان. وإلا فإن كان الجداء المختلط 0 فهما في مستوى واحد ومتقاطعان، وإن لم يكن 0 فهما متخالفان. أدر اللوحة: المتخالفان لا يتلامسان أبدًا.', 'If the directions are parallel, the lines are parallel or the same. If not, with a scalar triple product of 0 they lie in one plane and meet; if it is not 0, they are skew. Turn the board: skew lines never touch.')
    },
    {
        id: 'through-plane',
        stage: 'line-plane',
        lessonTopic: 'line-plane-point',
        title: say('Planoa zeharkatzen duen zuzena', 'La recta que atraviesa', 'المستقيم الذي يخترق', 'The line that goes through'),
        observe: say('u · n zenbakiak dena erabakitzen du: 0 ez bada, zuzenak planoa puntu batean zeharkatzen du; 0 bada, zuzena planoaren paraleloa da, edo A planoan badago, planoaren barruan dago. Ebaki-puntuaren t: (d − n · A) zati u · n.', 'Todo lo decide u · n: si no es 0, la recta atraviesa el plano en un punto; si es 0, la recta es paralela al plano, o está dentro si A está en el plano. El t del punto de corte: (d − n · A) entre u · n.', 'العدد u · n يقرر كل شيء: إن لم يكن 0 اخترق المستقيم المستوى في نقطة، وإن كان 0 فالمستقيم موازٍ للمستوى أو داخله إذا كانت A في المستوى. وt لنقطة التقاطع: (d − n · A) مقسومًا على u · n.', 'u · n decides it all: if it is not 0, the line goes through the plane at a point; if it is 0, the line is parallel to the plane, or inside it when A is on the plane. The t of the meeting point: (d − n · A) divided by u · n.')
    },
    {
        id: 'three-planes',
        stage: 'planes-position',
        lessonTopic: 'three-planes',
        title: say('Hiru plano', 'Tres planos', 'ثلاثة مستويات', 'Three planes'),
        observe: say('Bi heinak konparatzen dira. rg M = 3: puntu bakarra. rg M = rg M* < 3: infinitu puntu, zuzen bat edo plano oso bat. rg M < rg M*: ez dago puntu komunik, nahiz eta planoek binaka ebaki.', 'Se comparan los dos rangos. rg M = 3: un solo punto. rg M = rg M* < 3: infinitos puntos, una recta o un plano entero. rg M < rg M*: no hay punto común, aunque los planos se corten dos a dos.', 'نقارن الرتبتين. rg M = 3: نقطة واحدة. rg M = rg M* < 3: عدد لا نهائي من النقاط، مستقيم أو مستوى كامل. rg M < rg M*: لا نقطة مشتركة، ولو تقاطعت المستويات مثنى مثنى.', 'Compare the two ranks. rg M = 3: a single point. rg M = rg M* < 3: infinitely many points, a line or a whole plane. rg M < rg M*: no common point, even if the planes meet in pairs.')
    }
]

export const linesPlanesLabToolForTopic: Record<string, LinesPlanesLabToolId | undefined> = {
    'line-parametric': 'parameter-t',
    'line-continuous': 'parameter-t',
    'implicit-to-parametric': 'parameter-t',
    'plane-parametric': 'plane-normal',
    'plane-general': 'plane-normal',
    'plane-three-points': 'plane-normal',
    'lines-parallel': 'cut-or-cross',
    'lines-cross': 'cut-or-cross',
    'lines-intersection': 'cut-or-cross',
    'line-plane-position': 'through-plane',
    'line-plane-point': 'through-plane',
    'pencil-planes': 'three-planes',
    'two-planes': 'three-planes',
    'three-planes': 'three-planes',
    'planes-parameter': 'three-planes'
}

export const linesPlanesLabChallengeIds: number[] = [parameterChallenges, planeNormalChallenges, cutOrCrossChallenges, throughPlaneChallenges, threePlanesChallenges]
    .flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
