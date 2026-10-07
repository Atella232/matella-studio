import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { LcmTool, QuadraticTool, SolverTool } from '../../dbh2-ekuazioak-v2/lab/EquationsTools'
import { equationsSystemsStages } from '../lessons'
import { equationsSystemsLabTools, type EquationsSystemsLabToolId } from './labTools'
import { PlaneTool, RadicalTool, ReductionTool } from './EquationsSystemsTools'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-ekuazioak-v2/lab/EquationsLab.css'
import '../../dbh2-funtzioak-v2/Functions.css'

const toolComponents: Record<EquationsSystemsLabToolId, (props: LabToolProps) => JSX.Element> = {
    solver: SolverTool,
    lcm: LcmTool,
    quadratic: QuadraticTool,
    radical: RadicalTool,
    plane: PlaneTool,
    reduction: ReductionTool
}

export function EquationsSystemsLaboratory(props: {
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
            tools={equationsSystemsLabTools}
            stages={equationsSystemsStages}
            components={toolComponents}
            title={{ eu: 'Ebatzi, egiaztatu eta ebaki', es: 'Resuelve, comprueba y corta', ar: 'حُلّ وتحقّق وقاطِع' }}
        />
    )
}
