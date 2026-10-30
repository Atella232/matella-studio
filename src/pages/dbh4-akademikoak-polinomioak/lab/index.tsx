import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { AreaTool, IdentityTool } from '../../dbh2-aljebra-v2/lab/AlgebraTools'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-aljebra-v2/lab/Algebra2Lab.css'
import { RootsTool, RuffiniTool } from '../../dbh4-aplikatuak-polinomioak/lab/PolynomialsTools'
import { polynomialsFractionsStages } from '../lessons'
import { polynomialsFractionsLabTools, type PolynomialsFractionsLabToolId } from './labTools'
import { BinomialTool, CommonTool, DomainTool, GcdTool, ParameterTool, QuadraticTool, SimplifyTool, TapsTool } from './PolynomialsFractionsTools'

const toolComponents: Record<PolynomialsFractionsLabToolId, (props: LabToolProps) => JSX.Element> = {
    area: AreaTool,
    identities: IdentityTool,
    binomial: BinomialTool,
    ruffini: RuffiniTool,
    parameter: ParameterTool,
    roots: RootsTool,
    quadratic: QuadraticTool,
    gcd: GcdTool,
    domain: DomainTool,
    simplify: SimplifyTool,
    common: CommonTool,
    taps: TapsTool
}

export function PolynomialsFractionsLaboratory(props: {
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
            tools={polynomialsFractionsLabTools}
            stages={polynomialsFractionsStages}
            components={toolComponents}
            title={{ eu: 'Zatitu, faktorizatu eta sinplifikatu', es: 'Divide, factoriza y simplifica', en: 'Divide, factorise and simplify', ar: 'اقسم وحلّل وبسّط' }}
        />
    )
}
