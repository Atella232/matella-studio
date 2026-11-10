import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { accumulateChallenges } from '../../batx1-zientziak-integralak/lab/accumulate.ts'
import { bachIntegralsLabTools } from '../../batx1-zientziak-integralak/lab/labTools.ts'
import { signedChallenges } from '../../batx1-zientziak-integralak/lab/signed.ts'
import type { Bach2DefiniteStageId } from '../lessons.tsx'
import { meanChallenges } from './meanRect.ts'
import { squeezeChallenges } from './squeeze.ts'
import { stripChallenges } from './strips.ts'

/* ==========================================================================
   Integral mugatua (Batxilergoa 2 · Zientziak) laboratory. Three tools of
   its own: fit the area between the lower and the upper sum, the
   rectangle of the mean value and the region split into strips. Borrowed
   from Integralak of 1.º with their challenges and ids (progress is kept
   apart, under this unit's storage prefix): signed area, for |f| and the
   review of areas, and the area function, whose slope is f (the fundamental theorem).
   Tests in tests/mugatua-batx2z-lab.test.ts.
   ========================================================================== */

export type Bach2DefiniteLabToolId = 'signed' | 'squeeze' | 'mean-rect' | 'area-function' | 'strips'

export interface Bach2DefiniteLabTool extends LabToolInfo {
    id: Bach2DefiniteLabToolId
    stage: Bach2DefiniteStageId
}

