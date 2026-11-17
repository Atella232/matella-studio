import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { DomainsTool, JoinTool } from '../../dbh4-akademikoak-funtzioak/lab/FunctionsAkTools'
import { AbsoluteTool, FitTool } from '../../dbh4-akademikoak-polinomikoak/lab/PolynomialAkTools'
import { FrameTool, HyperbolaTool, ParabolaTool, PointSlopeTool, RootTool } from '../../dbh4-aplikatuak-grafikoa/lab/GraphsTools'
import { socFunctionsStages } from '../lessons'
import { socFunctionsLabTools, type SocFunctionsLabToolId } from './labTools'
import { AverageTool, EstimateTool, PriceTool } from './SocFunctionsTools'

const toolComponents: Record<SocFunctionsLabToolId, (props: LabToolProps) => JSX.Element> = {
    domains: DomainsTool,
    frame: FrameTool,
    estimate: EstimateTool,
    'point-slope': PointSlopeTool,
    price: PriceTool,
    parabola: ParabolaTool,
    fit: FitTool,
    average: AverageTool,
    hyperbola: HyperbolaTool,
    root: RootTool,
    join: JoinTool,
    absolute: AbsoluteTool
}

export function SocFunctionsLaboratory(props: {
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
            tools={socFunctionsLabTools}
            stages={socFunctionsStages}
            components={toolComponents}
            title={{ eu: 'Estimatu, saldu eta ekoitzi', es: 'Estima, vende y produce', en: 'Estimate, sell and produce', ar: 'قدّر وبِع وأنتج' }}
        />
    )
}
