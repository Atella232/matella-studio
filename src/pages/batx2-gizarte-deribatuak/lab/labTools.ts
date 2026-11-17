import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { chainChallenges } from '../../batx1-zientziak-deribatuak/lab/chain.ts'
import { bachDerivativesLabTools } from '../../batx1-zientziak-deribatuak/lab/labTools.ts'
import { slopeChallenges } from '../../batx1-zientziak-deribatuak/lab/slopeGraph.ts'
import { smoothChallenges as cornerChallenges } from '../../batx1-zientziak-deribatuak/lab/smooth.ts'
import type { Bach2gDerivativesStageId } from '../lessons.tsx'
import { rateChallenges } from './instantRate.ts'
import { nextChallenges } from './nextUnit.ts'
import { smoothChallenges } from './smoothTariff.ts'

/* ==========================================================================
   Deribatuak · Batxilergoa 2 · Gizarte Zientziak — the tools of the
   laboratory: three of this unit (from the average to the instantaneous,
   smooth the tariff, the next unit) and three of Derivadas 1.º borrowed
   with their challenges and ids (differentiable here?, the graph of f′,
   the chain of machines).
   ========================================================================== */

export type Bach2gDerivativesLabToolId = 'instant' | 'smooth' | 'slope-graph' | 'chain' | 'smooth-tariff' | 'next-unit'

export interface Bach2gDerivativesLabTool extends LabToolInfo {
    id: Bach2gDerivativesLabToolId
    stage: Bach2gDerivativesStageId
}

const from = (id: string) => bachDerivativesLabTools.find((tool) => tool.id === id)!

export const bach2gDerivativesLabTools: Bach2gDerivativesLabTool[] = [
    {
        id: 'instant',
        stage: 'rate',
        lessonTopic: 'instant',
        title: say('Batez bestekotik unean unekora', 'De la media a la instantánea', 'من المتوسط إلى اللحظي', 'From the average to the instantaneous'),
        observe: say(
            'Tartea txikitzean, ebakitzailea zuzen ukitzailera hurbiltzen da eta T.V.M. tasa unekora. Salmentak gero eta motelago hazten badira, T.V.M. igo egiten da h txikitzean; gero eta azkarrago hazten badira, jaitsi; zuzen batean, ez da aldatzen.',
            'Al encoger el intervalo, la secante se acerca a la tangente y la T.V.M. a la tasa instantánea. Si las ventas crecen cada vez más despacio, la T.V.M. sube al encoger h; si crecen cada vez más deprisa, baja; en una recta, no cambia.',
            'عند تصغير الفترة يقترب القاطع من المماس ويقترب معدل التغير المتوسط من المعدل اللحظي. إذا كانت المبيعات تنمو أبطأ فأبطأ ارتفع المعدل عند تصغير h، وإذا كانت تنمو أسرع فأسرع انخفض، وفي المستقيم لا يتغير.',
            'As the interval shrinks, the secant approaches the tangent and the average rate the instantaneous one. If sales grow more and more slowly, the average rate goes up as h shrinks; if they grow faster and faster, it goes down; on a line, it does not change.'
        )
    },
    { ...from('smooth'), id: 'smooth', stage: 'point', lessonTopic: 'derivable' },
    { ...from('slope-graph'), id: 'slope-graph', stage: 'rules', lessonTopic: 'derivative-graph' },
    { ...from('chain'), id: 'chain', stage: 'chain', lessonTopic: 'chain-power' },
    {
        id: 'smooth-tariff',
        stage: 'economy',
        lessonTopic: 'smooth-join',
        title: say('Leundu tarifa', 'Suaviza la tarifa', 'نعّم التعريفة', 'Smooth the tariff'),
        observe: say(
            'b aldatuz zuzena gora eta behera mugitzen da: jauzia ixten da. a aldatuz zuzena biratzen da: punta kentzen da. Biak batera lortzeko, bi ekuazioak bete behar dira, eta bikote bakar batek balio du.',
            'Al cambiar b, la recta sube y baja: se cierra el salto. Al cambiar a, la recta gira: se quita el pico. Para conseguir las dos cosas a la vez hay que cumplir las dos ecuaciones, y solo sirve una pareja.',
            'عند تغيير b يصعد المستقيم وينزل فتُغلق القفزة. وعند تغيير a يدور المستقيم فتزول الزاوية. ولتحقيق الأمرين معًا يجب تحقيق المعادلتين، ولا يصلح إلا زوج واحد.',
            'Changing b moves the line up and down: the jump closes. Changing a turns the line: the corner goes. To get both at once, both equations must hold, and only one pair works.'
        )
    },
    {
        id: 'next-unit',
        stage: 'economy',
        lessonTopic: 'marginal',
        title: say('Hurrengo unitatea', 'La unidad siguiente', 'الوحدة التالية', 'The next unit'),
        observe: say(
            "C'(x) zuzen ukitzailearen malda da, eta hurrengo unitatearen kostua kurbaren urratsa. Zuzen batean berdinak dira; kurba gorantz okertzen bada, urratsa apur bat handiagoa da; beherantz okertzen bada, txikiagoa.",
            "C'(x) es la pendiente de la tangente, y lo que cuesta la unidad siguiente es el escalón de la curva. En una recta coinciden; si la curva se dobla hacia arriba, el escalón es un poco mayor; si se dobla hacia abajo, menor.",
            "‏C'(x) هي ميل المماس، وتكلفة الوحدة التالية هي درجة المنحنى. في المستقيم يتساويان؛ وإذا انحنى المنحنى إلى الأعلى كانت الدرجة أكبر قليلًا، وإذا انحنى إلى الأسفل كانت أصغر.",
            "C'(x) is the slope of the tangent, and what the next unit costs is the step of the curve. On a line they agree; if the curve bends up, the step is a little bigger; if it bends down, smaller."
        )
    }
]

export const bach2gDerivativesLabToolForTopic: Record<string, Bach2gDerivativesLabToolId | undefined> = {
    'average-rate': 'instant',
    'rate-context': 'instant',
    instant: 'instant',
    definition: 'instant',
    tangent: 'instant',
    derivable: 'smooth',
    'derivative-graph': 'slope-graph',
    'chain-power': 'chain',
    'chain-exp': 'chain',
    'chain-log': 'chain',
    'smooth-join': 'smooth-tariff',
    marginal: 'next-unit'
}

export const bach2gDerivativesLabChallengeIds: number[] = [
    rateChallenges,
    cornerChallenges,
    slopeChallenges,
    chainChallenges,
    smoothChallenges,
    nextChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
