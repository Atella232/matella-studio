import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { ChainTool, SlopeGraphTool } from '../../batx1-zientziak-deribatuak/lab/BachDerivativesTools'
import { bachIntegralsStages } from '../lessons'
import { AreaFunctionTool, BetweenTool, RectanglesTool, SignedTool } from './BachIntegralsTools'
import { bachIntegralsLabTools, type BachIntegralsLabToolId } from './labTools'

const toolComponents: Record<BachIntegralsLabToolId, (props: LabToolProps) => JSX.Element> = {
    'slope-graph': SlopeGraphTool,
    chain: ChainTool,
    rectangles: RectanglesTool,
    'area-function': AreaFunctionTool,
    signed: SignedTool,
    between: BetweenTool
}

export function BachIntegralsLaboratory(props: {
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
            tools={bachIntegralsLabTools}
            stages={bachIntegralsStages}
            components={toolComponents}
            title={{ eu: 'Bete, margotu eta pilatu', es: 'Rellena, pinta y acumula', en: 'Fill, paint and pile up', ar: 'املأ ولوّن وراكم' }}
        />
    )
}
