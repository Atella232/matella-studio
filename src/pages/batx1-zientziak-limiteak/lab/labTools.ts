import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { bachFunctionsLabTools } from '../../batx1-zientziak-funtzioak/lab/labTools.ts'
import { transformChallenges } from '../../batx1-zientziak-funtzioak/lab/transform.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { eMachineChallenges } from '../../batx1-zientziak-segidak/lab/eMachine.ts'
import { bachSequencesLabTools } from '../../batx1-zientziak-segidak/lab/labTools.ts'
import { limitBandChallenges } from '../../batx1-zientziak-segidak/lab/limitBand.ts'
import { functionsAkLabTools, joinChallenges } from '../../dbh4-akademikoak-funtzioak/lab/labTools.ts'
import type { BachLimitsStageId } from '../lessons.tsx'
import { bolzanoChallenges } from './bolzano.ts'
import { degreesChallenges } from './degrees.ts'
import { holeChallenges } from './hole.ts'
import { lensChallenges } from './lens.ts'

/* ==========================================================================
   Limiteak eta jarraitutasuna (Batxilergoa 1 · Zientziak) laboratory. Four
   tools of its own: the lens of the limit (two probes that close in on a
   point from both sides), the hole of 0/0 (build a quotient and see a
   hole or an asymptote), the highest degree wins (two growing terms race
   as x grows) and Bolzano traps the root (the signs at the ends and the
   halvings). Borrowed with their challenges and ids (progress is kept
   apart, under this unit's storage prefix): the band of the limit and the
   e machine from Segidak, the transformation workshop from Funtzio
   elementalak (1/x and its asymptotes) and join two pieces from 4. DBH
   académicas. Tests in tests/limiteak-batx1z-lab.test.ts.
   ========================================================================== */

export type BachLimitsLabToolId = 'lens' | 'hole' | 'degrees' | 'limit-band' | 'e-machine' | 'transform' | 'join' | 'bolzano'

export interface BachLimitsLabTool extends LabToolInfo {
    id: BachLimitsLabToolId
    stage: BachLimitsStageId
}

