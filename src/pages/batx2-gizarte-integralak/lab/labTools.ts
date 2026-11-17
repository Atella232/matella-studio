import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { betweenChallenges } from '../../batx1-zientziak-integralak/lab/between.ts'
import { bachIntegralsLabTools } from '../../batx1-zientziak-integralak/lab/labTools.ts'
import { rectChallenges } from '../../batx1-zientziak-integralak/lab/rectangles.ts'
import { signedChallenges } from '../../batx1-zientziak-integralak/lab/signed.ts'
import type { Bach2gIntegralsStageId } from '../lessons.tsx'
import { paybackChallenges } from './payback.ts'
import { totalChallenges } from './total.ts'

/* ==========================================================================
   Integralak · Batxilergoa 2 · Gizarte Zientziak — the tools of the
   laboratory. L1 «Rectángulos que se ajustan» and L3 «Área entre dos
   curvas» of the menu already exist in Integrales 1.º, and so does the
   signed area: the three are borrowed with their challenges and ids.
   Two of this unit, both in economy: from the next unit to the total
   cost (the area function, L2 + L4) and when does the money come back.
   ========================================================================== */

export type Bach2gIntegralsLabToolId = 'rectangles' | 'signed' | 'between' | 'total' | 'payback'

export interface Bach2gIntegralsLabTool extends LabToolInfo {
    id: Bach2gIntegralsLabToolId
    stage: Bach2gIntegralsStageId
}

const from = (id: string) => bachIntegralsLabTools.find((tool) => tool.id === id)!

export const bach2gIntegralsLabTools: Bach2gIntegralsLabTool[] = [
    { ...from('rectangles'), id: 'rectangles', stage: 'definite', lessonTopic: 'rectangles' },
    { ...from('signed'), id: 'signed', stage: 'areas', lessonTopic: 'area-sign' },
    { ...from('between'), id: 'between', stage: 'areas', lessonTopic: 'between' },
    {
        id: 'total',
        stage: 'economy',
        lessonTopic: 'cost-from-marginal',
        title: say('Hurrengo unitatetik kostu osora', 'Del marginal al total', 'من الحدّية إلى الكلية', 'From the next unit to the total'),
        observe: say(
            "$C'$ kurbaren azpiko azalera unitate guztien kostua da. $x$ handitzean azalera hazten da, $C'$ altuera duen zerrenda bat gehiago. Kostu osoa azalera hori gehi kostu finkoa da: $C(x)=K+\\int_0^x C'$.",
            "El área bajo $C'$ es lo que cuestan todas las unidades. Al crecer $x$ el área aumenta una tira de altura $C'$. El coste total es esa área más el coste fijo: $C(x)=K+\\int_0^x C'$.",
            "المساحة تحت $C'$ هي تكلفة كل الوحدات. وعندما يكبر $x$ تزداد المساحة بشريط ارتفاعه $C'$. والتكلفة الكلية هي تلك المساحة زائد التكلفة الثابتة: $C(x)=K+\\int_0^x C'$.",
            "The area under $C'$ is what all the units cost. As $x$ grows, the area gains a strip of height $C'$. The total cost is that area plus the fixed cost: $C(x)=K+\\int_0^x C'$."
        )
    },
    {
        id: 'payback',
        stage: 'economy',
        lessonTopic: 'accumulated',
        title: say('Noiz berreskuratzen da inbertsioa?', '¿Cuándo se recupera la inversión?', 'متى يُسترجع الاستثمار؟', 'When does the money come back?'),
        observe: say(
            'Hasieran hileko irabazia negatiboa da eta galera pilatzen da (gorria). Zeinua aldatzen denean, irabaziak pilatzen dira (berdea). Inbertsioa berreskuratzen da berdeak gorria berdintzen duenean: $A(t)=0$.',
            'Al principio el beneficio mensual es negativo y se acumula pérdida (rojo). Cuando cambia de signo, se acumulan beneficios (verde). La inversión se recupera cuando el verde iguala al rojo: $A(t)=0$.',
            'في البداية يكون الربح الشهري سالبًا فتتراكم الخسارة (الأحمر). وعندما تتغير الإشارة تتراكم الأرباح (الأخضر). ويُسترجع الاستثمار عندما يساوي الأخضرُ الأحمرَ: $A(t)=0$.',
            'At first the monthly profit is negative and a loss piles up (red). When the sign changes, profits pile up (green). The investment comes back when the green equals the red: $A(t)=0$.'
        )
    }
]

export const bach2gIntegralsLabToolForTopic: Record<string, Bach2gIntegralsLabToolId | undefined> = {
    rectangles: 'rectangles',
    barrow: 'rectangles',
    properties: 'signed',
    'area-axis': 'signed',
    'area-sign': 'signed',
    between: 'between',
    'cost-from-marginal': 'total',
    accumulated: 'payback',
    'income-from-marginal': 'total'
}

export const bach2gIntegralsLabChallengeIds: number[] = [
    rectChallenges,
    signedChallenges,
    betweenChallenges,
    totalChallenges,
    paybackChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
