import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { PolygonTool, SectorTool } from '../../dbh1-figurak-v2/lab/FiguresTools'
import { ClassifyTool, FigureTool, SolveTool } from '../../dbh2-pitagoras-v2/lab/PythagorasTools'
import { BoxTool, PyramidTool, RoundTool, VolumeTool } from '../../dbh2-gorputzak-v2/lab/SolidsTools'
import { areasVolumesStages } from '../lessons'
import { areasVolumesLabTools, type AreasVolumesLabToolId } from './labTools'
import { ArcTool, CompoundTool, RegularTool } from './AreasVolumesTools'

const toolComponents: Record<AreasVolumesLabToolId, (props: LabToolProps) => JSX.Element> = {
    polygon: PolygonTool,
    classify: ClassifyTool,
    circle: ArcTool,
    solve: SolveTool,
    figure: FigureTool,
    regular: RegularTool,
    sector: SectorTool,
    box: BoxTool,
    pyramid: PyramidTool,
    round: RoundTool,
    volume: VolumeTool,
    compound: CompoundTool
}

export function AreasVolumesLaboratory(props: {
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
            tools={areasVolumesLabTools}
            stages={areasVolumesStages}
            components={toolComponents}
            title={{ eu: 'Neurtu, zabaldu eta bete', es: 'Mide, despliega y llena', ar: 'قِس وانشر واملأ' }}
        />
    )
}
