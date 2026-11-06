import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { CentreTool, CumulativeTool, HistogramTool } from '../../dbh2-estatistika-v2/lab/StatisticsTools'
import { AxisTool } from '../../dbh3-estatistika/lab/StatsTools'
import { BalanceTool, DeviationTool, TransformTool } from '../../dbh4-akademikoak-estatistika/lab/StatisticsAkTools'
import { IntervalsTool, PercentileTool, TableTool, WhiskersTool } from '../../dbh4-aplikatuak-estatistika/lab/StatisticsTools'
import { bachStatsStages } from '../lessons'
import { HistogramTailTool, OutlierTool, StandardScoreTool } from './BachStatsTools'
import { bachStatsLabTools, type BachStatsLabToolId } from './labTools'

const toolComponents: Record<BachStatsLabToolId, (props: LabToolProps) => JSX.Element> = {
    cumulative: CumulativeTool,
    intervals: IntervalsTool,
    axis: AxisTool,
    centre: CentreTool,
    histogram: HistogramTool,
    balance: BalanceTool,
    percentile: PercentileTool,
    whiskers: WhiskersTool,
    tail: HistogramTailTool,
    deviation: DeviationTool,
    table: TableTool,
    outlier: OutlierTool,
    score: StandardScoreTool,
    transform: TransformTool
}

export function BachStatsLaboratory(props: {
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
            tools={bachStatsLabTools}
            stages={bachStatsStages}
            components={toolComponents}
            title={{ eu: 'Mugitu, konparatu eta neurtu', es: 'Mueve, compara y mide', en: 'Move, compare and measure', ar: 'حرّك وقارن وقِس' }}
        />
    )
}
