import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { vectorsStages } from '../lessons'
import { vectorsLabTools, type VectorsLabToolId } from './labTools'
import { AlignTool, BisectorTool, CircleTool, CombinationTool, FormsTool, ParametricTool, SegmentTool, SlopeTool, TwoLinesTool, VectorTool } from './VectorsTools'

const toolComponents: Record<VectorsLabToolId, (props: LabToolProps) => JSX.Element> = {
    vector: VectorTool,
    combination: CombinationTool,
    segment: SegmentTool,
    align: AlignTool,
    parametric: ParametricTool,
    forms: FormsTool,
    slope: SlopeTool,
    'two-lines': TwoLinesTool,
    bisector: BisectorTool,
    circle: CircleTool
}

export function VectorsLaboratory(props: {
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
            tools={vectorsLabTools}
            stages={vectorsStages}
            components={toolComponents}
            title={{ eu: 'Mugitu, marraztu eta neurtu', es: 'Mueve, traza y mide', ar: 'حرّك وارسم وقِس' }}
        />
    )
}
