import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { bachDerivativesLabTools } from '../../batx1-zientziak-deribatuak/lab/labTools.ts'
import { slopeChallenges } from '../../batx1-zientziak-deribatuak/lab/slopeGraph.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { functionsAkLabTools } from '../../dbh4-akademikoak-funtzioak/lab/labTools.ts'
import { explorerChallenges } from '../../dbh4-aplikatuak-funtzioak/lab/labTools.ts'
import type { BachApplicationsStageId } from '../lessons.tsx'
import { boxChallenges } from './box.ts'
import { curveChallenges } from './curvature.ts'
import { layerChallenges } from './layers.ts'
import { signChallenges } from './sign.ts'

/* ==========================================================================
   Deribatuaren aplikazioak (Batxilergoa 1 · Zientziak) laboratory. Four
   tools of its own: the traffic light of f′ (a probe paints the sign of
   f′ under the graph), the box without a lid (cut the corners of a sheet
   and watch V(x)), concavity with the tangent (the curve above, below or
   across its tangent) and build the graph (domain, intercepts,
   asymptotes, increase, concavity and curve, layer by layer). Borrowed
   with their challenges and ids (progress is kept apart, under this
   unit's storage prefix): the graph of f′ from Deribatuak and «travel
   along a graph» from 4. DBH. Tests in tests/aplikazioak-batx1z-lab.test.ts.
   ========================================================================== */

export type BachApplicationsLabToolId = 'sign' | 'slope-graph' | 'explorer' | 'curvature' | 'box' | 'layers'

export interface BachApplicationsLabTool extends LabToolInfo {
    id: BachApplicationsLabToolId
    stage: BachApplicationsStageId
}

