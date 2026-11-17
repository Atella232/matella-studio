import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { degreesChallenges } from '../../batx1-zientziak-limiteak/lab/degrees.ts'
import { holeChallenges } from '../../batx1-zientziak-limiteak/lab/hole.ts'
import { bachLimitsLabTools } from '../../batx1-zientziak-limiteak/lab/labTools.ts'
import { lensChallenges } from '../../batx1-zientziak-limiteak/lab/lens.ts'
import { jointsChallenges } from '../../batx2-zientziak-limiteak/lab/joints.ts'
import { bach2LimitsLabTools } from '../../batx2-zientziak-limiteak/lab/labTools.ts'
import { joinChallenges } from '../../dbh4-akademikoak-funtzioak/lab/labTools.ts'
import type { Bach2gLimitsStageId } from '../lessons.tsx'
import { costChallenges } from './averageCost.ts'
import { compoundChallenges } from './compound.ts'
import { tariffChallenges } from './tariff.ts'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 2 · Gizarte Zientziak — the
   tools of the laboratory: three of this unit (the average cost in the
   long run, the tariff by brackets, the interest compounded more and more
   often) and five borrowed with their challenges and ids (progress is
   kept apart, under this unit's storage prefix): the lens, the hole of
   0/0, the highest degree wins and join two pieces from Límites of 1.º,
   and adjust a and b from Límites of 2.º Ciencias.
   ========================================================================== */

export type Bach2gLimitsLabToolId = 'lens' | 'degrees' | 'compound' | 'hole' | 'join' | 'joints' | 'average-cost' | 'tariff'

export interface Bach2gLimitsLabTool extends LabToolInfo {
    id: Bach2gLimitsLabToolId
    stage: Bach2gLimitsStageId
}

const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const bach2gLimitsLabTools: Bach2gLimitsLabTool[] = [
    { ...from(bachLimitsLabTools, 'lens'), id: 'lens', stage: 'graph', lessonTopic: 'branches' },
    { ...from(bachLimitsLabTools, 'degrees'), id: 'degrees', stage: 'infinity', lessonTopic: 'degrees' },
    {
        id: 'compound',
        stage: 'infinity',
        lessonTopic: 'number-e',
        title: say('Interesa gero eta maizago', 'Interés cada vez más a menudo', 'فائدة بتكرار أكبر فأكبر', 'Interest more and more often'),
        observe: say(
            'Kapitalizazio bakoitzak interes txikiago bat ematen du, baina maizago. Kapitala hazten da, gero eta gutxiago, eta 1000 eʳ sabaira hurbiltzen da: 1^∞ forma bat da, eta haren limitea e zenbakiarekin idazten da.',
            'Cada capitalización da un interés más pequeño, pero más a menudo. El capital crece cada vez menos y se acerca al techo 1000 eʳ: es una forma 1^∞, y su límite se escribe con el número e.',
            'كل رسملة تعطي فائدة أصغر لكن بتكرار أكبر. يكبر رأس المال بقدر يتناقص ويقترب من السقف 1000 eʳ: إنها صورة 1^∞ ونهايتها تُكتب بالعدد e.',
            'Each compounding gives a smaller interest, but more often. The capital grows less and less and approaches the ceiling 1000 eʳ: it is a 1^∞ form, and its limit is written with the number e.'
        )
    },
    { ...from(bachLimitsLabTools, 'hole'), id: 'hole', stage: 'point', lessonTopic: 'zero-zero' },
    { ...from(bachLimitsLabTools, 'join'), id: 'join', stage: 'continuity', lessonTopic: 'continuous' },
    { ...from(bach2LimitsLabTools, 'joints'), id: 'joints', stage: 'continuity', lessonTopic: 'parameter' },
    {
        id: 'average-cost',
        stage: 'context',
        lessonTopic: 'long-run',
        title: say('Batez besteko kostua epe luzera', 'Coste medio a largo plazo', 'متوسط التكلفة على المدى الطويل', 'Average cost in the long run'),
        observe: say(
            'Kostu finkoa unitate gero eta gehiagotan banatzen da. Kostu osoak x bezala hazten bada, batez besteko kostua unitateko kostura hurbiltzen da; ez badago unitateko kosturik, 0 aldera; eta x² gai bat badago, azkenean mugarik gabe hazten da.',
            'El coste fijo se reparte entre cada vez más unidades. Si el coste total crece como x, el coste medio se acerca al coste por unidad; si no hay coste por unidad, a 0; y si hay un término en x², al final crece sin límite.',
            'تتوزع التكلفة الثابتة على وحدات أكثر فأكثر. إذا كبرت التكلفة الكلية مثل x اقترب متوسط التكلفة من تكلفة الوحدة؛ وإذا لم تكن هناك تكلفة للوحدة اقترب من 0؛ وإذا وُجد حد في x² كبر في النهاية بلا حد.',
            'The fixed cost is shared among more and more units. If the total cost grows like x, the average cost approaches the cost per unit; if there is no cost per unit, 0; and if there is a term in x², it ends up growing without limit.'
        )
    },
    {
        id: 'tariff',
        stage: 'context',
        lessonTopic: 'brackets',
        title: say('Tarifa tarteka', 'La tarifa por tramos', 'التعريفة حسب الشرائح', 'The tariff by brackets'),
        observe: say(
            'Tarte-aldaketan, ezkerreko zatiak eta eskuinekoak balio bera ematen ez badute, faktura jauzi egiten du. Kuota finkoa aldatuz jauzia igo, jaitsi edo ezabatu daiteke: bi zatiak berdintzen direnean, tarifa jarraitua da.',
            'En el cambio de tramo, si el trozo de la izquierda y el de la derecha no dan lo mismo, la factura salta. Cambiando la cuota fija, el salto sube, baja o desaparece: cuando los dos trozos coinciden, la tarifa es continua.',
            'عند تغيّر الشريحة، إذا لم يعطِ الجزء الأيسر والأيمن القيمة نفسها قفزت الفاتورة. وبتغيير الحصة الثابتة تكبر القفزة أو تصغر أو تختفي: عندما يتساوى الجزآن تكون التعريفة متصلة.',
            'At the change of bracket, if the left piece and the right one do not give the same amount, the bill jumps. Changing the fixed charge, the jump grows, shrinks or vanishes: when both pieces agree, the tariff is continuous.'
        )
    }
]

export const bach2gLimitsLabToolForTopic: Record<string, Bach2gLimitsLabToolId | undefined> = {
    branches: 'lens',
    degrees: 'degrees',
    conjugate: 'degrees',
    'number-e': 'compound',
    'one-sided': 'lens',
    'k-zero': 'hole',
    'zero-zero': 'hole',
    continuous: 'join',
    discontinuities: 'lens',
    parameter: 'joints',
    'long-run': 'average-cost',
    brackets: 'tariff',
    'fair-tariff': 'tariff'
}

export const bach2gLimitsLabChallengeIds: number[] = [
    lensChallenges,
    degreesChallenges,
    compoundChallenges,
    holeChallenges,
    joinChallenges,
    jointsChallenges,
    costChallenges,
    tariffChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
