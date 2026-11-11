import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { bachApplicationsLabTools } from '../../batx1-zientziak-aplikazioak/lab/labTools.ts'
import { layerChallenges } from '../../batx1-zientziak-aplikazioak/lab/layers.ts'
import { bachFunctionsLabTools } from '../../batx1-zientziak-funtzioak/lab/labTools.ts'
import { transformChallenges } from '../../batx1-zientziak-funtzioak/lab/transform.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import type { Bach2SketchStageId } from '../lessons.tsx'
import { asymptoteChallenges } from './asymptote.ts'
import { derivativeChallenges } from './fromDerivative.ts'
import { mirrorChallenges } from './mirror.ts'
import { symmetryChallenges } from './symmetry.ts'

/* ==========================================================================
   Funtzioen adierazpena · Batxilergoa 2 · Zientziak — the tools of the
   laboratory: four of this unit (the curve and its asymptote, the mirror
   of the absolute value, from f′ to f, and symmetry and period), «Build
   the graph» of Aplikazioak 1.º and «The transformation workshop» of
   Funtzioak 1.º, with their own challenges and ids; their progress is
   kept under this unit's storage prefix. Tests in
   tests/adierazpena-batx2z-lab.test.ts.
   ========================================================================== */

export type Bach2SketchLabToolId = 'layers' | 'asymptote' | 'symmetry' | 'transform' | 'mirror' | 'derivative'

export interface Bach2SketchLabTool extends LabToolInfo {
    id: Bach2SketchLabToolId
    stage: Bach2SketchStageId
}

