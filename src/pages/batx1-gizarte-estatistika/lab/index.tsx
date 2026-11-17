import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { CentreTool, CumulativeTool, HistogramTool } from '../../dbh2-estatistika-v2/lab/StatisticsTools'
import { BalanceTool } from '../../dbh4-akademikoak-estatistika/lab/StatisticsAkTools'
import { IntervalsTool, PercentileTool, TableTool, WhiskersTool } from '../../dbh4-aplikatuak-estatistika/lab/StatisticsTools'
import { socialStatsStages } from '../lessons'
import { BetweenTool, OgiveTool, WidthsTool } from './SocialStatsTools'
import { socialStatsLabTools, type SocialStatsLabToolId } from './labTools'

const toolComponents: Record<SocialStatsLabToolId, (props: LabToolProps) => JSX.Element> = {
    cumulative: CumulativeTool,
    intervals: IntervalsTool,
    widths: WidthsTool,
    centre: CentreTool,
    histogram: HistogramTool,
    balance: BalanceTool,
    percentile: PercentileTool,
    ogive: OgiveTool,
    whiskers: WhiskersTool,
    table: TableTool,
    between: BetweenTool
}

export function SocialStatsLaboratory(props: {
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
            tools={socialStatsLabTools}
            stages={socialStatsStages}
            components={toolComponents}
            title={{ eu: 'Ebaki, irakurri eta zenbatu', es: 'Corta, lee y cuenta', en: 'Cut, read and count', ar: 'اقطع واقرأ وعُدّ' }}
        />
    )
}