const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const bachLimitsLabTools: BachLimitsLabTool[] = [
    {
        id: 'lens',
        stage: 'point',
        lessonTopic: 'one-sided',
        title: say('Limitearen lupa', 'La lupa del límite', 'عدسة النهاية', 'The lens of the limit'),
        observe: say(
            'Bi zundak a puntura hurbiltzen dira, bata ezkerretik eta bestea eskuinetik. Balio berera iristen badira, limitea badago, f(a) edozein dela ere; bestela, jauzi bat dago eta ez dago limiterik.',
            'Las dos sondas se acercan al punto a, una por la izquierda y otra por la derecha. Si llegan al mismo valor, hay límite, valga lo que valga f(a); si no, hay un salto y no hay límite.',
            'يقترب المسباران من النقطة a، أحدهما من اليسار والآخر من اليمين. إذا وصلا إلى القيمة نفسها فالنهاية موجودة مهما كانت f(a)؛ وإلا فهناك قفزة ولا توجد نهاية.',
            'The two probes close in on the point a, one from the left and one from the right. If they reach the same value there is a limit, whatever f(a) is; if not, there is a jump and no limit.'
        )
    },
    {
        id: 'hole',
        stage: 'calculus',
        lessonTopic: 'zero-zero',
        title: say('0/0 zuloa', 'El agujero del 0/0', 'ثقب 0/0', 'The hole of 0/0'),
        observe: say(
            'Izendatzailearen erroa zenbakitzailearena ere bada, 0/0 ateratzen da: faktorea sinplifikatu eta zulo bat geratzen da. Ez bada, k/0 da eta asintota bertikal bat dago. Izendatzailea karratua bada, sinplifikatu ondoren ere asintota gera daiteke.',
            'Si la raíz del denominador también lo es del numerador, sale 0/0: se simplifica el factor y queda un agujero. Si no, es k/0 y hay una asíntota vertical. Con el denominador al cuadrado, después de simplificar puede seguir habiendo asíntota.',
            'إذا كان جذر المقام جذرًا للبسط أيضًا ظهر 0/0: نختصر العامل فيبقى ثقب. وإلا فهو k/0 ويوجد مقارب رأسي. ومع مقام مربع قد يبقى المقارب حتى بعد الاختزال.',
            'If the root of the denominator is also a root of the numerator, you get 0/0: the factor cancels and a hole is left. If not, it is k/0 and there is a vertical asymptote. With the denominator squared, an asymptote can remain after simplifying.'
        )
    },
    {
        id: 'degrees',
        stage: 'infinity',
        lessonTopic: 'degrees',
        title: say('Maila handienak irabazten du', 'Gana el de mayor grado', 'تفوز الدرجة الأكبر', 'The highest degree wins'),
        observe: say(
            'x handitzean, gai nagusiak bakarrik du garrantzia. Goian maila handiagoa badago, zatidura infinitura doa; behean badago, 0 baliora; maila bera bada, koefiziente nagusien zatidurara.',
            'Al crecer x, solo importa el término principal. Si arriba hay más grado, el cociente va a infinito; si lo hay abajo, a 0; con el mismo grado, al cociente de los coeficientes principales.',
            'عندما يكبر x لا يهم إلا الحد الرئيسي. إذا كانت درجة البسط أكبر اتجه خارج القسمة إلى اللانهاية، وإذا كانت درجة المقام أكبر اتجه إلى 0، ومع الدرجة نفسها يتجه إلى خارج قسمة المعاملين الرئيسيين.',
            'As x grows, only the leading term matters. If the top has the higher degree, the quotient goes to infinity; if the bottom has it, to 0; with the same degree, to the quotient of the leading coefficients.'
        )
    },
    { ...from(bachSequencesLabTools, 'limit-band'), id: 'limit-band', stage: 'infinity', lessonTopic: 'degrees' },
    { ...from(bachSequencesLabTools, 'e-machine'), id: 'e-machine', stage: 'infinity', lessonTopic: 'e-limits' },
    { ...from(bachFunctionsLabTools, 'transform'), id: 'transform', stage: 'asymptotes', lessonTopic: 'vertical-horizontal' },
    { ...from(functionsAkLabTools, 'join'), id: 'join', stage: 'continuity', lessonTopic: 'continuous' },
    {
        id: 'bolzano',
        stage: 'continuity',
        lessonTopic: 'bolzano',
        title: say('Bolzanok erroa harrapatzen du', 'Bolzano encierra la raíz', 'بولتسانو يحصر الجذر', 'Bolzano traps the root'),
        observe: say(
            'Funtzioa jarraitua bada eta muturretan zeinua aldatzen bada, barruan erro bat dago. Tartea erdibitzean, zeinua aldatzen den erdia gordetzen da, eta erroa gero eta tarte estuagoan geratzen da. Jauzi batekin, zeinua alda daiteke errorik gabe.',
            'Si la función es continua y cambia de signo en los extremos, hay una raíz dentro. Al partir el intervalo por la mitad, se guarda la mitad donde cambia el signo y la raíz queda en un intervalo cada vez más estrecho. Con un salto, el signo puede cambiar sin raíz.',
            'إذا كانت الدالة متصلة وتغيّرت إشارتها بين الطرفين فهناك جذر في الداخل. وعند تنصيف المجال نحتفظ بالنصف الذي تتغير فيه الإشارة، فيبقى الجذر في مجال يضيق شيئًا فشيئًا. ومع قفزة قد تتغير الإشارة دون جذر.',
            'If the function is continuous and changes sign at the ends, there is a root inside. Halving the interval keeps the half where the sign changes, and the root stays in a narrower and narrower interval. With a jump, the sign can change with no root.'
        )
    }
]

export const bachLimitsLabToolForTopic: Record<string, BachLimitsLabToolId | undefined> = {
    idea: 'lens',
    'one-sided': 'lens',
    infinite: 'hole',
    substitute: 'hole',
    'zero-zero': 'hole',
    degrees: 'degrees',
    'e-limits': 'e-machine',
    'vertical-horizontal': 'transform',
    branches: 'degrees',
    continuous: 'join',
    discontinuities: 'lens',
    bolzano: 'bolzano'
}

export const bachLimitsLabChallengeIds: number[] = [
    lensChallenges,
    holeChallenges,
    degreesChallenges,
    limitBandChallenges,
    eMachineChallenges,
    transformChallenges,
    joinChallenges,
    bolzanoChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
