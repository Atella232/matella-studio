import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { figuresStages } from '../lessons'
import { figuresLabTools, type FiguresLabToolId } from './labTools'
import { CentersTool, CirclesTool, CompositeTool, PolygonTool, QuadTool, SectorTool, TilingTool, TriangleTool } from './FiguresTools'

const toolComponents: Record<FiguresLabToolId, (props: LabToolProps) => JSX.Element> = {
    polygon: PolygonTool,
    tiling: TilingTool,
    triangle: TriangleTool,
    centers: CentersTool,
    quad: QuadTool,
    circles: CirclesTool,
    sector: SectorTool,
    composite: CompositeTool
}

export function FiguresLaboratory(props: {
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
            tools={figuresLabTools}
            stages={figuresStages}
            components={toolComponents}
            title={{ eu: 'Mugitu, eraiki eta neurtu', es: 'Mueve, construye y mide', ar: 'حرّك وأنشئ وقِس' }}
        />
    )
}
