import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { domainsChallenges, functionsAkLabTools, joinChallenges } from '../../dbh4-akademikoak-funtzioak/lab/labTools.ts'
import { absoluteChallenges, fitChallenges, polynomialAkLabTools } from '../../dbh4-akademikoak-polinomikoak/lab/labTools.ts'
import { frameChallenges, graphsLabTools, hyperbolaChallenges, parabolaChallenges, pointSlopeChallenges, rootChallenges } from '../../dbh4-aplikatuak-grafikoa/lab/labTools.ts'
import type { SocFunctionsStageId } from '../lessons.tsx'
import { say } from '../text.ts'
import { averageChallenges } from './average.ts'
import { estimateChallenges } from './estimate.ts'
import { priceChallenges } from './price.ts'

/* ==========================================================================
   Funtzio elementalak (Batxilergoa 1 · Gizarte Zientziak) laboratory.
   Three tools of its own, for the economic side of the topic: estimating
   between two or three data (interpolation and extrapolation, the line and
   Newton's parabola), the price that brings in the most (the revenue
   rectangle and its parabola) and the average cost falling towards the
   cost per unit. The review comes from 4. DBH with its challenges and ids
   (progress is kept apart, under this unit's storage prefix): build the
   domain, the frame of greatest area, point and slope, the parabola, a
   parabola from its roots, the hyperbola, the root, join two pieces and
   fold the absolute value. Tests in tests/funtzioak-batx1g-lab.test.ts.
   ========================================================================== */

export type SocFunctionsLabToolId = 'domains' | 'frame' | 'estimate' | 'point-slope' | 'price' | 'parabola' | 'fit' | 'average' | 'hyperbola' | 'root' | 'join' | 'absolute'

export interface SocFunctionsLabTool extends LabToolInfo {
    id: SocFunctionsLabToolId
    stage: SocFunctionsStageId
}

