import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { functionsStages } from '../lessons'
import { LineTool, PlaneTool, ReadingTool, RelationTool, SlopeTool, TableTool } from './FunctionsTools'
import { functionsLabTools, type FunctionsLabToolId } from './labTools'

const toolComponents: Record<FunctionsLabToolId, (props: LabToolProps) => JSX.Element> = {
    plane: PlaneTool,
    relation: RelationTool,
    table: TableTool,
    reading: ReadingTool,
    slope: SlopeTool,
    line: LineTool
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
            title={{ eu: 'Kokatu, irakurri eta marraztu', es: 'Sitúa, lee y dibuja', ar: 'ضع واقرأ وارسم' }}
        />
    )
}
