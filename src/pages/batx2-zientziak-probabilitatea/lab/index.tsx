import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { DrawTool, RepeatTool, TotalTool } from '../../dbh4-akademikoak-probabilitatea/lab/ProbabilityAkTools'
import { ContingencyTool, UnionTool, UrnTool } from '../../dbh4-aplikatuak-estatistika/lab/StatisticsTools'
import { probabilityBatx2Stages } from '../lessons'
import { probabilityBatx2LabTools, type ProbabilityBatx2LabToolId } from './labTools'
import { CausesTool, MosaicTool, PaintTool, PeopleTool, ZonesTool } from './ProbabilityBatx2Tools'

const toolComponents: Record<ProbabilityBatx2LabToolId, (props: LabToolProps) => JSX.Element> = {
    union: UnionTool,
    urn: UrnTool,
    draw: DrawTool,
    paint: PaintTool,
    zones: ZonesTool,
    mosaic: MosaicTool,
    repeat: RepeatTool,
    contingency: ContingencyTool,
    total: TotalTool,
    causes: CausesTool,
    people: PeopleTool
}

export function ProbabilityBatx2Laboratory(props: {
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
            tools={probabilityBatx2LabTools}
            stages={probabilityBatx2Stages}
            components={toolComponents}
            title={{ eu: 'Margotu, moztu eta buelta eman', es: 'Pinta, corta y da la vuelta', en: 'Paint, cut and turn around', ar: 'لوّن واقطع واقلب' }}
        />
    )
}
