import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { bachEquationsLabTools } from '../../batx1-zientziak-ekuazioak/lab/labTools.ts'
import { changeChallenges } from '../../batx1-zientziak-ekuazioak/lab/changeMachine.ts'
import { signTableChallenges } from '../../batx1-zientziak-ekuazioak/lab/signTable.ts'
import { bachSystemsLabTools } from '../../batx1-zientziak-sistemak/lab/labTools.ts'
import { gaussChallenges } from '../../batx1-zientziak-sistemak/lab/gaussMachine.ts'
import { exponentialChallenges } from '../../dbh4-akademikoak-ekuazioak/lab/labTools.ts'
import { circleChallenges, halfPlaneChallenges, mixtureChallenges, regionChallenges } from '../../dbh4-akademikoak-sistemak/lab/labTools.ts'
import { radicalChallenges } from '../../dbh4-aplikatuak-ekuazioak/lab/labTools.ts'
import { rootsChallenges, ruffiniChallenges } from '../../dbh4-aplikatuak-polinomioak/lab/labTools.ts'
import type { GizAlgebraStageId } from '../lessons.tsx'
import { breakEvenChallenges } from './breakEven.ts'
import { budgetChallenges } from './budget.ts'
import { marketChallenges } from './market.ts'

/* ==========================================================================
   Aljebra (Batxilergoa 1 · Gizarte Zientziak) laboratory. Three tools of
   its own, for the algebra of economics: the break-even point, supply and
   demand, and the budget region. The others come from 1.º Ciencias as they
   are there, with their challenges and ids (progress is kept apart, under
   this unit's storage prefix): Ruffini's table, the root hunt, the change
   of variable machine, false solutions of radical equations, exponents
   that meet, the sign table, the Gauss machine, the mixture, the line and
   the circle, the half-plane and the integer points of a region. Tests in
   tests/aljebra-batx1g-lab.test.ts.
   ========================================================================== */

export type GizAlgebraLabToolId = 'ruffini' | 'root-hunt' | 'change-machine' | 'radical' | 'exponential' | 'circle' | 'gauss-machine' | 'mixture' | 'sign-table' | 'half-plane' | 'region' | 'break-even' | 'market' | 'budget'

