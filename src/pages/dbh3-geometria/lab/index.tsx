import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { PolygonTool, SectorTool } from '../../dbh1-figurak-v2/lab/FiguresTools'
import { FigureTool, SquaresTool } from '../../dbh2-pitagoras-v2/lab/PythagorasTools'
import { RegularTool } from '../../dbh4-aplikatuak-areak/lab/AreasVolumesTools'
import { ThalesTool } from '../../dbh4-aplikatuak-antzekotasuna/lab/SimilarityTools'
import { geometry3Stages } from '../lessons'
import { EnlargeTool, InscribedTool, LadderTool, NotableTool } from './GeometryTools'
import { geometry3LabTools, type Geometry3LabToolId } from './labTools'

const toolComponents: Record<Geometry3LabToolId, (props: LabToolProps) => JSX.Element> = {
    polygon: PolygonTool,
    inscribed: InscribedTool,
    notable: NotableTool,
    squares: SquaresTool,
    figure: FigureTool,
    ladder: LadderTool,
    regular: RegularTool,
    sector: SectorTool,
    thales: ThalesTool,
    enlarge: EnlargeTool
}

export function Geometry3Laboratory(props: {
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
            tools={geometry3LabTools}
            stages={geometry3Stages}
            components={toolComponents}
            title={{ eu: 'Angeluak, eskailerak eta kopiak', es: 'Ángulos, escaleras y copias', en: 'Angles, ladders and copies', ar: 'زوايا وسلالم ونسخ' }}
        />
    )
}
