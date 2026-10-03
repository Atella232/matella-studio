import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { solidsStages } from '../lessons'
import { solidsLabTools, type SolidsLabToolId } from './labTools'
import { BoxTool, PlatonicTool, PolyhedronTool, PyramidTool, RoundTool, TankTool, VolumeTool } from './SolidsTools'

const toolComponents: Record<SolidsLabToolId, (props: LabToolProps) => JSX.Element> = {
    polyhedron: PolyhedronTool,
    platonic: PlatonicTool,
    box: BoxTool,
    pyramid: PyramidTool,
    round: RoundTool,
    tank: TankTool,
    volume: VolumeTool
}

export function SolidsLaboratory(props: {
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
            tools={solidsLabTools}
            stages={solidsStages}
            components={toolComponents}
            title={{ eu: 'Eraiki, garatu eta bete', es: 'Construye, desarrolla y llena', ar: 'أنشئ وانشر واملأ' }}
        />
    )
}
