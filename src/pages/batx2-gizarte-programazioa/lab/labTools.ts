import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { halfPlaneChallenges, shoppingChallenges, systemsLabTools } from '../../dbh4-akademikoak-sistemak/lab/labTools.ts'
import type { ProgramazioaStageId } from '../stages.ts'
import { buildChallenges } from './buildRegion.ts'
import { levelChallenges } from './levelLine.ts'

/* ==========================================================================
   Programazio lineala (Batxilergoa 2 · Gizarte Zientziak) laboratory. Two
   tools of its own: build the region (up to three constraints, its
   vertices and its shape) and the level line (where the optimum is). The
   half-plane and «Shopping on a budget» of 4.º académicas come back as
   they are, with their challenges and ids (progress is kept under this
   unit's prefix). Tests in tests/programazioa-batx2g-lab.test.ts.
   ========================================================================== */

export type ProgramazioaLabToolId = 'half-plane' | 'build-region' | 'level-line' | 'shopping'

export interface ProgramazioaLabTool extends LabToolInfo {
    id: ProgramazioaLabToolId
    stage: ProgramazioaStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const from = (id: 'half-plane' | 'shopping') => systemsLabTools.find((tool) => tool.id === id)!

export const programazioaLabTools: ProgramazioaLabTool[] = [
    { ...from('half-plane'), id: 'half-plane', stage: 'regions', lessonTopic: 'half-plane-regions' },
    {
        id: 'build-region',
        stage: 'feasible',
        lessonTopic: 'vertices',
        title: say('Eraiki eskualdea', 'Construye la región', 'ابنِ المنطقة', 'Build the region'),
        observe: say('Murrizketa bakoitzak eskualdetik zati bat kentzen du. Erpinak muga-zuzenen ebaki-puntuak dira, murrizketa guztiak betetzen dituztenak. ≥ murrizketekin eskualdea ireki daiteke, eta kontrakoak direnean hutsik gera daiteke.', 'Cada restricción quita un trozo de la región. Los vértices son los cortes de las rectas frontera que cumplen todas las restricciones. Con restricciones de ≥ la región puede quedar abierta, y si se contradicen, vacía.', 'كل قيد يقتطع جزءًا من المنطقة. والرؤوس نقاط تقاطع المستقيمات الحدّية التي تحقق كل القيود. ومع قيود ≥ قد تبقى المنطقة مفتوحة، وإذا تناقضت تصبح خالية.', 'Each constraint cuts a piece off the region. The vertices are the crossings of boundary lines that satisfy every constraint. With ≥ constraints the region can stay open, and if they contradict each other, empty.')
    },
    {
        id: 'level-line',
        stage: 'objective',
        lessonTopic: 'level-lines',
        title: say('Maila-zuzena', 'La recta de nivel', 'مستقيم المستوى', 'The level line'),
        observe: say('F = k zuzenak paraleloak dira. k handitzean, zuzena eskualdean zehar mugitzen da; eskualdea uzten duen azken puntua maximoa da, eta ukitzen duen lehena, minimoa. Alde baten paraleloa bada, alde osoa da optimoa.', 'Las rectas F = k son paralelas. Al crecer k, la recta barre la región; el último punto que deja es el máximo y el primero que toca, el mínimo. Si es paralela a un lado, todo el lado es óptimo.', 'المستقيمات F = k متوازية. عندما تكبر k يمسح المستقيم المنطقة؛ آخر نقطة يغادرها هي العظمى وأول نقطة يلمسها هي الصغرى. وإذا كان موازيًا لضلع فالضلع كله أمثل.', 'The lines F = k are parallel. As k grows, the line sweeps the region; the last point it leaves is the maximum and the first it touches is the minimum. If it is parallel to a side, the whole side is optimal.')
    },
    { ...from('shopping'), id: 'shopping', stage: 'problems', lessonTopic: 'constraints' }
]

export const programazioaLabToolForTopic: Record<string, ProgramazioaLabToolId | undefined> = {
    'half-plane-regions': 'half-plane',
    'region-cases': 'build-region',
    constraints: 'shopping',
    vertices: 'build-region',
    'integer-points': 'shopping',
    'level-lines': 'level-line',
    'vertex-method': 'level-line',
    'solution-types': 'level-line',
    'max-profit': 'level-line',
    'min-cost': 'level-line',
    'full-problem': 'build-region'
}

export const programazioaLabChallengeIds: number[] = [halfPlaneChallenges, buildChallenges, levelChallenges, shoppingChallenges]
    .flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
