import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { statisticsStages } from '../lessons'
import { statisticsLabTools, type StatisticsLabToolId } from './labTools'
import { BoxTool, CentreTool, CumulativeTool, DiceTool, HistogramTool, PieTool } from './StatisticsTools'

const toolComponents: Record<StatisticsLabToolId, (props: LabToolProps) => JSX.Element> = {
    cumulative: CumulativeTool,
    histogram: HistogramTool,
    pie: PieTool,
    centre: CentreTool,
    box: BoxTool,
    dice: DiceTool
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
            title={{ eu: 'Antolatu, irudikatu eta jaurti', es: 'Organiza, representa y lanza', ar: 'نظّم ومثّل وارمِ' }}
        />
    )
}
