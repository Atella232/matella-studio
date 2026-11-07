import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { circleChallenges, classifyChallenges, halfPlaneChallenges, mixtureChallenges, regionChallenges, squaresChallenges, systemsLabTools } from '../../dbh4-akademikoak-sistemak/lab/labTools.ts'
import type { BachSystemsStageId } from '../lessons.tsx'
import { gaussChallenges } from './gaussMachine.ts'
import { parameterChallenges } from './parameterSlider.ts'
import { familyChallenges } from './solutionFamily.ts'

/* ==========================================================================
   Ekuazio-sistemak (Batxilergoa 1 · Zientziak) laboratory. Three tools of
   its own, for what 1.º Bachillerato adds: the Gauss machine (row
   operations on the augmented matrix), the parameter slider (the a that
   turns two lines parallel) and the family of solutions (λ sliding a
   solution along a line). The review comes from 4. DBH académicas with its
   challenges and ids (progress is kept apart, under this unit's storage
   prefix): moving the second line, line and circle, two squares, the
   half-plane and its test point, the integer points of the triangle, and
   how many and how much. Tests in tests/sistemak-batx1z-lab.test.ts.
   ========================================================================== */

export type BachSystemsLabToolId = 'classify' | 'gauss-machine' | 'mixture' | 'solution-family' | 'parameter-slider' | 'circle' | 'squares' | 'half-plane' | 'region'

export interface BachSystemsLabTool extends LabToolInfo {
    id: BachSystemsLabToolId
    stage: BachSystemsStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const from = (id: string) => systemsLabTools.find((tool) => tool.id === id)!

export const bachSystemsLabTools: BachSystemsLabTool[] = [
    { ...from('classify'), id: 'classify', stage: 'linear', lessonTopic: 'classify-systems' },
    { id: 'gauss-machine', stage: 'gauss', lessonTopic: 'gauss-method', title: say('Gaussen makina', 'La máquina de Gauss', 'آلة غاوس', 'The Gauss machine'), observe: say('m·E2 + k·E1 eragiketak errenkada osoa aldatzen du, gai askea ere bai. 0 egiteko, bi biderkadurek aurkakoak izan behar dute. Mailakatuta dagoenean, azken errenkadak esaten du zenbat soluzio dauden.', 'La operación m·E2 + k·E1 cambia la fila entera, también el término independiente. Para hacer un 0, los dos productos tienen que ser opuestos. Cuando está escalonado, la última fila dice cuántas soluciones hay.', 'تغيّر العملية m·E2 + k·E1 الصف كله، والحد الثابت أيضًا. ولجعل صفر يجب أن يكون الجداءان متعاكسين. وعندما يصير النظام درجيًّا يخبرنا الصف الأخير بعدد الحلول.', 'The operation m·E2 + k·E1 changes the whole row, the constant term too. To make a 0, the two products must be opposites. When it is triangular, the last row tells you how many solutions there are.') },
    { ...from('mixture'), id: 'mixture', stage: 'gauss', lessonTopic: 'three-unknown-problems' },
    { id: 'solution-family', stage: 'discussion', lessonTopic: 'parametric-solutions', title: say('Soluzioen familia', 'La familia de soluciones', 'عائلة الحلول', 'The family of solutions'), observe: say('z = λ eginda, x eta y λ zenbakiaren funtzioan idazten dira. λ mugitzean, soluzioa zuzen batean zehar irristatzen da, eta bi ekuazioak betetzen dira beti.', 'Con z = λ, x e y se escriben en función de λ. Al mover λ, la solución se desliza por una recta y las dos ecuaciones se siguen cumpliendo.', 'مع z = λ يُكتب x وy بدلالة λ. وعند تحريك λ ينزلق الحل على مستقيم وتبقى المعادلتان محققتين.', 'With z = λ, x and y are written in terms of λ. As λ moves, the solution slides along a straight line and both equations keep holding.') },
    { id: 'parameter-slider', stage: 'discussion', lessonTopic: 'parameter-discussion', title: say('Parametroaren graduatzailea', 'El deslizador del parámetro', 'منزلقة الوسيط', 'The parameter slider'), observe: say('E2 − s·E1 eginda, (a − sq)y = b − sr geratzen da. a = sq denean zuzenak paraleloak dira (bateraezina) edo bat datoz (b = sr); beste edozein a balioarekin, ebaki-puntu bat dago.', 'Con E2 − s·E1 queda (a − sq)y = b − sr. Cuando a = sq, las rectas son paralelas (incompatible) o coinciden (b = sr); con cualquier otro a hay un punto de corte.', 'بالعملية E2 − s·E1 يبقى (a − sq)y = b − sr. وعندما a = sq يتوازى المستقيمان (غير متوافق) أو ينطبقان (b = sr)؛ ومع أي قيمة أخرى لـ a توجد نقطة تقاطع.', 'With E2 − s·E1 you get (a − sq)y = b − sr. When a = sq, the lines are parallel (inconsistent) or the same (b = sr); with any other a there is one crossing point.') },
    { ...from('circle'), id: 'circle', stage: 'nonlinear', lessonTopic: 'nonlinear-substitution' },
    { ...from('squares'), id: 'squares', stage: 'nonlinear', lessonTopic: 'nonlinear-problems' },
    { ...from('half-plane'), id: 'half-plane', stage: 'inequalities', lessonTopic: 'half-plane-regions' },
    { ...from('region'), id: 'region', stage: 'inequalities', lessonTopic: 'region-cases' }
]

export const bachSystemsLabToolForTopic: Record<string, BachSystemsLabToolId | undefined> = {
    'linear-equations': 'solution-family',
    'classify-systems': 'classify',
    'equivalent-systems': 'gauss-machine',
    'triangular-systems': 'gauss-machine',
    'gauss-method': 'gauss-machine',
    'augmented-matrix': 'gauss-machine',
    'three-unknown-problems': 'mixture',
    'solutions-count': 'gauss-machine',
    'parametric-solutions': 'solution-family',
    'parameter-discussion': 'parameter-slider',
    'nonlinear-substitution': 'circle',
    'nonlinear-problems': 'squares',
    'half-plane-regions': 'half-plane',
    'region-cases': 'region'
}

export const bachSystemsLabChallengeIds: number[] = [
    classifyChallenges,
    gaussChallenges,
    mixtureChallenges,
    familyChallenges,
    parameterChallenges,
    circleChallenges,
    squaresChallenges,
    halfPlaneChallenges,
    regionChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
