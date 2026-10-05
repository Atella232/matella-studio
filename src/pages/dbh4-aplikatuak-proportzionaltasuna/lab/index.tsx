import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { ClassifyTool } from '../../dbh1-proportzionaltasuna-v2/lab/ProportionTools'
import { ChainTool, CompoundTool, InterestTool, ShareTool } from '../../dbh2-proportzionaltasuna-v2/lab/ProportionDbh2Tools'
import { proportionDbh4ApStages } from '../lessons'
import { proportionDbh4ApLabTools, type ProportionDbh4ApLabToolId } from './labTools'
import { GrowthTool, MixtureTool, MotionTool, TapsTool } from './ProportionDbh4ApTools'

const toolComponents: Record<ProportionDbh4ApLabToolId, (props: LabToolProps) => JSX.Element> = {
    classify: ClassifyTool,
    compound: CompoundTool,
    share: ShareTool,
    chain: ChainTool,
    interest: InterestTool,
    growth: GrowthTool,
    mixture: MixtureTool,
    motion: MotionTool,
    taps: TapsTool
}

export function ProportionDbh4ApLaboratory(props: {
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
            tools={proportionDbh4ApLabTools}
            stages={proportionDbh4ApStages}
            components={toolComponents}
            title={{ eu: 'Proportzioak, bankua eta errepidea', es: 'Proporciones, el banco y la carretera', ar: 'التناسبات والمصرف والطريق' }}
        />
    )
}
