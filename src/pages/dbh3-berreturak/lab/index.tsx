import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { IntervalsTool, PowersTool, RadicalsTool, RoundingTool, ScientificTool, ZoomTool } from '../../dbh4-aplikatuak-errealak/lab/RealsTools'
import { powersStages } from '../lessons'
import { ScaleTool, SpiralTool, SquareTool, TokensTool } from './BerreturakTools'
import { powersLabTools, type PowersLabToolId } from './labTools'

const toolComponents: Record<PowersLabToolId, (props: LabToolProps) => JSX.Element> = {
    tokens: TokensTool,
    powers: PowersTool,
    scale: ScaleTool,
    scientific: ScientificTool,
    square: SquareTool,
    radicals: RadicalsTool,
    spiral: SpiralTool,
    zoom: ZoomTool,
    intervals: IntervalsTool,
    rounding: RoundingTool
}

export function PowersLaboratory(props: {
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
            tools={powersLabTools}
            stages={powersStages}
            components={toolComponents}
            title={{ eu: 'Fitxak, karratuak eta espiralak', es: 'Fichas, cuadrados y espirales', en: 'Cards, squares and spirals', ar: 'رقاقات ومربعات وحلزونات' }}
        />
    )
}
