import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { linesPlanesStages } from '../lessons'
import { linesPlanesLabTools, type LinesPlanesLabToolId } from './labTools'
import { CutOrCrossTool, ParameterTool, PlaneNormalTool, ThreePlanesTool, ThroughPlaneTool } from './PlanesTools'

const toolComponents: Record<LinesPlanesLabToolId, (props: LabToolProps) => JSX.Element> = {
    'parameter-t': ParameterTool,
    'plane-normal': PlaneNormalTool,
    'cut-or-cross': CutOrCrossTool,
    'through-plane': ThroughPlaneTool,
    'three-planes': ThreePlanesTool
}

export function LinesPlanesLaboratory(props: {
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
            tools={linesPlanesLabTools}
            stages={linesPlanesStages}
            components={toolComponents}
            title={{ eu: 't, normala, bi zuzen, zeharkatzea eta hiru plano', es: 'La t, el normal, dos rectas, el corte y tres planos', en: 't, the normal, two lines, the crossing and three planes', ar: 't والناظم ومستقيمان والاختراق وثلاثة مستويات' }}
        />
    )
}