export interface GizAlgebraLabTool extends LabToolInfo {
    id: GizAlgebraLabToolId
    stage: GizAlgebraStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const sources: LabToolInfo[] = [...bachEquationsLabTools, ...bachSystemsLabTools]
/** A tool of 1.º Ciencias in a stage of this unit, opened from one of its lessons */
const borrowed = (id: GizAlgebraLabToolId, stage: GizAlgebraStageId, lessonTopic: string): GizAlgebraLabTool => ({ ...sources.find((tool) => tool.id === id)!, id, stage, lessonTopic })

export const gizAlgebraLabTools: GizAlgebraLabTool[] = [
    borrowed('ruffini', 'polynomials', 'ruffini-roots'),
    borrowed('root-hunt', 'polynomials', 'factorize-high'),
    borrowed('change-machine', 'equations', 'change-variable'),
    borrowed('radical', 'equations', 'radical-equations'),
    borrowed('exponential', 'equations', 'exponential-equations'),
    borrowed('circle', 'systems', 'nonlinear-substitution'),
    borrowed('gauss-machine', 'systems', 'gauss-method'),
    borrowed('mixture', 'systems', 'money-systems'),
    borrowed('sign-table', 'inequalities', 'polynomial-inequalities'),
    borrowed('half-plane', 'inequalities', 'half-plane-regions'),
    borrowed('region', 'inequalities', 'half-plane-regions'),
    { id: 'break-even', stage: 'economy', lessonTopic: 'break-even', title: say('Atalasea', 'El punto muerto', 'نقطة التعادل', 'The break-even point'), observe: say('Kostuen zuzena kostu finkoetan hasten da; diru-sarrerena, zeroan. Ebakitzen diren tokian ez da irabazten ez galtzen. Prezioa igotzean, diru-sarreren zuzena zutiago dago eta atalasea ezkerrera mugitzen da.', 'La recta de costes empieza en los costes fijos; la de ingresos, en cero. Donde se cortan, ni se gana ni se pierde. Si sube el precio, la recta de ingresos se empina y el punto muerto se mueve a la izquierda.', 'يبدأ مستقيم التكاليف عند التكاليف الثابتة، ومستقيم الإيرادات عند الصفر. وحيث يتقاطعان لا ربح ولا خسارة. وإذا ارتفع السعر صار مستقيم الإيرادات أشد ميلًا وتحركت نقطة التعادل إلى اليسار.', 'The cost line starts at the fixed costs; the income line, at zero. Where they cross, you neither earn nor lose. If the price goes up, the income line gets steeper and the break-even point moves left.') },
    { id: 'market', stage: 'economy', lessonTopic: 'supply-demand', title: say('Eskaintza eta eskaria', 'Oferta y demanda', 'العرض والطلب', 'Supply and demand'), observe: say('Prezioa igotzean, eskaria jaitsi eta eskaintza igo egiten da. Oreka-prezioaren gainetik produktua soberan dago; azpitik, falta da. Zenbat eta urrunago, orduan eta alde handiagoa.', 'Al subir el precio, la demanda baja y la oferta sube. Por encima del precio de equilibrio sobra producto; por debajo, falta. Cuanto más lejos, más diferencia.', 'عندما يرتفع السعر ينخفض الطلب ويرتفع العرض. فوق سعر التوازن يفيض المنتج، وتحته ينقص. وكلما ابتعدنا زاد الفرق.', 'When the price goes up, demand goes down and supply goes up. Above the equilibrium price there is product left over; below it, not enough. The further away, the bigger the gap.') },
    { id: 'budget', stage: 'economy', lessonTopic: 'budget-region', title: say('Aurrekontuaren eskualdea', 'La región del presupuesto', 'منطقة الميزانية', 'The budget region'), observe: say('Murrizketa bakoitza zuzen bat da, eta bere azpiko erdiplanoa betetzen du. Bi erdiplanoek batera eskualde bideragarria osatzen dute. Ertzeko puntu batek baliabide bat agortzen du; izkinako batek, biak.', 'Cada restricción es una recta, y se cumple en el semiplano de debajo. Los dos semiplanos juntos forman la región factible. Un punto del borde agota un recurso; uno de la esquina, los dos.', 'كل قيد مستقيم، ويتحقق في نصف المستوى الذي تحته. ونصفا المستوى معًا يكوّنان المنطقة الممكنة. والنقطة على الحافة تستنفد موردًا، والنقطة في الزاوية تستنفد الاثنين.', 'Each constraint is a line, and it holds in the half-plane below it. The two half-planes together make the feasible region. A point on the edge uses up one resource; one in the corner, both.') }
]

export const gizAlgebraLabToolForTopic: Record<string, GizAlgebraLabToolId | undefined> = {
    'ruffini-roots': 'ruffini',
    'factorize-high': 'root-hunt',
    'change-variable': 'change-machine',
    'radical-equations': 'radical',
    'exponential-equations': 'exponential',
    'nonlinear-substitution': 'circle',
    'gauss-method': 'gauss-machine',
    'money-systems': 'mixture',
    'polynomial-inequalities': 'sign-table',
    'rational-inequalities': 'sign-table',
    'half-plane-regions': 'half-plane',
    'break-even': 'break-even',
    'supply-demand': 'market',
    'budget-region': 'budget'
}

export const gizAlgebraLabChallengeIds: number[] = [
    ruffiniChallenges,
    rootsChallenges,
    changeChallenges,
    radicalChallenges,
    exponentialChallenges,
    circleChallenges,
    gaussChallenges,
    mixtureChallenges,
    signTableChallenges,
    halfPlaneChallenges,
    regionChallenges,
    breakEvenChallenges,
    marketChallenges,
    budgetChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
