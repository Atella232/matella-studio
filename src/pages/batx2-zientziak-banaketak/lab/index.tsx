import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { StandardScoreTool } from '../../batx1-zientziak-estatistika/lab/BachStatsTools'
import { PascalTool } from '../../dbh4-akademikoak-konbinatoria/lab/CombinatoricsAkTools'
import { distributionsBatx2Stages } from '../lessons'
import { ApproxTool, BellTool, BuildTool, LookupTool, MachineTool } from './DistributionsBatx2Tools'
import { distributionsBatx2LabTools, type DistributionsBatx2LabToolId } from './labTools'

const toolComponents: Record<DistributionsBatx2LabToolId, (props: LabToolProps) => JSX.Element> = {
    pascal: PascalTool,
    score: StandardScoreTool,
    build: BuildTool,
    machine: MachineTool,
    bell: BellTool,
    lookup: LookupTool,
    approx: ApproxTool
}

export function DistributionsBatx2Laboratory(props: {
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
            tools={distributionsBatx2LabTools}
            stages={distributionsBatx2Stages}
            components={toolComponents}
            title={{ eu: 'Eraiki, margotu eta tipifikatu', es: 'Construye, pinta y tipifica', en: 'Build, paint and standardise', ar: 'ابنِ ولوّن ووحّد' }}
        />
    )
}
