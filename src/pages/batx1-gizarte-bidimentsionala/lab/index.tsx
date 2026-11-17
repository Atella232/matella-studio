import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { IndependenceTool, QuadrantsTool, ScissorsTool } from '../../batx1-zientziak-bidimentsionala/lab/BivarTools'
import { ContingencyTool, ScatterTool } from '../../dbh4-aplikatuak-estatistika/lab/StatisticsTools'
import { socialBivarStages } from '../lessons'
import { RelationTool, ReliableTool } from './SocialBivarTools'
import { socialBivarLabTools, type SocialBivarLabToolId } from './labTools'

const toolComponents: Record<SocialBivarLabToolId, (props: LabToolProps) => JSX.Element> = {
    relation: RelationTool,
    quadrants: QuadrantsTool,
    scatter: ScatterTool,
    reliable: ReliableTool,
    scissors: ScissorsTool,
    contingency: ContingencyTool,
    independence: IndependenceTool
}

export function SocialBivarLaboratory(props: {
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
            tools={socialBivarLabTools}
            stages={socialBivarStages}
            components={toolComponents}
            title={{ eu: 'Mugitu, estimatu eta konparatu', es: 'Mueve, estima y compara', en: 'Move, estimate and compare', ar: 'حرّك وقدّر وقارن' }}
        />
    )
}
