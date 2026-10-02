import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { DecimalsTool, GeneratrixTool, IntervalsTool, RoundingTool, ZoomTool } from '../../dbh4-aplikatuak-errealak/lab/RealsTools'
import { realsPercentStages } from '../lessons'
import { realsPercentLabTools, type RealsPercentLabToolId } from './labTools'
import { InterestTool, PercentTool, PythagorasTool } from './PercentTools'

const toolComponents: Record<RealsPercentLabToolId, (props: LabToolProps) => JSX.Element> = {
    decimals: DecimalsTool,
    generatrix: GeneratrixTool,
    pythagoras: PythagorasTool,
    zoom: ZoomTool,
    intervals: IntervalsTool,
    rounding: RoundingTool,
    percent: PercentTool,
    interest: InterestTool
}

export function RealsPercentLaboratory(props: {
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
            tools={realsPercentLabTools}
            stages={realsPercentStages}
            components={toolComponents}
            title={{ eu: 'Kokatu, hurbildu eta kalkulatu', es: 'Sitúa, aproxima y calcula', ar: 'حدّد وقرّب واحسب' }}
        />
    )
}
