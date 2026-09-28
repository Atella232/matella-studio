import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { statisticsIntroStages } from '../lessons'
import { ChartsTool, DiceTool, MeanTool, TableTool, VariablesTool } from './StatisticsTools'
import { statisticsLabTools, type StatisticsLabToolId } from './labTools'
import './StatisticsLab.css'

const toolComponents: Record<StatisticsLabToolId, (props: LabToolProps) => JSX.Element> = {
    variables: VariablesTool,
    table: TableTool,
    charts: ChartsTool,
    mean: MeanTool,
    dice: DiceTool
}

export function StatisticsIntroLaboratory(props: {
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
            stages={statisticsIntroStages}
            components={toolComponents}
            title={{ eu: 'Bildu, antolatu eta jaurti', es: 'Recoge, organiza y lanza', ar: 'اجمع ونظّم وارمِ' }}
        />
    )
}
