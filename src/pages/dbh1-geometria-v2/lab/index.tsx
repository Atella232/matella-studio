import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { geometryIntroStages } from '../lessons'
import { AreaTool, CircleTool, ProtractorTool, PythagorasTool, TriangleTool } from './GeometryTools'
import { geometryLabTools, type GeometryLabToolId } from './labTools'
import './GeometryLab.css'

const toolComponents: Record<GeometryLabToolId, (props: LabToolProps) => JSX.Element> = {
    protractor: ProtractorTool,
    triangle: TriangleTool,
    pythagoras: PythagorasTool,
    area: AreaTool,
    circle: CircleTool
}

export function GeometryIntroLaboratory(props: {
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
            tools={geometryLabTools}
            stages={geometryIntroStages}
            components={toolComponents}
            title={{ eu: 'Neurtu, eraiki eta kalkulatu', es: 'Mide, construye y calcula', ar: 'قِس وابنِ واحسب' }}
        />
    )
}
