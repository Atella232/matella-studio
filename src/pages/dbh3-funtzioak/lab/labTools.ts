import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { functionsLabTools as basicTools, lineChallenges, relationChallenges, slopeChallenges } from '../../dbh2-funtzioak-v2/lab/labTools.ts'
import { domainChallenges, explorerChallenges, functionsLabTools as appliedTools, interceptsChallenges } from '../../dbh4-aplikatuak-funtzioak/lab/labTools.ts'
import { graphsLabTools, parabolaChallenges, pointSlopeChallenges, twoLinesChallenges } from '../../dbh4-aplikatuak-grafikoa/lab/labTools.ts'
import type { Functions3StageId } from '../lessons.tsx'
import { plansChallenges } from './plans.ts'
import { taxiChallenges } from './taxi.ts'
import { throwChallenges } from './throw.ts'
import { walkChallenges } from './walk.ts'

/* ==========================================================================
   Funtzioak (3. DBH) laboratory. Four tools are new and belong to this
   unit: the walk (a distance–time graph built hour by hour), the taxi
   meter, two plans and the throw of a ball. Function or not, the slope
   and the line come from 2. DBH Funtzioak; the domain, the graph explorer
   and the cuts of a parabola from 4. DBH aplikatuak Funtzioak; a point
   and a slope, two lines and the parabola from 4. DBH aplikatuak
   Grafikoak, with their own challenges. Tests in
   tests/funtzioak-dbh3-lab.test.ts.
   ========================================================================== */

export type Functions3LabToolId = 'relation' | 'domain' | 'walk' | 'explorer' | 'slope' | 'line' | 'taxi' | 'point-slope' | 'two-lines' | 'plans' | 'parabola' | 'throw' | 'intercepts'

export interface Functions3LabTool extends LabToolInfo {
    id: Functions3LabToolId
    stage: Functions3StageId
}

/** Arabic text runs right to left: every formula in it (y = mx + n, 20 €) is isolated left to right and kept on one line */
const isolate = (text: string) => text.replace(/[A-Za-z0-9(][A-Za-z0-9²³′ ()+\-−·=°€]*[A-Za-z0-9²³°′)€]|[A-Za-z]/g, (formula) => `⁦${formula.replace(/ /g, ' ')}⁩`)
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: isolate(ar) })

/** A tool of an earlier laboratory, put in this unit's stage and lesson */
function borrowed(list: LabToolInfo[], id: Functions3LabToolId, stage: Functions3StageId, lessonTopic: string): Functions3LabTool {
    const tool = list.find((candidate) => candidate.id === id)
    if (!tool) throw new Error(`No borrowed tool ${id}`)
    return { ...tool, id, stage, lessonTopic }
}

