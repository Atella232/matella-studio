import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { boxChallenges } from '../../batx1-zientziak-aplikazioak/lab/box.ts'
import { curveChallenges } from '../../batx1-zientziak-aplikazioak/lab/curvature.ts'
import { bachApplicationsLabTools } from '../../batx1-zientziak-aplikazioak/lab/labTools.ts'
import { signChallenges } from '../../batx1-zientziak-aplikazioak/lab/sign.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import type { Bach2ApplicationsStageId } from '../lessons.tsx'
import { distanceChallenges } from './distance.ts'
import { hopitalChallenges } from './hopitalLens.ts'
import { meanChallenges } from './meanValue.ts'
import { rolleChallenges } from './rolle.ts'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 2 · Zientziak — the tools of the
   laboratory: four of this unit (Rolle looks for the point, the secant
   and its parallel tangent, L'Hôpital up close and the shortest distance
   to a curve) and three of Aplikazioak 1.º (the traffic light of f′,
   concavity with the tangent and the box without a lid), with their own
   challenges and ids; their progress is kept under this unit's storage
   prefix. Tests in tests/aplikazioak-batx2z-lab.test.ts.
   ========================================================================== */

export type Bach2ApplicationsLabToolId = 'sign' | 'curvature' | 'rolle' | 'mean' | 'hopital' | 'distance' | 'box'

export interface Bach2ApplicationsLabTool extends LabToolInfo {
    id: Bach2ApplicationsLabToolId
    stage: Bach2ApplicationsStageId
}

const from = (id: string) => bachApplicationsLabTools.find((tool) => tool.id === id)!

