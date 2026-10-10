import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { RelationTool, TableTool } from '../../dbh2-funtzioak-v2/lab/FunctionsTools'
import { functionsStages } from '../lessons'
import { BoxTool, DomainTool, ExplorerTool, InterceptsTool, PeriodicTool, RateTool } from './FunctionsTools'
import { functionsLabTools, type FunctionsLabToolId } from './labTools'

const toolComponents: Record<FunctionsLabToolId, (props: LabToolProps) => JSX.Element> = {
    relation: RelationTool,
    table: TableTool,
    domain: DomainTool,
    intercepts: InterceptsTool,
    explorer: ExplorerTool,
    rate: RateTool,
    periodic: PeriodicTool,
    box: BoxTool
}

export function FunctionsLaboratory(props: {
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
            tools={functionsLabTools}
            stages={functionsStages}
            components={toolComponents}
            title={{ eu: 'Mugitu, irakurri eta aztertu', es: 'Mueve, lee y estudia', ar: 'حرّك واقرأ وادرس' }}
        />
    )
}
