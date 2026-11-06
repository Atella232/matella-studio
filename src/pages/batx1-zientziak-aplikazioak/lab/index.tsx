import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { SlopeGraphTool } from '../../batx1-zientziak-deribatuak/lab/BachDerivativesTools'
import { ExplorerTool } from '../../dbh4-aplikatuak-funtzioak/lab/FunctionsTools'
import { bachApplicationsStages } from '../lessons'
import { BoxTool, CurveTool, LayersTool, SignTool } from './BachApplicationsTools'
import { bachApplicationsLabTools, type BachApplicationsLabToolId } from './labTools'

const toolComponents: Record<BachApplicationsLabToolId, (props: LabToolProps) => JSX.Element> = {
    sign: SignTool,
    'slope-graph': SlopeGraphTool,
    explorer: ExplorerTool,
    curvature: CurveTool,
    box: BoxTool,
    layers: LayersTool
}

export function BachApplicationsLaboratory(props: {
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
            tools={bachApplicationsLabTools}
            stages={bachApplicationsStages}
            components={toolComponents}
            title={{ eu: 'Margotu, moztu eta muntatu', es: 'Pinta, corta y monta', en: 'Paint, cut and build', ar: 'لوّن واقطع وابنِ' }}
        />
    )
}
