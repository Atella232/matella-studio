import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { bachApplicationsLabTools } from '../../batx1-zientziak-aplikazioak/lab/labTools.ts'
import { layerChallenges } from '../../batx1-zientziak-aplikazioak/lab/layers.ts'
import { derivativeChallenges } from '../../batx2-zientziak-adierazpena/lab/fromDerivative.ts'
import { bach2SketchLabTools } from '../../batx2-zientziak-adierazpena/lab/labTools.ts'
import { mirrorChallenges } from '../../batx2-zientziak-adierazpena/lab/mirror.ts'
import type { Bach2gSketchStageId } from '../lessons.tsx'
import { dataChallenges } from './fromData.ts'
import { obliqueChallenges } from './oblique.ts'

/* ==========================================================================
   Funtzioen adierazpen grafikoa · Batxilergoa 2 · Gizarte Zientziak — the
   tools of the laboratory: two of this unit (the division gives the
   oblique, draw from the data) and three borrowed with their challenges
   and ids: the layers of the graph (Aplicaciones 1.º, the «Capas de la
   gráfica» of the menu), the mirror of the absolute value and from f′ to
   f (Representación 2.º Ciencias).
   ========================================================================== */

export type Bach2gSketchLabToolId = 'oblique' | 'derivative' | 'layers' | 'mirror' | 'data'

export interface Bach2gSketchLabTool extends LabToolInfo {
    id: Bach2gSketchLabToolId
    stage: Bach2gSketchStageId
}

const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const bach2gSketchLabTools: Bach2gSketchLabTool[] = [
    {
        id: 'oblique',
        stage: 'asymptotes',
        lessonTopic: 'oblique',
        title: say('Zatiketak ematen du zeiharra', 'La división da la oblicua', 'القسمة تعطي المقارب المائل', 'The division gives the oblique'),
        observe: say(
            'Zatiketaren zatidura da asintota zeiharra, eta hondarrak esaten du kurba non dagoen: positiboa bada, gainean; negatiboa bada, azpian. $x_0$ handitzean tartea txikitzen da. Hondarra zero bada, kurba zuzena bera da, zulo batekin.',
            'El cociente de la división es la asíntota oblicua, y el resto dice dónde va la curva: si es positivo, encima; si es negativo, debajo. Al crecer $x_0$ la distancia se encoge. Si el resto es cero, la curva es la propia recta, con un agujero.',
            'خارج القسمة هو المقارب المائل، والباقي يخبر أين يمر المنحنى: فوقه إذا كان موجبًا وتحته إذا كان سالبًا. وعندما يكبر $x_0$ تصغر المسافة. وإذا كان الباقي صفرًا كان المنحنى هو المستقيم نفسه مع ثغرة.',
            'The quotient of the division is the oblique asymptote, and the remainder says where the curve runs: above if it is positive, below if negative. As $x_0$ grows the gap shrinks. If the remainder is zero, the curve is the line itself, with a hole.'
        )
    },
    { ...from(bach2SketchLabTools, 'derivative'), id: 'derivative', stage: 'derivatives', lessonTopic: 'monotony' },
    { ...from(bachApplicationsLabTools, 'layers'), id: 'layers', stage: 'graphs', lessonTopic: 'rational' },
    { ...from(bach2SketchLabTools, 'mirror'), id: 'mirror', stage: 'reading', lessonTopic: 'absolute-value' },
    {
        id: 'data',
        stage: 'reading',
        lessonTopic: 'from-data',
        title: say('Datuetatik marraztu', 'Dibuja desde los datos', 'الرسم من المعطيات', 'Draw from the data'),
        observe: say(
            '$a$ aldatzean asintota bertikala mugitzen da, eta $b$ aldatzean horizontala. $k$ zeinuak esaten du adarrak zein koadrantetan dauden, eta haren tamainak zenbat urruntzen diren. Puntutik igarotzeko $k$ bakar batek balio du.',
            'Al cambiar $a$ se mueve la asíntota vertical, y al cambiar $b$ la horizontal. El signo de $k$ dice en qué cuadrantes van las ramas, y su tamaño cuánto se separan. Para pasar por el punto solo sirve un $k$.',
            'عند تغيير $a$ يتحرك المقارب العمودي، وعند تغيير $b$ يتحرك الأفقي. وإشارة $k$ تخبر في أي ربعين يقع الفرعان، وحجمه كم يبتعدان. ولا يصلح للمرور بالنقطة إلا $k$ واحد.',
            'Changing $a$ moves the vertical asymptote, and changing $b$ the horizontal one. The sign of $k$ says which quadrants the branches go in, and its size how far apart they are. Only one $k$ makes it pass through the point.'
        )
    }
]

export const bach2gSketchLabToolForTopic: Record<string, Bach2gSketchLabToolId | undefined> = {
    vertical: 'oblique',
    horizontal: 'data',
    oblique: 'oblique',
    monotony: 'derivative',
    concavity: 'layers',
    summary: 'layers',
    polynomial: 'layers',
    rational: 'layers',
    'exp-log': 'layers',
    'absolute-value': 'mirror',
    describe: 'derivative',
    'from-data': 'data'
}

export const bach2gSketchLabChallengeIds: number[] = [
    obliqueChallenges,
    derivativeChallenges,
    layerChallenges,
    mirrorChallenges,
    dataChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
