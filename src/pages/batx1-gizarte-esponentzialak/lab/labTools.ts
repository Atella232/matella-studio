import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { compositionChallenges } from '../../batx1-zientziak-funtzioak/lab/composition.ts'
import { bachFunctionsLabTools } from '../../batx1-zientziak-funtzioak/lab/labTools.ts'
import { mirrorChallenges } from '../../batx1-zientziak-funtzioak/lab/mirror.ts'
import { exponentialAkLabTools, growthChallenges, logShiftChallenges, shiftChallenges } from '../../dbh4-akademikoak-esponentzialak/lab/labTools.ts'
import { ladderChallenges } from '../../dbh4-akademikoak-potentziak/lab/labTools.ts'
import { exponentialChallenges } from '../../dbh4-aplikatuak-grafikoa/lab/labTools.ts'
import type { SocExpStageId } from '../lessons.tsx'
import { say } from '../text.ts'
import { lineExpChallenges } from './lineExp.ts'
import { logisticChallenges } from './logistic.ts'

/* ==========================================================================
   Funtzio esponentzialak eta logaritmikoak (Batxilergoa 1 · Gizarte
   Zientziak) laboratory. Two tools of its own: the line or the
   exponential through the same two data, and the logistic S curve with
   its ceiling and its half. The review comes with its challenges and ids
   (progress is kept apart, under this unit's storage prefix): from the
   Ciencias twin, two machines in a row and the mirror y = x; from 4. DBH,
   the exponential, move the exponential, growth and decay, the ladder of
   logarithms and move the logarithm. Tests in
   tests/esponentzialak-batx1g-lab.test.ts.
   ========================================================================== */

export type SocExpLabToolId = 'shift' | 'composition' | 'mirror' | 'exponential' | 'growth' | 'line-exp' | 'ladder' | 'log-shift' | 'logistic'

export interface SocExpLabTool extends LabToolInfo {
    id: SocExpLabToolId
    stage: SocExpStageId
}

const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const socExpLabTools: SocExpLabTool[] = [
    { ...from(exponentialAkLabTools, 'shift'), id: 'shift', stage: 'transforms', lessonTopic: 'shifts' },
    { ...from(bachFunctionsLabTools, 'composition'), id: 'composition', stage: 'composition', lessonTopic: 'composition' },
    { ...from(bachFunctionsLabTools, 'mirror'), id: 'mirror', stage: 'composition', lessonTopic: 'inverse-graph' },
    { ...from(exponentialAkLabTools, 'exponential'), id: 'exponential', stage: 'exponential', lessonTopic: 'exp-graph' },
    { ...from(exponentialAkLabTools, 'growth'), id: 'growth', stage: 'exponential', lessonTopic: 'percent-growth' },
    {
        id: 'line-exp',
        stage: 'exponential',
        lessonTopic: 'two-points',
        title: say('Zuzena ala esponentziala?', '¿Recta o exponencial?', 'مستقيم أم أسية؟', 'Line or exponential?'),
        observe: say(
            'Bi datu berek zuzen bat eta esponentzial bat ematen dituzte. Datuen artean zuzena gorago doa; kanpoan, esponentziala gero eta gehiago aldentzen da. Zuzenak kendura konstantea du; esponentzialak, zatidura konstantea.',
            'Los mismos dos datos dan una recta y una exponencial. Entre los datos la recta va por encima; fuera, la exponencial se separa cada vez más. La recta tiene la diferencia constante; la exponencial, el cociente.',
            'البيانتان نفسهما تعطيان مستقيمًا وأسية. بين البيانات يكون المستقيم أعلى، وخارجها تبتعد الأسية أكثر فأكثر. للمستقيم فرق ثابت وللأسية خارج قسمة ثابت.',
            'The same two data give a line and an exponential. Between the data the line is above; outside, the exponential moves further and further away. The line has a constant difference; the exponential, a constant quotient.'
        )
    },
    { ...from(exponentialAkLabTools, 'ladder'), id: 'ladder', stage: 'logarithmic', lessonTopic: 'log-inverse' },
    { ...from(exponentialAkLabTools, 'log-shift'), id: 'log-shift', stage: 'logarithmic', lessonTopic: 'log-graph' },
    {
        id: 'logistic',
        stage: 'models',
        lessonTopic: 'logistic',
        title: say('S kurba', 'La curva en S', 'المنحنى على شكل S', 'The S curve'),
        observe: say(
            'Hasieran kurba logistikoak esponentzial bat dirudi, baina sabaiaren erdira hurbiltzean moteldu egiten da, eta M sabairantz hurbiltzen da, iritsi gabe. Erdia lortzen da a berretu x bider b denean.',
            'Al principio la curva logística parece una exponencial, pero al acercarse a la mitad del techo se frena y se acerca a M sin llegar. La mitad se alcanza cuando a elevado a x vale b.',
            'في البداية يشبه المنحنى اللوجستي الأسية، لكنه يتباطأ عند الاقتراب من نصف السقف ويقترب من M دون أن يبلغه. ويُبلغ النصف عندما يساوي a مرفوعًا إلى x العدد b.',
            'At first the logistic curve looks like an exponential, but near half the ceiling it slows down and approaches M without reaching it. Half is reached when a to the power x equals b.'
        )
    }
]

export const socExpLabToolForTopic: Record<string, SocExpLabToolId | undefined> = {
    shifts: 'shift',
    composition: 'composition',
    inverse: 'mirror',
    'inverse-graph': 'mirror',
    'exp-graph': 'exponential',
    'percent-growth': 'growth',
    'two-points': 'line-exp',
    'log-inverse': 'ladder',
    'log-graph': 'log-shift',
    'solve-time': 'growth',
    doubling: 'growth',
    logistic: 'logistic'
}

export const socExpLabChallengeIds: number[] = [
    shiftChallenges,
    compositionChallenges,
    mirrorChallenges,
    exponentialChallenges,
    growthChallenges,
    lineExpChallenges,
    ladderChallenges,
    logShiftChallenges,
    logisticChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