const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const bach2SketchLabTools: Bach2SketchLabTool[] = [
    { ...from(bachApplicationsLabTools, 'layers'), id: 'layers', stage: 'review', lessonTopic: 'sketch-plan' },
    {
        id: 'asymptote',
        stage: 'study',
        lessonTopic: 'asymptote-position',
        title: say('Kurba eta haren asintota', 'La curva y su asíntota', 'المنحنى ومقاربه', 'The curve and its asymptote'),
        observe: say(
            'Kurbaren eta asintotaren arteko kendurak zeinua du: positiboa bada, kurba gainetik doa; negatiboa bada, azpitik. Urrundu ahala, kendura zerora hurbiltzen da, baina kurbak asintota ebaki dezake: horizontal edo zeihar batekin ez dago debekatuta.',
            'La diferencia entre la curva y la asíntota tiene signo: si es positiva, la curva va por encima; si es negativa, por debajo. Al alejarte, la diferencia se acerca a cero, pero la curva puede cortar a la asíntota: con una horizontal u oblicua no está prohibido.',
            'للفرق بين المنحنى والمقارب إشارة: إذا كان موجبًا فالمنحنى فوقه، وإذا كان سالبًا فتحته. وكلما ابتعدت اقترب الفرق من الصفر، لكن المنحنى قد يقطع المقارب: فهذا غير ممنوع مع المقارب الأفقي أو المائل.',
            'The difference between the curve and the asymptote has a sign: if it is positive, the curve runs above; if it is negative, below. As you move away, the difference gets close to zero, but the curve can cross the asymptote: with a horizontal or oblique one it is not forbidden.'
        )
    },
    {
        id: 'symmetry',
        stage: 'study',
        lessonTopic: 'symmetry-period',
        title: say('Simetria eta periodoa', 'Simetría y periodo', 'التناظر والدور', 'Symmetry and period'),
        observe: say(
            'Y ardatzeko islapena kurbaren gainean erortzen bada, funtzioa bikoitia da; jatorriko islapena erortzen bada, bakoitia. T desplazatutako kopia erortzen bada, T periodo bat da, eta haren multiploak ere bai.',
            'Si el reflejo en el eje Y cae sobre la curva, la función es par; si cae el reflejo respecto del origen, impar. Si cae la copia desplazada T, T es un periodo, y sus múltiplos también.',
            'إذا وقع الانعكاس في المحور Y على المنحنى فالدالة زوجية، وإذا وقع الانعكاس بالنسبة إلى الأصل ففردية. وإذا وقعت النسخة المزاحة بمقدار T فإن T دور، وكذلك مضاعفاته.',
            'If the reflection in the Y axis falls on the curve, the function is even; if the reflection through the origin does, it is odd. If the copy shifted by T does, T is a period, and so are its multiples.'
        )
    },
    { ...from(bachFunctionsLabTools, 'transform'), id: 'transform', stage: 'roots', lessonTopic: 'root-functions' },
    {
        id: 'mirror',
        stage: 'reading',
        lessonTopic: 'absolute-graphs',
        title: say('Balio absolutuaren ispilua', 'El espejo del valor absoluto', 'مرآة القيمة المطلقة', 'The mirror of the absolute value'),
        observe: say(
            '|f(x)| funtzioak X ardatzaren azpikoa gora islatzen du, eta punta bat agertzen da f funtzioak zeinua aldatzen duen zero bakoitzean. f(|x|) funtzioak eskuineko zatia ezkerrera kopiatzen du: bikoitia da, eta punta bat du 0 puntuan, f′(0) zero ez bada.',
            '|f(x)| refleja hacia arriba lo que está bajo el eje X, y aparece un pico en cada cero donde f cambia de signo. f(|x|) copia a la izquierda la parte derecha: es par, y tiene un pico en 0 si f′(0) no es cero.',
            'تعكس |f(x)| ما تحت المحور X إلى الأعلى، وتظهر زاوية عند كل صفر تغيّر فيه f إشارتها. وتنسخ f(|x|) الجزء الأيمن إلى اليسار: فهي زوجية، ولها زاوية عند 0 إذا لم تكن f′(0) صفرًا.',
            '|f(x)| reflects upwards what is below the X axis, and a corner appears at each zero where f changes sign. f(|x|) copies the right-hand part to the left: it is even, and it has a corner at 0 if f′(0) is not zero.'
        )
    },
    {
        id: 'derivative',
        stage: 'reading',
        lessonTopic: 'derivative-graph',
        title: say('f′ grafikotik f grafikora', 'De f′ a f', 'من f′ إلى f', 'From f′ to f'),
        observe: say(
            'f′ ardatzaren gainean dagoen tokian, f igotzen da; azpian dagoen tokian, jaisten da. f′ deribatuak ardatza zeinua aldatuz ebakitzen duen tokian f funtzioak mutur bat du, eta f′ deribatuak buelta ematen duen tokian, inflexio bat. C aldatzeak f gora edo behera eramaten du soilik.',
            'Donde f′ está encima del eje, f sube; donde está debajo, baja. Donde f′ corta el eje cambiando de signo, f tiene un extremo, y donde f′ da la vuelta, una inflexión. Cambiar C solo sube o baja f.',
            'حيث تكون f′ فوق المحور تصعد f، وحيث تكون تحته تنزل. وحيث تقطع f′ المحور مغيّرة إشارتها يكون لـ f قيمة قصوى، وحيث تنعطف f′ يكون لـ f انعطاف. وتغيير C يرفع f أو يخفضها فقط.',
            'Where f′ is above the axis, f goes up; where it is below, it goes down. Where f′ crosses the axis changing sign, f has an extremum, and where f′ turns back, an inflection. Changing C only moves f up or down.'
        )
    }
]

export const bach2SketchLabToolForTopic: Record<string, Bach2SketchLabToolId | undefined> = {
    'sketch-plan': 'layers',
    'asymptotes-review': 'asymptote',
    'rational-review': 'layers',
    'symmetry-period': 'symmetry',
    'asymptote-position': 'asymptote',
    'domain-edges': 'transform',
    'exp-products': 'layers',
    'exp-special': 'transform',
    'root-functions': 'transform',
    'trig-functions': 'symmetry',
    'piecewise-graphs': 'mirror',
    'absolute-graphs': 'mirror',
    'derivative-graph': 'derivative',
    'curve-from-data': 'asymptote'
}

export const bach2SketchLabChallengeIds: number[] = [
    layerChallenges,
    asymptoteChallenges,
    symmetryChallenges,
    transformChallenges,
    mirrorChallenges,
    derivativeChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
