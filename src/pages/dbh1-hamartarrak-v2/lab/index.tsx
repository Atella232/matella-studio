import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { decimalsStages } from '../lessons'
import { BalanceTool, CommaTool, CompareTool, DivisionTool, GridTool, PlaceTool, RoundingTool, ShiftTool, ZoomTool } from './DecimalsTools'
import { decimalsLabTools, type DecimalsLabToolId } from './labTools'

const toolComponents: Record<DecimalsLabToolId, (props: LabToolProps) => JSX.Element> = {
    grid: GridTool,
    place: PlaceTool,
    compare: CompareTool,
    zoom: ZoomTool,
    rounding: RoundingTool,
    division: DivisionTool,
    shift: ShiftTool,
    comma: CommaTool,
    balance: BalanceTool
}

export function DecimalsLaboratory(props: {
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
            tools={decimalsLabTools}
            stages={decimalsStages}
            components={toolComponents}
            title={{ eu: 'Ikusi non dagoen koma', es: 'Mira dónde está la coma', ar: 'انظر أين الفاصلة' }}
        />
    )
}
