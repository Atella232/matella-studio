import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { StandardScoreTool } from '../../batx1-zientziak-estatistika/lab/BachStatsTools'
import { ApproxTool, BellTool, LookupTool } from '../../batx2-zientziak-banaketak/lab/DistributionsBatx2Tools'
import { normalBatx1gStages } from '../lessons'
import { DensityTool, FitNormalTool, HistogramTool } from './NormalBatx1gTools'
import { normalBatx1gLabTools, type NormalBatx1gLabToolId } from './labTools'

const toolComponents: Record<NormalBatx1gLabToolId, (props: LabToolProps) => JSX.Element> = {
    score: StandardScoreTool,
    histogram: HistogramTool,
    density: DensityTool,
    lookup: LookupTool,
    bell: BellTool,
    approx: ApproxTool,
    fitNormal: FitNormalTool
}

export function NormalBatx1gLaboratory(props: {
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
            tools={normalBatx1gLabTools}
            stages={normalBatx1gStages}
            components={toolComponents}
            title={{ eu: 'Bildu, eraiki eta doitu', es: 'Reúne, construye y ajusta', en: 'Gather, build and fit', ar: 'اجمع وابنِ وطابق' }}
        />
    )
}
