import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { chainChallenges } from '../../batx1-zientziak-deribatuak/lab/chain.ts'
import { bachDerivativesLabTools } from '../../batx1-zientziak-deribatuak/lab/labTools.ts'
import { slopeChallenges } from '../../batx1-zientziak-deribatuak/lab/slopeGraph.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import type { BachIntegralsStageId } from '../lessons.tsx'
import { accumulateChallenges } from './accumulate.ts'
import { betweenChallenges } from './between.ts'
import { rectChallenges } from './rectangles.ts'
import { signedChallenges } from './signed.ts'

/* ==========================================================================
   Integralak (Batxilergoa 1 · Zientziak) laboratory. Four tools of its
   own: rectangles under the curve (the sums that close in on the area),
   signed area (above the axis adds, below subtracts), the area between
   two curves and the area function A(x) = ∫₀ˣ f, whose slope is f.
   Borrowed from Deribatuak with their challenges and ids (progress is
   kept apart, under this unit's storage prefix): the graph of f′, read
   backwards here (f is the slope of its antiderivative F), and the chain
   of machines, the rule that composite integrals undo. Tests in
   tests/integralak-batx1z-lab.test.ts.
   ========================================================================== */

export type BachIntegralsLabToolId = 'slope-graph' | 'chain' | 'rectangles' | 'area-function' | 'signed' | 'between'

export interface BachIntegralsLabTool extends LabToolInfo {
    id: BachIntegralsLabToolId
    stage: BachIntegralsStageId
}

