import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { equationsLabTools as secondTools, lcmChallenges, solverChallenges } from '../../dbh2-ekuazioak-v2/lab/labTools.ts'
import { equationsSystemsLabTools as appliedTools, planeChallenges, reductionChallenges } from '../../dbh4-aplikatuak-ekuazioak/lab/labTools.ts'
import { substitutionChallenges, systemsLabTools as academicTools } from '../../dbh4-akademikoak-sistemak/lab/labTools.ts'
import type { Equations3StageId } from '../lessons.tsx'
import { agesChallenges } from './ages.ts'
import { balanceChallenges } from './balance.ts'
import { groundChallenges } from './ground.ts'
import { scalesChallenges } from './scales.ts'

/* ==========================================================================
   Ekuazioak eta sistemak (3. DBH) laboratory. Four tools are new and
   belong to this unit: the balance (doing the same on both pans), the
   parabola and the ground (how many solutions), the two balances (a
   system, and elimination on the pans) and the ages on a timeline. The
   step-by-step solver and the lcm come from 2. DBH, the plane and
   elimination from 4. DBH aplikatuak and substitution from 4. DBH
   akademikoak, with their own challenges. Tests in
   tests/ekuazioak-dbh3-lab.test.ts.
   ========================================================================== */

export type Equations3LabToolId = 'balance' | 'solver' | 'lcm' | 'ground' | 'scales' | 'plane' | 'substitution' | 'reduction' | 'ages'

export interface Equations3LabTool extends LabToolInfo {
    id: Equations3LabToolId
    stage: Equations3StageId
}

/** Arabic text runs right to left: every formula in it (ax + b, b² − 4c) is isolated left to right and kept on one line */
const isolate = (text: string) => text.replace(/[A-Za-z0-9(][A-Za-z0-9²³ ()+\-−·=]*[A-Za-z0-9²³)]|[A-Za-z]/g, (formula) => `⁦${formula.replace(/ /g, ' ')}⁩`)
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: isolate(ar) })

/** A tool of an earlier laboratory, put in this unit's stage and lesson */
function borrowed(list: LabToolInfo[], id: Equations3LabToolId, stage: Equations3StageId, lessonTopic: string): Equations3LabTool {
    const tool = list.find((candidate) => candidate.id === id)
    if (!tool) throw new Error(`No borrowed tool ${id}`)
    return { ...tool, id, stage, lessonTopic }
}

