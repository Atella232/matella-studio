import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { exponentialAkLabTools, waveChallenges } from '../../dbh4-akademikoak-esponentzialak/lab/labTools.ts'
import { circleChallenges, radianChallenges, trigonometryLabTools } from '../../dbh4-akademikoak-trigonometria/lab/labTools.ts'
import type { TrigonometryStageId } from '../lessons.tsx'
import { say } from '../text.ts'
import { sixChallenges } from './six.ts'
import { spinChallenges } from './spin.ts'
import { sumChallenges } from './sum.ts'

/* ==========================================================================
   Formula eta funtzio trigonometrikoak (Batxilergoa 1 · Zientziak)
   laboratory. Three tools of its own, for what 1.º Bachillerato adds: the
   six ratios on the circle, two angles that add up and the solutions that
   go round. The review comes from 4. DBH académicas with its challenges
   and ids (progress is kept apart, under this unit's storage prefix): the
   radian and the arc, the unit circle and the wave lab. Tests in
   tests/trigonometria-batx1z-lab.test.ts.
   ========================================================================== */

export type TrigonometryBatx1zLabToolId = 'radian' | 'six' | 'sum' | 'circle' | 'spin' | 'wave'

export interface TrigonometryBatx1zLabTool extends LabToolInfo {
    id: TrigonometryBatx1zLabToolId
    stage: TrigonometryStageId
}

const fromTrigonometry = (id: string) => trigonometryLabTools.find((tool) => tool.id === id)!
const fromWaves = (id: string) => exponentialAkLabTools.find((tool) => tool.id === id)!

export const trigonometryBatx1zLabTools: TrigonometryBatx1zLabTool[] = [
    { ...fromTrigonometry('radian'), id: 'radian', stage: 'ratios', lessonTopic: 'radians-review' },
    { id: 'six', stage: 'ratios', lessonTopic: 'reciprocal', title: say('Sei arrazoiak zirkunferentzian', 'Las seis razones en la circunferencia', 'النسب الست على الدائرة', 'The six ratios on the circle'), observe: say('Erradioa luzatuta, x = 1 zuzena tangentearen altueran ebakitzen du, zentrotik sekantearen distantziara; y = 1 zuzena kotangentean ebakitzen du, kosekantearen distantziara. Sekanteak kosinuaren zeinua du, eta kosekanteak sinuarena. Kosinua 0 denean, tangentea eta sekantea ez dira existitzen.', 'El radio, alargado, corta la recta x = 1 a la altura de la tangente, a la distancia de la secante desde el centro; y corta la recta y = 1 en la cotangente, a la distancia de la cosecante. La secante lleva el signo del coseno y la cosecante, el del seno. Cuando el coseno vale 0, la tangente y la secante no existen.', 'نصف القطر الممدود يقطع المستقيم x = 1 على ارتفاع الظل وعلى بعد القاطع من المركز، ويقطع المستقيم y = 1 عند ظل التمام وعلى بعد قاطع التمام. للقاطع إشارة جيب التمام، ولقاطع التمام إشارة الجيب. وعندما يساوي جيب التمام 0 لا يوجد الظل ولا القاطع.', 'The radius, made longer, cuts the line x = 1 at the height of the tangent, at the distance of the secant from the centre; and it cuts the line y = 1 at the cotangent, at the distance of the cosecant. The secant has the sign of the cosine and the cosecant that of the sine. When the cosine is 0, the tangent and the secant do not exist.') },
    { id: 'sum', stage: 'sums', lessonTopic: 'sum-formulas', title: say('Batzen diren bi angelu', 'Dos ángulos que se suman', 'زاويتان تُجمعان', 'Two angles that add up'), observe: say('β angelua α angeluaren ondoan jartzean, puntua α + β angelura doa. Haren sinua ez da sin α + sin β: barra biak ia inoiz ez dira berdinak. Angeluetako bat 0° denean edo biek bira bat osatzen dutenean bakarrik datoz bat.', 'Al poner β a continuación de α, el punto va al ángulo α + β. Su seno no es sen α + sen β: las dos barras casi nunca son iguales. Solo coinciden si uno de los ángulos es 0° o si los dos suman una vuelta.', 'عند وضع β بعد α تنتقل النقطة إلى الزاوية α + β. وجيبها ليس sin α + sin β: نادرًا ما يتساوى العمودان. ولا يتطابقان إلا إذا كانت إحدى الزاويتين 0° أو كان مجموعهما دورة.', 'Putting β after α takes the point to the angle α + β. Its sine is not sin α + sin β: the two bars are almost never equal. They only agree if one angle is 0° or if both add up to a full turn.') },
    { ...fromTrigonometry('circle'), id: 'circle', stage: 'double', lessonTopic: 'half-angle' },
    { id: 'spin', stage: 'equations', lessonTopic: 'basic-equations', title: say('Soluzioek birak ematen dituzte', 'Las soluciones dan vueltas', 'الحلول تدور', 'The solutions go round'), observe: say('x 0°-tik 360°-ra doan bitartean, u = nx angeluak n bira ematen ditu. Bira bakoitzean zuzenak zirkunferentzia bi puntutan ebakitzen du (edo puntu bakarrean ukitzen du): soluzioak 2n dira, n edo 0. Balioa 1 baino handiagoa bada, ez dago soluziorik.', 'Mientras x va de 0° a 360°, el ángulo u = nx da n vueltas. En cada vuelta la recta corta la circunferencia en dos puntos (o la toca en uno): hay 2n soluciones, n o ninguna. Si el valor pasa de 1, no hay solución.', 'بينما يتغير x من 0° إلى 360° تدور الزاوية u = nx عدد n من الدورات. وفي كل دورة يقطع المستقيم الدائرة في نقطتين (أو يمسها في نقطة): فيكون عدد الحلول 2n أو n أو لا شيء. وإذا تجاوزت القيمة 1 فلا حل.', 'While x goes from 0° to 360°, the angle u = nx makes n turns. In each turn the line cuts the circle at two points (or touches it at one): there are 2n solutions, n or none. If the value is more than 1, there is no solution.') },
    { ...fromWaves('wave'), id: 'wave', stage: 'functions', lessonTopic: 'transformations' }
]

export const trigonometryBatx1zLabToolForTopic: Record<string, TrigonometryBatx1zLabToolId | undefined> = {
    'radians-review': 'radian',
    reciprocal: 'six',
    identities: 'six',
    'sum-formulas': 'sum',
    'difference-tangent': 'sum',
    'known-ratios': 'sum',
    'double-angle': 'sum',
    'half-angle': 'circle',
    'sum-to-product': 'sum',
    'basic-equations': 'spin',
    'quadratic-equations': 'spin',
    'formula-equations': 'spin',
    'trig-graphs': 'wave',
    transformations: 'wave',
    'periodic-models': 'wave'
}

export const trigonometryBatx1zLabChallengeIds: number[] = [
    radianChallenges,
    sixChallenges,
    sumChallenges,
    circleChallenges,
    spinChallenges,
    waveChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
