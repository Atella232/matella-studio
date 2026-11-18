import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { boxChallenges } from '../../batx1-zientziak-aplikazioak/lab/box.ts'
import { bachApplicationsLabTools } from '../../batx1-zientziak-aplikazioak/lab/labTools.ts'
import { signChallenges } from '../../batx1-zientziak-aplikazioak/lab/sign.ts'
import { functionsLabTools, rateChallenges } from '../../dbh4-aplikatuak-funtzioak/lab/labTools.ts'
import type { SocDerivStageId } from '../lessons.tsx'
import { say } from '../text.ts'
import { marginalChallenges } from './marginal.ts'
import { profitChallenges } from './profit.ts'

/* ==========================================================================
   Deribatuak eta haien aplikazioak (Batxilergoa 1 · Gizarte Zientziak)
   laboratory. Two tools of its own: the cost of the next unit against the
   marginal cost, and the production with the greatest profit. Borrowed
   with their challenges and ids (progress is kept apart, under this
   unit's storage prefix): the average rate of 4. DBH aplikatuak, and the
   traffic light of f′ and the open box of the Ciencias applications
   unit. The Ciencias secant and graph of f′ are left out: they bring sin x,
   and the owner left the trigonometric derivatives out. Tests in
   tests/deribatuak-batx1g-lab.test.ts.
   ========================================================================== */

export type SocDerivLabToolId = 'rate' | 'marginal' | 'sign' | 'profit' | 'box'

export interface SocDerivLabTool extends LabToolInfo {
    id: SocDerivLabToolId
    stage: SocDerivStageId
}

const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const socDerivLabTools: SocDerivLabTool[] = [
    { ...from(functionsLabTools, 'rate'), id: 'rate', stage: 'rate', lessonTopic: 'average-rate' },
    {
        id: 'marginal',
        stage: 'rate',
        lessonTopic: 'derivative-point',
        title: say('Kostu marjinala', 'El coste marginal', 'التكلفة الحدية', 'The marginal cost'),
        observe: say(
            'Hurrengo unitatearen kostua ebakitzailearen malda da, eta kostu marjinala, ukitzailearena. Kostu-kurba gorantz okertzen bada, hurrengo unitatea garestiagoa da; zuzena bada, berdina; beherantz okertzen bada, merkeagoa. Urratsa txikitzean, ebakitzailea ukitzaile bihurtzen da.',
            'El coste de la unidad siguiente es la pendiente de la secante, y el coste marginal, la de la tangente. Si la curva de coste se curva hacia arriba, la unidad siguiente sale más cara; si es recta, igual; si se curva hacia abajo, más barata. Al encoger el paso, la secante se convierte en la tangente.',
            'تكلفة الوحدة التالية هي ميل القاطع، والتكلفة الحدية ميل المماس. إذا انحنى منحنى التكلفة إلى الأعلى كانت الوحدة التالية أغلى، وإذا كان مستقيمًا فمثلها، وإذا انحنى إلى الأسفل فأرخص. وعند تصغير الخطوة يتحول القاطع إلى مماس.',
            'The cost of the next unit is the slope of the secant, and the marginal cost, that of the tangent. If the cost curve bends upwards, the next unit costs more; if it is straight, the same; if it bends downwards, less. As the step shrinks, the secant turns into the tangent.'
        )
    },
    { ...from(bachApplicationsLabTools, 'sign'), id: 'sign', stage: 'monotony', lessonTopic: 'sign-intervals' },
    {
        id: 'profit',
        stage: 'optimization',
        lessonTopic: 'max-profit',
        title: say('Mozkin maximoa', 'Beneficio máximo', 'الربح الأعظم', 'The greatest profit'),
        observe: say(
            'Unitate baten diru-sarrera haren kostu marjinala baino handiagoa den bitartean, gehiago ekoiztean mozkina igo egiten da. Biak berdinak direnean, mozkina maximoa da; handik aurrera, unitate bakoitzak galera ematen du eta mozkina jaitsi egiten da.',
            'Mientras el ingreso de una unidad supera a su coste marginal, producir más sube el beneficio. Cuando los dos son iguales, el beneficio es máximo; a partir de ahí, cada unidad hace perder y el beneficio baja.',
            'ما دام إيراد الوحدة يفوق تكلفتها الحدية فإن زيادة الإنتاج ترفع الربح. وعندما يتساويان يكون الربح أعظميًّا، وبعدها تسبب كل وحدة خسارة فينخفض الربح.',
            'While the revenue of a unit beats its marginal cost, producing more raises the profit. When both are equal, the profit is greatest; from there on, each unit loses money and the profit falls.'
        )
    },
    { ...from(bachApplicationsLabTools, 'box'), id: 'box', stage: 'optimization', lessonTopic: 'optimize' }
]

export const socDerivLabToolForTopic: Record<string, SocDerivLabToolId | undefined> = {
    'average-rate': 'rate',
    'derivative-point': 'marginal',
    tangent: 'marginal',
    'sign-intervals': 'sign',
    'singular-points': 'sign',
    'derivative-graph': 'sign',
    'max-profit': 'profit',
    optimize: 'box',
    'interval-extremes': 'profit'
}

export const socDerivLabChallengeIds: number[] = [
    rateChallenges,
    marginalChallenges,
    signChallenges,
    profitChallenges,
    boxChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
