import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { ApproxTool, BellTool, LookupTool, MachineTool } from '../../batx2-zientziak-banaketak/lab/DistributionsBatx2Tools'
import { distributionsBatx2gStages } from '../lessons'
import { BandTool, SurveysTool } from './DistributionsBatx2gTools'
import { distributionsBatx2gLabTools, type DistributionsBatx2gLabToolId } from './labTools'

const toolComponents: Record<DistributionsBatx2gLabToolId, (props: LabToolProps) => JSX.Element> = {
    machine: MachineTool,
    surveys: SurveysTool,
    lookup: LookupTool,
    bell: BellTool,
    band: BandTool,
    approx: ApproxTool
}

export function DistributionsBatx2gLaboratory(props: {
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
            tools={distributionsBatx2gLabTools}
            stages={distributionsBatx2gStages}
            components={toolComponents}
            title={{ eu: 'Errepikatu, irakurri eta zabaldu', es: 'Repite, lee y ensancha', en: 'Repeat, read and widen', ar: 'كرّر واقرأ ووسّع' }}
        />
    )
}
