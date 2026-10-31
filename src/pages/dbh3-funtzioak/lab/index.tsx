import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { LineTool, RelationTool, SlopeTool } from '../../dbh2-funtzioak-v2/lab/FunctionsTools'
import { DomainTool, ExplorerTool, InterceptsTool } from '../../dbh4-aplikatuak-funtzioak/lab/FunctionsTools'
import { ParabolaTool, PointSlopeTool, TwoLinesTool } from '../../dbh4-aplikatuak-grafikoa/lab/GraphsTools'
import { functions3Stages } from '../lessons'
import { PlansTool, TaxiTool, ThrowTool, WalkTool } from './FunctionTools'
import { functions3LabTools, type Functions3LabToolId } from './labTools'

const toolComponents: Record<Functions3LabToolId, (props: LabToolProps) => JSX.Element> = {
    relation: RelationTool,
    domain: DomainTool,
    walk: WalkTool,
    explorer: ExplorerTool,
    slope: SlopeTool,
    line: LineTool,
    taxi: TaxiTool,
    'point-slope': PointSlopeTool,
    'two-lines': TwoLinesTool,
    plans: PlansTool,
    parabola: ParabolaTool,
    throw: ThrowTool,
    intercepts: InterceptsTool
}

export function Functions3Laboratory(props: {
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
            tools={functions3LabTools}
            stages={functions3Stages}
            components={toolComponents}
            title={{ eu: 'Ibilaldiak, taxiak eta jaurtiketak', es: 'Paseos, taxis y lanzamientos', en: 'Walks, taxis and throws', ar: 'نزهات وسيارات أجرة ورميات' }}
        />
    )
}
