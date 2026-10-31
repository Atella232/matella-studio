import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { sequencesStages } from '../lessons'
import { sequencesLabTools, type SequencesLabToolId } from './labTools'
import { BounceTool, EndlessBarTool, FrogTool, GaussTool, SticksTool } from './SequencesTools'

const toolComponents: Record<SequencesLabToolId, (props: LabToolProps) => JSX.Element> = {
    sticks: SticksTool,
    frog: FrogTool,
    gauss: GaussTool,
    bounce: BounceTool,
    bar: EndlessBarTool
}

export function SequencesLaboratory(props: {
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
            tools={sequencesLabTools}
            stages={sequencesStages}
            components={toolComponents}
            title={{ eu: 'Patroiak, jauziak eta erreboteak', es: 'Patrones, saltos y rebotes', en: 'Patterns, jumps and bounces', ar: 'أنماط وقفزات وارتدادات' }}
        />
    )
}