const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const socFunctionsLabTools: SocFunctionsLabTool[] = [
    { ...from(functionsAkLabTools, 'domains'), id: 'domains', stage: 'families', lessonTopic: 'domain' },
    { ...from(graphsLabTools, 'frame'), id: 'frame', stage: 'families', lessonTopic: 'context-domain' },
    {
        id: 'estimate',
        stage: 'linear',
        lessonTopic: 'interpolation',
        title: say('Bi (edo hiru) datuen artean', 'Entre dos (o tres) datos', 'بين بيانتين (أو ثلاث)', 'Between two (or three) data'),
        observe: say(
            'Datuen artean estimatzea interpolatzea da, eta zuzenak eta parabolak ia gauza bera ematen dute. Datuetatik kanpo, estrapolatzea da: zenbat eta urrunago joan, orduan eta gehiago bereizten dira, eta orduan eta fidagarritasun txikiagoa dute.',
            'Estimar entre los datos es interpolar, y la recta y la parábola dan casi lo mismo. Fuera de los datos es extrapolar: cuanto más lejos, más se separan y menos fiables son.',
            'التقدير بين البيانات استيفاء، ويعطي المستقيم والقطع المكافئ الشيء نفسه تقريبًا. وخارج البيانات استقراء خارجي: كلما ابتعدنا افترقا أكثر وقلّت الثقة بهما.',
            'Estimating between the data is interpolating, and the line and the parabola give almost the same. Outside the data it is extrapolating: the further you go, the more they split and the less reliable they are.'
        )
    },
    { ...from(graphsLabTools, 'point-slope'), id: 'point-slope', stage: 'linear', lessonTopic: 'line' },
    {
        id: 'price',
        stage: 'quadratic',
        lessonTopic: 'optimum',
        title: say('Gehien ematen duen prezioa', 'El precio que más da', 'السعر الذي يعطي أكثر', 'The price that brings in most'),
        observe: say(
            'Prezioa igotzean gutxiago saltzen da. Laukizuzena prezioa bider kopurua da: diru-sarrerak. Merkeegi, diru gutxi; garestiegi, salmenta gutxi. Erdian, parabolaren erpinean, dago diru-sarrerarik handiena.',
            'Al subir el precio se vende menos. El rectángulo es precio por cantidad: los ingresos. Demasiado barato, poco dinero; demasiado caro, pocas ventas. En medio, en el vértice de la parábola, están los mayores ingresos.',
            'عندما يرتفع السعر تقل المبيعات. المستطيل هو السعر في الكمية: الإيرادات. رخيص جدًّا: مال قليل، وغالٍ جدًّا: مبيعات قليلة. وفي الوسط، عند رأس القطع المكافئ، أكبر الإيرادات.',
            'When the price goes up, less is sold. The rectangle is price times quantity: the revenue. Too cheap, little money; too dear, few sales. In between, at the vertex of the parabola, is the greatest revenue.'
        )
    },
    { ...from(graphsLabTools, 'parabola'), id: 'parabola', stage: 'quadratic', lessonTopic: 'parabola' },
    { ...from(polynomialAkLabTools, 'fit'), id: 'fit', stage: 'quadratic', lessonTopic: 'three-points' },
    {
        id: 'average',
        stage: 'inverse',
        lessonTopic: 'average-cost',
        title: say('Batez besteko kostua', 'Coste medio', 'التكلفة المتوسطة', 'Average cost'),
        observe: say(
            'Unitate bakoitzaren kostua bi zatitan banatzen da: unitateko kostua eta kostu finkoaren zatia. Zenbat eta gehiago ekoitzi, orduan eta txikiagoa da zati hori, baina inoiz ez da 0: batez besteko kostua unitateko kosturantz jaisten da, iritsi gabe.',
            'El coste de cada unidad tiene dos partes: el coste por unidad y su parte del coste fijo. Cuanto más se produce, más pequeña es esa parte, pero nunca llega a 0: el coste medio baja hacia el coste por unidad sin alcanzarlo.',
            'لتكلفة كل وحدة جزآن: تكلفة الوحدة ونصيبها من التكلفة الثابتة. وكلما زاد الإنتاج صغر هذا النصيب، لكنه لا يبلغ 0 أبدًا: تنخفض التكلفة المتوسطة نحو تكلفة الوحدة دون أن تبلغها.',
            'The cost of each unit has two parts: the cost per unit and its share of the fixed cost. The more is made, the smaller that share, but it never reaches 0: the average cost falls towards the cost per unit without reaching it.'
        )
    },
    { ...from(graphsLabTools, 'hyperbola'), id: 'hyperbola', stage: 'inverse', lessonTopic: 'inverse-prop' },
    { ...from(graphsLabTools, 'root'), id: 'root', stage: 'inverse', lessonTopic: 'root' },
    { ...from(functionsAkLabTools, 'join'), id: 'join', stage: 'piecewise', lessonTopic: 'piecewise' },
    { ...from(polynomialAkLabTools, 'absolute'), id: 'absolute', stage: 'piecewise', lessonTopic: 'absolute' }
]

export const socFunctionsLabToolForTopic: Record<string, SocFunctionsLabToolId | undefined> = {
    domain: 'domains',
    'context-domain': 'frame',
    line: 'point-slope',
    interpolation: 'estimate',
    'linear-models': 'estimate',
    parabola: 'parabola',
    optimum: 'price',
    'three-points': 'estimate',
    'inverse-prop': 'hyperbola',
    'average-cost': 'average',
    root: 'root',
    piecewise: 'join',
    'piecewise-model': 'join',
    absolute: 'absolute'
}

export const socFunctionsLabChallengeIds: number[] = [
    domainsChallenges,
    frameChallenges,
    estimateChallenges,
    pointSlopeChallenges,
    priceChallenges,
    parabolaChallenges,
    fitChallenges,
    averageChallenges,
    hyperbolaChallenges,
    rootChallenges,
    joinChallenges,
    absoluteChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