export const equations3LabTools: Equations3LabTool[] = [
    { id: 'balance', stage: 'linear', lessonTopic: 'equations', title: say('Balantza', 'La balanza', 'الميزان', 'The balance'), observe: say('Kaxa bat bi platerretatik kentzen bada, edo kilo bat bietatik, balantza orekan geratzen da: ekuazio baliokide bat da. Plater batetik bakarrik kenduz gero, okertu egingo litzateke.', 'Si se quita una caja de los dos platillos, o un kilo de los dos, la balanza sigue en equilibrio: es una ecuación equivalente. Si se quitara de un solo platillo, se inclinaría.', 'إذا أزلنا صندوقًا من الكفتين أو كيلوغرامًا من الاثنتين يبقى الميزان متوازنًا: إنها معادلة مكافئة. ولو أزلناه من كفة واحدة لمال.', 'If you take a box off both pans, or a kilo off both, the balance stays level: it is an equivalent equation. Taking it off one pan only would tip it.') },
    borrowed(secondTools, 'solver', 'linear', 'brackets'),
    borrowed(secondTools, 'lcm', 'linear', 'denominators'),
    { id: 'ground', stage: 'quadratic', lessonTopic: 'discriminant', title: say('Parabola eta lurra', 'La parábola y el suelo', 'القطع المكافئ والأرض', 'The parabola and the ground'), observe: say('x² + bx + c = 0 ekuazioaren ebazpenak parabolak lurra ukitzen duen puntuak dira. Δ positiboa bada bi puntu, zero bada bat, eta negatiboa bada parabola ez da lurrera iristen.', 'Las soluciones de x² + bx + c = 0 son los puntos donde la parábola toca el suelo. Si Δ es positivo, dos puntos; si es cero, uno; y si es negativo, la parábola no llega al suelo.', 'حلول x² + bx + c = 0 هي النقاط التي يمسّ فيها القطع المكافئ الأرض. إذا كان Δ موجبًا فنقطتان، وإذا كان صفرًا فنقطة، وإذا كان سالبًا فلا يصل إلى الأرض.', 'The solutions of x² + bx + c = 0 are the points where the parabola touches the ground. If Δ is positive, two points; if zero, one; and if negative, the parabola does not reach the ground.') },
    { id: 'scales', stage: 'systems', lessonTopic: 'pairs', title: say('Bi balantza', 'Dos balanzas', 'ميزانان', 'Two balances'), observe: say('Pisu batzuekin balantza bat orekatzen da, baina bestea ez: ekuazio baten ebazpena da, ez sistemarena. Bi balantzak batera orekatzen dituen bikotea bakarra da. Bigarren balantza lehenengoari kentzean, fruta bat bakarrik geratzen da.', 'Con algunos pesos una balanza se equilibra pero la otra no: es solución de una ecuación, no del sistema. Solo una pareja equilibra las dos a la vez. Al quitar la segunda balanza de la primera, queda una sola fruta.', 'ببعض الأوزان يتوازن ميزان دون الآخر: إنه حلّ معادلة لا حلّ النظام. زوج واحد فقط يوازن الاثنين معًا. وعند طرح الميزان الثاني من الأول تبقى ثمرة واحدة.', 'With some weights one balance levels but the other does not: that solves one equation, not the system. Only one pair levels both at once. Taking the second balance off the first leaves a single fruit.') },
    borrowed(appliedTools, 'plane', 'systems', 'graphic'),
    borrowed(academicTools, 'substitution', 'methods', 'substitution'),
    borrowed(appliedTools, 'reduction', 'methods', 'elimination'),
    { id: 'ages', stage: 'problems', lessonTopic: 'equation-problems', title: say('Adinen denbora-lerroa', 'La línea del tiempo de las edades', 'خط زمن الأعمار', 'Ages on a timeline'), observe: say('Urteak bi pertsonei igarotzen zaizkie. Horregatik, adinen arteko aldea ez da aldatzen, baina zatidura 1 zenbakira hurbiltzen da: amak semearen bikoitza edo hirukoitza une jakin batean bakarrik du.', 'Los años pasan para las dos personas. Por eso la diferencia de edades no cambia, pero la razón se acerca a 1: la madre tiene el doble o el triple que el hijo solo en un momento.', 'تمرّ السنوات على الشخصين. لذلك لا يتغيّر فرق العمرين، لكن النسبة تقترب من 1: يكون عمر الأم ضعف عمر الابن أو ثلاثة أمثاله في لحظة واحدة فقط.', 'The years pass for both people. So the age difference does not change, but the ratio gets closer to 1: the mother is twice or three times the son\'s age at only one moment.') }
]

export const equations3LabToolForTopic: Record<string, Equations3LabToolId | undefined> = {
    equations: 'balance',
    brackets: 'solver',
    denominators: 'lcm',
    incomplete: 'ground',
    formula: 'ground',
    discriminant: 'ground',
    pairs: 'scales',
    graphic: 'plane',
    classify: 'plane',
    substitution: 'substitution',
    equalisation: 'plane',
    elimination: 'reduction',
    'equation-problems': 'ages',
    'quadratic-problems': 'ground',
    'system-problems': 'scales'
}

export const equations3LabChallengeIds: number[] = [balanceChallenges, solverChallenges, lcmChallenges, groundChallenges, scalesChallenges, planeChallenges, substitutionChallenges, reductionChallenges, agesChallenges].flatMap((list) => list.map((challenge) => challenge.id))
