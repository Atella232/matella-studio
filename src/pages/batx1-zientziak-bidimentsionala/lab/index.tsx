import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { ContingencyTool, ScatterTool } from '../../dbh4-aplikatuak-estatistika/lab/StatisticsTools'
import { bivarStages } from '../lessons'
import { IndependenceTool, QuadrantsTool, ScissorsTool } from './BivarTools'
import { bivarLabTools, type BivarLabToolId } from './labTools'

const toolComponents: Record<BivarLabToolId, (props: LabToolProps) => JSX.Element> = {
    contingency: ContingencyTool,
    independence: IndependenceTool,
    quadrants: QuadrantsTool,
    scatter: ScatterTool,
    scissors: ScissorsTool
}

export function BivarLaboratory(props: {
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
            tools={bivarLabTools}
            stages={bivarStages}
            components={toolComponents}
            title={{ eu: 'Mugitu puntuak, zuzenak eta gelaxkak', es: 'Mueve puntos, rectas y casillas', en: 'Move points, lines and cells', ar: 'حرّك النقاط والمستقيمات والخانات' }}
        />
    )
}