const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const bachIntegralsLabTools: BachIntegralsLabTool[] = [
    { ...from(bachDerivativesLabTools, 'slope-graph'), id: 'slope-graph', stage: 'primitives', lessonTopic: 'primitive' },
    { ...from(bachDerivativesLabTools, 'chain'), id: 'chain', stage: 'compound', lessonTopic: 'chain-power' },
    {
        id: 'rectangles',
        stage: 'definite',
        lessonTopic: 'rectangles',
        title: say('Laukizuzenak kurbaren azpian', 'Rectángulos bajo la curva', 'مستطيلات تحت المنحنى', 'Rectangles under the curve'),
        observe: say(
            'Funtzioa gorakorra bada, ezkerreko altuerak laburregiak dira eta eskuinekoak luzeegiak; beherakorra bada, alderantziz. Erdiko altuera askoz hobeto hurbiltzen da, eta zuzen batean zehatza da. Laukizuzenak estutzean, batura beti hurbiltzen da azalera bera: hori da integral mugatua.',
            'Si la función crece, las alturas de la izquierda se quedan cortas y las de la derecha se pasan; si decrece, al revés. La altura del medio se acerca mucho más, y en una recta es exacta. Al estrechar los rectángulos, la suma se acerca siempre a la misma área: esa es la integral definida.',
            'إذا كانت الدالة متزايدة كانت ارتفاعات اليسار أقصر من اللازم وارتفاعات اليمين أطول، وإذا كانت متناقصة فبالعكس. وارتفاع الوسط يقترب أكثر بكثير، وفي المستقيم يكون دقيقًا. وعند تضييق المستطيلات يقترب المجموع دائمًا من المساحة نفسها: ذلك هو التكامل المحدد.',
            'If the function increases, the heights on the left fall short and those on the right overshoot; if it decreases, the other way round. The middle height comes much closer, and on a straight line it is exact. As the rectangles get narrower, the sum always closes in on the same area: that is the definite integral.'
        )
    },
    {
        id: 'area-function',
        stage: 'definite',
        lessonTopic: 'barrow',
        title: say('Azalera-funtzioa', 'La función área', 'دالة المساحة', 'The area function'),
        observe: say(
            'A(x) funtzioak 0 puntutik x punturaino pilatutako azalera neurtzen du. f positiboa den tokian A hazten da; negatiboa den tokian, jaisten da; eta f zero denean, geldi dago. Hau da, A funtzioaren malda f da: A funtzioa f funtzioaren jatorrizko bat da, eta horregatik dabil Barrow-ren erregela.',
            'A(x) mide el área acumulada desde 0 hasta x. Donde f es positiva, A crece; donde es negativa, baja; y donde f vale 0, se queda quieta. Es decir, la pendiente de A es f: A es una primitiva de f, y por eso funciona la regla de Barrow.',
            'تقيس A(x) المساحة المتراكمة من 0 إلى x. حيث f موجبة تتزايد A، وحيث سالبة تتناقص، وحيث f تساوي 0 تثبت. أي أن ميل A هو f: إن A دالة أصلية لـ f، ولهذا تنجح قاعدة بارو.',
            'A(x) measures the area piled up from 0 to x. Where f is positive, A grows; where it is negative, A goes down; and where f is 0, A stays still. That is, the slope of A is f: A is an antiderivative of f, and that is why Barrow\'s rule works.'
        )
    },
    {
        id: 'signed',
        stage: 'areas',
        lessonTopic: 'area-sign',
        title: say('Zeinudun azalera', 'Área con signo', 'المساحة ذات الإشارة', 'Signed area'),
        observe: say(
            'Ardatzaren gaineko zatiek (urdinak) integrala handitzen dute eta azpikoek (gorriak) txikitu. Horregatik integrala 0 izan daiteke, nahiz eta azalera ez izan. Azalerarako ebaki-puntuetan zatitzen da eta zati guztiak positibo gisa batzen dira. Mugak alderantzikatzean, integralak zeinua aldatzen du.',
            'Las partes sobre el eje (azules) suman en la integral y las de debajo (rojas) restan. Por eso la integral puede valer 0 aunque el área no. Para el área se parte en los cortes y todas las partes se suman en positivo. Al invertir los límites, la integral cambia de signo.',
            'الأجزاء فوق المحور (الزرقاء) تُضاف إلى التكامل والتي تحته (الحمراء) تُطرح. لذلك قد يساوي التكامل 0 مع أن المساحة لا تساويه. وللمساحة نقسم عند نقاط التقاطع ونجمع كل الأجزاء موجبة. وعند قلب الحدّين يغيّر التكامل إشارته.',
            'The parts above the axis (blue) add to the integral and those below (red) subtract. That is why the integral can be 0 even though the area is not. For the area, split at the crossings and add all the parts as positive. Swapping the limits changes the sign of the integral.'
        )
    },
    {
        id: 'between',
        stage: 'areas',
        lessonTopic: 'between-curves',
        title: say('Bi kurben arteko azalera', 'Área entre dos curvas', 'المساحة بين منحنيين', 'Area between two curves'),
        observe: say(
            'Bi kurben arteko laukizuzen bakoitzaren altuera goikoa ken behekoa da. f goian dagoen tokian (urdina) f − g positiboa da; g goian dagoen tokian (morea), negatiboa. Kurbak gurutzatzen diren tokian, zatitu egin behar da: bestela zatiak kendu egiten dira, eta integrala ez da azalera.',
            'La altura de cada rectángulo entre dos curvas es la de arriba menos la de abajo. Donde f va arriba (azul), f − g es positiva; donde va arriba g (violeta), negativa. Donde las curvas se cruzan hay que partir: si no, las partes se restan y la integral no es el área.',
            'ارتفاع كل مستطيل بين منحنيين هو الأعلى ناقص الأدنى. حيث f في الأعلى (الأزرق) يكون f − g موجبًا، وحيث g في الأعلى (البنفسجي) سالبًا. وحيث يتقاطع المنحنيان يجب التقسيم: وإلا طُرحت الأجزاء ولم يكن التكامل هو المساحة.',
            'The height of each rectangle between two curves is the top one minus the bottom one. Where f is on top (blue), f − g is positive; where g is on top (violet), negative. Where the curves cross you must split: otherwise the parts cancel and the integral is not the area.'
        )
    }
]

export const bachIntegralsLabToolForTopic: Record<string, BachIntegralsLabToolId | undefined> = {
    primitive: 'slope-graph',
    'power-rule': 'slope-graph',
    'through-point': 'area-function',
    'exp-log': 'slope-graph',
    trig: 'slope-graph',
    arcs: 'slope-graph',
    'chain-power': 'chain',
    'chain-exp-log': 'chain',
    adjust: 'chain',
    rectangles: 'rectangles',
    barrow: 'area-function',
    properties: 'signed',
    'area-axis': 'rectangles',
    'area-sign': 'signed',
    'between-curves': 'between'
}

export const bachIntegralsLabChallengeIds: number[] = [
    slopeChallenges,
    chainChallenges,
    rectChallenges,
    accumulateChallenges,
    signedChallenges,
    betweenChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