export const functions3LabTools: Functions3LabTool[] = [
    borrowed(basicTools, 'relation', 'graphs', 'function-concept'),
    borrowed(appliedTools, 'domain', 'graphs', 'domain-range'),
    { id: 'walk', stage: 'graphs', lessonTopic: 'reading-graphs', title: say('Ibilaldia', 'El paseo', 'النزهة', 'The walk'), observe: say('Ordu bakoitzeko abiadura zati baten malda da: positiboa bada grafikoa igotzen da, zero bada horizontala da eta negatiboa bada jaisten da. Punturik altuena ez da beti azkena.', 'La velocidad de cada hora es la pendiente de un tramo: si es positiva la gráfica sube, si es cero es horizontal y si es negativa baja. El punto más alto no siempre es el último.', 'سرعة كل ساعة هي ميل جزء من التمثيل: إذا كانت موجبة يصعد، وإذا كانت صفرًا يكون أفقيًا، وإذا كانت سالبة ينزل. وأعلى نقطة ليست دائمًا الأخيرة.', 'The speed in each hour is the slope of one stretch: positive and the graph rises, zero and it is flat, negative and it falls. The highest point is not always the last one.') },
    borrowed(appliedTools, 'explorer', 'features', 'growth'),
    borrowed(basicTools, 'slope', 'linear', 'slope'),
    borrowed(basicTools, 'line', 'linear', 'affine'),
    { id: 'taxi', stage: 'lines', lessonTopic: 'linear-problems', title: say('Taxia', 'El taxímetro', 'عدّاد سيارة الأجرة', 'The taxi meter'), observe: say('Tarifa zuzen bat da: hasierako prezioa Y ardatzeko puntua da eta km-ko prezioa malda. Km-ko prezioa igotzean zuzena inklinatuago dago; hasierakoa igotzean, zuzen osoa gora doa.', 'La tarifa es una recta: la bajada es el punto del eje Y y el precio por km, la pendiente. Al subir el precio por km la recta se inclina más; al subir la bajada, toda la recta sube.', 'التعريفة مستقيم: الانطلاق نقطة محور Y وسعر الكيلومتر هو الميل. برفع سعر الكيلومتر يزداد انحدار المستقيم، وبرفع الانطلاق يرتفع المستقيم كله.', 'The fare is a line: the start fee is the point on the Y axis and the price per km is the slope. A higher price per km makes the line steeper; a higher start fee lifts the whole line.') },
    borrowed(graphsLabTools, 'point-slope', 'lines', 'two-points'),
    borrowed(graphsLabTools, 'two-lines', 'lines', 'parallel-lines'),
    { id: 'plans', stage: 'lines', lessonTopic: 'parallel-lines', title: say('Bi tarifa', 'Dos tarifas', 'تعريفتان', 'Two plans'), observe: say('Bi zuzenak ebakitzen diren hilabetean bi tarifek berdin balio dute; ezkerrean bata merkeagoa da eta eskuinean bestea. Malda bera badute, paraleloak dira eta ez dira inoiz ebakitzen.', 'En el mes en que se cortan las dos rectas, las dos tarifas cuestan lo mismo; a la izquierda una es más barata y a la derecha, la otra. Con la misma pendiente son paralelas y nunca se cortan.', 'في الشهر الذي يتقاطع فيه المستقيمان تتساوى التعريفتان؛ على اليسار إحداهما أرخص وعلى اليمين الأخرى. وإذا كان لهما الميل نفسه فهما متوازيان ولا يتقاطعان أبدًا.', 'In the month where the two lines cross, both plans cost the same; to the left one is cheaper and to the right the other. With the same slope they are parallel and never cross.') },
    borrowed(graphsLabTools, 'parabola', 'quadratic', 'parabola-shape'),
    { id: 'throw', stage: 'quadratic', lessonTopic: 'vertex', title: say('Jaurtiketa', 'El lanzamiento', 'الرمية', 'The throw'), observe: say('Altuera parabola bat da, behera irekia. Pilota erpinean dago goien, abiadura zati hamar segundotan; parabola simetrikoa denez, igotzen ematen duen denbora bera ematen du jaisten hasierako altueraraino.', 'La altura es una parábola abierta hacia abajo. La pelota está arriba del todo en el vértice, a la velocidad entre diez segundos; como la parábola es simétrica, tarda lo mismo en subir que en bajar hasta la altura inicial.', 'الارتفاع قطع مكافئ منفتح إلى الأسفل. تكون الكرة في أعلى نقطة عند الرأس، بعد السرعة مقسومة على عشرة ثوانٍ؛ ولأن القطع متناظر فهي تستغرق في الصعود ما تستغرقه في النزول إلى الارتفاع الابتدائي.', 'The height is a parabola opening downwards. The ball is highest at the vertex, after the speed divided by ten seconds; as the parabola is symmetric, it takes as long to go up as to come back down to its starting height.') },
    borrowed(appliedTools, 'intercepts', 'quadratic', 'parabola-intercepts')
]

export const functions3LabToolForTopic: Record<string, Functions3LabToolId | undefined> = {
    'function-concept': 'relation',
    'domain-range': 'domain',
    'reading-graphs': 'walk',
    growth: 'explorer',
    extremes: 'explorer',
    intercepts: 'line',
    proportional: 'line',
    slope: 'slope',
    affine: 'line',
    'two-points': 'point-slope',
    'parallel-lines': 'plans',
    'linear-problems': 'taxi',
    'parabola-shape': 'parabola',
    vertex: 'throw',
    'parabola-intercepts': 'intercepts'
}

export const functions3LabChallengeIds: number[] = [relationChallenges, domainChallenges, walkChallenges, explorerChallenges, slopeChallenges, lineChallenges, taxiChallenges, pointSlopeChallenges, twoLinesChallenges, plansChallenges, parabolaChallenges, throwChallenges, interceptsChallenges].flatMap((list) => list.map((challenge) => challenge.id))
