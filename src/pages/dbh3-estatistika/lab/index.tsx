import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { BoxTool, CentreTool, CumulativeTool, HistogramTool, PieTool } from '../../dbh2-estatistika-v2/lab/StatisticsTools'
import { IntervalsTool, PercentileTool, SpreadTool, UnionTool, UrnTool } from '../../dbh4-aplikatuak-estatistika/lab/StatisticsTools'
import { stats3Stages } from '../lessons'
import { stats3LabTools, type Stats3LabToolId } from './labTools'
import { AxisTool, NeededTool, SampleTool, SpinnerTool } from './StatsTools'

const toolComponents: Record<Stats3LabToolId, (props: LabToolProps) => JSX.Element> = {
    sample: SampleTool,
    cumulative: CumulativeTool,
    intervals: IntervalsTool,
    histogram: HistogramTool,
    pie: PieTool,
    axis: AxisTool,
    needed: NeededTool,
    centre: CentreTool,
    percentile: PercentileTool,
    box: BoxTool,
    spread: SpreadTool,
    union: UnionTool,
    spinner: SpinnerTool,
    urn: UrnTool
}

export function Stats3Laboratory(props: {
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
            tools={stats3LabTools}
            stages={stats3Stages}
            components={toolComponents}
            title={{ eu: 'Laginak, ardatzak eta ruletak', es: 'Muestras, ejes y ruletas', en: 'Samples, axes and spinners', ar: 'عيّنات ومحاور ودواليب' }}
        />
    )
}
