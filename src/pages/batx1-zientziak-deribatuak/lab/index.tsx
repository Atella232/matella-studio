import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { CompositionTool } from '../../batx1-zientziak-funtzioak/lab/BachFunctionsTools'
import { RateTool } from '../../dbh4-aplikatuak-funtzioak/lab/FunctionsTools'
import { bachDerivativesStages } from '../lessons'
import { ChainTool, SecantTool, SlopeGraphTool, SmoothTool } from './BachDerivativesTools'
import { bachDerivativesLabTools, type BachDerivativesLabToolId } from './labTools'

const toolComponents: Record<BachDerivativesLabToolId, (props: LabToolProps) => JSX.Element> = {
    rate: RateTool,
    secant: SecantTool,
    smooth: SmoothTool,
    'slope-graph': SlopeGraphTool,
    chain: ChainTool,
    composition: CompositionTool
}

export function BachDerivativesLaboratory(props: {
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
            tools={bachDerivativesLabTools}
            stages={bachDerivativesStages}
            components={toolComponents}
            title={{ eu: 'Hurbildu, lotu eta kateatu', es: 'Acerca, une y encadena', en: 'Close in, join and chain', ar: 'قرّب وصِل وسلسِل' }}
        />
    )
}
