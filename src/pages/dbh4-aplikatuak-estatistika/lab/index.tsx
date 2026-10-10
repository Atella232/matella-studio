import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { HistogramTool } from '../../dbh2-estatistika-v2/lab/StatisticsTools'
import { statisticsStages } from '../lessons'
import { statisticsLabTools, type StatisticsLabToolId } from './labTools'
import { ContingencyTool, IntervalsTool, PercentileTool, ScatterTool, SpreadTool, TableTool, UnionTool, UrnTool, WhiskersTool } from './StatisticsTools'

const toolComponents: Record<StatisticsLabToolId, (props: LabToolProps) => JSX.Element> = {
    intervals: IntervalsTool,
    histogram: HistogramTool,
    percentile: PercentileTool,
    whiskers: WhiskersTool,
    spread: SpreadTool,
    table: TableTool,
    scatter: ScatterTool,
    union: UnionTool,
    urn: UrnTool,
    contingency: ContingencyTool
}

export function StatisticsLaboratory(props: {
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
            tools={statisticsLabTools}
            stages={statisticsStages}
            components={toolComponents}
            title={{ eu: 'Neurtu, konparatu eta atera', es: 'Mide, compara y extrae', ar: 'قِس وقارن واسحب' }}
        />
    )
}
