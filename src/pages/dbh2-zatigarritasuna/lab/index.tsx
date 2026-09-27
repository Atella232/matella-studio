import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { divisibilityStages } from '../lessons'
import { CriteriaTool } from './CriteriaTool'
import { JumpsTool } from './JumpsTool'
import { divisibilityLabTools, type DivisibilityLabToolId, type DivisibilityToolProps } from './labTools'
import { LadderTool } from './LadderTool'
import { RectanglesTool } from './RectanglesTool'
import { SieveTool } from './SieveTool'
import { SortTool } from './SortTool'
import { VennTool } from './VennTool'
import './DivisibilityLab.css'

const toolComponents: Record<DivisibilityLabToolId, (props: DivisibilityToolProps) => JSX.Element> = {
    rectangles: RectanglesTool,
    jumps: JumpsTool,
    criteria: CriteriaTool,
    sieve: SieveTool,
    ladder: LadderTool,
    venn: VennTool,
    sort: SortTool
}

export function DivisibilityLaboratory(props: {
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
            tools={divisibilityLabTools}
            stages={divisibilityStages}
            components={toolComponents}
            title={{ eu: 'Ikusi zenbakiak barrutik', es: 'Mira los números por dentro', ar: 'انظر إلى الأعداد من الداخل' }}
        />
    )
}
