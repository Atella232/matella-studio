import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { spaceVectorsStages } from '../lessons'
import { spaceVectorsLabTools, type SpaceVectorsLabToolId } from './labTools'
import { BoxVolumeTool, InPlaneTool, PointBoxTool, RightHandTool, SpaceShadowTool } from './SpaceTools'

const toolComponents: Record<SpaceVectorsLabToolId, (props: LabToolProps) => JSX.Element> = {
    'point-box': PointBoxTool,
    'in-plane': InPlaneTool,
    'space-shadow': SpaceShadowTool,
    'right-hand': RightHandTool,
    'box-volume': BoxVolumeTool
}

export function SpaceVectorsLaboratory(props: {
    language: UnitLanguage
    tool: string | null
    onToolChange: (tool: string) => void
    completedIds: number[]
    onComplete: (id: number) => void
    onOpenLesson: (topic: string) => void
}) {
    return (
        <LabShell
            {...props}
            tools={spaceVectorsLabTools}
            stages={spaceVectorsStages}
            components={toolComponents}
            title={{ eu: 'Kutxa, planoa, itzala eta eskua', es: 'La caja, el plano, la sombra y la mano', en: 'The box, the plane, the shadow and the hand', ar: 'الصندوق والمستوى والظل واليد' }}
        />
    )
}
