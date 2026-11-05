import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { areaChallenges, calculatorChallenges, circleChallenges, doubleChallenges, trigonometryLabTools, twoSidesChallenges } from '../../dbh4-akademikoak-trigonometria/lab/labTools.ts'
import { say } from '../../dbh4-akademikoak-trigonometria/text.ts'
import type { TrianglesStageId } from '../lessons.tsx'
import { circumcircleChallenges } from './circumcircle.ts'
import { compassChallenges } from './compass.ts'
import { hingeChallenges } from './hinge.ts'

/* ==========================================================================
   Triangeluen ebazpena (Batxilergoa 1 · Zientziak) laboratory. Three tools
   of its own, for what 1.º Bachillerato adds: the compass of the ambiguous
   case, the circle of 2R and the hinge of the cosine rule. The review
   comes from 4. DBH académicas with its challenges and ids (progress is
   kept apart, under this unit's storage prefix): the unit circle, the
   calculator, knowing two sides, the double observation and the area
   ½ · b · c · sen A. Tests in tests/triangeluak-batx1z-lab.test.ts.
   ========================================================================== */

export type TrianglesLabToolId = 'circle' | 'calculator' | 'two-sides' | 'double' | 'compass' | 'circumcircle' | 'hinge' | 'area'

export interface TrianglesLabTool extends LabToolInfo {
    id: TrianglesLabToolId
    stage: TrianglesStageId
}

const from = (id: string) => trigonometryLabTools.find((tool) => tool.id === id)!

export const trianglesLabTools: TrianglesLabTool[] = [
    { ...from('circle'), id: 'circle', stage: 'angles', lessonTopic: 'quadrant-ratios' },
    { ...from('calculator'), id: 'calculator', stage: 'angles', lessonTopic: 'inverse-angles' },
    { ...from('two-sides'), id: 'two-sides', stage: 'right', lessonTopic: 'right-review' },
    { ...from('double'), id: 'double', stage: 'right', lessonTopic: 'height-strategy' },
    { id: 'compass', stage: 'sines', lessonTopic: 'ambiguous-case', title: say('Kasu zalantzazkoaren konpasa', 'El compás del caso dudoso', 'فرجار الحالة الملتبسة', 'The compass of the ambiguous case'), observe: say('C-tik a irekiera duen konpasak zuzena ebakitzen du: a altuera baino laburragoa bada, ez da iristen; altuera eta b artean badago, bi aldiz ebakitzen du; b baino luzeagoa bada, behin bakarrik. Bi triangeluetako B angeluek 180° egiten dute.', 'El compás de abertura a desde C corta la recta: si a es más corto que la altura, no llega; si está entre la altura y b, corta dos veces; si es más largo que b, solo una. Los ángulos B de los dos triángulos suman 180°.', 'الفرجار الذي فتحته a من C يقطع المستقيم: إذا كان a أقصر من الارتفاع لا يصل، وإذا كان بين الارتفاع وb قطع مرتين، وإذا كان أطول من b قطع مرة واحدة. ومجموع الزاويتين B في المثلثين 180°.', 'The compass with opening a from C cuts the line: if a is shorter than the height, it does not reach; if it is between the height and b, it cuts twice; if it is longer than b, only once. The angles B of the two triangles add up to 180°.') },
    { id: 'circumcircle', stage: 'sines', lessonTopic: 'circumradius', title: say('2R zirkunferentzia', 'La circunferencia de 2R', 'دائرة 2R', 'The circle of 2R'), observe: say('a aldeak eta A angeluak zirkunferentzia finkatzen dute: 2R = a / sin A. A arkuan mugitzean b, c, B eta C aldatzen dira, baina hiru zatidurak 2R dira beti. sin A ½ denean, R eta a berdinak dira.', 'El lado a y el ángulo A fijan la circunferencia: 2R = a / sen A. Al mover A por su arco cambian b, c, B y C, pero los tres cocientes siguen valiendo 2R. Cuando sen A vale ½, R y a son iguales.', 'الضلع a والزاوية A يحددان الدائرة: 2R = a / sin A. وعند تحريك A على قوسها تتغير b وc وB وC، لكن النسب الثلاث تبقى 2R. وعندما يكون sin A = ½ يتساوى R وa.', 'The side a and the angle A fix the circle: 2R = a / sin A. Moving A along its arc changes b, c, B and C, but the three quotients are still 2R. When sin A is ½, R and a are equal.') },
    { id: 'hinge', stage: 'cosines', lessonTopic: 'cosine-rule', title: say('Kosinuaren bisagra', 'La bisagra del coseno', 'مفصل جيب التمام', 'The hinge of the cosine rule'), observe: say('Bisagra irekitzean a luzatzen da. A zorrotza denean a² txikiagoa da b² + c² baino, 90°-an berdina (Pitagoras) eta kamutsa denean handiagoa: −2bc · cos A zuzenketak kendu edo batu egiten du.', 'Al abrir la bisagra, a se alarga. Con A agudo, a² es menor que b² + c²; a 90°, igual (Pitágoras); con A obtuso, mayor: la corrección −2bc · cos A resta o suma.', 'عند فتح المفصل يطول a. مع A حادة يكون a² أصغر من b² + c²، وعند 90° يساويه (فيثاغورس)، ومع A منفرجة أكبر: التصحيح −2bc · cos A يطرح أو يضيف.', 'As the hinge opens, a gets longer. With an acute A, a² is less than b² + c²; at 90°, equal (Pythagoras); with an obtuse A, greater: the correction −2bc · cos A takes away or adds.') },
    { ...from('area'), id: 'area', stage: 'applications', lessonTopic: 'heron' }
]

export const trianglesLabToolForTopic: Record<string, TrianglesLabToolId | undefined> = {
    'quadrant-ratios': 'circle',
    'big-angles': 'circle',
    'related-angles': 'circle',
    'inverse-angles': 'calculator',
    'right-review': 'two-sides',
    'height-strategy': 'double',
    'sine-rule': 'circumcircle',
    'ambiguous-case': 'compass',
    circumradius: 'circumcircle',
    'cosine-rule': 'hinge',
    'three-sides': 'hinge',
    'which-rule': 'compass',
    heron: 'area',
    inaccessible: 'double',
    'parallelogram-forces': 'hinge'
}

export const trianglesLabChallengeIds: number[] = [
    circleChallenges,
    calculatorChallenges,
    twoSidesChallenges,
    doubleChallenges,
    compassChallenges,
    circumcircleChallenges,
    hingeChallenges,
    areaChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
