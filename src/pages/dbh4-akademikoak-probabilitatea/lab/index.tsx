import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { DiceTool } from '../../dbh2-estatistika-v2/lab/StatisticsTools'
import { ContingencyTool, UnionTool, UrnTool } from '../../dbh4-aplikatuak-estatistika/lab/StatisticsTools'
import { probabilityAkStages } from '../lessons'
import { DrawTool, FairTool, RepeatTool, SimulateTool, ThreeDiceTool, TotalTool } from './ProbabilityAkTools'
import { probabilityAkLabTools, type ProbabilityAkLabToolId } from './labTools'

const toolComponents: Record<ProbabilityAkLabToolId, (props: LabToolProps) => JSX.Element> = {
    union: UnionTool,
    simulate: SimulateTool,
    dice: DiceTool,
    repeat: RepeatTool,
    urn: UrnTool,
    contingency: ContingencyTool,
    total: TotalTool,
    draw: DrawTool,
    'three-dice': ThreeDiceTool,
    fair: FairTool
}

export function ProbabilityAkLaboratory(props: {
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
            tools={probabilityAkLabTools}
            stages={probabilityAkStages}
            components={toolComponents}
            title={{ eu: 'Bota, zenbatu eta erabaki', es: 'Lanza, cuenta y decide', en: 'Roll, count and decide', ar: 'ارمِ وعُدّ وقرّر' }}
        />
    )
}
