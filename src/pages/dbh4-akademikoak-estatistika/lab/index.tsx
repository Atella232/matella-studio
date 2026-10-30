import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { CentreTool, CumulativeTool, HistogramTool } from '../../dbh2-estatistika-v2/lab/StatisticsTools'
import { IntervalsTool, PercentileTool, ScatterTool, TableTool, WhiskersTool } from '../../dbh4-aplikatuak-estatistika/lab/StatisticsTools'
import { statisticsAkStages } from '../lessons'
import { BalanceTool, DeviationTool, StrataTool, TransformTool } from './StatisticsAkTools'
import { statisticsAkLabTools, type StatisticsAkLabToolId } from './labTools'

const toolComponents: Record<StatisticsAkLabToolId, (props: LabToolProps) => JSX.Element> = {
    strata: StrataTool,
    cumulative: CumulativeTool,
    intervals: IntervalsTool,
    balance: BalanceTool,
    centre: CentreTool,
    histogram: HistogramTool,
    percentile: PercentileTool,
    whiskers: WhiskersTool,
    deviation: DeviationTool,
    table: TableTool,
    transform: TransformTool,
    scatter: ScatterTool
}

export function StatisticsAkLaboratory(props: {
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
            tools={statisticsAkLabTools}
            stages={statisticsAkStages}
            components={toolComponents}
            title={{ eu: 'Lagindu, orekatu eta neurtu', es: 'Muestrea, equilibra y mide', en: 'Sample, balance and measure', ar: 'خذ عيّنة ووازن وقِس' }}
        />
    )
}
