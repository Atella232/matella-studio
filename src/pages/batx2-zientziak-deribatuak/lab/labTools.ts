import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { bachDerivativesLabTools } from '../../batx1-zientziak-deribatuak/lab/labTools.ts'
import { secantChallenges } from '../../batx1-zientziak-deribatuak/lab/secant.ts'
import { slopeChallenges } from '../../batx1-zientziak-deribatuak/lab/slopeGraph.ts'
import { smoothChallenges } from '../../batx1-zientziak-deribatuak/lab/smooth.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import type { Bach2DerivativesStageId } from '../lessons.tsx'
import { implicitChallenges } from './implicitTangent.ts'
import { mirrorChallenges } from './mirror.ts'
import { noCornerChallenges } from './noCorner.ts'
import { zoomChallenges } from './zoom.ts'

/* ==========================================================================
   Deribatuak · Batxilergoa 2 · Zientziak — the tools of the laboratory:
   four of this unit (the lens of differentiability, adjust a and b with
   no corner, the tangent to an implicit curve and the mirror of the
   inverse) and three of Deribatuak 1.º (from the secant to the tangent,
   differentiable here? and the graph of f′), with their own challenges
   and ids; their progress is kept under this unit's storage prefix.
   Tests in tests/deribatuak-batx2z-lab.test.ts.
   ========================================================================== */

export type Bach2DerivativesLabToolId = 'secant' | 'smooth' | 'zoom' | 'no-corner' | 'slope-graph' | 'mirror' | 'implicit'

export interface Bach2DerivativesLabTool extends LabToolInfo {
    id: Bach2DerivativesLabToolId
    stage: Bach2DerivativesStageId
}

const from = (id: string) => bachDerivativesLabTools.find((tool) => tool.id === id)!

