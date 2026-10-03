import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { pythagorasStages } from '../lessons'
import { pythagorasLabTools, type PythagorasLabToolId } from './labTools'
import { BoxTool, CircleTool, ClassifyTool, FigureTool, GridTool, SolveTool, SquaresTool } from './PythagorasTools'

const toolComponents: Record<PythagorasLabToolId, (props: LabToolProps) => JSX.Element> = {
    squares: SquaresTool,
    classify: ClassifyTool,
    solve: SolveTool,
    figure: FigureTool,
    circle: CircleTool,
    box: BoxTool,
    grid: GridTool
}

export function PythagorasLaboratory(props: {
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
            tools={pythagorasLabTools}
            stages={pythagorasStages}
            components={toolComponents}
            title={{ eu: 'Eraiki, neurtu eta egiaztatu', es: 'Construye, mide y comprueba', ar: 'أنشئ وقِس وتحقّق' }}
        />
    )
}
