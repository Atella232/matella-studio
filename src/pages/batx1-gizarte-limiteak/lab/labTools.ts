import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { degreesChallenges } from '../../batx1-zientziak-limiteak/lab/degrees.ts'
import { holeChallenges } from '../../batx1-zientziak-limiteak/lab/hole.ts'
import { bachLimitsLabTools } from '../../batx1-zientziak-limiteak/lab/labTools.ts'
import { lensChallenges } from '../../batx1-zientziak-limiteak/lab/lens.ts'
import type { SocLimitsStageId } from '../lessons.tsx'
import { say } from '../text.ts'
import { longRunChallenges } from './longRun.ts'
import { tariffChallenges } from './tariff.ts'

/* ==========================================================================
   Limiteak eta jarraitutasuna (Batxilergoa 1 · Gizarte Zientziak)
   laboratory. Two tools of its own: a model that settles in the long run
   (its start against its long-run value) and a tariff in two pieces that
   must not jump. From the Ciencias twin, with their challenges and ids
   (progress is kept apart, under this unit's storage prefix): the highest
   degree wins, the lens of the limit and the hole of 0/0, given this
   unit's stages and lessons. Tests in tests/limiteak-batx1g-lab.test.ts.
   ========================================================================== */

export type SocLimitsLabToolId = 'long-run' | 'degrees' | 'lens' | 'hole' | 'tariff'

export interface SocLimitsLabTool extends LabToolInfo {
    id: SocLimitsLabToolId
    stage: SocLimitsStageId
}

const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const socLimitsLabTools: SocLimitsLabTool[] = [
    {
        id: 'long-run',
        stage: 'infinity',
        lessonTopic: 'long-run',
        title: say('Epe luzera', 'A largo plazo', 'على المدى البعيد', 'In the long run'),
        observe: say(
            'Eredua B zati C baliotik hasten da, eta epe luzera A baliora hurbiltzen da, iritsi gabe. A hasierakoa baino txikiagoa bada, kurba jaitsi egiten da, batez besteko kostu batek bezala; handiagoa bada, igo egiten da, egonkortzen den biztanleria batek bezala.',
            'El modelo empieza en B entre C y, a la larga, se acerca a A sin llegar. Si A es menor que el comienzo, la curva baja, como un coste medio; si es mayor, sube, como una población que se estabiliza.',
            'يبدأ النموذج من B على C ويقترب على المدى البعيد من A دون أن يبلغه. إذا كان A أصغر من البداية نزل المنحنى مثل تكلفة متوسطة، وإذا كان أكبر صعد مثل عدد سكان يستقر.',
            'The model starts at B over C and, in the long run, approaches A without reaching it. If A is smaller than the start, the curve falls, like an average cost; if it is bigger, it rises, like a population that levels off.'
        )
    },
    { ...from(bachLimitsLabTools, 'degrees'), id: 'degrees', stage: 'infinity', lessonTopic: 'degrees' },
    { ...from(bachLimitsLabTools, 'lens'), id: 'lens', stage: 'point', lessonTopic: 'one-sided' },
    { ...from(bachLimitsLabTools, 'hole'), id: 'hole', stage: 'point', lessonTopic: 'zero-zero' },
    {
        id: 'tariff',
        stage: 'continuity',
        lessonTopic: 'parameter',
        title: say('Jauzirik gabeko tarifa', 'La tarifa que no salta', 'التعرفة التي لا تقفز', 'The tariff that does not jump'),
        observe: say(
            'Lehen zatia p1 bider L baliora iristen da, eta bigarrena p2 bider L gehi k baliotik hasten da. Biak berdinak direnean, tarifak ez du jauzirik egiten eta jarraitua da; bestela, jauzia haien kendura da.',
            'El primer trozo llega a p1 por L y el segundo empieza en p2 por L más k. Cuando los dos coinciden, la tarifa no salta y es continua; si no, el salto es su diferencia.',
            'يصل الجزء الأول إلى p1 في L ويبدأ الثاني من p2 في L زائد k. عندما يتساويان لا تقفز التعرفة وتكون متصلة، وإلا فالقفزة هي الفرق بينهما.',
            'The first piece reaches p1 times L and the second starts at p2 times L plus k. When both match, the tariff does not jump and is continuous; if not, the jump is their difference.'
        )
    }
]

export const socLimitsLabToolForTopic: Record<string, SocLimitsLabToolId | undefined> = {
    'long-run': 'long-run',
    'poly-exp': 'long-run',
    degrees: 'degrees',
    'roots-infinity': 'degrees',
    'long-models': 'long-run',
    'one-sided': 'lens',
    infinite: 'hole',
    'zero-zero': 'hole',
    continuous: 'tariff',
    discontinuities: 'lens',
    parameter: 'tariff',
    'vertical-horizontal': 'long-run'
}

export const socLimitsLabChallengeIds: number[] = [
    longRunChallenges,
    degreesChallenges,
    lensChallenges,
    holeChallenges,
    tariffChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