const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const bach2DefiniteLabTools: Bach2DefiniteLabTool[] = [
    {
        id: 'squeeze',
        stage: 'sums',
        lessonTopic: 'lower-upper',
        title: say('Azalera estutu', 'Encaja el área', 'احصر المساحة', 'Trap the area'),
        observe: say(
            'Zati bakoitzean, laukizuzen urdina funtzioaren minimoaren altuerakoa da, eta gorria maximoarena. Kurba igo eta jaisten denean, minimoa edo maximoa ez dago beti zatiaren muturretan. Azalera beti dago s eta S artean, eta n handitzean banda estutu egiten da. Kurba behera okertzen bada, azalera S zenbakitik hurbilago dago; gora okertzen bada, s zenbakitik hurbilago; zuzena bada, erdian.',
            'En cada tramo, el rectángulo azul tiene la altura del mínimo de la función y el rojo, la del máximo. Cuando la curva sube y baja, el mínimo o el máximo no están siempre en los extremos del tramo. El área queda siempre entre s y S, y la banda se estrecha al aumentar n. Si la curva se dobla hacia abajo, el área está más cerca de S; si se dobla hacia arriba, más cerca de s; si es recta, en el medio.',
            'في كل جزء يكون للمستطيل الأزرق ارتفاع أصغر قيمة للدالة وللأحمر ارتفاع أكبرها. وعندما يصعد المنحنى وينزل لا تكون أصغر قيمة أو أكبرها دائمًا عند طرفي الجزء. تبقى المساحة دائمًا بين s و S، ويضيق الشريط عند زيادة n. وإذا انحنى المنحنى إلى الأسفل كانت المساحة أقرب إلى S، وإذا انحنى إلى الأعلى أقرب إلى s، وإذا كان مستقيمًا ففي المنتصف.',
            'On each piece, the blue rectangle is as high as the minimum of the function and the red one as high as the maximum. When the curve goes up and down, the minimum or the maximum is not always at the ends of the piece. The area always lies between s and S, and the band narrows as n grows. If the curve bends down, the area is nearer to S; if it bends up, nearer to s; if it is straight, halfway.'
        )
    },
    {
        id: 'mean-rect',
        stage: 'sums',
        lessonTopic: 'mean-value',
        title: say('Batez besteko balioaren laukizuzena', 'El rectángulo del valor medio', 'مستطيل القيمة المتوسطة', 'The mean value rectangle'),
        observe: say(
            'Laukizuzenaren oinarria tartea da, eta altuera f(c). c mugitzean, laukizuzena hazi edo txikitu egiten da; eskualdearen azalera bera duenean, f(c) funtzioaren batez besteko balioa da, eta c teoremaren puntua. Zuzen batean c tartearen erdian dago; kurba gora okertzen bada, eskuinera (gorakorra bada) mugitzen da.',
            'La base del rectángulo es el intervalo y su altura, f(c). Al mover c el rectángulo crece o mengua; cuando tiene la misma área que la región, f(c) es el valor medio de la función y c, el punto del teorema. En una recta c está en el centro del intervalo; si la curva se dobla hacia arriba (y crece), se va a la derecha.',
            'قاعدة المستطيل هي الفترة وارتفاعه f(c). وعند تحريك c يكبر المستطيل أو يصغر؛ وعندما تكون له مساحة المنطقة نفسها تكون f(c) القيمة المتوسطة للدالة و c نقطة المبرهنة. في المستقيم يقع c في منتصف الفترة، وإذا انحنى المنحنى إلى الأعلى (وكان متزايدًا) انتقل إلى اليمين.',
            'The base of the rectangle is the interval and its height is f(c). As c moves the rectangle grows or shrinks; when it has the same area as the region, f(c) is the mean value of the function and c is the point of the theorem. On a straight line c is at the middle of the interval; if the curve bends up (and increases), it moves to the right.'
        )
    },
    { ...from(bachIntegralsLabTools, 'area-function'), id: 'area-function', stage: 'fundamental', lessonTopic: 'area-function' },
    { ...from(bachIntegralsLabTools, 'signed'), id: 'signed', stage: 'techniques', lessonTopic: 'piecewise' },
    {
        id: 'strips',
        stage: 'problems',
        lessonTopic: 'three-curves',
        title: say('Barrutia zatitu', 'Parte el recinto', 'قسّم المنطقة', 'Split the region'),
        observe: say(
            'Ebaki-puntu bakoitzean, goiko kurba edo behekoa alda daiteke: horregatik zatitzen da barrutia zerrendatan. Zerrenda bakoitzean goikoa ken behekoa integratzen da. Alderantziz hartuz gero, zerrenda horrek zenbaki negatiboa ematen du, eta batura ez da azalera. Azalera da zerrenda guztiak positiboak direnean ateratzen den batura.',
            'En cada corte puede cambiar la curva de arriba o la de abajo: por eso el recinto se parte en tiras. En cada tira se integra la de arriba menos la de abajo. Si se toman al revés, esa tira da un número negativo y la suma no es el área. El área es la suma que sale cuando todas las tiras son positivas.',
            'عند كل نقطة تقاطع قد يتغير المنحنى الأعلى أو الأدنى: لذلك تُقسم المنطقة إلى شرائح. وفي كل شريحة نكامل الأعلى ناقص الأدنى. وإذا أُخذا بالعكس أعطت تلك الشريحة عددًا سالبًا ولم يعد المجموع هو المساحة. المساحة هي المجموع الذي نحصل عليه عندما تكون كل الشرائح موجبة.',
            'At each crossing the top or the bottom curve may change: that is why the region is split into strips. On each strip you integrate the top one minus the bottom one. Taken the other way round, that strip gives a negative number and the sum is not the area. The area is the sum you get when every strip is positive.'
        )
    }
]

export const bach2DefiniteLabToolForTopic: Record<string, Bach2DefiniteLabToolId | undefined> = {
    'barrow-review': 'signed',
    'areas-review': 'signed',
    'lower-upper': 'squeeze',
    'limit-sums': 'squeeze',
    'mean-value': 'mean-rect',
    'area-function': 'area-function',
    'upper-limit': 'area-function',
    'barrow-conditions': 'signed',
    'definite-change': undefined,
    'definite-parts': undefined,
    piecewise: 'signed',
    'three-curves': 'strips',
    parameter: 'area-function',
    'integral-extrema': 'area-function',
    revolution: undefined
}

export const bach2DefiniteLabChallengeIds: number[] = [
    signedChallenges,
    squeezeChallenges,
    meanChallenges,
    accumulateChallenges,
    stripChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
