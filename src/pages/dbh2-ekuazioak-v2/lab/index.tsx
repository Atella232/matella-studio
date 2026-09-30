import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { equationsStages } from '../lessons'
import { LcmTool, ProblemsTool, QuadraticTool, SolverTool, TrialTool } from './EquationsTools'
import { equationsLabTools, type EquationsLabToolId } from './labTools'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import './EquationsLab.css'

const toolComponents: Record<EquationsLabToolId, (props: LabToolProps) => JSX.Element> = {
    trial: TrialTool,
    solver: SolverTool,
    lcm: LcmTool,
    problems: ProblemsTool,
    quadratic: QuadraticTool
}

export function EquationsLaboratory(props: {
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
            tools={equationsLabTools}
            stages={equationsStages}
            components={toolComponents}
            title={{ eu: 'Probatu, ebatzi eta planteatu', es: 'Prueba, resuelve y plantea', ar: 'جرّب وحلّ وصُغ' }}
        />
    )
}