export const bach2DerivativesLabTools: Bach2DerivativesLabTool[] = [
    { ...from('secant'), id: 'secant', stage: 'review', lessonTopic: 'review-tangent' },
    { ...from('smooth'), id: 'smooth', stage: 'derivability', lessonTopic: 'corners' },
    {
        id: 'zoom',
        stage: 'derivability',
        lessonTopic: 'absolute',
        title: say('Deribagarritasunaren lupa', 'La lupa de la derivabilidad', 'عدسة قابلية الاشتقاق', 'The lens of differentiability'),
        observe: say(
            'Kurba leun bat zuzen bihurtzen da hurbiltzean, eta lupako bi maldak deribatura hurbiltzen dira. Punta batek punta izaten jarraitzen du, nahiz eta asko hurbildu: maldak bi balio desberdinetara doaz. Erro batek, ordea, bertikal jartzen du kurba.',
            'Una curva suave se vuelve una recta al acercarte, y las dos pendientes de la lupa se acercan a la derivada. Un pico sigue siendo un pico por mucho que te acerques: las pendientes van a dos valores distintos. Una raíz, en cambio, pone la curva vertical.',
            'يصير المنحنى الأملس مستقيمًا عند الاقتراب، ويقترب ميلا العدسة من المشتقة. أما الزاوية فتبقى زاوية مهما اقتربت: يتجه الميلان إلى قيمتين مختلفتين. والجذر يجعل المنحنى عموديًّا.',
            'A smooth curve becomes a line as you zoom in, and the two slopes of the lens approach the derivative. A corner stays a corner however close you look: the slopes tend to two different values. A root, instead, makes the curve vertical.'
        )
    },
    {
        id: 'no-corner',
        stage: 'derivability',
        lessonTopic: 'parameters',
        title: say('Doitu a eta b: puntarik ez', 'Ajusta a y b: que no haya pico', 'اضبط a وb: بلا زاوية', 'Adjust a and b: no corner'),
        observe: say(
            'Lehenik altuerak lotu behar dira: bestela, jauzi bat dago eta zuzen ukitzaileak ez du zentzurik. Gero maldak: bi zuzen ukitzaileak bat egiten dutenean, punta desagertzen da. Bikote bakar batek betetzen ditu bi baldintzak.',
            'Primero hay que unir las alturas: si no, hay un salto y la tangente no tiene sentido. Después las pendientes: cuando las dos tangentes coinciden, el pico desaparece. Solo una pareja cumple las dos condiciones.',
            'يجب أولًا وصل الارتفاعين، وإلا فهناك قفزة ولا معنى للمماس. ثم الميلان: عندما يتطابق المماسان تختفي الزاوية. وزوج واحد فقط يحقق الشرطين.',
            'First the heights must meet: otherwise there is a jump and the tangent makes no sense. Then the slopes: when the two tangents coincide, the corner disappears. Only one pair meets both conditions.'
        )
    },
    { ...from('slope-graph'), id: 'slope-graph', stage: 'chain', lessonTopic: 'higher-order' },
    {
        id: 'mirror',
        stage: 'special',
        lessonTopic: 'inverse',
        title: say('Alderantzizkoaren ispilua', 'El espejo de la inversa', 'مرآة الدالة العكسية', 'The mirror of the inverse'),
        observe: say(
            'y = x zuzenak x eta y trukatzen ditu: P puntuko zuzen ukitzaileak m malda badu, Q puntuko islak 1/m du. f aldapatsua den tokian, alderantzizkoa leuna da; f horizontala bada, alderantzizkoa bertikal jartzen da.',
            'La recta y = x cambia x por y: si la tangente en P tiene pendiente m, su reflejo en Q tiene 1/m. Donde f es empinada, la inversa es suave; si f es horizontal, la inversa se pone vertical.',
            'يبدّل المستقيم y = x بين x وy: إذا كان ميل المماس عند P هو m فميل انعكاسه عند Q هو 1/m. وحيث تكون f شديدة الانحدار تكون العكسية لطيفة، وإذا كانت f أفقية صارت العكسية عمودية.',
            'The line y = x swaps x and y: if the tangent at P has slope m, its reflection at Q has 1/m. Where f is steep, the inverse is gentle; if f is horizontal, the inverse turns vertical.'
        )
    },
    {
        id: 'implicit',
        stage: 'tangents',
        lessonTopic: 'implicit',
        title: say('Kurba inplizituaren zuzen ukitzailea', 'La tangente a la curva implícita', 'مماس المنحنى الضمني', 'The tangent to an implicit curve'),
        observe: say(
            'y askatu gabe, deribazio inplizituak edozein puntutako malda ematen du. Zirkunferentzian, zuzen ukitzailea erradioarekiko perpendikularra da; y = 0 denean, bertikala. Kurbaren goiko eta beheko puntuetan, horizontala.',
            'Sin despejar y, la derivación implícita da la pendiente en cualquier punto. En la circunferencia, la tangente es perpendicular al radio; cuando y = 0, vertical. En los puntos más alto y más bajo, horizontal.',
            'دون استخراج y يعطي الاشتقاق الضمني الميل عند أي نقطة. في الدائرة يكون المماس عموديًّا على نصف القطر، وحين y = 0 يكون رأسيًّا. وعند أعلى نقطة وأدنى نقطة يكون أفقيًّا.',
            'Without solving for y, implicit differentiation gives the slope at any point. On the circle, the tangent is perpendicular to the radius; when y = 0, vertical. At the highest and lowest points, horizontal.'
        )
    }
]

export const bach2DerivativesLabToolForTopic: Record<string, Bach2DerivativesLabToolId | undefined> = {
    'review-tangent': 'secant',
    'review-rules': 'slope-graph',
    corners: 'smooth',
    absolute: 'zoom',
    parameters: 'no-corner',
    'higher-order': 'slope-graph',
    inverse: 'mirror',
    implicit: 'implicit'
}

export const bach2DerivativesLabChallengeIds: number[] = [
    secantChallenges,
    smoothChallenges,
    zoomChallenges,
    noCornerChallenges,
    slopeChallenges,
    mirrorChallenges,
    implicitChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
