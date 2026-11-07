import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { compositionChallenges } from '../../batx1-zientziak-funtzioak/lab/composition.ts'
import { bachFunctionsLabTools } from '../../batx1-zientziak-funtzioak/lab/labTools.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { functionsAkLabTools } from '../../dbh4-akademikoak-funtzioak/lab/labTools.ts'
import { rateChallenges } from '../../dbh4-aplikatuak-funtzioak/lab/labTools.ts'
import type { BachDerivativesStageId } from '../lessons.tsx'
import { chainChallenges } from './chain.ts'
import { secantChallenges } from './secant.ts'
import { slopeChallenges } from './slopeGraph.ts'
import { smoothChallenges } from './smooth.ts'

/* ==========================================================================
   Deribatuak (Batxilergoa 1 · Zientziak) laboratory. Four tools of its own:
   from the secant to the tangent (Q slides towards P and the slope of the
   secant settles on f′(a)), is it differentiable here? (a curved piece
   and a line, moved until there is no jump and no corner), the graph of
   f′ (a probe walks along f and draws its slope below) and the chain of
   machines (a small piece stretched by each machine in turn). Borrowed
   with their challenges and ids (progress is kept apart, under this
   unit's storage prefix): the average rate from 4. DBH and the two
   machines in a row from Funtzio elementalak. Tests in
   tests/deribatuak-batx1z-lab.test.ts.
   ========================================================================== */

export type BachDerivativesLabToolId = 'secant' | 'rate' | 'smooth' | 'slope-graph' | 'chain' | 'composition'

export interface BachDerivativesLabTool extends LabToolInfo {
    id: BachDerivativesLabToolId
    stage: BachDerivativesStageId
}

