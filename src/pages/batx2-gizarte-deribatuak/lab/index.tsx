import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { ChainTool, SlopeGraphTool, SmoothTool } from '../../batx1-zientziak-deribatuak/lab/BachDerivativesTools'
import { bach2gDerivativesStages } from '../lessons'
import { InstantRateTool, NextUnitTool, SmoothTariffTool } from './Bach2gDerivativesTools'
import { bach2gDerivativesLabTools, type Bach2gDerivativesLabToolId } from './labTools'

const toolComponents: Record<Bach2gDerivativesLabToolId, (props: LabToolProps) => JSX.Element> = {
    instant: InstantRateTool,
    smooth: SmoothTool,
    'slope-graph': SlopeGraphTool,
    chain: ChainTool,
    'smooth-tariff': SmoothTariffTool,
    'next-unit': NextUnitTool
}

export function Bach2gDerivativesLaboratory(props: {
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
            tools={bach2gDerivativesLabTools}
            stages={bach2gDerivativesStages}
            components={toolComponents}
            title={{ eu: 'Maldak, tarifak eta kostuak', es: 'Pendientes, tarifas y costes', en: 'Slopes, tariffs and costs', ar: 'ميول وتعريفات وتكاليف' }}
        />
    )
}
