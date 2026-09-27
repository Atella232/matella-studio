import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { naturalsStages } from '../lessons'
import { AbacusTool } from './AbacusTool'
import { DistributiveTool } from './DistributiveTool'
import { DivisionTool } from './DivisionTool'
import { naturalsLabTools, type NaturalsLabToolId, type NaturalsToolProps } from './labTools'
import { LineTool } from './LineTool'
import { PowersTool } from './PowersTool'
import { RomanTool } from './RomanTool'
import { RoundingTool } from './RoundingTool'
import { SemaphoreTool } from './SemaphoreTool'
import './NaturalsLab.css'

const toolComponents: Record<NaturalsLabToolId, (props: NaturalsToolProps) => JSX.Element> = {
    abacus: AbacusTool,
    line: LineTool,
    roman: RomanTool,
    rounding: RoundingTool,
    distributive: DistributiveTool,
    division: DivisionTool,
    semaphore: SemaphoreTool,
    powers: PowersTool
}

export function NaturalsLaboratory(props: {
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
            tools={naturalsLabTools}
            stages={naturalsStages}
            components={toolComponents}
            title={{ eu: 'Ukitu zenbakiak', es: 'Toca los números', ar: 'المس الأعداد' }}
        />
    )
}