export const bach2ApplicationsLabTools: Bach2ApplicationsLabTool[] = [
    { ...from('sign'), id: 'sign', stage: 'review', lessonTopic: 'monotony-review' },
    { ...from('curvature'), id: 'curvature', stage: 'review', lessonTopic: 'curvature-review' },
    {
        id: 'rolle',
        stage: 'rolle',
        lessonTopic: 'rolle',
        title: say('Rollek puntua bilatzen du', 'Rolle busca el punto', 'رول يبحث عن النقطة', 'Rolle looks for the point'),
        observe: say(
            'Funtzio jarraitu eta leun batek altuera bera badu a eta b muturretan, gutxienez puntu batean zuzen ukitzailea horizontala da, eta batzuetan bat baino gehiagotan. Punta batekin edo jauzi batekin, puntu hori desager daiteke: horregatik behar dira hiru hipotesiak.',
            'Si una función continua y suave tiene la misma altura en a y en b, en algún punto la tangente es horizontal, y a veces en más de uno. Con un pico o un salto, ese punto puede desaparecer: por eso hacen falta las tres hipótesis.',
            'إذا كان لدالة متصلة وملساء الارتفاع نفسه عند a وb، ففي نقطة ما يكون المماس أفقيًّا، وأحيانًا في أكثر من نقطة. ومع زاوية أو قفزة قد تختفي تلك النقطة: لذلك تلزم الفرضيات الثلاث.',
            'If a continuous, smooth function has the same height at a and at b, at some point the tangent is horizontal, and sometimes at more than one. With a corner or a jump, that point can vanish: that is why the three hypotheses are needed.'
        )
    },
    {
        id: 'mean',
        stage: 'rolle',
        lessonTopic: 'mean-value',
        title: say('Ebakitzailea eta haren zuzen ukitzaile paraleloa', 'La secante y su tangente paralela', 'القاطع ومماسه الموازي', 'The secant and its parallel tangent'),
        observe: say(
            'a eta b arteko ebakitzailearen malda batez besteko aldakuntza da, eta tarteko puntu batean zuzen ukitzaileak malda bera du. Parabolan puntu hori erdian dago beti; kurba ∪ bada, b muturretik hurbilago; ∩ bada, a muturretik hurbilago.',
            'La pendiente de la secante entre a y b es la variación media, y en algún punto intermedio la tangente tiene la misma pendiente. En la parábola ese punto está siempre en el medio; si la curva es ∪, más cerca de b; si es ∩, más cerca de a.',
            'ميل القاطع بين a وb هو التغير المتوسط، وفي نقطة وسيطة ما يكون للمماس الميل نفسه. في القطع المكافئ تقع تلك النقطة دائمًا في المنتصف؛ وإذا كان المنحنى ∪ فهي أقرب إلى b، وإذا كان ∩ فأقرب إلى a.',
            'The slope of the secant between a and b is the average rate of change, and at some point in between the tangent has the same slope. For the parabola that point is always in the middle; if the curve is ∪, nearer b; if it is ∩, nearer a.'
        )
    },
    {
        id: 'hopital',
        stage: 'hopital',
        lessonTopic: 'hopital',
        title: say('L\'Hôpital hurbiletik', 'L\'Hôpital de cerca', 'لوبيتال عن قرب', 'L\'Hôpital up close'),
        observe: say(
            '0/0 denean, f/g eta f′/g′ zatidurak balio berera hurbiltzen dira x puntua a puntura hurbildu ahala, bi aldeetatik. Ez badago indeterminaziorik, deribatuen zatidurak beste balio bat ematen du: L\'Hôpital ezin da erabili.',
            'Con 0/0, los cocientes f/g y f′/g′ se acercan al mismo valor cuando x se acerca a a, por los dos lados. Si no hay indeterminación, el cociente de las derivadas da otro valor: L\'Hôpital no se puede usar.',
            'مع 0/0 يقترب خارجا القسمة f/g وf′/g′ من القيمة نفسها كلما اقتربت x من a، من الجهتين. وإذا لم يوجد عدم تعيين أعطى خارج قسمة المشتقتين قيمة أخرى: لا يمكن استعمال لوبيتال.',
            'With 0/0, the quotients f/g and f′/g′ approach the same value as x approaches a, from both sides. If there is no indeterminate form, the quotient of the derivatives gives another value: L\'Hôpital cannot be used.'
        )
    },
    {
        id: 'distance',
        stage: 'optimization',
        lessonTopic: 'distances',
        title: say('Kurba baterainoko distantzia minimoa', 'La distancia mínima a una curva', 'المسافة الصغرى إلى منحنى', 'The shortest distance to a curve'),
        observe: say(
            'Q kurban zehar mugitzean, d(x) distantzia jaitsi eta igo egiten da. Punturik hurbilenean d(x) minimoa da, eta PQ zuzenkia zuzen ukitzailearekiko perpendikularra da: normalaren gainean dago.',
            'Al mover Q por la curva, la distancia d(x) baja y sube. En el punto más cercano d(x) es mínima y el segmento PQ es perpendicular a la tangente: va por la normal.',
            'عند تحريك Q على المنحنى تنخفض المسافة d(x) ثم ترتفع. وعند أقرب نقطة تكون d(x) صغرى، وتكون القطعة PQ عمودية على المماس: أي تقع على المستقيم العمودي.',
            'As Q moves along the curve, the distance d(x) goes down and up. At the closest point d(x) is smallest and the segment PQ is perpendicular to the tangent: it lies along the normal.'
        )
    },
    { ...from('box'), id: 'box', stage: 'optimization', lessonTopic: 'areas-volumes' }
]

export const bach2ApplicationsLabToolForTopic: Record<string, Bach2ApplicationsLabToolId | undefined> = {
    'monotony-review': 'sign',
    'curvature-review': 'curvature',
    'absolute-review': 'sign',
    rolle: 'rolle',
    'roots-count': 'rolle',
    'mean-value': 'mean',
    hopital: 'hopital',
    'hopital-products': 'hopital',
    'hopital-powers': 'hopital',
    'extreme-condition': 'sign',
    'inflection-condition': 'curvature',
    'areas-volumes': 'box',
    distances: 'distance',
    'contexts-interval': 'box'
}

export const bach2ApplicationsLabChallengeIds: number[] = [
    signChallenges,
    curveChallenges,
    rolleChallenges,
    meanChallenges,
    hopitalChallenges,
    distanceChallenges,
    boxChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
