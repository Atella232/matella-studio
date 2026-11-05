import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { quadraticChallenges } from '../../dbh2-ekuazioak-v2/lab/labTools.ts'
import { equationsInequalitiesLabTools, exponentialChallenges, signChallenges, systemChallenges } from '../../dbh4-akademikoak-ekuazioak/lab/labTools.ts'
import { polynomialsFractionsLabTools } from '../../dbh4-akademikoak-polinomioak/lab/labTools.ts'
import { radicalChallenges } from '../../dbh4-aplikatuak-ekuazioak/lab/labTools.ts'
import { rootsChallenges, ruffiniChallenges } from '../../dbh4-aplikatuak-polinomioak/lab/labTools.ts'
import type { BachEquationsStageId } from '../lessons.tsx'
import { absoluteChallenges } from './absoluteFold.ts'
import { changeChallenges } from './changeMachine.ts'
import { signTableChallenges } from './signTable.ts'

/* ==========================================================================
   Ekuazioak eta inekuazioak (Batxilergoa 1 · Zientziak) laboratory. Three
   tools of its own, for what 1.º Bachillerato adds: the sign table of a
   product or a quotient, the folded absolute value against a line, and
   the change of variable machine (t = x², x³ or 2ˣ). The review comes from
   4. DBH with its challenges and ids (progress is kept apart, under this
   unit's storage prefix): Ruffini's table, the root hunt, the quadratic
   formula, false solutions of radical equations, exponents that meet, the
   sign of a parabola and two inequalities at once. Tests in
   tests/ekuazioak-batx1z-lab.test.ts.
   ========================================================================== */

export type BachEquationsLabToolId = 'ruffini' | 'root-hunt' | 'quadratic' | 'change-machine' | 'radical' | 'absolute-fold' | 'exponential' | 'sign-table' | 'parabola-sign' | 'two-inequalities'

export interface BachEquationsLabTool extends LabToolInfo {
    id: BachEquationsLabToolId
    stage: BachEquationsStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const bachEquationsLabTools: BachEquationsLabTool[] = [
    { ...from(polynomialsFractionsLabTools, 'ruffini'), id: 'ruffini', stage: 'polynomials', lessonTopic: 'ruffini-roots' },
    { ...from(polynomialsFractionsLabTools, 'roots'), id: 'root-hunt', stage: 'polynomials', lessonTopic: 'factorize-high' },
    { ...from(equationsInequalitiesLabTools, 'quadratic'), id: 'quadratic', stage: 'polynomial-equations', lessonTopic: 'high-degree' },
    { id: 'change-machine', stage: 'polynomial-equations', lessonTopic: 'change-variable', title: say('Aldagai-aldaketaren makina', 'La máquina del cambio de variable', 'آلة تغيير المتغير', 'The change of variable machine'), observe: say('t = x² eginda, t positibo bakoitzak bi x ematen ditu eta negatiboak bat ere ez. t = x³ eginda, t bakoitzak x bat. t = 2ˣ eginda, t positiboek bakarrik balio dute.', 'Con t = x², cada t positivo da dos x y cada negativo ninguna. Con t = x³, cada t da una x. Con t = 2ˣ, solo valen los t positivos.', 'مع t = x² يعطي كل t موجب قيمتين لـ x ولا يعطي السالب شيئًا. ومع t = x³ يعطي كل t قيمة واحدة. ومع t = 2ˣ لا تصلح إلا قيم t الموجبة.', 'With t = x², each positive t gives two x and each negative one none. With t = x³, each t gives one x. With t = 2ˣ, only positive t work.') },
    { ...from(equationsInequalitiesLabTools, 'radical'), id: 'radical', stage: 'radical-absolute', lessonTopic: 'radical-equations' },
    { id: 'absolute-fold', stage: 'radical-absolute', lessonTopic: 'absolute-equations', title: say('Balio absolutu tolestua', 'El valor absoluto doblado', 'القيمة المطلقة المطوية', 'The folded absolute value'), observe: say('|mx + q| zuzena da, ardatzaren azpiko zatia gora tolestuta. y = c zuzenak bi aldiz, behin edo inoiz ez du mozten; azpiko zatia |mx + q| < c da, eta gainekoa |mx + q| > c.', '|mx + q| es la recta con la parte de abajo doblada hacia arriba. La recta y = c la corta dos veces, una o ninguna; lo de debajo es |mx + q| < c, y lo de encima, |mx + q| > c.', '|mx + q| هو المستقيم بعد طي جزئه السفلي إلى الأعلى. يقطعه المستقيم y = c مرتين أو مرة أو لا يقطعه؛ وما تحته هو |mx + q| < c وما فوقه |mx + q| > c.', '|mx + q| is the line with the part below the axis folded up. The line y = c cuts it twice, once or never; what lies below is |mx + q| < c, and what lies above, |mx + q| > c.') },
    { ...from(equationsInequalitiesLabTools, 'exponential'), id: 'exponential', stage: 'exp-log', lessonTopic: 'exponential-equations' },
    { id: 'sign-table', stage: 'inequalities', lessonTopic: 'polynomial-inequalities', title: say('Zeinuen taula', 'La tabla de signos', 'جدول الإشارات', 'The sign table'), observe: say('Faktore bakoitza negatiboa da bere erroaren ezkerrean eta positiboa eskuinean. Biderkaduraren zeinua erro bakoitzean alda daiteke; erro bikoitz batean ez da aldatzen, eta izendatzailearen erroan zuloa dago.', 'Cada factor es negativo a la izquierda de su raíz y positivo a la derecha. El signo del producto puede cambiar en cada raíz; en una raíz doble no cambia, y en la raíz del denominador hay un agujero.', 'كل عامل سالب يسار جذره وموجب يمينه. وقد تتغير إشارة الجداء عند كل جذر؛ ولا تتغير عند الجذر المضاعف، وعند جذر المقام ثقب.', 'Each factor is negative to the left of its root and positive to the right. The sign of the product can change at each root; at a double root it does not, and at the root of the denominator there is a hole.') },
    { ...from(equationsInequalitiesLabTools, 'sign'), id: 'parabola-sign', stage: 'inequalities', lessonTopic: 'polynomial-inequalities' },
    { ...from(equationsInequalitiesLabTools, 'system'), id: 'two-inequalities', stage: 'inequalities', lessonTopic: 'inequality-systems' }
]

export const bachEquationsLabToolForTopic: Record<string, BachEquationsLabToolId | undefined> = {
    'ruffini-roots': 'ruffini',
    'factorize-high': 'root-hunt',
    'high-degree': 'root-hunt',
    'change-variable': 'change-machine',
    'radical-equations': 'radical',
    'absolute-equations': 'absolute-fold',
    'exponential-equations': 'exponential',
    'exponential-change': 'change-machine',
    'polynomial-inequalities': 'sign-table',
    'rational-inequalities': 'sign-table',
    'absolute-inequalities': 'absolute-fold',
    'inequality-systems': 'two-inequalities'
}

export const bachEquationsLabChallengeIds: number[] = [
    ruffiniChallenges,
    rootsChallenges,
    quadraticChallenges,
    changeChallenges,
    radicalChallenges,
    absoluteChallenges,
    exponentialChallenges,
    signTableChallenges,
    signChallenges,
    systemChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
