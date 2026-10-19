import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { LineTool, SlopeTool } from '../../dbh2-funtzioak-v2/lab/FunctionsTools'
import { InterceptsTool } from '../../dbh4-aplikatuak-funtzioak/lab/FunctionsTools'
import { HyperbolaTool, ParabolaTool, PointSlopeTool } from '../../dbh4-aplikatuak-grafikoa/lab/GraphsTools'
import { polynomialAkStages } from '../lessons'
import { polynomialAkLabTools, type PolynomialAkLabToolId } from './labTools'
import { AbsoluteTool, FitTool, RationalTool, SecantTool } from './PolynomialAkTools'

const toolComponents: Record<PolynomialAkLabToolId, (props: LabToolProps) => JSX.Element> = {
    line: LineTool,
    slope: SlopeTool,
    'point-slope': PointSlopeTool,
    parabola: ParabolaTool,
    intercepts: InterceptsTool,
    fit: FitTool,
    secant: SecantTool,
    absolute: AbsoluteTool,
    hyperbola: HyperbolaTool,
    rational: RationalTool
}

export function PolynomialAkLaboratory(props: {
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
            tools={polynomialAkLabTools}
            stages={polynomialAkStages}
            components={toolComponents}
            title={{ eu: 'Mugitu, ebaki eta tolestu', es: 'Mueve, corta y dobla', ar: 'حرّك واقطع واطوِ' }}
        />
    )
}