const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const bachApplicationsLabTools: BachApplicationsLabTool[] = [
    {
        id: 'sign',
        stage: 'monotony',
        lessonTopic: 'intervals',
        title: say('f′ deribatuaren semaforoa', 'El semáforo de f′', 'إشارة f′ الضوئية', 'The traffic light of f′'),
        observe: say(
            'Zundak f′ deribatuaren zeinua margotzen du grafikoaren azpian: berdea, f gorakorra den tokian; gorria, beherakorra den tokian. Kolorea f′ = 0 den puntuetan eta izate-eremutik kanpoko puntuetan bakarrik alda daiteke. Berdetik gorrira maximoa da; gorritik berdera, minimoa; kolorea aldatzen ez bada, ez dago muturrik.',
            'La sonda pinta bajo la gráfica el signo de f′: verde donde f crece, rojo donde decrece. El color solo puede cambiar donde f′ = 0 o donde f no existe. De verde a rojo hay un máximo; de rojo a verde, un mínimo; si el color no cambia, no hay extremo.',
            'يلوّن المسبار تحت الرسم إشارة f′: الأخضر حيث تتزايد f والأحمر حيث تتناقص. ولا يتغير اللون إلا حيث f′ = 0 أو حيث لا توجد f. من الأخضر إلى الأحمر قيمة عظمى، ومن الأحمر إلى الأخضر قيمة صغرى، وإذا لم يتغير اللون فلا قيمة قصوى.',
            'The probe paints the sign of f′ under the graph: green where f increases, red where it decreases. The colour can only change where f′ = 0 or where f does not exist. From green to red there is a maximum; from red to green, a minimum; if the colour does not change, there is no extremum.'
        )
    },
    { ...from(bachDerivativesLabTools, 'slope-graph'), id: 'slope-graph', stage: 'monotony', lessonTopic: 'sign-monotony' },
    { ...from(functionsAkLabTools, 'explorer'), id: 'explorer', stage: 'extremes', lessonTopic: 'singular-points' },
    {
        id: 'curvature',
        stage: 'curvature',
        lessonTopic: 'concavity',
        title: say('Kurbadura zuzen ukitzailearekin', 'Curvatura con la tangente', 'التقعّر بالمماس', 'Concavity with the tangent'),
        observe: say(
            'Kurba zuzen ukitzailearen gainean geratzen den tokian ahurra da (∪) eta f″ > 0; azpian geratzen den tokian, ganbila (∩) eta f″ < 0. Inflexio-puntu batean zuzen ukitzaileak kurba zeharkatzen du. x⁴ funtzioan f″(0) = 0 da, baina kurba gainean geratzen da: ez dago inflexiorik.',
            'Donde la curva queda por encima de la tangente es cóncava (∪) y f″ > 0; donde queda por debajo, convexa (∩) y f″ < 0. En un punto de inflexión la tangente atraviesa la curva. En x⁴, f″(0) = 0, pero la curva sigue por encima: no hay inflexión.',
            'حيث يبقى المنحنى فوق المماس يكون مقعّرًا نحو الأعلى (∪) و f″ > 0، وحيث يبقى تحته يكون مقعّرًا نحو الأسفل (∩) و f″ < 0. وعند نقطة الانعطاف يخترق المماس المنحنى. وفي x⁴ يكون f″(0) = 0 لكن المنحنى يبقى فوقه: لا انعطاف.',
            'Where the curve stays above the tangent it is concave up (∪) and f″ > 0; where it stays below, concave down (∩) and f″ < 0. At a point of inflection the tangent crosses the curve. For x⁴, f″(0) = 0, but the curve stays above: there is no inflection.'
        )
    },
    {
        id: 'box',
        stage: 'optimization',
        lessonTopic: 'geometry',
        title: say('Estalkirik gabeko kutxa', 'La caja sin tapa', 'العلبة بلا غطاء', 'The box without a lid'),
        observe: say(
            'Gutxi moztuz gero, kutxa laua da; asko moztuz gero, oinarria txikia da. Bolumena igo egiten da V′ > 0 den bitartean eta jaitsi V′ < 0 denean: maximoa V′ = 0 den tokian dago, txaparen aldearen seiren batean.',
            'Si cortas poco, la caja es plana; si cortas mucho, la base es pequeña. El volumen sube mientras V′ > 0 y baja cuando V′ < 0: el máximo está donde V′ = 0, en la sexta parte del lado de la chapa.',
            'إذا قطعت قليلًا كانت العلبة مسطحة، وإذا قطعت كثيرًا صغرت القاعدة. يزداد الحجم ما دام V′ > 0 وينقص عندما V′ < 0: القيمة العظمى حيث V′ = 0، أي عند سدس ضلع الصفيحة.',
            'If you cut little, the box is flat; if you cut a lot, the base is small. The volume goes up while V′ > 0 and down when V′ < 0: the maximum is where V′ = 0, at one sixth of the side of the sheet.'
        )
    },
    {
        id: 'layers',
        stage: 'graphs',
        lessonTopic: 'rational-graph',
        title: say('Muntatu grafikoa', 'Monta la gráfica', 'ابنِ الرسم', 'Build the graph'),
        observe: say(
            'Geruza bakoitzak kurbaren pista bat ematen du: izate-eremuak non dagoen, ebaki-puntuek non mozten dituen ardatzak, asintotek nora doan, geziek non igotzen eta jaisten den, eta ∪ eta ∩ ikurrek nola tolesten den. Azken geruzan kurbak marka guztiak lotzen ditu.',
            'Cada capa da una pista de la curva: el dominio dice dónde está, los cortes dónde toca los ejes, las asíntotas hacia dónde va, las flechas dónde sube y baja, y ∪ y ∩ cómo se dobla. En la última capa la curva une todas las marcas.',
            'تعطي كل طبقة دليلًا على المنحنى: المجال يبيّن أين يوجد، ونقاط التقاطع أين يلمس المحورين، والمقاربات إلى أين يتجه، والأسهم أين يصعد وينزل، و∪ و∩ كيف ينثني. وفي الطبقة الأخيرة يصل المنحنى كل العلامات.',
            'Each layer gives a clue about the curve: the domain says where it is, the intercepts where it meets the axes, the asymptotes where it goes, the arrows where it rises and falls, and ∪ and ∩ how it bends. In the last layer the curve joins all the marks.'
        )
    }
]

export const bachApplicationsLabToolForTopic: Record<string, BachApplicationsLabToolId | undefined> = {
    'sign-monotony': 'sign',
    intervals: 'sign',
    'always-increasing': 'slope-graph',
    'singular-points': 'sign',
    'second-derivative': 'curvature',
    'extreme-coefficients': 'explorer',
    concavity: 'curvature',
    inflection: 'curvature',
    'inflection-coefficients': 'curvature',
    'absolute-extremes': 'explorer',
    geometry: 'box',
    contexts: 'box',
    'polynomial-graph': 'layers',
    'rational-graph': 'layers',
    'exp-log-graph': 'layers'
}

export const bachApplicationsLabChallengeIds: number[] = [
    signChallenges,
    slopeChallenges,
    explorerChallenges,
    curveChallenges,
    boxChallenges,
    layerChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
