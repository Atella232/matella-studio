import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { bolzanoChallenges } from '../../batx1-zientziak-limiteak/lab/bolzano.ts'
import { degreesChallenges } from '../../batx1-zientziak-limiteak/lab/degrees.ts'
import { holeChallenges } from '../../batx1-zientziak-limiteak/lab/hole.ts'
import { bachLimitsLabTools } from '../../batx1-zientziak-limiteak/lab/labTools.ts'
import { lensChallenges } from '../../batx1-zientziak-limiteak/lab/lens.ts'
import { eMachineChallenges } from '../../batx1-zientziak-segidak/lab/eMachine.ts'
import type { Bach2LimitsStageId } from '../lessons.tsx'
import { epsilonChallenges } from './epsilon.ts'
import { raceChallenges } from './infinities.ts'
import { jointsChallenges } from './joints.ts'
import { theoremChallenges } from './theorems.ts'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 2 · Zientziak — the tools of
   the laboratory: four of this unit (epsilon and delta, the race of
   infinities, adjust a and b, the right theorem) and five of Limiteak
   1.º for the review and the notable limits (the lens, the hole of 0/0,
   the highest degree wins, the e machine and Bolzano traps the root),
   with their own challenges and ids.
   ========================================================================== */

export type Bach2LimitsLabToolId = 'lens' | 'hole' | 'degrees' | 'epsilon' | 'race' | 'e-machine' | 'joints' | 'theorem' | 'bolzano'

export interface Bach2LimitsLabTool extends LabToolInfo {
    id: Bach2LimitsLabToolId
    stage: Bach2LimitsStageId
}

const from = (id: string) => bachLimitsLabTools.find((tool) => tool.id === id)!

export const bach2LimitsLabTools: Bach2LimitsLabTool[] = [
    { ...from('lens'), id: 'lens', stage: 'review', lessonTopic: 'review-continuity' },
    { ...from('hole'), id: 'hole', stage: 'review', lessonTopic: 'review-point' },
    { ...from('degrees'), id: 'degrees', stage: 'review', lessonTopic: 'review-infinity' },
    {
        id: 'epsilon',
        stage: 'definition',
        lessonTopic: 'epsilon-delta',
        title: say('Epsilon eta delta', 'Épsilon y delta', 'إبسيلون ودلتا', 'Epsilon and delta'),
        observe: say(
            'ε banda estutzean, δ zerrenda ere estutu behar da. Funtzioa aldapatsua bada, δ txikiagoa da ε baino; leuna bada, handiagoa. Garrantzitsuena zera da: ε bakoitzerako δ bat egotea.',
            'Al estrechar la banda ε hay que estrechar la franja δ. Si la función es empinada, δ es menor que ε; si es suave, mayor. Lo que importa es que para cada ε haya algún δ.',
            'عند تضييق الشريط ε يجب تضييق الشريحة δ أيضًا. إذا كانت الدالة شديدة الميل كانت δ أصغر من ε، وإذا كانت لطيفة كانت أكبر. والمهم أن توجد δ لكل ε.',
            'Narrowing the band ε means narrowing the strip δ too. If the function is steep, δ is smaller than ε; if it is gentle, larger. What matters is that every ε has some δ.'
        )
    },
    {
        id: 'race',
        stage: 'notable',
        lessonTopic: 'orders',
        title: say('Infinituen lasterketa', 'La carrera de infinitos', 'سباق اللانهايات', 'The race of infinities'),
        observe: say(
            'x handitzean, logaritmoa atzean geratzen da, berreketak hazten dira eta esponentzialek denei irabazten diete azkenean, hasieran atzetik joan arren. Zatidura ordena handieneko infinituak esaten duen tokira doa.',
            'Al crecer x, el logaritmo se queda atrás, las potencias crecen y las exponenciales acaban ganando a todas, aunque al principio vayan por detrás. El cociente va adonde dice el infinito de mayor orden.',
            'عندما يكبر x يتأخر اللوغاريتم، وتكبر القوى، وتتفوق الأسيات على الجميع في النهاية ولو تأخرت في البداية. ويتجه خارج القسمة حيث تقول اللانهاية ذات الرتبة الأكبر.',
            'As x grows, the logarithm falls behind, the powers grow and the exponentials end up beating them all, even if they start behind. The quotient goes where the infinity of highest order says.'
        )
    },
    { ...from('e-machine'), id: 'e-machine', stage: 'notable', lessonTopic: 'one-infinity' },
    {
        id: 'joints',
        stage: 'continuity',
        lessonTopic: 'two-parameters',
        title: say('Doitu a eta b', 'Ajusta a y b', 'اضبط a وb', 'Adjust a and b'),
        observe: say(
            'Lotune bakoitzak a eta b dituen ekuazio bat ematen du. Mugitu bietako bat lotune bat ixteko; biak batera ixteko, sistema ebatzi behar da, eta bikote bakar batek balio du.',
            'Cada unión da una ecuación con a y b. Mueve uno de los dos para cerrar una unión; para cerrar las dos a la vez hay que resolver el sistema, y solo sirve una pareja.',
            'كل نقطة التقاء تعطي معادلة فيها a وb. حرّك أحدهما لإغلاق نقطة واحدة؛ ولإغلاق النقطتين معًا يجب حل النظام، ولا يصلح إلا زوج واحد.',
            'Each joint gives an equation with a and b. Move one of them to close one joint; to close both at once you must solve the system, and only one pair works.'
        )
    },
    {
        id: 'theorem',
        stage: 'theorems',
        lessonTopic: 'bolzano-equations',
        title: say('Teorema egokia', 'El teorema justo', 'المبرهنة المناسبة', 'The right theorem'),
        observe: say(
            'Hiru teoremek funtzio jarraitua eskatzen dute tarte itxian. Jauzi bat, asintota bat edo tarte ireki bat badago, ez dute ezer ziurtatzen, nahiz eta batzuetan bilatzen duzuna egon.',
            'Los tres teoremas piden una función continua en el intervalo cerrado. Si hay un salto, una asíntota o un intervalo abierto, no aseguran nada, aunque a veces lo que buscas exista igual.',
            'تشترط المبرهنات الثلاث دالة متصلة على الفترة المغلقة. وإذا وُجدت قفزة أو مقارب أو فترة مفتوحة فلا تضمن شيئًا، وإن كان ما تبحث عنه موجودًا أحيانًا.',
            'The three theorems need a function continuous on the closed interval. With a jump, an asymptote or an open interval they ensure nothing, even if what you look for is sometimes there anyway.'
        )
    },
    { ...from('bolzano'), id: 'bolzano', stage: 'theorems', lessonTopic: 'bolzano-equations' }
]

export const bach2LimitsLabToolForTopic: Record<string, Bach2LimitsLabToolId | undefined> = {
    'review-point': 'hole',
    'review-infinity': 'degrees',
    'review-continuity': 'lens',
    'epsilon-delta': 'epsilon',
    'infinite-definitions': 'epsilon',
    orders: 'race',
    'one-infinity': 'e-machine',
    parameter: 'joints',
    'two-parameters': 'joints',
    'bolzano-equations': 'theorem',
    intermediate: 'theorem',
    weierstrass: 'theorem'
}

export const bach2LimitsLabChallengeIds: number[] = [
    lensChallenges,
    holeChallenges,
    degreesChallenges,
    epsilonChallenges,
    raceChallenges,
    eMachineChallenges,
    jointsChallenges,
    theoremChallenges,
    bolzanoChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
