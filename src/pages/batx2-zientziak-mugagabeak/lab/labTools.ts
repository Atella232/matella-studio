import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { chainChallenges } from '../../batx1-zientziak-deribatuak/lab/chain.ts'
import { bachDerivativesLabTools } from '../../batx1-zientziak-deribatuak/lab/labTools.ts'
import { slopeChallenges } from '../../batx1-zientziak-deribatuak/lab/slopeGraph.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import type { Bach2IndefiniteStageId } from '../lessons.tsx'
import { constantsChallenges } from './constants.ts'
import { fractionChallenges } from './fractions.ts'
import { partsChallenges } from './parts.ts'

/* ==========================================================================
   Integral mugagabeak (Batxilergoa 2 · Zientziak) laboratory. Three tools
   of its own: choose u and dv (by parts, with the chain of integrals that
   gets easier, harder or comes back), partial fractions (the pieces laid
   over the rational function until they match) and two constants (f″
   given: k₁ tilts and k₂ lifts the curve until it goes through P with the
   slope asked for). Borrowed from Deribatuak of 1.º with their challenges
   and ids (progress is kept apart, under this unit's storage prefix): the
   graph of f′, read backwards, and the chain of machines, which
   substitution undoes. Tests in tests/mugagabeak-batx2z-lab.test.ts.
   ========================================================================== */

export type Bach2IndefiniteLabToolId = 'slope-graph' | 'parts' | 'fractions' | 'chain' | 'constants'

export interface Bach2IndefiniteLabTool extends LabToolInfo {
    id: Bach2IndefiniteLabToolId
    stage: Bach2IndefiniteStageId
}

const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const bach2IndefiniteLabTools: Bach2IndefiniteLabTool[] = [
    { ...from(bachDerivativesLabTools, 'slope-graph'), id: 'slope-graph', stage: 'review', lessonTopic: 'table' },
    {
        id: 'parts',
        stage: 'parts',
        lessonTopic: 'by-parts',
        title: say('Aukeratu u eta dv', 'Elige u y dv', 'اختر u و dv', 'Choose u and dv'),
        observe: say(
            'Deribatzean sinplifikatzen dena u gisa hartzen bada (polinomio bat, logaritmo bat), integral berria errazagoa da, eta polinomioaren maila jaitsi egiten da zenbaki bat izan arte. Alderantziz hartzen bada, maila igo egiten da. Esponentziala bider sinua kasuan, ez bata ez bestea ez da sinplifikatzen: bi urratsen ondoren I bera itzultzen da, eta ekuazio batean bezala askatzen da.',
            'Si se toma como u lo que se simplifica al derivar (un polinomio, un logaritmo), la integral nueva es más fácil y el grado del polinomio baja hasta quedar un número. Si se toma al revés, el grado sube. Con una exponencial por un seno no se simplifica ninguno: tras dos pasos vuelve la misma I, y se despeja como en una ecuación.',
            'إذا أخذنا u ما يبسط بالاشتقاق (كثير حدود أو لوغاريتم) صار التكامل الجديد أسهل ونزلت درجة كثير الحدود حتى يبقى عدد. وإذا أخذناه بالعكس ارتفعت الدرجة. ومع دالة أسية في جيب لا يبسط أيّ منهما: بعد خطوتين يعود I نفسه ونجده كما في معادلة.',
            'If you take as u what gets simpler when differentiated (a polynomial, a logarithm), the new integral is easier and the degree of the polynomial goes down until a number is left. The other way round, the degree goes up. With an exponential times a sine neither gets simpler: after two steps the same I comes back, and you solve for it as in an equation.'
        )
    },
    {
        id: 'fractions',
        stage: 'rational',
        lessonTopic: 'simple-roots',
        title: say('Zatiki sinpleak', 'Fracciones simples', 'الكسور البسيطة', 'Partial fractions'),
        observe: say(
            'A eta B zuzenak direnean, zatiki sinpleen batura funtzio arrazionalaren gainean jartzen da puntu guztietan: hori da deskonposizioa. A ateratzeko, estali erro horren faktorea eta ordeztu x erroarekin. Erro bikoitzean bi zatiki daude, bata berretura gisa integratzen dena.',
            'Cuando A y B son los buenos, la suma de las fracciones simples se pone encima de la función racional en todos sus puntos: esa es la descomposición. Para sacar A, tapa el factor de su raíz y sustituye x por esa raíz. Con una raíz doble hay dos fracciones, y una se integra como potencia.',
            'عندما يكون A و B صحيحين ينطبق مجموع الكسور البسيطة على الدالة الكسرية في كل نقاطها: هذا هو التفكيك. ولإيجاد A غطِّ عامل جذره وعوّض x بذلك الجذر. ومع جذر مضاعف يوجد كسران، أحدهما يُكامل كقوة.',
            'When A and B are right, the sum of the partial fractions lies on top of the rational function at every point: that is the decomposition. To get A, cover the factor of its root and put that root in for x. With a double root there are two fractions, and one is integrated as a power.'
        )
    },
    { ...from(bachDerivativesLabTools, 'chain'), id: 'chain', stage: 'substitution', lessonTopic: 'change' },
    {
        id: 'constants',
        stage: 'strategy',
        lessonTopic: 'conditions',
        title: say('Bi konstante', 'Dos constantes', 'ثابتان', 'Two constants'),
        observe: say(
            'f″ ezaguna bada, f funtzioak bi konstante ditu: k₁ konstanteak kurba okertzen du eta malda aldatzen, eta k₂ konstanteak kurba osoa igo edo jaisten du, malda aldatu gabe. Horregatik bi datu behar dira: malda batek k₁ finkatzen du, eta puntu batek k₂.',
            'Si se conoce f″, f tiene dos constantes: k₁ inclina la curva y cambia la pendiente, y k₂ sube o baja toda la curva sin cambiar la pendiente. Por eso hacen falta dos datos: una pendiente fija k₁ y un punto fija k₂.',
            'إذا عُرفت f″ كان لـ f ثابتان: k₁ يُميل المنحنى ويغيّر الميل، و k₂ يرفع المنحنى كله أو يخفضه دون تغيير الميل. لذلك تلزم معلومتان: الميل يحدد k₁ والنقطة تحدد k₂.',
            'If f″ is known, f has two constants: k₁ tilts the curve and changes the slope, and k₂ moves the whole curve up or down without changing the slope. That is why you need two facts: a slope fixes k₁ and a point fixes k₂.'
        )
    }
]

export const bach2IndefiniteLabToolForTopic: Record<string, Bach2IndefiniteLabToolId | undefined> = {
    table: 'slope-graph',
    composed: 'chain',
    'composed-arcs': 'chain',
    'by-parts': 'parts',
    'parts-twice': 'parts',
    'log-arcs': 'parts',
    division: 'fractions',
    'simple-roots': 'fractions',
    'double-roots': 'fractions',
    'no-roots': 'fractions',
    change: 'chain',
    'roots-exp': 'chain',
    'trig-powers': 'chain',
    choose: 'parts',
    conditions: 'constants'
}

export const bach2IndefiniteLabChallengeIds: number[] = [
    slopeChallenges,
    partsChallenges,
    fractionChallenges,
    chainChallenges,
    constantsChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
