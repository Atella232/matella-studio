import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { SolveTool } from '../../dbh1-proportzionaltasuna-v2/lab/ProportionTools'
import { similarityStages } from '../lessons'
import { similarityLabTools, type SimilarityLabToolId } from './labTools'
import { DivideTool, GrowthTool, HomothetyTool, MapTool, RectanglesTool, ShadowsTool, ThalesTool } from './SimilarityTools'

const toolComponents: Record<SimilarityLabToolId, (props: LabToolProps) => JSX.Element> = {
    solve: SolveTool,
    divide: DivideTool,
    thales: ThalesTool,
    rectangles: RectanglesTool,
    homothety: HomothetyTool,
    growth: GrowthTool,
    map: MapTool,
    shadows: ShadowsTool
}

export function SimilarityLaboratory(props: {
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
            tools={similarityLabTools}
            stages={similarityStages}
            components={toolComponents}
            title={{ eu: 'Handitu, txikitu eta neurtu', es: 'Amplía, reduce y mide', ar: 'كبّر وصغّر وقِس' }}
        />
    )
}
