import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-ekuazioak-v2/lab/EquationsLab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { LcmTool, SolverTool } from '../../dbh2-ekuazioak-v2/lab/EquationsTools'
import { PlaneTool, ReductionTool } from '../../dbh4-aplikatuak-ekuazioak/lab/EquationsSystemsTools'
import { SubstitutionTool } from '../../dbh4-akademikoak-sistemak/lab/SystemsTools'
import { equations3Stages } from '../lessons'
import { AgesTool, BalanceTool, GroundTool, ScalesTool } from './EquationsTools'
import { equations3LabTools, type Equations3LabToolId } from './labTools'

const toolComponents: Record<Equations3LabToolId, (props: LabToolProps) => JSX.Element> = {
    balance: BalanceTool,
    solver: SolverTool,
    lcm: LcmTool,
    ground: GroundTool,
    scales: ScalesTool,
    plane: PlaneTool,
    substitution: SubstitutionTool,
    reduction: ReductionTool,
    ages: AgesTool
}

export function Equations3Laboratory(props: {
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
            tools={equations3LabTools}
            stages={equations3Stages}
            components={toolComponents}
            title={{ eu: 'Balantzak, parabolak eta zuzenak', es: 'Balanzas, parábolas y rectas', en: 'Balances, parabolas and lines', ar: 'موازين وقطوع مكافئة ومستقيمات' }}
        />
    )
}
