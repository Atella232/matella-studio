import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { realsStages } from '../lessons'
import { DecimalsTool, GeneratrixTool, IntervalsTool, PowersTool, RadicalsTool, RoundingTool, ScientificTool, ZoomTool } from './RealsTools'
import { realsLabTools, type RealsLabToolId } from './labTools'

const toolComponents: Record<RealsLabToolId, (props: LabToolProps) => JSX.Element> = {
    powers: PowersTool,
    decimals: DecimalsTool,
    generatrix: GeneratrixTool,
    zoom: ZoomTool,
    intervals: IntervalsTool,
    rounding: RoundingTool,
    scientific: ScientificTool,
    radicals: RadicalsTool
}

export function RealsLaboratory(props: {
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
            tools={realsLabTools}
            stages={realsStages}
            components={toolComponents}
            title={{ eu: 'Zatitu, kokatu eta hurbildu', es: 'Divide, sitúa y aproxima', ar: 'اقسم وحدّد وقرّب' }}
        />
    )
}
