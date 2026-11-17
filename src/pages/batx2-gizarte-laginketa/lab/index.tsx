import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { SampleTool } from '../../dbh3-estatistika/lab/StatsTools'
import { StrataTool } from '../../dbh4-akademikoak-estatistika/lab/StatisticsAkTools'
import { samplingBatx2gStages } from '../lessons'
import { ManyTool, UrnTool } from './SamplingBatx2gTools'
import { samplingBatx2gLabTools, type SamplingBatx2gLabToolId } from './labTools'

const toolComponents: Record<SamplingBatx2gLabToolId, (props: LabToolProps) => JSX.Element> = {
    sample: SampleTool,
    strata: StrataTool,
    urn: UrnTool,
    many: ManyTool
}

export function SamplingBatx2gLaboratory(props: {
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
            tools={samplingBatx2gLabTools}
            stages={samplingBatx2gStages}
            components={toolComponents}
            title={{ eu: 'Atera, batu eta begiratu', es: 'Saca, junta y mira', en: 'Draw, gather and look', ar: 'اسحب واجمع وانظر' }}
        />
    )
}
