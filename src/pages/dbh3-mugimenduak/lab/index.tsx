import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { TilingTool } from '../../dbh1-figurak-v2/lab/FiguresTools'
import { CombinationTool, VectorTool } from '../../dbh4-akademikoak-bektoreak/lab/VectorsTools'
import { HomothetyTool } from '../../dbh4-aplikatuak-antzekotasuna/lab/SimilarityTools'
import { motions3Stages } from '../lessons'
import { motions3LabTools, type Motions3LabToolId } from './labTools'
import { MirrorTool, SlideTool, TurnTool, TwoMirrorsTool } from './MotionTools'

const toolComponents: Record<Motions3LabToolId, (props: LabToolProps) => JSX.Element> = {
    vector: VectorTool,
    combination: CombinationTool,
    slide: SlideTool,
    turn: TurnTool,
    mirror: MirrorTool,
    'two-mirrors': TwoMirrorsTool,
    tiling: TilingTool,
    homothety: HomothetyTool
}

export function Motions3Laboratory(props: {
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
            tools={motions3LabTools}
            stages={motions3Stages}
            components={toolComponents}
            title={{ eu: 'Banderak, ispiluak eta biraketak', es: 'Banderas, espejos y giros', en: 'Flags, mirrors and turns', ar: 'أعلام ومرايا ودورانات' }}
        />
    )
}