const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const bachDerivativesLabTools: BachDerivativesLabTool[] = [
    { ...from(functionsAkLabTools, 'rate'), id: 'rate', stage: 'rate', lessonTopic: 'average-rate' },
    {
        id: 'secant',
        stage: 'rate',
        lessonTopic: 'derivative-point',
        title: say('Ebakitzailetik zuzen ukitzailera', 'De la secante a la tangente', 'من القاطع إلى المماس', 'From the secant to the tangent'),
        observe: say(
            'Q puntua P puntura hurbiltzean, ebakitzaileak biratu egiten du, eta haren malda gero eta gehiago hurbiltzen da balio batera: zuzen ukitzailearen malda, f′(a). Gorantz irekitzen den kurban, zuzen ukitzailea ebakitzailea baino maldatsu gutxiago da; beherantz irekitzen denean, maldatsuago.',
            'Al acercar Q a P, la secante gira y su pendiente se acerca cada vez más a un valor: la pendiente de la tangente, f′(a). En una curva que se abre hacia arriba, la tangente es menos empinada que la secante; si se abre hacia abajo, más.',
            'عند تقريب Q من P يدور القاطع ويقترب ميله شيئًا فشيئًا من قيمة: ميل المماس f′(a). وفي منحنٍ مفتوح إلى الأعلى يكون المماس أقل انحدارًا من القاطع، وفي المفتوح إلى الأسفل أكثر.',
            'As Q moves towards P, the secant turns and its slope gets closer and closer to one value: the slope of the tangent, f′(a). On a curve that opens upwards the tangent is less steep than the secant; on one that opens downwards, steeper.'
        )
    },
    {
        id: 'smooth',
        stage: 'derivability',
        lessonTopic: 'piecewise-derivable',
        title: say('Deribagarria hemen?', '¿Derivable aquí?', 'قابلة للاشتقاق هنا؟', 'Differentiable here?'),
        observe: say(
            'Zuzena zatiaren amaieratik abiatzen ez bada, jauzi bat dago. Abiatzen bada baina beste malda batekin, punta bat. Balio bera eta malda bera dituenean bakarrik da funtzioa deribagarria lotunean: zuzena zatiaren zuzen ukitzailea da.',
            'Si la recta no sale del final del trozo, hay un salto. Si sale, pero con otra pendiente, un pico. Solo con el mismo valor y la misma pendiente es derivable en la unión: la recta es la tangente del trozo.',
            'إذا لم ينطلق المستقيم من نهاية الجزء فهناك قفزة. وإذا انطلق منها بميل آخر فهناك زاوية. ولا تكون الدالة قابلة للاشتقاق عند الالتقاء إلا بالقيمة نفسها والميل نفسه: المستقيم هو مماس الجزء.',
            'If the line does not start at the end of the piece, there is a jump. If it does, but with another slope, a corner. Only with the same value and the same slope is it differentiable at the join: the line is the tangent of the piece.'
        )
    },
    {
        id: 'slope-graph',
        stage: 'function',
        lessonTopic: 'definition',
        title: say('f′ funtzioaren grafikoa', 'La gráfica de f′', 'رسم f′', 'The graph of f′'),
        observe: say(
            'Zundak puntu bakoitzean irakurtzen duen malda beheko planoan marrazten da: hori da f′ funtzioaren grafikoa. f igotzen den tokian f′ ardatzaren gainean dago; jaisten den tokian, azpian; eta zuzen ukitzailea horizontala denean, f′ funtzioak ardatza mozten du.',
            'La pendiente que la sonda lee en cada punto se dibuja en el plano de abajo: es la gráfica de f′. Donde f sube, f′ está por encima del eje; donde baja, por debajo; y donde la tangente es horizontal, f′ corta el eje.',
            'الميل الذي يقرؤه المسبار عند كل نقطة يُرسم في المستوى السفلي: إنه رسم f′. حيث تصعد f يكون f′ فوق المحور، وحيث تنزل تحته، وحيث يكون المماس أفقيًّا يقطع f′ المحور.',
            'The slope the probe reads at each point is drawn on the lower plane: it is the graph of f′. Where f goes up, f′ is above the axis; where it goes down, below; and where the tangent is horizontal, f′ crosses the axis.'
        )
    },
    {
        id: 'chain',
        stage: 'rules',
        lessonTopic: 'chain',
        title: say('Makinen katea', 'La cadena de máquinas', 'سلسلة الآلات', 'The chain of machines'),
        observe: say(
            'Lehen makinak zati txiki bat g′(x) aldiz luzatzen du, eta bigarrenak h′(u) aldiz. Kateak, beraz, bi faktoreen biderkadura adina luzatzen du: hori da katearen erregela. Faktore bat 0 bada, zatia puntu bihurtzen da; negatiboa bada, buelta ematen du.',
            'La primera máquina estira un trozo pequeño g′(x) veces y la segunda, h′(u) veces. La cadena lo estira el producto de los dos factores: es la regla de la cadena. Si un factor es 0, el trozo se queda en un punto; si es negativo, se da la vuelta.',
            'تمدّد الآلة الأولى قطعة صغيرة g′(x) مرة، والثانية h′(u) مرة. فتمدّدها السلسلة بجداء العاملين: إنها قاعدة السلسلة. وإذا كان أحد العاملين 0 صارت القطعة نقطة، وإذا كان سالبًا انقلبت.',
            'The first machine stretches a small piece g′(x) times and the second, h′(u) times. The chain stretches it by the product of the two factors: that is the chain rule. If a factor is 0, the piece shrinks to a point; if it is negative, it flips over.'
        )
    },
    { ...from(bachFunctionsLabTools, 'composition'), id: 'composition', stage: 'rules', lessonTopic: 'chain' }
]

export const bachDerivativesLabToolForTopic: Record<string, BachDerivativesLabToolId | undefined> = {
    'average-rate': 'rate',
    'derivative-point': 'secant',
    tangent: 'secant',
    'one-sided-derivatives': 'smooth',
    'derivable-continuous': 'smooth',
    'piecewise-derivable': 'smooth',
    definition: 'slope-graph',
    powers: 'secant',
    'sum-constant': 'slope-graph',
    chain: 'chain',
    'exp-log': 'slope-graph',
    trig: 'slope-graph',
    'tangent-conditions': 'secant'
}

export const bachDerivativesLabChallengeIds: number[] = [
    rateChallenges,
    secantChallenges,
    smoothChallenges,
    slopeChallenges,
    chainChallenges,
    compositionChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
