import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { boxChallenges } from '../../batx1-zientziak-aplikazioak/lab/box.ts'
import { curveChallenges } from '../../batx1-zientziak-aplikazioak/lab/curvature.ts'
import { bachApplicationsLabTools } from '../../batx1-zientziak-aplikazioak/lab/labTools.ts'
import { signChallenges } from '../../batx1-zientziak-aplikazioak/lab/sign.ts'
import type { Bach2gApplicationsStageId } from '../lessons.tsx'
import { averageChallenges } from './average.ts'
import { priceChallenges } from './price.ts'
import { profitChallenges } from './profit.ts'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 2 · Gizarte Zientziak — the tools
   of the laboratory: three of this unit (income minus cost, the lowest
   average cost, the price that brings in most) and three of Aplicaciones
   1.º borrowed with their challenges and ids (the traffic light of f′,
   concavity with the tangent, the box without a lid).
   ========================================================================== */

export type Bach2gApplicationsLabToolId = 'sign' | 'box' | 'curvature' | 'profit' | 'average' | 'price'

export interface Bach2gApplicationsLabTool extends LabToolInfo {
    id: Bach2gApplicationsLabToolId
    stage: Bach2gApplicationsStageId
}

const from = (id: string) => bachApplicationsLabTools.find((tool) => tool.id === id)!

export const bach2gApplicationsLabTools: Bach2gApplicationsLabTool[] = [
    { ...from('sign'), id: 'sign', stage: 'growth', lessonTopic: 'intervals' },
    { ...from('box'), id: 'box', stage: 'extrema', lessonTopic: 'absolute' },
    { ...from('curvature'), id: 'curvature', stage: 'curvature', lessonTopic: 'second-sign' },
    {
        id: 'profit',
        stage: 'optimization',
        lessonTopic: 'max-profit',
        title: say('Diru-sarrerak ken kostuak', 'Ingreso menos coste', 'الإيراد ناقص التكلفة', 'Income minus cost'),
        observe: say(
            "Irabazia bi kurben arteko tartea da. I′ > C′ den bitartean, hurrengo unitateak kostatzen duena baino gehiago ekartzen du eta tartea handitzen da. I′ = C′ denean tartea handiena da; hortik aurrera, unitate bakoitzak galera dakar.",
            'El beneficio es la distancia entre las dos curvas. Mientras I′ > C′, la unidad siguiente aporta más de lo que cuesta y la distancia crece. Cuando I′ = C′ la distancia es la mayor; desde ahí, cada unidad trae pérdidas.',
            'الربح هو المسافة بين المنحنيين. ما دام I′ > C′ تضيف الوحدة التالية أكثر مما تكلّف فتزداد المسافة. وعندما I′ = C′ تكون المسافة أكبر ما يمكن؛ وبعدها تجلب كل وحدة خسارة.',
            'The profit is the gap between the two curves. While I′ > C′, the next unit brings in more than it costs and the gap grows. When I′ = C′ the gap is largest; from there on, each unit brings a loss.'
        )
    },
    {
        id: 'average',
        stage: 'optimization',
        lessonTopic: 'min-average',
        title: say('Batez besteko kostu minimoa', 'Coste medio mínimo', 'أصغر متوسط تكلفة', 'The lowest average cost'),
        observe: say(
            'Hurrengo unitatea batez bestekoa baino merkeagoa bada, batez bestekoa jaitsi egiten da; garestiagoa bada, igo. Horregatik bi kurbak minimoan gurutzatzen dira: han C′ = M.',
            'Si la unidad siguiente es más barata que la media, la media baja; si es más cara, sube. Por eso las dos curvas se cruzan en el mínimo: allí C′ = M.',
            'إذا كانت الوحدة التالية أرخص من المتوسط انخفض المتوسط، وإذا كانت أغلى ارتفع. لذلك يتقاطع المنحنيان عند القيمة الصغرى: هناك C′ = M.',
            'If the next unit is cheaper than the average, the average goes down; if dearer, it goes up. That is why the two curves cross at the minimum: there C′ = M.'
        )
    },
    {
        id: 'price',
        stage: 'optimization',
        lessonTopic: 'max-income',
        title: say('Diru gehien ematen duen prezioa', 'El precio que más ingresa', 'السعر الذي يعطي أكبر إيراد', 'The price that brings in most'),
        observe: say(
            'Prezioa igotzean, bezero bakoitzak gehiago ordaintzen du, baina bezero gutxiago daude. Hasieran lehen efektuak irabazten du eta diru-sarrerak igo egiten dira; gero bigarrenak. Gailurra I′ = 0 den tokian dago.',
            'Al subir el precio, cada cliente paga más, pero hay menos clientes. Al principio gana el primer efecto y los ingresos suben; después, el segundo. La cima está donde I′ = 0.',
            'عند رفع السعر يدفع كل زبون أكثر لكن يقل عدد الزبائن. في البداية يغلب الأثر الأول فيرتفع الإيراد، ثم يغلب الثاني. والقمة حيث I′ = 0.',
            'When the price goes up, each customer pays more, but there are fewer customers. At first the first effect wins and the income rises; then the second. The peak is where I′ = 0.'
        )
    }
]

export const bach2gApplicationsLabToolForTopic: Record<string, Bach2gApplicationsLabToolId | undefined> = {
    sign: 'sign',
    intervals: 'sign',
    'growth-context': 'sign',
    relative: 'sign',
    absolute: 'box',
    'second-sign': 'curvature',
    'inflection-tangent': 'curvature',
    inflection: 'curvature',
    'max-profit': 'profit',
    'min-average': 'average',
    'max-income': 'price'
}

export const bach2gApplicationsLabChallengeIds: number[] = [
    signChallenges,
    boxChallenges,
    curveChallenges,
    profitChallenges,
    averageChallenges,
    priceChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
