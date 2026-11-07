import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { SpinTool } from '../../batx1-zientziak-trigonometria/lab/TrigonometryTools'
import { CombinationTool, VectorTool } from '../../dbh4-akademikoak-bektoreak/lab/VectorsTools'
import { CircleTool } from '../../dbh4-akademikoak-trigonometria/lab/TrigonometryTools'
import { complexStages } from '../lessons'
import { PlaneTool, RootsTool, TurnTool } from './ComplexTools'
import { konplexuakBatx1zLabTools, type KonplexuakBatx1zLabToolId } from './labTools'

const toolComponents: Record<KonplexuakBatx1zLabToolId, (props: LabToolProps) => JSX.Element> = {
    plane: PlaneTool,
    vector: VectorTool,
    combination: CombinationTool,
    circle: CircleTool,
    turn: TurnTool,
    roots: RootsTool,
    spin: SpinTool
}

export function KonplexuakBatx1zLaboratory(props: {
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
            tools={konplexuakBatx1zLabTools}
            stages={complexStages}
            components={toolComponents}
            title={{ eu: 'Mugitu, biratu eta errotu', es: 'Mueve, gira y saca raíces', en: 'Move, turn and take roots', ar: 'حرّك وأدِر واستخرج الجذور' }}
        />
    )
}
