import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { NotableTool } from '../../dbh3-geometria/lab/GeometryTools'
import { AlignTool, FormsTool, SegmentTool, TwoLinesTool } from '../../dbh4-akademikoak-bektoreak/lab/VectorsTools'
import { bachGeometryStages } from '../lessons'
import { LineAngleTool, PencilTool, ShortestTool } from './GeometryTools'
import { bachGeometryLabTools, type BachGeometryLabToolId } from './labTools'

const toolComponents: Record<BachGeometryLabToolId, (props: LabToolProps) => JSX.Element> = {
    segment: SegmentTool,
    align: AlignTool,
    forms: FormsTool,
    pencil: PencilTool,
    'two-lines': TwoLinesTool,
    'line-angle': LineAngleTool,
    shortest: ShortestTool,
    notable: NotableTool
}

export function BachGeometryLaboratory(props: {
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
            tools={bachGeometryLabTools}
            stages={bachGeometryStages}
            components={toolComponents}
            title={{ eu: 'Sorta, angelua eta biderik laburrena', es: 'El haz, el ángulo y el camino más corto', en: 'The pencil, the angle and the shortest way', ar: 'الحزمة والزاوية وأقصر طريق' }}
        />
    )
}
