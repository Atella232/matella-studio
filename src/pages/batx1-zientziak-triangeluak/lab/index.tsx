import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { AreaTool, CalculatorTool, CircleTool, DoubleTool, TwoSidesTool } from '../../dbh4-akademikoak-trigonometria/lab/TrigonometryTools'
import { trianglesStages } from '../lessons'
import { trianglesLabTools, type TrianglesLabToolId } from './labTools'
import { CircumcircleTool, CompassTool, HingeTool } from './TrianglesTools'

const toolComponents: Record<TrianglesLabToolId, (props: LabToolProps) => JSX.Element> = {
    circle: CircleTool,
    calculator: CalculatorTool,
    'two-sides': TwoSidesTool,
    double: DoubleTool,
    compass: CompassTool,
    circumcircle: CircumcircleTool,
    hinge: HingeTool,
    area: AreaTool
}

export function TrianglesLaboratory(props: {
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
            tools={trianglesLabTools}
            stages={trianglesStages}
            components={toolComponents}
            title={{ eu: 'Ireki, mugitu eta ebaki', es: 'Abre, mueve y corta', en: 'Open, move and cut', ar: 'افتح وحرّك واقطع' }}
        />
    )
}
