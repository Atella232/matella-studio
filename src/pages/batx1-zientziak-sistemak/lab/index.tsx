import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-ekuazioak-v2/lab/EquationsLab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { CircleTool, ClassifyTool, HalfPlaneTool, MixtureTool, RegionTool, SquaresTool } from '../../dbh4-akademikoak-sistemak/lab/SystemsTools'
import { bachSystemsStages } from '../lessons'
import { GaussMachineTool, ParameterSliderTool, SolutionFamilyTool } from './BachSystemsTools'
import { bachSystemsLabTools, type BachSystemsLabToolId } from './labTools'

const toolComponents: Record<BachSystemsLabToolId, (props: LabToolProps) => JSX.Element> = {
    classify: ClassifyTool,
    'gauss-machine': GaussMachineTool,
    mixture: MixtureTool,
    'solution-family': SolutionFamilyTool,
    'parameter-slider': ParameterSliderTool,
    circle: CircleTool,
    squares: SquaresTool,
    'half-plane': HalfPlaneTool,
    region: RegionTool
}

export function BachSystemsLaboratory(props: {
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
            tools={bachSystemsLabTools}
            stages={bachSystemsStages}
            components={toolComponents}
            title={{ eu: 'Mailakatu, mugitu eta eztabaidatu', es: 'Escalona, mueve y discute', en: 'Triangulate, move and analyse', ar: 'حوّل وحرّك وناقش' }}
        />
    )
}
