import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { SectorTool } from '../../dbh1-figurak-v2/lab/FiguresTools'
import { PyramidTool, RoundTool, VolumeTool } from '../../dbh2-gorputzak-v2/lab/SolidsTools'
import { CompoundTool, RegularTool } from '../../dbh4-aplikatuak-areak/lab/AreasVolumesTools'
import { GrowthTool, ThalesTool } from '../../dbh4-aplikatuak-antzekotasuna/lab/SimilarityTools'
import { areasSimilarityStages } from '../lessons'
import { FrustumTool, ModelTool, ProjectionsTool, SegmentTool } from './AreasSimilarityTools'
import { areasSimilarityLabTools, type AreasSimilarityLabToolId } from './labTools'

const toolComponents: Record<AreasSimilarityLabToolId, (props: LabToolProps) => JSX.Element> = {
    regular: RegularTool,
    sector: SectorTool,
    segment: SegmentTool,
    pyramid: PyramidTool,
    round: RoundTool,
    volume: VolumeTool,
    compound: CompoundTool,
    thales: ThalesTool,
    projections: ProjectionsTool,
    growth: GrowthTool,
    frustum: FrustumTool,
    model: ModelTool
}

export function AreasSimilarityLaboratory(props: {
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
            tools={areasSimilarityLabTools}
            stages={areasSimilarityStages}
            components={toolComponents}
            title={{ eu: 'Neurtu, moztu eta eskalatu', es: 'Mide, corta y escala', ar: 'قِس واقطع وغيّر المقياس' }}
        />
    )
}
