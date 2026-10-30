import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-ekuazioak-v2/lab/EquationsLab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { PlaneTool, ReductionTool } from '../../dbh4-aplikatuak-ekuazioak/lab/EquationsSystemsTools'
import { systemsStages } from '../lessons'
import { systemsLabTools, type SystemsLabToolId } from './labTools'
import { CircleTool, ClassifyTool, HalfPlaneTool, MixtureTool, RegionTool, ShoppingTool, SquaresTool, SubstitutionTool } from './SystemsTools'

const toolComponents: Record<SystemsLabToolId, (props: LabToolProps) => JSX.Element> = {
    plane: PlaneTool,
    classify: ClassifyTool,
    substitution: SubstitutionTool,
    reduction: ReductionTool,
    circle: CircleTool,
    squares: SquaresTool,
    'half-plane': HalfPlaneTool,
    region: RegionTool,
    mixture: MixtureTool,
    shopping: ShoppingTool
}

export function SystemsLaboratory(props: {
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
            tools={systemsLabTools}
            stages={systemsStages}
            components={toolComponents}
            title={{ eu: 'Ebatzi, irudikatu eta zenbatu', es: 'Resuelve, representa y cuenta', en: 'Solve, graph and count', ar: 'حلّ ومثّل وعُدّ' }}
        />
    )
}
