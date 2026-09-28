import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { algebraIntroStages } from '../lessons'
import { BalanceTool, MachineTool, TilesTool, TranslateTool, TrialTool } from './AlgebraTools'
import { algebraLabTools, type AlgebraLabToolId } from './labTools'
import './AlgebraLab.css'

const toolComponents: Record<AlgebraLabToolId, (props: LabToolProps) => JSX.Element> = {
    translate: TranslateTool,
    machine: MachineTool,
    tiles: TilesTool,
    balance: BalanceTool,
    trial: TrialTool
}

export function AlgebraIntroLaboratory(props: {
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
            tools={algebraLabTools}
            stages={algebraIntroStages}
            components={toolComponents}
            title={{ eu: 'Letrak ukitu eta orekatu', es: 'Toca las letras y equilibra', ar: 'المس الحروف ووازن' }}
        />
    )
}
