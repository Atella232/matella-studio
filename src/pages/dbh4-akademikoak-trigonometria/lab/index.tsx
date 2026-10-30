import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { trigonometryStages } from '../lessons'
import { trigonometryLabTools, type TrigonometryLabToolId } from './labTools'
import { AreaTool, CalculatorTool, CircleTool, DoubleTool, ElevationTool, FundamentalTool, NotableTool, RadianTool, RatiosTool, TwoSidesTool } from './TrigonometryTools'

const toolComponents: Record<TrigonometryLabToolId, (props: LabToolProps) => JSX.Element> = {
    ratios: RatiosTool,
    notable: NotableTool,
    fundamental: FundamentalTool,
    calculator: CalculatorTool,
    'two-sides': TwoSidesTool,
    elevation: ElevationTool,
    double: DoubleTool,
    area: AreaTool,
    circle: CircleTool,
    radian: RadianTool
}

export function TrigonometryLaboratory(props: {
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
            tools={trigonometryLabTools}
            stages={trigonometryStages}
            components={toolComponents}
            title={{ eu: 'Neurtu, kalkulatu eta biratu', es: 'Mide, calcula y gira', en: 'Measure, calculate and rotate', ar: 'قِس واحسب ودوّر' }}
        />
    )
}
