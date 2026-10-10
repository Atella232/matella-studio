import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { LineTool, SlopeTool } from '../../dbh2-funtzioak-v2/lab/FunctionsTools'
import { InterceptsTool } from '../../dbh4-aplikatuak-funtzioak/lab/FunctionsTools'
import { graphsStages } from '../lessons'
import { ExponentialTool, FrameTool, HyperbolaTool, ParabolaTool, PointSlopeTool, RootTool, TwoLinesTool } from './GraphsTools'
import { graphsLabTools, type GraphsLabToolId } from './labTools'

const toolComponents: Record<GraphsLabToolId, (props: LabToolProps) => JSX.Element> = {
    line: LineTool,
    slope: SlopeTool,
    'point-slope': PointSlopeTool,
    'two-lines': TwoLinesTool,
    parabola: ParabolaTool,
    intercepts: InterceptsTool,
    hyperbola: HyperbolaTool,
    root: RootTool,
    exponential: ExponentialTool,
    frame: FrameTool
}

export function GraphsLaboratory(props: {
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
            tools={graphsLabTools}
            stages={graphsStages}
            components={toolComponents}
            title={{ eu: 'Mugitu parametroak eta ikusi grafikoa', es: 'Mueve los parámetros y mira la gráfica', ar: 'حرّك المعاملات وشاهد البيان' }}
        />
    )
}
