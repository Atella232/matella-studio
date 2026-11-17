import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-aljebra-v2/lab/Algebra2Lab.css'
import '../../dbh2-ekuazioak-v2/lab/EquationsLab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { ChangeMachineTool, SignTableTool } from '../../batx1-zientziak-ekuazioak/lab/BachEquationsTools'
import { GaussMachineTool } from '../../batx1-zientziak-sistemak/lab/BachSystemsTools'
import { ExponentialTool } from '../../dbh4-akademikoak-ekuazioak/lab/EquationsInequalitiesTools'
import { CircleTool, HalfPlaneTool, MixtureTool, RegionTool } from '../../dbh4-akademikoak-sistemak/lab/SystemsTools'
import { RadicalTool } from '../../dbh4-aplikatuak-ekuazioak/lab/EquationsSystemsTools'
import { RootsTool, RuffiniTool } from '../../dbh4-aplikatuak-polinomioak/lab/PolynomialsTools'
import { gizAlgebraStages } from '../lessons'
import { BreakEvenTool, BudgetTool, MarketTool } from './GizAlgebraTools'
import { gizAlgebraLabTools, type GizAlgebraLabToolId } from './labTools'

const toolComponents: Record<GizAlgebraLabToolId, (props: LabToolProps) => JSX.Element> = {
    ruffini: RuffiniTool,
    'root-hunt': RootsTool,
    'change-machine': ChangeMachineTool,
    radical: RadicalTool,
    exponential: ExponentialTool,
    circle: CircleTool,
    'gauss-machine': GaussMachineTool,
    mixture: MixtureTool,
    'sign-table': SignTableTool,
    'half-plane': HalfPlaneTool,
    region: RegionTool,
    'break-even': BreakEvenTool,
    market: MarketTool,
    budget: BudgetTool
}

export function GizAlgebraLaboratory(props: {
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
            tools={gizAlgebraLabTools}
            stages={gizAlgebraStages}
            components={toolComponents}
            title={{ eu: 'Faktorizatu, berdindu eta kokatu', es: 'Factoriza, iguala y sitúa', en: 'Factorise, equate and place', ar: 'حلّل وساوِ وضع' }}
        />
    )
}
