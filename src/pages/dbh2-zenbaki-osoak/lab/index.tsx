import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { integerStages } from '../lessons'
import { integerLabTools, type IntegerLabToolId, type IntegerToolProps } from './labTools'
import { LineTool } from './LineTool'
import { MirrorTool } from './MirrorTool'
import { CompareTool } from './CompareTool'
import { CountersTool } from './CountersTool'
import { JumpsTool } from './JumpsTool'
import { SignsTool } from './SignsTool'
import { HierarchyTool } from './HierarchyTool'
import './IntegerLab.css'

const toolComponents: Record<IntegerLabToolId, (props: IntegerToolProps) => JSX.Element> = {
    line: LineTool,
    mirror: MirrorTool,
    compare: CompareTool,
    counters: CountersTool,
    jumps: JumpsTool,
    signs: SignsTool,
    hierarchy: HierarchyTool
}

export function IntegerLaboratory(props: {
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
            tools={integerLabTools}
            stages={integerStages}
            components={toolComponents}
            title={{ eu: 'Ikusi zeinua, ez ikasi soilik araua', es: 'Mira el signo, no solo memorices la regla', ar: 'شاهد الإشارة ولا تحفظ القاعدة فقط' }}
        />
    )
}
