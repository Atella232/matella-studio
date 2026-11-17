import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { LookupTool } from '../../batx2-zientziak-banaketak/lab/DistributionsBatx2Tools'
import { BandTool } from '../../batx2-gizarte-banaketak/lab/DistributionsBatx2gTools'
import { inferenceBatx2gStages } from '../lessons'
import { HundredTool, MarginTool } from './InferenceBatx2gTools'
import { inferenceBatx2gLabTools, type InferenceBatx2gLabToolId } from './labTools'

const toolComponents: Record<InferenceBatx2gLabToolId, (props: LabToolProps) => JSX.Element> = {
    lookup: LookupTool,
    band: BandTool,
    hundred: HundredTool,
    margin: MarginTool
}

export function InferenceBatx2gLaboratory(props: {
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
            tools={inferenceBatx2gLabTools}
            stages={inferenceBatx2gStages}
            components={toolComponents}
            title={{ eu: 'Estimatu, harrapatu eta neurtu', es: 'Estima, atrapa y mide', en: 'Estimate, catch and measure', ar: 'قدّر والتقط وقِس' }}
        />
    )
}
